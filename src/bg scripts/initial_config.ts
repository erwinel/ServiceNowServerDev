const sdlc_stage: string = "dev";
type SystemPropertyType = "string"|"color"|"timezone";

interface SystemPropertyDefinition {
    name: string;
    type: SystemPropertyType;
    description: string;
    sys_package: string;
    prod: string,
    test: string;
    dev: string;
    sb: string;
}

let sys_properties: SystemPropertyDefinition[] = [
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

sys_properties