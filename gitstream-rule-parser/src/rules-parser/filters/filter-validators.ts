import { rankByLinesArgs } from './filter-types';

export const isGtLtArgsValid = (args: rankByLinesArgs) => {
  const { gt, lt } = args;
  return !!gt || !!lt;
};
