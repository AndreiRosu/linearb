import ValidatorBase from '../Base';
export declare class CMValidator extends ValidatorBase {
    steps: ValidatorBase[];
    constructor();
    validate(cmFile: string): void;
}
