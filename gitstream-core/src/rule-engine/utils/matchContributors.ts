// @ts-nocheck
import { prepareSendingLogsToDD } from '../common/logger';

const matchByEmail = (
  contributorEmail,
  providerUserLogin,
  providerUserName
) => {
  if (!contributorEmail || typeof contributorEmail !== 'string') {
    return null;
  }
  let email = contributorEmail.includes('@')
    ? contributorEmail.split('@')[0]
    : contributorEmail;
  email = email?.includes('+') ? email.split('+')[1] : email;
  email = email.replace(/\./g, '');
  return (
    email.includes(providerUserName) ||
    email.includes(providerUserLogin) ||
    providerUserLogin?.includes(email) ||
    providerUserName === email
  );
};

const matchByName = (contributorFullName, providerUserName) => {
  if (
    !providerUserName ||
    !contributorFullName ||
    typeof contributorFullName !== 'string' ||
    typeof providerUserName !== 'string'
  ) {
    return false;
  }
  const formattedProviderName = providerUserName.trim().toLowerCase();
  const formattedGitName = contributorFullName.trim().toLowerCase();
  return formattedGitName?.includes(formattedProviderName);
};

const formatProviderContributors = (providerContributors) =>
  providerContributors
    .map(({ login, name }) => ({ login, name }))
    .filter(({ login, name }) => login || name);

const formatGitContributors = (gitContributors) =>
  Object.keys(gitContributors).map((contributor) => {
    const contributorMap = contributor.split(' ');
    return {
      email: contributorMap.pop(),
      login: contributorMap.join(''),
      name: contributorMap[0],
      lastName: contributorMap[1],
      fullName: contributorMap.join(' '),
      reversedName: (contributorMap[1] || '') + contributorMap[0],
      contributor,
      contributions: gitContributors[contributor],
    };
  });

const getUserMappingFromConfig = async (rules, payload) => {
  try {
    const userMapping =
      rules?.config?.user_mapping?.reduce((acc, authorObject) => {
        const key = Object.keys(authorObject)[0];
        const value = authorObject[key] ?? key;
        return {
          ...acc,
          [key]: value,
        };
      }, {}) || {};
    return userMapping;
  } catch (error) {
    const { owner, repo, pullRequestNumber } = payload;
    await prepareSendingLogsToDD(
      'info',
      `Failed to parse user_mapping for pr ${owner}/${repo}/${pullRequestNumber}`,
      payload,
      { error: e?.message },
      true
    );
    console.log('Failed to parse user_mapping: ', e);
    return {};
  }
};

const matchContributorsFromProviderData = async (
  providerContributors,
  gitContributors,
  payload
) => {
  try {
    const providerContributorsFormatted =
      formatProviderContributors(providerContributors);
    const gitContributorsFormatted = formatGitContributors(gitContributors);
    const matchContributionsList = {};
    let unmachedContributors = [];
    // round 1 - match by git email || match by git login
    gitContributorsFormatted.forEach((contributor) => {
      const match = providerContributorsFormatted.find(({ name, login }) => {
        return (
          matchByEmail(contributor.email, login, name) ||
          matchByName(contributor.login, login)
        );
      });
      if (match) {
        matchContributionsList[contributor.contributor] = match.login;
      } else {
        unmachedContributors.push(contributor);
      }
    });
    const fallback1 = [...unmachedContributors];
    unmachedContributors = [];
    // round 2 - match by git fullName || match by git reversedName
    fallback1.forEach((contributor) => {
      const match = providerContributorsFormatted.find(
        ({ name }) =>
          matchByName(contributor.fullName, name) ||
          matchByName(contributor.reversedName, name)
      );
      if (match) {
        matchContributionsList[contributor.contributor] = match.login;
      } else {
        unmachedContributors.push(contributor);
      }
    });
    // round 3 - no matched provider. keep git signature (contributor)
    unmachedContributors.forEach((contributor) => {
      matchContributionsList[contributor.contributor] = contributor.contributor;
    });
    return matchContributionsList;
  } catch (e) {
    const { owner, repo, pullRequestNumber } = payload;
    await prepareSendingLogsToDD(
      'info',
      `Failed to match contributors for pr: ${owner}/${repo}/${pullRequestNumber}`,
      payload,
      { error: e?.message },
      true
    );
    console.error('Failed to match contributors', e);
    return {};
  }
};

const mergeResults = (configContributors, matchedProviderContributors) =>
  Object.keys(matchedProviderContributors).reduce((acc, authorKey) => {
    return {
      ...acc,
      [authorKey]:
        configContributors[authorKey] ?? matchedProviderContributors[authorKey],
    };
  }, {});

// Example of git object (contributor):
// {
//   email: '<dekel.bayazi@tikalk.com>',
//   login: 'DekelBayazi',
//   name: 'Dekel',
//   lastName: 'Bayazi',
//   fullName: 'Dekel Bayazi',
//   reversedName: 'BayaziDekel',
//   contributor: 'Dekel Bayazi <dekel.bayazi@tikalk.com>',
//   contributions: 1
// }
// ####################################################

// Example of provider object (name, login):
// {
//   login: 'yeelali14',
//   name: 'Yeela Lifshitz'
// }
// ####################################################

export const matchContributors = async (
  providerContributors,
  gitContributors,
  payload,
  rulesObj
) => {
  const { owner, repo, pullRequestNumber } = payload;

  if (!providerContributors || !gitContributors) {
    console.error('matchContributors failed: not provided data');
    return {};
  }

  await prepareSendingLogsToDD(
    'info',
    `Gitstream matchContributors got contributors for pr: ${owner}/${repo}/${pullRequestNumber}`,
    payload,
    { providerContributors, gitContributors },
    true
  );
  const matchContributorsFromProvider = await matchContributorsFromProviderData(
    providerContributors,
    gitContributors,
    payload
  );
  const userMappingFromConfig = await getUserMappingFromConfig(
    rulesObj,
    payload
  );
  if (Object.keys(userMappingFromConfig).length) {
    await prepareSendingLogsToDD(
      'info',
      `got contributors from config for pr: ${owner}/${repo}/${pullRequestNumber}`,
      payload,
      { userMappingFromConfig },
      true
    );

    return mergeResults(userMappingFromConfig, matchContributorsFromProvider);
  }

  return matchContributorsFromProvider;
};
