export const RULES_RESOLVER_URL = process.env.RULES_RESOLVER_URL;
export const HEAD_REF = process.env.HEAD_REF;
export const BASE_REF = process.env.BASE_REF;
export const CLIENT_PAYLOAD = process.env.CLIENT_PAYLOAD || '{}';
export const RESOLVER_TOKEN = process.env.RULES_RESOLVER_TOKEN;
export const DEBUG_MODE = process.env.DEBUG_MODE === 'true';
export const USE_CACHE = process.env.USE_CACHE === 'true';
export const ERRORS = {
  SYNTAX_ERROR: 'syntax error',
  RULE_FILE_NOT_FOUND: 'Rule file not found',
  FAILED_TO_EXTRACT_ADMINS:
    'gitstream.cm file not found - failed to extract admins',
  SEND_RESULTS_TO_RESOLVER_FAILED:
    'Failed sending evaluated rules to the resolver.',
  SEND_RESULTS_TO_RESOLVER_SUCCEEDED:
    'Sending evaluated rules to the resolver succeeded',
  FAILED_TO_GET_CONTEXT: 'Failed getting PR context.',
  FAILED_PARSE_CM_FILE: 'Failed while parsing CM file, to extract CM config',
  MISSING_KEYWORD: 'Missing `automations` keyword in *.cm',
  MALFORMED_EXPRESSION:
    'There are spaces between the currly braces { { and } }',
  FAILED_TO_PARSE_CM: 'Failed to parse cm',
  FAILED_TO_GET_WATCHERS: 'Failed to get watchers from rules files',
  GIT_COMMAND_FAILED: 'Git command failed. reason:',
  INTERNAL_ERROR: 'gitstream-rules-engine internal error',
  INVALID_CACHE: 'Invalid cache',
  VALIDATOR_ERROR: 'Validator error',
  FAILED_PARSE_RULES_PARSER_ERRORS: 'Failed parse rules parser errors',
};

export const STATUS_CODES = {
  SEND_RESULTS_TO_RESOLVER_FAILED: 50,
  FAILED_TO_GET_CONTEXT: 40,
  SYNTAX_ERROR: 60,
  MISSING_KEYWORD: 61,
  UNSUPPORTED_ACTION: 62,
  UNSUPPORTED_ARGUMENT: 63,
  MALFORMED_EXPRESSION: 64,
  MISSING_REQUIRED_FIELDS: 65,
  FAILED_TO_PARSE_CM: 66,
  BAD_REVISION: 67,
  INTERNAL_ERROR: 68,
  RULE_FILE_NOT_FOUND: 70,
  FAILED_TO_GET_WATCHERS: 71,
  INVALID_CACHE: 72,
  FAILED_PARSE_RULES_PARSER_ERRORS: 73,
};

export const NOT_FOUND_FILE_PATH = '/dev/null';

export const IGNORE_PATTERNS_IN_DRY_RUN = [/.*.cm$/];

export const GIT_PROVIDER = {
  GITHUB: 'github',
  GITLAB: 'gitlab',
};

export const ORG_LEVEL_REPO = 'cm';

export const WATCH_PR_EVENTS = {
  APPROVALS: 'approvals',
  CHECKS: 'checks',
  DRAFT: 'draft',
  DESCRIPTION: 'description',
  REVIEWERS: 'reviewers',
  STATUS: 'status',
  TITLE: 'title',
  LABELS: 'labels',
};

export const WATCH_FILTERS = {
  sonarParser: /\bpr\s*\|\s*sonarParser\b/g,
  extractSonarFindings: /\bpr\s*\|\s*extractSonarFindings\b/g,
};

export const RULES_PARSER_STATUS_CODES = {
  FAILED_RENDER_STRING: 80,
  FAILED_YAML_LOAD: 81,
  INVALID_CM: 82,
  INVALID_CM_CONTEXT_VARIABLES: 83,
};
