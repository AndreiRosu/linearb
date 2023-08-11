import { load, loadAll, JSON_SCHEMA } from 'js-yaml';
import Ajv from 'ajv';

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct.bind();
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;
  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;
    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);
      _cache.set(Class, Wrapper);
    }
    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };
  return _wrapNativeSuper(Class);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);
  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var _SUPPORTED_ARGUMENTS_, _REQUIRED_ARGUMENTS_B, _VALID_ACTIONS;
var SUPPORTED_TRIGGERS = {
  COMMIT: 'commit',
  PR_CREATED: 'pr_created',
  COMMENT_ADDED: 'comment_added',
  LABEL_ADDED: 'label_added',
  LABEL_REMOVED: 'label_removed'
};
var SUPPORTED_ACTIONS = {
  EXPLAIN_CODE_EXPERTS: 'explain-code-experts@v1',
  ADD_COMMENT: 'add-comment@v1',
  ADD_LABEL: 'add-label@v1',
  ADD_LABELS: 'add-labels@v1',
  ADD_REVIEWERS: 'add-reviewers@v1',
  APPROVE: 'approve@v1',
  MERGE: 'merge@v1',
  SET_REQUIRED_APPROVALS: 'set-required-approvals@v1',
  REQUIRE_REVIEWER: 'require-reviewers@v1',
  REQUEST_CHANGES: 'request-changes@v1',
  UPDATE_CHECK: 'update-check@v1',
  CLOSE: 'close@v1',
  HTTP_REQUEST: 'http-request@v1',
  INVOKE_GITHUB_ACTION: 'invoke-github-action@v1'
};
var SUPPORTED_ACTIONS_BY_PROVIDER = {
  "default": SUPPORTED_ACTIONS,
  gitlab: {
    ADD_COMMENT: 'add-comment@v1',
    ADD_LABEL: 'add-label@v1',
    ADD_LABELS: 'add-labels@v1',
    ADD_REVIEWERS: 'add-reviewers@v1',
    APPROVE: 'approve@v1',
    MERGE: 'merge@v1',
    CLOSE: 'close@v1',
    EXPLAIN_CODE_EXPERTS: 'explain-code-experts@v1'
  }
};
var SUPPORTED_ARGUMENTS_BY_ACTION = (_SUPPORTED_ARGUMENTS_ = {}, _SUPPORTED_ARGUMENTS_[SUPPORTED_ACTIONS.EXPLAIN_CODE_EXPERTS] = ['lt', 'gt'], _SUPPORTED_ARGUMENTS_[SUPPORTED_ACTIONS.ADD_COMMENT] = ['comment', 'pin_uid'], _SUPPORTED_ARGUMENTS_[SUPPORTED_ACTIONS.ADD_LABEL] = ['label', 'color'], _SUPPORTED_ARGUMENTS_[SUPPORTED_ACTIONS.ADD_LABELS] = ['labels'], _SUPPORTED_ARGUMENTS_[SUPPORTED_ACTIONS.ADD_REVIEWERS] = ['reviewers', 'team_reviewers', 'unless_reviewers_set', 'fail_on_error'], _SUPPORTED_ARGUMENTS_[SUPPORTED_ACTIONS.MERGE] = ['wait_for_all_checks', 'rebase_on_merge', 'squash_on_merge'], _SUPPORTED_ARGUMENTS_[SUPPORTED_ACTIONS.SET_REQUIRED_APPROVALS] = ['approvals'], _SUPPORTED_ARGUMENTS_[SUPPORTED_ACTIONS.REQUEST_CHANGES] = ['comment'], _SUPPORTED_ARGUMENTS_[SUPPORTED_ACTIONS.REQUIRE_REVIEWER] = ['reviewers', 'also_assign', 'team_reviewers', 'fail_on_error'], _SUPPORTED_ARGUMENTS_[SUPPORTED_ACTIONS.HTTP_REQUEST] = ['url', 'method', 'user', 'body', 'timeout', 'headers'], _SUPPORTED_ARGUMENTS_[SUPPORTED_ACTIONS.INVOKE_GITHUB_ACTION] = ['owner', 'repo', 'workflow', 'ref', 'inputs', 'check_name'], _SUPPORTED_ARGUMENTS_[SUPPORTED_ACTIONS.UPDATE_CHECK] = ['check_name', 'status', 'conclusion'], _SUPPORTED_ARGUMENTS_);
var REQUIRED_ARGUMENTS_BY_ACTIONS = (_REQUIRED_ARGUMENTS_B = {}, _REQUIRED_ARGUMENTS_B[SUPPORTED_ACTIONS.EXPLAIN_CODE_EXPERTS] = {
  all: false,
  args: ['lt', 'gt']
}, _REQUIRED_ARGUMENTS_B[SUPPORTED_ACTIONS.ADD_COMMENT] = {
  all: true,
  args: ['comment']
}, _REQUIRED_ARGUMENTS_B[SUPPORTED_ACTIONS.ADD_LABEL] = {
  all: true,
  args: ['label']
}, _REQUIRED_ARGUMENTS_B[SUPPORTED_ACTIONS.ADD_LABELS] = {
  all: true,
  args: ['labels']
}, _REQUIRED_ARGUMENTS_B[SUPPORTED_ACTIONS.ADD_REVIEWERS] = {
  all: false,
  args: ['reviewers', 'team_reviewers']
}, _REQUIRED_ARGUMENTS_B[SUPPORTED_ACTIONS.SET_REQUIRED_APPROVALS] = {
  all: true,
  args: ['approvals']
}, _REQUIRED_ARGUMENTS_B[SUPPORTED_ACTIONS.REQUEST_CHANGES] = {
  all: true,
  args: ['comment']
}, _REQUIRED_ARGUMENTS_B[SUPPORTED_ACTIONS.REQUIRE_REVIEWER] = {
  all: false,
  args: ['reviewers', 'team_reviewers']
}, _REQUIRED_ARGUMENTS_B[SUPPORTED_ACTIONS.HTTP_REQUEST] = {
  all: true,
  args: ['url']
}, _REQUIRED_ARGUMENTS_B[SUPPORTED_ACTIONS.INVOKE_GITHUB_ACTION] = {
  all: false,
  args: ['owner', 'repo', 'workflow', 'ref']
}, _REQUIRED_ARGUMENTS_B[SUPPORTED_ACTIONS.UPDATE_CHECK] = {
  all: true,
  args: ['check_name', 'status', 'conclusion']
}, _REQUIRED_ARGUMENTS_B);
var VALID_CONTEXT_VARS = ['branch', 'branch.name', 'branch.base', 'branch.diff.size', 'branch.diff.files_metadata', 'branch.num_of_commits', 'files', 'pr', 'pr.approvals', 'pr.author', 'pr.author_teams', 'pr.checks', 'pr.comments', 'pr.conversations', 'pr.created_at', 'pr.draft', 'pr.description', 'pr.labels', 'pr.provider', 'pr.reviewers', 'pr.status', 'pr.target', 'pr.title', 'pr.requested_changes', 'pr.reviews', 'pr.updated_at', 'repo', 'repo.git_activity', 'repo.age', 'repo.author_age', 'repo.blame', 'repo.contributors', 'repo.name', 'repo.owner', 'source', 'source.diff.files'];
var VALID_FILTERS = {
  every: ['list'],
  filter: ['list', 'regex', 'term'],
  includes: ['list', 'regex', 'term'],
  map: ['list', 'attr'],
  match: ['list', 'regex', 'term', 'attr'],
  nope: [],
  reject: ['list', 'regex', 'term'],
  some: ['list'],
  allDocs: [],
  allImages: [],
  allTests: [],
  codeExperts: ['gt', 'lt'],
  estimatedReviewTime: [],
  extensions: [],
  extractJitFindings: [],
  extractSonarFindings: [],
  explainCodeExperts: ['gt', 'lt'],
  explainRankByGitBlame: ['gt', 'lt'],
  isFirstCommit: [],
  isFormattingChange: [],
  mapToEnum: [],
  matchDiffLines: ['regex', 'ignoreWhiteSpaces'],
  rankByGitActivity: ['gt', 'lt'],
  rankByGitBlame: ['gt', 'lt'],
  intersection: ['list'],
  difference: ['list']
};
var JINJA_FILTERS = ['abs', 'attr', 'batch', 'capitalize', 'center', 'default', 'dictsort', 'escape', 'filesizeformat', 'first', 'float', 'forceescape', 'format', 'groupby', 'indent', 'int', 'join', 'last', 'length', 'list', 'lower', 'map', 'max', 'min', 'pprint', 'random', 'reject', 'rejectattr', 'replace', 'reverse', 'round', 'safe', 'select', 'selectattr', 'slice', 'sort', 'split', 'string', 'striptags', 'sum', 'title', 'trim', 'truncate', 'unique', 'upper', 'urlencode', 'urlize', 'wordcount', 'wordwrap', 'xmlattr', 'nl2br', 'dump'];
var VALID_VERSIONS = [1.0];
var VALID_ACTIONS = (_VALID_ACTIONS = {}, _VALID_ACTIONS[SUPPORTED_ACTIONS.ADD_COMMENT] = {
  comment: {
    type: 'string',
    required: true
  }
}, _VALID_ACTIONS[SUPPORTED_ACTIONS.ADD_LABEL] = {
  label: {
    type: 'string',
    required: true
  },
  color: {
    type: 'string',
    required: false
  }
}, _VALID_ACTIONS[SUPPORTED_ACTIONS.ADD_LABELS] = {
  labels: {
    type: 'array',
    required: true
  }
}, _VALID_ACTIONS[SUPPORTED_ACTIONS.ADD_REVIEWERS] = {
  reviewers: {
    type: 'array',
    required: true
  },
  team_reviewers: {
    type: 'array',
    required: false
  },
  unless_reviewers_set: {
    type: 'boolean',
    required: false
  },
  fail_on_error: {
    type: 'boolean',
    required: false
  }
}, _VALID_ACTIONS[SUPPORTED_ACTIONS.APPROVE] = {}, _VALID_ACTIONS[SUPPORTED_ACTIONS.CLOSE] = {}, _VALID_ACTIONS[SUPPORTED_ACTIONS.MERGE] = {
  wait_for_all_checks: {
    type: 'boolean',
    required: false
  },
  rebase_on_merge: {
    type: 'boolean',
    required: false
  },
  squash_on_merge: {
    type: 'boolean',
    required: false
  }
}, _VALID_ACTIONS[SUPPORTED_ACTIONS.SET_REQUIRED_APPROVALS] = {
  approvals: {
    type: 'number',
    required: true
  }
}, _VALID_ACTIONS[SUPPORTED_ACTIONS.REQUEST_CHANGES] = {
  comment: {
    type: 'string',
    required: true
  }
}, _VALID_ACTIONS[SUPPORTED_ACTIONS.REQUIRE_REVIEWER] = {
  reviewers: {
    type: 'array',
    required: true
  },
  also_assign: {
    type: 'boolean',
    required: false
  }
}, _VALID_ACTIONS[SUPPORTED_ACTIONS.EXPLAIN_CODE_EXPERTS] = {
  lt: {
    type: 'number',
    required: false
  },
  gt: {
    type: 'number',
    required: false
  }
}, _VALID_ACTIONS[SUPPORTED_ACTIONS.INVOKE_GITHUB_ACTION] = {
  owner: {
    type: 'string',
    required: true
  },
  repo: {
    type: 'string',
    required: true
  },
  workflow: {
    type: 'string',
    required: true
  },
  ref: {
    type: 'string',
    required: true
  },
  inputs: {
    type: 'number',
    required: false
  },
  check_name: {
    type: 'string',
    required: false
  }
}, _VALID_ACTIONS);
var CM_SCHEMA = {
  type: 'object',
  properties: {
    manifest: {
      type: 'object',
      properties: {
        version: {
          type: 'number',
          "enum": VALID_VERSIONS
        }
      },
      required: ['version']
    },
    config: {
      type: 'object',
      properties: {
        ignore_files: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        ignore_repositories: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        // user_mapping: { type: 'array', items: { type: 'array' } },
        admin: {
          type: 'object',
          properties: {
            users: {
              type: 'array',
              items: {
                type: 'string'
              }
            }
          }
        }
      }
    },
    on: {
      type: 'array',
      items: {
        type: 'string',
        "enum": /*#__PURE__*/Object.values(SUPPORTED_TRIGGERS)
      }
    },
    automations: {
      type: 'object',
      patternProperties: {
        '^[a-zA-Z0-9_@]+$': {
          type: 'object',
          properties: {
            on: {
              type: 'array',
              items: {
                type: 'string',
                "enum": /*#__PURE__*/Object.values(SUPPORTED_TRIGGERS)
              }
            },
            "if": {
              type: 'array'
            },
            run: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  action: {
                    type: 'string',
                    "enum": /*#__PURE__*/Object.keys(VALID_ACTIONS)
                  },
                  args: {
                    type: 'object'
                  }
                },
                required: ['action']
              }
            }
          },
          required: ['if', 'run']
        }
      }
    }
  },
  required: ['manifest', 'automations']
};
var JINJA_EXPRESSION_REGEX = /{{.*?}}/g;
var REGEX_EXPRESSION = /\/(.*?)\//g;

