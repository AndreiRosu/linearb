import { readFileSync } from 'fs';
import { RuleParser } from '..';
import { contextForCMTester } from './consts/contextForCMTester';
import axios from 'axios';
import { API_ENDPOINTS } from '../../consts';
import { codeExpertResult } from './consts/expectedResult';
import { actionExpectedResult } from './consts/actionsExpectedResult';
import _ from 'lodash';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.post.mockImplementation((url: string) => {
  if (url === API_ENDPOINTS.REVIEW_TIME) {
    return Promise.resolve({
      data: {
        reviewTime: '2-7 Minutes',
        numericValue: 4,
      },
    });
  }
  if (url === API_ENDPOINTS.EXPERT_REVIWER) {
    return Promise.resolve(codeExpertResult);
  }
  return Promise.resolve({
    data: {
      reviewTime: '2-7 Minutes',
      numericValue: 4,
    },
  });
});

describe('Check explain-code-experts@v1', () => {
  it('Should pass for code expert automation', async () => {
    const rulesFile = readFileSync(
      'src/rules-parser/tests/resources/codeExpert.cm'
    ).toString();
    let context = _.cloneDeep(contextForCMTester);
    context.pr.labels = ['suggest-reviewer'];

    const parser = new RuleParser(rulesFile, context, false);
    const parsedRes = await parser.parseStreams();
    expect(parsedRes).toEqual(actionExpectedResult);
    expect(
      parsedRes.automations['suggest_code_experts'].run[0].args.comment
    ).toContain('base64: ');
  });

  it('Should not pass for code expert automation', async () => {
    const rulesFile = readFileSync(
      'src/rules-parser/tests/resources/codeExpert.cm'
    ).toString();
    const parser = new RuleParser(rulesFile, contextForCMTester, false);
    const parsedResScenario2 = await parser.parseStreams();
    expect(
      parsedResScenario2.automations['suggest_code_experts'].if[0].passed
    ).toBeFalsy();
  });
});
