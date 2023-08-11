export interface IDDBParams {
    ExpressionAttributeValues: object;
    ExpressionAttributeNames: object;
    KeyConditionExpression: string;
    ProjectionExpression: string;
    FilterExpression: string;
    TableName: string;
}
export declare class DDBQueryHelper {
    params: IDDBParams;
    fdCounter: number;
    dtCounter: number;
    vlCounter: number;
    baseParams: IDDBParams;
    client: any;
    logger: any;
    constructor(client: any, baseParams: any);
    _queryAllAsync: (params: any, client: any) => Promise<any[]>;
    _countAllAsync: (params: any, client: any) => Promise<unknown>;
    addFilterExpression(expression: any): void;
    resetFilter(): this;
    extractField(field_name: any): string;
    addNumberRangeClause(field_name: any, value: any): DDBQueryHelper;
    addDateRangeClause(field_name: any, value: any, customExpression?: any): DDBQueryHelper;
    addINClause(field_name: any, values: any): DDBQueryHelper;
    addINClauseSet(field_name: any, values: any): DDBQueryHelper;
    clearEmptyValues(): void;
    query(): Promise<any[]>;
    count(): Promise<unknown>;
}
