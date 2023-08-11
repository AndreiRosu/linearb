export declare const METRICS_LIST: {
    name: string;
    description: string;
}[];
export declare const V2_METRICS_NAMES: {
    PR_MERGED: string;
    MERGED_LARGE_PRS: string;
    MERGED_LONG_LIVING_PRS: string;
    MERGED_UNLINKED_PRS: string;
    MERGED_REVIEW_REQUEST_HANGING: string;
    MERGED_WITHOUT_REVIEW: string;
    MERGED_WORK_AT_RISK_PRS: string;
    MERGED_WITH_BASIC_REVIEW_PRS: string;
    MERGED_LONG_REVIEW_PRS: string;
    CFR_ISSUES_DONE: string;
};
export declare const metricNames: {
    TIME_TO_PR: string;
    TIME_TO_PR_MERGED: string;
    TIME_TO_REVIEW: string;
    TIME_TO_REVIEW_MERGED: string;
    TIME_TO_PROD: string;
    REVIEW_TIME: string;
    REVIEW_TIME_MERGED: string;
    ACTIVE_BRANCHES: string;
    DELETED_BRANCHES: string;
    MERGED_BRANCHES: string;
    DEPLOYED_BRANCHES: string;
    DONE_BRANCHES: string;
    CYCLE_TIME: string;
    ACTIVE_DAYS: string;
    NEW_WORK: string;
    REWORK: string;
    REFACTOR: string;
    TOTAL_ACTIVITY: string;
    COMMIT_CODE_CHANGES: string;
    COMMIT_COUNT: string;
    REVIEWS: string;
    REVIEW_DEPTH: string;
    PR_NEW: string;
    PR_SIZE: string;
    PR_MERGED: string;
    PR_MERGED_WITHOUT_REVIEW: string;
    BRANCH_CODE_CHANGES: string;
    RELEASES_COUNT: string;
    RELEASES_AVG: string;
    COMMIT_INVOLVED_REPOS_COUNT: string;
};
export declare const metricDisplayValues: {
    [x: string]: {
        displayName: string;
        unitType: string;
        displayLabel: string;
        description: string;
        articleId: string;
        unitDescription?: undefined;
    } | {
        displayName: string;
        unitType: string;
        articleId: string;
        displayLabel?: undefined;
        description?: undefined;
        unitDescription?: undefined;
    } | {
        displayName: string;
        unitType: string;
        displayLabel: string;
        description?: undefined;
        articleId?: undefined;
        unitDescription?: undefined;
    } | {
        displayName: string;
        unitType: string;
        displayLabel: string;
        unitDescription: string;
        articleId: string;
        description?: undefined;
    };
};
export declare const metricsScales: {
    TIME: string;
    FREQUENCY: string;
    CODE_CHANGES: string;
    PERCENTAGE: string;
};
export default metricNames;
export declare const METRICS_BENCHMARKS: {
    [x: string]: {
        unit: string;
        scale: string;
        description: string;
        avg: ({
            title: string;
            icon: string;
            icon_color: string;
            min_value: null;
            max_value: number;
        } | {
            title: string;
            icon: string;
            icon_color: string;
            min_value: number;
            max_value: number;
        } | {
            title: string;
            icon: string;
            icon_color: string;
            min_value: number;
            max_value: null;
        })[];
        p75: ({
            title: string;
            icon: string;
            icon_color: string;
            min_value: null;
            max_value: number;
        } | {
            title: string;
            icon: string;
            icon_color: string;
            min_value: number;
            max_value: number;
        } | {
            title: string;
            icon: string;
            icon_color: string;
            min_value: number;
            max_value: null;
        })[];
        p50?: undefined;
        unitDescription?: undefined;
    } | {
        unit: string;
        scale: string;
        description: string;
        avg: ({
            title: string;
            icon: string;
            icon_color: string;
            min_value: string;
            max_value: number;
        } | {
            title: string;
            icon: string;
            icon_color: string;
            min_value: number;
            max_value: number;
        } | {
            title: string;
            icon: string;
            icon_color: string;
            min_value: number;
            max_value: null;
        })[];
        p75: ({
            title: string;
            icon: string;
            icon_color: string;
            min_value: string;
            max_value: number;
        } | {
            title: string;
            icon: string;
            icon_color: string;
            min_value: number;
            max_value: number;
        } | {
            title: string;
            icon: string;
            icon_color: string;
            min_value: number;
            max_value: null;
        })[];
        p50?: undefined;
        unitDescription?: undefined;
    } | {
        unit: string;
        scale: string;
        description: string;
        avg: ({
            title: string;
            icon: string;
            icon_color: string;
            min_value: number;
            max_value: null;
            range_text: string;
        } | {
            title: string;
            icon: string;
            icon_color: string;
            min_value: number;
            max_value: number;
            range_text: string;
        } | {
            title: string;
            icon: string;
            icon_color: string;
            min_value: null;
            max_value: number;
            range_text: string;
        })[];
        p50: ({
            title: string;
            icon: string;
            icon_color: string;
            min_value: number;
            max_value: null;
            range_text: string;
        } | {
            title: string;
            icon: string;
            icon_color: string;
            min_value: number;
            max_value: number;
            range_text: string;
        } | {
            title: string;
            icon: string;
            icon_color: string;
            min_value: null;
            max_value: number;
            range_text: string;
        })[];
        p75: ({
            title: string;
            icon: string;
            icon_color: string;
            min_value: number;
            max_value: null;
            range_text: string;
        } | {
            title: string;
            icon: string;
            icon_color: string;
            min_value: number;
            max_value: number;
            range_text: string;
        } | {
            title: string;
            icon: string;
            icon_color: string;
            min_value: null;
            max_value: number;
            range_text: string;
        })[];
        unitDescription?: undefined;
    } | {
        unit: string;
        unitDescription: string;
        scale: string;
        description: string;
        avg: ({
            title: string;
            icon: string;
            icon_color: string;
            min_value: null;
            max_value: number;
            range_text: string;
        } | {
            title: string;
            icon: string;
            icon_color: string;
            min_value: number;
            max_value: number;
            range_text: string;
        } | {
            title: string;
            icon: string;
            icon_color: string;
            min_value: number;
            max_value: null;
            range_text: string;
        })[];
        p75: ({
            title: string;
            icon: string;
            icon_color: string;
            min_value: null;
            max_value: number;
            range_text: string;
        } | {
            title: string;
            icon: string;
            icon_color: string;
            min_value: number;
            max_value: number;
            range_text: string;
        } | {
            title: string;
            icon: string;
            icon_color: string;
            min_value: number;
            max_value: null;
            range_text: string;
        })[];
        p50?: undefined;
    };
};
export declare const MEDIAN_METRICS: string[];
export declare const CYCLE_TIME_METRICS_BENCHMARKS_VALUES: {
    [x: string]: {
        avg: {
            eliteCondition: (value: number) => boolean;
            goodCondition: (value: number) => boolean;
            fairCondition: (value: number) => boolean;
            poorCondition: (value: number) => boolean;
        };
        p75: {
            eliteCondition: (value: number) => boolean;
            goodCondition: (value: number) => boolean;
            fairCondition: (value: number) => boolean;
            poorCondition: (value: number) => boolean;
        };
    };
};