var _const = {
  __proto__: null,
  SUPPORTED_TRIGGERS: SUPPORTED_TRIGGERS,
  SUPPORTED_ACTIONS: SUPPORTED_ACTIONS,
  SUPPORTED_ACTIONS_BY_PROVIDER: SUPPORTED_ACTIONS_BY_PROVIDER,
  SUPPORTED_ARGUMENTS_BY_ACTION: SUPPORTED_ARGUMENTS_BY_ACTION,
  REQUIRED_ARGUMENTS_BY_ACTIONS: REQUIRED_ARGUMENTS_BY_ACTIONS,
  VALID_CONTEXT_VARS: VALID_CONTEXT_VARS,
  VALID_FILTERS: VALID_FILTERS,
  JINJA_FILTERS: JINJA_FILTERS,
  VALID_VERSIONS: VALID_VERSIONS,
  VALID_ACTIONS: VALID_ACTIONS,
  CM_SCHEMA: CM_SCHEMA,
  JINJA_EXPRESSION_REGEX: JINJA_EXPRESSION_REGEX,
  REGEX_EXPRESSION: REGEX_EXPRESSION
};

var ValidatorBase = /*#__PURE__*/function () {
  function ValidatorBase() {}
  var _proto = ValidatorBase.prototype;
  _proto.validate = function validate(_args) {
    throw new Error('Abstract method "validate" must be implemented.');
  };
  ValidatorBase.parseJinjaExpressions = function parseJinjaExpressions(cmFile) {
    var lines = cmFile.split('\n');
    var jinjaExpressions = [];
    lines.forEach(function (line, i) {
      var matches = line.match(JINJA_EXPRESSION_REGEX);
      if (matches) {
        matches.forEach(function (match) {
          jinjaExpressions.push({
            expression: match,
            lineNumber: i + 1
          });
        });
      }
    });
    return jinjaExpressions;
  };
  return ValidatorBase;
}();

