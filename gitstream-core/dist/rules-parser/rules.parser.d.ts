import { Context } from './context/types';
export default class RuleParser {
    private env;
    private renderedRuleFile;
    private context;
    private ruleFileRawContent;
    private lastParserResult;
    private isDebug;
    private errors;
    private validatorErrors;
    constructor(ruleFileContent: string, context: Context, debugMode: boolean | string);
    private render;
    private validateRun;
    private combineMetadataWithRulesResult;
    private combineMetadataWithResult;
    clearParserResults(): void;
    attachAdditionalArgs(): Promise<any>;
    validateCM(): void;
    parseStreams(): Promise<any>;
}
