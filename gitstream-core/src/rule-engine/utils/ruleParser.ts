// @ts-nocheck
import { RuleParser } from '../../rules-parser/index';
import { getExpertReviewer } from '../api/getExpertReviewer';
import {
  DEBUG_MODE,
  ERRORS,
  ORG_LEVEL_REPO,
  RULES_PARSER_STATUS_CODES,
  STATUS_CODES,
  WATCH_FILTERS,
  WATCH_PR_EVENTS,
} from '../common/const';
import { debug, prepareSendingLogsToDD } from '../common/logger';
import { filterAnalyticsHandler } from '../common/notify/analytics.handler';
import {
  convertPRContextFromBase64,
  convertRuleFileToStringSafe,
} from './converters';
import { getContext, parseCMFile } from './diffParser';
import { handleValidationErrors } from './error.handler';
import {
  CWD,
  getExcludedOrgCMFilesBasedOnRepo,
  getOrgCmFiles,
  getRuleFiles,
  hasNonRuleFilesChanges,
  isCmChanged,
  readRemoteFile,
} from './git.service';
import { MAIN_RULES_FILE, REPO_FOLDER } from './git/const';
import { validateRuleFile } from './ruleParser.validator';
import { rulesEngineErrors } from './types';

export const parseRules = async (rules, prContext, payload, ruleFile) => {
  const { repo } = payload;
  try {
    await validateRuleFile(rules, ruleFile, payload);
    const parser = new RuleParser(rules, prContext, DEBUG_MODE);
    const results = await parser.parseStreams();
    if (results.automations) {
      const passedAutomationNames = Object.keys(results.automations).filter(
        (automation) => results.automations[automation].passed
      );
      const totalAutomations = Object.keys(results?.automations).length;
      await prepareSendingLogsToDD(
        'info',
        `${passedAutomationNames.length} out of ${totalAutomations} automations have passed for repo ${repo}`,
        payload,
        {
          passedAutomations: passedAutomationNames.length,
          passedAutomationNames,
          totalAutomations,
        }
      );
    }
    return results;
  } catch (error) {
    const { owner, repo, pullRequestNumber } = payload;
    debug(`error in parseRules: ${error}`);
    await prepareSendingLogsToDD(
      'error',
      `${ERRORS.FAILED_TO_PARSE_CM} in pr ${owner}/${repo}/${pullRequestNumber}`,
      payload,
      { error: error?.message, rules, ruleFile }
    );
    await handleValidationErrors(
      error?.message,
      STATUS_CODES.SYNTAX_ERROR,
      payload,
      ruleFile
    );
  }
};

const removeDSObjects = (context) => {
  const { ds_blame, ds_activity, ...repo } = context.repo || {};
  return { ...context, repo };
};

export const executeOneRuleFile = async ({
  ruleFileContent,
  payload,
  baseBranch,
  refBranch,
  ruleFile = 'playground.cm',
  cloneRepoPath,
}) => {
  CWD.cwd = cloneRepoPath;
  let context;

  const tempContext = await getContext(
    baseBranch,
    refBranch,
    payload,
    ruleFileContent,
    ruleFile,
    isCmChanged
  );
  const expertRequest = getExpertReviewer(
    tempContext.repo,
    tempContext.files,
    payload
  );
  debug(
    `expertRequest for cm file: ${ruleFile}: ${JSON.stringify(
      expertRequest,
      null,
      2
    )}`
  );
  context = removeDSObjects(tempContext);
  context.repo = {
    ...context.repo,
    data_service: { expert_reviwer_request: expertRequest },
  };
  const stringSafeRuleFile = convertRuleFileToStringSafe(ruleFileContent);
  const results = await parseRules(
    stringSafeRuleFile,
    context,
    payload,
    ruleFile
  );
  return { results, context, errors: rulesEngineErrors };
};

export const executeCached = async ({
  ruleFileContent,
  payload,
  ruleFile = 'playground.cm',
  cachedContext,
}) => {
  const stringSafeRuleFile = convertRuleFileToStringSafe(ruleFileContent);
  const results = await parseRules(
    stringSafeRuleFile,
    cachedContext,
    payload,
    ruleFile
  );
  return { results, context: cachedContext, errors: rulesEngineErrors };
};

