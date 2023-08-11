// @ts-nocheck

import { NOT_FOUND_FILE_PATH } from '../common/const';
import { ExpertReviewerContext } from './requests/expertReviewerContext';
import { ExpertReviewerRequest } from './requests/expertReviewerRequest';

const buildPrFiles = (repo, files) => {
  const tempPrFiles = files.reduce((acc, file) => {
    if (file === NOT_FOUND_FILE_PATH) {
      return acc;
    }
    return {
      ...acc,
      [file]: {
        ...{ blame: repo.ds_blame?.[file] || '' },
        ...{ activity: repo.ds_activity?.[file] || '' },
      },
    };
  }, {});
  return Object.keys(tempPrFiles).reduce((acc, file) => {
    if (!Object.keys(tempPrFiles[file]).length) {
      return acc;
    }
    return { ...acc, [file]: tempPrFiles[file] };
  }, {});
};

export const getExpertReviewer = (repo, files, payload) => {
  const context = new ExpertReviewerContext(payload).get();
  const prFiles = buildPrFiles(repo, files);
  return new ExpertReviewerRequest(
    repo.git_to_provider_user,
    prFiles,
    context
  ).get();
};
