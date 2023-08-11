export declare const RULES_RESOLVER_URL: string | undefined;
export declare const HEAD_REF: string | undefined;
export declare const BASE_REF: string | undefined;
export declare const CLIENT_PAYLOAD: string;
export declare const RESOLVER_TOKEN: string | undefined;
export declare const DEBUG_MODE: boolean;
export declare const USE_CACHE: boolean;
export declare const ERRORS: {
    SYNTAX_ERROR: string;
    RULE_FILE_NOT_FOUND: string;
    FAILED_TO_EXTRACT_ADMINS: string;
    SEND_RESULTS_TO_RESOLVER_FAILED: string;
    SEND_RESULTS_TO_RESOLVER_SUCCEEDED: string;
    FAILED_TO_GET_CONTEXT: string;
    FAILED_PARSE_CM_FILE: string;
    MISSING_KEYWORD: string;
    MALFORMED_EXPRESSION: string;
    FAILED_TO_PARSE_CM: string;
    FAILED_TO_GET_WATCHERS: string;
    GIT_COMMAND_FAILED: string;
    INTERNAL_ERROR: string;
    INVALID_CACHE: string;
    VALIDATOR_ERROR: string;
    FAILED_PARSE_RULES_PARSER_ERRORS: string;
};
export declare const STATUS_CODES: {
    SEND_RESULTS_TO_RESOLVER_FAILED: number;
    FAILED_TO_GET_CONTEXT: number;
    SYNTAX_ERROR: number;
    MISSING_KEYWORD: number;
    UNSUPPORTED_ACTION: number;
    UNSUPPORTED_ARGUMENT: number;
    MALFORMED_EXPRESSION: number;
    MISSING_REQUIRED_FIELDS: number;
    FAILED_TO_PARSE_CM: number;
    BAD_REVISION: number;
    INTERNAL_ERROR: number;
    RULE_FILE_NOT_FOUND: number;
    FAILED_TO_GET_WATCHERS: number;
    INVALID_CACHE: number;
    FAILED_PARSE_RULES_PARSER_ERRORS: number;
};
export declare const NOT_FOUND_FILE_PATH = "/dev/null";
export declare const IGNORE_PATTERNS_IN_DRY_RUN: RegExp[];
export declare const GIT_PROVIDER: {
    GITHUB: string;
    GITLAB: string;
};
export declare const ORG_LEVEL_REPO = "cm";
export declare const WATCH_PR_EVENTS: {
    APPROVALS: string;
    CHECKS: string;
    DRAFT: string;
    DESCRIPTION: string;
    REVIEWERS: string;
    STATUS: string;
    TITLE: string;
    LABELS: string;
};
export declare const WATCH_FILTERS: {
    sonarParser: RegExp;
    extractSonarFindings: RegExp;
};
export declare const RULES_PARSER_STATUS_CODES: {
    FAILED_RENDER_STRING: number;
    FAILED_YAML_LOAD: number;
    INVALID_CM: number;
    INVALID_CM_CONTEXT_VARIABLES: number;
};
