// @ts-nocheck
import * as core from '@actions/core';
import axios from 'axios';
import { CLIENT_PAYLOAD } from '../common/const';
import { isExecutePlayground } from '..';
import { rulesEngineErrors } from './types';

const callWebhookOnError = async (payload) => {
  const { repo, owner, pullRequestNumber } = payload;
  const { gitlabCustomWebhookToken, webhook_url } = payload || {};
  const body = {
    context: payload,
    status: 'failed',
    repo,
    owner,
    pullRequestNumber,
    webhookEvent: 'checkUpdate',
    event_type: 'gs_custom_checkfail',
  };
  try {
    await axios.post(webhook_url, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json',
        'x-gitlab-token': `${gitlabCustomWebhookToken}`,
        'x-gitlab-event': 'checkUpdate',
      },
    });
  } catch (error) {
    console.error(`Failed sending inner webhook to gitstream-sls-pipeline`);
  }
};
const handleErrorByProvider = {
  github: (message, payload, ruleFile) => {
    const details = {
      message,
      owner: payload?.owner,
      repo: payload?.repo,
      branch: payload?.branch,
    };
    core.setFailed(JSON.stringify(details, null, 2));
  },
  gitlab: async (message, payload, ruleFile) => {
    await callWebhookOnError(payload);
    const decodedMessage = message.replace(/%0A/g, '\n');
    console.error(decodedMessage);
  },
  default: (message) => console.error(message),
};

export const handleValidationErrors = async (
  message,
  statusCode,
  payload,
  ruleFile = ''
) => {
  const fullMessage = ruleFile
    ? `Error in ${ruleFile.trim()} - ${message}`
    : message;
  if (!isExecutePlayground) {
    const clientPayload = JSON.parse(CLIENT_PAYLOAD);
    const { source } = payload || clientPayload || {};
    const getErrorHandlerCb =
      handleErrorByProvider[source] || handleErrorByProvider.default;
    await getErrorHandlerCb(fullMessage, payload, ruleFile);
    process.exit(statusCode);
  } else {
    console.log(`gitstream-core error: ${message}`);
    rulesEngineErrors.push({ [statusCode]: `${message}` });
  }
};
