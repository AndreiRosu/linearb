import { rankByLinesArgs } from './filter-types';
export declare const getETR: (request: any) => Promise<{
    numericValue: any;
}>;
export declare const getExpertReviewer: (request: any) => Promise<any>;
export declare const filterExpertResult: (data: any, gt: number, lt: number, filterBy: string) => string[];
export declare const parseExpertReviewerThreshold: (args: rankByLinesArgs) => number;
export declare const getAndFilterExpertReviewer: (repo: any) => Promise<{
    data: any;
    dataWithoutIssuer: {};
    isIssuerFiltered: boolean;
}>;
