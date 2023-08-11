export declare const argsDefinitionsByAction: {
    'add-comment@v1': {
        comment: {
            name: string;
            type: string;
        };
    };
    'add-label@v1': {
        label: {
            name: string;
            type: string;
        };
    };
    'add-labels@v1': {
        labels: {
            name: string;
            type: string;
        };
    };
    'add-reviewers@v1': {
        reviewers: {
            name: string;
            type: string;
        };
        team_reviewers: {
            name: string;
            type: string;
        };
    };
    'merge@v1': {
        wait_for_all_checks: {
            name: string;
            type: string;
        };
        rebase_on_merge: {
            name: string;
            type: string;
        };
        squash_on_merge: {
            name: string;
            type: string;
        };
    };
    'require-reviewers@v1': {
        reviewers: {
            name: string;
            type: string;
        };
    };
    'set-required-approvals@v1': {
        approvals: {
            name: string;
            type: string;
        };
    };
    'request-changes@v1': {
        comment: {
            name: string;
            type: string;
        };
    };
};
export declare const listify: string[];
