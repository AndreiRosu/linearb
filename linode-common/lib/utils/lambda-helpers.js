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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueryParams = exports.getBody = exports.getHeaders = void 0;
const _ = __importStar(require("lodash"));
const getHeaders = event => {
    // This is to handle a case that either tyk or serverless-offline capitalizes the keys of the headers
    const { headers } = event;
    return _.mapKeys(typeof headers === 'string' ? JSON.parse(headers) : headers, (v, k) => k.toLocaleLowerCase());
};
exports.getHeaders = getHeaders;
const getBody = event => {
    const { body } = event;
    return (typeof body === 'string' ? JSON.parse(body) : body) || {};
};
exports.getBody = getBody;
const getQueryParams = event => {
    const { queryStringParameters } = event;
    return ((typeof queryStringParameters === 'string'
        ? JSON.parse(queryStringParameters)
        : queryStringParameters) || {});
};
exports.getQueryParams = getQueryParams;
//# sourceMappingURL=lambda-helpers.js.map