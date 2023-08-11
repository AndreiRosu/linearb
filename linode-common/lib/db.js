'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.embedConnection = exports.testDBConnectionTO = exports.testDBConnection = exports.getConnection = void 0;
const promise_utils_1 = require("./utils/promise-utils");
let global_pg = null;
const getConnection = () => {
    if (!global_pg) {
        throw new Error('No pg initialized');
    }
    return global_pg;
};
exports.getConnection = getConnection;
function testDBConnection() {
    return new Promise(function (resolve, reject) {
        (0, exports.getConnection)()
            .raw('SELECT 1')
            .timeout(10 * 1000, { cancel: true })
            .then(res => resolve(res[0]))
            .catch(function (error) {
            console.error(error);
            reject('fatal error connection db');
        });
    });
}
exports.testDBConnection = testDBConnection;
async function testDBConnectionTO(timeout = 10 * 1000) {
    return (0, promise_utils_1.PromiseTimeout)(timeout, testDBConnection(), 'DB Connection');
}
exports.testDBConnectionTO = testDBConnectionTO;
const embedConnection = pg => {
    global_pg = pg;
};
exports.embedConnection = embedConnection;
//# sourceMappingURL=db.js.map