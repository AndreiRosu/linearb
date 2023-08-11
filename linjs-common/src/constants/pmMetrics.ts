

export const ISSUE_COUNT_CALCULATION_STRATEGY = 'count';
export const STORY_POINTS_CALCULATION_STRATEGY = 'story_points';
export const ISSUE_COUNT_METRIC_NAME = 'pm.issue.count';
export const ISSUE_TRANSITION_METRIC_NAME = 'pm.issue.state_transition';

export const PM_CALCULATION_STRATEGY = {
  ISSUE_COUNT: {
    name: 'Count issues',
    value: ISSUE_COUNT_CALCULATION_STRATEGY
  },
  STORY_POINTS: {
    name: 'Story points sum',
    value: STORY_POINTS_CALCULATION_STRATEGY
  }
};

export const CUSTOM_PM_METRICS_TYPES = {
  ISSUE_COUNT: {
    name: 'Single Jira State',
    value: ISSUE_COUNT_METRIC_NAME
  },
  ISSUE_TRANSITION: {
    name: 'Transition between 2 states',
    value: ISSUE_TRANSITION_METRIC_NAME
  }
};
