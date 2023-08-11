export declare enum DefaultParserAttributes {
    cbLeft = "_GITSTREAM_CB_LEFT_",
    cbRight = "_GITSTREAM_CB_RIGHT_",
    automations = "automations",
    errors = "errors",
    analytics = "analytics",
    validatorErrors = "validatorErrors"
}
export declare type Run = {
    action: string;
    args?: any;
};
export interface RulesParserError {
    [statusCode: number]: string;
}
