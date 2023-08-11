export declare const createDatadogConnect: ({ stats_d_client, stat, tags, method, response_code }: {
    stats_d_client: any;
    stat: any;
    tags?: any[];
    method: any;
    response_code?: boolean;
}) => (req: any, res: any, next: any) => void;
