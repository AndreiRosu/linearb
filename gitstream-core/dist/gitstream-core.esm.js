import _ from 'lodash-es';
import { FiltersValidator, ActionsValidator, FileStructureValidator, SavedWordsValidator, ContextVariableValidator, validatorsConstants } from '@linearb/gitstream-core-js';
import { load } from 'js-yaml';
import { Environment, FileSystemLoader } from 'nunjucks';
import axios from 'axios';
import moment from 'moment';
import prettier from 'prettier';
import { spawnSync, execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import parse from 'parse-diff';
import { setFailed } from '@actions/core';
import { init } from '@amplitude/node';
import { SegmentClient } from '@linearb/linode-common';

function _regeneratorRuntime() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */

  _regeneratorRuntime = function () {
    return exports;
  };

  var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }

  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
    return generator._invoke = function (innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");

        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }

        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);

          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }

          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }(innerFn, self, context), generator;
  }

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  exports.wrap = wrap;
  var ContinueSentinel = {};

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {}

  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if ("throw" !== record.type) {
        var result = record.arg,
            value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }

      reject(record.arg);
    }

    var previousPromise;

    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    };
  }

  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }

  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;

          return next.value = undefined, next.done = !0, next;
        };

        return next.next = next;
      }
    }

    return {
      next: doneResult
    };
  }

  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }

  return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (object) {
    var keys = [];

    for (var key in object) keys.push(key);

    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }

      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;

      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
            record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      }

      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
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

var AWS_BASE_URL = 'https://gtxblnqb99.execute-api.us-west-1.amazonaws.com/prod';
var API_ENDPOINTS = {
  REVIEW_TIME: AWS_BASE_URL + '/v1/pulls/review-time',
  EXPERT_REVIWER: AWS_BASE_URL + '/gs/v1/data-service/expert-reviewer'
};
var PACKAGE_NAME = 'gitstream-rules-parser';
var ERRORS = {
  FAILED_RENDER_STRING: PACKAGE_NAME + ' - failed render string',
  FAILED_YAML_LOAD: PACKAGE_NAME + ' - failed yaml.load',
  INVALID_CM: PACKAGE_NAME + ' - invalid cm',
  INVALID_CM_CONTEXT_VARIABLES: PACKAGE_NAME + ' - ContextVariableValidator'
};
var STATUS_CODES = {
  FAILED_RENDER_STRING: 80,
  FAILED_YAML_LOAD: 81,
  INVALID_CM: 82,
  INVALID_CM_CONTEXT_VARIABLES: 83
};

var argsDefinitionsByAction = {
  'add-comment@v1': {
    comment: {
      name: 'comment',
      type: 'string'
    }
  },
  'add-label@v1': {
    label: {
      name: 'label',
      type: 'string'
    }
  },
  'add-labels@v1': {
    labels: {
      name: 'labels',
      type: 'list'
    }
  },
  'add-reviewers@v1': {
    reviewers: {
      name: 'reviewers',
      type: 'list'
    },
    team_reviewers: {
      name: 'team_reviewers',
      type: 'list'
    }
  },
  'merge@v1': {
    wait_for_all_checks: {
      name: 'wait_for_all_checks',
      type: 'boolean'
    },
    rebase_on_merge: {
      name: 'rebase_on_merge',
      type: 'boolean'
    },
    squash_on_merge: {
      name: 'squash_on_merge',
      type: 'boolean'
    }
  },
  'require-reviewers@v1': {
    reviewers: {
      name: 'reviewers',
      type: 'list'
    }
  },
  'set-required-approvals@v1': {
    approvals: {
      name: 'approvals',
      type: 'number'
    }
  },
  'request-changes@v1': {
    comment: {
      name: 'comment',
      type: 'number'
    }
  }
};
var listify = [argsDefinitionsByAction['add-reviewers@v1'].reviewers.name, argsDefinitionsByAction['require-reviewers@v1'].reviewers.name, argsDefinitionsByAction['add-reviewers@v1'].team_reviewers.name, argsDefinitionsByAction['add-labels@v1'].labels.name];

var _PROVIDER_NAME;

var internalIncludes = function internalIncludes(file, searchTerm) {
  return file == null ? void 0 : file.includes(searchTerm);
};
var internalRegex = function internalRegex(file, searchTerm, multiline) {
  if (multiline === void 0) {
    multiline = false;
  }

  // possible inputs are regular expressions as 'strings' or /regex/ standard javascript
  // literals. a 3rd input is a string with a nunjuks 'r/regex/', this happens when a
  // a nunjucks regex expression is injected back into the context.
  // this 3rd type is non standard RegExp and therefore should inverted back.
  // if it is a nunjuks regex string, convert it to compatible RegExp string
  if (typeof searchTerm === 'string' && searchTerm.startsWith('r/')) {
    // from the nunjuks regex patterns remove the 'r/' and the last '/'
    searchTerm = searchTerm.substring(2).slice(0, -1); // replace any \/ back to /

    searchTerm = searchTerm.replace('\\/', '/');
  }

  var re = new RegExp(searchTerm, multiline ? 'm' : '');
  return re.test(file);
};
var internalEvery = function internalEvery(arr, value) {
  var bools = arr == null ? void 0 : arr.map(function (item) {
    return Boolean(item);
  });
  return bools != null && bools.length ? bools.every(function (element) {
    return element === value;
  }) : false;
};
var formatInputToList = function formatInputToList(input) {
  if (typeof input === 'string') {
    if (input.includes(',')) {
      return input.split(',');
    } else {
      return [input];
    }
  }

  return input != null ? input : [];
};
var PROVIDER = {
  GITHUB: 'github',
  GITLAB: 'gitlab',
  BITBUCKET: 'bitbucket'
};
var PROVIDER_NAME = (_PROVIDER_NAME = {}, _PROVIDER_NAME[PROVIDER.GITHUB] = 'GitHub', _PROVIDER_NAME[PROVIDER.GITLAB] = 'GitLab', _PROVIDER_NAME[PROVIDER.BITBUCKET] = 'BitBucket', _PROVIDER_NAME);
var DOCS_LINK_COMMENT = '\n \nTo learn more about /:\\ gitStream - [Visit our Docs](https://docs.gitstream.cm/) \n \n';
var MONTH = {
  '01': 'JAN',
  '02': 'FEB',
  '03': 'MAR',
  '04': 'APR',
  '05': 'MAY',
  '06': 'JUN',
  '07': 'JUL',
  '08': 'AUG',
  '09': 'SEP',
  '10': 'OCT',
  '11': 'NOV',
  '12': 'DEC'
};
var FiltersForAnalytics = function FiltersForAnalytics() {};
FiltersForAnalytics.filters = {};
var handleAnalytics = function handleAnalytics(filterName, filterArgs) {
  var _extends2;

  FiltersForAnalytics.filters = _extends({}, FiltersForAnalytics.filters, (_extends2 = {}, _extends2[filterName] = {
    args: filterArgs
  }, _extends2));
};

var _GENERAL_FILTERS_HAND;

var parseSome = function parseSome(list) {
  var _formatInputToList;

  handleAnalytics(GeneralFilters.some, []);
  var formattedList = (_formatInputToList = formatInputToList(list)) == null ? void 0 : _formatInputToList.map(function (item) {
    return Boolean(item);
  });
  return Boolean(formattedList == null ? void 0 : formattedList.length) && formattedList.some(function (match) {
    return match;
  });
};

var parseEvery = function parseEvery(list) {
  handleAnalytics(GeneralFilters.every, []);
  return internalEvery(formatInputToList(list), true);
};

var termRegexOrList = function termRegexOrList(file, attribute, term, regex, list) {
  return term ? internalIncludes(attribute ? file[attribute] : file, term) : regex ? internalRegex(attribute ? file[attribute] : file, regex) : list.some(function (search) {
    return internalIncludes(attribute ? file[attribute] : file, search);
  });
};

var filterList = function filterList(files, attribute, term, regex, list, isReject) {
  return files.filter(function (file) {
    return isReject ? !termRegexOrList(file, attribute, term, regex, list) : termRegexOrList(file, attribute, term, regex, list);
  });
};

var mapList = function mapList(files, attribute, term, regex, list, isReject) {
  return files.map(function (file) {
    return isReject ? !termRegexOrList(file, attribute, term, regex, list) : termRegexOrList(file, attribute, term, regex, list);
  });
};

var calculateList = function calculateList(files, args, callbackName, isReject) {
  if (isReject === void 0) {
    isReject = false;
  }

  var attribute = args.attr || '';
  var term = args.term,
      regex = args.regex,
      list = args.list;
  var formattedFiles = formatInputToList(files);

  if (!term && !regex && !list) {
    return [];
  }

  var formattedList = list;

  if (list) {
    formattedList = formatInputToList(list);
  }

  return callbackName === 'filterList' ? filterList(formattedFiles, attribute, term, regex, formattedList, isReject) : mapList(formattedFiles, attribute, term, regex, formattedList, isReject);
};

var parseFilter = function parseFilter(files, args) {
  handleAnalytics(GeneralFilters.filter, [args]);
  return calculateList(files, args, 'filterList');
};

var parseReject = function parseReject(files, args) {
  handleAnalytics(GeneralFilters.reject, [args]);
  return calculateList(files, args, 'filterList', true);
};

var parseMap = function parseMap(files, _ref) {
  var attr = _ref.attr;
  handleAnalytics(GeneralFilters.map, [{
    attr: attr
  }]);
  return formatInputToList(files).map(function (file) {
    return file[attr];
  });
};

var parseIncludes = function parseIncludes(file, args) {
  handleAnalytics(GeneralFilters.includes, [args]);
  var term = args.term,
      regex = args.regex,
      list = args.list;

  if (!term && !regex && !list) {
    return false;
  }

  var formattedList = list;

  if (list) {
    formattedList = formatInputToList(list);
  }

  return term ? internalIncludes(file, term) : regex ? internalRegex(file, regex) : formattedList.some(function (term) {
    return file.includes(term);
  });
};

var parseMatch = function parseMatch(files, args) {
  handleAnalytics(GeneralFilters.match, [args]);
  return calculateList(files, args, 'mapList');
};

var parseNope = function parseNope(arr) {
  handleAnalytics(GeneralFilters.match, []);
  return internalEvery(formatInputToList(arr), false);
};

var parseIntersection = function parseIntersection(listA, args) {
  handleAnalytics(GeneralFilters.intersection, [args]);
  var listB = args.list;

  if (!listB) {
    return false;
  }

  return _.intersection(listA, listB);
};

var parseDifference = function parseDifference(listA, args) {
  handleAnalytics(GeneralFilters.difference, [args]);
  var listB = args.list;

  if (!listB) {
    return false;
  }

  return _.difference(listA, listB);
};

var GeneralFilters;

(function (GeneralFilters) {
  GeneralFilters["some"] = "some";
  GeneralFilters["every"] = "every";
  GeneralFilters["filter"] = "filter";
  GeneralFilters["includes"] = "includes";
  GeneralFilters["reject"] = "reject";
  GeneralFilters["map"] = "map";
  GeneralFilters["match"] = "match";
  GeneralFilters["nope"] = "nope";
  GeneralFilters["intersection"] = "intersection";
  GeneralFilters["difference"] = "difference";
})(GeneralFilters || (GeneralFilters = {}));

var GENERAL_FILTERS_HANDLER = (_GENERAL_FILTERS_HAND = {}, _GENERAL_FILTERS_HAND[GeneralFilters.some] = parseSome, _GENERAL_FILTERS_HAND[GeneralFilters.every] = parseEvery, _GENERAL_FILTERS_HAND[GeneralFilters.filter] = parseFilter, _GENERAL_FILTERS_HAND[GeneralFilters.reject] = parseReject, _GENERAL_FILTERS_HAND[GeneralFilters.map] = parseMap, _GENERAL_FILTERS_HAND[GeneralFilters.includes] = parseIncludes, _GENERAL_FILTERS_HAND[GeneralFilters.match] = parseMatch, _GENERAL_FILTERS_HAND[GeneralFilters.nope] = parseNope, _GENERAL_FILTERS_HAND[GeneralFilters.intersection] = parseIntersection, _GENERAL_FILTERS_HAND[GeneralFilters.difference] = parseDifference, _GENERAL_FILTERS_HAND);

var ADDITIONAL_FORMATTING = {
  github: '',
  gitlab: '  \n',
  "default": ''
};

var calculateSumByAuthor = function calculateSumByAuthor(authorMetric, author) {
  return Object.values(authorMetric).reduce(function (aa, item) {
    var _aa$author, _ref;

    var precent = item[author];
    var totalPercent = (precent != null ? precent : 0) + ((_aa$author = aa[author]) != null ? _aa$author : 0);
    return _extends({}, aa, totalPercent && (_ref = {}, _ref[author] = totalPercent, _ref));
  }, {});
};

var convertAndSumContributors = function convertAndSumContributors(contributors, gitToProviderUser) {
  return Object.keys(contributors).reduce(function (acc, gitAuthor) {
    var _gitToProviderUser$gi, _extends2;

    var score = contributors[gitAuthor];

    if (acc[gitToProviderUser[gitAuthor]]) {
      score = contributors[gitAuthor] + acc[gitToProviderUser[gitAuthor]];
    }

    var author = (_gitToProviderUser$gi = gitToProviderUser[gitAuthor]) != null && _gitToProviderUser$gi.includes('@') || !gitToProviderUser[gitAuthor] ? gitAuthor + '\\*' : gitToProviderUser[gitAuthor];
    return _extends({}, acc, (_extends2 = {}, _extends2[author] = score, _extends2));
  }, {});
};
var convertContributorsAndBlame = function convertContributorsAndBlame(repo) {
  var blame = Object.keys(repo.blame).reduce(function (acc, file) {
    var _extends3;

    return _extends({}, acc, (_extends3 = {}, _extends3[file] = convertAndSumContributors(repo.blame[file], repo.git_to_provider_user), _extends3));
  }, {});
  return {
    blame: blame
  };
};
var sumAuthorMetrics = function sumAuthorMetrics(contributors, authorMetric) {
  var numOfFiles = Object.keys(authorMetric).length;
  return contributors.reduce(function (acc, author) {
    var _ref2;

    var sumByAuthor = calculateSumByAuthor(authorMetric, author);
    return _extends({}, acc, sumByAuthor[author] && (_ref2 = {}, _ref2[author] = sumByAuthor[author] / numOfFiles, _ref2));
  }, {});
};
var calculateActivityPerFile = function calculateActivityPerFile(activity, weeksArr) {
  return Object.keys(activity).reduce(function (acc, file) {
    var _extends5;

    var totalPerFile = Object.values(activity[file]).reduce(function (ac, linesPerWeek) {
      weeksArr.forEach(function (week) {
        var item = linesPerWeek[week];

        if (item) {
          var _ac$week;

          ac[week] = ((_ac$week = ac[week]) != null ? _ac$week : 0) + item;
        }
      });
      return _extends({}, ac);
    }, {});
    return _extends({}, acc, (_extends5 = {}, _extends5[file] = totalPerFile, _extends5));
  }, {});
};
var calculateFileSumPerAuthorActivity = function calculateFileSumPerAuthorActivity(activity, weeksArr, totalsPerFile) {
  return Object.keys(activity).reduce(function (acc, file) {
    var _extends6;

    var calcPercent = Object.keys(activity[file]).reduce(function (acAuthor, author) {
      var _ref3;

      var arrSum = [];
      weeksArr.forEach(function (week) {
        if (totalsPerFile[file][week] && activity[file][author][week]) {
          arrSum.push(activity[file][author][week] / totalsPerFile[file][week] * 100);
        }
      });
      var total = arrSum.reduce(function (a, b) {
        return a + b;
      }, 0) / arrSum.length;
      return _extends({}, acAuthor, arrSum.length && (_ref3 = {}, _ref3[author] = parseInt(total == null ? void 0 : total.toFixed(0)), _ref3));
    }, {});
    return _extends({}, acc, (_extends6 = {}, _extends6[file] = calcPercent, _extends6));
  }, {});
};
var sortObject = function sortObject(data, object) {
  return data.sort(function (a, b) {
    var _object$b, _object$a;

    return ((_object$b = object[b]) != null ? _object$b : 0) - ((_object$a = object[a]) != null ? _object$a : 0);
  });
};

var compareThan = function compareThan(data, gt, lt) {
  var authors = Object.keys(data).filter(function (author) {
    return gt !== undefined ? data[author] > gt : data[author] < lt;
  });
  var sortedAuthors = sortObject(authors, data);
  return sortedAuthors.reduce(function (acc, author) {
    var _extends7;

    if (author.includes('*')) {
      return acc;
    }

    return _extends({}, acc, (_extends7 = {}, _extends7[author] = data[author], _extends7));
  }, {});
};

