// @ts-nocheck
import { debug } from '../../common/logger';
import { commitsDateByAuthor } from './contributersStat';

export const findGitAuthorsWithFallback = (context, gitToProviderUser) => {
  const fullGitName = context.branch.author;
  let authorResult = { author: fullGitName, prevResults: [] };
  try {
    if (!Object.keys(context.repo.contributors).includes(fullGitName)) {
      const gitNames = Object.keys(gitToProviderUser).filter(
        (gitUser) => gitToProviderUser[gitUser] === context.pr.author
      );
      gitNames.forEach((contributor) => {
        const authorDates = commitsDateByAuthor(
          contributor,
          context.branch.base
        );
        if (authorDates.length === 1) {
          authorResult = { author: contributor, prevResults: authorDates };
        }
        if (
          gitNames.length > 1 &&
          authorResult.prevResults.length <= authorDates.length
        ) {
          authorResult = { author: contributor, prevResults: authorDates };
        }
      });
    }
    return authorResult;
  } catch (error) {
    debug(`Failed getting the right author. Error: ${error}`);
    return {};
  }
};
