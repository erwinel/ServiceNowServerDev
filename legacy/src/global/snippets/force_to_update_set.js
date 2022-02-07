"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var global;
(function (global) {
    var snippets;
    (function (snippets) {
        var force_to_update_set;
        (function (force_to_update_set) {
            //Commit any changes to the record
            current.update();
            //Check to make sure the table isn't synchronized already
            var tbl = current.getTableName();
            if (tbl.startsWith('wf_') || tbl.startsWith('sys_ui_') || tbl == 'sys_choice' || current.getED().getBooleanAttribute('update_synch') || current.getED().getBooleanAttribute('update_synch_custom')) {
                gs.addErrorMessage('Updates are already being recorded for this table.');
                action.setRedirectURL(current);
            }
            else {
                //Push the update into the current update set
                var um = new GlideUpdateManager2();
                um.saveRecord(current);
                //Query for the current update set to display info message
                var setID = gs.getPreference('sys_update_set');
                var us = new GlideRecord('sys_update_set');
                us.get(setID);
                //Display info message and reload the form
                gs.addInfoMessage('Record included in <a href="sys_update_set.do?sys_id=' + setID + '">' + us.name + '</a> update set.');
                action.setRedirectURL(current);
            }
        })(force_to_update_set = snippets.force_to_update_set || (snippets.force_to_update_set = {}));
    })(snippets = global.snippets || (global.snippets = {}));
})(global = exports.global || (exports.global = {}));
//# sourceMappingURL=force_to_update_set.js.map