var validateAndCompare = function validateAndCompare(authorMetrics, gt, lt) {
  return Object.keys(authorMetrics).length ? compareThan(authorMetrics, gt, lt) : {};
};
var convertBlameContextToExplain = function convertBlameContextToExplain(repo) {
  var _convertContributorsA = convertContributorsAndBlame(repo),
      blame = _convertContributorsA.blame;

  return Object.keys(blame).reduce(function (acc, file) {
    var _extends9;

    if (file === '/dev/null') {
      return acc;
    }

    var sortedAuthors = sortObject(Object.keys(blame[file]), blame[file]);
    var formattedValues = sortedAuthors.reduce(function (accAuthor, author) {
      var _extends8;

      if (!blame[file][author]) {
        return accAuthor;
      }

      var formatGitAuthor = author.replace(/\"\“/g, '').replace('“', '');
      var formattedValue = (Math.floor(blame[file][author]) ? Math.floor(blame[file][author]) : '<1') + "%";

      if (accAuthor[formatGitAuthor] && parseInt(accAuthor[formatGitAuthor]) > parseInt(formattedValue)) {
        formattedValue = accAuthor[formatGitAuthor];
      }

      return _extends({}, accAuthor, (_extends8 = {}, _extends8[formatGitAuthor] = formattedValue, _extends8));
    }, {});
    return _extends({}, acc, (_extends9 = {}, _extends9[file] = formattedValues, _extends9));
  }, {});
};

var suggestedReviewersComment = function suggestedReviewersComment(authorFilteredParseResult, argsTemplate, numOfPRFiles, isNoUserButYou) {
  var formattedComment = authorFilteredParseResult ? " \uD83D\uDC4B  **Suggested reviewers: " + authorFilteredParseResult + "**\n \nThey contributed " + argsTemplate + " of the lines on pre-existing files" : " \uD83D\uDC4B  **Suggested reviewers: no user " + (isNoUserButYou ? 'but you' : '') + " matched**\n \nNo " + (numOfPRFiles ? 'other ' : '') + "user contributed " + argsTemplate + " of the lines on pre-existing files";
  return formattedComment;
};

var explainBlameTemplate = function explainBlameTemplate(args, authorFilteredParseResult, formattedBlameContext, provider, isNoUserButYou) {
  var gt = args.gt,
      lt = args.lt;
  var argsTemplate = gt ? "more than " + gt + "%" : "less than " + lt + "%";
  var numOfPRFiles = Object.keys(formattedBlameContext).length;
  var parserResultTemplate = suggestedReviewersComment(authorFilteredParseResult, argsTemplate, numOfPRFiles, isNoUserButYou);
  parserResultTemplate += numOfPRFiles ? ':\n' : '. \n ';
  parserResultTemplate += Object.keys(formattedBlameContext).length ? '<details>\n <summary>See details</summary>\n' : '';
  parserResultTemplate += '\n';
  Object.keys(formattedBlameContext).forEach(function (file) {
    if (Object.keys(formattedBlameContext[file]).length === 0) {
      return;
    }

    parserResultTemplate += "\n`" + file + "` \n" + (ADDITIONAL_FORMATTING[provider] || ADDITIONAL_FORMATTING["default"]); //Supporting new lines format for gitlab

    Object.keys(formattedBlameContext[file]).forEach(function (author) {
      parserResultTemplate += author + ": " + formattedBlameContext[file][author] + " \n" + (ADDITIONAL_FORMATTING[provider] || ADDITIONAL_FORMATTING["default"]); //Supporting new lines format for gitlab
    });
  });
  parserResultTemplate += '\n</details>\n';
  var isGitUser = Object.values(formattedBlameContext).map(function (item) {
    return Object.keys(item).some(function (x) {
      return x.includes('*');
    });
  }).some(function (result) {
    return result;
  });
  parserResultTemplate += isGitUser ? " \nGit users that could not be automatically mapped are marked with `*`.\n" + (ADDITIONAL_FORMATTING[provider] || ADDITIONAL_FORMATTING["default"]) + "To map these users, refer to the instructions [here](https://docs.gitstream.cm/cm-file#config).\n \n" : ''; //Supporting new lines format for gitlab

  parserResultTemplate += DOCS_LINK_COMMENT;
  return parserResultTemplate;
};

var isGtLtArgsValid = function isGtLtArgsValid(args) {
  var gt = args.gt,
      lt = args.lt;
  return !!gt || !!lt;
};

var getETR = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(request) {
    var _yield$axios$post, numericValue;

    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return axios.post(API_ENDPOINTS.REVIEW_TIME, request, {
              headers: {
                'Content-type': 'application/json'
              }
            });

          case 2:
            _yield$axios$post = _context.sent;
            numericValue = _yield$axios$post.data.numericValue;
            return _context.abrupt("return", {
              numericValue: numericValue
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getETR(_x) {
    return _ref.apply(this, arguments);
  };
}(); //TODO: map request to object

var getExpertReviewer = /*#__PURE__*/function () {
  var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(request) {
    var _yield$axios$post2, data;

    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!request) {
              _context2.next = 6;
              break;
            }

            _context2.next = 3;
            return axios.post(API_ENDPOINTS.EXPERT_REVIWER, request, {
              headers: {
                'Content-type': 'application/json'
              }
            });

          case 3:
            _yield$axios$post2 = _context2.sent;
            data = _yield$axios$post2.data;
            return _context2.abrupt("return", data || {});

          case 6:
            return _context2.abrupt("return", {});

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getExpertReviewer(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var filterExpertResult = function filterExpertResult(data, gt, lt, filterBy) {
  var thresholdData = Object.keys(data).reduce(function (acc, user) {
    if (gt !== undefined ? data[user][filterBy] > gt / 100 : data[user][filterBy] < lt / 100) {
      var _extends2;

      return _extends({}, acc, (_extends2 = {}, _extends2[user] = data[user], _extends2));
    }

    return acc;
  }, {});
  return Object.keys(thresholdData).filter(function (contributor) {
    return !contributor.includes('@') && !contributor.includes('<>');
  }) || [];
};
var parseExpertReviewerThreshold = function parseExpertReviewerThreshold(args) {
  var gt = args.gt,
      lt = args.lt;
  return gt ? gt : lt ? lt : 0.1;
};
var getAndFilterExpertReviewer = /*#__PURE__*/function () {
  var _ref3 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(repo) {
    var _repo$data_service;

    var data, isIssuerFiltered, dataWithoutIssuer;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return getExpertReviewer((_repo$data_service = repo.data_service) == null ? void 0 : _repo$data_service.expert_reviwer_request);

          case 2:
            data = _context3.sent;

            if (Object.keys(data).length) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt("return", {
              data: {},
              dataWithoutIssuer: {},
              isIssuerFiltered: false
            });

          case 5:
            isIssuerFiltered = false;
            dataWithoutIssuer = Object.keys(data).reduce(function (acc, author) {
              var _extends3;

              if (author === repo.pr_author) {
                isIssuerFiltered = true;
                return acc;
              }

              return _extends({}, acc, (_extends3 = {}, _extends3[author] = data[author], _extends3));
            }, {});
            return _context3.abrupt("return", {
              data: data,
              dataWithoutIssuer: dataWithoutIssuer,
              isIssuerFiltered: isIssuerFiltered
            });

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getAndFilterExpertReviewer(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var explainExpertReviewerComment = function explainExpertReviewerComment(expertReviewers, activeUsers, knowledgeUsers, threshold, provider, isNoUserButYou) {
  var comment = '🥷 **Code experts:';
  comment += expertReviewers.length ? " " + expertReviewers.join(', ') + "** \n \n" : " no user " + (isNoUserButYou ? 'but you' : '') + " matched threshold " + threshold + "** \n \n";

  if (activeUsers.length) {
    comment += activeUsers.join(', ') + " " + (activeUsers.length === 1 ? 'has' : 'have') + " most \uD83D\uDC69\u200D\uD83D\uDCBB **activity** in the files. \n" + (ADDITIONAL_FORMATTING[provider] || ADDITIONAL_FORMATTING["default"]);
  }

  if (knowledgeUsers.length) {
    comment += knowledgeUsers.join(', ') + " " + (knowledgeUsers.length === 1 ? 'has' : 'have') + " most \uD83E\uDDE0 **knowledge** in the files. \n";
  }

  return comment;
};

var explainActivityByMonth = function explainActivityByMonth(activity, file, activityUsers) {
  var monthsComment = '';
  var months = [];

  for (var index = 0; index < 6; index++) {
    months.push(MONTH[moment().subtract(index, 'months').format('MM')]);
  }

  months.forEach(function (month) {
    var _activity$file$activi;

    var user1Value = activity[file][activityUsers[0]][month];
    var user2Value = (_activity$file$activi = activity[file][activityUsers[1]]) == null ? void 0 : _activity$file$activi[month];
    monthsComment += "| " + month + " | " + (user1Value ? user1Value.additions + ' additions & ' + user1Value.deletions + ' deletions' : ' ') + " |";
    monthsComment += (user2Value ? user2Value.additions + ' additions & ' + user2Value.deletions + ' deletions |' : ' ') + " \n";
  });
  return monthsComment;
};

var explainActivityTable = function explainActivityTable(file, activity, activityUsers) {
  if (!Object.keys(activity).length) {
    return '\n\nNo activity in the last 6 months\n\n'; // can be extract to const NO_ACTIVITY_MESSAGE
  }

  if (activityUsers.length) {
    var table = "\n\nActivity based on git-commit: \n\n |  | " + (activityUsers[0] ? activityUsers[0] : ' ') + " | " + (activityUsers[1] ? activityUsers[1] + '| \n | --- | --- | --- | \n ' : ' \n | --- | --- | \n');
    table += explainActivityByMonth(activity, file, activityUsers);
    return table;
  }

  return '';
};

var explainKnowledgeSection = function explainKnowledgeSection(file, knowledge, knowledgeUsers, provider) {
  var knowledgeText = '';
  var sortedAuthors = sortObject(knowledgeUsers, knowledge[file]);
  sortedAuthors.forEach(function (author) {
    knowledgeText += knowledge[file][author] ? author + ": " + knowledge[file][author] + "% \n" + (ADDITIONAL_FORMATTING[provider] || ADDITIONAL_FORMATTING["default"]) : '';
  });
  return knowledgeText;
};

var explainActivityAndBlameComment = function explainActivityAndBlameComment(files, activity, knowledge, activityUsers, knowledgeUsers, provider) {
  try {
    var comment = '<details>\n <summary>See details</summary>\n\n';
    files.forEach(function (file) {
      comment += "\n`" + file + "` \n " + explainActivityTable(file, activity, activityUsers) + " \n\nKnowledge based on git-blame: \n " + (ADDITIONAL_FORMATTING[provider] || ADDITIONAL_FORMATTING["default"]) + explainKnowledgeSection(file, knowledge, knowledgeUsers, provider);
    });
    comment += "\n</details>\n";
    return comment;
  } catch (error) {
    console.log('Error in creating explain code experts comment', error);
    return '';
  }
};

var parseActivityByUserDataForExplain = function parseActivityByUserDataForExplain(activity, file, user) {
  return Object.keys(activity[file]).reduce(function (ac, date) {
    if (activity[file][date][user]) {
      var _date$split, _extends2;

      var formatedDate = MONTH[(_date$split = date.split('-')) == null ? void 0 : _date$split[1]];
      return _extends({}, ac, (_extends2 = {}, _extends2[formatedDate] = activity[file][date][user], _extends2));
    }

    return ac;
  }, {});
};

var parseActivityByUserForExplain = function parseActivityByUserForExplain(activity, file, activeUsers) {
  return activeUsers.reduce(function (au, user) {
    var _extends3;

    var activityData = parseActivityByUserDataForExplain(activity, file, user);
    return _extends({}, au, (_extends3 = {}, _extends3[user] = activityData, _extends3));
  }, {});
};

var getExplainActivity = function getExplainActivity(activity, activeUsers) {
  return Object.keys(activity || {}).reduce(function (acc, file) {
    var _extends4;

    var userActivity = parseActivityByUserForExplain(activity, file, activeUsers);
    return _extends({}, acc, (_extends4 = {}, _extends4[file] = userActivity, _extends4));
  }, {});
};
var getExplainKnowledge = function getExplainKnowledge(blame, knowledgeUsers) {
  return Object.keys(blame || {}).reduce(function (acc, file) {
    var _extends6;

    var sortedAuthors = sortObject(knowledgeUsers, blame[file]);
    var userKnowledge = sortedAuthors.reduce(function (au, user) {
      if (blame[file][user]) {
        var _extends5;

        return _extends({}, au, (_extends5 = {}, _extends5[user] = Math.round(blame[file][user] * 100), _extends5));
      }

      return au;
    }, {});
    return _extends({}, acc, (_extends6 = {}, _extends6[file] = userKnowledge, _extends6));
  }, {});
};

var DELETED_PATH = '/dev/null';
var estimatedReviewTime = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(branch, callback) {
    var _branch$diff, _branch$diff2, _branch$diff3;

    var numOfFiles, _branch$diff$files_me, additionalLines, deletedLines, prFiles, reqBody, _yield$getETR, numericValue;

    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            handleAnalytics(HighLevelFilters.estimatedReviewTime, []);
            numOfFiles = (_branch$diff = branch.diff) == null ? void 0 : _branch$diff.files_metadata.length;
            _branch$diff$files_me = (_branch$diff2 = branch.diff) == null ? void 0 : _branch$diff2.files_metadata.reduce(function (acc, file) {
              acc.additionalLines += file.additions;
              acc.deletedLines += file.deletions;
              return acc;
            }, {
              additionalLines: 0,
              deletedLines: 0
            }), additionalLines = _branch$diff$files_me.additionalLines, deletedLines = _branch$diff$files_me.deletedLines;
            prFiles = (_branch$diff3 = branch.diff) == null ? void 0 : _branch$diff3.files_metadata.map(function (fileMetadata) {
              return {
                file_path: fileMetadata.new_file !== DELETED_PATH ? fileMetadata.new_file : fileMetadata.original_file,
                additions: fileMetadata.additions,
                deletions: fileMetadata.deletions
              };
            });
            reqBody = {
              prMetadata: {
                commits: branch.num_of_commits,
                files: numOfFiles,
                lines: additionalLines + deletedLines
              },
              prFiles: prFiles,
              prAdditionalLines: additionalLines,
              prDeletedLines: deletedLines,
              baseBranch: branch.base,
              request_source: 'gitstream'
            };
            _context.next = 7;
            return getETR(reqBody);

          case 7:
            _yield$getETR = _context.sent;
            numericValue = _yield$getETR.numericValue;
            callback(null, numericValue);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function estimatedReviewTime(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var parseExpertReviewer = /*#__PURE__*/function () {
  var _ref3 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(repo, _ref2, callback) {
    var _ref2$gt, gt, _ref2$lt, lt, _yield$getAndFilterEx, dataWithoutIssuer, expertReviewers;

    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _ref2$gt = _ref2.gt, gt = _ref2$gt === void 0 ? 0 : _ref2$gt, _ref2$lt = _ref2.lt, lt = _ref2$lt === void 0 ? 0 : _ref2$lt;
            _context2.prev = 1;
            handleAnalytics(HighLevelFilters.expertReviewer, [{
              gt: gt,
              lt: lt
            }]);
            _context2.next = 5;
            return getAndFilterExpertReviewer(repo);

          case 5:
            _yield$getAndFilterEx = _context2.sent;
            dataWithoutIssuer = _yield$getAndFilterEx.dataWithoutIssuer;

            if (!Object.keys(dataWithoutIssuer).length) {
              callback(null, []);
            }

            expertReviewers = filterExpertResult(dataWithoutIssuer, gt, lt, 'reviewer_score').slice(0, 2);
            callback(null, expertReviewers);
            _context2.next = 16;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](1);
            console.log('error:', _context2.t0);
            callback(null, []);

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 12]]);
  }));

  return function parseExpertReviewer(_x3, _x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();
var parseExplainCodeExpertHandler = /*#__PURE__*/function () {
  var _ref4 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(repo, args, callback) {
    var _data$explain, _data$explain2, gt, lt, _yield$getAndFilterEx2, data, dataWithoutIssuer, isIssuerFiltered, expertReviewers, activeUsers, knowledgeUsers, explainActivity, explainKnowledge, explainComment, base64Comment;

    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            gt = args.gt, lt = args.lt;
            _context3.next = 4;
            return getAndFilterExpertReviewer(repo);

          case 4:
            _yield$getAndFilterEx2 = _context3.sent;
            data = _yield$getAndFilterEx2.data;
            dataWithoutIssuer = _yield$getAndFilterEx2.dataWithoutIssuer;
            isIssuerFiltered = _yield$getAndFilterEx2.isIssuerFiltered;

            if (!Object.keys(data).length || !Object.keys(dataWithoutIssuer).length) {
              callback(null, []);
            }

            expertReviewers = filterExpertResult(dataWithoutIssuer, gt, lt, 'reviewer_score').slice(0, 2);
            activeUsers = filterExpertResult(data, gt, lt, 'avg_activity_score').slice(0, 2);
            knowledgeUsers = filterExpertResult(data, gt, lt, 'avg_blame_perc').slice(0, 2);
            explainActivity = getExplainActivity((_data$explain = data.explain) == null ? void 0 : _data$explain.activity, activeUsers);
            explainKnowledge = getExplainKnowledge((_data$explain2 = data.explain) == null ? void 0 : _data$explain2.blame, knowledgeUsers);
            explainComment = explainExpertReviewerComment(expertReviewers, activeUsers, knowledgeUsers, parseExpertReviewerThreshold(args), repo.provider, isIssuerFiltered && !Object.keys(expertReviewers).length) + " " + explainActivityAndBlameComment(Array.from(new Set([].concat(Object.keys(explainActivity), Object.keys(explainKnowledge)))), explainActivity, explainKnowledge, activeUsers, knowledgeUsers, repo.provider) + " \n\n " + DOCS_LINK_COMMENT + " \n";
            base64Comment = "base64: " + Buffer.from(explainComment).toString('base64');
            callback(null, base64Comment);
            _context3.next = 23;
            break;

          case 19:
            _context3.prev = 19;
            _context3.t0 = _context3["catch"](0);
            console.log('error:', _context3.t0);
            callback("");

          case 23:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 19]]);
  }));

  return function parseExplainCodeExpertHandler(_x6, _x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var parseCodeExperts = /*#__PURE__*/function () {
  var _ref6 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(repo, _ref5, callback) {
    var _ref5$gt, gt, _ref5$lt, lt;

    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _ref5$gt = _ref5.gt, gt = _ref5$gt === void 0 ? 0 : _ref5$gt, _ref5$lt = _ref5.lt, lt = _ref5$lt === void 0 ? 0 : _ref5$lt;
            handleAnalytics(HighLevelFilters.codeExperts, [{
              gt: gt,
              lt: lt
            }]);
            _context4.next = 4;
            return parseExpertReviewer(repo, {
              gt: gt,
              lt: lt
            }, callback);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function parseCodeExperts(_x9, _x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}();
var parseExplainExpertReviewer = /*#__PURE__*/function () {
  var _ref7 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(repo, args, callback) {
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            handleAnalytics(HighLevelFilters.explainExpertReviewer, [args]);
            _context5.next = 3;
            return parseExplainCodeExpertHandler(repo, args, callback);

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function parseExplainExpertReviewer(_x12, _x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
var parseExplainCodeExperts = /*#__PURE__*/function () {
  var _ref8 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(repo, args, callback) {
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            handleAnalytics(HighLevelFilters.explainCodeExperts, [args]);
            _context6.next = 3;
            return parseExplainCodeExpertHandler(repo, args, callback);

          case 3:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function parseExplainCodeExperts(_x15, _x16, _x17) {
    return _ref8.apply(this, arguments);
  };
}();

var PYTHON_COMMAND = 'python';
var minify = function minify(text) {
  return text.replace(/\s+/g, ' ').replaceAll("'", '"').trim();
};
var removeEmptyLines = function removeEmptyLines(text) {
  return text.replace(/^\s*[\r\n]/gm, '');
};
var jsFormatter = function jsFormatter(content, file) {
  return minify(prettier.format(content, {
    semi: false,
    singleQuote: true,
    filepath: file
  }));
};
var pyFormatter = function pyFormatter(content) {
  // Format the code with black
  var blackResult = spawnSync(PYTHON_COMMAND, ['-c', "import black; print(black.format_str(" + JSON.stringify(content) + ", mode=black.FileMode()))"]);
  var formattedCode = blackResult.stdout.toString();
  return removeEmptyLines(formattedCode);
};
var SUPPORTED_FORMATTERS = {
  js: jsFormatter,
  ts: jsFormatter,
  html: jsFormatter,
  py: pyFormatter,
  "default": minify
};
var format = function format(content, file) {
  var _file$split$pop;

  var fileExtension = (_file$split$pop = file.split('.').pop()) != null ? _file$split$pop : '';

  var formatter = _.get(SUPPORTED_FORMATTERS, fileExtension, SUPPORTED_FORMATTERS["default"]);

  return formatter(content, file);
};
var convertArgsToString = function convertArgsToString(args) {
  return Object.keys(args).map(function (key) {
    return key + "=" + args[key];
  });
};

var SONAR_REGEX = {
  BUGS: /\[\d+ Bugs?\]/g,
  VULNERABILITIES: /\[\d+ Vulnerabilit(?:ies|y)\]/g,
  SECURITY_HOTSPOTS: /\[\d+ Security Hotspots?\]/g,
  CODE_SMELL: /\[\d+ Code Smells?\]/g,
  DUPLICATIONS: /\[(\d+(\.\d+)?|\.\d+)%\]/g,
  COVERAGE: /\[(\d+(\.\d+)?|\.\d+)%\]/g,
  RATING: /!\[([A-Z])\]/g
};
var getSonarPropertyRating = function getSonarPropertyRating(str) {
  var _str$match;

  var rawRating = (_str$match = str.match(SONAR_REGEX.RATING)) == null ? void 0 : _str$match[0];
  var rating = rawRating == null ? void 0 : rawRating.substring(rawRating.lastIndexOf('[') + 1, rawRating.indexOf(']'));
  return rating ? rating : '';
};
var getSonarPropertyCount = function getSonarPropertyCount(row, regex, isFloat) {
  var _ref, _row$match, _row$match2;

  if (isFloat === void 0) {
    isFloat = false;
  }

  var count = (_ref = isFloat ? parseFloat(((_row$match = row.match(regex)) == null ? void 0 : _row$match[0].split(/\s+/)[0].replace('[', '')) || '') : parseInt(((_row$match2 = row.match(regex)) == null ? void 0 : _row$match2[0].split(/\s+/)[0].replace('[', '')) || '')) != null ? _ref : null;
  return isNaN(count) ? null : count;
};

var parseSonarParser = function parseSonarParser(pr) {
  handleAnalytics(HighLevelFilters.sonarParser, []);
  var sonarObject = {
    bugs: {
      count: null,
      rating: ''
    },
    code_smells: {
      count: null,
      rating: ''
    },
    vulnerabilities: {
      count: null,
      rating: ''
    },
    security_hotspots: {
      count: null,
      rating: ''
    },
    duplications: null,
    coverage: null
  };
  var sonarComment = pr.comments.filter(function (comment) {
    return comment.commenter === 'sonarcloud';
  });

  if (sonarComment.length) {
    var sonarCommentArray = sonarComment[0].content.split('\n');
    sonarObject.bugs = {
      count: getSonarPropertyCount(sonarCommentArray[2], SONAR_REGEX.BUGS),
      rating: getSonarPropertyRating(sonarCommentArray[2])
    };
    sonarObject.code_smells = {
      count: getSonarPropertyCount(sonarCommentArray[5], SONAR_REGEX.CODE_SMELL),
      rating: getSonarPropertyRating(sonarCommentArray[5])
    };
    sonarObject.vulnerabilities = {
      count: getSonarPropertyCount(sonarCommentArray[3], SONAR_REGEX.VULNERABILITIES),
      rating: getSonarPropertyRating(sonarCommentArray[3])
    };
    sonarObject.security_hotspots = {
      count: getSonarPropertyCount(sonarCommentArray[4], SONAR_REGEX.SECURITY_HOTSPOTS),
      rating: getSonarPropertyRating(sonarCommentArray[4])
    };
    sonarObject.duplications = getSonarPropertyCount(sonarCommentArray[8], SONAR_REGEX.DUPLICATIONS, true);
    sonarObject.coverage = getSonarPropertyCount(sonarCommentArray[7], SONAR_REGEX.COVERAGE, true);
  }

  return JSON.stringify(sonarObject);
};

var JIT_USER = 'jit-ci';
var parseJitReview = function parseJitReview(review) {
  var parsedReview = initEmptyJitObject();
  var conversations = review.conversations;
  conversations.forEach(function (conversation) {
    var _lines$, _lines$$split$, _lines$2, _lines$2$split$, _lines$3, _lines$3$split$, _lines$4, _lines$4$split$, _lines$10$split$1$spl, _lines$5, _lines$5$split$, _parsedReview$metrics;

    var content = conversation.content;
    var lines = content.split('\n');
    var security_control = (_lines$ = lines[0]) == null ? void 0 : (_lines$$split$ = _lines$.split('**')[2]) == null ? void 0 : _lines$$split$.trim();
    var type = (_lines$2 = lines[2]) == null ? void 0 : (_lines$2$split$ = _lines$2.split('**')[2]) == null ? void 0 : _lines$2$split$.trim();
    var description = (_lines$3 = lines[4]) == null ? void 0 : (_lines$3$split$ = _lines$3.split('**')[2]) == null ? void 0 : _lines$3$split$.trim();
    var severity = (_lines$4 = lines[6]) == null ? void 0 : (_lines$4$split$ = _lines$4.split('**')[2]) == null ? void 0 : _lines$4$split$.trim();

    var _summary = (_lines$10$split$1$spl = (_lines$5 = lines[10]) == null ? void 0 : (_lines$5$split$ = _lines$5.split('<summary>')[1]) == null ? void 0 : _lines$5$split$.split('</summary>')[0]) != null ? _lines$10$split$1$spl : '';

    var summary = _summary.replace(/<b>/g, '').replace(/<\/b>/g, '');

    parsedReview.vulnerabilities.push({
      security_control: security_control,
      type: type,
      description: description,
      severity: severity,
      summary: summary
    });
    parsedReview.metrics[severity] = ((_parsedReview$metrics = parsedReview.metrics[severity]) != null ? _parsedReview$metrics : 0) + 1;
  });
  return parsedReview;
};
var unifyReviews = function unifyReviews(parsedReviews, jitObject) {
  return parsedReviews.reduce(function (acc, review) {
    console.log({
      acc: acc,
      review: review
    });
    return _extends({}, acc, {
      vulnerabilities: [].concat(acc.vulnerabilities, review.vulnerabilities),
      metrics: _.mergeWith(acc.metrics, review.metrics, function (a, b) {
        return (a || 0) + (b || 0);
      })
    });
  }, _extends({}, jitObject));
};
var extractJitCommentsFromPR = function extractJitCommentsFromPR(pr) {
  return pr.reviews.filter(function (_ref) {
    var commenter = _ref.commenter;
    return commenter === JIT_USER;
  });
};
var initEmptyJitObject = function initEmptyJitObject() {
  return {
    vulnerabilities: [],
    metrics: {
      HIGH: null,
      MEDIUM: null,
      LOW: null,
      INFO: null
    }
  };
};

var parseJitComments = function parseJitComments(pr) {
  handleAnalytics(HighLevelFilters.extractJitFindings, []);
  var jitComments = extractJitCommentsFromPR(pr);
  var jitObject = initEmptyJitObject();

  if (_.isEmpty(jitComments)) {
    return JSON.stringify(jitObject);
  }

  var parsedReviews = jitComments.map(parseJitReview);
  return JSON.stringify(unifyReviews(parsedReviews, jitObject));
};

var jitFilter = {
  extractJitFindings: parseJitComments
};

var _FILTERED_OUT_LIST, _FILTERS_EXTENSION_LI, _extends2, _ASYNC;

var parseExtractSonarFindings = function parseExtractSonarFindings(pr) {
  handleAnalytics(HighLevelFilters.extractSonarFindings, []);
  return parseSonarParser(pr);
};

var parserMapToEnum = function parserMapToEnum(key, args) {
  handleAnalytics(HighLevelFilters.mapToEnum, [key, args]);
  var enumArgs = args == null ? void 0 : args["enum"];

  if (enumArgs && Object.keys(enumArgs).length) {
    return enumArgs[key];
  }
};

var parseFilterAllTests = function parseFilterAllTests(files, extensions) {
  var regex = new RegExp("[^a-zA-Z0-9](" + extensions.join('|') + ")[^a-zA-Z0-9]");
  return Boolean(files.length) && files.map(function (filePath) {
    return regex.test(filePath || '');
  }).every(function (x) {
    return x;
  });
};

var parseFilterAllFilePath = function parseFilterAllFilePath(files, searchArray) {
  return Boolean(files.length) && files.map(function (filePath) {
    return searchArray.some(function (term) {
      return (filePath || '').includes(term);
    });
  }).every(function (x) {
    return x;
  });
};

var parseFilterAllExtensions = function parseFilterAllExtensions(files, extensions) {
  return files.length ? parseFilterAllFilePath(files.map(function (filePath) {
    return filePath.split('.').pop() || '';
  }), extensions) : false;
};

var getUniqueExtensions = function getUniqueExtensions(files) {
  handleAnalytics(HighLevelFilters.extensions, []);
  return files // extensions
  .map(function (x) {
    return x.split('.').pop();
  }) // unique
  .filter(function (value, index, array) {
    return array.indexOf(value) === index;
  });
};

var parseIsFormattingChange = function parseIsFormattingChange(files) {
  try {
    handleAnalytics(HighLevelFilters.isFormattingChange, []);
    var allFormatting = Boolean(files.length) && files.every(function (_ref) {
      var new_content = _ref.new_content,
          original_content = _ref.original_content,
          original_file = _ref.original_file,
          new_file = _ref.new_file;
      var formattedNew = format(new_content, new_file);
      var formattedOld = format(original_content, original_file);
      return formattedNew === formattedOld;
    });
    return allFormatting;
  } catch (e) {
    return false;
  }
};

var parseMatchDiffLines = function parseMatchDiffLines(files, args) {
  handleAnalytics(HighLevelFilters.matchDiffLines, [args]);
  var regex = args.regex,
      ignoreWhiteSpaces = args.ignoreWhiteSpaces;
  var diffLinesRegex = new RegExp('^[+-]');
  var emptyLinesRegex = new RegExp('^[+-]\\s*$');
  return !regex ? [] : files.map(function (_ref2) {
    var diff = _ref2.diff;
    return diff.split('\n').filter(function (row) {
      return diffLinesRegex.test(row);
    }).filter(function (row) {
      return ignoreWhiteSpaces ? !emptyLinesRegex.test(row) : true;
    }).map(function (diffRow) {
      return internalRegex(diffRow, regex);
    });
  }).flat(1);
};

var parseIsFirstCommit = function parseIsFirstCommit(contributors, author) {
  handleAnalytics(HighLevelFilters.isFirstCommit, [{
    author: author
  }]);
  return _.get(contributors, author, null) ? false : true;
};

var parseRankByGitBlame = function parseRankByGitBlame(repo, args) {
  handleAnalytics(HighLevelFilters.rankByGitBlame, [args]);

  if (!isGtLtArgsValid(args)) {
    return [];
  }

  var gt = args.gt,
      lt = args.lt;

  var _convertContributorsA = convertContributorsAndBlame(repo),
      blame = _convertContributorsA.blame;

  var blameByAuthor = sumAuthorMetrics(Object.values(repo.git_to_provider_user), blame);
  var comparedResult = validateAndCompare(blameByAuthor, gt, lt);
  return Object.keys(comparedResult).length ? [].concat(Array.from(new Set(Object.keys(comparedResult)))) : [];
};

var parseRankByGitActivity = function parseRankByGitActivity(repo, args) {
  handleAnalytics(HighLevelFilters.rankByGitActivity, [args]);
  var gt = args.gt,
      lt = args.lt,
      weeks = args.weeks;

  if (!gt && !lt || !weeks) {
    return [];
  }

  var weeksArr = new Array(weeks + 1).fill(0).map(function (_, i) {
    return "week_" + i;
  });
  var totalsPerFile = calculateActivityPerFile(repo.git_activity, weeksArr);
  var fileSumPerAuthor = calculateFileSumPerAuthorActivity(repo.git_activity, weeksArr, totalsPerFile);
  var activityByAuthor = sumAuthorMetrics(Object.keys(repo.contributors), fileSumPerAuthor);
  var convertContributors = convertAndSumContributors(activityByAuthor, repo.git_to_provider_user);
  var comparedResult = validateAndCompare(convertContributors, gt, lt);
  return Object.keys(comparedResult).length ? [].concat(Array.from(new Set(Object.keys(comparedResult)))) : [];
};

var parseExplainRankByGitBlame = function parseExplainRankByGitBlame(repo, args) {
  handleAnalytics(HighLevelFilters.explainRankByGitBlame, [args]);

  if (!isGtLtArgsValid(args)) {
    return {};
  }

  var parseResult = parseRankByGitBlame(repo, args);

  var authorFilteredParseResult = _.filter(parseResult, function (contributor) {
    return contributor !== repo.pr_author;
  });

  var authorFilteredParseResultString = authorFilteredParseResult.join(', ');
  var isNoUserButYou = !authorFilteredParseResult.length && parseResult.length > 0;
  var formattedBlameContext = convertBlameContextToExplain(repo);
  return "base64: " + Buffer.from(explainBlameTemplate(args, authorFilteredParseResultString, formattedBlameContext, repo.provider, isNoUserButYou)).toString('base64');
};

var HighLevelFilters;

(function (HighLevelFilters) {
  HighLevelFilters["allDocs"] = "allDocs";
  HighLevelFilters["allImages"] = "allImages";
  HighLevelFilters["allTests"] = "allTests";
  HighLevelFilters["estimatedReviewTime"] = "estimatedReviewTime";
  HighLevelFilters["extensions"] = "extensions";
  HighLevelFilters["isFormattingChange"] = "isFormattingChange";
  HighLevelFilters["matchDiffLines"] = "matchDiffLines";
  HighLevelFilters["isFirstCommit"] = "isFirstCommit";
  HighLevelFilters["rankByGitBlame"] = "rankByGitBlame";
  HighLevelFilters["rankByGitActivity"] = "rankByGitActivity";
  HighLevelFilters["explainRankByGitBlame"] = "explainRankByGitBlame";
  HighLevelFilters["expertReviewer"] = "expertReviewer";
  HighLevelFilters["explainExpertReviewer"] = "explainExpertReviewer";
  HighLevelFilters["codeExperts"] = "codeExperts";
  HighLevelFilters["explainCodeExperts"] = "explainCodeExperts";
  HighLevelFilters["sonarParser"] = "sonarParser";
  HighLevelFilters["mapToEnum"] = "mapToEnum";
  HighLevelFilters["extractSonarFindings"] = "extractSonarFindings";
  HighLevelFilters["extractJitFindings"] = "extractJitFindings";
})(HighLevelFilters || (HighLevelFilters = {}));

var FILTERED_OUT_LIST = (_FILTERED_OUT_LIST = {}, _FILTERED_OUT_LIST[HighLevelFilters.allDocs] = ['requirements.txt'], _FILTERED_OUT_LIST);
var FILTERS_EXTENSION_LIST = (_FILTERS_EXTENSION_LI = {}, _FILTERS_EXTENSION_LI[HighLevelFilters.allDocs] = ['md', 'mkdown', 'txt', 'rst', '.adoc'], _FILTERS_EXTENSION_LI[HighLevelFilters.allImages] = ['svg', 'png', 'gif'], _FILTERS_EXTENSION_LI[HighLevelFilters.allTests] = ['test', 'spec'], _FILTERS_EXTENSION_LI);
var HIGH_LEVEL_FILTERS_HANDLER = /*#__PURE__*/_extends((_extends2 = {}, _extends2[HighLevelFilters.allDocs] = function (files) {
  handleAnalytics(HighLevelFilters.allDocs, []);
  return Boolean(files.length) && files.every(function (file) {
    return FILTERED_OUT_LIST[HighLevelFilters.allDocs].every(function (excludedFile) {
      return !(file.includes('/' + excludedFile) || file === excludedFile);
    });
  }) && parseFilterAllExtensions(files, FILTERS_EXTENSION_LIST[HighLevelFilters.allDocs]);
}, _extends2[HighLevelFilters.allImages] = function (files) {
  handleAnalytics(HighLevelFilters.allImages, []);
  return parseFilterAllExtensions(files, FILTERS_EXTENSION_LIST[HighLevelFilters.allImages]);
}, _extends2[HighLevelFilters.allTests] = function (files) {
  handleAnalytics(HighLevelFilters.allTests, []);
  return parseFilterAllTests(files, FILTERS_EXTENSION_LIST[HighLevelFilters.allTests]);
}, _extends2[HighLevelFilters.estimatedReviewTime] = estimatedReviewTime, _extends2[HighLevelFilters.extensions] = getUniqueExtensions, _extends2[HighLevelFilters.isFormattingChange] = parseIsFormattingChange, _extends2[HighLevelFilters.matchDiffLines] = parseMatchDiffLines, _extends2[HighLevelFilters.isFirstCommit] = parseIsFirstCommit, _extends2[HighLevelFilters.rankByGitBlame] = parseRankByGitBlame, _extends2[HighLevelFilters.rankByGitActivity] = parseRankByGitActivity, _extends2[HighLevelFilters.explainRankByGitBlame] = parseExplainRankByGitBlame, _extends2[HighLevelFilters.expertReviewer] = parseExpertReviewer, _extends2[HighLevelFilters.explainExpertReviewer] = parseExplainExpertReviewer, _extends2[HighLevelFilters.codeExperts] = parseCodeExperts, _extends2[HighLevelFilters.explainCodeExperts] = parseExplainCodeExperts, _extends2[HighLevelFilters.sonarParser] = parseSonarParser, _extends2[HighLevelFilters.mapToEnum] = parserMapToEnum, _extends2[HighLevelFilters.extractSonarFindings] = parseExtractSonarFindings, _extends2), jitFilter);
var ASYNC = (_ASYNC = {}, _ASYNC[HighLevelFilters.estimatedReviewTime] = true, _ASYNC[HighLevelFilters.expertReviewer] = true, _ASYNC[HighLevelFilters.explainExpertReviewer] = true, _ASYNC[HighLevelFilters.codeExperts] = true, _ASYNC[HighLevelFilters.explainCodeExperts] = true, _ASYNC);

var _FILTER_HANDLERS;

var parseFilterAllFilePath$1 = function parseFilterAllFilePath(files, searchArray) {
  return files.length && files.map(function (filePath) {
    return searchArray.some(function (term) {
      return (filePath || '').includes(term);
    });
  }).every(function (x) {
    return x === true;
  });
};

var parseIsEveryExtension = function parseIsEveryExtension(files, extensions) {
  return parseFilterAllFilePath$1(files.map(function (filePath) {
    return filePath.split('.').pop() || '';
  }).filter(function (value, index, array) {
    return array.indexOf(value) === index;
  }), extensions);
};

var parseIsEveryExtensionRegex = function parseIsEveryExtensionRegex(files, filter) {
  var re = new RegExp(filter);
  var extensions = files.map(function (filePath) {
    return filePath.split('.').pop() || '';
  }).filter(function (value, index, array) {
    return array.indexOf(value) === index;
  });
  return extensions.length > 0 && extensions.map(function (filePath) {
    return re.test(filePath);
  }).every(function (match) {
    return match;
  });
};

var parseExtractExtensions = function parseExtractExtensions(files) {
  return files.length && files // extensions
  .map(function (x) {
    return x.split('.').pop();
  }) // unique
  .filter(function (value, index, array) {
    return array.indexOf(value) === index;
  });
};

var parseIsStringIncludes = function parseIsStringIncludes(file, terms) {
  return terms.some(function (term) {
    return file.includes(term);
  });
};

var parseIsStringIncludesRegex = function parseIsStringIncludesRegex(file, filter) {
  var re = new RegExp(filter);
  return re.test(file);
};

var parseRegex = function parseRegex(files, filter) {
  var re = new RegExp(filter);
  return files.length ? files.map(function (file) {
    return re.test(file);
  }).every(function (match) {
    return match;
  }) : false;
};

var parseIsEveryInListRegex = function parseIsEveryInListRegex(files, filter) {
  var re = new RegExp(filter);
  return files.length ? files.map(function (file) {
    return re.test(file);
  }).every(function (match) {
    return match;
  }) : false;
};

var parseIsEveryInList = function parseIsEveryInList(files, filters) {
  return files.length ? files.filter(function (file) {
    return filters.includes(file);
  }).every(function (match) {
    return match;
  }) : false;
};

var parseIsSomeInList = function parseIsSomeInList(files, searchTerms) {
  return files.length ? files.filter(function (file) {
    return searchTerms.includes(file);
  }).some(function (match) {
    return match;
  }) : false;
};

var parseIncludesRegex = function parseIncludesRegex(files, filter) {
  var re = new RegExp(filter);
  return files.length ? files.map(function (file) {
    return re.test(file);
  }).some(function (match) {
    return match;
  }) : false;
};

var parseIsSomeInListRegex = function parseIsSomeInListRegex(files, filter) {
  var re = new RegExp(filter);
  return files.length ? files.map(function (file) {
    return re.test(file);
  }).some(function (match) {
    return match;
  }) : false;
};

var parseFilterRegex = function parseFilterRegex(files, filter) {
  var re = new RegExp(filter);
  return files.length ? files.filter(function (file) {
    return re.test(file);
  }) : false;
};

var parseFilterListRegex = function parseFilterListRegex(files, filter) {
  var re = new RegExp(filter);
  return files.length ? files.filter(function (file) {
    return re.test(file);
  }) : false;
};

var parseFilterList = function parseFilterList(files, filters) {
  return files.length ? files.filter(function (file) {
    return filters.includes(file);
  }) : false;
};

var minify$1 = function minify(text) {
  return text.replace(/\s+/g, ' ').replaceAll("'", '"').trim();
};

var allFormattingChange = function allFormattingChange(files) {
  try {
    var allFormatting = files.every(function (_ref) {
      var new_content = _ref.new_content,
          original_content = _ref.original_content,
          original_file = _ref.original_file,
          new_file = _ref.new_file;
      var formattedNew = prettier.format(new_content, {
        semi: false,
        singleQuote: true,
        filepath: new_file
      });
      var formattedOld = prettier.format(original_content, {
        semi: false,
        singleQuote: true,
        filepath: original_file
      });
      return minify$1(formattedNew) === minify$1(formattedOld);
    });
    return allFormatting;
  } catch (e) {
    return false;
  }
};

var parseFilterFileDiffRegex = function parseFilterFileDiffRegex(files, filterRegex) {
  var re = new RegExp(filterRegex, 'm');
  return files.length ? files.filter(function (_ref2) {
    var diff = _ref2.diff;
    return re.test(diff);
  }) : false;
};

var parseIsEveryLineInFileDiffRegex = function parseIsEveryLineInFileDiffRegex(files, filterRegex) {
  var re = new RegExp(filterRegex, 'm');
  return files.length ? files.map(function (_ref3) {
    var diff = _ref3.diff;
    return re.test(diff);
  }).every(function (match) {
    return match;
  }) : false;
};

var parseIsSomeLineInFileDiffRegex = function parseIsSomeLineInFileDiffRegex(files, filterRegex) {
  var re = new RegExp(filterRegex, 'm');
  return files.length ? files.map(function (_ref4) {
    var diff = _ref4.diff;
    return re.test(diff);
  }).some(function (match) {
    return match;
  }) : false;
};

var parseFilterAllExtensions$1 = function parseFilterAllExtensions(files, extensions) {
  return files.length ? parseFilterAllFilePath$1(files.map(function (filePath) {
    return filePath.split('.').pop() || '';
  }), extensions) : false;
};

var Filters;

(function (Filters) {
  Filters["allExtensions"] = "allExtensions";
  Filters["includes"] = "includes";
  Filters["allPassRegex"] = "allPassRegex";
  Filters["allPathIncludes"] = "allPathIncludes";
  Filters["filterRegex"] = "filterRegex";
  Filters["includesRegex"] = "includesRegex";
  Filters["true"] = "true";
  Filters["allFormattingChange"] = "allFormattingChange";
  Filters["filterList"] = "filterList";
  Filters["filterListRegex"] = "filterListRegex";
  Filters["isEveryInListRegex"] = "isEveryInListRegex";
  Filters["isSomeInList"] = "isSomeInList";
  Filters["isSomeInListRegex"] = "isSomeInListRegex";
  Filters["isStringIncludes"] = "isStringIncludes";
  Filters["isStringIncludesRegex"] = "isStringIncludesRegex";
  Filters["isEveryInList"] = "isEveryInList";
  Filters["extractExtensions"] = "extractExtensions";
  Filters["isEveryExtension"] = "isEveryExtension";
  Filters["isEveryExtensionRegex"] = "isEveryExtensionRegex";
  Filters["filterFileDiffRegex"] = "filterFileDiffRegex";
  Filters["isEveryLineInFileDiffRegex"] = "isEveryLineInFileDiffRegex";
  Filters["isSomeLineInFileDiffRegex"] = "isSomeLineInFileDiffRegex";
})(Filters || (Filters = {}));

var FILTER_HANDLERS = (_FILTER_HANDLERS = {}, _FILTER_HANDLERS[Filters.filterList] = parseFilterList, _FILTER_HANDLERS[Filters.filterListRegex] = parseFilterListRegex, _FILTER_HANDLERS[Filters.isEveryInListRegex] = parseIsEveryInListRegex, _FILTER_HANDLERS[Filters.isSomeInList] = parseIsSomeInList, _FILTER_HANDLERS[Filters.isSomeInListRegex] = parseIsSomeInListRegex, _FILTER_HANDLERS[Filters.isStringIncludes] = parseIsStringIncludes, _FILTER_HANDLERS[Filters.isStringIncludesRegex] = parseIsStringIncludesRegex, _FILTER_HANDLERS[Filters.isEveryInList] = parseIsEveryInList, _FILTER_HANDLERS[Filters.extractExtensions] = parseExtractExtensions, _FILTER_HANDLERS[Filters.isEveryExtension] = parseIsEveryExtension, _FILTER_HANDLERS[Filters.isEveryExtensionRegex] = parseIsEveryExtensionRegex, _FILTER_HANDLERS[Filters["true"]] = function () {
  return true;
}, _FILTER_HANDLERS[Filters.filterFileDiffRegex] = parseFilterFileDiffRegex, _FILTER_HANDLERS[Filters.isEveryLineInFileDiffRegex] = parseIsEveryLineInFileDiffRegex, _FILTER_HANDLERS[Filters.isSomeLineInFileDiffRegex] = parseIsSomeLineInFileDiffRegex, _FILTER_HANDLERS[Filters.allExtensions] = parseFilterAllExtensions$1, _FILTER_HANDLERS[Filters.allPassRegex] = parseRegex, _FILTER_HANDLERS[Filters.allPathIncludes] = parseFilterAllFilePath$1, _FILTER_HANDLERS[Filters.filterRegex] = parseFilterRegex, _FILTER_HANDLERS[Filters.includesRegex] = parseIncludesRegex, _FILTER_HANDLERS[Filters.allFormattingChange] = allFormattingChange, _FILTER_HANDLERS);

var DefaultParserAttributes;

(function (DefaultParserAttributes) {
  DefaultParserAttributes["cbLeft"] = "_GITSTREAM_CB_LEFT_";
  DefaultParserAttributes["cbRight"] = "_GITSTREAM_CB_RIGHT_";
  DefaultParserAttributes["automations"] = "automations";
  DefaultParserAttributes["errors"] = "errors";
  DefaultParserAttributes["analytics"] = "analytics";
  DefaultParserAttributes["validatorErrors"] = "validatorErrors";
})(DefaultParserAttributes || (DefaultParserAttributes = {}));

var Validators;

(function (Validators) {
  Validators["FiltersValidator"] = "FiltersValidator";
  Validators["ActionsValidator"] = "ActionsValidator";
  Validators["FileStructureValidator"] = "FileStructureValidator";
  Validators["SavedWordsValidator"] = "SavedWordsValidator";
  Validators["ContextVariableValidator"] = "ContextVariableValidator";
})(Validators || (Validators = {}));

var RuleParser = /*#__PURE__*/function () {
  function RuleParser(ruleFileContent, context, debugMode) {
    var _this = this;

    this.renderedRuleFile = {};
    this.context = {};
    this.lastParserResult = {};
    this.errors = {};
    this.validatorErrors = {};
    this.isDebug = debugMode;
    this.env = new Environment(new FileSystemLoader(__dirname), {
      autoescape: false
    });

    var allFilters = _extends({}, GENERAL_FILTERS_HANDLER, HIGH_LEVEL_FILTERS_HANDLER, FILTER_HANDLERS);

    Object.keys(allFilters).forEach(function (filter) {
      _this.env.addFilter(filter, allFilters[filter], ASYNC[filter]);
    });
    this.context = context;
    this.ruleFileRawContent = ruleFileContent;

    if (this.isDebug) {
      console.log({
        context: JSON.stringify(this.context, null, 2),
        ruleFile: ruleFileContent
      });
    }
  }

  var _proto = RuleParser.prototype;

  _proto.render = /*#__PURE__*/function () {
    var _render = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(context) {
      var _this2 = this;

      var reRenders, currentContext, _loop;

      return _regeneratorRuntime().wrap(function _callee$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (context === void 0) {
                context = /*#__PURE__*/_extends({}, this.context, this.renderedRuleFile);
              }

              reRenders = 3;
              currentContext = context;
              _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
                var dataAsString;
                return _regeneratorRuntime().wrap(function _loop$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        dataAsString = _this2.ruleFileRawContent;
                        _context.next = 3;
                        return new Promise(function (resolve, reject) {
                          return _this2.env.renderString(dataAsString, currentContext, function (err, res) {
                            if (err) {
                              if (_this2.isDebug) {
                                console.log(ERRORS.FAILED_RENDER_STRING, err);
                              }

                              reject(err);
                              return;
                            }

                            try {
                              _this2.renderedRuleFile = load(res);
                            } catch (error) {
                              var _extends2;

                              if (_this2.isDebug) {
                                console.log(ERRORS.FAILED_YAML_LOAD, error);
                              }

                              _this2.renderedRuleFile = _extends({}, _this2.renderedRuleFile, {
                                errors: _extends({}, Object.keys(_this2.errors).length && _this2.errors, (_extends2 = {}, _extends2[STATUS_CODES.FAILED_YAML_LOAD] = ERRORS.FAILED_YAML_LOAD, _extends2))
                              });
                            }

                            resolve(_this2);
                          });
                        });

                      case 3:
                        reRenders -= 1;
                        currentContext = _extends({}, _this2.context, _this2.renderedRuleFile);

                      case 5:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _loop);
              });

            case 4:
              if (!reRenders) {
                _context2.next = 8;
                break;
              }

              return _context2.delegateYield(_loop(), "t0", 6);

            case 6:
              _context2.next = 4;
              break;

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee, this);
    }));

    function render(_x) {
      return _render.apply(this, arguments);
    }

    return render;
  }();

  _proto.validateRun = function validateRun(runs) {
    if (!runs) {
      return runs;
    }

    return runs.map(function (run) {
      if (!run.args) {
        return run;
      }

      var newArgs = Object.keys(run.args).reduce(function (acc, arg) {
        var _extends3;

        var argValue = run.args[arg];
        return _extends({}, acc, (_extends3 = {}, _extends3[arg] = argValue && listify.includes(arg) && typeof argValue === 'string' ? argValue.split(',') : run.args[arg], _extends3));
      }, {});
      return _extends({}, run, {
        args: newArgs
      });
    });
  };

  _proto.combineMetadataWithRulesResult = function combineMetadataWithRulesResult(resourceName) {
    var _this3 = this;

    if (!this.renderedRuleFile[resourceName]) {
      return {};
    }

    return Object.keys(this.renderedRuleFile[resourceName]).reduce(function (acc, resource) {
      var _extends4;

      var rules = _this3.renderedRuleFile[resourceName][resource]["if"].map(function (result) {
        return {
          passed: result
        };
      });

      var passed = rules.map(function (_ref) {
        var passed = _ref.passed;
        return passed;
      }).every(function (pass) {
        return typeof pass === 'object' ? !!Object.keys(pass || {}).length : !!pass;
      });
      return _extends({}, acc, (_extends4 = {}, _extends4[resource] = {
        "if": rules,
        run: _this3.validateRun(_this3.renderedRuleFile[resourceName][resource].run),
        passed: passed
      }, _extends4));
    }, {});
  };

  _proto.combineMetadataWithResult = function combineMetadataWithResult() {
    var _this$lastParserResul;

    this.lastParserResult = (_this$lastParserResul = {}, _this$lastParserResul[DefaultParserAttributes.errors] = _extends({}, Object.keys(this.errors).length && this.errors), _this$lastParserResul[DefaultParserAttributes.validatorErrors] = _extends({}, Object.keys(this.validatorErrors).length && this.validatorErrors), _this$lastParserResul[DefaultParserAttributes.automations] = _extends({}, this.combineMetadataWithRulesResult(DefaultParserAttributes.automations)), _this$lastParserResul[DefaultParserAttributes.analytics] = _extends({}, Object.keys(FiltersForAnalytics.filters).length && FiltersForAnalytics.filters), _this$lastParserResul);
    return this.lastParserResult;
  };

  _proto.clearParserResults = function clearParserResults() {
    this.renderedRuleFile = {};
    this.ruleFileRawContent = '';
    this.lastParserResult = {};
  };

  _proto.attachAdditionalArgs = /*#__PURE__*/function () {
    var _attachAdditionalArgs = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var latestResults, newAutomations, _i, _Object$keys, automation, _iterator, _step, run;

      return _regeneratorRuntime().wrap(function _callee2$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              latestResults = _.cloneDeep(this.lastParserResult);
              newAutomations = _extends({}, latestResults.automations);
              _i = 0, _Object$keys = Object.keys(newAutomations);

            case 3:
              if (!(_i < _Object$keys.length)) {
                _context3.next = 19;
                break;
              }

              automation = _Object$keys[_i];
              _iterator = _createForOfIteratorHelperLoose(newAutomations[automation].run);

            case 6:
              if ((_step = _iterator()).done) {
                _context3.next = 16;
                break;
              }

              run = _step.value;

              if (!(run.action === validatorsConstants.SUPPORTED_ACTIONS.EXPLAIN_CODE_EXPERTS)) {
                _context3.next = 14;
                break;
              }

              this.clearParserResults();
              this.ruleFileRawContent = "comment: |\n          {{ repo | explainCodeExperts(" + convertArgsToString(run.args) + ") }}";
              _context3.next = 13;
              return this.render();

            case 13:
              run.args.comment = this.renderedRuleFile.comment;

            case 14:
              _context3.next = 6;
              break;

            case 16:
              _i++;
              _context3.next = 3;
              break;

            case 19:
              this.lastParserResult = _extends({}, latestResults, {
                automations: newAutomations
              });
              return _context3.abrupt("return", this.lastParserResult);

            case 21:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee2, this);
    }));

    function attachAdditionalArgs() {
      return _attachAdditionalArgs.apply(this, arguments);
    }

    return attachAdditionalArgs;
  }();

  _proto.validateCM = function validateCM() {
    var _validators,
        _this4 = this;

    //TODO: in the near future we will add operational validators
    // which will break gitstream
    var validators = (_validators = {}, _validators[Validators.FiltersValidator] = new FiltersValidator(), _validators[Validators.ActionsValidator] = new ActionsValidator(), _validators[Validators.FileStructureValidator] = new FileStructureValidator(), _validators[Validators.SavedWordsValidator] = new SavedWordsValidator(), _validators[Validators.ContextVariableValidator] = new ContextVariableValidator(), _validators);
    Object.keys(validators).forEach(function (validator) {
      try {
        validators[validator].validate({
          yamlFile: _this4.ruleFileRawContent
        });
      } catch (error) {
        var _extends5;

        if (_this4.isDebug) {
          console.log(validator + " error: ", error);
        }

        _this4.validatorErrors = _extends({}, Object.keys(_this4.validatorErrors).length && _this4.validatorErrors, (_extends5 = {}, _extends5[validator] = "" + error, _extends5));
      }
    });
  };

  _proto.parseStreams = /*#__PURE__*/function () {
    var _parseStreams = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      return _regeneratorRuntime().wrap(function _callee3$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              this.validateCM();
              _context4.next = 3;
              return this.render();

            case 3:
              this.combineMetadataWithResult();
              _context4.next = 6;
              return this.attachAdditionalArgs();

            case 6:
              return _context4.abrupt("return", this.lastParserResult);

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee3, this);
    }));

    function parseStreams() {
      return _parseStreams.apply(this, arguments);
    }

    return parseStreams;
  }();

  return RuleParser;
}();

