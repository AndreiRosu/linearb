export declare const sonarCloudForNull: {
    commenter: string;
    content: string;
    created_at: string;
    id: number;
};
export declare const sonarContent: {
    commenter: string;
    content: string;
    created_at: string;
    id: number;
};
export declare const contextForSonar: {
    branch: {
        name: string;
        base: string;
        author: string;
        diff: {
            size: number;
            files_metadata: never[];
            num_of_commits: number;
        };
        num_of_commits: number;
    };
    source: {
        diff: {
            files: {
                original_file: string;
                new_file: string;
                diff: string;
                new_content: string;
                original_content: string;
            }[];
        };
    };
    files: string[];
    pr: {
        isFullyInstalled: boolean;
        title: string;
        approvals: never[];
        requested_changes: never[];
        author: string;
        description: string;
        checks: {
            name: string;
            status: string;
            summary: null;
            title: null;
            text: null;
        }[];
        created_at: string;
        draft: boolean;
        mergeable: boolean;
        labels: string[];
        reviewers: string[];
        status: string;
        updated_at: string;
        assignees: never[];
        contributors: ({
            login: string;
            name: string;
        } | {
            login: string;
            name: null;
        })[];
        paths: {
            name: string;
        }[];
        author_teams: string[];
        comments: never[];
        conversations: never[];
        isPrivate: boolean;
        target: string;
    };
};
