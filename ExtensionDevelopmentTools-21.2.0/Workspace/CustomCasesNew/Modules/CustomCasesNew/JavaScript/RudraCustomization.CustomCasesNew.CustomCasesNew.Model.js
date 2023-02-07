// Model.js
// -----------------------
// @module Case
define("RudraCustomization.CustomCasesNew.CustomCasesNew.Model", ["Backbone", "Utils",'underscore'], function(
    Backbone,
    Utils,
    _
) {
    "use strict";
        //@method validateLength. Validates message length. (0 < length <= 4000)
        function validateLength (value, name)
        {
            var max_length = 4000;
    
            if (value && value.length > max_length)
            {
                return _('$(0) must be at most $(1) characters').translate(name, max_length);
            }
        }
    
        //@method validateMessage. Validates message entered by the user. Checks length 0 < length <= 4000.
        function validateMessage (value, name)
        {
            /*jshint validthis:true */
            if (this.get('isNewCase')) 
            {
                if (!value)
                {
                    return _('$(0) is required').translate(name);
                }
    
                return validateLength(value, name);
            }
        }
    
        function validateReply (value, name)
        {
            /*jshint validthis:true */
            if(!this.get('isNewCase') && !value)
            {
                
                return _('$(0) is required').translate(name);   
            }
        }

    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Model.extend({

        
        //@property {String} urlRoot
        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "services/CustomCasesNew.Service.ss"
            )
        )
        ,    validation:
            {
                title: {
                    required: true,
                    msg: _('Subject is required').translate()
                }

            ,   message: {
                fn: validateMessage
            }

            ,   reply: {
                fn: validateReply
            }

            ,   email: {
                required: function (value, name, form){
                        return !!form.include_email;
                }
                ,    pattern: 'email'
                ,    msg: _('Please provide a valid email').translate()
            }
        }
        
});
});
