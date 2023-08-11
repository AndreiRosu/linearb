import {
  HighLevelFilters,
  HIGH_LEVEL_FILTERS_HANDLER,
} from '../filters/high-level-filters';
import { repo } from './consts/contextForHLFilters';

describe('isFormattingChange', () => {
  it('Should pass for python formatter', () => {
    const res = HIGH_LEVEL_FILTERS_HANDLER[HighLevelFilters.isFormattingChange](
      [
        {
          new_content: `# comment\n\n# comment\ndef test   ():\n  print("hello")`,
          new_file: 'hello.py',
          original_file: 'hello.py',
          original_content: `\n\n# comment\n# comment\ndef test   ():\n    print("hello")`,
        },
      ]
    );
    expect(res).toBe(true);
  });

  it('Should pass for js formatter', () => {
    const res = HIGH_LEVEL_FILTERS_HANDLER[HighLevelFilters.isFormattingChange](
      [
        {
          new_content: `
          function test(){
            console.log("hello")
          }
          `,
          new_file: 'hello.js',
          original_file: 'hello.js',
          original_content: `
          function test () {
            console.log('hello');
          }`,
        },
      ]
    );
    expect(res).toBe(true);
  });
});

describe('allDocs', () => {
  it('Should pass', () => {
    const result = HIGH_LEVEL_FILTERS_HANDLER[HighLevelFilters.allDocs]([
      'readme.md',
      'test.txt',
    ]);
    expect(result).toBe(true);
  });

  it('Should not pass if requirements.txt is included', () => {
    const result = HIGH_LEVEL_FILTERS_HANDLER[HighLevelFilters.allDocs]([
      'readme.md',
      'requirements.txt',
    ]);
    expect(result).toBe(false);
  });
});

describe('allImages', () => {
  it('Should pass', () => {
    const result = HIGH_LEVEL_FILTERS_HANDLER[HighLevelFilters.allImages]([
      'circle.svg',
      'arrow.png',
    ]);
    expect(result).toBe(true);
  });
});

describe('allTests', () => {
  it('Should pass', () => {
    const result = HIGH_LEVEL_FILTERS_HANDLER[HighLevelFilters.allTests]([
      'dd/spectator/test/t.ts',
      'service/controller.spec.ts',
    ]);
    expect(result).toBe(true);
  });
});

describe('matchDiffLines', () => {
  it('Should pass', () => {
    const result = HIGH_LEVEL_FILTERS_HANDLER[HighLevelFilters.matchDiffLines](
      [
        {
          original_file: 'README.md',
          new_file: 'README.md',
          diff: '@@ -11,75 +11,8 @@ Lady gaga the queen\n+console.log();',
          original_content: 'not used',
          new_content: 'not used',
        },
        {
          original_file: 'hello.js',
          new_file: 'hello.js',
          diff: '@@ -11,75 @@ \n+console.log();\n+bla bla\n-    \n+',
          original_content: 'not used',
          new_content: 'not used',
        },
      ],
      { regex: '^[+-].*console.log', ignoreWhiteSpaces: true }
    );

    expect(result).toEqual([true, true, false]);
  });
});

describe('isFirstCommit', () => {
  it('Should pass', () => {
    const result = HIGH_LEVEL_FILTERS_HANDLER[HighLevelFilters.isFirstCommit](
      {
        'gitstream-yeela-local[bot] <111737475+gitstream-yeela-local[bot]@users.noreply.github.com>': 2,
        'Yeela Lifshitz <yeelalifshitz@MacBook-Pro.local>': 1,
        'yeelali14 <yeela88@gmail.com>': 1,
      },
      'Elad Kohavi <106978846+EladKohavi@users.noreply.github.com>'
    );

    expect(result).toEqual(true);
  });
});

describe('rankByGitBlame', () => {
  it('Should pass for gt', () => {
    const result = HIGH_LEVEL_FILTERS_HANDLER[HighLevelFilters.rankByGitBlame](
      repo,
      { gt: 25 }
    );

    expect(result).toEqual(['Fadikhayo1995', 'orielz']);
  });

  it('Should pass lt', () => {
    const result = HIGH_LEVEL_FILTERS_HANDLER[HighLevelFilters.rankByGitBlame](
      repo,
      { lt: 20 }
    );

    expect(result).toEqual([
      'omarcovitch',
      'saharavishag',
      'zuki-linB',
      'KerenLinearB',
      'yishaibeeri',
    ]);
  });
});

describe('explainRankByGitBlame', () => {
  it('Should pass gt and print explainRankByGitBlame', () => {
    const result = HIGH_LEVEL_FILTERS_HANDLER[
      HighLevelFilters.explainRankByGitBlame
    ](repo, { gt: 20 });
    console.log('base 64 result:', result);
    expect(result).toContain('base64: ');

    if (result.startsWith('base64:')) {
      const decoded = Buffer.from(
        result.split('base64: ')[1],
        'base64'
      ).toString('utf-8');
      console.log(decoded);
      expect(decoded).toContain(
        '**Suggested reviewers: Fadikhayo1995, orielz**'
      );
    }
  });
});

describe('rankByGitActivity', () => {
  it('Should pass gt and print rankByGitActivity', () => {
    const result = HIGH_LEVEL_FILTERS_HANDLER[
      HighLevelFilters.rankByGitActivity
    ](repo, { gt: 25, weeks: 40 });

    console.log('result: ', result);

    expect(result).toEqual([
      'omarcovitch',
      'Fadikhayo1995',
      'vim-zz',
      'saharavishag',
    ]);
  });
});

describe('mapToEnum', () => {
  it('Should pass', () => {
    const result = HIGH_LEVEL_FILTERS_HANDLER[HighLevelFilters.mapToEnum]('B', {
      enum: { A: 'd1fadf', B: 'e1f5a8', C: 'f0f593', D: 'f5c778', E: 'fecdca' },
    });

    console.log('mapToEnum result: ', result);

    expect(result).toEqual('e1f5a8');
  });
});

//TODO:

// describe('extensions', () => {
//   it('Should pass', () => {});
// });
