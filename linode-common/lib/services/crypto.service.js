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
exports.decryptObject = exports.encryptObject = exports.encrypt = exports.decrypt = void 0;
const CryptoJS = __importStar(require("crypto-js"));
const _ = __importStar(require("lodash"));
function decrypt(secret_key, val) {
    if (!val) {
        return null;
    }
    return CryptoJS.AES.decrypt(val, secret_key).toString(CryptoJS.enc.Utf8);
}
exports.decrypt = decrypt;
function encrypt(secret_key, val) {
    if (!val) {
        return null;
    }
    return CryptoJS.AES.encrypt(val.toString().trim(), secret_key).toString();
}
exports.encrypt = encrypt;
function encryptObject(secret_key, token, excluded_fields = []) {
    return _.reduce(token, (acc, val, key) => {
        acc[key] = excluded_fields.includes(key) ? val : encrypt(secret_key, val);
        return acc;
    }, {});
}
exports.encryptObject = encryptObject;
function decryptObject(secret_key, token, excluded_fields = []) {
    return _.reduce(token, (acc, val, key) => {
        acc[key] = excluded_fields.includes(key) ? val : decrypt(secret_key, val);
        return acc;
    }, {});
}
exports.decryptObject = decryptObject;
//# sourceMappingURL=crypto.service.js.map