import {
  BASE_REF,
  CLIENT_PAYLOAD,
  ERRORS,
  HEAD_REF,
  STATUS_CODES,
} from './common/const';
import { prepareSendingLogsToDD } from './common/logger';
import { attachAdditionalContextByProvider } from './providers';
import { saveResultsInCache } from './utils/cache';
import { handleValidationErrors } from './utils/error.handler';
import { getWatchers, parseMultipleRuleFiles } from './utils/ruleParser';
import {
  loadRunData,
  sendResultsToResolver,
  validateDefaultFolder,
} from './utils/run';

export const runCI = async () => {
  const refBranch = (HEAD_REF || '').trim();
  const baseBranch = (BASE_REF || '').trim();
  const payload =
    typeof JSON.parse(CLIENT_PAYLOAD) === 'string'
      ? JSON.parse(JSON.parse(CLIENT_PAYLOAD))
      : JSON.parse(CLIENT_PAYLOAD);

  try {
    const { repo, owner, pullRequestNumber, headSha, hasCmRepo } = payload;
    //Check if the user has a cm repo (in gitlab the repo should also have a rules file) and the yml supports org level.
    const isCmRepoFullyInstalled = validateDefaultFolder() && hasCmRepo;
    console.log(
      `PR: ${owner}/${repo}/pull/${pullRequestNumber}\ncommit: ${headSha}`
    );
    const { rules, admins, cmState, cache } = await loadRunData(
      payload,
      refBranch,
      baseBranch,
      isCmRepoFullyInstalled
    );
    const { automations, contextPerFile } = await parseMultipleRuleFiles(
      rules,
      baseBranch,
      refBranch,
      payload,
      cmState.cmChanged,
      cache.contextPerFile
    );
    saveResultsInCache({ contextPerFile, rules, admins, cmState });
    const watchers = await getWatchers(rules, payload);

    // Send evaluated rules to the resolver
    const body = {
      automations,
      context: {
        watchPREvents: watchers.events,
        watchFilters: watchers.filters,
        ...payload,
        admins,
        dryRun: cmState.isDryRun,
        onlyRulesFilesChanges: cmState.cmChanged && !cmState.isDryRun,
        ...attachAdditionalContextByProvider(payload.source, {
          baseBranch,
        }),
      },
    };
    await sendResultsToResolver(body, payload, automations);
  } catch (error) {
    const { owner, repo, pullRequestNumber } = payload;
    console.error(ERRORS.INTERNAL_ERROR, { error });
    await prepareSendingLogsToDD(
      'warn',
      `${ERRORS.INTERNAL_ERROR} for pr ${owner}/${repo}/${pullRequestNumber}`,
      payload,
      {
        error: error?.toString(),
      }
    );
    await handleValidationErrors(
      error?.toString(),
      STATUS_CODES.INTERNAL_ERROR,
      payload
    );
  }
};
