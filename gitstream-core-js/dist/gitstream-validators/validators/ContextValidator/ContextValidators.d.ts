import ValidatorBase from '../Base';
export declare class ContextVariableValidator extends ValidatorBase {
    isValidCustomVariables(customVariable: string, yamlFile: string): boolean;
    isValidContextVariable(contextVariable: string): boolean;
    validate(args: any): void;
}
