export declare const DATE_FORMAT = "YYYY-MM-DD";
export declare enum AUDIT_CATEGORY {
    SETTINGS = "settings",
    TEAM = "team",
    AUTH = "auth",
    ISSUES = "issues"
}
export declare enum AUDIT_SUB_CATEGORY {
    SIGN_IN = "sign_in",
    CREATE = "create",
    UPDATE = "update",
    DELETE = "delete"
}
export declare enum AUDIT_TYPE {
    USER = "U",
    SYSTEM = "S"
}
export interface IAuditMessage {
    organization_id: number;
    category: AUDIT_CATEGORY;
    type: AUDIT_TYPE;
    sub_category?: AUDIT_SUB_CATEGORY;
    account_id?: number;
    repository_id?: number;
    team_id?: number;
    description?: string;
    metadata?: any;
}
export declare function sendAuditMessage({ organization_id, category, type, sub_category, description, metadata, account_id, repository_id, team_id }: IAuditMessage, logger: any, auditSnsClient: any): Promise<void>;
