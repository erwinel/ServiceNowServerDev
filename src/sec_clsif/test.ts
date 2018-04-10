function getAllClassificationsTest(): x_44813_asserttest.TestCallbackResult {
    return {
        handler: function(assert: x_44813_asserttest.Assert, data?:any, lastResult?:x_44813_asserttest.TestResultInfo) {
            if (typeof(this.allClassifications) == "undefined") {
                let cu = new x_44813_sec_clsif.ClassificationUtil();
                this.allClassifications = cu.getAllClassifications();
            }
            if (this.allClassifications.length <= assert.dataIndex)
                assert.fail("Only " + this.allClassifications.length + " of expected minimum " +  (assert.dataIndex + 1) + " results returned.")
            
            let arr = this.allClassifications.filter(function(a: x_44813_sec_clsif.IClassificationCacheItem) { return a.portion_marking == data; });
            if (arr.length != 1)
                assert.fail("Expected 1 item matching " + data + "; Actual: " + arr.length);
            
            if (arr[0].name !== assert.dataTitle)
                assert.fail("Expected name: " + assert.dataTitle + "; Actual " + assert.types.serializeToString(arr[0].name));
        },
        data: [
            { title: "UNCLASSIFIED", data: 'U', metaData: { expected: false } },
            { title: "CONFIDENTIAL", data: 'C', metaData: { expected: false } },
            { title: "RESTRICTED", data: 'R', metaData: { expected: false } },
            { title: "SECRET", data: 'S', metaData: { expected: false } },
            { title: "TS", data: 'TS', metaData: { expected: false } }
        ],
        thisObj: { }
    };
}
function getDefaultPortionMarkingTest(): x_44813_asserttest.TestCallbackResult {
    return {
        handler: function(assert: x_44813_asserttest.Assert, data?:any, lastResult?:x_44813_asserttest.TestResultInfo) {
            let cu = new x_44813_sec_clsif.ClassificationUtil();
            let actual = cu.getDefaultPortionMarking();
            if (actual !== 'U')
                assert.fail("Expected: \"U\"; Actual " + assert.types.serializeToString(actual));
        }
    };
}

function classificationValidatorTest(): x_44813_asserttest.TestCallbackResult {
    return {
        handler: function(assert: x_44813_asserttest.Assert, data?:any, lastResult?:x_44813_asserttest.TestResultInfo) {
            if (assert.types.isNil(data))
                this.cv = new x_44813_sec_clsif.ClassificationValidator();
            assert.areEqual(assert.metaData.IsValid, this.cv.isValid, "IsValid");
            assert.areEqual(assert.metaData.portionMarking.sourceValue, this.cv.portionMarking.sourceValue, "portionMarking.sourceValue");
            assert.areEqual(assert.metaData.name.sourceValue, this.cv.name.sourceValue, "name.sourceValue");
            assert.areEqual(assert.metaData.portionMarking.normalizedValue, this.cv.portionMarking.normalizedValue, "portionMarking.normalizedValue");
            assert.areEqual(assert.metaData.name.normalizedValue, this.cv.name.normalizedValue, "name.normalizedValue");
            assert.areEqual(assert.metaData.errorMessages.length, this.cv.errorMessages.length, "errorMessages.length");
            assert.areEqual(assert.metaData.infoMessages.length, this.cv.infoMessages.length, "infoMessages.length");
            for (var i = 0; i < assert.metaData.infoMessages.length; i++)
                assert.areEqual(assert.metaData.errorMessages[i], this.cv.errorMessages[i], "errorMessages[" + i + "]");
            for (var i = 0; i < assert.metaData.infoMessages.length; i++)
                assert.areEqual(assert.metaData.infoMessages[i], this.cv.infoMessages[i], "infoMessages[" + i + "]");
        },
        data: [
            {
                title: "Constructor",
                metaData: {
                    isValid: false,
                    portionMarking: {
                        sourceValue: "",
                        normalizedValue: ""
                    },
                    name: {
                        sourceValue: "",
                        normalizedValue: ""
                    },
                    errorMessages: [
                        "Classification Name cannot be empty.",
                        "Portion Marking cannot be empty."
                    ],
                    infoMessages: []
                }
            }, {
                title: "UnNormalized U",
                data: { name: ' UNCLASSIFIED', portionMarking: ' U ' },
                metaData: {
                    isValid: false,
                    portionMarking: {
                        sourceValue: " U ",
                        normalizedValue: "U"
                    },
                    name: {
                        sourceValue: " UNCLASSIFIED",
                        normalizedValue: "UNCLASSIFIED"
                    },
                    errorMessages: [],
                    infoMessages: [
                        "Classification Name has been normalized.",
                        "Portion Marking has been normalized."
                    ]
                }
            }, {
                title: "Normalized C",
                data: { name: 'CONFIDENTIAL', portionMarking: 'C' },
                metaData: {
                    isValid: false,
                    portionMarking: {
                        sourceValue: "C",
                        normalizedValue: "C"
                    },
                    name: {
                        sourceValue: "CONFIDENTIAL",
                        normalizedValue: "CONFIDENTIAL"
                    },
                    errorMessages: [],
                    infoMessages: []
                }
            }, {
                title: "Whitespace",
                data: { name: '  ', portionMarking: '      ' },
                metaData: {
                    isValid: false,
                    portionMarking: {
                        sourceValue: "      ",
                        normalizedValue: ""
                    },
                    name: {
                        sourceValue: "  ",
                        normalizedValue: ""
                    },
                    errorMessages: [
                        "Classification Name cannot be empty.",
                        "Portion Marking cannot be empty."
                    ],
                    infoMessages: []
                }
            }
        ],
        thisObj: { }
    };
}
