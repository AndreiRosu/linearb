import _ from 'lodash-es';

var ARTICLE_IDS = {
  CYCLE_TIME: 'v9pckvmkbj',
  POINT_IN_HISTORY: 'kv6i92sezl',
  CONNECT_JIRA_BOARD: '2mc7kl8sot',
  ONBOARDING_TROUBLESHOOT: 'jnnhljaqyu',
  INITIAL_TEAM: 'i6z0gcvril',
  PULSE_NAMING: '80cg9o0dhu',
  WIP: 'a93cjbshlp',
  DONE_IN_ITERATION: 'fra4z93dex',
  CARRYOVER: 's6avo913wv',
  HIGH_RISK: '7mjk0k1rgm',
  HIGH_REWROK: 'h1kr5vx2fd',
  WORK_BREAKDOWN: 'tpxx3m8cwb',
  THROUGHPUT_METRICS: 'tpmxyz5ei7',
  REVIEW_DEPTH: 'sf643osbmq',
  MERGED_WITHOUT_REVIEW: 's0jjewxoh9',
  PR_SIZE: 'x1620txj8m',
  BRANCH_STATE: '83dyr15yme',
  PR_STATE: 'oknqh6k7cn',
  CODE_CHANGES_RATE: 'fypuctwrek',
  DEPLOYMENT_FREQ: 'gm1zmtps8p',
  PR_OPEN_RATE: 'l0irnv33z7',
  UPDATED_IN_ITERATION: '3a56ox8pyl',
  MERGED_IN_ITERATION: 'x4448wfnyx',
  LIGHTNING_PR: '69f29yawrr',
  HIGH_INT_PR: 'zzjmzqx1ku',
  LONG_LIVING_PR: 'gvf7nqpyb3',
  REVIEW_REQUEST_HANGING: 'bg6c46ds1y',
  WHO_IS_ACTIVE: '9hdw53zd0n',
  NOTIFICATION_TYPES: '16zfs7qnli',
  CONNECT_PM: 'p0a1a6m12x'
};