var RULES_RESOLVER_URL = process.env.RULES_RESOLVER_URL;
var HEAD_REF = process.env.HEAD_REF;
var BASE_REF = process.env.BASE_REF;
var CLIENT_PAYLOAD = process.env.CLIENT_PAYLOAD || '{}';
var RESOLVER_TOKEN = process.env.RULES_RESOLVER_TOKEN;
var DEBUG_MODE = process.env.DEBUG_MODE === 'true';
var USE_CACHE = process.env.USE_CACHE === 'true';
var ERRORS$1 = {
  SYNTAX_ERROR: 'syntax error',
  RULE_FILE_NOT_FOUND: 'Rule file not found',
  FAILED_TO_EXTRACT_ADMINS: 'gitstream.cm file not found - failed to extract admins',
  SEND_RESULTS_TO_RESOLVER_FAILED: 'Failed sending evaluated rules to the resolver.',
  SEND_RESULTS_TO_RESOLVER_SUCCEEDED: 'Sending evaluated rules to the resolver succeeded',
  FAILED_TO_GET_CONTEXT: 'Failed getting PR context.',
  FAILED_PARSE_CM_FILE: 'Failed while parsing CM file, to extract CM config',
  MISSING_KEYWORD: 'Missing `automations` keyword in *.cm',
  MALFORMED_EXPRESSION: 'There are spaces between the currly braces { { and } }',
  FAILED_TO_PARSE_CM: 'Failed to parse cm',
  FAILED_TO_GET_WATCHERS: 'Failed to get watchers from rules files',
  GIT_COMMAND_FAILED: 'Git command failed. reason:',
  INTERNAL_ERROR: 'gitstream-rules-engine internal error',
  INVALID_CACHE: 'Invalid cache',
  VALIDATOR_ERROR: 'Validator error',
  FAILED_PARSE_RULES_PARSER_ERRORS: 'Failed parse rules parser errors'
};
var STATUS_CODES$1 = {
  SEND_RESULTS_TO_RESOLVER_FAILED: 50,
  FAILED_TO_GET_CONTEXT: 40,
  SYNTAX_ERROR: 60,
  MISSING_KEYWORD: 61,
  UNSUPPORTED_ACTION: 62,
  UNSUPPORTED_ARGUMENT: 63,
  MALFORMED_EXPRESSION: 64,
  MISSING_REQUIRED_FIELDS: 65,
  FAILED_TO_PARSE_CM: 66,
  BAD_REVISION: 67,
  INTERNAL_ERROR: 68,
  RULE_FILE_NOT_FOUND: 70,
  FAILED_TO_GET_WATCHERS: 71,
  INVALID_CACHE: 72,
  FAILED_PARSE_RULES_PARSER_ERRORS: 73
};
var NOT_FOUND_FILE_PATH = '/dev/null';
var IGNORE_PATTERNS_IN_DRY_RUN = [/.*.cm$/];
var GIT_PROVIDER = {
  GITHUB: 'github',
  GITLAB: 'gitlab'
};
var ORG_LEVEL_REPO = 'cm';
var WATCH_PR_EVENTS = {
  APPROVALS: 'approvals',
  CHECKS: 'checks',
  DRAFT: 'draft',
  DESCRIPTION: 'description',
  REVIEWERS: 'reviewers',
  STATUS: 'status',
  TITLE: 'title',
  LABELS: 'labels'
};
var WATCH_FILTERS = {
  sonarParser: /\bpr\s*\|\s*sonarParser\b/g,
  extractSonarFindings: /\bpr\s*\|\s*extractSonarFindings\b/g
};

