declare class ValidatorBase {
    validate(_args: any): void;
    static parseJinjaExpressions(cmFile: string): any;
}
export default ValidatorBase;
