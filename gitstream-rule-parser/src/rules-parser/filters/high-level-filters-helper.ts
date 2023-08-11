import { ADDITIONAL_FORMATTING } from '../../utils/providers';
import { DOCS_LINK_COMMENT } from './common';
import {
  FileMetric,
  Metric,
  Activity,
  ExplainObject,
  rankByLinesArgs,
} from './filter-types';

const calculateSumByAuthor = (
  authorMetric: FileMetric,
  author: string
): Metric =>
  Object.values(authorMetric).reduce((aa: Metric, item: Metric) => {
    const precent = item[author];
    const totalPercent = (precent ?? 0) + (aa[author] ?? 0);
    return { ...aa, ...(totalPercent && { [author]: totalPercent }) };
  }, {});

export const convertAndSumContributors = (
  contributors: Metric,
  gitToProviderUser: any
): Metric => {
  return Object.keys(contributors).reduce((acc: Metric, gitAuthor: string) => {
    let score = contributors[gitAuthor];
    if (acc[gitToProviderUser[gitAuthor]]) {
      score = contributors[gitAuthor] + acc[gitToProviderUser[gitAuthor]];
    }
    const author =
      gitToProviderUser[gitAuthor]?.includes('@') ||
      !gitToProviderUser[gitAuthor]
        ? gitAuthor + '\\*'
        : gitToProviderUser[gitAuthor];
    return { ...acc, [author]: score };
  }, {});
};

export const convertContributorsAndBlame = (repo: any) => {
  const blame = Object.keys(repo.blame).reduce(
    (acc: FileMetric, file: string) => {
      return {
        ...acc,
        [file]: convertAndSumContributors(
          repo.blame[file],
          repo.git_to_provider_user
        ),
      };
    },
    {}
  );
  return { blame };
};

export const sumAuthorMetrics = (
  contributors: string[],
  authorMetric: FileMetric
): Metric => {
  const numOfFiles = Object.keys(authorMetric).length;
  return contributors.reduce((acc: Metric, author: string) => {
    const sumByAuthor: Metric = calculateSumByAuthor(authorMetric, author);
    return {
      ...acc,
      ...(sumByAuthor[author] && {
        [author]: sumByAuthor[author] / numOfFiles,
      }),
    };
  }, {});
};

export const convertToProviderUser = (repo: any, gitObject: Metric) =>
  Object.keys(gitObject).reduce((acc: Metric, gitAuthor: string) => {
    if (repo.git_to_provider_user[gitAuthor]) {
      return {
        ...acc,
        [repo.git_to_provider_user[gitAuthor]]:
          gitObject[gitAuthor] || gitAuthor,
      };
    }
    return acc;
  }, {});

export const calculateActivityPerFile = (
  activity: Activity,
  weeksArr: string[]
): FileMetric =>
  Object.keys(activity).reduce((acc, file) => {
    const totalPerFile = Object.values(activity[file]).reduce(
      (ac: Metric, linesPerWeek: Metric) => {
        weeksArr.forEach((week) => {
          const item = linesPerWeek[week];
          if (item) {
            ac[week] = (ac[week] ?? 0) + item;
          }
        });
        return { ...ac };
      },
      {}
    );
    return { ...acc, [file]: totalPerFile };
  }, {});

export const calculateFileSumPerAuthorActivity = (
  activity: Activity,
  weeksArr: string[],
  totalsPerFile: FileMetric
): FileMetric =>
  Object.keys(activity).reduce((acc: FileMetric, file: string) => {
    const calcPercent: Metric = Object.keys(activity[file]).reduce(
      (acAuthor: Metric, author: string) => {
        let arrSum: number[] = [];
        weeksArr.forEach((week: string) => {
          if (totalsPerFile[file][week] && activity[file][author][week]) {
            arrSum.push(
              (activity[file][author][week] / totalsPerFile[file][week]) * 100
            );
          }
        });
        const total: number =
          arrSum.reduce((a: number, b: number) => a + b, 0) / arrSum.length;
        return {
          ...acAuthor,
          ...(arrSum.length && { [author]: parseInt(total?.toFixed(0)) }),
        };
      },
      {}
    );
    return { ...acc, [file]: calcPercent };
  }, {});

export const sortObject = (data: any[], object: any) =>
  data.sort((a: any, b: any) => (object[b] ?? 0) - (object[a] ?? 0));