var sendLogToDD = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(logData) {
    var _JSON$parse, ddApiKey, env, data, res;

    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _JSON$parse = JSON.parse(CLIENT_PAYLOAD), ddApiKey = _JSON$parse.ddApiKey, env = _JSON$parse.env;
            data = _extends({}, logData, {
              env: env,
              ddtags: "env:" + env,
              host: 'gitstream-github-action'
            });
            _context.prev = 2;
            _context.next = 5;
            return axios({
              method: 'post',
              url: "https://http-intake.logs.datadoghq.com//api/v2/logs?dd-api-key=" + ddApiKey + "&ddsource=nodejs&service=gitstream-rules-engine",
              data: data,
              headers: {
                'Content-type': 'application/json'
              }
            });

          case 5:
            res = _context.sent;
            return _context.abrupt("return", res);

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](2);
            console.error("Failed sending logs to datadog");

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 9]]);
  }));

  return function sendLogToDD(_x) {
    return _ref.apply(this, arguments);
  };
}();

var debug = function debug(message) {
  if (DEBUG_MODE) {
    console.log(message);
  }
};
var prepareSendingLogsToDD = /*#__PURE__*/function () {
  var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(level, message, payload, extraData, shouldReport) {
    var owner, repo, pullRequestNumber, branch, triggeredBy;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (extraData === void 0) {
              extraData = {};
            }

            if (shouldReport === void 0) {
              shouldReport = false;
            }

            if (!(DEBUG_MODE || shouldReport)) {
              _context2.next = 6;
              break;
            }

            owner = payload.owner, repo = payload.repo, pullRequestNumber = payload.pullRequestNumber, branch = payload.branch, triggeredBy = payload.triggeredBy;
            _context2.next = 6;
            return sendLogToDD({
              level: level,
              message: message,
              data: _extends({}, Object.keys(extraData).length && extraData, {
                org: owner,
                repo: repo,
                pullRequestNumber: pullRequestNumber,
                branch: branch,
                triggeredBy: triggeredBy
              })
            });

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function prepareSendingLogsToDD(_x2, _x3, _x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var attachAdditionalContextByProvider = function attachAdditionalContextByProvider(provider, context) {
  var attachContextByProvider = {
    gitlab: function gitlab(context) {
      return {
        performNonSoftCommands: false
      };
    }
  };
  var getContextCb = attachContextByProvider[provider];
  var additionalContext = getContextCb ? getContextCb(context) : null;
  return additionalContext || {};
};

// @ts-nocheck
var ACTIVITY_SINCE = '52 weeks ago';
var gitCommands = {
  GIT_BLAME: function GIT_BLAME(_ref) {
    var branch = _ref.branch,
        file = _ref.file;
    return "git blame '" + branch + "' --line-porcelain -- '" + file + "'";
  },
  GIT_LOG: function GIT_LOG(_ref2) {
    var file = _ref2.file;
    return "git log -- '" + file + "'";
  },
  GIT_BLAME_AUTHORS_FORMAT: function GIT_BLAME_AUTHORS_FORMAT() {
    return "| grep '^author-mail\\|^author ' | sed '$!N;s/\\n/ /'";
  },
  GIT_BLAME_STRING: function GIT_BLAME_STRING() {
    return "| sed -n '/^author /,/^author-mail /p'";
  },
  COMMITER_PER_FILE: function COMMITER_PER_FILE(_ref3) {
    var file = _ref3.file;
    return "git shortlog -s -n --all --no-merges '" + file + "'";
  },
  COMMITS_DATE_BY_AUTHOR: function COMMITS_DATE_BY_AUTHOR(_ref4) {
    var branch = _ref4.branch,
        author = _ref4.author;
    return "git log '" + branch + "' --author='" + author + "' --format='%as' | sort | uniq";
  },
  GIT_ACTIVITY: function GIT_ACTIVITY(_ref5) {
    var branch = _ref5.branch,
        file = _ref5.file,
        since = _ref5.since;
    return "git log --no-merges '" + branch + "' --since='" + since + "' --pretty=tformat:'%an <%ae>,%ad' --numstat -- '" + file + "'";
  },
  AUTHORS_COUNT: function AUTHORS_COUNT() {
    return "git log --format='%an <%ae>' | sort | uniq";
  },
  REPO_FILES_COUNT: function REPO_FILES_COUNT() {
    return "git ls-files | wc -l";
  },
  FIRST_COMMIT: function FIRST_COMMIT(_ref6) {
    var branch = _ref6.branch;
    return "git rev-list --max-parents=0 '" + branch + "' --format=\"%cs\"";
  }
};
var GIT_ERRORS = {
  GETTING_ALL_AUTHORS: 'Failed getting all authors of file',
  GETTING_AUTHOR_LINES: 'Failed getting author lines of file',
  GETTING_GIT_BLAME: 'Failed getting git blame of file'
};
var GIT_INFO = {
  RAW_GIT_COMMANDS: 'Raw git commands for file in pr',
  NO_DATA_FROM_GIT: 'No data returned from git in pr'
};
var REPO_FOLDER = {
  DEFAULT: 'repo',
  CM: 'cm'
};
var GIT_ERROR_TYPE = {
  BAD_REVISION: 'bad revision'
};
var MAIN_RULES_FILE = 'gitstream.cm';

var groupByWeek = function groupByWeek(activity) {
  var weekSum = activity.reduce(function (acc, cur, i) {
    var item = i > 0 && acc.find(function (_ref) {
      var git_user = _ref.git_user,
          week = _ref.week;
      return git_user === cur.git_user && week === cur.week;
    });

    if (item) {
      item.changes += cur.changes;
      item.week = cur.week;
    } else {
      acc.push({
        git_user: cur.git_user,
        week: cur.week,
        changes: cur.changes
      });
    }

    return acc;
  }, []);
  return weekSum.reduce(function (accSum, _ref2) {
    var _extends2;

    var git_user = _ref2.git_user,
        week = _ref2.week,
        changes = _ref2.changes;
    accSum[git_user] = accSum[git_user] || {};
    accSum[git_user] = _extends({}, accSum[git_user], (_extends2 = {}, _extends2["week_" + week] = changes, _extends2));
    return _extends({}, accSum);
  }, {});
};
var calculateLinesPercentage = function calculateLinesPercentage(authorLines, allLinesCount) {
  return authorLines && allLinesCount ? authorLines >= allLinesCount ? 100 : parseFloat(authorLines / allLinesCount) * 100 : 0;
};
var formatDateToDays = /*#__PURE__*/function () {
  var _ref3 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(date, context, payload) {
    var owner, repo, pullRequestNumber, today, formattedDate;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (date) {
              _context.next = 6;
              break;
            }

            owner = payload.owner, repo = payload.repo, pullRequestNumber = payload.pullRequestNumber;
            debug("Couldn't find git dates for author: " + context.branch.author + ", base branch: " + context.branch.base + ", head branch: " + context.branch.name);
            _context.next = 5;
            return prepareSendingLogsToDD('info', GIT_INFO.NO_DATA_FROM_GIT + " " + owner + "/" + repo + "/" + pullRequestNumber, payload, {
              author: context.branch.author,
              baseBranch: context.branch.base,
              headBranch: context.branch.name
            }, DEBUG_MODE);

          case 5:
            return _context.abrupt("return", 0);

          case 6:
            today = new Date();
            formattedDate = new Date(date);
            return _context.abrupt("return", Math.abs(parseInt((formattedDate - today) / (1000 * 60 * 60 * 24), 10)));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function formatDateToDays(_x, _x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}(); //report git logs to DD - use carefully because it's the user's data

var reportGitCommandsAndResults = /*#__PURE__*/function () {
  var _ref4 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(file, branch, payload) {
    var owner, repo, pullRequestNumber, gitBlameCommand, gitActivityCommand, gitLogCommand, _executeGitCommand, _executeGitCommand2, _executeGitCommand2$s, _executeGitCommand3, gitBlame, gitActivity, gitLog, extraData;

    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(file === NOT_FOUND_FILE_PATH)) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return");

          case 2:
            owner = payload.owner, repo = payload.repo, pullRequestNumber = payload.pullRequestNumber;
            gitBlameCommand = gitCommands.GIT_BLAME({
              file: file,
              branch: branch
            });
            gitActivityCommand = gitCommands.GIT_ACTIVITY({
              file: file,
              branch: branch,
              since: ACTIVITY_SINCE
            });
            gitLogCommand = gitCommands.GIT_LOG({
              file: file
            });
            _context2.prev = 6;
            gitBlame = (_executeGitCommand = executeGitCommand(gitBlameCommand)) == null ? void 0 : _executeGitCommand.replace(/\n/g, '\\n');
            gitActivity = (_executeGitCommand2 = executeGitCommand(gitActivityCommand)) == null ? void 0 : (_executeGitCommand2$s = _executeGitCommand2.split('\n')) == null ? void 0 : _executeGitCommand2$s.filter(Boolean);
            gitLog = (_executeGitCommand3 = executeGitCommand(gitLogCommand)) == null ? void 0 : _executeGitCommand3.replace(/\n/g, '\\n');
            extraData = {
              file: file,
              gitBlameCommand: gitBlameCommand,
              gitActivityCommand: gitActivityCommand,
              gitLogCommand: gitLogCommand,
              gitBlame: gitBlame,
              gitActivity: gitActivity,
              gitLog: gitLog
            };
            _context2.next = 13;
            return prepareSendingLogsToDD('info', GIT_INFO.RAW_GIT_COMMANDS + " " + owner + "/" + repo + "/" + pullRequestNumber, payload, extraData, DEBUG_MODE);

          case 13:
            _context2.next = 18;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](6);
            return _context2.abrupt("return");

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[6, 15]]);
  }));

  return function reportGitCommandsAndResults(_x4, _x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();
var getAllAuthorsOfFile = function getAllAuthorsOfFile(file, branch) {
  try {
    var _ref5;

    var gitCommand = gitCommands.GIT_BLAME({
      file: file,
      branch: branch
    }) + " " + gitCommands.GIT_BLAME_AUTHORS_FORMAT();
    var rawAuthors = executeGitCommand(gitCommand);
    var authors = (_ref5 = [].concat(Array.from(new Set(rawAuthors == null ? void 0 : rawAuthors.replaceAll('author ', '').replaceAll('author-mail ', '').split('\n'))))) == null ? void 0 : _ref5.filter(Boolean);
    return authors;
  } catch (error) {
    console.log(GIT_ERRORS.GETTING_ALL_AUTHORS + " " + file + ". " + error);
    return [];
  }
};

var getAuthorLines = function getAuthorLines(allAuthors, author, file) {
  try {
    var _author$substring;

    var authorFormatted = "author " + (author == null ? void 0 : (_author$substring = author.substring(0, author.indexOf('<') - 1)) == null ? void 0 : _author$substring.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) + "\\nauthor-mail " + (author == null ? void 0 : author.substring(author.indexOf('<'), author.indexOf('>') + 1).replace('+', '\\+'));
    var regex = new RegExp(authorFormatted, 'g');
    debug("formatted author: " + authorFormatted + ". matches: " + (allAuthors.match(regex) || []).length);
    return (allAuthors.match(regex) || []).length;
  } catch (error) {
    console.log(GIT_ERRORS.GETTING_AUTHOR_LINES + " " + file + ". " + error);
    return '0';
  }
};

var getGitBlameString = function getGitBlameString(file, branch) {
  try {
    var gitCommand = gitCommands.GIT_BLAME({
      file: file,
      branch: branch
    }) + " " + gitCommands.GIT_BLAME_STRING();
    var allAuthors = executeGitCommand(gitCommand);
    return allAuthors;
  } catch (error) {
    console.log(GIT_ERRORS.GETTING_GIT_BLAME + " " + file + ". " + error);
    return '0';
  }
};
var calculateStatisticsForBlame = function calculateStatisticsForBlame(allAuthors, author, file, branch) {
  var authorLines = parseInt(getAuthorLines(allAuthors, author, file)) || '';
  var allLinesCount = parseInt(getCodeLinesCount(file, branch));
  debug("calculateStatisticsForBlame: " + authorLines + ", " + allLinesCount);
  return {
    authorLines: authorLines,
    allLinesCount: allLinesCount
  };
};

var readRemoteFileAndSplit = function readRemoteFileAndSplit(file, branch) {
  var _readRemoteFile;

  return (_readRemoteFile = readRemoteFile(file, branch)) == null ? void 0 : _readRemoteFile.split(/\r\n|\r|\n/);
};

var isLastRowEmpty = function isLastRowEmpty(file, branch) {
  var allRows = readRemoteFileAndSplit(file, branch);
  debug("all rows: " + allRows.length + ". isEmpty: " + ((allRows == null ? void 0 : allRows[(allRows == null ? void 0 : allRows.length) - 1]) === '' ? true : false));
  return (allRows == null ? void 0 : allRows[(allRows == null ? void 0 : allRows.length) - 1]) === '' ? true : false;
};

var getCodeLinesCount = function getCodeLinesCount(file, branch) {
  var _readRemoteFileAndSpl, _readRemoteFileAndSpl2;

  return isLastRowEmpty(file, branch) ? ((_readRemoteFileAndSpl = readRemoteFileAndSplit(file, branch)) == null ? void 0 : _readRemoteFileAndSpl.length) - 1 : (_readRemoteFileAndSpl2 = readRemoteFileAndSplit(file, branch)) == null ? void 0 : _readRemoteFileAndSpl2.length;
};
var splitDsAndBlameObjects = function splitDsAndBlameObjects(blames) {
  var formattedBlame = _.cloneDeep(blames);

  var dsBlame = Object.keys(formattedBlame).reduce(function (ac, key) {
    var _extends3;

    return _extends({}, ac, (_extends3 = {}, _extends3[key] = formattedBlame[key].dsBlame, _extends3));
  }, {});
  Object.keys(formattedBlame).forEach(function (file) {
    if (formattedBlame[file].dsBlame) {
      delete formattedBlame[file].dsBlame;
    }
  });
  return {
    formattedBlame: formattedBlame,
    dsBlame: dsBlame
  };
};
var splitDsAndActivity = function splitDsAndActivity(gitActivity) {
  var formattedActivity = _.cloneDeep(gitActivity);

  var dsActivity = Object.keys(formattedActivity).reduce(function (ac, key) {
    var _extends4;

    return _extends({}, ac, (_extends4 = {}, _extends4[key] = formattedActivity[key].dsActivity, _extends4));
  }, {});
  Object.keys(formattedActivity).forEach(function (file) {
    if (formattedActivity[file].dsActivity) {
      delete formattedActivity[file].dsActivity;
    }
  });
  return {
    formattedActivity: formattedActivity,
    dsActivity: dsActivity
  };
};

// 3. Last commit date → Retired = keep them up to date

var commitsDateByAuthor = function commitsDateByAuthor(author, branchName) {
  var _executeGitCommand2, _executeGitCommand2$s;

  return (_executeGitCommand2 = executeGitCommand(gitCommands.COMMITS_DATE_BY_AUTHOR({
    author: author,
    branch: branchName
  }))) == null ? void 0 : (_executeGitCommand2$s = _executeGitCommand2.split('\n')) == null ? void 0 : _executeGitCommand2$s.filter(Boolean);
};

var buildTempActivity = function buildTempActivity(raw) {
  var activity = [];

  for (var i = 0; i < raw.length; i += 2) {
    var _raw, _raw$i;

    var changes = (_raw = raw[i + 1]) == null ? void 0 : _raw.split('\t');
    var authorData = (_raw$i = raw[i]) == null ? void 0 : _raw$i.split(',');

    if (authorData.length && changes.length) {
      var date = authorData[1];
      var weekChanges = parseInt(changes[0]) + parseInt(changes[1]);

      if (date && weekChanges) {
        var dateObject = new Date(date);
        var momentDate = moment(dateObject).format('YYYY-MM-DD');
        var weekNum = moment().diff(momentDate, 'weeks');
        activity.push({
          git_user: authorData[0],
          week: weekNum,
          changes: weekChanges
        });
      }
    }
  }

  return activity;
}; // 4. Recent activity (lines commited in a given time) → No-noob


var recentAuthorActivity = function recentAuthorActivity(branchName, since, file) {
  var _raw$split;

  var raw = executeGitCommand(gitCommands.GIT_ACTIVITY({
    branch: branchName,
    since: since,
    file: file
  }));
  var rawList = raw == null ? void 0 : (_raw$split = raw.split('\n')) == null ? void 0 : _raw$split.filter(Boolean);
  var activity = buildTempActivity(rawList);
  debug("temp activity: " + JSON.stringify(activity));
  return {
    dsActivity: raw,
    groupByWeek: groupByWeek(activity)
  };
}; // 6. How many authors in repo → complexity

var getRepoFirstCommitDate = function getRepoFirstCommitDate(branchName) {
  var _executeGitCommand5, _executeGitCommand5$s;

  if (branchName === void 0) {
    branchName = 'develop';
  }

  return (_executeGitCommand5 = executeGitCommand(gitCommands.FIRST_COMMIT({
    branch: branchName
  }))) == null ? void 0 : (_executeGitCommand5$s = _executeGitCommand5.split('\n')) == null ? void 0 : _executeGitCommand5$s[1];
};
var blameByAuthor = function blameByAuthor(files, branch) {
  return _extends({}, files.reduce(function (acc, file) {
    var _extends4;

    var authors = getAllAuthorsOfFile(file, branch);
    debug("files authors: " + JSON.stringify(authors));
    var allAuthorsString = getGitBlameString(file, branch);
    return _extends({}, acc, (_extends4 = {}, _extends4[file] = authors.reduce(function (prevAuthor, author) {
      var _extends3;

      var _calculateStatisticsF = calculateStatisticsForBlame(allAuthorsString, author, file, branch),
          authorLines = _calculateStatisticsF.authorLines,
          allLinesCount = _calculateStatisticsF.allLinesCount;

      return _extends({}, prevAuthor, (_extends3 = {}, _extends3[author] = calculateLinesPercentage(authorLines, allLinesCount), _extends3.dsBlame = allAuthorsString.replaceAll('\nauthor-mail', ' author-mail'), _extends3));
    }, {}), _extends4));
  }, {}));
};

var matchByEmail = function matchByEmail(contributorEmail, providerUserLogin, providerUserName) {
  var _email;

  if (!contributorEmail || typeof contributorEmail !== 'string') {
    return null;
  }

  var email = contributorEmail.includes('@') ? contributorEmail.split('@')[0] : contributorEmail;
  email = (_email = email) != null && _email.includes('+') ? email.split('+')[1] : email;
  email = email.replace(/\./g, '');
  return email.includes(providerUserName) || email.includes(providerUserLogin) || (providerUserLogin == null ? void 0 : providerUserLogin.includes(email)) || providerUserName === email;
};

var matchByName = function matchByName(contributorFullName, providerUserName) {
  if (!providerUserName || !contributorFullName || typeof contributorFullName !== 'string' || typeof providerUserName !== 'string') {
    return false;
  }

  var formattedProviderName = providerUserName.trim().toLowerCase();
  var formattedGitName = contributorFullName.trim().toLowerCase();
  return formattedGitName == null ? void 0 : formattedGitName.includes(formattedProviderName);
};

var formatProviderContributors = function formatProviderContributors(providerContributors) {
  return providerContributors.map(function (_ref) {
    var login = _ref.login,
        name = _ref.name;
    return {
      login: login,
      name: name
    };
  }).filter(function (_ref2) {
    var login = _ref2.login,
        name = _ref2.name;
    return login || name;
  });
};

var formatGitContributors = function formatGitContributors(gitContributors) {
  return Object.keys(gitContributors).map(function (contributor) {
    var contributorMap = contributor.split(' ');
    return {
      email: contributorMap.pop(),
      login: contributorMap.join(''),
      name: contributorMap[0],
      lastName: contributorMap[1],
      fullName: contributorMap.join(' '),
      reversedName: (contributorMap[1] || '') + contributorMap[0],
      contributor: contributor,
      contributions: gitContributors[contributor]
    };
  });
};

var getUserMappingFromConfig = /*#__PURE__*/function () {
  var _ref3 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(rules, payload) {
    var _rules$config, _rules$config$user_ma, userMapping, _e, owner, repo, pullRequestNumber;

    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            userMapping = (rules == null ? void 0 : (_rules$config = rules.config) == null ? void 0 : (_rules$config$user_ma = _rules$config.user_mapping) == null ? void 0 : _rules$config$user_ma.reduce(function (acc, authorObject) {
              var _authorObject$key, _extends2;

              var key = Object.keys(authorObject)[0];
              var value = (_authorObject$key = authorObject[key]) != null ? _authorObject$key : key;
              return _extends({}, acc, (_extends2 = {}, _extends2[key] = value, _extends2));
            }, {})) || {};
            return _context.abrupt("return", userMapping);

          case 5:
            _context.prev = 5;
            _context.t0 = _context["catch"](0);
            owner = payload.owner, repo = payload.repo, pullRequestNumber = payload.pullRequestNumber;
            _context.next = 10;
            return prepareSendingLogsToDD('info', "Failed to parse user_mapping for pr " + owner + "/" + repo + "/" + pullRequestNumber, payload, {
              error: (_e = e) == null ? void 0 : _e.message
            }, true);

          case 10:
            console.log('Failed to parse user_mapping: ', e);
            return _context.abrupt("return", {});

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 5]]);
  }));

  return function getUserMappingFromConfig(_x, _x2) {
    return _ref3.apply(this, arguments);
  };
}();

