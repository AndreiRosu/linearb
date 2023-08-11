"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAILGUN_TEMPLATES = exports.INVITATION_SOURCE = exports.INVITATION_STATES = exports.INVITATION_LOG_TABLE = exports.INVITATIONS_TABLE = void 0;
exports.INVITATIONS_TABLE = 'invitation';
exports.INVITATION_LOG_TABLE = 'invitation_log';
exports.INVITATION_STATES = {
    SENT: 'sent',
    IN_PROGRESS: 'in_progress',
    FAILED: 'failed',
    DISMISS: 'dismiss'
};
exports.INVITATION_SOURCE = {
    SLACK_TRIGGER: { LB_INVITE: 'lb_invite', REALTIME_INVITE: 'realtime_invite' },
    LINWEB: 'linweb',
    REMINDER_SERVICE: 'reminder_service',
    ADMIN_EMAIL: 'admin_email',
    USER_REQUEST: 'user_request'
};
exports.MAILGUN_TEMPLATES = {
    REQUEST_INVITATION: 'request-invitation',
    INVITED_TO_JOIN: 'invited_to_join'
};
//# sourceMappingURL=consts.js.map