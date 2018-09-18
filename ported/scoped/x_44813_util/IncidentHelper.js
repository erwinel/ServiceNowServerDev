var IncidentHelper = Class.create();
(function (IncidentHelper) {
    IncidentHelper.prototype = {
        initialize: function() {
        },

        type: 'IncidentHelper'
    };
    IncidentHelper.lookupPriority = function (impact, urgency) {
        var result = {
            impact: NaN, urgency: NaN
        };
        if (typeof (impact) == "number")
            result.impact = impact;
        else if (typeof (impact) == "string" && (impact = impact.trim()).length > 0)
            result.impact = parseInt(impact);
        if (isNaN(result.impact) || result.impact < 0)
            result.impact = 0;
        else if (result.impact > 3)
            result.impact = 3;
        if (typeof (urgency) == "number")
            result.urgency = urgency;
        else if (typeof (urgency) == "string" && (urgency = urgency.trim()).length > 0)
            result.urgency = parseInt(urgency);
        if (isNaN(result.urgency) || result.urgency < 0)
            result.urgency = 0;
        else if (result.urgency > 3)
            result.urgency = 3;
        var gr = new GlideRecord('dl_u_priority');
        gr.addQuery("active", true);
        gr.addQuery("impact", result.impact);
        gr.addQuery("urgency", result.urgency);
        gr.query();
        result.priority = Math.round(((result.impact + result.urgency - 2) / 4.0) * 3.0) + 1;
        if (gr.next()) {
            impact = gr.getValue('priority');
            if (typeof (impact) != "number") {
                if (typeof (impact) == "string" && (impact = impact.trim()).length > 0)
                    impact = parseInt(impact);
                else
                    impact = NaN;
            }
            if (!isNaN(impact)) {
                if (impact < 0)
                    result.priority = 0;
                else
                    result.priority = (impact > 3) ? 3 : impact;
            }
            else
                gs.debug("Could not get mapping for urgency=" + urgency + ",impact=" + impact + "=" + gr.priority + " => " + result.priority);
            return result;
        }
        gs.warn("Could not get mapping for urgency=" + urgency + ",impact=" + impact);
        return result;
    };
    IncidentHelper.getUrgencyAndImpact = function (userImpact, productivityImpact, missionRelated, vip) {
        var result = {
            userImpact: NaN, productivityImpact: NaN, missionRelated: false, vip: false
        };
        if (typeof (userImpact) == "number")
            result.userImpact = userImpact;
        else if (typeof (userImpact) == "string" && (userImpact = userImpact.trim()).length > 0)
            result.userImpact = parseInt(userImpact);
        if (isNaN(result.userImpact) || result.userImpact < 0)
            result.userImpact = 0;
        else if (result.userImpact > 4)
            result.userImpact = 4;
        if (typeof (productivityImpact) == "number")
            result.productivityImpact = productivityImpact;
        else if (typeof (productivityImpact) == "string" && (productivityImpact = productivityImpact.trim()).length > 0)
            result.productivityImpact = parseInt(productivityImpact);
        if (isNaN(result.productivityImpact) || result.productivityImpact > 4)
            result.productivityImpact = 4;
        else if (result.productivityImpact < 1)
            result.productivityImpact = 1;
        if (typeof (missionRelated) == "boolean")
            result.missionRelated = missionRelated;
        else if (typeof (missionRelated) == "number")
            result.missionRelated = !isNaN(missionRelated) && missionRelated !== 0;
        else if (typeof (missionRelated) == "string" && (missionRelated = missionRelated.trim()).length > 0)
            result.missionRelated = missionRelated.match(/^(0*(\.0*)?[1-9]|y(es)|t(rue))/i) !== null;
        if (typeof (vip) == "boolean")
            result.vip = vip;
        else if (typeof (vip) == "number")
            result.vip = !isNaN(vip) && vip !== 0;
        else if (typeof (vip) == "string" && (vip = vip.trim()).length > 0)
            result.vip = vip.match(/^(0*(\.0*)?[1-9]|y(es)|t(rue))/i) !== null;
        result.impact = Math.round((result.productivityImpact + ((result.userImpact > 0) ? result.userImpact : result.productivityImpact) +
            ((result.vip) ? 1 : result.productivityImpact) +
            ((result.missionRelated) ? 1 : result.productivityImpact)) / 5.33);
        result.urgency = (result.vip) ? ((result.missionRelated) ? 1 : 2) : ((result.missionRelated) ? 2 : 3);
        return result;
    };
    return IncidentHelper;
})(IncidentHelper);