export declare const parseRules: (rules: any, prContext: any, payload: any, ruleFile: any) => Promise<any>;
export declare const executeOneRuleFile: ({ ruleFileContent, payload, baseBranch, refBranch, ruleFile, cloneRepoPath, }: {
    ruleFileContent: any;
    payload: any;
    baseBranch: any;
    refBranch: any;
    ruleFile?: string | undefined;
    cloneRepoPath: any;
}) => Promise<{
    results: any;
    context: any;
    errors: import("./types").RulesEngineError[];
}>;
export declare const executeCached: ({ ruleFileContent, payload, ruleFile, cachedContext, }: {
    ruleFileContent: any;
    payload: any;
    ruleFile?: string | undefined;
    cachedContext: any;
}) => Promise<{
    results: any;
    context: any;
    errors: import("./types").RulesEngineError[];
}>;
export declare const parseMultipleRuleFiles: (rules: any, baseBranch: any, refBranch: any, payload: any, isCmChanged: any, cache?: null) => Promise<{
    automations?: undefined;
    contextPerFile?: undefined;
} | {
    automations: {};
    contextPerFile: {};
}>;
export declare const extractAdmins: (baseBranch: any, isCmRepoFullyInstalled: any, payload: any) => Promise<unknown[]>;
export declare const getCMChanged: (refBranch: any, baseBranch: any, repo: any) => {
    cmChanged: boolean;
    isDryRun: boolean;
};
export declare const getRulesAndValidate: (cmChanged: any, refBranch: any, baseBranch: any, payload: any, isCmRepoFullyInstalled: any) => Promise<{}>;
export declare const getWatchers: (rules: any, payload: any) => any;
export declare const executeParser: ({ context, ruleFileContent, payload }: {
    context: any;
    ruleFileContent: any;
    payload: any;
}) => Promise<{
    results: any;
    errors: import("./types").RulesEngineError[];
}>;
