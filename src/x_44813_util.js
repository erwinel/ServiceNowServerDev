/// <reference path="base.d.ts" />
var x_44813_util;
(function (x_44813_util) {
    x_44813_util.TaskHelper = (function () {
        var taskHelperConstructor = Class.create();
        function getCaller(task) {
            /*
                .Feedback[Knowledge Feedback Task]User VIP = true
                .Request[Requested Item]Requested for VIP = true
                .Incident[Security Incident]Caller VIP = true
                .Affected user[Security Incident Response Task]VIP = true
                    .Caller[Service Order]VIP = true
            */
            var caller;
            switch ('' + task.sys_class_name) {
                case 'incident':
                    caller = task.caller_id;
                    break;
                case 'change_request_imac':
                    caller = task.move_user;
                    break;
                case 'incident_task':
                    caller = task.incident.caller_id;
                    break;
                case 'kb_feedback_task':
                    break;
                case 'sn_si_incident':
                    break;
                case 'sn_si_task':
                    break;
                case 'sm_task':
                    break;
                case 'sc_request':
                    caller = task.requested_for;
                    break;
                case 'sc_req_item':
                    caller = task.request.requested_for;
                    break;
                case 'sc_task':
                    caller = task.request.requested_for;
                    break;
            }
            if (!gs.nil(caller))
                return caller;
        }
        function isVip(task) {
            var caller = getCaller(task);
            return typeof caller !== 'undefined' && caller.vip == true;
        }
        taskHelperConstructor.getCaller = getCaller;
        taskHelperConstructor.isVip = isVip;
        function getLatestSummary(group_id, type) {
            var gr = new GlideRecord('x_44813_util_taskoverview');
            gr.addQuery('group', group_id);
            gr.addQuery('type', type);
            gr.addQuery('archived', false);
            gr.orderByDesc('sys_updated_on');
            gr.query();
            if (gr.next())
                return gr;
        }
        function toTaskReference(task) {
            return {
                createdOn: new GlideDateTime('' + task.sys_created_on),
                sys_id: '' + task.sys_id,
                updatedOn: new GlideDateTime('' + task.sys_updated_on),
                vip: isVip(task)
            };
        }
        function toGroupTasksOverview(source) {
            var result = {
                sys_id: '' + source.sys_id,
                createdOn: new GlideDateTime('' + source.sys_created_on),
                updatedOn: new GlideDateTime('' + source.sys_updated_on),
                critical_priority_open_count: parseInt('' + source.critical_priority_open_count),
                high_priority_open_count: parseInt('' + source.high_priority_open_count),
                medium_and_lower_open_count: parseInt('' + source.medium_and_lower_open_count),
                non_vip_open_count: parseInt('' + source.non_vip_open_count),
                recently_closed_count: parseInt('' + source.recently_closed_count),
                vip_open_count: parseInt('' + source.vip_open_count),
                archived: source.archived == true
            };
            if (!gs.nil(source.latest_task_by_update)) {
                result.latest_task_by_update = toTaskReference(source.latest_task_by_update);
                if (!gs.nil(source.latest_updated_on))
                    result.latest_task_by_update.updatedOn = new GlideDateTime('' + source.latest_updated_on);
            }
            if (!gs.nil(source.newest_task_by_creation)) {
                result.newest_task_by_creation = toTaskReference(source.newest_task_by_creation);
                if (!gs.nil(source.newest_created_on))
                    result.newest_task_by_creation.createdOn = new GlideDateTime('' + source.newest_created_on);
            }
            if (!gs.nil(source.oldest_task_by_creation)) {
                result.oldest_task_by_creation = toTaskReference(source.oldest_task_by_creation);
                if (!gs.nil(source.oldest_created_on))
                    result.oldest_task_by_creation.createdOn = new GlideDateTime('' + source.oldest_created_on);
            }
            if (!gs.nil(source.oldest_task_by_update)) {
                result.oldest_task_by_update = toTaskReference(source.oldest_task_by_update);
                if (!gs.nil(source.oldest_updated_on))
                    result.oldest_task_by_update.updatedOn = new GlideDateTime('' + source.oldest_updated_on);
            }
            return result;
        }
        taskHelperConstructor.prototype = {
            _group: undefined,
            initialize: function (group) {
                if (typeof group === 'string') {
                    var gr = new GlideRecord('sys_user_group');
                    gr.addQuery('sys_id', group);
                    gr.query();
                    if (!gr.next())
                        throw new Error("Group not found");
                    this._group = { sys_id: '' + gr.sys_id, name: '' + gr.name };
                }
                else {
                    if (gs.nil(group))
                        throw new Error("No group specified");
                    if (group instanceof GlideRecord && (group.isNewRecord() || !group.isValidRecord()))
                        throw new Error("Not a valiid group record");
                    this._group = { sys_id: '' + group.sys_id, name: '' + group.name };
                }
            },
            getLatestSummary: function (type) {
                var result = getLatestSummary(this._group.sys_id, type);
                if (typeof result !== 'undefined')
                    return toGroupTasksOverview(result);
            },
            getGroup: function () { return this._group; },
            getTaskCountsByType: function (table) {
                var result = {
                    sys_id: '',
                    createdOn: new GlideDateTime(),
                    updatedOn: new GlideDateTime(),
                    critical_priority_open_count: 0,
                    high_priority_open_count: 0,
                    medium_and_lower_open_count: 0,
                    non_vip_open_count: 0,
                    recently_closed_count: 0,
                    vip_open_count: 0,
                    archived: false
                };
                var latestSummary = getLatestSummary(this._group.sys_id, table);
                var agg = new GlideAggregate('task');
                agg.addQuery('assignment_group', this._group.sys_id);
                agg.addQuery('active', false);
                if (typeof latestSummary !== 'undefined')
                    agg.addQuery('closed_at', '>=', latestSummary.sys_updated_on);
                agg.addAggregate('count');
                agg.query();
                if (agg.next()) {
                    result.recently_closed_count = parseInt(agg.getAggregate('count'));
                    if (isNaN(result.recently_closed_count))
                        result.recently_closed_count = 0;
                }
                var gr;
                var hasResult = false;
                try {
                    gr = new GlideRecord(table);
                    gr.addActiveQuery();
                    gr.addQuery('assignment_group', this._group.sys_id);
                    hasResult = gr.next();
                }
                catch (_a) {
                    gr = new GlideRecord('task');
                    gr.addQuery('assignment_group', this._group.sys_id);
                    gr.addQuery('sys_class_name', table);
                    gr.addActiveQuery();
                    hasResult = gr.next();
                }
                if (hasResult) {
                    var task = toTaskReference(gr);
                    result.latest_task_by_update = task;
                    result.newest_task_by_creation = task;
                    result.oldest_task_by_creation = task;
                    result.oldest_task_by_update = task;
                    if (isVip(gr))
                        result.vip_open_count = 1;
                    else
                        result.non_vip_open_count = 1;
                    if (gr.priority < 2)
                        result.critical_priority_open_count = 1;
                    else if (gr.priority == 2)
                        result.high_priority_open_count = 1;
                    else
                        result.medium_and_lower_open_count = 1;
                    while (gr.next()) {
                        if (isVip(gr))
                            result.vip_open_count++;
                        else
                            result.non_vip_open_count++;
                        if (gr.priority < 2)
                            result.critical_priority_open_count++;
                        else if (gr.priority == 2)
                            result.high_priority_open_count++;
                        else
                            result.medium_and_lower_open_count++;
                        task = toTaskReference(gr);
                        if (task.updatedOn.compareTo(result.latest_task_by_update) > 0)
                            result.latest_task_by_update = task;
                        if (task.createdOn.compareTo(result.newest_task_by_creation) > 0)
                            result.newest_task_by_creation = task;
                        if (task.updatedOn.compareTo(result.oldest_task_by_update) < 0)
                            result.oldest_task_by_update = task;
                        if (task.createdOn.compareTo(result.oldest_task_by_creation) < 0)
                            result.oldest_task_by_creation = task;
                    }
                }
                else if (result.recently_closed_count == 0)
                    return;
                return result;
            },
            getTaskCounts: function () {
                var agg = new GlideAggregate('task');
                agg.addQuery('assignment_group', this._group.sys_id);
                agg.addAggregate('count');
                agg.groupBy('sys_class_name');
                agg.query();
                var result = {};
                var hasResult = false;
                while (agg.next()) {
                    var tableName = '' + agg.sys_class_name;
                    var overview = this.getTaskCountsByType(tableName);
                    if (typeof overview !== 'undefined') {
                        hasResult = true;
                        result[tableName] = overview;
                    }
                }
                if (hasResult)
                    return result;
            },
            type: 'TaskHelper'
        };
        return taskHelperConstructor;
    })();
    var business_rule;
    (function (business_rule) {
        (function (dayOfWeek) {
            if (dayOfWeek < 1 || dayOfWeek > 5)
                return;
            var gr = new GlideRecord('sys_user_group');
            gr.addActiveQuery();
            gr.query();
            var sys_ids = [];
            while (gr.next())
                sys_ids.push('' + gr.sys_id);
            var latest_summaries = [];
            var latestSummary = new GlideRecord('x_44813_util_taskoverview');
            latestSummary.addQuery('archived', false);
            latestSummary.query();
            while (latestSummary.next)
                for (var i = 0; i < sys_ids.length; i++) {
                    var gr = new GlideRecord('sys_user_group');
                    gr.addQuery('sys_id', sys_ids[i]);
                    gr.query();
                    if (gr.next()) {
                        var th = new x_44813_util.TaskHelper(gr);
                        var overview = th.getTaskCounts();
                        if (typeof overview !== 'undefined') {
                            var summaryIds = [];
                            for (var type in overview) {
                                var newSummary = new GlideRecord('x_44813_util_taskoverview');
                                newSummary.newRecord();
                                newSummary.setValue('group', gr.sys_id);
                                newSummary.setValue('type', type);
                                newSummary.setValue('critical_priority_open_count', overview.critical_priority_open_count);
                                newSummary.setValue('high_priority_open_count', overview.high_priority_open_count);
                                newSummary.setValue('medium_and_lower_open_count', overview.medium_and_lower_open_count);
                                newSummary.setValue('non_vip_open_count', overview.non_vip_open_count);
                                newSummary.setValue('recently_closed_count', overview.recently_closed_count);
                                newSummary.setValue('vip_open_count', overview.vip_open_count);
                                if (typeof overview.latest_task_by_update !== 'undefined') {
                                    newSummary.setValue('latest_task_by_update', overview.latest_task_by_update.sys_id);
                                    newSummary.setValue('latest_updated_on', overview.latest_task_by_update.updatedOn);
                                    newSummary.setValue('newest_task_by_creation', overview.newest_task_by_creation.sys_id);
                                    newSummary.setValue('newest_created_on', overview.newest_task_by_creation.createdOn);
                                    newSummary.setValue('oldest_task_by_creation', overview.oldest_task_by_creation.sys_id);
                                    newSummary.setValue('oldest_created_on', overview.oldest_task_by_creation.createdOn);
                                    newSummary.setValue('oldest_task_by_update', overview.oldest_task_by_update.sys_id);
                                    newSummary.setValue('oldest_updated_on', overview.oldest_task_by_update.updatedOn);
                                }
                                newSummary.update();
                                summaryIds.push('' + newSummary.sys_id);
                            }
                            gs.eventQueue('army.sys_user_group.task_unassigned', gr, summaryIds.join(","));
                        }
                    }
                }
        })((new GlideDateTime()).getDayOfWeekLocalTime());
    })(business_rule || (business_rule = {}));
})(x_44813_util || (x_44813_util = {}));
//# sourceMappingURL=x_44813_util.js.map