import { Sonar } from './types';
import {
  SONAR_REGEX,
  getSonarPropertyCount,
  getSonarPropertyRating,
} from './helpers';
import { handleAnalytics } from '../../common';
import { HighLevelFilters } from '../../high-level-filters';

export const parseSonarParser = (pr: any): string => {
  handleAnalytics(HighLevelFilters.sonarParser, []);
  let sonarObject: Sonar = {
    bugs: { count: null, rating: '' },
    code_smells: { count: null, rating: '' },
    vulnerabilities: { count: null, rating: '' },
    security_hotspots: { count: null, rating: '' },
    duplications: null,
    coverage: null,
  };
  const sonarComment = pr.comments.filter(
    (comment: any) => comment.commenter === 'sonarcloud'
  );
  if (sonarComment.length) {
    const sonarCommentArray = sonarComment[0].content.split('\n');
    sonarObject.bugs = {
      count: getSonarPropertyCount(sonarCommentArray[2], SONAR_REGEX.BUGS),
      rating: getSonarPropertyRating(sonarCommentArray[2]),
    };
    sonarObject.code_smells = {
      count: getSonarPropertyCount(
        sonarCommentArray[5],
        SONAR_REGEX.CODE_SMELL
      ),
      rating: getSonarPropertyRating(sonarCommentArray[5]),
    };

    sonarObject.vulnerabilities = {
      count: getSonarPropertyCount(
        sonarCommentArray[3],
        SONAR_REGEX.VULNERABILITIES
      ),
      rating: getSonarPropertyRating(sonarCommentArray[3]),
    };

    sonarObject.security_hotspots = {
      count: getSonarPropertyCount(
        sonarCommentArray[4],
        SONAR_REGEX.SECURITY_HOTSPOTS
      ),
      rating: getSonarPropertyRating(sonarCommentArray[4]),
    };
    sonarObject.duplications = getSonarPropertyCount(
      sonarCommentArray[8],
      SONAR_REGEX.DUPLICATIONS,
      true
    );
    sonarObject.coverage = getSonarPropertyCount(
      sonarCommentArray[7],
      SONAR_REGEX.COVERAGE,
      true
    );
  }

  return JSON.stringify(sonarObject);
};
