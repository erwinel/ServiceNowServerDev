/// <reference path="base.d.ts" />
/// <reference path="projectManagement.d.ts" />
declare namespace x_44813_usasoc_cst {
    /**
     * ServiceNow instance SDLC Stage.
     * Production=prod,User Acceptance Testing=uat,Pre-Deployment Testing=test,Development=dev,Sandbox=sb,(none)=none
     */
    type InstanceSdlcStage = "prod" | "uat" | "test" | "dev" | "sb" | "none";
    interface IUSASOCCustomizations extends ICustomClassBase<IUSASOCCustomizations, "USASOCCustomizations"> {
        /**
         * Gets the SDLC Stage for the current ServiceNow instance.
         * @returns {InstanceSdlcStage} The SDLC Stage for the current ServiceNow instance.
         */
        getInstanceSdlcStage(): InstanceSdlcStage;
        getNewIdeaAssignmentGroupSysId(): string | undefined;
        getNewIdeaAssignmentGroup(): sys_user_groupGlideRecord | undefined;
    }
    interface IUSASOCCustomizationsPrototype extends ICustomClassPrototype0<IUSASOCCustomizations, IUSASOCCustomizationsPrototype, "USASOCCustomizations">, IUSASOCCustomizations {
        _newIdeaAssignmentGroup?: sys_user_groupGlideRecord | {
            sys_id: string;
        };
    }
    interface USASOCCustomizations extends Readonly<IUSASOCCustomizations> {
    }
    interface USASOCCustomizationsConstructor extends CustomClassConstructor0<IUSASOCCustomizations, IUSASOCCustomizationsPrototype, USASOCCustomizations> {
        EVENTNAME_TASK_UNASSIGNED: "x_44813_usasoc_cst.task.unassigned";
        EVENTNAME_TASK_IDEA_NEW: "x_44813_usasoc_cst.idea.new";
        PROPERTY_CATEGORY: "USASOC Customization Settings";
        PROPERTYNAME_INSTANCE_SDLC_STAGE: "x_44813_usasoc_cst.instance_sdlc_stage";
        PROPERTYNAME_NEW_IDEA_ASSIGNMENT_GROUP: "x_44813_usasoc_cst.new_idea_assignment_group";
        new (): USASOCCustomizations;
        (): USASOCCustomizations;
    }
    const USASOCCustomizations: Readonly<USASOCCustomizationsConstructor> & {
        new (): USASOCCustomizations;
    };
    interface ITaskHelper extends ICustomClassBase<ITaskHelper, "TaskHelper"> {
        getCaller(): sys_userFields | undefined;
        isVip(): boolean;
    }
    interface ITaskHelperPrototype extends ICustomClassPrototype1<ITaskHelper, ITaskHelperPrototype, "TaskHelper", string>, ITaskHelper {
        _task: taskGlideRecord;
    }
    interface TaskHelper extends Readonly<ITaskHelper> {
    }
    interface TaskHelperConstructor extends CustomClassConstructor1<ITaskHelper, ITaskHelperPrototype, TaskHelper, string> {
        new (task: string | taskFields): TaskHelper;
        (task: string | taskFields): TaskHelper;
        getCaller(task: taskFields): sys_userFields | undefined;
        isVip(task: taskFields): boolean;
    }
    const TaskHelper: Readonly<TaskHelperConstructor> & {
        new (task: string | taskFields): TaskHelper;
    };
    namespace usasoc_idea_submitting {
    }
    namespace usasoc_task_submitted {
    }
}
