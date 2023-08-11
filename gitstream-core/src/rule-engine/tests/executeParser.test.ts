import { readFileSync } from 'fs';
import { contextForTester } from './resources/context';
import { RulesEngine } from '..';
import axios from 'axios';
import { API_ENDPOINTS } from '../../consts';
import { codeExpertResult } from './resources/codeExpertResult';

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

describe('Execute parser', () => {
  it('Should return pasrer result', async () => {
    const ruleFileContent = readFileSync(
      'src/rules-parser/tests/resources/gitstream.cm'
    ).toString();

    const parsedRes = await RulesEngine().executeParser({
      context: contextForTester,
      ruleFileContent,
      payload: {
        repo: 'gitstream-test-repo',
        owner: 'linear-b',
        pullRequestNumber: 133,
        source: 'github',
      },
    });
    console.log('parsedRes', JSON.stringify(parsedRes, null, 2));
    expect(parsedRes).toBeDefined();
  });
});
