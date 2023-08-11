import { rankByLinesArgs } from './filter-types';
import { FileMetadata } from '../context/types';
import {
  filterExpertResult,
  getAndFilterExpertReviewer,
  getETR,
  parseExpertReviewerThreshold,
} from './async-filter-helper';
import { DOCS_LINK_COMMENT, handleAnalytics } from './common';
import {
  explainActivityAndBlameComment,
  explainExpertReviewerComment,
  getExplainActivity,
  getExplainKnowledge,
} from './explain-expert-filter-helper';
import { HighLevelFilters } from './high-level-filters';

const DELETED_PATH = '/dev/null';

export const estimatedReviewTime = async (branch: any, callback: any) => {
  handleAnalytics(HighLevelFilters.estimatedReviewTime, []);
  const numOfFiles = branch.diff?.files_metadata.length;
  const { additionalLines, deletedLines } = branch.diff?.files_metadata.reduce(
    (acc: any, file: FileMetadata) => {
      acc.additionalLines += file.additions;
      acc.deletedLines += file.deletions;
      return acc;
    },
    { additionalLines: 0, deletedLines: 0 }
  );
  const prFiles = branch.diff?.files_metadata.map(
    (fileMetadata: FileMetadata) => ({
      file_path:
        fileMetadata.new_file !== DELETED_PATH
          ? fileMetadata.new_file
          : fileMetadata.original_file,
      additions: fileMetadata.additions,
      deletions: fileMetadata.deletions,
    })
  );
  const reqBody = {
    prMetadata: {
      commits: branch.num_of_commits,
      files: numOfFiles,
      lines: additionalLines + deletedLines,
    },
    prFiles: prFiles,
    prAdditionalLines: additionalLines,
    prDeletedLines: deletedLines,
    baseBranch: branch.base,
    request_source: 'gitstream',
  };

  const { numericValue } = await getETR(reqBody);
  callback(null, numericValue);
};

export const parseExpertReviewer = async (
  repo: any,
  { gt = 0, lt = 0 }: rankByLinesArgs,
  callback: any
) => {
  try {
    handleAnalytics(HighLevelFilters.expertReviewer, [{ gt, lt }]);
    const { dataWithoutIssuer } = await getAndFilterExpertReviewer(repo);
    if (!Object.keys(dataWithoutIssuer).length) {
      callback(null, []);
    }

    const expertReviewers = filterExpertResult(
      dataWithoutIssuer,
      gt,
      lt,
      'reviewer_score'
    ).slice(0, 2);
    callback(null, expertReviewers);
  } catch (error) {
    console.log('error:', error);
    callback(null, []);
  }
};

export const parseExplainCodeExpertHandler = async (
  repo: any,
  args: rankByLinesArgs,
  callback: any
) => {
  try {
    const { gt, lt } = args;
    const { data, dataWithoutIssuer, isIssuerFiltered } =
      await getAndFilterExpertReviewer(repo);
    if (!Object.keys(data).length || !Object.keys(dataWithoutIssuer).length) {
      callback(null, []);
    }
    const expertReviewers = filterExpertResult(
      dataWithoutIssuer,
      gt,
      lt,
      'reviewer_score'
    ).slice(0, 2);
    const activeUsers = filterExpertResult(
      data,
      gt,
      lt,
      'avg_activity_score'
    ).slice(0, 2);
    const knowledgeUsers = filterExpertResult(
      data,
      gt,
      lt,
      'avg_blame_perc'
    ).slice(0, 2);

    const explainActivity = getExplainActivity(
      data.explain?.activity,
      activeUsers
    );

    const explainKnowledge = getExplainKnowledge(
      data.explain?.blame,
      knowledgeUsers
    );

    const explainComment = `${explainExpertReviewerComment(
      expertReviewers,
      activeUsers,
      knowledgeUsers,
      parseExpertReviewerThreshold(args),
      repo.provider,
      isIssuerFiltered && !Object.keys(expertReviewers).length
    )} ${explainActivityAndBlameComment(
      Array.from(
        new Set([
          ...Object.keys(explainActivity),
          ...Object.keys(explainKnowledge),
        ])
      ),
      explainActivity,
      explainKnowledge,
      activeUsers,
      knowledgeUsers,
      repo.provider
    )} \n\n ${DOCS_LINK_COMMENT} \n`;

    const base64Comment = `base64: ${Buffer.from(explainComment).toString(
      'base64'
    )}`;

    callback(null, base64Comment);
  } catch (error) {
    console.log('error:', error);
    callback(``);
  }
};

export const parseCodeExperts = async (
  repo: any,
  { gt = 0, lt = 0 }: rankByLinesArgs,
  callback: any
) => {
  handleAnalytics(HighLevelFilters.codeExperts, [{ gt, lt }]);
  await parseExpertReviewer(repo, { gt, lt }, callback);
};

export const parseExplainExpertReviewer = async (
  repo: any,
  args: rankByLinesArgs,
  callback: any
) => {
  handleAnalytics(HighLevelFilters.explainExpertReviewer, [args]);
  await parseExplainCodeExpertHandler(repo, args, callback);
};

export const parseExplainCodeExperts = async (
  repo: any,
  args: rankByLinesArgs,
  callback: any
) => {
  handleAnalytics(HighLevelFilters.explainCodeExperts, [args]);
  await parseExplainCodeExpertHandler(repo, args, callback);
};
