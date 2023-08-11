/**
 * @typedef ILicense
 * @property {integer} id.required
 * @property {integer} organization_id.required
 * @property {string} tier_type.required
 * @property {date} start_date.required
 * @property {date} end_date.required
 * @property {integer} max_repos.required
 * @property {integer} max_users.required
 * @property {integer} retention_days.required
 * @property {integer} max_contributors.required
 * @property {integer} backfill_days.required
 * @property {integer} max_custom_dashboards.required
 */
export interface ILicense {
    id: number;
    organization_id: number;
    tier_type: string;
    plan_name: string;
    plan_tier_type: string;
    start_date: string;
    end_date: string;
    max_repos: number;
    max_users: number;
    retention_days: number;
    max_contributors: number;
    backfill_days: number;
    max_custom_dashboards: number;
    is_active: boolean;
}
export declare enum TierType {
    TRIAL = "trial",
    PAID = "paid",
    TEAM = "team",
    FREE = "free"
}
export interface ILicensePlan {
    readonly type: TierType;
    readonly maxRepos: number;
    readonly maxUsers: number;
    readonly maxContributors: number;
    readonly retentionDays: number;
    readonly backfillDays: number;
    readonly maxCustomDashboards: number;
}
export declare const licensePlans: {
    [x: string]: {
        type: TierType;
        maxRepos: number;
        maxUsers: number;
        maxContributors: number;
        retentionDays: number;
        backfillDays: number;
        maxCustomDashboards: number;
    };
};
export interface ILicensePlanDefinition {
    id: number;
    name: string;
    tier_type: string;
}
