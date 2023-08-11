import {
  JINJA_EXPRESSION_REGEX,
  REQUIRED_ARGUMENTS_BY_ACTIONS,
  SUPPORTED_ACTIONS,
  SUPPORTED_ARGUMENTS_BY_ACTION,
} from '../../const';
import { ValidationError } from '../../errors';
import { Action } from '../../types';
import ValidatorBase from '../Base';
import * as yaml from 'js-yaml';

export class ActionsValidator extends ValidatorBase {
  validateActionSupported(action: string) {
    if (!Object.values(SUPPORTED_ACTIONS).includes(action)) {
      throw new ValidationError(`Action is not supported ${action}`);
    }
  }
  validateArgSupported(action: string, args: string[]) {
    const unsupportedArgs = args?.filter(
      arg => !SUPPORTED_ARGUMENTS_BY_ACTION[action].includes(arg)
    );
    if (unsupportedArgs.length) {
      throw new ValidationError(
        `Some args are not supported:  ${unsupportedArgs.join(', ')}`
      );
    }
  }
  validateRequiredArgs(action: string, args: string[]) {
    const required = REQUIRED_ARGUMENTS_BY_ACTIONS[action];
    if (!required) {
      return;
    }
    const missingArgs = required.args?.filter(arg => !args.includes(arg));
    if (
      (required.all && missingArgs.length) ||
      (!required.all && !required.args.some(arg => args.includes(arg)))
    ) {
      throw new ValidationError(
        `Some required args are missing for action ${action}: ${missingArgs.join(
          ', '
        )}`
      );
    }
  }

  validate(args: any) {
    const { yamlFile } = args;
    const safeYamlFile = yamlFile.replace(JINJA_EXPRESSION_REGEX, 'TEMPLATE');
    const yamlLoaded: any = yaml.load(safeYamlFile);
    const actions: Action[] = Object.values(yamlLoaded.automations)
      .flatMap((automation: any) => automation.run)
      ?.filter(Boolean);

    for (const actionElement of actions) {
      const { action, args: actionArgs } = actionElement;
      const existingArgsList = Object.keys(actionArgs ?? {});
      this.validateActionSupported(action);
      if (existingArgsList.length) {
        this.validateArgSupported(action, existingArgsList);
      }
      this.validateRequiredArgs(action, existingArgsList);
    }
  }
}
