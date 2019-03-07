
export module x_44813_sninitcfg {
    function fix_scripts_initialize_standup_tasks()
    {
        gs.info('Starting');
        var gr = new GlideRecord('x_44813_sninitcfg_servicenow_standup_tasks');
        gr.addQuery('number', 'SNST0001001');
        gr.query();
        if (!gr.next())
            throw 'Git URL not found';
        if (gs.nil(gr.source_url))
            gs.info("Git URL is not present");
        else
            gs.info(gr.short_description + ': ' + typeof(gr.getValue('source_url')));
    }
}