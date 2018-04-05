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
var x_44813_sec_clsif;
(function (x_44813_sec_clsif) {
    ;
    /**
     * Base class for property validation.
     */
    var ValidationProperty = /** @class */ (function () {
        /**
         * Initializes a new ValidationProperty object.
         * @param config Validation configuration.
         * @param parent Parent object containing the value being validated.
         */
        function ValidationProperty(config, parent) {
            this._types = new x_44813_util.types();
            this._isValid = false;
            this._sourceValue = "";
            this._normalizedValue = "";
            this._message = "";
            this._parent = parent;
            this._config = config;
            this.validate();
        }
        Object.defineProperty(ValidationProperty.prototype, "isValid", {
            /**
             * Indicates whether value is valid.
             * @type {boolean}
             */
            get: function () { return this._isValid; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ValidationProperty.prototype, "normalizedValue", {
            /**
             * Contains the normalized source value.
             * @type {string}
             */
            get: function () { return this._normalizedValue; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ValidationProperty.prototype, "message", {
            /**
             * Contains validation message.
             * @type {string}
             */
            get: function () { return this._message; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ValidationProperty.prototype, "sourceValue", {
            /**
             * Source value to be validated
             * @type {string}
             */
            get: function () { return this._sourceValue; },
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
        /**
         * Returns source value.
         */
        ValidationProperty.prototype.toString = function () { return this._types.asString(this.sourceValue, ""); };
        ValidationProperty.prototype.validate = function () {
            this._normalizedValue = this._sourceValue.trim();
            if (this._normalizedValue.length == 0) {
                this._isValid = false;
                this._message = this._config.emptyValueMsg;
                return false;
            }
            this._normalizedValue = this._types.asNormalizedString(this._normalizedValue);
            this._isValid = this._config.validationExpression.test(this._normalizedValue);
            if (this._isValid) {
                if (this._normalizedValue.length <= this._config.maxLen) {
                    this._isValid = true;
                    this._message = (this._sourceValue == this._normalizedValue) ? "" : this._config.valueNormalizedMsg;
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
    x_44813_sec_clsif.ValidationProperty = ValidationProperty;
    /**
     * Validates classification full name.
     */
    var NameValidationProperty = /** @class */ (function (_super) {
        __extends(NameValidationProperty, _super);
        function NameValidationProperty(parent) {
            var _this = _super.call(this, {
                validationExpression: /^[a-z][a-z\d_]*(\s+[a-z][a-z\d_]*)*$/i,
                maxLen: 12,
                valueNormalizedMsg: "Classification Name has been normalized.",
                emptyValueMsg: NameValidationProperty.emptyValueMsg,
                valueTooLongMsg: "Name cannot be greater than 12 characters.",
                invalidValueMsg: "Invalid Classification Name."
            }, parent) || this;
            _this.type = "NameValidationProperty";
            return _this;
        }
        NameValidationProperty.emptyValueMsg = "Classification Name cannot be empty.";
        return NameValidationProperty;
    }(ValidationProperty));
    x_44813_sec_clsif.NameValidationProperty = NameValidationProperty;
    /**
     * Validates portion marking.
     */
    var PortionMarkingValidationProperty = /** @class */ (function (_super) {
        __extends(PortionMarkingValidationProperty, _super);
        function PortionMarkingValidationProperty(parent) {
            var _this = _super.call(this, {
                validationExpression: /^[a-z][a-z\d_.]?/i,
                maxLen: 2,
                valueNormalizedMsg: "Portion Marking has been normalized.",
                emptyValueMsg: PortionMarkingValidationProperty.emptyValueMsg,
                valueTooLongMsg: "Portion Marking can only be 1 or 2 characters.",
                invalidValueMsg: "Invalid Portion Marking."
            }, parent) || this;
            _this.type = "PortionMarkingValidationProperty";
            return _this;
        }
        PortionMarkingValidationProperty.emptyValueMsg = "Portion Marking cannot be empty.";
        return PortionMarkingValidationProperty;
    }(ValidationProperty));
    x_44813_sec_clsif.PortionMarkingValidationProperty = PortionMarkingValidationProperty;
    /**
     * Validates classification.
     * @class
     */
    var ClassificationValidator = /** @class */ (function () {
        function ClassificationValidator() {
            this._types = new x_44813_util.types();
            this._name = new NameValidationProperty(this);
            this._portionMarking = new NameValidationProperty(this);
            this._errorMessages = [NameValidationProperty.emptyValueMsg, PortionMarkingValidationProperty.emptyValueMsg];
            this._infoMessages = [];
            this._isValid = false;
            this.type = "ClassificationValidator";
        }
        Object.defineProperty(ClassificationValidator.prototype, "isValid", {
            /**
             * Returns true if the name and portion marking are both valid.
             * @type: {boolean}
             */
            get: function () { return this._isValid; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ClassificationValidator.prototype, "name", {
            /**
             * Contains validation for the full classification name.
             */
            get: function () { return this._name; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ClassificationValidator.prototype, "portionMarking", {
            /**
             * Contains validation for the portion marking.
             */
            get: function () { return this._portionMarking; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ClassificationValidator.prototype, "errorMessages", {
            /**
             * Contains any error messages from the classification name and portion marking.
             */
            get: function () { return this._errorMessages; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ClassificationValidator.prototype, "infoMessages", {
            /**
             * Contains any informational messages from the classification name and portion marking.
             */
            get: function () { return this._infoMessages; },
            enumerable: true,
            configurable: true
        });
        /**
         * Updates the isValid property and the error and informational messages.
         */
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
        /**
         * Sets the name and portion marking.
         */
        ClassificationValidator.prototype.set = function (name, portionMarking) {
            this._name.sourceValue = name;
            this._portionMarking.sourceValue = portionMarking;
        };
        /**
         * Sets name and portion marking according to GlideRecord fields.
         * @param {GlideRecord} gr The glide record containing security classification and portion marking.
         */
        ClassificationValidator.prototype.setFromGr = function (gr) { this.set(gr.getValue('name'), gr.getValue('portion_marking')); };
        /**
         * Updates the name and portion marking fields if they are both valid.
         * @param {GlideRecord} gr Glide record to update.
         * @returns {boolean} True if fiields were update; otherwise, false if one of the properties were invalid or if no changes were made.
         */
        ClassificationValidator.prototype.applyGrIfValid = function (gr) {
            if (!this._isValid || (this.name.normalizedValue == gr.getValue('name') && this.portionMarking.normalizedValue == gr.getValue('portion_marking')))
                return false;
            gr.setValue('name', this.name.normalizedValue);
            gr.setValue('portion_marking', this.portionMarking.normalizedValue);
            return true;
        };
        /**
         * Listing of compliant classifications.
         */
        ClassificationValidator.compliantClassifications = [
            { name: 'UNCLASSIFIED', portion_marking: 'U' },
            { name: 'CONFIDENTIAL', portion_marking: 'C' },
            { name: 'RESTRICTED', portion_marking: 'R' },
            { name: 'SECRET', portion_marking: 'S' },
            { name: 'TOP SECRET', portion_marking: 'TS' }
        ];
        /**
         * Hash of classifications by their full name.
         */
        ClassificationValidator.byName = function () {
            var r = {};
            ClassificationValidator.compliantClassifications.forEach(function (a) {
                r[a.name] = a.portion_marking;
            });
            return r;
        }();
        /**
         * Hash of classifications by their portion markings.
         */
        ClassificationValidator.byPortionMarking = function () {
            var r = {};
            ClassificationValidator.compliantClassifications.forEach(function (a) {
                r[a.portion_marking] = a.name;
            });
            return r;
        }();
        return ClassificationValidator;
    }());
    x_44813_sec_clsif.ClassificationValidator = ClassificationValidator;
})(x_44813_sec_clsif || (x_44813_sec_clsif = {}));
//# sourceMappingURL=ClassificationValidator.js.map