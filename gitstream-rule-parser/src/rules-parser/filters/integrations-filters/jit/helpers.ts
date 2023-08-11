import _ from 'lodash';
import { Jit, Severity } from './types';
import { IPRContext } from '../../../context/types';

const JIT_USER = 'jit-ci';

export const parseJitReview = (review: any): Jit => {
  const parsedReview: Jit = initEmptyJitObject();
  const conversations = review.conversations;
  conversations.forEach((conversation: any) => {
    const content = conversation.content;
    const lines = content.split('\n');
    const security_control = lines[0]?.split('**')[2]?.trim();
    const type = lines[2]?.split('**')[2]?.trim();
    const description = lines[4]?.split('**')[2]?.trim();
    const severity: Severity = lines[6]?.split('**')[2]?.trim();
    const _summary =
      lines[10]?.split('<summary>')[1]?.split('</summary>')[0] ?? '';
    const summary = _summary.replace(/<b>/g, '').replace(/<\/b>/g, '');
    parsedReview.vulnerabilities.push({
      security_control,
      type,
      description,
      severity,
      summary,
    });
    parsedReview.metrics[severity] = (parsedReview.metrics[severity] ?? 0) + 1;
  });
  return parsedReview;
};

export const unifyReviews = (parsedReviews: Jit[], jitObject: Jit) => {
  return parsedReviews.reduce(
    (acc: any, review: any) => {
      console.log({ acc, review });
      return {
        ...acc,
        vulnerabilities: [...acc.vulnerabilities, ...review.vulnerabilities],
        metrics: _.mergeWith(
          acc.metrics,
          review.metrics,
          (a, b) => (a || 0) + (b || 0)
        ),
      };
    },
    { ...jitObject }
  );
};

export const extractJitCommentsFromPR = (pr: IPRContext) => {
  return pr.reviews.filter(
    ({ commenter }: { commenter: string }) => commenter === JIT_USER
  );
};

export const initEmptyJitObject = () => {
  return {
    vulnerabilities: [],
    metrics: {
      HIGH: null,
      MEDIUM: null,
      LOW: null,
      INFO: null,
    },
  };
};
