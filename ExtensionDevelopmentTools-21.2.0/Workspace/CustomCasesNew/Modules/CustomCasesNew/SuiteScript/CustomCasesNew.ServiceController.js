define("RudraCustomization.CustomCasesNew.CustomCasesNew.ServiceController", ["ServiceController",'RudraCustomization.CustomCasesNew.Model'], function(
  ServiceController
  ,CustomCaseFormModel
) {
  "use strict";

  return ServiceController.extend({
    name: "RudraCustomization.CustomCasesNew.CustomCasesNew.ServiceController",

     // The values in this object are the validation needed for the current service.
    options: {
      common: {
        requireLogin: true,
        requirePermissions: {
          list: ['lists.listCase.1']
        }
      }
    },

    get: function get() {
      var id = this.request.getParameter('internalid') || this.data.internalid;
      if (id) {
          return CustomCaseFormModel.get(id);
      }
      var list_header_data = {
          filter: this.request.getParameter('filter'),
          order: this.request.getParameter('order'),
          sort: this.request.getParameter('sort'),
          from: this.request.getParameter('from'),
          to: this.request.getParameter('to'),
          page: this.request.getParameter('page')
      };
      return CustomCaseFormModel.search(nlapiGetUser() + '', list_header_data);
    },

    post: function post() {
      const new_case_id = CustomCaseFormModel.create(nlapiGetUser() + '', this.data);
      return CustomCaseFormModel.get(new_case_id);
    },

    put: function put() {
      const id = this.request.getParameter('internalid') || this.data.internalid;
      CustomCaseFormModel.update(id, this.data);
      return CustomCaseFormModel.get(id);
    },

    delete: function() {
      // not implemented
    }
  });
});
