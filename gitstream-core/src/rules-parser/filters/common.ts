import { FiltersUsage } from './filter-types';

export const internalIncludes = (file: string, searchTerm: string) =>
  file?.includes(searchTerm);

export const internalRegex = (
  file: string,
  searchTerm: string,
  multiline: boolean = false
) => {
  // possible inputs are regular expressions as 'strings' or /regex/ standard javascript
  // literals. a 3rd input is a string with a nunjuks 'r/regex/', this happens when a
  // a nunjucks regex expression is injected back into the context.
  // this 3rd type is non standard RegExp and therefore should inverted back.

  // if it is a nunjuks regex string, convert it to compatible RegExp string
  if (typeof searchTerm === 'string' && searchTerm.startsWith('r/')) {
    // from the nunjuks regex patterns remove the 'r/' and the last '/'
    searchTerm = searchTerm.substring(2).slice(0, -1);
    // replace any \/ back to /
    searchTerm = searchTerm.replace('\\/', '/');
  }

  const re = new RegExp(searchTerm, multiline ? 'm' : '');
  return re.test(file);
};

export const internalEvery = (arr: boolean[], value: boolean) => {
  const bools = arr?.map((item) => Boolean(item));
  return bools?.length ? bools.every((element) => element === value) : false;
};

export const formatInputToList = (input: any): any[] => {
  if (typeof input === 'string') {
    if (input.includes(',')) {
      return input.split(',');
    } else {
      return [input];
    }
  }
  return input ?? [];
};

const PROVIDER = {
  GITHUB: 'github',
  GITLAB: 'gitlab',
  BITBUCKET: 'bitbucket',
};

export const PROVIDER_NAME: any = {
  [PROVIDER.GITHUB]: 'GitHub',
  [PROVIDER.GITLAB]: 'GitLab',
  [PROVIDER.BITBUCKET]: 'BitBucket',
};

export const DOCS_LINK_COMMENT =
  '\n \nTo learn more about /:\\ gitStream - [Visit our Docs](https://docs.gitstream.cm/) \n \n';

export const MONTH: { [key: string]: string } = {
  '01': 'JAN',
  '02': 'FEB',
  '03': 'MAR',
  '04': 'APR',
  '05': 'MAY',
  '06': 'JUN',
  '07': 'JUL',
  '08': 'AUG',
  '09': 'SEP',
  '10': 'OCT',
  '11': 'NOV',
  '12': 'DEC',
};

export class FiltersForAnalytics {
  public static filters: FiltersUsage = {};
}

export const handleAnalytics = (filterName: string, filterArgs: any[]) => {
  FiltersForAnalytics.filters = {
    ...FiltersForAnalytics.filters,
    [filterName]: { args: filterArgs },
  };
};
