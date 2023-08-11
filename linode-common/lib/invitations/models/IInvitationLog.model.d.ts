/**
 * @typedef InvitationLog
 * @property {integer} id.required
 * @property {integer} invitation_id.required
 * @property {integer} organization_id - The organization id
 * @property {string} state - The invitation state
 * @property {string} initializer - The log initializer
 * @property {date} created_at.required - creation time
 */
export interface IInvitationLog {
    id: number;
    organization_id: number;
    created_at: string;
    invitation_id: number;
    state: string;
    initializer: string;
}