var ValidationError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(ValidationError, _Error);
  function ValidationError(message) {
    var _this;
    _this = _Error.call(this, message) || this;
    _this.name = 'ValidationError';
    return _this;
  }
  return ValidationError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

var UNKNOWN_CONTEXT = 'UNKNOWN_CONTEXT';
var ContextVariableValidator = /*#__PURE__*/function (_ValidatorBase) {
  _inheritsLoose(ContextVariableValidator, _ValidatorBase);
  function ContextVariableValidator() {
    return _ValidatorBase.apply(this, arguments) || this;
  }
  var _proto = ContextVariableValidator.prototype;
  _proto.isValidCustomVariables = function isValidCustomVariables(customVariable, yamlFile) {
    var customs = customVariable.split('.').slice(0, -1);
    return customs.map(function (custom) {
      return custom.replace(/[()]/g, '');
    }).every(function (custom) {
      return yamlFile.includes(custom + ":");
    });
  };
  _proto.isValidContextVariable = function isValidContextVariable(contextVariable) {
    if (!VALID_CONTEXT_VARS.includes(contextVariable || UNKNOWN_CONTEXT)) {
      return false;
    }
    return true;
  };
  _proto.validate = function validate(args) {
    var _this = this;
    var expressions = args.expressions,
      yamlFile = args.yamlFile;
    var expressionsFromCM = expressions != null ? expressions : ValidatorBase.parseJinjaExpressions(yamlFile);
    expressionsFromCM.forEach(function (_ref) {
      var _exspressionFilters$s, _exspressionFilters$s2, _contextVariable$spli;
      var expression = _ref.expression,
        lineNumber = _ref.lineNumber;
      var exspressionFilters = expression.replace(/[{}]/g, '').split('|');
      var contextVariable = (_exspressionFilters$s = (_exspressionFilters$s2 = exspressionFilters.shift()) == null ? void 0 : _exspressionFilters$s2.trim()) != null ? _exspressionFilters$s : UNKNOWN_CONTEXT;
      var multipleVariable = (_contextVariable$spli = contextVariable == null ? void 0 : contextVariable.split(' ')) != null ? _contextVariable$spli : [];
      multipleVariable.forEach(function (variable) {
        if (!_this.isValidContextVariable(variable) && !_this.isValidCustomVariables(variable, yamlFile)) {
          throw new ValidationError("Line [" + lineNumber + "]: Invalid context variable " + variable + " in expression " + expression);
        }
      });
    });
  };
  return ContextVariableValidator;
}(ValidatorBase);

