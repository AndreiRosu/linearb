"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePageSize = exports.validatePaginationOffset = exports.paginationConfig = void 0;
const lodash_1 = __importDefault(require("lodash"));
const pagination_1 = require("../constants/pagination");
function paginationConfig(knex) {
    return async function (options) {
        if (lodash_1.default.isBoolean(options.count_total) && !options.count_total) {
            if (options.offset != null) {
                this.offset(options.offset);
            }
            return await this.limit(options.limit).then(rows => {
                return {
                    total: -1,
                    items: rows
                };
            });
        }
        const clone = this.clone().clearSelect().clearOrder().select('*');
        return await Promise.all([
            knex.count('*').from(clone.as('total_count')),
            this.offset(options.offset).limit(options.limit)
        ]).then(([total, rows]) => {
            const count = parseInt(total.length > 0 ? total[0].count : 0);
            return {
                total: count,
                items: rows
            };
        });
    };
}
exports.paginationConfig = paginationConfig;
function validatePaginationOffset(offset = pagination_1.MINIMUM_PAGINATION_OFFSET) {
    return offset > pagination_1.MINIMUM_PAGINATION_OFFSET ? offset : pagination_1.MINIMUM_PAGINATION_OFFSET;
}
exports.validatePaginationOffset = validatePaginationOffset;
function validatePageSize(size, sizeParams) {
    if (!size || size < sizeParams.min)
        return sizeParams.default;
    if (size > sizeParams.max)
        return sizeParams.max;
    return size;
}
exports.validatePageSize = validatePageSize;
//# sourceMappingURL=pagination-utils.js.map