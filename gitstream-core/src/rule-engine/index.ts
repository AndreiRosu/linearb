// @ts-nocheck
import { runCI } from './run-ci';
import {
  executeOneRuleFile,
  executeCached,
  executeParser,
} from './utils/ruleParser';

console.log('Running gitstream-rules-engine 1.2.3');

export let isExecutePlayground = false;

export const RulesEngine = (isPlayground = false) => {
  isExecutePlayground = isPlayground;
  return {
    run: runCI,
    executeOneRuleFile,
    executeCached,
    executeParser,
  };
};
