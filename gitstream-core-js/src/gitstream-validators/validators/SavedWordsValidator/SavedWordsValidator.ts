import {
  CM_SCHEMA,
  JINJA_EXPRESSION_REGEX,
  VALID_CONTEXT_VARS,
} from '../../const';
import { ValidationError } from '../../errors';
import ValidatorBase from '../Base';
import * as yaml from 'js-yaml';

export class SavedWordsValidator extends ValidatorBase {
  validate(args: any) {
    const { yamlFile } = args;
    const doc: any = yaml.load(
      yamlFile
        .replace(JINJA_EXPRESSION_REGEX, '')
        .replace(/{%.*?%}[\s\S]*?{% endfor %}/g, '')
    );
    const savedWordCustomFilter = Object.keys(doc)
      .filter(custom => !Object.keys(CM_SCHEMA.properties).includes(custom))
      .find(custom => VALID_CONTEXT_VARS.includes(custom));
    if (savedWordCustomFilter) {
      throw new ValidationError(
        `Invalid custom context variable: \`${savedWordCustomFilter}\` is a built-in context`
      );
    }
  }
}
