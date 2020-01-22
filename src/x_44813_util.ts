/// <reference path="../ServiceNowTypings/ServerScoped/base.d.ts" />

namespace x_44813_util {
    export interface IGroupReference {
        sys_id: string;
        name: string;
    }
    export interface ITaskReference {
        sys_id: string;
        createdOn: GlideDateTime;
        updatedOn: GlideDateTime;
        vip: boolean;
    }
    export interface IGroupTasksOverview {
        sys_id: string;
        createdOn: GlideDateTime;
        updatedOn: GlideDateTime;
        critical_priority_open_count: number;
        high_priority_open_count: number;
        latest_task_by_update?: ITaskReference;
        medium_and_lower_open_count: number;
        newest_task_by_creation?: ITaskReference;
        non_vip_open_count: number;
        oldest_task_by_creation?: ITaskReference;
        oldest_task_by_update?: ITaskReference;
        recently_closed_count: number;
        vip_open_count: number;
        archived: boolean;
    }

    export interface IGroupTaskOverviewByType { [tableName: string]: IGroupTasksOverview; }

    export interface ITaskHelperBase extends ICustomClassBase<ITaskHelperBase, "TaskHelper"> {
        getGroup(): IGroupReference;
        getTaskCountsByType(table: string): IGroupTasksOverview | undefined;
        getTaskCounts(): IGroupTaskOverviewByType | undefined;
        getLatestSummary(type: string): IGroupTasksOverview | undefined;
    }

    export interface ITaskHelperPrototype extends ICustomClassPrototype1<ITaskHelperBase, ITaskHelperPrototype, "TaskHelper", string>, ITaskHelperBase {
        _group: IGroupReference;
    }

    export interface ITaskHelper extends Readonly<ITaskHelperBase> { }

    export interface TaskHelperConstructor extends CustomClassConstructor1<ITaskHelperBase, ITaskHelperPrototype, ITaskHelper, string> {
        new(group: string | sys_user_groupFields): ITaskHelper;
        (group: string | sys_user_groupFields): ITaskHelper;
        getCaller(task: taskFields): sys_userFields | undefined;
        isVip(task: taskFields): boolean;
    }

