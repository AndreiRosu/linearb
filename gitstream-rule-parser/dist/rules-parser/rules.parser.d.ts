import { Context } from './context/types';
export default class RuleParser {
    private env;
    private renderedRuleFile;
    private context;
    private ruleFileRawContent;
    private lastParserResult;
    private isDebug;
    constructor(ruleFileContent: string, context: Context, debugMode: boolean | string);
    private render;
    private validateRun;
    private combineMetadataWithRulesResult;
    private combineMetadataWithResult;
    parseStreams(): Promise<any>;
}
