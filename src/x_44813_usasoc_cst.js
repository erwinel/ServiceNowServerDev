/// <reference path="base.d.ts" />
/// <reference path="projectManagement.d.ts" />
var x_44813_usasoc_cst;
(function (x_44813_usasoc_cst) {
    //System Properties
    //URL (from arguents)
    //system_properties_ui.do?sysparm_title=General%20Customization%20Settings&sysparm_category=USASOC Customization Settings
    x_44813_usasoc_cst.USASOCCustomizations = (function () {
        var usasocCustomizationsConstructor = Class.create();
        usasocCustomizationsConstructor.EVENTNAME_TASK_UNASSIGNED = "x_44813_usasoc_cst.task.unassigned";
        usasocCustomizationsConstructor.EVENTNAME_TASK_IDEA_NEW = "x_44813_usasoc_cst.idea.new";
        usasocCustomizationsConstructor.PROPERTY_CATEGORY = "USASOC Customization Settings";
        usasocCustomizationsConstructor.PROPERTYNAME_INSTANCE_SDLC_STAGE = "x_44813_usasoc_cst.instance_sdlc_stage";
        usasocCustomizationsConstructor.PROPERTYNAME_NEW_IDEA_ASSIGNMENT_GROUP = "x_44813_usasoc_cst.new_idea_assignment_group";
        usasocCustomizationsConstructor.prototype = {
            initialize: function () {
            },
            getInstanceSdlcStage: function () {
                var result = gs.getProperty(x_44813_usasoc_cst.USASOCCustomizations.PROPERTYNAME_INSTANCE_SDLC_STAGE, "");
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
            getNewIdeaAssignmentGroupSysId: function () {
                var result = gs.getProperty(x_44813_usasoc_cst.USASOCCustomizations.PROPERTYNAME_NEW_IDEA_ASSIGNMENT_GROUP, "");
                if (result.length > 0)
                    return result;
            },
            getNewIdeaAssignmentGroup: function () {
                var sys_id = this.getNewIdeaAssignmentGroupSysId();
                if (typeof sys_id == "string" && (typeof this._newIdeaAssignmentGroup === "undefined" || this._newIdeaAssignmentGroup.sys_id != sys_id)) {
                    var gr = new GlideRecord("");
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
    x_44813_usasoc_cst.TaskHelper = (function () {
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
        taskHelperConstructor.prototype = {
            _task: undefined,
            initialize: function (task) {
                var gr;
                if (typeof task === 'string') {
                    gr = new GlideRecord('task');
                    gr.addQuery('sys_id', task);
                    gr.query();
                    if (!gr.next())
                        throw new Error("Task not found");
                    this._task = gr;
                }
                else {
                    if (gs.nil(task))
                        throw new Error("No task specified");
                    if (task instanceof GlideRecord) {
                        if (task.isNewRecord() || !task.isValidRecord())
                            throw new Error("Not a valiid task record");
                        this._task = task;
                    }
                    else {
                        this._task = task.getRefRecord();
                        if (gs.nil(this._task))
                            throw new Error("No task referenced");
                    }
                }
                var n = this._task.getRecordClassName();
                if (n == this._task.getTableName() || !gs.tableExists(n))
                    return;
                try {
                    gr = new GlideRecord(n);
                    gr.addQuery('sys_id', task);
                    gr.query();
                    if (gr.next())
                        this._task = gr;
                }
                catch ( /* okay to ignore */_a) { /* okay to ignore */ }
            },
            getCaller: function () {
                return getCaller(this._task);
            },
            isVip: function () {
                return isVip(this._task);
            },
            type: 'TaskHelper'
        };
        return taskHelperConstructor;
    })();
    // #endregion
    // #region Business Rules
    var usasoc_idea_submitting;
    (function (usasoc_idea_submitting) {
        function executeRule(current, previous /*null when async*/) {
            var id = (new x_44813_usasoc_cst.USASOCCustomizations()).getNewIdeaAssignmentGroupSysId();
            if (typeof id === "string")
                current.setValue('assignment_group', id);
        }
    })(usasoc_idea_submitting = x_44813_usasoc_cst.usasoc_idea_submitting || (x_44813_usasoc_cst.usasoc_idea_submitting = {}));
    var usasoc_task_submitted;
    (function (usasoc_task_submitted) {
        function executeRule(current, previous /*null when async*/) {
            if (gs.nil(current.assignment_group) && gs.nil(current.assigned_to)) {
                gs.warn(current.number + " (" + current.sys_id + ") has been submitted, but has no assignment.");
                gs.eventQueue(x_44813_usasoc_cst.USASOCCustomizations.EVENTNAME_TASK_UNASSIGNED, current);
            }
            if (current.getRecordClassName() == "idea")
                gs.eventQueue(x_44813_usasoc_cst.USASOCCustomizations.EVENTNAME_TASK_IDEA_NEW, current);
        }
    })(usasoc_task_submitted = x_44813_usasoc_cst.usasoc_task_submitted || (x_44813_usasoc_cst.usasoc_task_submitted = {}));
    // #endregion
})(x_44813_usasoc_cst || (x_44813_usasoc_cst = {}));
//# sourceMappingURL=x_44813_usasoc_cst.js.map