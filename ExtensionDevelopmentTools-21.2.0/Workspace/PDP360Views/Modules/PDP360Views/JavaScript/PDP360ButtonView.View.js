// @module RudraCustomization.PDP360Views.PDP360ButtonView
define('RudraCustomization.PDP360Views.PDP360ButtonView.View'
,	[
	'pdp360buttonview.tpl'
    ,   'RudraCustomization.PDP360Views.PDP360Views.View'
	,	'Backbone'
    ]
, function (
    pdp360buttonview_tpl
    ,   PDP360Views
	,	Backbone
)
{
    'use strict';

	// @class RudraCustomization.PDP360Views.PDP360ButtonView.View @extends Backbone.View
	return Backbone.View.extend({

		template: pdp360buttonview_tpl

	,	initialize: function (options) {
        // console.log(options);

        // this.on('afterViewRender',()=>{
		// 	loadScript();
        // })
        // return this.options.Layout.showContent(removeAllLinesConfirmationView, {showInModal:true});

		
		}
	,	beforeShowContent() {
			return jQuery.getScript('https://unpkg.com/@google/model-viewer@2.1.1/dist/model-viewer.min.js');
		}
	// ,	loadScript: function loadScript(application, routes) {
	// 		const self = this;
			
			
	// 	}
	

	,	events: {
            'click [data-action="Button-360popup"]':'View360PopUpTriggered'
		}
    ,   View360PopUpTriggered:function(e){
            e.preventDefault();
            var modal360Popup = new PDP360Views();
        // //    return this.options.Layout.showInModal(modal360Popup,{ className: 'global-views-modal-extra-large' })
            this.options.Layout.showContent(modal360Popup, {showInModal:true});
            
        }

	,	bindings: {
		}

	, 	childViews: {

		}

		//@method getContext @return RudraCustomization.PDP360Views.PDP360ButtonView.View.Context
	,	getContext: function getContext()
		{
			//@class RudraCustomization.PDP360Views.PDP360ButtonView.View.Context
			
			return {
				
			};
		}
	});
});
