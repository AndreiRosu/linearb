export interface SonarMetric {
  count: number | null;
  rating: string;
}

export interface Sonar {
  bugs: SonarMetric;
  code_smells: SonarMetric;
  vulnerabilities: SonarMetric;
  security_hotspots: SonarMetric;
  duplications: number | null;
  coverage: number | null;
}
