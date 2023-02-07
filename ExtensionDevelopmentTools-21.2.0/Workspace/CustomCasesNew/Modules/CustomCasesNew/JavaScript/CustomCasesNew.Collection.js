
define(
	'RudraCustomization.CustomCasesNew.CustomCasesNew.Collection'
,   [
		'Utils'
    ,   'Backbone'
    ,   'RudraCustomization.CustomCasesNew.CustomCasesNew.Model'
	
	]
,   function (
        Utils
    ,   Backbone
    ,   CustomCasesNewModel
	
	)
{
	'use strict';



    return Backbone.Collection.extend({
        url:Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "services/CustomCasesNew.Service.ss"
            )
        ),

        model: CustomCasesNewModel,

        initialize: function() {
            // The first time the collection is filled with data
            // we store a copy of the original collection
            this.once('sync reset', function() {
                if (!this.original) {
                    this.original = this.clone();
                }
            });
        },

        parse: function(response) {
            this.totalRecordsFound = response.totalRecordsFound;
            this.recordsPerPage = response.recordsPerPage;

            return response.records;
        },

        update: function(options) {
            const filter = options.filter || {};

            this.fetch({
                data: {
                    filter: filter.value,
                    sort: options.sort.value,
                    order: options.order,
                    page: options.page
                },
                reset: true,
                killerId: options.killerId
            });
        }
    })
})