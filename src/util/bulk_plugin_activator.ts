namespace x_44813_util {
    declare let worker: GlideScriptedProgressWorker;
    export class bulk_plugin_activator implements IBackgroundProgressWorkerHandler {
        intialize(): void {
        }

        process(...pluginIds: string[]): void {
            let gpm: GlidePluginManager = new GlidePluginManager();
            let failCount: number = 0;
            let activateCount: number = 0;
            pluginIds.forEach((pluginId: string, index: number) => {
                worker.addMessage("Validating " + pluginId + " (" + (index + 1) + " of " + pluginIds.length + ")");
                let pluginGlideRecord: GlideRecord = new GlideRecord("v_plugin");
                pluginGlideRecord.addQuery("id", pluginId);
                pluginGlideRecord.query();
                if (pluginGlideRecord.next()) {
                    let displayText: string = pluginGlideRecord.getValue('name') + ' (' + pluginId + ')';
                    if (gpm.isActive(pluginId)) {
                        worker.setProgressState
                        results.push({ success: true, message: 'Plugin ' + displayText + ' was already activated.' });
                        gs.info('*** END Activation: ' + pluginIds[i] + ' ***');
                        continue;
                    }
                } else {

                }
            });
        }

        type: "bulk_plugin_activator";
    }
}