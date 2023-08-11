import axios from 'axios';
import { Filters, FILTER_HANDLERS } from './filters';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.post.mockImplementation(() =>
  Promise.resolve({
    data: {
      reviewTime: '2-7 Minutes',
      numericValue: 4,
    },
  })
);

describe('allPassRegexTests', () => {
  it('Should pass', () => {
    const result = FILTER_HANDLERS[Filters.allPassRegex](
      ['file.styledComponents.js', 'image.png', 'image.svg', 'image.jpg'],
      '.*.styledComponents.js$|.*.png$|.*.jpg$|.*.svg$|.*.css$'
    );
    expect(result).toBe(true);
  });
});

describe('allFormattingChange', () => {
  it('Should pass', () => {
    const res = FILTER_HANDLERS[Filters.allFormattingChange]([
      {
        new_content: `const test = () => {console.log("hello");}`,
        new_file: 'hello.js',
        original_file: 'hello.js',
        original_content: `const test    =    ()    => {   console.log('hello')   ;}`,
      },
    ]);
    expect(res).toBe(true);
  });
});

describe('filterList', () => {
  it('Should pass', () => {
    const result = FILTER_HANDLERS[Filters.filterList](
      ['file.styledComponents.js', 'image.png', 'image.svg', 'image.jpg'],
      ['image.svg', 'image.png']
    );
    expect(result).toHaveLength(2);
  });
});

describe('filterListRegex', () => {
  it('Should pass', () => {
    const result = FILTER_HANDLERS[Filters.filterListRegex](
      ['file.styledComponents.js', 'image.png', 'image.svg', 'image.jpg'],
      'svg'
    );
    expect(result).toHaveLength(1);
  });
});

describe('isEveryInListRegex', () => {
  it('Should pass', () => {
    const result = FILTER_HANDLERS[Filters.isEveryInListRegex](
      ['image.png', 'image.svg', 'image.jpg'],
      '.*.png$|.*.jpg$|.*.svg$'
    );
    expect(result).toBe(true);
  });
});

describe('isSomeInList', () => {
  it('Should pass', () => {
    const result = FILTER_HANDLERS[Filters.isSomeInList](
      ['image.png', 'image.svg', 'image.jpg'],
      ['image.svg', 'image.png']
    );
    expect(result).toBe(true);
  });
});

describe('isSomeInListRegex', () => {
  it('Should pass', () => {
    const result = FILTER_HANDLERS[Filters.isSomeInListRegex](
      ['image.png', 'image.svg'],
      '.*.png$|.*.jpg$|.*.svg$'
    );
    expect(result).toBe(true);
  });
});

describe('isStringIncludes', () => {
  it('Should pass', () => {
    const result = FILTER_HANDLERS[Filters.isStringIncludes]('image.jpg', [
      'svg',
      'jpg',
    ]);
    expect(result).toBe(true);
  });
});

describe('isStringIncludesRegex', () => {
  it('Should pass', () => {
    const result = FILTER_HANDLERS[Filters.isStringIncludesRegex](
      'image.jpg',
      '.*.png$|.*.jpg$|.*.svg$'
    );
    expect(result).toBe(true);
  });
});

describe('isEveryInList', () => {
  it('Should pass', () => {
    const result = FILTER_HANDLERS[Filters.isEveryInList](
      ['a.service.ts', 'b.service.ts'],
      ['service', 'ts']
    );
    expect(result).toBe(true);
  });
});

describe('extractExtensions', () => {
  it('Should pass', () => {
    const result = FILTER_HANDLERS[Filters.extractExtensions]([
      'a.service.ts',
      'package.json',
    ]);
    expect(result).toEqual(['ts', 'json']);
  });
});

describe('isEveryExtension', () => {
  it('Should pass', () => {
    const result = FILTER_HANDLERS[Filters.isEveryExtension](
      ['a.service.ts', 'b.ts', 'package.json'],
      ['ts', 'json']
    );
    expect(result).toBe(true);
  });
});

describe('isEveryExtensionRegex', () => {
  it('Should pass', () => {
    const result = FILTER_HANDLERS[Filters.isEveryExtensionRegex](
      ['a.service.ts', 'b.ts', 'package.json'],
      'json|ts'
    );
    expect(result).toBe(true);
  });
});

