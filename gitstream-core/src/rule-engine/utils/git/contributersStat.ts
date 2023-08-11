// @ts-nocheck
import { executeGitCommand } from '../git.service';
import moment from 'moment';
import {
  calculateLinesPercentage,
  calculateStatisticsForBlame,
  extractStatsFromRawItems,
  getAllAuthorsOfFile,
  getGitBlameString,
  groupByWeek,
} from './contributorsStatHelper';
import { gitCommands } from './const';
import { debug } from '../../common/logger';

//1. How many commiters per file → Single commiter (file changed by a single person)
export const commitersPerFile = (files) => ({
  ...files.reduce((acc, file) => {
    const rawItems = executeGitCommand(gitCommands.COMMITER_PER_FILE({ file }))
      ?.split('\n')
      ?.filter(Boolean);
    const stat = extractStatsFromRawItems(rawItems);
    return { ...acc, ...{ [file]: { ...stat } } };
  }, {}),
});

// 2. First commit date → New in repo = Welcome, add to PRs reviews for knowlede
// 3. Last commit date → Retired = keep them up to date
export const commitsDateByAuthor = (author, branchName) => {
  return executeGitCommand(
    gitCommands.COMMITS_DATE_BY_AUTHOR({ author, branch: branchName })
  )
    ?.split('\n')
    ?.filter(Boolean);
};

const buildTempActivity = (raw) => {
  const activity = [];

  for (let i = 0; i < raw.length; i += 2) {
    const changes = raw[i + 1]?.split('\t');
    const authorData = raw[i]?.split(',');

    if (authorData.length && changes.length) {
      const date = authorData[1];
      const weekChanges = parseInt(changes[0]) + parseInt(changes[1]);
      if (date && weekChanges) {
        const dateObject = new Date(date);
        const momentDate = moment(dateObject).format('YYYY-MM-DD');
        const weekNum = moment().diff(momentDate, 'weeks');
        activity.push({
          git_user: authorData[0],
          week: weekNum,
          changes: weekChanges,
        });
      }
    }
  }
  return activity;
};

// 4. Recent activity (lines commited in a given time) → No-noob
export const recentAuthorActivity = (branchName, since, file) => {
  const raw = executeGitCommand(
    gitCommands.GIT_ACTIVITY({ branch: branchName, since, file })
  );
  const rawList = raw?.split('\n')?.filter(Boolean);

  const activity = buildTempActivity(rawList);
  debug(`temp activity: ${JSON.stringify(activity)}`);
  return { dsActivity: raw, groupByWeek: groupByWeek(activity) };
};

// 6. How many authors in repo → complexity
export const countAuthosInRepo = () =>
  executeGitCommand(gitCommands.AUTHORS_COUNT())?.split('\n')?.filter(Boolean);

// 7. How many files in repo → complexity
export const countFilesInRepo = () =>
  executeGitCommand(gitCommands.REPO_FILES_COUNT())?.trim();

// 8. Repo first commit date → complexity (if long time)
export const getRepoFirstCommitDate = (branchName = 'develop') =>
  executeGitCommand(gitCommands.FIRST_COMMIT({ branch: branchName }))?.split(
    '\n'
  )?.[1];

export const blameByAuthor = (files, branch) => {
  return {
    ...files.reduce((acc, file) => {
      const authors = getAllAuthorsOfFile(file, branch);
      debug(`files authors: ${JSON.stringify(authors)}`);
      const allAuthorsString = getGitBlameString(file, branch);
      return {
        ...acc,
        ...{
          [file]: authors.reduce((prevAuthor, author) => {
            const { authorLines, allLinesCount } = calculateStatisticsForBlame(
              allAuthorsString,
              author,
              file,
              branch
            );
            return {
              ...prevAuthor,
              [author]: calculateLinesPercentage(authorLines, allLinesCount),
              dsBlame: allAuthorsString.replaceAll(
                '\nauthor-mail',
                ' author-mail'
              ),
            };
          }, {}),
        },
      };
    }, {}),
  };
};
