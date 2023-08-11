// @ts-nocheck
import * as yaml from 'js-yaml';
import { ERRORS, STATUS_CODES } from '../common/const';
import { handleValidationErrors } from './error.handler';
import {
  SavedWordsValidator,
  validatorsConstants,
} from '@linearb/gitstream-core-js';

const COMMENT_REGEX = /^.*#.*$/gm;
const EMPTY_LINE_REGEX = /^\s*\n/gm;
const ACTIONS_LINE_REGEX = /-.*action( )*:.*/gi;
const ACTIONS_PREFIX_REGEX = /-.*action.*: /gi;
const AUTOMATION_KEYWORD = 'automations:';
const MALFORMED_EXPRESSION_REGEX = /{[\s]+{|}[\s]+}/gi;

const validateKeyword = async (rules, ruleFile, payload) => {
  if (!rules.includes(AUTOMATION_KEYWORD)) {
    await handleValidationErrors(
      ERRORS.MISSING_KEYWORD,
      STATUS_CODES.MISSING_KEYWORD,
      payload,
      ruleFile
    );
  }
};

const validateActions = async (actions, ruleFile, payload) => {
  const supportedActions = Object.values(
    validatorsConstants.SUPPORTED_ACTIONS_BY_PROVIDER[payload.source] ||
      validatorsConstants.SUPPORTED_ACTIONS_BY_PROVIDER.default
  );
  const notSupportedActions = actions.filter(
    (action) => !supportedActions.includes(action)
  );
  if (notSupportedActions.length) {
    await handleValidationErrors(
      `The following actions are not supported: ${notSupportedActions
        .map((action) => `\`${action}\``)
        .join(
          ', '
        )} [Supported actions](https://docs.gitstream.cm/automation-actions/)`,
      STATUS_CODES.UNSUPPORTED_ACTION,
      payload,
      ruleFile
    );
  }
};
const validateExpressions = async (rules, ruleFile, payload) => {
  if (rules.match(MALFORMED_EXPRESSION_REGEX)) {
    await handleValidationErrors(
      ERRORS.MALFORMED_EXPRESSION,
      STATUS_CODES.MALFORMED_EXPRESSION,
      payload,
      ruleFile
    );
  }
};

const validateRequiredArgs = async (runs, ruleFile, payload) => {
  runs.forEach(async ({ action, args }) => {
    const existingArgs = Object.keys(args || {});
    const requiredArgsExists = (requireArg) =>
      existingArgs.includes(requireArg);
    if (!validatorsConstants.REQUIRED_ARGUMENTS_BY_ACTIONS[action]) {
      return;
    }
    const missingArgs = validatorsConstants.REQUIRED_ARGUMENTS_BY_ACTIONS[
      action
    ].all
      ? !validatorsConstants.REQUIRED_ARGUMENTS_BY_ACTIONS[action].args.every(
          requiredArgsExists
        )
      : !validatorsConstants /
        validatorsConstants.REQUIRED_ARGUMENTS_BY_ACTIONS[action].args.some(
          requiredArgsExists
        );
    if (missingArgs) {
      await handleValidationErrors(
        `Missing required args for action: \`${action}\`: [${
          validatorsConstants /
          validatorsConstants.REQUIRED_ARGUMENTS_BY_ACTIONS[action].args
            .filter((arg) => !existingArgs.includes(arg))
            .map((arg) => `${arg}`)
            .join(', ')
        }]`,
        STATUS_CODES.MISSING_REQUIRED_FIELDS,
        payload,
        ruleFile
      );
    }
  });
};
const validateSupportedArgs = async (runs, ruleFile, payload) =>
  runs.forEach(async ({ action, args }) => {
    const unsupportedArgs = Object.keys(args || {}).filter(
      (arg) =>
        !validatorsConstants.SUPPORTED_ARGUMENTS_BY_ACTION[action]?.includes(
          arg
        )
    );
    if (unsupportedArgs?.length) {
      await handleValidationErrors(
        `These arguments are not supported for \`${action}\`: [${unsupportedArgs
          .map((arg) => `${arg}`)
          .join(', ')}]`,
        STATUS_CODES.UNSUPPORTED_ARGUMENT,
        payload,
        ruleFile
      );
    }
  });

const validateArgs = async (rules, ruleFile, provider) => {
  const rulesObj = yaml.load(
    rules.replaceAll(/{{(.*?)}}|{(.*?)}|{%.*%}((.|\n)*){% endfor %}/g, '')
  );
  const runs = Object.values(rulesObj.automations).flatMap(({ run }) => run);
  await validateSupportedArgs(runs, ruleFile, provider);
  await validateRequiredArgs(runs, ruleFile, provider);
};

const validateSavedWords = async (rules, ruleFile, payload) => {
  try {
    new SavedWordsValidator().validate({ yamlFile: rules });
  } catch (e) {
    await handleValidationErrors(
      e.message,
      STATUS_CODES.SYNTAX_ERROR,
      payload,
      ruleFile
    );
  }
};

export const validateRuleFile = async (rules, ruleFile, payload) => {
  const rulesWithoutComments = rules
    .replace(COMMENT_REGEX, '')
    .replace(EMPTY_LINE_REGEX, '');
  await validateKeyword(rulesWithoutComments, ruleFile, payload);
  await validateExpressions(rulesWithoutComments, ruleFile, payload);
  const actions = rulesWithoutComments
    .match(ACTIONS_LINE_REGEX)
    ?.map((action) => action.replace(ACTIONS_PREFIX_REGEX, '').trim());
  await validateActions(actions, ruleFile, payload);
  await validateArgs(rulesWithoutComments, ruleFile, payload);
  await validateSavedWords(rules, ruleFile, payload);
};
