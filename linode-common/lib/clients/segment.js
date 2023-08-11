"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SegmentClient = void 0;
const axios_1 = __importDefault(require("axios"));
const index_1 = require("./index");
class SegmentClient {
    constructor(clientConfig) {
        const baseURL = clientConfig.segmentServiceUrl;
        this.instance = axios_1.default.create({
            baseURL,
            timeout: 30000,
            headers: {
                Authorization: `Basic ${Buffer.from(`${clientConfig.segment_write_key}:`).toString('base64')}`,
                'content-type': 'application/json'
            }
        });
        (0, index_1.setupAxios)(this.instance, clientConfig.logger, clientConfig.linb_self_service_id);
    }
    async track(payload) {
        return await this.instance.post(`v1/track`, payload);
    }
    async identify(payload) {
        return await this.instance.post(`v1/identify`, payload);
    }
    async group(payload) {
        return await this.instance.post(`v1/group`, payload);
    }
}
exports.SegmentClient = SegmentClient;
//# sourceMappingURL=segment.js.map