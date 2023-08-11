import { AxiosInstance, AxiosResponse } from 'axios';
export interface ILinprClientConfig {
    linprServiceUrl: string;
    organization_id: number;
    isInternal: boolean;
    logger: any;
    linb_self_service_id?: string;
}
export declare class LinPRClient {
    instance: AxiosInstance;
    constructor(clientConfig: ILinprClientConfig);
    getSnapshots(payload: any): Promise<AxiosResponse>;
    getBranch(branch_id: any): Promise<AxiosResponse>;
    getPullRequest(id: any): Promise<AxiosResponse>;
    searchPRs(payload: any): Promise<AxiosResponse>;
    getMeasurements(payload: any): Promise<any>;
    createMeasurements(payload: any): Promise<any>;
}
