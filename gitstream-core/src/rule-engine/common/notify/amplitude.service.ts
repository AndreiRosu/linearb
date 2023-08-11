// @ts-nocheck
import * as Amplitude from '@amplitude/node';
import { debug } from '../logger';
import { generatePrUrl } from './analytics.handler';

const FILTER_EVENT_TYPE = 'gitstream-filter-function';

class AmplitudeEvent {
  constructor(
    { owner, repo, pullRequestNumber, hasCmRepo },
    filterName,
    args,
    context
  ) {
    this.filterName = filterName;
    this.user_id = `${context.repo?.provider}/${owner}/${repo}/${pullRequestNumber}`;
    this.args = args;
    this.repo = `${context.repo?.provider}/${owner}/${repo}`;
    this.author = `${context.repo?.provider}/${context.repo?.pr_author}`;
    this.org = `${context.repo?.provider}/${owner}`;
    this.pr_url = generatePrUrl(context, {
      owner,
      repo,
      pullRequestNumber,
    });
    this.level = hasCmRepo ? 'Org' : 'Repo';
  }
  get() {
    return {
      event_type: FILTER_EVENT_TYPE,
      user_id: this.user_id,
      event_properties: {
        filter_name: this.filterName,
        args: this.args,
        repo: this.repo,
        author: this.author,
        org: this.org,
        pr_url: this.pr_url,
        level: this.level,
      },
    };
  }
}

let client;
const initAmplitude = ({ analyticsHttpApiUrl, analyticsKey }) => {
  client = Amplitude.init(analyticsKey, {
    serverUrl: analyticsHttpApiUrl,
  });
};

export const sendAmplitudeEvent = async (payload, event, args, context) => {
  if (!client) {
    initAmplitude(payload);
  }
  try {
    const ampEvent = new AmplitudeEvent(payload, event, args, context).get();
    await client.logEvent(ampEvent);
  } catch (e) {
    debug(
      `Sending event to amplitude failed with the following error ${JSON.stringify(
        e
      )}`
    );
  }
};
