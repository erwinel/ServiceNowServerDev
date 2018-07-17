import { x_44813_util } from "../../compiled/scoped/x_44813_util";

export module x_44813_sec_clsif {
    export interface IClassificationCache {
        byName: { [index: string]: string };
        byPortionMarking: { [index: string]: string };
        ordered: IDbClassificationMarking[]
    }
    export class ClassificationUtil {
        private static __defaultPortionMarking: string|undefined = undefined;
        private static __classificationCache: IClassificationCache = {
            byName: {},
            byPortionMarking: {},
            ordered: []
        };
        private _types: x_44813_util.JsTypeCommander;
        readonly type: string = "ClassificationUtil";
        constructor() {
            this._types = new x_44813_util.JsTypeCommander();
        }
        static createGlideRecord(): GlideRecord { return new GlideRecord(Constants.tableName); }
        getDefaultPortionMarking(): string {
            if (this._types.isString(ClassificationUtil.__defaultPortionMarking))
                return ClassificationUtil.__defaultPortionMarking;
            let s: string = gs.getProperty(Constants.settingsName, '').trim();
            if (s.length == 0) {
                ClassificationUtil.__defaultPortionMarking = Constants.compliantClassifications[0].portion_marking;
                gs.setProperty(Constants.settingsName, ClassificationUtil.__defaultPortionMarking);
            }
            else
                ClassificationUtil.__defaultPortionMarking = s;
            return ClassificationUtil.__defaultPortionMarking;
        }
        getAllClassifications = function (force?: boolean): IDbClassificationMarking[] {
            let cache: IClassificationCache = this.getClassificationCache(force);
            return cache.ordered;
        }
        getClassificationCache(force?: boolean): IClassificationCache {
            if (ClassificationUtil.__classificationCache.ordered.length > 0 && !force)
                return {
                    byName: ClassificationUtil.__classificationCache.byName,
                    byPortionMarking: ClassificationUtil.__classificationCache.byPortionMarking,
                    ordered: ClassificationUtil.__classificationCache.ordered
                };
            var gr = ClassificationUtil.createGlideRecord();
            gr.query();
            let allClassifications: IDbClassificationMarking[] = [];
            while (gr.next()) {
                let obj: IDbClassificationMarking = this.glideRecordToJSON(gr);
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
            allClassifications.filter(function(this: x_44813_util.JsTypeCommander, a: IDbClassificationMarking) { return this.isNil(ClassificationUtil.__classificationCache.byPortionMarking[a.name]); }, this._types)
                .sort(function(a: IDbClassificationMarking) { return a.order; })
                .concat(
                    allClassifications.filter(function(this: x_44813_util.JsTypeCommander, a: IDbClassificationMarking) { return !this.isNil(ClassificationUtil.__classificationCache.byPortionMarking[a.name]); }, this._types)
                        .sort(function(a: IDbClassificationMarking) { return a.order; })
                ).forEach(function(a: IDbClassificationMarking, i: number) {
                    let o: number = (i + 1) * 100;
                    if (a.order == o)
                        return;
                    gr = ClassificationUtil.createGlideRecord();
                    gr.get(a.sys_id);
                    gr.setValue(Constants.fieldNames.order, o);
                    gr.update();
                    a.order = o;
                });
            ClassificationUtil.__classificationCache.ordered = allClassifications.sort(function(a: IDbClassificationMarking) { return a.order; });
            return {
                byName: ClassificationUtil.__classificationCache.byName,
                byPortionMarking: ClassificationUtil.__classificationCache.byPortionMarking,
                ordered: ClassificationUtil.__classificationCache.ordered
            };
        }

        glideRecordToJSON(gr: GlideRecord) : IDbClassificationMarking {
            return {
                order: this._types.asNumber(gr.getValue(Constants.fieldNames.order)),
                sys_id: this._types.asString(gr.getValue(Constants.fieldNames.sysId)),
                name: this._types.asString(gr.getValue(Constants.fieldNames.name)),
                portion_marking: this._types.asString(gr.getValue(Constants.fieldNames.portionMarking))
            };
        }

        static isCompliantClassificationName(value?: string|null, ignoreCase?: boolean): value is IClassificationName {
            if (typeof(value) != "string")
                return false;
            if (typeof(ignoreCase) == "boolean" && ignoreCase == true)
                value = value.toUpperCase();
            return Constants.compliantClassifications.filter((a: IClassificationMarking) => { return a.name == value; }).length > 0;
        }

        static isCompliantPortionMarking(value?: string|null, ignoreCase?: boolean): value is IClassificationPM {
            if (typeof(value) != "string")
                return false;
            if (typeof(ignoreCase) == "boolean" && ignoreCase == true)
                value = value.toUpperCase();
            return Constants.compliantClassifications.filter((a: IClassificationMarking) => { return a.portion_marking == value; }).length > 0;
        }

        static newClassificationValidator(): IClassificationValidator { return new Constants.ClassificationValidator(); }
    }