describe('filterFileDiffRegex', () => {
  it('Should pass', () => {
    const result = FILTER_HANDLERS[Filters.filterFileDiffRegex](
      [
        {
          original_file: 'README.md',
          new_file: 'README.md',
          diff: "@@ -11,75 +11,8 @@ This project was generated with [Angular CLI](https://github.com/angular/angular\n 3) Run `ng serve` for a dev server. \n 4) Navigate to `http://localhost:4200/`. The app will automatically reload.\n \n-##Elad's history:\n-I was born in 1990\n-\n ## Further help\n \n To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.\n \n-#PR\n-To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.\n-\n-#PRTo get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.\n-\n-#PRTo get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.\n-\n-#PRTo get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.\n-\n-#PR\n-I scraped my knees while I was praying\n-And found a demon in my safest haven, seems like\n-It's getting harder to believe in anything\n-Then just to get lost in all my selfish thoughts\n-I wanna know what it'd be like\n-To find perfection in my pride\n-To see nothing in the light\n-I'll turn it off\n-In all my spite\n-In all my spite\n-I'll turn it off\n-And the worst part is\n-Before it gets any better\n-We're headed for a cliff\n-And in the free fall I will realize\n-I'm better off when I hit the bottom\n-The tragedy, it seems unending\n-I'm watching everyone I looked up to break and bending\n-We're taking shortcuts and false solutions\n-Just to come out the hero\n-Well I can see behind the curtain (I can see, yeah yeah)\n-The wheels are cranking, turning, so on the way we're working\n-Towards a goal, that's non existent\n-It's not existent, but we just keep believing\n-And the worst part is\n-Before it gets any better\n-We're headed for a cliff\n-And in the free fall I will realize\n-I'm better off when I hit the bottom\n-I wanna know what it'd be like\n-To find perfection in my pride\n-To see nothing in the light\n-I'll turn it off\n-In all my spite\n-In all my spite\n-I'll turn it off\n-Just turn it off\n-Again\n-Again\n-And the worst part is\n-Before it gets any better\n-We're headed for a cliff\n-And in the free fall I will realize\n-I'm better off when I hit the bottom\n-And the worst part is\n-Before it gets any better\n-We're headed for a cliff\n-And in the free fall I will realize\n-I'm better off when I hit the bottom\n-\n-And in the free fall I will realize\n-I'm better off when I hit the bottom\n-\n-Lady gaga the queen\n-Lady gaga the queen\n+console.log();",
          original_content:
            "# EuropeanPaintings\n\n![image](https://user-images.githubusercontent.com/52451294/131232589-06f209d5-ce33-48ff-aa3a-6e74fa0de637.png)\n\nThis project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.3.\n\n## Development server\n\n1) Install Angular CLI: `npm install -g @angular/cli`\n2) Run `npm install`\n3) Run `ng serve` for a dev server. \n4) Navigate to `http://localhost:4200/`. The app will automatically reload.\n\n##Elad's history:\nI was born in 1990\n\n## Further help\n\nTo get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.\n\n#PR\nTo get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.\n\n#PRTo get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.\n\n#PRTo get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.\n\n#PRTo get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.\n\n#PR\nI scraped my knees while I was praying\nAnd found a demon in my safest haven, seems like\nIt's getting harder to believe in anything\nThen just to get lost in all my selfish thoughts\nI wanna know what it'd be like\nTo find perfection in my pride\nTo see nothing in the light\nI'll turn it off\nIn all my spite\nIn all my spite\nI'll turn it off\nAnd the worst part is\nBefore it gets any better\nWe're headed for a cliff\nAnd in the free fall I will realize\nI'm better off when I hit the bottom\nThe tragedy, it seems unending\nI'm watching everyone I looked up to break and bending\nWe're taking shortcuts and false solutions\nJust to come out the hero\nWell I can see behind the curtain (I can see, yeah yeah)\nThe wheels are cranking, turning, so on the way we're working\nTowards a goal, that's non existent\nIt's not existent, but we just keep believing\nAnd the worst part is\nBefore it gets any better\nWe're headed for a cliff\nAnd in the free fall I will realize\nI'm better off when I hit the bottom\nI wanna know what it'd be like\nTo find perfection in my pride\nTo see nothing in the light\nI'll turn it off\nIn all my spite\nIn all my spite\nI'll turn it off\nJust turn it off\nAgain\nAgain\nAnd the worst part is\nBefore it gets any better\nWe're headed for a cliff\nAnd in the free fall I will realize\nI'm better off when I hit the bottom\nAnd the worst part is\nBefore it gets any better\nWe're headed for a cliff\nAnd in the free fall I will realize\nI'm better off when I hit the bottom\n\nAnd in the free fall I will realize\nI'm better off when I hit the bottom\n\nLady gaga the queen\nLady gaga the queen\n",
          new_content:
            '# EuropeanPaintings\n\n![image](https://user-images.githubusercontent.com/52451294/131232589-06f209d5-ce33-48ff-aa3a-6e74fa0de637.png)\n\nThis project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.3.\n\n## Development server\n\n1) Install Angular CLI: `npm install -g @angular/cli`\n2) Run `npm install`\n3) Run `ng serve` for a dev server. \n4) Navigate to `http://localhost:4200/`. The app will automatically reload.\n\n## Further help\n\nTo get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.\n\nconsole.log();\n',
        },
        {
          original_file: 'README2.md',
          new_file: 'README2.md',
          diff: '@@ -11,75 +11,8 @@ This project was generated with [Angular CLI](https://github.com/angular/angular\n yyyyy',
          original_content:
            'This project was generated with [Angular CLI](https://github.com/angular/angular\n 3) Run `ng serve` for a dev server',
          new_content:
            '# This project was generated with [Angular CLI](https://github.com/angular/angular\n yyyyy',
        },
      ],
      'console.log'
    );
    expect(result).toHaveLength(1);
  });
});

