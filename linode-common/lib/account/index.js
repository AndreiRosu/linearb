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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccount = void 0;
const lodash_1 = require("lodash");
const db_1 = require("../db");
const utils_1 = require("../utils");
const ACCOUNT_TABLE = 'account';
__exportStar(require("./account.model"), exports);
async function getAccount(queryBy, whereNot = {}) {
    const pg = (0, db_1.getConnection)();
    const q = pg(ACCOUNT_TABLE)
        .where(Object.assign(Object.assign({}, (0, lodash_1.omit)(queryBy, 'email')), utils_1.notDeleted))
        .orderBy('last_logged_in_at', 'desc')
        .whereNot(whereNot);
    (0, utils_1.addLowerCaseEmailWhereIfNeeded)(queryBy, q);
    return await q.first();
}
exports.getAccount = getAccount;
//# sourceMappingURL=index.js.map