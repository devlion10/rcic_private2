(function(window, $) {
	"use strict";

	var Search = function(_options) {
		this.init(_options);  	
	};
	Search.prototype = {
		_defaults:{
					collection : 'tb_analysis_loc_info',
					firstRow : 1,
					numRows : 10,
					orderField : "seq",
					sort : "desc",
					keyword : "*:*"
		},
		currentPosition:null,
		config:null,
		init:function(_options){
			var _self = this;
				_self.config = $.extend({}, _self._defaults, _options);
				//_self.getClusterData('cluster');
				//_self.getClusterData('point'); 
		},
		
		getClusterData:function(type, color){
			
			if($.isNullString(color)){
				return;
			}
			
			var wktFormat=  mapInit.mapFormat.wkt;
			var url="/clusterMap";
			var targetType = 'point';
			 
			if(type=="cluster"){
				url = "/clusterMap";
				targetType = 'cluster';
			}
			
			var _self = this;
			var extent = mapInit.map.getView().calculateExtent(mapInit.map.getSize());
			
			var startDt = $('#startDate').val().replace(/[.]/g,""); 
			var endDt = $('#endDate').val().replace(/[.]/g,""); 
			var order = "stdr_dt desc"
			var chekPeriod = $('input:radio[name=dRadio]:checked').val(); //공고일, 공사기간 
			var collection ="tb_analysis_info";
			
			var radioVal = "";
			
			var keyword = "";	
			
			if(chekPeriod == "bidntcedt"){  
				radioVal = 'bidntcedt';	//공고일
				order = "bidntcedt desc"
				keyword = "bidntcedt:["+ startDt + " TO "+endDt+"]"
			}else if(chekPeriod == "consrdt"){ 	// 공사기간  
				radioVal = 'stdr_dt'; 	//공사기간  
				order = "stdr_dt desc"
				keyword = "stdr_dt:["+startDt+ " TO " +endDt+"] OR forecast_end_dt:["+startDt+" TO "+endDt+"]"
			}else{   
				radioVal = 'thtm_ccmplt_date'; 	//공사기간  
				order = "thtm_ccmplt_date desc"
				//keyword = "cbgn_date:["+startDt+ " TO " +endDt+"] OR thtm_ccmplt_date:["+startDt+" TO "+endDt+"]"
				keyword = "thtm_ccmplt_date:["+startDt+" TO "+endDt+"]"
			} 
			
			if(color == "purple"){ //준공예정
				startDt = $.toDayStr();
				endDt = $.calPeriod('aft',1,'month').replace(/[-]/g,"");
				order = "forecast_end_dt desc";
				keyword = "forecast_end_dt:["+ startDt + " TO "+ endDt +"]"
			}
			
			var data = new Object();
				data.startDt = startDt;  //필수
				data.endDt = endDt;      //필수
				data.order= order;
				data.searchKeyword = keyword;
				data.length = 5;
				data.bbox = extent[0]+","+extent[2]+" TO " + extent[1]+","+extent[3] ;
				if(color=="green"){
					data.constRoadClss = "161";
				}else if(color=="yellow"){
					data.facTypeCd = "19 24 36 37 39 47 48";
				}
				var extent = mapInit.map.getView().calculateExtent() 
				var u= proj4('EPSG:3857', 'EPSG:4326',[extent[0],extent[1]]); 
				var b= proj4('EPSG:3857', 'EPSG:4326',[extent[2],extent[3]]);
				var bbox = [u,b]; 
				data.bbox = u[1]+","+u[0]+" TO " + b[1]+","+b[0];
				data.type = targetType;
				data.spatialField= "location";
			
		var dataList = setDefault(data);
		
		$.rcicSolrMapAjax(url,dataList,function(response, status, headers, config){
				if($.isNullString(response))return;
			
				var features = new Array();
				var geojson= new ol.format.GeoJSON();
				
				if(targetType=="cluster"){
			    	var returnData =  response[0]["spatial-clustering"];
			    	if($.isNullString(returnData))return; 
			    	for(var i in returnData){
			    		if(i%2==0)continue;
			    		var idx = returnData[i]; 
			    		var f = new ol.Feature({  
							geometry : new ol.geom.Point(proj4("EPSG:4326", "EPSG:3857", [idx[7], idx[5]])),
							size : idx[3]
						});
			    		features.push(f);
			    	}
			    	mapInit.mapLayerMng.removeTempLayer('clusterLyr');
					mapInit.mapLayerMng.setClusterLayer("clusterLyr",features);
					
		    	}else{
		    		
		    		var returnData =  response[0]["response"];
		    		if($.isNullString(returnData))return;
				
			    	for(var i in returnData.docs){ 
			    		var idx = returnData.docs[i]; 
	
	
			    		if($.isNullString(idx.geom_wkt))return;
			    		var f = wktFormat.readFeature(idx.geom_wkt);
			    			f.set("resultno",idx.resultno);
			    			f.set("type","pin");
							f.set("loc_prdt_reli_cd",idx.loc_prdt_reli_cd);
			    		features.push(f);
			    	} 
			    	var obj = new Object(); 
			    		obj.minResolution = 0.1;
		    			obj.maxResolution = 32;
		    			mapInit.mapLayerMng.removeTempLayer('pointLyr');
		    			mapInit.mapLayerMng.addTempLayer("pointLyr",features,obj);  
		    	} 
			},false);      
		},
		getAnalsisLocData:function(){
			
			var currentPosition = proj4("EPSG:3857", "EPSG:4326", mapInit.map.getView().getCenter());
			var _self = this;
			var center = ol.proj.transform(mapInit.map.getView().getCenter(), "EPSG:4326", mapInit.map.getView().getProjection().getCode());
			var searchWord = $('#searchWord').val();
			var data = {
					keyword : _self.config.keyword,
					collection: _self.config.collection,
					firstRow: _self.config.firstRow,
					numRows: _self.config.numRows,
					orderField: _self.config.orderField,
					sort: _self.config.sort,
					currentPosition :  currentPosition[1]+","+currentPosition[0],
					type:$('#search_type').val(),
					legend:_self.config.legend
				}
			
			var url="/search";
			$.ajax({
				url : url,
				type : 'post',
				data: data,
				dataType: "json",
				beforeSend: function() {
			    	$("#lodingBar").show();  
			    },
			    complete: function() {
			    	$("#lodingBar").hide();
			    },
			    success: function(returnData) {
			    	
			    	if($.isNullString(returnData))return;
			    	var returnData =  returnData[0].response.docs;
			    	mapInit.mapUiMng.open();
			    	$('div[name="resultList"]').empty();
			    	
			    	var html="";
			    	for(var i in returnData){
			    		var f = returnData[i];
			    		var distance = mapInit.mapAction.calculateDistanceByPoint(G.currentPosition, [f.longitude,f.latitude]);
			    		
			    		var t = proj4("EPSG:4326", "EPSG:5181", [parseFloat(f.longitude), parseFloat(f.latitude)]);
			    		html+='<dl>';
						html+='<dt onclick="mapInit.mapUiMng.setElemAct(this);"><img style="height: 17px;" src="/assets/images/icon/'+f.sectors_a_type+".png"+'"/><span name="name">'+f.name+'</span><span name="distance">('+$.number(distance)+'m)</span>';
						html+='</dt>';
						html+='<dd name="sectors">'+$.isNullStringOfVal(f.sectors_b,'');
						
						var pay_type = f.pay_type
					    var icon2;
					    if(pay_type=="zero"){
					    	icon2="zero"; 
					    }else if(pay_type=="ggpay"){
					    	icon2="kyongki";
					    }else if(pay_type=="ggpay,zero"){ 
					    	icon2="zerokyongki";
					    } 
						html+='<span name="tel">'+$.isNullStringOfVal(f.tel,'')+'</span>';
						html+='</dd>';
						html+='<dd name="road_nm">'+$.isNullStringOfVal(f.road_nm,'-')+'</dd>';
						html+='<span name="geom" style="display:none">'+t+'</span>';
						html+='<span name="pay_type" style="display:none">'+f.pay_type+'</span>';
						html+='<span name="sectors_a_type" style="display:none">'+f.sectors_a_type+'</span>';
						html+='</dl>';
			    	}
			    	$('div[name="resultList"]').append(html);
			    	
				},
				error:function(jqXHR, textStatus, errorThrown){ 
					if(jqXHR.responseJSON == undefined){
						alert("에러가 발생했습니다. 관리자에게 문의하세요");
					}else{
						alert(jqXHR.responseJSON.message);
					}
				}
			});
		}
	}
	window.Search = Search;
	window.name = "Search.js";
})(window, jQuery);