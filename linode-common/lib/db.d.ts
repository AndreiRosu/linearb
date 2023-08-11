export declare const getConnection: () => any;
export declare function testDBConnection(): Promise<unknown>;
export declare function testDBConnectionTO(timeout?: number): Promise<any>;
export declare const embedConnection: (pg: any) => void;
