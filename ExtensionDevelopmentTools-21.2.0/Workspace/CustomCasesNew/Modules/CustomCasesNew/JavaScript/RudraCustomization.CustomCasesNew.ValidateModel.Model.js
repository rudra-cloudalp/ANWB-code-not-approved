// Model.js
// -----------------------
// @module Case
define("RudraCustomization.CustomCasesNew.ValidateModel.Model", ["Backbone", "Utils","underscore"], function(
    Backbone,
    Utils,
    _
) {
    "use strict";
        // @class Case.Model Model for handling Support Cases (CRUD) @extends Backbone.Model

    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Model.extend({

        
        //@property {String} urlRoot
        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "services/CustomCasesNewList.Service.ss"
            )
        )
               
    });
});
