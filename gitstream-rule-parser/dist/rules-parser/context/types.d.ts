export interface IComment {
    commenter: string;
    content: string;
    created_at: string;
    updated_at: string;
}
export interface IConversation {
    commenter: string;
    content: string;
    created_at: string;
    updated_at: string;
    start_line: number;
    end_line: number;
    is_resolved: boolean;
}
export interface IReview {
    commenter: string;
    content: string;
    created_at: string;
    state: string;
    conversations: IConversation[];
}
export interface IPRContext {
    approvals: string[];
    author: string;
    author_teams: string[];
    checks?: any[];
    comments: IComment[];
    conversations: IConversation[];
    created_at: string;
    draft: boolean;
    description: string;
    labels: string[];
    provider: string;
    reviewers: string[];
    status: string;
    target: string;
    title: string;
    requested_changes: string;
    reviews: IReview[];
}
export interface Context {
    branch: {
        name: string;
        main?: string;
        base?: string;
        diff: {
            size: number;
            files_metadata: FileMetadata[];
        };
        num_of_commits: number;
    };
    source: {
        diff: {
            files: File[];
        };
    };
    files: string[];
    repo?: Repo;
    pr?: Partial<IPRContext>;
}
export interface File {
    original_file: string;
    new_file: string;
    diff: string;
    original_content: string;
    new_content: string;
}
export interface FileMetadata {
    original_file: string;
    new_file: string;
    additions: number;
    deletions: number;
}
export interface Repo {
    activity?: any;
    age?: number;
    author_age?: number;
    blame?: any;
    contributors: any;
}