describe('isEveryLineInFileDiffRegex', () => {
  it('Should pass', () => {
    const result = FILTER_HANDLERS[Filters.isEveryLineInFileDiffRegex](
      [
        {
          original_file: 'README.md',
          new_file: 'README.md',
          diff: "@@ -11,75 +11,8 @@ This project was generated with [Angular CLI](https://github.com/angular/angular\n 3) Run `ng serve` for a dev server. \n 4) Navigate to `http://localhost:4200/`. The app will automatically reload.\n \n-##Elad's history:\n-I was born in 1990\n-\n ## Further help\n \n To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.\n \n-#PR\n-To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.\n-\n-#PRTo get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.\n-\n-#PRTo get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.\n-\n-#PRTo get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.\n-\n-#PR\n-I scraped my knees while I was praying\n-And found a demon in my safest haven, seems like\n-It's getting harder to believe in anything\n-Then just to get lost in all my selfish thoughts\n-I wanna know what it'd be like\n-To find perfection in my pride\n-To see nothing in the light\n-I'll turn it off\n-In all my spite\n-In all my spite\n-I'll turn it off\n-And the worst part is\n-Before it gets any better\n-We're headed for a cliff\n-And in the free fall I will realize\n-I'm better off when I hit the bottom\n-The tragedy, it seems unending\n-I'm watching everyone I looked up to break and bending\n-We're taking shortcuts and false solutions\n-Just to come out the hero\n-Well I can see behind the curtain (I can see, yeah yeah)\n-The wheels are cranking, turning, so on the way we're working\n-Towards a goal, that's non existent\n-It's not existent, but we just keep believing\n-And the worst part is\n-Before it gets any better\n-We're headed for a cliff\n-And in the free fall I will realize\n-I'm better off when I hit the bottom\n-I wanna know what it'd be like\n-To find perfection in my pride\n-To see nothing in the light\n-I'll turn it off\n-In all my spite\n-In all my spite\n-I'll turn it off\n-Just turn it off\n-Again\n-Again\n-And the worst part is\n-Before it gets any better\n-We're headed for a cliff\n-And in the free fall I will realize\n-I'm better off when I hit the bottom\n-And the worst part is\n-Before it gets any better\n-We're headed for a cliff\n-And in the free fall I will realize\n-I'm better off when I hit the bottom\n-\n-And in the free fall I will realize\n-I'm better off when I hit the bottom\n-\n-Lady gaga the queen\n-Lady gaga the queen\n+console.log();",
          original_content:
            "# EuropeanPaintings\n\n![image](https://user-images.githubusercontent.com/52451294/131232589-06f209d5-ce33-48ff-aa3a-6e74fa0de637.png)\n\nThis project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.3.\n\n## Development server\n\n1) Install Angular CLI: `npm install -g @angular/cli`\n2) Run `npm install`\n3) Run `ng serve` for a dev server. \n4) Navigate to `http://localhost:4200/`. The app will automatically reload.\n\n##Elad's history:\nI was born in 1990\n\n## Further help\n\nTo get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.\n\n#PR\nTo get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.\n\n#PRTo get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.\n\n#PRTo get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.\n\n#PRTo get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.\n\n#PR\nI scraped my knees while I was praying\nAnd found a demon in my safest haven, seems like\nIt's getting harder to believe in anything\nThen just to get lost in all my selfish thoughts\nI wanna know what it'd be like\nTo find perfection in my pride\nTo see nothing in the light\nI'll turn it off\nIn all my spite\nIn all my spite\nI'll turn it off\nAnd the worst part is\nBefore it gets any better\nWe're headed for a cliff\nAnd in the free fall I will realize\nI'm better off when I hit the bottom\nThe tragedy, it seems unending\nI'm watching everyone I looked up to break and bending\nWe're taking shortcuts and false solutions\nJust to come out the hero\nWell I can see behind the curtain (I can see, yeah yeah)\nThe wheels are cranking, turning, so on the way we're working\nTowards a goal, that's non existent\nIt's not existent, but we just keep believing\nAnd the worst part is\nBefore it gets any better\nWe're headed for a cliff\nAnd in the free fall I will realize\nI'm better off when I hit the bottom\nI wanna know what it'd be like\nTo find perfection in my pride\nTo see nothing in the light\nI'll turn it off\nIn all my spite\nIn all my spite\nI'll turn it off\nJust turn it off\nAgain\nAgain\nAnd the worst part is\nBefore it gets any better\nWe're headed for a cliff\nAnd in the free fall I will realize\nI'm better off when I hit the bottom\nAnd the worst part is\nBefore it gets any better\nWe're headed for a cliff\nAnd in the free fall I will realize\nI'm better off when I hit the bottom\n\nAnd in the free fall I will realize\nI'm better off when I hit the bottom\n\nLady gaga the queen\nLady gaga the queen\n",
          new_content:
            '# EuropeanPaintings\n\n![image](https://user-images.githubusercontent.com/52451294/131232589-06f209d5-ce33-48ff-aa3a-6e74fa0de637.png)\n\nThis project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.3.\n\n## Development server\n\n1) Install Angular CLI: `npm install -g @angular/cli`\n2) Run `npm install`\n3) Run `ng serve` for a dev server. \n4) Navigate to `http://localhost:4200/`. The app will automatically reload.\n\n## Further help\n\nTo get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.\n\nconsole.log();\n',
        },
        {
          original_file: 'README2.md',
          new_file: 'README2.md',
          diff: '@@ -11,75 +11,8 @@ This project was generated with [Angular CLI](https://github.com/angular/angular\n yyyyyqueen\n+console.log();',
          original_content:
            'This project was generated with [Angular CLI](https://github.com/angular/angular\n 3) Run `ng serve` for a dev server',
          new_content:
            '# This project was generated with [Angular CLI](https://github.com/angular/angular\n yyyyyqueen\n+console.log();',
        },
      ],
      'console.log'
    );
    expect(result).toBe(true);
  });
});

