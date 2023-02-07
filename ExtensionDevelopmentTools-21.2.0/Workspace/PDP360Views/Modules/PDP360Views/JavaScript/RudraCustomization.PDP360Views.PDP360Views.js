
define(
	'RudraCustomization.PDP360Views.PDP360Views'
,   [
		'RudraCustomization.PDP360Views.PDP360Views.View'
	,	'RudraCustomization.PDP360Views.PDP360ButtonView.View'
	// ,	'model-viewer'
	]
,   function (
		PDP360ViewsView
	,	PDP360ButtonView
	// ,	modelViews
	)
{
	'use strict';

	return  {
		mountToApp: function mountToApp (container)
		{
			// using the 'Layout' component we add a new child view inside the 'Header' existing view 
			// (there will be a DOM element with the HTML attribute data-view="Header.Logo")
			// more documentation of the Extensibility API in
			// https://system.netsuite.com/help/helpcenter/en_US/APIs/SuiteCommerce/Extensibility/Frontend/index.html
			
			/** @type {LayoutComponent} */
			var PDP = container.getComponent('PDP');
			var layout = container.getComponent('Layout');
			
			if(PDP)
			{
				PDP.addChildView('Product.ImageGallery', function() { 
					return new PDP360ButtonView({ Layout:layout , container:container});
				});
				
			}
			

		}
	};
});
