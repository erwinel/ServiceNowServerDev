// Following is an array of properties that will be configured by this script.
var sys_properties = [
	{ name: "glide.product.name", type: "string", description: "Browser tab title", sys_package: "apps/system2",
		prod: "ServiceNow Production", uat: "ServiceNow UAT", test: "ServiceNow Test", dev: "ServiceNow Dev", sb: "ServiceNow Sandbox" },
	{ name: "css.base.color", type: "color", description: "Banner and list caption background color", sys_package: "apps/system2",
		ootb: "#767676", prod: "#767676", uat: "#767676", test: "#767676", dev: "#767676", sb: "#767676" },
	{ name: "css.banner.description.color", type: "color", description: "Banner text color", sys_package: "glidesoft",
		ootb: "#AAAAAA", prod: "#aaaaaa", uat: "#aaaaaa", test: "#aaaaaa", dev: "#aaaaaa", sb: "#AAAAAA" },
	{ name: "css.$navpage-header-bg", type: "color", description: "Header Background Color", sys_package: "com.glide.ui.ui16",
		ootb: "#303a46", prod: "#651511", uat: "#111b65", test: "#115365", dev: "#376511", sb: "#303a46" },
	{ name: "css.$navpage-header-color", type: "color", description: "Header Background Color", sys_package: "com.glide.ui.ui16",
		ootb: "#ffffff", prod: "#ffffff", uat: "#ffffff", test: "#ffffff", dev: "#ffffff", sb: "#ffffff" },
	{ name: "css.$navpage-header-divider-color", type: "color", description: "Header divider stripe color", sys_package: "global",
		ootb: "#455464", prod: "#911a18", uat: "#182a91", test: "#187b91", dev: "#539118", sb: "#455464" },
	{ name: "css.$navpage-nav-bg", type: "color", description: "Navigation Header/Footer", sys_package: "com.glide.ui.ui16",
		ootb: "#303A46", prod: "#651511", uat: "#111b65", test: "#115365", dev: "#376511", sb: "#303A46" },
	{ name: "css.$subnav-background-color", type: "color", description: "Navigation background expanded items", sys_package: "com.glide.ui.ui16",
		ootb: "#303a46", prod: "#651511", uat: "#111b65", test: "#115365", dev: "#376511", sb: "#223d59" },
	{ name: "css.$navpage-nav-color-sub", type: "color", description: "Module text color for UI16\u003cbr/\u003eAlso affects unselected navigation tab icon and favorite icons color.", sys_package: "com.glide.ui.ui16",
		ootb: "#bec1c6", prod: "#f0bab2", uat: "#b2b5f0", test: "#b2def0", dev: "#caf0b2", sb: "#bec1c6" },
	{ name: "css.$navpage-nav-selected-bg", type: "color", description: "Navigation selected tab background color", sys_package: "com.glide.ui.ui16",
		ootb: "#4B545F", prod: "#90201a", uat: "#1a2890", test: "#1a7690", dev: "#4f901a", sb: "#4B545F" },
	{ name: "css.$nav-hr-color", type: "color", description: "Navigation separator color", sys_package: "com.glide.ui.ui16",
		ootb: "#303a46", prod: "#651511", uat: "#111b65", test: "#115365", dev: "#376511", sb: "#303a46" },
	{ name: "css.$navpage-nav-bg-sub", type: "color", description: "Background for navigator and sidebars", sys_package: "com.glide.ui.ui16",
		ootb: "#455464", prod: "#911a18", uat: "#182a91", test: "#187b91", dev: "#539118", sb: "#455464" },
	{ name: "css.$navpage-nav-unselected-color", type: "color", description: "Unselected navigation tab icon and favorite icons color", sys_package: "global",
		ootb: "#bec1c6", prod: "#eba399", uat: "#999ceb", test: "#99d3eb", dev: "#b8eb99", sb: "#bec1c6" },
	{ name: "css.$navpage-nav-selected-color", type: "color", description: "Currently selected Navigation tab icon color for UI16",
		ootb: "#ffffff", prod: "#ffffff", uat: "#ffffff", test: "#ffffff", dev: "#ffffff", sb: "#ffffff" },
	{ name: "css.$navpage-nav-border", type: "color", description: "Border color for UI16", sys_package: "com.glide.ui.ui16",
		ootb: "#ddd", prod: "#dddddd", uat: "#dddddd", test: "#dddddd", dev: "#dddddd", sb: "#ddd" },
	{ name: "css.$nav-highlight-main", type: "color", description: "Navigation highlight background color", sys_package: "com.glide.ui.ui16",
		ootb: "#3D4853", prod: "#7b1515", uat: "#15267b", test: "#156a7b", dev: "#487b15", sb: "#3D4853" },
	{ name: "css.$accent-color-dark", type: "color", description: "Color used for edge bookmarks and navigator favorites",
		ootb: "#3e95f4", prod: "#fb3b37", uat: "#3753fb", test: "#37d6fb", dev: "#95fb37", sb: "#3e95f4" },
	{ name: "glide.ui.module.highlight_color", type: "color", description: "Background color used to highlight selected when typing in the navigation filter",
		ootb: "#eeeeee", prod: "#eeeeee", uat: "#eeeeee", test: "#eeeeee", dev: "#eeeeee", sb: "#eeeeee" }
];
function getStageProperty(index, stage) {
    var p = sys_properties[index];
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
var stageName = gs.getProperty('x_44813_util.SN_SDLC_STAGE', '');
if (stageName.length == 0)
    gs.error("SDLC stage of current server not set. Cannot continue.");
else if (stageName !== "prod" && stageName !== "uat" && stageName !== "test" && stageName !== "dev" && stageName !== "sb")
    gs.error("SDLC stage of current server (" + JSON.stringify(stageName) + ") is invalid. This must be set to either \"prod\", \"uat\", \"test\", \"dev\", or \"sb\". Cannot continue.");
else {
    var sdlc_stage = stageName;
    var errorCount = 0;
    var updateCount = 0;
    for (var i = 0; i < sys_properties.length; i++) {
        var settingsGr = new GlideRecord('sys_properties');
        settingsGr.addQuery('name', sys_properties[i].name);
        settingsGr.query();
        if (settingsGr.next()) {
            var oldValue = settingsGr.getValue('value');
            if (oldValue == getStageProperty(i, sdlc_stage))
                gs.info("Property " + sys_properties[i].name + " was already set to '" + getStageProperty(i, sdlc_stage) + "'");
            else {
                try {
                    settingsGr.setValue('value', getStageProperty(i, sdlc_stage));
                    settingsGr.update();
                    gs.info("Changed " + sys_properties[i].name + " from '" + oldValue + "' to '" + getStageProperty(i, sdlc_stage) + "'");
                    updateCount++;
                }
                catch (e) {
                    errorCount++;
                    gs.warn("Error changing " + sys_properties[i].name + " from '" + oldValue + "' to '" + getStageProperty(i, sdlc_stage) + "': " + e);
                }
            }
        }
        else {
            try {
                settingsGr.initialize();
                settingsGr.setValue('name', sys_properties[i].name);
                settingsGr.setValue('sys_name', sys_properties[i].name);
                settingsGr.setValue('description', sys_properties[i].description);
                settingsGr.setValue('type', sys_properties[i].type);
                settingsGr.setValue('ignore_cache', false);
                settingsGr.setValue('is_private', false);
                settingsGr.setValue('value', getStageProperty(i, sdlc_stage));
                var packageGr = new GlideRecord('sys_package');
                packageGr.addQuery('source', sys_properties[i].sys_package);
                packageGr.query();
                if (packageGr.next())
                    settingsGr.setValue('sys_package', packageGr.sys_id);
                settingsGr.insert();
                gs.info("Added " + sys_properties[i].name + " with the value of '" + getStageProperty(i, sdlc_stage) + "'");
                updateCount++;
            }
            catch (e) {
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