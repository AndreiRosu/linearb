"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSettingByDefinitionName = exports.postOrgSettings = exports.searchOrgSettings = exports.isFeatureFlagEnabled = exports.getOrgSettings = exports.SettingsNamespace = exports.DefinitionLevel = void 0;
const axios_1 = __importDefault(require("axios"));
const utils_1 = require("../utils");
const _ = __importStar(require("lodash"));
var DefinitionLevel;
(function (DefinitionLevel) {
    DefinitionLevel["ORGANIZATION"] = "organization";
    DefinitionLevel["REPOSITORY"] = "repository";
    DefinitionLevel["TEAM"] = "team";
})(DefinitionLevel = exports.DefinitionLevel || (exports.DefinitionLevel = {}));
var SettingsNamespace;
(function (SettingsNamespace) {
    SettingsNamespace["JIRA"] = "jira";
    SettingsNamespace["PM"] = "pm";
    SettingsNamespace["FEATURE_FLAGS"] = "featureFlags";
    SettingsNamespace["REWORK"] = "rework";
    SettingsNamespace["BRANCHES"] = "branches";
    SettingsNamespace["NOTIFICATIONS"] = "notifications";
    SettingsNamespace["RELEASES"] = "releases";
})(SettingsNamespace = exports.SettingsNamespace || (exports.SettingsNamespace = {}));
const callSettingsService = async (settingsServiceBaseUrl, { method = 'GET', path = '/settings', headers = {}, params = {}, data = {} } = {}) => {
    const url = (0, utils_1.safeJoinUrl)(settingsServiceBaseUrl, '/api/internal/', path);
    const { data: res } = await axios_1.default.request({
        url,
        method: method.toLowerCase(),
        headers: Object.assign(Object.assign({}, headers), { 'Content-Type': 'application/json' }),
        params,
        data
    });
    return res;
};
/**
 * call the GET /api/internal/settings API in Settings Service, for a specific organization
 * @param settingsServiceBaseUrl base host URL of settings service, not include API path. E.G: http://localhost:3033
 * @param req
 */
async function getOrgSettings(settingsServiceBaseUrl, req) {
    const { organization_id } = req, params = __rest(req, ["organization_id"]);
    return await callSettingsService(settingsServiceBaseUrl, {
        headers: { organization_id },
        params
    });
}
exports.getOrgSettings = getOrgSettings;
async function isFeatureFlagEnabled(settingsServiceBaseUrl, req) {
    const settings = await getOrgSettings(settingsServiceBaseUrl, {
        organization_id: req.organization_id
    });
    return _.get(settings, `featureFlags.${req.feature_name}.value`, false) === true;
}
exports.isFeatureFlagEnabled = isFeatureFlagEnabled;
/**
 * call the GET /api/internal/settings/search API in Settings Service, for a specific organization
 * @param settingsServiceBaseUrl base host URL of settings service, not include API path. E.G: http://localhost:3033
 * @param req
 */
async function searchOrgSettings(settingsServiceBaseUrl, req) {
    const { organization_id } = req, params = __rest(req, ["organization_id"]);
    return await callSettingsService(settingsServiceBaseUrl, {
        path: '/settings/search',
        headers: { organization_id },
        params
    });
}
exports.searchOrgSettings = searchOrgSettings;
/**
 * call the POST /api/internal/settings/ API in Settings Service, for a specific organization
 * @param settingsServiceBaseUrl base host URL of settings service, not include API path. E.G: http://localhost:3033
 * @param req
 */
async function postOrgSettings(settingsServiceBaseUrl, req) {
    const { organization_id, payload } = req, params = __rest(req, ["organization_id", "payload"]);
    return await callSettingsService(settingsServiceBaseUrl, {
        method: 'post',
        path: '/settings',
        headers: { organization_id },
        data: payload,
        params
    });
}
exports.postOrgSettings = postOrgSettings;
const getSettingByDefinitionName = async (settingsServiceBaseUrl, req) => {
    const { organization_id, definition_name } = req;
    const allSettings = await searchOrgSettings(settingsServiceBaseUrl, {
        organization_id: Number(organization_id)
    });
    const definition = allSettings.find(s => s.name === definition_name);
    const settings = allSettings.filter(s => s.definitionId === definition.id);
    return settings || [];
};
exports.getSettingByDefinitionName = getSettingByDefinitionName;
//# sourceMappingURL=settings.service.js.map