
define(
	'RudraCustomization.PLPItemImageSlider.PLPItemImageSlider'
,   [
		'RudraCustomization.PLPItemImageSlider.PLPItemImageSlider.View'
	,	'RudraCustomization.PLPItemImageSlider.PLPColorPalletsCustom.View'
	,	'RudraCustomization.PLPItemImageSlider.PLPItemImageSlider.Model'
	]
,   function (
		PLPItemImageSliderView
	,	PLPColorPalletsCustomView
	,	PLPItemImageSliderModel
	)
{
	'use strict';
			/**
			* @type imageArray (Array)
			* @type ItemDataArrays (Array)
			* @type customColorId (string)
			* @type rejectDefault (boolean)
			* @type Layout (layout)
			* @type plpData (plp)
			* @type model (model)
			*/
	function RenderData(imageArray,ItemDataArrays,customColorId,rejectDefault,Layout,plpData,model){
			
		_.each( imageArray,function(e){
			var ItemData = e.dataset.itemId;
			/**
			* @description for color pallets options
			*/
			var colorPalletsAnchor = $(e).find('.product-views-option-facets-color-picker-anchor');
			colorPalletsAnchor.removeAttr("href"); // remove the href of the color pallets element
			if(colorPalletsAnchor.length !== 0){
				_.each(colorPalletsAnchor,function(f){
					var findSpantag = $(f).find('.product-views-option-facets-color-picker-box');
					var value = findSpantag.attr('value');
					_.each(ItemDataArrays,function(data){
						if(Number(value) === data.internalid){
							
							f.dataset.value= data.label;
						}
					});
					f.dataset.optionValue= value;
					f.dataset.action = 'changethumbnail-custom';
					f.dataset.iternalidCust = ItemData;
					return f;
				});
				
			}
			
			var view = new PLPColorPalletsCustomView({
				customColorId: customColorId
				, rejectDefault: rejectDefault
				, layout:Layout
				, plp:plpData
				, ItemData:Number(ItemData)
				, model:model
			});
			$(e).find('[data-view="ImageSiler.PLP"]').html(view.render().$el);
		})
	}
	

	return  {
		mountToApp: function mountToApp (container)
		{
			
			var PLP = container.getComponent('PLP');
			var Layout = container.getComponent('Layout')
			, Environment = container.getComponent('Environment')  
    		, customColorId = Environment.getConfig('plpItemColors.customColorId')
    		, rejectDefault = Environment.getConfig('plpItemColors.rejectDefault');
			var model = new PLPItemImageSliderModel();
		
			
			if(PLP){
				PLP.on('afterShowContent',function(){
					/**
					 * @description Create a array of the perticular options.
					*/
					var customPLPAttr = PLP.getItemsInfo();
					var colorLabel = [];
					if(customColorId){
						_.each(customPLPAttr,function(data){
							if(data.options.length>0){

								_.each(data.options,function(val){
									if(val.cartOptionId === customColorId){
										_.each(val.values,function(cust){
											var obj ={
												internalid: Number(cust.internalid), 
												label: cust.label
											}
											colorLabel.push(obj)
										})

									}
								})
							}
							
						})
					}
					var dataArr = colorLabel.map(item=>{
						return [JSON.stringify(item),item]
					}); // creates array of array
					var maparr = new Map(dataArr); // create key value pair from array of array
					
					var ItemDataArrays = [...maparr.values()];

					
					/**
					* @description for layout grid item in plp
					*/
					
					if($('.facets-item-cell-grid').length !==0){
						
						$('.facets-item-cell-grid-image-wrapper').find(".plp-image-slider").empty();
						$('.facets-item-cell-grid-image-wrapper').find(".facets-item-cell-grid-quick-view-wrapper").addClass('custom-facets-item-cell-grid-quick-view-wrapper-container');
						$('.facets-item-cell-grid-image-wrapper').find('.facets-item-cell-grid-link-image').addClass('custom-facets-items-cell-grid-link-image-container');

						$('.facets-item-cell-grid-image-wrapper').append(`<div class="plp-image-slider"><div data-view="ImageSiler.PLP"></div></div>`);

						var GridImage = $('.facets-item-cell-grid');
						RenderData(GridImage,ItemDataArrays,customColorId,rejectDefault,Layout,PLP,model);
						
					}

					/**
					* @description for layout list item in plp
					*/

					if($('.facets-item-cell-list').length !==0){
						
						$('.facets-item-cell-list-left .facets-item-cell-list-image-wrapper').find(".plp-image-slider").empty();
						$('.facets-item-cell-list-left .facets-item-cell-list-image-wrapper').find(".facets-item-cell-list-quick-view-wrapper").addClass('custom-facets-item-cell-list-quick-view-wrapper-container');
						$('.facets-item-cell-list-left .facets-item-cell-list-image-wrapper').find('.facets-item-cell-list-anchor').addClass('custom-facets-items-cell-list-anchor-container');

						$('.facets-item-cell-list-left .facets-item-cell-list-image-wrapper').append(`<div class="plp-image-slider"><div data-view="ImageSiler.PLP"></div></div>`);
						var listImage = $('.facets-item-cell-list');
						RenderData(listImage,ItemDataArrays,customColorId,rejectDefault,Layout,PLP,model);
						

						
					}
					/**
					* @description for layout table item in plp
					*/
					if($('.facets-item-cell-table').length !==0){
						
						$('.facets-item-cell-table-image-wrapper').find(".plp-image-slider").empty();
						$('.facets-item-cell-table-image-wrapper').find(".facets-item-cell-table-quick-view-wrapper").addClass('custom-facets-item-cell-table-quick-view-wrapper-container');
						$('.facets-item-cell-table-image-wrapper').find('.facets-item-cell-table-link-image').addClass('custom-facets-items-cell-table-link-container');

						$('.facets-item-cell-table-image-wrapper').append(`<div class="plp-image-slider"><div data-view="ImageSiler.PLP"></div></div>`);
						var TableImage = $('.facets-item-cell-table');
						RenderData(TableImage,ItemDataArrays,customColorId,rejectDefault,Layout,PLP,model);
						
					}

					/**
					* @description add click event to change the image of thumbnali
					*/

					$('[data-action="changethumbnail-custom"]').on('click',function(e) {
						e.preventDefault();
						var optionsValue = $(e.currentTarget).data('value');
						var iternalid = $(e.currentTarget).data('iternalidCust');
						
						model.set({
							imageoptionId: optionsValue,
							internalid:iternalid
						})
												
					})

					


				});
			}
		}
	};
});
