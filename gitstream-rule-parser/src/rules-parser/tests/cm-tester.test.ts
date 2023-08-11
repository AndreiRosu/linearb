import { readFileSync } from 'fs';
import { RuleParser } from '..';
import { contextForCMTester } from './consts/contextForCMTester';
import axios from 'axios';
import { API_ENDPOINTS } from '../../consts';

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
    return Promise.resolve({
      data: {
        Fadikhayo1995: {
          avg_activity_score: 0.5,
          avg_blame_perc: 0.5,
          perc_of_files_familiar_with: 0.5,
          perc_of_files_most_active_in: 0.5,
          perc_of_files_owned: 0.5,
          reviewer_score: 0.5,
        },
        yeelali14: {
          avg_activity_score: 0.3981619898,
          avg_blame_perc: 0.0047169811,
          perc_of_files_familiar_with: 0,
          perc_of_files_most_active_in: 0.5,
          perc_of_files_owned: 0,
          reviewer_score: 0.2014394855,
        },
        orielz: {
          avg_activity_score: 0,
          avg_blame_perc: 0.2971698113,
          perc_of_files_familiar_with: 0.5,
          perc_of_files_most_active_in: 0,
          perc_of_files_owned: 0.5,
          reviewer_score: 0.1485849057,
        },
        omarcovitch: {
          avg_activity_score: 0.085447558,
          avg_blame_perc: 0.070754717,
          perc_of_files_familiar_with: 0,
          perc_of_files_most_active_in: 0,
          perc_of_files_owned: 0,
          reviewer_score: 0.0781011375,
        },
        saharavishag: {
          avg_activity_score: 0.0163904522,
          avg_blame_perc: 0.0377358491,
          perc_of_files_familiar_with: 0,
          perc_of_files_most_active_in: 0,
          perc_of_files_owned: 0,
          reviewer_score: 0.0270631506,
        },
        'zuki-linB': {
          avg_activity_score: 0,
          avg_blame_perc: 0.0330188679,
          perc_of_files_familiar_with: 0,
          perc_of_files_most_active_in: 0,
          perc_of_files_owned: 0,
          reviewer_score: 0.016509434,
        },
        'boazlinearb <boaz@astricomsoft.com>': {
          avg_activity_score: 0,
          avg_blame_perc: 0.0188679245,
          perc_of_files_familiar_with: 0,
          perc_of_files_most_active_in: 0,
          perc_of_files_owned: 0,
          reviewer_score: 0.0094339623,
        },
        'Boaz Dremer <boazdremer@Boazs-MacBook-Pro.local>': {
          avg_activity_score: 0,
          avg_blame_perc: 0.0141509434,
          perc_of_files_familiar_with: 0,
          perc_of_files_most_active_in: 0,
          perc_of_files_owned: 0,
          reviewer_score: 0.0070754717,
        },
        KerenLinearB: {
          avg_activity_score: 0,
          avg_blame_perc: 0.0141509434,
          perc_of_files_familiar_with: 0,
          perc_of_files_most_active_in: 0,
          perc_of_files_owned: 0,
          reviewer_score: 0.0070754717,
        },
        yishaibeeri: {
          avg_activity_score: 0,
          avg_blame_perc: 0.0094339623,
          perc_of_files_familiar_with: 0,
          perc_of_files_most_active_in: 0,
          perc_of_files_owned: 0,
          reviewer_score: 0.0047169811,
        },
        'vim-zz': {
          avg_activity_score: 0,
          avg_blame_perc: 0,
          perc_of_files_familiar_with: 0,
          perc_of_files_most_active_in: 0,
          perc_of_files_owned: 0,
          reviewer_score: 0,
        },
        explain: {
          activity: {
            'src/App.js': {
              '2023-01': {
                'vim-zz': {
                  additions: 0,
                  deletions: 0,
                },
              },
              '2023-02': {
                'vim-zz': {
                  additions: 0,
                  deletions: 0,
                },
                yeelali14: {
                  additions: 5,
                  deletions: 5,
                },
              },
            },
          },
          blame: {
            'src/App.js': {
              omarcovitch: 0.14150943396226415,
              orielz: 0.5943396226415094,
              'Boaz Dremer <boazdremer@Boazs-MacBook-Pro.local>': 0.02830188679245283,
              'boazlinearb <boaz@astricomsoft.com>': 0.03773584905660377,
              KerenLinearB: 0.02830188679245283,
              saharavishag: 0.07547169811320754,
              yishaibeeri: 0.018867924528301886,
              'zuki-linB': 0.0660377358490566,
              yeelali14: 0.009433962264150943,
            },
          },
        },
      },
    });
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
