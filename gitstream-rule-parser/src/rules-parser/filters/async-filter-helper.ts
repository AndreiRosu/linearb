import axios from 'axios';
import { API_ENDPOINTS } from '../../consts';
import { rankByLinesArgs } from './filter-types';

//TODO: map request to object
export const getETR = async (request: any) => {
  const {
    data: { numericValue },
  } = await axios.post(API_ENDPOINTS.REVIEW_TIME, request, {
    headers: {
      'Content-type': 'application/json',
    },
  });
  return { numericValue };
};

//TODO: map request to object
export const getExpertReviewer = async (request: any) => {
  if (request) {
    const { data } = await axios.post(API_ENDPOINTS.EXPERT_REVIWER, request, {
      headers: {
        'Content-type': 'application/json',
      },
    });
    return data || {};
  }
  return {};
};

export const filterExpertResult = (
  data: any,
  gt: number,
  lt: number,
  filterBy: string
) => {
  const thresholdData = Object.keys(data).reduce((acc, user) => {
    if (
      gt !== undefined
        ? data[user][filterBy] > gt / 100
        : data[user][filterBy] < lt / 100
    ) {
      return { ...acc, [user]: data[user] };
    }
    return acc;
  }, {});

  return (
    Object.keys(thresholdData).filter(
      (contributor) => !contributor.includes('@') && !contributor.includes('<>')
    ) || []
  );
};

export const parseExpertReviewerThreshold = (args: rankByLinesArgs): number => {
  const { gt, lt } = args;
  return gt ? gt : lt ? lt : 0.1;
};

export const getAndFilterExpertReviewer = async (repo: any) => {
  const data = await getExpertReviewer(
    repo.data_service?.expert_reviwer_request
  );
  if (!Object.keys(data).length) {
    return { data: {}, dataWithoutIssuer: {}, isIssuerFiltered: false };
  }

  let isIssuerFiltered = false;
  const dataWithoutIssuer = Object.keys(data).reduce((acc, author) => {
    if (author === repo.pr_author) {
      isIssuerFiltered = true;
      return acc;
    }
    return { ...acc, [author]: data[author] };
  }, {});
  return { data, dataWithoutIssuer, isIssuerFiltered };
};
