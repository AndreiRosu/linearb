import { MONTH } from './common';
import moment from 'moment';
import { ActivityExplain, FileMetric } from './filter-types';
import { sortObject } from './high-level-filters-helper';
import { ADDITIONAL_FORMATTING } from '../../utils/providers';

export const explainExpertReviewerComment = (
  expertReviewers: string[],
  activeUsers: string[],
  knowledgeUsers: string[],
  threshold: number,
  provider: string,
  isNoUserButYou: boolean
) => {
  let comment = '🥷 **Code experts:';
  comment += expertReviewers.length
    ? ` ${expertReviewers.join(', ')}** \n \n`
    : ` no user ${
        isNoUserButYou ? 'but you' : ''
      } matched threshold ${threshold}** \n \n`;

  if (activeUsers.length) {
    comment += `${activeUsers.join(', ')} ${
      activeUsers.length === 1 ? 'has' : 'have'
    } most 👩‍💻 **activity** in the files. \n${
      ADDITIONAL_FORMATTING[provider] || ADDITIONAL_FORMATTING.default
    }`;
  }
  if (knowledgeUsers.length) {
    comment += `${knowledgeUsers.join(', ')} ${
      knowledgeUsers.length === 1 ? 'has' : 'have'
    } most 🧠 **knowledge** in the files. \n`;
  }
  return comment;
};

const explainActivityByMonth = (
  activity: any,
  file: string,
  activityUsers: string[]
) => {
  let monthsComment = '';
  const months: string[] = [];
  for (let index = 0; index < 6; index++) {
    months.push(MONTH[moment().subtract(index, 'months').format('MM')]);
  }
  months.forEach((month) => {
    const user1Value = activity[file][activityUsers[0]][month];
    const user2Value = activity[file][activityUsers[1]]?.[month];
    monthsComment += `| ${month} | ${
      user1Value
        ? user1Value.additions +
          ' additions & ' +
          user1Value.deletions +
          ' deletions'
        : ' '
    } |`;
    monthsComment += `${
      user2Value
        ? user2Value.additions +
          ' additions & ' +
          user2Value.deletions +
          ' deletions |'
        : ' '
    } \n`;
  });
  return monthsComment;
};

const explainActivityTable = (
  file: string,
  activity: any,
  activityUsers: string[]
) => {
  if (!Object.keys(activity).length) {
    return '\n\nNo activity in the last 6 months\n\n'; // can be extract to const NO_ACTIVITY_MESSAGE
  }
  if (activityUsers.length) {
    let table = `\n\nActivity based on git-commit: \n\n |  | ${
      activityUsers[0] ? activityUsers[0] : ' '
    } | ${
      activityUsers[1]
        ? activityUsers[1] + '| \n | --- | --- | --- | \n '
        : ' \n | --- | --- | \n'
    }`;
    table += explainActivityByMonth(activity, file, activityUsers);
    return table;
  }
  return '';
};

const explainKnowledgeSection = (
  file: string,
  knowledge: any,
  knowledgeUsers: string[],
  provider: string
) => {
  let knowledgeText = '';
  const sortedAuthors = sortObject(knowledgeUsers, knowledge[file]);
  sortedAuthors.forEach((author) => {
    knowledgeText += knowledge[file][author]
      ? `${author}: ${knowledge[file][author]}% \n${
          ADDITIONAL_FORMATTING[provider] || ADDITIONAL_FORMATTING.default
        }`
      : '';
  });
  return knowledgeText;
};

export const explainActivityAndBlameComment = (
  files: string[],
  activity: any,
  knowledge: any,
  activityUsers: string[],
  knowledgeUsers: string[],
  provider: string
) => {
  try {
    let comment = '<details>\n <summary>See details</summary>\n\n';
    files.forEach((file) => {
      comment += `\n\`${file}\` \n ${explainActivityTable(
        file,
        activity,
        activityUsers
      )} \n\nKnowledge based on git-blame: \n ${
        ADDITIONAL_FORMATTING[provider] || ADDITIONAL_FORMATTING.default
      }${explainKnowledgeSection(file, knowledge, knowledgeUsers, provider)}`;
    });
    comment += `\n</details>\n`;
    return comment;
  } catch (error) {
    console.log('Error in creating explain code experts comment', error);
    return '';
  }
};

const parseActivityByUserDataForExplain = (
  activity: any,
  file: string,
  user: string
) => {
  return Object.keys(activity[file]).reduce((ac, date) => {
    if (activity[file][date][user]) {
      const formatedDate: string = MONTH[date.split('-')?.[1]];
      return {
        ...ac,
        [formatedDate]: activity[file][date][user],
      };
    }
    return ac;
  }, {});
};
const parseActivityByUserForExplain = (
  activity: any,
  file: string,
  activeUsers: string[]
) => {
  return activeUsers.reduce((au, user) => {
    const activityData = parseActivityByUserDataForExplain(
      activity,
      file,
      user
    );
    return { ...au, [user]: activityData };
  }, {});
};

export const getExplainActivity = (
  activity: ActivityExplain,
  activeUsers: string[]
) => {
  return Object.keys(activity || {}).reduce((acc, file) => {
    const userActivity = parseActivityByUserForExplain(
      activity,
      file,
      activeUsers
    );
    return { ...acc, [file]: userActivity };
  }, {});
};

export const getExplainKnowledge = (
  blame: FileMetric,
  knowledgeUsers: string[]
) => {
  return Object.keys(blame || {}).reduce((acc, file) => {
    const sortedAuthors = sortObject(knowledgeUsers, blame[file]);
    const userKnowledge = sortedAuthors.reduce((au, user) => {
      if (blame[file][user]) {
        return {
          ...au,
          [user]: Math.round(blame[file][user] * 100),
        };
      }
      return au;
    }, {});
    return { ...acc, [file]: userKnowledge };
  }, {});
};
