import { Knex } from 'knex';
import { IPageSizeParams } from '../constants/pagination';
export declare function paginationConfig(knex: Knex): (options: any) => Promise<any>;
export declare function validatePaginationOffset(offset?: number): number;
export declare function validatePageSize(size: number, sizeParams: IPageSizeParams): number;
