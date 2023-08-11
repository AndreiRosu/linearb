/// <reference types="qs" />
/// <reference types="express" />
export * from './data-dog.middleware';
export declare const expressHttpContext: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> | import("express").ErrorRequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
