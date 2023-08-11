"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinrestClient = void 0;
const axios_1 = __importDefault(require("axios"));
const invitations_1 = require("../invitations");
const index_1 = require("./index");
const SENSORS_AUTHORIZATIONS = 'sensors-authorizations';
const LINKED_ACCOUNTS = 'linked-accounts';
const INVITATION = 'invitations';
const ACCOUNTS = 'accounts';
class LinrestClient {
    constructor(clientConfig) {
        const baseURL = `${clientConfig.linrestServiceUrl}/api/internal/`;
        this.instance = axios_1.default.create({
            baseURL,
            timeout: 30000
        });
        (0, index_1.setupAxios)(this.instance, clientConfig.logger, clientConfig.linb_self_service_id);
    }
    async getTeam(organizationId, teamId) {
        return await this.instance.get(`teams/lean/${teamId}`, {
            headers: { organization_id: organizationId }
        });
    }
    async getTeams(organizationId) {
        return await this.instance.get('teams/lean', {
            headers: { organization_id: organizationId }
        });
    }
    async getTeamsNonLean(organizationId, queryParams) {
        return await this.instance.get('teams', {
            headers: { organization_id: organizationId },
            params: queryParams
        });
    }
    /*
    {
      "id": 19679,
      "organization_id": 93672499,
      "name": "Test&Me",
      "initials": "TY",
      "color": "#03A9F4",
      "extra": null,
      "created_at": "2022-03-24T14:39:30.521Z",
      "updated_at": null,
      "deleted_at": null,
      "established_at": "2021-12-24T14:39:30.000Z",
      "project_id": 48277745,
      "contributors": [
        {"id": 312375315, "roles": [{  "roles": [ "contributor" ], "start": "2021-12-24T14:39:30",  "end": null }]},
        {"id": 501337959, "roles": [ { "roles": [ "contributor" ], "start": "2021-12-24T14:39:30",  "end": null }]}
       ]
    }
     */
    async getTeamNonLean(organizationId, teamId, queryParams) {
        return await this.instance.get(`teams/${teamId}`, {
            headers: { organization_id: organizationId },
            params: queryParams
        });
    }
    async getLinkedAccount(queryParams) {
        return await this.instance.get(LINKED_ACCOUNTS, {
            params: queryParams
        });
    }
    async deleteLinkedAccount(queryParams) {
        return await this.instance.delete(LINKED_ACCOUNTS, {
            params: queryParams
        });
    }
    async searchSensorAuthorization(queryParams) {
        return await this.instance.get(`${SENSORS_AUTHORIZATIONS}/search`, {
            params: queryParams
        });
    }
    async sendInvitationReminder(invitation, invitationType) {
        return await this.instance.post(`${INVITATION}/${invitation.id}/remind?invitation_type=${invitationType}`, {
            organization_id: invitation.organization_id,
            source: invitations_1.INVITATION_SOURCE.REMINDER_SERVICE
        });
    }
    async dismissInvitation(invitation, invitationType) {
        return await this.instance.post(`${INVITATION}/${invitation.id}/dismiss?invitation_type=${invitationType}`, {
            organization_id: invitation.organization_id,
            source: invitations_1.INVITATION_SOURCE.REMINDER_SERVICE
        });
    }
    async getAccount(id) {
        return await this.instance.get(`${ACCOUNTS}/${id}`);
    }
    async updateAccount(id, payload) {
        return await this.instance.patch(`${ACCOUNTS}/${id}`, payload);
    }
}
exports.LinrestClient = LinrestClient;
//# sourceMappingURL=linrest.js.map