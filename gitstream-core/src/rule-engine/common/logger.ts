// @ts-nocheck
import axios from 'axios';
import { CLIENT_PAYLOAD, DEBUG_MODE } from './const';

const sendLogToDD = async (logData) => {
  const { ddApiKey, env } = JSON.parse(CLIENT_PAYLOAD);
  const data = {
    ...logData,
    env,
    ddtags: `env:${env}`,
    host: 'gitstream-github-action',
  };
  try {
    const res = await axios({
      method: 'post',
      url: `https://http-intake.logs.datadoghq.com//api/v2/logs?dd-api-key=${ddApiKey}&ddsource=nodejs&service=gitstream-rules-engine`,
      data,
      headers: { 'Content-type': 'application/json' },
    });
    return res;
  } catch (error) {
    console.error(`Failed sending logs to datadog`);
  }
};

export const debug = (message) => {
  if (DEBUG_MODE) {
    console.log(message);
  }
};

export const prepareSendingLogsToDD = async (
  level,
  message,
  payload,
  extraData = {},
  shouldReport = false
) => {
  if (DEBUG_MODE || shouldReport) {
    const { owner, repo, pullRequestNumber, branch, triggeredBy } = payload;
    await sendLogToDD({
      level,
      message,
      data: {
        ...(Object.keys(extraData).length && extraData),
        org: owner,
        repo,
        pullRequestNumber,
        branch,
        triggeredBy,
      },
    });
  }
};
