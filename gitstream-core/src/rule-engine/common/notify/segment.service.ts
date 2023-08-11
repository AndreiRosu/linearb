import { SegmentClient } from '@linearb/linode-common';
import { prepareSendingLogsToDD } from '../logger';
import { generatePrUrl } from './analytics.handler';

const FILTER_EVENT_TYPE = 'action_filter';

class SegmentEvent {
  filter_name: String;
  user_id: String;
  args: String;
  repo: String;
  provider: String;
  author: String;
  org: String;
  pr_url: String;
  is_org_level: String;
  trigger_id: string;

  constructor(
    { owner, repo, pullRequestNumber, hasCmRepo, trigger_id }: any,
    filterName: String,
    args: any,
    context: any
  ) {
    this.filter_name = filterName;
    this.user_id = `${context.repo?.provider}-${context.repo?.pr_author}`;
    this.args = args;
    this.repo = repo;
    this.author = context.repo?.pr_author;
    this.org = owner;
    this.provider = context.repo?.provider;
    this.pr_url = generatePrUrl(context, {
      owner,
      repo,
      pullRequestNumber,
    });
    this.is_org_level = hasCmRepo;
    this.trigger_id = trigger_id;
  }
  get() {
    return {
      userId: this.user_id,
      event: FILTER_EVENT_TYPE,
      properties: {
        filter_name: this.filter_name,
        args: this.args,
        repo: this.repo,
        author: this.author,
        git_org_name: this.org,
        git_provider: this.provider,
        pr_url: this.pr_url,
        is_org_level: this.is_org_level,
        trigger_id: this.trigger_id,
      },
    };
  }
}

export const sendSegmentEvent = async (
  payload: any,
  filterName: String,
  args: any,
  context: any
) => {
  try {
    const segment = new SegmentClient({
      segmentServiceUrl: payload.segmentServiceUrl,
      segment_write_key: payload.segmentWriteKey,
    });
    const segmentEvent = new SegmentEvent(
      payload,
      filterName,
      args,
      context
    ).get();
    await segment.track(segmentEvent);
  } catch (error) {
    console.error(`Unable to call segment`, error);
    if (error instanceof Error) {
      await prepareSendingLogsToDD(
        'warn',
        `Unable to call segment for pr ${payload?.owner}/${payload?.repo}/${payload?.pullRequestNumber}`,
        payload,
        { error: error?.message },
        true
      );
    }
  }
};
