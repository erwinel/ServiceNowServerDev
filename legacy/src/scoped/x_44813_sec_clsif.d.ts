export declare module x_44813_sec_clsif {
    interface IClassificationCache {
        byName: {
            [index: string]: string;
        };
        byPortionMarking: {
            [index: string]: string;
        };
        ordered: IDbClassificationMarking[];
    }
    class ClassificationUtil {
        private static __defaultPortionMarking;
        private static __classificationCache;
        private _types;
        readonly type: string;
        constructor();
        static createGlideRecord(): GlideRecord;
        getDefaultPortionMarking(): string;
        getAllClassifications: (force?: boolean) => IDbClassificationMarking[];
        getClassificationCache(force?: boolean): IClassificationCache;
        glideRecordToJSON(gr: GlideRecord): IDbClassificationMarking;
        static isCompliantClassificationName(value?: string | null, ignoreCase?: boolean): value is IClassificationName;
        static isCompliantPortionMarking(value?: string | null, ignoreCase?: boolean): value is IClassificationPM;
        static newClassificationValidator(): IClassificationValidator;
    }
    type IClassificationName = "UNCLASSIFIED" | "CONFIDENTIAL" | "RESTRICTED" | "SECRET" | "TOP SECRET";
    type IClassificationPM = "U" | "C" | "R" | "S" | "TS";
    interface IClassificationMarking {
        name: string;
        portion_marking: string;
    }
    interface IDbClassificationMarking extends IClassificationMarking {
        sys_id: string;
        order: number;
    }
    interface ICompliantClassificationMarking extends IClassificationMarking {
        name: IClassificationName;
        portion_marking: IClassificationPM;
    }
    interface IValidationProperty {
        readonly isValid: boolean;
        readonly normalizedValue: string;
        readonly message: string;
        sourceValue: string;
        validate(): boolean;
    }
    interface INameValidationProperty extends IValidationProperty {
        readonly CompliantClassificationName: IClassificationName | undefined;
    }
    interface IPortionMarkingValidationProperty extends IValidationProperty {
        readonly CompliantPortionMarking: IClassificationPM | undefined;
    }
    interface IClassificationValidator {
        readonly name: INameValidationProperty;
        readonly portionMarking: IPortionMarkingValidationProperty;
        readonly errorMessages: ReadonlyArray<string>;
        readonly infoMessages: ReadonlyArray<string>;
        readonly isValid: boolean;
        set(name: string, portionMarking: string): void;
        setFromGr(gr: GlideRecord): void;
        applyGrIfValid(gr: GlideRecord): boolean;
    }
}
