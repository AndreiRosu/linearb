import _ from 'lodash';

export const buildAmplitudeAccountName = (account: any) => {
  const email = _.get(account, 'email', '');
  const emailParts = email.split('@');
  return emailParts.length === 2 ? emailParts[0] : 'unknown';
};

export const getEmailDashIdUserId = (account: any) =>
  `${buildAmplitudeAccountName(account)}-${account.id}`;

export const getUserTrackingId = (account: any) => {
  let email = _.get(account, 'email', '');
  let userId = getEmailDashIdUserId(account);

  // Condense the user ID and email for cypress integration tests
  if (email.startsWith('_cy-') && email.endsWith('linearb.io')) {
    email = '_cypress_e2e@linearb.io';
    userId = '_cypress_e2e';
  }

  return { userId, email };
};
