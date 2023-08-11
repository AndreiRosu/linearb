export declare const parseCMFile: (payload: any, rules: any, ruleFile: any) => Promise<unknown>;
export declare const contributersStatContext: (context: any, payload: any) => Promise<{
    age: number;
    author_age: number;
    blame: any;
    ds_blame: {};
} | undefined>;
export declare const getContext: (baseBranch: any, refBranch: any, payload: any, rules: any, ruleFile: any, isCmChanged?: boolean) => Promise<{
    branch: {
        name: any;
        base: any;
        author: any;
        autor_name: any;
        author_email: any;
        diff: {
            size: any;
            files_metadata: any;
        };
        num_of_commits: number;
    };
    source: {
        diff: {
            files: any;
        };
    };
    repo: {
        name: any;
        contributors: {};
        owner: any;
    };
    files: (string | undefined)[];
    pr: any;
} | undefined>;
