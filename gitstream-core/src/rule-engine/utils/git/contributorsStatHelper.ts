// @ts-nocheck
import { DEBUG_MODE, NOT_FOUND_FILE_PATH } from '../../common/const';
import { debug, prepareSendingLogsToDD } from '../../common/logger';
import { executeGitCommand, readRemoteFile } from '../git.service';
import { ACTIVITY_SINCE, gitCommands, GIT_ERRORS, GIT_INFO } from './const';
import _ from 'lodash';

export const groupByWeek = (activity) => {
  const weekSum = activity.reduce((acc, cur, i) => {
    const item =
      i > 0 &&
      acc.find(
        ({ git_user, week }) => git_user === cur.git_user && week === cur.week
      );
    if (item) {
      item.changes += cur.changes;
      item.week = cur.week;
    } else {
      acc.push({
        git_user: cur.git_user,
        week: cur.week,
        changes: cur.changes,
      });
    }
    return acc;
  }, []);

  return weekSum.reduce((accSum, { git_user, week, changes }) => {
    accSum[git_user] = accSum[git_user] || {};
    accSum[git_user] = { ...accSum[git_user], [`week_${week}`]: changes };
    return { ...accSum };
  }, {});
};

export const calculateLinesPercentage = (authorLines, allLinesCount) =>
  authorLines && allLinesCount
    ? authorLines >= allLinesCount
      ? 100
      : parseFloat(authorLines / allLinesCount) * 100
    : 0;

export const formatDateToDays = async (date, context, payload) => {
  if (!date) {
    const { owner, repo, pullRequestNumber } = payload;
    debug(
      `Couldn't find git dates for author: ${context.branch.author}, base branch: ${context.branch.base}, head branch: ${context.branch.name}`
    );
    await prepareSendingLogsToDD(
      'info',
      `${GIT_INFO.NO_DATA_FROM_GIT} ${owner}/${repo}/${pullRequestNumber}`,
      payload,
      {
        author: context.branch.author,
        baseBranch: context.branch.base,
        headBranch: context.branch.name,
      },
      DEBUG_MODE
    );
    return 0;
  }
  const today = new Date();
  const formattedDate = new Date(date);
  return Math.abs(
    parseInt((formattedDate - today) / (1000 * 60 * 60 * 24), 10)
  );
};

//report git logs to DD - use carefully because it's the user's data
export const reportGitCommandsAndResults = async (file, branch, payload) => {
  if (file === NOT_FOUND_FILE_PATH) {
    //old file
    return;
  }
  const { owner, repo, pullRequestNumber } = payload;
  const gitBlameCommand = gitCommands.GIT_BLAME({ file, branch });
  const gitActivityCommand = gitCommands.GIT_ACTIVITY({
    file,
    branch,
    since: ACTIVITY_SINCE,
  });
  const gitLogCommand = gitCommands.GIT_LOG({ file });

  try {
    const gitBlame = executeGitCommand(gitBlameCommand)?.replace(/\n/g, '\\n');
    const gitActivity = executeGitCommand(gitActivityCommand)
      ?.split('\n')
      ?.filter(Boolean);
    const gitLog = executeGitCommand(gitLogCommand)?.replace(/\n/g, '\\n');

    const extraData = {
      file,
      gitBlameCommand,
      gitActivityCommand,
      gitLogCommand,
      gitBlame,
      gitActivity,
      gitLog,
    };
    await prepareSendingLogsToDD(
      'info',
      `${GIT_INFO.RAW_GIT_COMMANDS} ${owner}/${repo}/${pullRequestNumber}`,
      payload,
      extraData,
      DEBUG_MODE
    );
  } catch (error) {
    return;
  }
};

