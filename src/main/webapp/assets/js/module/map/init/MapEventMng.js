(function(window, $){
	var marker = null;
	
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
		roadView: null,
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
								MapData.getAnalysisDetail(feature.get("resultno"));
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
			
			var helpMsg = _self.properties.helpTooltip+'.(마우스 왼쪽 버튼 더블 클릭시 측정 완료)';
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
					//sns 마커 삭제
					var layer = mapInit.mapLayerMng.getLayerById('snstempLayer');
					mapInit.map.removeLayer(layer);
					
					//mapInit.map.getView().setZoom(1);
					//mapInit.map.getView().setCenter([14089168.15, 4380585.25]);
					_accInfo.getAccInfo();
				}else{
					mapInit.mapLayerMng.removeTempLayer('accInfo');
					var info = mapInit.mapLayerMng.getCurrentOverlay('infoWindowPopUp');
			      	info.setPosition(undefined);
				}
				
			}else if(mapType=="roadView"){
				if(chgImgStr.match("_on")){
					var top  = $(".roadView").offset().top;
					var left = $(".roadView").offset().left - 360;
					var _self = this;
					
					_self.roadView = true;
					mapInit.mapEvtMng.offMapEvt();
					mapInit.mapEvtMng.onMapEvt();

					if(_self.roadView){
						$(".roadViewPopup").css("left", left).css("top", top).show();
						$(".roadViewPopup").show();
					}else{
						$(".roadViewPopup").hide();
						MapData.btnClickEvent('roadViㄴewPopup');
					}	
				}else{
					$(".MapWalker").html("");
					$(".roadViewPopup").hide();
					//이미지 초기화
					MapData.btnClickEvent('roadViewPopup');
				}
			}else if(mapType=="roadView2"){
				var top  = $(".roadView").offset().top;
				var left = $(".roadView").offset().left - 360;
				var _self = this;
				
				_self.roadView = true;
				mapInit.mapEvtMng.offMapEvt();
				mapInit.mapEvtMng.onMapEvt();

				if(_self.roadView){
					$(".roadViewPopup").css("left", left).css("top", top).show();
					$(".roadViewPopup").show();
				}else{
					$(".roadViewPopup").hide();
					MapData.btnClickEvent('roadViewPopup');
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
		updatePosition:function(seq,resultno){
			var rePositionLayer = mapInit.mapLayerMng.getLayerById('rePosition'); 
			if(!$.isNullString(rePositionLayer)){
				mapInit.map.removeLayer(rePositionLayer);
			}
			
			var _self = this;
			_self.selectedSeqNo = seq;
			_self.resultno = resultno;
			
			if($('#SearchWord_hidden').val().trim() == ""){
				$.swal("검색된 데이터를 선택하여 위치를 이동해주세요.");  
				return;
			}
			$.swal("변경할 공사위치를 지도에서 클릭해주세요.");  
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
			
				$.swalConfirm("해당 지역으로 공사위치를 보정하시겠습니까?",function(flag){
					if(flag){  
						var ReferenceNameDic = $("#ReferenceNameDic option:selected").val();
						var SearchWord       = $("#SearchWord").val();
						var ChangeReason     = $("#ChangeReason option:selected").val();
						var SearchWord_hidden= $("#SearchWord_hidden").val();

						if(ReferenceNameDic==""){
							$.swal("명칭사전을 선택해주세요.");
							return;
						}else if(ChangeReason==""){
							$.swal("변경사유를 선택해주세요.");
							var _self = this;
							_self.isUpdateMap = false;
							mapInit.mapEvtMng.offMapEvt();
							var rePositionLayer = mapInit.mapLayerMng.getLayerById('rePosition'); 
							if(!$.isNullString(rePositionLayer)){
								mapInit.map.removeLayer(rePositionLayer);
							}
							return;
						}else if(SearchWord_hidden==""){
							$.swal("공사위치를 선택해주세요.");
							return;
						}

						if(mapInit.mapLayerMng.getLayerById('analysisDetailChangeLocLayer') == null){
							$.swal("검색어를 다시 입력하고 위치를 지정해주세요.");
							return;
						}

						var _self = this;
						var seq = $('input[id=hid_seq]').val();
						var resultno = $('input[id=resultno]').val();
						
						var obj = new Object();
						//var format = new ol.format.WKT();
						//var wkt = format.writeGeometry(mapInit.mapLayerMng.getLayerById('analysisDetailChangeLocLayer').getSource().getFeatures()[0].getGeometry());
						//obj.geom = String(wkt);
						obj.geom = String(Point);
						obj.url = "/rcic/analysisLocHist/insertAnalysisLocHist";
						obj.locTy = "01";
						obj.seq = seq;
						obj.resultno = resultno;
						obj.ReferenceNameDic = $("#ReferenceNameDic option:selected").val();
						obj.ReferenceNameDic_og = $('.corCont table tbody tr').find("td").eq(7).html();
						obj.ChangeReason = $("#ChangeReason option:selected").val();
						obj.SearchWord = SearchWord_hidden;
						obj.SearchWord_og = $('.corCont table tbody tr').find("td").eq(5).html();
						obj.Hid_seq = $('#hid_seq').val();

						var dataList = setDefault(obj);

						$.commonAjax(dataList,'', function(response, status, headers, config){
							MapData.btnClickEvent('corDtlBox04');
							infowindowOverLay.setPosition([evt.coordinate[0],evt.coordinate[1]]);
							mapInit.map.getView().setCenter([evt.coordinate[0],evt.coordinate[1]]);
							var layer = mapInit.mapLayerMng.getLayerById('analysisDetailChangeLocLayer');
							mapInit.map.removeLayer(layer);	
							this.isUpdateMap = false;
							mapInit.mapEvtMng.offMapEvt();
							var rePositionLayer = mapInit.mapLayerMng.getLayerById('rePosition'); 
							if(!$.isNullString(rePositionLayer)){
								mapInit.map.removeLayer(rePositionLayer);
							}
							MapData.getAnalysisDetail($('input[id=resultno]').val());
							$.swal("공사위치가 보정되었습니다.");
						},false);
						
					}else{
						this.isUpdateMap = false;
						mapInit.mapEvtMng.offMapEvt();
						var rePositionLayer = mapInit.mapLayerMng.getLayerById('rePosition'); 
						if(!$.isNullString(rePositionLayer)){
							mapInit.map.removeLayer(rePositionLayer);
						}
						return;
					} 
				},500);
		},
		
		/**
		 * 로드뷰 연계
		 * */
		roadViewVectorPoint:function(evt){
			/*
			 * 아래부터 실제 지도와 로드뷰 map walker를 생성 및 제어하는 로직
			 */
			var mapContainer = document.getElementById('rcicMap'), // 지도를 표시할 div 
			    mapCenter = new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 가운데 좌표
			    mapOption = {
			        center: mapCenter, // 지도의 중심좌표
			        level: 3 // 지도의 확대 레벨
			    };
		    
			var roadviewContainer = document.getElementById('roadview'); //로드뷰를 표시할 div
			var roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
			var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체
			var latLon = ol.proj.transform(evt.coordinate,'EPSG:3857', 'EPSG:4326');
			var lat = String(latLon[0]).split('.')[0] + '.' + String(latLon[0]).split('.')[1].substr(0,6);
			var lon = String(latLon[1]).split('.')[0] + '.' + String(latLon[1]).split('.')[1].substr(0,6);
			var position = new kakao.maps.LatLng(lon, lat);
			var _self = this;
			
			// 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
			roadviewClient.getNearestPanoId(position, 50, function(panoId) {
				if(panoId == null){
					_self.roadView = false;
					$.swal("인접 도로가 많거나 도로가 아닙니다.\n확대하여 도로를 다시 클릭 해주세요.");

					//도로 외 클릭 시 안내문구 표출 후 로드뷰 반복 실행 로직 'roadView2'
					mapInit.mapEvtMng.changeMap('roadView2');
				}else{
					roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
				}
			});
			
			mapInit.map.removeOverlay(marker);
			
			let coord = roadview.getPosition();
	        let viewpoint = roadview.getViewpoint();
			let iconCnt = 16;
			let markerIconNo = Math.floor(viewpoint.pan/(360/iconCnt));

			let markerHtml = '<div id="ROADVIEW_o2map-marker" style="position: absolute; z-index: 0; white-space: nowrap; margin: 0px;">';
			markerHtml += '	<div class="MapWalker m'+markerIconNo+'"> ';
			markerHtml += '		<div class="angleBack"></div>      ';
			markerHtml += '		<div class="figure"></div>         ';
			markerHtml += '	</div>                                 ';
			markerHtml += '</div>			';
			
			let markerEl = $(markerHtml);

			//var pos = [13898070.158086173, 3958519.1767016985]
			var pos = ol.proj.transform([coord.getLng(), coord.getLat()], "EPSG:4326", "EPSG:3857");
			//var pos = [coord.getLng(), coord.getLat()];

			marker = new ol.Overlay({
				position: pos,
				positioning: 'center-center',
				element: markerEl[0],
				stopEvent: false
			});
			
			mapInit.map.addOverlay(marker);

			// 로드뷰의 초기화 되었을때 map walker를 생성한다.
			kakao.maps.event.addListener(roadview, 'init', function() {

			    // map walker를 생성한다. 생성시 지도의 중심좌표를 넘긴다.
			    //mapWalker = new MapWalker(mapCenter);
			    //mapWalker.setMap(map); // map walker를 지도에 설정한다.

			    // 로드뷰가 초기화 된 후, 추가 이벤트를 등록한다.
			    // 로드뷰를 상,하,좌,우,줌인,줌아웃을 할 경우 발생한다.
			    // 로드뷰를 조작할때 발생하는 값을 받아 map walker의 상태를 변경해 준다.
			    kakao.maps.event.addListener(roadview, 'viewpoint_changed', function(){
			        // 이벤트가 발생할 때마다 로드뷰의 viewpoint값을 읽어, map walker에 반영
			    	let coord = roadview.getPosition();
			        let viewpoint = roadview.getViewpoint();
			        //////////////////////////////////////////////////////////////////////////////////
					mapInit.map.removeOverlay(marker);
					let iconCnt = 16;
					let markerIconNo = Math.floor(viewpoint.pan/(360/iconCnt));

					let markerHtml = '<div id="ROADVIEW_o2map-marker" style="position: absolute; z-index: 0; white-space: nowrap; margin: 0px;">';
					markerHtml += '	<div class="MapWalker m'+ markerIconNo +'"> ';
					markerHtml += '		<div class="angleBack"></div>      ';
					markerHtml += '		<div class="figure"></div>         ';
					markerHtml += '	</div>                                 ';
					markerHtml += '</div>			';
					
					let markerEl = $(markerHtml);

					//var pos = [13898070.158086173, 3958519.1767016985
					//var pos = evt.coordinate;
					let pos = ol.proj.transform([coord.getLng(), coord.getLat()], "EPSG:4326", "EPSG:3857");

					marker = new ol.Overlay({
						position: pos,
						positioning: 'center-center',
						element: markerEl[0],
						stopEvent: false
					});
					
					mapInit.map.addOverlay(marker);
					//////////////////////////////////////////////////////////////////////////////////
			    });

			    // 로드뷰내의 화살표나 점프를 하였을 경우 발생한다.
			    // position값이 바뀔 때마다 map walker의 상태를 변경해 준다.
			    kakao.maps.event.addListener(roadview, 'position_changed', function(){
			        // 이벤트가 발생할 때마다 로드뷰의 position값을 읽어, map walker에 반영 
			    	let coord = roadview.getPosition();
			        let viewpoint = roadview.getViewpoint();
			        //////////////////////////////////////////////////////////////////////////////////
					mapInit.map.removeOverlay(marker);
					let iconCnt = 16;
					let markerIconNo = Math.floor(viewpoint.pan/(360/iconCnt));

					let markerHtml = '<div id="ROADVIEW_o2map-marker" style="position: absolute; z-index: 0; white-space: nowrap; margin: 0px;">';
					markerHtml += '	<div class="MapWalker m'+ markerIconNo +'"> ';
					markerHtml += '		<div class="angleBack"></div>      ';
					markerHtml += '		<div class="figure"></div>         ';
					markerHtml += '	</div>                                 ';
					markerHtml += '</div>			';
					
					let markerEl = $(markerHtml);

					//var pos = [13898070.158086173, 3958519.1767016985
					//var pos = evt.coordinate;
					let pos = ol.proj.transform([coord.getLng(), coord.getLat()], "EPSG:4326", "EPSG:3857");

					marker = new ol.Overlay({
						position: pos,
						positioning: 'center-center',
						element: markerEl[0],
						stopEvent: false
					});
					
					mapInit.map.addOverlay(marker);
					//////////////////////////////////////////////////////////////////////////////////
			    });
			});
		}
	};
  
	window.MapEvtMng = MapEvtMng;
	window.name = "MapEvtMng.js";
})(window, jQuery);