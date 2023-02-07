// @module RudraCustomization.PDP360Views.PDP360Views
define('RudraCustomization.PDP360Views.PDP360Views.View'
,	[
	'rudracustomization_pdp360views_pdp360views.tpl'
	// ,	'model-viewer'
	,	'Backbone'
	,	'RudraCustomization.PDP360Views.PDP360CustomView.View'
    ]
, function (
	rudracustomization_pdp360views_pdp360views_tpl
	// ,	ModelViewer
	,	Backbone
	,	PDP360CustomView
)
{
    'use strict';

	// @class RudraCustomization.PDP360Views.PDP360Views.View @extends Backbone.View
	return Backbone.View.extend({

		template: rudracustomization_pdp360views_pdp360views_tpl

	,	modalClass: 'global-views-modal-extra-large'

	,	initialize: function (options) {

			/*  Uncomment to test backend communication with an example service
				(you'll need to deploy and activate the extension first)
			*/

			
			// this.on('afterViewRender',()=>{
			// 	customElements.define('model-viewer', ModelViewer.ModelViewerElement);
			// })
		}
		
		,	events: {
		}
		
		,	bindings: {
		}
		
		, 	childViews: {
			'model-data':function(){
				// var modelData = ModelViewer.ModelViewerElement;
				return new PDP360CustomView()
			}
			
		}
		
		//@method getContext @return RudraCustomization.PDP360Views.PDP360Views.View.Context
		,	getContext: function getContext()
		{
			// customElements.define('model-viewer', ModelViewer.ModelViewerElement);
			//@class RudraCustomization.PDP360Views.PDP360Views.View.Context
			this.message = this.message || 'Hello World!!'
			return {
				message: this.message
			};
		}
	});
});