var FiltersValidator = /*#__PURE__*/function (_ValidatorBase) {
  _inheritsLoose(FiltersValidator, _ValidatorBase);
  function FiltersValidator() {
    return _ValidatorBase.apply(this, arguments) || this;
  }
  var _proto = FiltersValidator.prototype;
  _proto.validateExistingFilter = function validateExistingFilter(filterName, lineNumber, expression) {
    if (JINJA_FILTERS.includes(filterName) || VALID_CONTEXT_VARS.includes(filterName)) {
      return;
    }
    if (!Object.keys(VALID_FILTERS).includes(filterName)) {
      throw new ValidationError("Line " + lineNumber + ": Invalid filter function " + filterName + " in expression " + expression);
    }
  };
  _proto.getFilterArgs = function getFilterArgs(filter) {
    return filter.slice(filter.indexOf('(') + 1, filter.lastIndexOf(')')).replace(REGEX_EXPRESSION, '').split(',').map(function (arg) {
      return arg.split('=')[0].trim();
    });
  };
  _proto.validateFilterArgs = function validateFilterArgs(filter, filterName, lineNumber, expression) {
    if (filter.includes('(')) {
      var filterArgs = this.getFilterArgs(filter);
      var validFilterArgs = VALID_FILTERS[filterName];
      for (var _iterator = _createForOfIteratorHelperLoose(filterArgs), _step; !(_step = _iterator()).done;) {
        var arg = _step.value;
        if (!validFilterArgs.includes(arg)) {
          throw new ValidationError("Line [" + lineNumber + "]: Invalid argument " + arg + " for filter " + filterName + " in expression " + expression);
        }
      }
    }
  };
  _proto.validate = function validate(args) {
    var _this = this;
    var expressions = args.expressions,
      yamlFile = args.yamlFile;
    var expressionsFromCM = expressions != null ? expressions : ValidatorBase.parseJinjaExpressions(yamlFile);
    expressionsFromCM.forEach(function (_ref) {
      var _expression$replace$r;
      var expression = _ref.expression,
        lineNumber = _ref.lineNumber;
      var exspressionFilters = (_expression$replace$r = expression.replace(REGEX_EXPRESSION, '').replace(/[{}]/g, '').split('|').slice(1)) != null ? _expression$replace$r : [];
      for (var _iterator2 = _createForOfIteratorHelperLoose(exspressionFilters), _step2; !(_step2 = _iterator2()).done;) {
        var filter = _step2.value;
        var formattedFilter = filter.split(/\s*==\s*|\s*<\s*|\s*>\s*/)[0];
        var _formattedFilter$spli = formattedFilter.split('('),
          filterNameWithArgs = _formattedFilter$spli[0];
        var filterName = filterNameWithArgs.trim();
        _this.validateExistingFilter(filterName, lineNumber, expression);
        _this.validateFilterArgs(formattedFilter, filterName, lineNumber, expression);
      }
    });
  };
  return FiltersValidator;
}(ValidatorBase);

