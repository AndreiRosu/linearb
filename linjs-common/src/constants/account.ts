export type AccountType = number;

export const ACCOUNT_TYPES_MAP: { [key: string]: AccountType } = {
  Primary: 1,
  Editor: 2,
  SuperUser: 3,
  External: 4,
  Viewer: 5
};

export const ACCOUNT_TYPES_NAMES = {
  [ACCOUNT_TYPES_MAP.Primary]: 'Admin',
  [ACCOUNT_TYPES_MAP.Editor]: 'Editor',
  [ACCOUNT_TYPES_MAP.SuperUser]: 'SuperUser',
  [ACCOUNT_TYPES_MAP.External]: 'External',
  [ACCOUNT_TYPES_MAP.Viewer]: 'Viewer'
};

export const CAN_EDIT_ACCOUNT_TYPES: AccountType[] = [
  ACCOUNT_TYPES_MAP.Primary,
  ACCOUNT_TYPES_MAP.Editor,
  ACCOUNT_TYPES_MAP.SuperUser
];
