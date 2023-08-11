"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasOrganizationSpecificPlanName = void 0;
const lodash_1 = __importDefault(require("lodash"));
const license_service_1 = require("./license.service");
async function hasOrganizationSpecificPlanName(organization_id, plan_name) {
    const license = await (0, license_service_1.getOrganizationLicense)({ organization_id });
    return lodash_1.default.get(license, 'plan_name') == plan_name;
}
exports.hasOrganizationSpecificPlanName = hasOrganizationSpecificPlanName;
//# sourceMappingURL=license.util.js.map