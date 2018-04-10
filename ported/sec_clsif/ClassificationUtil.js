/**
 * Utility for retrieving security classifications.
 * @class
 */
var ClassificationUtil = Class.create();
(function (ClassificationUtil) {
    var cProto = {
        initialize: function() {
            this._types = new x_44813_util.types();
        }
    };
    
    /**
     * Creates a new GlideRecord for the security classification definitions table.
     * @returns {GlideRecord} A glide record for interfacing with the security classification definitions table.
     */
    ClassificationUtil.createGlideRecord = function () { return new GlideRecord(ClassificationUtil.tableName); };
    
    /**
     * Gets the portion marking for the default security classification.
     * @returns {string} Portion marking for the default security classification.
     */
    cProto.getDefaultPortionMarking = function () {
        if (this._types.isString(ClassificationUtil.__defaultPortionMarking))
            return ClassificationUtil.__defaultPortionMarking;
        var s = gs.getProperty(ClassificationUtil.settingsName, '').trim();
        if (s.length == 0) {
            ClassificationUtil.__defaultPortionMarking = x_44813_sec_clsif.ClassificationValidator.compliantClassifications[0].portion_marking;
            gs.setProperty(ClassificationUtil.settingsName, ClassificationUtil.__defaultPortionMarking);
        }
        else
            ClassificationUtil.__defaultPortionMarking = s;
        return ClassificationUtil.__defaultPortionMarking;
    };
    
    /**
     * Gets all security classifications.
     * @param force If true, then security classifications are reloaded from the database; otherwise, a cached copy is returned if the security classifications were already loaded.
     * @returns {IClassificationCacheItem[]} Array of security classification information.
     * @description When this is invoked, all compliant security classifications will be added if they do not exist, and their order will be updated, if necessary.
     */
    cProto.getAllClassifications = function (force) {
        var cache = this.getClassificationCache(force);
        return cache.ordered;
    };

    /**
     * Gets cache information for loaded security classifications.
     * @param force If true, then security classificatins are reloaded from the database; otherwise, a cached copy is returned if the security classifications were already loaded.
     * @returns {IClassificationCache} Security classification class information.
     * @description When this is invoked, all compliant security classifications will be added if they do not exist, and their order will be updated, if necessary.
     */
    cProto.getClassificationCache = function (force) {
        if (ClassificationUtil.__classificationCache.ordered.length > 0 && !force)
            return {
                byName: ClassificationUtil.__classificationCache.byName,
                byPortionMarking: ClassificationUtil.__classificationCache.byPortionMarking,
                ordered: ClassificationUtil.__classificationCache.ordered
            };
        var gr = ClassificationUtil.createGlideRecord();
        gr.query();
        var allClassifications = [];
        while (gr.next()) {
            var obj = this.glideRecordToJSON(gr);
            ClassificationUtil.__classificationCache.byName[obj.name] = obj;
            ClassificationUtil.__classificationCache.byPortionMarking[obj.portion_marking] = obj;
            allClassifications.push(obj);
        }
        x_44813_sec_clsif.ClassificationValidator.compliantClassifications.filter(function (p) {
            return allClassifications.filter(function (a) { return a.portion_marking == p.portion_marking; }).length == 0;
        }).forEach(function (a, i) {
            gr = ClassificationUtil.createGlideRecord();
            gr.newRecord();
            gr.setValue(ClassificationUtil.fieldNames.name, a.name);
            gr.setValue(ClassificationUtil.fieldNames.portionMarking, a.portion_marking);
            gr.setValue(ClassificationUtil.fieldNames.order, (i + 1) * 100);
            gr.setValue(ClassificationUtil.fieldNames.active, true);
            gr.update();
            allClassifications.push(this.glideRecordToJSON(gr));
        });
        allClassifications.filter(function (a) { return this.isNil(ClassificationUtil.__classificationCache.byPortionMarking[a.name]); }, this._types)
            .sort(function (a) { return a.order; })
            .concat(allClassifications.filter(function (a) { return !this.isNil(ClassificationUtil.__classificationCache.byPortionMarking[a.name]); }, this._types)
            .sort(function (a) { return a.order; })).forEach(function (a, i) {
            var o = (i + 1) * 100;
            if (a.order == o)
                return;
            gr = ClassificationUtil.createGlideRecord();
            gr.get(a.sys_id);
            gr.setValue(ClassificationUtil.fieldNames.order, o);
            gr.update();
            a.order = o;
        });
        ClassificationUtil.__classificationCache.ordered = allClassifications.sort(function (a) { return a.order; });
        return {
            byName: ClassificationUtil.__classificationCache.byName,
            byPortionMarking: ClassificationUtil.__classificationCache.byPortionMarking,
            ordered: ClassificationUtil.__classificationCache.ordered
        };
    };
    
    /**
     * Converts security classification fields of a Glide record to a JSON object.
     * @param gr GlideRecord containing security classification fields to convert to JSON.
     * @returns {IClassificationCacheItem} An object can be JSON serialized.
     */
    cProto.glideRecordToJSON = function (gr) {
        return {
            order: this._types.asNumber(gr.getValue(ClassificationUtil.fieldNames.order)),
            sys_id: this._types.asString(gr.getValue(ClassificationUtil.fieldNames.sysId)),
            name: this._types.asString(gr.getValue(ClassificationUtil.fieldNames.name)),
            portion_marking: this._types.asString(gr.getValue(ClassificationUtil.fieldNames.portionMarking))
        };
    };

    ClassificationUtil.__defaultPortionMarking = null;
    ClassificationUtil.__classificationCache = {
        byName: {},
        byPortionMarking: {},
        ordered: []
    };
    ClassificationUtil.tableName = 'x_44813_sec_clsif_definition';
    ClassificationUtil.fieldNames = {
        sysId: 'sys_id',
        name: 'name',
        portionMarking: 'portion_marking',
        order: 'order',
        active: 'active'
    };
    ClassificationUtil.settingsName = 'x_44813_sec_clsif.default_classification';
    cProto.type = 'ClassificationUtil';
    ClassificationUtil.prototype = cProto;
}(ClassificationUtil));