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
import { DefaultParserAttributes, Run } from './types';
import { FiltersForAnalytics } from './filters/common';

export default class RuleParser {
  private env: nunjucks.Environment;
  private renderedRuleFile: any = {};
  private context: Context | {} = {};
  private ruleFileRawContent: string;
  private lastParserResult: any = {};
  private isDebug: boolean | string;

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
        ...(this.renderedRuleFile[DefaultParserAttributes.errors] &&
          this.renderedRuleFile[DefaultParserAttributes.errors]),
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

  async parseStreams() {
    await this.render();
    return this.combineMetadataWithResult();
  }
}
