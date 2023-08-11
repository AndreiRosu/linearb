import {
  GeneralFilters,
  GENERAL_FILTERS_HANDLER,
} from '../filters/general-filters';

describe('generic filter - some', () => {
  it('Should pass', () => {
    const result = GENERAL_FILTERS_HANDLER[GeneralFilters.some]([
      true,
      true,
      false,
    ]);
    expect(result).toBe(true);
  });
});

describe('generic filter - every', () => {
  it('Should pass', () => {
    const result = GENERAL_FILTERS_HANDLER[GeneralFilters.every]([
      true,
      true,
      true,
    ]);
    expect(result).toBe(true);
  });
});

describe('generic filter - filter', () => {
  const files = ['filters.test.ts', 'controller.spec.ts', 'hello.js'];
  const sourceFiles = [
    {
      original_file: 'README.md',
      new_file: 'README.md',
      diff: '@@ -11,75 +11,8 @@ n-\n-Lady gaga the queen\n-Lady gaga the queen',
      original_content:
        '# EuropeanPaintings\n\n![image](https://user-images.githubusercontent.com/52451294/131232589-06f209d5-ce33-48ff-aa3a-6e74fa0de637.png)\n\nTh',
      new_content: '\n-Lady gaga the queen\n-Lady gaga the queen bbbbbbb',
    },
    {
      original_file: 'hello.js',
      new_file: 'hello.js',
      diff: '@@ -11,75 +11,8 @@ This project was generated with [Angular CLI](https://github.com/angular/angular\n yyyyyqueen\n+console.log();',
      original_content:
        'This project was generated with [Angular CLI](https://github.com/angular/angular\n 3) Run `ng serve` for a dev server',
      new_content:
        '# This project was generated with [Angular CLI](https://github.com/angular/angular\n yyyyyqueen\n+console.log();',
    },
  ];

  it('should pass for term input', () => {
    const result = GENERAL_FILTERS_HANDLER[GeneralFilters.filter](files, {
      term: 'test.ts',
    });
    expect(result).toHaveLength(1);
  });
  it('should pass for term and attr inputs', () => {
    const result = GENERAL_FILTERS_HANDLER[GeneralFilters.filter](sourceFiles, {
      term: 'bbbbbbb',
      attr: 'new_content',
    });
    expect(result).toHaveLength(1);
  });
  it('should pass for regex input', () => {
    const result = GENERAL_FILTERS_HANDLER[GeneralFilters.filter](files, {
      regex: '\\.js$',
    });
    expect(result).toHaveLength(1);
  });
  it('should pass for regex and attr inputs', () => {
    const result = GENERAL_FILTERS_HANDLER[GeneralFilters.filter](sourceFiles, {
      regex: '\\.js$',
      attr: 'new_file',
    });
    expect(result).toHaveLength(1);
  });
  it('should pass for list input', () => {
    const result = GENERAL_FILTERS_HANDLER[GeneralFilters.filter](files, {
      list: ['hello.js', 'controller.spec.ts'],
    });
    expect(result).toHaveLength(2);
  });
  it('should pass for list and attr inputs', () => {
    const result = GENERAL_FILTERS_HANDLER[GeneralFilters.filter](sourceFiles, {
      list: ['README.md', 'bbbbbbb'],
      attr: 'new_content',
    });
    expect(result).toHaveLength(1);
  });
});

describe('generic filter - reject', () => {
  const files = ['filters.test.ts', 'controller.spec.ts', 'hello.js'];
  const sourceFiles = [
    {
      original_file: 'README.md',
      new_file: 'README.md',
      diff: '@@ -11,75 +11,8 @@ n-\n-Lady gaga the queen\n-Lady gaga the queen',
      original_content:
        '# EuropeanPaintings\n\n![image](https://user-images.githubusercontent.com/52451294/131232589-06f209d5-ce33-48ff-aa3a-6e74fa0de637.png)\n\nTh',
      new_content: '\n-Lady gaga the queen\n-Lady gaga the queen bbbbbbb',
    },
    {
      original_file: 'hello.js',
      new_file: 'hello.js',
      diff: '@@ -11,75 +11,8 @@ This project was generated with [Angular CLI](https://github.com/angular/angular\n yyyyyqueen\n+console.log();',
      original_content:
        'This project was generated with [Angular CLI](https://github.com/angular/angular\n 3) Run `ng serve` for a dev server',
      new_content:
        '# This project was generated with [Angular CLI](https://github.com/angular/angular\n yyyyyqueen\n+console.log();',
    },
  ];

  it('should pass for term input', () => {
    const result = GENERAL_FILTERS_HANDLER[GeneralFilters.reject](files, {
      term: 'test.ts',
    });
    expect(result).toHaveLength(2);
  });
  it('should pass for term and attr inputs', () => {
    const result = GENERAL_FILTERS_HANDLER[GeneralFilters.reject](sourceFiles, {
      term: 'bbbbbbb',
      attr: 'new_content',
    });
    expect(result).toHaveLength(1);
  });
  it('should pass for regex input', () => {
    const result = GENERAL_FILTERS_HANDLER[GeneralFilters.reject](files, {
      regex: '\\.js$',
    });
    expect(result).toHaveLength(2);
  });
  it('should pass for regex and attr inputs', () => {
    const result = GENERAL_FILTERS_HANDLER[GeneralFilters.reject](sourceFiles, {
      regex: '\\.js$',
      attr: 'new_file',
    });
    expect(result).toHaveLength(1);
  });
  it('should pass for list input', () => {
    const result = GENERAL_FILTERS_HANDLER[GeneralFilters.reject](files, {
      list: ['hello.js', 'controller.spec.ts'],
    });
    expect(result).toHaveLength(1);
  });
  it('should pass for list and attr inputs', () => {
    const result = GENERAL_FILTERS_HANDLER[GeneralFilters.reject](sourceFiles, {
      list: ['README.md', 'bbbbbbb'],
      attr: 'new_content',
    });
    expect(result).toHaveLength(1);
  });
});

