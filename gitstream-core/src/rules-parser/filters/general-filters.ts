import _ from 'lodash';
import {
  formatInputToList,
  handleAnalytics,
  internalEvery,
  internalIncludes,
  internalRegex,
} from './common';
import { filterArgs } from './filter-types';

const parseSome = (list: boolean[]): boolean => {
  handleAnalytics(GeneralFilters.some, []);
  const formattedList = formatInputToList(list)?.map((item) => Boolean(item));
  return (
    Boolean(formattedList?.length) &&
    formattedList.some((match: boolean) => match)
  );
};

const parseEvery = (list: boolean[]): boolean => {
  handleAnalytics(GeneralFilters.every, []);
  return internalEvery(formatInputToList(list), true);
};

const termRegexOrList = (
  file: any,
  attribute: string,
  term: string,
  regex: string,
  list: any[]
) =>
  term
    ? internalIncludes(attribute ? file[attribute] : file, term)
    : regex
    ? internalRegex(attribute ? file[attribute] : file, regex)
    : list.some((search) =>
        internalIncludes(attribute ? file[attribute] : file, search)
      );

const filterList = (
  files: any,
  attribute: string,
  term: string,
  regex: string,
  list: any[],
  isReject: boolean
) => {
  return files.filter((file: any) =>
    isReject
      ? !termRegexOrList(file, attribute, term, regex, list)
      : termRegexOrList(file, attribute, term, regex, list)
  );
};

const mapList = (
  files: any,
  attribute: string,
  term: string,
  regex: string,
  list: any[],
  isReject: boolean
) =>
  files.map((file: any) =>
    isReject
      ? !termRegexOrList(file, attribute, term, regex, list)
      : termRegexOrList(file, attribute, term, regex, list)
  );

const calculateList = (
  files: any[],
  args: filterArgs,
  callbackName: string,
  isReject: boolean = false
) => {
  const attribute: string = args.attr || '';
  const { term, regex, list } = args;
  const formattedFiles = formatInputToList(files);
  if (!term && !regex && !list) {
    return [];
  }
  let formattedList = list;
  if (list) {
    formattedList = formatInputToList(list);
  }
  return callbackName === 'filterList'
    ? filterList(
        formattedFiles,
        attribute,
        term,
        regex,
        formattedList,
        isReject
      )
    : mapList(formattedFiles, attribute, term, regex, formattedList, isReject);
};

const parseFilter = (files: any[], args: filterArgs) => {
  handleAnalytics(GeneralFilters.filter, [args]);
  return calculateList(files, args, 'filterList');
};

const parseReject = (files: any[], args: filterArgs) => {
  handleAnalytics(GeneralFilters.reject, [args]);
  return calculateList(files, args, 'filterList', true);
};

const parseMap = (files: any[], { attr }: { attr: string }) => {
  handleAnalytics(GeneralFilters.map, [{ attr }]);
  return formatInputToList(files).map((file: any) => file[attr]);
};

const parseIncludes = (file: string, args: filterArgs) => {
  handleAnalytics(GeneralFilters.includes, [args]);
  const { term, regex, list } = args;
  if (!term && !regex && !list) {
    return false;
  }
  let formattedList = list;
  if (list) {
    formattedList = formatInputToList(list);
  }
  return term
    ? internalIncludes(file, term)
    : regex
    ? internalRegex(file, regex)
    : formattedList.some((term: any) => file.includes(term));
};

const parseMatch = (files: any[], args: filterArgs) => {
  handleAnalytics(GeneralFilters.match, [args]);
  return calculateList(files, args, 'mapList');
};

const parseNope = (arr: boolean[]) => {
  handleAnalytics(GeneralFilters.match, []);
  return internalEvery(formatInputToList(arr), false);
};

const parseIntersection = (listA: any[], args: { list: any[] }) => {
  handleAnalytics(GeneralFilters.intersection, [args]);
  const { list: listB } = args;
  if (!listB) {
    return false;
  }
  return _.intersection(listA, listB);
};

const parseDifference = (listA: any[], args: { list: any[] }) => {
  handleAnalytics(GeneralFilters.difference, [args]);
  const { list: listB } = args;
  if (!listB) {
    return false;
  }
  return _.difference(listA, listB);
};

export enum GeneralFilters {
  some = 'some',
  every = 'every',
  filter = 'filter',
  includes = 'includes',
  reject = 'reject',
  map = 'map',
  match = 'match',
  nope = 'nope',
  intersection = 'intersection',
  difference = 'difference',
}

export const GENERAL_FILTERS_HANDLER: any = {
  [GeneralFilters.some]: parseSome,
  [GeneralFilters.every]: parseEvery,
  [GeneralFilters.filter]: parseFilter,
  [GeneralFilters.reject]: parseReject,
  [GeneralFilters.map]: parseMap,
  [GeneralFilters.includes]: parseIncludes,
  [GeneralFilters.match]: parseMatch,
  [GeneralFilters.nope]: parseNope,
  [GeneralFilters.intersection]: parseIntersection,
  [GeneralFilters.difference]: parseDifference,
};
