
function service(request, response)
{
	'use strict';
	try 
	{
		require('RudraCustomization.CustomCasesNew.CustomCasesNew.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('RudraCustomization.CustomCasesNew.CustomCasesNew.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}