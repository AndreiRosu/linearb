export declare const INVITATIONS_TABLE = "invitation";
export declare const INVITATION_LOG_TABLE = "invitation_log";
export declare const INVITATION_STATES: {
    SENT: string;
    IN_PROGRESS: string;
    FAILED: string;
    DISMISS: string;
};
export declare const INVITATION_SOURCE: {
    SLACK_TRIGGER: {
        LB_INVITE: string;
        REALTIME_INVITE: string;
    };
    LINWEB: string;
    REMINDER_SERVICE: string;
    ADMIN_EMAIL: string;
    USER_REQUEST: string;
};
export declare const MAILGUN_TEMPLATES: {
    REQUEST_INVITATION: string;
    INVITED_TO_JOIN: string;
};