var matchContributorsFromProviderData = /*#__PURE__*/function () {
  var _ref4 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(providerContributors, gitContributors, payload) {
    var providerContributorsFormatted, gitContributorsFormatted, matchContributionsList, unmachedContributors, fallback1, owner, repo, pullRequestNumber;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            providerContributorsFormatted = formatProviderContributors(providerContributors);
            gitContributorsFormatted = formatGitContributors(gitContributors);
            matchContributionsList = {};
            unmachedContributors = []; // round 1 - match by git email || match by git login

            gitContributorsFormatted.forEach(function (contributor) {
              var match = providerContributorsFormatted.find(function (_ref5) {
                var name = _ref5.name,
                    login = _ref5.login;
                return matchByEmail(contributor.email, login, name) || matchByName(contributor.login, login);
              });

              if (match) {
                matchContributionsList[contributor.contributor] = match.login;
              } else {
                unmachedContributors.push(contributor);
              }
            });
            fallback1 = [].concat(unmachedContributors);
            unmachedContributors = []; // round 2 - match by git fullName || match by git reversedName

            fallback1.forEach(function (contributor) {
              var match = providerContributorsFormatted.find(function (_ref6) {
                var name = _ref6.name;
                return matchByName(contributor.fullName, name) || matchByName(contributor.reversedName, name);
              });

              if (match) {
                matchContributionsList[contributor.contributor] = match.login;
              } else {
                unmachedContributors.push(contributor);
              }
            }); // round 3 - no matched provider. keep git signature (contributor)

            unmachedContributors.forEach(function (contributor) {
              matchContributionsList[contributor.contributor] = contributor.contributor;
            });
            return _context2.abrupt("return", matchContributionsList);

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](0);
            owner = payload.owner, repo = payload.repo, pullRequestNumber = payload.pullRequestNumber;
            _context2.next = 18;
            return prepareSendingLogsToDD('info', "Failed to match contributors for pr: " + owner + "/" + repo + "/" + pullRequestNumber, payload, {
              error: _context2.t0 == null ? void 0 : _context2.t0.message
            }, true);

          case 18:
            console.error('Failed to match contributors', _context2.t0);
            return _context2.abrupt("return", {});

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 13]]);
  }));

  return function matchContributorsFromProviderData(_x3, _x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}();

var mergeResults = function mergeResults(configContributors, matchedProviderContributors) {
  return Object.keys(matchedProviderContributors).reduce(function (acc, authorKey) {
    var _configContributors$a, _extends3;

    return _extends({}, acc, (_extends3 = {}, _extends3[authorKey] = (_configContributors$a = configContributors[authorKey]) != null ? _configContributors$a : matchedProviderContributors[authorKey], _extends3));
  }, {});
}; // Example of git object (contributor):
// {
//   email: '<dekel.bayazi@tikalk.com>',
//   login: 'DekelBayazi',
//   name: 'Dekel',
//   lastName: 'Bayazi',
//   fullName: 'Dekel Bayazi',
//   reversedName: 'BayaziDekel',
//   contributor: 'Dekel Bayazi <dekel.bayazi@tikalk.com>',
//   contributions: 1
// }
// ####################################################
// Example of provider object (name, login):
// {
//   login: 'yeelali14',
//   name: 'Yeela Lifshitz'
// }
// ####################################################


var matchContributors = /*#__PURE__*/function () {
  var _ref7 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(providerContributors, gitContributors, payload, rulesObj) {
    var owner, repo, pullRequestNumber, matchContributorsFromProvider, userMappingFromConfig;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            owner = payload.owner, repo = payload.repo, pullRequestNumber = payload.pullRequestNumber;

            if (!(!providerContributors || !gitContributors)) {
              _context3.next = 4;
              break;
            }

            console.error('matchContributors failed: not provided data');
            return _context3.abrupt("return", {});

          case 4:
            _context3.next = 6;
            return prepareSendingLogsToDD('info', "Gitstream matchContributors got contributors for pr: " + owner + "/" + repo + "/" + pullRequestNumber, payload, {
              providerContributors: providerContributors,
              gitContributors: gitContributors
            }, true);

          case 6:
            _context3.next = 8;
            return matchContributorsFromProviderData(providerContributors, gitContributors, payload);

          case 8:
            matchContributorsFromProvider = _context3.sent;
            _context3.next = 11;
            return getUserMappingFromConfig(rulesObj, payload);

          case 11:
            userMappingFromConfig = _context3.sent;

            if (!Object.keys(userMappingFromConfig).length) {
              _context3.next = 16;
              break;
            }

            _context3.next = 15;
            return prepareSendingLogsToDD('info', "got contributors from config for pr: " + owner + "/" + repo + "/" + pullRequestNumber, payload, {
              userMappingFromConfig: userMappingFromConfig
            }, true);

          case 15:
            return _context3.abrupt("return", mergeResults(userMappingFromConfig, matchContributorsFromProvider));

          case 16:
            return _context3.abrupt("return", matchContributorsFromProvider);

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function matchContributors(_x6, _x7, _x8, _x9) {
    return _ref7.apply(this, arguments);
  };
}();

var rulesEngineErrors = [];

var callWebhookOnError = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(payload) {
    var repo, owner, pullRequestNumber, _ref2, gitlabCustomWebhookToken, webhook_url, body;

    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            repo = payload.repo, owner = payload.owner, pullRequestNumber = payload.pullRequestNumber;
            _ref2 = payload || {}, gitlabCustomWebhookToken = _ref2.gitlabCustomWebhookToken, webhook_url = _ref2.webhook_url;
            body = {
              context: payload,
              status: 'failed',
              repo: repo,
              owner: owner,
              pullRequestNumber: pullRequestNumber,
              webhookEvent: 'checkUpdate',
              event_type: 'gs_custom_checkfail'
            };
            _context.prev = 3;
            _context.next = 6;
            return axios.post(webhook_url, JSON.stringify(body), {
              headers: {
                'Content-Type': 'application/json',
                'x-gitlab-token': "" + gitlabCustomWebhookToken,
                'x-gitlab-event': 'checkUpdate'
              }
            });

          case 6:
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](3);
            console.error("Failed sending inner webhook to gitstream-sls-pipeline");

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 8]]);
  }));

  return function callWebhookOnError(_x) {
    return _ref.apply(this, arguments);
  };
}();

var handleErrorByProvider = {
  github: function github(message, payload, ruleFile) {
    var details = {
      message: message,
      owner: payload == null ? void 0 : payload.owner,
      repo: payload == null ? void 0 : payload.repo,
      branch: payload == null ? void 0 : payload.branch
    };
    setFailed(JSON.stringify(details, null, 2));
  },
  gitlab: /*#__PURE__*/function () {
    var _gitlab = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(message, payload, ruleFile) {
      var decodedMessage;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return callWebhookOnError(payload);

            case 2:
              decodedMessage = message.replace(/%0A/g, '\n');
              console.error(decodedMessage);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function gitlab(_x2, _x3, _x4) {
      return _gitlab.apply(this, arguments);
    }

    return gitlab;
  }(),
  "default": function _default(message) {
    return console.error(message);
  }
};
var handleValidationErrors = /*#__PURE__*/function () {
  var _ref3 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(message, statusCode, payload, ruleFile) {
    var fullMessage, clientPayload, _ref4, source, getErrorHandlerCb, _rulesEngineErrors$pu;

    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (ruleFile === void 0) {
              ruleFile = '';
            }

            fullMessage = ruleFile ? "Error in " + ruleFile.trim() + " - " + message : message;

            if (isExecutePlayground) {
              _context3.next = 11;
              break;
            }

            clientPayload = JSON.parse(CLIENT_PAYLOAD);
            _ref4 = payload || clientPayload || {}, source = _ref4.source;
            getErrorHandlerCb = handleErrorByProvider[source] || handleErrorByProvider["default"];
            _context3.next = 8;
            return getErrorHandlerCb(fullMessage, payload, ruleFile);

          case 8:
            process.exit(statusCode);
            _context3.next = 13;
            break;

          case 11:
            console.log("gitstream-core error: " + message);
            rulesEngineErrors.push((_rulesEngineErrors$pu = {}, _rulesEngineErrors$pu[statusCode] = "" + message, _rulesEngineErrors$pu));

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function handleValidationErrors(_x5, _x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

// @ts-nocheck
var fromBase64String = function fromBase64String(base64string) {
  return Buffer.from(base64string, 'base64').toString('utf-8');
};
var toBase64String = function toBase64String(string) {
  return Buffer.from(string).toString('base64');
};
var convertRuleFileToStringSafe = function convertRuleFileToStringSafe(ruleFile) {
  var replacers = {
    'pr.description': 'pr.description | nl2br | dump | safe'
  };
  return Object.keys(replacers).reduce(function (acc, toReplace) {
    return acc.replaceAll(toReplace, replacers[toReplace]);
  }, ruleFile);
};
var convertPRContextFromBase64 = function convertPRContextFromBase64(prContext) {
  var _prContext$general_co, _prContext$line_comme, _prContext$comments, _prContext$reviews, _prContext$conversati;

  return _extends({}, prContext, {
    description: fromBase64String(prContext.description),
    // deprecated
    general_comments: (_prContext$general_co = prContext.general_comments) == null ? void 0 : _prContext$general_co.map(function (generalComment) {
      return _extends({}, generalComment, {
        content: fromBase64String(generalComment.content)
      });
    }),
    // deprecated
    line_comments: (_prContext$line_comme = prContext.line_comments) == null ? void 0 : _prContext$line_comme.map(function (lineComments) {
      return _extends({}, lineComments, {
        content: fromBase64String(lineComments.content)
      });
    }),
    comments: (_prContext$comments = prContext.comments) == null ? void 0 : _prContext$comments.map(function (comment) {
      return _extends({}, comment, {
        content: fromBase64String(comment.content)
      });
    }),
    reviews: (_prContext$reviews = prContext.reviews) == null ? void 0 : _prContext$reviews.map(function (comment) {
      var _comment$conversation;

      return _extends({}, comment, {
        content: fromBase64String(comment.content),
        conversations: (_comment$conversation = comment.conversations) == null ? void 0 : _comment$conversation.map(function (conversation) {
          return _extends({}, conversation, {
            content: fromBase64String(conversation.content)
          });
        })
      });
    }),
    conversations: (_prContext$conversati = prContext.conversations) == null ? void 0 : _prContext$conversati.map(function (comment) {
      return _extends({}, comment, {
        content: fromBase64String(comment.content)
      });
    })
  });
};

// @ts-nocheck
var findGitAuthorsWithFallback = function findGitAuthorsWithFallback(context, gitToProviderUser) {
  var fullGitName = context.branch.author;
  var authorResult = {
    author: fullGitName,
    prevResults: []
  };

  try {
    if (!Object.keys(context.repo.contributors).includes(fullGitName)) {
      var gitNames = Object.keys(gitToProviderUser).filter(function (gitUser) {
        return gitToProviderUser[gitUser] === context.pr.author;
      });
      gitNames.forEach(function (contributor) {
        var authorDates = commitsDateByAuthor(contributor, context.branch.base);

        if (authorDates.length === 1) {
          authorResult = {
            author: contributor,
            prevResults: authorDates
          };
        }

        if (gitNames.length > 1 && authorResult.prevResults.length <= authorDates.length) {
          authorResult = {
            author: contributor,
            prevResults: authorDates
          };
        }
      });
    }

    return authorResult;
  } catch (error) {
    debug("Failed getting the right author. Error: " + error);
    return {};
  }
};

var filteredOutCMFilesFunc = function filteredOutCMFilesFunc(_ref) {
  var to = _ref.to;
  return IGNORE_PATTERNS_IN_DRY_RUN.every(function (ignorePattern) {
    return !to.match(ignorePattern);
  });
};

var formatFilesToSourceFiles = function formatFilesToSourceFiles(baseBranch, refBranch, files) {
  return files.map(function (_ref2) {
    var from = _ref2.from,
        to = _ref2.to,
        chunks = _ref2.chunks;
    return {
      original_file: from === NOT_FOUND_FILE_PATH ? '' : from,
      new_file: to,
      diff: chunks.reduce(function (acc, _ref3) {
        var changes = _ref3.changes,
            content = _ref3.content;
        return acc + content + '\n' + changes.map(function (_ref4) {
          var content = _ref4.content;
          return content;
        }).join('\n');
      }, ''),
      original_content: getContent(getCheckoutCommit(refBranch, baseBranch), from),
      new_content: getContent(refBranch, to)
    };
  });
};

var extractMetadataFromFiles = function extractMetadataFromFiles(files) {
  return files.map(function (_ref5) {
    var to = _ref5.to,
        from = _ref5.from,
        deletions = _ref5.deletions,
        additions = _ref5.additions;
    return {
      original_file: from === NOT_FOUND_FILE_PATH ? '' : from,
      new_file: to,
      file: to !== NOT_FOUND_FILE_PATH ? to : from,
      deletions: deletions,
      additions: additions
    };
  });
};

var getDiffSize = function getDiffSize(files) {
  return (files == null ? void 0 : files.reduce(function (acc, _ref6) {
    var additions = _ref6.additions,
        deletions = _ref6.deletions;
    return acc + additions + deletions;
  }, 0)) || 0;
};

var parseCMFile = /*#__PURE__*/function () {
  var _ref7 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(payload, rules, ruleFile) {
    var rulesObj, owner, repo, pullRequestNumber;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            rulesObj = load(rules.replaceAll(/{{(.*?)}}|{(.*?)}|{%.*%}((.|\n)*){% endfor %}/g, ''));
            debug("cm parse result: " + JSON.stringify(rulesObj));
            return _context.abrupt("return", rulesObj);

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            owner = payload.owner, repo = payload.repo, pullRequestNumber = payload.pullRequestNumber;
            _context.next = 11;
            return prepareSendingLogsToDD('error', ERRORS$1.FAILED_TO_PARSE_CM + " in pr " + owner + "/" + repo + "/" + pullRequestNumber, payload, {
              error: _context.t0 == null ? void 0 : _context.t0.message,
              rules: rules,
              ruleFile: ruleFile
            }, true);

          case 11:
            console.error(ERRORS$1.FAILED_PARSE_CM_FILE);
            _context.next = 14;
            return handleValidationErrors(_context.t0 == null ? void 0 : _context.t0.message, STATUS_CODES$1.SYNTAX_ERROR, payload, ruleFile);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 6]]);
  }));

  return function parseCMFile(_x, _x2, _x3) {
    return _ref7.apply(this, arguments);
  };
}();
var contributersStatContext = /*#__PURE__*/function () {
  var _ref8 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(context, payload) {
    var _commitsDateByAuthor, blames, _splitDsAndBlameObjec, formattedBlame, dsBlame, age, author_age;

    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            blames = blameByAuthor(context.files, context.branch.base);
            _splitDsAndBlameObjec = splitDsAndBlameObjects(blames), formattedBlame = _splitDsAndBlameObjec.formattedBlame, dsBlame = _splitDsAndBlameObjec.dsBlame;
            _context2.next = 5;
            return formatDateToDays(getRepoFirstCommitDate(context.branch.base), context, payload);

          case 5:
            age = _context2.sent;
            _context2.next = 8;
            return formatDateToDays((_commitsDateByAuthor = commitsDateByAuthor(context.branch.author, context.branch.base)) == null ? void 0 : _commitsDateByAuthor[0], context, payload);

          case 8:
            author_age = _context2.sent;
            return _context2.abrupt("return", {
              age: age,
              author_age: author_age,
              blame: formattedBlame,
              ds_blame: dsBlame
            });

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](0);
            debug("Error extracting blame: " + _context2.t0.message);
            _context2.next = 17;
            return handleValidationErrors(ERRORS$1.FAILED_TO_GET_CONTEXT, STATUS_CODES$1.FAILED_TO_GET_CONTEXT, payload);

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 12]]);
  }));

  return function contributersStatContext(_x4, _x5) {
    return _ref8.apply(this, arguments);
  };
}();

