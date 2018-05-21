/**
 * Validates classification.
 * @class
 */
var ClassificationValidator = Class.create();
(function(ClassificationValidator) {
    /**
     * Base class for property validation.
     */
    var ValidationProperty = Class.create();
    (function (ValidationProperty) {
        var vProto = {
            /**
             * Initializes a new ValidationProperty object.
             * @param config Validation configuration.
             * @param parent Parent object containing the value being validated.
             */
            initialize: function(config, onRevalidate) {
                this._types = new x_44813_util.JsTypeCommander();
                this._isValid = false;
                this._sourceValue = "";
                this._normalizedValue = "";
                this._message = "";
                this._onRevalidate = onRevalidate;
                this._config = config;
                this.validate();
            }
        };
        
        Object.defineProperty(vProto, "isValid", {
            /**
             * Indicates whether value is valid.
             * @type {boolean}
             */
            get: function () { return this._isValid; },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(vProto, "normalizedValue", {
            /**
             * Contains the normalized source value.
             * @type {string}
             */
            get: function () { return this._normalizedValue; },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(vProto, "message", {
            /**
             * Contains validation message.
             * @type {string}
             */
            get: function () { return this._message; },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(vProto, "sourceValue", {
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
        vProto.toString = function () { return this._types.asString(this.sourceValue, ""); };
        
        vProto.validate = function () {
			gs.info("validate() invoked: _sourceValue is {0}, _normalizedValue is {1}", this._types.serializeToString(this._sourceValue), this._types.serializeToString(this._normalizedValue));
            this._normalizedValue = this._sourceValue.trim();
            if (this._normalizedValue.length == 0) {
				gs.info("as empty: _sourceValue is {0}, _normalizedValue is {1}", this._types.serializeToString(this._sourceValue), this._types.serializeToString(this._normalizedValue));
                this._isValid = false;
                this._message = this._config.emptyValueMsg;
                return false;
            }
            this._normalizedValue = this._types.asNormalizedString(this._normalizedValue);
				gs.info("Normalized whitespace: _sourceValue is {0}, _normalizedValue is {1}", this._types.serializeToString(this._sourceValue), this._types.serializeToString(this._normalizedValue));
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
        vProto.type = 'ValidationProperty';
        ValidationProperty.prototype = vProto;
    }(ValidationProperty));
    
    /**
     * Validates classification full name.
     */
    var NameValidationProperty = Class.create();
    (function (_super, NameValidationProperty) {
        var vProto = Object.extendsObject({
            initialize: function(onRevalidate) {
                _super.prototype.initialize.call(this, {
                    validationExpression: /^[a-z][a-z\d_]*(\s+[a-z][a-z\d_]*)*$/i,
                    maxLen: 12,
                    valueNormalizedMsg: "Classification Name has been normalized.",
                    emptyValueMsg: NameValidationProperty.emptyValueMsg,
                    valueTooLongMsg: "Name cannot be greater than 12 characters.",
                    invalidValueMsg: "Invalid Classification Name."
                }, onRevalidate);
            }
        }, _super.prototype);
        vProto.type = "NameValidationProperty";
        NameValidationProperty.prototype = vProto;
        NameValidationProperty.emptyValueMsg = "Classification Name cannot be empty.";
        return NameValidationProperty;
    }(ValidationProperty, NameValidationProperty));
    
    /**
     * Validates portion marking.
     */
    var PortionMarkingValidationProperty = Class.create();
    (function (_super, PortionMarkingValidationProperty) {
        var vProto = Object.extendsObject({
            initialize: function(onRevalidate) {
                _super.prototype.initialize.call(this, {
                    validationExpression: /^[a-z][a-z\d_.]?/i,
                    maxLen: 2,
                    valueNormalizedMsg: "Portion Marking has been normalized.",
                    emptyValueMsg: PortionMarkingValidationProperty.emptyValueMsg,
                    valueTooLongMsg: "Portion Marking can only be 1 or 2 characters.",
                    invalidValueMsg: "Invalid Portion Marking."
                }, onRevalidate);
            }
        }, _super.prototype);
        vProto.type = "PortionMarkingValidationProperty";
        PortionMarkingValidationProperty.prototype = vProto;
        PortionMarkingValidationProperty.emptyValueMsg = "Portion Marking cannot be empty.";
        return PortionMarkingValidationProperty;
    }(ValidationProperty, PortionMarkingValidationProperty));
    
    (function (ClassificationValidator) {
        var vProto = {
            initialize: function() {
                this._types = new x_44813_util.JsTypeCommander();
                this._name = new NameValidationProperty(this.onRevalidate);
                this._portionMarking = new NameValidationProperty(this.onRevalidate);
                this._errorMessages = [NameValidationProperty.emptyValueMsg, PortionMarkingValidationProperty.emptyValueMsg];
                this._infoMessages = [];
                this._isValid = false;
            }
        };

        Object.defineProperty(vProto, "isValid", {
            /**
             * Returns true if the name and portion marking are both valid.
             * @type: {boolean}
             */
            get: function () { return this._isValid; },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(vProto, "name", {
            /**
             * Contains validation for the full classification name.
             */
            get: function () { return this._name; },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(vProto, "portionMarking", {
            /**
             * Contains validation for the portion marking.
             */
            get: function () { return this._portionMarking; },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(vProto, "errorMessages", {
            /**
             * Contains any error messages from the classification name and portion marking.
             */
            get: function () { return this._errorMessages; },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(vProto, "infoMessages", {
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
        vProto.onRevalidate = function () {
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
        vProto.set = function (name, portionMarking) {
            this._name.sourceValue = name;
            this._portionMarking.sourceValue = portionMarking;
        };

        /**
         * Sets name and portion marking according to GlideRecord fields.
         * @param {GlideRecord} gr The glide record containing security classification and portion marking.
         */
        vProto.setFromGr = function (gr) { this.set(gr.getValue('name'), gr.getValue('portion_marking')); };

        /**
         * Updates the name and portion marking fields if they are both valid.
         * @param {GlideRecord} gr Glide record to update.
         * @returns {boolean} True if fiields were update; otherwise, false if one of the properties were invalid or if no changes were made.
         */
        vProto.applyGrIfValid = function (gr) {
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
        vProto.type = "ClassificationValidator";
        ClassificationValidator.prototype = vProto;
    }(ClassificationValidator));
})(ClassificationValidator);