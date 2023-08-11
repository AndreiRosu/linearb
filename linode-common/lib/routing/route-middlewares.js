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
exports.addAccountIdToRequest = exports.checkIfHasScopesForSls = exports.allowedAccountTypes = exports.validateAuthHeaders = exports.handleRequestError = exports.validateOrganizationIdInHeader = exports.sanitizeStateQuery = exports.sanitizeOrderBy = exports.sanitizePagination = exports.addOrganizationIdToRequest = exports.validateRequiredFields = exports.sanitizeEmptyValues = exports.sanitizeQuery = exports.sanitizeBody = exports.validateLicense = exports.catchAsyncErrors = void 0;
const express_validator_1 = require("express-validator");
const _ = __importStar(require("lodash"));
const account_1 = require("../account");
const LicenseService = __importStar(require("../license/license.service"));
const errors_1 = require("./errors");
function toBoolean(value) {
    if (!value) {
        return false;
    }
    if (typeof value == 'number' || typeof value == 'boolean') {
        return !!value;
    }
    return _.replace(_.trim(value.toLowerCase()), /[""'']/gi, '') === 'true' ? true : false;
}
_.mixin({
    toBoolean: toBoolean
});
function catchAsyncErrors(fn) {
    return (req, res, next) => {
        const validationResults = (0, express_validator_1.validationResult)(req);
        if (!validationResults.isEmpty()) {
            const errors = validationResults.array();
            const badRequestError = new errors_1.BadRequestError('validation error', errors);
            return next(badRequestError);
        }
        const routePromise = fn(req, res, next);
        if (routePromise.catch) {
            routePromise.catch(err => {
                if (err.statusCode || err instanceof errors_1.BaseError) {
                    return next(err);
                }
                let newError;
                switch (err.code) {
                    case 401:
                        newError = new errors_1.UnauthorizedError(`${err}`);
                        newError.stack = `${newError.stack}\n${err.stack}`;
                        return next(newError);
                    case 409:
                        newError = new errors_1.ConflictError(`${err}`);
                        newError.stack = `${newError.stack}\n${err.stack}`;
                        return next(new errors_1.ConflictError(err));
                    case 404:
                        newError = new errors_1.NotFoundError(`${err}`);
                        newError.stack = `${newError.stack}\n${err.stack}`;
                        return next(new errors_1.NotFoundError(err));
                    case 400:
                        newError = new errors_1.BadRequestError(`${err}`);
                        newError.stack = `${newError.stack}\n${err.stack}`;
                        return next(new errors_1.BadRequestError(err));
                    default:
                        return next(new errors_1.InternalError({ err }));
                }
            });
        }
    };
}
exports.catchAsyncErrors = catchAsyncErrors;
async function validateLicense(req, res, next) {
    const organization_id = req.headers['organization_id'];
    try {
        const hasLicense = await LicenseService.hasValidLicense(organization_id);
        if (!hasLicense) {
            return next(new errors_1.ForbiddenError('License is not valid'));
        }
        return next();
    }
    catch (e) {
        console.error('validateLicense err', e);
        next(e);
    }
}
exports.validateLicense = validateLicense;
function sanitizeBody(properties = []) {
    return (req, res, next) => {
        const fieldsToUpdate = Object.assign({}, _.pick(req.body, properties));
        req.body = fieldsToUpdate;
        next();
    };
}
exports.sanitizeBody = sanitizeBody;
function sanitizeQuery(properties = []) {
    return (req, res, next) => {
        const fieldsToUpdate = Object.assign({}, _.pick(req.query, properties));
        req.query = fieldsToUpdate;
        next();
    };
}
exports.sanitizeQuery = sanitizeQuery;
function sanitizeEmptyValues(properties = []) {
    return (req, res, next) => {
        const nonEmptyValues = Object.assign({}, _.pickBy(req.body, _.identity));
        req.body = nonEmptyValues;
        next();
    };
}
exports.sanitizeEmptyValues = sanitizeEmptyValues;
function validateRequiredFields(fields = []) {
    return (req, res, next) => {
        const { body } = req;
        fields.forEach(field => {
            if (_.isNil(body[field]) ||
                ((_.isString(body[field]) || _.isArray(body[field])) && _.isEmpty(body[field]))) {
                throw new errors_1.BadRequestError(`the field ${field} is required`);
            }
        });
        next();
    };
}
exports.validateRequiredFields = validateRequiredFields;
function addOrganizationIdToRequest(reqPart) {
    return (req, res, next) => {
        const { body, query } = req;
        if (req.header('organization_id')) {
            if (reqPart === 'body') {
                body['organization_id'] = req.header('organization_id');
            }
            if (reqPart === 'query') {
                query['organization_id'] = req.header('organization_id');
            }
        }
        next();
    };
}
exports.addOrganizationIdToRequest = addOrganizationIdToRequest;
function sanitizePagination() {
    return (req, res, next) => {
        const { query } = req;
        req.pagination = {
            limit: parseInt(query['limit']) || 10,
            offset: parseInt(query['offset']) || 0,
            count_total: 'count_total' in query ? /true/i.test(query['count_total']) : true
        };
        delete query['limit'];
        delete query['offset'];
        delete query['count_total'];
        return next();
    };
}
exports.sanitizePagination = sanitizePagination;
function sanitizeOrderBy(defaultValue = 'updated_at') {
    return (req, res, next) => {
        const { query } = req;
        req.order = {
            by: query['sort_by'] || defaultValue || 'updated_at',
            dir: query['sort_dir'] || 'desc'
        };
        delete query['sort_by'];
        delete query['sort_dir'];
        return next();
    };
}
exports.sanitizeOrderBy = sanitizeOrderBy;
function sanitizeStateQuery(req, res, next) {
    var _a;
    const { body, query } = req;
    query['state'] = (_a = query['state']) === null || _a === void 0 ? void 0 : _a.split(',');
    next();
}
exports.sanitizeStateQuery = sanitizeStateQuery;
function validateOrganizationIdInHeader(req, res, next) {
    if (!req.headers['organization_id']) {
        throw new errors_1.UnauthorizedError(`organization_id is required`);
    }
    return next();
}
exports.validateOrganizationIdInHeader = validateOrganizationIdInHeader;
function handleRequestError(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        next(new errors_1.UnauthorizedError(err.message));
    }
    else {
        next(err);
    }
}
exports.handleRequestError = handleRequestError;
async function validateAuthHeaders(req, res, next) {
    try {
        const organization_id = req.headers['organization_id'];
        const id = req.headers['id'];
        if (!id) {
            return next(new errors_1.UnauthorizedError('Auth headers validation: id not provided'));
        }
        const account = await (0, account_1.getAccount)({ id });
        if (!account) {
            return next(new errors_1.UnauthorizedError('Auth headers validation: Account does not exists.'));
        }
        if (organization_id && account.organization_id !== parseInt(organization_id)) {
            return next(new errors_1.UnauthorizedError('Auth headers validation: organization_id does not match.'));
        }
        const { header } = req;
        header['accountName'] = account.name;
        header['accountId'] = account.id;
        return next();
    }
    catch (e) {
        console.error(`error in validateAuthHeaders, error: ${e}`);
        next(e);
    }
}
exports.validateAuthHeaders = validateAuthHeaders;
const allowedAccountTypes = (accountTypes = []) => {
    return (req, res, next) => {
        if (accountTypes.length == 0)
            return next();
        const { scopes } = req.headers;
        if (!scopes) {
            return next(new errors_1.ForbiddenError('Missing scopes in headers'));
        }
        try {
            const { accountTypeId } = JSON.parse(scopes);
            if (accountTypes.includes(accountTypeId)) {
                return next();
            }
            return next(new errors_1.ForbiddenError('This account type has no access to this resource'));
        }
        catch (exp) {
            return next(new errors_1.ForbiddenError('Invalid scopes'));
        }
    };
};
exports.allowedAccountTypes = allowedAccountTypes;
const getHeaders = event => {
    // This is to handle a case that either tyk or serverless-offline capitalizes the keys of the headers
    return _.mapKeys(typeof event.headers === 'string' ? JSON.parse(event.headers) : event.headers, (v, k) => k.toLocaleLowerCase());
};
const checkIfHasScopesForSls = (event, accountTypes = []) => {
    if (accountTypes.length == 0)
        return true;
    const headers = getHeaders(event);
    const { scopes } = headers;
    const scopesJson = JSON.parse(scopes);
    const accountTypeId = _.get(scopesJson, 'accountTypeId');
    if (!accountTypeId) {
        return false;
    }
    if (accountTypes.includes(accountTypeId)) {
        return true;
    }
    return false;
};
exports.checkIfHasScopesForSls = checkIfHasScopesForSls;
/**
 * Will fetch accoint_id from the Request header and will pass to the requested part of the Request object (reqPart)
 * Will raise Error if the reqPart is not valid. Supports: body and query.
 * @param reqPart: Part of the Request body to update with an account_id
 */
function addAccountIdToRequest(reqPart) {
    return (req, res, next) => {
        if (req.header('id')) {
            switch (reqPart) {
                case 'body':
                    req.body['account_id'] = req.header('id');
                    break;
                case 'query':
                    req.query['account_id'] = req.header('id');
                    break;
                default:
                    throw new Error('Invalid reqPart passed in addAccountIdToRequest.');
            }
        }
        next();
    };
}
exports.addAccountIdToRequest = addAccountIdToRequest;
//# sourceMappingURL=route-middlewares.js.map