export interface RulesEngineError {
  [statusCode: number]: string;
}

export let rulesEngineErrors: RulesEngineError[] = [];
