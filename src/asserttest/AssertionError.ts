namespace x_44813_asserttest {
    export class AssertionError extends Error {
        code: string;
        innerError?: ErrorInfo;
        constructor(message?: string, code?: string, innerError?: Error|ErrorInfo|string) {
            code = TestDefinition.ensureValidCode(code, "fail");
            if (typeof(message) != "string" || message.trim().length == 0)
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
            super(message);
            this.code = code;
            this.name = "AssertionError";
            if (typeof(innerError) == "string")
                this.innerError = { message: innerError, name: code, stack: "" };
            else if (typeof(innerError) == "object" && innerError !== null)
                this.innerError = {
                    message: innerError.message,
                    name: (typeof(innerError.name) == "string") ? innerError.name : code,
                    stack: (typeof(innerError.stack) == "string") ? innerError.stack : ""
                }
        }
    }
}