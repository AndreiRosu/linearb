export enum DefaultParserAttributes {
  cbLeft = '_GITSTREAM_CB_LEFT_',
  cbRight = '_GITSTREAM_CB_RIGHT_',
  automations = 'automations',
  errors = 'errors',
  analytics = 'analytics',
}

export type Run = { action: string; args?: any };
