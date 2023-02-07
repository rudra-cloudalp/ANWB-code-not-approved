define("RudraCustomization.CustomCasesNew.CustomCasesNewList.ServiceController", ["ServiceController",'RudraCustomization.CustomCasesNew.Model'], function(
    ServiceController
    ,CustomCaseFormModel
  ) {
    "use strict";
  
    return ServiceController.extend({
      name: "RudraCustomization.CustomCasesNew.CustomCasesNewList.ServiceController",
  
       // The values in this object are the validation needed for the current service.
      options: {
        common: {
          requireLogin: true,
          requirePermissions: {
            list: ['lists.listCase.1']
          }
        }
      },
        get: function() {
            return CustomCaseFormModel.getNew();
        },
  

  
      post: function post() {
       
      },
  
      put: function put() {
       
      },
  
      delete: function() {
        // not implemented
      }
    });
  });
  