    export const TaskHelper: TaskHelperConstructor = (function (): TaskHelperConstructor {
        var taskHelperConstructor: TaskHelperConstructor = Class.create();

        function getCaller(task: taskFields): sys_userFields | undefined {
            /*
                .Feedback[Knowledge Feedback Task]User VIP = true
                .Request[Requested Item]Requested for VIP = true
                .Incident[Security Incident]Caller VIP = true
                .Affected user[Security Incident Response Task]VIP = true
                    .Caller[Service Order]VIP = true
            */
            var caller: sys_userFields | undefined;
            switch ('' + task.sys_class_name) {
                case 'incident':
                    caller = <sys_userFields>(<incidentFields>task).caller_id;
                    break;
                case 'change_request_imac':
                    caller = <sys_userFields>(<change_request_imacFields>task).move_user;
                    break;
                case 'incident_task':
                    caller = <sys_userFields>(<incidentFields>(<incident_taskFields>task).incident).caller_id;
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
                    caller = <sys_userFields>(<sc_requestFields>task).requested_for;
                    break;
                case 'sc_req_item':
                    caller = <sys_userFields>(<sc_requestFields>(<sc_req_itemFields>task).request).requested_for;
                    break;
                case 'sc_task':
                    caller = <sys_userFields>(<sc_requestFields>(<sc_taskFields>task).request).requested_for;
                    break;
            }
            if (!gs.nil(caller))
                return caller;
        }

        function isVip(task: taskFields): boolean {
            var caller: sys_userFields | undefined = getCaller(task);
            return typeof caller !== 'undefined' && caller.vip == true;
        }

        taskHelperConstructor.getCaller = getCaller;
        taskHelperConstructor.isVip = isVip;

        function getLatestSummary(group_id: string, type: string): taskoverviewGlideRecord | undefined {
            var gr: taskoverviewGlideRecord = <taskoverviewGlideRecord>new GlideRecord('x_44813_util_taskoverview');
            gr.addQuery('group', group_id);
            gr.addQuery('type', type);
            gr.addQuery('archived', false);
            gr.orderByDesc('sys_updated_on');
            gr.query();
            if (gr.next())
                return gr;
        }

        function toTaskReference(task: $$property.generic.Reference<taskFields, taskGlideRecord>): ITaskReference {
            return {
                createdOn: new GlideDateTime('' + (<taskFields>task).sys_created_on),
                sys_id: '' + (<taskFields>task).sys_id,
                updatedOn: new GlideDateTime('' + (<taskFields>task).sys_updated_on),
                vip: isVip(<taskFields>task)
            };
        }

        function toGroupTasksOverview(source: taskoverviewFields): IGroupTasksOverview {
            var result: IGroupTasksOverview = {
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
            }
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
            initialize: function (this: ITaskHelperPrototype, group: string | sys_user_groupFields) {
                if (typeof group === 'string') {
                    var gr: sys_user_groupGlideRecord = <sys_user_groupGlideRecord>new GlideRecord('sys_user_group');
                    gr.addQuery('sys_id', group);
                    gr.query();
                    if (!gr.next())
                        throw new Error("Group not found");
                    this._group = { sys_id: '' + gr.sys_id, name: '' + gr.name };
                } else {
                    if (gs.nil(group))
                        throw new Error("No group specified");
                    if (group instanceof GlideRecord &&  (group.isNewRecord() || !group.isValidRecord()))
                            throw new Error("Not a valiid group record");
                    this._group = { sys_id: '' + group.sys_id, name: '' + group.name };
                }
            },

            getLatestSummary: function (this: ITaskHelperPrototype, type: string): IGroupTasksOverview | undefined {
                var result: taskoverviewGlideRecord | undefined = getLatestSummary(this._group.sys_id, type);
                if (typeof result !== 'undefined')
                    return toGroupTasksOverview(result);
            },

            getGroup: function (this: ITaskHelperPrototype): IGroupReference { return this._group; },

            getTaskCountsByType: function (this: ITaskHelperPrototype, table: string): IGroupTasksOverview | undefined {
                var result: IGroupTasksOverview = {
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
                var latestSummary: taskoverviewGlideRecord | undefined = getLatestSummary(this._group.sys_id, table);
                var agg: GlideAggregate = new GlideAggregate('task');
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
                var gr: taskGlideRecord;
                var hasResult: boolean = false;
                try {
                    gr = <taskGlideRecord>new GlideRecord(table);
                    gr.addActiveQuery();
                    gr.addQuery('assignment_group', this._group.sys_id);
                    hasResult = gr.next();
                } catch {
                    gr = <taskGlideRecord>new GlideRecord('task');
                    gr.addQuery('assignment_group', this._group.sys_id);
                    gr.addQuery('sys_class_name', table);
                    gr.addActiveQuery();
                    hasResult = gr.next();
                }

                if (hasResult) {
                    var task: ITaskReference = toTaskReference(gr);
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
                } else if (result.recently_closed_count == 0)
                    return;

                return result;
            },

            getTaskCounts: function (this: ITaskHelperPrototype): IGroupTaskOverviewByType | undefined {
                var agg: GlideAggregate = new GlideAggregate('task');
                agg.addQuery('assignment_group', this._group.sys_id);
                agg.addAggregate('count');
                agg.groupBy('sys_class_name');
                agg.query();
                var result: IGroupTaskOverviewByType = {};
                var hasResult: boolean = false;
                while (agg.next()) {
                    var tableName: string = '' + (<taskGlideRecord><any>agg).sys_class_name;
                    var overview: IGroupTasksOverview | undefined = this.getTaskCountsByType(tableName);
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

    namespace business_rule {
        (function (dayOfWeek: number) {
            if (dayOfWeek < 1 || dayOfWeek > 5)
                return;

            var gr: sys_user_groupGlideRecord = <sys_user_groupGlideRecord>new GlideRecord('sys_user_group');
            gr.addActiveQuery();
            gr.query();
            var sys_ids: string[] = [];
            while (gr.next())
                sys_ids.push('' + gr.sys_id);
            var latest_summaries: { sys_id: string, created: GlideDateTime }[] = [];
            var latestSummary: taskoverviewGlideRecord = <taskoverviewGlideRecord>new GlideRecord('x_44813_util_taskoverview');
            latestSummary.addQuery('archived', false);
            latestSummary.query();
            while (latestSummary.next)
            for (var i = 0; i < sys_ids.length; i++) {
                var gr = <sys_user_groupGlideRecord>new GlideRecord('sys_user_group');
                gr.addQuery('sys_id', sys_ids[i]);
                gr.query();
                if (gr.next()) {
                    var th: ITaskHelper = new TaskHelper(gr);
                    var overview: IGroupTaskOverviewByType | undefined = th.getTaskCounts();
                    if (typeof overview !== 'undefined') {
                        var summaryIds: string[] = [];
                        for (var type in overview) {
                            var newSummary: taskoverviewGlideRecord = <taskoverviewGlideRecord>new GlideRecord('x_44813_util_taskoverview');
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
    }
}