"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRedisClient = void 0;
const redis_1 = __importDefault(require("redis"));
const redis_mock_1 = __importDefault(require("redis-mock"));
/*
Params: cache_redis_host, cache_redis_port, cache_redis_db, isMock
*******************
** cache_redis_host
** cache_redis_port
** cache_redis_db
Usually can be found in the env vars: CACHE_REDIS_HOST, CACHE_REDIS_PORT, CACHE_REDIS_DB.
*******************
is not singleton - make sure not to create multiple times.
*******************
** isMock refers to if you wish to mock the redis client (for tests purposes)
Usually assigned to process.env.NODE_ENV == 'test'
*******************
https://github.com/redis/node-redis/tree/v3.1.2
warning, v4 is incompatible and promise based, not callbacks!
Returns redis client
*/
const createRedisClient = (cache_redis_host, cache_redis_port, cache_redis_db, isMock = false, logger = console) => {
    if (isMock) {
        return redis_mock_1.default.createClient();
    }
    else {
        const redisClient = redis_1.default.createClient({
            host: cache_redis_host,
            port: cache_redis_port,
            db: cache_redis_db
        });
        redisClient.on('error', function (err) {
            if (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND') {
                logger.error('The redis server refused the connection. service is unstable', err);
                //server is unstable without redis, must throw it to global scope to handle/exit
                throw err;
            }
            // occurs when error inside redis callback
            logger.error('unhandled exception in redisClient, please fix it quickly', err);
        });
        redisClient.on('ready', function (conn) {
            logger.info('redis connected successfully');
        });
        redisClient.on('reconnecting', function (conn) {
            logger.warn('redis reconnecting');
        });
        return redisClient;
    }
};
exports.createRedisClient = createRedisClient;
//# sourceMappingURL=redisClient.js.map