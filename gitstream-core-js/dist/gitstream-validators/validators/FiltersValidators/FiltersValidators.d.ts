import ValidatorBase from '../Base';
export declare class FiltersValidator extends ValidatorBase {
    validateExistingFilter(filterName: string, lineNumber: number, expression: string): void;
    getFilterArgs(filter: string): string[];
    validateFilterArgs(filter: string, filterName: string, lineNumber: number, expression: string): void;
    validate(args: any): void;
}
