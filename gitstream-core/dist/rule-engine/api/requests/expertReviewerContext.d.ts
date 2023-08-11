export declare class ExpertReviewerContext {
    constructor({ owner, repo, pullRequestNumber, branch, triggeredBy }: {
        owner: any;
        repo: any;
        pullRequestNumber: any;
        branch: any;
        triggeredBy: any;
    });
    get(): {
        org: any;
        repo: any;
        pullRequestNumber: any;
        branch: any;
        triggeredBy: any;
    };
}