describe('parseMap', () => {
  it('Should return a new list of the selected object attribute', () => {
    const result = GENERAL_FILTERS_HANDLER[GeneralFilters.map](
      [
        {
          original_file: 'README.md',
          new_file: 'README.md',
          diff: '@@ -11,75 +11,8 @@ n-\n-Lady gaga the queen\n-Lady gaga the queen',
          original_content:
            '# EuropeanPaintings\n\n![image](https://user-images.githubusercontent.com/52451294/131232589-06f209d5-ce33-48ff-aa3a-6e74fa0de637.png)\n\nTh',
          new_content: '\n-Lady gaga the queen\n-Lady gaga the queen bbbbbbb',
        },
        {
          original_file: 'hello.js',
          new_file: 'hello.js',
          diff: '@@ -11,75 +11,8 @@ This project was generated with [Angular CLI](https://github.com/angular/angular\n yyyyyqueen\n+console.log();',
          original_content:
            'This project was generated with [Angular CLI](https://github.com/angular/angular\n 3) Run `ng serve` for a dev server',
          new_content:
            '# This project was generated with [Angular CLI](https://github.com/angular/angular\n yyyyyqueen\n+console.log();',
        },
      ],
      'new_file'
    );
    expect(result).toHaveLength(2);
  });
});

describe('includes', () => {
  it('Should pass for term input', () => {
    const result = GENERAL_FILTERS_HANDLER[GeneralFilters.includes](
      'something',
      {
        term: 'thing',
      }
    );
    expect(result).toBe(true);
  });
});

describe('includes', () => {
  it('Should pass for regex input', () => {
    const result = GENERAL_FILTERS_HANDLER[GeneralFilters.includes](
      'something',
      {
        regex: 'thing',
      }
    );
    expect(result).toBe(true);
  });
});

describe('includes', () => {
  it('Should pass for list input', () => {
    const result = GENERAL_FILTERS_HANDLER[GeneralFilters.includes](
      'something',
      {
        list: ['any', 'thing'],
      }
    );
    expect(result).toBe(true);
  });
});

describe('generic filter - match', () => {
  const files = ['filters.test.ts', 'controller.spec.ts', 'hello.js'];
  const sourceFiles = [
    {
      original_file: 'README.md',
      new_file: 'README.md',
      diff: '@@ -11,75 +11,8 @@ n-\n-Lady gaga the queen\n-Lady gaga the queen',
      original_content:
        '# EuropeanPaintings\n\n![image](https://user-images.githubusercontent.com/52451294/131232589-06f209d5-ce33-48ff-aa3a-6e74fa0de637.png)\n\nTh',
      new_content: '\n-Lady gaga the queen\n-Lady gaga the queen bbbbbbb',
    },
    {
      original_file: 'hello.js',
      new_file: 'hello.js',
      diff: '@@ -11,75 +11,8 @@ This project was generated with [Angular CLI](https://github.com/angular/angular\n yyyyyqueen\n+console.log();',
      original_content:
        'This project was generated with [Angular CLI](https://github.com/angular/angular\n 3) Run `ng serve` for a dev server',
      new_content:
        '# This project was generated with [Angular CLI](https://github.com/angular/angular\n yyyyyqueen\n+console.log();',
    },
  ];

  it('should pass for term input', () => {
    const result = GENERAL_FILTERS_HANDLER[GeneralFilters.match](files, {
      term: 'test.ts',
    });
    expect(result).toEqual([true, false, false]);
  });
  it('should pass for term and attr inputs', () => {
    const result = GENERAL_FILTERS_HANDLER[GeneralFilters.match](sourceFiles, {
      term: 'bbbbbbb',
      attr: 'new_content',
    });
    expect(result).toEqual([true, false]);
  });
  it('should pass for regex input', () => {
    const result = GENERAL_FILTERS_HANDLER[GeneralFilters.match](files, {
      regex: '\\.js$',
    });
    expect(result).toEqual([false, false, true]);
  });
  it('should pass for regex and attr inputs', () => {
    const result = GENERAL_FILTERS_HANDLER[GeneralFilters.match](sourceFiles, {
      regex: '\\.js$',
      attr: 'new_file',
    });
    expect(result).toEqual([false, true]);
  });
  it('should pass for list input', () => {
    const result = GENERAL_FILTERS_HANDLER[GeneralFilters.match](files, {
      list: ['hello.js', 'controller.spec.ts'],
    });
    expect(result).toEqual([false, true, true]);
  });
  it('should pass for list and attr inputs', () => {
    const result = GENERAL_FILTERS_HANDLER[GeneralFilters.match](sourceFiles, {
      list: ['README.md', 'bbbbbbb'],
      attr: 'new_content',
    });
    expect(result).toEqual([true, false]);
  });
});

describe('generic filter - nope', () => {
  it('Should pass', () => {
    const result = GENERAL_FILTERS_HANDLER[GeneralFilters.nope]([
      false,
      false,
      false,
    ]);
    expect(result).toBe(true);
  });
});
