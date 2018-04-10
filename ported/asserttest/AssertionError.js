var AssertionError = Class.create();
AssertionError.prototype = Object.extendsObject(Error.prototype, {
    initialize: function(message, code) {
        Error.call(this, message);
        code = TestDefinition.ensureValidCode(code, "fail");
        if (typeof (message) != "string" || message.trim().length == 0)
            switch (code) {
                case "notEvaluated":
                    message = "Assertion was not evaluated";
                    break;
                case "pass":
                    message = "Assertion succeeded";
                    break;
                case "fail":
                    message = "Assertion failed";
                    break;
                case "error":
                    message = "Assertion error";
                    break;
                default:
                    message = "Assertion results were inconclusive";
                    break;
            }
        this.code = code;
        this.name = "AssertionError";
        if (typeof (innerError) == "string")
            this.innerError = { message: innerError, name: code, stack: "" };
        else if (typeof (innerError) == "object" && innerError !== null)
            this.innerError = {
                message: innerError.message,
                name: (typeof (innerError.name) == "string") ? innerError.name : code,
                stack: (typeof (innerError.stack) == "string") ? innerError.stack : ""
            };
    },
    type: 'AssertionError'
});