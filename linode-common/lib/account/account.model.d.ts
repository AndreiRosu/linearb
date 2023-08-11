/**
 * @typedef Account
 * @property {integer} id.required
 * @property {integer} organization_id - The organization id
 * @property {integer} type_id.required - The type id (Free / Paid)
 * @property {string} name.required - Name
 * @property {string} email.required - email
 * @property {date} created_at.required - creation time
 * @property {date} updated_at.required - update time
 * @property {date} deleted_at - deletion time
 * @property {boolean} is_multi_org - is_multi_org
 */
export interface IAccount {
    id: number;
    organization_id: number;
    type_id: number;
    name: string;
    email: string;
    avatar_url: string;
    settings: any;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    last_logged_in_at: string;
    is_multi_org: boolean;
    gdpr_consent_ts?: string;
    backoffice_scopes?: string[];
}
