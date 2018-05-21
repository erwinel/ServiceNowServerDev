var JsTypeCommander = Class.create();
(function (JsTypeCommander) {
    var patternDefaults = {
        newLineSequence: "\n",
        regex: {
            onlyWhitespace: /^[\s\r\n]+$/,
            trimStart: /^[\s\r\n]*(\S(?:.|[\r\n])*)$/,
            trimEnd: /^([\s\r\n]*\S+(?:[\s\r\n]+[^\s\r\n]+)*)/,
            lineSeparator: /\r\n?|\n/,
            booleanText: /^[\s\r\n]*(?:(t(?:rue)?|y(?:es)?|[+-]?(?:0*[1-9]\d*(?:\.\d+)?|0+\.0*[1-9]\d*)|\+)|(f(?:alse)?|no?|[+-]?0+(?:\.0+)?|-))[\s\r\n]*$/i,
            firstLetterLc: /^([^a-zA-Z\d]+)?([a-z])((?:.|[\r\n])+)?$/,
            abnormalWhitespace: /(?:(?=[^ ])[\s\r\n]+|[\s\r\n]{2,})/
        }
    };
    var patternOptions = {
        newLineSequence: patternDefaults.newLineSequence,
        regex: {
            onlyWhitespace: patternDefaults.regex.onlyWhitespace,
            trimStart: patternDefaults.regex.trimStart,
            trimEnd: patternDefaults.regex.trimEnd,
            lineSeparator: patternDefaults.regex.lineSeparator,
            booleanText: patternDefaults.regex.booleanText,
            firstLetterLc: patternDefaults.regex.firstLetterLc,
            abnormalWhitespace: patternDefaults.regex.abnormalWhitespace
        }
    };
    var limitingIterator = /** @class */ (function () {
        function limitingIterator(callbackfn, options) {
            this.totalMaxItems = 8192;
            this.currentTotalItems = 0;
            this.maxItemsInObject = 1024;
            this.maxDepth = 32;
            this._typeCommander = new JsTypeCommander();
            this.callbackfn = callbackfn;
            if (typeof (options) == "object") {
                this.totalMaxItems = this._typeCommander.toNumber(options.totalMaxItems, this.totalMaxItems);
                this.maxItemsInObject = this._typeCommander.toNumber(options.maxItemsInObject, this.maxItemsInObject);
                this.maxDepth = this._typeCommander.toNumber(options.maxDepth, this.maxDepth);
                this.thisObj = options.thisObj;
            }
        }
        limitingIterator.prototype.iterateInto = function (maxDepth, current, key, source, target) {
            this.currentTotalItems++;
            target = (this._typeCommander.isNil(this.thisObj)) ? this.callbackfn(current, key, source, target) : this.callbackfn.call(this.thisObj, current, key);
            if (maxDepth < 1 || this.currentTotalItems >= this.totalMaxItems || !this._typeCommander.isObject(target) || !this._typeCommander.isObject(source))
                return target;
            source = current;
            if (this._typeCommander.isArray(target)) {
                if (!this._typeCommander.isArray(current))
                    return target;
                for (var index = 0; index < current.length && index < this.maxItemsInObject; index++) {
                    var t = this.iterateInto(maxDepth - 1, current[index], index, source, target);
                    if (index < target.length)
                        target[index] = t;
                    else
                        target.push(t);
                    if (this.currentTotalItems >= this.totalMaxItems)
                        break;
                }
            }
            else {
                var count = 0;
                for (var n in current) {
                    count++;
                    if (count > this.maxItemsInObject)
                        break;
                    target[n] = this.iterateInto(maxDepth - 1, current[n], n, source, target);
                    if (this.currentTotalItems >= this.totalMaxItems)
                        break;
                }
            }
            return target;
        };
        return limitingIterator;
    }());

    var tProto = { initialize: function() { } };

    /**
     * Gets the default character sequence that will be used when joining lines of text.
     * @returns {string} The default character sequence that will be used when joining lines of text.
     */
    tProto.getDefaultLineSeparatorSequence = function () { return patternOptions.newLineSequence; };
    /**
     * Gets regular expression patterns used internally by this module.
     * @returns {IJsTypeCommanderRegex} Object whose properties contain regular expression patterns used internally by this module.
     */
    tProto.getPatternOptions = function () {
        return {
            onlyWhitespace: patternOptions.regex.onlyWhitespace,
            trimStart: patternOptions.regex.trimStart,
            trimEnd: patternOptions.regex.trimEnd,
            lineSeparator: patternOptions.regex.lineSeparator,
            booleanText: patternOptions.regex.booleanText,
            firstLetterLc: patternOptions.regex.firstLetterLc,
            abnormalWhitespace: patternOptions.regex.abnormalWhitespace
        };
    };
    /**
     * Sets regular expression pattern options used internally by this module.
     * @param {IJsTypeCommanderRegex} settings Object whose properties contain regular expression patterns used internally by this module.
     * Undefined properties will not be changed. If this parameter is not defined, then the default pattern options will be restored.
     * @returns {IJsTypeCommanderRegex} Object whose properties contain regular expression patterns now being used internally by this module.
     */
    tProto.setPatternOptions = function (settings) {
        if (typeof (settings) == "undefined" || settings === null) {
            patternOptions.regex.onlyWhitespace = patternDefaults.regex.onlyWhitespace;
            patternOptions.regex.trimStart = patternDefaults.regex.trimStart;
            patternOptions.regex.trimEnd = patternDefaults.regex.trimEnd;
            patternOptions.regex.lineSeparator = patternDefaults.regex.lineSeparator;
            patternOptions.regex.booleanText = patternDefaults.regex.booleanText;
            patternOptions.regex.firstLetterLc = patternDefaults.regex.firstLetterLc;
            patternOptions.regex.abnormalWhitespace = patternDefaults.regex.abnormalWhitespace;
        }
        else if (typeof (settings) == "object") {
            if (!this.isNil(settings.onlyWhitespace))
                patternOptions.regex.onlyWhitespace = settings.onlyWhitespace;
            if (!this.isNil(settings.trimStart))
                patternOptions.regex.trimStart = settings.trimStart;
            if (!this.isNil(settings.trimEnd))
                patternOptions.regex.trimEnd = settings.trimEnd;
            if (!this.isNil(settings.lineSeparator))
                patternOptions.regex.lineSeparator = settings.lineSeparator;
            if (!this.isNil(settings.booleanText))
                patternOptions.regex.booleanText = settings.booleanText;
            if (!this.isNil(settings.firstLetterLc))
                patternOptions.regex.firstLetterLc = settings.firstLetterLc;
            if (!this.isNil(settings.abnormalWhitespace))
                patternOptions.regex.abnormalWhitespace = settings.abnormalWhitespace;
        }
        return this.getPatternOptions();
    };
    /**
     * Sets the default character sequence that will be used when joining lines of text.
     * @param s The default character sequence to use when joining lines of text. If this parameter is not defined, then the default character sequence will be restored.
     * @returns {string} The default character sequence that will now be used when joining lines of text.
     */
    tProto.setDefaultLineSeparatorSequence = function (s) {
        if (this.isNil(s))
            patternOptions.newLineSequence = patternDefaults.newLineSequence;
        else {
            var t = this.toString(s, "");
            if (t.length == 0)
                throw new Error("Line separator sequence cannot be empty.");
            patternOptions.newLineSequence = t;
        }
        return patternOptions.newLineSequence;
    };
    /**
     * Maps a source value to a new value based upon the source value's type.
     * @param target Source value to be mapped.
     * @param callbacks Conditional callbacks which get invoked based upon the source object's type.
     * @param checkElements When checking whether an object is <code>ArrayLike</code> and this is set true, then the existance of each element index is checked, which makes it slower, but more accurate.
     * @returns {*} Value returned from the matching callback.
     */
    tProto.mapByTypeValue = function (target, callbacks, checkElements) {
        var selectedCallback;
        switch (typeof (target)) {
            case "boolean":
                selectedCallback = callbacks.whenBoolean;
                break;
            case "function":
                selectedCallback = callbacks.whenFunction;
                break;
            case "number":
                var n = target;
                if (isNaN(n) && typeof (callbacks.whenNaN) != "undefined")
                    selectedCallback = callbacks.whenNaN;
                else if ((n == Infinity || n == -Infinity) && typeof (callbacks.whenInfinity) != "undefined")
                    selectedCallback = callbacks.whenInfinity;
                else
                    selectedCallback = callbacks.whenNumber;
                break;
            case "string":
                selectedCallback = callbacks.whenString;
                break;
            case "symbol":
                selectedCallback = callbacks.whenSymbol;
                break;
            case "undefined":
                selectedCallback = callbacks.whenUndefined;
                break;
            default:
                if (target === null)
                    selectedCallback = callbacks.whenNull;
                else if (Array.isArray(target)) {
                    if (typeof (callbacks.whenArray) !== "undefined")
                        selectedCallback = callbacks.whenArray;
                    else
                        selectedCallback = (typeof (callbacks.whenArrayLike) !== "undefined") ? callbacks.whenArrayLike : callbacks.whenObject;
                }
                else if (this.isArrayLike(target, checkElements))
                    selectedCallback = (typeof (callbacks.whenArrayLike) !== "undefined") ? callbacks.whenArrayLike : callbacks.whenObject;
                else
                    selectedCallback = (typeof (callbacks.whenNotArrayLike) !== "undefined") ? callbacks.whenNotArrayLike : callbacks.whenObject;
                break;
        }
        if (typeof (selectedCallback) == "undefined")
            selectedCallback = callbacks.otherwise;
        if (typeof (selectedCallback) == "function")
            return selectedCallback.call(callbacks.thisObj, target);
        return selectedCallback;
    };
    /**
     * Gets a mapped value according to whether the object is defined and optionally by target object type.
     * @param target Value to test.
     * @param whenTrue When target type is not "undefined": Callback to invoke to get the return value according to target object type, or value to return.
     * @param otherwise When target is "undefined": Function to call to get return value, or value to return.
     * @param thisObj Object which becomes the <code>this</code> variable when callbacks are invoked.
     * @returns {*} Mapped value according to whether the object is defined and optionally by target object type.
     */
    tProto.mapByDefined = function (target, whenTrue, otherwise, thisObj) {
        if (typeof (target) != "undefined") {
            if (typeof (whenTrue) == "function")
                return whenTrue.call(thisObj, target);
            return whenTrue;
        }
        if (typeof (otherwise) == "function")
            return otherwise.call(thisObj);
        return otherwise;
    };
    /**
     * Gets a mapped value according to whether the object is not defined or not null and optionally by defined target object type.
     * @param target Value to test.
     * @param whenTrue When target value is not null: Function to call to get return value according to target object type, or value to return.
     * @param otherwise When target value is null: Function to call to get return value, or value to return, when target is null.
     * @param thisObj Object which becomes the <code>this</code> variable when callbacks are invoked.
     * @returns {*} Mapped value according to whether the object is not defined or not null and optionally by defined target object type.
     */
    tProto.mapByNotNull = function (target, whenTrue, otherwise, thisObj) {
        if (typeof (target) == "object" && target == null) {
            if (typeof (otherwise) == "function")
                return otherwise.call(thisObj);
            return otherwise;
        }
        if (typeof (whenTrue) == "function")
            return whenTrue.call(thisObj, target);
        return whenTrue;
    };
    /**
     * Gets a mapped value according to whether the object is defined and not null and optionally by defined target object type.
     * @param target Value to test.
     * @param whenTrue When target type is not "undefined" and target value is not null: Function to call to get return value according to target object type, or value to return.
     * @param otherwise When target type is "undefined" or target value is null: Function to call to get return value, or value to return.
     * @param thisObj Object which becomes the <code>this</code> variable when callbacks are invoked.
     * @returns {*} Mapped value according to whether the object is defined and not null and optionally by defined target object type.
     */
    tProto.mapByNotNil = function (target, whenTrue, otherwise, thisObj) {
        if (typeof (target) == "undefined" || (typeof (target) == "object" && target === null)) {
            if (typeof (otherwise) == "function")
                return otherwise.call(thisObj, target);
            return otherwise;
        }
        if (typeof (whenTrue) == "function")
            return whenTrue.call(thisObj, target);
        return whenTrue;
    };
    /**
     * Determines whether an object is undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is undefined; otherwise, false.
     */
    tProto.notDefined = function (obj) { return typeof (obj) == "undefined"; };
    /**
     * Determines wether an object is undefined or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is undefined or null; otherwise, false.
     */
    tProto.isNil = function (obj) { return typeof (obj) == "undefined" || obj === null; };
    /**
     * Determines whether an object is null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is null; otherwise false (not defined or not null).
     */
    tProto.isNull = function (obj) { return typeof (obj) == "object" && obj === null; };
    /**
     * Determines whether a value is a string.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a string; otherwise false.
     */
    tProto.isString = function (obj) { return typeof (obj) == "string"; };
    /**
     * Determines whether a value is a string or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a string or undefined; otherwise false.
     */
    tProto.isStringIfDef = function (obj) { return typeof (obj) == "undefined" || typeof (obj) == "string"; };
    /**
     * Determines whether a value is a string or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a string or null; otherwise false.
     */
    tProto.isStringOrNull = function (obj) {
        return this.mapByTypeValue(obj, {
            whenNull: true,
            whenString: true,
            otherwise: false
        });
    };
    /**
     * Determines whether a value is a string, null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a string, null or undefined; otherwise false.
     */
    tProto.isStringOrNil = function (obj) {
        return this.mapByTypeValue(obj, {
            whenNull: true,
            whenUndefined: true,
            whenString: true,
            otherwise: false
        });
    };
    /**
     * Determines whether a value is an empty string.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string; otherwise false.
     */
    tProto.isEmptyString = function (obj) {
        return this.mapByTypeValue(obj, {
            whenString: function (s) { return s.length == 0; },
            otherwise: false
        });
    };
    /**
     * Determines whether a value is an empty string or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string undefined; otherwise false.
     */
    tProto.isEmptyStringIfDef = function (obj) {
        return this.mapByTypeValue(obj, {
            whenUndefined: true,
            whenString: function (s) { return s.length == 0; },
            otherwise: false
        });
    };
    /**
     * Determines whether a value is a empty string or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string or null; otherwise false.
     */
    tProto.isEmptyStringOrNull = function (obj) {
        return this.mapByTypeValue(obj, {
            whenNull: true,
            whenString: function (s) { return s.length == 0; },
            otherwise: false
        });
    };
    /**
     * Determines whether a value is an empty string, null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string, null or undefined; otherwise false.
     */
    tProto.isEmptyStringOrNil = function (obj) {
        return this.mapByTypeValue(obj, {
            whenUndefined: true,
            whenNull: true,
            whenString: function (s) { return s.length == 0; },
            otherwise: false
        });
    };
    /**
     * Determines whether a value is an empty string or contains only whitespace characters.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string or contains only whitespace characters; otherwise false.
     */
    tProto.isEmptyOrWhitespace = function (obj) {
        return this.mapByTypeValue(obj, {
            whenString: function (s) { return s.length == 0 || patternOptions.regex.onlyWhitespace.test(s); },
            otherwise: false
        });
    };
    /**
     * Determines whether a value is an empty string, contains only whitespace characters, or is undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string, contains only whitespace characters, or is undefined; otherwise false.
     */
    tProto.isEmptyOrWhitespaceIfDef = function (obj) {
        return this.mapByTypeValue(obj, {
            whenUndefined: true,
            whenString: function (s) { return s.length == 0 || patternOptions.regex.onlyWhitespace.test(s); },
            otherwise: false
        });
    };
    /**
     * Determines whether a value is an empty string, contains only whitespace characters, or is null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string, contains only whitespace characters, or is null; otherwise false.
     */
    tProto.isNullOrWhitespace = function (obj) {
        return this.mapByTypeValue(obj, {
            whenNull: true,
            whenString: function (s) { return s.length == 0 || patternOptions.regex.onlyWhitespace.test(s); },
            otherwise: false
        });
    };
    /**
     * Determines whether a value is an empty string, contains only whitespace characters, or is null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty string, contains only whitespace characters, or is null or undefined; otherwise false.
     */
    tProto.isNilOrWhitespace = function (obj) {
        return this.mapByTypeValue(obj, {
            whenUndefined: true,
            whenNull: true,
            whenString: function (s) { return s.length == 0 || patternOptions.regex.onlyWhitespace.test(s); },
            otherwise: false
        });
    };
    /**
     * Converts a value to a string.
     * @param {*} obj Object to convert.
     * @param {string|null} [defaultValue] Default value if object could not be converted to a string.
     * @param {boolean} [ifWhitespace] Return default value if converted value is empty or only whitespace.
     * @returns {string|null|undefined} Value converted to a string or the default value.
     */
    tProto.asString = function (obj, defaultValue, ifWhitespace) {
        var _this = this;
        var str = this.mapByTypeValue(obj, {
            whenUndefined: function (s) { return s; },
            whenNull: function (s) { return s; },
            whenString: function (s) { return s; },
            whenArray: function (a) { return (a.length == 0) ? "" : a.map(function (o) {
                if (_this.isNil(o))
                    return "";
                return (typeof (o) == "string") ? o : o.toString();
            }).join(","); },
            otherwise: function (s) {
                try {
                    return s.toString();
                }
                catch (e) { }
                return s + "";
            }
        });
        if (typeof (str) == "string" && (!ifWhitespace || str.trim().length > 0))
            return str;
        return this.mapByTypeValue(defaultValue, {
            whenUndefined: function (s) { return str; },
            whenNull: function (s) { return (typeof (str) == "string") ? str : s; },
            whenString: function (s) { return s; },
            whenArray: function (a) { return (a.length == 0) ? "" : a.map(function (o) {
                if (_this.isNil(o))
                    return "";
                return (typeof (o) == "string") ? o : o.toString();
            }).join(","); },
            otherwise: function (s) {
                try {
                    return s.toString();
                }
                catch (e) { }
                return s + "";
            }
        });
    };
    /**
     * Forces a value to a string.
     * @param {*} obj Object to convert.
     * @param {string|null} [defaultValue] Default value if object could not be converted to a string.
     * @param {boolean} [ifWhitespace] Return default value if converted value is empty or only whitespace.
     * @returns {string} Value converted to a string or the default value. If the default value is nil, then an empty string will be returned.
     */
    tProto.toString = function (obj, defaultValue, ifWhitespace) {
        var s = this.asString(obj, defaultValue, ifWhitespace);
        if (this.isString(s))
            return s;
        return "";
    };
    /**
     * Trims leading whitespace from text.
     * @param text Text to trim.
     * @returns {string} Text with leading whitespace removed.
     */
    tProto.trimStart = function (text) {
        var s = this.toString(text, "");
        var m = patternOptions.regex.trimStart.exec(s);
        return (this.isNil(m)) ? "" : m[1];
    };
    /**
     * Trims trailing whitespace from text.
     * @param text Text to trim.
     * @returns {string} Text with trailing whitespace removed.
     */
    tProto.trimEnd = function (text) {
        var s = this.toString(text, "");
        var m = patternOptions.regex.trimEnd.exec(s);
        return (this.isNil(m)) ? "" : m[1];
    };
    /**
     * Normalizes whitespace in text.
     * @param text Text to trim.
     * @returns {string} Text with outer whitespace removed and inner whitespace normalized.
     */
    tProto.asNormalizedWs = function (text) {
        var s = this.toString(text, "").trim();
        if (s.length == 0)
            return s;
        return s.replace(patternOptions.regex.abnormalWhitespace, " ");
    };
    /**
     * Capitalizes first letter in text.
     * @param {string} text Text to capitalize.
     * @returns {string} Capitalizes the first letter in text, skipping over any leading characters that are not letters or digits.
     */
    tProto.ucFirst = function (text) {
        var s = this.toString(text, "");
        if (s.length < 2)
            return s.toUpperCase();
        var m = patternOptions.regex.firstLetterLc.exec(s);
        if (this.isNil(m))
            return s;
        if (this.isString(m[1])) {
            if (this.isString(m[3]))
                return m[1] + m[2].toUpperCase() + m[3];
            return m[1] + m[2].toUpperCase();
        }
        if (this.isString(m[3]))
            return m[2].toUpperCase() + m[3];
        return m[2].toUpperCase();
    };
    /**
     * Splits text by line separator character sequences.
     * @param {string} text Text to split.
     * @returns {string[]} Array containing individual lines of text.
     */
    tProto.splitLines = function (text) {
        var s = this.toString(text, "");
        if (s.length == 0)
            return [s];
        return s.split(patternOptions.regex.lineSeparator);
    };
    /**
     * Indents lines within text and trims trailing whitespace.
     * @param {string|string[]} text Text to indent.
     * @param {string} indent Characters to use for indentation.
     * @returns {string} Text with lines indented.
     */
    tProto.indentText = function (text, indent) {
        var _this = this;
        var i = this.toString(indent, "\t");
        var arr;
        if (Array.isArray(text)) {
            if (text.length == 0)
                arr = text;
            else if (text.length == 1)
                arr = this.splitLines(text[0]);
            else {
                arr = [];
                text.forEach(function (s) { return _this.splitLines(s).forEach(function (l) { return arr.push(l); }); });
            }
        }
        else
            arr = this.splitLines(text);
        if (arr.length == 0 || (arr.length == 1 && arr[0].length == 0))
            return "";
        return arr.map(function (s) { return _this.trimEnd(s); }).map(function (s) {
            if (s.length == 0)
                return s;
            return i + s;
        }).join(patternOptions.newLineSequence);
    };
    /**
     * Indents lines of text and trim trailing whitespace.
     * @param {string[]|string} text Text to indent.
     * @param {string} indent Characters to use for indentation.
     * @returns {string} Array containing indented lines.
     */
    tProto.indentLines = function (text, indent) {
        var _this = this;
        var i = this.toString(indent, "\t");
        var arr;
        if (Array.isArray(text)) {
            if (text.length == 0)
                arr = text;
            else if (text.length == 1)
                arr = this.splitLines(text[0]);
            else {
                arr = [];
                text.forEach(function (s) { return _this.splitLines(s).forEach(function (l) { return arr.push(l); }); });
            }
        }
        else
            arr = this.splitLines(text);
        if (arr.length == 0 || (arr.length == 1 && arr[0].length == 0))
            return arr;
        arr = arr.map(function (s) { return _this.trimEnd(s); });
        if (i.length == 0)
            return arr;
        return arr.map(function (s) {
            if (s.length == 0)
                return s;
            return i + s;
        });
    };
    /**
     * Determines whether a value is boolean.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is boolean; otherwise false.
     */
    tProto.isBoolean = function (obj) { return typeof (obj) == "boolean"; };
    /**
     * Determines whether a value is boolean or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is boolean or undefined; otherwise false.
     */
    tProto.isBooleanIfDef = function (obj) { return typeof (obj) == "undefined" || typeof (obj) == "boolean"; };
    /**
     * Determines whether a value is boolean or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is boolean or null; otherwise false.
     */
    tProto.isBooleanOrNull = function (obj) {
        return this.mapByTypeValue(obj, {
            whenNull: true,
            whenBoolean: true,
            otherwise: false
        });
    };
    /**
     * Determines whether a value is boolean, null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is boolean, null or undefined; otherwise false.
     */
    tProto.isBooleanOrNil = function (obj) {
        return this.mapByTypeValue(obj, {
            whenUndefined: true,
            whenNull: true,
            whenBoolean: true,
            otherwise: false
        });
    };
    /**
     * Converts a value to a boolean.
     * @param {*} obj Object to convert.
     * @param {boolean|null} [defaultValue] Default value if object could not be converted to a boolean.
     * @returns {boolean|null|undefined} Value converted to a boolean or the default value.
     */
    tProto.asBoolean = function (obj, defaultValue) {
        var _this = this;
        var bs = this.mapByTypeValue(obj, {
            whenUndefined: function (b) { return b; },
            whenNull: function (b) { return b; },
            whenBoolean: function (b) { return b; },
            whenString: function (s) { return s; },
            whenNaN: false,
            whenNumber: function (n) { return n != 0; },
            whenArray: function (a) { return (a.length == 0) ? undefined : (_this.isNil(a[0]) ? a[0] : ((_this.isObject(a[0])) ? undefined : _this.asBoolean(a[0]))); },
            otherwise: function (o) {
                try {
                    return _this.mapByTypeValue(o.valueOf(), {
                        whenUndefined: function (b) { return o.toString(); },
                        whenNull: function (b) { return o.toString(); },
                        whenBoolean: function (b) { return b; },
                        whenString: function (s) { return s; },
                        whenNaN: o.toString(),
                        whenNumber: function (n) { return n != 0; },
                        otherwise: function (v) {
                            try {
                                return v.toString();
                            }
                            catch (e) { }
                            return v + "";
                        }
                    });
                }
                catch (e) { }
                try {
                    return o.toString();
                }
                catch (e) { }
                return o + "";
            }
        });
        return this.mapByTypeValue(bs, {
            whenBoolean: function (b) { return b; },
            whenString: function (s) {
                if ((s = s.trim()).length > 0) {
                    var m = patternOptions.regex.booleanText.exec(s);
                    if (!_this.isNil(m))
                        return _this.isNil(m[2]);
                }
                return _this.mapByTypeValue(defaultValue, {
                    whenUndefined: function (o) { return o; },
                    whenNull: function (o) { return o; },
                    whenBoolean: function (b) { return b; },
                    otherwise: function (o) { return _this.asBoolean(o); }
                });
            },
            whenNull: function (o) { return _this.mapByTypeValue(defaultValue, {
                whenUndefined: function (d) { return o; },
                whenNull: function (d) { return d; },
                whenBoolean: function (b) { return b; },
                otherwise: function (d) { return _this.asBoolean(d); }
            }); },
            otherwise: function (o) { return _this.mapByTypeValue(defaultValue, {
                whenUndefined: function (d) { return d; },
                whenNull: function (d) { return d; },
                whenBoolean: function (b) { return b; },
                otherwise: function (d) { return _this.asBoolean(d); }
            }); }
        });
    };
    /**
     * Forces a value to a boolean.
     * @param {*} obj Object to convert.
     * @param {boolean|null} [defaultValue] Default value if object could not be converted to a boolean.
     * @returns {boolean} Value converted to a boolean or the default value. If the default value is nil, then a false value will be returned.
     */
    tProto.toBoolean = function (obj, defaultValue) {
        var b = this.asBoolean(obj, defaultValue);
        return this.isBoolean(b) && b;
    };
    /**
     * Determines whether a value is a finite number (not including NaN).
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a finite number; otherwise false.
     */
    tProto.isNumber = function (obj) {
        return this.mapByTypeValue(obj, {
            whenNull: false,
            whenUndefined: false,
            whenNumber: true,
            whenInfinity: false,
            whenNaN: false,
            otherwise: false
        });
    };
    /**
     * Determines whether a value is a finite number or undefined (not including NaN).
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is finite number or undefined; otherwise false.
     */
    tProto.isNumberIfDef = function (obj) {
        return this.mapByTypeValue(obj, {
            whenNull: false,
            whenUndefined: true,
            whenNumber: true,
            whenInfinity: false,
            whenNaN: false,
            otherwise: false
        });
    };
    /**
     * Determines whether a value is a finite number or null (not including NaN).
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a finite number or null; otherwise false.
     */
    tProto.isNumberOrNull = function (obj) {
        return this.mapByTypeValue(obj, {
            whenNull: true,
            whenNumber: true,
            whenInfinity: false,
            whenNaN: false,
            otherwise: false
        });
    };
    /**
     * Determines whether a value is a number or null (including NaN and Infinity).
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a number or null; otherwise false.
     */
    tProto.isNumberNaNorNull = function (obj) {
        return this.mapByTypeValue(obj, {
            whenNull: true,
            whenNumber: true,
            whenInfinity: true,
            whenNaN: true,
            otherwise: false
        });
    };
    /**
     * Determines whether a value is a finite number, null or undefined (including NaN).
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a finite number, null or undefined; otherwise false.
     */
    tProto.isNumberOrNil = function (obj) {
        return this.mapByTypeValue(obj, {
            whenUndefined: true,
            whenNull: true,
            whenNumber: true,
            whenInfinity: true,
            whenNaN: true,
            otherwise: false
        });
    };
    /**
     * Determines whether a value is an infinite number.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an infinite number; otherwise false.
     */
    tProto.isInfinite = function (obj) {
        return this.mapByTypeValue(obj, {
            whenUndefined: false,
            whenNull: false,
            whenNumber: false,
            whenInfinity: true,
            whenNaN: false,
            otherwise: false
        });
    };
    /**
     * Converts a value to a number.
     * @param {*} obj Object to convert.
     * @param {number|null} [defaultValue] Default value if object could not be converted to a number.
     * @param {boolean} [allowNaN] If true, then NaN and infinite values count as numbers.
     * @returns {number|null|undefined} Value converted to a number or the default value.
     */
    tProto.asNumber = function (obj, defaultValue, allowNaN) {
        var _this = this;
        var ns = this.mapByTypeValue(obj, {
            whenUndefined: function (b) { return b; },
            whenNull: function (b) { return b; },
            whenBoolean: function (b) { return (b) ? 1 : 0; },
            whenString: function (s) {
                var v = parseFloat(s);
                if (!isNaN(v))
                    return v;
            },
            whenNaN: (allowNaN === true) ? NaN : null,
            whenInfinity: (allowNaN === true) ? (function (n) { return n; }) : null,
            whenNumber: function (n) { return n; },
            whenArray: function (a) { return (a.length == 0) ? undefined : (_this.isNil(a[0]) ? a[0] : ((_this.isObject(a[0])) ? undefined : _this.asNumber(a[0], undefined, allowNaN))); },
            otherwise: function (o) {
                try {
                    return _this.mapByTypeValue(o.valueOf(), {
                        whenUndefined: function (b) { return o.toString(); },
                        whenNull: function (b) { return o.toString(); },
                        whenBoolean: function (b) { return (b) ? 1 : 0; },
                        whenString: function (s) {
                            var v = parseFloat(s);
                            if (!isNaN(v))
                                return v;
                        },
                        whenNaN: (allowNaN === true) ? NaN : null,
                        whenInfinity: (allowNaN === true) ? (function (n) { return n; }) : null,
                        whenNumber: function (n) { return n; },
                        otherwise: function (v) {
                            try {
                                return parseFloat(v.toString());
                            }
                            catch (e) { }
                            return parseFloat(v + "");
                        }
                    });
                }
                catch (e) { }
                try {
                    return parseFloat(o.toString());
                }
                catch (e) { }
                return parseFloat(o + "");
            }
        });
        if (typeof (defaultValue) == "undefined")
            return ns;
        if (typeof (ns) == "number") {
            if (isNaN(ns) || this.isInfinite(ns)) {
                if (allowNaN === true)
                    return ns;
            }
            else
                return ns;
        }
        return this.mapByTypeValue(this.asNumber(defaultValue), {
            whenUndefined: function (d) { return (allowNaN === true) ? ns : d; },
            whenInfinity: function (d) { return (typeof (ns) != "number" || isNaN(ns)) ? d : ns; },
            whenNumber: function (d) { return d; },
            otherwise: function (d) { return (typeof (ns) == "number") ? ns : d; }
        });
    };
    /**
     * Forces a value to a number.
     * @param {*} obj Object to convert.
     * @param {number|null} [defaultValue] Default value if object could not be converted to a number.
     * @param {boolean} [allowNaN] If true, then NaN and infinite values count as numbers.
     * @returns {number} Value converted to a number or the default value. If the default value is nil, then a zero value will be returned.
     */
    tProto.toNumber = function (obj, defaultValue, allowNaN) {
        var i = this.asNumber(obj, defaultValue, allowNaN);
        if (this.isNumber(i))
            return i;
        else if (allowNaN === true && typeof (obj) == "number")
            return obj;
        return 0;
    };
    /**
     * Determines whether a value is a function.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is function; otherwise false.
     */
    tProto.isFunction = function (obj) { return typeof (obj) === "function"; };
    /**
     * Determines whether a value is function or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is function or undefined; otherwise false.
     */
    tProto.isFunctionIfDef = function (obj) { return typeof (obj) === "undefined" || typeof (obj) === "function"; };
    /**
     * Determines whether a value is function or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is function or null; otherwise false.
     */
    tProto.isFunctionOrNull = function (obj) {
        return this.mapByTypeValue(obj, {
            whenNull: true,
            whenFunction: true,
            otherwise: false
        });
    };
    /**
     * Determines whether a value is function, null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is function, null or undefined; otherwise false.
     */
    tProto.isFunctionOrNil = function (obj) {
        return this.mapByTypeValue(obj, {
            whenUndefined: true,
            whenNull: true,
            whenFunction: true,
            otherwise: false
        });
    };
    /**
     * Determines whether a value's type is "object" and it is not null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if the value's type is "object" and it is not null; otherwise false.
     */
    tProto.isObjectType = function (obj) { return typeof (obj) == "object" && obj !== null; };
    /**
     * Determines whether a value is undefined or its type is "object" and it is not null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if the value is undefined or its type is "object" and it is not null; otherwise false.
     */
    tProto.isObjectTypeIfDef = function (obj) {
        return this.mapByTypeValue(obj, {
            whenUndefined: true,
            whenNull: false,
            whenObject: true,
            otherwise: false
        });
    };
    /**
     * Determines whether a value is null or its type is "object".
     * @param {*} obj Object to test.
     * @returns {boolean} True if the value is null, or its type is "object"; otherwise false.
     */
    tProto.isObjectTypeOrNull = function (obj) { return typeof (obj) == "object"; };
    /**
     * Determines whether a value is undefined, null, or its type is "object".
     * @param {*} obj Object to test.
     * @returns {boolean} True if the value is undefined, null, or its type is "object"; otherwise false.
     */
    tProto.isObjectTypeOrNil = function (obj) { return typeof (obj) == "undefined" || typeof (obj) == "object"; };
    /**
     * Determines whether a value is an object and it is not null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if the value is an object and it is not null; otherwise false.
     * @description As a type guard, this behaves the same as isNonArrayObject() and isPlainObject().
     * The difference is that this always returns true if the type is "object", even if the value is an actual Array.
     */
    tProto.isObject = function (obj) { return typeof (obj) == "object" && obj !== null; };
    /**
     * Determines whether a value undefined or it is an object and it is not null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if the value undefined or it is an object and it is not null; otherwise false.
     * @description As a type guard, this behaves the same as isNonArrayObjectIfDef() and isPlainObjectIfDef().
     * The difference is that this always returns true if the type is "object", even if the value is an actual Array.
     */
    tProto.isObjectIfDef = function (obj) { return typeof (obj) == "undefined" || (typeof (obj) == "object" && obj !== null); };
    /**
     * Determines whether a value null or it is an object.
     * @param {*} obj Object to test.
     * @returns {boolean} True if the value null or it is an object; otherwise false.
     * @description As a type guard, this behaves the same as isNonArrayObjectOrNull() and isPlainObjectOrNull().
     * The difference is that this always returns true if the type is "object", even if the value is an actual Array.
     */
    tProto.isObjectOrNull = function (obj) { return typeof (obj) == "object"; };
    /**
     * Determines whether a value undefined, null, or it is an object.
     * @param {*} obj Object to test.
     * @returns {boolean} True if the value undefined, null, or it is an object; otherwise false.
     * @description As a type guard, this behaves the same as isNonArrayObjectOrNil() and isPlainObjectOrNil().
     * The difference is that this always returns true if the type is "object", even if the value is an actual Array.
     */
    tProto.isObjectOrNil = function (obj) { return typeof (obj) == "undefined" || typeof (obj) == "object"; };
    /**
     * Determines whether a value is an object, but not an array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a non-array object type; otherwise false.
     * @description As a type guard, this behaves the same as isObject() and isPlainObject().
     * The difference is that this returns false if the value is an actual Array. Also, it will return true even if the value was not constructed directly from Object.
     */
    tProto.isNonArrayObject = function (obj) { return typeof (obj) == "object" && obj !== null && !Array.isArray(obj); };
    /**
     * Determines whether a value is an object or undefined, and not an array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a non-array object type or undefined; otherwise false.
     * @description As a type guard, this behaves the same as isObjectIfDef() and isPlainObjectIfDef().
     * The difference is that this returns false if the value is an actual Array. Also, it will return true even if the value was not constructed directly from Object.
     */
    tProto.isNonArrayObjectIfDef = function (obj) {
        return this.mapByTypeValue(obj, {
            whenUndefined: true,
            whenNull: false,
            whenObject: true,
            whenArray: false,
            otherwise: false
        });
    };
    /**
     * Determines whether a value is an object or null, and not an array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a non-array object type or null; otherwise false.
     * @description As a type guard, this behaves the same as isObjectOrNull() and isPlainObjectOrNull().
     * The difference is that this returns false if the value is an actual Array. Also, it will return true even if the value was not constructed directly from Object.
     */
    tProto.isNonArrayObjectOrNull = function (obj) { return typeof (obj) == "object" && (obj === null || !Array.isArray(obj)); };
    /**
     * Determines whether a value is an object, null or undefined, and not an array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a non-array object type, null or undefined; otherwise false.
     * @description As a type guard, this behaves the same as isObjectOrNil() and isPlainObjectOrNil().
     * The difference is that this returns false if the value is an actual Array. Also, it will return true even if the value was not constructed directly from Object.
     */
    tProto.isNonArrayObjectOrNil = function (obj) {
        return this.mapByTypeValue(obj, {
            whenUndefined: true,
            whenNull: true,
            whenObject: true,
            whenArray: false,
            otherwise: false
        });
    };
    /**
     * Determines whether a value is an object, but not an array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a non-array object type; otherwise false.
     * @description As a type guard, this behaves the same as isObject() and isNonArrayObject().
     * The difference is that this returns false if the value is not constructed directly from Object.
     */
    tProto.isPlainObject = function (obj) {
        if (typeof (obj) != "object" || obj === null)
            return false;
        var proto = Object.getPrototypeOf(obj);
        return this.isNil(proto) || proto.constructor === Object;
    };
    /**
     * Determines whether a value is an object or undefined, and not an array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a non-array object type or undefined; otherwise false.
     * @description As a type guard, this behaves the same as isObjectIfDef() and isNonArrayObjectIfDef().
     * The difference is that this returns false if the value is not constructed directly from Object.
     */
    tProto.isPlainObjectIfDef = function (obj) {
        var t = typeof (obj);
        if (t == "undefined")
            return true;
        if (t != "object" || obj === null)
            return false;
        var proto = Object.getPrototypeOf(obj);
        return this.isNil(proto) || proto.constructor === Object;
    };
    /**
     * Determines whether a value is an object or null, and not an array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a non-array object type or null; otherwise false.
     * @description As a type guard, this behaves the same as isObjectOrNull() and isNonArrayObjectOrNull().
     * The difference is that this returns false if the value is not constructed directly from Object.
     */
    tProto.isPlainObjectOrNull = function (obj) {
        if (typeof (obj) != "object")
            return false;
        if (obj === null)
            return true;
        var proto = Object.getPrototypeOf(obj);
        return this.isNil(proto) || proto.constructor === Object;
    };
    /**
     * Determines whether a value is an object, null or undefined, and not an array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is a non-array object type, null or undefined; otherwise false.
     * @description As a type guard, this behaves the same as isObjectOrNil() and isNonArrayObjectOrNil().
     * The difference is that this returns false if the value is not constructed directly from Object.
     */
    tProto.isPlainObjectOrNil = function (obj) {
        var t = typeof (obj);
        if (t == "undefined")
            return true;
        if (t != "object")
            return false;
        if (obj === null)
            return true;
        var proto = Object.getPrototypeOf(obj);
        return this.isNil(proto) || proto.constructor === Object;
    };
    /**
     * Determines whether a value is an array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an array; otherwise false.
     */
    tProto.isArray = function (obj) { return this.isObject(obj) && Array.isArray(obj); };
    /**
     * Determines whether a value is an array or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an array or undefined; otherwise false.
     */
    tProto.isArrayIfDef = function (obj) { return typeof (obj) == "undefined" || this.isArray(obj); };
    /**
     * Determines whether a value is an array or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an array or null; otherwise false.
     */
    tProto.isArrayOrNull = function (obj) { return typeof (obj) == "object" && (obj === null || Array.isArray(obj)); };
    /**
     * Determines whether a value is an array, null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an array, null or undefined; otherwise false.
     */
    tProto.isArrayOrNil = function (obj) { return typeof (obj) == "undefined" || (typeof (obj) == "object" && (obj === null || Array.isArray(obj))); };
    /**
     * Determines whether a value is an empty array.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty array; otherwise false.
     */
    tProto.isEmptyArray = function (obj) {
        return this.mapByTypeValue(obj, {
            whenArray: function (a) { return a.length == 0; },
            otherwise: false
        });
    };
    /**
     * Determines whether a value is an empty array or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty array or undefined; otherwise false.
     */
    tProto.isEmptyArrayIfDef = function (obj) {
        return this.mapByTypeValue(obj, {
            whenUndefined: true,
            whenArray: function (a) { return a.length == 0; },
            otherwise: false
        });
    };
    /**
     * Determines whether a value is an empty array or null.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty array or null; otherwise false.
     */
    tProto.isEmptyArrayOrNull = function (obj) {
        return this.mapByTypeValue(obj, {
            whenNull: true,
            whenArray: function (a) { return a.length == 0; },
            otherwise: false
        });
    };
    /**
     * Determines whether a value is an empty array, null or undefined.
     * @param {*} obj Object to test.
     * @returns {boolean} True if object is an empty array, null or undefined; otherwise false.
     */
    tProto.isEmptyArrayOrNil = function (obj) {
        return this.mapByTypeValue(obj, {
            whenUndefined: true,
            whenNull: true,
            whenArray: function (a) { return a.length == 0; },
            otherwise: false
        });
    };
    /**
     * Determines whether an object has properties which indiciates it behaves like an array.
     * @param {*} obj Object to test.
     * @param {boolan} checkElements If true, then the existance of each element index is checked, which makes this function slower, but more accurate.
     * @returns {boolean} True if the object has properties which indiciates it behaves like an array; otherwise false.
     * @see {@link https://github.com/Microsoft/TypeScript/blob/530d7e9358ee95d2101a619e73356867b617cd95/lib/lib.es5.d.ts}
     */
    tProto.isArrayLike = function (obj, checkElements) {
        if (!this.isObject(obj))
            return false;
        if (Array.isArray(obj))
            return true;
        if (!this.isNumber(obj.length) || isNaN(obj.length) || obj.length < 0 || obj.length == Infinity || obj.length == -Infinity)
            return false;
        if (!checkElements || obj.length == 0)
            return true;
        var arr = [];
        for (var i = 0; i < obj.length; i++)
            arr.push(false);
        for (var n in obj) {
            var f = parseFloat(n);
            if (!isNaN(f) && f >= 0 && f < arr.length && parseInt(n) == f)
                arr[f] = true;
        }
        return arr.filter(function (v) { return !v; }).length == 0;
    };
    /**
     * Determines whether an object has properties which indiciates it behaves like an array.
     * @param {*} obj Object to test.
     * @param {boolan} simpleCheck If true, then the existance of each element index is not checked, which makes this function faster,
     * but can result in false positives for non-array objects which have a numeric "length" property.
     * @returns {boolean} True if the object has properties which indiciates it behaves like an array; otherwise false.
     */
    tProto.isArrayLikeIfDef = function (obj, simpleCheck) {
        return this.mapByTypeValue(obj, {
            whenUndefined: true,
            whenArrayLike: true,
            whenArray: true,
            otherwise: false
        });
    };
    /**
     * Determines whether an object has properties which indiciates it behaves like an array.
     * @param {*} obj Object to test.
     * @param {boolan} simpleCheck If true, then the existance of each element index is not checked, which makes this function faster,
     * but can result in false positives for non-array objects which have a numeric "length" property.
     * @returns {boolean} True if the object has properties which indiciates it behaves like an array; otherwise false.
     */
    tProto.isArrayLikeOrNull = function (obj, simpleCheck) {
        return this.mapByTypeValue(obj, {
            whenNull: true,
            whenArrayLike: true,
            whenArray: true,
            otherwise: false
        });
    };
    /**
     * Determines whether an object has properties which indiciates it behaves like an array.
     * @param {*} obj Object to test.
     * @param {boolan} simpleCheck If true, then the existance of each element index is not checked, which makes this function faster,
     * but can result in false positives for non-array objects which have a numeric "length" property.
     * @returns {boolean} True if the object has properties which indiciates it behaves like an array; otherwise false.
     */
    tProto.isArrayLikeOrNil = function (obj, simpleCheck) {
        return this.mapByTypeValue(obj, {
            whenUndefined: true,
            whenNull: true,
            whenArrayLike: true,
            whenArray: true,
            otherwise: false
        });
    };
    /**
     * Ensures that a value is a true array.
     * @param {*} obj Value to convert.
     * @param {boolan} checkElements If true and obj is Array-like (but not a true array), then the existance of each element index is checked, which makes this function more accurate, but slower.
     * @returns {*[]} Value as an array.
     * @description If the value is undefined, an empty array is returned.
     * If the value is an actual array, then the object itself is returned;
     * If the object is Array-like, an array is returned with values taken from each of its indexed values.
     * Otherwise, an array with a single element containing the value is returned.
     */
    tProto.toArray = function (obj, checkElements) {
        if (this.isArray(obj))
            return obj;
        if (this.isArrayLike(obj, checkElements)) {
            var result = [];
            for (var i = 0; i < obj.length; i++)
                result.push(obj[i]);
            return result;
        }
        if (this.notDefined(obj))
            return [];
        return [obj];
    };
    /**
     * Searches the value's inherited prototype chain for a matching constructor function.
     * @param obj Value to test.
     * @param {AnyFunction} classConstructor Constructor function to look for.
     * @returns {boolean} True if the value is determined to inherit from the specified class; otherwise false.
     */
    tProto.derivesFrom = function (obj, classConstructor) {
        if (this.notDefined(obj))
            return this.notDefined(classConstructor);
        if (this.notDefined(classConstructor))
            return false;
        if (obj === null)
            return classConstructor === null;
        var classProto;
        if (this.isFunction(classConstructor)) {
            classProto = classConstructor.prototype;
        }
        else {
            classProto = Object.getPrototypeOf(classConstructor);
            classConstructor = classProto.constructor;
            while (!this.isFunction(classConstructor)) {
                classProto = Object.getPrototypeOf(classProto);
                if (this.isNil(classProto))
                    break;
                classConstructor = classProto.constructor;
            }
        }
        if (this.isFunction(classConstructor) && obj instanceof classConstructor)
            return true;
        var valueProto, valueConstructor;
        if (this.isFunction(obj)) {
            valueConstructor = obj;
            valueProto = obj.prototype;
        }
        else {
            valueProto = Object.getPrototypeOf(obj);
            valueConstructor = valueProto.constructor;
            while (!this.isFunction(valueConstructor)) {
                valueProto = Object.getPrototypeOf(valueProto);
                if (this.isNil(valueProto))
                    break;
                valueConstructor = valueProto.constructor;
            }
        }
        if (this.isNil(valueConstructor))
            return (this.isNil(classConstructor) && this.isNil(classProto) == this.isNil(valueProto));
        if (valueConstructor === classConstructor)
            return true;
        if (this.isNil(valueProto))
            return (this.isNil(classProto) && valueConstructor === classConstructor);
        var constructorChain = [];
        do {
            if (this.isFunction(classConstructor) && valueProto instanceof classConstructor)
                return true;
            constructorChain.push(valueConstructor);
            valueConstructor = null;
            do {
                valueProto = Object.getPrototypeOf(valueProto);
                if (this.isNil(valueProto))
                    break;
                valueConstructor = valueProto.constructor;
            } while (this.isNil(valueConstructor));
        } while (!this.isNil(valueConstructor));
        for (var i = 0; i < constructorChain.length; i++) {
            if (constructorChain[i] === classConstructor)
                return true;
        }
        return false;
    };
    /**
     * If defined, Searches the value's inherited prototype chain for a matching constructor function.
     * @param value Value to test.
     * @param {AnyFunction} classConstructor Constructor function to look for.
     * @returns {boolean} True if the value is not defined or if it is determined to inherit from the specified class; otherwise false.
     */
    tProto.derivesFromIfDef = function (obj, classConstructor) {
        return typeof (obj) == "undefined" || this.derivesFrom(obj, classConstructor);
    };
    /**
     * If not null, Searches the value's inherited prototype chain for a matching constructor function.
     * @param value Value to test.
     * @param {AnyFunction} classConstructor Constructor function to look for.
     * @returns {boolean} True if the value is null or if it is determined to inherit from the specified class; otherwise false.
     */
    tProto.derivesFromOrNull = function (obj, classConstructor) {
        var _this = this;
        return this.mapByTypeValue(obj, {
            whenUndefined: false,
            whenNull: true,
            otherwise: function (o) { return _this.derivesFrom(obj, classConstructor); }
        });
    };
    /**
     * If defined and not null, Searches the value's inherited prototype chain for a matching constructor function.
     * @param value Value to test.
     * @param {AnyFunction} classConstructor Constructor function to look for.
     * @returns {boolean} True if the value is null, not defined or if it is determined to inherit from the specified class; otherwise false.
     */
    tProto.derivesFromOrNil = function (obj, classConstructor) {
        var _this = this;
        return this.mapByTypeValue(obj, {
            whenUndefined: true,
            whenNull: true,
            otherwise: function (o) { return _this.derivesFrom(obj, classConstructor); }
        });
    };
    /**
     * Determines if an object has properties similar to an Error object.
     * @param {*} obj Value to test
     * @returns {boolean} True if the object has properties similar to an Error object; otherwise, false.
     */
    tProto.isErrorLike = function (obj) {
        if (!this.isNonArrayObject(obj))
            return false;
        if (this.derivesFrom(obj, Error))
            return true;
        if (this.isString(obj.message))
            return this.isStringIfDef(obj.name) && this.isStringIfDef(obj.description) && this.isStringIfDef(obj.fileName) && this.isStringIfDef(obj.stack) && this.isNumberIfDef(obj.number) &&
                this.isNumberIfDef(obj.lineNumber);
        if (this.isString(obj.description))
            return this.isStringIfDef(obj.name) && this.isStringIfDef(obj.fileName) && this.isStringIfDef(obj.stack) && this.isNumberIfDef(obj.number) &&
                this.isNumberIfDef(obj.lineNumber);
        if (!(this.notDefined(obj.message) && this.notDefined(obj.description)))
            return false;
        return this.isString(obj.stack) && this.isStringIfDef(obj.name);
    };
    /**
     * Creates an object with properties similar to an Error object.
     * @param {*} obj Object to convert.
     * @returns {ErrorLike|null|undefined} Object with properties similar to an error objecst. If the object is null or emtpy, then the object is returned.
     * @description This can be useful for serializing error objects when logging.
     */
    tProto.asErrorLike = function (obj) {
        if (this.isNil(obj))
            return obj;
        if (this.isErrorLike(obj)) {
            var result = { message: obj.message, name: (typeof (obj.name) == "string") ? obj.name : "ErrorLike" };
            if (typeof (obj.description) == "string") {
                if (typeof (obj.message) != "string" || obj.message.trim().length == 0)
                    result.message = obj.description;
                else
                    result.description = obj.description;
            }
            if (typeof (obj.number) == "number")
                result.number = obj.number;
            if (typeof (obj.fileName) == "string")
                result.fileName = obj.fileName;
            if (typeof (obj.lineNumber) == "number")
                result.lineNumber = obj.lineNumber;
            if (typeof (obj.stack) == "string")
                result.stack = obj.stack;
            return result;
        }
        if (this.isNumber(obj))
            return { message: obj.toString(), number: obj, name: "ErrorLike" };
        var s = this.toString(obj);
        if (this.isString(s))
            return { message: s, name: "ErrorLike" };
        return s;
    };
    /**
     * Recursively maps an object or array.
     * @param {*} obj Object to recursively map
     * @param {{ (current: any|null|undefined, key?: number|string): any|null|undefined; }} callbackfn Call-back function for each iteration.
     * @param options Recursive Iteration options.
     * @returns {*} Mapped object or array.
     */
    tProto.mapInto = function (obj, callbackfn, options) {
        var i = new limitingIterator(callbackfn, options);
        return i.iterateInto(i.maxDepth, obj, undefined, undefined, undefined);
    };
    tProto.name = "JsTypeCommander";
    JsTypeCommander.prototype = tProto;
    return JsTypeCommander;
}(JsTypeCommander));