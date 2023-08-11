import { SNS } from 'aws-sdk';
export declare function createSnsClient({ AWS_DEFAULT_REGION, TOPIC_ARN, AWS_SNS_ENDPOINT, MAX_CONCURRENT_SNS_MESSAGES_TO_SEND, ENV, bottleneckConfig }: {
    AWS_DEFAULT_REGION: any;
    TOPIC_ARN: any;
    AWS_SNS_ENDPOINT: any;
    MAX_CONCURRENT_SNS_MESSAGES_TO_SEND: any;
    ENV?: any;
    bottleneckConfig?: {};
}): {
    dispatchEvent: () => any;
} | {
    dispatchEvent: (event: any, topic_arn?: any) => Promise<import("aws-sdk/lib/request").PromiseResult<SNS.PublishResponse, import("aws-sdk").AWSError>>;
};
