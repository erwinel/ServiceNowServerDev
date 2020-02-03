/// <reference path="base.d.ts" />
/// <reference path="projectManagement.d.ts" />

namespace x_44813_usasoc_cst {
    //System Properties
    //URL (from arguents)
    //system_properties_ui.do?sysparm_title=General%20Customization%20Settings&sysparm_category=USASOC Customization Settings

    // SDLC Stage for the current ServiceNow instance
    // x_44813_usasoc_cst.instance_sdlc_stage
    // Production=prod,User Acceptance Testing=uat,Pre-Deployment Testing=test,Development=dev,Sandbox=sb,(none)=none

    // Sys ID of Assignment Group for new Ideas.
    // x_44813_usasoc_cst.new_idea_assignment_group

    // #region USASOCCustomizations

    /**
     * ServiceNow instance SDLC Stage.
     * Production=prod,User Acceptance Testing=uat,Pre-Deployment Testing=test,Development=dev,Sandbox=sb,(none)=none
     */
    export type InstanceSdlcStage = "prod" | "uat" | "test" | "dev" | "sb" | "none";

    export interface IUSASOCCustomizations extends ICustomClassBase<IUSASOCCustomizations, "USASOCCustomizations"> {
        /**
         * Gets the SDLC Stage for the current ServiceNow instance.
         * @returns {InstanceSdlcStage} The SDLC Stage for the current ServiceNow instance.
         */
        getInstanceSdlcStage(): InstanceSdlcStage;
        getNewIdeaAssignmentGroupSysId(): string | undefined;
        getNewIdeaAssignmentGroup(): sys_user_groupGlideRecord | undefined;
    }
    export interface IUSASOCCustomizationsPrototype extends ICustomClassPrototype0<IUSASOCCustomizations, IUSASOCCustomizationsPrototype, "USASOCCustomizations">, IUSASOCCustomizations {
        _newIdeaAssignmentGroup?: sys_user_groupGlideRecord | { sys_id: string; }
    }
    export interface USASOCCustomizations extends Readonly<IUSASOCCustomizations> { }
    export interface USASOCCustomizationsConstructor extends CustomClassConstructor0<IUSASOCCustomizations, IUSASOCCustomizationsPrototype, USASOCCustomizations> {
        EVENTNAME_TASK_UNASSIGNED: "x_44813_usasoc_cst.task.unassigned";
        EVENTNAME_TASK_IDEA_NEW: "x_44813_usasoc_cst.idea.new";
        PROPERTY_CATEGORY: "USASOC Customization Settings";
        PROPERTYNAME_INSTANCE_SDLC_STAGE: "x_44813_usasoc_cst.instance_sdlc_stage";
        PROPERTYNAME_NEW_IDEA_ASSIGNMENT_GROUP: "x_44813_usasoc_cst.new_idea_assignment_group";
        new(): USASOCCustomizations;
        (): USASOCCustomizations;
    }

    export const USASOCCustomizations: Readonly<USASOCCustomizationsConstructor> & { new(): USASOCCustomizations; } = (function (): USASOCCustomizationsConstructor {
        var usasocCustomizationsConstructor: USASOCCustomizationsConstructor = Class.create();
        usasocCustomizationsConstructor.EVENTNAME_TASK_UNASSIGNED = "x_44813_usasoc_cst.task.unassigned";
        usasocCustomizationsConstructor.EVENTNAME_TASK_IDEA_NEW = "x_44813_usasoc_cst.idea.new";
        usasocCustomizationsConstructor.PROPERTY_CATEGORY = "USASOC Customization Settings";
        usasocCustomizationsConstructor.PROPERTYNAME_INSTANCE_SDLC_STAGE = "x_44813_usasoc_cst.instance_sdlc_stage";
        usasocCustomizationsConstructor.PROPERTYNAME_NEW_IDEA_ASSIGNMENT_GROUP = "x_44813_usasoc_cst.new_idea_assignment_group";

        usasocCustomizationsConstructor.prototype = {
            initialize: function (this: IUSASOCCustomizationsPrototype): void {
            },
            getInstanceSdlcStage: function (this: IUSASOCCustomizationsPrototype): InstanceSdlcStage {
                var result: string = gs.getProperty(USASOCCustomizations.PROPERTYNAME_INSTANCE_SDLC_STAGE, "");
                switch (result) {
                    case "prod":
                    case "uat":
                    case "test":
                    case "dev":
                    case "sb":
                        return result;
                }
                return "none";
            },
            getNewIdeaAssignmentGroupSysId: function (this: IUSASOCCustomizationsPrototype): string | undefined {
                var result: string = gs.getProperty(USASOCCustomizations.PROPERTYNAME_NEW_IDEA_ASSIGNMENT_GROUP, "");
                if (result.length > 0)
                    return result;
            },
            getNewIdeaAssignmentGroup: function (this: IUSASOCCustomizationsPrototype): sys_user_groupGlideRecord | undefined {
                var sys_id: string = this.getNewIdeaAssignmentGroupSysId();
                if (typeof sys_id == "string" && (typeof this._newIdeaAssignmentGroup === "undefined" || this._newIdeaAssignmentGroup.sys_id != sys_id)) {
                    var gr: sys_user_groupGlideRecord = <sys_user_groupGlideRecord>new GlideRecord("");
                    gr.addQuery(sys_id);
                    gr.query();
                    if (gr.next())
                        this._newIdeaAssignmentGroup = gr;
                    else
                        this._newIdeaAssignmentGroup = { sys_id: sys_id };
                }
                if (typeof this._newIdeaAssignmentGroup === "object" && this._newIdeaAssignmentGroup instanceof GlideRecord)
                    return this._newIdeaAssignmentGroup;
            },
            type: "USASOCCustomizations"
        };
        return usasocCustomizationsConstructor;
    })();
    // #endregion

