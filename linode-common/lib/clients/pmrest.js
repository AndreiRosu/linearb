"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PMrestClient = void 0;
const axios_1 = __importDefault(require("axios"));
const index_1 = require("./index");
class PMrestClient {
    constructor(clientConfig) {
        const baseURL = `${clientConfig.pmrestServiceUrl}/api/internal/v1/pm`;
        this.instance = axios_1.default.create({
            baseURL,
            timeout: 30000
        });
        (0, index_1.setupAxios)(this.instance, clientConfig.logger, clientConfig.linb_self_service_id);
    }
    async getProjectDefs(organizationId) {
        return await this.instance.get(`projects-view/configuration`, {
            headers: { organization_id: organizationId }
        });
    }
    async getIterations(organizationId, params) {
        return await this.instance.get(`iterations`, {
            headers: { organization_id: organizationId },
            params: params
        });
    }
    async getTeamsProjects(organizationId, params) {
        return await this.instance.get(`projects/teams-projects`, {
            headers: { organization_id: organizationId },
            params: params
        });
    }
}
exports.PMrestClient = PMrestClient;
//# sourceMappingURL=pmrest.js.map