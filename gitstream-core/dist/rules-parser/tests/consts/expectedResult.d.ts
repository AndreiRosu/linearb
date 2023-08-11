export declare const expectedResult: (automationName: string) => {
    errors: {};
    automations: {
        [x: string]: {
            if: {
                passed: boolean;
            }[];
            run: {
                action: string;
                args: {
                    labels: string[];
                };
                engine: string;
            }[];
            passed: boolean;
        };
    };
    analytics: {
        allImages: {
            args: never[];
        };
        allDocs: {
            args: never[];
        };
        allTests: {
            args: never[];
        };
        estimatedReviewTime: {
            args: never[];
        };
        isFormattingChange: {
            args: never[];
        };
        filter: {
            args: {
                regex: string;
                __keywords: boolean;
            }[];
        };
        matchDiffLines: {
            args: {
                regex: string;
                ignoreWhiteSpaces: boolean;
                __keywords: boolean;
            }[];
        };
        every: {
            args: never[];
        };
        match: {
            args: never[];
        };
        some: {
            args: never[];
        };
        map: {
            args: {
                attr: string;
            }[];
        };
    };
};
export declare const expectedResultForEmptyContext: (automationName: string) => {
    errors: {};
    automations: {
        [x: string]: {
            if: {
                passed: boolean;
            }[];
            run: {
                action: string;
                args: {
                    labels: string[];
                };
                engine: string;
            }[];
            passed: boolean;
        };
    };
    analytics: {
        allImages: {
            args: never[];
        };
        allDocs: {
            args: never[];
        };
        allTests: {
            args: never[];
        };
        estimatedReviewTime: {
            args: never[];
        };
        isFormattingChange: {
            args: never[];
        };
        filter: {
            args: {
                regex: string;
                __keywords: boolean;
            }[];
        };
        matchDiffLines: {
            args: {
                regex: string;
                ignoreWhiteSpaces: boolean;
                __keywords: boolean;
            }[];
        };
        every: {
            args: never[];
        };
        match: {
            args: never[];
        };
        some: {
            args: never[];
        };
        map: {
            args: {
                attr: string;
            }[];
        };
    };
};
export declare const codeExpertResult: {
    data: {
        Fadikhayo1995: {
            avg_activity_score: number;
            avg_blame_perc: number;
            perc_of_files_familiar_with: number;
            perc_of_files_most_active_in: number;
            perc_of_files_owned: number;
            reviewer_score: number;
        };
        yeelali14: {
            avg_activity_score: number;
            avg_blame_perc: number;
            perc_of_files_familiar_with: number;
            perc_of_files_most_active_in: number;
            perc_of_files_owned: number;
            reviewer_score: number;
        };
        orielz: {
            avg_activity_score: number;
            avg_blame_perc: number;
            perc_of_files_familiar_with: number;
            perc_of_files_most_active_in: number;
            perc_of_files_owned: number;
            reviewer_score: number;
        };
        omarcovitch: {
            avg_activity_score: number;
            avg_blame_perc: number;
            perc_of_files_familiar_with: number;
            perc_of_files_most_active_in: number;
            perc_of_files_owned: number;
            reviewer_score: number;
        };
        saharavishag: {
            avg_activity_score: number;
            avg_blame_perc: number;
            perc_of_files_familiar_with: number;
            perc_of_files_most_active_in: number;
            perc_of_files_owned: number;
            reviewer_score: number;
        };
        'zuki-linB': {
            avg_activity_score: number;
            avg_blame_perc: number;
            perc_of_files_familiar_with: number;
            perc_of_files_most_active_in: number;
            perc_of_files_owned: number;
            reviewer_score: number;
        };
        'boazlinearb <boaz@astricomsoft.com>': {
            avg_activity_score: number;
            avg_blame_perc: number;
            perc_of_files_familiar_with: number;
            perc_of_files_most_active_in: number;
            perc_of_files_owned: number;
            reviewer_score: number;
        };
        'Boaz Dremer <boazdremer@Boazs-MacBook-Pro.local>': {
            avg_activity_score: number;
            avg_blame_perc: number;
            perc_of_files_familiar_with: number;
            perc_of_files_most_active_in: number;
            perc_of_files_owned: number;
            reviewer_score: number;
        };
        KerenLinearB: {
            avg_activity_score: number;
            avg_blame_perc: number;
            perc_of_files_familiar_with: number;
            perc_of_files_most_active_in: number;
            perc_of_files_owned: number;
            reviewer_score: number;
        };
        yishaibeeri: {
            avg_activity_score: number;
            avg_blame_perc: number;
            perc_of_files_familiar_with: number;
            perc_of_files_most_active_in: number;
            perc_of_files_owned: number;
            reviewer_score: number;
        };
        'vim-zz': {
            avg_activity_score: number;
            avg_blame_perc: number;
            perc_of_files_familiar_with: number;
            perc_of_files_most_active_in: number;
            perc_of_files_owned: number;
            reviewer_score: number;
        };
        explain: {
            activity: {
                'src/App.js': {
                    '2023-01': {
                        'vim-zz': {
                            additions: number;
                            deletions: number;
                        };
                    };
                    '2023-02': {
                        'vim-zz': {
                            additions: number;
                            deletions: number;
                        };
                        yeelali14: {
                            additions: number;
                            deletions: number;
                        };
                    };
                };
            };
            blame: {
                'src/App.js': {
                    omarcovitch: number;
                    orielz: number;
                    'Boaz Dremer <boazdremer@Boazs-MacBook-Pro.local>': number;
                    'boazlinearb <boaz@astricomsoft.com>': number;
                    KerenLinearB: number;
                    saharavishag: number;
                    yishaibeeri: number;
                    'zuki-linB': number;
                    yeelali14: number;
                };
            };
        };
    };
};