    // #region TaskHelper

    export interface ITaskHelper extends ICustomClassBase<ITaskHelper, "TaskHelper"> {
        getCaller(): sys_userFields | undefined;
        isVip(): boolean;
    }

    export interface ITaskHelperPrototype extends ICustomClassPrototype1<ITaskHelper, ITaskHelperPrototype, "TaskHelper", string>, ITaskHelper {
        _task: taskGlideRecord;
    }

    export interface TaskHelper extends Readonly<ITaskHelper> { }

    export interface TaskHelperConstructor extends CustomClassConstructor1<ITaskHelper, ITaskHelperPrototype, TaskHelper, string> {
        new(task: string | taskFields): TaskHelper;
        (task: string | taskFields): TaskHelper;
        getCaller(task: taskFields): sys_userFields | undefined;
        isVip(task: taskFields): boolean;
    }

    export const TaskHelper: Readonly<TaskHelperConstructor> & { new(task: string | taskFields): TaskHelper; } = (function (): TaskHelperConstructor {
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

        taskHelperConstructor.prototype = {
            _task: undefined,
            initialize: function (this: ITaskHelperPrototype, task: string | taskFields) {
                var gr: taskGlideRecord;
                if (typeof task === 'string') {
                    gr = <taskGlideRecord>new GlideRecord('task');
                    gr.addQuery('sys_id', task);
                    gr.query();
                    if (!gr.next())
                        throw new Error("Task not found");
                    this._task = gr;
                } else {
                    if (gs.nil(task))
                        throw new Error("No task specified");
                    if (task instanceof GlideRecord) {
                        if (task.isNewRecord() || !task.isValidRecord())
                            throw new Error("Not a valiid task record");
                        this._task = task;
                    } else {
                        this._task = (<$$element.Reference<taskFields, taskGlideRecord>>task).getRefRecord();
                        if (gs.nil(this._task))
                            throw new Error("No task referenced");
                    }
                }
                let n: string = this._task.getRecordClassName();
                if (n == this._task.getTableName() || !gs.tableExists(n))
                    return;

                try {
                    gr = <taskGlideRecord>new GlideRecord(n);
                    gr.addQuery('sys_id', task);
                    gr.query();
                    if (gr.next())
                        this._task = gr;
                } catch { /* okay to ignore */ }
            },
            getCaller: function (this: ITaskHelperPrototype): sys_userFields | undefined {
                return getCaller(this._task);
            },
            isVip: function (this: ITaskHelperPrototype): boolean {
                return isVip(this._task);
            },
            type: 'TaskHelper'
        };
        return taskHelperConstructor;
    })();

    // #endregion

    // #region Business Rules

    export namespace usasoc_idea_submitting {
        function executeRule(current: ideaGlideRecord, previous: ideaGlideRecord | null /*null when async*/) {
            var id: string = (new USASOCCustomizations()).getNewIdeaAssignmentGroupSysId();
            if (typeof id === "string")
                current.setValue('assignment_group', id);
        }
    }

    export namespace usasoc_task_submitted {
        function executeRule(current: taskGlideRecord, previous: taskGlideRecord | null /*null when async*/) {
            if (gs.nil(current.assignment_group) && gs.nil(current.assigned_to)) {
                gs.warn(current.number + " (" + current.sys_id + ") has been submitted, but has no assignment.");
                gs.eventQueue(USASOCCustomizations.EVENTNAME_TASK_UNASSIGNED, current);
            }
            if (current.getRecordClassName() == "idea")
                gs.eventQueue(USASOCCustomizations.EVENTNAME_TASK_IDEA_NEW, current);
        }
    }

    // #endregion
}