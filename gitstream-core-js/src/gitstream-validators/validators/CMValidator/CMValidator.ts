import ValidatorBase from '../Base';
import ContextVariableValidator from '../ContextValidator';
import FiltersValidator from '../FiltersValidators';
import ActionsValidator from '../ActionsValidator';
import FileStructureValidator from '../FileStructureValidator';
import SavedWordsValidator from '../SavedWordsValidator';
import { TriggersValidator } from '../TriggersValidator/TriggersValidator';

export class CMValidator extends ValidatorBase {
  steps: ValidatorBase[];
  constructor() {
    super();
    this.steps = [
      new ContextVariableValidator(),
      new FiltersValidator(),
      new ActionsValidator(),
      new FileStructureValidator(),
      new SavedWordsValidator(),
      new TriggersValidator(),
    ];
  }

  validate(cmFile: string) {
    const expressions = ValidatorBase.parseJinjaExpressions(cmFile);
    for (const step of this.steps) {
      step.validate({ expressions, yamlFile: cmFile });
    }
  }
}
