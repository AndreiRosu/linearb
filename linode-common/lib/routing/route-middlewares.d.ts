import { AccountType } from '@linearb/linjs-common';
import { NextFunction, Request, Response } from 'express';
export declare function catchAsyncErrors(fn: any): (req: any, res: any, next: any) => any;
export declare function validateLicense(req: any, res: any, next: any): Promise<any>;
export declare function sanitizeBody(properties?: any[]): (req: any, res: any, next: any) => void;
export declare function sanitizeQuery(properties?: any[]): (req: any, res: any, next: any) => void;
export declare function sanitizeEmptyValues(properties?: any[]): (req: any, res: any, next: any) => void;
export declare function validateRequiredFields(fields?: any[]): (req: any, res: any, next: any) => void;
export declare function addOrganizationIdToRequest(reqPart: any): (req: any, res: any, next: any) => void;
export declare function sanitizePagination(): (req: any, res: any, next: any) => any;
export declare function sanitizeOrderBy(defaultValue?: string): (req: any, res: any, next: any) => any;
export declare function sanitizeStateQuery(req: any, res: any, next: any): void;
export declare function validateOrganizationIdInHeader(req: any, res: any, next: any): any;
export declare function handleRequestError(err: any, req: any, res: any, next: any): void;
export declare function validateAuthHeaders(req: any, res: any, next: any): Promise<any>;
export declare const allowedAccountTypes: (accountTypes?: AccountType[]) => (req: any, res: any, next: any) => any;
export declare const checkIfHasScopesForSls: (event: any, accountTypes?: AccountType[]) => boolean;
/**
 * Will fetch accoint_id from the Request header and will pass to the requested part of the Request object (reqPart)
 * Will raise Error if the reqPart is not valid. Supports: body and query.
 * @param reqPart: Part of the Request body to update with an account_id
 */
export declare function addAccountIdToRequest(reqPart: string): (req: Request, res: Response, next: NextFunction) => void;