var contributersActivityContext = /*#__PURE__*/function () {
  var _ref9 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(context) {
    var gitActivity, _splitDsAndActivity, formattedActivity, dsActivity;

    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            gitActivity = context.files.reduce(function (acc, file) {
              var _extends2;

              if (file === NOT_FOUND_FILE_PATH) {
                return acc;
              }

              var _recentAuthorActivity = recentAuthorActivity(context.branch.base, ACTIVITY_SINCE, file),
                  dsActivity = _recentAuthorActivity.dsActivity,
                  groupByWeek = _recentAuthorActivity.groupByWeek;

              return _extends({}, acc, (_extends2 = {}, _extends2[file] = _extends({}, groupByWeek, {
                dsActivity: dsActivity
              }), _extends2));
            }, {});
            _splitDsAndActivity = splitDsAndActivity(gitActivity), formattedActivity = _splitDsAndActivity.formattedActivity, dsActivity = _splitDsAndActivity.dsActivity;
            return _context3.abrupt("return", {
              git_activity: formattedActivity,
              ds_activity: dsActivity
            });

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3["catch"](0);
            debug("Error extrating activity: " + _context3.t0.message);
            _context3.next = 11;
            return handleValidationErrors(ERRORS$1.FAILED_TO_GET_CONTEXT, STATUS_CODES$1.FAILED_TO_GET_CONTEXT, context.payload);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 6]]);
  }));

  return function contributersActivityContext(_x6) {
    return _ref9.apply(this, arguments);
  };
}();

var filterOutFiles = /*#__PURE__*/function () {
  var _ref10 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(diff, isCmChanged, diffCommand, payload) {
    var _files2;

    var owner, repo, pullRequestNumber, files, _files;

    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            owner = payload.owner, repo = payload.repo, pullRequestNumber = payload.pullRequestNumber;
            files = parse(diff);

            if (isCmChanged) {
              files = (_files = files) == null ? void 0 : _files.filter(filteredOutCMFilesFunc);
            }

            if ((_files2 = files) != null && _files2.length) {
              _context4.next = 6;
              break;
            }

            _context4.next = 6;
            return prepareSendingLogsToDD('warn', "No files changed in rules-engine context for pr: " + owner + "/" + repo + "/" + pullRequestNumber, payload, {
              diff: diff,
              diffCommand: diffCommand
            }, isCmChanged);

          case 6:
            return _context4.abrupt("return", files);

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function filterOutFiles(_x7, _x8, _x9, _x10) {
    return _ref10.apply(this, arguments);
  };
}();

var getTheRightGitAuthor = function getTheRightGitAuthor(context, gitToProviderUser) {
  try {
    var fallbacks = findGitAuthorsWithFallback(context, gitToProviderUser);

    if (Object.keys(fallbacks).length) {
      var gitName = fallbacks.author.split('<')[0].replace(/\s*$/, '') + "\n";
      var gitEmail = "<" + fallbacks.author.split('<')[1];
      return {
        gitName: gitName,
        gitEmail: gitEmail,
        fullName: fallbacks.author
      };
    }

    return fallbacks;
  } catch (error) {
    debug("Failed getting the right author. Error: " + error);
    return {};
  }
};

var getContext = /*#__PURE__*/function () {
  var _ref11 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(baseBranch, refBranch, payload, rules, ruleFile, isCmChanged) {
    var owner, repo, pullRequestNumber, _context$pr, rulesObj, _getDiff, diff, diffCommand, files, commitsNumber, contributors, _getAuthorName, fullAuthorName, authorName, authorEmail, context, contributorsMap, gitAuthor, contributorsStats, contributorsActivity, _iterator, _step, file, reducedContext;

    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (isCmChanged === void 0) {
              isCmChanged = false;
            }

            owner = payload.owner, repo = payload.repo, pullRequestNumber = payload.pullRequestNumber;
            _context5.prev = 2;
            _context5.next = 5;
            return parseCMFile(payload, rules, ruleFile);

          case 5:
            rulesObj = _context5.sent;
            _getDiff = getDiff(baseBranch, refBranch, rulesObj), diff = _getDiff.diff, diffCommand = _getDiff.diffCommand;
            _context5.next = 9;
            return filterOutFiles(diff, isCmChanged, diffCommand, payload);

          case 9:
            files = _context5.sent;
            commitsNumber = getCommitsNumberOnBranch(baseBranch);
            contributors = getContributorsStatistics(baseBranch);
            _getAuthorName = getAuthorName(baseBranch, refBranch), fullAuthorName = _getAuthorName.fullAuthorName, authorName = _getAuthorName.authorName, authorEmail = _getAuthorName.authorEmail;
            context = {
              branch: {
                name: refBranch,
                base: baseBranch,
                author: fullAuthorName,
                autor_name: authorName,
                author_email: authorEmail,
                diff: {
                  size: getDiffSize(files),
                  files_metadata: extractMetadataFromFiles(files)
                },
                num_of_commits: commitsNumber
              },
              source: {
                diff: {
                  files: formatFilesToSourceFiles(baseBranch, refBranch, files)
                }
              },
              repo: {
                name: repo,
                contributors: contributors,
                owner: owner
              },
              files: files.map(function (_ref12) {
                var to = _ref12.to;
                return to;
              }),
              pr: convertPRContextFromBase64(payload.prContext)
            };
            _context5.next = 16;
            return matchContributors(context.pr.contributors, context.repo.contributors, payload, rulesObj);

          case 16:
            contributorsMap = _context5.sent;
            gitAuthor = getTheRightGitAuthor(context, contributorsMap);

            if (Object.keys(gitAuthor).length) {
              context.branch.author = gitAuthor.fullName;
              context.branch.author_name = gitAuthor.gitName;
              context.branch.author_email = gitAuthor.gitEmail;
            }

            debug("context.branch: " + JSON.stringify(context.branch, null, 2));
            _context5.next = 22;
            return contributersStatContext(context, payload);

          case 22:
            contributorsStats = _context5.sent;
            _context5.next = 25;
            return contributersActivityContext(context);

          case 25:
            contributorsActivity = _context5.sent;
            context.repo = _extends({}, context.repo, {
              provider: payload.source,
              git_to_provider_user: contributorsMap
            }, contributorsStats, contributorsActivity, {
              pr_author: context.pr.author
            });
            debug("context.repo: " + JSON.stringify(context.repo, null, 2));

            if (!DEBUG_MODE) {
              _context5.next = 36;
              break;
            }

            _iterator = _createForOfIteratorHelperLoose(context.files);

          case 30:
            if ((_step = _iterator()).done) {
              _context5.next = 36;
              break;
            }

            file = _step.value;
            _context5.next = 34;
            return reportGitCommandsAndResults(file, baseBranch, payload);

          case 34:
            _context5.next = 30;
            break;

          case 36:
            reducedContext = toBase64String(JSON.stringify({
              context: {
                repo: context.repo,
                files: context.files,
                branch: context.branch,
                pr: {
                  contributors: (_context$pr = context.pr) == null ? void 0 : _context$pr.contributors
                }
              }
            }));
            _context5.next = 39;
            return prepareSendingLogsToDD('info', "rules-engine context for pr: " + owner + "/" + repo + "/" + pullRequestNumber, payload, {
              reducedContext: reducedContext,
              diffCommand: diffCommand
            }, DEBUG_MODE);

          case 39:
            return _context5.abrupt("return", context);

          case 42:
            _context5.prev = 42;
            _context5.t0 = _context5["catch"](2);
            //TODO: remove console
            console.log({
              error: _context5.t0
            });
            _context5.next = 47;
            return prepareSendingLogsToDD('error', ERRORS$1.FAILED_TO_GET_CONTEXT, payload, {
              error: _context5.t0 == null ? void 0 : _context5.t0.message,
              ruleFile: ruleFile
            }, true);

          case 47:
            _context5.next = 49;
            return handleValidationErrors(ERRORS$1.FAILED_TO_GET_CONTEXT, STATUS_CODES$1.FAILED_TO_GET_CONTEXT, payload, ruleFile);

          case 49:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[2, 42]]);
  }));

  return function getContext(_x11, _x12, _x13, _x14, _x15, _x16) {
    return _ref11.apply(this, arguments);
  };
}();

var SOURCE_CODE_WORKING_DIRECTORY = './code';
var CWD = {
  cwd: SOURCE_CODE_WORKING_DIRECTORY
};
var executeGitCommand = function executeGitCommand(command, folder) {
  if (folder === void 0) {
    folder = REPO_FOLDER.DEFAULT;
  }

  debug("Execute: " + command);

  try {
    var cdCommand = "cd " + folder + " && ";
    var gitResult = execSync(cdCommand + command, _extends({}, CWD, {
      maxBuffer: 500 * 1024 * 1024
    })).toString();
    return gitResult;
  } catch (e) {
    debug(ERRORS$1.GIT_COMMAND_FAILED + " " + ((e == null ? void 0 : e.message) || 'unknown error'));

    if (((e == null ? void 0 : e.toString()) || '').includes(GIT_ERROR_TYPE.BAD_REVISION)) {
      handleValidationErrors(ERRORS$1.GIT_COMMAND_FAILED + " " + ((e == null ? void 0 : e.message) || 'unknown error'), STATUS_CODES$1.BAD_REVISION);
    }

    throw e;
  }
};
var getCheckoutCommit = function getCheckoutCommit(refBranch, baseBranch) {
  try {
    var checkoutCommit = executeGitCommand("git rev-list --boundary '" + refBranch + "'...'" + baseBranch + "' | grep \"^-\" | cut -c2- | tail -1");
    return checkoutCommit.trim() || baseBranch;
  } catch (e) {
    return baseBranch;
  }
};
var getContent = function getContent(branch, file) {
  try {
    if (file === NOT_FOUND_FILE_PATH) {
      return '';
    }

    var fileContent = executeGitCommand("git show '" + branch.trim() + "':'" + file.trim() + "'");
    return fileContent;
  } catch (e) {
    return '';
  }
};
var getDiff = function getDiff(baseBranch, refBranch, rules) {
  try {
    var _rules$config, _rules$config$ignore_, _rules$config$ignore_2;

    var ignoreFiles = rules == null ? void 0 : (_rules$config = rules.config) == null ? void 0 : (_rules$config$ignore_ = _rules$config.ignore_files) == null ? void 0 : (_rules$config$ignore_2 = _rules$config$ignore_.map(function (file) {
      return "':(exclude)" + file + "'";
    })) == null ? void 0 : _rules$config$ignore_2.join(' ');
    var diffCommand = "git diff '" + baseBranch + "'...'" + refBranch + "' " + (ignoreFiles ? ignoreFiles : '');
    var diff = executeGitCommand(diffCommand);
    debug({
      diff: diff,
      logs: executeGitCommand("git log"),
      currBranch: executeGitCommand("git branch --show-current")
    });
    return {
      diff: diff,
      diffCommand: diffCommand
    };
  } catch (e) {
    console.log("error getting diff: " + e);
    return '';
  }
};
var readRemoteFile = function readRemoteFile(file, branch, folder) {
  if (folder === void 0) {
    folder = REPO_FOLDER.DEFAULT;
  }

  executeGitCommand("git config --global --add safe.directory '*'");

  try {
    if (folder === REPO_FOLDER.DEFAULT) {
      executeGitCommand("git show '" + branch + "':'" + file + "' > '" + file + "'");
    }

    return readFileSync(SOURCE_CODE_WORKING_DIRECTORY + "/" + folder + "/" + file, 'utf8');
  } catch (_unused) {
    return '';
  }
};

var getCMFilesList = function getCMFilesList(baseBranch, repo) {
  executeGitCommand("git checkout '" + baseBranch + "'");
  var cmFiles = (repo == null ? void 0 : repo.toLowerCase()) === ORG_LEVEL_REPO ? executeGitCommand("git ls-files '*.cm'") : executeGitCommand("git ls-files '.cm/*.cm'");
  executeGitCommand("git checkout -");
  return cmFiles.split('\n').filter(Boolean);
};

