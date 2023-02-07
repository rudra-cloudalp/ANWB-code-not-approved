// Model.js
// -----------------------
// @module Case
define("RudraCustomization.PDP360Views.PDP360Views.Model", ["Backbone", "Utils"], function(
    Backbone,
    Utils
) {
    "use strict";

    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Model.extend({

        
        //@property {String} urlRoot
        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "services/PDP360Views.Service.ss"
            )
        )
        
});
});
