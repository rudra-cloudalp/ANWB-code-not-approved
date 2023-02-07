// @module RudraCustomization.PLPItemImageSlider.PLPItemImageSlider
define('RudraCustomization.CustomCasesNew.CustomCasesNewList.View'
,	[
	'cases_list_view_new.tpl'
	,	'Backbone'
	,	'Backbone.View'
    ,   'RudraCustomization.CustomCasesNew.CustomCasesNew.Collection'
    ,   'RudraCustomization.CustomCasesNew.CustomCasesNew.Model'
    ,   'AjaxRequestsKiller'
    ,   'Utils'
    ,   'ListHeader.View'
    ,   'Backbone.CollectionView'
    ,   'GlobalViews.Pagination.View'
    ,   'Configuration'
    ,   'GlobalViews.ShowingCurrent.View'
    ,   'RecordViews.View'
    ,   'RudraCustomization.CustomCasesNew.ValidateModel.Model'
    ]
, function (
	cases_list_view_new_tpl
	,	Backbone
	,	BackboneView
    ,   CustomCasesNewCollection
    ,   CustomCasesNewModel
    ,   AjaxRequestsKiller
    ,   Utils
    ,   ListHeaderView
    ,   BackboneCollectionView
    ,   GlobalViewsPaginationView
    ,   Configuration
    ,   GlobalViewsShowingCurrentView
    ,   RecordViewsView
    ,   CustomCasesNewValidateModel
)
{
    'use strict';

	// @class RudraCustomization.PLPItemImageSlider.PLPItemImageSlider.View @extends Backbone.View
	return Backbone.View.extend({

		template: cases_list_view_new_tpl,

        title: Utils.translate('Support Cases'),

        page_header: Utils.translate('Support Cases'),
    
        attributes: {
            id: 'CasesList',
            class: 'caseManagement'
        },
    
        initialize: function(options) {
            this.application = options.application;
            this.collection = new CustomCasesNewCollection();
            this.fields = new CustomCasesNewValidateModel();
            this.listenCollection();
            this.setupListHeader();
            this.options.showCurrentPage = true;
        },
    
        beforeShowContent: function() {
            return this.fields
                .fetch({
                    killerId: AjaxRequestsKiller.getKillerId()
                })
                .then(() => {
                    this.listHeader.filters = this.initializeFilterOptions();
                    if (this.application.getLayout().currentView) {
                        const new_case_id = this.application.getLayout().currentView.newCaseId;
                        const new_case_message = this.application.getLayout().currentView
                            .newCaseMessage;
                        if (!(_.isUndefined(new_case_message) && _.isUndefined(new_case_id))) {
                            this.new_case_message = new_case_message;
                            this.new_case_internalid = new_case_id;
                            this.inform_new_case = true;
                            delete this.application.getLayout().currentView.newCaseId;
                            delete this.application.getLayout().currentView.newCaseMessage;
                        }
                    }
                });
        },
    
        setupListHeader: function() {
            this.listHeader = new ListHeaderView({
                view: this,
                application: this.application,
                collection: this.collection,
                sorts: this.sortOptions,
                hidePagination: true
            });
        },
    
        listenCollection: function() {
            this.setLoading(true);
            this.collection.on({
                request: jQuery.proxy(this, 'setLoading', true),
                reset: jQuery.proxy(this, 'setLoading', false)
            });
            this.collection.on('reset', this.render, this);
        },
    
        setLoading: function(is_loading) {
            this.isLoading = is_loading;
        },
    
        // Array of default filter options
        // filters always apply on the original collection
        initializeFilterOptions: function() {
            const filter_options = [
                {
                    value: 'all',
                    name: Utils.translate('Show All Statuses'),
                    selected: true,
                    filter: function() {
                        return this.original.models;
                    }
                }
            ];
    
            const statuses = this.fields ? this.fields.get('statuses') : [];
    
            _.each(statuses, function(status) {
                const filter_option= {
                    value: status.id,
                    name: status.text,
                    filter: function() {
                        return this.original.filter(function(some_case) {
                            return some_case.get('status').id === status.id;
                        });
                    }
                };
    
                filter_options.push(filter_option);
            });
    
            return filter_options;
        },
    
        // Array of default sort options
        // sorts only apply on the current collection
        // which might be a filtered version of the original
        sortOptions: [
            {
                value: 'caseNumber',
                name: Utils.translate('by Case number'),
                selected: true
            },
            {
                value: 'createdDate',
                name: Utils.translate('by Creation date')
            },
            {
                value: 'lastMessageDate',
                name: Utils.translate('by Last Message date')
            }
        ],
    
        // @method getSelectedMenu
        getSelectedMenu: function() {
            return 'cases_list';
        },
        // @method getBreadcrumbPages
        getBreadcrumbPages: function() {
            return {
                text: this.title,
                href: '/cases-list'
            };
        },
    
        render: function() {
            BackboneView.prototype.render.apply(this, arguments);
    
            if (!_.isUndefined(this.inform_new_case)) {
                this.informNewCaseCreation();
    
                if (!this.isLoading) {
                    delete this.inform_new_case;
                }
            }
        },
    
        informNewCaseCreation: function() {
            this.highlightNewCase(this.new_case_internalid);
            this.showConfirmationMessage(this.new_case_message);
        },
    
        // Temporarily highlights the case record just added
        highlightNewCase: function(internalid) {
            const $list_dom = jQuery(this.el).find('a[data-id=' + internalid + ']');
    
            if ($list_dom && $list_dom.length === 1) {
                $list_dom.addClass('case-list-new-case-highlight');
    
                setTimeout(function() {
                    $list_dom.removeClass('case-list-new-case-highlight');
                }, 3000);
            }
        },
    
        childViews: {
            'Case.List.Items': function() {
                const records_collection = new Backbone.Collection(
                    this.collection.map(function(current_case) {
                        return new Backbone.Model({
                            touchpoint: 'customercenter',
    
                            title: Utils.translate('Case #$(0)', current_case.get('caseNumber')),
                            detailsURL: '#/cases/' + current_case.get('internalid'),
                            internalid: current_case.get('internalid'),
    
                            columns: [
                                {
                                    label: Utils.translate('Subject:'),
                                    type: 'subject',
                                    name: 'subject',
                                    value: current_case.get('title')
                                },
                                {
                                    label: Utils.translate('Creation Date:'),
                                    type: 'creation-date',
                                    name: 'creation-date',
                                    value: current_case.get('createdDate').split(' ')[0]
                                },
                                {
                                    label: Utils.translate('Last Message:'),
                                    type: 'date',
                                    name: 'last-message',
                                    value: current_case.get('lastMessageDate') ===' '? "N/A" : current_case.get('lastMessageDate').split(' ')[0]
                                },
                                {
                                    label: Utils.translate('Status any:'),
                                    type: 'status',
                                    name: 'status',
                                    value: _.isObject(current_case.get('status'))
                                        ? current_case.get('status').name
                                        : current_case.get('status').name
                                }
                            ]
                        });
                    })
                );
    
                return new BackboneCollectionView({
                    childView: RecordViewsView,
                    collection: records_collection,
                    viewsPerRow: 1
                });
            },
            'GlobalViews.Pagination': function() {
                return new GlobalViewsPaginationView(
                    _.extend(
                        {
                            totalPages: Math.ceil(
                                this.collection.totalRecordsFound / this.collection.recordsPerPage
                            )
                        },
                        Configuration.defaultPaginationSettings
                    )
                );
            },
            'GlobalViews.ShowCurrentPage': function() {
                return new GlobalViewsShowingCurrentView({
                    items_per_page: this.collection.recordsPerPage,
                    total_items: this.collection.totalRecordsFound,
                    total_pages: Math.ceil(
                        this.collection.totalRecordsFound / this.collection.recordsPerPage
                    )
                });
            },
            'List.Header': function() {
                return this.listHeader;
            }
        },
    
        // @method getContext @return Case.List.View.Context
        getContext: function() {
            // @class Case.List.View.Context
            return {
                // @property {String} pageHeader
                pageHeader: this.page_header,
                // @property {Boolean} hasCases
                hasCases: this.collection.length,
                // @property {Boolean} isLoading
                isLoading: this.isLoading,
                // @property {Boolean} showPagination
                showPagination: !!(this.collection.totalRecordsFound && this.collection.recordsPerPage),
                // @property {Boolean} showCurrentPage
                showCurrentPage: this.options.showCurrentPage,
                // @property {Boolean} showBackToAccount
                showBackToAccount: Configuration.get('siteSettings.sitetype') === 'STANDARD'
            };
        }
	});
});