var getExcludedOrgCMFilesBasedOnRepo = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(orgRules, repo, payload) {
    var excludedRulesFiles, _i, _Object$keys, _rulesObj$config, ruleFile, rulesObj, excludedRepos;

    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            excludedRulesFiles = [];
            _i = 0, _Object$keys = Object.keys(orgRules);

          case 2:
            if (!(_i < _Object$keys.length)) {
              _context.next = 12;
              break;
            }

            ruleFile = _Object$keys[_i];
            _context.next = 6;
            return parseCMFile(payload, orgRules[ruleFile], ruleFile);

          case 6:
            rulesObj = _context.sent;
            excludedRepos = (rulesObj == null ? void 0 : (_rulesObj$config = rulesObj.config) == null ? void 0 : _rulesObj$config.ignore_repositories) || [];

            if (excludedRepos.includes(repo)) {
              excludedRulesFiles.push(ruleFile);
            }

          case 9:
            _i++;
            _context.next = 2;
            break;

          case 12:
            return _context.abrupt("return", excludedRulesFiles);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getExcludedOrgCMFilesBasedOnRepo(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var getOrgCmFiles = function getOrgCmFiles(baseBranch) {
  executeGitCommand("git checkout " + baseBranch, REPO_FOLDER.CM);
  var cmFiles = executeGitCommand("git ls-files '*.cm'", REPO_FOLDER.CM);
  executeGitCommand("git checkout -", REPO_FOLDER.CM);
  var orgCmFiles = cmFiles.split('\n').filter(Boolean);

  if (Object.keys(orgCmFiles).length) {
    return orgCmFiles.reduce(function (acc, cmFile) {
      var _extends2;

      return _extends({}, acc, (_extends2 = {}, _extends2[cmFile] = readRemoteFile(cmFile, baseBranch, REPO_FOLDER.CM), _extends2));
    }, {});
  }

  return [];
};
var getRuleFiles = /*#__PURE__*/function () {
  var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(baseBranch, repo) {
    var cmFiles, ruleFiles;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            cmFiles = getCMFilesList(baseBranch, repo);

            if (!(Object.keys(cmFiles).length > 0)) {
              _context2.next = 4;
              break;
            }

            ruleFiles = cmFiles.reduce(function (acc, cmFile) {
              var _extends3;

              return _extends({}, acc, (_extends3 = {}, _extends3[cmFile] = readRemoteFile(cmFile, baseBranch), _extends3));
            }, {});
            return _context2.abrupt("return", ruleFiles);

          case 4:
            return _context2.abrupt("return", {});

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getRuleFiles(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();
var getCommitsNumberOnBranch = function getCommitsNumberOnBranch(baseBranch) {
  return Number(executeGitCommand("git rev-list --count HEAD ^" + baseBranch).trim());
};
var getContributorsStatistics = function getContributorsStatistics(branch) {
  var contributorsString = executeGitCommand("git shortlog " + branch + " -s -n -e");
  return contributorsString.split('\n').reduce(function (acc, contributorStats) {
    var _ref3;

    var _contributorStats$tri = contributorStats.trim().split('\t'),
        commits = _contributorStats$tri[0],
        contributor = _contributorStats$tri[1];

    return _extends({}, acc, contributor && (_ref3 = {}, _ref3[contributor] = parseInt(commits), _ref3));
  }, {});
};
var getAuthorName = function getAuthorName(baseBranch, refBranch) {
  try {
    var authorName = executeGitCommand("git log '" + baseBranch + "'..'" + refBranch + "' --format=\"%an\" | tail -1");
    var authorEmail = executeGitCommand("git log '" + baseBranch + "'..'" + refBranch + "' --format=\"%ae\" | tail -1");
    var fullAuthorName = (authorName == null ? void 0 : authorName.trim()) + " <" + (authorEmail == null ? void 0 : authorEmail.trim()) + ">";
    debug({
      fullAuthorName: fullAuthorName,
      currBranch: executeGitCommand("git branch --show-current")
    });
    return {
      fullAuthorName: fullAuthorName,
      authorName: authorName,
      authorEmail: authorEmail
    };
  } catch (e) {
    console.log("error getting branch author name: " + e);
    return '';
  }
};
var isCmChanged = function isCmChanged(refBranch, baseBranch, repo) {
  executeGitCommand("git config --global --add safe.directory '*'");

  if ((repo == null ? void 0 : repo.toLowerCase()) === ORG_LEVEL_REPO) {
    return Boolean(executeGitCommand("git diff '" + baseBranch + "'...'" + refBranch + "' -- *.cm"));
  }

  return Boolean(executeGitCommand("git diff '" + baseBranch + "'...'" + refBranch + "' -- .cm/*.cm"));
};
var hasNonRuleFilesChanges = function hasNonRuleFilesChanges(refBranch, baseBranch, repo) {
  executeGitCommand("git config --global --add safe.directory '*'");

  if ((repo == null ? void 0 : repo.toLowerCase()) === ORG_LEVEL_REPO) {
    return Boolean(executeGitCommand("git diff '" + baseBranch + "'...'" + refBranch + "' -- ':!*.cm'"));
  }

  return Boolean(executeGitCommand("git diff '" + baseBranch + "'...'" + refBranch + "' -- ':!.cm/*.cm'"));
};

// @ts-nocheck
var saveResultsInCache = function saveResultsInCache(results) {
  try {
    writeFileSync(SOURCE_CODE_WORKING_DIRECTORY + "/cache.json", JSON.stringify(results));
  } catch (e) {
    console.log('error saving cache', e);
  }
};
var loadCacheResults = function loadCacheResults() {
  try {
    var cacheResults = readFileSync(SOURCE_CODE_WORKING_DIRECTORY + "/cache.json").toString();
    return JSON.parse(cacheResults);
  } catch (e) {
    console.warn('error loading from cache', e);
    return {};
  }
};

// @ts-nocheck
var ExpertReviewerContext = /*#__PURE__*/function () {
  function ExpertReviewerContext(_ref) {
    var owner = _ref.owner,
        repo = _ref.repo,
        pullRequestNumber = _ref.pullRequestNumber,
        branch = _ref.branch,
        triggeredBy = _ref.triggeredBy;
    this.org = owner;
    this.repo = repo;
    this.pullRequestNumber = pullRequestNumber;
    this.branch = branch;
    this.triggeredBy = triggeredBy;
  }

  var _proto = ExpertReviewerContext.prototype;

  _proto.get = function get() {
    return {
      org: this.org,
      repo: this.repo,
      pullRequestNumber: this.pullRequestNumber,
      branch: this.branch,
      triggeredBy: this.triggeredBy
    };
  };

  return ExpertReviewerContext;
}();

// @ts-nocheck
var ExpertReviewerRequest = /*#__PURE__*/function () {
  function ExpertReviewerRequest(gitToProvider, prFiles, context) {
    this.merge_dict = gitToProvider;
    this.pr_files = prFiles;
    this.context = context;
  }

  var _proto = ExpertReviewerRequest.prototype;

  _proto.get = function get() {
    return {
      merge_dict: this.merge_dict,
      pr_files: this.pr_files,
      context: this.context
    };
  };

  return ExpertReviewerRequest;
}();

var buildPrFiles = function buildPrFiles(repo, files) {
  var tempPrFiles = files.reduce(function (acc, file) {
    var _repo$ds_blame, _repo$ds_activity, _extends2;

    if (file === NOT_FOUND_FILE_PATH) {
      return acc;
    }

    return _extends({}, acc, (_extends2 = {}, _extends2[file] = _extends({}, {
      blame: ((_repo$ds_blame = repo.ds_blame) == null ? void 0 : _repo$ds_blame[file]) || ''
    }, {
      activity: ((_repo$ds_activity = repo.ds_activity) == null ? void 0 : _repo$ds_activity[file]) || ''
    }), _extends2));
  }, {});
  return Object.keys(tempPrFiles).reduce(function (acc, file) {
    var _extends3;

    if (!Object.keys(tempPrFiles[file]).length) {
      return acc;
    }

    return _extends({}, acc, (_extends3 = {}, _extends3[file] = tempPrFiles[file], _extends3));
  }, {});
};

var getExpertReviewer$1 = function getExpertReviewer(repo, files, payload) {
  var context = new ExpertReviewerContext(payload).get();
  var prFiles = buildPrFiles(repo, files);
  return new ExpertReviewerRequest(repo.git_to_provider_user, prFiles, context).get();
};

var FILTER_EVENT_TYPE = 'gitstream-filter-function';

var AmplitudeEvent = /*#__PURE__*/function () {
  function AmplitudeEvent(_ref, filterName, args, context) {
    var _context$repo, _context$repo2, _context$repo3, _context$repo4, _context$repo5;

    var owner = _ref.owner,
        repo = _ref.repo,
        pullRequestNumber = _ref.pullRequestNumber,
        hasCmRepo = _ref.hasCmRepo;
    this.filterName = filterName;
    this.user_id = ((_context$repo = context.repo) == null ? void 0 : _context$repo.provider) + "/" + owner + "/" + repo + "/" + pullRequestNumber;
    this.args = args;
    this.repo = ((_context$repo2 = context.repo) == null ? void 0 : _context$repo2.provider) + "/" + owner + "/" + repo;
    this.author = ((_context$repo3 = context.repo) == null ? void 0 : _context$repo3.provider) + "/" + ((_context$repo4 = context.repo) == null ? void 0 : _context$repo4.pr_author);
    this.org = ((_context$repo5 = context.repo) == null ? void 0 : _context$repo5.provider) + "/" + owner;
    this.pr_url = generatePrUrl(context, {
      owner: owner,
      repo: repo,
      pullRequestNumber: pullRequestNumber
    });
    this.level = hasCmRepo ? 'Org' : 'Repo';
  }

  var _proto = AmplitudeEvent.prototype;

  _proto.get = function get() {
    return {
      event_type: FILTER_EVENT_TYPE,
      user_id: this.user_id,
      event_properties: {
        filter_name: this.filterName,
        args: this.args,
        repo: this.repo,
        author: this.author,
        org: this.org,
        pr_url: this.pr_url,
        level: this.level
      }
    };
  };

  return AmplitudeEvent;
}();

var client;

var initAmplitude = function initAmplitude(_ref2) {
  var analyticsHttpApiUrl = _ref2.analyticsHttpApiUrl,
      analyticsKey = _ref2.analyticsKey;
  client = init(analyticsKey, {
    serverUrl: analyticsHttpApiUrl
  });
};

var sendAmplitudeEvent = /*#__PURE__*/function () {
  var _ref3 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(payload, event, args, context) {
    var ampEvent;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!client) {
              initAmplitude(payload);
            }

            _context.prev = 1;
            ampEvent = new AmplitudeEvent(payload, event, args, context).get();
            _context.next = 5;
            return client.logEvent(ampEvent);

          case 5:
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](1);
            debug("Sending event to amplitude failed with the following error " + JSON.stringify(_context.t0));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 7]]);
  }));

  return function sendAmplitudeEvent(_x, _x2, _x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

var FILTER_EVENT_TYPE$1 = 'action_filter';

var SegmentEvent = /*#__PURE__*/function () {
  function SegmentEvent(_ref, filterName, args, context) {
    var _context$repo, _context$repo2, _context$repo3, _context$repo4;

    var owner = _ref.owner,
        repo = _ref.repo,
        pullRequestNumber = _ref.pullRequestNumber,
        hasCmRepo = _ref.hasCmRepo,
        trigger_id = _ref.trigger_id;
    this.filter_name = filterName;
    this.user_id = ((_context$repo = context.repo) == null ? void 0 : _context$repo.provider) + "-" + ((_context$repo2 = context.repo) == null ? void 0 : _context$repo2.pr_author);
    this.args = args;
    this.repo = repo;
    this.author = (_context$repo3 = context.repo) == null ? void 0 : _context$repo3.pr_author;
    this.org = owner;
    this.provider = (_context$repo4 = context.repo) == null ? void 0 : _context$repo4.provider;
    this.pr_url = generatePrUrl(context, {
      owner: owner,
      repo: repo,
      pullRequestNumber: pullRequestNumber
    });
    this.is_org_level = hasCmRepo;
    this.trigger_id = trigger_id;
  }

  var _proto = SegmentEvent.prototype;

  _proto.get = function get() {
    return {
      userId: this.user_id,
      event: FILTER_EVENT_TYPE$1,
      properties: {
        filter_name: this.filter_name,
        args: this.args,
        repo: this.repo,
        author: this.author,
        git_org_name: this.org,
        git_provider: this.provider,
        pr_url: this.pr_url,
        is_org_level: this.is_org_level,
        trigger_id: this.trigger_id
      }
    };
  };

  return SegmentEvent;
}();

var sendSegmentEvent = /*#__PURE__*/function () {
  var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(payload, filterName, args, context) {
    var segment, segmentEvent;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            segment = new SegmentClient({
              segmentServiceUrl: payload.segmentServiceUrl,
              segment_write_key: payload.segmentWriteKey
            });
            segmentEvent = new SegmentEvent(payload, filterName, args, context).get();
            _context.next = 5;
            return segment.track(segmentEvent);

          case 5:
            _context.next = 13;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.error("Unable to call segment", _context.t0);

            if (!(_context.t0 instanceof Error)) {
              _context.next = 13;
              break;
            }

            _context.next = 13;
            return prepareSendingLogsToDD('warn', "Unable to call segment for pr " + (payload == null ? void 0 : payload.owner) + "/" + (payload == null ? void 0 : payload.repo) + "/" + (payload == null ? void 0 : payload.pullRequestNumber), payload, {
              error: _context.t0 == null ? void 0 : _context.t0.message
            }, true);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function sendSegmentEvent(_x, _x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var generatePrUrl = function generatePrUrl(context, _ref) {
  var _context$repo;

  var owner = _ref.owner,
      repo = _ref.repo,
      pullRequestNumber = _ref.pullRequestNumber;
  return ((_context$repo = context.repo) == null ? void 0 : _context$repo.provider) === GIT_PROVIDER.GITHUB ? GIT_PROVIDER.GITHUB + ".com/" + owner + "/" + repo + "/pull/" + pullRequestNumber : GIT_PROVIDER.GITLAB + ".com/" + owner + "/" + repo + "/-/merge_requests/" + pullRequestNumber;
};
var filterAnalyticsHandler = /*#__PURE__*/function () {
  var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(analytics, payload, context) {
    var _iterator, _step, filterName;

    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _iterator = _createForOfIteratorHelperLoose(Object.keys(analytics) || {});

          case 1:
            if ((_step = _iterator()).done) {
              _context.next = 9;
              break;
            }

            filterName = _step.value;
            _context.next = 5;
            return sendAmplitudeEvent(payload, filterName, analytics[filterName].args, context);

          case 5:
            _context.next = 7;
            return sendSegmentEvent(payload, filterName, analytics[filterName].args, context);

          case 7:
            _context.next = 1;
            break;

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function filterAnalyticsHandler(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var COMMENT_REGEX = /^.*#.*$/gm;
var EMPTY_LINE_REGEX = /^\s*\n/gm;
var ACTIONS_LINE_REGEX = /-.*action( )*:.*/gi;
var ACTIONS_PREFIX_REGEX = /-.*action.*: /gi;
var AUTOMATION_KEYWORD = 'automations:';
var MALFORMED_EXPRESSION_REGEX = /{[\s]+{|}[\s]+}/gi;

var validateKeyword = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(rules, ruleFile, payload) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (rules.includes(AUTOMATION_KEYWORD)) {
              _context.next = 3;
              break;
            }

            _context.next = 3;
            return handleValidationErrors(ERRORS$1.MISSING_KEYWORD, STATUS_CODES$1.MISSING_KEYWORD, payload, ruleFile);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function validateKeyword(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var validateActions = /*#__PURE__*/function () {
  var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(actions, ruleFile, payload) {
    var supportedActions, notSupportedActions;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            supportedActions = Object.values(validatorsConstants.SUPPORTED_ACTIONS_BY_PROVIDER[payload.source] || validatorsConstants.SUPPORTED_ACTIONS_BY_PROVIDER["default"]);
            notSupportedActions = actions.filter(function (action) {
              return !supportedActions.includes(action);
            });

            if (!notSupportedActions.length) {
              _context2.next = 5;
              break;
            }

            _context2.next = 5;
            return handleValidationErrors("The following actions are not supported: " + notSupportedActions.map(function (action) {
              return "`" + action + "`";
            }).join(', ') + " [Supported actions](https://docs.gitstream.cm/automation-actions/)", STATUS_CODES$1.UNSUPPORTED_ACTION, payload, ruleFile);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function validateActions(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var validateExpressions = /*#__PURE__*/function () {
  var _ref3 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(rules, ruleFile, payload) {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!rules.match(MALFORMED_EXPRESSION_REGEX)) {
              _context3.next = 3;
              break;
            }

            _context3.next = 3;
            return handleValidationErrors(ERRORS$1.MALFORMED_EXPRESSION, STATUS_CODES$1.MALFORMED_EXPRESSION, payload, ruleFile);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function validateExpressions(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

var validateRequiredArgs = /*#__PURE__*/function () {
  var _ref4 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(runs, ruleFile, payload) {
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            runs.forEach( /*#__PURE__*/function () {
              var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(_ref5) {
                var action, args, existingArgs, requiredArgsExists, missingArgs;
                return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        action = _ref5.action, args = _ref5.args;
                        existingArgs = Object.keys(args || {});

                        requiredArgsExists = function requiredArgsExists(requireArg) {
                          return existingArgs.includes(requireArg);
                        };

                        if (validatorsConstants.REQUIRED_ARGUMENTS_BY_ACTIONS[action]) {
                          _context4.next = 5;
                          break;
                        }

                        return _context4.abrupt("return");

                      case 5:
                        missingArgs = validatorsConstants.REQUIRED_ARGUMENTS_BY_ACTIONS[action].all ? !validatorsConstants.REQUIRED_ARGUMENTS_BY_ACTIONS[action].args.every(requiredArgsExists) : !validatorsConstants / validatorsConstants.REQUIRED_ARGUMENTS_BY_ACTIONS[action].args.some(requiredArgsExists);

                        if (!missingArgs) {
                          _context4.next = 9;
                          break;
                        }

                        _context4.next = 9;
                        return handleValidationErrors("Missing required args for action: `" + action + "`: [" + validatorsConstants / validatorsConstants.REQUIRED_ARGUMENTS_BY_ACTIONS[action].args.filter(function (arg) {
                          return !existingArgs.includes(arg);
                        }).map(function (arg) {
                          return "" + arg;
                        }).join(', ') + "]", STATUS_CODES$1.MISSING_REQUIRED_FIELDS, payload, ruleFile);

                      case 9:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function (_x13) {
                return _ref6.apply(this, arguments);
              };
            }());

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function validateRequiredArgs(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

var validateSupportedArgs = /*#__PURE__*/function () {
  var _ref7 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(runs, ruleFile, payload) {
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt("return", runs.forEach( /*#__PURE__*/function () {
              var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(_ref8) {
                var action, args, unsupportedArgs;
                return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        action = _ref8.action, args = _ref8.args;
                        unsupportedArgs = Object.keys(args || {}).filter(function (arg) {
                          var _validatorsConstants$;

                          return !((_validatorsConstants$ = validatorsConstants.SUPPORTED_ARGUMENTS_BY_ACTION[action]) != null && _validatorsConstants$.includes(arg));
                        });

                        if (!(unsupportedArgs != null && unsupportedArgs.length)) {
                          _context6.next = 5;
                          break;
                        }

                        _context6.next = 5;
                        return handleValidationErrors("These arguments are not supported for `" + action + "`: [" + unsupportedArgs.map(function (arg) {
                          return "" + arg;
                        }).join(', ') + "]", STATUS_CODES$1.UNSUPPORTED_ARGUMENT, payload, ruleFile);

                      case 5:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6);
              }));

              return function (_x17) {
                return _ref9.apply(this, arguments);
              };
            }()));

          case 1:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function validateSupportedArgs(_x14, _x15, _x16) {
    return _ref7.apply(this, arguments);
  };
}();

var validateArgs = /*#__PURE__*/function () {
  var _ref10 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(rules, ruleFile, provider) {
    var rulesObj, runs;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            rulesObj = load(rules.replaceAll(/{{(.*?)}}|{(.*?)}|{%.*%}((.|\n)*){% endfor %}/g, ''));
            runs = Object.values(rulesObj.automations).flatMap(function (_ref11) {
              var run = _ref11.run;
              return run;
            });
            _context8.next = 4;
            return validateSupportedArgs(runs, ruleFile, provider);

          case 4:
            _context8.next = 6;
            return validateRequiredArgs(runs, ruleFile, provider);

          case 6:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function validateArgs(_x18, _x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

var validateSavedWords = /*#__PURE__*/function () {
  var _ref12 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(rules, ruleFile, payload) {
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            new SavedWordsValidator().validate({
              yamlFile: rules
            });
            _context9.next = 8;
            break;

          case 4:
            _context9.prev = 4;
            _context9.t0 = _context9["catch"](0);
            _context9.next = 8;
            return handleValidationErrors(_context9.t0.message, STATUS_CODES$1.SYNTAX_ERROR, payload, ruleFile);

          case 8:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 4]]);
  }));

  return function validateSavedWords(_x21, _x22, _x23) {
    return _ref12.apply(this, arguments);
  };
}();

var validateRuleFile = /*#__PURE__*/function () {
  var _ref13 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(rules, ruleFile, payload) {
    var _rulesWithoutComments;

    var rulesWithoutComments, actions;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            rulesWithoutComments = rules.replace(COMMENT_REGEX, '').replace(EMPTY_LINE_REGEX, '');
            _context10.next = 3;
            return validateKeyword(rulesWithoutComments, ruleFile, payload);

          case 3:
            _context10.next = 5;
            return validateExpressions(rulesWithoutComments, ruleFile, payload);

          case 5:
            actions = (_rulesWithoutComments = rulesWithoutComments.match(ACTIONS_LINE_REGEX)) == null ? void 0 : _rulesWithoutComments.map(function (action) {
              return action.replace(ACTIONS_PREFIX_REGEX, '').trim();
            });
            _context10.next = 8;
            return validateActions(actions, ruleFile, payload);

          case 8:
            _context10.next = 10;
            return validateArgs(rulesWithoutComments, ruleFile, payload);

          case 10:
            _context10.next = 12;
            return validateSavedWords(rules, ruleFile, payload);

          case 12:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function validateRuleFile(_x24, _x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}();

var _excluded = ["ds_blame", "ds_activity"];
var parseRules = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(rules, prContext, payload, ruleFile) {
    var repo, parser, results, passedAutomationNames, totalAutomations, owner, _repo, pullRequestNumber;

    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            repo = payload.repo;
            _context.prev = 1;
            _context.next = 4;
            return validateRuleFile(rules, ruleFile, payload);

          case 4:
            parser = new RuleParser(rules, prContext, DEBUG_MODE);
            _context.next = 7;
            return parser.parseStreams();

          case 7:
            results = _context.sent;

            if (!results.automations) {
              _context.next = 13;
              break;
            }

            passedAutomationNames = Object.keys(results.automations).filter(function (automation) {
              return results.automations[automation].passed;
            });
            totalAutomations = Object.keys(results == null ? void 0 : results.automations).length;
            _context.next = 13;
            return prepareSendingLogsToDD('info', passedAutomationNames.length + " out of " + totalAutomations + " automations have passed for repo " + repo, payload, {
              passedAutomations: passedAutomationNames.length,
              passedAutomationNames: passedAutomationNames,
              totalAutomations: totalAutomations
            });

          case 13:
            return _context.abrupt("return", results);

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](1);
            owner = payload.owner, _repo = payload.repo, pullRequestNumber = payload.pullRequestNumber;
            debug("error in parseRules: " + _context.t0);
            _context.next = 22;
            return prepareSendingLogsToDD('error', ERRORS$1.FAILED_TO_PARSE_CM + " in pr " + owner + "/" + _repo + "/" + pullRequestNumber, payload, {
              error: _context.t0 == null ? void 0 : _context.t0.message,
              rules: rules,
              ruleFile: ruleFile
            });

          case 22:
            _context.next = 24;
            return handleValidationErrors(_context.t0 == null ? void 0 : _context.t0.message, STATUS_CODES$1.SYNTAX_ERROR, payload, ruleFile);

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 16]]);
  }));

  return function parseRules(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var removeDSObjects = function removeDSObjects(context) {
  var _ref2 = context.repo || {},
      repo = _objectWithoutPropertiesLoose(_ref2, _excluded);

  return _extends({}, context, {
    repo: repo
  });
};

var executeOneRuleFile = /*#__PURE__*/function () {
  var _ref4 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(_ref3) {
    var ruleFileContent, payload, baseBranch, refBranch, _ref3$ruleFile, ruleFile, cloneRepoPath, context, tempContext, expertRequest, stringSafeRuleFile, results;

    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            ruleFileContent = _ref3.ruleFileContent, payload = _ref3.payload, baseBranch = _ref3.baseBranch, refBranch = _ref3.refBranch, _ref3$ruleFile = _ref3.ruleFile, ruleFile = _ref3$ruleFile === void 0 ? 'playground.cm' : _ref3$ruleFile, cloneRepoPath = _ref3.cloneRepoPath;
            CWD.cwd = cloneRepoPath;
            _context2.next = 4;
            return getContext(baseBranch, refBranch, payload, ruleFileContent, ruleFile, isCmChanged);

          case 4:
            tempContext = _context2.sent;
            expertRequest = getExpertReviewer$1(tempContext.repo, tempContext.files, payload);
            debug("expertRequest for cm file: " + ruleFile + ": " + JSON.stringify(expertRequest, null, 2));
            context = removeDSObjects(tempContext);
            context.repo = _extends({}, context.repo, {
              data_service: {
                expert_reviwer_request: expertRequest
              }
            });
            stringSafeRuleFile = convertRuleFileToStringSafe(ruleFileContent);
            _context2.next = 12;
            return parseRules(stringSafeRuleFile, context, payload, ruleFile);

          case 12:
            results = _context2.sent;
            return _context2.abrupt("return", {
              results: results,
              context: context,
              errors: rulesEngineErrors
            });

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function executeOneRuleFile(_x5) {
    return _ref4.apply(this, arguments);
  };
}();
var executeCached = /*#__PURE__*/function () {
  var _ref6 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(_ref5) {
    var ruleFileContent, payload, _ref5$ruleFile, ruleFile, cachedContext, stringSafeRuleFile, results;

    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            ruleFileContent = _ref5.ruleFileContent, payload = _ref5.payload, _ref5$ruleFile = _ref5.ruleFile, ruleFile = _ref5$ruleFile === void 0 ? 'playground.cm' : _ref5$ruleFile, cachedContext = _ref5.cachedContext;
            stringSafeRuleFile = convertRuleFileToStringSafe(ruleFileContent);
            _context3.next = 4;
            return parseRules(stringSafeRuleFile, cachedContext, payload, ruleFile);

          case 4:
            results = _context3.sent;
            return _context3.abrupt("return", {
              results: results,
              context: cachedContext,
              errors: rulesEngineErrors
            });

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function executeCached(_x6) {
    return _ref6.apply(this, arguments);
  };
}();

var parseRulesParserErrors = /*#__PURE__*/function () {
  var _ref7 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(results, ruleFile, stringSafeRuleFile, payload) {
    var owner, repo, pullRequestNumber, validatorErrors, parserErrors, _i, _Object$keys, validator, _i2, _Object$keys2, statusCode;

    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            owner = payload.owner, repo = payload.repo, pullRequestNumber = payload.pullRequestNumber;
            _context4.prev = 1;
            validatorErrors = results == null ? void 0 : results.validatorErrors;
            parserErrors = results == null ? void 0 : results.errors; //If VALIDATOR error - send to DD only, other errors - fail gitstream

            if (!Object.keys(validatorErrors || {}).length) {
              _context4.next = 14;
              break;
            }

            _i = 0, _Object$keys = Object.keys(validatorErrors);

          case 6:
            if (!(_i < _Object$keys.length)) {
              _context4.next = 14;
              break;
            }

            validator = _Object$keys[_i];
            debug(ERRORS$1.VALIDATOR_ERROR + " - " + validator + ": " + validatorErrors[validator]);
            _context4.next = 11;
            return prepareSendingLogsToDD('warn', ERRORS$1.VALIDATOR_ERROR + " - " + validator + " in pr " + owner + "/" + repo + "/" + pullRequestNumber, payload, {
              error: "" + validatorErrors[validator],
              ruleFile: ruleFile,
              cmContent: stringSafeRuleFile
            }, true);

          case 11:
            _i++;
            _context4.next = 6;
            break;

          case 14:
            if (!Object.keys(parserErrors || {}).length) {
              _context4.next = 25;
              break;
            }

            _i2 = 0, _Object$keys2 = Object.keys(parserErrors);

          case 16:
            if (!(_i2 < _Object$keys2.length)) {
              _context4.next = 24;
              break;
            }

            statusCode = _Object$keys2[_i2];
            debug("Error: " + parserErrors[statusCode]);
            _context4.next = 21;
            return handleValidationErrors(parserErrors[statusCode], statusCode, payload, ruleFile);

          case 21:
            _i2++;
            _context4.next = 16;
            break;

          case 24:
            return _context4.abrupt("return", true);

          case 25:
            _context4.next = 35;
            break;

          case 27:
            _context4.prev = 27;
            _context4.t0 = _context4["catch"](1);
            debug("Error in parseRulesParserErrors " + (_context4.t0 == null ? void 0 : _context4.t0.message));
            _context4.next = 32;
            return prepareSendingLogsToDD('warn', ERRORS$1.FAILED_PARSE_RULES_PARSER_ERRORS + " in pr " + owner + "/" + repo + "/" + pullRequestNumber, payload, {
              error: "" + (_context4.t0 == null ? void 0 : _context4.t0.message),
              ruleFile: ruleFile
            }, true);

          case 32:
            _context4.next = 34;
            return handleValidationErrors(ERRORS$1.FAILED_PARSE_RULES_PARSER_ERRORS + ": " + (_context4.t0 == null ? void 0 : _context4.t0.message), STATUS_CODES$1.FAILED_PARSE_RULES_PARSER_ERRORS, payload, ruleFile);

          case 34:
            return _context4.abrupt("return", true);

          case 35:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 27]]);
  }));

  return function parseRulesParserErrors(_x7, _x8, _x9, _x10) {
    return _ref7.apply(this, arguments);
  };
}();

var parseMultipleRuleFiles = /*#__PURE__*/function () {
  var _ref8 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(rules, baseBranch, refBranch, payload, isCmChanged, cache) {
    var combinedResults, contextPerRuleFile, _loop, _i3, _Object$keys3, _ret;

    return _regeneratorRuntime().wrap(function _callee5$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (cache === void 0) {
              cache = null;
            }

            combinedResults = {};
            contextPerRuleFile = {};
            _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
              var ruleFile, context, tempContext, expertRequest, stringSafeRuleFile, results, breakGitstream, owner, repo, pullRequestNumber;
              return _regeneratorRuntime().wrap(function _loop$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      ruleFile = _Object$keys3[_i3];
                      _context5.prev = 1;

                      if (!cache) {
                        _context5.next = 6;
                        break;
                      }

                      context = _extends({}, cache[ruleFile], {
                        pr: convertPRContextFromBase64(payload.prContext)
                      });
                      _context5.next = 13;
                      break;

                    case 6:
                      _context5.next = 8;
                      return getContext(baseBranch, refBranch, payload, rules[ruleFile], ruleFile, isCmChanged);

                    case 8:
                      tempContext = _context5.sent;
                      expertRequest = getExpertReviewer$1(tempContext.repo, tempContext.files, payload);
                      debug("expertRequest for cm file: " + ruleFile + ": " + JSON.stringify(expertRequest, null, 2));
                      context = removeDSObjects(tempContext);
                      context.repo = _extends({}, context.repo, {
                        data_service: {
                          expert_reviwer_request: expertRequest
                        }
                      });

                    case 13:
                      context.env = process.env;
                      contextPerRuleFile[ruleFile] = context;
                      stringSafeRuleFile = convertRuleFileToStringSafe(rules[ruleFile]);
                      _context5.next = 18;
                      return parseRules(stringSafeRuleFile, context, payload, "" + ruleFile);

                    case 18:
                      results = _context5.sent;
                      _context5.next = 21;
                      return parseRulesParserErrors(results, ruleFile, stringSafeRuleFile, payload);

                    case 21:
                      breakGitstream = _context5.sent;

                      if (!breakGitstream) {
                        _context5.next = 24;
                        break;
                      }

                      return _context5.abrupt("return", {
                        v: {}
                      });

                    case 24:
                      _context5.next = 26;
                      return filterAnalyticsHandler(results.analytics, payload, context);

                    case 26:
                      combinedResults = Object.keys(results.automations).reduce(function (acc, automation) {
                        var _ruleFile$replace, _extends2;

                        var ruleFileName = (ruleFile == null ? void 0 : (_ruleFile$replace = ruleFile.replace('.cm/', '')) == null ? void 0 : _ruleFile$replace.replace('.cm', '')) || ruleFile;
                        var isOrgLevel = !(ruleFile != null && ruleFile.includes('.cm/'));
                        return _extends({}, acc, (_extends2 = {}, _extends2[ruleFileName + "/" + automation] = _extends({}, results.automations[automation], {
                          is_org_level: isOrgLevel,
                          provider_repository_id: isOrgLevel ? payload.cmRepoId : payload.providerRepoId
                        }), _extends2));
                      }, combinedResults);
                      _context5.next = 37;
                      break;

                    case 29:
                      _context5.prev = 29;
                      _context5.t0 = _context5["catch"](1);
                      debug("parseMultipleRuleFiles error: " + _context5.t0.message);
                      owner = payload.owner, repo = payload.repo, pullRequestNumber = payload.pullRequestNumber;
                      _context5.next = 35;
                      return prepareSendingLogsToDD('error', ERRORS$1.FAILED_TO_PARSE_CM + " in pr " + owner + "/" + repo + "/" + pullRequestNumber, payload, {
                        error: _context5.t0 == null ? void 0 : _context5.t0.message,
                        rules: rules,
                        ruleFile: ruleFile
                      });

                    case 35:
                      _context5.next = 37;
                      return handleValidationErrors(ERRORS$1.FAILED_TO_PARSE_CM, STATUS_CODES$1.FAILED_TO_PARSE_CM, payload, ruleFile);

                    case 37:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, _loop, null, [[1, 29]]);
            });
            _i3 = 0, _Object$keys3 = Object.keys(rules);

          case 5:
            if (!(_i3 < _Object$keys3.length)) {
              _context6.next = 13;
              break;
            }

            return _context6.delegateYield(_loop(), "t0", 7);

          case 7:
            _ret = _context6.t0;

            if (!(typeof _ret === "object")) {
              _context6.next = 10;
              break;
            }

            return _context6.abrupt("return", _ret.v);

          case 10:
            _i3++;
            _context6.next = 5;
            break;

          case 13:
            return _context6.abrupt("return", {
              automations: combinedResults,
              contextPerFile: contextPerRuleFile
            });

          case 14:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee5);
  }));

  return function parseMultipleRuleFiles(_x11, _x12, _x13, _x14, _x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
var extractAdmins = /*#__PURE__*/function () {
  var _ref9 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(baseBranch, isCmRepoFullyInstalled, payload) {
    var _rulesObj$config, _rulesObj$config$admi, cmRepoRef, repo, repoCmFile, rules, rulesObj, admins, _orgRulesObj$config, _orgRulesObj$config$a, OrgLevelRules, orgRulesObj, adminArray, owner, _repo2, pullRequestNumber;

    return _regeneratorRuntime().wrap(function _callee6$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            cmRepoRef = payload.cmRepoRef, repo = payload.repo;
            repoCmFile = (repo == null ? void 0 : repo.toLowerCase()) === ORG_LEVEL_REPO ? '' : '.cm/' + MAIN_RULES_FILE;
            rules = readRemoteFile(repoCmFile, baseBranch);
            _context7.next = 6;
            return parseCMFile(payload, rules, repoCmFile);

          case 6:
            rulesObj = _context7.sent;
            admins = (rulesObj == null ? void 0 : (_rulesObj$config = rulesObj.config) == null ? void 0 : (_rulesObj$config$admi = _rulesObj$config.admin) == null ? void 0 : _rulesObj$config$admi.users) || [];

            if (!isCmRepoFullyInstalled) {
              _context7.next = 14;
              break;
            }

            OrgLevelRules = readRemoteFile(MAIN_RULES_FILE, cmRepoRef, REPO_FOLDER.CM);
            _context7.next = 12;
            return parseCMFile(payload, OrgLevelRules, MAIN_RULES_FILE);

          case 12:
            orgRulesObj = _context7.sent;
            admins = admins.concat((orgRulesObj == null ? void 0 : (_orgRulesObj$config = orgRulesObj.config) == null ? void 0 : (_orgRulesObj$config$a = _orgRulesObj$config.admin) == null ? void 0 : _orgRulesObj$config$a.users) || []);

          case 14:
            adminArray = Array.from(new Set(admins));
            return _context7.abrupt("return", adminArray);

          case 18:
            _context7.prev = 18;
            _context7.t0 = _context7["catch"](0);
            owner = payload.owner, _repo2 = payload.repo, pullRequestNumber = payload.pullRequestNumber;
            _context7.next = 23;
            return prepareSendingLogsToDD('warn', ERRORS$1.FAILED_TO_EXTRACT_ADMINS + " in pr " + owner + "/" + _repo2 + "/" + pullRequestNumber, payload, {
              error: _context7.t0 == null ? void 0 : _context7.t0.message
            }, true);

          case 23:
            console.warn(ERRORS$1.FAILED_TO_EXTRACT_ADMINS);
            return _context7.abrupt("return", []);

          case 25:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee6, null, [[0, 18]]);
  }));

  return function extractAdmins(_x17, _x18, _x19) {
    return _ref9.apply(this, arguments);
  };
}();
var getCMChanged = function getCMChanged(refBranch, baseBranch, repo) {
  var cmChanged = isCmChanged(refBranch, baseBranch, repo);
  var isDryRun = cmChanged && hasNonRuleFilesChanges(refBranch, baseBranch, repo);
  return {
    cmChanged: cmChanged,
    isDryRun: isDryRun
  };
};

var getRules = /*#__PURE__*/function () {
  var _ref10 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(cmChanged, refBranch, baseBranch, payload, isCmRepoFullyInstalled) {
    var repo, cmRepoRef, rules, orgRules, orgRulesToExclude, _iterator, _step, ruleFile;

    return _regeneratorRuntime().wrap(function _callee7$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            repo = payload.repo, cmRepoRef = payload.cmRepoRef;
            _context8.next = 4;
            return getRuleFiles(cmChanged ? refBranch : baseBranch, repo);

          case 4:
            rules = _context8.sent;

            if (!(isCmRepoFullyInstalled && (repo == null ? void 0 : repo.toLowerCase()) !== ORG_LEVEL_REPO)) {
              _context8.next = 12;
              break;
            }

            orgRules = getOrgCmFiles(cmRepoRef);
            _context8.next = 9;
            return getExcludedOrgCMFilesBasedOnRepo(orgRules, repo, payload);

          case 9:
            orgRulesToExclude = _context8.sent;

            for (_iterator = _createForOfIteratorHelperLoose(orgRulesToExclude); !(_step = _iterator()).done;) {
              ruleFile = _step.value;
              delete orgRules[ruleFile];
            }

            rules = _extends({}, orgRules, rules);

          case 12:
            return _context8.abrupt("return", rules);

          case 15:
            _context8.prev = 15;
            _context8.t0 = _context8["catch"](0);
            debug(_context8.t0.message);
            return _context8.abrupt("return", {});

          case 19:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee7, null, [[0, 15]]);
  }));

  return function getRules(_x20, _x21, _x22, _x23, _x24) {
    return _ref10.apply(this, arguments);
  };
}();

var getRulesAndValidate = /*#__PURE__*/function () {
  var _ref11 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(cmChanged, refBranch, baseBranch, payload, isCmRepoFullyInstalled) {
    var rules;
    return _regeneratorRuntime().wrap(function _callee8$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return getRules(cmChanged, refBranch, baseBranch, payload, isCmRepoFullyInstalled);

          case 2:
            rules = _context9.sent;

            if (Object.keys(rules).length) {
              _context9.next = 8;
              break;
            }

            _context9.next = 6;
            return prepareSendingLogsToDD('warn', ERRORS$1.RULE_FILE_NOT_FOUND, payload, {
              error: ERRORS$1.RULE_FILE_NOT_FOUND
            }, true);

          case 6:
            _context9.next = 8;
            return handleValidationErrors(ERRORS$1.RULE_FILE_NOT_FOUND, STATUS_CODES$1.RULE_FILE_NOT_FOUND, payload);

          case 8:
            return _context9.abrupt("return", rules);

          case 9:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee8);
  }));

  return function getRulesAndValidate(_x25, _x26, _x27, _x28, _x29) {
    return _ref11.apply(this, arguments);
  };
}();

