/**
 * Utility methods for working with the Interop Group Names registry.
 */
var GroupRegUtil = Class.create();
GroupRegUtil.prototype = {
    initialize: function() {
    },
    /**
     * Gets the first row from the Interop Group Names table that matches the specified name.
     * @param name Name of group to look up.
     * @returns {GlideRecord|undefined} The GlideRecord from the Interop Group Names table or undefined if no match was found.
     */
    getRegRecordByGroupName: function (name) {
        var regGr = new GlideRecord(GroupRegUtil.tableName);
        regGr.addQuery("group_name", name);
        regGr.query();
        if (regGr.next())
            return regGr;
    },
    /**
     * Ensures that a group is registered by name, adding it if necessary.
     * @param name Name of group to look up.
     * @returns {GlideRecord|undefined} The associated GlideRecord from the Interop Group Names table or undefined if no matching group name or system group was found.
     */
    ensureRegRecordByGroupName: function (name) {
        var regGr = this.getRegRecordByGroupName(name);
        if (typeof (regGr) == "object")
            return regGr;
        if (name.trim().length == 0)
            throw "Name cannot be empty";
        var groupGr = this.findSnGroupRecordByName(name);
        if (typeof (groupGr) == "object") {
            regGr = new GlideRecord(GroupRegUtil.tableName);
            regGr.setValue("group_name", groupGr.getValue("name"));
            regGr.setValue("sn_group", groupGr.getValue("sys_id"));
            regGr.update();
            return regGr;
        }
    },
    /**
     * Searches for the sys_group table for the first group matching a specified name.
     * @param name Name of group to look up.
     * @param boolean If not true, then only active groups will be returned.
     * @returns {GlideRecord|undefined} The associated GlideRecord from the sys_group table or undefined if no system group was found.
     */
    findSnGroupRecordByName: function (name, includeInactive) {
        var gr = new GlideRecord("sys_user_group");
        gr.addQuery("name", name);
        gr.query();
        if (gr.next())
            return gr;
    },
    /**
     * Gets the system group record associated with the first item in the Interop Group Names table that matches the specified name.
     * @param name Name of group to look up.
     * @param boolean If not true, then only active groups will be returned.
     * @returns {GlideRecord|undefined} The associated GlideRecord from the sys_group table or undefined if no system group was found.
     */
    getGroupRecordByGroupName: function (name, includeInactive) {
        var regGr = new GlideRecord(GroupRegUtil.tableName);
        var groupGr;
        regGr.addQuery("group_name", name);
        regGr.query();
        if (regGr.next()) {
            var sys_id = regGr.getValue("sn_group");
            if (typeof (sys_id) != "string") {
                groupGr = this.findSnGroupRecordByName(name, includeInactive);
                if (typeof (groupGr) == "object") {
                    regGr.setValue("sn_group", groupGr.getValue("sys_id"));
                    regGr.update();
                    return groupGr;
                }
            }
            else {
                var groupGr_1 = new GlideRecord("sys_user_group");
                groupGr_1.addQuery("sys_id", sys_id);
                if (typeof (includeInactive) != "boolean" || !includeInactive)
                    groupGr_1.addActiveQuery();
                groupGr_1.query();
                if (groupGr_1.next())
                    return groupGr_1;
            }
        }
    },
    
    /**
     * Gets the sys_id of the system group record associated with the first item in the Interop Group Names table that matches the specified name.
     * @param name Name of group to look up.
     * @param boolean If not true, then only active groups' sys_ids will be returned.
     * @returns {GlideRecord|undefined} The sys_id of the associated GlideRecord from the sys_group table or undefined if no system group was found.
     */
    getGroupSysIdByGroupName: function (name, validate, includeInactive) {
        var regGr = new GlideRecord(GroupRegUtil.tableName);
        var grpGr;
        regGr.addQuery("group_name", name);
        regGr.query();
        if (regGr.next()) {
            var sys_id = regGr.getValue("sn_group");
            if (typeof (sys_id) != "string") {
                grpGr = this.findSnGroupRecordByName(name);
                if (typeof (grpGr) == "object") {
                    sys_id = grpGr.getValue("sys_id");
                    regGr.setValue("sn_group", sys_id);
                    regGr.update();
                    return sys_id;
                }
            }
            else if (typeof (validate) == "boolean" && validate) {
                grpGr = new GlideRecord("sys_user_group");
                grpGr.addQuery("sys_id", sys_id);
                if (typeof (includeInactive) != "boolean" || !includeInactive)
                    grpGr.addActiveQuery();
                grpGr.query();
                if (grpGr.next())
                    return sys_id;
            }
            else
                return sys_id;
        }
    },
    type: 'GroupRegUtil'
};
GroupRegUtil.tableName = "x_44813_grpnamereg_groups";