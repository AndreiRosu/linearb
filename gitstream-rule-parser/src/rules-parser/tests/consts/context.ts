export const context = {
  branch: {
    name: 'name',
    base: 'main',
    author: 'Yeela Lifshitz <yeelalifshitz@MacBook-Pro.local>',
    diff: {
      size: 100,
      files_metadata: [],
      num_of_commits: 5,
    },
    num_of_commits: 5,
  },
  source: {
    diff: {
      files: [
        {
          original_file: 'controller1.spec.ts',
          new_file: 'handler.js',
          diff: '@@ -11,75 +11,8 @@ This project was generated with [Angular CLI](https://github.com/angular/angular\n yyyyyqueen\n+console.log();',
          new_content: `'hello'     `,
          original_content: `"hello"`,
        },
      ],
    },
  },
  files: ['filters.test.ts', 'controller.spec.ts', 'handler.js'],
};

export const emptyContext = {
  branch: {
    name: 'head-branch',
    base: 'main',
    diff: {
      size: 0,
      files_metadata: [],
    },
    num_of_commits: 1,
  },
  source: {
    diff: {
      files: [],
    },
  },
  repo: {
    contributors: {
      'Yeela Lifshitz': '83',
      'Luke Kilpatrick': '6',
      yeelali14: '3',
      Yeela: '2',
      'Elad Kohavi': '2',
      EladKohavi: '1',
      'shaked zohar': '1',
    },
  },
  files: [],
};
