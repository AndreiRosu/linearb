import { Knex } from 'knex';
export * from './audit-sns.sender';
export * from './json-utils';
export * from './ddb-query-helper';
export * from './lambda-helpers';
export * from './pagination-utils';
export * from './default-dict';
export declare const notDeleted: {
    deleted_at: any;
};
export declare function prefixQueryWithTable(query: any, table: any): any;
export declare function alias(field: any, table: any, alias?: string): {
    [x: number]: string;
};
export declare const getDatesBetween: (start: any, end: any, reverse?: boolean, step?: number) => any[];
/**
 * safely joins URLs, handling trailing or redundant slashes
 * Example: safeJoinUrl('localhost/', '/api', 'v1', '////internal//', '/settings') => will return 'localhost/api/v1/internal/settings'
 * @param parts
 */
export declare const safeJoinUrl: (...parts: string[]) => string;
export declare function addLowerCaseEmailWhereIfNeeded({ email }: {
    email: any;
}, q: Knex.QueryBuilder): void;
