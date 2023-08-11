export const SUPPORTED_TRIGGERS = {
  COMMIT: 'commit',
  PR_CREATED: 'pr_created',
  COMMENT_ADDED: 'comment_added',
  LABEL_ADDED: 'label_added',
  LABEL_REMOVED: 'label_removed',
};

export const SUPPORTED_ACTIONS = {
  EXPLAIN_CODE_EXPERTS: 'explain-code-experts@v1',
  ADD_COMMENT: 'add-comment@v1',
  ADD_LABEL: 'add-label@v1',
  ADD_LABELS: 'add-labels@v1',
  ADD_REVIEWERS: 'add-reviewers@v1',
  APPROVE: 'approve@v1',
  MERGE: 'merge@v1',
  SET_REQUIRED_APPROVALS: 'set-required-approvals@v1',
  REQUIRE_REVIEWER: 'require-reviewers@v1',
  REQUEST_CHANGES: 'request-changes@v1',
  UPDATE_CHECK: 'update-check@v1',
  CLOSE: 'close@v1',
  HTTP_REQUEST: 'http-request@v1',
  INVOKE_GITHUB_ACTION: 'invoke-github-action@v1',
};

export const SUPPORTED_ACTIONS_BY_PROVIDER = {
  default: SUPPORTED_ACTIONS,
  gitlab: {
    ADD_COMMENT: 'add-comment@v1',
    ADD_LABEL: 'add-label@v1',
    ADD_LABELS: 'add-labels@v1',
    ADD_REVIEWERS: 'add-reviewers@v1',
    APPROVE: 'approve@v1',
    MERGE: 'merge@v1',
    CLOSE: 'close@v1',
    EXPLAIN_CODE_EXPERTS: 'explain-code-experts@v1',
  },
};

export const SUPPORTED_ARGUMENTS_BY_ACTION = {
  [SUPPORTED_ACTIONS.EXPLAIN_CODE_EXPERTS]: ['lt', 'gt'],
  [SUPPORTED_ACTIONS.ADD_COMMENT]: ['comment', 'pin_uid'],
  [SUPPORTED_ACTIONS.ADD_LABEL]: ['label', 'color'],
  [SUPPORTED_ACTIONS.ADD_LABELS]: ['labels'],
  [SUPPORTED_ACTIONS.ADD_REVIEWERS]: [
    'reviewers',
    'team_reviewers',
    'unless_reviewers_set',
    'fail_on_error',
  ],
  [SUPPORTED_ACTIONS.MERGE]: [
    'wait_for_all_checks',
    'rebase_on_merge',
    'squash_on_merge',
  ],
  [SUPPORTED_ACTIONS.SET_REQUIRED_APPROVALS]: ['approvals'],
  [SUPPORTED_ACTIONS.REQUEST_CHANGES]: ['comment'],
  [SUPPORTED_ACTIONS.REQUIRE_REVIEWER]: [
    'reviewers',
    'also_assign',
    'team_reviewers',
    'fail_on_error',
  ],
  [SUPPORTED_ACTIONS.HTTP_REQUEST]: [
    'url',
    'method',
    'user',
    'body',
    'timeout',
    'headers',
  ],
  [SUPPORTED_ACTIONS.INVOKE_GITHUB_ACTION]: [
    'owner',
    'repo',
    'workflow',
    'ref',
    'inputs',
    'check_name',
  ],
  [SUPPORTED_ACTIONS.UPDATE_CHECK]: ['check_name', 'status', 'conclusion'],
};

export const REQUIRED_ARGUMENTS_BY_ACTIONS = {
  [SUPPORTED_ACTIONS.EXPLAIN_CODE_EXPERTS]: { all: false, args: ['lt', 'gt'] },
  [SUPPORTED_ACTIONS.ADD_COMMENT]: { all: true, args: ['comment'] },
  [SUPPORTED_ACTIONS.ADD_LABEL]: { all: true, args: ['label'] },
  [SUPPORTED_ACTIONS.ADD_LABELS]: { all: true, args: ['labels'] },
  [SUPPORTED_ACTIONS.ADD_REVIEWERS]: {
    all: false,
    args: ['reviewers', 'team_reviewers'],
  },
  [SUPPORTED_ACTIONS.SET_REQUIRED_APPROVALS]: {
    all: true,
    args: ['approvals'],
  },
  [SUPPORTED_ACTIONS.REQUEST_CHANGES]: { all: true, args: ['comment'] },
  [SUPPORTED_ACTIONS.REQUIRE_REVIEWER]: {
    all: false,
    args: ['reviewers', 'team_reviewers'],
  },
  [SUPPORTED_ACTIONS.HTTP_REQUEST]: { all: true, args: ['url'] },
  [SUPPORTED_ACTIONS.INVOKE_GITHUB_ACTION]: {
    all: false,
    args: ['owner', 'repo', 'workflow', 'ref'],
  },
  [SUPPORTED_ACTIONS.UPDATE_CHECK]: {
    all: true,
    args: ['check_name', 'status', 'conclusion'],
  },
};

export const VALID_CONTEXT_VARS: string[] = [
  'branch',
  'branch.name',
  'branch.base',
  'branch.diff.size',
  'branch.diff.files_metadata',
  'branch.num_of_commits',
  'files',
  'pr',
  'pr.approvals',
  'pr.author',
  'pr.author_teams',
  'pr.checks',
  'pr.comments',
  'pr.conversations',
  'pr.created_at',
  'pr.draft',
  'pr.description',
  'pr.labels',
  'pr.provider',
  'pr.reviewers',
  'pr.status',
  'pr.target',
  'pr.title',
  'pr.requested_changes',
  'pr.reviews',
  'pr.updated_at',
  'repo',
  'repo.git_activity',
  'repo.age',
  'repo.author_age',
  'repo.blame',
  'repo.contributors',
  'repo.name',
  'repo.owner',
  'source',
  'source.diff.files',
];

