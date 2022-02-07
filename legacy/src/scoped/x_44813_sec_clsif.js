"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var x_44813_util_1 = require("../../compiled/scoped/x_44813_util");
var x_44813_sec_clsif;
(function (x_44813_sec_clsif) {
    var ClassificationUtil = /** @class */ (function () {
        function ClassificationUtil() {
            this.type = "ClassificationUtil";
            this.getAllClassifications = function (force) {
                var cache = this.getClassificationCache(force);
                return cache.ordered;
            };
            this._types = new x_44813_util_1.x_44813_util.JsTypeCommander();
        }
        ClassificationUtil.createGlideRecord = function () { return new GlideRecord(Constants.tableName); };
        ClassificationUtil.prototype.getDefaultPortionMarking = function () {
            if (this._types.isString(ClassificationUtil.__defaultPortionMarking))
                return ClassificationUtil.__defaultPortionMarking;
            var s = gs.getProperty(Constants.settingsName, '').trim();
            if (s.length == 0) {
                ClassificationUtil.__defaultPortionMarking = Constants.compliantClassifications[0].portion_marking;
                gs.setProperty(Constants.settingsName, ClassificationUtil.__defaultPortionMarking);
            }
            else
                ClassificationUtil.__defaultPortionMarking = s;
            return ClassificationUtil.__defaultPortionMarking;
        };
        ClassificationUtil.prototype.getClassificationCache = function (force) {
            if (ClassificationUtil.__classificationCache.ordered.length > 0 && !force)
                return {
                    byName: ClassificationUtil.__classificationCache.byName,
                    byPortionMarking: ClassificationUtil.__classificationCache.byPortionMarking,
                    ordered: ClassificationUtil.__classificationCache.ordered
                };
            var gr = ClassificationUtil.createGlideRecord();
            gr.query();
            var allClassifications = [];
            while (gr.next()) {
                var obj = this.glideRecordToJSON(gr);
                ClassificationUtil.__classificationCache.byName[obj.name] = obj.portion_marking;
                ClassificationUtil.__classificationCache.byPortionMarking[obj.portion_marking] = obj.name;
                allClassifications.push(obj);
            }
            Constants.compliantClassifications.filter(function (p) {
                return allClassifications.filter(function (a) { return a.portion_marking == p.portion_marking; }).length == 0;
            }).forEach(function (a, i) {
                gr = ClassificationUtil.createGlideRecord();
                gr.newRecord();
                gr.setValue(Constants.fieldNames.name, a.name);
                gr.setValue(Constants.fieldNames.portionMarking, a.portion_marking);
                gr.setValue(Constants.fieldNames.order, (i + 1) * 100);
                gr.setValue(Constants.fieldNames.active, true);
                gr.update();
                allClassifications.push(this.glideRecordToJSON(gr));
            });
            // BUG: Filter may not work as expected. May not be accurately assessing whether the required portion markings exist in the table.
            allClassifications.filter(function (a) { return this.isNil(ClassificationUtil.__classificationCache.byPortionMarking[a.name]); }, this._types)
                .sort(function (a) { return a.order; })
                .concat(allClassifications.filter(function (a) { return !this.isNil(ClassificationUtil.__classificationCache.byPortionMarking[a.name]); }, this._types)
                .sort(function (a) { return a.order; })).forEach(function (a, i) {
                var o = (i + 1) * 100;
                if (a.order == o)
                    return;
                gr = ClassificationUtil.createGlideRecord();
                gr.get(a.sys_id);
                gr.setValue(Constants.fieldNames.order, o);
                gr.update();
                a.order = o;
            });
            ClassificationUtil.__classificationCache.ordered = allClassifications.sort(function (a) { return a.order; });
            return {
                byName: ClassificationUtil.__classificationCache.byName,
                byPortionMarking: ClassificationUtil.__classificationCache.byPortionMarking,
                ordered: ClassificationUtil.__classificationCache.ordered
            };
        };
        ClassificationUtil.prototype.glideRecordToJSON = function (gr) {
            return {
                order: this._types.asNumber(gr.getValue(Constants.fieldNames.order)),
                sys_id: this._types.asString(gr.getValue(Constants.fieldNames.sysId)),
                name: this._types.asString(gr.getValue(Constants.fieldNames.name)),
                portion_marking: this._types.asString(gr.getValue(Constants.fieldNames.portionMarking))
            };
        };
        ClassificationUtil.isCompliantClassificationName = function (value, ignoreCase) {
            if (typeof (value) != "string")
                return false;
            if (typeof (ignoreCase) == "boolean" && ignoreCase == true)
                value = value.toUpperCase();
            return Constants.compliantClassifications.filter(function (a) { return a.name == value; }).length > 0;
        };
        ClassificationUtil.isCompliantPortionMarking = function (value, ignoreCase) {
            if (typeof (value) != "string")
                return false;
            if (typeof (ignoreCase) == "boolean" && ignoreCase == true)
                value = value.toUpperCase();
            return Constants.compliantClassifications.filter(function (a) { return a.portion_marking == value; }).length > 0;
        };
        ClassificationUtil.newClassificationValidator = function () { return new Constants.ClassificationValidator(); };
        ClassificationUtil.__defaultPortionMarking = undefined;
        ClassificationUtil.__classificationCache = {
            byName: {},
            byPortionMarking: {},
            ordered: []
        };
        return ClassificationUtil;
    }());
    x_44813_sec_clsif.ClassificationUtil = ClassificationUtil;
    var Constants;
    (function (Constants) {
        Constants.tableName = "x_44813_sec_clsif_definition";
        Constants.settingsName = "x_44813_sec_clsif.default_classification";
        Constants.fieldNames = {
            sysId: "sys_id",
            name: "name",
            portionMarking: "portion_marking",
            order: "order",
            active: "active"
        };
        Constants.compliantClassifications = [
            { name: "UNCLASSIFIED", portion_marking: "U" },
            { name: "CONFIDENTIAL", portion_marking: "C" },
            { name: "RESTRICTED", portion_marking: "R" },
            { name: "SECRET", portion_marking: "S" },
            { name: "TOP SECRET", portion_marking: "TS" }
        ];
        var ValidationProperty = /** @class */ (function () {
            function ValidationProperty(config, onRevalidate) {
                this._types = new x_44813_util_1.x_44813_util.JsTypeCommander();
                this._isValid = false;
                this._sourceValue = "";
                this._normalizedValue = "";
                this._message = "";
                this._onRevalidate = onRevalidate;
                this._config = config;
            }
            Object.defineProperty(ValidationProperty.prototype, "config", {
                get: function () { return this._config; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ValidationProperty.prototype, "isValid", {
                get: function () { return this._isValid; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ValidationProperty.prototype, "normalizedValue", {
                get: function () { return this._normalizedValue; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ValidationProperty.prototype, "message", {
                get: function () { return this._message; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ValidationProperty.prototype, "sourceValue", {
                get: function () {
                    return this._sourceValue;
                },
                set: function (value) {
                    var s = this._types.asString(value, "");
                    if (s === this._sourceValue)
                        return;
                    this._sourceValue = s;
                    this.validate();
                },
                enumerable: true,
                configurable: true
            });
            ValidationProperty.prototype.validate = function () {
                this._normalizedValue = this._sourceValue.trim();
                if (this._normalizedValue.length == 0) {
                    this._isValid = false;
                    this._message = this._config.emptyValueMsg;
                    return false;
                }
                this._normalizedValue = this._types.asNormalizedWs(this._types.toString(this._normalizedValue));
                this._isValid = this._config.validationExpression.test(this._normalizedValue);
                if (this._isValid) {
                    if (this._normalizedValue.length <= this._config.maxLen) {
                        this._isValid = true;
                        this._message = (this._sourceValue == this._normalizedValue) ? "" : this._config.valueNormalizedMsg;
                        // BUG: Where does this._parent get initialized?S
                        this._parent.revalidate();
                        return true;
                    }
                    this._message = this._config.valueTooLongMsg;
                }
                else
                    this._message = this._config.invalidValueMsg;
                this._isValid = false;
                this._parent.revalidate();
                return false;
            };
            return ValidationProperty;
        }());
        var NameValidationProperty = /** @class */ (function (_super) {
            __extends(NameValidationProperty, _super);
            function NameValidationProperty(onRevalidate) {
                return _super.call(this, {
                    validationExpression: /^[a-z][a-z\d_]*(\s+[a-z][a-z\d_]*)*$/i,
                    maxLen: 12,
                    valueNormalizedMsg: "Classification Name has been normalized.",
                    emptyValueMsg: NameValidationProperty.emptyValueMsg,
                    valueTooLongMsg: "Name cannot be greater than 12 characters.",
                    invalidValueMsg: "Invalid Classification Name."
                }, onRevalidate) || this;
            }
            Object.defineProperty(NameValidationProperty.prototype, "CompliantClassificationName", {
                get: function () {
                    if (ClassificationUtil.isCompliantClassificationName(this.normalizedValue))
                        return this.normalizedValue;
                },
                enumerable: true,
                configurable: true
            });
            NameValidationProperty.emptyValueMsg = "Classification Name cannot be empty.";
            return NameValidationProperty;
        }(ValidationProperty));
        Constants.NameValidationProperty = NameValidationProperty;
        var PortionMarkingValidationProperty = /** @class */ (function (_super) {
            __extends(PortionMarkingValidationProperty, _super);
            function PortionMarkingValidationProperty(onRevalidate) {
                return _super.call(this, {
                    validationExpression: /^[a-z][a-z\d_.]?/i,
                    maxLen: 2,
                    valueNormalizedMsg: "Portion Marking has been normalized.",
                    emptyValueMsg: PortionMarkingValidationProperty.emptyValueMsg,
                    valueTooLongMsg: "Portion Marking can only be 1 or 2 characters.",
                    invalidValueMsg: "Invalid Portion Marking."
                }, onRevalidate) || this;
            }
            Object.defineProperty(PortionMarkingValidationProperty.prototype, "CompliantPortionMarking", {
                get: function () {
                    if (ClassificationUtil.isCompliantPortionMarking(this.normalizedValue))
                        return this.normalizedValue;
                },
                enumerable: true,
                configurable: true
            });
            PortionMarkingValidationProperty.emptyValueMsg = "Portion Marking cannot be empty.";
            return PortionMarkingValidationProperty;
        }(ValidationProperty));
        Constants.PortionMarkingValidationProperty = PortionMarkingValidationProperty;
        var ClassificationValidator = /** @class */ (function () {
            function ClassificationValidator() {
                this._types = new x_44813_util_1.x_44813_util.JsTypeCommander();
                this._name = new NameValidationProperty(this.revalidate);
                this._portionMarking = new PortionMarkingValidationProperty(this.revalidate);
                this._errorMessages = [NameValidationProperty.emptyValueMsg, PortionMarkingValidationProperty.emptyValueMsg];
                this._infoMessages = [];
                this._isValid = false;
            }
            Object.defineProperty(ClassificationValidator.prototype, "name", {
                get: function () { return this._name; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ClassificationValidator.prototype, "portionMarking", {
                get: function () { return this._portionMarking; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ClassificationValidator.prototype, "errorMessages", {
                get: function () { return this._errorMessages; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ClassificationValidator.prototype, "infoMessages", {
                get: function () { return this._infoMessages; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ClassificationValidator.prototype, "isValid", {
                get: function () { return this._isValid; },
                enumerable: true,
                configurable: true
            });
            ClassificationValidator.prototype.revalidate = function () {
                var errorMessages = [], infoMessages = [];
                var isValid = false;
                if (this._name.isValid) {
                    if (this._name.message.length > 0)
                        infoMessages.push(this._name.message);
                    if (this._portionMarking.isValid) {
                        if (this._portionMarking.message.length > 0)
                            infoMessages.push(this._portionMarking.message);
                        isValid = true;
                    }
                    else
                        errorMessages.push(this._portionMarking.message);
                }
                else {
                    errorMessages.push(this._name.message);
                    if (this._portionMarking.isValid) {
                        if (this._portionMarking.message.length > 0)
                            infoMessages.push(this._portionMarking.message);
                    }
                    else
                        errorMessages.push(this._portionMarking.message);
                }
                var i;
                if (this._errorMessages.length > errorMessages.length) {
                    while (this._errorMessages.length > errorMessages.length)
                        this._errorMessages.pop();
                    for (i = 0; i < errorMessages.length; i++)
                        this._errorMessages[i] = errorMessages[i];
                }
                else {
                    for (i = 0; i < this._errorMessages.length; i++)
                        this._errorMessages[i] = errorMessages[i];
                    for (i = this._errorMessages.length; i < errorMessages.length; i++)
                        this._errorMessages.push(errorMessages[i]);
                }
                if (this._infoMessages.length > infoMessages.length) {
                    while (this._infoMessages.length > infoMessages.length)
                        this._infoMessages.pop();
                    for (i = 0; i < infoMessages.length; i++)
                        this._infoMessages[i] = infoMessages[i];
                }
                else {
                    for (i = 0; i < this._infoMessages.length; i++)
                        this._infoMessages[i] = infoMessages[i];
                    for (i = this._infoMessages.length; i < infoMessages.length; i++)
                        this._infoMessages.push(infoMessages[i]);
                }
                this._isValid = isValid;
            };
            ClassificationValidator.prototype.set = function (name, portionMarking) {
                this._name.sourceValue = name;
                this._portionMarking.sourceValue = portionMarking;
            };
            ClassificationValidator.prototype.setFromGr = function (gr) {
                this.set(gr.getValue("name"), gr.getValue("portion_marking"));
            };
            ClassificationValidator.prototype.applyGrIfValid = function (gr) {
                if (!this._isValid || (this.name.normalizedValue == gr.getValue("name") && this.portionMarking.normalizedValue == gr.getValue("portion_marking")))
                    return false;
                gr.setValue("name", this.name.normalizedValue);
                gr.setValue("portion_marking", this.portionMarking.normalizedValue);
                return true;
            };
            ClassificationValidator.byName = function () {
                var r = {};
                Constants.compliantClassifications.forEach(function (a) {
                    r[a.name] = a.portion_marking;
                });
                return r;
            };
            ClassificationValidator.byPortionMarking = function () {
                var r = {};
                Constants.compliantClassifications.forEach(function (a) {
                    r[a.portion_marking] = a.name;
                });
                return r;
            };
            return ClassificationValidator;
        }());
        Constants.ClassificationValidator = ClassificationValidator;
    })(Constants || (Constants = {}));
})(x_44813_sec_clsif = exports.x_44813_sec_clsif || (exports.x_44813_sec_clsif = {}));
//# sourceMappingURL=x_44813_sec_clsif.js.map