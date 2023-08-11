"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setOrgAsTierType = exports.getLicensePlanDefinitions = exports.createLicense = exports.hasPaidLicense = exports.hasValidLicense = exports.getOrganizationLicense = void 0;
const license_model_1 = require("./license.model");
const db_1 = require("../db");
const lodash_1 = __importDefault(require("lodash"));
async function getOrganizationLicense(queryBy) {
    const pg = (0, db_1.getConnection)();
    const query = pg
        .select(pg.raw(`get_repos_left_count(?) AS repos_left`, [queryBy.organization_id]), 'license.*', pg.raw('license_plan.name AS plan_name'), pg.raw('license_plan.tier_type AS plan_tier_type'))
        .from('license')
        .innerJoin('license_plan', function () {
        this.on(`license_plan.id`, '=', `license.plan_id`);
    })
        .where('organization_id', queryBy.organization_id)
        .first();
    return await query;
}
exports.getOrganizationLicense = getOrganizationLicense;
async function hasValidLicense(organization_id) {
    if (organization_id) {
        return (await (0, db_1.getConnection)().raw('select has_valid_license(?) as result', [organization_id]))
            .rows[0]['result'];
    }
    else {
        return Promise.resolve(true);
    }
}
exports.hasValidLicense = hasValidLicense;
async function hasPaidLicense(organization_id) {
    const result = (await (0, db_1.getConnection)().raw('select has_paid_license(?) as result', [organization_id])).rows[0]['result'];
    return result;
}
exports.hasPaidLicense = hasPaidLicense;
async function createLicense(orgId, tierType = license_model_1.TierType.TRIAL) {
    const licensePlan = license_model_1.licensePlans[tierType];
    // temporary till we'll fully support the new license plan
    const plan_id = tierType == license_model_1.TierType.PAID ? 3 : tierType == license_model_1.TierType.TRIAL ? 4 : 1;
    const payload = {
        organization_id: orgId,
        tier_type: tierType,
        plan_id,
        max_repos: licensePlan.maxRepos,
        max_users: licensePlan.maxUsers,
        max_contributors: licensePlan.maxContributors,
        max_custom_dashboards: licensePlan.maxCustomDashboards,
        retention_days: licensePlan.retentionDays,
        backfill_days: licensePlan.backfillDays
    };
    const pg = (0, db_1.getConnection)();
    return (await pg('license').insert(payload, '*'))[0];
}
exports.createLicense = createLicense;
async function getLicensePlanDefinitions() {
    const pg = (0, db_1.getConnection)();
    const query = pg.select('*').from('license_plan');
    return (await query);
}
exports.getLicensePlanDefinitions = getLicensePlanDefinitions;
async function setOrgAsTierType(orgId, tierType, planName) {
    const pg = (0, db_1.getConnection)();
    const licensePlan = license_model_1.licensePlans[tierType];
    const query = 'select change_license(' +
        ':org_id, ' +
        ':new_tier_type, ' +
        ':new_plan_name, ' +
        ':new_max_repos, ' +
        ':new_max_users, ' +
        ':new_max_contributors, ' +
        ':new_retention_days, ' +
        ':new_backfill_days, ' +
        ':new_max_custom_dashboards, ' +
        'false);';
    let bindings = {
        org_id: +orgId,
        new_tier_type: tierType,
        new_plan_name: planName,
        new_max_repos: licensePlan.maxRepos,
        new_max_users: lodash_1.default.isNumber(licensePlan.maxUsers) ? licensePlan.maxUsers : null,
        new_max_contributors: lodash_1.default.isNumber(licensePlan.maxContributors)
            ? licensePlan.maxContributors
            : null,
        new_retention_days: lodash_1.default.isNumber(licensePlan.retentionDays) ? licensePlan.retentionDays : null,
        new_backfill_days: lodash_1.default.isNumber(licensePlan.backfillDays) ? licensePlan.backfillDays : null,
        new_max_custom_dashboards: lodash_1.default.isNumber(licensePlan.maxCustomDashboards)
            ? licensePlan.maxCustomDashboards
            : null
    };
    return (await pg.raw(query, bindings)).rows[0]['change_license'];
}
exports.setOrgAsTierType = setOrgAsTierType;
//# sourceMappingURL=license.service.js.map