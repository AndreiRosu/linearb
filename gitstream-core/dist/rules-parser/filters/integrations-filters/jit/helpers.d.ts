import { Jit } from './types';
import { IPRContext } from '../../../context/types';
export declare const parseJitReview: (review: any) => Jit;
export declare const unifyReviews: (parsedReviews: Jit[], jitObject: Jit) => any;
export declare const extractJitCommentsFromPR: (pr: IPRContext) => import("../../../context/types").IReview[];
export declare const initEmptyJitObject: () => {
    vulnerabilities: never[];
    metrics: {
        HIGH: null;
        MEDIUM: null;
        LOW: null;
        INFO: null;
    };
};
