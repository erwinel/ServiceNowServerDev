declare namespace x_44813_sec_clsif {
    /**
     * Represents a cached security classification table row.
     */
    interface IClassificationCacheItem extends classificationPair {
        /**
         * Sort order of item.
         */
        order: number;
        /**
         * System identifier/
         */
        sys_id: string;
    }
    /**
     * Represents a cached security classification information.
     */
    interface IClassificationCache {
        /**
         * Hash of security classifications using the full name as the key.
         */
        byName: {
            [key: string]: IClassificationCacheItem;
        };
        /**
         * Hash of security classifications using the portion marking as the key.
         */
        byPortionMarking: {
            [key: string]: IClassificationCacheItem;
        };
        /**
         * Ordered array of security classifications.
         */
        ordered: IClassificationCacheItem[];
    }
    /**
     * Utility for retrieving security classifications.
     * @class
     */
    class ClassificationUtil {
        private _types;
        private static __defaultPortionMarking;
        private static __classificationCache;
        /**
         * Name of table containing security classifications.
         */
        static tableName: string;
        /**
         * Name of fields used for defining security classifications.
         */
        static fieldNames: {
            sysId: string;
            name: string;
            portionMarking: string;
            order: string;
            active: string;
        };
        /**
         * Name of system setting which is used for storing the default classification.
         */
        static settingsName: string;
        /**
         * Creates a new GlideRecord for the security classification definitions table.
         * @returns {GlideRecord} A glide record for interfacing with the security classification definitions table.
         */
        static createGlideRecord(): GlideRecord;
        /**
         * Gets the portion marking for the default security classification.
         * @returns {string} Portion marking for the default security classification.
         */
        getDefaultPortionMarking(): string;
        /**
         * Gets all security classifications.
         * @param force If true, then security classifications are reloaded from the database; otherwise, a cached copy is returned if the security classifications were already loaded.
         * @returns {IClassificationCacheItem[]} Array of security classification information.
         * @description When this is invoked, all compliant security classifications will be added if they do not exist, and their order will be updated, if necessary.
         */
        getAllClassifications(force?: boolean): IClassificationCacheItem[];
        /**
         * Gets cache information for loaded security classifications.
         * @param force If true, then security classificatins are reloaded from the database; otherwise, a cached copy is returned if the security classifications were already loaded.
         * @returns {IClassificationCache} Security classification class information.
         * @description When this is invoked, all compliant security classifications will be added if they do not exist, and their order will be updated, if necessary.
         */
        getClassificationCache(force?: boolean): IClassificationCache;
        /**
         * Converts security classification fields of a Glide record to a JSON object.
         * @param gr GlideRecord containing security classification fields to convert to JSON.
         * @returns {IClassificationCacheItem} An object can be JSON serialized.
         */
        glideRecordToJSON(gr: GlideRecord): IClassificationCacheItem;
    }
}
