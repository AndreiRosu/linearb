import { ARTICLE_IDS } from './tracking';

export const METRICS_LIST = [
  { name: 'Cycle Time', description: 'Time from first commit to release' },
  {
    name: 'Coding Time',
    description: 'Time from first commit to pull request creation'
  },
  {
    name: 'Pickup Time',
    description: 'Time from pull request creation to review'
  },
  {
    name: 'Review Time',
    description: 'Time from review begining to pull request merged'
  },
  {
    name: 'Deploy Time',
    description: 'Time from pull request merge to release'
  },
  {
    name: 'PR Size',
    description: 'Size of pull request (total lines of code changed)'
  },
  { name: 'Review Depth', description: 'Avg. number of comments per review' },
  { name: 'New code', description: 'Ratio of new code' },
  {
    name: 'Refactor',
    description: 'Ratio of legacy code changed (more than 21 days)'
  },
  {
    name: 'Rework',
    description: 'Ratio of novice code changed (less than 21 days)'
  },
  {
    name: 'PRs merged w/o review',
    description: 'Numbre of pull requests merged without any review'
  },
  { name: 'Code changes', description: 'Lines of code changed' },
  { name: 'Commits', description: 'Number of commits' },
  { name: 'PRs opened', description: 'Number of pull requests opened' },
  { name: 'PRs merged', description: 'Number of pull requests merged' },
  { name: 'Reviews', description: 'Number of pull requests reviews' },
  {
    name: 'Releases',
    description: 'Number of releases (based on release detection strategy)'
  },
  { name: 'Deploy frequency', description: 'Avg. of releases per day' },
  {
    name: 'Active days',
    description: 'Number of days with Git activity (commits, PRs, Reviews etc.)'
  },
  {
    name: 'Active Branches',
    description: 'Number of branches in active state'
  },
  {
    name: 'Done Branches',
    description: 'Number of branches moved to state merged or releaaed '
  },
  {
    name: 'Caarryover',
    description: 'Number of branches that were active in the last day of the iteration '
  }
];

