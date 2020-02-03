/// <reference path="base.d.ts" />
var x_44813_dev_ts_hlp;
(function (x_44813_dev_ts_hlp) {
    var Obsoleted;
    (function (Obsoleted) {
        ;
    })(Obsoleted = x_44813_dev_ts_hlp.Obsoleted || (x_44813_dev_ts_hlp.Obsoleted = {}));
    x_44813_dev_ts_hlp.DTSHelper = (function () {
        var TABLE_NAME_EXTENDED = '(extendable)';
        var types = {
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
        };
        var columnTypes = {
            glide_precise_time: { sys_name: "glide_precise_time", scalar_type: "time", use_original_value: true, hidden: true },
            ip_address: { sys_name: "IP Address", use_original_value: true, hidden: true },
            formula: { sys_name: "Formula", use_original_value: true, hidden: true },
            boolean: { sys_name: "True/False", scalar_type: "boolean", use_original_value: true },
            string_boolean: { sys_name: "string_boolean", use_original_value: true, hidden: true },
            mid_config: { sys_name: "MID Server Configuration", use_original_value: true, hidden: true },
            composite_field: { sys_name: "Composite Field", scalar_length: 300, use_original_value: true, hidden: true },
            source_id: { sys_name: "Source ID", scalar_type: "GUID", use_original_value: true, hidden: true },
            related_tags: { sys_name: "Related Tags", use_original_value: true, hidden: true },
            data_array: { sys_name: "Data Array", scalar_length: 65535, use_original_value: true, hidden: true },
            translated: { sys_name: "translated", use_original_value: true, hidden: true },
            day_of_week: { sys_name: "day_of_week", scalar_type: "integer", use_original_value: true, hidden: true },
            data_structure: { sys_name: "Data Structure", scalar_length: 800, use_original_value: true },
            week_of_month: { sys_name: "week_of_month", scalar_type: "integer", use_original_value: true, hidden: true },
            month_of_year: { sys_name: "month_of_year", scalar_type: "integer", use_original_value: true, hidden: true },
            short_table_name: { sys_name: "Short Table Name", scalar_length: 40, use_original_value: true, hidden: true },
            due_date: { sys_name: "Due Date", scalar_type: "datetime" },
            icon: { sys_name: "Icon", scalar_length: 100, use_original_value: true },
            password: { sys_name: "password", use_original_value: true },
            glide_action_list: { sys_name: "UI Action List", scalar_length: 1024, hidden: true },
            sys_class_path: { sys_name: "System Class path", use_original_value: true, hidden: true },
            approval_rules: { sys_name: "Approval Rules", scalar_length: 4000, use_original_value: true, hidden: true },
            translated_html: { sys_name: "Translated HTML", scalar_length: 65536, use_original_value: true },
            variable_template_value: { sys_name: "Variable template value", use_original_value: true, hidden: true },
            date: { sys_name: "Other Date", scalar_type: "date", hidden: true },
            reference_name: { sys_name: "reference_name", use_original_value: true, hidden: true },
            audio: { sys_name: "Audio", use_original_value: true },
            properties: { sys_name: "CSS", scalar_length: 4000, use_original_value: true, hidden: true },
            workflow_conditions: { sys_name: "Workflow Conditions", hidden: true },
            conditions: { sys_name: "conditions", scalar_length: 4000 },
            script: { sys_name: "script", scalar_length: 4000, use_original_value: true },
            html: { sys_name: "HTML", scalar_length: 65536, use_original_value: true },
            template_value: { sys_name: "Template Value", scalar_length: 65000, hidden: true },
            xml: { sys_name: "XML", use_original_value: true, hidden: true },
            ip_addr: { sys_name: "IP Address (Validated IPV4, IPV6)", use_original_value: true },
            records: { sys_name: "Records", scalar_length: 1024, use_original_value: true, hidden: true },
            multi_small: { sys_name: "multi_small", use_original_value: true, hidden: true },
            field_name: { sys_name: "Field Name", scalar_length: 80, use_original_value: true },
            GUID: { sys_name: "Sys ID", scalar_length: 32, use_original_value: true, hidden: true },
            counter: { sys_name: "Counter", use_original_value: true, hidden: true },
            ph_number: { sys_name: "ph_number", use_original_value: true, hidden: true },
            journal_input: { sys_name: "Journal Input" },
            journal_list: { sys_name: "Journal List" },
            choice: { sys_name: "Choice", use_original_value: true },
            reference: { sys_name: "Reference", scalar_type: "GUID", use_original_value: true },
            color_display: { sys_name: "Color Display", use_original_value: true, hidden: true },
            days_of_week: { sys_name: "Days of Week", use_original_value: true, hidden: true },
            source_name: { sys_name: "Source Name", use_original_value: true, hidden: true },
            decoration: { sys_name: "Decoration", scalar_length: 255, use_original_value: true, hidden: true },
            longint: { sys_name: "Long", scalar_type: "longint", use_original_value: true },
            color: { sys_name: "Color", use_original_value: true },
            string_full_utf8: { sys_name: "String (Full UTF-8)", scalar_length: 255, use_original_value: true },
            user_roles: { sys_name: "user_roles", scalar_length: 255, use_original_value: true, hidden: true },
            variable_conditions: { sys_name: "variable_conditions", hidden: true },
            url: { sys_name: "URL", scalar_length: 1024 },
            string: { sys_name: "String", use_original_value: true },
            email_script: { sys_name: "email_script", use_original_value: true, hidden: true },
            bootstrap_color: { sys_name: "Bootstrap color", use_original_value: true, hidden: true },
            documentation_field: { sys_name: "Documentation Field", scalar_length: 80, use_original_value: true, hidden: true },
            glyphicon: { sys_name: "Glyph Icon (Bootstrap)", use_original_value: true, hidden: true },
            simple_name_values: { sys_name: "Name-Value Pairs", scalar_length: 4000, use_original_value: true },
            percent_complete: { sys_name: "Percent Complete", scalar_type: "decimal", use_original_value: true },
            char: { sys_name: "Char", scalar_type: "GUID", scalar_length: 32, use_original_value: true, hidden: true },
            mask_code: { sys_name: "mask_code", use_original_value: true, hidden: true },
            version: { sys_name: "Version", use_original_value: true, hidden: true },
            long: { sys_name: "Long Integer String", use_original_value: true, hidden: true },
            auto_number: { sys_name: "Auto Number", hidden: true },
            variables: { sys_name: "Variables", use_original_value: true, hidden: true },
            datetime: { sys_name: "Basic Date/Time", scalar_type: "datetime", use_original_value: true, hidden: true },
            repeat_type: { sys_name: "Repeat Type", use_original_value: true, hidden: true },
            tree_code: { sys_name: "Tree Code", use_original_value: true, hidden: true },
            composite_name: { sys_name: "Composite Name", use_original_value: true, hidden: true },
            schedule_date_time: { sys_name: "Schedule Date/Time", hidden: true },
            float: { sys_name: "Floating Point Number", scalar_type: "float", use_original_value: true },
            index_name: { sys_name: "Index Name", use_original_value: true, hidden: true },
            html_script: { sys_name: "HTML Script", use_original_value: true, hidden: true },
            internal_type: { sys_name: "Internal Type", use_original_value: true, hidden: true },
            phone_number: { sys_name: "Phone Number (Unused)", hidden: true },
            collection: { sys_name: "Collection", use_original_value: true, hidden: true },
            breakdown_element: { sys_name: "Breakdown Element", scalar_type: "GUID", scalar_length: 32, use_original_value: true, hidden: true },
            glide_date: { sys_name: "Date", scalar_type: "date", use_original_value: true },
            glide_date_time: { sys_name: "Date-time", scalar_type: "datetime", use_original_value: true },
            glide_time: { sys_name: "Time", scalar_type: "datetime", use_original_value: true },
            video: { sys_name: "Video", use_original_value: true },
            short_field_name: { sys_name: "Short Field Name", scalar_length: 40, use_original_value: true, hidden: true },
            wiki_text: { sys_name: "Wiki", scalar_length: 65536, use_original_value: true },
            document_id: { sys_name: "Document ID", scalar_type: "GUID", scalar_length: 32, use_original_value: true },
            order_index: { sys_name: "Order Index", scalar_type: "integer", hidden: true },
            glide_duration: { sys_name: "Duration", scalar_type: "datetime", use_original_value: true },
            data_object: { sys_name: "Data Object", scalar_length: 65535, use_original_value: true, hidden: true },
            integer: { sys_name: "Integer", scalar_type: "integer", use_original_value: true },
            phone_number_e164: { sys_name: "Phone Number (E164)" },
            wide_text: { sys_name: "wide_text", use_original_value: true, hidden: true },
            slushbucket: { sys_name: "Slush Bucket", scalar_length: 4000, use_original_value: true, hidden: true },
            nl_task_int1: { sys_name: "nl_task_int1", scalar_type: "integer", use_original_value: true, hidden: true },
            user_input: { sys_name: "user_input", use_original_value: true, hidden: true },
            name_values: { sys_name: "Name/Values", use_original_value: true, hidden: true },
            email: { sys_name: "email", use_original_value: true, hidden: true },
            script_plain: { sys_name: "Script (Plain)", scalar_length: 4000, use_original_value: true },
            multi_two_lines: { sys_name: "multi_two_lines", use_original_value: true, hidden: true },
            translated_field: { sys_name: "Translated Field", use_original_value: true, hidden: true },
            glide_var: { sys_name: "Glide Var", use_original_value: true, hidden: true },
            catalog_preview: { sys_name: "Catalog Preview", use_original_value: true, hidden: true },
            replication_payload: { sys_name: "Replication Payload", use_original_value: true, hidden: true },
            int: { sys_name: "Integer String", use_original_value: true, hidden: true },
            repeat_count: { sys_name: "Repeat Count", scalar_type: "integer", hidden: true },
            wms_job: { sys_name: "wms_job", use_original_value: true, hidden: true },
            domain_id: { sys_name: "domain_id", scalar_type: "GUID", scalar_length: 32, use_original_value: true },
            workflow: { sys_name: "workflow", scalar_length: 80, use_original_value: true },
            table_name: { sys_name: "Table Name", scalar_length: 80, use_original_value: true },
            json: { sys_name: "JSON", scalar_length: 4000, use_original_value: true, hidden: true },
            glide_list: { sys_name: "List", scalar_length: 1024 },
            user_image: { sys_name: "Image" },
            file_attachment: { sys_name: "File Attachment", use_original_value: true },
            translated_text: { sys_name: "Translated Text", use_original_value: true },
            sysevent_name: { sys_name: "sysevent_name", use_original_value: true, hidden: true },
            sysrule_field_name: { sys_name: "sysrule_field_name", use_original_value: true, hidden: true },
            image: { sys_name: "image", use_original_value: true, hidden: true },
            auto_increment: { sys_name: "Auto Increment", scalar_type: "longint", use_original_value: true, hidden: true },
            integer_time: { sys_name: "Integer Time", scalar_type: "integer", hidden: true },
            integer_date: { sys_name: "Integer Date", scalar_type: "integer", hidden: true },
            tree_path: { sys_name: "Tree Path", use_original_value: true, hidden: true },
            journal: { sys_name: "Journal", use_original_value: true },
            external_names: { sys_name: "external_names", use_original_value: true, hidden: true },
            decimal: { sys_name: "Decimal", scalar_type: "decimal", use_original_value: true },
            css: { sys_name: "CSS", scalar_length: 4000, use_original_value: true, hidden: true },
            script_server: { sys_name: "script_server", scalar_length: 4000, use_original_value: true, hidden: true },
            currency: { sys_name: "Currency", scalar_type: "decimal", scalar_length: 20, use_original_value: true },
            price: { sys_name: "Price", scalar_type: "decimal", scalar_length: 20, use_original_value: true },
            condition_string: { sys_name: "Condition String", use_original_value: true }
        };
        //const CACHEITEM_TABLE_BASE: DTSHelper.IDtsTable = {
        //    label: '',
        //    fullName: '',
        //    parent: <DTSHelper.DtsPackage | DTSHelper.DtsTable>{},
        //    name: '',
        //    getColumn: (element: string) => { throw new Error("Not implemented"); },
        //    getColumnNames: () => { throw new Error("Not implemented"); },
        //    getInheritedTable: (name: string) => { throw new Error("Not implemented"); },
        //    getInheritedTableNames: () => { throw new Error("Not implemented"); }
        //    //inherited: {},
        //    //columns: {
        //    //    sys_created_by: {
        //    //        type: 'string',
        //    //        label: 'Class',
        //    //        internal_type: "string"
        //    //    }
        //    //}
        //};
        //const CACHEITEM_TABLE_EXTENDABLE: DTSHelper.IDtsTable = {
        //    label: '',
        //    fullName: '',
        //    parent: <DTSHelper.DtsPackage | DTSHelper.DtsTable>{},
        //    name: '',
        //    getColumn: (element: string) => { throw new Error("Not implemented"); },
        //    getColumnNames: () => { throw new Error("Not implemented"); },
        //    getInheritedTable: (name: string) => { throw new Error("Not implemented"); },
        //    getInheritedTableNames: () => { throw new Error("Not implemented"); }
        //    //inherited: {},
        //    //columns: {
        //    //    sys_class_name: {
        //    //        type: 'sys_class_name',
        //    //        label: 'Class',
        //    //        internal_type: "string"
        //    //    }
        //    //}
        //};
        //CACHEITEM_TABLE_BASE.inherited[TABLE_NAME_EXTENDED] = CACHEITEM_TABLE_EXTENDABLE;
        //var scopeCache: { [scope: string]: IScopeCacheItem; } = {
        //    "(empty)": {
        //        active: true,
        //        id: '',
        //        name: '',
        //        packages: {
        //            "(empty)": {
        //                package: {
        //                    getSysId: function (): string { return ''; },
        //                    getId: function (): string { return ''; },
        //                    isActive: function (): boolean { return true; },
        //                    getName: function (): string { return ''; },
        //                    getScope: function (): string { return '(empty)'; },
        //                    getScopeShortDescription: function (): string { return ''; },
        //                    getScopeSysId: function (): string { return ''; },
        //                    getScopeId: function (): string { return ''; },
        //                    isScopeActive: function (): boolean { return true; },
        //                    getScopeName: function (): string { return ''; },
        //                    type: "DtsPackage"
        //                },
        //                tables: {}
        //            }
        //        },
        //        short_description: '',
        //        sys_id: ''
        //    }
        //};
        //scopeCache['(empty)'].packages['(empty)'].tables['(root)'] = {
        //    getFullName: function () { return 'IGlideTableProperties'; },
        //    getParent: function (): DtsTable | undefined { return undefined; },
        //    getPackage: function (): DtsPackage { return scopeCache['(empty)'].packages['(empty)'].package; },
        //    getTableName: function (): string { return ''; },
        //    getTableDisplayName: function (): string { return ''; },
        //    type: "DtsTable"
        //};
        //scopeCache['(empty)'].packages['(empty)'].tables['(extendable)'] = {
        //    getFullName: function () { return 'IExtendedGlideTableProperties'; },
        //    getParent: function (): DtsTable | undefined { return scopeCache['(empty)'].packages['(empty)'].tables['(root)']; },
        //    getPackage: function (): DtsPackage { return scopeCache['(empty)'].packages['(empty)'].package; },
        //    getTableName: function (): string { return ''; },
        //    getTableDisplayName: function (): string { return ''; },
        //    type: "DtsTable"
        //};
        var DtsPackage = Class.create();
        //DtsPackage.prototype = {
        //    _sys_id: '',
        //    _name: '',
        //    _id: '',
        //    _scope: '',
        //    _active: false,
        //    initialize: function (this: IDtsPackagePrototype, package: sys_packageFields, scope: sys_scopeFields): void {
        //        var item: IScopeCacheItem;
        //        if (gs.nil(scope)) {
        //            this._scope = '';
        //            if (gs.nil(package)) {
        //                this._sys_id = '';
        //                this._name = '';
        //                this._id = '';
        //                this._active = true;
        //            } else {
        //                this._sys_id = '' + package.sys_id;
        //                this._name = '' + package.name;
        //                this._id = '' + package.source;
        //                this._active = package.active == true;
        //            }
        //            item = scopeCache['(empty)'];
        //        } else {
        //            this._scope = '' + scope.scope;
        //            item = scopeCache[this._scope];
        //            if (typeof item === 'undefined') {
        //                item = {
        //                    active: scope.active == true,
        //                    id: '' + scope.source,
        //                    name: '' + scope.name,
        //                    packages: {},
        //                    short_description: '' + scope.short_description,
        //                    sys_id: '' + scope.sys_id
        //                };
        //                scopeCache[this._scope] = item;
        //            }
        //            if (gs.nil(package) || package.sys_id == scope.sys_id) {
        //                this._sys_id = item.sys_id;
        //                this._name = item.name;
        //                this._id = item.id;
        //                this._active = item.active;
        //            } else {
        //                this._sys_id = '' + package.sys_id;
        //                this._name = '' + package.name;
        //                this._id = '' + package.source;
        //                this._active = package.active == true;
        //            }
        //        }
        //        var pkg: IPackageCacheItem = item.packages[this._id];
        //        if (typeof pkg === 'undefined')
        //            item.packages[this._id] = {
        //                package: this,
        //                tables: {}
        //            };
        //        else
        //            pkg.package = this;
        //    },
        //    getSysId: function (this: IDtsPackagePrototype): string { return this._sys_id; },
        //    getId: function (this: IDtsPackagePrototype): string { return this._id; },
        //    isActive: function (this: IDtsPackagePrototype): boolean { return this._active; },
        //    getName: function (this: IDtsPackagePrototype): string { return this._name; },
        //    getScope: function (this: IDtsPackagePrototype): string { return this._scope; },
        //    getScopeShortDescription: function (this: IDtsPackagePrototype): string { return (this._scope.length == 0) ? scopeCache['(empty)'].short_description : scopeCache[this._scope].short_description; },
        //    getScopeSysId: function (this: IDtsPackagePrototype): string { return (this._scope.length == 0) ? scopeCache['(empty)'].sys_id : scopeCache[this._scope].sys_id; },
        //    getScopeId: function (this: IDtsPackagePrototype): string { return (this._scope.length == 0) ? scopeCache['(empty)'].id : scopeCache[this._scope].id; },
        //    isScopeActive: function (this: IDtsPackagePrototype): boolean { return (this._scope.length == 0) ? scopeCache['(empty)'].active : scopeCache[this._scope].active; },
        //    getScopeName: function (this: IDtsPackagePrototype): string { return (this._scope.length == 0) ? scopeCache['(empty)'].name : scopeCache[this._scope].name; },
        //    type: "DtsPackage"
        //};
        //DtsPackage.get = function (package: sys_packageFields, scope: sys_scopeFields): DtsPackage {
        //    var item: IScopeCacheItem;
        //    var s: string;
        //    if (gs.nil(scope))
        //        item = scopeCache['(empty)'];
        //    else {
        //        s = '' + scope.scope;
        //        item = scopeCache['' + scope.scope];
        //        if (typeof item === 'undefined')
        //            return new DtsPackage(package, scope);
        //    }
        //    s = (gs.nil(package)) ? '' : '' + package.source;
        //    var pkg: IPackageCacheItem = item.packages[s];
        //    if (typeof pkg === 'undefined')
        //        return new DtsPackage(package, scope);
        //    return pkg.package;
        //};
        //var DtsTableConstructor: DtsTableConstructor = Class.create();
        //DtsTableConstructor.prototype = {
        //    _table: undefined,
        //    initialize(this: IDtsTablePrototype, table: sys_db_objectGlideRecord | string): void {
        //        if (typeof table === 'string') {
        //            var gr: sys_db_objectGlideRecord = <sys_db_objectGlideRecord>new GlideRecord('sys_db_object');
        //            gr.addNotNullQuery
        //            gr.addQuery(table);
        //            gr.query();
        //            if (!gr.next()) {
        //                gr = <sys_db_objectGlideRecord>new GlideRecord('sys_db_object');
        //                gr.addQuery('name', table);
        //                if (!gr.next())
        //                    throw new Error("Table named " + JSON.stringify(table) + " not found.");
        //            }
        //            this._table = gr;
        //        } else if (typeof table === 'object' && table != null) {
        //            if (table.getTableName() != 'sys_db_object')
        //                throw new Error("Argument does not represent sys_db_object");
        //            if (table.isNewRecord() || !table.isValidRecord())
        //                throw new Error("Glide record is not valid");
        //            this._table = table;
        //        } else
        //            throw new Error("Argument is not a string, GlideRecord or reference element");
        //    },
        //    getParent(this: IDtsTablePrototype): DtsTable | undefined {
        //        if (typeof this._parent === 'undefined') {
        //            if (gs.nil(this._table.super_class))
        //                this._parent = null;
        //            else
        //                try { this._parent = DtsTableConstructor.get('' + (<$$element.Reference<sys_db_objectFields, sys_db_objectGlideRecord>>this._table.super_class).name); }
        //                catch { this._parent = null; }
        //        }
        //        if (this._parent != null)
        //            return this._parent;
        //    },
        //    getPackage: function (this: IDtsTablePrototype): DtsPackage {
        //        if (typeof this._package === 'undefined')
        //            this._package = DtsPackage.get(<sys_packageFields>this._table.sys_package, <sys_scopeFields>this._table.sys_scope);
        //        return this._package;
        //    },
        //    getFullName: function (this: IDtsTablePrototype): string {
        //        var package: DtsPackage = this.getPackage();
        //        var n = '' + this._table.sys_class_name;
        //        var s = package.getScope();
        //        if (s.length > 0 && n.length > s.length && s.startsWith(n))
        //            return s + '.' + n.substr(s.length);
        //        return n;
        //    },
        //    getTableDisplayName: function (this: IDtsTablePrototype): string { return this._table.getDisplayValue(); },
        //    getTableName: function (this: IDtsTablePrototype): string { return '' + this._table.name; },
        //    type: "DtsTable"
        //};
        //DtsTableConstructor.get = function (table: sys_db_objectGlideRecord | string): DtsTable | undefined {
        //    var gr: sys_db_objectGlideRecord;
        //    if (typeof table === 'string') {
        //        gr = <sys_db_objectGlideRecord>new GlideRecord('sys_db_object');
        //        gr.addNotNullQuery
        //        gr.addQuery(table);
        //        gr.query();
        //        if (!gr.next()) {
        //            gr = <sys_db_objectGlideRecord>new GlideRecord('sys_db_object');
        //            gr.addQuery('name', table);
        //            if (!gr.next())
        //                return;
        //        }
        //    } else if (typeof table === 'object' && table != null) {
        //        if (table.getTableName() != 'sys_db_object')
        //            throw new Error("Argument does not represent sys_db_object");
        //        if (table.isNewRecord() || !table.isValidRecord())
        //            throw new Error("Glide record is not valid");
        //        gr = table;
        //    } else
        //        throw new Error("Argument is not a string, GlideRecord or reference element");
        //    var pkg: DtsPackage = DtsPackage.get(<sys_packageFields>this._table.sys_package, <sys_scopeFields>this._table.sys_scope);
        //    var item: IPackageCacheItem = ((pkg.getScope().length == 0) ? scopeCache['(empty)'] : scopeCache[pkg.getScope()])[pkg.getId()];
        //    var dtsTable: DtsTable = item.tables['' + gr.name];
        //    if (typeof dtsTable === 'undefined')
        //        return new DtsTableConstructor(gr);
        //    return dtsTable;
        //}
        //var DTSHelperConstructor: DTSHelperConstructor = Class.create();
        //DTSHelperConstructor.prototype = {
        //    initialize(this: IDTSHelperPrototype): void { },
        //    type: "DTSHelper"
        //};
        return DtsPackage;
    })();
})(x_44813_dev_ts_hlp || (x_44813_dev_ts_hlp = {}));
//# sourceMappingURL=x_44813_dev_ts_hlp.js.map