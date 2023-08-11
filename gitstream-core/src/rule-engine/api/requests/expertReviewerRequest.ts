// @ts-nocheck

export class ExpertReviewerRequest {
  constructor(gitToProvider, prFiles, context) {
    this.merge_dict = gitToProvider;
    this.pr_files = prFiles;
    this.context = context;
  }
  get() {
    return {
      merge_dict: this.merge_dict,
      pr_files: this.pr_files,
      context: this.context,
    };
  }
}
