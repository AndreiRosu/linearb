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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DDBQueryHelper = void 0;
const _ = __importStar(require("lodash"));
class DDBQueryHelper {
    constructor(client, baseParams) {
        this.fdCounter = 0;
        this.dtCounter = 0;
        this.vlCounter = 0;
        this._queryAllAsync = (params, client) => {
            return new Promise(function (resolve, reject) {
                const finalSet = [], nextBatch = function (lek) {
                    params.ExclusiveStartKey = lek;
                    client.query(params, function (err, result) {
                        if (err)
                            return reject(err);
                        if (result.Items.length)
                            finalSet.push.apply(finalSet, result.Items);
                        if (result.LastEvaluatedKey)
                            nextBatch(result.LastEvaluatedKey);
                        else
                            resolve(finalSet);
                    });
                };
                nextBatch(null);
            });
        };
        this._countAllAsync = (params, client) => {
            const paramsCopy = Object.assign({}, params);
            paramsCopy.Select = 'COUNT';
            paramsCopy.ProjectionExpression = null;
            return new Promise(function (resolve, reject) {
                let count = 0;
                const nextBatch = lek => {
                    paramsCopy.ExclusiveStartKey = lek;
                    client.query(paramsCopy, (err, result) => {
                        if (err)
                            return reject(err);
                        count += result.Count;
                        if (result.LastEvaluatedKey)
                            nextBatch(result.LastEvaluatedKey);
                        else
                            resolve(count);
                    });
                };
                nextBatch(null);
            });
        };
        this.client = client;
        this.baseParams = baseParams;
        this.resetFilter();
    }
    addFilterExpression(expression) {
        if (this.params.FilterExpression) {
            this.params.FilterExpression += ' AND ';
        }
        this.params.FilterExpression += `${expression}`;
    }
    resetFilter() {
        this.fdCounter = 0;
        this.dtCounter = 0;
        this.vlCounter = 0;
        this.params = Object.assign({ ExpressionAttributeNames: {}, FilterExpression: '' }, this.baseParams);
        return this;
    }
    extractField(field_name) {
        let ddb_field_name = '';
        field_name.split('.').forEach(f => {
            this.fdCounter += 1;
            const field = `#fd${this.fdCounter}`;
            ddb_field_name += (ddb_field_name ? '.' : '') + field;
            this.params.ExpressionAttributeNames[field] = f;
        });
        return ddb_field_name;
    }
    addNumberRangeClause(field_name, value) {
        const ddb_field_name = this.extractField(field_name);
        let expression = '';
        if (value.gt || value.gt === 0) {
            expression = `${ddb_field_name} >= :val${this.vlCounter + 1}`;
            this.params.ExpressionAttributeValues[`:val${this.vlCounter + 1}`] = value.gt;
            this.vlCounter += 1;
        }
        else if (value.lt || value.lt === 0) {
            expression = `${ddb_field_name} <= :val${this.vlCounter + 1}`;
            this.params.ExpressionAttributeValues[`:val${this.vlCounter + 1}`] = value.lt;
            this.vlCounter += 1;
        }
        else if (value.between) {
            expression = `${ddb_field_name} BETWEEN :val${this.vlCounter + 1} AND :val${this.vlCounter +
                2}`;
            this.params.ExpressionAttributeValues[`:val${this.vlCounter + 1}`] = value.between[0];
            this.params.ExpressionAttributeValues[`:val${this.vlCounter + 2}`] = value.between[1];
            this.vlCounter += 2;
        }
        this.addFilterExpression(expression);
        return this;
    }
    addDateRangeClause(field_name, value, customExpression = null) {
        let expression = '';
        let ddb_field_name = field_name;
        if (!customExpression) {
            ddb_field_name = this.extractField(field_name);
        }
        if (value.before && !value.after) {
            expression = `${ddb_field_name} <= :dt${this.dtCounter + 1}`;
            this.params.ExpressionAttributeValues[`:dt${this.dtCounter + 1}`] = `${value.before}T23:59:59.000Z`;
            this.dtCounter += 1;
        }
        else if (!value.before && value.after) {
            expression = `${ddb_field_name} >= :dt${this.dtCounter + 1}`;
            this.params.ExpressionAttributeValues[`:dt${this.dtCounter + 1}`] = `${value.after}T00:00:00.000Z`;
            this.dtCounter += 1;
        }
        else if (value.before && value.after) {
            expression = `${ddb_field_name} BETWEEN :dt${this.dtCounter + 1} AND :dt${this.dtCounter +
                2}`;
            this.params.ExpressionAttributeValues[`:dt${this.dtCounter + 1}`] = `${value.after}T00:00:00.000Z`;
            this.params.ExpressionAttributeValues[`:dt${this.dtCounter + 2}`] = `${value.before}T23:59:59.000Z`;
            this.dtCounter += 2;
        }
        this.addFilterExpression(customExpression || expression);
        return this;
    }
    addINClause(field_name, values) {
        const ddb_field_name = this.extractField(field_name);
        // We have to do that for IN clause
        const attributeNames = _.range(1, values.length + 1).map(e => {
            this.vlCounter += 1;
            return `:val${this.vlCounter}`;
        });
        const expression = `${ddb_field_name} IN (${attributeNames.join(',')})`;
        attributeNames.forEach((attr, i) => {
            this.params.ExpressionAttributeValues[attr] = values[i];
        });
        this.addFilterExpression(expression);
        return this;
    }
    addINClauseSet(field_name, values) {
        const ddb_field_name = this.extractField(field_name);
        let expression = '';
        const attributeNames = _.range(1, values.length + 1).map(e => {
            this.vlCounter += 1;
            const field_val = `:val${this.vlCounter}`;
            expression += (expression ? ' OR ' : '') + `contains(${ddb_field_name}, ${field_val})`;
            return field_val;
        });
        expression = `(${expression})`;
        attributeNames.forEach((attr, i) => {
            this.params.ExpressionAttributeValues[attr] = values[i];
        });
        this.addFilterExpression(expression);
        return this;
    }
    clearEmptyValues() {
        if (_.isEmpty(this.params.ExpressionAttributeNames)) {
            this.params.ExpressionAttributeNames = null;
        }
        if (_.isEmpty(this.params.FilterExpression)) {
            this.params.FilterExpression = null;
        }
    }
    async query() {
        this.clearEmptyValues();
        return this._queryAllAsync(this.params, this.client);
    }
    async count() {
        this.clearEmptyValues();
        return this._countAllAsync(this.params, this.client);
    }
}
exports.DDBQueryHelper = DDBQueryHelper;
//# sourceMappingURL=ddb-query-helper.js.map