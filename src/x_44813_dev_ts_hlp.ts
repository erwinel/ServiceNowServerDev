/// <reference path="../ServiceNowTypings/ServerScoped/base.d.ts" />

namespace x_44813_dev_ts_hlp {
    interface DtsScopeInit extends Omit<DTSHelper.IDtsScope, "scope" | "inactive" | "description" | "getPackage" | "getPackageIds" | "type">, Partial<Pick<DTSHelper.IDtsScope, "inactive" | "description">> {
        packages?: { [id: string]: DtsPackageInit; };
    }

    interface IDtsScopePrototype extends ICustomClassPrototype2<DTSHelper.IDtsScope, IDtsScopePrototype, "DTSHelper.Scope", DTSHelper, DtsScopeInit>, DTSHelper.IDtsScope {
        _packages: { [id: string]: DTSHelper.DtsPackage; };
    }

    interface DtsPackageInit extends Omit<DTSHelper.IDtsPackage, "id" | "inactive" | "getTable" | "getTableNames" | "type">, Partial<Pick<DTSHelper.IDtsPackage, "inactive">> {
        tables?: { [name: string]: DtsTableInit; };
    }

    interface IDtsPackagePrototype extends ICustomClassPrototype2<DTSHelper.IDtsPackage, IDtsPackagePrototype, "DTSHelper.Package", DTSHelper.DtsScope, DtsPackageInit>, DTSHelper.IDtsPackage {
        _tables: { [name: string]: DTSHelper.DtsTable; };
    }

    interface IDtsGlideTypeInit extends Omit<DTSHelper.IDtsGlideType, "name" | "scalar_type" | "getInheritedType" | "getInheritedTypeNames" | "type" | "parent">,
        Partial<Pick<DTSHelper.IDtsGlideType, "scalar_type">> {
        glide_types?: { [name: string]: IDtsGlideTypeInit; }
        object_types?: { [name: string]: IDtsObjectTypeInit; }
    }

    interface IDtsGlideTypePrototype extends ICustomClassPrototype2<DTSHelper.IDtsGlideType, IDtsGlideTypePrototype, "DTSHelper.GlideType", DTSHelper | DTSHelper.DtsGlideType, IDtsGlideTypeInit>, DTSHelper.IDtsGlideType {
        _inherited: { [name: string]: DTSHelper.DtsGlideType | DTSHelper.DtsObjectType; };
    }

    interface IDtsObjectTypeInit extends Omit<DTSHelper.IDtsObjectType, "name" | "scalar_type" | "use_original_value" | "hidden" | "type" | "glide_type">,
        Partial<Pick<DTSHelper.IDtsObjectType, "scalar_type" | "use_original_value" | "hidden">> {
    }

    interface IDtsObjectTypePrototype extends ICustomClassPrototype2<DTSHelper.IDtsObjectType, IDtsObjectTypePrototype, "DTSHelper.ObjectType", DTSHelper.DtsGlideType, IDtsObjectTypeInit>, DTSHelper.IDtsObjectType {
    }

    interface DtsColumnInit extends Omit<DTSHelper.IDtsColumn, "element" | "inactive" | "read_only" | "mandatory" | "col_type" | "type">,
        Partial<Pick<DTSHelper.IDtsColumn, "inactive" | "read_only" | "mandatory">> {
        type: string;
    }

    interface IDtsColumnPrototype extends ICustomClassPrototype2<DTSHelper.IDtsColumn, IDtsColumnPrototype, "DTSHelper.Column", DTSHelper.DtsTable, DtsColumnInit>, DTSHelper.IDtsColumn {

    }

    interface DtsTableInit extends Omit<DTSHelper.IDtsTable, "name" | "fullName" | "getColumn" | "getColumnNames" | "getInheritedTable" | "getInheritedTableNames" | "type"> {
        columns?: { [element: string]: DtsColumnInit; };
    }

    interface IDtsTablePrototype extends ICustomClassPrototype2<DTSHelper.IDtsTable, IDtsTablePrototype, "DTSHelper.Table", DTSHelper.DtsPackage | DTSHelper.DtsTable, DtsTableInit>, DTSHelper.IDtsTable {
        _columns: { [element: string]: DTSHelper.DtsColumn; };
        _inherited: { [name: string]: DTSHelper.DtsTable; };
    }

    export namespace DTSHelper {
        export interface IDtsScope extends ICustomClassBase<IDtsScope, "DTSHelper.Scope"> {
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

        export interface DtsScopeConstructor extends CustomClassConstructor2<IDtsScope, IDtsScopePrototype, DtsScope, DTSHelper, DtsScopeInit> {
            new(helper: DTSHelper, def: DtsScopeInit): DtsScope;
            (helper: DTSHelper, def: DtsScopeInit): DtsScope;
        }

        export type DtsScope = Readonly<IDtsScope>;

        export interface IDtsPackage extends ICustomClassBase<IDtsPackage, "DTSHelper.Package"> {
            id: string;
            inactive: boolean;
            name: string;
            scope: DtsScope;
            getTable(name: string): DtsTable | undefined;
            getTableNames(): string[];
        }

