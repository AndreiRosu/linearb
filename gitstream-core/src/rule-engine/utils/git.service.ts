// @ts-nocheck
import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import {
  ERRORS,
  NOT_FOUND_FILE_PATH,
  ORG_LEVEL_REPO,
  STATUS_CODES,
} from '../common/const';
import { debug } from '../common/logger';
import { parseCMFile } from './diffParser';
import { handleValidationErrors } from './error.handler';
import { GIT_ERROR_TYPE, REPO_FOLDER } from './git/const';

export const SOURCE_CODE_WORKING_DIRECTORY = './code';
export const CWD = { cwd: SOURCE_CODE_WORKING_DIRECTORY };

export const executeGitCommand = (command, folder = REPO_FOLDER.DEFAULT) => {
  debug(`Execute: ${command}`);
  try {
    const cdCommand = `cd ${folder} && `;
    const gitResult = execSync(cdCommand + command, {
      ...CWD,
      maxBuffer: 500 * 1024 * 1024,
    }).toString();
    return gitResult;
  } catch (e) {
    debug(`${ERRORS.GIT_COMMAND_FAILED} ${e?.message || 'unknown error'}`);
    if ((e?.toString() || '').includes(GIT_ERROR_TYPE.BAD_REVISION)) {
      handleValidationErrors(
        `${ERRORS.GIT_COMMAND_FAILED} ${e?.message || 'unknown error'}`,
        STATUS_CODES.BAD_REVISION
      );
    }
    throw e;
  }
};

export const getCheckoutCommit = (refBranch, baseBranch) => {
  try {
    const checkoutCommit = executeGitCommand(
      `git rev-list --boundary '${refBranch}'...'${baseBranch}' | grep "^-" | cut -c2- | tail -1`
    );
    return checkoutCommit.trim() || baseBranch;
  } catch (e) {
    return baseBranch;
  }
};

export const getContent = (branch, file) => {
  try {
    if (file === NOT_FOUND_FILE_PATH) {
      return '';
    }
    const fileContent = executeGitCommand(
      `git show '${branch.trim()}':'${file.trim()}'`
    );
    return fileContent;
  } catch (e) {
    return '';
  }
};

export const getDiff = (baseBranch, refBranch, rules) => {
  try {
    const ignoreFiles = rules?.config?.ignore_files
      ?.map((file) => `':(exclude)${file}'`)
      ?.join(' ');
    const diffCommand = `git diff '${baseBranch}'...'${refBranch}' ${
      ignoreFiles ? ignoreFiles : ''
    }`;
    const diff = executeGitCommand(diffCommand);
    debug({
      diff,
      logs: executeGitCommand(`git log`),
      currBranch: executeGitCommand(`git branch --show-current`),
    });
    return { diff, diffCommand };
  } catch (e) {
    console.log(`error getting diff: ${e}`);
    return '';
  }
};

export const readRemoteFile = (file, branch, folder = REPO_FOLDER.DEFAULT) => {
  executeGitCommand(`git config --global --add safe.directory '*'`);
  try {
    if (folder === REPO_FOLDER.DEFAULT) {
      executeGitCommand(`git show '${branch}':'${file}' > '${file}'`);
    }
    return readFileSync(
      `${SOURCE_CODE_WORKING_DIRECTORY}/${folder}/${file}`,
      'utf8'
    );
  } catch {
    return '';
  }
};

const getCMFilesList = (baseBranch, repo) => {
  executeGitCommand(`git checkout '${baseBranch}'`);
  const cmFiles =
    repo?.toLowerCase() === ORG_LEVEL_REPO
      ? executeGitCommand(`git ls-files '*.cm'`)
      : executeGitCommand(`git ls-files '.cm/*.cm'`);

  executeGitCommand(`git checkout -`);
  return cmFiles.split('\n').filter(Boolean);
};

