import { AccountType } from '@linearb/linjs-common';
import { RequestHandler } from 'express';
export declare class ScopesGuard {
    accountTypes: AccountType[];
    constructor(accountTypes?: AccountType[]);
    guard(): RequestHandler;
}
