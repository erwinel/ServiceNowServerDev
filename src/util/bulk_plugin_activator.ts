namespace x_44813_util {
    declare let worker: GlideScriptedProgressWorker;
    export class bulk_plugin_activator implements IBackgroundProgressWorkerHandler {
        intialize(): void {
        }

        process(...pluginIds: string[]): void {
            let gpm: GlidePluginManager = new GlidePluginManager();
            let failCount: number = 0;
            let activateCount: number = 0;
            let failMessages: string[] = pluginIds.map((pluginId: string, index: number) => {
                worker.setProgressMessage("Validating " + pluginId + " (" + (index + 1) + " of " + pluginIds.length + ")");
                let pluginGlideRecord: GlideRecord = new GlideRecord("v_plugin");
                pluginGlideRecord.addQuery("id", pluginId);
                pluginGlideRecord.query();
                if (!pluginGlideRecord.next()) {
                    failCount++;
                    let notFoundMsg: string = 'Plugin not found matching id "' + pluginId + '"'
                    worker.addMessage(notFoundMsg);
                    return notFoundMsg;
                }
                let displayText: string = pluginGlideRecord.getValue('name') + ' (' + pluginId + ')';
                if (GlidePluginManager.isActive(pluginId)) {
                    worker.addMessage('Plugin ' + displayText + ' was already activated.');
                    return "";
                }
                        
                let pluginWorker: GlidePluginManagerWorker = new GlidePluginManagerWorker();
                pluginWorker.setPluginId(pluginId);
                pluginWorker.setIncludeDemoData(false);
                pluginWorker.setProgressName('Activate ' + displayText);
                pluginWorker.setBackground(false);
                pluginWorker.start();
                let progressId: string = pluginWorker.getProgressID();
                let progressGlideRecord: GlideRecord = new GlideRecord("sys_progress_worker");
                progressGlideRecord.addQuery("sys_id", progressId);
                progressGlideRecord.query();
                if (!progressGlideRecord.next()) {
                    failCount++;
                    let noProgressMsg: string = 'Progress worker for ' + displayText + ' not found matching id "' + progressId + '"';
                    worker.addMessage(noProgressMsg);
                    return noProgressMsg;
                }
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
                if (gs.nil(msg))
                    msg = "";
                if (success)
                    activateCount++;
                else {
                    failCount++;
                    let e: string|null|undefined = progressGlideRecord.getValue('error_message');
                    e = (gs.nil(e)) ? e : e.trim();
                    if (msg.length == 0)
                        msg = e;
                    else if (e.length > 0 && e != msg)
                        msg += ' (' + e + ')';
                }
                msg = r + ' ' + displayText + ': ' + msg;
                worker.addMessage(msg);
                
                return (success) ? "" : msg;
            }).filter(s => s.length > 0);

            if (failMessages.length == 0)
                worker.setProgressMessage(((activateCount == 1) ? "1 plugin" : activateCount + " plugins") + " activated.");
            else
                worker.setProgressMessage(((activateCount == 1) ? "1 plugin" : activateCount + " plugins") + " activated, " + failCount + " failed: \n" + failMessages.join("\n"));
        }

        type: "bulk_plugin_activator";
    }
}