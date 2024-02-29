(function(window, $) {
	"use strict";
	var MapRcicMng = {};

	MapRcicMng.style = {
		wfs : function(feature, resolution) { 
		},
		wms : function(feature, resolution) { 
		}
	};
	MapRcicMng.layer = {
		wms : {
			sido : {
				id : "sido",
				layerKorName : "시도 레이어",
				kind : "cell",
				category : "500", 
				minZoom : 2,
				visible : false,
				uniqField:'id' 
			}
		},  
		wfs : {
			sido : {
				id : "thin_legaldong_sido",
				layerKorName : "thin_legaldong_sido",
				minZoom : 1,
				maxZoom : 2,
				minResolution: 512,
				maxResolution: 1025 
			},
			sgg : {
				id : "thin_legaldong_sgg",
				layerKorName : "thin_legaldong_sgg",
				minZoom : 3,
				maxZoom : 4,
				minResolution: 128,
				maxResolution: 511  
			}
		}
	};
	window.MapRcicMng = MapRcicMng;
})(window, jQuery);