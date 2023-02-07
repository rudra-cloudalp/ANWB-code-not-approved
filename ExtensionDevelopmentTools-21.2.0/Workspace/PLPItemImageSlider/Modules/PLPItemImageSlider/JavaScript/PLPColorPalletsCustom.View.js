// @module CloudAlp.ColorRefinementOnPLP.PLPColorImages
define('RudraCustomization.PLPItemImageSlider.PLPColorPalletsCustom.View'
	, [
		'plp_custom_colorpallets.tpl'
	,	'RudraCustomization.PLPItemImageSlider.PLPItemImageSlider.Model'

	,	'Backbone'
	,	'underscore'
	,	'Utils'
	,	'Configuration'
	,	'Backbone.View'
	]
	, function (
		plp_custom_colorpallets_tpl
	,	PLPItemImageSliderModel

	,	Backbone
	,	_
	,	Utils
	,	Configuration
	,	BackboneView
	) {
		'use strict';

		// @class CloudAlp.ColorRefinementOnPLP.PLPColorImages.View @extends Backbone.View
		return Backbone.View.extend({

			template: plp_custom_colorpallets_tpl
			,	contextDataRequest: ['item']
			,	getFirstImage:function getFirstImage(flattenedImages) {
					for (let i = 0; i < flattenedImages.length; i++) {
						const detail = flattenedImages[i];
						const splitted = detail.url.split('.');
						if (splitted[splitted.length - 2] === 'default') {
							return detail;
						}
					}
					return flattenedImages[0];
			}
			,	getImages:function getImages(filter, array,color) {
				let result = [];
				let item_images_detail = array;
				let colrs;
				if(color!==''){
					if(item_images_detail[color] !== undefined){
						colrs = item_images_detail[color];

					}else{
						colrs = item_images_detail;
					}

				}else{
					colrs = item_images_detail;
				}

				result = Utils.imageFlatten(colrs);
				if (result.length > 1) {
					const firstImage = this.getFirstImage(result);
					result = _.filter(result, function(image) {
						return firstImage != image;
					});
					result.unshift(firstImage);
				}
				// @class ImageContainer
				return result.length
					? result
					: [
						  {
							  // @property {String} url
							  url: Utils.getThemeAbsoluteUrlOfNonManagedResources(
								  'img/no_image_available.jpeg',
								  Configuration.get('imageNotAvailable')
							  )
						  }
					  ];
			}
			,	initialize: function (options) {
				var self = this;
				this.itemData = options.plp.getItemsInfo();
				this.itemId = options.ItemData;
				this.model = options.model;

				this.model.on('change', this.customChanges, this);

				var result = _.filter(this.itemData,(data)=>data.internalid === self.itemId);
					_.each(result,function(data){
						
							data.customItemImage = self.getImages('',data.itemimages_detail,'');
					
						self.currentItemDetails=data;
					})

			}
		,	customChanges:function(){
				BackboneView.prototype.render.apply(this, arguments);
			}

			, 	events: {
				'mouseenter [data-action="HoverableContent"]':'CustomizedContentAdded',
				'mouseleave [data-action="HoverableContent"]':'CustomizedContentRemove',
			}
			,	CustomizedContentAdded:function(e){
				e.preventDefault();
				
				this.$('.Data_Hidden').css('display','none');
				this.$('.append-carosoul').addClass('plp-slides');
				this.$('.plp-slides').slick(this.sliderSetting);
				this.$('.slick-dots').addClass('hover-animated');
			}
			,	CustomizedContentRemove:function(e){
				e.preventDefault();
				this.$('.plp-slides').slick('unslick');
				this.$('.append-carosoul').removeClass('plp-slides');
				this.$('.Data_Hidden').css('display','block');
	
			}

			, bindings: {
			}

			, childViews: {

			}

			//@method getContext @return CloudAlp.ColorRefinementOnPLP.PLPColorImages.View.Context
			, getContext: function getContext() {
				var self = this;
				
				if(this.model.get('internalid') !== undefined){
					_.each(this.itemData,function(data){
						if(data.internalid === Number(self.model.get('internalid'))){
							
							if(self.model.get('imageoptionId') !== undefined){
								data.customItemImage = self.getImages('',data.itemimages_detail,self.model.get('imageoptionId'));
								console.log(data.customItemImage);
							}
						}
					})
					
				}
				
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
					pauseOnDotsHover:false,
					swipe:false,
					touchMove:false
					
					
				}
				this.sliderSetting = sliderSetting;
				
				var newThumbnail={};
				if(this.model.get('internalid') !== undefined){
					newThumbnail.url = this.currentItemDetails.customItemImage[0].url;
				}else{
					newThumbnail.url = this.currentItemDetails.keyMapping_thumbnail.url;
				}
				
				newThumbnail.itemurl=this.currentItemDetails.keyMapping_url;

				var self = this;
				_.each(this.currentItemDetails.customItemImage,function(some){
					some.itemUrlData=self.currentItemDetails.keyMapping_url;
					return some;
				})
				// console.log(this.currentItemDetails.customItemImage);

				// keyMapping_url
				//@class CloudAlp.ColorRefinementOnPLP.PLPColorImages.View.Context
				return {
					thumbnail: newThumbnail.url,
					thumbnailLink:newThumbnail.itemurl,
					images: this.currentItemDetails.customItemImage.slice(0, 7) || [],
					showImages: this.currentItemDetails.customItemImage.length > 0,
					showImageSlider: this.currentItemDetails.customItemImage.length > 1
				};
			}
		});
	});