        export interface DtsPackageConstructor extends CustomClassConstructor2<IDtsPackage, IDtsPackagePrototype, DtsPackage, DtsScope, DtsPackageInit> {
            new(scope: DtsScope, def: DtsPackageInit): DtsPackage;
            (scope: DtsScope, def: DtsPackageInit): DtsPackage;
        }

        export type DtsPackage = Readonly<IDtsPackage>;

        export type DtsScalarType = 'integer' | 'string' | 'boolean' | 'float' | 'longint' | 'decimal' | 'datetime' | 'date' | 'time' | 'GUID';

        export interface IDtsGlideType extends ICustomClassBase<IDtsGlideType, "DTSHelper.GlideType"> {
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

        export interface DtsGlideTypeConstructor extends CustomClassConstructor2<IDtsGlideType, IDtsGlideTypePrototype, DtsGlideType, DTSHelper | DtsGlideType, IDtsGlideTypeInit> {
            new(parent: DTSHelper | DtsGlideType, def: IDtsGlideTypeInit): DtsGlideType;
            (parent: DTSHelper | DtsGlideType, def: IDtsGlideTypeInit): DtsGlideType;
        }

        export type DtsGlideType = Readonly<IDtsGlideType>;

        export interface IDtsObjectType extends ICustomClassBase<IDtsObjectType, "DTSHelper.ObjectType"> {
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

        export interface DtsObjectTypeConstructor extends CustomClassConstructor2<IDtsObjectType, IDtsObjectTypePrototype, DtsObjectType, DtsGlideType, IDtsObjectTypeInit> {
            new(parent: DtsGlideType, def: IDtsObjectTypeInit): DtsObjectType;
            (parent: DtsGlideType, def: IDtsObjectTypeInit): DtsObjectType;
        }

        export type DtsObjectType = Readonly<IDtsObjectType>;

        export interface IDtsColumn extends ICustomClassBase<IDtsColumn, "DTSHelper.Column"> {
            table: DtsTable;
            element: string;
            label: string;
            col_type: DtsObjectType;
            max_length?: number;
            inactive: boolean;
            read_only: boolean;
            mandatory: boolean;
        }

        export interface DtsColumnConstructor extends CustomClassConstructor2<IDtsColumn, IDtsColumnPrototype, DtsColumn, DtsTable, DtsColumnInit> {
            new(table: DtsTable, def: DtsColumnInit): DtsColumn;
            (table: DtsTable, def: DtsColumnInit): DtsColumn;
        }

        export type DtsColumn = Readonly<IDtsColumn>;

        export interface IDtsTable extends ICustomClassBase<IDtsTable, "DTSHelper.Table"> {
            parent: DtsPackage | DtsTable;
            name: string;
            label: string;
            fullName: string;
            getColumn(element: string): DtsColumn | undefined;
            getColumnNames(): string[];
            getInheritedTable(name: string): DtsTable | undefined;
            getInheritedTableNames(): string[];
        }

        export interface DtsTableConstructor extends CustomClassConstructor2<IDtsTable, IDtsTablePrototype, DtsTable, DtsPackage | DtsTable, DtsTableInit> {
            new(parent: DtsPackage | DtsTable, def: DtsTableInit): DtsTable;
            (parent: DtsPackage | DtsTable, def: DtsTableInit): DtsTable;
        }

        export type DtsTable = Readonly<IDtsTable>;
    }

    export namespace Obsoleted {
        export interface IDtsPackageOld extends ICustomClassBase<IDtsPackageOld, "DtsPackage"> {
            getSysId(): string;
            getId(): string;
            isActive(): boolean;
            getName(): string;
            getScope(): string;
            getScopeShortDescription(): string
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

        export interface DtsPackage extends Readonly<IDtsPackageOld> { }

        export interface DtsPackageConstructor extends CustomClassConstructor2<IDtsPackageOld, IDtsPackagePrototype, DtsPackage, sys_packageFields, sys_scopeFields> {
            new(package: sys_packageFields, scope: sys_scopeFields): DtsPackage;
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

        export interface DtsTable extends Readonly<IDtsTableOld> { }

        export interface DtsTableConstructor extends CustomClassConstructor1<IDtsTableOld, IDtsTablePrototype, DtsTable, sys_db_objectGlideRecord | string> {
            new(table: sys_db_objectGlideRecord | string): DtsTable;
            (table: sys_db_objectGlideRecord | string): DtsTable;
            get(package: sys_db_objectGlideRecord | string): DtsTable;
            getTableBase(): IDtsTableOld;
            getExtendableTableBase(): IDtsTableOld;
        }

        interface IPackageCacheItem {
            package: IDtsPackageOld;
            tables: { [name: string]: IDtsTableOld; };
        }

        interface IScopeCacheItem {
            sys_id: string;
            name: string;
            id: string;
            short_description: string;
            active: boolean
            packages: { [id: string]: IPackageCacheItem; };
        };

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
        new(): DTSHelper;
        (): DTSHelper;
        readonly TABLE_NAME_BASE: '(base)';
        readonly TABLE_NAME_EXTENDABLE: '(extendable)';
    }

