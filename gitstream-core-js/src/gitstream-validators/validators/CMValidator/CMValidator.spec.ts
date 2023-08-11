import { CMValidator } from './CMValidator';

describe('CMValidator', () => {
  const example = `
  # -*- mode: yaml -*-
  
  manifest:
    version: 1.0
  
  automations:
    safe_changes:
      # Triggered for any changes that only affect formatting, documentation, tests, or images
      if:
        - {{ is.formatting or is.docs or is.tests or is.image }}
      # Apply a safe change label, approve the PR and explain why in a comment.
      run: 
        - action: add-label@v1
          args:
            label: 'safe-change'
        - action: approve@v1
        - action: add-comment@v1
          args:
            comment: |
              This PR is consider d a safe change and has been automatically approved.
  
  # These custom expressions are used in the safe_changes automation
  is:
    formatting: {{ source.diff.files | isFormattingChange }}
    docs: {{ files | allDocs }}
    tests: {{ files | allTests }}
    image: {{ files | allImages }}
  `;

  it('Should parse cm successfully', () => {
    expect(() => new CMValidator().validate(example)).not.toThrow();
  });
});
