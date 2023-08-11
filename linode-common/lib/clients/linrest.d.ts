import { AxiosInstance, AxiosResponse } from 'axios';
import { IAccount } from '../account';
import { IInvitation } from '../invitations';
export interface ILinrestClientConfig {
    linrestServiceUrl: string;
    logger: any;
    linb_self_service_id?: string;
}
export declare class LinrestClient {
    instance: AxiosInstance;
    constructor(clientConfig: ILinrestClientConfig);
    getTeam(organizationId: any, teamId: any): Promise<AxiosResponse>;
    getTeams(organizationId: any): Promise<AxiosResponse>;
    getTeamsNonLean(organizationId: any, queryParams: any): Promise<AxiosResponse>;
    getTeamNonLean(organizationId: any, teamId: any, queryParams: any): Promise<AxiosResponse>;
    getLinkedAccount(queryParams: any): Promise<AxiosResponse>;
    deleteLinkedAccount(queryParams: any): Promise<AxiosResponse>;
    searchSensorAuthorization(queryParams: any): Promise<AxiosResponse>;
    sendInvitationReminder(invitation: IInvitation, invitationType: string): Promise<AxiosResponse>;
    dismissInvitation(invitation: IInvitation, invitationType: string): Promise<AxiosResponse>;
    getAccount(id: number): Promise<AxiosResponse>;
    updateAccount(id: number, payload: Partial<IAccount>): Promise<AxiosResponse>;
}
