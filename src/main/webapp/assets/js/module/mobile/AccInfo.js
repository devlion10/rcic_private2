(function(window, $) {
	"use strict";

	var AccInfo = function(_options) {
		this.init(_options);  	
	};
	AccInfo.prototype = {
		_defaults:{
					collection : 'tl_accdnt_info_api',
					firstRow : 1,
					numRows : 10,
					orderField : "acc_no",
					sort : "desc",
					keyword : "*:*"
		},
		currentPosition:null,
		config:null,
		init:function(_options){
			var _self = this;
				_self.config = $.extend({}, _self._defaults, _options);
				//_self.getAccInfo('point'); 
		},
		
		getAccInfo:function(){  
			var _self = this;
			var url="/accInfoMap";
			var targetType = 'point';
			
			var currentPosition = proj4("EPSG:3857", "EPSG:4326", mapInit.map.getView().getCenter());
			_self.currentPosition = currentPosition;
			var extent = mapInit.map.getView().calculateExtent()
			var u= proj4('EPSG:3857', 'EPSG:4326',[extent[0],extent[1]]); 
			var b= proj4('EPSG:3857', 'EPSG:4326',[extent[2],extent[3]]);
			var bbox = [u,b];
			
			var obj = new Object();
			obj.url = url;
			obj.bbox = u[1]+","+u[0]+" TO " + b[1]+","+b[0];
			obj.type = targetType;
			obj.length = 20;
			
		var dataList = setDefault(obj);
	 
		$.commonAjax(dataList,'', function(response, status, headers, config){ 
			
				var features = new Array();

				var returnData =  response[0]["response"];
		    		if($.isNullString(returnData))return;
			    	for(var i in returnData.docs){
			    		var idx = returnData.docs[i];
			    		
			    		
			    		//var f =  mapInit.mapFormat.wkt.readFeature(idx.wkt_geom);
			    		var f = mapInit.mapFormat.wkt.readFeature(idx.wkt_geom, {  
			    			  dataProjection: 'EPSG:4326',
			    			  featureProjection: 'EPSG:3857', 
			    			});
			    		
			    		f.set("type","acc");
			    		f.set("api_link_dt",idx.api_link_dt);
			    		f.set("block_lane_cnt",idx.block_lane_cnt);
			    		f.set("cartrk_intrcp_mth",idx.cartrk_intrcp_mth);
			    		f.set("cntrwk_acdnt_se",idx.cntrwk_acdnt_se);
			    		f.set("cntrwk_acdnt_ty",idx.cntrwk_acdnt_ty);
			    		f.set("cntrwk_bgnde",idx.cntrwk_bgnde);
			    		f.set("cntrwk_endde",idx.cntrwk_endde);
			    		f.set("cntrwk_real_begin_time",idx.cntrwk_real_begin_time);
			    		f.set("cntrwk_real_end_time",idx.cntrwk_real_end_time);
			    		f.set("esntl_idntfc_no",idx.esntl_idntfc_no);
			    		f.set("sittn_info_mssage",idx.sittn_info_mssage);
			    		f.set("utmk_x",idx.tmk_x);
			    		f.set("utmk_y",idx.utmk_y);
			    		features.push(f);   
			    	}
			    	  
			    	var obj = new Object();
			    		obj.type="acc";
			    		obj.minResolution = 0.1;
		    			obj.maxResolution =1025;
			    	mapInit.mapLayerMng.removeTempLayer('accInfo');  
					mapInit.mapLayerMng.addTempLayer("accInfo",features, obj);
					
					mapInit.mapEvtMng.offMapEvt();
					mapInit.mapEvtMng.onMapEvt();
					
			},false,function(){},false);     
		}
	}
	window.AccInfo = AccInfo;
	window.name = "AccInfo.js";
})(window, jQuery);