const compareThan = (data: Metric, gt: number, lt: number) => {
  const authors = Object.keys(data).filter((author: string) =>
    gt !== undefined ? data[author] > gt : data[author] < lt
  );
  const sortedAuthors = sortObject(authors, data);

  return sortedAuthors.reduce((acc: any, author: string) => {
    if (author.includes('*')) {
      return acc;
    }
    return { ...acc, ...{ [author]: data[author] } };
  }, {});
};

export const validateAndCompare = (
  authorMetrics: Metric,
  gt: number,
  lt: number
): Metric | {} =>
  Object.keys(authorMetrics).length ? compareThan(authorMetrics, gt, lt) : {};

export const convertBlameContextToExplain = (repo: any) => {
  const { blame } = convertContributorsAndBlame(repo);
  return Object.keys(blame).reduce((acc: any, file: string) => {
    if (file === '/dev/null') {
      return acc;
    }
    const sortedAuthors = sortObject(Object.keys(blame[file]), blame[file]);
    const formattedValues = sortedAuthors.reduce(
      (accAuthor: ExplainObject, author) => {
        if (!blame[file][author]) {
          return accAuthor;
        }
        const formatGitAuthor = author.replace(/\"\“/g, '').replace('“', '');
        let formattedValue = `${
          Math.floor(blame[file][author])
            ? Math.floor(blame[file][author])
            : '<1'
        }%`;
        if (
          accAuthor[formatGitAuthor] &&
          parseInt(accAuthor[formatGitAuthor]) > parseInt(formattedValue)
        ) {
          formattedValue = accAuthor[formatGitAuthor];
        }
        return { ...accAuthor, [formatGitAuthor]: formattedValue };
      },
      {}
    );
    return { ...acc, [file]: formattedValues };
  }, {});
};

const suggestedReviewersComment = (
  authorFilteredParseResult: string,
  argsTemplate: string,
  numOfPRFiles: number,
  isNoUserButYou: boolean
) => {
  const formattedComment = authorFilteredParseResult
    ? ` 👋  **Suggested reviewers: ${authorFilteredParseResult}**\n \nThey contributed ${argsTemplate} of the lines on pre-existing files`
    : ` 👋  **Suggested reviewers: no user ${
        isNoUserButYou ? 'but you' : ''
      } matched**\n \nNo ${
        numOfPRFiles ? 'other ' : ''
      }user contributed ${argsTemplate} of the lines on pre-existing files`;
  return formattedComment;
};

export const explainBlameTemplate = (
  args: rankByLinesArgs,
  authorFilteredParseResult: string,
  formattedBlameContext: any,
  provider: string,
  isNoUserButYou: boolean
) => {
  const { gt, lt } = args;
  const argsTemplate = gt ? `more than ${gt}%` : `less than ${lt}%`;

  const numOfPRFiles = Object.keys(formattedBlameContext).length;
  let parserResultTemplate = suggestedReviewersComment(
    authorFilteredParseResult,
    argsTemplate,
    numOfPRFiles,
    isNoUserButYou
  );
  parserResultTemplate += numOfPRFiles ? ':\n' : '. \n ';
  parserResultTemplate += Object.keys(formattedBlameContext).length
    ? '<details>\n <summary>See details</summary>\n'
    : '';
  parserResultTemplate += '\n';
  Object.keys(formattedBlameContext).forEach((file) => {
    if (Object.keys(formattedBlameContext[file]).length === 0) {
      return;
    }
    parserResultTemplate += `\n\`${file}\` \n${
      ADDITIONAL_FORMATTING[provider] || ADDITIONAL_FORMATTING.default
    }`; //Supporting new lines format for gitlab
    Object.keys(formattedBlameContext[file]).forEach((author) => {
      parserResultTemplate += `${author}: ${
        formattedBlameContext[file][author]
      } \n${ADDITIONAL_FORMATTING[provider] || ADDITIONAL_FORMATTING.default}`; //Supporting new lines format for gitlab
    });
  });
  parserResultTemplate += '\n</details>\n';
  const isGitUser = Object.values(formattedBlameContext)
    .map((item: any) => Object.keys(item).some((x) => x.includes('*')))
    .some((result) => result);

  parserResultTemplate += isGitUser
    ? ` \nGit users that could not be automatically mapped are marked with \`*\`.\n${
        ADDITIONAL_FORMATTING[provider] || ADDITIONAL_FORMATTING.default
      }To map these users, refer to the instructions [here](https://docs.gitstream.cm/cm-file#config).\n \n`
    : ''; //Supporting new lines format for gitlab
  parserResultTemplate += DOCS_LINK_COMMENT;
  return parserResultTemplate;
};
