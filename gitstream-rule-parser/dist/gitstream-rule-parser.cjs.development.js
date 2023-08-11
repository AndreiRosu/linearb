'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var yaml = require('js-yaml');
var nunjucks = require('nunjucks');
var _ = _interopDefault(require('lodash'));
var axios = _interopDefault(require('axios'));
var moment = _interopDefault(require('moment'));
var prettier = _interopDefault(require('prettier'));
var child_process = require('child_process');

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

var BASE_URL =  'https://workerb.linearb.io' ;
var API_ENDPOINTS = {
  REVIEW_TIME: BASE_URL + '/v1/pulls/review-time',
  EXPERT_REVIWER: BASE_URL + '/gs/v1/data-service/expert-reviewer'
};
var PACKAGE_NAME = 'gitstream-rules-parser';
var ERRORS = {
  FAILED_RENDER_STRING: PACKAGE_NAME + ' - failed render string',
  FAILED_YAML_LOAD: PACKAGE_NAME + ' - failed yaml.load'
};
var STATUS_CODES = {
  FAILED_RENDER_STRING: 80,
  FAILED_YAML_LOAD: 81
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
})(GeneralFilters || (GeneralFilters = {}));

var GENERAL_FILTERS_HANDLER = (_GENERAL_FILTERS_HAND = {}, _GENERAL_FILTERS_HAND[GeneralFilters.some] = parseSome, _GENERAL_FILTERS_HAND[GeneralFilters.every] = parseEvery, _GENERAL_FILTERS_HAND[GeneralFilters.filter] = parseFilter, _GENERAL_FILTERS_HAND[GeneralFilters.reject] = parseReject, _GENERAL_FILTERS_HAND[GeneralFilters.map] = parseMap, _GENERAL_FILTERS_HAND[GeneralFilters.includes] = parseIncludes, _GENERAL_FILTERS_HAND[GeneralFilters.match] = parseMatch, _GENERAL_FILTERS_HAND[GeneralFilters.nope] = parseNope, _GENERAL_FILTERS_HAND);

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
  var blackResult = child_process.spawnSync(PYTHON_COMMAND, ['-c', "import black; print(black.format_str(" + JSON.stringify(content) + ", mode=black.FileMode()))"]);
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
})(DefaultParserAttributes || (DefaultParserAttributes = {}));

var RuleParser = /*#__PURE__*/function () {
  function RuleParser(ruleFileContent, context, debugMode) {
    var _this = this;

    this.renderedRuleFile = {};
    this.context = {};
    this.lastParserResult = {};
    this.isDebug = debugMode;
    this.env = new nunjucks.Environment(new nunjucks.FileSystemLoader(__dirname), {
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
                              _this2.renderedRuleFile = yaml.load(res);
                            } catch (error) {
                              var _errors;

                              if (_this2.isDebug) {
                                console.log(ERRORS.FAILED_YAML_LOAD, error);
                              }

                              _this2.renderedRuleFile = _extends({}, _this2.renderedRuleFile, {
                                errors: (_errors = {}, _errors[STATUS_CODES.FAILED_YAML_LOAD] = ERRORS.FAILED_YAML_LOAD, _errors)
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
        var _extends2;

        var argValue = run.args[arg];
        return _extends({}, acc, (_extends2 = {}, _extends2[arg] = argValue && listify.includes(arg) && typeof argValue === 'string' ? argValue.split(',') : run.args[arg], _extends2));
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
      var _extends3;

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
      return _extends({}, acc, (_extends3 = {}, _extends3[resource] = {
        "if": rules,
        run: _this3.validateRun(_this3.renderedRuleFile[resourceName][resource].run),
        passed: passed
      }, _extends3));
    }, {});
  };

  _proto.combineMetadataWithResult = function combineMetadataWithResult() {
    var _this$lastParserResul;

    this.lastParserResult = (_this$lastParserResul = {}, _this$lastParserResul[DefaultParserAttributes.errors] = _extends({}, this.renderedRuleFile[DefaultParserAttributes.errors] && this.renderedRuleFile[DefaultParserAttributes.errors]), _this$lastParserResul[DefaultParserAttributes.automations] = _extends({}, this.combineMetadataWithRulesResult(DefaultParserAttributes.automations)), _this$lastParserResul[DefaultParserAttributes.analytics] = _extends({}, Object.keys(FiltersForAnalytics.filters).length && FiltersForAnalytics.filters), _this$lastParserResul);
    return this.lastParserResult;
  };

  _proto.parseStreams = /*#__PURE__*/function () {
    var _parseStreams = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      return _regeneratorRuntime().wrap(function _callee2$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.render();

            case 2:
              return _context3.abrupt("return", this.combineMetadataWithResult());

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee2, this);
    }));

    function parseStreams() {
      return _parseStreams.apply(this, arguments);
    }

    return parseStreams;
  }();

  return RuleParser;
}();

exports.RuleParser = RuleParser;
//# sourceMappingURL=gitstream-rule-parser.cjs.development.js.map
