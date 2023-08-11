import { ADDITIONAL_FORMATTING } from '../../utils/providers';
import { parseExpertReviewerThreshold } from '../filters/async-filter-helper';
import { explainExpertReviewerComment } from '../filters/explain-expert-filter-helper';
import { gitlabRepo, repo } from './consts/contextForHLFilters';

describe('explainExpertReviewerComment for Gitlab', () => {
  it('Should have additional break line', async () => {
    const expertReviewers = ['yeelali14', 'orielz'];
    const activeUsers = ['yeelali14'];
    const knowledgeUsers = ['orielz', 'omarcovitch'];
    const isNoUserButYou = false;
    const args = { gt: 10, lt: 0 };
    const expertReviewerComment = await explainExpertReviewerComment(
      expertReviewers,
      activeUsers,
      knowledgeUsers,
      parseExpertReviewerThreshold(args),
      gitlabRepo.provider,
      isNoUserButYou
    );
    expect(expertReviewerComment).toContain(
      ADDITIONAL_FORMATTING[gitlabRepo.provider]
    );
    expect(expertReviewerComment).toContain('has');
  });
});

describe('explainExpertReviewerComment for Github', () => {
  it('Should not have additional break line', async () => {
    const expertReviewers = ['yeelali14', 'orielz'];
    const activeUsers = ['yeelali14', 'omarcovitch'];
    const knowledgeUsers = ['orielz', 'omarcovitch'];
    const isNoUserButYou = false;
    const args = { gt: 10, lt: 0 };
    const expertReviewerComment = await explainExpertReviewerComment(
      expertReviewers,
      activeUsers,
      knowledgeUsers,
      parseExpertReviewerThreshold(args),
      repo.provider,
      isNoUserButYou
    );
    expect(expertReviewerComment).not.toContain(
      ADDITIONAL_FORMATTING[gitlabRepo.provider]
    );
  });
});

describe('explainExpertReviewerComment - with wrong provider', () => {
  it('Should not contain additional break line', async () => {
    const expertReviewers = ['yeelali14', 'orielz'];
    const activeUsers = ['yeelali14', 'omarcovitch'];
    const knowledgeUsers = ['orielz', 'omarcovitch'];
    const args = { gt: 10, lt: 0 };
    const isNoUserButYou = false;
    const expertReviewerComment = await explainExpertReviewerComment(
      expertReviewers,
      activeUsers,
      knowledgeUsers,
      parseExpertReviewerThreshold(args),
      repo.provider,
      isNoUserButYou
    );
    expect(expertReviewerComment).not.toContain(
      ADDITIONAL_FORMATTING[gitlabRepo.provider]
    );
  });
});

describe('explainExpertReviewerComment for Github with no user match', () => {
  it('Should not have additional break line', async () => {
    const activeUsers = ['yeelali14', 'omarcovitch'];
    const knowledgeUsers = ['orielz', 'omarcovitch'];
    const isNoUserButYou = true;
    const args = { gt: 10, lt: 0 };
    const expertReviewerComment = await explainExpertReviewerComment(
      [],
      activeUsers,
      knowledgeUsers,
      parseExpertReviewerThreshold(args),
      repo.provider,
      isNoUserButYou
    );
    expect(expertReviewerComment).toContain('no user but you matched');
  });
});
