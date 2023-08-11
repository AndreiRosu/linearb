"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSnsClient = void 0;
const aws_sdk_1 = require("aws-sdk");
const bottleneck_1 = __importDefault(require("bottleneck"));
function createSnsClient({ AWS_DEFAULT_REGION, TOPIC_ARN, AWS_SNS_ENDPOINT, MAX_CONCURRENT_SNS_MESSAGES_TO_SEND, ENV = null, bottleneckConfig = {} }) {
    const isMockClient = ENV && ['TEST', 'CI'].includes(ENV.toUpperCase());
    // Mock dispatchEvent for test environments
    if (isMockClient) {
        return {
            dispatchEvent: () => Promise.resolve({
                MessageId: 'MOCK MESSAGE ID',
                SequenceNumber: 'MOCK SEQ NUM'
            })
        };
    }
    const limiter = new bottleneck_1.default(Object.assign({ maxConcurrent: MAX_CONCURRENT_SNS_MESSAGES_TO_SEND }, bottleneckConfig));
    const snsConfig = Object.assign({ region: AWS_DEFAULT_REGION }, (AWS_SNS_ENDPOINT ? { endpoint: AWS_SNS_ENDPOINT } : {}));
    return {
        dispatchEvent: async (event, topic_arn = null) => {
            try {
                const snsClient = new aws_sdk_1.SNS(snsConfig);
                const _topic = topic_arn || TOPIC_ARN;
                return limiter.schedule(() => snsClient
                    .publish(Object.assign({ TopicArn: _topic }, event))
                    .promise()
                    .catch(e => {
                    throw new Error(`Unable to publish event. error: ${JSON.stringify(e)}, event: ${JSON.stringify(Object.assign({ TopicArn: _topic }, event))}`);
                }));
            }
            catch (error) {
                throw new Error(`Error in dispatchEvent. error: ${JSON.stringify(error)}, event: ${JSON.stringify(Object.assign({ TopicArn: topic_arn || TOPIC_ARN }, event))}`);
            }
        }
    };
}
exports.createSnsClient = createSnsClient;
//# sourceMappingURL=sns-client.js.map