namespace x_44813_asserttest {
    export interface TestCallbackResult {
        handler: TestMethod;
        data?: TestDataInfo[];
        thisObj?: { [key: string]: any };
    }
    export function run(current: GlideRecord) {
        let testDef: TestCallbackResult = defaultScript();
        let td: TestDefinition = new TestDefinition(testDef.handler, current.getValue("title"), testDef.data, testDef.thisObj);
        td.evaluate();
        current.setValue("last_result_code", td.lastResult.code);
        current.setValue("result_message", td.lastResult.message);
        current.setValue("detail", (typeof(td.lastResult.error) == "object" && td.lastResult.error !== null) ? JSON.stringify(td.lastResult.error) : "");
        current.update();
    }
    export function defaultScript(): TestCallbackResult {
        return {
            handler: function(assert: Assert, data?:any, lastResult?:TestResultInfo) {
                // gs.debug("Testing {0} at {1}", assert.dataTitle, assert.dataIndex);
                // assert.isTrue(this.isString(data))
                assert.inconclusive("Test not implemented");
            },
            data: [
                { title: "Undefined Value", metaData: { expected: false } },
                { title: "Null Value", data: null, metaData: { expected: false } },
                { title: "Empty Value", data: "", metaData: { expected: true } }
            ],
            thisObj: new x_44813_util.types()
        };
    }
}