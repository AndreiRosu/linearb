import { rankByLinesArgs } from './filter-types';
export declare const estimatedReviewTime: (branch: any, callback: any) => Promise<void>;
export declare const parseExpertReviewer: (repo: any, { gt, lt }: rankByLinesArgs, callback: any) => Promise<void>;
export declare const parseExplainCodeExpertHandler: (repo: any, args: rankByLinesArgs, callback: any) => Promise<void>;
export declare const parseCodeExperts: (repo: any, { gt, lt }: rankByLinesArgs, callback: any) => Promise<void>;
export declare const parseExplainExpertReviewer: (repo: any, args: rankByLinesArgs, callback: any) => Promise<void>;
export declare const parseExplainCodeExperts: (repo: any, args: rankByLinesArgs, callback: any) => Promise<void>;
