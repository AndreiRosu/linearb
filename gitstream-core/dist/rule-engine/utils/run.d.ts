export declare const validateDefaultFolder: () => boolean;
export declare const calculateRunData: (payload: any, refBranch: any, baseBranch: any, isCmRepoFullyInstalled: any) => Promise<{
    cmState: {
        cmChanged: boolean;
        isDryRun: boolean;
    };
    rules: {};
    admins: unknown[];
    cache: {};
}>;
export declare const loadRunData: (payload: any, refBranch: any, baseBranch: any, isCmRepoFullyInstalled: any) => any;
export declare const sendResultsToResolver: (body: any, payload: any, automations: any) => Promise<void>;
