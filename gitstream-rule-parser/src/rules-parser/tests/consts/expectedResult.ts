const expectedAnalytics = {
  allImages: {
    args: [],
  },
  allDocs: {
    args: [],
  },
  allTests: {
    args: [],
  },
  estimatedReviewTime: {
    args: [],
  },
  isFormattingChange: {
    args: [],
  },
  filter: {
    args: [
      {
        regex: '\\.js$',
        __keywords: true,
      },
    ],
  },
  matchDiffLines: {
    args: [
      {
        regex: '^\\+.*console\\.log',
        ignoreWhiteSpaces: true,
        __keywords: true,
      },
    ],
  },
  every: {
    args: [],
  },
  match: {
    args: [],
  },
  some: {
    args: [],
  },
  map: {
    args: [
      {
        attr: 'new_file',
      },
    ],
  },
};

export const expectedResult = (automationName: string) => ({
  errors: {},
  automations: {
    [automationName]: {
      if: [
        {
          passed: true,
        },
      ],
      run: [
        {
          action: 'add-labels@v1',
          args: { labels: [automationName] },
          engine: 'gitstream',
        },
      ],
      passed: true,
    },
  },
  analytics: expectedAnalytics,
});

export const expectedResultForEmptyContext = (automationName: string) => ({
  errors: {},
  automations: {
    [automationName]: {
      if: [
        {
          passed: false,
        },
      ],
      run: [
        {
          action: 'add-labels@v1',
          args: { labels: [automationName] },
          engine: 'gitstream',
        },
      ],
      passed: false,
    },
  },
  analytics: expectedAnalytics,
});
