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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addLowerCaseEmailWhereIfNeeded = exports.safeJoinUrl = exports.getDatesBetween = exports.alias = exports.prefixQueryWithTable = exports.notDeleted = void 0;
const _ = __importStar(require("lodash"));
__exportStar(require("./audit-sns.sender"), exports);
__exportStar(require("./json-utils"), exports);
__exportStar(require("./ddb-query-helper"), exports);
__exportStar(require("./lambda-helpers"), exports);
__exportStar(require("./pagination-utils"), exports);
__exportStar(require("./default-dict"), exports);
exports.notDeleted = { deleted_at: null };
function prefixQueryWithTable(query, table) {
    Object.keys(query).forEach(function (key) {
        if (!key.startsWith(table)) {
            query[table + '.' + key] = query[key];
            delete query[key];
        }
    });
    return query;
}
exports.prefixQueryWithTable = prefixQueryWithTable;
function alias(field, table, alias = '') {
    return { [alias || field]: `${table}.${field}` };
}
exports.alias = alias;
const getDatesBetween = (start, end, reverse = false, step = 1) => {
    const arr = [];
    start = new Date(start);
    end = new Date(end);
    for (let dt = start; dt <= end; dt.setDate(dt.getDate() + step)) {
        arr.push(new Date(dt));
    }
    return reverse ? arr.reverse() : arr;
};
exports.getDatesBetween = getDatesBetween;
/**
 * safely joins URLs, handling trailing or redundant slashes
 * Example: safeJoinUrl('localhost/', '/api', 'v1', '////internal//', '/settings') => will return 'localhost/api/v1/internal/settings'
 * @param parts
 */
const safeJoinUrl = (...parts) => {
    return parts.map(p => _.trim(p, '/')).join('/');
};
exports.safeJoinUrl = safeJoinUrl;
// If email field exists, add raw where query to the query builder
// Does not need to return anything since it append the raw query to the querybuilder reference
function addLowerCaseEmailWhereIfNeeded({ email }, q) {
    if (email && q.whereRaw) {
        q.whereRaw(`LOWER("email") = LOWER('${email}')`); // case insensitive email query
    }
}
exports.addLowerCaseEmailWhereIfNeeded = addLowerCaseEmailWhereIfNeeded;
//# sourceMappingURL=index.js.map