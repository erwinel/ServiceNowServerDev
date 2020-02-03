/// <reference path="base.d.ts" />
declare namespace x_44813_util {
    interface IGroupReference {
        sys_id: string;
        name: string;
    }
    interface ITaskReference {
        sys_id: string;
        createdOn: GlideDateTime;
        updatedOn: GlideDateTime;
        vip: boolean;
    }
    interface IGroupTasksOverview {
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
    interface IGroupTaskOverviewByType {
        [tableName: string]: IGroupTasksOverview;
    }
    interface ITaskHelperBase extends ICustomClassBase<ITaskHelperBase, "TaskHelper"> {
        getGroup(): IGroupReference;
        getTaskCountsByType(table: string): IGroupTasksOverview | undefined;
        getTaskCounts(): IGroupTaskOverviewByType | undefined;
        getLatestSummary(type: string): IGroupTasksOverview | undefined;
    }
    interface ITaskHelperPrototype extends ICustomClassPrototype1<ITaskHelperBase, ITaskHelperPrototype, "TaskHelper", string>, ITaskHelperBase {
        _group: IGroupReference;
    }
    interface ITaskHelper extends Readonly<ITaskHelperBase> {
    }
    interface TaskHelperConstructor extends CustomClassConstructor1<ITaskHelperBase, ITaskHelperPrototype, ITaskHelper, string> {
        new (group: string | sys_user_groupFields): ITaskHelper;
        (group: string | sys_user_groupFields): ITaskHelper;
        getCaller(task: taskFields): sys_userFields | undefined;
        isVip(task: taskFields): boolean;
    }
    const TaskHelper: TaskHelperConstructor;
}
