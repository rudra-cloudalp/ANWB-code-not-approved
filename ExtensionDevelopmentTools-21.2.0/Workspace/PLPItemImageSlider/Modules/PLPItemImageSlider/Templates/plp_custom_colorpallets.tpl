
<div class="main-image-popup-container" data-action="HoverableContent">
    
    {{#if showImageSlider}}
    
        <div class="secondary-image-container">
            <div class="append-carosoul" >
                {{#each images}}
                    <a class="facets-item-custom-cell-grid" href="{{itemUrlData}}" >
		                <img class="facets-item-cell-grid-image" src="{{resizeImage url 'thumbnail'}}" alt="{{altimagetext}}" itemprop="image"/>
                    </a>
		        {{/each}}
            </div>
             
            <div class="Data_Hidden">
                <a class="facets-item-custom-cell-grid" href="{{thumbnailLink}}">
		            <img class="facets-item-cell-grid-image" src="{{resizeImage thumbnail 'thumbnail'}}" alt="{{thumbnail.altimagetext}}" itemprop="image"/>
                </a>
            </div>
           

        </div>
    {{else}}
        
        <a class="facets-item-custom-cell-grid" href="{{thumbnailLink}}">
		    <img class="facets-item-cell-grid-image" src="{{resizeImage thumbnail 'thumbnail'}}" alt="{{thumbnail.altimagetext}}" itemprop="image"/>
        </a>
    {{/if}}
</div>
