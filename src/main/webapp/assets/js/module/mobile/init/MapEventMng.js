(function(window, $){
	var MapEvtMng = function(mapInit){
		this._mapInit = mapInit;
		this._init();
	};

	MapEvtMng.prototype = {
		properties : {
			boundaryFlag 		: false,
			xElem					: "xce", 
			yElem					: "yce", 
			addrElem				: "loca",
			parentFlag			: false,
			message			: "배경 영역을 선택해주세요",
			helpTooltip			: "측정을 시작하십시오",
		},
		drawParams : null,	
		_selectFeatureProperties : {},
		selectedSeqNo:null,
		isUpdateMap: null,
		mapEvt : {
			click : null,
			rightclick : null,
			pointermove : null,
			moveend : null,
			dblclick : null,
			select : null,
		},

		_init : function () {
			var _self = this;
			var highlightStyle = new ol.style.Style({ 
				  fill: new ol.style.Fill({
				    color: 'rgba(255,255,255,0.7)',
				  }),
				  stroke: new ol.style.Stroke({ 
				    color: '#3399CC',
				    width: 3,
				  }),
				});
			 
			var clickFunc = function(evt){
				
				if (_self._mapInit.mapAction.measure.properties.isMeasure) return;
					evt = evt.originalEvent;
				
				/* 위치보정 */
				if(_self.isUpdateMap){
					_self.tempVectorPoint(evt);
				}
				
				/* 로드뷰 */
				if(_self.roadView){
					_self.roadViewVectorPoint(evt);
				}
				
				var map = _self._mapInit.map;    
				var view = _self._mapInit.map.getView(); 
				var format = new ol.format.GeoJSON();
				
				var isSelectChange = false;  
				//mapInit.overlay.overlayTooltipLayer.setPosition(undefined);
				var cnt = 0;
				map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
					if(cnt > 0) return;
					if(feature.get("type")=="acc"){
						 
						if (_self._mapInit.overlay.overlayTooltipElement != null) {
							$layerTooltip = $(_self._mapInit.overlay.overlayTooltipElement).find(_self._mapInit.overlay.overlayTooltipAppendElem);
							$layerTooltip.empty();
						}  
						
		                    var title = layer.get("title");
							title += "(" + feature.get("sittn_info_mssage") + ")";
							
							var htmCont = "";
	                        	  htmCont += '<div class="zCorTooltip" style="top: 321px; left: 1122px;">'
	                              htmCont += '<div class="inline tipLeft">'
	                    	      htmCont += '<div class="zCorTbl">'
	                    	      htmCont += '<div>'
	                    	      htmCont += '<p>공사</p><img src="/assets/images/map/cor_icon.png" alt="tipIcon" class="mt15">'
	                    	      htmCont += '</div>'
	                    	      htmCont += '</div>'
	                    	      htmCont += '</div>'
	                    	      htmCont += '<div class="inline tipRight">'
	                    	      htmCont += '<div class="zCorTbl">'
	                    	      htmCont += '<div>'
	                    	      htmCont += '<p>국도 44호선</p>'
	                    	      htmCont += '<p>'+feature.get("sittn_info_mssage")+'</p>'
	                    	      if($.isNullString(feature.get("cntrwk_endde"))){
	                    	    	  htmCont += '<p>기간 : '+$.setDateStrUnderBar(String(feature.get("cntrwk_bgnde")))+'</p></p>'
	                    	      }else{
	                    	    	  htmCont += '<p>기간 : '+$.setDateStrUnderBar(String(feature.get("cntrwk_bgnde")))+' ~ '+$.setDateStrUnderBar(String(feature.get("cntrwk_endde")))+'</p></p>'
	                    	      }
	                    	      htmCont += '</div>'
	                    	      htmCont += '</div>'
	                    	      htmCont += '</div>'
	                    	      htmCont += '</div>'
	                    	    	   
                    	    	  $('#infoWindowPopUp').empty();   
	            			      $('#infoWindowPopUp').append(htmCont);  
	            			      $('#infoWindowPopUp').show(); 
	            			      
	            			      var info = mapInit.mapLayerMng.getCurrentOverlay('infoWindowPopUp');
	            			      	 info.setPosition(undefined);
	            				  var popContainer = document.getElementById('infoWindowPopUp');
	            				  	  info.setPosition(evt.coordinate); 
	            				  	  info.setPositioning('top-left');
	            				  	  info.setOffset([ 10, -20 ]);
	            				  	  
						
					}else if(feature.get("type")=="mainChart"){
							
							mapInit.overlay.overlayTooltipLayer.setPosition(undefined);
							
							var highlightStyle = new ol.style.Style({
								  stroke: new ol.style.Stroke({
								    color: '#3399CC',
								    width: 3,
								  }),   
								}); 
							
							   var cloneFeature = feature.clone();
							       cloneFeature.setStyle(highlightStyle);
							       
							       var isLayer = mapInit.mapLayerMng.getLayerById('mainClickLyr'); 
							       if(!$.isNullString(isLayer)){ 
							    	   mapInit.map.removeLayer(isLayer);
							       };
							       
							       mapInit.mapLayerMng.setTempLayerNoStyle("mainClickLyr",cloneFeature); 
								
								if (_self._mapInit.overlay.overlayTooltipElement != null) {
									$layerTooltip = $(_self._mapInit.overlay.overlayTooltipElement).find(_self._mapInit.overlay.overlayTooltipAppendElem);
									$layerTooltip.empty();
								}  
									 var htmCont = "";
			                        	  htmCont += '<div class="zCorTooltip" style="top: 321px; left: 1122px;">'
			                              htmCont += '<div class="inline tipLeft">'
			                    	      htmCont += '<div class="zCorTbl">'
			                    	      htmCont += '<div>'
			                    	      htmCont += '<p>공사건수</p><img src="/assets/images/map/cor_icon.png" alt="tipIcon" class="mt15">' 
			                    	      htmCont += '</div>'
			                    	      htmCont += '</div>'
			                    	      htmCont += '</div>'
			                    	      htmCont += '<div class="inline tipRight">'
			                    	      htmCont += '<div class="zCorTbl">'
			                    	      htmCont += '<div>'
			                    	      htmCont += '<p>'+feature.get("count")+'건</p>'
			                    	      htmCont += '</div>'
			                    	      htmCont += '</div>'
			                    	      htmCont += '</div>'
			                    	      htmCont += '</div>'
									mapInit.overlay.overlayTooltipLayer.show(evt.coordinate, htmCont);  
							}else if(feature.get("type")=="pin"){
								MapData.getAnalysisDetail(feature.get("resultno"),'pin');
							}
					cnt++;
				});
			}; 
			_self.mapEvt.click = clickFunc; 
			 
			_self.mapEvt.pointermove = function(evt) {
				_self._mapInit.map.getViewport().style.cursor = _self._mapInit.map.hasFeatureAtPixel(evt.originalEvent.pixel) ? "pointer" : "";
				
				if(_self._mapInit.mapAction.layer.properties.isMeasureMode){
					_self._mapInit.map.getViewport().style.cursor = "pointer"; 
					if (evt.dragging) {
						return;
					}
				}  
			};
			_self.mapEvt.moveend = function(evt) {
				evt.preventDefault();
				//if(_search == null ||  $.isNullString(_search)) return;
				_self._mapInit.mapAction.reSizeZoomBar();
				_self.getCurrentAddr();
				
			};
			_self._mapInit.map.getViewport().addEventListener('contextmenu', function (evt) {
				evt.preventDefault();
			});  
		},
		getCurrentAddr :function(){
			 
			var _self = this;
			var center = this._mapInit.map.getView().getCenter();
			var feature = this._mapInit.mapAction.getFeatureByCoodi("tb_legaldong_emd", center,_self._mapInit.map.getView().getProjection().getCode(),_self._mapInit.map.getView().getProjection().getCode(),"geom");
			if($.isNullString(feature))return;
			if(feature.length>0){
				var f = feature[0];
				$("#slegalCd").val(f.values_.emd_cd);
				$('#sidoZone').text(f.values_.sido_nm);
				if($('#sggZone').text() != "전체"){
					$('#sggZone').text(f.values_.sgg_nm);
				}
				if($('#emdZone').text() != "전체"){
					$('#emdZone').text(f.values_.emd_nm);
				} 
			}
		},
		setMeasureEvt : function () {
			
			var _self = this;
			var map = this._mapInit.map;
			var mapAction = this._mapInit.mapAction;
			var overlay = this._mapInit.overlay;
			
			var helpMsg = _self.properties.helpTooltip+'.(마우스 우측 버튼 클릭시 측정 종료)';
			var text = "";
			if(!$.isNullString(mapAction.measure.geomAction)){
				
				switch (mapAction.measure.geomAction) {
				case "square":
					text="[면적]";
					break;
				case "circle":
					text="[원형]";
					break;
				case "polygon":
					text="[다각형]";
					break;
				default:
					text="[거리]";
					break;
				}
			}
			helpMsg = text+helpMsg;
			
			map.on("pointermove", function(evt){
				if (evt.dragging) {
					return; 
				}
				
				var tooltipCoord = evt.coordinate;
				if (mapAction.measure.feature) {
					var output;
					var geom = mapAction.measure.feature.getGeometry();
					if (geom instanceof ol.geom.Polygon) {  
						output = mapAction.calculateArea(geom);
						tooltipCoord = geom.getInteriorPoint().getCoordinates();
					} else if (geom instanceof ol.geom.LineString) {
						output = mapAction.calculateDistance(geom);
						tooltipCoord = geom.getLastCoordinate();
					}else if (geom instanceof ol.geom.Circle) {
						geom = ol.geom.Polygon.fromCircle(geom);
						output = mapAction.calculateArea(geom);
						tooltipCoord = geom.getInteriorPoint().getCoordinates();
					}
					overlay.overlayElement.innerHTML = output;
					overlay.overlayLayer.setPosition(tooltipCoord);
				}
				overlay.overlayViewElement.innerHTML = helpMsg;
				overlay.overlayViewLayer.setPosition(evt.coordinate);
			});
			
			//마우스 오른쪽 버튼 클릭 이벤트(초기화)
			map.getViewport().addEventListener("contextmenu", function(evt){
				evt.preventDefault();
				mapAction.offMeasureStop();
				
				// 버튼 off
				for (var i = 0; i < $(".rightCtlLi").children("img").length; i++) {
					if($(".rightCtlLi").eq(i).children("img").attr("src").match("_on")){
						var rightCtlImg = $(".rightCtlLi").eq(i).children("img").attr("src").replace("_on","_off");
						$(".rightCtlLi").eq(i).children("img").attr("src",rightCtlImg);
					}
				}
			});
		}, 
		onMapEvt : function () {
			var $map = $(this._mapInit.map);
			$.each(this.mapEvt, function(key, val){
				$map.on(key, val);
			});
		},

		offMapEvt : function () {
			var $map = $(this._mapInit.map);
			$.each(this.mapEvt, function(key){
				$map.off(key);
			});
		},
		onMapEvtByName : function (evtName, params) {
			this.properties = $.extend({}, this.properties, params);
			var $map = $(this._mapInit.map);
			$map.off(evtName);
			$map.on(evtName, this.mapEvt[evtName]);
		}, 
		setProperties : function(params) {
			var _self = this;
			_self.properties = $.extend({}, _self.properties, params);
		},
		//지도변경
		changeMap:function(mapType,elem){
			var _self = this;
			
			/* 버튼 on/off EVENT */
			var imgStr = $(elem).children("img").attr("src");
			/*for (var i = 0; i < $(".rightCtlLi").children("img").length; i++) {
				if($(".rightCtlLi").eq(i).children("img").attr("src") != imgStr){
					var rightCtlImg = $(".rightCtlLi").eq(i).children("img").attr("src").replace("_on","_off");
					$(".rightCtlLi").eq(i).children("img").attr("src",rightCtlImg);
				}else{
					if(imgStr.match("_on")){
						var rightCtlImg = $(".rightCtlLi").eq(i).children("img").attr("src").replace("_on","_off");
						$(".rightCtlLi").eq(i).children("img").attr("src",rightCtlImg);
					}else{
						var rightCtlImg = $(".rightCtlLi").eq(i).children("img").attr("src").replace("_off","_on");
						$(".rightCtlLi").eq(i).children("img").attr("src",rightCtlImg);
					}
					
				}
			}*/
			
			for (var i = 0; i < $(".rightCtlLi").children("img").length; i++) {
				if($(".rightCtlLi").eq(i).children("img").attr("src") != imgStr){
					//var rightCtlImg = $(".rightCtlLi").eq(i).children("img").attr("src").replace("_on","_off");
					//$(".rightCtlLi").eq(i).children("img").attr("src",rightCtlImg);
				}else{
					if(imgStr.match("_on")){
						var rightCtlImg = $(".rightCtlLi").eq(i).children("img").attr("src").replace("_on","_off");
						$(".rightCtlLi").eq(i).children("img").attr("src",rightCtlImg);
					}else{
						var rightCtlImg = $(".rightCtlLi").eq(i).children("img").attr("src").replace("_off","_on");
						$(".rightCtlLi").eq(i).children("img").attr("src",rightCtlImg);
					}
					
				}
			}
			
			var chgImgStr = $(elem).children("img").attr("src");
			
			
			/*if(mapType == "init"){
				if(chgImgStr.match("_on")){
					$.swalConfirm("지도를 초기화 하시겠습니까?",function(flag){
						if(flag){   
							_self.mapChageInit();
							location.href="/rcic/movePage?menuId=map";
						}else{
							
							return;
						} 
					});
				}
			}else{
				_self.mapChageInit();
			}*/
			
			
			if(mapType=="swipe"){
				
				if(chgImgStr.match("_on")){
					$('#swipeDiv').show();
					
					var swipe = document.getElementById('swipe');
					
					var layers = mapInit.map.getLayers().getArray();
					for(var i in layers){
						if(layers[i].get("id")=="VWorld_gray" || layers[i].get("id")=="VWorld_satellite"){
							layers[i].setVisible(true);
							if(layers[i].get("id")=="VWorld_satellite"){
								mapInit.mapAction.setVisibilityById("VWorld_hybrid");
							}
						}

						if(layers[i].get("id")=="VWorld_satellite" || layers[i].get("id")=="VWorld_hybrid"){
							
							layers[i].on('precompose', function(event) {
						        var ctx = event.context;
						        ctx.restore();
						      });
							 
							layers[i].on('precompose', function(event) {
						        var ctx = event.context;
						        var width = ctx.canvas.width * (swipe.value / 100); 
						        ctx.save();
						        ctx.beginPath();
						        ctx.rect(width, 0, ctx.canvas.width - width, ctx.canvas.height);
						        ctx.clip();
						      });
							
							layers[i].on('postcompose', function(event) {
						        var ctx = event.context;
						        ctx.restore();
						      });
						}
					} 
					 mapInit.map.render(); 
					 swipe.addEventListener('input', function() {
						 mapInit.map.render();
				      }, true);
				}else{
					$('#swipeDiv').hide();
					/**
					 * 베이스맵 초기화
					 * */
					mapInit.mapAction.offBaseMapLayers();
					var baseMapLayerName = "grey"
					var activeCnt = 0;
					$(".mapKind span").each(function(index, item){
		    			if($(this).hasClass("active")){
		    				activeCnt++;
		    				baseMapLayerName = $(this).attr("val");
		    				
		    				var baseLayers = mapInit.baseMapLayers;
		    				for(var i in baseLayers){
		    					if(baseLayers[i].values_.id == "VWorld_satellite" || baseLayers[i].values_.id == "VWorld_hybrid"){
		    						baseLayers[i].on('precompose', function(event) {
								        var ctx = event.context;
								        ctx.restore();
								      });
									
									mapInit.map.render();
									if(baseMapLayerName == "satellite"){
										
										baseLayers[i].setVisible(true);
										mapInit.mapAction.setVisibilityById("VWorld_hybrid");
									}
									
		    					}
		    					
		    				}
		    				mapInit.mapAction.setVisibilityById("VWorld_"+baseMapLayerName);
		    	            
		    			}
		    		});
					
					if(activeCnt == 0){
						$(".mapKind").children().eq(0).click();
					}
				}
				
				 
			}else if(mapType=="accdnt"){
				if(chgImgStr.match("_on")){
				  
					_accInfo.getAccInfo();
				}else{
					mapInit.mapLayerMng.removeTempLayer('accInfo');
					var info = mapInit.mapLayerMng.getCurrentOverlay('infoWindowPopUp');
			      	info.setPosition(undefined);
				}
			}else if(mapType == "openBookMark"){
				if(chgImgStr.match("_on")){
					var top  = $(".openBookMark").offset().top;
					var left = $(".openBookMark").offset().left - 360;
					$(".corBookMark").css("left", left).css("top", top).show();
					$(".corBookMark").show();
					
					MapData.myAreaList();
				}else{
					$(".corBookMark").hide();
				}
				
			}else if(mapType == "areaMeasureRectangle"){
				if(chgImgStr.match("_on")){
					var rightCtlImg = $(".rightCtlLi").eq(1).children("img").attr("src").replace("_on","_off");
					$(".rightCtlLi").eq(1).children("img").attr("src",rightCtlImg);
					//mapInit.mapAction._initMeasure();
					var isValid = mapInit.mapAction.clearAreaGeom('geom');
		           	if(isValid){
	           		  //$.setRemoveSelectIntereaction();
	           		 // mapInit.mapAction.allClear();
	           		  mapInit.mapAction.startMeasure("polygon");
		           	}
				}else{
					// 면적재기 초기화
					//mapInit.mapAction.allClear();
					mapInit.mapAction.offMeasureStop();
				}
			}else if(mapType == "lengthMeasureRectangle"){
				if(chgImgStr.match("_on")){
					var rightCtlImg = $(".rightCtlLi").eq(2).children("img").attr("src").replace("_on","_off");
					$(".rightCtlLi").eq(2).children("img").attr("src",rightCtlImg);
					var isValid = mapInit.mapAction.clearAreaGeom('geom');
	           	    if(isValid){
	           		  //$.setRemoveSelectIntereaction();
	           		  //mapInit.mapAction.allClear();
	           		  mapInit.mapAction.startMeasure("polyline");
	           	     }
				}else{
					// 면적재기 초기화
					//mapInit.mapAction.allClear();
					mapInit.mapAction.offMeasureStop();
				}
			}else if(mapType == "init"){
				if(chgImgStr.match("_on")){
					$.swalConfirm("지도를 초기화 하시겠습니까?",function(flag){
						if(flag){   
							_self.mapChageInit();
							location.href="/rcic/movePage?menuId=map";
						}else{
							var rightCtlImg = $(".rightCtlLi").eq(3).children("img").attr("src").replace("_on","_off");
							$(".rightCtlLi").eq(3).children("img").attr("src",rightCtlImg);
							return;
						} 
					});
				}
			}
			
		},
		mapChageInit:function(){
			$('#swipeDiv').hide();
			/**
			 * 베이스맵 초기화
			 * */
			mapInit.mapAction.offBaseMapLayers();
			var baseMapLayerName = "grey"
			var activeCnt = 0;
			$(".mapKind span").each(function(index, item){
    			if($(this).hasClass("active")){
    				activeCnt++;
    				baseMapLayerName = $(this).attr("val");
    				
    				var baseLayers = mapInit.baseMapLayers;
    				for(var i in baseLayers){
    					if(baseLayers[i].values_.id == "VWorld_satellite" || baseLayers[i].values_.id == "VWorld_hybrid"){
    						baseLayers[i].on('precompose', function(event) {
						        var ctx = event.context;
						        ctx.restore();
						      });
							
							mapInit.map.render();
							if(baseMapLayerName == "satellite"){
								
								baseLayers[i].setVisible(true);
								mapInit.mapAction.setVisibilityById("VWorld_hybrid");
							}
							
    					}
    					
    				}
    				mapInit.mapAction.setVisibilityById("VWorld_"+baseMapLayerName);
    	            
    			}
    		});
			
			if(activeCnt == 0){
				$(".mapKind").children().eq(0).click();
			}
			/**
			 * 유고정보 초기화
			 * */
			mapInit.mapLayerMng.removeTempLayer('accInfo');
			var info = mapInit.mapLayerMng.getCurrentOverlay('infoWindowPopUp');
	      	info.setPosition(undefined);
			//mapInit.overlay.overlayTooltipLayer.hide();
			
			// 면적재기 초기화
			mapInit.mapAction.allClear();
			mapInit.mapAction.offMeasureStop();
			
			//관심지역 초기화
			$(".corBookMark").hide();
			
		},
		
		/**
		 * 위치보정 
		 * */
		updatePosition:function(seq){
			var rePositionLayer = mapInit.mapLayerMng.getLayerById('rePosition'); 
			if(!$.isNullString(rePositionLayer)){
				mapInit.map.removeLayer(rePositionLayer);
			}
			//var resultno = $(gElem).parent().parent().find('td[name="seq"]').text();
			var _self = this;
			_self.selectedSeqNo = seq;
			$.swal("보정할 위치를 클릭하세요.");  
			_self.isUpdateMap = true;
			mapInit.mapEvtMng.offMapEvt();
			mapInit.mapEvtMng.onMapEvt();
		},
		/**
		 * 위치보정 저장
		 * */
		tempVectorPoint:function(evt){
			var _self = this;
			
		    var Point = "POINT("+evt.coordinate[0] + " " + evt.coordinate[1]+")";
		    var feature = new ol.Feature({ 
			  geometry: new ol.geom.Point([evt.coordinate[0],evt.coordinate[1]]),
			  labelPoint: parseFloat([evt.coordinate[0],evt.coordinate[1]]),
			});
		    mapInit.mapLayerMng.setTempLayerNoStyle("rePosition", feature);
			
			setTimeout(function(){
				
				$.swalConfirm("현재 위치로 보정하시겠습니까?",function(flag){

					if(flag){   
						mapInit.mapEvtMng.offMapEvt();
						var obj = new Object();
							obj.url = "/rcic/analysisLocHist/insertAnalysisLocHist";
							obj.geom = String(Point);  
							obj.locTy = "01"; //위치유형 (01 : 포착위치(Point), 02 : 참조공간Geometry, 03 : 엠라인 Polyline)
							obj.seq = parseInt(_self.selectedSeqNo);
						var dataList = setDefault(obj);
					
						$.commonAjax(dataList,'', function(response, status, headers, config){
							$.swal("보정되었습니다.");
							infowindowOverLay.setPosition([evt.coordinate[0],evt.coordinate[1]]);
							mapInit.map.getView().setCenter([evt.coordinate[0],evt.coordinate[1]]);
							_self.isUpdateMap = false;
							
							var layer = mapInit.mapLayerMng.getLayerById('analysisDetailLayer');
							mapInit.map.removeLayer(layer);							
							
							
							//RcicMapLeft.selectFacList(true,gCcurrPage);
						},false);
						
					}else{
						_self.isUpdateMap = false;
						var rePositionLayer = mapInit.mapLayerMng.getLayerById('rePosition'); 
						if(!$.isNullString(rePositionLayer)){
							mapInit.map.removeLayer(rePositionLayer);
						}
						return;
					} 
				});
				
				
				/*$.commonAjax(dataList,'', function(response, status, headers, config){
					alert("보정되었습니다.");
					popUpOverLay.setPosition([evt.coordinate[0],evt.coordinate[1]]);
					map.getView().setCenter([evt.coordinate[0],evt.coordinate[1]]);
					_self.isUpdateMap = false;
					RcicMapLeft.selectFacList(true,gCcurrPage);
				},false);*/
				
			},500);
		}
			
	};
  
	window.MapEvtMng = MapEvtMng;
	window.name = "MapEvtMng.js";
})(window, jQuery);