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
export interface IInvitation {
    id: number;
    organization_id: number;
    inviter_account_id: number;
    invitee_name: string;
    email: string;
    provider_id: string;
    invited_at: string;
    confirmed_at: string;
    account_id: number;
    email_hash: string;
    deleted_at: string;
    sensor_id?: number;
    dismissed_at?: string;
    curr_inviter_account_id?: number;
}
