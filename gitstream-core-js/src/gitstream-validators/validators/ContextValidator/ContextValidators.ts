import { VALID_CONTEXT_VARS } from '../../const';
import { ValidationError } from '../../errors';
import { Expression } from '../../types';
import ValidatorBase from '../Base';

const UNKNOWN_CONTEXT = 'UNKNOWN_CONTEXT';

export class ContextVariableValidator extends ValidatorBase {
  isValidCustomVariables(customVariable: string, yamlFile: string) {
    const customs = customVariable.split('.').slice(0, -1);
    return customs
      .map(custom => custom.replace(/[()]/g, ''))
      .every(custom => yamlFile.includes(`${custom}:`));
  }
  isValidContextVariable(contextVariable: string) {
    if (!VALID_CONTEXT_VARS.includes(contextVariable || UNKNOWN_CONTEXT)) {
      return false;
    }
    return true;
  }

  validate(args: any): void {
    const { expressions, yamlFile } = args;
    const expressionsFromCM =
      expressions ?? ValidatorBase.parseJinjaExpressions(yamlFile);
    expressionsFromCM.forEach(({ expression, lineNumber }: Expression) => {
      const exspressionFilters = expression.replace(/[{}]/g, '').split('|');
      const contextVariable =
        exspressionFilters.shift()?.trim() ?? UNKNOWN_CONTEXT;
      const multipleVariable = contextVariable?.split(' ') ?? [];
      multipleVariable.forEach(variable => {
        if (
          !this.isValidContextVariable(variable) &&
          !this.isValidCustomVariables(variable, yamlFile)
        ) {
          throw new ValidationError(
            `Line [${lineNumber}]: Invalid context variable ${variable} in expression ${expression}`
          );
        }
      });
    });
  }
}