var ActionsValidator = /*#__PURE__*/function (_ValidatorBase) {
  _inheritsLoose(ActionsValidator, _ValidatorBase);
  function ActionsValidator() {
    return _ValidatorBase.apply(this, arguments) || this;
  }
  var _proto = ActionsValidator.prototype;
  _proto.validateActionSupported = function validateActionSupported(action) {
    if (!Object.values(SUPPORTED_ACTIONS).includes(action)) {
      throw new ValidationError("Action is not supported " + action);
    }
  };
  _proto.validateArgSupported = function validateArgSupported(action, args) {
    var unsupportedArgs = args == null ? void 0 : args.filter(function (arg) {
      return !SUPPORTED_ARGUMENTS_BY_ACTION[action].includes(arg);
    });
    if (unsupportedArgs.length) {
      throw new ValidationError("Some args are not supported:  " + unsupportedArgs.join(', '));
    }
  };
  _proto.validateRequiredArgs = function validateRequiredArgs(action, args) {
    var _required$args;
    var required = REQUIRED_ARGUMENTS_BY_ACTIONS[action];
    if (!required) {
      return;
    }
    var missingArgs = (_required$args = required.args) == null ? void 0 : _required$args.filter(function (arg) {
      return !args.includes(arg);
    });
    if (required.all && missingArgs.length || !required.all && !required.args.some(function (arg) {
      return args.includes(arg);
    })) {
      throw new ValidationError("Some required args are missing for action " + action + ": " + missingArgs.join(', '));
    }
  };
  _proto.validate = function validate(args) {
    var _Object$values$flatMa;
    var yamlFile = args.yamlFile;
    var safeYamlFile = yamlFile.replace(JINJA_EXPRESSION_REGEX, 'TEMPLATE');
    var yamlLoaded = load(safeYamlFile);
    var actions = (_Object$values$flatMa = Object.values(yamlLoaded.automations).flatMap(function (automation) {
      return automation.run;
    })) == null ? void 0 : _Object$values$flatMa.filter(Boolean);
    for (var _iterator = _createForOfIteratorHelperLoose(actions), _step; !(_step = _iterator()).done;) {
      var actionElement = _step.value;
      var action = actionElement.action,
        actionArgs = actionElement.args;
      var existingArgsList = Object.keys(actionArgs != null ? actionArgs : {});
      this.validateActionSupported(action);
      if (existingArgsList.length) {
        this.validateArgSupported(action, existingArgsList);
      }
      this.validateRequiredArgs(action, existingArgsList);
    }
  };
  return ActionsValidator;
}(ValidatorBase);

