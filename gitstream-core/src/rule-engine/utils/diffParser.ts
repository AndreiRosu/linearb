// @ts-nocheck
import parse from 'parse-diff';
import {
  DEBUG_MODE,
  ERRORS,
  IGNORE_PATTERNS_IN_DRY_RUN,
  NOT_FOUND_FILE_PATH,
  STATUS_CODES,
} from '../common/const';
import { debug, prepareSendingLogsToDD } from '../common/logger';
import {
  getCommitsNumberOnBranch,
  getContributorsStatistics,
  getDiff,
  getContent,
  getCheckoutCommit,
  getAuthorName,
} from './git.service';
import * as yaml from 'js-yaml';
import {
  blameByAuthor,
  commitsDateByAuthor,
  getRepoFirstCommitDate,
  recentAuthorActivity,
} from './git/contributersStat';
import { matchContributors } from './matchContributors';
import { handleValidationErrors } from './error.handler';
import { convertPRContextFromBase64, toBase64String } from './converters';
import { ACTIVITY_SINCE } from './git/const';
import {
  formatDateToDays,
  reportGitCommandsAndResults,
  splitDsAndActivity,
  splitDsAndBlameObjects,
} from './git/contributorsStatHelper';
import { findGitAuthorsWithFallback } from './git/diffParserHelper';

const filteredOutCMFilesFunc = ({ to }) =>
  IGNORE_PATTERNS_IN_DRY_RUN.every((ignorePattern) => !to.match(ignorePattern));

const formatFilesToSourceFiles = (baseBranch, refBranch, files) =>
  files.map(({ from, to, chunks }) => ({
    original_file: from === NOT_FOUND_FILE_PATH ? '' : from,
    new_file: to,
    diff: chunks.reduce((acc, { changes, content }) => {
      return (
        acc + content + '\n' + changes.map(({ content }) => content).join('\n')
      );
    }, ''),
    original_content: getContent(
      getCheckoutCommit(refBranch, baseBranch),
      from
    ),
    new_content: getContent(refBranch, to),
  }));

const extractMetadataFromFiles = (files) =>
  files.map(({ to, from, deletions, additions }) => ({
    original_file: from === NOT_FOUND_FILE_PATH ? '' : from,
    new_file: to,
    file: to !== NOT_FOUND_FILE_PATH ? to : from,
    deletions,
    additions,
  }));

const getDiffSize = (files) =>
  files?.reduce(
    (acc, { additions, deletions }) => acc + additions + deletions,
    0
  ) || 0;

export const parseCMFile = async (payload, rules, ruleFile) => {
  try {
    const rulesObj = yaml.load(
      rules.replaceAll(/{{(.*?)}}|{(.*?)}|{%.*%}((.|\n)*){% endfor %}/g, '')
    );
    debug(`cm parse result: ${JSON.stringify(rulesObj)}`);
    return rulesObj;
  } catch (error) {
    const { owner, repo, pullRequestNumber } = payload;
    await prepareSendingLogsToDD(
      'error',
      `${ERRORS.FAILED_TO_PARSE_CM} in pr ${owner}/${repo}/${pullRequestNumber}`,
      payload,
      { error: error?.message, rules, ruleFile },
      true
    );
    console.error(ERRORS.FAILED_PARSE_CM_FILE);
    await handleValidationErrors(
      error?.message,
      STATUS_CODES.SYNTAX_ERROR,
      payload,
      ruleFile
    );
  }
};

export const contributersStatContext = async (context, payload) => {
  try {
    const blames = blameByAuthor(context.files, context.branch.base);
    const { formattedBlame, dsBlame } = splitDsAndBlameObjects(blames);
    const age = await formatDateToDays(
      getRepoFirstCommitDate(context.branch.base),
      context,
      payload
    );
    const author_age = await formatDateToDays(
      commitsDateByAuthor(context.branch.author, context.branch.base)?.[0],
      context,
      payload
    );
    return {
      age,
      author_age,
      blame: formattedBlame,
      ds_blame: dsBlame,
    };
  } catch (error) {
    debug(`Error extracting blame: ${error.message}`);
    await handleValidationErrors(
      ERRORS.FAILED_TO_GET_CONTEXT,
      STATUS_CODES.FAILED_TO_GET_CONTEXT,
      payload
    );
  }
};

const contributersActivityContext = async (context) => {
  try {
    const gitActivity = context.files.reduce((acc, file) => {
      if (file === NOT_FOUND_FILE_PATH) {
        return acc;
      }
      const { dsActivity, groupByWeek } = recentAuthorActivity(
        context.branch.base,
        ACTIVITY_SINCE,
        file
      );
      return {
        ...acc,
        [file]: { ...groupByWeek, dsActivity },
      };
    }, {});

    const { formattedActivity, dsActivity } = splitDsAndActivity(gitActivity);
    return {
      git_activity: formattedActivity,
      ds_activity: dsActivity,
    };
  } catch (error) {
    debug(`Error extrating activity: ${error.message}`);
    await handleValidationErrors(
      ERRORS.FAILED_TO_GET_CONTEXT,
      STATUS_CODES.FAILED_TO_GET_CONTEXT,
      context.payload
    );
  }
};

