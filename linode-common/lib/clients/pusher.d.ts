import Pusher from 'pusher';
export declare const getOrgIdFromChannel: (channelName: any) => any;
export declare class PusherClient {
    pusher: Pusher;
    constructor(pusherOptions: Pusher.Options);
    authenticate(socketId: string, channel: string): Pusher.AuthResponse;
    trigger(organizationId: string, eventName: string, data: any): Pusher.Response;
}
export declare const getPusherClient: (options: Pusher.Options) => PusherClient;
