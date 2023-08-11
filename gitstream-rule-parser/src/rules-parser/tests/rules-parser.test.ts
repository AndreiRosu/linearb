import { readFileSync } from 'fs';
import { RuleParser } from '..';
import { context, emptyContext } from './consts/context';
import {
  expectedResult,
  expectedResultForEmptyContext,
} from './consts/expectedResult';
import axios from 'axios';

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

describe('Check rule parser against CM file', () => {
  it('Should pass for match_logs automation', async () => {
    const rulesFile = readFileSync(
      'src/rules-parser/tests/resources/gitstream-for-test.cm'
    )
      .toString()
      .replaceAll('automation_name', 'match_logs');

    const parser = new RuleParser(rulesFile, context, true);
    const parsedRes = await parser.parseStreams();
    expect(parsedRes).toEqual(expectedResult('match_logs'));
  });

  it('Should pass for new_handler automation', async () => {
    const rulesFile = readFileSync(
      'src/rules-parser/tests/resources/gitstream-for-test.cm'
    )
      .toString()
      .replaceAll('automation_name', 'new_handler');

    const parser = new RuleParser(rulesFile, context, true);
    const parsedRes = await parser.parseStreams();
    expect(parsedRes).toEqual(expectedResult('new_handler'));
  });

  it('Should pass for logs_only_diff automation', async () => {
    const rulesFile = readFileSync(
      'src/rules-parser/tests/resources/gitstream-for-test.cm'
    )
      .toString()
      .replaceAll('automation_name', 'logs_only_diff');

    const parser = new RuleParser(rulesFile, context, true);
    const parsedRes = await parser.parseStreams();
    expect(parsedRes).toEqual(expectedResult('logs_only_diff'));
  });

  it('Should NOT pass for images_only automation', async () => {
    const rulesFile = readFileSync(
      'src/rules-parser/tests/resources/gitstream-for-test.cm'
    )
      .toString()
      .replaceAll('automation_name', 'images_only');

    const parser = new RuleParser(rulesFile, context, true);
    const parsedRes = await parser.parseStreams();
    expect(parsedRes).not.toBe(expectedResult('images_only'));
  });
});

describe('Check empty context againts parser', () => {
  it('Should pass for new_handler automation and empty context files', async () => {
    const rulesFile = readFileSync(
      'src/rules-parser/tests/resources/gitstream-for-test.cm'
    )
      .toString()
      .replaceAll('automation_name', 'new_handler');

    const parser = new RuleParser(rulesFile, emptyContext, true);
    const parsedRes = await parser.parseStreams();
    expect(parsedRes).toEqual(expectedResultForEmptyContext('new_handler'));
  });

  it('Should pass for logs_only_diff automation and empty context files', async () => {
    const rulesFile = readFileSync(
      'src/rules-parser/tests/resources/gitstream-for-test.cm'
    )
      .toString()
      .replaceAll('automation_name', 'logs_only_diff');

    const parser = new RuleParser(rulesFile, emptyContext, true);
    const parsedRes = await parser.parseStreams();
    expect(parsedRes).toEqual(expectedResultForEmptyContext('logs_only_diff'));
  });
});
