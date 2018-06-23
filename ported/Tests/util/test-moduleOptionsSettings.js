(function(outputs, steps, stepResult, assertEqual) {
    describe("Testing JsTypeCommander.getDefaultLineSeparatorSequence()", function () {
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
            expect(regexOptionResult).toBeDefined().and.to.not.a('null');
        });
    });
    describe("Checking JsTypeCommander.getPatternOptions() properties", function () {
        it('onlyWhitespace property should be defined', function () {
            var types = new x_44813_util.JsTypeCommander();
            var regexOptionResult = types.getPatternOptions();
            expect(regexOptionResult.onlyWhitespace).toBeDefined();
        });
    });
    // describe("Checking JsTypeCommander.getPatternOptions() properties", function () {
    //     it('onlyWhitespace property should be defined', function () {
    //         var types = new x_44813_util.JsTypeCommander();
    //         var regexOptionResult = types.getPatternOptions();
    //         expect(regexOptionResult.onlyWhitespace).toBeDefined();
    //     });
        // it('trimStart property should be defined', function () {
        //     var types = new x_44813_util.JsTypeCommander();
        //     var regexOptionResult = types.getPatternOptions();
        //     expect(regexOptionResult.trimStart).toBeDefined(); });
        // it('trimEnd property should be defined', function () {
        //     var types = new x_44813_util.JsTypeCommander();
        //     var regexOptionResult = types.getPatternOptions();
        //     expect(regexOptionResult.trimEnd).toBeDefined(); });
        // it('lineSeparator property should be defined', function () {
        //     var types = new x_44813_util.JsTypeCommander();
        //     var regexOptionResult = types.getPatternOptions();
        //     expect(regexOptionResult.lineSeparator).toBeDefined(); });
        // it('booleanText property should be defined', function () {
        //     var types = new x_44813_util.JsTypeCommander();
        //     var regexOptionResult = types.getPatternOptions();
        //     expect(regexOptionResult.booleanText).toBeDefined(); });
        // it('firstLetterLc property should be defined', function () {
        //     var types = new x_44813_util.JsTypeCommander();
        //     var regexOptionResult = types.getPatternOptions();
        //     expect(regexOptionResult.firstLetterLc).toBeDefined(); });
        // it('abnormalWhitespace property should be defined', function () {
        //     var types = new x_44813_util.JsTypeCommander();
        //     var regexOptionResult = types.getPatternOptions();
        //     expect(regexOptionResult.abnormalWhitespace).toBeDefined(); });
    // });
    // describe("Test JsTypeCommander.setPatternOptions() expressions", function () {
    //     var types = new x_44813_util.JsTypeCommander();
    //     var regexOptionResult;
    //     try {
    //         regexOptionResult = types.setPatternOptions();
    //     }
    //     catch (_a) {
    //         regexOptionResult = undefined;
    //     }
    //     var originals;
    //     var testRe = /.*/;
    //     var testDataArr = [
    //         { name: 'abnormalWhitespace', original: testRe, getRegexp: function (r) { return r.abnormalWhitespace; }, setRegexp: function (r, v) { r.abnormalWhitespace = v; } },
    //         { name: 'booleanText', original: testRe, getRegexp: function (r) { return r.booleanText; }, setRegexp: function (r, v) { r.booleanText = v; } },
    //         { name: 'lineSeparator', original: testRe, getRegexp: function (r) { return r.lineSeparator; }, setRegexp: function (r, v) { r.lineSeparator = v; } },
    //         { name: 'onlyWhitespace', original: testRe, getRegexp: function (r) { return r.onlyWhitespace; }, setRegexp: function (r, v) { r.onlyWhitespace = v; } },
    //         { name: 'trimEnd', original: testRe, getRegexp: function (r) { return r.trimEnd; }, setRegexp: function (r, v) { r.trimEnd = v; } },
    //         { name: 'trimStart', original: testRe, getRegexp: function (r) { return r.trimStart; }, setRegexp: function (r, v) { r.trimStart = v; } }
    //     ];
    //     testDataArr.forEach(function (d) {
    //         if (typeof (regexOptionResult) == "undefined")
    //             return;
    //         var r = d.getRegexp(regexOptionResult);
    //         if (typeof (r) !== "undefined")
    //             d.original = r;
    //     });
    //     testDataArr.forEach(function (testData) {
    //         it('setPatternOptions({ ' + testData.name + ': /.*/ }) should return object with just that property changed.', function () {
    //             if (typeof (regexOptionResult) == "undefined")
    //                 this.skip();
    //             else {
    //                 var arg = {};
    //                 testData.setRegexp(arg, /.*/);
    //                 var result_1 = types.setPatternOptions(arg);
    //                 expect(result_1).toBeDefined().and.to.not.a('null');
    //                 testDataArr.forEach(function (d) {
    //                     if (typeof (result_1) == "undefined")
    //                         return;
    //                     var existing = d.getRegexp(result_1);
    //                     expect(existing).toBeDefined().and.to.not.a('null');
    //                     if (typeof (existing) == "undefined")
    //                         return;
    //                     if (d.name == testData.name) {
    //                         expect(existing.toString()).to.not.equal(testData.original.toString(), "Change failed.");
    //                         expect(existing.toString()).to.equal(testRe.toString(), "Unexpected value on changed item");
    //                     }
    //                     else {
    //                         expect(existing.toString()).to.not.equal(testRe.toString(), "Change unexpectedly affected item " + d.name);
    //                         expect(existing.toString()).to.equal(d.original.toString(), "Unexpected value on unchanged item " + d.name);
    //                     }
    //                 });
    //                 testData.setRegexp(arg, testData.original);
    //                 result_1 = types.setPatternOptions(arg);
    //                 expect(result_1).toBeDefined().and.to.not.a('null');
    //                 testDataArr.forEach(function (d) {
    //                     if (typeof (result_1) == "undefined")
    //                         return;
    //                     var existing = d.getRegexp(result_1);
    //                     expect(existing).toBeDefined().and.to.not.a('null');
    //                     if (typeof (existing) == "undefined")
    //                         return;
    //                     var originalRe = d.original;
    //                     if (d.name == testData.name)
    //                         expect(existing.toString()).to.equal(originalRe.toString(), "Value restore failed");
    //                     else
    //                         expect(existing.toString()).to.equal(originalRe.toString(), "Value restore unexpectedly affected item " + d.name);
    //                 });
    //             }
    //         });
    //     });
    //     it('setPatternOptions() should return object with property values restored.', function () {
    //         if (typeof (regexOptionResult) == "undefined")
    //             this.skip();
    //         else {
    //             var result_2 = types.setPatternOptions();
    //             expect(result_2).toBeDefined().and.to.not.a('null');
    //             testDataArr.forEach(function (d) {
    //                 if (typeof (result_2) == "undefined")
    //                     return;
    //                 var existing = d.getRegexp(result_2);
    //                 expect(existing).toBeDefined().and.to.not.a('null');
    //                 if (typeof (existing) == "undefined")
    //                     return;
    //                 var originalRe = d.original;
    //                 expect(existing.toString()).to.equal(originalRe.toString(), "Unexpected value on item " + d.name);
    //             });
    //         }
    //     });
    // });
})(outputs, steps, stepResult, assertEqual);
jasmine.getEnv().execute();