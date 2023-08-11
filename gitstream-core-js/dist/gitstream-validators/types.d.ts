export interface Action {
    action: string;
    args?: Record<string, string>;
}
export interface Automation {
    if: unknown[];
    run: Action[];
}
export interface Manifest {
    version: number;
}
export interface CmSchema {
    manifest: Manifest;
    automations: Record<string, Automation>;
}
export interface ValidationError {
    type: string;
    error: string;
}
export interface Expression {
    expression: string;
    lineNumber: number;
}
