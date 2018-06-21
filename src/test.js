


Full logging from step execution:
20:12:06.331: Loading script: jasmine_lib/jasmine_custom.js
20:12:06.356: Root cause of JavaScriptException: org.mozilla.javascript.NativeError
JavaScript evaluation error on:
var assertEqual = function(assertion) {
  if (!(assertion.value == assertion.shouldbe)) {
    gs.info("Assertion failed: " + assertion.name + " should have been " + assertion.shouldbe + 
           " but was " + assertion.value);
    throw "Assertion failed";
  }
}
try {
  var steps = function(step_id){
    return step.sibling(step_id);
  };
  (function(outputs, steps, stepResult, assertEqual) {
    describe("Testing module options settings", function () {
        describe("Testing JsTypeCommander.getDefaultLineSeparatorSequence()", function () {
            it('JsTypeCommander.getDefaultLineSeparatorSequence() should return "\\n"', function () {
                var types = new x_44813_util.JsTypeCommander();
                var result = types.getDefaultLineSeparatorSequence();
                expect(result).to.a('string');
                expect(result).to.equal("\n");
            });
        });
        describe("Testing JsTypeCommander.setDefaultLineSeparatorSequence()", function () {
            it('JsTypeCommander.setDefaultLineSeparatorSequence("\\r\\n") should return "\\r\\n"', function () {
                var types = new x_44813_util.JsTypeCommander();
                var result = types.setDefaultLineSeparatorSequence("\r\n");
                expect(result).to.a('string');
                expect(result).to.equal("\r\n");
            });
            it('JsTypeCommander.getDefaultLineSeparatorSequence() should return "\\r\\n"', function () {
                var types = new x_44813_util.JsTypeCommander();
                var result = types.getDefaultLineSeparatorSequence();
                expect(result).to.a('string');
                expect(result).to.equal("\r\n");
            });
            it('JsTypeCommander.setDefaultLineSeparatorSequence() should return "\\n"', function () {
                var types = new x_44813_util.JsTypeCommander();
                var result = types.setDefaultLineSeparatorSequence();
                expect(result).to.a('string');
                expect(result).to.equal("\n");
            });
            it('JsTypeCommander.getDefaultLineSeparatorSequence() should return "\\n"', function () {
                var types = new x_44813_util.JsTypeCommander();
                var result = types.getDefaultLineSeparatorSequence();
                expect(result).to.a('string');
                expect(result).to.equal("\n");
            });
        });
        describe("Testing JsTypeCommander.getPatternOptions()", function () {
            it('JsTypeCommander.getPatternOptions() should not return nil', function () {
                var types = new x_44813_util.JsTypeCommander();
                var regexOptionResult = types.getPatternOptions();
                expect(regexOptionResult).to.not.a('undefined').and.to.not.a('null');
            });
        });
        describe("Checking JsTypeCommander.getPatternOptions() properties", function () {
            var types = new x_44813_util.JsTypeCommander();
            var regexOptionResult;
            try {
                regexOptionResult = types.getPatternOptions();
            }
            catch (_a) {
                regexOptionResult = undefined;
            }
            it('onlyWhitespace property should be defined', function () {
                if (typeof (regexOptionResult) == "undefined")
                    this.skip();
                else
                    expect(regexOptionResult.onlyWhitespace).to.not.a('undefined');
            });
            it('trimStart property should be defined', function () {
                if (typeof (regexOptionResult) == "undefined")
                    this.skip();
                else
                    expect(regexOptionResult.trimStart).to.not.a('undefined');
            });
            it('trimEnd property should be defined', function () {
                if (typeof (regexOptionResult) == "undefined")
                    this.skip();
                else
                    expect(regexOptionResult.trimEnd).to.not.a('undefined');
            });
            it('lineSeparator property should be defined', function () {
                if (typeof (regexOptionResult) == "undefined")
                    this.skip();
                else
                    expect(regexOptionResult.lineSeparator).to.not.a('undefined');
            });
            it('booleanText property should be defined', function () {
                if (typeof (regexOptionResult) == "undefined")
                    this.skip();
                else
                    expect(regexOptionResult.booleanText).to.not.a('undefined');
            });
            it('firstLetterLc property should be defined', function () {
                if (typeof (regexOptionResult) == "undefined")
                    this.skip();
                else
                    expect(regexOptionResult.firstLetterLc).to.not.a('undefined');
            });
            it('abnormalWhitespace property should be defined', function () {
                if (typeof (regexOptionResult) == "undefined")
                    this.skip();
                else
                    expect(regexOptionResult.abnormalWhitespace).to.not.a('undefined');
            });
        });
        describe("Test JsTypeCommander.setPatternOptions() expressions", function () {
            var types = new x_44813_util.JsTypeCommander();
            var regexOptionResult;
            try {
                regexOptionResult = types.setPatternOptions();
            }
            catch (_a) {
                regexOptionResult = undefined;
            }
            var originals;
            var testRe = /.*/;
            var testDataArr = [
                { name: 'abnormalWhitespace', original: testRe, getRegexp: function (r) { return r.abnormalWhitespace; }, setRegexp: function (r, v) { r.abnormalWhitespace = v; } },
                { name: 'booleanText', original: testRe, getRegexp: function (r) { return r.booleanText; }, setRegexp: function (r, v) { r.booleanText = v; } },
                { name: 'lineSeparator', original: testRe, getRegexp: function (r) { return r.lineSeparator; }, setRegexp: function (r, v) { r.lineSeparator = v; } },
                { name: 'onlyWhitespace', original: testRe, getRegexp: function (r) { return r.onlyWhitespace; }, setRegexp: function (r, v) { r.onlyWhitespace = v; } },
                { name: 'trimEnd', original: testRe, getRegexp: function (r) { return r.trimEnd; }, setRegexp: function (r, v) { r.trimEnd = v; } },
                { name: 'trimStart', original: testRe, getRegexp: function (r) { return r.trimStart; }, setRegexp: function (r, v) { r.trimStart = v; } }
            ];
            testDataArr.forEach(function (d) {
                if (typeof (regexOptionResult) == "undefined")
                    return;
                var r = d.getRegexp(regexOptionResult);
                if (typeof (r) !== "undefined")
                    d.original = r;
            });
            testDataArr.forEach(function (testData) {
                it('setPatternOptions({ ' + testData.name + ': /.*/ }) should return object with just that property changed.', function () {
                    if (typeof (regexOptionResult) == "undefined")
                        this.skip();
                    else {
                        var arg = {};
                        testData.setRegexp(arg, /.*/);
                        var result_1 = types.setPatternOptions(arg);
                        expect(result_1).to.not.a('undefined').and.to.not.a('null');
                        testDataArr.forEach(function (d) {
                            if (typeof (result_1) == "undefined")
                                return;
                            var existing = d.getRegexp(result_1);
                            expect(existing).to.not.a('undefined').and.to.not.a('null');
                            if (typeof (existing) == "undefined")
                                return;
                            if (d.name == testData.name) {
                                expect(existing.toString()).to.not.equal(testData.original.toString(), "Change failed.");
                                expect(existing.toString()).to.equal(testRe.toString(), "Unexpected value on changed item");
                            }
                            else {
                                expect(existing.toString()).to.not.equal(testRe.toString(), "Change unexpectedly affected item " + d.name);
                                expect(existing.toString()).to.equal(d.original.toString(), "Unexpected value on unchanged item " + d.name);
                            }
                        });
                        testData.setRegexp(arg, testData.original);
                        result_1 = types.setPatternOptions(arg);
                        expect(result_1).to.not.a('undefined').and.to.not.a('null');
                        testDataArr.forEach(function (d) {
                            if (typeof (result_1) == "undefined")
                                return;
                            var existing = d.getRegexp(result_1);
                            expect(existing).to.not.a('undefined').and.to.not.a('null');
                            if (typeof (existing) == "undefined")
                                return;
                            var originalRe = d.original;
                            if (d.name == testData.name)
                                expect(existing.toString()).to.equal(originalRe.toString(), "Value restore failed");
                            else
                                expect(existing.toString()).to.equal(originalRe.toString(), "Value restore unexpectedly affected item " + d.name);
                        });
                    }
                });
            });
            it('setPatternOptions() should return object with property values restored.', function () {
                if (typeof (regexOptionResult) == "undefined")
                    this.skip();
                else {
                    var result_2 = types.setPatternOptions();
                    expect(result_2).to.not.a('undefined').and.to.not.a('null');
                    testDataArr.forEach(function (d) {
                        if (typeof (result_2) == "undefined")
                            return;
                        var existing = d.getRegexp(result_2);
                        expect(existing).to.not.a('undefined').and.to.not.a('null');
                        if (typeof (existing) == "undefined")
                            return;
                        var originalRe = d.original;
                        expect(existing.toString()).to.equal(originalRe.toString(), "Unexpected value on item " + d.name);
                    });
                }
            });
        });
    });
})(outputs, steps, stepResult, assertEqual);
jasmine.getEnv().execute();

} catch (e) {
  if (e == 'Assertion failed')
    glideTestResultBoolean = false;
  else
    throw e;
}
: no thrown error
20:12:06.362: JavaScript evaluation error on:
var assertEqual = function(assertion) {
  if (!(assertion.value == assertion.shouldbe)) {
    gs.info("Assertion failed: " + assertion.name + " should have been " + assertion.shouldbe + 
           " but was " + assertion.value);
    throw "Assertion failed";
  }
}
try {
  var steps = function(step_id){
    return step.sibling(step_id);
  };
  (function(outputs, steps, stepResult, assertEqual) {
    describe("Testing module options settings", function () {
        describe("Testing JsTypeCommander.getDefaultLineSeparatorSequence()", function () {
            it('JsTypeCommander.getDefaultLineSeparatorSequence() should return "\\n"', function () {
                var types = new x_44813_util.JsTypeCommander();
                var result = types.getDefaultLineSeparatorSequence();
                expect(result).to.a('string');
                expect(result).to.equal("\n");
            });
        });
        describe("Testing JsTypeCommander.setDefaultLineSeparatorSequence()", function () {
            it('JsTypeCommander.setDefaultLineSeparatorSequence("\\r\\n") should return "\\r\\n"', function () {
                var types = new x_44813_util.JsTypeCommander();
                var result = types.setDefaultLineSeparatorSequence("\r\n");
                expect(result).to.a('string');
                expect(result).to.equal("\r\n");
            });
            it('JsTypeCommander.getDefaultLineSeparatorSequence() should return "\\r\\n"', function () {
                var types = new x_44813_util.JsTypeCommander();
                var result = types.getDefaultLineSeparatorSequence();
                expect(result).to.a('string');
                expect(result).to.equal("\r\n");
            });
            it('JsTypeCommander.setDefaultLineSeparatorSequence() should return "\\n"', function () {
                var types = new x_44813_util.JsTypeCommander();
                var result = types.setDefaultLineSeparatorSequence();
                expect(result).to.a('string');
                expect(result).to.equal("\n");
            });
            it('JsTypeCommander.getDefaultLineSeparatorSequence() should return "\\n"', function () {
                var types = new x_44813_util.JsTypeCommander();
                var result = types.getDefaultLineSeparatorSequence();
                expect(result).to.a('string');
                expect(result).to.equal("\n");
            });
        });
        describe("Testing JsTypeCommander.getPatternOptions()", function () {
            it('JsTypeCommander.getPatternOptions() should not return nil', function () {
                var types = new x_44813_util.JsTypeCommander();
                var regexOptionResult = types.getPatternOptions();
                expect(regexOptionResult).to.not.a('undefined').and.to.not.a('null');
            });
        });
        describe("Checking JsTypeCommander.getPatternOptions() properties", function () {
            var types = new x_44813_util.JsTypeCommander();
            var regexOptionResult;
            try {
                regexOptionResult = types.getPatternOptions();
            }
            catch (_a) {
                regexOptionResult = undefined;
            }
            it('onlyWhitespace property should be defined', function () {
                if (typeof (regexOptionResult) == "undefined")
                    this.skip();
                else
                    expect(regexOptionResult.onlyWhitespace).to.not.a('undefined');
            });
            it('trimStart property should be defined', function () {
                if (typeof (regexOptionResult) == "undefined")
                    this.skip();
                else
                    expect(regexOptionResult.trimStart).to.not.a('undefined');
            });
            it('trimEnd property should be defined', function () {
                if (typeof (regexOptionResult) == "undefined")
                    this.skip();
                else
                    expect(regexOptionResult.trimEnd).to.not.a('undefined');
            });
            it('lineSeparator property should be defined', function () {
                if (typeof (regexOptionResult) == "undefined")
                    this.skip();
                else
                    expect(regexOptionResult.lineSeparator).to.not.a('undefined');
            });
            it('booleanText property should be defined', function () {
                if (typeof (regexOptionResult) == "undefined")
                    this.skip();
                else
                    expect(regexOptionResult.booleanText).to.not.a('undefined');
            });
            it('firstLetterLc property should be defined', function () {
                if (typeof (regexOptionResult) == "undefined")
                    this.skip();
                else
                    expect(regexOptionResult.firstLetterLc).to.not.a('undefined');
            });
            it('abnormalWhitespace property should be defined', function () {
                if (typeof (regexOptionResult) == "undefined")
                    this.skip();
                else
                    expect(regexOptionResult.abnormalWhitespace).to.not.a('undefined');
            });
        });
        describe("Test JsTypeCommander.setPatternOptions() expressions", function () {
            var types = new x_44813_util.JsTypeCommander();
            var regexOptionResult;
            try {
                regexOptionResult = types.setPatternOptions();
            }
            catch (_a) {
                regexOptionResult = undefined;
            }
            var originals;
            var testRe = /.*/;
            var testDataArr = [
                { name: 'abnormalWhitespace', original: testRe, getRegexp: function (r) { return r.abnormalWhitespace; }, setRegexp: function (r, v) { r.abnormalWhitespace = v; } },
                { name: 'booleanText', original: testRe, getRegexp: function (r) { return r.booleanText; }, setRegexp: function (r, v) { r.booleanText = v; } },
                { name: 'lineSeparator', original: testRe, getRegexp: function (r) { return r.lineSeparator; }, setRegexp: function (r, v) { r.lineSeparator = v; } },
                { name: 'onlyWhitespace', original: testRe, getRegexp: function (r) { return r.onlyWhitespace; }, setRegexp: function (r, v) { r.onlyWhitespace = v; } },
                { name: 'trimEnd', original: testRe, getRegexp: function (r) { return r.trimEnd; }, setRegexp: function (r, v) { r.trimEnd = v; } },
                { name: 'trimStart', original: testRe, getRegexp: function (r) { return r.trimStart; }, setRegexp: function (r, v) { r.trimStart = v; } }
            ];
            testDataArr.forEach(function (d) {
                if (typeof (regexOptionResult) == "undefined")
                    return;
                var r = d.getRegexp(regexOptionResult);
                if (typeof (r) !== "undefined")
                    d.original = r;
            });
            testDataArr.forEach(function (testData) {
                it('setPatternOptions({ ' + testData.name + ': /.*/ }) should return object with just that property changed.', function () {
                    if (typeof (regexOptionResult) == "undefined")
                        this.skip();
                    else {
                        var arg = {};
                        testData.setRegexp(arg, /.*/);
                        var result_1 = types.setPatternOptions(arg);
                        expect(result_1).to.not.a('undefined').and.to.not.a('null');
                        testDataArr.forEach(function (d) {
                            if (typeof (result_1) == "undefined")
                                return;
                            var existing = d.getRegexp(result_1);
                            expect(existing).to.not.a('undefined').and.to.not.a('null');
                            if (typeof (existing) == "undefined")
                                return;
                            if (d.name == testData.name) {
                                expect(existing.toString()).to.not.equal(testData.original.toString(), "Change failed.");
                                expect(existing.toString()).to.equal(testRe.toString(), "Unexpected value on changed item");
                            }
                            else {
                                expect(existing.toString()).to.not.equal(testRe.toString(), "Change unexpectedly affected item " + d.name);
                                expect(existing.toString()).to.equal(d.original.toString(), "Unexpected value on unchanged item " + d.name);
                            }
                        });
                        testData.setRegexp(arg, testData.original);
                        result_1 = types.setPatternOptions(arg);
                        expect(result_1).to.not.a('undefined').and.to.not.a('null');
                        testDataArr.forEach(function (d) {
                            if (typeof (result_1) == "undefined")
                                return;
                            var existing = d.getRegexp(result_1);
                            expect(existing).to.not.a('undefined').and.to.not.a('null');
                            if (typeof (existing) == "undefined")
                                return;
                            var originalRe = d.original;
                            if (d.name == testData.name)
                                expect(existing.toString()).to.equal(originalRe.toString(), "Value restore failed");
                            else
                                expect(existing.toString()).to.equal(originalRe.toString(), "Value restore unexpectedly affected item " + d.name);
                        });
                    }
                });
            });
            it('setPatternOptions() should return object with property values restored.', function () {
                if (typeof (regexOptionResult) == "undefined")
                    this.skip();
                else {
                    var result_2 = types.setPatternOptions();
                    expect(result_2).to.not.a('undefined').and.to.not.a('null');
                    testDataArr.forEach(function (d) {
                        if (typeof (result_2) == "undefined")
                            return;
                        var existing = d.getRegexp(result_2);
                        expect(existing).to.not.a('undefined').and.to.not.a('null');
                        if (typeof (existing) == "undefined")
                            return;
                        var originalRe = d.original;
                        expect(existing.toString()).to.equal(originalRe.toString(), "Unexpected value on item " + d.name);
                    });
                }
            });
        });
    });
})(outputs, steps, stepResult, assertEqual);
jasmine.getEnv().execute();

} catch (e) {
  if (e == 'Assertion failed')
    glideTestResultBoolean = false;
  else
    throw e;
}
: org.mozilla.javascript.JavaScriptException: InternalError: Object object has exceeded maximum permitted size of 268435456 (sys_atf_step.e20b5ba04f961300bd6901bda310c7e5; line 204): org.mozilla.javascript.gen.sys_atf_step_e20b5ba04f961300bd6901bda310c7e5_1755._c_script_0(sys_atf_step.e20b5ba04f961300bd6901bda310c7e5:204)
org.mozilla.javascript.gen.sys_atf_step_e20b5ba04f961300bd6901bda310c7e5_1755.call(sys_atf_step.e20b5ba04f961300bd6901bda310c7e5)
org.mozilla.javascript.ContextFactory.doTopCall(ContextFactory.java:563)
org.mozilla.javascript.ScriptRuntime.doTopCall(ScriptRuntime.java:3428)
org.mozilla.javascript.gen.sys_atf_step_e20b5ba04f961300bd6901bda310c7e5_1755.call(sys_atf_step.e20b5ba04f961300bd6901bda310c7e5)
org.mozilla.javascript.gen.sys_atf_step_e20b5ba04f961300bd6901bda310c7e5_1755.exec(sys_atf_step.e20b5ba04f961300bd6901bda310c7e5)
com.glide.script.ScriptEvaluator.execute(ScriptEvaluator.java:263)
com.glide.script.ScriptEvaluator.evaluateString(ScriptEvaluator.java:110)
com.glide.script.ScriptEvaluator.evaluateString(ScriptEvaluator.java:76)
com.glide.script.fencing.GlideScopedEvaluator.evaluateScript(GlideScopedEvaluator.java:309)
com.glide.script.fencing.GlideScopedEvaluator.evaluateScript(GlideScopedEvaluator.java:257)
com.glide.automated_testing_framework.runner.step.JasmineScriptTestRunner.execute(JasmineScriptTestRunner.java:125)
com.glide.automated_testing_framework.runner.step_environment.AbstractServerStepEnvRunner.lambda$processStep$7(AbstractServerStepEnvRunner.java:127)
com.glide.rollback.recording.RollbackRecorder.execute(RollbackRecorder.java:63)
com.glide.automated_testing_framework.util.ATFRollbackUtil.recordOpsInRollbackContext(ATFRollbackUtil.java:80)
com.glide.automated_testing_framework.runner.step_environment.AbstractServerStepEnvRunner.processStep(AbstractServerStepEnvRunner.java:118)
com.glide.automated_testing_framework.runner.step_environment.AbstractServerStepEnvRunner.processSteps(AbstractServerStepEnvRunner.java:95)
com.glide.automated_testing_framework.runner.step_environment.AbstractServerStepEnvRunner.execute(AbstractServerStepEnvRunner.java:44)
com.glide.automated_testing_framework.worker.TestExecutionWorker.executeTestInOrderByBatch(TestExecutionWorker.java:257)
com.glide.automated_testing_framework.worker.TestExecutionWorker.execute(TestExecutionWorker.java:159)
com.glide.automated_testing_framework.TestExecutionProgressWorker.startWork(TestExecutionProgressWorker.java:34)
com.glide.worker.AbstractProgressWorker.startAndWait(AbstractProgressWorker.java:123)
com.glide.worker.HierarchicalProgressWorker.startAndWait(HierarchicalProgressWorker.java:35)
com.glide.worker.BackgroundProgressJob.execute(BackgroundProgressJob.java:54)
com.glide.schedule.JobExecutor.executeJob(JobExecutor.java:103)
com.glide.schedule.JobExecutor.execute(JobExecutor.java:89)
com.glide.schedule.GlideScheduleWorker.executeJob(GlideScheduleWorker.java:223)
com.glide.schedule.GlideScheduleWorker.lambda$process$20(GlideScheduleWorker.java:162)
com.glide.worker.TransactionalWorkerThread.executeInTransaction(TransactionalWorkerThread.java:35)
com.glide.schedule.GlideScheduleWorker.process(GlideScheduleWorker.java:162)
com.glide.schedule.GlideScheduleWorker.run(GlideScheduleWorker.java:73)

