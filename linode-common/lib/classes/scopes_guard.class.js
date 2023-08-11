"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScopesGuard = void 0;
const routing_1 = require("../routing");
class ScopesGuard {
    constructor(accountTypes = []) {
        this.accountTypes = accountTypes;
    }
    guard() {
        return (0, routing_1.allowedAccountTypes)(this.accountTypes);
    }
}
exports.ScopesGuard = ScopesGuard;
//# sourceMappingURL=scopes_guard.class.js.map