var getPREventsInRuleFile = function getPREventsInRuleFile(rules, file) {
  return Object.values(WATCH_PR_EVENTS).reduce(function (ac, event) {
    if (rules[file].includes("pr." + event)) {
      var _extends3;

      return _extends({}, ac, (_extends3 = {}, _extends3[event] = true, _extends3));
    }

    return ac;
  }, {});
};

var getFiltersInRuleFile = function getFiltersInRuleFile(rules, file) {
  return Object.keys(WATCH_FILTERS).reduce(function (ac, filter) {
    if (WATCH_FILTERS[filter].test(rules[file])) {
      var _extends4;

      return _extends({}, ac, (_extends4 = {}, _extends4[filter] = true, _extends4));
    }

    return ac;
  }, {});
};

var getWatchers = /*#__PURE__*/function () {
  var _ref12 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(rules, payload) {
    var watchers, owner, repo, pullRequestNumber;
    return _regeneratorRuntime().wrap(function _callee9$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            watchers = Object.keys(rules).reduce(function (acc, file) {
              var events = getPREventsInRuleFile(rules, file);
              var filters = getFiltersInRuleFile(rules, file);
              return {
                events: _extends({}, acc == null ? void 0 : acc.events, events),
                filters: _extends({}, acc == null ? void 0 : acc.filters, filters)
              };
            }, {});
            return _context10.abrupt("return", watchers);

          case 5:
            _context10.prev = 5;
            _context10.t0 = _context10["catch"](0);
            owner = payload.owner, repo = payload.repo, pullRequestNumber = payload.pullRequestNumber;
            _context10.next = 10;
            return prepareSendingLogsToDD('warn', ERRORS$1.FAILED_TO_GET_WATCHERS + " in pr " + owner + "/" + repo + "/" + pullRequestNumber, payload, {
              error: _context10.t0 == null ? void 0 : _context10.t0.message
            }, true);

          case 10:
            _context10.next = 12;
            return handleValidationErrors(ERRORS$1.FAILED_TO_GET_WATCHERS, STATUS_CODES$1.FAILED_TO_GET_WATCHERS, payload);

          case 12:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee9, null, [[0, 5]]);
  }));

  return function getWatchers(_x30, _x31) {
    return _ref12.apply(this, arguments);
  };
}();
var executeParser = /*#__PURE__*/function () {
  var _ref14 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(_ref13) {
    var context, ruleFileContent, payload, ruleFile, stringSafeRuleFile, results;
    return _regeneratorRuntime().wrap(function _callee10$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            context = _ref13.context, ruleFileContent = _ref13.ruleFileContent, payload = _ref13.payload;
            ruleFile = 'playground.cm';
            stringSafeRuleFile = convertRuleFileToStringSafe(ruleFileContent);
            _context11.next = 5;
            return parseRules(stringSafeRuleFile, context, payload, ruleFile);

          case 5:
            results = _context11.sent;
            return _context11.abrupt("return", {
              results: results,
              errors: rulesEngineErrors
            });

          case 7:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee10);
  }));

  return function executeParser(_x32) {
    return _ref14.apply(this, arguments);
  };
}();

var validateDefaultFolder = function validateDefaultFolder() {
  try {
    executeGitCommand("git config --global --add safe.directory '*'");
    return true;
  } catch (e) {
    REPO_FOLDER.DEFAULT = '.';
    return false;
  }
};
var calculateRunData = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(payload, refBranch, baseBranch, isCmRepoFullyInstalled) {
    var repo, cmState, rules, admins;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            repo = payload.repo;
            cmState = getCMChanged(refBranch, baseBranch, repo);
            _context.next = 4;
            return getRulesAndValidate(cmState.cmChanged, refBranch, baseBranch, payload, isCmRepoFullyInstalled);

          case 4:
            rules = _context.sent;
            _context.next = 7;
            return extractAdmins(baseBranch, isCmRepoFullyInstalled, payload);

          case 7:
            admins = _context.sent;
            return _context.abrupt("return", {
              cmState: cmState,
              rules: rules,
              admins: admins,
              cache: {}
            });

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function calculateRunData(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();
var loadRunData = /*#__PURE__*/function () {
  var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(payload, refBranch, baseBranch, isCmRepoFullyInstalled) {
    var _cache, _rules, _admins, _cmState, _yield$calculateRunDa, rules, admins, cmState, cache;

    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!USE_CACHE) {
              _context2.next = 10;
              break;
            }

            _cache = loadCacheResults();

            if (Object.keys(_cache)) {
              _context2.next = 6;
              break;
            }

            _context2.next = 5;
            return handleValidationErrors(ERRORS$1.INVALID_CACHE, STATUS_CODES$1.INVALID_CACHE, {});

          case 5:
            return _context2.abrupt("return", _context2.sent);

          case 6:
            _rules = _cache.rules;
            _admins = _cache.admins;
            _cmState = _cache.cmState;
            return _context2.abrupt("return", {
              cache: _cache,
              rules: _rules,
              admins: _admins,
              cmState: _cmState
            });

          case 10:
            _context2.next = 12;
            return calculateRunData(payload, refBranch, baseBranch, isCmRepoFullyInstalled);

          case 12:
            _yield$calculateRunDa = _context2.sent;
            rules = _yield$calculateRunDa.rules;
            admins = _yield$calculateRunDa.admins;
            cmState = _yield$calculateRunDa.cmState;
            cache = _yield$calculateRunDa.cache;
            return _context2.abrupt("return", {
              rules: rules,
              admins: admins,
              cmState: cmState,
              cache: cache
            });

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function loadRunData(_x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();
var sendResultsToResolver = /*#__PURE__*/function () {
  var _ref3 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(body, payload, automations) {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return axios.post(RULES_RESOLVER_URL, JSON.stringify(body), {
              headers: {
                'Content-Type': 'application/json',
                'x-api-key': RESOLVER_TOKEN
              }
            });

          case 3:
            _context3.next = 5;
            return prepareSendingLogsToDD('info', ERRORS$1.SEND_RESULTS_TO_RESOLVER_SUCCEEDED, payload);

          case 5:
            console.log({
              parserResults: JSON.stringify(automations)
            });
            _context3.next = 15;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            _context3.next = 12;
            return prepareSendingLogsToDD('error', ERRORS$1.SEND_RESULTS_TO_RESOLVER_FAILED, payload, {
              error: _context3.t0 == null ? void 0 : _context3.t0.message,
              body: body
            });

          case 12:
            console.error(ERRORS$1.SEND_RESULTS_TO_RESOLVER_FAILED, {
              error: _context3.t0
            });
            _context3.next = 15;
            return handleValidationErrors(_context3.t0 == null ? void 0 : _context3.t0.message, STATUS_CODES$1.SEND_RESULTS_TO_RESOLVER_FAILED, payload);

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 8]]);
  }));

  return function sendResultsToResolver(_x9, _x10, _x11) {
    return _ref3.apply(this, arguments);
  };
}();

var runCI = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var refBranch, baseBranch, payload, repo, owner, pullRequestNumber, headSha, hasCmRepo, isCmRepoFullyInstalled, _yield$loadRunData, rules, admins, cmState, cache, _yield$parseMultipleR, automations, contextPerFile, watchers, body, _owner, _repo, _pullRequestNumber;

    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            refBranch = (HEAD_REF || '').trim();
            baseBranch = (BASE_REF || '').trim();
            payload = typeof JSON.parse(CLIENT_PAYLOAD) === 'string' ? JSON.parse(JSON.parse(CLIENT_PAYLOAD)) : JSON.parse(CLIENT_PAYLOAD);
            _context.prev = 3;
            repo = payload.repo, owner = payload.owner, pullRequestNumber = payload.pullRequestNumber, headSha = payload.headSha, hasCmRepo = payload.hasCmRepo; //Check if the user has a cm repo (in gitlab the repo should also have a rules file) and the yml supports org level.

            isCmRepoFullyInstalled = validateDefaultFolder() && hasCmRepo;
            console.log("PR: " + owner + "/" + repo + "/pull/" + pullRequestNumber + "\ncommit: " + headSha);
            _context.next = 9;
            return loadRunData(payload, refBranch, baseBranch, isCmRepoFullyInstalled);

          case 9:
            _yield$loadRunData = _context.sent;
            rules = _yield$loadRunData.rules;
            admins = _yield$loadRunData.admins;
            cmState = _yield$loadRunData.cmState;
            cache = _yield$loadRunData.cache;
            _context.next = 16;
            return parseMultipleRuleFiles(rules, baseBranch, refBranch, payload, cmState.cmChanged, cache.contextPerFile);

          case 16:
            _yield$parseMultipleR = _context.sent;
            automations = _yield$parseMultipleR.automations;
            contextPerFile = _yield$parseMultipleR.contextPerFile;
            saveResultsInCache({
              contextPerFile: contextPerFile,
              rules: rules,
              admins: admins,
              cmState: cmState
            });
            _context.next = 22;
            return getWatchers(rules, payload);

          case 22:
            watchers = _context.sent;
            // Send evaluated rules to the resolver
            body = {
              automations: automations,
              context: _extends({
                watchPREvents: watchers.events,
                watchFilters: watchers.filters
              }, payload, {
                admins: admins,
                dryRun: cmState.isDryRun,
                onlyRulesFilesChanges: cmState.cmChanged && !cmState.isDryRun
              }, attachAdditionalContextByProvider(payload.source, {
                baseBranch: baseBranch
              }))
            };
            _context.next = 26;
            return sendResultsToResolver(body, payload, automations);

          case 26:
            _context.next = 36;
            break;

          case 28:
            _context.prev = 28;
            _context.t0 = _context["catch"](3);
            _owner = payload.owner, _repo = payload.repo, _pullRequestNumber = payload.pullRequestNumber;
            console.error(ERRORS$1.INTERNAL_ERROR, {
              error: _context.t0
            });
            _context.next = 34;
            return prepareSendingLogsToDD('warn', ERRORS$1.INTERNAL_ERROR + " for pr " + _owner + "/" + _repo + "/" + _pullRequestNumber, payload, {
              error: _context.t0 == null ? void 0 : _context.t0.toString()
            });

          case 34:
            _context.next = 36;
            return handleValidationErrors(_context.t0 == null ? void 0 : _context.t0.toString(), STATUS_CODES$1.INTERNAL_ERROR, payload);

          case 36:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 28]]);
  }));

  return function runCI() {
    return _ref.apply(this, arguments);
  };
}();

// @ts-nocheck
console.log('Running gitstream-rules-engine 1.2.3');
var isExecutePlayground = false;
var RulesEngine = function RulesEngine(isPlayground) {
  if (isPlayground === void 0) {
    isPlayground = false;
  }

  isExecutePlayground = isPlayground;
  return {
    run: runCI,
    executeOneRuleFile: executeOneRuleFile,
    executeCached: executeCached,
    executeParser: executeParser
  };
};

export { RuleParser, RulesEngine };
//# sourceMappingURL=gitstream-core.esm.js.map
