// @module RudraCustomization.CustomCasesNew.CustomCasesNew
define('RudraCustomization.CustomCasesNew.CustomCasesNew.View'
,	[
	'rudracustomization_customcasesnew_customcasesnew.tpl'
	,	'Backbone'
	,	'Utils'
	,	'Configuration'
	,	'RudraCustomization.CustomCasesNew.ValidateModel.Model'
	,	'Profile.Model'
	,	'Backbone.FormView'
	,	'RudraCustomization.CustomCasesNew.CustomCasesNew.Model'
	,	'AjaxRequestsKiller'
    ]
, function (
	rudracustomization_customcasesnew_customcasesnew_tpl
	,	Backbone
	,	Utils
	,	Configuration
	,	CustomCasesNewValidateModelModel
	,	ProfileModel
	,	BackboneFormView
	,	CustomCasesNewModel
	,	AjaxRequestsKiller
)
{
    'use strict';

	// @class RudraCustomization.CustomCasesNew.CustomCasesNew.View @extends Backbone.View
	return Backbone.View.extend({

		template: rudracustomization_customcasesnew_customcasesnew_tpl

	,	title: Utils.translate('How can we help you?')
	
	,  	page_header: Utils.translate('How can we help you?')

	,	getBreadcrumbPages: function() {
			return {
				text: this.title,
				href: '/submit-new-case'
			};
		}
	,	getSelectedMenu: function() {
			return 'submit-new-case';
		}
	,	beforeShowContent: function() {
			return this.fields.fetch({
				killerId: AjaxRequestsKiller.getKillerId()
			});
		}

	,	initialize: function (options) {
			this.application = options.application;
			this.fields = new CustomCasesNewValidateModelModel();
        	this.model = new CustomCasesNewModel();
        	this.user = ProfileModel.getInstance();
       		this.model.on('sync', jQuery.proxy(this, 'showSuccess'));
        	this.model.set('isNewCase', true);


        	BackboneFormView.add(this);
		}

	,	attributes: {
			id: 'NewCase',
			class: 'newCase'
		}

	,	events: {
			'submit form': 'submitForm',
		    'click [data-action="include_email"]': 'includeAnotherEmail',
		    'keypress [data-action="text"]': 'preventEnter'
		}

	,	bindings: {
			'[name="title"]': 'title',
			'[name="category"]': 'category',
			'[name="message"]': 'message',
			'[name="email"]': 'email',
			'[name="include_email"]': 'include_email',
			'[name="cases-file"]':'fileRead'
		}

	, 	childViews: {

		}
		
	,	submitForm: function(e, model, props) {
			e.preventDefault();
			var file = document.querySelector('#attachedCasesFile').files[0];
			const self = this;
			model=this.model;
			if(file){
				var reader = new FileReader();
				reader.readAsDataURL(file);	
				reader.onloadend = function () {
			
				const base64String = reader.result
				.replace('data:', '')
				.replace(/^.+,/, '');
				
					
					self.model.set({
						'filesData':base64String,
						'uploadFileType':file.type,
						'uploadFileName':file.name
					});
					self.saveForm(e, model, props);
					
				};
			}else{
				self.saveForm(e, model, props);
			}
		}
		
		,	preventEnter: function(event) {
			if (event.keyCode === 13) {
				event.preventDefault();
			}
		}

	,	showSuccess: function() {
			const case_link_name = Utils.translate('support case #$(0)', this.model.get('caseNumber'));
			const new_case_internalid = this.model.get('internalid');
			const new_case_message = Utils.translate(
				'Good! your <a href="/cases-list/$(0)">$(1)</a> was submitted. We will contact you briefly.',
				new_case_internalid,
				case_link_name
			);

			this.newCaseId = new_case_internalid;
			this.newCaseMessage = new_case_message;

			Backbone.history.navigate('cases-list', { trigger: true });
		}

	,	includeAnotherEmail: function() {
			const email_input = this.$('[data-case-email]');
			const status = email_input.prop('disabled');

			email_input.prop('disabled', !status);

			this.$('[data-collapse-content]').collapse(status ? 'show' : 'hide');
		}

		//@method getContext @return RudraCustomization.CustomCasesNew.CustomCasesNew.View.Context
	,	getContext: function getContext()
		{
			//@class RudraCustomization.CustomCasesNew.CustomCasesNew.View.Context
			
			return {
				pageHeader: this.page_header,
				// @property {Array<Object{text:String,id:Number}>} categories
				categories: this.fields.get('categories'),
				// @property {Boolean} showBackToAccount
				showBackToAccount: Configuration.get('siteSettings.sitetype') === 'STANDARD'
			};
		}
	});
});
