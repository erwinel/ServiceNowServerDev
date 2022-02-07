export declare module x_44813_grpnamereg {
    /**
     * Utility methods for working with the Interop Group Names registry.
     */
    class GroupRegUtil {
        readonly type: string;
        static readonly tableName: string;
        /**
         * Gets the first row from the Interop Group Names table that matches the specified name.
         * @param name Name of group to look up.
         * @returns {GlideRecord|undefined} The GlideRecord from the Interop Group Names table or undefined if no match was found.
         */
        getRegRecordByGroupName(name: string): GlideRecord | undefined;
        /**
         * Ensures that a group is registered by name, adding it if necessary.
         * @param name Name of group to look up.
         * @returns {GlideRecord|undefined} The associated GlideRecord from the Interop Group Names table or undefined if no matching group name or system group was found.
         */
        ensureRegRecordByGroupName(name: string): GlideRecord | undefined;
        /**
         * Searches for the sys_group table for the first group matching a specified name.
         * @param name Name of group to look up.
         * @param boolean If not true, then only active groups will be returned.
         * @returns {GlideRecord|undefined} The associated GlideRecord from the sys_group table or undefined if no system group was found.
         */
        findSnGroupRecordByName(name: string, includeInactive?: boolean): GlideRecord | undefined;
        /**
         * Gets the system group record associated with the first item in the Interop Group Names table that matches the specified name.
         * @param name Name of group to look up.
         * @param boolean If not true, then only active groups will be returned.
         * @returns {GlideRecord|undefined} The associated GlideRecord from the sys_group table or undefined if no system group was found.
         */
        getGroupRecordByGroupName(name: string, includeInactive?: boolean): GlideRecord | undefined;
        /**
         * Gets the sys_id of the system group record associated with the first item in the Interop Group Names table that matches the specified name.
         * @param name Name of group to look up.
         * @param boolean If not true, then only active groups' sys_ids will be returned.
         * @returns {GlideRecord|undefined} The sys_id of the associated GlideRecord from the sys_group table or undefined if no system group was found.
         */
        getGroupSysIdByGroupName(name: string, validate?: boolean, includeInactive?: boolean): string | undefined;
    }
}
