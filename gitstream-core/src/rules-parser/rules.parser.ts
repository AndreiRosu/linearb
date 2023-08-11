import _ from 'lodash';
import {
  validatorsConstants,
  FiltersValidator,
  ActionsValidator,
  FileStructureValidator,
  SavedWordsValidator,
  ContextVariableValidator,
} from '@linearb/gitstream-core-js';
import * as yaml from 'js-yaml';
import * as nunjucks from 'nunjucks';
import { ERRORS, STATUS_CODES } from '../consts';
import { listify } from './args.definitions';
import { Context } from './context/types';
import { GENERAL_FILTERS_HANDLER } from './filters/general-filters';
import {
  ASYNC,
  HIGH_LEVEL_FILTERS_HANDLER,
} from './filters/high-level-filters';
import { FILTER_HANDLERS } from './old-filters/filters';
import { DefaultParserAttributes, RulesParserError, Run } from './types';
import { FiltersForAnalytics } from './filters/common';
import { convertArgsToString } from '../utils/formatters';
import { Validators } from './validators-types';

export default class RuleParser {
  private env: nunjucks.Environment;
  private renderedRuleFile: any = {};
  private context: Context | {} = {};
  private ruleFileRawContent: string;
  private lastParserResult: any = {};
  private isDebug: boolean | string;
  private errors: RulesParserError = {};
  private validatorErrors = {};

  constructor(
    ruleFileContent: string,
    context: Context,
    debugMode: boolean | string
  ) {
    this.isDebug = debugMode;
    this.env = new nunjucks.Environment(
      new nunjucks.FileSystemLoader(__dirname),
      { autoescape: false }
    );

    const allFilters: any = {
      ...GENERAL_FILTERS_HANDLER,
      ...HIGH_LEVEL_FILTERS_HANDLER,
      ...FILTER_HANDLERS,
    };

    Object.keys(allFilters).forEach((filter: any) => {
      this.env.addFilter(filter, allFilters[filter], ASYNC[filter]);
    });

    this.context = context;
    this.ruleFileRawContent = ruleFileContent;
    if (this.isDebug) {
      console.log({
        context: JSON.stringify(this.context, null, 2),
        ruleFile: ruleFileContent,
      });
    }
  }

  private async render(
    context = { ...this.context, ...this.renderedRuleFile }
  ) {
    let reRenders = 3;
    let currentContext = context;
    while (reRenders) {
      const dataAsString = this.ruleFileRawContent;
      await new Promise((resolve, reject) =>
        this.env.renderString(dataAsString, currentContext, (err, res) => {
          if (err) {
            if (this.isDebug) {
              console.log(ERRORS.FAILED_RENDER_STRING, err);
            }
            reject(err);
            return;
          }
          try {
            this.renderedRuleFile = yaml.load(res!);
          } catch (error) {
            if (this.isDebug) {
              console.log(ERRORS.FAILED_YAML_LOAD, error);
            }
            this.renderedRuleFile = {
              ...this.renderedRuleFile,
              errors: {
                ...(Object.keys(this.errors).length && this.errors),
                [STATUS_CODES.FAILED_YAML_LOAD]: ERRORS.FAILED_YAML_LOAD,
              },
            };
          }
          resolve(this);
        })
      );
      reRenders -= 1;
      currentContext = { ...this.context, ...this.renderedRuleFile };
    }
  }

  private validateRun(runs: Run[]) {
    if (!runs) {
      return runs;
    }
    return runs.map((run) => {
      if (!run.args) {
        return run;
      }
      const newArgs = Object.keys(run.args).reduce((acc: any, arg: string) => {
        const argValue = run.args[arg];
        return {
          ...acc,
          [arg]:
            argValue && listify.includes(arg) && typeof argValue === 'string'
              ? argValue.split(',')
              : run.args[arg],
        };
      }, {});
      return { ...run, args: newArgs };
    });
  }

  private combineMetadataWithRulesResult(resourceName: string) {
    if (!this.renderedRuleFile[resourceName]) {
      return {};
    }
    return Object.keys(this.renderedRuleFile[resourceName]).reduce(
      (acc, resource) => {
        const rules: any = this.renderedRuleFile[resourceName][resource].if.map(
          (result: any) => {
            return {
              passed: result,
            };
          }
        );
        const passed = rules
          .map(({ passed }: { passed: any }) => passed)
          .every((pass: any) =>
            typeof pass === 'object' ? !!Object.keys(pass || {}).length : !!pass
          );
        return {
          ...acc,
          [resource]: {
            if: rules,
            run: this.validateRun(
              this.renderedRuleFile[resourceName][resource].run
            ),
            passed,
          },
        };
      },
      {}
    );
  }

  private combineMetadataWithResult() {
    this.lastParserResult = {
      [DefaultParserAttributes.errors]: {
        ...(Object.keys(this.errors).length && this.errors),
      },
      [DefaultParserAttributes.validatorErrors]: {
        ...(Object.keys(this.validatorErrors).length && this.validatorErrors),
      },
      [DefaultParserAttributes.automations]: {
        ...this.combineMetadataWithRulesResult(
          DefaultParserAttributes.automations
        ),
      },
      [DefaultParserAttributes.analytics]: {
        ...(Object.keys(FiltersForAnalytics.filters).length &&
          FiltersForAnalytics.filters),
      },
    };
    return this.lastParserResult;
  }

  clearParserResults() {
    this.renderedRuleFile = {};
    this.ruleFileRawContent = '';
    this.lastParserResult = {};
  }

  async attachAdditionalArgs() {
    const latestResults = _.cloneDeep(this.lastParserResult);
    const newAutomations = { ...latestResults.automations };
    for (const automation of Object.keys(newAutomations)) {
      for (const run of newAutomations[automation].run) {
        if (
          run.action ===
          validatorsConstants.SUPPORTED_ACTIONS.EXPLAIN_CODE_EXPERTS
        ) {
          this.clearParserResults();
          this.ruleFileRawContent = `comment: |
          {{ repo | explainCodeExperts(${convertArgsToString(run.args)}) }}`;
          await this.render();
          run.args.comment = this.renderedRuleFile.comment;
        }
      }
    }
    this.lastParserResult = { ...latestResults, automations: newAutomations };
    return this.lastParserResult;
  }

  validateCM(): void {
    //TODO: in the near future we will add operational validators
    // which will break gitstream
    const validators: any = {
      [Validators.FiltersValidator]: new FiltersValidator(),
      [Validators.ActionsValidator]: new ActionsValidator(),
      [Validators.FileStructureValidator]: new FileStructureValidator(),
      [Validators.SavedWordsValidator]: new SavedWordsValidator(),
      [Validators.ContextVariableValidator]: new ContextVariableValidator(),
    };
    Object.keys(validators).forEach((validator) => {
      try {
        validators[validator].validate({ yamlFile: this.ruleFileRawContent });
      } catch (error) {
        if (this.isDebug) {
          console.log(`${validator} error: `, error);
        }
        this.validatorErrors = {
          ...(Object.keys(this.validatorErrors).length && this.validatorErrors),
          [validator]: `${error}`,
        };
      }
    });
  }

  async parseStreams() {
    this.validateCM();
    await this.render();
    this.combineMetadataWithResult();
    await this.attachAdditionalArgs();

    return this.lastParserResult;
  }
}
