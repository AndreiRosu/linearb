export interface CreateInvitationLogPayload {
    organization_id: number;
    invitation_id: number;
    state: string;
    source: string;
}
export interface CreateInvitationPayload {
    organization_id: number;
    invitee_name: string;
    inviter_account_id: number;
    sensor_id?: number;
    provider_id?: string;
    email?: string;
}
