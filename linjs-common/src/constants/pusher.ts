export const PUSHER_DEFAULT_CHANNEL_PREFIX = 'private-linearb-';

export const PUSHER_EVENTS = {
  ADD_REPOSITORIES: 'add_repositories'
}

// Generates name for private channels
export const generatePusherPrivateChannelName = (organizationId: string): string => {
  return `${PUSHER_DEFAULT_CHANNEL_PREFIX}${organizationId}`;
}
