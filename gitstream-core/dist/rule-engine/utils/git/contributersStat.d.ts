export declare const commitersPerFile: (files: any) => any;
export declare const commitsDateByAuthor: (author: any, branchName: any) => string[];
export declare const recentAuthorActivity: (branchName: any, since: any, file: any) => {
    dsActivity: string;
    groupByWeek: any;
};
export declare const countAuthosInRepo: () => string[];
export declare const countFilesInRepo: () => string;
export declare const getRepoFirstCommitDate: (branchName?: string) => string;
export declare const blameByAuthor: (files: any, branch: any) => any;
