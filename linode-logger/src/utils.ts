import { URL } from 'url';

export const FIELDS_TO_OMIT = [
  'authorization',
  'token',
  'password',
  'code',
  'pass',
  'key',
  'access_token',
  'access_token_secret',
  'refresh_token',
  'accessToken',
  'refreshToken',
  'cookie'
];

export const StringifyReplacer = (circular = true, omitFields = true) => {
  const seen = new WeakSet(); //week reference for quick gc
  return (key, value) => {
    if (circular && typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        console.error(`Circular Object key detected: ${key}`);
        return '#CircularRefParentObject';
      }
      seen.add(value);
    }
    if (omitFields && FIELDS_TO_OMIT.includes(key) && typeof value === 'string')
      return value.substring(0, 3) + '*****' + value.slice(-1);

    return value;
  };
};

export const SafeStringifyReplacer = (
  obj: any,
  omit?: boolean | undefined,
  space?: string | number | undefined
): string => {
  try {
    return JSON.stringify(obj, StringifyReplacer(false, omit), space);
  } catch (e) {
    return JSON.stringify(obj, StringifyReplacer(true, omit), space);
  }
};

export const parseURL = (url: string) => {
  try {
    let parsedUrl = new URL(url);
    let dict = {};
    parsedUrl.searchParams.forEach((value, key) => {
      if (dict[key]) {
        dict[key].push(value);
      } else {
        dict[key] = [value];
      }
    });
    // reassign query as old url.parse
    parsedUrl['query'] = dict;
    return parsedUrl;
  } catch (e) {
    return {};
  }
};
