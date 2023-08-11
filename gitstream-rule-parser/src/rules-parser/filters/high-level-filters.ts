import { File } from '../context/types';
import { handleAnalytics, internalRegex } from './common';
import {
  Metric,
  matchDiffLinesArgs,
  rankByGitActivityArgs,
  rankByLinesArgs,
  FileMetric,
  EnumArgs,
} from './filter-types';
import _ from 'lodash';
import {
  calculateFileSumPerAuthorActivity,
  calculateActivityPerFile,
  sumAuthorMetrics,
  validateAndCompare,
  convertBlameContextToExplain,
  explainBlameTemplate,
  convertContributorsAndBlame,
  convertAndSumContributors,
} from './high-level-filters-helper';
import { isGtLtArgsValid } from './filter-validators';
import {
  estimatedReviewTime,
  parseCodeExperts,
  parseExpertReviewer,
  parseExplainCodeExperts,
  parseExplainExpertReviewer,
} from './async-filters';
import { format } from '../../utils/formatters';
import parseSonarParser from './integrations-filters/sonar';
import jitFilter from './integrations-filters/jit';

const parseExtractSonarFindings = (pr: any): string => {
  handleAnalytics(HighLevelFilters.extractSonarFindings, []);
  return parseSonarParser(pr);
};

const parserMapToEnum = (key: string, args: EnumArgs) => {
  handleAnalytics(HighLevelFilters.mapToEnum, [key, args]);
  const enumArgs = args?.enum;
  if (enumArgs && Object.keys(enumArgs).length) {
    return enumArgs[key];
  }
};

const parseFilterAllTests = (files: string[], extensions: string[]) => {
  const regex = new RegExp(`[^a-zA-Z0-9](${extensions.join('|')})[^a-zA-Z0-9]`);
  return (
    Boolean(files.length) &&
    files
      .map((filePath: string) => regex.test(filePath || ''))
      .every((x: boolean) => x)
  );
};

const parseFilterAllFilePath = (files: string[], searchArray: string[]) =>
  Boolean(files.length) &&
  files
    .map((filePath: string) =>
      searchArray.some((term: string) => (filePath || '').includes(term))
    )
    .every((x: boolean) => x);

const parseFilterAllExtensions = (files: string[], extensions: string[]) =>
  files.length
    ? parseFilterAllFilePath(
        files.map((filePath: string) => filePath.split('.').pop() || ''),
        extensions
      )
    : false;

const getUniqueExtensions = (files: string[]) => {
  handleAnalytics(HighLevelFilters.extensions, []);
  return (
    files
      // extensions
      .map((x: string) => x.split('.').pop())
      // unique
      .filter((value, index, array) => array.indexOf(value) === index)
  );
};

const parseIsFormattingChange = (files: File[]) => {
  try {
    handleAnalytics(HighLevelFilters.isFormattingChange, []);
    const allFormatting =
      Boolean(files.length) &&
      files.every(
        ({ new_content, original_content, original_file, new_file }) => {
          const formattedNew = format(new_content, new_file);
          const formattedOld = format(original_content, original_file);
          return formattedNew === formattedOld;
        }
      );
    return allFormatting;
  } catch (e) {
    return false;
  }
};

const parseMatchDiffLines = (files: File[], args: matchDiffLinesArgs) => {
  handleAnalytics(HighLevelFilters.matchDiffLines, [args]);
  const { regex, ignoreWhiteSpaces } = args;
  const diffLinesRegex = new RegExp('^[+-]');
  const emptyLinesRegex = new RegExp('^[+-]\\s*$');
  return !regex
    ? []
    : files
        .map(({ diff }) =>
          diff
            .split('\n')
            .filter((row) => diffLinesRegex.test(row))
            .filter((row) =>
              ignoreWhiteSpaces ? !emptyLinesRegex.test(row) : true
            )
            .map((diffRow) => internalRegex(diffRow, regex))
        )
        .flat(1);
};

const parseIsFirstCommit = (contributors: any, author: string) => {
  handleAnalytics(HighLevelFilters.isFirstCommit, [{ author }]);
  return _.get(contributors, author, null) ? false : true;
};

const parseRankByGitBlame = (repo: any, args: rankByLinesArgs) => {
  handleAnalytics(HighLevelFilters.rankByGitBlame, [args]);
  if (!isGtLtArgsValid(args)) {
    return [];
  }
  const { gt, lt } = args;
  const { blame } = convertContributorsAndBlame(repo);
  const blameByAuthor = sumAuthorMetrics(
    Object.values(repo.git_to_provider_user),
    blame
  );
  const comparedResult = validateAndCompare(blameByAuthor, gt, lt);
  return Object.keys(comparedResult).length
    ? [...Array.from(new Set(Object.keys(comparedResult)))]
    : [];
};

const parseRankByGitActivity = (repo: any, args: rankByGitActivityArgs) => {
  handleAnalytics(HighLevelFilters.rankByGitActivity, [args]);
  const { gt, lt, weeks } = args;
  if ((!gt && !lt) || !weeks) {
    return [];
  }
  const weeksArr: string[] = new Array(weeks + 1)
    .fill(0)
    .map((_, i) => `week_${i}`);

  const totalsPerFile: FileMetric = calculateActivityPerFile(
    repo.git_activity,
    weeksArr
  );
  const fileSumPerAuthor: FileMetric = calculateFileSumPerAuthorActivity(
    repo.git_activity,
    weeksArr,
    totalsPerFile
  );
  const activityByAuthor: Metric = sumAuthorMetrics(
    Object.keys(repo.contributors),
    fileSumPerAuthor
  );
  const convertContributors = convertAndSumContributors(
    activityByAuthor,
    repo.git_to_provider_user
  );
  const comparedResult: Metric = validateAndCompare(
    convertContributors,
    gt,
    lt
  );

  return Object.keys(comparedResult).length
    ? [...Array.from(new Set(Object.keys(comparedResult)))]
    : [];
};

