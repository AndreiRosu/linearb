"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPusherClient = exports.PusherClient = exports.getOrgIdFromChannel = void 0;
const pusher_1 = __importDefault(require("pusher"));
const linjs_common_1 = require("@linearb/linjs-common");
const getOrgIdFromChannel = channelName => channelName.split(linjs_common_1.PUSHER_DEFAULT_CHANNEL_PREFIX)[1];
exports.getOrgIdFromChannel = getOrgIdFromChannel;
class PusherClient {
    constructor(pusherOptions) {
        this.pusher = new pusher_1.default(pusherOptions);
    }
    authenticate(socketId, channel) {
        return this.pusher.authenticate(socketId, channel);
    }
    trigger(organizationId, eventName, data) {
        const channelName = (0, linjs_common_1.generatePusherPrivateChannelName)(organizationId.toString());
        return this.pusher.trigger(channelName, eventName, data);
    }
}
exports.PusherClient = PusherClient;
let pusher;
const getPusherClient = (options) => {
    if (!pusher) {
        pusher = new PusherClient(options);
    }
    return pusher;
};
exports.getPusherClient = getPusherClient;
//# sourceMappingURL=pusher.js.map