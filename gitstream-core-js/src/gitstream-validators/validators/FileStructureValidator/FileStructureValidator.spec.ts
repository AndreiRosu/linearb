import { FileStructureValidator } from './FileStructureValidator';

const example = `# -*- mode: yaml -*-
manifest:
  version: 1.0
on:
  - commit
config:
  admin:
    users: ['popeye', 'yeela']
  ignore_files:
    - 'yarn.lock'
    - 'package-lock.json'
    - 'openapi.json'
    - 'ui/src/**/*Model.d.ts'
  ignore_repositories:
    - services
    - common
  user_mapping:
    - 'Popeye Man <popeye@invalid.com>': 'popeye-the-salyor-man'
    - 'Popeye Man <popeye2@invalid.com>': 'popeye-the-salyor-man' 
    - 'olive <olive@invalid.com>': null

automations:
  suggest_code_experts:
    on:
      - label_added
    if: 
      - {{ pr.labels | match(term='suggest-reviewer') | some }}
    run:
      - action: explain-code-experts@v1
        args:
          gt: 10

  approve_safe_changes:
    if:
      - {{ is.formatting or is.docs or is.image }}
    run: 
      - action: approve@v1
`;
describe('FileStructureValidator', () => {
  it('Should validate file schema successfully', () => {
    expect(() =>
      new FileStructureValidator().validate({ yamlFile: example })
    ).not.toThrow();
  });
});
