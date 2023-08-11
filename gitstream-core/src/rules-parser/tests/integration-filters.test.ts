import {
  HIGH_LEVEL_FILTERS_HANDLER,
  HighLevelFilters,
} from '../filters/high-level-filters';
import {
  contextForSonar,
  sonarCloudForNull,
  sonarContent,
} from './consts/contextForSonar';

describe('sonarParser', () => {
  it('Should have the expected sonar object', async () => {
    const prContext = {
      ...contextForSonar.pr,
      comments: [sonarContent],
    };
    const result =
      HIGH_LEVEL_FILTERS_HANDLER[HighLevelFilters.extractSonarFindings](
        prContext
      );
    expect(result).toEqual(
      '{"bugs":{"count":0,"rating":"A"},"code_smells":{"count":0,"rating":"A"},"vulnerabilities":{"count":0,"rating":"A"},"security_hotspots":{"count":0,"rating":"A"},"duplications":46.7,"coverage":null}'
    );
  });

  it('Should result empty sonar object', async () => {
    const prContext = {
      ...contextForSonar.pr,
      comments: [sonarCloudForNull],
    };
    const result =
      HIGH_LEVEL_FILTERS_HANDLER[HighLevelFilters.sonarParser](prContext);
    console.log('null: ', result);
    expect(result).toEqual(
      '{"bugs":{"count":null,"rating":""},"code_smells":{"count":null,"rating":""},"vulnerabilities":{"count":null,"rating":""},"security_hotspots":{"count":null,"rating":""},"duplications":null,"coverage":null}'
    );
  });
});
