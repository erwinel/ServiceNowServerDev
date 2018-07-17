/// <reference path="../../../typings/global/ServiceNowGlobalTypes.d.ts" />

export namespace global.bg_scripts.bulk_plugin_activation {
    interface IPluginAutoActivateConfig {
        pluginIds: string|string[];
        stopAfterMinutes?: number;
        emailNotfication: {
            from: string;
            to?: string|null;
            cc?: string|string[]|null;
            subject: string|{
                startNotification: string;
                finishedSuccess: string;
                finishedWithErrors: string;
                incomplete: string;
            }
        }
    }
    interface IValidatedPluginAutoActivateConfig extends IPluginAutoActivateConfig {
        pluginIds: string[];
        stopAfterMinutes: number;
        emailNotfication: {
            from: string;
            to: string;
            cc: string[];
            subject: {
                startNotification: string;
                finishedSuccess: string;
                finishedWithErrors: string;
                incomplete: string;
            }
        };
        stopAfter: GlideDateTime;
    }
    let scriptConfig: IPluginAutoActivateConfig = {
        // Array of IDs for plugins that should be activated.
        pluginIds: [
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
        ],

        // Stop activating plugins after the specified number of minutes.
        stopAfterMinutes: 20,

        // Settings for email notification.
        emailNotfication: {
            // "From" email address. Set to an empty string to use default.
            from: "leonard.t.erwine.ctr@mail.mil",

            // "To" email address. Set to an empty string to use same email as current user.
            to: "lerwine@outlook.com",

            cc: (<string[]>[]),

            subject: {
                startNotification: "",

                // Email subject when all activations have been completed successfully.
                finishedSuccess: "",

                // Email subject to use when all activation attempts have been completed, but there were errors.
                finishedWithErrors: "",

                // Email subject to use when all activation attempts had not been started durring the alotted timeframe.
                incomplete: ""
            }
        }
    };
    
