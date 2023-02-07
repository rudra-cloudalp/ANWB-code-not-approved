// Model.js
// -----------------------
// @module Case
define("RudraCustomization.CustomCasesNew.CustomCasesNew.SS2Model", ["Backbone", "Utils"], function(
    Backbone,
    Utils
) {
    "use strict";

    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Model.extend({
        //@property {String} urlRoot
        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "Modules/CustomCasesNew/SuiteScript2/CustomCasesNew.Service.ss"
            ),
            true
        )
    });
});