var _metricDisplayValues, _METRICS_BENCHMARKS, _CYCLE_TIME_METRICS_B;
var METRICS_LIST = [{
  name: 'Cycle Time',
  description: 'Time from first commit to release'
}, {
  name: 'Coding Time',
  description: 'Time from first commit to pull request creation'
}, {
  name: 'Pickup Time',
  description: 'Time from pull request creation to review'
}, {
  name: 'Review Time',
  description: 'Time from review begining to pull request merged'
}, {
  name: 'Deploy Time',
  description: 'Time from pull request merge to release'
}, {
  name: 'PR Size',
  description: 'Size of pull request (total lines of code changed)'
}, {
  name: 'Review Depth',
  description: 'Avg. number of comments per review'
}, {
  name: 'New code',
  description: 'Ratio of new code'
}, {
  name: 'Refactor',
  description: 'Ratio of legacy code changed (more than 21 days)'
}, {
  name: 'Rework',
  description: 'Ratio of novice code changed (less than 21 days)'
}, {
  name: 'PRs merged w/o review',
  description: 'Numbre of pull requests merged without any review'
}, {
  name: 'Code changes',
  description: 'Lines of code changed'
}, {
  name: 'Commits',
  description: 'Number of commits'
}, {
  name: 'PRs opened',
  description: 'Number of pull requests opened'
}, {
  name: 'PRs merged',
  description: 'Number of pull requests merged'
}, {
  name: 'Reviews',
  description: 'Number of pull requests reviews'
}, {
  name: 'Releases',
  description: 'Number of releases (based on release detection strategy)'
}, {
  name: 'Deploy frequency',
  description: 'Avg. of releases per day'
}, {
  name: 'Active days',
  description: 'Number of days with Git activity (commits, PRs, Reviews etc.)'
}, {
  name: 'Active Branches',
  description: 'Number of branches in active state'
}, {
  name: 'Done Branches',
  description: 'Number of branches moved to state merged or releaaed '
}, {
  name: 'Caarryover',
  description: 'Number of branches that were active in the last day of the iteration '
}];
var V2_METRICS_NAMES = {
  PR_MERGED: 'pr.merged',
  MERGED_LARGE_PRS: 'pull_request_size_larger_than_evaluation',
  MERGED_LONG_LIVING_PRS: 'pull_request_open_more_than_evaluation',
  MERGED_UNLINKED_PRS: '',
  MERGED_REVIEW_REQUEST_HANGING: 'hanging_pr_without_review_evaluation',
  MERGED_WITHOUT_REVIEW: 'material_pr_merged_without_review_evaluation',
  MERGED_WORK_AT_RISK_PRS: 'high_risk_pull_request_evaluation',
  MERGED_WITH_BASIC_REVIEW_PRS: 'material_pr_merged_with_superficial_review_evaluation',
  MERGED_LONG_REVIEW_PRS: 'review_too_long_pull_request_evaluation',
  CFR_ISSUES_DONE: 'pm.cfr.issues.done'
};
var metricNames = {
  TIME_TO_PR: 'branch.time_to_pr',
  TIME_TO_PR_MERGED: 'branch.merged.time_to_pr',
  TIME_TO_REVIEW: 'branch.time_to_review',
  TIME_TO_REVIEW_MERGED: 'branch.merged.time_to_review',
  TIME_TO_PROD: 'branch.time_to_prod',
  REVIEW_TIME: 'branch.review_time',
  REVIEW_TIME_MERGED: 'branch.merged.review_time',
  ACTIVE_BRANCHES: 'branch.state.active',
  DELETED_BRANCHES: 'branch.state.deleted',
  MERGED_BRANCHES: 'branch.state.merged',
  DEPLOYED_BRANCHES: 'branch.state.deployed',
  DONE_BRANCHES: 'branch.state.computed.done',
  CYCLE_TIME: 'branch.computed.cycle_time',
  ACTIVE_DAYS: 'commit.activity_days',
  NEW_WORK: 'commit.activity.new_work.count',
  REWORK: 'commit.activity.rework.count',
  REFACTOR: 'commit.activity.refactor.count',
  TOTAL_ACTIVITY: 'commit.activity.total.count',
  COMMIT_CODE_CHANGES: 'commit.total_changes',
  COMMIT_COUNT: 'commit.total.count',
  REVIEWS: 'pr.reviews',
  REVIEW_DEPTH: 'pr.review_depth',
  PR_NEW: 'pr.new',
  PR_SIZE: 'pr.merged.size',
  PR_MERGED: 'pr.merged',
  PR_MERGED_WITHOUT_REVIEW: 'pr.merged.without.review.count',
  BRANCH_CODE_CHANGES: 'branch.computed.done.activity.total.count',
  RELEASES_COUNT: 'releases.count',
  RELEASES_AVG: 'releases.avg',
  COMMIT_INVOLVED_REPOS_COUNT: 'commit.involved.repos.count'
};
var metricDisplayValues = (_metricDisplayValues = {}, _metricDisplayValues[metricNames.TIME_TO_PR] = {
  displayName: 'Coding time',
  unitType: 'timespan',
  displayLabel: 'Coding time',
  description: 'Time from first commit to pull request creation',
  articleId: ARTICLE_IDS.CYCLE_TIME
}, _metricDisplayValues[metricNames.TIME_TO_REVIEW] = {
  displayName: 'Pickup time',
  unitType: 'timespan',
  articleId: ARTICLE_IDS.CYCLE_TIME
}, _metricDisplayValues[metricNames.TIME_TO_PROD] = {
  displayName: 'Time to deploy',
  unitType: 'timespan',
  articleId: ARTICLE_IDS.CYCLE_TIME
}, _metricDisplayValues[metricNames.REVIEW_TIME] = {
  displayName: 'Review time',
  unitType: 'timespan',
  articleId: ARTICLE_IDS.CYCLE_TIME
}, _metricDisplayValues[metricNames.ACTIVE_BRANCHES] = {
  displayName: 'Active branches',
  unitType: 'count',
  displayLabel: 'Active branches'
}, _metricDisplayValues[metricNames.DONE_BRANCHES] = {
  displayName: 'Done branches',
  unitType: 'count',
  displayLabel: 'Done branches'
}, _metricDisplayValues[metricNames.CYCLE_TIME] = {
  displayName: 'Cycle time',
  unitType: 'timespan',
  articleId: ARTICLE_IDS.CYCLE_TIME
}, _metricDisplayValues[metricNames.ACTIVE_DAYS] = {
  displayName: 'Active days',
  unitType: 'count',
  displayLabel: 'Active days'
}, _metricDisplayValues[metricNames.NEW_WORK] = {
  displayName: 'New code',
  unitType: 'percentage',
  displayLabel: 'New code',
  unitDescription: 'New code',
  articleId: ARTICLE_IDS.WORK_BREAKDOWN
}, _metricDisplayValues[metricNames.REWORK] = {
  displayName: 'Rework',
  unitType: 'percentage',
  displayLabel: 'Code changes',
  unitDescription: 'Rework code',
  articleId: ARTICLE_IDS.WORK_BREAKDOWN
}, _metricDisplayValues[metricNames.REFACTOR] = {
  displayName: 'Refactor',
  unitType: 'percentage',
  displayLabel: 'Code changes',
  unitDescription: 'Refactor code',
  articleId: ARTICLE_IDS.WORK_BREAKDOWN
}, _metricDisplayValues[metricNames.COMMIT_CODE_CHANGES] = {
  displayName: 'Code changes',
  unitType: 'count',
  displayLabel: 'Code changes',
  unitDescription: 'Code changes per',
  articleId: ARTICLE_IDS.THROUGHPUT_METRICS
}, _metricDisplayValues[metricNames.COMMIT_COUNT] = {
  displayName: 'Commits',
  unitType: 'count',
  displayLabel: 'commits',
  unitDescription: 'Commits per',
  articleId: ARTICLE_IDS.THROUGHPUT_METRICS
}, _metricDisplayValues[metricNames.REVIEWS] = {
  displayName: 'Reviews',
  unitType: 'count',
  displayLabel: 'Reviews',
  unitDescription: 'Reviews per',
  articleId: ARTICLE_IDS.THROUGHPUT_METRICS
}, _metricDisplayValues[metricNames.REVIEW_DEPTH] = {
  displayName: 'Review Depth',
  unitType: 'nonAvgCount',
  displayLabel: 'Comments per review',
  unitDescription: 'Comments per review',
  articleId: ARTICLE_IDS.REVIEW_DEPTH
}, _metricDisplayValues[metricNames.PR_NEW] = {
  displayName: 'PRs Opened',
  unitType: 'count',
  displayLabel: 'PRs',
  unitDescription: 'PRs per',
  articleId: ARTICLE_IDS.THROUGHPUT_METRICS
}, _metricDisplayValues[metricNames.PR_MERGED] = {
  displayName: 'PRs Merged',
  unitType: 'count',
  displayLabel: 'PRs',
  unitDescription: 'PRs per',
  articleId: ARTICLE_IDS.THROUGHPUT_METRICS
}, _metricDisplayValues[metricNames.PR_MERGED_WITHOUT_REVIEW] = {
  displayName: 'PRs merged without Review',
  unitType: 'count',
  displayLabel: 'PRs',
  unitDescription: 'PRs per',
  articleId: ARTICLE_IDS.MERGED_WITHOUT_REVIEW
}, _metricDisplayValues[metricNames.PR_SIZE] = {
  displayName: 'PR Size',
  unitType: 'nonAvgCount',
  displayLabel: 'Code changes',
  unitDescription: 'Code changes per PR',
  articleId: ARTICLE_IDS.PR_SIZE
}, _metricDisplayValues[metricNames.BRANCH_CODE_CHANGES] = {
  displayName: 'Branch code changes',
  unitType: 'count',
  displayLabel: 'Branch code changes'
}, _metricDisplayValues[metricNames.RELEASES_COUNT] = {
  displayName: 'Deployment Frequency',
  unitType: 'count',
  displayLabel: 'Deployment Frequency',
  unitDescription: 'Releases per',
  articleId: ARTICLE_IDS.THROUGHPUT_METRICS
}, _metricDisplayValues[metricNames.RELEASES_AVG] = {
  displayName: 'Avg releases',
  unitType: 'count',
  displayLabel: 'Avg releases'
}, _metricDisplayValues[metricNames.TOTAL_ACTIVITY] = {
  displayName: 'Total changes',
  unitType: 'count',
  displayLabel: 'Total changes',
  unitDescription: 'Total changes per',
  articleId: ARTICLE_IDS.THROUGHPUT_METRICS
}, _metricDisplayValues);
var metricsScales = {
  TIME: 'time',
  FREQUENCY: 'frequency',
  CODE_CHANGES: 'code_changes',
  PERCENTAGE: 'percentage'
};
var METRICS_BENCHMARKS = (_METRICS_BENCHMARKS = {}, _METRICS_BENCHMARKS[metricNames.CYCLE_TIME] = {
  unit: 'hours',
  scale: metricsScales.TIME,
  description: "measures the time it takes for a single engineering task to go through the different phases of the delivery process from 'code' to 'production'.",
  avg: [{
    title: 'ELITE',
    icon: 'benchmarkElite',
    icon_color: 'malachiteB',
    min_value: null,
    max_value: 48 * 60 - 1
  }, {
    title: 'STRONG',
    icon: 'benchmarkStrong',
    icon_color: 'cerulean',
    min_value: 48 * 60,
    max_value: 118 * 60 + 59
  }, {
    title: 'FAIR',
    icon: 'benchmarkFair',
    icon_color: 'neonCarrot',
    min_value: 118 * 60,
    max_value: 209 * 60 + 59
  }, {
    title: 'NEEDS FOCUS',
    icon: 'benchmarkNeedsFocus',
    icon_color: 'radicalRed',
    min_value: 210 * 60,
    max_value: null
  }],
  p75: [{
    title: 'ELITE',
    icon: 'benchmarkElite',
    icon_color: 'malachiteB',
    min_value: null,
    max_value: 48 * 60
  }, {
    title: 'STRONG',
    icon: 'benchmarkStrong',
    icon_color: 'cerulean',
    min_value: 48 * 60,
    max_value: 96 * 60
  }, {
    title: 'FAIR',
    icon: 'benchmarkFair',
    icon_color: 'neonCarrot',
    min_value: 96 * 60,
    max_value: 192 * 60 + 59
  }, {
    title: 'NEEDS FOCUS',
    icon: 'benchmarkNeedsFocus',
    icon_color: 'radicalRed',
    min_value: 192 * 60 + 59,
    max_value: null
  }]
}, _METRICS_BENCHMARKS[metricNames.TIME_TO_PR] = {
  unit: 'hours',
  scale: metricsScales.TIME,
  description: "measures the time it takes from the first commit until a pull request is issued. Short Coding Time correlates to low WIP, small PR size and clear requirements.",
  avg: [{
    title: 'ELITE',
    icon: 'benchmarkElite',
    icon_color: 'malachiteB',
    min_value: '',
    max_value: 12 * 60
  }, {
    title: 'STRONG',
    icon: 'benchmarkStrong',
    icon_color: 'cerulean',
    min_value: 12 * 60,
    max_value: 24 * 60
  }, {
    title: 'FAIR',
    icon: 'benchmarkFair',
    icon_color: 'neonCarrot',
    min_value: 24 * 60,
    max_value: 38 * 60 + 59
  }, {
    title: 'NEEDS FOCUS',
    icon: 'benchmarkNeedsFocus',
    icon_color: 'radicalRed',
    min_value: 39 * 60,
    max_value: null
  }],
  p75: [{
    title: 'ELITE',
    icon: 'benchmarkElite',
    icon_color: 'malachiteB',
    min_value: '',
    max_value: 60
  }, {
    title: 'STRONG',
    icon: 'benchmarkStrong',
    icon_color: 'cerulean',
    min_value: 60,
    max_value: 4 * 60
  }, {
    title: 'FAIR',
    icon: 'benchmarkFair',
    icon_color: 'neonCarrot',
    min_value: 4 * 60,
    max_value: 20 * 60 + 59
  }, {
    title: 'NEEDS FOCUS',
    icon: 'benchmarkNeedsFocus',
    icon_color: 'radicalRed',
    min_value: 21 * 60,
    max_value: null
  }]
}, _METRICS_BENCHMARKS[metricNames.TIME_TO_REVIEW] = {
  unit: 'hours',
  scale: metricsScales.TIME,
  description: "measures the time a pull request waits for someone to start reviewing it. Low Pickup Time represents strong teamwork and a healthy review process.",
  avg: [{
    title: 'ELITE',
    icon: 'benchmarkElite',
    icon_color: 'malachiteB',
    min_value: null,
    max_value: 7 * 60
  }, {
    title: 'STRONG',
    icon: 'benchmarkStrong',
    icon_color: 'cerulean',
    min_value: 7 * 60,
    max_value: 12 * 60
  }, {
    title: 'FAIR',
    icon: 'benchmarkFair',
    icon_color: 'neonCarrot',
    min_value: 12 * 60,
    max_value: 18 * 60 + 59
  }, {
    title: 'NEEDS FOCUS',
    icon: 'benchmarkNeedsFocus',
    icon_color: 'radicalRed',
    min_value: 19 * 60,
    max_value: null
  }],
  p75: [{
    title: 'ELITE',
    icon: 'benchmarkElite',
    icon_color: 'malachiteB',
    min_value: null,
    max_value: 1.5 * 60
  }, {
    title: 'STRONG',
    icon: 'benchmarkStrong',
    icon_color: 'cerulean',
    min_value: 1.5 * 60,
    max_value: 5 * 60
  }, {
    title: 'FAIR',
    icon: 'benchmarkFair',
    icon_color: 'neonCarrot',
    min_value: 5 * 60,
    max_value: 15 * 60 + 59
  }, {
    title: 'NEEDS FOCUS',
    icon: 'benchmarkNeedsFocus',
    icon_color: 'radicalRed',
    min_value: 16 * 60,
    max_value: null
  }]
}, _METRICS_BENCHMARKS[metricNames.REVIEW_TIME] = {
  unit: 'hours',
  scale: metricsScales.TIME,
  description: "measures the time it takes to complete a code review and get a pull request merged. Low Review Time represents strong teamwork and a healthy review process.",
  avg: [{
    title: 'ELITE',
    icon: 'benchmarkElite',
    icon_color: 'malachiteB',
    min_value: null,
    max_value: 6 * 60
  }, {
    title: 'STRONG',
    icon: 'benchmarkStrong',
    icon_color: 'cerulean',
    min_value: 6 * 60,
    max_value: 13 * 60
  }, {
    title: 'FAIR',
    icon: 'benchmarkFair',
    icon_color: 'neonCarrot',
    min_value: 13 * 60,
    max_value: 28 * 60 + 59
  }, {
    title: 'NEEDS FOCUS',
    icon: 'benchmarkNeedsFocus',
    icon_color: 'radicalRed',
    min_value: 29 * 60,
    max_value: null
  }],
  p75: [{
    title: 'ELITE',
    icon: 'benchmarkElite',
    icon_color: 'malachiteB',
    min_value: null,
    max_value: 4 * 60
  }, {
    title: 'STRONG',
    icon: 'benchmarkStrong',
    icon_color: 'cerulean',
    min_value: 4 * 60,
    max_value: 18 * 60
  }, {
    title: 'FAIR',
    icon: 'benchmarkFair',
    icon_color: 'neonCarrot',
    min_value: 18 * 60,
    max_value: 28 * 60 + 59
  }, {
    title: 'NEEDS FOCUS',
    icon: 'benchmarkNeedsFocus',
    icon_color: 'radicalRed',
    min_value: 29 * 60,
    max_value: null
  }]
}, _METRICS_BENCHMARKS[metricNames.TIME_TO_PROD] = {
  unit: 'hours',
  scale: metricsScales.TIME,
  description: "measures the time from when a branch is merged to when the code is released. Low deploy time correlates to high deployment frequency.",
  avg: [{
    title: 'ELITE',
    icon: 'benchmarkElite',
    icon_color: 'malachiteB',
    min_value: null,
    max_value: 4 * 60
  }, {
    title: 'STRONG',
    icon: 'benchmarkStrong',
    icon_color: 'cerulean',
    min_value: 4 * 60,
    max_value: 48 * 60
  }, {
    title: 'FAIR',
    icon: 'benchmarkFair',
    icon_color: 'neonCarrot',
    min_value: 2 * 24 * 60,
    max_value: 7 * 24 * 60 + 59
  }, {
    title: 'NEEDS FOCUS',
    icon: 'benchmarkNeedsFocus',
    icon_color: 'radicalRed',
    min_value: 8 * 24 * 60,
    max_value: null
  }],
  p75: [{
    title: 'ELITE',
    icon: 'benchmarkElite',
    icon_color: 'malachiteB',
    min_value: null,
    max_value: 20 * 60
  }, {
    title: 'STRONG',
    icon: 'benchmarkStrong',
    icon_color: 'cerulean',
    min_value: 20 * 60,
    max_value: 144 * 60
  }, {
    title: 'FAIR',
    icon: 'benchmarkFair',
    icon_color: 'neonCarrot',
    min_value: 6 * 24 * 60,
    max_value: 13 * 24 * 60 + 59
  }, {
    title: 'NEEDS FOCUS',
    icon: 'benchmarkNeedsFocus',
    icon_color: 'radicalRed',
    min_value: 14 * 24 * 60,
    max_value: null
  }]
}, _METRICS_BENCHMARKS[metricNames.RELEASES_COUNT] = {
  unit: 'days',
  scale: metricsScales.FREQUENCY,
  description: "measures how often code is released. Elite Deploy Frequency represents a stable and healthy continuous delivery pipeline.",
  avg: [{
    title: 'ELITE',
    icon: 'benchmarkElite',
    icon_color: 'malachiteB',
    min_value: 7,
    max_value: null,
    range_text: 'Daily or more'
  }, {
    title: 'STRONG',
    icon: 'benchmarkStrong',
    icon_color: 'cerulean',
    min_value: 2,
    max_value: 7,
    range_text: '> 1 / week'
  }, {
    title: 'FAIR',
    icon: 'benchmarkFair',
    icon_color: 'neonCarrot',
    min_value: 1,
    max_value: 2,
    range_text: '1 / week'
  }, {
    title: 'NEEDS FOCUS',
    icon: 'benchmarkNeedsFocus',
    icon_color: 'radicalRed',
    min_value: null,
    max_value: 1,
    range_text: '< 1 / week'
  }],
  p50: [{
    title: 'ELITE',
    icon: 'benchmarkElite',
    icon_color: 'malachiteB',
    min_value: 7,
    max_value: null,
    range_text: 'Daily or more'
  }, {
    title: 'STRONG',
    icon: 'benchmarkStrong',
    icon_color: 'cerulean',
    min_value: 2,
    max_value: 7,
    range_text: '> 1 / week'
  }, {
    title: 'FAIR',
    icon: 'benchmarkFair',
    icon_color: 'neonCarrot',
    min_value: 1,
    max_value: 2,
    range_text: '1 / week'
  }, {
    title: 'NEEDS FOCUS',
    icon: 'benchmarkNeedsFocus',
    icon_color: 'radicalRed',
    min_value: null,
    max_value: 1,
    range_text: '< 1 / week'
  }],
  p75: [{
    title: 'ELITE',
    icon: 'benchmarkElite',
    icon_color: 'malachiteB',
    min_value: 7,
    max_value: null,
    range_text: 'Daily or more'
  }, {
    title: 'STRONG',
    icon: 'benchmarkStrong',
    icon_color: 'cerulean',
    min_value: 2,
    max_value: 7,
    range_text: '> 1 / week'
  }, {
    title: 'FAIR',
    icon: 'benchmarkFair',
    icon_color: 'neonCarrot',
    min_value: 1,
    max_value: 2,
    range_text: '1 / week'
  }, {
    title: 'NEEDS FOCUS',
    icon: 'benchmarkNeedsFocus',
    icon_color: 'radicalRed',
    min_value: null,
    max_value: 1,
    range_text: '< 1 / week'
  }]
}, _METRICS_BENCHMARKS[metricNames.PR_SIZE] = {
  unit: 'code changes',
  unitDescription: 'code changes',
  scale: metricsScales.CODE_CHANGES,
  description: "measures the number of code lines modified in a pull request. Smaller pull requests are easier to review, safer to merge, correlate to lower Cycle Time.",
  avg: [{
    title: 'ELITE',
    icon: 'benchmarkElite',
    icon_color: 'malachiteB',
    min_value: null,
    max_value: 225,
    range_text: '225 code changes or less'
  }, {
    title: 'STRONG',
    icon: 'benchmarkStrong',
    icon_color: 'cerulean',
    min_value: 225,
    max_value: 400,
    range_text: '225 - 400 code changes'
  }, {
    title: 'FAIR',
    icon: 'benchmarkFair',
    icon_color: 'neonCarrot',
    min_value: 400,
    max_value: 800,
    range_text: '400 - 800 code changes'
  }, {
    title: 'NEEDS FOCUS',
    icon: 'benchmarkNeedsFocus',
    icon_color: 'radicalRed',
    min_value: 800,
    max_value: null,
    range_text: '800 code changes or more'
  }],
  p75: [{
    title: 'ELITE',
    icon: 'benchmarkElite',
    icon_color: 'malachiteB',
    min_value: null,
    max_value: 100,
    range_text: '100 code changes or less'
  }, {
    title: 'STRONG',
    icon: 'benchmarkStrong',
    icon_color: 'cerulean',
    min_value: 100,
    max_value: 150,
    range_text: '100 - 150 code changes'
  }, {
    title: 'FAIR',
    icon: 'benchmarkFair',
    icon_color: 'neonCarrot',
    min_value: 150,
    max_value: 225,
    range_text: '150 - 225 code changes'
  }, {
    title: 'NEEDS FOCUS',
    icon: 'benchmarkNeedsFocus',
    icon_color: 'radicalRed',
    min_value: 225,
    max_value: null,
    range_text: '225 code changes or more'
  }]
}, _METRICS_BENCHMARKS[metricNames.REWORK] = {
  unit: '%',
  scale: metricsScales.PERCENTAGE,
  description: "measures the amount of changes made to code that is less than 21 days old. High rework rates signal code churn and is a leading indicator of quality issues",
  avg: [{
    title: 'ELITE',
    icon: 'benchmarkElite',
    icon_color: 'malachiteB',
    min_value: null,
    max_value: 8,
    range_text: '8% or less'
  }, {
    title: 'STRONG',
    icon: 'benchmarkStrong',
    icon_color: 'cerulean',
    min_value: 8,
    max_value: 11,
    range_text: '8% - 11%'
  }, {
    title: 'FAIR',
    icon: 'benchmarkFair',
    icon_color: 'neonCarrot',
    min_value: 11,
    max_value: 14,
    range_text: '11% - 14%'
  }, {
    title: 'NEEDS FOCUS',
    icon: 'benchmarkNeedsFocus',
    icon_color: 'radicalRed',
    min_value: 15,
    max_value: null,
    range_text: '15% or more'
  }],
  p50: [{
    title: 'ELITE',
    icon: 'benchmarkElite',
    icon_color: 'malachiteB',
    min_value: null,
    max_value: 8,
    range_text: '8% or less'
  }, {
    title: 'STRONG',
    icon: 'benchmarkStrong',
    icon_color: 'cerulean',
    min_value: 8,
    max_value: 11,
    range_text: '8% - 11%'
  }, {
    title: 'FAIR',
    icon: 'benchmarkFair',
    icon_color: 'neonCarrot',
    min_value: 11,
    max_value: 14,
    range_text: '11% - 14%'
  }, {
    title: 'NEEDS FOCUS',
    icon: 'benchmarkNeedsFocus',
    icon_color: 'radicalRed',
    min_value: 15,
    max_value: null,
    range_text: '15% or more'
  }],
  p75: [{
    title: 'ELITE',
    icon: 'benchmarkElite',
    icon_color: 'malachiteB',
    min_value: null,
    max_value: 8,
    range_text: '8% or less'
  }, {
    title: 'STRONG',
    icon: 'benchmarkStrong',
    icon_color: 'cerulean',
    min_value: 8,
    max_value: 11,
    range_text: '8% - 11%'
  }, {
    title: 'FAIR',
    icon: 'benchmarkFair',
    icon_color: 'neonCarrot',
    min_value: 11,
    max_value: 14,
    range_text: '11% - 14%'
  }, {
    title: 'NEEDS FOCUS',
    icon: 'benchmarkNeedsFocus',
    icon_color: 'radicalRed',
    min_value: 15,
    max_value: null,
    range_text: '15% or more'
  }]
}, _METRICS_BENCHMARKS);
var MEDIAN_METRICS = [metricNames.CYCLE_TIME, metricNames.TIME_TO_PR, metricNames.TIME_TO_REVIEW, metricNames.REVIEW_TIME, metricNames.TIME_TO_PROD, metricNames.PR_SIZE];
var CYCLE_TIME_METRICS_BENCHMARKS_VALUES = (_CYCLE_TIME_METRICS_B = {}, _CYCLE_TIME_METRICS_B[metricNames.TIME_TO_PR] = {
  avg: {
    eliteCondition: function eliteCondition(value) {
      return value < 12 * 60;
    },
    goodCondition: function goodCondition(value) {
      return value < 24 * 60;
    },
    fairCondition: function fairCondition(value) {
      return value <= 38 * 60 + 59;
    },
    poorCondition: function poorCondition(value) {
      return value > 38 * 60 + 59;
    }
  },
  p75: {
    eliteCondition: function eliteCondition(value) {
      return value < 1 * 60;
    },
    goodCondition: function goodCondition(value) {
      return value < 4 * 60;
    },
    fairCondition: function fairCondition(value) {
      return value <= 21 * 60 + 59;
    },
    poorCondition: function poorCondition(value) {
      return value > 21 * 60 + 59;
    }
  }
}, _CYCLE_TIME_METRICS_B[metricNames.TIME_TO_REVIEW] = {
  avg: {
    eliteCondition: function eliteCondition(value) {
      return value < 7 * 60;
    },
    goodCondition: function goodCondition(value) {
      return value < 12 * 60;
    },
    fairCondition: function fairCondition(value) {
      return value <= 18 * 60 + 59;
    },
    poorCondition: function poorCondition(value) {
      return value > 18 * 60 + 59;
    }
  },
  p75: {
    eliteCondition: function eliteCondition(value) {
      return value < 1.5 * 60;
    },
    goodCondition: function goodCondition(value) {
      return value < 5 * 60;
    },
    fairCondition: function fairCondition(value) {
      return value <= 16 * 60 + 59;
    },
    poorCondition: function poorCondition(value) {
      return value > 16 * 60 + 59;
    }
  }
}, _CYCLE_TIME_METRICS_B[metricNames.TIME_TO_PROD] = {
  avg: {
    eliteCondition: function eliteCondition(value) {
      return value < 4 * 60;
    },
    goodCondition: function goodCondition(value) {
      return value < 48 * 60;
    },
    fairCondition: function fairCondition(value) {
      return value <= 7 * 24 * 60 + 59;
    },
    poorCondition: function poorCondition(value) {
      return value > 7 * 24 * 60 + 59;
    }
  },
  p75: {
    eliteCondition: function eliteCondition(value) {
      return value < 20 * 60;
    },
    goodCondition: function goodCondition(value) {
      return value < 144 * 60;
    },
    fairCondition: function fairCondition(value) {
      return value <= 13 * 24 * 60 + 59;
    },
    poorCondition: function poorCondition(value) {
      return value > 13 * 24 * 60 + 59;
    }
  }
}, _CYCLE_TIME_METRICS_B[metricNames.REVIEW_TIME] = {
  avg: {
    eliteCondition: function eliteCondition(value) {
      return value < 6 * 60;
    },
    goodCondition: function goodCondition(value) {
      return value < 13 * 60;
    },
    fairCondition: function fairCondition(value) {
      return value <= 28 * 60 + 59;
    },
    poorCondition: function poorCondition(value) {
      return value > 28 * 60 + 59;
    }
  },
  p75: {
    eliteCondition: function eliteCondition(value) {
      return value < 4 * 60;
    },
    goodCondition: function goodCondition(value) {
      return value < 18 * 60;
    },
    fairCondition: function fairCondition(value) {
      return value <= 29 * 60 + 59;
    },
    poorCondition: function poorCondition(value) {
      return value > 29 * 60 + 59;
    }
  }
}, _CYCLE_TIME_METRICS_B);

