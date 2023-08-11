export const SONAR_REGEX = {
  BUGS: /\[\d+ Bugs?\]/g,
  VULNERABILITIES: /\[\d+ Vulnerabilit(?:ies|y)\]/g,
  SECURITY_HOTSPOTS: /\[\d+ Security Hotspots?\]/g,
  CODE_SMELL: /\[\d+ Code Smells?\]/g,
  DUPLICATIONS: /\[(\d+(\.\d+)?|\.\d+)%\]/g,
  COVERAGE: /\[(\d+(\.\d+)?|\.\d+)%\]/g,
  RATING: /!\[([A-Z])\]/g,
};

export const getSonarPropertyRating = (str: string): string => {
  const rawRating = str.match(SONAR_REGEX.RATING)?.[0];
  const rating = rawRating?.substring(
    rawRating.lastIndexOf('[') + 1,
    rawRating.indexOf(']')
  );
  return rating ? rating : '';
};

export const getSonarPropertyCount = (
  row: string,
  regex: any,
  isFloat: boolean = false
): number | null => {
  const count =
    (isFloat
      ? parseFloat(row.match(regex)?.[0].split(/\s+/)[0].replace('[', '') || '')
      : parseInt(
          row.match(regex)?.[0].split(/\s+/)[0].replace('[', '') || ''
        )) ?? null;
  return isNaN(count) ? null : count;
};
