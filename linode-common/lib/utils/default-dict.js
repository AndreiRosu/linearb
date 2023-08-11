"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultDict = void 0;
/*
example
const d = new DefaultDict(() => []);
d['a'].push(1, 2, 3);
 */
class DefaultDict extends Object {
    constructor(getDefaultValue, ...objectConstructorArgs) {
        super(objectConstructorArgs);
        if (typeof getDefaultValue !== 'function') {
            throw new Error('getDefaultValue must be a function');
        }
        // eslint-disable-next-line no-constructor-return
        return new Proxy(this, {
            get: function (target, key) {
                if (!Reflect.has(target, key)) {
                    Reflect.set(target, key, getDefaultValue(key));
                }
                return Reflect.get(target, key);
            }
        });
    }
}
exports.DefaultDict = DefaultDict;
//# sourceMappingURL=default-dict.js.map