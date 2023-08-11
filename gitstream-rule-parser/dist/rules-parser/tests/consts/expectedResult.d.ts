export declare const expectedResult: (automationName: string) => {
    errors: {};
    automations: {
        [x: string]: {
            if: {
                passed: boolean;
            }[];
            run: {
                action: string;
                args: {
                    labels: string[];
                };
                engine: string;
            }[];
            passed: boolean;
        };
    };
    analytics: {
        allImages: {
            args: never[];
        };
        allDocs: {
            args: never[];
        };
        allTests: {
            args: never[];
        };
        estimatedReviewTime: {
            args: never[];
        };
        isFormattingChange: {
            args: never[];
        };
        filter: {
            args: {
                regex: string;
                __keywords: boolean;
            }[];
        };
        matchDiffLines: {
            args: {
                regex: string;
                ignoreWhiteSpaces: boolean;
                __keywords: boolean;
            }[];
        };
        every: {
            args: never[];
        };
        match: {
            args: never[];
        };
        some: {
            args: never[];
        };
        map: {
            args: {
                attr: string;
            }[];
        };
    };
};
export declare const expectedResultForEmptyContext: (automationName: string) => {
    errors: {};
    automations: {
        [x: string]: {
            if: {
                passed: boolean;
            }[];
            run: {
                action: string;
                args: {
                    labels: string[];
                };
                engine: string;
            }[];
            passed: boolean;
        };
    };
    analytics: {
        allImages: {
            args: never[];
        };
        allDocs: {
            args: never[];
        };
        allTests: {
            args: never[];
        };
        estimatedReviewTime: {
            args: never[];
        };
        isFormattingChange: {
            args: never[];
        };
        filter: {
            args: {
                regex: string;
                __keywords: boolean;
            }[];
        };
        matchDiffLines: {
            args: {
                regex: string;
                ignoreWhiteSpaces: boolean;
                __keywords: boolean;
            }[];
        };
        every: {
            args: never[];
        };
        match: {
            args: never[];
        };
        some: {
            args: never[];
        };
        map: {
            args: {
                attr: string;
            }[];
        };
    };
};