export const VALID_FILTERS: Record<string, string[]> = {
  every: ['list'],
  filter: ['list', 'regex', 'term'],
  includes: ['list', 'regex', 'term'],
  map: ['list', 'attr'],
  match: ['list', 'regex', 'term', 'attr'],
  nope: [],
  reject: ['list', 'regex', 'term'],
  some: ['list'],
  allDocs: [],
  allImages: [],
  allTests: [],
  codeExperts: ['gt', 'lt'],
  estimatedReviewTime: [],
  extensions: [],
  extractJitFindings: [],
  extractSonarFindings: [],
  explainCodeExperts: ['gt', 'lt'],
  explainRankByGitBlame: ['gt', 'lt'],
  isFirstCommit: [],
  isFormattingChange: [],
  mapToEnum: [],
  matchDiffLines: ['regex', 'ignoreWhiteSpaces'],
  rankByGitActivity: ['gt', 'lt'],
  rankByGitBlame: ['gt', 'lt'],
  intersection: ['list'],
  difference: ['list'],
};

export const JINJA_FILTERS: string[] = [
  'abs',
  'attr',
  'batch',
  'capitalize',
  'center',
  'default',
  'dictsort',
  'escape',
  'filesizeformat',
  'first',
  'float',
  'forceescape',
  'format',
  'groupby',
  'indent',
  'int',
  'join',
  'last',
  'length',
  'list',
  'lower',
  'map',
  'max',
  'min',
  'pprint',
  'random',
  'reject',
  'rejectattr',
  'replace',
  'reverse',
  'round',
  'safe',
  'select',
  'selectattr',
  'slice',
  'sort',
  'split',
  'string',
  'striptags',
  'sum',
  'title',
  'trim',
  'truncate',
  'unique',
  'upper',
  'urlencode',
  'urlize',
  'wordcount',
  'wordwrap',
  'xmlattr',
  'nl2br',
  'dump',
];

export const VALID_VERSIONS: number[] = [1.0];

export const VALID_ACTIONS = {
  [SUPPORTED_ACTIONS.ADD_COMMENT]: {
    comment: { type: 'string', required: true },
  },
  [SUPPORTED_ACTIONS.ADD_LABEL]: {
    label: { type: 'string', required: true },
    color: { type: 'string', required: false },
  },
  [SUPPORTED_ACTIONS.ADD_LABELS]: {
    labels: { type: 'array', required: true },
  },
  [SUPPORTED_ACTIONS.ADD_REVIEWERS]: {
    reviewers: { type: 'array', required: true },
    team_reviewers: { type: 'array', required: false },
    unless_reviewers_set: { type: 'boolean', required: false },
    fail_on_error: { type: 'boolean', required: false },
  },
  [SUPPORTED_ACTIONS.APPROVE]: {},
  [SUPPORTED_ACTIONS.CLOSE]: {},
  [SUPPORTED_ACTIONS.MERGE]: {
    wait_for_all_checks: { type: 'boolean', required: false },
    rebase_on_merge: { type: 'boolean', required: false },
    squash_on_merge: { type: 'boolean', required: false },
  },
  [SUPPORTED_ACTIONS.SET_REQUIRED_APPROVALS]: {
    approvals: { type: 'number', required: true },
  },
  [SUPPORTED_ACTIONS.REQUEST_CHANGES]: {
    comment: { type: 'string', required: true },
  },
  [SUPPORTED_ACTIONS.REQUIRE_REVIEWER]: {
    reviewers: { type: 'array', required: true },
    also_assign: { type: 'boolean', required: false },
  },
  [SUPPORTED_ACTIONS.EXPLAIN_CODE_EXPERTS]: {
    lt: { type: 'number', required: false },
    gt: { type: 'number', required: false },
  },
  [SUPPORTED_ACTIONS.INVOKE_GITHUB_ACTION]: {
    owner: { type: 'string', required: true },
    repo: { type: 'string', required: true },
    workflow: { type: 'string', required: true },
    ref: { type: 'string', required: true },
    inputs: { type: 'number', required: false },
    check_name: { type: 'string', required: false },
  },
};

export const CM_SCHEMA = {
  type: 'object',
  properties: {
    manifest: {
      type: 'object',
      properties: {
        version: { type: 'number', enum: VALID_VERSIONS },
      },
      required: ['version'],
    },
    config: {
      type: 'object',
      properties: {
        ignore_files: { type: 'array', items: { type: 'string' } },
        ignore_repositories: { type: 'array', items: { type: 'string' } },
        // user_mapping: { type: 'array', items: { type: 'array' } },
        admin: {
          type: 'object',
          properties: {
            users: { type: 'array', items: { type: 'string' } },
          },
        },
      },
    },
    on: {
      type: 'array',
      items: { type: 'string', enum: Object.values(SUPPORTED_TRIGGERS) },
    },
    automations: {
      type: 'object',
      patternProperties: {
        '^[a-zA-Z0-9_@]+$': {
          type: 'object',
          properties: {
            on: {
              type: 'array',
              items: {
                type: 'string',
                enum: Object.values(SUPPORTED_TRIGGERS),
              },
            },
            if: { type: 'array' },
            run: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  action: {
                    type: 'string',
                    enum: Object.keys(VALID_ACTIONS),
                  },
                  args: { type: 'object' },
                },
                required: ['action'],
              },
            },
          },
          required: ['if', 'run'],
        },
      },
    },
  },
  required: ['manifest', 'automations'],
};

export const JINJA_EXPRESSION_REGEX = /{{.*?}}/g;
export const REGEX_EXPRESSION = /\/(.*?)\//g;