    let config: IValidatedPluginAutoActivateConfig;
    try {
        if (typeof(scriptConfig.emailNotfication.to) != "string" || scriptConfig.emailNotfication.to.trim().length == 0) {
            let email: string|null|undefined = gs.getUser().getEmail();
            if (typeof(email) != "string" || email.trim().length == 0)
                throw "Setting \"emailNotfication.to\" not defined in scriptConfig script variable and current user does not have an email address.";
            if (email == "admin@example.com")
                throw "Setting \"emailNotfication.to\" not defined in scriptConfig script variable and current user has an out-of-the-box email address.";
            scriptConfig.emailNotfication.to = email;
        }
        if (typeof(scriptConfig.pluginIds) == "string")
            scriptConfig.pluginIds = [scriptConfig.pluginIds];
        else if (typeof(scriptConfig.pluginIds) != "object" || scriptConfig.pluginIds === null)
            throw "Setting \"pluginIds\" not defined in scriptConfig script variable.";
        if ((scriptConfig.pluginIds = scriptConfig.pluginIds.map((a: any): string => { return (typeof(a) == "string") ? a.trim() : "" }).filter((s: string) => { return s.length > 0; })).length == 0)
            throw "Setting \"pluginIds\" in scriptConfig script variable does not contain any plugin IDs.";
        if (typeof(scriptConfig.emailNotfication.subject) == "string")
            scriptConfig.emailNotfication.subject = {
                // Email subject when sending start notification.
                startNotification: <string>(scriptConfig.emailNotfication.subject),

                // Email subject when all activations have been completed successfully.
                finishedSuccess: <string>(scriptConfig.emailNotfication.subject),

                // Email subject to use when all activation attempts have been completed, but there were errors.
                finishedWithErrors: <string>(scriptConfig.emailNotfication.subject),

                // Email subject to use when all activation attempts had not been started durring the alotted timeframe.
                incomplete: <string>(scriptConfig.emailNotfication.subject)

            }
        else if (typeof(scriptConfig.emailNotfication.subject) !== "object" || scriptConfig.emailNotfication.subject === null)
            throw "Setting \"emailNotfication.subject\" not defined in scriptConfig script variable.";
        if (typeof(scriptConfig.emailNotfication.subject.startNotification) != "string" || scriptConfig.emailNotfication.subject.startNotification.trim().length == 0)
            throw "Setting \"emailNotfication.subject.startNotification\" not defined in scriptConfig script variable.";
        if (typeof(scriptConfig.emailNotfication.subject.finishedSuccess) != "string" || scriptConfig.emailNotfication.subject.finishedSuccess.trim().length == 0)
            throw "Setting \"emailNotfication.subject.finishedSuccess\" not defined in scriptConfig script variable.";
        if (typeof(scriptConfig.emailNotfication.subject.finishedWithErrors) != "string" || scriptConfig.emailNotfication.subject.finishedWithErrors.trim().length == 0)
            throw "Setting \"emailNotfication.subject.finishedWithErrors\" not defined in scriptConfig script variable.";
        if (typeof(scriptConfig.emailNotfication.subject.incomplete) != "string" || scriptConfig.emailNotfication.subject.incomplete.trim().length == 0)
            throw "Setting \"emailNotfication.subject.incomplete\" not defined in scriptConfig script variable.";
        if (typeof(scriptConfig.stopAfterMinutes) != "number" || isNaN(scriptConfig.stopAfterMinutes) || !Number.isFinite(scriptConfig.stopAfterMinutes))
            scriptConfig.stopAfterMinutes = 20;
        if (typeof(scriptConfig.emailNotfication.cc) == "string")
            scriptConfig.emailNotfication.cc = ((<string>(scriptConfig.emailNotfication.cc)).trim().length == 0) ? [] : [scriptConfig.emailNotfication.cc];
        else if (typeof(scriptConfig.emailNotfication.cc) != "object" || scriptConfig.emailNotfication.cc == null || !Array.isArray(scriptConfig.emailNotfication.cc))
            scriptConfig.emailNotfication.cc = []
        else
            scriptConfig.emailNotfication.cc = scriptConfig.emailNotfication.cc.map((s: any) => { return (typeof(s) == "string") ? s.trim() : "" }).filter((s: string) => { return s.length > 0; });
        config = <IValidatedPluginAutoActivateConfig>scriptConfig;
        config.stopAfter = new GlideDateTime();
        config.stopAfter.addSeconds(config.stopAfterMinutes * 60);
    } catch (err) {
        gs.error("Unable to continue due to errors");
        throw err;
    }
    let emailOutbound: GlideEmailOutbound;
    interface IPluginActivationInfo {
        id: string;
        name?: string;
        status: "waiting"|"succeeded"|"activated"|"failed";
        pluginLink?: string;
    }
    interface IPluginActivationQueue extends IPluginActivationInfo {
        name: string;
        status: "waiting";
    }
    interface IPluginActivationResult extends IPluginActivationInfo {
        status: "succeeded"|"activated"|"failed";
        message: string;
        completion_code?: string;
        progressId?: string;
        details?: string;
        progressLink?: string;
    }
    interface IPluginActivatedResult extends IPluginActivationResult {
        name: string;
        status: "succeeded"|"activated";
    }
    interface IPluginFailedResult extends IPluginActivationResult {
        status: "failed";
    }
    function isQueuedPluginActivation(obj: IPluginActivationInfo): obj is IPluginActivationQueue {
        return obj.status == "waiting";
    }
    function isFailedPluginActivation(obj: IPluginActivationInfo): obj is IPluginFailedResult {
        return obj.status == "failed";
    }
    
