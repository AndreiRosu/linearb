export const argsDefinitionsByAction = {
  'add-comment@v1': { comment: { name: 'comment', type: 'string' } },
  'add-label@v1': { label: { name: 'label', type: 'string' } },
  'add-labels@v1': { labels: { name: 'labels', type: 'list' } },
  'add-reviewers@v1': {
    reviewers: { name: 'reviewers', type: 'list' },
    team_reviewers: { name: 'team_reviewers', type: 'list' },
  },
  'merge@v1': {
    wait_for_all_checks: { name: 'wait_for_all_checks', type: 'boolean' },
    rebase_on_merge: { name: 'rebase_on_merge', type: 'boolean' },
    squash_on_merge: { name: 'squash_on_merge', type: 'boolean' },
  },
  'require-reviewers@v1': { reviewers: { name: 'reviewers', type: 'list' } },
  'set-required-approvals@v1': {
    approvals: { name: 'approvals', type: 'number' },
  },
  'request-changes@v1': {
    comment: { name: 'comment', type: 'number' },
  },
};

export const listify = [
  argsDefinitionsByAction['add-reviewers@v1'].reviewers.name,
  argsDefinitionsByAction['require-reviewers@v1'].reviewers.name,
  argsDefinitionsByAction['add-reviewers@v1'].team_reviewers.name,
  argsDefinitionsByAction['add-labels@v1'].labels.name,
];