const parseRulesParserErrors = async (
  results,
  ruleFile,
  stringSafeRuleFile,
  payload
) => {
  const { owner, repo, pullRequestNumber } = payload;
  try {
    const validatorErrors = results?.validatorErrors;
    const parserErrors = results?.errors;
    //If VALIDATOR error - send to DD only, other errors - fail gitstream
    if (Object.keys(validatorErrors || {}).length) {
      for (const validator of Object.keys(validatorErrors)) {
        debug(
          `${ERRORS.VALIDATOR_ERROR} - ${validator}: ${validatorErrors[validator]}`
        );
        await prepareSendingLogsToDD(
          'warn',
          `${ERRORS.VALIDATOR_ERROR} - ${validator} in pr ${owner}/${repo}/${pullRequestNumber}`,
          payload,
          {
            error: `${validatorErrors[validator]}`,
            ruleFile,
            cmContent: stringSafeRuleFile,
          },
          true
        );
      }
    }
    if (Object.keys(parserErrors || {}).length) {
      for (const statusCode of Object.keys(parserErrors)) {
        debug(`Error: ${parserErrors[statusCode]}`);
        await handleValidationErrors(
          parserErrors[statusCode],
          statusCode,
          payload,
          ruleFile
        );
      }
      return true;
    }
  } catch (error) {
    debug(`Error in parseRulesParserErrors ${error?.message}`);
    await prepareSendingLogsToDD(
      'warn',
      `${ERRORS.FAILED_PARSE_RULES_PARSER_ERRORS} in pr ${owner}/${repo}/${pullRequestNumber}`,
      payload,
      { error: `${error?.message}`, ruleFile },
      true
    );
    await handleValidationErrors(
      `${ERRORS.FAILED_PARSE_RULES_PARSER_ERRORS}: ${error?.message}`,
      STATUS_CODES.FAILED_PARSE_RULES_PARSER_ERRORS,
      payload,
      ruleFile
    );
    return true;
  }
};

export const parseMultipleRuleFiles = async (
  rules,
  baseBranch,
  refBranch,
  payload,
  isCmChanged,
  cache = null
) => {
  let combinedResults = {};
  const contextPerRuleFile = {};
  for (const ruleFile of Object.keys(rules)) {
    try {
      let context;
      if (cache) {
        context = {
          ...cache[ruleFile],
          pr: convertPRContextFromBase64(payload.prContext),
        };
      } else {
        const tempContext = await getContext(
          baseBranch,
          refBranch,
          payload,
          rules[ruleFile],
          ruleFile,
          isCmChanged
        );
        const expertRequest = getExpertReviewer(
          tempContext.repo,
          tempContext.files,
          payload
        );
        debug(
          `expertRequest for cm file: ${ruleFile}: ${JSON.stringify(
            expertRequest,
            null,
            2
          )}`
        );

        context = removeDSObjects(tempContext);
        context.repo = {
          ...context.repo,
          data_service: { expert_reviwer_request: expertRequest },
        };
      }
      context.env = process.env;
      contextPerRuleFile[ruleFile] = context;
      const stringSafeRuleFile = convertRuleFileToStringSafe(rules[ruleFile]);
      const results = await parseRules(
        stringSafeRuleFile,
        context,
        payload,
        `${ruleFile}`
      );
      const breakGitstream = await parseRulesParserErrors(
        results,
        ruleFile,
        stringSafeRuleFile,
        payload
      );
      if (breakGitstream) {
        return {};
      }
      await filterAnalyticsHandler(results.analytics, payload, context);
      combinedResults = Object.keys(results.automations).reduce(
        (acc, automation) => {
          const ruleFileName =
            ruleFile?.replace('.cm/', '')?.replace('.cm', '') || ruleFile;
          const isOrgLevel = !ruleFile?.includes('.cm/');
          return {
            ...acc,
            [`${ruleFileName}/${automation}`]: {
              ...results.automations[automation],
              is_org_level: isOrgLevel,
              provider_repository_id: isOrgLevel
                ? payload.cmRepoId
                : payload.providerRepoId,
            },
          };
        },
        combinedResults
      );
    } catch (error) {
      debug(`parseMultipleRuleFiles error: ${error.message}`);
      const { owner, repo, pullRequestNumber } = payload;
      await prepareSendingLogsToDD(
        'error',
        `${ERRORS.FAILED_TO_PARSE_CM} in pr ${owner}/${repo}/${pullRequestNumber}`,
        payload,
        {
          error: error?.message,
          rules,
          ruleFile,
        }
      );
      await handleValidationErrors(
        ERRORS.FAILED_TO_PARSE_CM,
        STATUS_CODES.FAILED_TO_PARSE_CM,
        payload,
        ruleFile
      );
    }
  }
  return { automations: combinedResults, contextPerFile: contextPerRuleFile };
};

