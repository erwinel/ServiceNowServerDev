/// <reference path="../../../typings/global/ServiceNowGlobalTypes.d.ts" />

import { x_44813_util } from '../../../compiled/scoped/x_44813_util';

export namespace global.bg_scripts.initial_config {
    interface ISysPropertyInfo {
        name: string,
        type: string,
        description: string,
        sys_package: string,
        prod: string,
        uat: string,
        test: string,
        dev: string,
        sb: string
    }

    // Following is an array of properties that will be configured by this script.
    let sys_properties: ISysPropertyInfo[] = [
        { name: "glide.sys.default.tz", type: "timezone", description: "System timezone for all users unless overridden in the user's record", sys_package: "glidesoft",
            prod: "US/Eastern", uat: "US/Eastern", test: "US/Eastern", dev: "US/Eastern", sb: "US/Eastern" },
        { name: "glide.product.name", type: "string", description: "Browser tab title", sys_package: "apps/system2",
            prod: "ServiceNow Production", uat: "ServiceNow UAT", test: "ServiceNow Test", dev: "ServiceNow Dev", sb: "ServiceNow Sandbox" },
        { name: "glide.product.description", type: "string", description: "Page header caption", sys_package: "apps/system2",
            prod: "Enterprise Service Tool", uat: "Enterprise Service Tool", test: "Enterprise Service Tool", dev: "Enterprise Service Tool", sb: "Enterprise Service Tool" },
        { name: "css.base.color", type: "color", description: "Banner and list caption background color", sys_package: "apps/system2",
            prod: "#985252", uat: "#526498", test: "#526498", dev: "#649852", sb: "#645298" },
        { name: "css.banner.description.color", type: "color", description: "Banner text color", sys_package: "glidesoft",
            prod: "#d58181", uat: "#8196d5", test: "#8196d5", dev: "#96d581", sb: "#96d581" },
        { name: "css.$navpage-header-bg", type: "color", description: "Header Background Color", sys_package: "com.glide.ui.ui16",
            prod: "#5b1a1a", uat: "#1a2a5b", test: "#1a2a5b", dev: "#2a5b1a", sb: "#9681d5" },
        { name: "css.$navpage-header-color", type: "color", description: "Header Background Color", sys_package: "com.glide.ui.ui16",
            prod: "#fafad2", uat: "#fafad2", test: "#fafad2", dev: "#fafad2", sb: "#fafad2" },
        { name: "css.$navpage-header-divider-color", type: "color", description: "Header divider stripe color", sys_package: "global",
            prod: "#822626", uat: "#263d82", test: "#263d82", dev: "#3d8226", sb: "#3d2682" },
        { name: "css.$navpage-nav-bg", type: "color", description: "Navigation Header/Footer", sys_package: "com.glide.ui.ui16",
            prod: "#5b1a1a", uat: "#1a2a5b", test: "#1a2a5b", dev: "#2a5b1a", sb: "#9681d5" },
        { name: "css.$subnav-background-color", type: "color", description: "Navigation background expanded items", sys_package: "com.glide.ui.ui16",
            prod: "#592222", uat: "#223d59", test: "#223d59", dev: "#2f5922", sb: "#2f2259" },
        { name: "css.$navpage-nav-color-sub", type: "color", description: "Module text color for UI16<br/>Also affects unselected navigation tab icon and favorite icons color.", sys_package: "com.glide.ui.ui16",
            prod: "#d7d7ac", uat: "#d7d7ac", test: "#d7d7ac", dev: "#dde1ee", sb: "#d7d7ac" },
        { name: "css.$navpage-nav-selected-bg", type: "color", description: "Navigation selected tab background color", sys_package: "com.glide.ui.ui16",
            prod: "#7e2a2a", uat: "#2a3f7e", test: "#2a3f7e", dev: "#3f7e2a", sb: "#3f2a7e" },
        { name: "css.$nav-hr-color", type: "color", description: "Navigation separator color", sys_package: "com.glide.ui.ui16",
            prod: "#7e2a2a", uat: "#2a3f7e", test: "#2a3f7e", dev: "#3f7e2a", sb: "#3f2a7e" },
        { name: "css.$navpage-nav-bg-sub", type: "color", description: "Background for navigator and sidebars", sys_package: "com.glide.ui.ui16",
            prod: "#822626", uat: "#263d82", test: "#263d82", dev: "#3d8226", sb: "#3d2682" },
        { name: "css.$navpage-nav-unselected-color", type: "color", description: "Unselected navigation tab icon and favorite icons color", sys_package: "global",
            prod: "#e0a3a3", uat: "#a3c2e0", test: "#a3c2e0", dev: "#b3e0a3", sb: "#b3a3e0" },
        { name: "css.$navpage-nav-selected-color", type: "color", description: "Currently selected Navigation tab icon color for UI16", sys_package: "",
            prod: "#afeeee", uat: "#f08080", test: "#f08080", dev: "#f08080", sb: "#f08080" },
        { name: "css.$navpage-nav-border", type: "color", description: "Border color for UI16", sys_package: "com.glide.ui.ui16",
            prod: "#eecdcd", uat: "#ced6ee", test: "#ced6ee", dev: "#d6eece", sb: "#d6ceee" },
        { name: "css.$nav-highlight-main", type: "color", description: "Navigation highlight background color", sys_package: "com.glide.ui.ui16",
            prod: "#493131", uat: "#2e3d4d", test: "#2e3d4d", dev: "#374931", sb: "#373149" }
    ];