export const getAllAuthorsOfFile = (file, branch) => {
  try {
    const gitCommand = `${gitCommands.GIT_BLAME({
      file,
      branch,
    })} ${gitCommands.GIT_BLAME_AUTHORS_FORMAT()}`;
    const rawAuthors = executeGitCommand(gitCommand);

    const authors = [
      ...Array.from(
        new Set(
          rawAuthors
            ?.replaceAll('author ', '')
            .replaceAll('author-mail ', '')
            .split('\n')
        )
      ),
    ]?.filter(Boolean);

    return authors;
  } catch (error) {
    console.log(`${GIT_ERRORS.GETTING_ALL_AUTHORS} ${file}. ${error}`);
    return [];
  }
};

const getAuthorLines = (allAuthors, author, file) => {
  try {
    const authorFormatted = `author ${author
      ?.substring(0, author.indexOf('<') - 1)
      ?.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\nauthor-mail ${author
      ?.substring(author.indexOf('<'), author.indexOf('>') + 1)
      .replace('+', '\\+')}`;

    const regex = new RegExp(authorFormatted, 'g');

    debug(
      `formatted author: ${authorFormatted}. matches: ${
        (allAuthors.match(regex) || []).length
      }`
    );

    return (allAuthors.match(regex) || []).length;
  } catch (error) {
    console.log(`${GIT_ERRORS.GETTING_AUTHOR_LINES} ${file}. ${error}`);
    return '0';
  }
};

export const getGitBlameString = (file, branch) => {
  try {
    const gitCommand = `${gitCommands.GIT_BLAME({
      file,
      branch,
    })} ${gitCommands.GIT_BLAME_STRING()}`;
    const allAuthors = executeGitCommand(gitCommand);
    return allAuthors;
  } catch (error) {
    console.log(`${GIT_ERRORS.GETTING_GIT_BLAME} ${file}. ${error}`);
    return '0';
  }
};

export const calculateStatisticsForBlame = (
  allAuthors,
  author,
  file,
  branch
) => {
  const authorLines = parseInt(getAuthorLines(allAuthors, author, file)) || '';
  const allLinesCount = parseInt(getCodeLinesCount(file, branch));
  debug(`calculateStatisticsForBlame: ${authorLines}, ${allLinesCount}`);
  return { authorLines, allLinesCount };
};

const readRemoteFileAndSplit = (file, branch) =>
  readRemoteFile(file, branch)?.split(/\r\n|\r|\n/);

const isLastRowEmpty = (file, branch) => {
  const allRows = readRemoteFileAndSplit(file, branch);
  debug(
    `all rows: ${allRows.length}. isEmpty: ${
      allRows?.[allRows?.length - 1] === '' ? true : false
    }`
  );
  return allRows?.[allRows?.length - 1] === '' ? true : false;
};

const getCodeLinesCount = (file, branch) =>
  isLastRowEmpty(file, branch)
    ? readRemoteFileAndSplit(file, branch)?.length - 1
    : readRemoteFileAndSplit(file, branch)?.length;

export const extractStatsFromRawItems = (rawItems) =>
  rawItems?.reduce((acc, item) => {
    const author = {
      [item.replace(/ /g, '').trim().split('\t')[1]]: {
        count: item.replace(/ /g, '').trim().split('\t')[0],
      },
    };
    return { ...acc, ...author };
  }, {});

export const splitDsAndBlameObjects = (blames) => {
  let formattedBlame = _.cloneDeep(blames);
  const dsBlame = Object.keys(formattedBlame).reduce((ac, key) => {
    return { ...ac, [key]: formattedBlame[key].dsBlame };
  }, {});

  Object.keys(formattedBlame).forEach((file) => {
    if (formattedBlame[file].dsBlame) {
      delete formattedBlame[file].dsBlame;
    }
  });
  return { formattedBlame, dsBlame };
};

export const splitDsAndActivity = (gitActivity) => {
  const formattedActivity = _.cloneDeep(gitActivity);
  const dsActivity = Object.keys(formattedActivity).reduce((ac, key) => {
    return { ...ac, [key]: formattedActivity[key].dsActivity };
  }, {});

  Object.keys(formattedActivity).forEach((file) => {
    if (formattedActivity[file].dsActivity) {
      delete formattedActivity[file].dsActivity;
    }
  });
  return { formattedActivity, dsActivity };
};
