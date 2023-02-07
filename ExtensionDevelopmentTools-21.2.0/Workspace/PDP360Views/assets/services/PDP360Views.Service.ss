
function service(request, response)
{
	'use strict';
	try 
	{
		require('RudraCustomization.PDP360Views.PDP360Views.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('RudraCustomization.PDP360Views.PDP360Views.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}