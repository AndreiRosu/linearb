import { GIT_PROVIDER } from '../const';
import { sendAmplitudeEvent } from './amplitude.service';
import { sendSegmentEvent } from './segment.service';

export const generatePrUrl = (
  context: any,
  { owner, repo, pullRequestNumber }: any
): String => {
  return context.repo?.provider === GIT_PROVIDER.GITHUB
    ? `${GIT_PROVIDER.GITHUB}.com/${owner}/${repo}/pull/${pullRequestNumber}`
    : `${GIT_PROVIDER.GITLAB}.com/${owner}/${repo}/-/merge_requests/${pullRequestNumber}`;
};

export const filterAnalyticsHandler = async (
  analytics: any,
  payload: any,
  context: any
) => {
  for (const filterName of Object.keys(analytics) || {}) {
    await sendAmplitudeEvent(
      payload,
      filterName,
      analytics[filterName].args,
      context
    );

    await sendSegmentEvent(
      payload,
      filterName,
      analytics[filterName].args,
      context
    );
  }
};
