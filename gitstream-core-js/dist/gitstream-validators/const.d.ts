export declare const SUPPORTED_TRIGGERS: {
    COMMIT: string;
    PR_CREATED: string;
    COMMENT_ADDED: string;
    LABEL_ADDED: string;
    LABEL_REMOVED: string;
};
export declare const SUPPORTED_ACTIONS: {
    EXPLAIN_CODE_EXPERTS: string;
    ADD_COMMENT: string;
    ADD_LABEL: string;
    ADD_LABELS: string;
    ADD_REVIEWERS: string;
    APPROVE: string;
    MERGE: string;
    SET_REQUIRED_APPROVALS: string;
    REQUIRE_REVIEWER: string;
    REQUEST_CHANGES: string;
    UPDATE_CHECK: string;
    CLOSE: string;
    HTTP_REQUEST: string;
    INVOKE_GITHUB_ACTION: string;
};
export declare const SUPPORTED_ACTIONS_BY_PROVIDER: {
    default: {
        EXPLAIN_CODE_EXPERTS: string;
        ADD_COMMENT: string;
        ADD_LABEL: string;
        ADD_LABELS: string;
        ADD_REVIEWERS: string;
        APPROVE: string;
        MERGE: string;
        SET_REQUIRED_APPROVALS: string;
        REQUIRE_REVIEWER: string;
        REQUEST_CHANGES: string;
        UPDATE_CHECK: string;
        CLOSE: string;
        HTTP_REQUEST: string;
        INVOKE_GITHUB_ACTION: string;
    };
    gitlab: {
        ADD_COMMENT: string;
        ADD_LABEL: string;
        ADD_LABELS: string;
        ADD_REVIEWERS: string;
        APPROVE: string;
        MERGE: string;
        CLOSE: string;
        EXPLAIN_CODE_EXPERTS: string;
    };
};
export declare const SUPPORTED_ARGUMENTS_BY_ACTION: {
    [x: string]: string[];
};
export declare const REQUIRED_ARGUMENTS_BY_ACTIONS: {
    [x: string]: {
        all: boolean;
        args: string[];
    };
};
export declare const VALID_CONTEXT_VARS: string[];
export declare const VALID_FILTERS: Record<string, string[]>;
export declare const JINJA_FILTERS: string[];
export declare const VALID_VERSIONS: number[];
export declare const VALID_ACTIONS: {
    [x: string]: {
        comment: {
            type: string;
            required: boolean;
        };
        label?: undefined;
        color?: undefined;
        labels?: undefined;
        reviewers?: undefined;
        team_reviewers?: undefined;
        unless_reviewers_set?: undefined;
        fail_on_error?: undefined;
        wait_for_all_checks?: undefined;
        rebase_on_merge?: undefined;
        squash_on_merge?: undefined;
        approvals?: undefined;
        also_assign?: undefined;
        lt?: undefined;
        gt?: undefined;
        owner?: undefined;
        repo?: undefined;
        workflow?: undefined;
        ref?: undefined;
        inputs?: undefined;
        check_name?: undefined;
    } | {
        label: {
            type: string;
            required: boolean;
        };
        color: {
            type: string;
            required: boolean;
        };
        comment?: undefined;
        labels?: undefined;
        reviewers?: undefined;
        team_reviewers?: undefined;
        unless_reviewers_set?: undefined;
        fail_on_error?: undefined;
        wait_for_all_checks?: undefined;
        rebase_on_merge?: undefined;
        squash_on_merge?: undefined;
        approvals?: undefined;
        also_assign?: undefined;
        lt?: undefined;
        gt?: undefined;
        owner?: undefined;
        repo?: undefined;
        workflow?: undefined;
        ref?: undefined;
        inputs?: undefined;
        check_name?: undefined;
    } | {
        labels: {
            type: string;
            required: boolean;
        };
        comment?: undefined;
        label?: undefined;
        color?: undefined;
        reviewers?: undefined;
        team_reviewers?: undefined;
        unless_reviewers_set?: undefined;
        fail_on_error?: undefined;
        wait_for_all_checks?: undefined;
        rebase_on_merge?: undefined;
        squash_on_merge?: undefined;
        approvals?: undefined;
        also_assign?: undefined;
        lt?: undefined;
        gt?: undefined;
        owner?: undefined;
        repo?: undefined;
        workflow?: undefined;
        ref?: undefined;
        inputs?: undefined;
        check_name?: undefined;
    } | {
        reviewers: {
            type: string;
            required: boolean;
        };
        team_reviewers: {
            type: string;
            required: boolean;
        };
        unless_reviewers_set: {
            type: string;
            required: boolean;
        };
        fail_on_error: {
            type: string;
            required: boolean;
        };
        comment?: undefined;
        label?: undefined;
        color?: undefined;
        labels?: undefined;
        wait_for_all_checks?: undefined;
        rebase_on_merge?: undefined;
        squash_on_merge?: undefined;
        approvals?: undefined;
        also_assign?: undefined;
        lt?: undefined;
        gt?: undefined;
        owner?: undefined;
        repo?: undefined;
        workflow?: undefined;
        ref?: undefined;
        inputs?: undefined;
        check_name?: undefined;
    } | {
        comment?: undefined;
        label?: undefined;
        color?: undefined;
        labels?: undefined;
        reviewers?: undefined;
        team_reviewers?: undefined;
        unless_reviewers_set?: undefined;
        fail_on_error?: undefined;
        wait_for_all_checks?: undefined;
        rebase_on_merge?: undefined;
        squash_on_merge?: undefined;
        approvals?: undefined;
        also_assign?: undefined;
        lt?: undefined;
        gt?: undefined;
        owner?: undefined;
        repo?: undefined;
        workflow?: undefined;
        ref?: undefined;
        inputs?: undefined;
        check_name?: undefined;
    } | {
        wait_for_all_checks: {
            type: string;
            required: boolean;
        };
        rebase_on_merge: {
            type: string;
            required: boolean;
        };
        squash_on_merge: {
            type: string;
            required: boolean;
        };
        comment?: undefined;
        label?: undefined;
        color?: undefined;
        labels?: undefined;
        reviewers?: undefined;
        team_reviewers?: undefined;
        unless_reviewers_set?: undefined;
        fail_on_error?: undefined;
        approvals?: undefined;
        also_assign?: undefined;
        lt?: undefined;
        gt?: undefined;
        owner?: undefined;
        repo?: undefined;
        workflow?: undefined;
        ref?: undefined;
        inputs?: undefined;
        check_name?: undefined;
    } | {
        approvals: {
            type: string;
            required: boolean;
        };
        comment?: undefined;
        label?: undefined;
        color?: undefined;
        labels?: undefined;
        reviewers?: undefined;
        team_reviewers?: undefined;
        unless_reviewers_set?: undefined;
        fail_on_error?: undefined;
        wait_for_all_checks?: undefined;
        rebase_on_merge?: undefined;
        squash_on_merge?: undefined;
        also_assign?: undefined;
        lt?: undefined;
        gt?: undefined;
        owner?: undefined;
        repo?: undefined;
        workflow?: undefined;
        ref?: undefined;
        inputs?: undefined;
        check_name?: undefined;
    } | {
        reviewers: {
            type: string;
            required: boolean;
        };
        also_assign: {
            type: string;
            required: boolean;
        };
        comment?: undefined;
        label?: undefined;
        color?: undefined;
        labels?: undefined;
        team_reviewers?: undefined;
        unless_reviewers_set?: undefined;
        fail_on_error?: undefined;
        wait_for_all_checks?: undefined;
        rebase_on_merge?: undefined;
        squash_on_merge?: undefined;
        approvals?: undefined;
        lt?: undefined;
        gt?: undefined;
        owner?: undefined;
        repo?: undefined;
        workflow?: undefined;
        ref?: undefined;
        inputs?: undefined;
        check_name?: undefined;
    } | {
        lt: {
            type: string;
            required: boolean;
        };
        gt: {
            type: string;
            required: boolean;
        };
        comment?: undefined;
        label?: undefined;
        color?: undefined;
        labels?: undefined;
        reviewers?: undefined;
        team_reviewers?: undefined;
        unless_reviewers_set?: undefined;
        fail_on_error?: undefined;
        wait_for_all_checks?: undefined;
        rebase_on_merge?: undefined;
        squash_on_merge?: undefined;
        approvals?: undefined;
        also_assign?: undefined;
        owner?: undefined;
        repo?: undefined;
        workflow?: undefined;
        ref?: undefined;
        inputs?: undefined;
        check_name?: undefined;
    } | {
        owner: {
            type: string;
            required: boolean;
        };
        repo: {
            type: string;
            required: boolean;
        };
        workflow: {
            type: string;
            required: boolean;
        };
        ref: {
            type: string;
            required: boolean;
        };
        inputs: {
            type: string;
            required: boolean;
        };
        check_name: {
            type: string;
            required: boolean;
        };
        comment?: undefined;
        label?: undefined;
        color?: undefined;
        labels?: undefined;
        reviewers?: undefined;
        team_reviewers?: undefined;
        unless_reviewers_set?: undefined;
        fail_on_error?: undefined;
        wait_for_all_checks?: undefined;
        rebase_on_merge?: undefined;
        squash_on_merge?: undefined;
        approvals?: undefined;
        also_assign?: undefined;
        lt?: undefined;
        gt?: undefined;
    };
};
export declare const CM_SCHEMA: {
    type: string;
    properties: {
        manifest: {
            type: string;
            properties: {
                version: {
                    type: string;
                    enum: number[];
                };
            };
            required: string[];
        };
        config: {
            type: string;
            properties: {
                ignore_files: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
                ignore_repositories: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
                admin: {
                    type: string;
                    properties: {
                        users: {
                            type: string;
                            items: {
                                type: string;
                            };
                        };
                    };
                };
            };
        };
        on: {
            type: string;
            items: {
                type: string;
                enum: string[];
            };
        };
        automations: {
            type: string;
            patternProperties: {
                '^[a-zA-Z0-9_@]+$': {
                    type: string;
                    properties: {
                        on: {
                            type: string;
                            items: {
                                type: string;
                                enum: string[];
                            };
                        };
                        if: {
                            type: string;
                        };
                        run: {
                            type: string;
                            items: {
                                type: string;
                                properties: {
                                    action: {
                                        type: string;
                                        enum: string[];
                                    };
                                    args: {
                                        type: string;
                                    };
                                };
                                required: string[];
                            };
                        };
                    };
                    required: string[];
                };
            };
        };
    };
    required: string[];
};
export declare const JINJA_EXPRESSION_REGEX: RegExp;
export declare const REGEX_EXPRESSION: RegExp;
