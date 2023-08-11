import { AxiosInstance, AxiosResponse } from 'axios';
export interface IPMrestClientConfig {
    pmrestServiceUrl: string;
    logger: any;
    linb_self_service_id?: string;
}
export declare class PMrestClient {
    instance: AxiosInstance;
    constructor(clientConfig: IPMrestClientConfig);
    getProjectDefs(organizationId: any): Promise<AxiosResponse>;
    getIterations(organizationId: any, params: any): Promise<AxiosResponse>;
    getTeamsProjects(organizationId: any, params: any): Promise<AxiosResponse>;
}
