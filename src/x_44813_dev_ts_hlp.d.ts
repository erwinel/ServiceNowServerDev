/// <reference path="base.d.ts" />
declare namespace x_44813_dev_ts_hlp {
    interface DtsScopeInit extends Omit<DTSHelper.IDtsScope, "scope" | "inactive" | "description" | "getPackage" | "getPackageIds" | "type">, Partial<Pick<DTSHelper.IDtsScope, "inactive" | "description">> {
        packages?: {
            [id: string]: DtsPackageInit;
        };
    }
    interface IDtsScopePrototype extends ICustomClassPrototype2<DTSHelper.IDtsScope, IDtsScopePrototype, "DTSHelper.Scope", DTSHelper, DtsScopeInit>, DTSHelper.IDtsScope {
        _packages: {
            [id: string]: DTSHelper.DtsPackage;
        };
    }
    interface DtsPackageInit extends Omit<DTSHelper.IDtsPackage, "id" | "inactive" | "getTable" | "getTableNames" | "type">, Partial<Pick<DTSHelper.IDtsPackage, "inactive">> {
        tables?: {
            [name: string]: DtsTableInit;
        };
    }
    interface IDtsPackagePrototype extends ICustomClassPrototype2<DTSHelper.IDtsPackage, IDtsPackagePrototype, "DTSHelper.Package", DTSHelper.DtsScope, DtsPackageInit>, DTSHelper.IDtsPackage {
        _tables: {
            [name: string]: DTSHelper.DtsTable;
        };
    }
    interface IDtsGlideTypeInit extends Omit<DTSHelper.IDtsGlideType, "name" | "scalar_type" | "getInheritedType" | "getInheritedTypeNames" | "type" | "parent">, Partial<Pick<DTSHelper.IDtsGlideType, "scalar_type">> {
        glide_types?: {
            [name: string]: IDtsGlideTypeInit;
        };
        object_types?: {
            [name: string]: IDtsObjectTypeInit;
        };
    }
    interface IDtsGlideTypePrototype extends ICustomClassPrototype2<DTSHelper.IDtsGlideType, IDtsGlideTypePrototype, "DTSHelper.GlideType", DTSHelper | DTSHelper.DtsGlideType, IDtsGlideTypeInit>, DTSHelper.IDtsGlideType {
        _inherited: {
            [name: string]: DTSHelper.DtsGlideType | DTSHelper.DtsObjectType;
        };
    }
    interface IDtsObjectTypeInit extends Omit<DTSHelper.IDtsObjectType, "name" | "scalar_type" | "use_original_value" | "hidden" | "type" | "glide_type">, Partial<Pick<DTSHelper.IDtsObjectType, "scalar_type" | "use_original_value" | "hidden">> {
    }
    interface IDtsObjectTypePrototype extends ICustomClassPrototype2<DTSHelper.IDtsObjectType, IDtsObjectTypePrototype, "DTSHelper.ObjectType", DTSHelper.DtsGlideType, IDtsObjectTypeInit>, DTSHelper.IDtsObjectType {
    }
    interface DtsColumnInit extends Omit<DTSHelper.IDtsColumn, "element" | "inactive" | "read_only" | "mandatory" | "col_type" | "type">, Partial<Pick<DTSHelper.IDtsColumn, "inactive" | "read_only" | "mandatory">> {
        type: string;
    }
    interface IDtsColumnPrototype extends ICustomClassPrototype2<DTSHelper.IDtsColumn, IDtsColumnPrototype, "DTSHelper.Column", DTSHelper.DtsTable, DtsColumnInit>, DTSHelper.IDtsColumn {
    }
    interface DtsTableInit extends Omit<DTSHelper.IDtsTable, "name" | "fullName" | "getColumn" | "getColumnNames" | "getInheritedTable" | "getInheritedTableNames" | "type"> {
        columns?: {
            [element: string]: DtsColumnInit;
        };
    }
    interface IDtsTablePrototype extends ICustomClassPrototype2<DTSHelper.IDtsTable, IDtsTablePrototype, "DTSHelper.Table", DTSHelper.DtsPackage | DTSHelper.DtsTable, DtsTableInit>, DTSHelper.IDtsTable {
        _columns: {
            [element: string]: DTSHelper.DtsColumn;
        };
        _inherited: {
            [name: string]: DTSHelper.DtsTable;
        };
    }
    export namespace DTSHelper {
        interface IDtsScope extends ICustomClassBase<IDtsScope, "DTSHelper.Scope"> {
            helper: DTSHelper;
            scope: string;
            /**
             * Unique identifier taken from the ID (source) field of the Application (sys_scope) table.
             * @type {string}
             * @memberof IDtsScope
             */
            id: string;
            inactive: boolean;
            /**
             * The display name of the scope.
             * @type {string}
             * @memberof IDtsScope
             */
            name: string;
            /**
             * The description of the scope.
             * @type {string}
             * @memberof IDtsScope
             */
            description: string;
            getPackage(id: string): DtsPackage | undefined;
            getPackageIds(): string[];
        }
        interface DtsScopeConstructor extends CustomClassConstructor2<IDtsScope, IDtsScopePrototype, DtsScope, DTSHelper, DtsScopeInit> {
            new (helper: DTSHelper, def: DtsScopeInit): DtsScope;
            (helper: DTSHelper, def: DtsScopeInit): DtsScope;
        }
        type DtsScope = Readonly<IDtsScope>;
        interface IDtsPackage extends ICustomClassBase<IDtsPackage, "DTSHelper.Package"> {
            id: string;
            inactive: boolean;
            name: string;
            scope: DtsScope;
            getTable(name: string): DtsTable | undefined;
            getTableNames(): string[];
        }
        interface DtsPackageConstructor extends CustomClassConstructor2<IDtsPackage, IDtsPackagePrototype, DtsPackage, DtsScope, DtsPackageInit> {
            new (scope: DtsScope, def: DtsPackageInit): DtsPackage;
            (scope: DtsScope, def: DtsPackageInit): DtsPackage;
        }
        type DtsPackage = Readonly<IDtsPackage>;
        type DtsScalarType = 'integer' | 'string' | 'boolean' | 'float' | 'longint' | 'decimal' | 'datetime' | 'date' | 'time' | 'GUID';
        interface IDtsGlideType extends ICustomClassBase<IDtsGlideType, "DTSHelper.GlideType"> {
            parent: DTSHelper | DtsGlideType;
            name: string;
            /**
             * The scalar type represented the object type.
             * @type {DtsScalarType}
             * @memberof IDtsGlideType
             */
            scalar_type: DtsScalarType;
            getInheritedType(name: string): DtsGlideType | DtsObjectType | undefined;
            getInheritedTypeNames(): string[];
        }
        interface DtsGlideTypeConstructor extends CustomClassConstructor2<IDtsGlideType, IDtsGlideTypePrototype, DtsGlideType, DTSHelper | DtsGlideType, IDtsGlideTypeInit> {
            new (parent: DTSHelper | DtsGlideType, def: IDtsGlideTypeInit): DtsGlideType;
            (parent: DTSHelper | DtsGlideType, def: IDtsGlideTypeInit): DtsGlideType;
        }
        type DtsGlideType = Readonly<IDtsGlideType>;
        interface IDtsObjectType extends ICustomClassBase<IDtsObjectType, "DTSHelper.ObjectType"> {
            glide_type: DtsGlideType;
            name: string;
            /**
             * The display name of the object type.
             * @type {string}
             * @memberof IDtsObjectType
             */
            sys_name: string;
            /**
             * The scalar type represented the object type.
             * @type {DtsScalarType}
             * @memberof IDtsObjectType
             */
            scalar_type: DtsScalarType;
            /**
             * The maximum length of the value.
             * @type {number}
             * @memberof IDtsObjectType
             */
            scalar_length?: number;
            /**
             * Indicates whether to use the original value when using objects of the current type.
             * @type {boolean}
             * @memberof IDtsObjectType
             */
            use_original_value: boolean;
            /**
             * Indicates whether the object type is hidden from normal user selection.
             * @type {boolean}
             * @memberof IDtsObjectType
             */
            hidden: boolean;
        }
        interface DtsObjectTypeConstructor extends CustomClassConstructor2<IDtsObjectType, IDtsObjectTypePrototype, DtsObjectType, DtsGlideType, IDtsObjectTypeInit> {
            new (parent: DtsGlideType, def: IDtsObjectTypeInit): DtsObjectType;
            (parent: DtsGlideType, def: IDtsObjectTypeInit): DtsObjectType;
        }
        type DtsObjectType = Readonly<IDtsObjectType>;
        interface IDtsColumn extends ICustomClassBase<IDtsColumn, "DTSHelper.Column"> {
            table: DtsTable;
            element: string;
            label: string;
            col_type: DtsObjectType;
            max_length?: number;
            inactive: boolean;
            read_only: boolean;
            mandatory: boolean;
        }
        interface DtsColumnConstructor extends CustomClassConstructor2<IDtsColumn, IDtsColumnPrototype, DtsColumn, DtsTable, DtsColumnInit> {
            new (table: DtsTable, def: DtsColumnInit): DtsColumn;
            (table: DtsTable, def: DtsColumnInit): DtsColumn;
        }
        type DtsColumn = Readonly<IDtsColumn>;
        interface IDtsTable extends ICustomClassBase<IDtsTable, "DTSHelper.Table"> {
            parent: DtsPackage | DtsTable;
            name: string;
            label: string;
            fullName: string;
            getColumn(element: string): DtsColumn | undefined;
            getColumnNames(): string[];
            getInheritedTable(name: string): DtsTable | undefined;
            getInheritedTableNames(): string[];
        }
        interface DtsTableConstructor extends CustomClassConstructor2<IDtsTable, IDtsTablePrototype, DtsTable, DtsPackage | DtsTable, DtsTableInit> {
            new (parent: DtsPackage | DtsTable, def: DtsTableInit): DtsTable;
            (parent: DtsPackage | DtsTable, def: DtsTableInit): DtsTable;
        }
        type DtsTable = Readonly<IDtsTable>;
    }
    export namespace Obsoleted {
        export interface IDtsPackageOld extends ICustomClassBase<IDtsPackageOld, "DtsPackage"> {
            getSysId(): string;
            getId(): string;
            isActive(): boolean;
            getName(): string;
            getScope(): string;
            getScopeShortDescription(): string;
            getScopeSysId(): string;
            getScopeId(): string;
            isScopeActive(): boolean;
            getScopeName(): string;
        }
        interface IDtsPackagePrototype extends ICustomClassPrototype2<IDtsPackageOld, IDtsPackagePrototype, "DtsPackage", sys_packageFields, sys_scopeFields>, IDtsPackageOld {
            _sys_id: string;
            _id: string;
            _active: boolean;
            _name: string;
            _scope: string;
        }
        export interface DtsPackage extends Readonly<IDtsPackageOld> {
        }
        export interface DtsPackageConstructor extends CustomClassConstructor2<IDtsPackageOld, IDtsPackagePrototype, DtsPackage, sys_packageFields, sys_scopeFields> {
            new (package: sys_packageFields, scope: sys_scopeFields): DtsPackage;
            (package: sys_packageFields, scope: sys_scopeFields): DtsPackage;
            get(package: sys_packageFields, scope: sys_scopeFields): DtsPackage;
        }
        export interface IDtsTableOld extends ICustomClassBase<IDtsTableOld, "DtsTable"> {
            getParent(): DtsTable | undefined;
            getPackage(): DtsPackage;
            getFullName(): string;
            getTableName(): string;
            getTableDisplayName(): string;
        }
        interface IDtsTablePrototype extends ICustomClassPrototype1<IDtsTableOld, IDtsTablePrototype, "DtsTable", sys_db_objectGlideRecord | string>, IDtsTableOld {
            _table: sys_db_objectGlideRecord;
            _parent?: DtsTable | null;
            _package?: DtsPackage;
        }
        export interface DtsTable extends Readonly<IDtsTableOld> {
        }
        export interface DtsTableConstructor extends CustomClassConstructor1<IDtsTableOld, IDtsTablePrototype, DtsTable, sys_db_objectGlideRecord | string> {
            new (table: sys_db_objectGlideRecord | string): DtsTable;
            (table: sys_db_objectGlideRecord | string): DtsTable;
            get(package: sys_db_objectGlideRecord | string): DtsTable;
            getTableBase(): IDtsTableOld;
            getExtendableTableBase(): IDtsTableOld;
        }
        export {};
    }
    export interface IDTSHelper extends ICustomClassBase<IDTSHelper, "DTSHelper"> {
        getObjectType(name: string): DTSHelper.IDtsObjectType;
        getScope(scope: string): DTSHelper.IDtsScope;
        getScopeNames(): string[];
        getPackage(id: string): DTSHelper.IDtsPackage;
        getPackageNames(scope?: string): string[];
    }
    interface IDTSHelperPrototype extends ICustomClassPrototype0<IDTSHelper, IDTSHelperPrototype, "DTSHelper">, IDTSHelper {
    }
    export type DTSHelper = Readonly<IDTSHelper>;
    export interface DTSHelperConstructor extends CustomClassConstructor0<IDTSHelper, IDTSHelperPrototype, DTSHelper> {
        new (): DTSHelper;
        (): DTSHelper;
        readonly TABLE_NAME_BASE: '(base)';
        readonly TABLE_NAME_EXTENDABLE: '(extendable)';
    }
    export const DTSHelper: DTSHelperConstructor;
    export {};
}
