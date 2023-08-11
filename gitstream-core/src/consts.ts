export const ENVS = {
  PROD: 'prod',
  DEV: 'dev',
  LOCAL: 'local',
};
export const ENV = ENVS.PROD;
export const BASE_URL =
  ENV === ENVS.PROD
    ? 'https://workerb.linearb.io'
    : ENV === ENVS.DEV
    ? 'https://workerb.linearb-dev-03.io'
    : 'http://localhost:3131';

export const AWS_BASE_URL =
  'https://gtxblnqb99.execute-api.us-west-1.amazonaws.com/prod';

export const API_ENDPOINTS = {
  REVIEW_TIME: AWS_BASE_URL + '/v1/pulls/review-time',
  EXPERT_REVIWER: AWS_BASE_URL + '/gs/v1/data-service/expert-reviewer',
};

const PACKAGE_NAME = 'gitstream-rules-parser';

export const ERRORS = {
  FAILED_RENDER_STRING: PACKAGE_NAME + ' - failed render string',
  FAILED_YAML_LOAD: PACKAGE_NAME + ' - failed yaml.load',
  INVALID_CM: PACKAGE_NAME + ' - invalid cm',
  INVALID_CM_CONTEXT_VARIABLES: PACKAGE_NAME + ' - ContextVariableValidator',
};

export const STATUS_CODES = {
  FAILED_RENDER_STRING: 80,
  FAILED_YAML_LOAD: 81,
  INVALID_CM: 82,
  INVALID_CM_CONTEXT_VARIABLES: 83,
};
