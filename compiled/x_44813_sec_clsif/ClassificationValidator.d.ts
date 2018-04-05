declare namespace x_44813_sec_clsif {
    /**
     * Settings for configurating base validator.
     */
    interface ValidationConfig {
        /**
         * Regular expression for validating the normalized value.
         * @type {RegExp}
         */
        validationExpression: RegExp;
        /**
         * Maximum length.
         * @type {number}
         */
        maxLen: number;
        /**
         * Notification message to use when source value differs from normalized value.
         * @type {string}
         */
        valueNormalizedMsg: string;
        /**
         * Error message to use when source value is empty or contains only whitespace.
         * @type {string}
         */
        emptyValueMsg: string;
        /**
         * Error message to use when normalized value exceeds the maximum length.
         * @type {string}
         */
        valueTooLongMsg: string;
        /**
         * Error message to use when validation expression match fails.
         * @type {string}
         */
        invalidValueMsg: string;
    }
    /**
     * Base interface for security classification name and portion marking pairs.
     */
    interface classificationPair {
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
    abstract class ValidationProperty {
        protected _types: x_44813_util.types;
        private _config;
        private _isValid;
        private _sourceValue;
        private _normalizedValue;
        private _message;
        private _parent;
        /**
         * Indicates whether value is valid.
         * @type {boolean}
         */
        readonly isValid: boolean;
        /**
         * Contains the normalized source value.
         * @type {string}
         */
        readonly normalizedValue: string;
        /**
         * Contains validation message.
         * @type {string}
         */
        readonly message: string;
        /**
         * Source value to be validated
         * @type {string}
         */
        sourceValue: string;
        /**
         * Initializes a new ValidationProperty object.
         * @param config Validation configuration.
         * @param parent Parent object containing the value being validated.
         */
        constructor(config: ValidationConfig, parent: ClassificationValidator);
        /**
         * Returns source value.
         */
        toString(): string;
        private validate();
    }
    /**
     * Validates classification full name.
     */
    class NameValidationProperty extends ValidationProperty {
        static emptyValueMsg: string;
        constructor(parent: ClassificationValidator);
        type: string;
    }
    /**
     * Validates portion marking.
     */
    class PortionMarkingValidationProperty extends ValidationProperty {
        static emptyValueMsg: string;
        constructor(parent: ClassificationValidator);
        type: string;
    }
    /**
     * Validates classification.
     * @class
     */
    class ClassificationValidator {
        private _types;
        private _name;
        private _portionMarking;
        private _errorMessages;
        private _infoMessages;
        private _isValid;
        /**
         * Listing of compliant classifications.
         */
        static compliantClassifications: classificationPair[];
        /**
         * Hash of classifications by their full name.
         */
        static byName: {
            [key: string]: string;
        };
        /**
         * Hash of classifications by their portion markings.
         */
        static byPortionMarking: {
            [key: string]: string;
        };
        /**
         * Returns true if the name and portion marking are both valid.
         * @type: {boolean}
         */
        readonly isValid: boolean;
        /**
         * Contains validation for the full classification name.
         */
        readonly name: NameValidationProperty;
        /**
         * Contains validation for the portion marking.
         */
        readonly portionMarking: PortionMarkingValidationProperty;
        /**
         * Contains any error messages from the classification name and portion marking.
         */
        readonly errorMessages: string[];
        /**
         * Contains any informational messages from the classification name and portion marking.
         */
        readonly infoMessages: string[];
        /**
         * Updates the isValid property and the error and informational messages.
         */
        revalidate(): void;
        /**
         * Sets the name and portion marking.
         */
        set(name: string, portionMarking: string): void;
        /**
         * Sets name and portion marking according to GlideRecord fields.
         * @param {GlideRecord} gr The glide record containing security classification and portion marking.
         */
        setFromGr(gr: GlideRecord): void;
        /**
         * Updates the name and portion marking fields if they are both valid.
         * @param {GlideRecord} gr Glide record to update.
         * @returns {boolean} True if fiields were update; otherwise, false if one of the properties were invalid or if no changes were made.
         */
        applyGrIfValid(gr: GlideRecord): boolean;
        type: string;
    }
}
