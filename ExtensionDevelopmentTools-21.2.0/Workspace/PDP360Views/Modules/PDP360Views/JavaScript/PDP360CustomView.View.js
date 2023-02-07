// @module RudraCustomization.PDP360Views.PDP360CustomView
define('RudraCustomization.PDP360Views.PDP360CustomView.View'
,	[
	'pdp360custom_view.tpl'
	// ,	'model-viewer'
	,	'Backbone'
    ,   'jQuery'
    ]
, function (
	pdp360custom_view_tpl
	// ,	ModelViewer
	,	Backbone
    ,   jQuery
)
{
    'use strict';

	// @class RudraCustomization.PDP360Views.PDP360Views.View @extends Backbone.View
	return Backbone.View.extend({

		template: pdp360custom_view_tpl

	// ,	modalClass: 'global-views-modal-extra-large'

	,	initialize: function (options) {

			/*  Uncomment to test backend communication with an example service
				(you'll need to deploy and activate the extension first)
			*/
      
			
			this.on('afterViewRender',()=>{
				loadScript();
			})
		}
      
		,	events: {
		}
		
		,	bindings: {
		}
		
		, 	childViews: {
			
		}
		
		//@method getContext @return RudraCustomization.PDP360Views.PDP360Views.View.Context
		,	getContext: function getContext()
		{
            // customElements.define('model-viewer', modelData)
			// customElements.define('model-viewer', ModelViewer.ModelViewerElement);
			//@class RudraCustomization.PDP360Views.PDP360Views.View.Context
			this.message = this.message || 'Hello World!!'
			return {
				message: this.message
			};
		}
	});
});