var ajv = /*#__PURE__*/new Ajv();
var FileStructureValidator = /*#__PURE__*/function (_ValidatorBase) {
  _inheritsLoose(FileStructureValidator, _ValidatorBase);
  function FileStructureValidator() {
    return _ValidatorBase.apply(this, arguments) || this;
  }
  var _proto = FileStructureValidator.prototype;
  _proto.validate = function validate(args) {
    var yamlFile = args.yamlFile;
    var docs = loadAll(yamlFile.replace(JINJA_EXPRESSION_REGEX, ''), undefined, {
      schema: JSON_SCHEMA
    });
    var validateSchema = ajv.compile(CM_SCHEMA);
    for (var _iterator = _createForOfIteratorHelperLoose(docs), _step; !(_step = _iterator()).done;) {
      var doc = _step.value;
      var isValid = validateSchema(doc);
      if (!isValid) {
        var _validateSchema$error;
        throw new ValidationError("Schema is not valid: " + ((_validateSchema$error = validateSchema.errors) == null ? void 0 : _validateSchema$error.map(function (error) {
          return error.message;
        }).join(', ')));
      }
    }
  };
  return FileStructureValidator;
}(ValidatorBase);

var SavedWordsValidator = /*#__PURE__*/function (_ValidatorBase) {
  _inheritsLoose(SavedWordsValidator, _ValidatorBase);
  function SavedWordsValidator() {
    return _ValidatorBase.apply(this, arguments) || this;
  }
  var _proto = SavedWordsValidator.prototype;
  _proto.validate = function validate(args) {
    var yamlFile = args.yamlFile;
    var doc = load(yamlFile.replace(JINJA_EXPRESSION_REGEX, '').replace(/{%.*?%}[\s\S]*?{% endfor %}/g, ''));
    var savedWordCustomFilter = Object.keys(doc).filter(function (custom) {
      return !Object.keys(CM_SCHEMA.properties).includes(custom);
    }).find(function (custom) {
      return VALID_CONTEXT_VARS.includes(custom);
    });
    if (savedWordCustomFilter) {
      throw new ValidationError("Invalid custom context variable: `" + savedWordCustomFilter + "` is a built-in context");
    }
  };
  return SavedWordsValidator;
}(ValidatorBase);

