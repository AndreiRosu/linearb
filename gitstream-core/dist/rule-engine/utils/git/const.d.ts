export declare const ACTIVITY_SINCE = "52 weeks ago";
export declare const gitCommands: {
    GIT_BLAME: ({ branch, file }: {
        branch: any;
        file: any;
    }) => string;
    GIT_LOG: ({ file }: {
        file: any;
    }) => string;
    GIT_BLAME_AUTHORS_FORMAT: () => string;
    GIT_BLAME_STRING: () => string;
    COMMITER_PER_FILE: ({ file }: {
        file: any;
    }) => string;
    COMMITS_DATE_BY_AUTHOR: ({ branch, author }: {
        branch: any;
        author: any;
    }) => string;
    GIT_ACTIVITY: ({ branch, file, since }: {
        branch: any;
        file: any;
        since: any;
    }) => string;
    AUTHORS_COUNT: () => string;
    REPO_FILES_COUNT: () => string;
    FIRST_COMMIT: ({ branch }: {
        branch: any;
    }) => string;
};
export declare const GIT_ERRORS: {
    GETTING_ALL_AUTHORS: string;
    GETTING_AUTHOR_LINES: string;
    GETTING_GIT_BLAME: string;
};
export declare const GIT_INFO: {
    RAW_GIT_COMMANDS: string;
    NO_DATA_FROM_GIT: string;
};
export declare const REPO_FOLDER: {
    DEFAULT: string;
    CM: string;
};
export declare const GIT_ERROR_TYPE: {
    BAD_REVISION: string;
};
export declare const MAIN_RULES_FILE = "gitstream.cm";
