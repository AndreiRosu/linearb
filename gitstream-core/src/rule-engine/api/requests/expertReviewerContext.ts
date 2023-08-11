// @ts-nocheck
export class ExpertReviewerContext {
  constructor({ owner, repo, pullRequestNumber, branch, triggeredBy }) {
    this.org = owner;
    this.repo = repo;
    this.pullRequestNumber = pullRequestNumber;
    this.branch = branch;
    this.triggeredBy = triggeredBy;
  }
  get() {
    return {
      org: this.org,
      repo: this.repo,
      pullRequestNumber: this.pullRequestNumber,
      branch: this.branch,
      triggeredBy: this.triggeredBy,
    };
  }
}
