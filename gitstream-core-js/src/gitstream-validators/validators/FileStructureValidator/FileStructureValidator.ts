import ValidatorBase from '../Base';
import * as yaml from 'js-yaml';
import Ajv from 'ajv';
import { CM_SCHEMA, JINJA_EXPRESSION_REGEX } from '../../const';
import { ValidationError } from '../../errors';

const ajv = new Ajv();

export class FileStructureValidator extends ValidatorBase {
  validate(args: any) {
    const { yamlFile } = args;
    const docs = yaml.loadAll(
      yamlFile.replace(JINJA_EXPRESSION_REGEX, ''),
      undefined,
      {
        schema: yaml.JSON_SCHEMA,
      }
    );
    const validateSchema = ajv.compile(CM_SCHEMA);
    for (const doc of docs) {
      const isValid = validateSchema(doc);
      if (!isValid) {
        throw new ValidationError(
          `Schema is not valid: ${validateSchema.errors
            ?.map(error => error.message)
            .join(', ')}`
        );
      }
    }
  }
}
