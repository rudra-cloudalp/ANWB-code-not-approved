
function service(request, response)
{
	'use strict';
	try 
	{
		require('RudraCustomization.CustomCasesNew.CustomCasesNewList.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('RudraCustomization.CustomCasesNew.CustomCasesNewList.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}