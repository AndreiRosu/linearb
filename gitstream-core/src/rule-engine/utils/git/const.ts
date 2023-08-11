// @ts-nocheck
export const ACTIVITY_SINCE = '52 weeks ago';

export const gitCommands = {
  GIT_BLAME: ({ branch, file }) =>
    `git blame '${branch}' --line-porcelain -- '${file}'`,
  GIT_LOG: ({ file }) => `git log -- '${file}'`,
  GIT_BLAME_AUTHORS_FORMAT: () =>
    `| grep '^author-mail\\|^author ' | sed '$!N;s/\\n/ /'`,
  GIT_BLAME_STRING: () => `| sed -n '/^author /,/^author-mail /p'`,
  COMMITER_PER_FILE: ({ file }) =>
    `git shortlog -s -n --all --no-merges '${file}'`,
  COMMITS_DATE_BY_AUTHOR: ({ branch, author }) =>
    `git log '${branch}' --author='${author}' --format='%as' | sort | uniq`,
  GIT_ACTIVITY: ({ branch, file, since }) =>
    `git log --no-merges '${branch}' --since='${since}' --pretty=tformat:'%an <%ae>,%ad' --numstat -- '${file}'`,
  AUTHORS_COUNT: () => `git log --format='%an <%ae>' | sort | uniq`,
  REPO_FILES_COUNT: () => `git ls-files | wc -l`,
  FIRST_COMMIT: ({ branch }) =>
    `git rev-list --max-parents=0 '${branch}' --format="%cs"`,
};

export const GIT_ERRORS = {
  GETTING_ALL_AUTHORS: 'Failed getting all authors of file',
  GETTING_AUTHOR_LINES: 'Failed getting author lines of file',
  GETTING_GIT_BLAME: 'Failed getting git blame of file',
};

export const GIT_INFO = {
  RAW_GIT_COMMANDS: 'Raw git commands for file in pr',
  NO_DATA_FROM_GIT: 'No data returned from git in pr',
};

export const REPO_FOLDER = {
  DEFAULT: 'repo',
  CM: 'cm',
};

export const GIT_ERROR_TYPE = {
  BAD_REVISION: 'bad revision',
};

export const MAIN_RULES_FILE = 'gitstream.cm';
