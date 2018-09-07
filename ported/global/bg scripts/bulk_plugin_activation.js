// Array of IDs for plugins that should be activated.
var pluginIds = [
    "com.glide.quiz_designer",
    "com.glide.ui.list_v3",
    "com.glide.web_service_provider_v2",
    "com.glideapp.live_feed_v2",
    "com.glideapp.report_statreports",
    "com.snc.automatic_assignment",
    "com.snc.bestpractice.bulkchange",
    "com.snc.change_management.risk_assessment",
    "com.snc.extended_cmdb",
    "com.snc.field_normalization",
    "com.snc.financial_planning_pmo",
    "com.snc.iam",
    "com.snc.knowledge_document",
    "com.snc.pa.configurationgenerator",
    "com.snc.procurement",
    "com.snc.required_form_fields",
    "com.snc.sc_catalog_manager",
    "com.snc.sdlc.agile.2.0",
    "com.snc.service_portfolio.sla",
    "com.snc.sla.contract2",
    "com.snc.task_activity",
    "com.snc.treemap",
    "com.snc.undelete",
    "com.snc.vendor_performance",
    "com.snc.whtp"
];
function isQueuedPluginActivation(obj) {
    return obj.status == "waiting";
}
function isFailedPluginActivation(obj) {
    return obj.status == "failed";
}
var resultInfo = {
    items: [],
    startTime: new GlideDateTime()
};
try {
    var gpm_1 = new GlidePluginManager();
    var servletUri_1 = gs.getProperty('glide.servlet.uri');
    resultInfo.items = pluginIds.map(function (id) {
        var pluginGlideRecord = new GlideRecord("v_plugin");
        pluginGlideRecord.addQuery("id", id);
        try {
            pluginGlideRecord.query();
            if (pluginGlideRecord.next()) {
                if (gpm_1.isActive(id))
                    return {
                        id: id,
                        name: pluginGlideRecord.getValue("name"),
                        status: "activated",
                        message: "Plugin was already activated",
                        pluginLink: servletUri_1 + pluginGlideRecord.getLink(true)
                    };
                return {
                    id: id,
                    name: pluginGlideRecord.getValue("name"),
                    status: "waiting",
                    pluginLink: servletUri_1 + pluginGlideRecord.getLink(true)
                };
            }
            else
                return {
                    id: id,
                    status: "failed",
                    message: "Plugin with id of " + JSON.stringify(id) + " not found."
                };
        }
        catch (e) {
            var eType = e.name;
            eType = (typeof (eType) != "string") ? "" : eType.trim();
            if (eType.length == 0)
                eType = "error";
            gs.error(e);
            gs.warn("Unexpected " + eType + " while trying to get status of plugin with id of " + JSON.stringify(id));
            return {
                id: id,
                status: "failed",
                message: "Unexpected " + eType + " while trying to get status of plugin with id of " + JSON.stringify(id) + ": " + e,
                details: (typeof (e.stack) == "undefined" || e.stack === null) ? "" : ((typeof (e.stack) == "string") ? e.stack : e.stack + "").trim()
            };
        }
    }, gpm_1);
    var queue = resultInfo.items.filter(isQueuedPluginActivation);
    if (queue.length > 0) {
        gs.info("Activating " + ((queue.length == 1) ? "1 plugin" : queue.length + " plugin"));
        resultInfo.startTime = new GlideDateTime();
        for (var index = 0; index < resultInfo.items.length; index++) {
            var pluginInfo = resultInfo.items[index];
            if (!isQueuedPluginActivation(pluginInfo))
                continue;
            if (gpm_1.isActive(pluginInfo.id)) {
                resultInfo.items[index] = {
                    id: pluginInfo.id,
                    name: pluginInfo.name,
                    status: "succeeded",
                    message: "Plugin auto-activated",
                    pluginLink: pluginInfo.pluginLink
                };
                continue;
            }
            try {
                var worker = new GlidePluginManagerWorker();
                worker.setPluginId(pluginInfo.id);
                worker.setIncludeDemoData(false);
                worker.setProgressName("Activate " + ((typeof (pluginInfo.name) == "string" && pluginInfo.name.trim().length > 0) ? pluginInfo.name : pluginInfo.id));
                worker.setBackground(false);
                worker.start();
                var progressId = worker.getProgressID();
                var progressGlideRecord = new GlideRecord("sys_progress_worker");
                progressGlideRecord.addQuery("sys_id", progressId);
                progressGlideRecord.query();
                if (!progressGlideRecord.next())
                    throw new Error("Unable to find progress record " + progressId + " for " + ((typeof (pluginInfo.name) == "string" && pluginInfo.name.trim().length > 0) ? pluginInfo.name : pluginInfo.id));
                var completion_code = progressGlideRecord.getValue("state");
                gs.info("state is " + completion_code);
                if (completion_code == "complete" || completion_code == "cancelled") {
                    var c = progressGlideRecord.getValue("state_code");
                    if (!gs.nil(c) && c.length > 0)
                        completion_code = c;
                }
                var r = "";
                var success = false;
                switch (completion_code) {
                    case "success":
                        success = true;
                        r = "Activated plugin";
                        break;
                    case "complete":
                        success = true;
                        r = "Activation completed for plugin";
                        break;
                    case "cancelled":
                        r = "Activated cancelled for";
                        break;
                    case "error":
                        r = "Error activating plugin";
                        break;
                    default:
                        r = "Unexpected result { Code: " + completion_code + "; ProgressID: " + progressId + "} while activating plugin";
                        break;
                }
                var msg = progressGlideRecord.getValue("message");
                msg = (typeof (msg) === "string") ? msg.trim() : "";
                if (success)
                    resultInfo.items[index] = {
                        id: pluginInfo.id,
                        name: pluginInfo.name,
                        status: "succeeded",
                        completion_code: completion_code,
                        progressId: progressId,
                        message: r,
                        details: msg,
                        pluginLink: pluginInfo.pluginLink,
                        progressLink: servletUri_1 + progressGlideRecord.getLink(true)
                    };
                else {
                    var e = progressGlideRecord.getValue("error_message");
                    e = (typeof (e) === "string") ? e.trim() : "";
                    if (msg.length == 0)
                        msg = e;
                    else if (e.length > 0 && e != msg)
                        msg += " (" + e + ")";
                    resultInfo.items[index] = {
                        id: pluginInfo.id,
                        name: pluginInfo.name,
                        status: "failed",
                        message: r,
                        details: msg,
                        pluginLink: pluginInfo.pluginLink,
                        progressLink: servletUri_1 + progressGlideRecord.getLink(true)
                    };
                }
            }
            catch (err) {
                var eType = err.name;
                eType = (typeof (eType) != "string") ? "" : eType.trim();
                if (eType.length == 0)
                    eType = "error";
                gs.error(err);
                gs.warn("Unexpected " + eType + " while trying to activate plugin with id of " + JSON.stringify(pluginInfo.id));
                resultInfo.items[index] = {
                    id: pluginInfo.id,
                    name: pluginInfo.name,
                    status: "failed",
                    pluginLink: pluginInfo.pluginLink,
                    message: "Unexpected " + eType + " while trying to activate plugin with id of " + JSON.stringify(pluginInfo.id) + ": " + err,
                    details: (typeof (err.stack) == "undefined" || err.stack === null) ? "" : ((typeof (err.stack) == "string") ? err.stack : err.stack + "").trim()
                };
            }
        }
    }
}
catch (unhandledErr) {
    var eType = unhandledErr.name;
    eType = (typeof (eType) != "string") ? "" : eType.trim();
    if (eType.length == 0)
        eType = "error";
    gs.error(unhandledErr);
    gs.warn("Unhandled " + eType + "in script");
    resultInfo.items.push({
        id: "",
        name: "",
        status: "failed",
        message: "Unhandled " + eType + "in script: " + unhandledErr,
        details: (typeof (unhandledErr.stack) == "undefined" || unhandledErr.stack === null) ? "" : ((typeof (unhandledErr.stack) == "string") ? unhandledErr.stack : unhandledErr.stack + "").trim()
    });
}
finally {
    var failed = resultInfo.items.filter(isFailedPluginActivation);
    var incomplete = resultInfo.items.filter(isQueuedPluginActivation);
    if (incomplete.length > 0) {
        gs.warn("Alloted Activation Timeframe Expired");
        if (failed.length == 1)
            gs.error("1 error has occurred");
        else if (failed.length > 1)
            gs.error(failed.length + " errors have occurred");
        gs.warn("Not all activation attempts completed before alotted timespan elapsed. Execute background script again to activate the remaining " +
            ((incomplete.length == 1) ? "plugin" : incomplete.length + " plugins"));
    }
    else if (failed.length > 0) {
        gs.error("Activation Attempts Completed");
        if (failed.length == 1)
            gs.error("1 error has occurred");
        else if (failed.length > 1)
            gs.error(failed.length + " errors have occurred");
    }
    else
        gs.error("Activations Completed");
    for (var index = 0; index < resultInfo.items.length; index++) {
        var pluginInfo = resultInfo.items[index];
        var messageText = (typeof (pluginInfo.name) == "string" && pluginInfo.name.trim().length > 0 && pluginInfo.name != pluginInfo.id) ?
            pluginInfo.name + " (" + pluginInfo.id + ")</em>" : pluginInfo.id;
        if (typeof (pluginInfo.pluginLink) == "string" && pluginInfo.pluginLink.trim().length > 0)
            messageText += " [" + pluginInfo.pluginLink + "]";
        var detailsCode = "";
        var level = 1;
        if (isQueuedPluginActivation(pluginInfo))
            messageText += " Not Activated";
        else {
            if (isFailedPluginActivation(pluginInfo)) {
                level = 2;
                messageText += " Failed";
            }
            else {
                level = 0;
                messageText += " Activated";
            }
            if (typeof (pluginInfo.completion_code) == "string" && pluginInfo.completion_code.length > 0)
                messageText += "; Code: " + pluginInfo.completion_code;
            if (typeof (pluginInfo.message) == "string" && pluginInfo.message.trim().length > 0)
                messageText += "; Message: " + pluginInfo.message;
            if (typeof (pluginInfo.details) == "string" && pluginInfo.details.trim().length > 0)
                detailsCode = pluginInfo.details;
        }
        if (level == 0)
            gs.info(messageText);
        else if (level == 1)
            gs.warn(messageText);
        else
            gs.error(messageText);
        if (detailsCode.length > 0) {
            if (level == 0)
                gs.info(detailsCode);
            else if (level == 1)
                gs.warn(detailsCode);
            else
                gs.error(detailsCode);
        }
    }
}