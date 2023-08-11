import { JINJA_EXPRESSION_REGEX } from '../../const';

class ValidatorBase {
  validate(_args: any) {
    throw new Error('Abstract method "validate" must be implemented.');
  }

  static parseJinjaExpressions(cmFile: string) {
    const lines = cmFile.split('\n');
    const jinjaExpressions: any = [];
    lines.forEach((line: any, i: number) => {
      const matches = line.match(JINJA_EXPRESSION_REGEX);
      if (matches) {
        matches.forEach((match: any) => {
          jinjaExpressions.push({ expression: match, lineNumber: i + 1 });
        });
      }
    });
    return jinjaExpressions;
  }
}

export default ValidatorBase;
