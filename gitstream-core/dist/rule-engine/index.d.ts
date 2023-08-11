export declare let isExecutePlayground: boolean;
export declare const RulesEngine: (isPlayground?: boolean) => {
    run: () => Promise<void>;
    executeOneRuleFile: ({ ruleFileContent, payload, baseBranch, refBranch, ruleFile, cloneRepoPath, }: {
        ruleFileContent: any;
        payload: any;
        baseBranch: any;
        refBranch: any;
        ruleFile?: string | undefined;
        cloneRepoPath: any;
    }) => Promise<{
        results: any;
        context: any;
        errors: import("./utils/types").RulesEngineError[];
    }>;
    executeCached: ({ ruleFileContent, payload, ruleFile, cachedContext, }: {
        ruleFileContent: any;
        payload: any;
        ruleFile?: string | undefined;
        cachedContext: any;
    }) => Promise<{
        results: any;
        context: any;
        errors: import("./utils/types").RulesEngineError[];
    }>;
    executeParser: ({ context, ruleFileContent, payload }: {
        context: any;
        ruleFileContent: any;
        payload: any;
    }) => Promise<{
        results: any;
        errors: import("./utils/types").RulesEngineError[];
    }>;
};