var TriggersValidator = /*#__PURE__*/function (_ValidatorBase) {
  _inheritsLoose(TriggersValidator, _ValidatorBase);
  function TriggersValidator() {
    return _ValidatorBase.apply(this, arguments) || this;
  }
  var _proto = TriggersValidator.prototype;
  _proto.validateSuppertedTriggers = function validateSuppertedTriggers(trigger) {
    if (!Object.values(SUPPORTED_TRIGGERS).includes(trigger)) {
      throw new ValidationError(trigger + " trigger is not supported");
    }
  };
  _proto.validate = function validate(args) {
    var yamlFile = args.yamlFile;
    var safeYamlFile = yamlFile.replace(JINJA_EXPRESSION_REGEX, 'TEMPLATE');
    var yamlLoaded = load(safeYamlFile);
    var globalTriggerts = yamlLoaded.automations.on || [];
    var automationTriggers = Object.values(yamlLoaded.automations).flatMap(function (automation) {
      return automation.on;
    }).filter(Boolean);
    var allTriggers = [].concat(globalTriggerts, automationTriggers);
    for (var _iterator = _createForOfIteratorHelperLoose(allTriggers), _step; !(_step = _iterator()).done;) {
      var trigger = _step.value;
      this.validateSuppertedTriggers(trigger);
    }
  };
  return TriggersValidator;
}(ValidatorBase);

var CMValidator = /*#__PURE__*/function (_ValidatorBase) {
  _inheritsLoose(CMValidator, _ValidatorBase);
  function CMValidator() {
    var _this;
    _this = _ValidatorBase.call(this) || this;
    _this.steps = [new ContextVariableValidator(), new FiltersValidator(), new ActionsValidator(), new FileStructureValidator(), new SavedWordsValidator(), new TriggersValidator()];
    return _this;
  }
  var _proto = CMValidator.prototype;
  _proto.validate = function validate(cmFile) {
    var expressions = ValidatorBase.parseJinjaExpressions(cmFile);
    for (var _iterator = _createForOfIteratorHelperLoose(this.steps), _step; !(_step = _iterator()).done;) {
      var step = _step.value;
      step.validate({
        expressions: expressions,
        yamlFile: cmFile
      });
    }
  };
  return CMValidator;
}(ValidatorBase);

export { ActionsValidator, CMValidator, ContextVariableValidator, FileStructureValidator, FiltersValidator, SavedWordsValidator, _const as validatorsConstants };
//# sourceMappingURL=gitstream-core-js.esm.js.map
