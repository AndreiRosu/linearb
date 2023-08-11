import { IPRContext } from '../../../context/types';
import { handleAnalytics } from '../../common';
import { HighLevelFilters } from '../../high-level-filters';
import {
  extractJitCommentsFromPR,
  initEmptyJitObject,
  parseJitReview,
  unifyReviews,
} from './helpers';
import _ from 'lodash';

export const parseJitComments = (pr: IPRContext): string => {
  handleAnalytics(HighLevelFilters.extractJitFindings, []);
  const jitComments = extractJitCommentsFromPR(pr);
  const jitObject = initEmptyJitObject();
  if (_.isEmpty(jitComments)) {
    return JSON.stringify(jitObject);
  }
  const parsedReviews = jitComments.map(parseJitReview);
  return JSON.stringify(unifyReviews(parsedReviews, jitObject));
};