    export type IClassificationName = "UNCLASSIFIED"|"CONFIDENTIAL"|"RESTRICTED"|"SECRET"|"TOP SECRET";
    export type IClassificationPM = "U"|"C"|"R"|"S"|"TS";
    export interface IClassificationMarking {
        name: string,
        portion_marking: string
    }
    export interface IDbClassificationMarking extends IClassificationMarking {
        sys_id: string,
        order: number
    }
    export interface ICompliantClassificationMarking extends IClassificationMarking { name: IClassificationName, portion_marking: IClassificationPM }
    export interface IValidationProperty {
        readonly isValid: boolean;
        readonly normalizedValue: string;
        readonly message: string;
        sourceValue: string;
        validate(): boolean;
    }

    export interface INameValidationProperty extends IValidationProperty {
        readonly CompliantClassificationName: IClassificationName|undefined;
    }

    export interface IPortionMarkingValidationProperty extends IValidationProperty {
        readonly CompliantPortionMarking: IClassificationPM|undefined;
    }

    export interface IClassificationValidator {
        readonly name: INameValidationProperty;
        readonly portionMarking: IPortionMarkingValidationProperty;
        readonly errorMessages: ReadonlyArray<string>;
        readonly infoMessages: ReadonlyArray<string>;
        readonly isValid: boolean;
        set(name: string, portionMarking: string): void;
        setFromGr(gr: GlideRecord): void;
        applyGrIfValid(gr: GlideRecord): boolean;
    }
    
    interface IValidationConfig {
        validationExpression: RegExp;
        maxLen: number;
        valueNormalizedMsg: string;
        emptyValueMsg: string;
        valueTooLongMsg: string;
        invalidValueMsg: string;
    }

    namespace Constants {
        export const tableName: string = "x_44813_sec_clsif_definition";
        export const settingsName: string = "x_44813_sec_clsif.default_classification";
        export const fieldNames = {
            sysId: "sys_id",
            name: "name",
            portionMarking: "portion_marking",
            order: "order",
            active: "active"
        };
        export const compliantClassifications: ReadonlyArray<ICompliantClassificationMarking> = [
            { name: "UNCLASSIFIED", portion_marking: "U" },
            { name: "CONFIDENTIAL", portion_marking: "C" },
            { name: "RESTRICTED", portion_marking: "R" },
            { name: "SECRET", portion_marking: "S" },
            { name: "TOP SECRET", portion_marking: "TS" }
        ];
        abstract class ValidationProperty implements IValidationProperty {
            private _types: x_44813_util.JsTypeCommander;
            private _onRevalidate: Function;
            private _parent: ClassificationValidator;
            
            private _config: IValidationConfig;
            protected get config() : IValidationConfig { return this._config; }

            private _isValid : boolean;
            public get isValid() : boolean { return this._isValid; }
            
            private _normalizedValue : string;
            public get normalizedValue() : string { return this._normalizedValue; }
            
            private _message : string;
            public get message() : string { return this._message; }
            
            private _sourceValue : string;
            public get sourceValue() : string {
                return this._sourceValue;
            }
            public set sourceValue(value : string) {
                var s = this._types.asString(value, "");
                if (s === this._sourceValue)
                    return;
                this._sourceValue = s;
                this.validate();
            }
            
            constructor(config: IValidationConfig, onRevalidate: Function) {
                this._types = new x_44813_util.JsTypeCommander();
                this._isValid = false;
                this._sourceValue = "";
                this._normalizedValue = "";
                this._message = "";
                this._onRevalidate = onRevalidate;
                this._config = config;
            }

