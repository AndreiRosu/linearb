export declare const SONAR_REGEX: {
    BUGS: RegExp;
    VULNERABILITIES: RegExp;
    SECURITY_HOTSPOTS: RegExp;
    CODE_SMELL: RegExp;
    DUPLICATIONS: RegExp;
    COVERAGE: RegExp;
    RATING: RegExp;
};
export declare const getSonarPropertyRating: (str: string) => string;
export declare const getSonarPropertyCount: (row: string, regex: any, isFloat?: boolean) => number | null;
