import { FileMetric, Metric, Activity, rankByLinesArgs } from './filter-types';
export declare const convertAndSumContributors: (contributors: Metric, gitToProviderUser: any) => Metric;
export declare const convertContributorsAndBlame: (repo: any) => {
    blame: {
        [x: string]: Metric;
    };
};
export declare const sumAuthorMetrics: (contributors: string[], authorMetric: FileMetric) => Metric;
export declare const convertToProviderUser: (repo: any, gitObject: Metric) => Metric;
export declare const calculateActivityPerFile: (activity: Activity, weeksArr: string[]) => FileMetric;
export declare const calculateFileSumPerAuthorActivity: (activity: Activity, weeksArr: string[], totalsPerFile: FileMetric) => FileMetric;
export declare const sortObject: (data: any[], object: any) => any[];
export declare const validateAndCompare: (authorMetrics: Metric, gt: number, lt: number) => Metric | {};
export declare const convertBlameContextToExplain: (repo: any) => any;
export declare const explainBlameTemplate: (args: rankByLinesArgs, authorFilteredParseResult: string, formattedBlameContext: any, provider: string, isNoUserButYou: boolean) => string;