            validate(): boolean {
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
            }
        }

        export class NameValidationProperty extends ValidationProperty implements INameValidationProperty {
            static readonly emptyValueMsg: string = "Classification Name cannot be empty.";
            get CompliantClassificationName(): IClassificationName|undefined {
                if (ClassificationUtil.isCompliantClassificationName(this.normalizedValue))
                    return this.normalizedValue;
            }
            constructor(onRevalidate: Function) {
                super({
                    validationExpression: /^[a-z][a-z\d_]*(\s+[a-z][a-z\d_]*)*$/i,
                    maxLen: 12,
                    valueNormalizedMsg: "Classification Name has been normalized.",
                    emptyValueMsg: NameValidationProperty.emptyValueMsg,
                    valueTooLongMsg: "Name cannot be greater than 12 characters.",
                    invalidValueMsg: "Invalid Classification Name."
                }, onRevalidate);
            }
        }

        export class PortionMarkingValidationProperty extends ValidationProperty implements IPortionMarkingValidationProperty {
            static readonly emptyValueMsg: string = "Portion Marking cannot be empty.";
            get CompliantPortionMarking(): IClassificationPM|undefined {
                if (ClassificationUtil.isCompliantPortionMarking(this.normalizedValue))
                    return this.normalizedValue;
            }
            constructor(onRevalidate: Function) {
                super({
                    validationExpression: /^[a-z][a-z\d_.]?/i,
                    maxLen: 2,
                    valueNormalizedMsg: "Portion Marking has been normalized.",
                    emptyValueMsg: PortionMarkingValidationProperty.emptyValueMsg,
                    valueTooLongMsg: "Portion Marking can only be 1 or 2 characters.",
                    invalidValueMsg: "Invalid Portion Marking."
                }, onRevalidate);
            }
        }
        
        export class ClassificationValidator implements IClassificationValidator {
            private _types: x_44813_util.JsTypeCommander;

            private _name : NameValidationProperty;
            public get name() : NameValidationProperty { return this._name; }
            
            private _portionMarking : PortionMarkingValidationProperty;
            public get portionMarking() : PortionMarkingValidationProperty { return this._portionMarking; }
            
            private _errorMessages : string[];
            public get errorMessages() : ReadonlyArray<string> { return this._errorMessages; }
            
            private _infoMessages : string[];
            public get infoMessages() : ReadonlyArray<string> { return this._infoMessages; }
            
            private _isValid : boolean;
            public get isValid() : boolean { return this._isValid; }
            
            constructor() {
                this._types = new x_44813_util.JsTypeCommander();
                this._name = new NameValidationProperty(this.revalidate);
                this._portionMarking = new PortionMarkingValidationProperty(this.revalidate);
                this._errorMessages = [NameValidationProperty.emptyValueMsg, PortionMarkingValidationProperty.emptyValueMsg];
                this._infoMessages = [];
                this._isValid = false;
            }

            public revalidate(): void {
                let errorMessages: string[] = [], infoMessages = [];
                let isValid: boolean = false;
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
                let i: number;
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
            }

            set(name: string, portionMarking: string): void {
                this._name.sourceValue = name;
                this._portionMarking.sourceValue = portionMarking;
            }

            setFromGr(gr: GlideRecord): void {
                this.set(gr.getValue("name"), gr.getValue("portion_marking"));
            }

            applyGrIfValid(gr: GlideRecord): boolean {
                if (!this._isValid || (this.name.normalizedValue == gr.getValue("name") && this.portionMarking.normalizedValue == gr.getValue("portion_marking")))
                    return false;
                gr.setValue("name", this.name.normalizedValue);
                gr.setValue("portion_marking", this.portionMarking.normalizedValue);
                return true;
            }

            static byName(): { [index: string]: string } {
                let r: { [index: string]: string } = { };
                compliantClassifications.forEach(function (a) {
                    r[a.name] = a.portion_marking;
                });
                return r;
            }

            static byPortionMarking(): { [index: string]: string } {
                let r: { [index: string]: string } = { };
                compliantClassifications.forEach(function (a) {
                    r[a.portion_marking] = a.name;
                });
                return r;
            }
        }
    }
}