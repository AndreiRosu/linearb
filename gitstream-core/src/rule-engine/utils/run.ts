// @ts-nocheck
import axios from 'axios';
import {
  ERRORS,
  RESOLVER_TOKEN,
  RULES_RESOLVER_URL,
  STATUS_CODES,
  USE_CACHE,
} from '../common/const';
import { prepareSendingLogsToDD } from '../common/logger';
import { loadCacheResults } from './cache';
import { handleValidationErrors } from './error.handler';
import { executeGitCommand } from './git.service';
import { REPO_FOLDER } from './git/const';
import { extractAdmins, getCMChanged, getRulesAndValidate } from './ruleParser';

export const validateDefaultFolder = () => {
  try {
    executeGitCommand(`git config --global --add safe.directory '*'`);
    return true;
  } catch (e) {
    REPO_FOLDER.DEFAULT = '.';
    return false;
  }
};

export const calculateRunData = async (
  payload,
  refBranch,
  baseBranch,
  isCmRepoFullyInstalled
) => {
  const { repo } = payload;
  const cmState = getCMChanged(refBranch, baseBranch, repo);
  const rules = await getRulesAndValidate(
    cmState.cmChanged,
    refBranch,
    baseBranch,
    payload,
    isCmRepoFullyInstalled
  );
  const admins = await extractAdmins(
    baseBranch,
    isCmRepoFullyInstalled,
    payload
  );
  return { cmState, rules, admins, cache: {} };
};

export const loadRunData = async (
  payload,
  refBranch,
  baseBranch,
  isCmRepoFullyInstalled
): any => {
  if (USE_CACHE) {
    const cache = loadCacheResults();
    if (!Object.keys(cache)) {
      return await handleValidationErrors(
        ERRORS.INVALID_CACHE,
        STATUS_CODES.INVALID_CACHE,
        {}
      );
    }
    const rules = cache.rules;
    const admins = cache.admins;
    const cmState = cache.cmState;
    return { cache, rules, admins, cmState };
  }
  const { rules, admins, cmState, cache } = await calculateRunData(
    payload,
    refBranch,
    baseBranch,
    isCmRepoFullyInstalled
  );
  return { rules, admins, cmState, cache };
};

export const sendResultsToResolver = async (body, payload, automations) => {
  try {
    await axios.post(RULES_RESOLVER_URL, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': RESOLVER_TOKEN,
      },
    });

    await prepareSendingLogsToDD(
      'info',
      ERRORS.SEND_RESULTS_TO_RESOLVER_SUCCEEDED,
      payload
    );

    console.log({ parserResults: JSON.stringify(automations) });
  } catch (error) {
    await prepareSendingLogsToDD(
      'error',
      ERRORS.SEND_RESULTS_TO_RESOLVER_FAILED,
      payload,
      {
        error: error?.message,
        body,
      }
    );
    console.error(ERRORS.SEND_RESULTS_TO_RESOLVER_FAILED, { error });
    await handleValidationErrors(
      error?.message,
      STATUS_CODES.SEND_RESULTS_TO_RESOLVER_FAILED,
      payload
    );
  }
};
