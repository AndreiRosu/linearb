import { Namespace } from 'cls-hooked';
import type { RequestHandler, ErrorRequestHandler } from 'express';
export declare const namespaces: {
    default: any;
};
export declare function createNamespace(name?: string): any;
/**
 * Call the context middleware
 * use it after body parser
 * @returns {void}
 * @param context_namespace
 */
export declare const contextMiddleware: (context_namespace: Namespace) => RequestHandler | ErrorRequestHandler;
/** Use this to wrap a whole externally-called function (e.g. task handler) in a context.
 * Create a new child context for the namespace, rather than the use the global namespace context.
 * on which values can be set or read. Run all the functions that are called (either directly,
 * or indirectly through asynchronous functions that take callbacks themselves) from the provided callback within the scope of that namespace.
 * The new context is passed as an argument to the callback when it's called.
 * */
export declare function contextWrapper<A extends any[], R extends any>(context_namespace: Namespace, fn: (...args: A) => R): (...args: A) => void;
