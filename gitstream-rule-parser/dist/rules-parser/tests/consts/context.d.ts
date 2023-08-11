export declare const context: {
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
};
export declare const emptyContext: {
    branch: {
        name: string;
        base: string;
        diff: {
            size: number;
            files_metadata: never[];
        };
        num_of_commits: number;
    };
    source: {
        diff: {
            files: never[];
        };
    };
    repo: {
        contributors: {
            'Yeela Lifshitz': string;
            'Luke Kilpatrick': string;
            yeelali14: string;
            Yeela: string;
            'Elad Kohavi': string;
            EladKohavi: string;
            'shaked zohar': string;
        };
    };
    files: never[];
};
