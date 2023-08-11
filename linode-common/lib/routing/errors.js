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
exports.handleUnhandledRoutes = exports.handleErrors = exports.InternalError = exports.ForbiddenError = exports.UnauthorizedError = exports.ConflictError = exports.BadRequestError = exports.RefreshTokenError = exports.DeprecationError = exports.NotFoundError = exports.BaseError = exports.errorLogLevels = exports.setErrorCause = void 0;
const HttpStatus = __importStar(require("http-status-codes"));
const utils_1 = require("../utils");
const setErrorCause = (e, originalError) => {
    e.stack = `${e.stack}\n${originalError.stack}`;
    return e;
};
exports.setErrorCause = setErrorCause;
// eslint-disable-next-line no-extend-native
Error.prototype.setErrorCause = function (originalError) {
    (0, exports.setErrorCause)(this, originalError);
    return this;
};
exports.errorLogLevels = {
    error: 'error',
    info: 'info',
    debug: 'debug'
};
const defaultErrorOptions = { logLevel: null };
class BaseError extends Error {
    constructor(message) {
        super(message);
    }
    toMessage() {
        return {
            error: this.name,
            description: this.message
        };
    }
}
exports.BaseError = BaseError;
class NotFoundError extends BaseError {
    constructor(message, { logLevel } = defaultErrorOptions) {
        super(message);
        this.logLevel = logLevel;
        this.name = 'Not Found';
        this.statusCode = HttpStatus.NOT_FOUND;
    }
}
exports.NotFoundError = NotFoundError;
class DeprecationError extends BaseError {
    constructor(message) {
        super(message);
        this.name = 'Deprecation Error';
        this.statusCode = HttpStatus.BAD_REQUEST;
    }
}
exports.DeprecationError = DeprecationError;
class RefreshTokenError extends BaseError {
    constructor(message, description) {
        super(message);
        this.name = 'Refresh Token Error';
        this.description = description;
        this.statusCode = HttpStatus.NO_CONTENT;
    }
}
exports.RefreshTokenError = RefreshTokenError;
class BadRequestError extends BaseError {
    constructor(message, validationError) {
        super(message);
        this.name = 'Bad Request';
        this.statusCode = HttpStatus.BAD_REQUEST;
        this.description = (0, utils_1.SafeStringify)(validationError);
    }
    toMessage() {
        return {
            error: this.name,
            description: this.description,
            message: this.message
        };
    }
}
exports.BadRequestError = BadRequestError;
class ConflictError extends BaseError {
    constructor(message) {
        super(message);
        this.name = 'Conflict';
        this.statusCode = HttpStatus.CONFLICT;
    }
}
exports.ConflictError = ConflictError;
class UnauthorizedError extends BaseError {
    constructor(message, description) {
        super(message);
        this.name = 'Unauthorized';
        this.description = description;
        this.statusCode = HttpStatus.UNAUTHORIZED;
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends BaseError {
    constructor(message) {
        super(message);
        this.name = 'Forbidden';
        this.statusCode = HttpStatus.FORBIDDEN;
    }
}
exports.ForbiddenError = ForbiddenError;
class InternalError extends Error {
    constructor({ err, message }) {
        super(message || err.message);
        this.name = 'Internal Error';
        this.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        this.stack = err.stack;
        this.internalError = err;
    }
}
exports.InternalError = InternalError;
const handleErrors = (app, logger, pg) => {
    if (!app || !logger) {
        throw new Error('handleErrors required params error');
    }
    app.use((err, req, res, next) => {
        if (err instanceof BaseError) {
            const loggerFn = logger[err.logLevel || exports.errorLogLevels.error];
            loggerFn(JSON.stringify(err.message), err);
            return res.status(err.statusCode).json(err.toMessage());
        }
        // for pg errors - do a transaction rollback
        if (pg && ['23505', '23503', '23000', '23001', '25P02'].indexOf(err.code) >= 0) {
            pg.raw('ROLLBACK');
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('pg error');
        }
        if (err instanceof InternalError) {
            logger.error(JSON.stringify(err.message), err);
            return res.status(err.statusCode).send('internal Server Error');
        }
        // unknown exception, dont reflect internals to client
        logger.error(JSON.stringify(err.message), err);
        return res
            .status(err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
            .send('Unhandled internal server error, check logs');
    });
};
exports.handleErrors = handleErrors;
const handleUnhandledRoutes = (routers = []) => {
    routers.forEach(router => {
        if (router.use) {
            router.use('*', (req, res, next) => {
                throw new NotFoundError('Unhandled path');
            });
        }
    });
};
exports.handleUnhandledRoutes = handleUnhandledRoutes;
//# sourceMappingURL=errors.js.map