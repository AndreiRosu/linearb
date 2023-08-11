export interface filterArgs {
  term: string;
  regex: string;
  list: string[];
  attr?: string;
}

export interface matchDiffLinesArgs {
  regex: string;
  ignoreWhiteSpaces: boolean;
}

export interface rankByLinesArgs {
  gt: number;
  lt: number;
}

export interface rankByGitActivityArgs {
  gt: number;
  lt: number;
  weeks: number;
}

export interface Contributors {
  [contributor: string]: number;
}

export interface FileMetric {
  [fileName: string]: Metric;
}

export interface Metric {
  [name: string]: number;
}

export interface Activity {
  [fileName: string]: { [authorName: string]: { [week: string]: number } };
}

export interface ExplainObject {
  [name: string]: string;
}

export interface ActivityExplain {
  [fileName: string]: {
    [authorName: string]: {
      [month: string]: { additions: number; deletions: number };
    };
  };
}

export interface ProviderFormating {
  [name: string]: string;
}

export interface FiltersUsage {
  [filterName: string]: { args: any[] };
}

export interface EnumArgs {
  [key: string]: any;
}