export const V2_METRICS_NAMES = {
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

export const metricNames = {
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

export const metricDisplayValues = {
  [metricNames.TIME_TO_PR]: {
    displayName: 'Coding time',
    unitType: 'timespan',
    displayLabel: 'Coding time',
    description: 'Time from first commit to pull request creation',
    articleId: ARTICLE_IDS.CYCLE_TIME
  },
  [metricNames.TIME_TO_REVIEW]: {
    displayName: 'Pickup time',
    unitType: 'timespan',
    articleId: ARTICLE_IDS.CYCLE_TIME
  },
  [metricNames.TIME_TO_PROD]: {
    displayName: 'Time to deploy',
    unitType: 'timespan',
    articleId: ARTICLE_IDS.CYCLE_TIME
  },
  [metricNames.REVIEW_TIME]: {
    displayName: 'Review time',
    unitType: 'timespan',
    articleId: ARTICLE_IDS.CYCLE_TIME
  },
  [metricNames.ACTIVE_BRANCHES]: {
    displayName: 'Active branches',
    unitType: 'count',
    displayLabel: 'Active branches'
  },
  [metricNames.DONE_BRANCHES]: {
    displayName: 'Done branches',
    unitType: 'count',
    displayLabel: 'Done branches'
  },
  [metricNames.CYCLE_TIME]: {
    displayName: 'Cycle time',
    unitType: 'timespan',
    articleId: ARTICLE_IDS.CYCLE_TIME
  },
  [metricNames.ACTIVE_DAYS]: {
    displayName: 'Active days',
    unitType: 'count',
    displayLabel: 'Active days'
  },
  [metricNames.NEW_WORK]: {
    displayName: 'New code',
    unitType: 'percentage',
    displayLabel: 'New code',
    unitDescription: 'New code',
    articleId: ARTICLE_IDS.WORK_BREAKDOWN
  },
  [metricNames.REWORK]: {
    displayName: 'Rework',
    unitType: 'percentage',
    displayLabel: 'Code changes',
    unitDescription: 'Rework code',
    articleId: ARTICLE_IDS.WORK_BREAKDOWN
  },
  [metricNames.REFACTOR]: {
    displayName: 'Refactor',
    unitType: 'percentage',
    displayLabel: 'Code changes',
    unitDescription: 'Refactor code',
    articleId: ARTICLE_IDS.WORK_BREAKDOWN
  },
  [metricNames.COMMIT_CODE_CHANGES]: {
    displayName: 'Code changes',
    unitType: 'count',
    displayLabel: 'Code changes',
    unitDescription: 'Code changes per',
    articleId: ARTICLE_IDS.THROUGHPUT_METRICS
  },
  [metricNames.COMMIT_COUNT]: {
    displayName: 'Commits',
    unitType: 'count',
    displayLabel: 'commits',
    unitDescription: 'Commits per',
    articleId: ARTICLE_IDS.THROUGHPUT_METRICS
  },
  [metricNames.REVIEWS]: {
    displayName: 'Reviews',
    unitType: 'count',
    displayLabel: 'Reviews',
    unitDescription: 'Reviews per',
    articleId: ARTICLE_IDS.THROUGHPUT_METRICS
  },
  [metricNames.REVIEW_DEPTH]: {
    displayName: 'Review Depth',
    unitType: 'nonAvgCount',
    displayLabel: 'Comments per review',
    unitDescription: 'Comments per review',
    articleId: ARTICLE_IDS.REVIEW_DEPTH
  },
  [metricNames.PR_NEW]: {
    displayName: 'PRs Opened',
    unitType: 'count',
    displayLabel: 'PRs',
    unitDescription: 'PRs per',
    articleId: ARTICLE_IDS.THROUGHPUT_METRICS
  },
  [metricNames.PR_MERGED]: {
    displayName: 'PRs Merged',
    unitType: 'count',
    displayLabel: 'PRs',
    unitDescription: 'PRs per',
    articleId: ARTICLE_IDS.THROUGHPUT_METRICS
  },
  [metricNames.PR_MERGED_WITHOUT_REVIEW]: {
    displayName: 'PRs merged without Review',
    unitType: 'count',
    displayLabel: 'PRs',
    unitDescription: 'PRs per',
    articleId: ARTICLE_IDS.MERGED_WITHOUT_REVIEW
  },
  [metricNames.PR_SIZE]: {
    displayName: 'PR Size',
    unitType: 'nonAvgCount',
    displayLabel: 'Code changes',
    unitDescription: 'Code changes per PR',
    articleId: ARTICLE_IDS.PR_SIZE
  },
  [metricNames.BRANCH_CODE_CHANGES]: {
    displayName: 'Branch code changes',
    unitType: 'count',
    displayLabel: 'Branch code changes'
  },
  [metricNames.RELEASES_COUNT]: {
    displayName: 'Deployment Frequency',
    unitType: 'count',
    displayLabel: 'Deployment Frequency',
    unitDescription: 'Releases per',
    articleId: ARTICLE_IDS.THROUGHPUT_METRICS
  },
  [metricNames.RELEASES_AVG]: {
    displayName: 'Avg releases',
    unitType: 'count',
    displayLabel: 'Avg releases'
  },
  [metricNames.TOTAL_ACTIVITY]: {
    displayName: 'Total changes',
    unitType: 'count',
    displayLabel: 'Total changes',
    unitDescription: 'Total changes per',
    articleId: ARTICLE_IDS.THROUGHPUT_METRICS
  }
};

export const metricsScales = {
  TIME: 'time',
  FREQUENCY: 'frequency',
  CODE_CHANGES: 'code_changes',
  PERCENTAGE: 'percentage'
};

export default metricNames;

export const METRICS_BENCHMARKS = {
  [metricNames.CYCLE_TIME]: {
    unit: 'hours',
    scale: metricsScales.TIME,
    description: `measures the time it takes for a single engineering task to go through the different phases of the delivery process from 'code' to 'production'.`,
    avg: [
      {
        title: 'ELITE',
        icon: 'benchmarkElite',
        icon_color: 'malachiteB',
        min_value: null,
        max_value: 48 * 60 - 1
      },
      {
        title: 'STRONG',
        icon: 'benchmarkStrong',
        icon_color: 'cerulean',
        min_value: 48 * 60,
        max_value: 118 * 60 + 59
      },
      {
        title: 'FAIR',
        icon: 'benchmarkFair',
        icon_color: 'neonCarrot',
        min_value: 118 * 60,
        max_value: 209 * 60 + 59
      },
      {
        title: 'NEEDS FOCUS',
        icon: 'benchmarkNeedsFocus',
        icon_color: 'radicalRed',
        min_value: 210 * 60,
        max_value: null
      }
    ],
    p75: [
      {
        title: 'ELITE',
        icon: 'benchmarkElite',
        icon_color: 'malachiteB',
        min_value: null,
        max_value: 48 * 60
      },
      {
        title: 'STRONG',
        icon: 'benchmarkStrong',
        icon_color: 'cerulean',
        min_value: 48 * 60,
        max_value: 96 * 60
      },
      {
        title: 'FAIR',
        icon: 'benchmarkFair',
        icon_color: 'neonCarrot',
        min_value: 96 * 60,
        max_value: 192 * 60 + 59
      },
      {
        title: 'NEEDS FOCUS',
        icon: 'benchmarkNeedsFocus',
        icon_color: 'radicalRed',
        min_value: 192 * 60 + 59,
        max_value: null
      }
    ]
  },
  [metricNames.TIME_TO_PR]: {
    unit: 'hours',
    scale: metricsScales.TIME,
    description: `measures the time it takes from the first commit until a pull request is issued. Short Coding Time correlates to low WIP, small PR size and clear requirements.`,
    avg: [
      {
        title: 'ELITE',
        icon: 'benchmarkElite',
        icon_color: 'malachiteB',
        min_value: '',
        max_value: 12 * 60
      },
      {
        title: 'STRONG',
        icon: 'benchmarkStrong',
        icon_color: 'cerulean',
        min_value: 12 * 60,
        max_value: 24 * 60
      },
      {
        title: 'FAIR',
        icon: 'benchmarkFair',
        icon_color: 'neonCarrot',
        min_value: 24 * 60,
        max_value: 38 * 60 + 59
      },
      {
        title: 'NEEDS FOCUS',
        icon: 'benchmarkNeedsFocus',
        icon_color: 'radicalRed',
        min_value: 39 * 60,
        max_value: null
      }
    ],
    p75: [
      {
        title: 'ELITE',
        icon: 'benchmarkElite',
        icon_color: 'malachiteB',
        min_value: '',
        max_value: 60
      },
      {
        title: 'STRONG',
        icon: 'benchmarkStrong',
        icon_color: 'cerulean',
        min_value: 60,
        max_value: 4 * 60
      },
      {
        title: 'FAIR',
        icon: 'benchmarkFair',
        icon_color: 'neonCarrot',
        min_value: 4 * 60,
        max_value: 20 * 60 + 59
      },
      {
        title: 'NEEDS FOCUS',
        icon: 'benchmarkNeedsFocus',
        icon_color: 'radicalRed',
        min_value: 21 * 60,
        max_value: null
      }
    ]
  },
  [metricNames.TIME_TO_REVIEW]: {
    unit: 'hours',
    scale: metricsScales.TIME,
    description: `measures the time a pull request waits for someone to start reviewing it. Low Pickup Time represents strong teamwork and a healthy review process.`,
    avg: [
      {
        title: 'ELITE',
        icon: 'benchmarkElite',
        icon_color: 'malachiteB',
        min_value: null,
        max_value: 7 * 60
      },
      {
        title: 'STRONG',
        icon: 'benchmarkStrong',
        icon_color: 'cerulean',
        min_value: 7 * 60,
        max_value: 12 * 60
      },
      {
        title: 'FAIR',
        icon: 'benchmarkFair',
        icon_color: 'neonCarrot',
        min_value: 12 * 60,
        max_value: 18 * 60 + 59
      },
      {
        title: 'NEEDS FOCUS',
        icon: 'benchmarkNeedsFocus',
        icon_color: 'radicalRed',
        min_value: 19 * 60,
        max_value: null
      }
    ],
    p75: [
      {
        title: 'ELITE',
        icon: 'benchmarkElite',
        icon_color: 'malachiteB',
        min_value: null,
        max_value: 1.5 * 60
      },
      {
        title: 'STRONG',
        icon: 'benchmarkStrong',
        icon_color: 'cerulean',
        min_value: 1.5 * 60,
        max_value: 5 * 60
      },
      {
        title: 'FAIR',
        icon: 'benchmarkFair',
        icon_color: 'neonCarrot',
        min_value: 5 * 60,
        max_value: 15 * 60 + 59
      },
      {
        title: 'NEEDS FOCUS',
        icon: 'benchmarkNeedsFocus',
        icon_color: 'radicalRed',
        min_value: 16 * 60,
        max_value: null
      }
    ]
  },
  [metricNames.REVIEW_TIME]: {
    unit: 'hours',
    scale: metricsScales.TIME,
    description: `measures the time it takes to complete a code review and get a pull request merged. Low Review Time represents strong teamwork and a healthy review process.`,
    avg: [
      {
        title: 'ELITE',
        icon: 'benchmarkElite',
        icon_color: 'malachiteB',
        min_value: null,
        max_value: 6 * 60
      },
      {
        title: 'STRONG',
        icon: 'benchmarkStrong',
        icon_color: 'cerulean',
        min_value: 6 * 60,
        max_value: 13 * 60
      },
      {
        title: 'FAIR',
        icon: 'benchmarkFair',
        icon_color: 'neonCarrot',
        min_value: 13 * 60,
        max_value: 28 * 60 + 59
      },
      {
        title: 'NEEDS FOCUS',
        icon: 'benchmarkNeedsFocus',
        icon_color: 'radicalRed',
        min_value: 29 * 60,
        max_value: null
      }
    ],
    p75: [
      {
        title: 'ELITE',
        icon: 'benchmarkElite',
        icon_color: 'malachiteB',
        min_value: null,
        max_value: 4 * 60
      },
      {
        title: 'STRONG',
        icon: 'benchmarkStrong',
        icon_color: 'cerulean',
        min_value: 4 * 60,
        max_value: 18 * 60
      },
      {
        title: 'FAIR',
        icon: 'benchmarkFair',
        icon_color: 'neonCarrot',
        min_value: 18 * 60,
        max_value: 28 * 60 + 59
      },
      {
        title: 'NEEDS FOCUS',
        icon: 'benchmarkNeedsFocus',
        icon_color: 'radicalRed',
        min_value: 29 * 60,
        max_value: null
      }
    ]
  },
  [metricNames.TIME_TO_PROD]: {
    unit: 'hours',
    scale: metricsScales.TIME,
    description: `measures the time from when a branch is merged to when the code is released. Low deploy time correlates to high deployment frequency.`,
    avg: [
      {
        title: 'ELITE',
        icon: 'benchmarkElite',
        icon_color: 'malachiteB',
        min_value: null,
        max_value: 4 * 60
      },
      {
        title: 'STRONG',
        icon: 'benchmarkStrong',
        icon_color: 'cerulean',
        min_value: 4 * 60,
        max_value: 48 * 60
      },
      {
        title: 'FAIR',
        icon: 'benchmarkFair',
        icon_color: 'neonCarrot',
        min_value: 2 * 24 * 60,
        max_value: 7 * 24 * 60 + 59
      },
      {
        title: 'NEEDS FOCUS',
        icon: 'benchmarkNeedsFocus',
        icon_color: 'radicalRed',
        min_value: 8 * 24 * 60,
        max_value: null
      }
    ],
    p75: [
      {
        title: 'ELITE',
        icon: 'benchmarkElite',
        icon_color: 'malachiteB',
        min_value: null,
        max_value: 20 * 60
      },
      {
        title: 'STRONG',
        icon: 'benchmarkStrong',
        icon_color: 'cerulean',
        min_value: 20 * 60,
        max_value: 144 * 60
      },
      {
        title: 'FAIR',
        icon: 'benchmarkFair',
        icon_color: 'neonCarrot',
        min_value: 6 * 24 * 60,
        max_value: 13 * 24 * 60 + 59
      },
      {
        title: 'NEEDS FOCUS',
        icon: 'benchmarkNeedsFocus',
        icon_color: 'radicalRed',
        min_value: 14 * 24 * 60,
        max_value: null
      }
    ]
  },
  [metricNames.RELEASES_COUNT]: {
    unit: 'days',
    scale: metricsScales.FREQUENCY,
    description: `measures how often code is released. Elite Deploy Frequency represents a stable and healthy continuous delivery pipeline.`,
    avg: [
      {
        title: 'ELITE',
        icon: 'benchmarkElite',
        icon_color: 'malachiteB',
        min_value: 7,
        max_value: null,
        range_text: 'Daily or more'
      },
      {
        title: 'STRONG',
        icon: 'benchmarkStrong',
        icon_color: 'cerulean',
        min_value: 2,
        max_value: 7,
        range_text: '> 1 / week'
      },
      {
        title: 'FAIR',
        icon: 'benchmarkFair',
        icon_color: 'neonCarrot',
        min_value: 1,
        max_value: 2,
        range_text: '1 / week'
      },
      {
        title: 'NEEDS FOCUS',
        icon: 'benchmarkNeedsFocus',
        icon_color: 'radicalRed',
        min_value: null,
        max_value: 1,
        range_text: '< 1 / week'
      }
    ],
    p50: [
      {
        title: 'ELITE',
        icon: 'benchmarkElite',
        icon_color: 'malachiteB',
        min_value: 7,
        max_value: null,
        range_text: 'Daily or more'
      },
      {
        title: 'STRONG',
        icon: 'benchmarkStrong',
        icon_color: 'cerulean',
        min_value: 2,
        max_value: 7,
        range_text: '> 1 / week'
      },
      {
        title: 'FAIR',
        icon: 'benchmarkFair',
        icon_color: 'neonCarrot',
        min_value: 1,
        max_value: 2,
        range_text: '1 / week'
      },
      {
        title: 'NEEDS FOCUS',
        icon: 'benchmarkNeedsFocus',
        icon_color: 'radicalRed',
        min_value: null,
        max_value: 1,
        range_text: '< 1 / week'
      }
    ],
    p75: [
      {
        title: 'ELITE',
        icon: 'benchmarkElite',
        icon_color: 'malachiteB',
        min_value: 7,
        max_value: null,
        range_text: 'Daily or more'
      },
      {
        title: 'STRONG',
        icon: 'benchmarkStrong',
        icon_color: 'cerulean',
        min_value: 2,
        max_value: 7,
        range_text: '> 1 / week'
      },
      {
        title: 'FAIR',
        icon: 'benchmarkFair',
        icon_color: 'neonCarrot',
        min_value: 1,
        max_value: 2,
        range_text: '1 / week'
      },
      {
        title: 'NEEDS FOCUS',
        icon: 'benchmarkNeedsFocus',
        icon_color: 'radicalRed',
        min_value: null,
        max_value: 1,
        range_text: '< 1 / week'
      }
    ]
  },

  [metricNames.PR_SIZE]: {
    unit: 'code changes',
    unitDescription: 'code changes',
    scale: metricsScales.CODE_CHANGES,
    description: `measures the number of code lines modified in a pull request. Smaller pull requests are easier to review, safer to merge, correlate to lower Cycle Time.`,
    avg: [
      {
        title: 'ELITE',
        icon: 'benchmarkElite',
        icon_color: 'malachiteB',
        min_value: null,
        max_value: 225,
        range_text: '225 code changes or less'
      },
      {
        title: 'STRONG',
        icon: 'benchmarkStrong',
        icon_color: 'cerulean',
        min_value: 225,
        max_value: 400,
        range_text: '225 - 400 code changes'
      },
      {
        title: 'FAIR',
        icon: 'benchmarkFair',
        icon_color: 'neonCarrot',
        min_value: 400,
        max_value: 800,
        range_text: '400 - 800 code changes'
      },
      {
        title: 'NEEDS FOCUS',
        icon: 'benchmarkNeedsFocus',
        icon_color: 'radicalRed',
        min_value: 800,
        max_value: null,
        range_text: '800 code changes or more'
      }
    ],
    p75: [
      {
        title: 'ELITE',
        icon: 'benchmarkElite',
        icon_color: 'malachiteB',
        min_value: null,
        max_value: 100,
        range_text: '100 code changes or less'
      },
      {
        title: 'STRONG',
        icon: 'benchmarkStrong',
        icon_color: 'cerulean',
        min_value: 100,
        max_value: 150,
        range_text: '100 - 150 code changes'
      },
      {
        title: 'FAIR',
        icon: 'benchmarkFair',
        icon_color: 'neonCarrot',
        min_value: 150,
        max_value: 225,
        range_text: '150 - 225 code changes'
      },
      {
        title: 'NEEDS FOCUS',
        icon: 'benchmarkNeedsFocus',
        icon_color: 'radicalRed',
        min_value: 225,
        max_value: null,
        range_text: '225 code changes or more'
      }
    ]
  },

  [metricNames.REWORK]: {
    unit: '%',
    scale: metricsScales.PERCENTAGE,
    description: `measures the amount of changes made to code that is less than 21 days old. High rework rates signal code churn and is a leading indicator of quality issues`,
    avg: [
      {
        title: 'ELITE',
        icon: 'benchmarkElite',
        icon_color: 'malachiteB',
        min_value: null,
        max_value: 8,
        range_text: '8% or less'
      },
      {
        title: 'STRONG',
        icon: 'benchmarkStrong',
        icon_color: 'cerulean',
        min_value: 8,
        max_value: 11,
        range_text: '8% - 11%'
      },
      {
        title: 'FAIR',
        icon: 'benchmarkFair',
        icon_color: 'neonCarrot',
        min_value: 11,
        max_value: 14,
        range_text: '11% - 14%'
      },
      {
        title: 'NEEDS FOCUS',
        icon: 'benchmarkNeedsFocus',
        icon_color: 'radicalRed',
        min_value: 15,
        max_value: null,
        range_text: '15% or more'
      }
    ],
    p50: [
      {
        title: 'ELITE',
        icon: 'benchmarkElite',
        icon_color: 'malachiteB',
        min_value: null,
        max_value: 8,
        range_text: '8% or less'
      },
      {
        title: 'STRONG',
        icon: 'benchmarkStrong',
        icon_color: 'cerulean',
        min_value: 8,
        max_value: 11,
        range_text: '8% - 11%'
      },
      {
        title: 'FAIR',
        icon: 'benchmarkFair',
        icon_color: 'neonCarrot',
        min_value: 11,
        max_value: 14,
        range_text: '11% - 14%'
      },
      {
        title: 'NEEDS FOCUS',
        icon: 'benchmarkNeedsFocus',
        icon_color: 'radicalRed',
        min_value: 15,
        max_value: null,
        range_text: '15% or more'
      }
    ],
    p75: [
      {
        title: 'ELITE',
        icon: 'benchmarkElite',
        icon_color: 'malachiteB',
        min_value: null,
        max_value: 8,
        range_text: '8% or less'
      },
      {
        title: 'STRONG',
        icon: 'benchmarkStrong',
        icon_color: 'cerulean',
        min_value: 8,
        max_value: 11,
        range_text: '8% - 11%'
      },
      {
        title: 'FAIR',
        icon: 'benchmarkFair',
        icon_color: 'neonCarrot',
        min_value: 11,
        max_value: 14,
        range_text: '11% - 14%'
      },
      {
        title: 'NEEDS FOCUS',
        icon: 'benchmarkNeedsFocus',
        icon_color: 'radicalRed',
        min_value: 15,
        max_value: null,
        range_text: '15% or more'
      }
    ]
  }
};

export const MEDIAN_METRICS = [
  metricNames.CYCLE_TIME,
  metricNames.TIME_TO_PR,
  metricNames.TIME_TO_REVIEW,
  metricNames.REVIEW_TIME,
  metricNames.TIME_TO_PROD,
  metricNames.PR_SIZE
];

export const CYCLE_TIME_METRICS_BENCHMARKS_VALUES = {
  [metricNames.TIME_TO_PR]: {
    avg: {
      eliteCondition: (value: number) => value < 12 * 60,
      goodCondition: (value: number) => value < 24 * 60,
      fairCondition: (value: number) => value <= 38 * 60 + 59,
      poorCondition: (value: number) => value > 38 * 60 + 59
    },
    p75: {
      eliteCondition: (value: number) => value < 1 * 60,
      goodCondition: (value: number) => value < 4 * 60,
      fairCondition: (value: number) => value <= 21 * 60 + 59,
      poorCondition: (value: number) => value > 21 * 60 + 59
    }
  },
  [metricNames.TIME_TO_REVIEW]: {
    avg: {
      eliteCondition: (value: number) => value < 7 * 60,
      goodCondition: (value: number) => value < 12 * 60,
      fairCondition: (value: number) => value <= 18 * 60 + 59,
      poorCondition: (value: number) => value > 18 * 60 + 59
    },
    p75: {
      eliteCondition: (value: number) => value < 1.5 * 60,
      goodCondition: (value: number) => value < 5 * 60,
      fairCondition: (value: number) => value <= 16 * 60 + 59,
      poorCondition: (value: number) => value > 16 * 60 + 59
    }
  },
  [metricNames.TIME_TO_PROD]: {
    avg: {
      eliteCondition: (value: number) => value < 4 * 60,
      goodCondition: (value: number) => value < 48 * 60,
      fairCondition: (value: number) => value <= 7 * 24 * 60 + 59,
      poorCondition: (value: number) => value > 7 * 24 * 60 + 59
    },
    p75: {
      eliteCondition: (value: number) => value < 20 * 60,
      goodCondition: (value: number) => value < 144 * 60,
      fairCondition: (value: number) => value <= 13 * 24 * 60 + 59,
      poorCondition: (value: number) => value > 13 * 24 * 60 + 59
    }
  },
  [metricNames.REVIEW_TIME]: {
    avg: {
      eliteCondition: (value: number) => value < 6 * 60,
      goodCondition: (value: number) => value < 13 * 60,
      fairCondition: (value: number) => value <= 28 * 60 + 59,
      poorCondition: (value: number) => value > 28 * 60 + 59
    },
    p75: {
      eliteCondition: (value: number) => value < 4 * 60,
      goodCondition: (value: number) => value < 18 * 60,
      fairCondition: (value: number) => value <= 29 * 60 + 59,
      poorCondition: (value: number) => value > 29 * 60 + 59
    }
  }
};

