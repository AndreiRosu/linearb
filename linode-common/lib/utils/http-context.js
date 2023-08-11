'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.contextWrapper = exports.contextMiddleware = exports.createNamespace = exports.namespaces = void 0;
// DOCS: https://github.com/jeff-lewis/cls-hooked
// FIXME REPLACE WITH ASYNC LOCAL STORAGE NODEJS NATIVE
const cls = require('cls-hooked');
const nsid = require('uuid').v4(); // generate random nsid using uuid instead of hard-coded value
exports.namespaces = { default: cls.getNamespace(nsid) || cls.createNamespace(nsid) };
function createNamespace(name = 'default') {
    if (!exports.namespaces[name] && name !== 'default') {
        exports.namespaces[name] = cls.createNamespace(name);
    }
    return exports.namespaces[name];
}
exports.createNamespace = createNamespace;
/**
 * Gets a value from the context by key.  Will return undefined if the context has not yet been initialized for this request or if a value is not found for the specified key.
 * @param {string} key
 * @param name
 */
function get(key, name = 'default') {
    var _a;
    if ((_a = exports.namespaces[name]) === null || _a === void 0 ? void 0 : _a.active) {
        return exports.namespaces[name].get(key);
    }
}
/**
 * Adds a value to the context by key.  If the key already exists, its value will be overwritten.
 * No value will persist if the context has not yet been initialized.
 * @param {string} key
 * @param {*} value
 */
function set(key, value, name = 'default') {
    var _a;
    if ((_a = exports.namespaces[name]) === null || _a === void 0 ? void 0 : _a.active) {
        return exports.namespaces[name].set(key, value);
    }
}
/**
 * Call the context middleware
 * use it after body parser
 * @returns {void}
 * @param context_namespace
 */
const contextMiddleware = (context_namespace) => contextWrapper(context_namespace, (err, req, res, next) => {
    if (err != null) {
        return next(err);
    }
    next();
});
exports.contextMiddleware = contextMiddleware;
/** Use this to wrap a whole externally-called function (e.g. task handler) in a context.
 * Create a new child context for the namespace, rather than the use the global namespace context.
 * on which values can be set or read. Run all the functions that are called (either directly,
 * or indirectly through asynchronous functions that take callbacks themselves) from the provided callback within the scope of that namespace.
 * The new context is passed as an argument to the callback when it's called.
 * */
function contextWrapper(context_namespace, fn) {
    return (...args) => {
        return context_namespace.run(() => {
            // setContext(...);
            return fn(...args);
        });
    };
}
exports.contextWrapper = contextWrapper;
//# sourceMappingURL=http-context.js.map