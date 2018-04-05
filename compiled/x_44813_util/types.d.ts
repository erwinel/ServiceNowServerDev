declare namespace x_44813_util {
    class types {
        private newLineString;
        private whitespaceRegex;
        private trimEndRegex;
        private lineSplitRegex;
        private boolRegex;
        private ucFirstRegex;
        private abnormalWhitespaceRegex;
        type: "types";
        /**
         * Indicates whether a value is defined.
         * @param value Value to test.
         * @returns {boolean} True if the value is defined; otherwise, false if it is undefined. This also returns true if the value is null.
         */
        defined(value?: any): boolean;
        /**
         * Tests whether a value is an object.
         * @param value Value to test.
         * @returns {boolean} True if the value's type is "object" and it is not null; otherwise false.
         */
        isObjectType(value?: any): value is object;
        /**
         * Tests whether a value is an object and is not an array.
         * @param value Value to test.
         * @returns {boolean} True if the value's type is "object", it is not null and it is not an array; otherwise false.
         */
        isNonArrayObject(value: any): value is {
            [key: string]: any;
        };
        /**
         * Tests whether a value is a string
         * @param value Value to test.
         * @returns {boolean} True if the value is a string; otherwise, false.
         */
        isString(value?: any): value is string;
        /**
         * Tests whether a value is a function.
         * @param value Value to test.
         * @returns {boolean} True if the value is a function; otherwise, false.
         */
        isFunction(value?: any): value is {
            (...args: any[]): any;
        };
        /**
         * Tests whether a value is a boolean type.
         * @param value Value to test.
         * @returns {boolean} True if the value is boolean; otherwise, false.
         */
        isBoolean(value?: any): value is boolean;
        /**
         * Tests whether a value is a number type.
         * @param value Value to test.
         * @returns {boolean} True if the value is a number and is not NaN; otherwise, false.
         */
        isNumber(value?: any): value is number;
        /**
         * Tests whether a value is a number type.
         * @param value Value to test.
         * @returns {boolean} True if the value is a number and is not NaN; otherwise, false.
         */
        isInteger(value?: any): value is number;
        /**
         * Tests whether a value is undefined or null.
         * @param value Value to test.
         * @returns {boolean} True if the value is undefined or null; othwerise, false.
         */
        isNil(value?: any): value is undefined | null;
        /**
         * Tests whether a string is undefined, null or empty.
         * @param value String to test.
         * @returns {boolean} True if the value is undefined, null or empty; otherwise, false.
         */
        isNilOrEmptyString(value?: string | null): boolean;
        /**
         * Tests whether a string is undefined, null, empty or contains only whitespace characters.
         * @param value String to test.
         * @returns {boolean} True if the value is undefined, null, empty or contains only whitespace characters; otherwise, false.
         */
        isNilOrWhitespace(value?: string | null): boolean;
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
        asString(value: any, defaultValue?: string | null, ignoreWhitespace?: boolean): string;
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
        asNormalizedString(value: any, defaultValue?: string): any;
        /**
         * Trims trailing whitespace from the end of a string.
         * @param {string} text Text to trim.
         * @returns {string} String with trailing whitespace removed.
         */
        trimEnd(text: string): string;
        /**
         * Convert a value to a number.
         * @param value Convert a value to a number.
         * @param {number|null} [defaultValue] Default value to return if the value was undefined, null, could not be converted to a number or is a NaN value.
         * @returns {number|null=} String converted to a number.
         * @description This method will first attempt to get a number value through the value's "valueOf" method if the value is an object type.
         * If the value is a boolean type, then it will return 1 for true, and 0 for false. Otherwise, it will convert it to a string and attempt to
         * parse a number value.
         */
        asNumber(value: any, defaultValue?: number): number;
        /**
         * Convert a value to a number rounded to the nearest integer.
         * @param value Value to be converted.
         * @param {number|null} [defaultValue] Default value to return if the value was undefined, null, could not be converted to a number or is a NaN value.
         * @returns {number|null=} Value converted to an integer.
         * @description This method will first attempt to get a number value through the value's "valueOf" method if the value is an object type.
         * If the value is a boolean type, then it will return 1 for true, and 0 for false. Otherwise, it will convert it to a string and attempt to
         * parse a number value. If the number is not an integer, then it will be rounded to the nearest integer value.
         */
        asInteger(value: any, defaultValue?: number): number;
        /**
         * Convert a value to a boolean value.
         * @param value Value to be converted.
         * @param {boolean|null} [defaultValue] Default value to return if the value was undefined, null or could not be converted to a boolean value.
         * @returns {boolean|null=} Value converted to a boolean type.
         * @description This method will first attempt to get a boolean value through the value's "valueOf" method if the value is an object type.
         * If the value is a number type (an not a NaN value), then it will return true for non-zero and false for zero. Otherwise, it will convert it to a string and attempt to
         * parse a true/false, t/f, yes/no, y/n (all case-insensitive) or number value in order to derive a boolean result.
         */
        asBoolean(value: any, defaultValue?: boolean): boolean;
        /**
         * Converts a value to an array.
         * @param value Value to convert.
         * @description If given value is an array, it is simply returned. If it is not defined, then an empty array is returned. Otherwise, the given value is returned
         * within a single-element array.
         */
        asArray(value: any): any[];
        /**
         * Gets the name of a value's constructor function.
         * @param value Value from which to retrieve the constructor class name.
         * @returns {string} The first named constructor function in the prototype inheritance chain or the value's type if a named constructor could not be found.
         */
        getClassName(value: any): string;
        /**
         * Gets ordered list of named constructor functions in the value's prototype inheritance chain.
         * @param value Value from which to extract the inheritance chain.
         * @returns {string[]} An array of string values with the first element being the first named constructor function in the value's inherited prototypes.
         */
        getInheritanceChain(value: any): string[];
        /**
         * Searches the value's inherited prototype chain for a constructor function.
         * @param value Value to test.
         * @param {AnyFunction} classConstructor Constructor function to look for.
         * @returns {boolean} True if the value is determined to inherit from the specified class; otherwise false.
         */
        derivesFrom<T>(value: any, classConstructor: {
            new (...args: any[]): T;
        }): value is T;
        /**
         * Gets extended type string for a value.
         * @param value Value to determine type.
         * @returns {string} Value's type. If the value is null, then "null" is returned. If it is NaN, then "NaN" is returned.
         * Otherwise, the type and class name, separated by a space, is returned. If the class name could not be determined, then just the object type is returned.
         */
        typeOfExt(value: any): string;
        /**
         * Indents the lines of a text and trims trailing whitespace.
         * @param text Text to be indented.
         * @param indent String to use for indenting. Defaults to a single tab character.
         * @param skipLineCount Number of initial lines to preclude from indentation.
         * @returns {string} A string containing lines indented with trailing white space removed.
         */
        indentText(text: string | string[], indent?: string, skipLineCount?: number): string;
        private _serializeToString(obj);
        /**
         * Serializes an object and its properties in a JSON-like representation.
         * @param obj Object to serialize.
         * @returns {string} Object converted to a JSON-like representation.
         */
        serializeToString(obj: any): string;
    }
}
