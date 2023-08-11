import prettier from 'prettier';
import { File } from '../context/types';

const parseFilterAllFilePath = (files: string[], searchArray: string[]) => {
  return (
    files.length &&
    files
      .map((filePath: string) =>
        searchArray.some((term: string) => (filePath || '').includes(term))
      )
      .every((x: boolean) => x === true)
  );
};

const parseIsEveryExtension = (files: string[], extensions: string[]) => {
  return parseFilterAllFilePath(
    files
      .map((filePath: string) => filePath.split('.').pop() || '')
      .filter((value, index, array) => array.indexOf(value) === index),
    extensions
  );
};

const parseIsEveryExtensionRegex = (files: string[], filter: string) => {
  const re = new RegExp(filter);
  const extensions = files
    .map((filePath: string) => filePath.split('.').pop() || '')
    .filter((value, index, array) => array.indexOf(value) === index);

  return (
    extensions.length > 0 &&
    extensions
      .map((filePath: string) => re.test(filePath))
      .every((match: any) => match)
  );
};

const parseExtractExtensions = (files: string[]) =>
  files.length &&
  files
    // extensions
    .map((x: string) => x.split('.').pop())
    // unique
    .filter((value, index, array) => array.indexOf(value) === index);

const parseIsStringIncludes = (file: string, terms: string[]) =>
  terms.some((term: any) => file.includes(term));

const parseIsStringIncludesRegex = (file: string, filter: string) => {
  const re = new RegExp(filter);
  return re.test(file);
};

const parseRegex = (files: string[], filter: string) => {
  const re = new RegExp(filter);
  return files.length
    ? files.map((file: any) => re.test(file)).every((match: any) => match)
    : false;
};

const parseIsEveryInListRegex = (files: string[], filter: string) => {
  const re = new RegExp(filter);
  return files.length
    ? files.map((file: any) => re.test(file)).every((match: any) => match)
    : false;
};

const parseIsEveryInList = (files: string[], filters: string[]) => {
  return files.length
    ? files
        .filter((file: any) => filters.includes(file))
        .every((match: any) => match)
    : false;
};

const parseIsSomeInList = (files: string[], searchTerms: string[]) => {
  return files.length
    ? files
        .filter((file: any) => searchTerms.includes(file))
        .some((match: any) => match)
    : false;
};

const parseIncludesRegex = (files: string[], filter: string) => {
  const re = new RegExp(filter);
  return files.length
    ? files.map((file: any) => re.test(file)).some((match: any) => match)
    : false;
};

const parseIsSomeInListRegex = (files: string[], filter: string) => {
  const re = new RegExp(filter);
  return files.length
    ? files.map((file: any) => re.test(file)).some((match: any) => match)
    : false;
};

const parseFilterRegex = (files: string[], filter: string) => {
  const re = new RegExp(filter);
  return files.length ? files.filter((file: any) => re.test(file)) : false;
};

const parseFilterListRegex = (files: string[], filter: string) => {
  const re = new RegExp(filter);
  return files.length ? files.filter((file: any) => re.test(file)) : false;
};

const parseFilterList = (files: string[], filters: string[]) => {
  return files.length
    ? files.filter((file: any) => filters.includes(file))
    : false;
};

const minify = (text: string) =>
  text.replace(/\s+/g, ' ').replaceAll("'", '"').trim();

const allFormattingChange = (files: File[]) => {
  try {
    const allFormatting = files.every(
      ({ new_content, original_content, original_file, new_file }) => {
        const formattedNew = prettier.format(new_content, {
          semi: false,
          singleQuote: true,
          filepath: new_file,
        });
        const formattedOld = prettier.format(original_content, {
          semi: false,
          singleQuote: true,
          filepath: original_file,
        });
        return minify(formattedNew) === minify(formattedOld);
      }
    );
    return allFormatting;
  } catch (e) {
    return false;
  }
};

const parseFilterFileDiffRegex = (files: File[], filterRegex: string) => {
  const re = new RegExp(filterRegex, 'm');
  return files.length ? files.filter(({ diff }) => re.test(diff)) : false;
};

const parseIsEveryLineInFileDiffRegex = (
  files: File[],
  filterRegex: string
) => {
  const re = new RegExp(filterRegex, 'm');
  return files.length
    ? files.map(({ diff }) => re.test(diff)).every((match: any) => match)
    : false;
};

const parseIsSomeLineInFileDiffRegex = (files: File[], filterRegex: string) => {
  const re = new RegExp(filterRegex, 'm');
  return files.length
    ? files.map(({ diff }) => re.test(diff)).some((match: any) => match)
    : false;
};

const parseFilterAllExtensions = (files: string[], extensions: string[]) => {
  return files.length
    ? parseFilterAllFilePath(
        files.map((filePath: string) => filePath.split('.').pop() || ''),
        extensions
      )
    : false;
};

export enum Filters {
  allExtensions = 'allExtensions',
  includes = 'includes',
  allPassRegex = 'allPassRegex',
  allPathIncludes = 'allPathIncludes',
  filterRegex = 'filterRegex',
  includesRegex = 'includesRegex',
  true = 'true',
  allFormattingChange = 'allFormattingChange',
  filterList = 'filterList',
  filterListRegex = 'filterListRegex',
  isEveryInListRegex = 'isEveryInListRegex',
  isSomeInList = 'isSomeInList',
  isSomeInListRegex = 'isSomeInListRegex',
  isStringIncludes = 'isStringIncludes',
  isStringIncludesRegex = 'isStringIncludesRegex',
  isEveryInList = 'isEveryInList',
  extractExtensions = 'extractExtensions',
  isEveryExtension = 'isEveryExtension',
  isEveryExtensionRegex = 'isEveryExtensionRegex',
  filterFileDiffRegex = 'filterFileDiffRegex',
  isEveryLineInFileDiffRegex = 'isEveryLineInFileDiffRegex',
  isSomeLineInFileDiffRegex = 'isSomeLineInFileDiffRegex',
}

export const FILTER_HANDLERS: any = {
  [Filters.filterList]: parseFilterList,
  [Filters.filterListRegex]: parseFilterListRegex,
  [Filters.isEveryInListRegex]: parseIsEveryInListRegex,
  [Filters.isSomeInList]: parseIsSomeInList,
  [Filters.isSomeInListRegex]: parseIsSomeInListRegex,
  [Filters.isStringIncludes]: parseIsStringIncludes,
  [Filters.isStringIncludesRegex]: parseIsStringIncludesRegex,
  [Filters.isEveryInList]: parseIsEveryInList,
  [Filters.extractExtensions]: parseExtractExtensions,
  [Filters.isEveryExtension]: parseIsEveryExtension,
  [Filters.isEveryExtensionRegex]: parseIsEveryExtensionRegex,
  [Filters.true]: () => true,
  [Filters.filterFileDiffRegex]: parseFilterFileDiffRegex,
  [Filters.isEveryLineInFileDiffRegex]: parseIsEveryLineInFileDiffRegex,
  [Filters.isSomeLineInFileDiffRegex]: parseIsSomeLineInFileDiffRegex,
  //TODO: remove soon - those filters are deprecated!
  [Filters.allExtensions]: parseFilterAllExtensions,
  [Filters.allPassRegex]: parseRegex,
  [Filters.allPathIncludes]: parseFilterAllFilePath,
  [Filters.filterRegex]: parseFilterRegex,
  [Filters.includesRegex]: parseIncludesRegex,
  [Filters.allFormattingChange]: allFormattingChange,
};
