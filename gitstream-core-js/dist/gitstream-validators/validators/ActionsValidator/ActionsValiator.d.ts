import ValidatorBase from '../Base';
export declare class ActionsValidator extends ValidatorBase {
    validateActionSupported(action: string): void;
    validateArgSupported(action: string, args: string[]): void;
    validateRequiredArgs(action: string, args: string[]): void;
    validate(args: any): void;
}
