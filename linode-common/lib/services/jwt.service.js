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
exports.getToken = exports.signToken = exports.decodeToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const _ = __importStar(require("lodash"));
const errors_1 = require("../routing/errors");
const decodeToken = (token, verifyBy) => {
    return new Promise((resolve, reject) => (0, jsonwebtoken_1.verify)(token, verifyBy, (err, decoded) => err ? reject(new errors_1.UnauthorizedError(`Verify token failed`, err.message)) : resolve(decoded)));
};
exports.decodeToken = decodeToken;
const signToken = (payload, secret, expiresIn) => {
    return new Promise((resolve, reject) => {
        (0, jsonwebtoken_1.sign)(payload, secret, { algorithm: 'HS256', expiresIn }, function (err, token) {
            if (err) {
                return reject(new Error(`Token sign failed, used with ${JSON.stringify(payload)}. error: ` + err.toString()));
            }
            resolve(token);
        });
    });
};
exports.signToken = signToken;
const getToken = (req) => {
    const headerToken = _.get(req, 'headers.authorization', null);
    const queryToken = _.get(req, 'query.token', null);
    return headerToken ? headerToken.split(' ')[1] : queryToken;
};
exports.getToken = getToken;
//# sourceMappingURL=jwt.service.js.map