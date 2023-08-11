"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinPRClient = void 0;
const axios_1 = __importDefault(require("axios"));
const index_1 = require("./index");
class LinPRClient {
    constructor(clientConfig) {
        const baseURL = `${clientConfig.linprServiceUrl}/api/${clientConfig.isInternal ? 'internal/' : ''}v1`;
        this.instance = axios_1.default.create({
            baseURL,
            timeout: 30000,
            headers: { organization_id: clientConfig.organization_id.toString() }
        });
        (0, index_1.setupAxios)(this.instance, clientConfig.logger, clientConfig.linb_self_service_id);
    }
    async getSnapshots(payload) {
        return await this.instance.post(`branches/snapshots/search`, payload);
    }
    async getBranch(branch_id) {
        return await this.instance.get(`branches/${branch_id}`, { params: { full_details: 'true' } });
    }
    async getPullRequest(id) {
        return await this.instance.get(`pull-requests/${id}`);
    }
    async searchPRs(payload) {
        return await this.instance.post(`pull-requests/search`, payload);
    }
    async getMeasurements(payload) {
        return await this.instance.post(`metrics/search`, payload);
    }
    async createMeasurements(payload) {
        return await this.instance.post(`metrics`, payload);
    }
}
exports.LinPRClient = LinPRClient;
//# sourceMappingURL=linpr.js.map