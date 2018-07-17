export module x_44813_grpnamereg {
    /**
     * Utility methods for working with the Interop Group Names registry.
     */
    export class GroupRegUtil {
        readonly type: string = "GroupRegUtil";
        static readonly tableName: string = "x_44813_grpnamereg_groups";

        /**
         * Gets the first row from the Interop Group Names table that matches the specified name.
         * @param name Name of group to look up.
         * @returns {GlideRecord|undefined} The GlideRecord from the Interop Group Names table or undefined if no match was found.
         */
        getRegRecordByGroupName(name: string): GlideRecord|undefined {
            let regGr: GlideRecord = new GlideRecord(GroupRegUtil.tableName);
            regGr.addQuery("group_name", name);
            regGr.query();
            if (regGr.next())
                return regGr;
        }

        /**
         * Ensures that a group is registered by name, adding it if necessary.
         * @param name Name of group to look up.
         * @returns {GlideRecord|undefined} The associated GlideRecord from the Interop Group Names table or undefined if no matching group name or system group was found.
         */
        ensureRegRecordByGroupName(name: string): GlideRecord|undefined {
            let regGr: GlideRecord|undefined = this.getRegRecordByGroupName(name);
            if (typeof(regGr) == "object")
                return regGr;
            if (name.trim().length == 0)
                throw "Name cannot be empty";
            let groupGr: GlideRecord|undefined = this.findSnGroupRecordByName(name);
            if (typeof(groupGr) == "object") {
                regGr = new GlideRecord(GroupRegUtil.tableName);
                regGr.setValue("group_name", groupGr.getValue("name"));
                regGr.setValue("sn_group", groupGr.getValue("sys_id"));
                regGr.update();
                return regGr;
            }
        }

        /**
         * Searches for the sys_group table for the first group matching a specified name.
         * @param name Name of group to look up.
         * @param boolean If not true, then only active groups will be returned.
         * @returns {GlideRecord|undefined} The associated GlideRecord from the sys_group table or undefined if no system group was found.
         */
        findSnGroupRecordByName(name: string, includeInactive?: boolean): GlideRecord|undefined {
            let gr: GlideRecord = new GlideRecord("sys_user_group");
            gr.addQuery("name", name);
            gr.query();
            if (gr.next())
                return gr;
        }

        /**
         * Gets the system group record associated with the first item in the Interop Group Names table that matches the specified name.
         * @param name Name of group to look up.
         * @param boolean If not true, then only active groups will be returned.
         * @returns {GlideRecord|undefined} The associated GlideRecord from the sys_group table or undefined if no system group was found.
         */
        getGroupRecordByGroupName(name: string, includeInactive?: boolean): GlideRecord|undefined {
            let regGr: GlideRecord = new GlideRecord(GroupRegUtil.tableName);
            let groupGr: GlideRecord|undefined;
            regGr.addQuery("group_name", name);
            regGr.query();
            if (regGr.next()) {
                let sys_id: string|null|undefined = regGr.getValue("sn_group");
                if (typeof(sys_id) != "string") {
                    groupGr = this.findSnGroupRecordByName(name, includeInactive);
                    if (typeof(groupGr) == "object") {
                        regGr.setValue("sn_group", groupGr.getValue("sys_id"));
                        regGr.update();
                        return groupGr;
                    }
                } else {
                    let groupGr = new GlideRecord("sys_user_group");
                    groupGr.addQuery("sys_id", sys_id);
                    if (typeof(includeInactive) != "boolean" || !includeInactive)
                        groupGr.addActiveQuery();
                    groupGr.query();
                    if (groupGr.next())
                        return groupGr;
                }
            }
        }

        /**
         * Gets the sys_id of the system group record associated with the first item in the Interop Group Names table that matches the specified name.
         * @param name Name of group to look up.
         * @param boolean If not true, then only active groups' sys_ids will be returned.
         * @returns {GlideRecord|undefined} The sys_id of the associated GlideRecord from the sys_group table or undefined if no system group was found.
         */
        getGroupSysIdByGroupName(name: string, validate?: boolean, includeInactive?: boolean): string|undefined {
            let regGr: GlideRecord = new GlideRecord(GroupRegUtil.tableName);
            let grpGr: GlideRecord|undefined;
            regGr.addQuery("group_name", name);
            regGr.query();
            if (regGr.next()) {
                let sys_id: string|null|undefined = regGr.getValue("sn_group");
                if (typeof(sys_id) != "string") {
                    grpGr = this.findSnGroupRecordByName(name);
                    if (typeof(grpGr) == "object") {
                        sys_id = grpGr.getValue("sys_id");
                        regGr.setValue("sn_group", sys_id);
                        regGr.update();
                        return sys_id;
                    }
                } else if (typeof(validate) == "boolean" && validate) {
                    grpGr = new GlideRecord("sys_user_group");
                    grpGr.addQuery("sys_id", sys_id);
                    if (typeof(includeInactive) != "boolean" || !includeInactive)
                        grpGr.addActiveQuery();
                    grpGr.query();
                    if (grpGr.next())
                        return sys_id;
                } else
                    return sys_id;
            }
        }
    }
}