describe('isSomeLineInFileDiffRegex', () => {
  it('Should pass', () => {
    const result = FILTER_HANDLERS[Filters.isSomeLineInFileDiffRegex](
      [
        {
          original_file: 'README.md',
          new_file: 'README.md',
          diff: "@@ -11,75 +11,8 @@ This project was generated with [Angular CLI](https://github.com/angular/angular\n 3) Run `ng serve` for a dev server. \n 4) Navigate to `http://localhost:4200/`. The app will automatically reload.\n \n-##Elad's history:\n-I was born in 1990\n-\n ## Further help\n \n To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.\n \n-#PR\n-To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.\n-\n-#PRTo get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.\n-\n-#PRTo get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.\n-\n-#PRTo get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.\n-\n-#PR\n-I scraped my knees while I was praying\n-And found a demon in my safest haven, seems like\n-It's getting harder to believe in anything\n-Then just to get lost in all my selfish thoughts\n-I wanna know what it'd be like\n-To find perfection in my pride\n-To see nothing in the light\n-I'll turn it off\n-In all my spite\n-In all my spite\n-I'll turn it off\n-And the worst part is\n-Before it gets any better\n-We're headed for a cliff\n-And in the free fall I will realize\n-I'm better off when I hit the bottom\n-The tragedy, it seems unending\n-I'm watching everyone I looked up to break and bending\n-We're taking shortcuts and false solutions\n-Just to come out the hero\n-Well I can see behind the curtain (I can see, yeah yeah)\n-The wheels are cranking, turning, so on the way we're working\n-Towards a goal, that's non existent\n-It's not existent, but we just keep believing\n-And the worst part is\n-Before it gets any better\n-We're headed for a cliff\n-And in the free fall I will realize\n-I'm better off when I hit the bottom\n-I wanna know what it'd be like\n-To find perfection in my pride\n-To see nothing in the light\n-I'll turn it off\n-In all my spite\n-In all my spite\n-I'll turn it off\n-Just turn it off\n-Again\n-Again\n-And the worst part is\n-Before it gets any better\n-We're headed for a cliff\n-And in the free fall I will realize\n-I'm better off when I hit the bottom\n-And the worst part is\n-Before it gets any better\n-We're headed for a cliff\n-And in the free fall I will realize\n-I'm better off when I hit the bottom\n-\n-And in the free fall I will realize\n-I'm better off when I hit the bottom\n-\n-Lady gaga the queen\n-Lady gaga the queen",
          original_content:
            "# EuropeanPaintings\n\n![image](https://user-images.githubusercontent.com/52451294/131232589-06f209d5-ce33-48ff-aa3a-6e74fa0de637.png)\n\nThis project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.3.\n\n## Development server\n\n1) Install Angular CLI: `npm install -g @angular/cli`\n2) Run `npm install`\n3) Run `ng serve` for a dev server. \n4) Navigate to `http://localhost:4200/`. The app will automatically reload.\n\n##Elad's history:\nI was born in 1990\n\n## Further help\n\nTo get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.\n\n#PR\nTo get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.\n\n#PRTo get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.\n\n#PRTo get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.\n\n#PRTo get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.\n\n#PR\nI scraped my knees while I was praying\nAnd found a demon in my safest haven, seems like\nIt's getting harder to believe in anything\nThen just to get lost in all my selfish thoughts\nI wanna know what it'd be like\nTo find perfection in my pride\nTo see nothing in the light\nI'll turn it off\nIn all my spite\nIn all my spite\nI'll turn it off\nAnd the worst part is\nBefore it gets any better\nWe're headed for a cliff\nAnd in the free fall I will realize\nI'm better off when I hit the bottom\nThe tragedy, it seems unending\nI'm watching everyone I looked up to break and bending\nWe're taking shortcuts and false solutions\nJust to come out the hero\nWell I can see behind the curtain (I can see, yeah yeah)\nThe wheels are cranking, turning, so on the way we're working\nTowards a goal, that's non existent\nIt's not existent, but we just keep believing\nAnd the worst part is\nBefore it gets any better\nWe're headed for a cliff\nAnd in the free fall I will realize\nI'm better off when I hit the bottom\nI wanna know what it'd be like\nTo find perfection in my pride\nTo see nothing in the light\nI'll turn it off\nIn all my spite\nIn all my spite\nI'll turn it off\nJust turn it off\nAgain\nAgain\nAnd the worst part is\nBefore it gets any better\nWe're headed for a cliff\nAnd in the free fall I will realize\nI'm better off when I hit the bottom\nAnd the worst part is\nBefore it gets any better\nWe're headed for a cliff\nAnd in the free fall I will realize\nI'm better off when I hit the bottom\n\nAnd in the free fall I will realize\nI'm better off when I hit the bottom\n\nLady gaga the queen\nLady gaga the queen\n",
          new_content:
            '# EuropeanPaintings\n\n![image](https://user-images.githubusercontent.com/52451294/131232589-06f209d5-ce33-48ff-aa3a-6e74fa0de637.png)\n\nThis project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.3.\n\n## Development server\n\n1) Install Angular CLI: `npm install -g @angular/cli`\n2) Run `npm install`\n3) Run `ng serve` for a dev server. \n4) Navigate to `http://localhost:4200/`. The app will automatically reload.\n\n## Further help\n\nTo get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.',
        },
        {
          original_file: 'README2.md',
          new_file: 'README2.md',
          diff: '@@ -11,75 +11,8 @@ This project was generated with [Angular CLI](https://github.com/angular/angular\n yyyyyqueen\n+console.log();',
          original_content:
            'This project was generated with [Angular CLI](https://github.com/angular/angular\n 3) Run `ng serve` for a dev server',
          new_content:
            '# This project was generated with [Angular CLI](https://github.com/angular/angular\n yyyyyqueen\n+console.log();',
        },
      ],
      'console.log'
    );
    expect(result).toBe(true);
  });
});
