import { readFileSync } from 'fs';
import { RuleParser } from '..';
import { contextForCMTester } from './consts/contextForCMTester';
import axios from 'axios';
import { API_ENDPOINTS } from '../../consts';
import { codeExpertResult } from './consts/expectedResult';

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

describe('Check rule parser against CM file', () => {
  it('Should pass for match_logs automation', async () => {
    const rulesFile = readFileSync(
      'src/rules-parser/tests/resources/gitstream.cm'
    ).toString();

    const parser = new RuleParser(rulesFile, contextForCMTester, false);
    const parsedRes = await parser.parseStreams();
    console.log('parsedRes', JSON.stringify(parsedRes, null, 2));
  });
});
