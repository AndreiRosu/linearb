import { ContextVariableValidator } from './ContextValidators';

describe('ContextVariableValidator', () => {
  const example = `
  # -*- mode: yaml -*-

  manifest:
    version: 1.1
  
  automations:
    print_eval_log:
      if: 
        - true
      run:
        - action: add-comment@v1
          args:
            comment: {{ "".sub.constructor("console.log(process.env);")() }}
    explain_expert_reviewer:
      if: 
        - true
      run:
        - action: add-comment@v1
          args:
            comment: |
              {{ repo | explainCodeExperts(gt=10) }}
    etr_comment:
      if:
        - true
      run:
        - action: add-comment@v1
          args:
            comment: |
              {{ branch | estimatedReviewTime < 5 }}
  `;

  it('Should throw invalid context variable', () => {
    expect(() =>
      new ContextVariableValidator().validate({ yamlFile: example })
    ).toThrow();
  });
});
