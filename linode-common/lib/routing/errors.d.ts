import { Application } from 'express';
export declare const setErrorCause: (e: any, originalError: any) => any;
interface IErrorLogLevels {
    error: string;
    info: string;
    debug: string;
}
export declare const errorLogLevels: IErrorLogLevels;
interface IErrorOptions {
    logLevel?: string;
}
export declare class BaseError extends Error {
    statusCode: number;
    name: string;
    message: string;
    logLevel?: string;
    constructor(message?: string);
    toMessage(): {
        error: string;
        description: string;
    };
}
export declare class NotFoundError extends BaseError {
    constructor(message?: string, { logLevel }?: IErrorOptions);
}
export declare class DeprecationError extends BaseError {
    constructor(message?: string);
}
export declare class RefreshTokenError extends BaseError {
    private readonly description;
    constructor(message?: string, description?: string);
}
export declare class BadRequestError extends BaseError {
    private readonly description;
    constructor(message?: string, validationError?: any);
    toMessage(): {
        error: string;
        description: string;
        message: string;
    };
}
export declare class ConflictError extends BaseError {
    constructor(message?: string);
}
export declare class UnauthorizedError extends BaseError {
    private readonly description;
    constructor(message?: string, description?: string);
}
export declare class ForbiddenError extends BaseError {
    constructor(message?: string);
}
interface IError {
    err?: Error;
    message?: string;
}
export declare class InternalError extends Error {
    statusCode: number;
    internalError: Error;
    constructor({ err, message }: IError);
}
export declare const handleErrors: (app: Application, logger: any, pg: any) => void;
export declare const handleUnhandledRoutes: (routers?: any[]) => void;
export {};