    function getStageProperty(index: number, stage: x_44813_util.SysPropertyDefinitions.SdlcStageType): string {
        let p: ISysPropertyInfo = sys_properties[index];
        switch (stage) {
            case "prod":
                return p.prod;
            case "uat":
                return p.uat;
            case "test":
                return p.test;
            case "dev":
                return p.dev;
        }
        return p.sb;
    }

    let stageName: string = gs.getProperty('x_44813_util.SN_SDLC_STAGE', '');

    if (stageName.length == 0)
        gs.error("SDLC stage of current server not set. Cannot continue.");
    else if (stageName !== "prod" && stageName !== "uat" && stageName !== "test" && stageName !== "dev" && stageName !== "sb")
        gs.error("SDLC stage of current server (" + JSON.stringify(stageName) + ") is invalid. This must be set to either \"prod\", \"uat\", \"test\", \"dev\", or \"sb\". Cannot continue.");
    else {
        let sdlc_stage: x_44813_util.SysPropertyDefinitions.SdlcStageType = <x_44813_util.SysPropertyDefinitions.SdlcStageType>stageName;
        let errorCount: number = 0;
        let updateCount: number = 0;
        for (var i = 0; i < sys_properties.length; i++) {
            let settingsGr: GlideRecord = new GlideRecord('sys_properties');
            settingsGr.addQuery('name', sys_properties[i].name);
            settingsGr.query();
            if (settingsGr.next()) {
                let oldValue: string = settingsGr.getValue('value');
                if (oldValue == getStageProperty(i, sdlc_stage))
                    gs.info("Property " + sys_properties[i].name + " was already set to '" + getStageProperty(i, sdlc_stage) + "'");
                else {
                    try {
                        settingsGr.setValue('value', getStageProperty(i, sdlc_stage));
                        settingsGr.update();
                        gs.info("Changed " + sys_properties[i].name + " from '" + oldValue + "' to '" + getStageProperty(i, sdlc_stage) + "'");
                        updateCount++;
                    } catch (e) {
                        errorCount++;
                        gs.warn("Error changing " + sys_properties[i].name + " from '" + oldValue + "' to '" + getStageProperty(i, sdlc_stage) + "': " + e);
                    }
                }
            } else {
                try {
                    settingsGr.initialize();
                    settingsGr.setValue('name', sys_properties[i].name);
                    settingsGr.setValue('sys_name', sys_properties[i].name);
                    settingsGr.setValue('description', sys_properties[i].description);
                    settingsGr.setValue('type', sys_properties[i].type);
                    settingsGr.setValue('ignore_cache', false);
                    settingsGr.setValue('is_private', false);
                    settingsGr.setValue('value', getStageProperty(i, sdlc_stage));
                    let packageGr: GlideRecord = new GlideRecord('sys_package');
                    packageGr.addQuery('source', sys_properties[i].sys_package);
                    packageGr.query();
                    if (packageGr.next())
                        settingsGr.setValue('sys_package', packageGr.sys_id);
                    settingsGr.insert();
                    gs.info("Added " + sys_properties[i].name + " with the value of '" + getStageProperty(i, sdlc_stage) + "'");
                    updateCount++;
                } catch (e) {
                    errorCount++;
                    gs.warn("Error adding " + sys_properties[i].name + " with the value of '" + getStageProperty(i, sdlc_stage) + "': " + e);
                }
            }
        }
    
        if (errorCount == 0)
            gs.info('There were no errors.');
        else if (errorCount == 1)
            gs.warn('1 error has occurred.');
        else
            gs.warn(errorCount + ' errors have occurred.');
        if (updateCount > 0)
            gs.info("You may need to refresh your browser to see the changes.");
        else if (errorCount == 0)
            gs.info("No changes were required.");
    }
}