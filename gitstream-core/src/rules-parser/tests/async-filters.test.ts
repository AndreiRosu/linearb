import { API_ENDPOINTS } from '../../consts';
import {
  parseCodeExperts,
  parseExplainCodeExpertHandler,
} from '../filters/async-filters';
import { rankByLinesArgs } from '../filters/filter-types';
import { repo } from './consts/contextForHLFilters';
import axios from 'axios';

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
        yeelali14: {
          avg_activity_score: 0.8076269404652171,
          avg_blame_perc: 0.009433962264150943,
          perc_of_files_familiar_with: 0,
          perc_of_files_most_active_in: 1,
          perc_of_files_owned: 0,
          reviewer_score: 0.408530451364684,
        },
        orielz: {
          avg_activity_score: 0,
          avg_blame_perc: 0.5943396226415094,
          perc_of_files_familiar_with: 1,
          perc_of_files_most_active_in: 0,
          perc_of_files_owned: 1,
          reviewer_score: 0.2971698113207547,
        },
        omarcovitch: {
          avg_activity_score: 0.1652750441963802,
          avg_blame_perc: 0.14150943396226415,
          perc_of_files_familiar_with: 0,
          perc_of_files_most_active_in: 0,
          perc_of_files_owned: 0,
          reviewer_score: 0.15339223907932217,
        },
        saharavishag: {
          avg_activity_score: 0.02709801533840258,
          avg_blame_perc: 0.07547169811320754,
          perc_of_files_familiar_with: 0,
          perc_of_files_most_active_in: 0,
          perc_of_files_owned: 0,
          reviewer_score: 0.05128485672580506,
        },
        'zuki-linB': {
          avg_activity_score: 0,
          avg_blame_perc: 0.0660377358490566,
          perc_of_files_familiar_with: 0,
          perc_of_files_most_active_in: 0,
          perc_of_files_owned: 0,
          reviewer_score: 0.0330188679245283,
        },
        'boazlinearb <boaz@astricomsoft.com>': {
          avg_activity_score: 0,
          avg_blame_perc: 0.03773584905660377,
          perc_of_files_familiar_with: 0,
          perc_of_files_most_active_in: 0,
          perc_of_files_owned: 0,
          reviewer_score: 0.018867924528301886,
        },
        'Boaz Dremer <boazdremer@Boazs-MacBook-Pro.local>': {
          avg_activity_score: 0,
          avg_blame_perc: 0.02830188679245283,
          perc_of_files_familiar_with: 0,
          perc_of_files_most_active_in: 0,
          perc_of_files_owned: 0,
          reviewer_score: 0.014150943396226415,
        },
        KerenLinearB: {
          avg_activity_score: 0,
          avg_blame_perc: 0.02830188679245283,
          perc_of_files_familiar_with: 0,
          perc_of_files_most_active_in: 0,
          perc_of_files_owned: 0,
          reviewer_score: 0.014150943396226415,
        },
        yishaibeeri: {
          avg_activity_score: 0,
          avg_blame_perc: 0.018867924528301886,
          perc_of_files_familiar_with: 0,
          perc_of_files_most_active_in: 0,
          perc_of_files_owned: 0,
          reviewer_score: 0.009433962264150943,
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

describe('expertReviewer', () => {
  it('Should pass', async () => {
    const args: rankByLinesArgs = { lt: 100, gt: 0 };
    const mockCallback = jest.fn();
    await parseCodeExperts(repo, args, mockCallback);

    expect(mockCallback).toHaveBeenCalled();
  });
});

describe('explainExpertReviewer', () => {
  it('Should pass', async () => {
    const mockCallback = jest.fn();
    await parseExplainCodeExpertHandler(
      repo,
      {
        lt: 100,
        gt: 0,
      },
      mockCallback
    );
    expect(mockCallback).toHaveBeenCalled();
  });
});
