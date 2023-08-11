"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.licensePlans = exports.TierType = void 0;
var TierType;
(function (TierType) {
    TierType["TRIAL"] = "trial";
    TierType["PAID"] = "paid";
    TierType["TEAM"] = "team";
    TierType["FREE"] = "free";
})(TierType = exports.TierType || (exports.TierType = {}));
exports.licensePlans = {
    [TierType.TRIAL.toString()]: {
        type: TierType.TRIAL,
        maxRepos: 50,
        maxUsers: undefined,
        maxContributors: undefined,
        retentionDays: undefined,
        backfillDays: 90,
        maxCustomDashboards: 50
    },
    [TierType.PAID.toString()]: {
        type: TierType.PAID,
        maxRepos: 100,
        maxUsers: undefined,
        maxContributors: undefined,
        retentionDays: undefined,
        backfillDays: 90,
        maxCustomDashboards: 100
    },
    [TierType.TEAM.toString()]: {
        type: TierType.TEAM,
        maxRepos: 50,
        maxUsers: 10,
        maxContributors: 8,
        retentionDays: 45,
        backfillDays: 45,
        maxCustomDashboards: 4
    },
    [TierType.FREE.toString()]: {
        type: TierType.TEAM,
        maxRepos: 50,
        maxUsers: 10,
        maxContributors: 8,
        retentionDays: 45,
        backfillDays: 45,
        maxCustomDashboards: 4
    }
};
//# sourceMappingURL=license.model.js.map