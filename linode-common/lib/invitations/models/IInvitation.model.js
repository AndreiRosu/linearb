"use strict";
/**
 * @typedef Invitation
 * @property {integer} id.required
 * @property {integer} organization_id - The organization id
 * @property {string} state - The invitation state (pending/confirmed)
 * @property {integer} inviter_account_id - inviter account id
 * @property {string} name.required - Name
 * @property {string} email.required - email
 * @property {date} invited_at.required - creation time
 * @property {date} confirmed_at.required - confirmation time
 * @property {date} deleted_at - deletion time
 * @property {integer} sensor_id - sensor_id for the invitation.
 * @property {date} dismissed_at - dissmissed time (only if the user dismissed the message)
 */
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=IInvitation.model.js.map