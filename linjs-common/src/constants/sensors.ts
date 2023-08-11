export const SENSOR_NAMES = {
  CLUBHOUSE: 'clubhouse',
  AZURE_DEVOPS: 'azure_devops',
  GITLAB: 'gitlab',
  GITHUB: 'github',
  JIRA: 'JIRA',
  SLACK: 'slack',
  BITBUCKET_SERVER: 'bitbucket_server',
  BITBUCKET: 'bitbucket',
  MS_TEAMS: 'azure_ad_oauth2',
  SAML_SSO: 'saml'
};

export const SENSOR_STATES = {
  // SELECT unnest(enum_range(NULL::authorization_state)):
  // ok, failing, inactive, in-progress, insufficient-permission, deleted
  "insufficient-permission": 'insufficient-permission',
  deleted: 'deleted',
  failing: 'failing',
  inactive: 'inactive',
  inProgress: 'in-progress',
  ok: 'ok'
};

