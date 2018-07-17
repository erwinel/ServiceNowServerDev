/// <reference path="../../../typings/global/ServiceNowGlobalTypes.d.ts" />

export namespace global.bg_scripts.bulk_plugin_activation {
    let pluginIds: string[] = [
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
        'com.snc.financial_planning_pmo',
        'com.snc.iam',
        'com.snc.knowledge_document',
        'com.snc.pa.configurationgenerator',
        'com.snc.procurement',
        'com.snc.required_form_fields',
        'com.snc.sc_catalog_manager',
        'com.snc.sdlc.agile.2.0',
        'com.snc.service_portfolio.sla',
        'com.snc.sla.contract2',
        'com.snc.task_activity',
        'com.snc.treemap',
        'com.snc.undelete',
        'com.snc.vendor_performance',
        'com.snc.whtp'
    ];
    let skipped: string[] = [];
    let results: { success: boolean, message: string }[] = [];
    let stopAfter: GlideDateTime = new GlideDateTime();
    stopAfter.add(1000 * 300);
    let gpm: GlidePluginManager = new GlidePluginManager();
    let stopReason: string = 'before 5 minutes had elapsed';
    let failCount: number = 0;
    let activateCount: number = 0;
    for (var i = 0; i < pluginIds.length; i++) {
        gs.info('*** BEGIN Activation: ' + pluginIds[i] + ' ***');
        let pluginGlideRecord: GlideRecord = new GlideRecord("v_plugin");
        pluginGlideRecord.addQuery("id", pluginIds[i]);
        pluginGlideRecord.query();
        if (pluginGlideRecord.next()) {
            let displayText: string = pluginGlideRecord.getValue('name') + ' (' + pluginIds[i] + ')';
            if (gpm.isActive(pluginIds[i])) {
                results.push({ success: true, message: 'Plugin ' + displayText + ' was already activated.' });
                gs.info('*** END Activation: ' + pluginIds[i] + ' ***');
                continue;
            }
            let currentDateTime: GlideDateTime = new GlideDateTime();
            if (stopAfter.before(currentDateTime))
                skipped.push(displayText);
            else {
                let worker: GlidePluginManagerWorker = new GlidePluginManagerWorker();
                worker.setPluginId(pluginIds[i]);
                worker.setIncludeDemoData(false);
                worker.setProgressName('Activate ' + displayText);
                worker.setBackground(false);
                worker.start();
                let progressId: string = worker.getProgressID();
                let progressGlideRecord: GlideRecord = new GlideRecord("sys_progress_worker");
                progressGlideRecord.addQuery("sys_id", progressId);
                progressGlideRecord.query();
                if (progressGlideRecord.next()) {
                    let completion_code: string = progressGlideRecord.getValue('state');
                    gs.info("state is " + completion_code);
                    if (completion_code == 'complete' || completion_code == 'cancelled') {
                        let c: string = progressGlideRecord.getValue('state_code');
                        if (!gs.nil(c) && c.length > 0)
                            completion_code = c;
                    }
                    let r: string = '';
                    let success: boolean = false;
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
                    let msg: string|null|undefined = progressGlideRecord.getValue('message');
                    msg = (typeof(msg) === 'string') ? msg.trim() : "";
                    if (success)
                        activateCount++;
                    else {
                        failCount++;
                        let e: string|null|undefined = progressGlideRecord.getValue('error_message');
                        e = (typeof(e) === 'string') ? e.trim() : "";
                        if (msg.length == 0)
                            msg = e;
                        else if (e.length > 0 && e != msg)
                            msg += ' (' + e + ')';
                    }
                    results.push({ success: success, message: r + ' ' + displayText + ': ' + msg });
                } else {
                    failCount++;
                    results.push({ success: false, message: 'Unable to find progress record ' + progressId + ' for ' + displayText });
                }
            }
        } else
            results.push({ success: false, message: 'Plugin with ID of "' + pluginIds[i] + '" not found.' });
        gs.info('*** END Activation: ' + pluginIds[i] + ' ***');
    }

    if (failCount == 0)
        gs.info(activateCount + ' Activated, 0 Failed.');
    else
        gs.warn(activateCount + ' Activated, ' + failCount + ' Failed.');

    for (var i = 0; i < results.length; i++) {
        if (results[i].success)
            gs.info(results[i].message);
    }
    if (skipped.length == 0) {
        if (failCount == 0)
            gs.info('All plugin activations completed and/or verified.');
    } else {
        let msg: string = 'The following plugins were not activated ' + stopReason + ":";
        for (var i = 0; i < skipped.length; i++)
            msg += "\n    " + skipped[i] + "\n";
        if (failCount == 0)
            msg += "\nRe-run this script to continue.";
        gs.info(msg);
    }

    for (var i = 0; i < results.length; i++) {
        if (!results[i].success)
            gs.warn(results[i].message);
    }
}