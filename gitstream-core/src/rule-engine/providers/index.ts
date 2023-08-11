// @ts-nocheck
import yaml from 'js-yaml';
import { readRemoteFile } from '../utils/git.service';

export const attachAdditionalContextByProvider = (provider, context) => {
  const attachContextByProvider = {
    gitlab: (context) => {
      return {
        performNonSoftCommands: false,
      };
    },
  };
  const getContextCb = attachContextByProvider[provider];
  const additionalContext = getContextCb ? getContextCb(context) : null;
  return additionalContext || {};
};
