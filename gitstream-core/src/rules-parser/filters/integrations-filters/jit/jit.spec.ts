import { HIGH_LEVEL_FILTERS_HANDLER } from '../../high-level-filters';

describe('jit filter', () => {
  const prContext = {
    reviews: [
      {
        commenter: 'jit-ci',
        content:
          '❌ **Jit has detected 1 important finding in this PR that you should review.**\n' +
          '_The finding is detailed below as a comment._\n' +
          '_It’s highly recommended that you fix this security issue before merge._',
        state: 'commented',
        conversations: [
          {
            commenter: 'jit-ci',
            content:
              '**Security control:** Secret Detection\n' +
              '\n' +
              '**Type:** Private-Key\n' +
              '\n' +
              '**Description:** _Private Key_ \n' +
              '\n' +
              '**Severity:** HIGH\n' +
              '\n' +
              '---\n' +
              '<details>\n' +
              '<summary><b>Jit Bot commands and options (e.g., ignore issue)</b></summary>\n' +
              '<br />\n' +
              '\n' +
              'You can trigger Jit actions by commenting on this PR review:\n' +
              '- `#jit_ignore_fp` Ignore and mark this specific single instance of finding as “False Positive”\n' +
              '- `#jit_ignore_accept` Ignore and mark this specific single instance of finding as “Accept Risk”\n' +
              '- `#jit_undo_ignore` Undo ignore command\n' +
              '</details>\n' +
              '\n' +
              '<!-- f51547ea-36cd-4bd2-8fab-6b86c69028c3 -->',
            created_at: '2023-05-15T13:33:08Z',
            state: 'submitted',
            id: 1193844939,
          },
        ],
      },
    ],
    conversations: [
      {
        commenter: 'jit-ci',
        content:
          '**Security control:** Secret Detection\n' +
          '\n' +
          '**Type:** Private-Key\n' +
          '\n' +
          '**Description:** _Private Key_ \n' +
          '\n' +
          '**Severity:** HIGH\n' +
          '\n' +
          '---\n' +
          '<details>\n' +
          '<summary><b>Jit Bot commands and options (e.g., ignore issue)</b></summary>\n' +
          '<br />\n' +
          '\n' +
          'You can trigger Jit actions by commenting on this PR review:\n' +
          '- `#jit_ignore_fp` Ignore and mark this specific single instance of finding as “False Positive”\n' +
          '- `#jit_ignore_accept` Ignore and mark this specific single instance of finding as “Accept Risk”\n' +
          '- `#jit_undo_ignore` Undo ignore command\n' +
          '</details>\n' +
          '\n' +
          '<!-- f51547ea-36cd-4bd2-8fab-6b86c69028c3 -->',
        created_at: '2023-05-15T13:33:08Z',
        state: 'submitted',
        id: 1193844939,
      },
    ],
    isPrivate: true,
    target: 'develop',
  };
  it('Should have the expected jit object', async () => {
    const expectedResults = {
      vulnerabilities: [
        {
          security_control: 'Secret Detection',
          type: 'Private-Key',
          description: '_Private Key_',
          severity: 'HIGH',
          summary: 'Jit Bot commands and options (e.g., ignore issue)',
        },
      ],
      metrics: { HIGH: 1, MEDIUM: 0, LOW: 0, INFO: 0 },
    };
    const result = HIGH_LEVEL_FILTERS_HANDLER.extractJitFindings(prContext);
    expect(result).toEqual(JSON.stringify(expectedResults));
  });

  it('Shoult return an empty jit object in case of no matches', async () => {
    const expectedResults = {
      vulnerabilities: [],
      metrics: { HIGH: null, MEDIUM: null, LOW: null, INFO: null },
    };
    const result = HIGH_LEVEL_FILTERS_HANDLER.extractJitFindings({
      reviews: [],
    });
    expect(result).toEqual(JSON.stringify(expectedResults));
  });
});