export const getExcludedOrgCMFilesBasedOnRepo = async (
  orgRules,
  repo,
  payload
) => {
  const excludedRulesFiles = [];
  for (const ruleFile of Object.keys(orgRules)) {
    const rulesObj = await parseCMFile(payload, orgRules[ruleFile], ruleFile);
    const excludedRepos = rulesObj?.config?.ignore_repositories || [];
    if (excludedRepos.includes(repo)) {
      excludedRulesFiles.push(ruleFile);
    }
  }
  return excludedRulesFiles;
};

export const getOrgCmFiles = (baseBranch) => {
  executeGitCommand(`git checkout ${baseBranch}`, REPO_FOLDER.CM);
  const cmFiles = executeGitCommand(`git ls-files '*.cm'`, REPO_FOLDER.CM);
  executeGitCommand(`git checkout -`, REPO_FOLDER.CM);
  const orgCmFiles = cmFiles.split('\n').filter(Boolean);
  if (Object.keys(orgCmFiles).length) {
    return orgCmFiles.reduce(
      (acc, cmFile) => ({
        ...acc,
        [cmFile]: readRemoteFile(cmFile, baseBranch, REPO_FOLDER.CM),
      }),
      {}
    );
  }

  return [];
};

export const getRuleFiles = async (baseBranch, repo) => {
  const cmFiles = getCMFilesList(baseBranch, repo);
  if (Object.keys(cmFiles).length > 0) {
    const ruleFiles = cmFiles.reduce(
      (acc, cmFile) => ({
        ...acc,
        [cmFile]: readRemoteFile(cmFile, baseBranch),
      }),
      {}
    );
    return ruleFiles;
  }
  return {};
};

export const getCommitsNumberOnBranch = (baseBranch) => {
  return Number(
    executeGitCommand(`git rev-list --count HEAD ^${baseBranch}`).trim()
  );
};

export const getContributorsStatistics = (branch) => {
  const contributorsString = executeGitCommand(
    `git shortlog ${branch} -s -n -e`
  );
  return contributorsString.split('\n').reduce((acc, contributorStats) => {
    const [commits, contributor] = contributorStats.trim().split('\t');

    return {
      ...acc,
      ...(contributor && { [contributor]: parseInt(commits) }),
    };
  }, {});
};

export const getAuthorName = (baseBranch, refBranch) => {
  try {
    const authorName = executeGitCommand(
      `git log '${baseBranch}'..'${refBranch}' --format="%an" | tail -1`
    );
    const authorEmail = executeGitCommand(
      `git log '${baseBranch}'..'${refBranch}' --format="%ae" | tail -1`
    );
    const fullAuthorName = `${authorName?.trim()} <${authorEmail?.trim()}>`;
    debug({
      fullAuthorName,
      currBranch: executeGitCommand(`git branch --show-current`),
    });
    return { fullAuthorName, authorName, authorEmail };
  } catch (e) {
    console.log(`error getting branch author name: ${e}`);
    return '';
  }
};

export const isCmChanged = (refBranch, baseBranch, repo) => {
  executeGitCommand(`git config --global --add safe.directory '*'`);
  if (repo?.toLowerCase() === ORG_LEVEL_REPO) {
    return Boolean(
      executeGitCommand(`git diff '${baseBranch}'...'${refBranch}' -- *.cm`)
    );
  }
  return Boolean(
    executeGitCommand(`git diff '${baseBranch}'...'${refBranch}' -- .cm/*.cm`)
  );
};

export const hasNonRuleFilesChanges = (refBranch, baseBranch, repo) => {
  executeGitCommand(`git config --global --add safe.directory '*'`);
  if (repo?.toLowerCase() === ORG_LEVEL_REPO) {
    return Boolean(
      executeGitCommand(`git diff '${baseBranch}'...'${refBranch}' -- ':!*.cm'`)
    );
  }
  return Boolean(
    executeGitCommand(
      `git diff '${baseBranch}'...'${refBranch}' -- ':!.cm/*.cm'`
    )
  );
};
