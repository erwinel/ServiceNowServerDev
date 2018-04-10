namespace x_44813_asserttest {
    export interface TestMethod { (assert: Assert, data?:any, lastResult?:TestResultInfo): TestResultInfo|Error|ErrorInfo|string|void; }
    export interface TestDataInfo {
        title: string,
        data?: any,
        metaData?: { [key: string]: any }
    }
    export interface ErrorInfo {
        message: string,
        name?: string,
        stack?: string
    }
    export interface TestResultInfo {
        code: string,
        message?: string,
        error?: ErrorInfo
    }

    export interface ITestInfo {
        title?: string;
        data?: TestDataInfo[];
        thisObj?: { [key: string]: any };
    }

    export interface ITestDefinition extends ITestInfo {
        handler: TestMethod;
    }

    export interface ITestResult extends ITestInfo {
        lastResult: TestResultInfo;
    }

    export class TestDefinition implements ITestDefinition, ITestResult {
        title: string;
        handler: TestMethod;
        data: TestDataInfo[];
        thisObj?: { [key: string]: any };
        lastResult: TestResultInfo = {
            code: "notEvaluated",
            message: "Test not evaluated"
        };
        type: string;

        private static isObject(value: any) : value is { [key: string]: any } {
            return typeof(value) == "object" && value !== null && !Array.isArray(value);
        }

        private static isTestResultInfo(value: any) : value is TestResultInfo {
            return TestDefinition.isObject(value) && typeof(value.code) == "string";
        }

        static ensureValidCode(value: string, defaultValue?: string): string {
            let code: string = (typeof(value) != "string") ? "" : value.trim().toLowerCase();
            switch (code) {
                case "notevaluated":
                    return "notEvaluated";
                case "inconclusive":
                case "pass":
                case "fail":
                case "error":
                    return code;
            }
            if (typeof(defaultValue) == "string")
                return TestDefinition.ensureValidCode(defaultValue);
            return "inconclusive";
        }
        
        constructor(handler: TestMethod, title?: string, data?: TestDataInfo[], thisObj?: { [key: string]: any }) {
            this.handler = handler;
            this.title = (typeof(title) == "string") ? title : "";
            this.data = (typeof(data) == "object" && data !== null && Array.isArray(data)) ? data : [];
            if (typeof(thisObj) != "undefined" && thisObj !== null)
                this.thisObj = thisObj;
            this.type = "TestDefinition";
        }

        evaluate(): string {
            let handler: TestMethod = this.handler;
            if (typeof(handler) !== "function") {
                this.lastResult = {
                    code: "inconclusive",
                    message: "No handler method was defined."
                };
                return "inconclusive";
            }
            let thisObj: { [key: string]: any }|null = (TestDefinition.isObject(this.thisObj)) ? this.thisObj : null;
            let data: TestDataInfo[] = (typeof(this.data) == "object" && this.data !== null && Array.isArray(this.data)) ? this.data : [];
            let lastResult: TestResultInfo = {
                code: "notEvaluated",
                message: "Test not evaluated"
            };
            let dataIndex: number = -1;
            let assert = new Assert();
            try {
                let r, value;
                if (data.length > 0) {
                    if (thisObj === null) {
                        for (dataIndex = 0; dataIndex < data.length; dataIndex++) {
                            assert.dataIndex = dataIndex;
                            assert.dataTitle = data[dataIndex].title;
                            assert.metaData = data[dataIndex].metaData;
                            value  = data[dataIndex].data;
                            r = handler(assert, value, lastResult);
                            if (typeof(r) == "undefined" || r === null)
                                lastResult = { code: "pass" };
                            else {
                                if (typeof(r) == "string")
                                    lastResult = { code: TestDefinition.ensureValidCode(r) };
                                else if (TestDefinition.isTestResultInfo(r))
                                    lastResult = r;
                                else
                                    lastResult = { code: "fail", error: r };
                                if (lastResult.code != "pass")
                                    break;
                            }
                        }
                    } else {
                        for (dataIndex = 0; dataIndex < data.length; dataIndex++) {
                            assert.dataIndex = dataIndex;
                            assert.dataTitle = data[dataIndex].title;
                            assert.metaData = data[dataIndex].metaData;
                            value = data[dataIndex].data;
                            r = handler.call(thisObj, assert, value, lastResult);
                            if (typeof(r) == "undefined" || r === null)
                                lastResult = { code: "pass"  };
                            else {
                                if (typeof(r) == "string")
                                    lastResult = { code: TestDefinition.ensureValidCode(r) };
                                else if (TestDefinition.isTestResultInfo(r))
                                    lastResult = r;
                                else
                                    lastResult = { code: "fail", error: r };
                                if (lastResult.code != "pass")
                                    break;
                            }
                        }
                    }
                } else {
                    r = (thisObj === null) ? handler(assert) : handler.call(thisObj, assert);
                    if (typeof(r) == "undefined" || r === null)
                        lastResult = { code: "pass"  };
                    else  if (typeof(r) == "string")
                        lastResult = { code: TestDefinition.ensureValidCode(r) };
                    else if (TestDefinition.isTestResultInfo(r))
                        lastResult = r;
                    else
                        lastResult = { code: "fail", error: r };
                }
            } catch (err) {
                if (err instanceof AssertionError) {
                    let msg: string;
                    switch (err.code) {
                        case "pass":
                            msg = "passed";
                            break;
                        case "fail":
                            msg = "failed";
                            break;
                        case "error":
                            msg = "error";
                            break;
                        default:
                            msg = "was inconclusive";
                            break;
                    }

                    lastResult = {
                        code: err.code,
                        message: (typeof(err.message) == "string" && err.message.trim().length > 0) ?
                            (((dataIndex < 0) ? "Assertion " + msg + ": " : "Assertion " + msg + " at data index " + dataIndex + ": ") + err.message) :
                            ((dataIndex < 0) ? "Assertion " + msg : "Assertion " + msg + " at data index " + dataIndex),
                        error: {
                            message: err.message,
                            name: err.name,
                            stack: (typeof(err.stack) == "string") ? err.stack : ""
                        }
                    };
                } else if (TestDefinition.isObject(err))
                    lastResult = {
                        code: "error",
                        message: (typeof(err.message) == "string" && err.message.trim().length > 0) ?
                            (((dataIndex < 0) ? "Unexpected exception: " : "Unexpected exception at data index " + dataIndex + ": ") + err.message) :
                            ((dataIndex < 0) ? "Unexpected exception" : "Unexpected exception at data index " + dataIndex),
                        error: {
                            message: err.message,
                            name: err.name,
                            stack: (typeof(err.stack) == "string") ? err.stack : ""
                        }
                    };
                else
                    lastResult = {
                        code: "error",
                        message: (typeof(err) == "string" && err.trim().length > 0) ?
                            (((dataIndex < 0) ? "Unexpected exception: " : "Unexpected exception at data index " + dataIndex + ": ") + err) :
                            ((dataIndex < 0) ? "Unexpected exception" : "Unexpected exception at data index " + dataIndex),
                        error: {
                            message: (typeof(err) == "string") ? err : err.toString(),
                            name: (typeof(err.name) == "string") ? err.name : "error",
                            stack: (typeof(err.stack) == "string") ? err.stack : ""
                        }
                    };
            }

            let validCode: string = TestDefinition.ensureValidCode(lastResult.code);
            if (typeof(lastResult.message) != "string" || lastResult.code !== validCode) {
                let message: string;
                switch (validCode) {
                    case "notEvaluated":
                        message = "Test not evaluated";
                        break;
                    case "pass":
                        message = "Test passed";
                        break;
                    case "fail":
                        message = "Test failed";
                        break;
                    case "error":
                        message = "Unexpected error";
                        break;
                    default:
                        message = "Test results were inconclusive";
                        break;
                }
                try {
                    lastResult.code = validCode;
                    lastResult.message = message;
                } catch (e) { }
                if (lastResult.message !== message || lastResult.code !== validCode)
                    lastResult = {
                        code: validCode,
                        message: message,
                        error: lastResult.error
                    };
            }
            this.lastResult = lastResult;
            return lastResult.code;
        }

        toTestResult(): ITestResult {
            return {
                title: this.title,
                data: this.data,
                thisObj: this.thisObj,
                lastResult: this.lastResult
            };
        }
    }
}