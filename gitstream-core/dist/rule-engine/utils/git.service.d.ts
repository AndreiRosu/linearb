export declare const SOURCE_CODE_WORKING_DIRECTORY = "./code";
export declare const CWD: {
    cwd: string;
};
export declare const executeGitCommand: (command: any, folder?: string) => string;
export declare const getCheckoutCommit: (refBranch: any, baseBranch: any) => any;
export declare const getContent: (branch: any, file: any) => string;
export declare const getDiff: (baseBranch: any, refBranch: any, rules: any) => "" | {
    diff: string;
    diffCommand: string;
};
export declare const readRemoteFile: (file: any, branch: any, folder?: string) => string;
export declare const getExcludedOrgCMFilesBasedOnRepo: (orgRules: any, repo: any, payload: any) => Promise<string[]>;
export declare const getOrgCmFiles: (baseBranch: any) => {};
export declare const getRuleFiles: (baseBranch: any, repo: any) => Promise<{}>;
export declare const getCommitsNumberOnBranch: (baseBranch: any) => number;
export declare const getContributorsStatistics: (branch: any) => {};
export declare const getAuthorName: (baseBranch: any, refBranch: any) => "" | {
    fullAuthorName: string;
    authorName: string;
    authorEmail: string;
};
export declare const isCmChanged: (refBranch: any, baseBranch: any, repo: any) => boolean;
export declare const hasNonRuleFilesChanges: (refBranch: any, baseBranch: any, repo: any) => boolean;