20:12:06.366: InternalError: Object object has exceeded maximum permitted size of 268435456 (sys_atf_step.e20b5ba04f961300bd6901bda310c7e5; line 204): org.mozilla.javascript.JavaScriptException: InternalError: Object object has exceeded maximum permitted size of 268435456 (sys_atf_step.e20b5ba04f961300bd6901bda310c7e5; line 204): org.mozilla.javascript.gen.sys_atf_step_e20b5ba04f961300bd6901bda310c7e5_1755._c_script_0(sys_atf_step.e20b5ba04f961300bd6901bda310c7e5:204)
org.mozilla.javascript.gen.sys_atf_step_e20b5ba04f961300bd6901bda310c7e5_1755.call(sys_atf_step.e20b5ba04f961300bd6901bda310c7e5)
org.mozilla.javascript.ContextFactory.doTopCall(ContextFactory.java:563)
org.mozilla.javascript.ScriptRuntime.doTopCall(ScriptRuntime.java:3428)
org.mozilla.javascript.gen.sys_atf_step_e20b5ba04f961300bd6901bda310c7e5_1755.call(sys_atf_step.e20b5ba04f961300bd6901bda310c7e5)
org.mozilla.javascript.gen.sys_atf_step_e20b5ba04f961300bd6901bda310c7e5_1755.exec(sys_atf_step.e20b5ba04f961300bd6901bda310c7e5)
com.glide.script.ScriptEvaluator.execute(ScriptEvaluator.java:263)
com.glide.script.ScriptEvaluator.evaluateString(ScriptEvaluator.java:110)
com.glide.script.ScriptEvaluator.evaluateString(ScriptEvaluator.java:76)
com.glide.script.fencing.GlideScopedEvaluator.evaluateScript(GlideScopedEvaluator.java:309)
com.glide.script.fencing.GlideScopedEvaluator.evaluateScript(GlideScopedEvaluator.java:257)
com.glide.automated_testing_framework.runner.step.JasmineScriptTestRunner.execute(JasmineScriptTestRunner.java:125)
com.glide.automated_testing_framework.runner.step_environment.AbstractServerStepEnvRunner.lambda$processStep$7(AbstractServerStepEnvRunner.java:127)
com.glide.rollback.recording.RollbackRecorder.execute(RollbackRecorder.java:63)
com.glide.automated_testing_framework.util.ATFRollbackUtil.recordOpsInRollbackContext(ATFRollbackUtil.java:80)
com.glide.automated_testing_framework.runner.step_environment.AbstractServerStepEnvRunner.processStep(AbstractServerStepEnvRunner.java:118)
com.glide.automated_testing_framework.runner.step_environment.AbstractServerStepEnvRunner.processSteps(AbstractServerStepEnvRunner.java:95)
com.glide.automated_testing_framework.runner.step_environment.AbstractServerStepEnvRunner.execute(AbstractServerStepEnvRunner.java:44)
com.glide.automated_testing_framework.worker.TestExecutionWorker.executeTestInOrderByBatch(TestExecutionWorker.java:257)
com.glide.automated_testing_framework.worker.TestExecutionWorker.execute(TestExecutionWorker.java:159)
com.glide.automated_testing_framework.TestExecutionProgressWorker.startWork(TestExecutionProgressWorker.java:34)
com.glide.worker.AbstractProgressWorker.startAndWait(AbstractProgressWorker.java:123)
com.glide.worker.HierarchicalProgressWorker.startAndWait(HierarchicalProgressWorker.java:35)
com.glide.worker.BackgroundProgressJob.execute(BackgroundProgressJob.java:54)
com.glide.schedule.JobExecutor.executeJob(JobExecutor.java:103)
com.glide.schedule.JobExecutor.execute(JobExecutor.java:89)
com.glide.schedule.GlideScheduleWorker.executeJob(GlideScheduleWorker.java:223)
com.glide.schedule.GlideScheduleWorker.lambda$process$20(GlideScheduleWorker.java:162)
com.glide.worker.TransactionalWorkerThread.executeInTransaction(TransactionalWorkerThread.java:35)
com.glide.schedule.GlideScheduleWorker.process(GlideScheduleWorker.java:162)
com.glide.schedule.GlideScheduleWorker.run(GlideScheduleWorker.java:73)

