import {
  JINJA_FILTERS,
  REGEX_EXPRESSION,
  VALID_CONTEXT_VARS,
  VALID_FILTERS,
} from '../../const';
import { ValidationError } from '../../errors';
import { Expression } from '../../types';
import ValidatorBase from '../Base';

export class FiltersValidator extends ValidatorBase {
  validateExistingFilter(
    filterName: string,
    lineNumber: number,
    expression: string
  ) {
    if (
      JINJA_FILTERS.includes(filterName) ||
      VALID_CONTEXT_VARS.includes(filterName)
    ) {
      return;
    }
    if (!Object.keys(VALID_FILTERS).includes(filterName)) {
      throw new ValidationError(
        `Line ${lineNumber}: Invalid filter function ${filterName} in expression ${expression}`
      );
    }
  }

  getFilterArgs(filter: string): string[] {
    return filter
      .slice(filter.indexOf('(') + 1, filter.lastIndexOf(')'))
      .replace(REGEX_EXPRESSION, '')
      .split(',')
      .map(arg => arg.split('=')[0].trim());
  }

  validateFilterArgs(
    filter: string,
    filterName: string,
    lineNumber: number,
    expression: string
  ) {
    if (filter.includes('(')) {
      const filterArgs = this.getFilterArgs(filter);
      const validFilterArgs = VALID_FILTERS[filterName];
      for (const arg of filterArgs) {
        if (!validFilterArgs.includes(arg)) {
          throw new ValidationError(
            `Line [${lineNumber}]: Invalid argument ${arg} for filter ${filterName} in expression ${expression}`
          );
        }
      }
    }
  }

  validate(args: any): void {
    const { expressions, yamlFile } = args;
    const expressionsFromCM =
      expressions ?? ValidatorBase.parseJinjaExpressions(yamlFile);
    expressionsFromCM.forEach(({ expression, lineNumber }: Expression) => {
      const exspressionFilters =
        expression
          .replace(REGEX_EXPRESSION, '')
          .replace(/[{}]/g, '')
          .split('|')
          .slice(1) ?? [];
      for (const filter of exspressionFilters) {
        const formattedFilter = filter.split(/\s*==\s*|\s*<\s*|\s*>\s*/)[0];
        const [filterNameWithArgs] = formattedFilter.split('(');
        const filterName = filterNameWithArgs.trim();
        this.validateExistingFilter(filterName, lineNumber, expression);
        this.validateFilterArgs(
          formattedFilter,
          filterName,
          lineNumber,
          expression
        );
      }
    });
  }
}
