import { FiltersValidator } from './FiltersValidators';

describe('FiltersValidator', () => {
  const example = `
  # -*- mode: yaml -*-

  manifest:
    version: 1.0
  
  automations:
  
    gitstream-challenge-16-3-gold:
    # PR have at least 1 test, 5 or less files and branch includes Jira-Ticket prefix
      if:
        - {{ files | match(regex=r/(test|spec)/) | some }}
        - {{ files | length <= 5 }}
        - {{ branch.name | match(regex=r/[A-Z]{2,}-\d+.*/) }} 
        - {{ files | intersection(list=[]) | every }} 
        - {{ files | difference(list=[]) | some }} 
      run:
        - action: add-label@v1
          args:
            label: 'gitStream-gold 🥇'
            color: '#F4EBD0'


  `;

  it('Should validate all filters and their args', () => {
    expect(() =>
      new FiltersValidator().validate({ yamlFile: example })
    ).not.toThrow();
  });
});