const filterOutFiles = async (diff, isCmChanged, diffCommand, payload) => {
  const { owner, repo, pullRequestNumber } = payload;
  let files = parse(diff);
  if (isCmChanged) {
    files = files?.filter(filteredOutCMFilesFunc);
  }
  if (!files?.length) {
    await prepareSendingLogsToDD(
      'warn',
      `No files changed in rules-engine context for pr: ${owner}/${repo}/${pullRequestNumber}`,
      payload,
      { diff, diffCommand },
      isCmChanged
    );
  }
  return files;
};

const getTheRightGitAuthor = (context, gitToProviderUser) => {
  try {
    const fallbacks = findGitAuthorsWithFallback(context, gitToProviderUser);
    if (Object.keys(fallbacks).length) {
      const gitName = `${fallbacks.author.split('<')[0].replace(/\s*$/, '')}\n`;
      const gitEmail = `<${fallbacks.author.split('<')[1]}`;
      return { gitName, gitEmail, fullName: fallbacks.author };
    }
    return fallbacks;
  } catch (error) {
    debug(`Failed getting the right author. Error: ${error}`);
    return {};
  }
};

export const getContext = async (
  baseBranch,
  refBranch,
  payload,
  rules,
  ruleFile,
  isCmChanged = false
) => {
  const { owner, repo, pullRequestNumber } = payload;
  try {
    const rulesObj = await parseCMFile(payload, rules, ruleFile);
    const { diff, diffCommand } = getDiff(baseBranch, refBranch, rulesObj);
    let files = await filterOutFiles(diff, isCmChanged, diffCommand, payload);
    const commitsNumber = getCommitsNumberOnBranch(baseBranch);
    const contributors = getContributorsStatistics(baseBranch);
    const { fullAuthorName, authorName, authorEmail } = getAuthorName(
      baseBranch,
      refBranch
    );
    const context = {
      branch: {
        name: refBranch,
        base: baseBranch,
        author: fullAuthorName,
        autor_name: authorName,
        author_email: authorEmail,
        diff: {
          size: getDiffSize(files),
          files_metadata: extractMetadataFromFiles(files),
        },
        num_of_commits: commitsNumber,
      },
      source: {
        diff: {
          files: formatFilesToSourceFiles(baseBranch, refBranch, files),
        },
      },
      repo: {
        name: repo,
        contributors,
        owner,
      },
      files: files.map(({ to }) => to),
      pr: convertPRContextFromBase64(payload.prContext),
    };
    const contributorsMap = await matchContributors(
      context.pr.contributors,
      context.repo.contributors,
      payload,
      rulesObj
    );

    const gitAuthor = getTheRightGitAuthor(context, contributorsMap);
    if (Object.keys(gitAuthor).length) {
      context.branch.author = gitAuthor.fullName;
      context.branch.author_name = gitAuthor.gitName;
      context.branch.author_email = gitAuthor.gitEmail;
    }

    debug(`context.branch: ${JSON.stringify(context.branch, null, 2)}`);
    const contributorsStats = await contributersStatContext(context, payload);
    const contributorsActivity = await contributersActivityContext(context);

    context.repo = {
      ...context.repo,
      provider: payload.source,
      git_to_provider_user: contributorsMap,
      ...contributorsStats,
      ...contributorsActivity,
      pr_author: context.pr.author,
    };

    debug(`context.repo: ${JSON.stringify(context.repo, null, 2)}`);
    if (DEBUG_MODE) {
      for (const file of context.files) {
        await reportGitCommandsAndResults(file, baseBranch, payload);
      }
    }
    const reducedContext = toBase64String(
      JSON.stringify({
        context: {
          repo: context.repo,
          files: context.files,
          branch: context.branch,
          pr: { contributors: context.pr?.contributors },
        },
      })
    );
    await prepareSendingLogsToDD(
      'info',
      `rules-engine context for pr: ${owner}/${repo}/${pullRequestNumber}`,
      payload,
      { reducedContext, diffCommand },
      DEBUG_MODE
    );
    return context;
  } catch (error) {
    //TODO: remove console
    console.log({ error });
    await prepareSendingLogsToDD(
      'error',
      ERRORS.FAILED_TO_GET_CONTEXT,
      payload,
      { error: error?.message, ruleFile },
      true
    );
    await handleValidationErrors(
      ERRORS.FAILED_TO_GET_CONTEXT,
      STATUS_CODES.FAILED_TO_GET_CONTEXT,
      payload,
      ruleFile
    );
  }
};
