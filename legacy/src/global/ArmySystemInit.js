var ArmySystemInit = /** @class */ (function () {
    function ArmySystemInit() {
    }
    ArmySystemInit.prototype.intialize = function () {
        this.sys_properties = [
            // DO NOT change first object's properties
            { name: "x_44813_util.SN_SDLC_STAGE", type: "string", description: "ServiceNow SDLC stage of current server.", sys_package: "x_44813_util",
                prod: "prod", test: "test", dev: "dev", sb: "dev" },
            { name: "glide.sys.default.tz", type: "timezone", description: "System timezone for all users unless overridden in the user's record", sys_package: "glidesoft",
                prod: "US/Eastern", test: "US/Eastern", dev: "US/Eastern", sb: "US/Eastern" },
            { name: "glide.product.name", type: "string", description: "Browser tab title", sys_package: "apps/system2",
                prod: "ServiceNow Production", test: "ServiceNow Test", dev: "ServiceNow Dev", sb: "ServiceNow Sandbox" },
            { name: "glide.product.description", type: "string", description: "Page header caption", sys_package: "apps/system2",
                prod: "Enterprise Service Tool", test: "Enterprise Service Tool", dev: "Enterprise Service Tool", sb: "Enterprise Service Tool" },
            { name: "css.base.color", type: "color", description: "Banner and list caption background color", sys_package: "apps/system2",
                prod: "#985252", test: "#526498", dev: "#649852", sb: "#645298" },
            { name: "css.banner.description.color", type: "color", description: "Banner text color", sys_package: "glidesoft",
                prod: "#d58181", test: "#8196d5", dev: "#96d581", sb: "#96d581" },
            { name: "css.$navpage-header-bg", type: "color", description: "Header Background Color", sys_package: "com.glide.ui.ui16",
                prod: "#5b1a1a", test: "#1a2a5b", dev: "#2a5b1a", sb: "#9681d5" },
            { name: "css.$navpage-header-color", type: "color", description: "Header Background Color", sys_package: "com.glide.ui.ui16",
                prod: "#fafad2", test: "#fafad2", dev: "#fafad2", sb: "#fafad2" },
            { name: "css.$navpage-header-divider-color", type: "color", description: "Header divider stripe color", sys_package: "global",
                prod: "#822626", test: "#263d82", dev: "#3d8226", sb: "#3d2682" },
            { name: "css.$navpage-nav-bg", type: "color", description: "Navigation Header/Footer", sys_package: "com.glide.ui.ui16",
                prod: "#5b1a1a", test: "#1a2a5b", dev: "#2a5b1a", sb: "#9681d5" },
            { name: "css.$subnav-background-color", type: "color", description: "Navigation background expanded items", sys_package: "com.glide.ui.ui16",
                prod: "#592222", test: "#223d59", dev: "#2f5922", sb: "#2f2259" },
            { name: "css.$navpage-nav-color-sub", type: "color", description: "Module text color for UI16<br/>Also affects unselected navigation tab icon and favorite icons color.", sys_package: "com.glide.ui.ui16",
                prod: "#d7d7ac", test: "#d7d7ac", dev: "#dde1ee", sb: "#d7d7ac" },
            { name: "css.$navpage-nav-selected-bg", type: "color", description: "Navigation selected tab background color", sys_package: "com.glide.ui.ui16",
                prod: "#7e2a2a", test: "#2a3f7e", dev: "#3f7e2a", sb: "#3f2a7e" },
            { name: "css.$nav-hr-color", type: "color", description: "Navigation separator color", sys_package: "com.glide.ui.ui16",
                prod: "#7e2a2a", test: "#2a3f7e", dev: "#3f7e2a", sb: "#3f2a7e" },
            { name: "css.$navpage-nav-bg-sub", type: "color", description: "Background for navigator and sidebars", sys_package: "com.glide.ui.ui16",
                prod: "#822626", test: "#263d82", dev: "#3d8226", sb: "#3d2682" },
            { name: "css.$navpage-nav-unselected-color", type: "color", description: "Unselected navigation tab icon and favorite icons color", sys_package: "global",
                prod: "#e0a3a3", test: "#a3c2e0", dev: "#b3e0a3", sb: "#b3a3e0" },
            { name: "css.$navpage-nav-selected-color", type: "color", description: "Currently selected Navigation tab icon color for UI16", sys_package: "",
                prod: "#afeeee", test: "#f08080", dev: "#f08080", sb: "#f08080" },
            { name: "css.$navpage-nav-border", type: "color", description: "Border color for UI16", sys_package: "com.glide.ui.ui16",
                prod: "#eecdcd", test: "#ced6ee", dev: "#d6eece", sb: "#d6ceee" },
            { name: "css.$nav-highlight-main", type: "color", description: "Navigation highlight background color", sys_package: "com.glide.ui.ui16",
                prod: "#493131", test: "#2e3d4d", dev: "#374931", sb: "#373149" }
        ];
    };
    ArmySystemInit.prototype.process = function (stage) {
        var pluginIds = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            pluginIds[_i - 1] = arguments[_i];
        }
        if (typeof (stage) != "string")
            stage = "";
        else
            stage = stage.trim().toLowerCase();
        switch (stage) {
            case "prod":
            case "test":
            case "dev":
            case "sb":
                break;
            case "":
                worker.addMessage("Stage was not provided.");
                break;
            default:
                worker.addMessage("'" + stage + "' is not a valid stage.");
                stage = "";
                break;
        }
        if (stage.length == 0) {
            worker.setOutputSummary("Stage must be 'prod', 'test', 'dev', or 'sb'.");
            worker.setProgressErrorState();
            return;
        }
        var settingsGr = new GlideRecord("sys_properties");
        var actualValue;
        settingsGr.addQuery("name", this.sys_properties[0].name);
        settingsGr.query();
        if (settingsGr.next()) {
            actualValue = settingsGr.getValue("value");
            if (typeof (actualValue) == "string" && (actualValue = actualValue.trim()).length > 0 && actualValue != stage) {
                worker.addMessage("Current server SDLC stage " + actualValue + " does not match the provided stage " + stage);
                worker.setOutputSummary("If you wish to change the server SDLC stage, change the system property " + this.sys_properties[0].name + " to an empty string before sdtarting the initialization worker");
                worker.setProgressErrorState();
                return;
            }
        }
        else {
            worker.addMessage("Current server SDLC stage property was not defined");
            worker.setOutputSummary("Ensure that the ArmySystemInit server include has been created in the global namespace. You may want to also check to ensure that the system property " + this.sys_properties[0].name + " has not been inadvertently deleted.");
            worker.setProgressErrorState();
            return;
        }
        var message, msg;
        var i;
        var outputSummary = ["Validating system properties", "0% overall complete", ""];
        var propertyCount = this.sys_properties.length;
        var totalCount = propertyCount + pluginIds.length;
        worker.setOutputSummary(outputSummary.join("\n").trim());
        var failedPropertyNames = [];
        for (i = 0; i < propertyCount; i++) {
            message = "Validating system property " + this.sys_properties[i].name;
            worker.addMessage(message);
            outputSummary[0] = Math.round((i * 100) / propertyCount) + "%: " + message + " (" + (i + 1) + " of " + propertyCount + ")";
            outputSummary[1] = "\t" + Math.round((i * 100) / totalCount) + "% overall complete";
            var expectedValue = void 0;
            switch (stage) {
                case "prod":
                    expectedValue = this.sys_properties[i].prod;
                    break;
                case "test":
                    expectedValue = this.sys_properties[i].test;
                    break;
                case "dev":
                    expectedValue = this.sys_properties[i].dev;
                    break;
                default:
                    expectedValue = this.sys_properties[i].sb;
                    break;
            }
            settingsGr = new GlideRecord("sys_properties");
            settingsGr.addQuery("name", this.sys_properties[i].name);
            settingsGr.query();
            if (settingsGr.next()) {
                var actualValue_1 = settingsGr.getValue("value");
                if (actualValue_1 === expectedValue)
                    message = "System property " + this.sys_properties[i].name + " was already set to '" + actualValue_1 + "'";
                else {
                    outputSummary[0] = outputSummary[0] + ": Changing value from '" + actualValue_1 + "' to '" + expectedValue + "'";
                    worker.setOutputSummary(outputSummary.join("\n"));
                    worker.addMessage("Currently setting property " + this.sys_properties[i].name);
                    try {
                        settingsGr.setValue('value', expectedValue);
                        settingsGr.update();
                        message = "System property " + this.sys_properties[i].name + " changed from '" + actualValue_1 + "' to '" + expectedValue + "'";
                    }
                    catch (e) {
                        failedPropertyNames.push(this.sys_properties[i].name);
                        message = "Error changing property " + this.sys_properties[i].name + " from '" + actualValue_1 + "' to '" + expectedValue + "': " + e;
                    }
                }
            }
            else {
                worker.addMessage("Currently adding property " + this.sys_properties[i].name);
                outputSummary[0] = outputSummary[0] + ": Adding property with value of '" + expectedValue + "'";
                worker.setOutputSummary(outputSummary.join("\n"));
                try {
                    settingsGr.initialize();
                    settingsGr.setValue('name', this.sys_properties[i].name);
                    settingsGr.setValue('sys_name', this.sys_properties[i].name);
                    settingsGr.setValue('description', this.sys_properties[i].description);
                    settingsGr.setValue('type', this.sys_properties[i].type);
                    settingsGr.setValue('ignore_cache', false);
                    settingsGr.setValue('is_private', false);
                    settingsGr.setValue('value', expectedValue);
                    var packageGr = new GlideRecord('sys_package');
                    packageGr.addQuery('source', this.sys_properties[i].sys_package);
                    packageGr.query();
                    if (packageGr.next())
                        settingsGr.setValue('sys_package', packageGr.sys_id);
                    settingsGr.insert();
                    message = "Added system property " + this.sys_properties[i].name + " with the value of '" + expectedValue + "'";
                }
                catch (e) {
                    failedPropertyNames.push(this.sys_properties[i].name);
                    message = "Error adding property " + this.sys_properties[i].name + " with the value of '" + expectedValue + "': " + e;
                }
            }
            worker.addMessage(message);
            outputSummary.push(message);
            worker.setOutputSummary(outputSummary.join("\n").trim());
        }
        var failedPlugins = [];
        var gpm = new GlidePluginManager();
        for (i = 0; i < pluginIds.length; i++) {
            message = "Validating plugin " + pluginIds[i];
            worker.addMessage(message);
            outputSummary[0] = Math.round((i * 100) / pluginIds.length) + "%: " + message + " (" + (i + 1) + " of " + pluginIds.length + ")";
            outputSummary[1] = "\t" + Math.round(((i + propertyCount) * 100) / totalCount) + "% overall complete";
            var pluginGlideRecord = new GlideRecord("v_plugin");
            pluginGlideRecord.addQuery("id", pluginIds[i]);
            pluginGlideRecord.query();
            if (pluginGlideRecord.next()) {
                var displayText = pluginGlideRecord.getValue('name') + ' (' + pluginIds[i] + ')';
                if (GlidePluginManager.isActive(pluginIds[i]))
                    message = 'Plugin ' + displayText + ' was already activated.';
                else {
                    ;
                    var pluginWorker = new GlidePluginManagerWorker();
                    pluginWorker.setPluginId(pluginIds[i]);
                    pluginWorker.setIncludeDemoData(false);
                    pluginWorker.setProgressName('Activate ' + displayText);
                    pluginWorker.setBackground(false);
                    pluginWorker.start();
                    var progressId = pluginWorker.getProgressID();
                    worker.addMessage("Currently activating " + displayText + " (ProgressID = " + progressId + ")");
                    var progressGlideRecord = new GlideRecord("sys_progress_worker");
                    progressGlideRecord.addQuery("sys_id", progressId);
                    progressGlideRecord.query();
                    if (progressGlideRecord.next()) {
                        var completion_code = progressGlideRecord.getValue('state');
                        gs.info("state is " + completion_code);
                        if (completion_code == 'complete' || completion_code == 'cancelled') {
                            var c = progressGlideRecord.getValue('state_code');
                            if (typeof (c) != "undefined" && c !== null && c.length > 0)
                                completion_code = c;
                        }
                        var r = '';
                        var success = false;
                        switch (completion_code) {
                            case 'success':
                                success = true;
                                r = 'Activated plugin';
                                break;
                            case 'complete':
                                success = true;
                                r = 'Activation completed for plugin';
                                break;
                            case 'cancelled':
                                r = 'Activated cancelled for';
                                break;
                            case 'error':
                                r = 'Error activating plugin';
                                break;
                            default:
                                r = 'Unexpected result { Code: ' + completion_code + '; ProgressID: ' + progressId + '} while activating plugin';
                                break;
                        }
                        msg = progressGlideRecord.getValue('message');
                        if (typeof (msg) != "string")
                            msg = "";
                        if (!success) {
                            failedPlugins.push(displayText);
                            var e = progressGlideRecord.getValue('error_message');
                            e = (typeof (e) == "string") ? e.trim() : "";
                            if (msg.length == 0)
                                msg = e;
                            else if (e.length > 0 && e != msg)
                                msg += ' (' + e + ')';
                        }
                        message = r + ' ' + displayText + ': ' + msg;
                    }
                    else {
                        message = 'Progress worker for ' + displayText + ' not found matching id "' + progressId + '"';
                    }
                }
            }
            else {
                message = 'Plugin not found matching id "' + pluginIds[i] + '"';
            }
            worker.addMessage(message);
            outputSummary.push(message);
            worker.setOutputSummary(outputSummary.join("\n").trim());
        }
        if (failedPropertyNames.length > 0) {
            msg = "The following properties were not validated:\n\t" + failedPropertyNames.join("\n\t");
            if (failedPlugins.length > 0) {
                message = failedPropertyNames.length + " property validation(s) failed; " + failedPlugins.length + " plugin activation(s) failed";
                msg = msg + "\n\nThe following plugins were not activated:\n\t" + failedPlugins.join("\n\t");
            }
            else {
                message = "All plugins activated; " + failedPropertyNames.length + " property validation(s) failed";
            }
        }
        else if (failedPlugins.length > 0) {
            message = "All properties validated; " + failedPlugins.length + " plugin activation(s) failed";
            msg = "\The following plugins were not activated:\n\t" + failedPlugins.join("\n\t");
        }
        else {
            message = "All properties validated and plugins activated";
            outputSummary.unshift();
            outputSummary[0] = "Success: " + message;
            worker.addMessage(message);
            worker.setOutputSummary(outputSummary.join("\n"));
            return;
        }
        worker.addMessage(message);
        worker.addMessage(msg);
        outputSummary[0] = "Failed: " + message;
        outputSummary[1] = msg;
        worker.setOutputSummary(outputSummary.join("\n"));
        worker.setProgressErrorState();
    };
    return ArmySystemInit;
}());
//# sourceMappingURL=ArmySystemInit.js.map