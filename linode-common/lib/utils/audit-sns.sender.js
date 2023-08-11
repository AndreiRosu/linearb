"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAuditMessage = exports.AUDIT_TYPE = exports.AUDIT_SUB_CATEGORY = exports.AUDIT_CATEGORY = exports.DATE_FORMAT = void 0;
exports.DATE_FORMAT = 'YYYY-MM-DD';
var AUDIT_CATEGORY;
(function (AUDIT_CATEGORY) {
    AUDIT_CATEGORY["SETTINGS"] = "settings";
    AUDIT_CATEGORY["TEAM"] = "team";
    AUDIT_CATEGORY["AUTH"] = "auth";
    AUDIT_CATEGORY["ISSUES"] = "issues";
})(AUDIT_CATEGORY = exports.AUDIT_CATEGORY || (exports.AUDIT_CATEGORY = {}));
var AUDIT_SUB_CATEGORY;
(function (AUDIT_SUB_CATEGORY) {
    AUDIT_SUB_CATEGORY["SIGN_IN"] = "sign_in";
    AUDIT_SUB_CATEGORY["CREATE"] = "create";
    AUDIT_SUB_CATEGORY["UPDATE"] = "update";
    AUDIT_SUB_CATEGORY["DELETE"] = "delete";
})(AUDIT_SUB_CATEGORY = exports.AUDIT_SUB_CATEGORY || (exports.AUDIT_SUB_CATEGORY = {}));
var AUDIT_TYPE;
(function (AUDIT_TYPE) {
    AUDIT_TYPE["USER"] = "U";
    AUDIT_TYPE["SYSTEM"] = "S";
})(AUDIT_TYPE = exports.AUDIT_TYPE || (exports.AUDIT_TYPE = {}));
async function sendAuditMessage({ organization_id, category, type, sub_category, description, metadata, account_id, repository_id, team_id }, logger, auditSnsClient) {
    try {
        const event = {
            Message: JSON.stringify(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ organization_id: Number(organization_id), created_at: new Date().toISOString(), category,
                type }, (sub_category ? { sub_category } : {})), (description ? { description } : {})), (metadata ? { metadata } : {})), (account_id ? { account_id: Number(account_id) } : {})), (repository_id ? { repository_id: Number(repository_id) } : {})), (team_id ? { team_id: Number(team_id) } : {})))
        };
        const response = await auditSnsClient.dispatchEvent(event);
        logger.debug('audit message published', response);
    }
    catch (error) {
        logger.error('audit message failed', error);
    }
}
exports.sendAuditMessage = sendAuditMessage;
//# sourceMappingURL=audit-sns.sender.js.map