const parseExplainRankByGitBlame = (repo: any, args: rankByLinesArgs) => {
  handleAnalytics(HighLevelFilters.explainRankByGitBlame, [args]);
  if (!isGtLtArgsValid(args)) {
    return {};
  }
  const parseResult = parseRankByGitBlame(repo, args);
  const authorFilteredParseResult = _.filter(
    parseResult,
    (contributor) => contributor !== repo.pr_author
  );
  const authorFilteredParseResultString = authorFilteredParseResult.join(', ');
  const isNoUserButYou =
    !authorFilteredParseResult.length && parseResult.length > 0;

  const formattedBlameContext = convertBlameContextToExplain(repo);
  return `base64: ${Buffer.from(
    explainBlameTemplate(
      args,
      authorFilteredParseResultString,
      formattedBlameContext,
      repo.provider,
      isNoUserButYou
    )
  ).toString('base64')}`;
};

export enum HighLevelFilters {
  allDocs = 'allDocs',
  allImages = 'allImages',
  allTests = 'allTests',
  estimatedReviewTime = 'estimatedReviewTime',
  extensions = 'extensions',
  isFormattingChange = 'isFormattingChange',
  matchDiffLines = 'matchDiffLines',
  isFirstCommit = 'isFirstCommit',
  rankByGitBlame = 'rankByGitBlame',
  rankByGitActivity = 'rankByGitActivity',
  explainRankByGitBlame = 'explainRankByGitBlame',
  expertReviewer = 'expertReviewer',
  explainExpertReviewer = 'explainExpertReviewer',
  codeExperts = 'codeExperts',
  explainCodeExperts = 'explainCodeExperts',
  sonarParser = 'sonarParser',
  mapToEnum = 'mapToEnum',
  extractSonarFindings = 'extractSonarFindings',
  extractJitFindings = 'extractJitFindings',
}

const FILTERED_OUT_LIST = {
  [HighLevelFilters.allDocs]: ['requirements.txt'],
};

export const FILTERS_EXTENSION_LIST = {
  [HighLevelFilters.allDocs]: ['md', 'mkdown', 'txt', 'rst', '.adoc'],
  [HighLevelFilters.allImages]: ['svg', 'png', 'gif'],
  [HighLevelFilters.allTests]: ['test', 'spec'],
};

export const HIGH_LEVEL_FILTERS_HANDLER: any = {
  [HighLevelFilters.allDocs]: (files: string[]) => {
    handleAnalytics(HighLevelFilters.allDocs, []);
    return (
      Boolean(files.length) &&
      files.every((file) =>
        FILTERED_OUT_LIST[HighLevelFilters.allDocs].every(
          (excludedFile) =>
            !(file.includes('/' + excludedFile) || file === excludedFile)
        )
      ) &&
      parseFilterAllExtensions(
        files,
        FILTERS_EXTENSION_LIST[HighLevelFilters.allDocs]
      )
    );
  },
  [HighLevelFilters.allImages]: (files: string[]) => {
    handleAnalytics(HighLevelFilters.allImages, []);
    return parseFilterAllExtensions(
      files,
      FILTERS_EXTENSION_LIST[HighLevelFilters.allImages]
    );
  },
  [HighLevelFilters.allTests]: (files: string[]) => {
    handleAnalytics(HighLevelFilters.allTests, []);
    return parseFilterAllTests(
      files,
      FILTERS_EXTENSION_LIST[HighLevelFilters.allTests]
    );
  },
  [HighLevelFilters.estimatedReviewTime]: estimatedReviewTime,
  [HighLevelFilters.extensions]: getUniqueExtensions,
  [HighLevelFilters.isFormattingChange]: parseIsFormattingChange,
  [HighLevelFilters.matchDiffLines]: parseMatchDiffLines,
  [HighLevelFilters.isFirstCommit]: parseIsFirstCommit,
  [HighLevelFilters.rankByGitBlame]: parseRankByGitBlame,
  [HighLevelFilters.rankByGitActivity]: parseRankByGitActivity,
  [HighLevelFilters.explainRankByGitBlame]: parseExplainRankByGitBlame,
  [HighLevelFilters.expertReviewer]: parseExpertReviewer,
  [HighLevelFilters.explainExpertReviewer]: parseExplainExpertReviewer,
  [HighLevelFilters.codeExperts]: parseCodeExperts,
  [HighLevelFilters.explainCodeExperts]: parseExplainCodeExperts,
  [HighLevelFilters.sonarParser]: parseSonarParser,
  [HighLevelFilters.mapToEnum]: parserMapToEnum,
  [HighLevelFilters.extractSonarFindings]: parseExtractSonarFindings,
  ...jitFilter,
};

export const ASYNC: any = {
  [HighLevelFilters.estimatedReviewTime]: true,
  [HighLevelFilters.expertReviewer]: true,
  [HighLevelFilters.explainExpertReviewer]: true,
  [HighLevelFilters.codeExperts]: true,
  [HighLevelFilters.explainCodeExperts]: true,
};
