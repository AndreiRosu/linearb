export declare const groupByWeek: (activity: any) => any;
export declare const calculateLinesPercentage: (authorLines: any, allLinesCount: any) => number;
export declare const formatDateToDays: (date: any, context: any, payload: any) => Promise<number>;
export declare const reportGitCommandsAndResults: (file: any, branch: any, payload: any) => Promise<void>;
export declare const getAllAuthorsOfFile: (file: any, branch: any) => string[];
export declare const getGitBlameString: (file: any, branch: any) => string;
export declare const calculateStatisticsForBlame: (allAuthors: any, author: any, file: any, branch: any) => {
    authorLines: string | number;
    allLinesCount: number;
};
export declare const extractStatsFromRawItems: (rawItems: any) => any;
export declare const splitDsAndBlameObjects: (blames: any) => {
    formattedBlame: any;
    dsBlame: {};
};
export declare const splitDsAndActivity: (gitActivity: any) => {
    formattedActivity: any;
    dsActivity: {};
};
