export const SettingValues = {
  PM_IMPORT_STRATEGY: 'pmImportStrategy',
  METRICS_CALCULATION_STRATEGY: 'metricsCalculationStrategy',
  ITERATION_STRATEGY: 'iterationStrategy',
  DEFAULT_BOARD: 'defaultBoard',
  PERFORMANCE_ENABLED: 'performanceEnabled',
  MERGED_USERS_ENABLED: 'showMergedUsers',
  NEW_WORK_SMALL_TOP_RANGE: 'newWorkSmallTopRange',
  NEW_WORK_MEDIUM_TOP_RANGE: 'newWorkMediumTopRange',
  CODE_CHANGES_SMALL_TOP_RANGE: 'codeChangesSmallTopRange',
  CODE_CHANGES_MEDIUM_TOP_RANGE: 'codeChangesMediumTopRange',
  HIGH_RISK_THRESHOLDS: 'workAtRiskNotification',
  LONG_LIVING_THRESHOLDS: 'reviewRequestHangingNotification',
  SUPERFICIAL_REVIEW_THRESHOLDS: 'mergedWithBasicReviewNotification',
  MERGED_WITHOUT_REVIEW_THRESHOLDS: 'mergedWithoutReviewNotification',
  WORKING_DAYS: 'workingDays',
  DAILY_TIME: 'dailyTime',
  MTTR_CONFIG: 'mttrConfig',
  PULL_REQUESTS_LARGER_THAN: 'pullRequestsLargerThan',
  PULL_REQUESTS_OPEN_MORE_THAN: 'pullRequestsOpenMoreThan',
  UNLINKED_BRANCHES: 'unlinkedBranches',
  //TEAM_WIP: 'teamWip',
  WORK_AT_RISK_NOTIFICATION: 'workAtRiskNotification',
  MERGED_WITHOUT_REVIEW_NOTIFICATION: 'mergedWithoutReviewNotification',
  MERGED_WITH_BASIC_REVIEW_NOTIFICATION: 'mergedWithBasicReviewNotification',
  REVIEW_REQUEST_HANGING_NOTIFICATION: 'reviewRequestHangingNotification',
  REVIEW_TOO_LONG_NOTIFICATION: 'reviewTooLongNotification',
  DAILY_DIGEST_NOTIFICATION_THRESHOLDS: 'dailyDigestNotificationThresholds'
};

export const DefinitionLevels = {
  ORGANIZATION: 'organization',
  TEAM: 'team',
  REPOSITORY: 'repository'
};

export const FEATURE_FLAGS_NAMES = {
  metricsCalculationStrategyEnabled: 'metricsCalculationStrategyEnabled',
  enableGitReOauth: 'enableGitReOauth',
  showNewPMReport: 'showNewPMReports',
  msTeamsEnabled: 'msTeamsEnabled',
  showNewInvestmentProfile: 'newInvestmentProfileView',
  getFFValueFromQS: 'getFFValueFromQS',
  SHOW_SLACK_DIGEST_FF: 'showSlackDigestSetting',
  enableSlackOnboarding: 'enableSlackOnboarding',
  enableSlackOnboardingAsFirstStep: 'enableSlackOnboardingAsFirstStep',
  showAccountSetting: 'showAccountSetting',
  showMessageCenter: 'showMessageCenter',
  deleteGitIntegration: 'deleteIntegration',
  projectsView: 'projectsView',
  canConfigProjects: 'canConfigProjects',
  showPulseUnmatchedBranches: 'showPulseUnmatchedBranches',
  newActivityPage: 'newActivityPage',
  showNotificationSettings: 'showNotificationSettings',
  azureReposEnabled: 'azureReposEnabled',
  showNewNotificationsSetting: 'showNewNotificationsSetting',
  qualityMetricsFlow: 'qualityMetricsFlow',
  skipProjectsBoardSelection: 'skipProjectsBoardSelection',
  nextGenSummaryEnabled: 'nextGenSummaryEnabled',
  isMetricsMultiTeamsEnabled: 'isMetricsMultiTeamsEnabled',
  showCFRConfiguration: 'showCFRConfiguration',
  showPMMetricsReport: 'showPMMetricsReport',
  apiTokens: 'apiTokens',
  addIntegrationEnabled: 'addIntegrationEnabled',
  pdtForShortcutEnabled: 'pdtForShortcutEnabled',
  upgradeEmptyStateEnabled: 'upgradeEmptyStateEnabled',
  upgradeGoalsEmptyStateEnabled: 'upgradeGoalsEmptyStateEnabled',
  metricsBenchmarks: 'metricsBenchmarks',
  viewerOnly: 'viewerOnly',
  projectsIssuesView: 'projectsIssuesView',
  ssoEnabled: 'ssoEnabled',
  newMttrCfrFilters: 'newMttrCfrFilters',
  projectsIterationsConfigEnabled: 'projectsIterationsConfigEnabled',
  hidePersonalInformationEnabled: 'hidePersonalInformationEnabled',
  servicesTabEnabled: 'servicesTabEnabled',
  metricsFilterByServiceEnabled: 'metricsFilterByServiceEnabled',
  showTeamsDashboard: 'showTeamsDashboard',
  showMetricsV3: 'showMetricsV3',
  ignorePmMetaDataEnabled: 'ignorePmMetaDataEnabled',
  teamPMConfigurationEnabled: 'teamPMConfigurationEnabled',
  githubFetchLargeRepos: 'githubFetchLargeRepos',
  githubFetchAllRepoTypes: 'githubFetchAllRepoTypes',
  contributorsAndTeamsSettingsEnabled: 'contributorsAndTeamsSettingsEnabled',
  settingsIntegrationsV2Enabled: 'settingsIntegrationsV2Enabled',
  favoriteProjectsEnabled: 'favoriteProjectsEnabled',
  workerbInlinePrApproveEnabled: 'workerb-actions-inline-pr-approve',
  isLinearbOnly: 'isLinearbOnly',
  assigneeNameEnable: 'assigneeNameEnable',
  showGoalsWidgets: 'showGoalsWidgets',
  showPRMaturityMetric: 'showPRMaturityMetric',
  isCustomPmMetricsEnabled: 'isCustomPmMetricsEnabled',
  capacityAccuracyEnabled: 'capacityAccuracyEnabled',
  projectSettingsFixVersionEnabled: 'projectSettingsFixVersionEnabled',
  analyzeJiraSubTasks: 'analyzeJiraSubTasks',
  newPdtConfigurationEnabled: 'newPdtConfigurationEnabled',
  nextGenProjectViewEnabled: 'nextGenProjectViewEnabled',
  enablePRCheckNotifications: 'enablePRCheckNotifications',
  workerBActionsEnabled: 'workerBActionsEnabled',
  workerbShareUnassignedPR: 'workerbShareUnassignedPR',
  slackCommandsEnabled: 'slackCommandsEnabled',
  showEstimatedReviewTime: 'showEstimatedReviewTime',
  workerbActionsInlinePrApprove: 'workerb-actions-inline-pr-approve',
  hidePersonalInformationDashboardEnabled: 'hidePersonalInformationDashboardEnabled',
  moveMergeContributorsButtons: 'moveMergeContributorsButtons'
};

export const MEDIAN_VALUES = {
  p50: 'p50',
  p75: 'p75'
};
