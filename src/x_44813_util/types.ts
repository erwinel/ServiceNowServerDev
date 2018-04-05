namespace x_44813_util {
    export class types {
        private newLineString: string = "\n";
        private whitespaceRegex: RegExp = /^\s*$/;
        private trimEndRegex: RegExp = /^(\s*\S+(\s+\S+)*)/;
        private lineSplitRegex: RegExp = /\r\n?|\n/g;
        private boolRegex: RegExp = /^(?:(t(?:rue)?|y(?:es)?|[+-]?(?:0*[1-9]\d*(?:\.\d+)?|0+\.0*[1-9]\d*)|\+)|(f(?:alse)?|no?|[+-]?0+(?:\.0+)?|-))$/i;
        private ucFirstRegex: RegExp = /^([^a-zA-Z\d]*[a-z])(.+)?$/g;
        private abnormalWhitespaceRegex = /( |(?=[^ ]))\s+/g;
    
        type: "types";

        /**
         * Indicates whether a value is defined.
         * @param value Value to test.
         * @returns {boolean} True if the value is defined; otherwise, false if it is undefined. This also returns true if the value is null.
         */
        defined(value?: any) : boolean { return typeof(value) !== "undefined"; }
    
        /**
         * Tests whether a value is an object.
         * @param value Value to test.
         * @returns {boolean} True if the value's type is "object" and it is not null; otherwise false.
         */
        isObjectType(value?: any) : value is object { return typeof(value) === "object" && value !== null; }
    
        /**
         * Tests whether a value is an object and is not an array.
         * @param value Value to test.
         * @returns {boolean} True if the value's type is "object", it is not null and it is not an array; otherwise false.
         */
        isNonArrayObject(value: any) : value is { [key: string]: any } { return typeof(value) == "object" && value !== null && !Array.isArray(value); }
    
        /**
         * Tests whether a value is a string
         * @param value Value to test.
         * @returns {boolean} True if the value is a string; otherwise, false.
         */
        isString(value?: any) : value is string { return typeof(value) === "string"; }
        
        /**
         * Tests whether a value is a function.
         * @param value Value to test.
         * @returns {boolean} True if the value is a function; otherwise, false.
         */
        isFunction(value?: any) : value is { (...args: any[]): any; } { return typeof(value) === "function"; }
    
        /**
         * Tests whether a value is a boolean type.
         * @param value Value to test.
         * @returns {boolean} True if the value is boolean; otherwise, false.
         */
        isBoolean(value?: any) : value is boolean { return typeof(value) === "boolean"; }
        
        /**
         * Tests whether a value is a number type.
         * @param value Value to test.
         * @returns {boolean} True if the value is a number and is not NaN; otherwise, false.
         */
        isNumber(value?: any) : value is number { return typeof(value) === "number" && !isNaN(value); }
    
        /**
         * Tests whether a value is a number type.
         * @param value Value to test.
         * @returns {boolean} True if the value is a number and is not NaN; otherwise, false.
         */
        isInteger(value?: any) : value is number { return typeof(value) === "number" && !isNaN(value) && Math.round(value) === value; }
    
        /**
         * Tests whether a value is undefined or null.
         * @param value Value to test.
         * @returns {boolean} True if the value is undefined or null; othwerise, false.
         */
        isNil(value?: any) : value is undefined|null { return !this.defined(value) || value === null; }
        
        /**
         * Tests whether a string is undefined, null or empty.
         * @param value String to test.
         * @returns {boolean} True if the value is undefined, null or empty; otherwise, false.
         */
        isNilOrEmptyString(value?: string|null) : boolean { return this.isNil(value) || (this.isString(value) && value.length == 0); }
    
        /**
         * Tests whether a string is undefined, null, empty or contains only whitespace characters.
         * @param value String to test.
         * @returns {boolean} True if the value is undefined, null, empty or contains only whitespace characters; otherwise, false.
         */
        isNilOrWhitespace(value?: string|null) : boolean { return this.isNil(value) || (this.isString(value) && this.whitespaceRegex.test(value)); }
    
        /**
         * Convert a value to a string.
         * @param value Value to convert.
         * @param {string|null} [defaultValue] Default value to return if the value was undefined, null or if it converts to an empty string. If this is not defined, 
         * then an undefined value is returned when the value was undefined or null.
         * @param {boolean} [ignoreWhitespace] If true, and the converted value contains only whitespace, then it is treated as though it was converted to an empty string by
         * returning the default value.
         * @returns {string|null=} Value converted to a string.
         * @description     If the value is converted to an empty string, and the default value is null, then a null value will be returned.
         * If an array is passed, then the 'join' method is called with a newline character as the parameter.
         * Otherwise, this method first attempts to call the value's "valueOf" function it is an object type, then it comply calls the "toString" method to convert it to a string.
         */
        asString(value: any, defaultValue? : string|null, ignoreWhitespace? : boolean) : string {
            if (!this.defined(value)) {
                if (this.isNil(defaultValue))
                    return defaultValue;
                return this.asString(defaultValue);
            }
            if (value === null) {
                if (this.isNil(defaultValue))
                    return value;
                return this.asString(defaultValue);
            }
            let s: string;
            if (!this.isString(value))
                s = (Array.isArray(value)) ? value.join(this.newLineString) : (function() {
                    if (this.isObjectType(value) && this.isFunction(value.valueOf)) {
                        try {
                            let v = value.valueOf();
                            if (this.isString(v))
                                return v;
                            if (!this.isNil(v)) {
                                if (Array.isArray(v))
                                    return v.join(this.newLineString);
                                value = v;
                            }
                        } catch (e) { }
                    }
                    try {
                        let s = value.toString();
                        if (this.isString(s))
                            return s;
                    } catch (e) { }
                    return value + "";
                })();
            else
                s = value;
            if ((ignoreWhitespace) ? this.whitespaceRegex.test(s) : s.length == 0) {
                let d = this.asString(defaultValue);
                if (this.isString(d))
                    return d;
            }
            return s;
        }
        
        /**
         * Convert a value to a string with normalized whitespace.
         * @param value Value to convert.
         * @param {string|null} [defaultValue] Default value to return if the value was undefined, null or if it converts to an empty string. If this is not defined,
         * then an undefined value is returned when the value was undefined or null.
         * @returns {string|null=} Value converted to a string.
         * @description     If the value is converted to an empty string, and the default value is null, then a null value will be returned.
         * If an array is passed, then the 'join' method is called with a newline character as the parameter.
         * Otherwise, this method first attempts to call the value's "valueOf" function it is an object type, then it comply calls the "toString" method to convert it to a string.
         */
        asNormalizedString(value: any, defaultValue?: string) {
            value = this.asString(value, defaultValue, true).trim();
            if (this.isNil(value) || value.length == 0)
                return value;
            return value.replace(this.abnormalWhitespaceRegex, ' ');
        }
    
        /**
         * Trims trailing whitespace from the end of a string.
         * @param {string} text Text to trim.
         * @returns {string} String with trailing whitespace removed.
         */
        trimEnd(text : string) : string {
            text = this.asString(text, "");
            let m = this.trimEndRegex.exec(text);
            if (this.isNil(m))
                return "";
            return m[1];
        }
    
        /**
         * Convert a value to a number.
         * @param value Convert a value to a number.
         * @param {number|null} [defaultValue] Default value to return if the value was undefined, null, could not be converted to a number or is a NaN value.
         * @returns {number|null=} String converted to a number.
         * @description This method will first attempt to get a number value through the value's "valueOf" method if the value is an object type.
         * If the value is a boolean type, then it will return 1 for true, and 0 for false. Otherwise, it will convert it to a string and attempt to
         * parse a number value.
         */
        asNumber(value: any, defaultValue? : number) : number {
            if (!this.defined(value)) {
                if (this.isNil(defaultValue))
                    return (this.defined(defaultValue)) ? defaultValue : value;
                return this.asNumber(defaultValue);
            }
            if (value === null) {
                if (this.isNil(defaultValue))
                    return value;
                return this.asNumber(defaultValue, value);
            }
            let n : number = null;
            if (typeof(value) !== "number") {
                if (this.isObjectType(value) && this.isFunction(value.valueOf)) {
                    try {
                        let i = value.valueOf();
                        if (this.isNumber(i))
                            return i;
                        if (!this.isNil(i))
                            value = i;
                    } catch (e) { }
                }
                if (this.isBoolean(value))
                    return (value) ? 1 : 0;
                value = this.asString(value, "").trim();
                n = (value.length == 0) ? NaN : parseFloat(value);
            } else
                n = value;
            
            if (isNaN(n) && !this.isNil(defaultValue))
                return this.asNumber(defaultValue);
            return n;
        }
        
        /**
         * Convert a value to a number rounded to the nearest integer.
         * @param value Value to be converted.
         * @param {number|null} [defaultValue] Default value to return if the value was undefined, null, could not be converted to a number or is a NaN value.
         * @returns {number|null=} Value converted to an integer.
         * @description This method will first attempt to get a number value through the value's "valueOf" method if the value is an object type.
         * If the value is a boolean type, then it will return 1 for true, and 0 for false. Otherwise, it will convert it to a string and attempt to
         * parse a number value. If the number is not an integer, then it will be rounded to the nearest integer value.
         */
        asInteger(value: any, defaultValue? : number) : number {
            let v: number = this.asNumber(value, defaultValue);
            if (this.isNil(v) || isNaN(v))
                return  v;
            
            return Math.round(v);
        }
    
        /**
         * Convert a value to a boolean value.
         * @param value Value to be converted.
         * @param {boolean|null} [defaultValue] Default value to return if the value was undefined, null or could not be converted to a boolean value.
         * @returns {boolean|null=} Value converted to a boolean type.
         * @description This method will first attempt to get a boolean value through the value's "valueOf" method if the value is an object type.
         * If the value is a number type (an not a NaN value), then it will return true for non-zero and false for zero. Otherwise, it will convert it to a string and attempt to
         * parse a true/false, t/f, yes/no, y/n (all case-insensitive) or number value in order to derive a boolean result.
         */
        asBoolean(value: any, defaultValue? : boolean) : boolean {
            if (typeof(value) === "boolean")
                return value;
        
            if (!this.defined(value)) {
                if (this.isNil(defaultValue))
                    return defaultValue;
                return this.asBoolean(defaultValue);
            }
            if (value === null) {
                if (this.isNil(defaultValue))
                    return (this.defined(defaultValue)) ? defaultValue : value;
                return this.asBoolean(defaultValue, value);
            }
            if (typeof(value) === "number")
                return !isNaN(value) && value != 0;
            if (this.isObjectType(value) && this.isFunction(value.valueOf)) {
                try {
                    let n = value.valueOf();
                    if (this.isNumber(n))
                        return n != 0;
                    if (this.isBoolean(value))
                        return value;
                    if (!this.isNil(n))
                        value = n;
                } catch (e) { }
            }
            let mg = this.boolRegex.exec(this.asString(value, "").trim());
            if (this.isNil(mg))
                return this.asBoolean(defaultValue);
            return this.isNil(mg[2]);
        }
    
        /**
         * Converts a value to an array.
         * @param value Value to convert.
         * @description If given value is an array, it is simply returned. If it is not defined, then an empty array is returned. Otherwise, the given value is returned
         * within a single-element array.
         */
        asArray(value: any) : any[] {
            if (!this.defined(value))
                return [];
            if (Array.isArray(value))
                return value;
            return [value];
        }
    
        /**
         * Gets the name of a value's constructor function.
         * @param value Value from which to retrieve the constructor class name.
         * @returns {string} The first named constructor function in the prototype inheritance chain or the value's type if a named constructor could not be found.
         */
        getClassName(value: any) : string {
            if (!this.defined(value))
                return "undefined";
            if (value === null)
                return "null";
            let prototype, constructor;
            if (this.isFunction(value)) {
                constructor = value;
                prototype = value.prototype;
            } else {
                prototype = Object.getPrototypeOf(value);
                constructor = prototype.constructor;
                while (!this.isFunction(constructor)) {
                    prototype = Object.getPrototypeOf(prototype);
                    if (this.isNil(prototype))
                        return typeof(value);
                    constructor = prototype.constructor;
                }
            }
            if (this.isString(constructor.name) && constructor.name.length > 0)
                return constructor.name;
            let basePrototype = Object.getPrototypeOf(prototype);
            if (this.isNil(basePrototype)) {
                if (this.isString(prototype.name) && prototype.name.length > 0)
                    return prototype.name;
                if (this.isString(value.name) && value.name.length > 0)
                    return value.name;
                return typeof(value);
            }
            let name = this.getClassName(basePrototype);
            if (name == "Object") {
                if (this.isString(prototype.name) && prototype.name.length > 0)
                    return prototype.name;
                if (this.isString(value.name) && value.name.length > 0)
                    return value.name;
            }
            return name;
        }
    
        /**
         * Gets ordered list of named constructor functions in the value's prototype inheritance chain.
         * @param value Value from which to extract the inheritance chain.
         * @returns {string[]} An array of string values with the first element being the first named constructor function in the value's inherited prototypes.
         */
        getInheritanceChain(value: any) : string[] {
            if (!this.defined(value))
                return ["undefined"];
            if (value === null)
                return ["null"];
            let prototype, constructor;
            if (this.isFunction(value)) {
                constructor = value;
                prototype = value.prototype;
            } else {
                prototype = Object.getPrototypeOf(value);
                constructor = prototype.constructor;
                while (!this.isFunction(constructor)) {
                    prototype = Object.getPrototypeOf(prototype);
                    if (this.isNil(prototype))
                        return [typeof(value)];
                    constructor = prototype.constructor;
                }
            }
            
            let basePrototype = Object.getPrototypeOf(prototype);
            if (this.isNil(basePrototype)) {
                if (this.isString(constructor.name) && constructor.name.length > 0)
                    return [constructor.name];
                if (this.isString(prototype.name) && prototype.name.length > 0)
                    return [prototype.name];
                if (this.isString(value.name) && value.name.length > 0)
                    return [value.name];
                return [typeof(value)];
            }
            let arr = this.getInheritanceChain(basePrototype);
            if (this.isString(constructor.name) && constructor.name.length > 0) {
                arr.unshift(constructor.name);
                return arr;
            }
            if (this.isString(prototype.name) && prototype.name.length > 0) {
                arr.unshift(prototype.name);
                return arr;
            }
    
            if (arr.length > 0)
                return arr;
            
            if (this.isString(value.name) && value.name.length > 0)
                return [value.name];
            
            return [typeof(value)];
        }
    
        /**
         * Searches the value's inherited prototype chain for a constructor function.
         * @param value Value to test.
         * @param {AnyFunction} classConstructor Constructor function to look for.
         * @returns {boolean} True if the value is determined to inherit from the specified class; otherwise false.
         */
        derivesFrom<T>(value: any, classConstructor: { new(...args: any[]): T; }) : value is T {
            if (!this.defined(value))
                return !this.defined(classConstructor);
            if (!this.defined(classConstructor))
                return false;
            if (value === null)
                return classConstructor === null;
            let classProto;
            if (this.isFunction(classConstructor)) {
                classProto = classConstructor.prototype;
            } else {
                classProto = Object.getPrototypeOf(classConstructor);
                classConstructor = classProto.constructor;
                while (!this.isFunction(classConstructor)) {
                    classProto = Object.getPrototypeOf(classProto);
                    if (this.isNil(classProto))
                        break;
                    classConstructor = classProto.constructor;
                }
            }
    
            if (value instanceof classConstructor)
                return true;
                
            let valueProto, valueConstructor;
            if (this.isFunction(value)) {
                valueConstructor = value;
                valueProto = value.prototype;
            } else {
                valueProto = Object.getPrototypeOf(value);
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
            
            let constructorChain = [];
            do {
                if (valueProto instanceof classConstructor)
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
            for (let i = 0; i < constructorChain.length; i++) {
                if (constructorChain[i] === classConstructor)
                    return true;
            }
            return false;
        }
    
        /**
         * Gets extended type string for a value.
         * @param value Value to determine type.
         * @returns {string} Value's type. If the value is null, then "null" is returned. If it is NaN, then "NaN" is returned.
         * Otherwise, the type and class name, separated by a space, is returned. If the class name could not be determined, then just the object type is returned.
         */
        typeOfExt(value: any) : string {
            let t = typeof(value);
            if (t == "object") {
                if (value === null)
                    return "null";
            } else if (t != "function") {
                if (t == "number" && isNaN(value))
                    return "NaN";
                return t;
            }
        
            let n = this.getClassName(value);
            if (n == t)
                return t;
            return t + " " + n;
        }
    
        /**
         * Indents the lines of a text and trims trailing whitespace.
         * @param text Text to be indented.
         * @param indent String to use for indenting. Defaults to a single tab character.
         * @param skipLineCount Number of initial lines to preclude from indentation.
         * @returns {string} A string containing lines indented with trailing white space removed.
         */
        indentText(text : string|string[], indent? : string, skipLineCount? : number) : string {
            let arr : string[], joinedText : string;
            if (this.isNil(text) || !this.isObjectType(text) || !Array.isArray(text))
                text = this.asString(text, "");
            if (typeof(text) != "string") {
                arr = text;
                if (arr.length == 0)
                    return "";
                if (arr.length == 1)
                    joinedText = this.asString(arr[0], "");
                else
                    joinedText = arr.join(this.newLineString);
            } else
                joinedText = this.asString(text, "");
            if (joinedText.length == 0)
                return joinedText;
            indent = this.asString(indent, "\t");
            skipLineCount = this.asInteger(skipLineCount, 0);
            arr = joinedText.split(this.lineSplitRegex).map(function(s) { return this.trimEnd(s); });
            if (arr.length == 1) {
                if (skipLineCount < 1 && arr[0].length > 1)
                    return indent + arr[0];
                return arr[0];
            }
            return arr.map(function(s, i) {
                if (i < skipLineCount || s.length == 0)
                    return s;
                return indent + s;
            }).join(this.newLineString);
        }
        
        private _serializeToString(obj: any) : string {
            if (!this.defined(obj))
                return "undefined";
            if (obj === null)
                return "null";
            let type = typeof(obj);
            if (type == "number")
                return (isNaN(obj)) ? "NaN" : JSON.stringify(obj);
            if (type == "boolean" || type == "string")
                return JSON.stringify(obj);
            let className = this.getClassName(obj);
            if (typeof(obj.toJSON) != "function") {
                if (type == "object")
                {
                    if (this.derivesFrom(obj, Error)) {
                        var e: {[k: string]: any} = obj;
                        var jObj: {[k: string]: any} = {};
                        if (!this.isNil(e.message)) {
                            jObj.message = this.asString(e.message, "");
                            if (!this.isNil(e.description)) {
                                if (jObj.message.trim().length > 0)
                                    jObj.description = this.asString(e.description, "");
                                else {
                                    let s = this.asString(e.description, "");
                                    if (s.trim().length > 0 || s.length > jObj.message.length)
                                        jObj.message = s;
                                }
                            }
                        } else if (!this.isNil(e.description))
                            jObj.message = this.asString(e.description, "");
                        if (!this.isNil(e.name))
                            jObj.name = this.asString(e.name);
                        if (!this.isNil(e.number))
                            jObj.number = this.asNumber(e.number);
                        if (!this.isNil(e.fileName))
                            jObj.fileName = this.asString(e.fileName);
                        if (!this.isNil(e.lineNumber))
                            jObj.lineNumber = this.asNumber(e.lineNumber);
                        if (!this.isNil(e.columnNumber))
                            jObj.columnNumber = this.asNumber(e.columnNumber);
                        if (!this.isNil(e.stack))
                            jObj.stack = this.asString(e.stack);
                        return JSON.stringify({
                            className: className,
                            type: type,
                            properties: jObj
                        }, undefined, "\t");
                    }
                    if (Array.isArray(obj)) {
                        var arr : any[] = obj;
                        if (arr.length == 0)
                            return "{" + this.newLineString + "\t\"className\": " + JSON.stringify(className) + "," + this.newLineString + "\t\"type\": " + JSON.stringify(type) + "," +
                            this.newLineString + "\t\"elements\": [] }";
                        if (arr.length == 1)
                            return "{" + this.newLineString + "\t\"className\": " + JSON.stringify(className) + "," + this.newLineString + "\t\"type\": " + JSON.stringify(type) + "," +
                            this.newLineString + "\t\"elements\": " + this.indentText(JSON.stringify(arr), "\t\t", 1) + " }";
                        return "{" + this.newLineString + "\t\"className\": " + JSON.stringify(className) + "," + this.newLineString + "\t\"type\": " + JSON.stringify(type) + "," +
                        this.newLineString + "\t\"elements\": [" + this.newLineString + this.indentText(JSON.stringify(arr), "\t\t\t", 1) + this.newLineString + "\t] }";
                    }
                    return "{" + this.newLineString + "\t\"className\": " + JSON.stringify(className) + "," + this.newLineString + "\t\"type\": " + JSON.stringify(type) + "," +
                    this.newLineString + "\t\"properties\": " + this.indentText(JSON.stringify(obj), "\t\t", 1) + " }";
                }
                return "{" + this.newLineString + "\t\"className\": " + JSON.stringify(className) + "," + this.newLineString + "\t\"type\": " + JSON.stringify(type) + "," +
                this.newLineString + "\t\"value\": " + JSON.stringify(obj.toString()) + " }";
            }
            if (this.isFunction(obj.toJSON) || type == "object")
                return JSON.stringify({
                    className: className,
                    type: type,
                    data: obj.toJSON()
                }, undefined, "\t");
            return JSON.stringify({
                className: className,
                type: type,
                data: obj.toString()
            }, undefined, "\t");
        }
    
        /**
         * Serializes an object and its properties in a JSON-like representation.
         * @param obj Object to serialize.
         * @returns {string} Object converted to a JSON-like representation.
         */
        serializeToString(obj: any) : string {
            if (!this.defined(obj))
                return "undefined";
            if (obj === null)
                return "null";
            let type = typeof(obj);
            if (type == "number")
                return (isNaN(obj)) ? "NaN" : JSON.stringify(obj);
            if (type == "boolean" || type == "string")
                return JSON.stringify(obj);
            let className = this.getClassName(obj);
            let n: string, v: any;
            if (typeof(obj.toJSON) != "function") {
                if (type == "object") {
                    let elements : string[] = [];
                    let propertyLines : string[] = [];
                    let byName: {[k: string]: any} = {};
                    if (Array.isArray(obj)) {
                        elements = obj.map(function(e) { return this.serializeToString(e); });
                        for (n in obj) {
                            let i = this.asNumber(n, null);
                            v = obj[n];
                            if ((!this.isNil(i) && n !== "length") || i < 0 || i > obj.length) {
                                byName[n] = this.serializeToString(obj[n]);
                                propertyLines.push(JSON.stringify(n) + ": " + this.serializeToString(obj[n]));
                            }
                        }
                    } else {
                        for (n in obj) {
                            if (n !== "length") {
                                byName[n] = this.serializeToString(obj[n]);
                                propertyLines.push(JSON.stringify(n) + ": " + this.serializeToString(obj[n]));
                            }
                        }
                    }
                    if (this.derivesFrom<{[k: string]: any}>(obj, Error)) {
                        if (!this.isNil(obj.columnNumber) && this.isNil(byName.columnNumber))
                            propertyLines.unshift("\"columnNumber\": " + this.serializeToString(obj.columnNumber));
                        if (!this.isNil(obj.lineNumber) && this.isNil(byName.lineNumber))
                            propertyLines.unshift("\"lineNumber\": " + this.serializeToString(obj.lineNumber));
                        if (!this.isNil(obj.fileName) && this.isNil(byName.fileName))
                            propertyLines.unshift("\"fileName\": " + this.serializeToString(obj.fileName));
                        if (!this.isNil(obj.number) && this.isNil(byName.number))
                            propertyLines.unshift("\"number\": " + this.serializeToString(obj.number));
                        if (!this.isNil(obj.name) && this.isNil(byName.name))
                            propertyLines.unshift("\"name\": " + this.serializeToString(obj.name));
                        if (!this.isNil(obj.description) && this.isNil(byName.description)) {
                            if (this.isNil(obj.message) || (this.isString(obj.message) && this.isString(obj.description) && obj.description.length > obj.message.length &&
                                    obj.message.trim().length == 0)) {
                                byName.message = obj.description;
                                propertyLines.unshift("\"message\": " + this.serializeToString(obj.description));
                            }
                            else
                                propertyLines.unshift("\"description\": " + this.serializeToString(obj.description));
                        }
    
                        if (!this.isNil(obj.message) && this.isNil(byName.message))
                            propertyLines.unshift("\"message\": " + this.serializeToString(obj.message));
                    }
                    if (propertyLines.length == 0) {
                        if (Array.isArray(obj)) {
                            if (elements.length == 0) {
                                if (className == "Array")
                                    return "[]";
                                return "{" + this.newLineString + "\t\"className\": " + JSON.stringify(className) + "," + this.newLineString + "\t\"type\": " + JSON.stringify(type) +
                                    "," + this.newLineString + "\t\"elements\": []" + this.newLineString + ", \t\"properties\": {}" + this.newLineString + "}";
                            }
                            if (elements.length == 1) {
                                if (className == "Array")
                                    return "[ " + this.trimEnd(elements[0]) + " ]";
                                return "{" + this.newLineString + "\t\"className\": " + JSON.stringify(className) + "," + this.newLineString + "\t\"type\": " + JSON.stringify(type) +
                                    "," + this.newLineString + "\t\"elements\": [ " + this.indentText(elements[0], "\t", 1) + " ]" + this.newLineString + ", \t\"properties\": {}" +
                                    this.newLineString + "}";
                            }
                            if (className == "Array")
                                return "[" + this.newLineString + elements.map(function(e) { return this.indentText(e); }).join(this.newLineString) + this.newLineString + "]";
                            return "{" + this.newLineString + "\t\"className\": " + JSON.stringify(className) + "," + this.newLineString + "\t\"type\": " + JSON.stringify(type) + "," +
                                this.newLineString + "\t\"elements\": [" + this.newLineString + elements.map(function(e) { return this.indentText(e, "\t\t"); }).join(this.newLineString) +
                                this.newLineString + "]" + this.newLineString + ", \t\"properties\": {}" + this.newLineString + "}";
                        }
                        if (className == "Object")
                            return "{ \"type\": " + JSON.stringify(type) + ", \"properties\": {} }";
                        return "{ \"className\": " + JSON.stringify(className) + ", \"type\": " + JSON.stringify(type) + ", \"properties\": {} }";
                    }
                }
                return JSON.stringify({
                    className: className,
                    type: type,
                    value: obj.toString()
                }, undefined, "\t");
            }
    
            if (typeof(obj.toJSON) == "function")
                return JSON.stringify({
                    className: className,
                    type: type,
                    data: obj.toJSON()
                }, undefined, "\t");
            if (typeof(obj) != "object")
                return JSON.stringify({
                    className: className,
                    type: type,
                    data: obj.toString()
                }, undefined, "\t");
            if (Array.isArray(obj)) {
                if (obj.length == 0)
                    return "[]";
                return "[" + this.newLineString + obj.map(function(e) {
                    if (!this.defined(e))
                        return "undefined";
                    if (e === null)
                        return "null";
                    if (typeof(e) == "number")
                        return (isNaN(e)) ? "NaN" : JSON.stringify(e, undefined, "\t");
                    if (typeof(e.toJSON) == "function" || typeof(e) == "boolean" || typeof(e) == "string" ||
                            typeof(e) == "object")
                        return JSON.stringify(e, undefined, "\t");
                    return e.toString();
                }).map(function(s) {
                    s.split(this.lineSplitRegex).map(function(l: string) { return "\t" + l; }).join(this.newLineString);
                }).join(",") + this.newLineString + this.newLineString + "]";
            }
            let lines = [];
            for (n in obj) {
                v = obj[n];
                if (!this.defined(v))
                    lines.push(JSON.stringify(n) + ": undefined");
                else if (v === null)
                    lines.push(n + ((typeof(v) == "number") ? ": NaN" : ": null"));
                else if (typeof(v) == "number")
                    lines.push(JSON.stringify(n) + ": " + ((isNaN(v)) ? "NaN" : JSON.stringify(v, undefined, "\t")));
                else if (typeof(v.toJSON) == "function" || typeof(v) == "boolean" || typeof(v) == "string" ||
                        typeof(v) == "object")
                    lines.push(JSON.stringify(n) + ": " + JSON.stringify(v, undefined, "\t"));
                else
                    lines.push(JSON.stringify(n) + ": " + v.toString());
            }
            if (lines.length == 0)
                return "{}";
            return "{" + this.newLineString + lines.map(function(s) {
                s.split(this.lineSplitRegex).map(function(l) { return "\t" + l; }).join(this.newLineString);
            }).join("," + this.newLineString) + this.newLineString + "}";
        }
    }
}