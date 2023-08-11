import { JINJA_EXPRESSION_REGEX, SUPPORTED_TRIGGERS } from '../../const';
import { ValidationError } from '../../errors';
import ValidatorBase from '../Base';
import * as yaml from 'js-yaml';

export class TriggersValidator extends ValidatorBase {
  validateSuppertedTriggers(trigger: string) {
    if (!Object.values(SUPPORTED_TRIGGERS).includes(trigger)) {
      throw new ValidationError(`${trigger} trigger is not supported`);
    }
  }

  validate(args: any) {
    const { yamlFile } = args;
    const safeYamlFile = yamlFile.replace(JINJA_EXPRESSION_REGEX, 'TEMPLATE');
    const yamlLoaded: any = yaml.load(safeYamlFile);
    const globalTriggerts = yamlLoaded.automations.on || [];
    const automationTriggers: string[] = Object.values(yamlLoaded.automations)
      .flatMap((automation: any) => automation.on)
      .filter(Boolean);
    const allTriggers = [...globalTriggerts, ...automationTriggers];
    for (const trigger of allTriggers) {
      this.validateSuppertedTriggers(trigger);
    }
  }
}
