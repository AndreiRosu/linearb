import { FiltersUsage } from './filter-types';
export declare const internalIncludes: (file: string, searchTerm: string) => boolean;
export declare const internalRegex: (file: string, searchTerm: string, multiline?: boolean) => boolean;
export declare const internalEvery: (arr: boolean[], value: boolean) => boolean;
export declare const formatInputToList: (input: any) => any[];
export declare const PROVIDER_NAME: any;
export declare const DOCS_LINK_COMMENT = "\n \nTo learn more about /:\\ gitStream - [Visit our Docs](https://docs.gitstream.cm/) \n \n";
export declare const MONTH: {
    [key: string]: string;
};
export declare class FiltersForAnalytics {
    static filters: FiltersUsage;
}
export declare const handleAnalytics: (filterName: string, filterArgs: any[]) => void;