    export const DTSHelper: DTSHelperConstructor = (function (): DTSHelperConstructor {
        const TABLE_NAME_EXTENDED: string = '(extendable)';
        var types: { [name: string]: IDtsGlideTypeInit; } = {
            "Packages.java.lang.String": {
                scalar_type: 'string',
                glide_types: {
                    GlideElementPassword2: {
                        object_types: {
                            password2: { sys_name: "Password (2 Way Encrypted)", scalar_length: 255, use_original_value: true }
                        }
                    },
                    GlideElementCompressed: {
                        object_types: {
                            compressed: { sys_name: "Compressed", use_original_value: true, hidden: true }
                        }
                    },
                    GlideElementEncrypted: {
                        object_types: {
                            glide_encrypted: { sys_name: "Encrypted Text", scalar_length: 65536, use_original_value: true },
                        }
                    },
                    "com.snc.apps.glide_elements.GlideElementSourceTable": {
                        object_types: {
                            source_table: { sys_name: "Source Table", scalar_length: 80, use_original_value: true, hidden: true },
                        }
                    },
                    GlideElement: {
                        object_types: {
                            radio: { sys_name: "Radio Button Choice", use_original_value: true, hidden: true },
                            field_list: { sys_name: "Field List", use_original_value: true, hidden: true },
                            html_template: { sys_name: "HTML Template", scalar_length: 65000, use_original_value: true, hidden: true },
                        }
                    },
                    "com.glide.glideobject.SysClassName": {
                        glide_types: {
                            GlideElementSysClassName: {
                                object_types: {
                                    sys_class_name: { sys_name: "sys_class_name", use_original_value: true, hidden: true },
                                }
                            }
                        }
                    }
                },
                object_types: {
                    reminder_field_name: { sys_name: "Reminder Field Name", use_original_value: true, hidden: true },
                    metric_gauge: { sys_name: "Metric Gauge", scalar_type: "float", hidden: true },
                    metric_counter: { sys_name: "Metric Counter", scalar_type: "float", hidden: true },
                    metric_derive: { sys_name: "Metric Derive", scalar_type: "float", hidden: true },
                    metric_absolute: { sys_name: "Metric Absolute", scalar_type: "float", hidden: true },
                }
            },
            GlideElementGlideObject: {
                glide_types: {
                    "com.glide.glideobject.GlideDuration": {
                        scalar_type: "datetime",
                        object_types: {
                            timer: { sys_name: "timer", use_original_value: true, hidden: true },
                        }
                    }
                },
                object_types: {
                    time: { sys_name: "Basic Time", scalar_type: "time", use_original_value: true, hidden: true },
                }
            }
        }
        var columnTypes: { [name: string]: IDtsObjectTypeInit; } = {
            
            
            
            
            
            
            
            
            glide_precise_time: { sys_name: "glide_precise_time", class_name: "GlidePreciseTime", use_original_value: true, hidden: true },
            ip_address: { sys_name: "IP Address", use_original_value: true, hidden: true },
            formula: { sys_name: "Formula", type_name: "GlideElement", use_original_value: true, hidden: true },
            boolean: { sys_name: "True/False", type_name: "GlideElementBoolean", scalar_type: "boolean", use_original_value: true },
            string_boolean: { sys_name: "string_boolean", class_name: "StringBoolean", use_original_value: true, hidden: true },
            mid_config: { sys_name: "MID Server Configuration", use_original_value: true, hidden: true },
            composite_field: { sys_name: "Composite Field", type_name: "GlideElement", scalar_length: 300, use_original_value: true, hidden: true },
            source_id: { sys_name: "Source ID", scalar_type: "GUID", class_name: "com.snc.apps.glide_elements.GlideElementSourceId", use_original_value: true, hidden: true },
            related_tags: { sys_name: "Related Tags", use_original_value: true, hidden: true },
            data_array: { sys_name: "Data Array", class_name: "com.snc.datastructure.GlideElementDataArray", scalar_length: 65535, use_original_value: true, hidden: true },
            translated: { sys_name: "translated", type_name: "GlideElementGlideObject", class_name: "Translated", use_original_value: true, hidden: true },
            day_of_week: { sys_name: "day_of_week", type_name: "GlideElementGlideObject", scalar_type: "integer", class_name: "DayOfWeek", use_original_value: true, hidden: true },
            data_structure: { sys_name: "Data Structure", type_name: "GlideElementGlideObject", class_name: "com.snc.datastructure.GlideElementDataStructure", scalar_length: 800, use_original_value: true },
            week_of_month: { sys_name: "week_of_month", type_name: "GlideElementGlideObject", scalar_type: "integer", class_name: "WeekOfMonth", use_original_value: true, hidden: true },
            month_of_year: { sys_name: "month_of_year", type_name: "GlideElementGlideObject", scalar_type: "integer", class_name: "MonthOfYear", use_original_value: true, hidden: true },
            short_table_name: { sys_name: "Short Table Name", type_name: "GlideElementShortTableName", scalar_length: 40, use_original_value: true, hidden: true },
            due_date: { sys_name: "Due Date", type_name: "GlideElementGlideObject", scalar_type: "datetime", class_name: "GlideDueDate" },
            icon: { sys_name: "Icon", type_name: "GlideElementIcon", scalar_length: 100, use_original_value: true },
            password: { sys_name: "password", type_name: "GlideElementPassword", class_name: "Password", use_original_value: true },
            glide_action_list: { sys_name: "UI Action List", type_name: "GlideElementGlideObject", class_name: "GlideActionList", scalar_length: 1024, hidden: true },
            sys_class_path: { sys_name: "System Class path", type_name: "GlideElement", use_original_value: true, hidden: true },
            approval_rules: { sys_name: "Approval Rules", scalar_length: 4000, use_original_value: true, hidden: true },
            translated_html: { sys_name: "Translated HTML", type_name: "GlideElementTranslatedHTML", scalar_length: 65536, use_original_value: true },
            variable_template_value: { sys_name: "Variable template value", use_original_value: true, hidden: true },
            date: { sys_name: "Other Date", scalar_type: "date", class_name: "GlideDate", hidden: true },
            reference_name: { sys_name: "reference_name", type_name: "GlideElement", use_original_value: true, hidden: true },
            audio: { sys_name: "Audio", type_name: "GlideElementAudio", use_original_value: true },
            properties: { sys_name: "CSS", type_name: "GlideElement", scalar_length: 4000, use_original_value: true, hidden: true },
            workflow_conditions: { sys_name: "Workflow Conditions", type_name: "GlideElementWorkflowConditions", hidden: true },
            conditions: { sys_name: "conditions", type_name: "GlideElementConditions", scalar_length: 4000 },
            script: { sys_name: "script", type_name: "GlideElementScript", scalar_length: 4000, use_original_value: true },
            html: { sys_name: "HTML", type_name: "GlideElementGlideObject", class_name: "GlideHTML", scalar_length: 65536, use_original_value: true },
            template_value: { sys_name: "Template Value", type_name: "GlideElementWorkflowConditions", class_name: "Conditions", scalar_length: 65000, hidden: true },
            xml: { sys_name: "XML", type_name: "GlideElementScript", use_original_value: true, hidden: true },
            ip_addr: { sys_name: "IP Address (Validated IPV4, IPV6)", use_original_value: true },
            records: { sys_name: "Records", scalar_length: 1024, use_original_value: true, hidden: true },
            multi_small: { sys_name: "multi_small", use_original_value: true, hidden: true },
            field_name: { sys_name: "Field Name", type_name: "GlideElement", scalar_length: 80, use_original_value: true },
            GUID: { sys_name: "Sys ID", type_name: "GlideElement", scalar_length: 32, use_original_value: true, hidden: true },
            counter: { sys_name: "Counter", type_name: "GlideElementCounter", use_original_value: true, hidden: true },
            ph_number: { sys_name: "ph_number", type_name: "GlideElement", use_original_value: true, hidden: true },
            journal_input: { sys_name: "Journal Input", type_name: "GlideElementGlideObject", class_name: "Journal" },
            journal_list: { sys_name: "Journal List", type_name: "GlideElementGlideObject", class_name: "Journal" },
            choice: { sys_name: "Choice", type_name: "GlideElement", use_original_value: true },
            reference: { sys_name: "Reference", type_name: "GlideElementReference", scalar_type: "GUID", use_original_value: true },
            color_display: { sys_name: "Color Display", type_name: "GlideElement", use_original_value: true, hidden: true },
            days_of_week: { sys_name: "Days of Week", type_name: "GlideElement", use_original_value: true, hidden: true },
            source_name: { sys_name: "Source Name", type_name: "GlideElementSourceName", class_name: "com.snc.apps.glide_elements.GlideElementSourceName", use_original_value: true, hidden: true },
            decoration: { sys_name: "Decoration", type_name: "GlideElement", scalar_length: 255, use_original_value: true, hidden: true },
            longint: { sys_name: "Long", type_name: "GlideElement", scalar_type: "longint", use_original_value: true },
            color: { sys_name: "Color", type_name: "GlideElement", use_original_value: true },
            string_full_utf8: { sys_name: "String (Full UTF-8)", type_name: "GlideElementFullUTF8", scalar_length: 255, use_original_value: true },
            user_roles: { sys_name: "user_roles", type_name: "GlideElement", scalar_length: 255, use_original_value: true, hidden: true },
            variable_conditions: { sys_name: "variable_conditions", type_name: "GlideElementVariableConditions", hidden: true },
            url: { sys_name: "URL", type_name: "GlideElementURL", class_name: "URL", scalar_length: 1024 },
            string: { sys_name: "String", type_name: "GlideElement", use_original_value: true },
            email_script: { sys_name: "email_script", type_name: "GlideElement", use_original_value: true, hidden: true },
            bootstrap_color: { sys_name: "Bootstrap color", type_name: "GlideElement", use_original_value: true, hidden: true },
            documentation_field: { sys_name: "Documentation Field", type_name: "GlideElementDocumentation", class_name: "GlideElementTranslatedField", scalar_length: 80, use_original_value: true, hidden: true },
            glyphicon: { sys_name: "Glyph Icon (Bootstrap)", type_name: "GlideElement", use_original_value: true, hidden: true },
            simple_name_values: { sys_name: "Name-Value Pairs", scalar_length: 4000, use_original_value: true },
            percent_complete: { sys_name: "Percent Complete", type_name: "GlideElementNumeric", scalar_type: "decimal", use_original_value: true },
            char: { sys_name: "Char", type_name: "GlideElement", scalar_type: "GUID", scalar_length: 32, use_original_value: true, hidden: true },
            mask_code: { sys_name: "mask_code", class_name: "MaskCode", use_original_value: true, hidden: true },
            version: { sys_name: "Version", type_name: "GlideElement", use_original_value: true, hidden: true },
            long: { sys_name: "Long Integer String", type_name: "GlideElement", use_original_value: true, hidden: true },
            auto_number: { sys_name: "Auto Number", hidden: true },
            variables: { sys_name: "Variables", type_name: "GlideElementVariables", use_original_value: true, hidden: true },
            datetime: { sys_name: "Basic Date/Time", scalar_type: "datetime", use_original_value: true, hidden: true },
            repeat_type: { sys_name: "Repeat Type", type_name: "GlideElement", use_original_value: true, hidden: true },
            tree_code: { sys_name: "Tree Code", use_original_value: true, hidden: true },
            composite_name: { sys_name: "Composite Name", type_name: "GlideElement", use_original_value: true, hidden: true },
            schedule_date_time: { sys_name: "Schedule Date/Time", type_name: "GlideElementGlideObject", class_name: "ScheduleDateTime", hidden: true },
            float: { sys_name: "Floating Point Number", type_name: "GlideElementNumeric", scalar_type: "float", use_original_value: true },
            index_name: { sys_name: "Index Name", use_original_value: true, hidden: true },
            html_script: { sys_name: "HTML Script", type_name: "GlideElement", use_original_value: true, hidden: true },
            internal_type: { sys_name: "Internal Type", type_name: "GlideElementInternalType", class_name: "com.glide.script.glide_elements.GlideElementInternalType", use_original_value: true, hidden: true },
            phone_number: { sys_name: "Phone Number (Unused)", hidden: true },
            collection: { sys_name: "Collection", use_original_value: true, hidden: true },
            breakdown_element: { sys_name: "Breakdown Element", type_name: "GlideElementBreakdownElement", scalar_type: "GUID", class_name: "com.snc.pa.dc.GlideElementBreakdownElement", scalar_length: 32, use_original_value: true, hidden: true },
            glide_date: { sys_name: "Date", type_name: "GlideElementGlideObject", scalar_type: "date", class_name: "GlideDate", use_original_value: true },
            glide_date_time: { sys_name: "Date-time", type_name: "GlideElementGlideObject", scalar_type: "datetime", class_name: "GlideDateTime", use_original_value: true },
            glide_time: { sys_name: "Time", type_name: "GlideElementGlideObject", scalar_type: "datetime", class_name: "GlideTime", use_original_value: true },
            video: { sys_name: "Video", use_original_value: true },
            short_field_name: { sys_name: "Short Field Name", type_name: "GlideElementShortFieldName", scalar_length: 40, use_original_value: true, hidden: true },
            wiki_text: { sys_name: "Wiki", type_name: "GlideElementWikiText", class_name: "com.glide.wiki.GlideElementWikiText", scalar_length: 65536, use_original_value: true },
            document_id: { sys_name: "Document ID", type_name: "GlideElementDocumentId", scalar_type: "GUID", class_name: "com.glide.script.glide_elements.GlideElementDocumentId", scalar_length: 32, use_original_value: true },
            order_index: { sys_name: "Order Index", type_name: "GlideElementNumeric", scalar_type: "integer", hidden: true },
            glide_duration: { sys_name: "Duration", type_name: "GlideElementGlideObject", scalar_type: "datetime", class_name: "GlideDuration", use_original_value: true },
            data_object: { sys_name: "Data Object", type_name: "GlideElementDataObject", class_name: "com.snc.datastructure.GlideElementDataObject", scalar_length: 65535, use_original_value: true, hidden: true },
            integer: { sys_name: "Integer", type_name: "GlideElementNumeric", scalar_type: "integer", use_original_value: true },
            phone_number_e164: { sys_name: "Phone Number (E164)", class_name: "com.glide.script.glide_elements.GlideElementPhoneNumber" },
            wide_text: { sys_name: "wide_text", type_name: "GlideElement", use_original_value: true, hidden: true },
            slushbucket: { sys_name: "Slush Bucket", type_name: "GlideElement", scalar_length: 4000, use_original_value: true, hidden: true },
            nl_task_int1: { sys_name: "nl_task_int1", scalar_type: "integer", use_original_value: true, hidden: true },
            user_input: { sys_name: "user_input", type_name: "GlideElementGlideObject", class_name: "GlideUserInput", use_original_value: true, hidden: true },
            name_values: { sys_name: "Name/Values", type_name: "GlideElementNameValue", use_original_value: true, hidden: true },
            email: { sys_name: "email", type_name: "GlideElement", use_original_value: true, hidden: true },
            script_plain: { sys_name: "Script (Plain)", type_name: "GlideElementScript", scalar_length: 4000, use_original_value: true },
            multi_two_lines: { sys_name: "multi_two_lines", type_name: "GlideElement", use_original_value: true, hidden: true },
            translated_field: { sys_name: "Translated Field", type_name: "GlideElementTranslatedField", class_name: "GlideElementTranslatedField", use_original_value: true, hidden: true },
            glide_var: { sys_name: "Glide Var", type_name: "GlideElementGlideVar", class_name: "com.glide.vars.GlideElementGlideVar", use_original_value: true, hidden: true },
            catalog_preview: { sys_name: "Catalog Preview", type_name: "GlideElement", use_original_value: true, hidden: true },
            replication_payload: { sys_name: "Replication Payload", type_name: "GlideElementReplicationPayload", use_original_value: true, hidden: true },
            int: { sys_name: "Integer String", type_name: "GlideElement", use_original_value: true, hidden: true },
            repeat_count: { sys_name: "Repeat Count", type_name: "GlideElementNumeric", scalar_type: "integer", hidden: true },
            wms_job: { sys_name: "wms_job", class_name: "GlideObject", use_original_value: true, hidden: true },
            domain_id: { sys_name: "domain_id", type_name: "GlideElementDomainId", scalar_type: "GUID", class_name: "com.glide.script.glide_elements.GlideElementDomainId", scalar_length: 32, use_original_value: true },
            workflow: { sys_name: "workflow", type_name: "GlideElementWorkflow", scalar_length: 80, use_original_value: true },
            table_name: { sys_name: "Table Name", type_name: "GlideElement", scalar_length: 80, use_original_value: true },
            json: { sys_name: "JSON", type_name: "GlideElement", scalar_length: 4000, use_original_value: true, hidden: true },
            glide_list: { sys_name: "List", type_name: "GlideElementGlideObject", class_name: "GlideList", scalar_length: 1024 },
            user_image: { sys_name: "Image", type_name: "GlideElementUserImage", class_name: "UserImage" },
            file_attachment: { sys_name: "File Attachment", class_name: "FileAttachment", use_original_value: true },
            translated_text: { sys_name: "Translated Text", type_name: "GlideElementTranslatedText", use_original_value: true },
            sysevent_name: { sys_name: "sysevent_name", type_name: "GlideElement", use_original_value: true, hidden: true },
            sysrule_field_name: { sys_name: "sysrule_field_name", use_original_value: true, hidden: true },
            image: { sys_name: "image", type_name: "GlideElement", use_original_value: true, hidden: true },
            auto_increment: { sys_name: "Auto Increment", type_name: "GlideElement", scalar_type: "longint", use_original_value: true, hidden: true },
            integer_time: { sys_name: "Integer Time", scalar_type: "integer", class_name: "IntegerTime", hidden: true },
            integer_date: { sys_name: "Integer Date", type_name: "GlideElementGlideObject", scalar_type: "integer", class_name: "IntegerDate", hidden: true },
            tree_path: { sys_name: "Tree Path", use_original_value: true, hidden: true },
            journal: { sys_name: "Journal", type_name: "GlideElementGlideObject", class_name: "Journal", use_original_value: true },
            external_names: { sys_name: "external_names", type_name: "GlideElement", use_original_value: true, hidden: true },
            decimal: { sys_name: "Decimal", type_name: "GlideElementNumeric", scalar_type: "decimal", use_original_value: true },
            css: { sys_name: "CSS", type_name: "GlideElement", scalar_length: 4000, use_original_value: true, hidden: true },
            script_server: { sys_name: "script_server", type_name: "GlideElement", scalar_length: 4000, use_original_value: true, hidden: true },
            currency: { sys_name: "Currency", type_name: "GlideElementCurrency", scalar_type: "decimal", class_name: "Currency", scalar_length: 20, use_original_value: true },
            price: { sys_name: "Price", type_name: "GlideElementPrice", scalar_type: "decimal", class_name: "Price", scalar_length: 20, use_original_value: true },
            condition_string: { sys_name: "Condition String", type_name: "GlideElement", use_original_value: true }
        }

        const CACHEITEM_TABLE_BASE: DTSHelper.IDtsTable = {
            label: '',
            fullName: '',
            inherited: {},
            columns: {
                sys_created_by: {
                    type: 'string',
                    label: 'Class',
                    internal_type: "string"
                }
            }
        };
        const CACHEITEM_TABLE_EXTENDABLE: DTSHelper.IDtsTable = {
            label: '',
            fullName: '',
            inherited: {},
            columns: {
                sys_class_name: {
                    type: 'sys_class_name',
                    label: 'Class',
                    internal_type: "string"
                }
            }
        };
        CACHEITEM_TABLE_BASE.inherited[TABLE_NAME_EXTENDED] = CACHEITEM_TABLE_EXTENDABLE;

        var scopeCache: { [scope: string]: IScopeCacheItem; } = {
            "(empty)": {
                active: true,
                id: '',
                name: '',
                packages: {
                    "(empty)": {
                        package: {
                            getSysId: function (): string { return ''; },
                            getId: function (): string { return ''; },
                            isActive: function (): boolean { return true; },
                            getName: function (): string { return ''; },
                            getScope: function (): string { return '(empty)'; },
                            getScopeShortDescription: function (): string { return ''; },
                            getScopeSysId: function (): string { return ''; },
                            getScopeId: function (): string { return ''; },
                            isScopeActive: function (): boolean { return true; },
                            getScopeName: function (): string { return ''; },
                            type: "DtsPackage"
                        },
                        tables: {}
                    }
                },
                short_description: '',
                sys_id: ''
            }
        };
        scopeCache['(empty)'].packages['(empty)'].tables['(root)'] = {
            getFullName: function () { return 'IGlideTableProperties'; },
            getParent: function (): DtsTable | undefined { return undefined; },
            getPackage: function (): DtsPackage { return scopeCache['(empty)'].packages['(empty)'].package; },
            getTableName: function (): string { return ''; },
            getTableDisplayName: function (): string { return ''; },
            type: "DtsTable"
        };
        scopeCache['(empty)'].packages['(empty)'].tables['(extendable)'] = {
            getFullName: function () { return 'IExtendedGlideTableProperties'; },
            getParent: function (): DtsTable | undefined { return scopeCache['(empty)'].packages['(empty)'].tables['(root)']; },
            getPackage: function (): DtsPackage { return scopeCache['(empty)'].packages['(empty)'].package; },
            getTableName: function (): string { return ''; },
            getTableDisplayName: function (): string { return ''; },
            type: "DtsTable"
        };
        var DtsPackage: DtsPackageConstructor = Class.create();
        DtsPackage.prototype = {
            _sys_id: '',
            _name: '',
            _id: '',
            _scope: '',
            _active: false,
            initialize: function (this: IDtsPackagePrototype, package: sys_packageFields, scope: sys_scopeFields): void {
                var item: IScopeCacheItem;
                if (gs.nil(scope)) {
                    this._scope = '';
                    if (gs.nil(package)) {
                        this._sys_id = '';
                        this._name = '';
                        this._id = '';
                        this._active = true;
                    } else {
                        this._sys_id = '' + package.sys_id;
                        this._name = '' + package.name;
                        this._id = '' + package.source;
                        this._active = package.active == true;
                    }
                    item = scopeCache['(empty)'];
                } else {
                    this._scope = '' + scope.scope;
                    item = scopeCache[this._scope];
                    if (typeof item === 'undefined') {
                        item = {
                            active: scope.active == true,
                            id: '' + scope.source,
                            name: '' + scope.name,
                            packages: {},
                            short_description: '' + scope.short_description,
                            sys_id: '' + scope.sys_id
                        };
                        scopeCache[this._scope] = item;
                    }
                    if (gs.nil(package) || package.sys_id == scope.sys_id) {
                        this._sys_id = item.sys_id;
                        this._name = item.name;
                        this._id = item.id;
                        this._active = item.active;
                    } else {
                        this._sys_id = '' + package.sys_id;
                        this._name = '' + package.name;
                        this._id = '' + package.source;
                        this._active = package.active == true;
                    }
                }
                var pkg: IPackageCacheItem = item.packages[this._id];
                if (typeof pkg === 'undefined')
                    item.packages[this._id] = {
                        package: this,
                        tables: {}
                    };
                else
                    pkg.package = this;
            },
            getSysId: function (this: IDtsPackagePrototype): string { return this._sys_id; },
            getId: function (this: IDtsPackagePrototype): string { return this._id; },
            isActive: function (this: IDtsPackagePrototype): boolean { return this._active; },
            getName: function (this: IDtsPackagePrototype): string { return this._name; },
            getScope: function (this: IDtsPackagePrototype): string { return this._scope; },
            getScopeShortDescription: function (this: IDtsPackagePrototype): string { return (this._scope.length == 0) ? scopeCache['(empty)'].short_description : scopeCache[this._scope].short_description; },
            getScopeSysId: function (this: IDtsPackagePrototype): string { return (this._scope.length == 0) ? scopeCache['(empty)'].sys_id : scopeCache[this._scope].sys_id; },
            getScopeId: function (this: IDtsPackagePrototype): string { return (this._scope.length == 0) ? scopeCache['(empty)'].id : scopeCache[this._scope].id; },
            isScopeActive: function (this: IDtsPackagePrototype): boolean { return (this._scope.length == 0) ? scopeCache['(empty)'].active : scopeCache[this._scope].active; },
            getScopeName: function (this: IDtsPackagePrototype): string { return (this._scope.length == 0) ? scopeCache['(empty)'].name : scopeCache[this._scope].name; },
            type: "DtsPackage"
        };

        DtsPackage.get = function (package: sys_packageFields, scope: sys_scopeFields): DtsPackage {
            var item: IScopeCacheItem;
            var s: string;
            if (gs.nil(scope))
                item = scopeCache['(empty)'];
            else {
                s = '' + scope.scope;
                item = scopeCache['' + scope.scope];
                if (typeof item === 'undefined')
                    return new DtsPackage(package, scope);
            }

            s = (gs.nil(package)) ? '' : '' + package.source;
            var pkg: IPackageCacheItem = item.packages[s];
            if (typeof pkg === 'undefined')
                return new DtsPackage(package, scope);
            return pkg.package;
        };

        var DtsTableConstructor: DtsTableConstructor = Class.create();

        DtsTableConstructor.prototype = {
            _table: undefined,
            initialize(this: IDtsTablePrototype, table: sys_db_objectGlideRecord | string): void {
                if (typeof table === 'string') {
                    var gr: sys_db_objectGlideRecord = <sys_db_objectGlideRecord>new GlideRecord('sys_db_object');
                    gr.addNotNullQuery
                    gr.addQuery(table);
                    gr.query();
                    if (!gr.next()) {
                        gr = <sys_db_objectGlideRecord>new GlideRecord('sys_db_object');
                        gr.addQuery('name', table);
                        if (!gr.next())
                            throw new Error("Table named " + JSON.stringify(table) + " not found.");
                    }
                    this._table = gr;
                } else if (typeof table === 'object' && table != null) {
                    if (table.getTableName() != 'sys_db_object')
                        throw new Error("Argument does not represent sys_db_object");
                    if (table.isNewRecord() || !table.isValidRecord())
                        throw new Error("Glide record is not valid");
                    this._table = table;
                } else
                    throw new Error("Argument is not a string, GlideRecord or reference element");
            },
            getParent(this: IDtsTablePrototype): DtsTable | undefined {
                if (typeof this._parent === 'undefined') {
                    if (gs.nil(this._table.super_class))
                        this._parent = null;
                    else
                        try { this._parent = DtsTableConstructor.get('' + (<$$element.Reference<sys_db_objectFields, sys_db_objectGlideRecord>>this._table.super_class).name); }
                        catch { this._parent = null; }
                }
                if (this._parent != null)
                    return this._parent;
            },
            getPackage: function (this: IDtsTablePrototype): DtsPackage {
                if (typeof this._package === 'undefined')
                    this._package = DtsPackage.get(<sys_packageFields>this._table.sys_package, <sys_scopeFields>this._table.sys_scope);
                return this._package;
            },
            getFullName: function (this: IDtsTablePrototype): string {
                var package: DtsPackage = this.getPackage();
                var n = '' + this._table.sys_class_name;
                var s = package.getScope();
                if (s.length > 0 && n.length > s.length && s.startsWith(n))
                    return s + '.' + n.substr(s.length);
                return n;
            },
            getTableDisplayName: function (this: IDtsTablePrototype): string { return this._table.getDisplayValue(); },
            getTableName: function (this: IDtsTablePrototype): string { return '' + this._table.name; },
            type: "DtsTable"
        };
        DtsTableConstructor.get = function (table: sys_db_objectGlideRecord | string): DtsTable | undefined {
            var gr: sys_db_objectGlideRecord;
            if (typeof table === 'string') {
                gr = <sys_db_objectGlideRecord>new GlideRecord('sys_db_object');
                gr.addNotNullQuery
                gr.addQuery(table);
                gr.query();
                if (!gr.next()) {
                    gr = <sys_db_objectGlideRecord>new GlideRecord('sys_db_object');
                    gr.addQuery('name', table);
                    if (!gr.next())
                        return;
                }
            } else if (typeof table === 'object' && table != null) {
                if (table.getTableName() != 'sys_db_object')
                    throw new Error("Argument does not represent sys_db_object");
                if (table.isNewRecord() || !table.isValidRecord())
                    throw new Error("Glide record is not valid");
                gr = table;
            } else
                throw new Error("Argument is not a string, GlideRecord or reference element");
            var pkg: DtsPackage = DtsPackage.get(<sys_packageFields>this._table.sys_package, <sys_scopeFields>this._table.sys_scope);
            var item: IPackageCacheItem = ((pkg.getScope().length == 0) ? scopeCache['(empty)'] : scopeCache[pkg.getScope()])[pkg.getId()];
            var dtsTable: DtsTable = item.tables['' + gr.name];
            if (typeof dtsTable === 'undefined')
                return new DtsTableConstructor(gr);
            return dtsTable;
        }
        var DTSHelperConstructor: DTSHelperConstructor = Class.create();

        DTSHelperConstructor.prototype = {
            initialize(this: IDTSHelperPrototype): void { },
            type: "DTSHelper"
        };

        return DTSHelperConstructor;
    })();
}