namespace x_44813_sec_clsif {
    /**
     * Settings for configurating base validator.
     */
    export interface ValidationConfig {
        /**
         * Regular expression for validating the normalized value.
         * @type {RegExp}
         */
        validationExpression: RegExp,

        /**
         * Maximum length.
         * @type {number}
         */
        maxLen: number,

        /**
         * Notification message to use when source value differs from normalized value.
         * @type {string}
         */
        valueNormalizedMsg: string,

        /**
         * Error message to use when source value is empty or contains only whitespace.
         * @type {string}
         */
        emptyValueMsg: string,

        /**
         * Error message to use when normalized value exceeds the maximum length.
         * @type {string}
         */
        valueTooLongMsg: string,

        /**
         * Error message to use when validation expression match fails.
         * @type {string}
         */
        invalidValueMsg: string
    };

    /**
     * Base interface for security classification name and portion marking pairs.
     */
    export interface classificationPair {
        /**
         * Full name of security classification.
         * @type {string}
         */
        name: string;

        /**
         * Portion marking for security classification.
         * @type {string}
         */
        portion_marking: string;
    }

    /**
     * Base class for property validation.
     */
    export abstract class ValidationProperty {
        protected _types = new x_44813_util.types();
        private _config: ValidationConfig;
        private _isValid: boolean = false;
        private _sourceValue: string = "";
        private _normalizedValue: string = "";
        private _message: string = "";
        private _parent: ClassificationValidator;

        /**
         * Indicates whether value is valid.
         * @type {boolean}
         */
        get isValid(): boolean { return this._isValid; }

        /**
         * Contains the normalized source value.
         * @type {string}
         */
        get normalizedValue(): string { return this._normalizedValue; }

        /**
         * Contains validation message.
         * @type {string}
         */
        get message(): string { return this._message; }

        /**
         * Source value to be validated
         * @type {string}
         */
        get sourceValue(): string { return this._sourceValue; }
        set sourceValue(value: string) {
            var s = this._types.asString(value, "");
            if (s === this._sourceValue)
                return;
            this._sourceValue = s;
            this.validate();
        }
        
        /**
         * Initializes a new ValidationProperty object.
         * @param config Validation configuration.
         * @param parent Parent object containing the value being validated.
         */
        constructor(config: ValidationConfig, parent: ClassificationValidator) {
            this._parent = parent;
            this._config = config;
            this.validate();
        }

        /**
         * Returns source value.
         */
        toString(): string { return this._types.asString(this.sourceValue, ""); }

        private validate() {
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
        }
    }

    /**
     * Validates classification full name.
     */
    export class NameValidationProperty extends ValidationProperty {
        static emptyValueMsg: string = "Classification Name cannot be empty.";
        constructor(parent: ClassificationValidator) {
            super({
                validationExpression: /^[a-z][a-z\d_]*(\s+[a-z][a-z\d_]*)*$/i,
                maxLen: 12,
                valueNormalizedMsg: "Classification Name has been normalized.",
                emptyValueMsg: NameValidationProperty.emptyValueMsg,
                valueTooLongMsg: "Name cannot be greater than 12 characters.",
                invalidValueMsg: "Invalid Classification Name."
            }, parent);
        }
        
        type: string = "NameValidationProperty";
    }

    /**
     * Validates portion marking.
     */
    export class PortionMarkingValidationProperty extends ValidationProperty {
        static emptyValueMsg: string = "Portion Marking cannot be empty.";
        constructor(parent: ClassificationValidator) {
            super({
                validationExpression:/^[a-z][a-z\d_.]?/i,
                maxLen: 2,
                valueNormalizedMsg: "Portion Marking has been normalized.",
                emptyValueMsg: PortionMarkingValidationProperty.emptyValueMsg,
                valueTooLongMsg: "Portion Marking can only be 1 or 2 characters.",
                invalidValueMsg: "Invalid Portion Marking."
            }, parent);
        }
        
        type: string = "PortionMarkingValidationProperty";
    }

    /**
     * Validates classification.
	 * @class
     */
    export class ClassificationValidator {
        private _types = new x_44813_util.types();
        private _name: NameValidationProperty = new NameValidationProperty(this);
        private _portionMarking: PortionMarkingValidationProperty = new NameValidationProperty(this);
        private _errorMessages: string[] = [ NameValidationProperty.emptyValueMsg, PortionMarkingValidationProperty.emptyValueMsg ];
        private _infoMessages: string[] = [ ];
        private _isValid: boolean = false;

