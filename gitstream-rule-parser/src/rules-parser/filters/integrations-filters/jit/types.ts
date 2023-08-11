export interface IJitVulnerability {
  security_control: string;
  type: string;
  description: string;
  severity: string;
  summary: string;
}

export interface IjitMetrics {
  HIGH: number | null;
  MEDIUM: number | null;
  LOW: number | null;
  INFO: number | null;
}

export type Severity = 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';

export interface Jit {
  vulnerabilities: IJitVulnerability[];
  metrics: IjitMetrics;
}
