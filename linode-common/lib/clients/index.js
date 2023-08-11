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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAxios = exports.getPusherClient = exports.getOrgIdFromChannel = void 0;
__exportStar(require("./linpr"), exports);
__exportStar(require("./linrest"), exports);
__exportStar(require("./pmrest"), exports);
__exportStar(require("./segment"), exports);
var pusher_1 = require("./pusher");
Object.defineProperty(exports, "getOrgIdFromChannel", { enumerable: true, get: function () { return pusher_1.getOrgIdFromChannel; } });
Object.defineProperty(exports, "getPusherClient", { enumerable: true, get: function () { return pusher_1.getPusherClient; } });
const utils_1 = require("../utils");
const express_http_context_1 = __importDefault(require("express-http-context"));
const uuid_1 = require("uuid");
const axios_1 = __importDefault(require("axios"));
function getRequestId(logger = null) {
    const request_id = express_http_context_1.default.get('reqId');
    if (!request_id) {
        const newRequestId = (0, uuid_1.v4)();
        logger === null || logger === void 0 ? void 0 : logger.debug(`Request id wasnt exists on http-context, creating a new one. id - ${newRequestId}`);
        express_http_context_1.default.set('reqId', newRequestId);
        return newRequestId;
    }
    return request_id;
}
/**
 * @param axiosInst axios instance using axios,create, or global default axios
 * @param logger
 * @param LINB_SELF_SERVICE_ID -process.env.LINB_SELF_SERVICE_ID;
 */
function setupAxios(axiosInst, logger = null, linb_self_service_id = null) {
    var _a, _b, _c, _d;
    if (linb_self_service_id && ((_b = (_a = axios_1.default === null || axios_1.default === void 0 ? void 0 : axios_1.default.defaults) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b.common)) {
        axios_1.default.defaults.headers.common['user-agent'] = linb_self_service_id;
    }
    if (!(((_c = axiosInst.interceptors) === null || _c === void 0 ? void 0 : _c.request) && ((_d = axiosInst.interceptors) === null || _d === void 0 ? void 0 : _d.response))) {
        return;
    }
    // TODO: prevent double initialization by iterating axios.interceptors.response['handlers'][0]
    // extend error stack
    axiosInst.interceptors.request.use(config => {
        const requestId = getRequestId(logger);
        config.headers['x-request-id'] = requestId;
        config['errorExtendedStack'] = new Error('Extended stack:');
        return config;
    }, error => {
        logger === null || logger === void 0 ? void 0 : logger.error('client request error', error);
        return Promise.reject(error);
    });
    axiosInst.interceptors.response.use(response => {
        return response;
    }, async (error) => {
        var _a, _b;
        const originalStackTrace = (_b = (_a = error.config) === null || _a === void 0 ? void 0 : _a.errorExtendedStack) === null || _b === void 0 ? void 0 : _b.stack;
        if (originalStackTrace) {
            error.stack = `${error.stack}\n${originalStackTrace}`;
        }
        logger === null || logger === void 0 ? void 0 : logger.error('axios client response error', error);
        return Promise.reject(error);
    });
    axiosInst.interceptors.request.use(function (config) {
        if ((logger === null || logger === void 0 ? void 0 : logger.level) == 'debug') {
            logger.debug(`Sending request: ${(0, utils_1.SafeStringify)(config)}`);
        }
        return config;
    }, function (error) {
        // Do something with request error
        if ((logger === null || logger === void 0 ? void 0 : logger.level) == 'debug') {
            logger.debug(`Failing sending request: ${(0, utils_1.SafeStringify)(error)}`);
        }
        return Promise.reject(error);
    });
}
exports.setupAxios = setupAxios;
//# sourceMappingURL=index.js.map