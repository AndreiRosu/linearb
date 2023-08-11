// @ts-nocheck
import { readFileSync, writeFileSync } from 'fs';
import { SOURCE_CODE_WORKING_DIRECTORY } from './git.service';
export const saveResultsInCache = (results) => {
  try {
    writeFileSync(
      `${SOURCE_CODE_WORKING_DIRECTORY}/cache.json`,
      JSON.stringify(results)
    );
  } catch (e) {
    console.log('error saving cache', e);
  }
};

export const loadCacheResults = () => {
  try {
    const cacheResults = readFileSync(
      `${SOURCE_CODE_WORKING_DIRECTORY}/cache.json`
    ).toString();
    return JSON.parse(cacheResults);
  } catch (e) {
    console.warn('error loading from cache', e);
    return {};
  }
};