var AUTH = {
  OAUTH_SECRET_CACHE_ID: 'oacck'
};

var MESSAGE_TYPES = {
  NEW_REPOS: 'NEW_REPOS',
  UNTRACKED_REPOS: 'UNTRACKED_REPOS'
};

var INVITATION_TYPE = {
  EMAIL: 'email',
  COLLABORATION: {
    SLACK: 'slack'
  }
};

var SettingValues = {
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
var DefinitionLevels = {
  ORGANIZATION: 'organization',
  TEAM: 'team',
  REPOSITORY: 'repository'
};
var FEATURE_FLAGS_NAMES = {
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
var MEDIAN_VALUES = {
  p50: 'p50',
  p75: 'p75'
};

var PUSHER_DEFAULT_CHANNEL_PREFIX = 'private-linearb-';
var PUSHER_EVENTS = {
  ADD_REPOSITORIES: 'add_repositories'
}; // Generates name for private channels

var generatePusherPrivateChannelName = function generatePusherPrivateChannelName(organizationId) {
  return "" + PUSHER_DEFAULT_CHANNEL_PREFIX + organizationId;
};

var PROJECT_STATUS = {
  EDITED: 'EDITED',
  DELETED: 'DELETED',
  NEW: 'NEW',
  STEADY: 'STEADY'
};

var SENSOR_NAMES = {
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
var SENSOR_STATES = {
  // SELECT unnest(enum_range(NULL::authorization_state)):
  // ok, failing, inactive, in-progress, insufficient-permission, deleted
  "insufficient-permission": 'insufficient-permission',
  deleted: 'deleted',
  failing: 'failing',
  inactive: 'inactive',
  inProgress: 'in-progress',
  ok: 'ok'
};

var LICENSE_PLAN_NAMES = {
  FREE: 'free',
  PRO: 'pro',
  ENTERPRISE: 'enterprise'
};
var LICENSE_PLAN_TIER_TYPE = {
  TEAM: 'team',
  PAID: 'paid',
  TRAIL: 'trial'
};

var _ACCOUNT_TYPES_NAMES;

var ACCOUNT_TYPES_MAP = {
  Primary: 1,
  Editor: 2,
  SuperUser: 3,
  External: 4,
  Viewer: 5
};
var ACCOUNT_TYPES_NAMES = (_ACCOUNT_TYPES_NAMES = {}, _ACCOUNT_TYPES_NAMES[ACCOUNT_TYPES_MAP.Primary] = 'Admin', _ACCOUNT_TYPES_NAMES[ACCOUNT_TYPES_MAP.Editor] = 'Editor', _ACCOUNT_TYPES_NAMES[ACCOUNT_TYPES_MAP.SuperUser] = 'SuperUser', _ACCOUNT_TYPES_NAMES[ACCOUNT_TYPES_MAP.External] = 'External', _ACCOUNT_TYPES_NAMES[ACCOUNT_TYPES_MAP.Viewer] = 'Viewer', _ACCOUNT_TYPES_NAMES);
var CAN_EDIT_ACCOUNT_TYPES = [ACCOUNT_TYPES_MAP.Primary, ACCOUNT_TYPES_MAP.Editor, ACCOUNT_TYPES_MAP.SuperUser];

var CUSTOM_DASHBOARD_INTERNAL_TYPES = {
  CUSTOM_PM_METRICS: 'customPmMetrics',
  TEAM_GOALS: 'teamGoals'
};

var ISSUE_COUNT_CALCULATION_STRATEGY = 'count';
var STORY_POINTS_CALCULATION_STRATEGY = 'story_points';
var ISSUE_COUNT_METRIC_NAME = 'pm.issue.count';
var ISSUE_TRANSITION_METRIC_NAME = 'pm.issue.state_transition';
var PM_CALCULATION_STRATEGY = {
  ISSUE_COUNT: {
    name: 'Count issues',
    value: ISSUE_COUNT_CALCULATION_STRATEGY
  },
  STORY_POINTS: {
    name: 'Story points sum',
    value: STORY_POINTS_CALCULATION_STRATEGY
  }
};
var CUSTOM_PM_METRICS_TYPES = {
  ISSUE_COUNT: {
    name: 'Single Jira State',
    value: ISSUE_COUNT_METRIC_NAME
  },
  ISSUE_TRANSITION: {
    name: 'Transition between 2 states',
    value: ISSUE_TRANSITION_METRIC_NAME
  }
};

var buildAmplitudeAccountName = function buildAmplitudeAccountName(account) {
  var email = _.get(account, 'email', '');

  var emailParts = email.split('@');
  return emailParts.length === 2 ? emailParts[0] : 'unknown';
};
var getEmailDashIdUserId = function getEmailDashIdUserId(account) {
  return buildAmplitudeAccountName(account) + "-" + account.id;
};
var getUserTrackingId = function getUserTrackingId(account) {
  var email = _.get(account, 'email', '');

  var userId = getEmailDashIdUserId(account); // Condense the user ID and email for cypress integration tests

  if (email.startsWith('_cy-') && email.endsWith('linearb.io')) {
    email = '_cypress_e2e@linearb.io';
    userId = '_cypress_e2e';
  }

  return {
    userId: userId,
    email: email
  };
};

export { ACCOUNT_TYPES_MAP, ACCOUNT_TYPES_NAMES, ARTICLE_IDS, AUTH, CAN_EDIT_ACCOUNT_TYPES, CUSTOM_DASHBOARD_INTERNAL_TYPES, CUSTOM_PM_METRICS_TYPES, CYCLE_TIME_METRICS_BENCHMARKS_VALUES, DefinitionLevels, FEATURE_FLAGS_NAMES, INVITATION_TYPE, ISSUE_COUNT_CALCULATION_STRATEGY, ISSUE_COUNT_METRIC_NAME, ISSUE_TRANSITION_METRIC_NAME, LICENSE_PLAN_NAMES, LICENSE_PLAN_TIER_TYPE, MEDIAN_METRICS, MEDIAN_VALUES, MESSAGE_TYPES, METRICS_BENCHMARKS, METRICS_LIST, PM_CALCULATION_STRATEGY, PROJECT_STATUS, PUSHER_DEFAULT_CHANNEL_PREFIX, PUSHER_EVENTS, SENSOR_NAMES, SENSOR_STATES, STORY_POINTS_CALCULATION_STRATEGY, SettingValues, V2_METRICS_NAMES, buildAmplitudeAccountName, generatePusherPrivateChannelName, getEmailDashIdUserId, getUserTrackingId, metricDisplayValues, metricNames, metricsScales };
//# sourceMappingURL=linjs-common.esm.js.map
