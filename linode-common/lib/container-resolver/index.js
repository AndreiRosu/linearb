"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainerContributorsResolver = void 0;
const _ = __importStar(require("lodash"));
var jp = require('jsonpath');
const EXPIRATION_IN_SECS = 60 * 60 * 8;
__exportStar(require("./contributor.model"), exports);
class ContainerContributorsResolver {
    constructor(organization_id, redisClient, contributorsFetch) {
        this.organization_id = organization_id;
        this.redisClient = redisClient;
        this.contributorsFetch = contributorsFetch;
        this.redisKey = `org:${organization_id}.container-resolver`;
        this.isContainersMapLoaded = false;
        this.map = null;
    }
    getFromCache() {
        return new Promise((resolve, reject) => {
            this.redisClient.get(this.redisKey, (err, data) => {
                if (err) {
                    resolve(null);
                }
                else {
                    resolve(JSON.parse(data));
                }
            });
        });
    }
    saveToCache() {
        return new Promise((resolve, reject) => {
            this.redisClient.set(this.redisKey, JSON.stringify(this.map), 'EX', EXPIRATION_IN_SECS, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    constructContainersMap(contributors) {
        /// This part below builds containerMap , i.e. :
        ///
        /// {
        ///    containerMap: { containerId1: [containedId1, containedId2 ...],
        ///                    containerId2: [containedId4, containedId5 ...] },
        ///    containedMap: { containedId1: containerId1,  containedId2: containerId2}
        return _.reduce(contributors, function (acc, row) {
            if (!row['is_parent'] && row['parent_id']) {
                const containerId = row['parent_id'].toString();
                const containedId = row['id'].toString();
                if (!_.has(acc.containerMap, containerId)) {
                    acc.containerMap[containerId] = [];
                }
                acc.containerMap[containerId].push(row['id']);
                acc.containedMap[containedId] = row['parent_id'];
            }
            return acc;
        }, { containerMap: {}, containedMap: {} });
    }
    async loadContributorsMap() {
        if (await this.isInCache()) {
            this.map = await this.getFromCache();
            return;
        }
        const contributors = await this.getAllContributors();
        this.map = this.constructContainersMap(contributors);
        await this.saveToCache();
        this.isContainersMapLoaded = true;
    }
    async isInCache() {
        return await new Promise((resolve, _) => {
            this.redisClient.get(this.redisKey, (err, data) => {
                if (err || data === null) {
                    resolve(false);
                }
                else {
                    const map = JSON.parse(data);
                    if (Object.keys(map.containerMap).length) {
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                }
            });
        });
    }
    async invalidate() {
        this.isContainersMapLoaded = false;
        this.map = null;
        return await new Promise((resolve, reject) => {
            this.redisClient.del(this.redisKey, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    async getAllContributors() {
        return await this.contributorsFetch();
    }
    isContained(containedId) {
        var _a;
        return _.isNumber(containedId) && _.has((_a = this.map) === null || _a === void 0 ? void 0 : _a.containedMap, containedId);
    }
    getContainedContainer(containedId) {
        var _a;
        return _.isNumber(containedId) && _.has((_a = this.map) === null || _a === void 0 ? void 0 : _a.containedMap, containedId)
            ? this.map.containedMap[containedId.toString()]
            : containedId;
    }
    getContainerContained(containerId) {
        var _a;
        return (_.isNumber(containerId) && _.has((_a = this.map) === null || _a === void 0 ? void 0 : _a.containerMap, containerId)
            ? [containerId, ...this.map.containerMap[containerId.toString()]]
            : containerId);
    }
    async resolveFilter(ids) {
        // Getting list of ids and return the resolved version
        if (!this.isContainersMapLoaded) {
            await this.loadContributorsMap();
        }
        return _.uniq(_.flattenDeep(ids.map(val => {
            if (this.isContained(val)) {
                return this.getContainerContained(this.getContainedContainer(val));
            }
            return this.getContainerContained(val);
        })));
    }
    async resolveObjects(json, json_paths) {
        // Getting bunch of entities (i.e. pull requests, branches - whatever)
        // and list of json-paths where to resolve,
        // i.e. ['$.data.iteration.issues[*].branches[*].contributor_ids', ...]
        if (!this.isContainersMapLoaded) {
            await this.loadContributorsMap();
        }
        json_paths.forEach(path => {
            jp.apply(json, path, val => {
                if (_.isNumber(val)) {
                    return this.getContainedContainer(val);
                }
                else if (_.isArray(val)) {
                    return _.uniq(val.map(id => this.getContainedContainer(id)));
                }
                else if (_.isObject(val) && 'wrapperName' in val) {
                    return _.uniq(val['values'].map(id => this.getContainedContainer(id)));
                }
                else {
                    return val;
                }
            });
        });
    }
}
exports.ContainerContributorsResolver = ContainerContributorsResolver;
//# sourceMappingURL=index.js.map