export const extractAdmins = async (
  baseBranch,
  isCmRepoFullyInstalled,
  payload
) => {
  try {
    const { cmRepoRef, repo } = payload;
    const repoCmFile =
      repo?.toLowerCase() === ORG_LEVEL_REPO ? '' : '.cm/' + MAIN_RULES_FILE;
    const rules = readRemoteFile(repoCmFile, baseBranch);
    const rulesObj = await parseCMFile(payload, rules, repoCmFile);
    let admins = rulesObj?.config?.admin?.users || [];

    if (isCmRepoFullyInstalled) {
      const OrgLevelRules = readRemoteFile(
        MAIN_RULES_FILE,
        cmRepoRef,
        REPO_FOLDER.CM
      );
      const orgRulesObj = await parseCMFile(
        payload,
        OrgLevelRules,
        MAIN_RULES_FILE
      );

      admins = admins.concat(orgRulesObj?.config?.admin?.users || []);
    }
    const adminArray = Array.from(new Set(admins));
    return adminArray;
  } catch (e) {
    const { owner, repo, pullRequestNumber } = payload;
    await prepareSendingLogsToDD(
      'warn',
      `${ERRORS.FAILED_TO_EXTRACT_ADMINS} in pr ${owner}/${repo}/${pullRequestNumber}`,
      payload,
      { error: e?.message },
      true
    );
    console.warn(ERRORS.FAILED_TO_EXTRACT_ADMINS);
    return [];
  }
};

export const getCMChanged = (refBranch, baseBranch, repo) => {
  const cmChanged = isCmChanged(refBranch, baseBranch, repo);
  const isDryRun =
    cmChanged && hasNonRuleFilesChanges(refBranch, baseBranch, repo);
  return { cmChanged, isDryRun };
};

const getRules = async (
  cmChanged,
  refBranch,
  baseBranch,
  payload,
  isCmRepoFullyInstalled
) => {
  // In case there are changes in the cm then get the cm from the local branch
  try {
    const { repo, cmRepoRef } = payload;
    let rules = await getRuleFiles(cmChanged ? refBranch : baseBranch, repo);
    //If the user has org level then get the rules also from the cm repo
    if (isCmRepoFullyInstalled && repo?.toLowerCase() !== ORG_LEVEL_REPO) {
      const orgRules = getOrgCmFiles(cmRepoRef);
      const orgRulesToExclude = await getExcludedOrgCMFilesBasedOnRepo(
        orgRules,
        repo,
        payload
      );
      for (const ruleFile of orgRulesToExclude) {
        delete orgRules[ruleFile];
      }
      rules = { ...orgRules, ...rules };
    }
    return rules;
  } catch (error) {
    debug(error.message);
    return {};
  }
};

export const getRulesAndValidate = async (
  cmChanged,
  refBranch,
  baseBranch,
  payload,
  isCmRepoFullyInstalled
) => {
  const rules = await getRules(
    cmChanged,
    refBranch,
    baseBranch,
    payload,
    isCmRepoFullyInstalled
  );
  if (!Object.keys(rules).length) {
    await prepareSendingLogsToDD(
      'warn',
      ERRORS.RULE_FILE_NOT_FOUND,
      payload,
      { error: ERRORS.RULE_FILE_NOT_FOUND },
      true
    );
    await handleValidationErrors(
      ERRORS.RULE_FILE_NOT_FOUND,
      STATUS_CODES.RULE_FILE_NOT_FOUND,
      payload
    );
  }
  return rules;
};

const getPREventsInRuleFile = (rules, file) => {
  return Object.values(WATCH_PR_EVENTS).reduce((ac, event) => {
    if (rules[file].includes(`pr.${event}`)) {
      return { ...ac, [event]: true };
    }
    return ac;
  }, {});
};

const getFiltersInRuleFile = (rules, file) => {
  return Object.keys(WATCH_FILTERS).reduce((ac, filter) => {
    if (WATCH_FILTERS[filter].test(rules[file])) {
      return { ...ac, [filter]: true };
    }
    return ac;
  }, {});
};

export const getWatchers = async (rules, payload): any => {
  try {
    const watchers = Object.keys(rules).reduce((acc, file) => {
      const events = getPREventsInRuleFile(rules, file);
      const filters = getFiltersInRuleFile(rules, file);
      return {
        events: { ...acc?.events, ...events },
        filters: { ...acc?.filters, ...filters },
      };
    }, {});
    return watchers;
  } catch (error) {
    const { owner, repo, pullRequestNumber } = payload;
    await prepareSendingLogsToDD(
      'warn',
      `${ERRORS.FAILED_TO_GET_WATCHERS} in pr ${owner}/${repo}/${pullRequestNumber}`,
      payload,
      { error: error?.message },
      true
    );
    await handleValidationErrors(
      ERRORS.FAILED_TO_GET_WATCHERS,
      STATUS_CODES.FAILED_TO_GET_WATCHERS,
      payload
    );
  }
};

export const executeParser = async ({ context, ruleFileContent, payload }) => {
  const ruleFile = 'playground.cm';
  const stringSafeRuleFile = convertRuleFileToStringSafe(ruleFileContent);
  const results = await parseRules(
    stringSafeRuleFile,
    context,
    payload,
    ruleFile
  );
  return { results, errors: rulesEngineErrors };
};
