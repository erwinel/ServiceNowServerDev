var TestDefinition = Class.create();
TestDefinition.prototype = {
    initialize: function(handler, title, data, thisObj) {
        this.lastResult = {
            code: "notEvaluated",
            message: "Test not evaluated"
        };
        this.handler = handler;
        this.title = (typeof (title) == "string") ? title : "";
        this.data = (typeof (data) == "object" && data !== null && Array.isArray(data)) ? data : [];
        if (typeof (thisObj) != "undefined" && thisObj !== null)
            this.thisObj = thisObj;
        this.type = "TestDefinition";
    },

    evaluate: function () {
        var handler = this.handler;
        if (typeof (handler) !== "function") {
            this.lastResult = {
                code: "inconclusive",
                message: "No handler method was defined."
            };
            return "inconclusive";
        }
        var thisObj = (TestDefinition.isObject(this.thisObj)) ? this.thisObj : null;
        var data = (typeof (this.data) == "object" && this.data !== null && Array.isArray(this.data)) ? this.data : [];
        var lastResult = {
            code: "notEvaluated",
            message: "Test not evaluated"
        };
        var dataIndex = -1;
        var assert = new x_44813_asserttest.Assert();
        try {
            var r = void 0, value = void 0;
            if (data.length > 0) {
                if (thisObj === null) {
                    for (dataIndex = 0; dataIndex < data.length; dataIndex++) {
                        assert.dataIndex = dataIndex;
                        assert.dataTitle = data[dataIndex].title;
                        assert.metaData = data[dataIndex].metaData;
                        value = data[dataIndex].data;
                        r = handler(assert, value, lastResult);
                        if (typeof (r) == "undefined" || r === null)
                            lastResult = { code: "pass" };
                        else {
                            if (typeof (r) == "string")
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
                else {
                    for (dataIndex = 0; dataIndex < data.length; dataIndex++) {
                        assert.dataIndex = dataIndex;
                        assert.dataTitle = data[dataIndex].title;
                        assert.metaData = data[dataIndex].metaData;
                        value = data[dataIndex].data;
                        r = handler.call(thisObj, assert, value, lastResult);
                        if (typeof (r) == "undefined" || r === null)
                            lastResult = { code: "pass" };
                        else {
                            if (typeof (r) == "string")
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
            }
            else {
                r = (thisObj === null) ? handler(assert) : handler.call(thisObj, assert);
                if (typeof (r) == "undefined" || r === null)
                    lastResult = { code: "pass" };
                else if (typeof (r) == "string")
                    lastResult = { code: TestDefinition.ensureValidCode(r) };
                else if (TestDefinition.isTestResultInfo(r))
                    lastResult = r;
                else
                    lastResult = { code: "fail", error: r };
            }
        }
        catch (err) {
            if (err instanceof x_44813_asserttest.AssertionError) {
                var msg = void 0;
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
                    message: (typeof (err.message) == "string" && err.message.trim().length > 0) ?
                        (((dataIndex < 0) ? "Assertion " + msg + ": " : "Assertion " + msg + " at data index " + dataIndex + ": ") + err.message) :
                        ((dataIndex < 0) ? "Assertion " + msg : "Assertion " + msg + " at data index " + dataIndex),
                    error: {
                        message: err.message,
                        name: err.name,
                        stack: (typeof (err.stack) == "string") ? err.stack : ""
                    }
                };
            }
            else if (TestDefinition.isObject(err))
                lastResult = {
                    code: "error",
                    message: (typeof (err.message) == "string" && err.message.trim().length > 0) ?
                        (((dataIndex < 0) ? "Unexpected exception: " : "Unexpected exception at data index " + dataIndex + ": ") + err.message) :
                        ((dataIndex < 0) ? "Unexpected exception" : "Unexpected exception at data index " + dataIndex),
                    error: {
                        message: err.message,
                        name: err.name,
                        stack: (typeof (err.stack) == "string") ? err.stack : ""
                    }
                };
            else
                lastResult = {
                    code: "error",
                    message: (typeof (err) == "string" && err.trim().length > 0) ?
                        (((dataIndex < 0) ? "Unexpected exception: " : "Unexpected exception at data index " + dataIndex + ": ") + err) :
                        ((dataIndex < 0) ? "Unexpected exception" : "Unexpected exception at data index " + dataIndex),
                    error: {
                        message: (typeof (err) == "string") ? err : err.toString(),
                        name: (typeof (err.name) == "string") ? err.name : "error",
                        stack: (typeof (err.stack) == "string") ? err.stack : ""
                    }
                };
        }
        var validCode = TestDefinition.ensureValidCode(lastResult.code);
        if (typeof (lastResult.message) != "string" || lastResult.code !== validCode) {
            var message = void 0;
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
            }
            catch (e) { }
            if (lastResult.message !== message || lastResult.code !== validCode)
                lastResult = {
                    code: validCode,
                    message: message,
                    error: lastResult.error
                };
        }
        this.lastResult = lastResult;
        return lastResult.code;
    },

    toTestResult: function () {
        return {
            title: this.title,
            data: this.data,
            thisObj: this.thisObj,
            lastResult: this.lastResult
        };
    },

    type: 'TestDefinition'
};
TestDefinition.isObject = function (value) {
    return typeof (value) == "object" && value !== null && !Array.isArray(value);
};
TestDefinition.isTestResultInfo = function (value) {
    return TestDefinition.isObject(value) && typeof (value.code) == "string";
};
TestDefinition.ensureValidCode = function (value, defaultValue) {
    var code = (typeof (value) != "string") ? "" : value.trim().toLowerCase();
    switch (code) {
        case "notevaluated":
            return "notEvaluated";
        case "inconclusive":
        case "pass":
        case "fail":
        case "error":
            return code;
    }
    if (typeof (defaultValue) == "string")
        return TestDefinition.ensureValidCode(defaultValue);
    return "inconclusive";
};