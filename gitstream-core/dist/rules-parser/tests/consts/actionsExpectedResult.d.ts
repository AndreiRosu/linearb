export declare const actionExpectedResult: {
    errors: {};
    validatorErrors: {};
    automations: {
        suggest_code_experts: {
            if: {
                passed: boolean;
            }[];
            run: {
                action: string;
                args: {
                    gt: number;
                    comment: string;
                };
            }[];
            passed: boolean;
        };
        approve_safe_changes: {
            if: {
                passed: boolean;
            }[];
            run: {
                action: string;
            }[];
            passed: boolean;
        };
    };
    analytics: {
        match: {
            args: {
                term: string;
                __keywords: boolean;
            }[];
        };
        some: {
            args: never[];
        };
        isFormattingChange: {
            args: never[];
        };
        allDocs: {
            args: never[];
        };
        allImages: {
            args: never[];
        };
    };
};
