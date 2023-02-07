// @module RudraCustomization.PLPItemImageSlider.PLPItemImageSlider
define('RudraCustomization.PLPItemImageSlider.PLPItemImageSlider.View'
,	[
	'rudracustomization_plpitemimageslider_plpitemimageslider.tpl'
	,	'Backbone'
	,	"jquery.slick"
	,	'Backbone.View'
    ]
, function (
	rudracustomization_plpitemimageslider_plpitemimageslider_tpl
	,	Backbone
	,	slick
	,	BackboneView
)
{
    'use strict';

	// @class RudraCustomization.PLPItemImageSlider.PLPItemImageSlider.View @extends Backbone.View
	return Backbone.View.extend({

		template: rudracustomization_plpitemimageslider_plpitemimageslider_tpl

	,	initialize: function (options) {

			this.model = options.model;
			this.images = this.model.getImages();
			this.model.on('change', this.render, this);
			var self = this;
			console.log(this);
			
		}
	,	render:function(){
			BackboneView.prototype.render.apply(this, arguments);
		}

	,	events: {
			'mouseenter [data-action="HoverableContent"]':'CustomizedContentAdded',
			'mouseleave [data-action="HoverableContent"]':'CustomizedContentRemove',
			
		}
	,	CustomizedContentAdded:function(e){
			e.preventDefault();
			this.$('.Data_Hidden').css('display','none');
			this.$('.append-carosoul').addClass('plp-slides');
			this.$('.plp-slides').slick(this.sliderSetting);
		}
	,	CustomizedContentRemove:function(e){
			e.preventDefault();
			this.$('.plp-slides').slick('unslick');
			this.$('.append-carosoul').removeClass('plp-slides');
			this.$('.Data_Hidden').css('display','block');

		}

	,	bindings: {
		}

	, 	childViews: {

		}

		//@method getContext @return RudraCustomization.PLPItemImageSlider.PLPItemImageSlider.View.Context
	,	getContext: function getContext()
		{
			
			var CustomizedArray ;
			if(this.model.get('customizedImage') !== undefined){
				CustomizedArray = this.model.get('customizedImage').slice(0,7);
			}else{
				CustomizedArray = this.images.slice(0, 7)
			}
			//@class RudraCustomization.PLPItemImageSlider.PLPItemImageSlider.View.Context
			var sliderSetting = {
				dots:true,
				infinite: true,
				slidesToShow:1,
				slidesToScroll: 1,
				arrows: false,
				speed: 300,
				autoplay: true,
				autoplaySpeed:1000,
				pauseOnHover:false,
				pauseOnDotsHover:false
				
				
			}
			this.sliderSetting =sliderSetting;
			var toggleImage ;
			if(this.model.get('toggleUrl') !== undefined){
				toggleImage = this.model.get('toggleUrl');
			}else{
				toggleImage = this.model.getThumbnail().url;
			}

			return {

				thumbnail: toggleImage,
				url: this.model.get('_url'),
				images: CustomizedArray || [],
				firstImage: CustomizedArray[0] || {},
				showImages: CustomizedArray.length > 0,
				showImageSlider: CustomizedArray.length > 1
			};
		}
	});
});