        /**
         * Listing of compliant classifications.
         */
        static compliantClassifications: classificationPair[] = [
            { name: 'UNCLASSIFIED', portion_marking: 'U' },
            { name: 'CONFIDENTIAL', portion_marking: 'C' },
            { name: 'RESTRICTED', portion_marking: 'R' },
            { name: 'SECRET', portion_marking: 'S' },
            { name: 'TOP SECRET', portion_marking: 'TS' }
        ];

        /**
         * Hash of classifications by their full name.
         */
        static byName: { [key: string]: string } = function() {
            var r: { [key: string]: string } = {};
            ClassificationValidator.compliantClassifications.forEach(function(a) {
                r[a.name] = a.portion_marking;
            });
            return r;
        }();

        /**
         * Hash of classifications by their portion markings.
         */
        static byPortionMarking: { [key: string]: string } = function() {
            var r: { [key: string]: string } = {};
            ClassificationValidator.compliantClassifications.forEach(function(a) {
                r[a.portion_marking] = a.name;
            });
            return r;
        }();

        /**
         * Returns true if the name and portion marking are both valid.
         * @type: {boolean}
         */
        get isValid(): boolean { return this._isValid; }

        /**
         * Contains validation for the full classification name.
         */
        get name(): NameValidationProperty { return this._name; }

        /**
         * Contains validation for the portion marking.
         */
        get portionMarking(): PortionMarkingValidationProperty { return this._portionMarking; }

        /**
         * Contains any error messages from the classification name and portion marking.
         */
        get errorMessages(): string[] { return this._errorMessages; }

        /**
         * Contains any informational messages from the classification name and portion marking.
         */
        get infoMessages(): string[] { return this._infoMessages; }

        /**
         * Updates the isValid property and the error and informational messages.
         */
        revalidate(): void {
            var errorMessages = [], infoMessages = [];
            var isValid = false;
            if (this._name.isValid) {
                if (this._name.message.length > 0)
                    infoMessages.push(this._name.message);
                if (this._portionMarking.isValid) {
                    if (this._portionMarking.message.length > 0)
                        infoMessages.push(this._portionMarking.message);
                    isValid = true;
                } else
                    errorMessages.push(this._portionMarking.message);
            } else {
                errorMessages.push(this._name.message);
                if (this._portionMarking.isValid) {
                    if (this._portionMarking.message.length > 0)
                        infoMessages.push(this._portionMarking.message);
                } else
                    errorMessages.push(this._portionMarking.message);
            }

            let i: number;
            if (this._errorMessages.length > errorMessages.length) {
                while (this._errorMessages.length > errorMessages.length)
                    this._errorMessages.pop();
                for (i = 0; i < errorMessages.length; i++)
                    this._errorMessages[i] = errorMessages[i];
            } else {
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
            } else {
                for (i = 0; i < this._infoMessages.length; i++)
                    this._infoMessages[i] = infoMessages[i];
                for (i = this._infoMessages.length; i < infoMessages.length; i++)
                    this._infoMessages.push(infoMessages[i]);
            }
            this._isValid = isValid;
        }

        /**
         * Sets the name and portion marking.
         */
        set(name: string, portionMarking: string) {
            this._name.sourceValue = name;
            this._portionMarking.sourceValue = portionMarking;
        }

        /**
         * Sets name and portion marking according to GlideRecord fields.
         * @param {GlideRecord} gr The glide record containing security classification and portion marking.
         */
        setFromGr(gr: GlideRecord): void { this.set(gr.getValue('name'), gr.getValue('portion_marking')); }
        
        /**
         * Updates the name and portion marking fields if they are both valid.
         * @param {GlideRecord} gr Glide record to update.
         * @returns {boolean} True if fiields were update; otherwise, false if one of the properties were invalid or if no changes were made.
         */
        applyGrIfValid(gr: GlideRecord): boolean {
			if (!this._isValid || (this.name.normalizedValue == gr.getValue('name') && this.portionMarking.normalizedValue == gr.getValue('portion_marking')))
				return false;
			
			gr.setValue('name', this.name.normalizedValue);
			gr.setValue('portion_marking', this.portionMarking.normalizedValue);
			return true;
        }
        
        type: string = "ClassificationValidator";
    }
}