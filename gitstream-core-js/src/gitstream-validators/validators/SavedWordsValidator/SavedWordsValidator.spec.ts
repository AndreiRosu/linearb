import { SavedWordsValidator } from './SavedWordsValidator';

describe('SavedWordsValidator', () => {
  it('should throw a ValidationError for invalid custom context variable', () => {
    const yamlFile = `
      source: some_value
    `;
    const args = { yamlFile };
    const validator = new SavedWordsValidator();

    expect(() => validator.validate(args)).toThrowError(
      'Invalid custom context variable: `source` is a built-in context'
    );
  });

  it('should not throw a ValidationError for valid custom context variable', () => {
    const yamlFile = `
    # -*- mode: yaml -*-
    manifest:
      version: 1.0
    automations:
      {% for item in deprecated %}
      # Automation names should be unique, therefore the iteration number postfix
      catch_deprecated_components_{{ loop.index }}:
        if:
          - {{ source.diff.files | reject(attr='new_file', regex=r/\.json$/) | matchDiffLines(regex=item.regex) | some }}
        run:
          - action: add-label@v1
            args:
              label: 'deprecated-component'
          - action: request-changes@v1
            args:
              comment: |
                Please don't use hardcoded values such "{{ item.regex }}", use "EventType/RuleSource" from "constants.py/constants.ts[js]'
      {% endfor %}
    wrong_tests_files:
      - agent/inspector/go.mod
      - agent/inspector/go.sum
    cft_templates_files:
      - resources/app/functions/accounts/agent_cf_template.yml
    exclude_files_from_double_review:
      - r/agent\//aws\//instrumentor\//
      - r/tests\//
      - Dockerfile
    # This list includes the deprecated items
    deprecated:
      - regex: r/^[+]cloudessence.internal/
      - regex: r/^[+].*onboardingRequested\/v1/
    `;
    const args = { yamlFile };
    const validator = new SavedWordsValidator();

    expect(() => validator.validate(args)).not.toThrowError();
  });
});
