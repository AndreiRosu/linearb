"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromiseTimeout = exports.delay = void 0;
function delay(ms) {
    /**
     * delay without blocking the event loop
     */
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.delay = delay;
const PromiseTimeout = function (timeout, promise, name) {
    return Promise.race([
        promise,
        new Promise(function (resolve, reject) {
            setTimeout(function () {
                reject(`${name} Timed out`);
            }, timeout);
        })
    ]);
};
exports.PromiseTimeout = PromiseTimeout;
//# sourceMappingURL=promise-utils.js.map