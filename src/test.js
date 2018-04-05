var ValidationProperty = (function () {
    var ValidationProperty = Class.create();
    var vProto = {
        initialize: function(config) {
            gs.info("base initializer invoked");
            gs.info(JSON.stringify(config));
            gs.info(JSON.stringify(this));
            this._types = new x_44813_util.types();
            gs.info("types created");
            this.isValid = false;
            this.sourceValue = "";
            this.normalizedValue = "";
            this.message = "";
            this._config = config;
            gs.info("Validating");
            this.validate(true);
        }
    };
    vProto.isChanged = function () {
        return !(this._validatedValue === this.sourceValue && this._types.isBoolean(this.isValid) && this._types.isString(this.normalizedValue) && this._types.isString(this.message));
    };
    vProto.toString = function () { return this._types.asString(this.sourceValue, ""); };
    vProto.validate = function (force) {
        gs.info("Validation invoked");
        this.sourceValue = this._types.asString(this.sourceValue, "");
        if (!(force || this.isChanged()))
            return;
        this.normalizedValue = this.sourceValue.trim();
        if (this.normalizedValue.length == 0) {
            this.isValid = false;
            this.message = this._config.emptyValueMsg;
            return false;
        }
        this.normalizedValue = this._types.asNormalizedString(this.normalizedValue);
        this.isValid = this._config.validationExpression.test(this.normalizedValue);
        if (this.isValid) {
            if (this.normalizedValue.length <= this._config.maxLen) {
                this.isValid = true;
                this.message = (this.sourceValue == this.normalizedValue) ? "" : this._config.valueNormalizedMsg;
                return true;
            }
            this.message = this._config.valueTooLongMsg;
        }
        else
            this.message = this._config.invalidValueMsg;
        this.isValid = false;
        return false;
    };
    vProto.name = 'ValidationProperty';
    gs.info("Setting prototype");
    ValidationProperty.prototype = vProto;
    return ValidationProperty;
}(x_44813_util));
gs.info("Okay 2");

var NameValidationProperty = (function (_super, x_44813_util) {
    var NameValidationProperty = Class.create();
    var vProto = {
        initialize: function() {
            gs.info("calling super initializer");
            _super.prototype.initialize.call(this, {
                validationExpression: /^[a-z][a-z\d_]*(\s+[a-z][a-z\d_]*)*$/i,
                maxLen: 12,
                valueNormalizedMsg: "Classification Name has been normalized.",
                emptyValueMsg: NameValidationProperty.emptyValueMsg,
                valueTooLongMsg: "Name cannot be greater than 12 characters.",
                invalidValueMsg: "Invalid Classification Name."
            });
            gs.info("super initializer called");
        }
    };
    vProto.name = 'NameValidationProperty';
    NameValidationProperty.prototype = Object.extendsObject(_super, vProto);
    NameValidationProperty.emptyValueMsg = "Classification Name cannot be empty.";
    return NameValidationProperty;
}(ValidationProperty, x_44813_util));
var PortionMarkingValidationProperty = (function (_super, x_44813_util) {
    var PortionMarkingValidationProperty = Class.create();
    var vProto = {
        initialize: function() {
            _super.prototype.initialize.call(this, {
                validationExpression: /^[a-z][a-z\d_.]?/i,
                maxLen: 2,
                valueNormalizedMsg: "Portion Marking has been normalized.",
                emptyValueMsg: PortionMarkingValidationProperty.emptyValueMsg,
                valueTooLongMsg: "Portion Marking can only be 1 or 2 characters.",
                invalidValueMsg: "Invalid Portion Marking."
            });
        }
    };
    vProto.name = 'PortionMarkingValidationProperty';
    PortionMarkingValidationProperty.prototype = Object.extendsObject(_super, vProto);
    PortionMarkingValidationProperty.emptyValueMsg = "Portion Marking cannot be empty.";
    return PortionMarkingValidationProperty;
}(ValidationProperty, x_44813_util));
gs.info("Okay 3");
var nvp = new NameValidationProperty();
gs.info(nvp.message);
var ClassificationValidator = (function (x_44813_util) {
    var ClassificationValidator = Class.create();
    var vProto = {
        initialize: function() {
            this._types = new x_44813_util.types();
            this.name = new NameValidationProperty();
            this.portionMarking = new PortionMarkingValidationProperty();
            this.errorMessages = [NameValidationProperty.emptyValueMsg, PortionMarkingValidationProperty.emptyValueMsg];
            this.errorMessages = [];
            this.infoMessages = [];
            this.isValid = false;
        }
    };
    vProto.asNameValidator = function (value) {
        if (this._types.derivesFrom(value, NameValidationProperty))
            return value;
        var result = new NameValidationProperty();
        result.sourceValue = value;
        result.validate();
        return result;
    };
    vProto.asPortionMarkingValidator = function (value) {
        if (this._types.derivesFrom(value, PortionMarkingValidationProperty))
            return value;
        var result = new PortionMarkingValidationProperty();
        result.sourceValue = value;
        result.validate();
        return result;
    };
    vProto.name = 'ClassificationValidator';
    ClassificationValidator.prototype = vProto;
    return ClassificationValidator;
}(x_44813_util));