import { AxiosInstance, AxiosResponse } from 'axios';
export interface ISegmentClientConfig {
    segmentServiceUrl: string;
    logger?: any;
    linb_self_service_id?: string;
    segment_write_key: string;
}
export declare class SegmentClient {
    instance: AxiosInstance;
    constructor(clientConfig: ISegmentClientConfig);
    track(payload: any): Promise<AxiosResponse>;
    identify(payload: any): Promise<AxiosResponse>;
    group(payload: any): Promise<AxiosResponse>;
}
