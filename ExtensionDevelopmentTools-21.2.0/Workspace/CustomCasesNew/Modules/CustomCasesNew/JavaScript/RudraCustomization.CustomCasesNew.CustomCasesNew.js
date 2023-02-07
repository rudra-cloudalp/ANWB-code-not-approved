
define(
	'RudraCustomization.CustomCasesNew.CustomCasesNew'
,   [
		'RudraCustomization.CustomCasesNew.CustomCasesNew.View'
	,	'MyAccountMenu'
	,	'RudraCustomization.CustomCasesNew.CustomCasesNewList.View'
	]
,   function (
		CustomCasesNewView
	,	MyAccountMenu
	,	CustomCasesNewListView
	
	)
{
	'use strict';

	return  {
		mountToApp: function mountToApp (container)
		{
			if (SC && SC.ENVIRONMENT && SC.ENVIRONMENT.casesManagementEnabled) 
			{				
				var pageType = container.getComponent('PageType');
				pageType.registerPageType({
					name: 'supportcase',
					routes: ['submit-new-case'],
					view: CustomCasesNewView

				});
				pageType.registerPageType({
					name: 'supportcaselist',
					routes: ['cases-list'],
					view: CustomCasesNewListView

				});
				var menu = MyAccountMenu.getInstance();
				menu.replaceSubEntry('cases_all',{
					entryId: 'cases',
					id: 'cases_list',
					name: 'Support Case',
					index: 2,
					url: 'cases-list'
				});
                menu.replaceSubEntry('newcase',{
					entryId: 'cases',
                    id: 'supportcase',
                    name: 'Submit New Case',
                    index: 2,
                    url: 'submit-new-case'
                });
				
				
			}

		}
	};
});
