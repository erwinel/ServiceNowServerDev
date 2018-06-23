var sdlc_stage = "dev";
var pluginIds = [
    'com.glide.quiz_designer',
    'com.glide.ui.list_v3',
    'com.glide.web_service_provider_v2',
    'com.glideapp.live_feed_v2',
    'com.glideapp.report_statreports',
    'com.snc.automatic_assignment',
    'com.snc.bestpractice.bulkchange',
    'com.snc.change_management.risk_assessment',
    'com.snc.extended_cmdb',
    'com.snc.field_normalization',
    'com.snc.iam',
    'com.snc.knowledge_document',
    'com.snc.pa.configurationgenerator',
    'com.snc.required_form_fields',
    'com.snc.sc_catalog_manager',
    'com.snc.sdlc.agile.2.0',
    'com.snc.service_portfolio.sla',
    'com.snc.sla.contract2',
    'com.snc.task_activity',
    'com.snc.treemap',
    'com.snc.undelete',
    'com.snc.whtp'
];
var cfgWorker = new GlideScriptedProgressWorker();
cfgWorker.setProgressName("Initial configuration");
cfgWorker.setName("ArmySystemInit");
cfgWorker.addParameter(sdlc_stage);
for (var i = 0; i < pluginIds.length; i++)
    cfgWorker.addParameter(pluginIds[i]);
cfgWorker.setBackground(true);
cfgWorker.start();
gs.info("Progress worker started. sys_id is " + cfgWorker.getProgressID() + ".");
gs.info("Navigate to System Diagnostics => Progress Workers to view status.");