    let resultInfo: {
        items: (IPluginActivationQueue|IPluginActivatedResult|IPluginFailedResult)[],
        startTime: GlideDateTime;
        discontinueAfter: GlideDateTime;
        error?: any
    } = {
        items: [],
        startTime: new GlideDateTime(),
        discontinueAfter: new GlideDateTime()
    };
    let emailBody: string[];
    try {
        let gpm: GlidePluginManager = new GlidePluginManager();

        let servletUri: string = gs.getProperty('glide.servlet.uri');
        resultInfo.items = config.pluginIds.map(function(this: GlidePluginManager, id: string): IPluginActivationQueue|IPluginActivatedResult|IPluginFailedResult {
            let pluginGlideRecord: GlideRecord = new GlideRecord("v_plugin");
            pluginGlideRecord.addQuery("id", id);
            try {
                pluginGlideRecord.query();
                if (pluginGlideRecord.next()) {
                    if (gpm.isActive(id))
                        return {
                            id: id,
                            name: pluginGlideRecord.getValue("name"),
                            status: "activated",
                            message: "Plugin was already activated",
                            pluginLink: servletUri + pluginGlideRecord.getLink(true)
                        };
                    return {
                        id: id,
                        name: pluginGlideRecord.getValue("name"),
                        status: "waiting",
                        pluginLink: servletUri + pluginGlideRecord.getLink(true)
                    };
                } else
                    return {
                        id: id,
                        status: "failed",
                        message: "Plugin with id of " + JSON.stringify(id) + " not found."
                    };
            } catch (e) {
                let eType: string|null|undefined = e.name;
                eType = (typeof(eType) != "string") ? "" : eType.trim();
                if (eType.length == 0)
                    eType = "error";
                gs.error(e);
                gs.warn("Unexpected " + eType + " while trying to get status of plugin with id of " + JSON.stringify(id));
                
                return {
                    id: id,
                    status: "failed",
                    message: "Unexpected " + eType + " while trying to get status of plugin with id of " + JSON.stringify(id) + ": " + e,
                    details: (typeof(e.stack) == "undefined" || e.stack === null) ? "" : ((typeof(e.stack) == "string") ? e.stack : e.stack + "").trim()
                };
            }
        }, gpm);

        let queue: IPluginActivationQueue[] = resultInfo.items.filter(isQueuedPluginActivation);
        if (queue.length > 0) {
            emailOutbound = new GlideEmailOutbound();
            if (typeof(config.emailNotfication.from) == "string" && config.emailNotfication.from.trim().length > 0)
                emailOutbound.setFrom(config.emailNotfication.from);
            emailOutbound.addRecipient(config.emailNotfication.from);
            emailOutbound.setSubject(config.emailNotfication.subject.startNotification);
            config.emailNotfication.cc.forEach(cc => { emailOutbound.addAddress("cc", cc); });
            resultInfo.startTime = new GlideDateTime();
            resultInfo.discontinueAfter = new GlideDateTime();
            resultInfo.discontinueAfter.addSeconds(config.stopAfterMinutes * 60);
            emailBody = [
                "<h2>Activating " + ((queue.length == 1) ? "1 plugin" : queue.length + " plugins") + "</h2>",
                "<table><tr>",
                "<th>Started on:</th><td>" + resultInfo.startTime.getDisplayValue() + "</td>",
                "<th>Discontinuing activations after:</th><td>" + resultInfo.discontinueAfter.getDisplayValue() + "</td>",
                "<th>" + ((queue.length == 1) ? "Plugin:" : queue.length + "Plugins:") + "</th><td><ol>"
            ];
            for (var index = 0; index < queue.length; index++) {
                let htmlCode: string = (typeof(queue[index].name) == "string" && queue[index].name.trim().length > 0 && queue[index].name != queue[index].id) ?
                    queue[index].name.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;") + " <em>(" + queue[index].id.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;") + ")</em>"
                        : queue[index].id.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;");
                if (typeof(queue[index].pluginLink) == "string" && queue[index].pluginLink.trim().length > 0)
                    htmlCode = "<a href=\"" + queue[index].pluginLink + "\">" + htmlCode + "</a>";
                emailBody.push("<li>" + htmlCode + "</li>");
            }
            emailBody.push("</ol></td></tr></table><a href=\"" + gs.getProperty('glide.servlet.uri') + "nav_to.do?uri=%2Fsys_progress_worker_list.do\">Click here</a> to view status of progress workers.");
            emailOutbound.setBody(emailBody.join("\n"));
            emailOutbound.save();

            for (var index = 0; index < resultInfo.items.length; index++) {
                let pluginInfo: IPluginActivationQueue|IPluginActivatedResult|IPluginFailedResult = resultInfo.items[index];
                if (!isQueuedPluginActivation(pluginInfo))
                    continue;
                if (gpm.isActive(pluginInfo.id)) {
                    resultInfo.items[index] = {
                        id: pluginInfo.id,
                        name: pluginInfo.name,
                        status: "succeeded",
                        message: "Plugin auto-activated",
                        pluginLink: pluginInfo.pluginLink
                    };
                    continue;
                }
                if (resultInfo.discontinueAfter.before(resultInfo.startTime))
                    continue;
                try {
                    let worker: GlidePluginManagerWorker = new GlidePluginManagerWorker();
                    worker.setPluginId(pluginInfo.id);
                    worker.setIncludeDemoData(false);
                    worker.setProgressName("Activate " + ((typeof(pluginInfo.name) == "string" && pluginInfo.name.trim().length > 0) ? pluginInfo.name : pluginInfo.id));
                    worker.setBackground(false);
                    worker.start();
                    
                    let progressId: string = worker.getProgressID();
                    let progressGlideRecord: GlideRecord = new GlideRecord("sys_progress_worker");
                    progressGlideRecord.addQuery("sys_id", progressId);
                    progressGlideRecord.query();
                    if (!progressGlideRecord.next())
                        throw new Error("Unable to find progress record " + progressId + " for " + ((typeof(pluginInfo.name) == "string" && pluginInfo.name.trim().length > 0) ? pluginInfo.name : pluginInfo.id));

                    let completion_code: string = progressGlideRecord.getValue("state");
                    gs.info("state is " + completion_code);
                    if (completion_code == "complete" || completion_code == "cancelled") {
                        let c: string = progressGlideRecord.getValue("state_code");
                        if (!gs.nil(c) && c.length > 0)
                            completion_code = c;
                    }
                    let r: string = "";
                    let success: boolean = false;
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
                        
                    let msg: string|null|undefined = progressGlideRecord.getValue("message");
                    msg = (typeof(msg) === "string") ? msg.trim() : "";
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
                            progressLink: servletUri + progressGlideRecord.getLink(true)
                        };
                    else {
                        let e: string|null|undefined = progressGlideRecord.getValue("error_message");
                        e = (typeof(e) === "string") ? e.trim() : "";
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
                            progressLink: servletUri + progressGlideRecord.getLink(true)
                        };
                    }
                } catch (err) {
                    let eType: string|null|undefined = err.name;
                    eType = (typeof(eType) != "string") ? "" : eType.trim();
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
                        details: (typeof(err.stack) == "undefined" || err.stack === null) ? "" : ((typeof(err.stack) == "string") ? err.stack : err.stack + "").trim()
                    };
                }
            }
        }
    } catch (unhandledErr) {
        let eType: string|null|undefined = unhandledErr.name;
        eType = (typeof(eType) != "string") ? "" : eType.trim();
        if (eType.length == 0)
            eType = "error";
        gs.error(unhandledErr);
        gs.warn("Unhandled " + eType + "in script");
        resultInfo.items.push({
            id: "",
            name: "",
            status: "failed",
            message: "Unhandled " + eType + "in script: " + unhandledErr,
            details: (typeof(unhandledErr.stack) == "undefined" || unhandledErr.stack === null) ? "" : ((typeof(unhandledErr.stack) == "string") ? unhandledErr.stack : unhandledErr.stack + "").trim()
        })
    } finally {
        let failed: IPluginFailedResult[] = resultInfo.items.filter(isFailedPluginActivation);
        let incomplete: IPluginActivationQueue[] = resultInfo.items.filter(isQueuedPluginActivation);
        emailOutbound = new GlideEmailOutbound();
        if (typeof(config.emailNotfication.from) == "string" && config.emailNotfication.from.trim().length > 0)
            emailOutbound.setFrom(config.emailNotfication.from);
        emailOutbound.addRecipient(config.emailNotfication.from);
        config.emailNotfication.cc.forEach(cc => { emailOutbound.addAddress("cc", cc); });
        emailBody = [];
        if (incomplete.length > 0) {
            emailOutbound.setSubject(config.emailNotfication.subject.incomplete);
            emailBody.push("<h2>Alloted Activation Timeframe Expired</h2>");
            if (failed.length == 1)
                emailBody.push("<h3>1 error has occurred</h3>");
            else if (failed.length > 1)
                emailBody.push("<h3>" + failed.length + " errors have occurred</h3>");
            emailBody.push("Not all activation attempts completed before alotted timespan elapsed.\n<p>Execute background script again to activate the remaining " +
                ((incomplete.length == 1) ? "plugin" : incomplete.length + " plugins") + "</p>");
        } else if (failed.length > 0) {
            emailOutbound.setSubject(config.emailNotfication.subject.finishedWithErrors);
            emailBody.push("<h2>Activation Attempts Completed</h2>");
            if (failed.length == 1)
                emailBody.push("<h3>1 error has occurred</h3>");
            else if (failed.length > 1)
                emailBody.push("<h3>" + failed.length + " errors have occurred</h3>");
        } else {
            emailBody.push("<h2>Activations Completed</h2>");
            emailOutbound.setSubject(config.emailNotfication.subject.finishedSuccess);
        }
        emailBody.push("<table><tr><th>Started on:</th><td>" + resultInfo.startTime.getDisplayValue() + "</td></tr>");
        emailBody.push("<tr><th>Completed on:</th><td>" + (new GlideDateTime()).getDisplayValue() + "</td></tr>");
        emailBody.push("<tr><th>Already Activated:</th><td>" + resultInfo.items.filter((item: IPluginActivationInfo) => { return item.status == "activated" }).length + "</td></tr>");
        emailBody.push("<tr><th>Activations Succeeded:</th><td>" + resultInfo.items.filter((item: IPluginActivationInfo) => { return item.status == "succeeded" }).length + "</td></tr>");
        emailBody.push("<tr><th>Activations Failed:</th><td>" + failed.length + "</td></tr>");
        emailBody.push("<tr><th>Not Activated:</th><td>" + incomplete.length + "</td></tr></table>");
        emailBody.push("<table><tr><th>Name</th><th>Status</th><th>Details</th></tr>");
        for (var index = 0; index < resultInfo.items.length; index++) {
            let pluginInfo: IPluginActivationQueue|IPluginActivatedResult|IPluginFailedResult = resultInfo.items[index];
            let htmlCode: string = (typeof(pluginInfo.name) == "string" && pluginInfo.name.trim().length > 0 && pluginInfo.name != pluginInfo.id) ?
                pluginInfo.name.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;") + " <em>(" + pluginInfo.id.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;") + ")</em>"
                    : pluginInfo.id.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;");
            if (typeof(pluginInfo.pluginLink) == "string" && pluginInfo.pluginLink.trim().length > 0)
                htmlCode = "<a href=\"" + pluginInfo.pluginLink + "\">" + htmlCode + "</a>";
            emailBody.push("<tr><td>" + htmlCode + "</td>");
            let detailsCode: string[] = [];
            if (isQueuedPluginActivation(pluginInfo))
                emailBody.push("<td>Not Activated</td>");
            else {
                if (isFailedPluginActivation(pluginInfo)) {
                    htmlCode = "Failed";
                } else {
                    htmlCode = "Activated";
                }
                if (typeof(pluginInfo.progressLink) == "string" && pluginInfo.progressLink.trim().length > 0)
                    htmlCode = "<a href=\"" + pluginInfo.progressLink + "\">" + htmlCode + "</a>";
                if (typeof(pluginInfo.completion_code) == "string" && pluginInfo.completion_code.length > 0) {
                    emailBody.push("<td>" + htmlCode);
                    emailBody.push("<div><strong>Completion Code</strong>");
                    emailBody.push(pluginInfo.completion_code + "</div></td>");
                } else
                    emailBody.push("<td>" + htmlCode + "</td>");
                let altLines: { label: string, text: string, isPre: boolean }[] = [
                    { label: "Message", text: pluginInfo.message, isPre: false },
                    { label: "Details", text: pluginInfo.details, isPre: true }
                ].filter(function(a) { return (typeof(a.text) == "string" && a.text.trim().length > 0); });
                if (altLines.length == 0)
                    emailBody.push("<td>&nbsp;</td>");
                else {
                    emailBody.push("<td>");
                    altLines.forEach(function(a) {
                        emailBody.push("<div><strong>" + a.label + "</strong>");
                        if (a.isPre)
                            emailBody.push("<pre>" + a.text + "</pre></div>");
                        else
                            emailBody.push(a.text + "</div>");
                    });
                    emailBody.push("</td>");
                }
            }
            emailBody.push("</tr>");
        }
        emailBody.push("</table>");
        emailOutbound.setBody(emailBody.join("\n"));
        emailOutbound.save();
    }
}