export declare enum HighLevelFilters {
    allDocs = "allDocs",
    allImages = "allImages",
    allTests = "allTests",
    estimatedReviewTime = "estimatedReviewTime",
    extensions = "extensions",
    isFormattingChange = "isFormattingChange",
    matchDiffLines = "matchDiffLines",
    isFirstCommit = "isFirstCommit",
    rankByGitBlame = "rankByGitBlame",
    rankByGitActivity = "rankByGitActivity",
    explainRankByGitBlame = "explainRankByGitBlame",
    expertReviewer = "expertReviewer",
    explainExpertReviewer = "explainExpertReviewer",
    codeExperts = "codeExperts",
    explainCodeExperts = "explainCodeExperts",
    sonarParser = "sonarParser",
    mapToEnum = "mapToEnum",
    extractSonarFindings = "extractSonarFindings",
    extractJitFindings = "extractJitFindings"
}
export declare const FILTERS_EXTENSION_LIST: {
    allDocs: string[];
    allImages: string[];
    allTests: string[];
};
export declare const HIGH_LEVEL_FILTERS_HANDLER: any;
export declare const ASYNC: any;
