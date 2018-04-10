namespace x_44813_asserttest {
    export class Assert {
        dataIndex: number = -1;
        dataTitle?: string;
        metaData?: { [key: string]: any };
        types = new x_44813_util.types();
        
        buildMessage(evalMessage?: string, assertMessage?: string, error?: Error|ErrorInfo|string): string {
            let dataMessage: string;
            if (typeof(this.dataTitle) == "string" && (dataMessage = this.dataTitle.trim()).length > 0) {
                if (this.dataIndex >= 0)
                    dataMessage = "\"" + dataMessage + "\" (index " + this.dataIndex + ")";
                else
                    dataMessage = "\"" + dataMessage + "\"";
            } else if (this.dataIndex >= 0)
                dataMessage = "data index " + this.dataIndex;
            else
                dataMessage = "";
            if (typeof(evalMessage) != "string" || evalMessage.trim().length == 0)
                evalMessage = (typeof(error) == "string") ? error : (this.types.isNil(error)) ? "" : ((typeof(error.message) == "string") ? error.message : error.toString());;
            
            if (typeof(evalMessage) == "string" && evalMessage.trim().length > 0) {
                if (typeof(assertMessage) == "string" && assertMessage.trim().length > 0) {
                    if (dataMessage.length > 0)
                        return evalMessage + " (at " + dataMessage + " : " + assertMessage + ")";
                    return evalMessage + " (at " + assertMessage + ")";
                }
                if (dataMessage.length > 0)
                    return evalMessage + " (at " + dataMessage + ")";
                return evalMessage;
            }
            if (typeof(assertMessage) == "string" && assertMessage.trim().length > 0) {
                if (dataMessage.length > 0)
                    return assertMessage + " (at " + dataMessage + ")";
                return assertMessage;
            }
            return dataMessage;
        }
        error(message?: string, innerError?: Error|ErrorInfo|string): void { throw new AssertionError(message, "error", innerError); }
        fail(message?: string): void { throw new AssertionError(message, "fail"); }
        inconclusive(message?: string): void { throw new AssertionError(message, "inconclusive"); }
        notDefined(value: any|null|undefined, message?: string): void {
            if (this.types.defined(value))
                throw new AssertionError(this.buildMessage("Expected: undefined; Actual: " + this.types.serializeToString(value), message));
        }
        isDefined(value: any|null|undefined, message?: string): void {
            if (!this.types.defined(value))
                throw new AssertionError(this.buildMessage("Expected: any defined value; Actual: undefined", message));
        }
        isNull(value: any|null|undefined, message?: string): void {
            if (value !== null)
                throw new AssertionError(this.buildMessage("Expected: null value; Actual: " + this.types.serializeToString(value), message));
        }
        notNullOrUndefined(value: any|null|undefined, message?: string): void {
            let m: string;
            if (typeof(value) == "undefined")
                m = "Expected: any defined non-null value; Actual: undefined";
            else if (value == null)
                m = "Expected: any defined non-null value; Actual: null";
            else
                return;
            throw new AssertionError(this.buildMessage(m, message));
        }
        isNil(value: any|null|undefined, message?: string): void {
            if (!this.types.isNil(value))
                throw new AssertionError(this.buildMessage("Expected: undefined or null; Actual: " + this.types.serializeToString(value), message));
        }
        isString(value: any|null|undefined, message?: string): void {
            var t = typeof(value);
            if (t == "string")
                return;
            let m: string;
            if (t == "undefined" || value === null || (typeof(value) == "number" && isNaN(value)))
                m = "Expected: string; Actual: " + this.types.serializeToString(value);
            else
                m = "Expected: string; Actual " + t + ": " + this.types.serializeToString(value);
            throw new AssertionError(this.buildMessage(m, message));
        }
        notString(value: any|null|undefined, message?: string): void {
            if (typeof(value) !== "string")
                throw new AssertionError(this.buildMessage("Expected: non-string; Actual: " + this.types.serializeToString(value), message));
        }
        isNumber(value: any|null|undefined, message?: string): void {
            var t = typeof(value);
            if (t == "number") {
                if (isNaN(value))
                    throw new AssertionError(this.buildMessage("Expected: number; Actual: NaN", message));
                return;
            }
            let m: string;
            if (t == "undefined" || value === null)
                m = "Expected: number; Actual: " + this.types.serializeToString(value);
            else
                m = "Expected: number; Actual " + t + ": " + this.types.serializeToString(value);
            throw new AssertionError(this.buildMessage(m, message));
        }
        notNumber(value: any|null|undefined, message?: string): void {
            var t = typeof(value);
            if (t == "number" && !isNaN(value))
                throw new AssertionError(this.buildMessage("Expected: non-number; Actual: " + this.types.serializeToString(value), message));
        }
        isBoolean(value: any|null|undefined, message?: string): void {
            var t = typeof(value);
            if (t == "boolean")
                return;
            let m: string;
            if (t == "undefined" || value === null)
                m = "Expected: boolean; Actual: " + this.types.serializeToString(value);
            else
                m = "Expected: boolean; Actual " + t + ": " + this.types.serializeToString(value);
            throw new AssertionError(this.buildMessage(m, message));
        }
        notBoolean(value: any|null|undefined, message?: string): void {
            if (typeof(value) == "boolean")
                throw new AssertionError(this.buildMessage("Expected: non-boolean; Actual: " + this.types.serializeToString(value), message));
        }
        isTrue(value: any|null|undefined, message?: string): void {
            var t = typeof(value);
            if (t == "boolean" && value)
                return;
            let m: string;
            if (t == "undefined" || value === null)
                m = "Expected: true; Actual: " + this.types.serializeToString(value);
            else
                m = "Expected: true; Actual " + t + ": " + this.types.serializeToString(value);
            throw new AssertionError(this.buildMessage(m, message));
        }
        isFalse(value: any|null|undefined, message?: string): void {
            var t = typeof(value);
            if (t == "boolean" && !value)
                return;
            let m: string;
            if (t == "undefined" || value === null)
                m = "Expected: true; Actual: " + this.types.serializeToString(value);
            else
                m = "Expected: true; Actual " + t + ": " + this.types.serializeToString(value);
            throw new AssertionError(this.buildMessage(m, message));
        }
        derivesFrom<T>(actual: any, expected: { new(...args: any[]): T; }, message?: string): void {
            if (this.types.derivesFrom(actual, expected))
                return;
            if (typeof(actual) != "object" || actual === null)
                throw new AssertionError(this.buildMessage("Expected derives from: " + this.types.getClassName(expected) + "; Actual type: " + this.types.typeOfExt(actual), message));
            throw new AssertionError(this.buildMessage("Expected derives from: " + this.types.getClassName(expected) + "; Actual inheritance: " + this.types.getInheritanceChain(actual), message));
        }
        isNaN(value: any|null|undefined, message?: string): void {
            var t = typeof(value);
            if (typeof(value) != "number" || !isNaN(value))
                throw new AssertionError(this.buildMessage("Expected: NaN; Actual: " + this.types.serializeToString(value), message));
        }
        isFiniteNumber(value: any|null|undefined, message?: string): void {
            var t = typeof(value);
            if (t == "number") {
                if (isNaN(value))
                    throw new AssertionError(this.buildMessage("Expected: number; Actual: NaN", message));
                if (Number.isFinite(value))
                    return;
            }
            let m: string;
            if (t == "undefined" || value === null)
                m = "Expected: number; Actual: " + this.types.serializeToString(value);
            else
                m = "Expected: number; Actual " + t + ": " + this.types.serializeToString(value);
            throw new AssertionError(this.buildMessage(m, message));
        }
        isNilOrEmptyString(value: any|null|undefined, message?: string): void {
            var t = typeof(value);
            if (t != "undefined" && value !== null && (t != "string" || value.length > 0))
                throw new AssertionError(this.buildMessage("Expected: undefined, null or empty string; Actual: " + this.types.serializeToString(value), message));
        }
        isNilOrWhitespace(value: any|null|undefined, message?: string): void {
            var t = typeof(value);
            if (t != "undefined" && value !== null && (t != "string" || value.trim().length > 0))
                throw new AssertionError(this.buildMessage("Expected: undefined, null, empty string or whitespace; Actual: " + this.types.serializeToString(value), message));
        }
        isEmptyString(value: any|null|undefined, message?: string): void {
            var t = typeof(value);
            if (t != "string" || value.length > 0)
                throw new AssertionError(this.buildMessage("Expected: empty string; Actual: " + this.types.serializeToString(value), message));
        }
        isEmptyArray(value: any|null|undefined, message?: string): void {
            var t = typeof(value);
            if (t != "object" || !Array.isArray(value) || value.length > 0)
                throw new AssertionError(this.buildMessage("Expected: empty array; Actual: " + this.types.serializeToString(value), message));
        }
        isEmptyOrWhitespace(value: any|null|undefined, message?: string): void {
            if (typeof(value) != "string" || value.trim().length > 0)
                throw new AssertionError(this.buildMessage("Expected: empty string or whitespace; Actual: " + this.types.serializeToString(value), message));
        }
        isNonWhitespace(value: any|null|undefined, message?: string): void {
            if (typeof(value) != "string" || value.trim().length == 0)
                throw new AssertionError(this.buildMessage("Expected: non-whitespace string; Actual: " + this.types.serializeToString(value), message));
        }
        areEqual(expected: any|null|undefined, actual: any|null|undefined, message?: string): void {
            var e = typeof(expected);
            var a = typeof(actual);
            let m: string;
            if (e == "undefined") {
                if (a == "undefined")
                    return;
            } else if (a != "undefined") {
                if (e === null) {
                    if (a === null)
                        return;
                } else if (a !== null && e === a)
                    return;
            }
            if (a == e)
                m = "Expected: " + this.types.serializeToString(expected) + "; Actual: " + this.types.serializeToString(actual);
            else
                m = "Expected " + e + ": " + this.types.serializeToString(expected) + "; Actual" + a + ": " + this.types.serializeToString(actual);
            throw new AssertionError(this.buildMessage(m, message));
        }
        notEqual(expected: any|null|undefined, actual: any|null|undefined, message?: string): void {
            var e = typeof(expected);
            var a = typeof(actual);
            let m: string;
            if (e == "undefined") {
                if (a != "undefined")
                    return;
            } else if (a != "undefined") {
                if (e === null) {
                    if (a !== null)
                        return;
                } else if (a === null && e !== a)
                    return;
            }
            throw new AssertionError(this.buildMessage("Not Expected: " + this.types.serializeToString(expected), message));
        }
        areAlike(expected: any|null|undefined, actual: any|null|undefined, message?: string): void {
            var e = typeof(expected);
            var a = typeof(actual);
            if (a == e)
                return;
            let m: string;
            if (a == e)
                m = "Expected: " + this.types.serializeToString(expected) + "; Actual: " + this.types.serializeToString(actual);
            else
                m = "Expected " + e + ": " + this.types.serializeToString(expected) + "; Actual" + a + ": " + this.types.serializeToString(actual);
            throw new AssertionError(this.buildMessage(m, message));
        }
        notAlike(expected: any|null|undefined, actual: any|null|undefined, message?: string): void {
            var e = typeof(expected);
            var a = typeof(actual);
            let m: string;
            if (e == "undefined") {
                if (a != "undefined")
                    return;
            } else if (a != "undefined") {
                if (e === null) {
                    if (a !== null)
                        return;
                } else if (a === null && e != a)
                    return;
            }
            throw new AssertionError(this.buildMessage("Not Expected: " + this.types.serializeToString(expected), message));
        }
    }
}