declare const _default: {
    prContext: {
        isFullyInstalled: boolean;
        title: string;
        approvals: string[];
        requested_changes: never[];
        author: string;
        description: string;
        checks: never[];
        created_at: string;
        draft: boolean;
        mergeable: boolean;
        labels: string[];
        reviewers: string[];
        status: string;
        updated_at: string;
        assignees: never[];
        contributors: never[];
        paths: never[];
        author_teams: never[];
        comments: never[];
        reviews: {
            commenter: string;
            content: string;
            state: string;
            conversations: {
                commenter: string;
                content: string;
                created_at: string;
                state: string;
                id: number;
            }[];
        }[];
        conversations: {
            commenter: string;
            content: string;
            start_line: null;
            end_line: number;
            is_resolved: boolean;
        }[];
        isPrivate: boolean;
        target: string;
    };
};
export default _default;
