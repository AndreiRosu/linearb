import { TriggersValidator } from './TriggersValidator';

const example = `# -*- mode: yaml -*-

manifest:
  version: 1.0

automations:
  on:
    - commit
    - pr_created
  explain_code_experts:
    on:
    - commit
    if: 
      - {{ pr.labels | match(term='suggest-reviewer') | some }}
    run:
      - action: explain-code-experts@v1 
        args:
          gt: 10 
`;
describe('FileStructureValidator', () => {
  it('Should validate file schema successfully', () => {
    expect(() =>
      new TriggersValidator().validate({ yamlFile: example })
    ).not.toThrow();
  });
});
