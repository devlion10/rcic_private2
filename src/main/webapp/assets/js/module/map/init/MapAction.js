(function(window, $) {
	"use strict";
	var MapAction = function(mapInit) {
		this._mapInit = mapInit;
	};
	MapAction.prototype = {
		properties : {
			oldProj : "",
			ol3Parser: new jsts.io.OL3Parser(),
			queryField : 'id',
			removeFlag: false
		},
		format : {
			wkt:new ol.format.WKT(),
			geojson:new ol.format.GeoJSON(),
			jstsJsonReader: new jsts.io.GeoJSONReader()
		}, 
		message :{
		     operatorError: '도형 및 연산을 확인하세요.\n[돌아가기]버튼을 클릭하세요.',
		     failGeometry: '잘못된 도형입니다.',
		     editFail: '편집 중에는 실행할 수 없습니다.',
		     overflowArea: '영역 선택범위[3개]만 가능합니다.',
		     empty: '영역을 먼저 선택해주세요.',
		     changeArea: '현재 선택된 영역이 사라집니다.\n변경하시겠습니까?',
		     isIntersection:'지정된 영역들이 해당 연산을 수행할 수 없습니다'
		},
		measure : {
			properties : {
				continueMsg : '마우스 좌측 버튼 더블 클릭시 마침',
				overlayClassName : 'measure-tooltip tooltip-static',
				overlayViewClassName : 'measure-tooltip',
				isMeasure : false,
				targetLayer: null
			},
			geomAction : null,
			eventAction : null,
			feature : null,
			feautres: [],
		}, 
		search : {
			properties : {
				continueMsg : '마우스 우측 버튼 클릭시 마침',
				overlayClassName : 'measure-tooltip tooltip-static',
				overlayViewClassName : 'measure-tooltip',
				isSearch : false
			},
			feature : null,
			features : null,
			featureIdList:new Array(),
		},
		drawProperties : {
			$btns : null,
			// overlayClassName : 'draw-tooltip',
			overlayClassName : 'ol-popup',
			overlayText : "",
			$input : null,
			isOverlay : false,
		},
		layer : {
			properties : {
				isMeasureMode : false,
			}
		},
		initAttr : null,
		initCenter : function(center) {
			this._mapInit.map.getView().setCenter(center);
		},
		setExtent : function() {
			var extent = ol.proj.transformExtent(this._mapInit.baseMap.extent, this._mapInit.baseMap.crsCode, this._mapInit.crsCode);
			this._mapInit.map.getView().fit(extent);
		},
		zoomExtent : function(extent) {
			
			if(extent == undefined){
				var baseMap  = null;
				if($("#baseMap").length > 0){
					baseMap = BaseMapConfig[$("#baseMap").val()];
				}else{
					baseMap = BaseMapConfig[this._mapInit.config.initBaseMap];
				}
				this._mapInit.map.getView().setCenter(baseMap.center);
			}else{
				this._mapInit.map.getView().fit(extent);
			}  
		},
		returnZoomHeight:function (zoomLevel){
			 var height = 10
	        height = zoomLevel*10.5;        
	        return height;
	    }, 
	    reSizeZoomBar:function(){
			 var _self = this; 
	    	 var zoomLevel = this._mapInit.map.getView().getZoom()+4;    
	         var height = _self.returnZoomHeight(zoomLevel);
	         var arrZoomLv = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];  
	         var rev =arrZoomLv.reverse();
	         var dragBarTop = rev[parseInt(zoomLevel)]*9.5;  
	         $('#dragBar').css({'top': dragBarTop+"px " });  
	         $('.p_bar').css('height',(height-52.5)+"px");
	    }, 
	    zoomToPet:function(elem){
			
			var zoomTarget = elem;
			
			switch (zoomTarget) {
				case "national":
					mapInit.map.getView().setZoom(initParam.nationalZoom);
					break;
				case "sido":
					mapInit.map.getView().setZoom(initParam.sidoZoom);
						break;
				case "sgg":
					mapInit.map.getView().setZoom(initParam.sggZoom);
					break;
				case "emd":
					mapInit.map.getView().setZoom(initParam.emdZoom);
					break;
				default:
					break;
				}
		},
		setCenter : function (coord, zoom, oldProj, newProj) {  
			var center = null;
			if (oldProj != undefined){
				center = proj4(oldProj, newProj, coord)
			}else{ 
				center = proj4(this._mapInit.config.linkCrsCode, this._mapInit.crsCode, coord)
			}
			this._mapInit.map.getView().setCenter(center);
		},
		setMakerCenter : function (center, zoom,params) {
			this._mapInit.layer.marker.getSource().clear();
			if(params != undefined) this.properties = $.extend({}, this.properties, params);
			this._mapInit.map.getView().setCenter(center);
 
			var pointFeat = new ol.Feature({
				geometry : new ol.geom.Point(center),
			});
			this._mapInit.layer.marker.getSource().addFeature(pointFeat);
		},
		//줌인
		zoomIn:function(){
			//mapInit.map.getView().setZoom(mapInit.map.getView().getZoom()+1);
			if (mapInit.map.getView().getMaxZoom() <= (mapInit.map.getView().getZoom())) {
            	mapInit.map.getView().setZoom(mapInit.map.getView().getMaxZoom());
	        } else {
	            mapInit.map.getView().setZoom(mapInit.map.getView().getZoom() + 1); 
	        } 
		},
		//줌아웃
		zoomOut:function(){
			if (mapInit.map.getView().getMinZoom() >= (mapInit.map.getView().getZoom())) {
	            	mapInit.map.getView().setZoom(mapInit.map.getView().getMinZoom());
            } else {
                mapInit.map.getView().setZoom(mapInit.map.getView().getZoom() - 1); 
            } 
			//mapInit.map.getView().setZoom(mapInit.map.getView().getZoom()-1);
		},

		offCellLayers : function() {
			$.each(this._mapInit.baseCellLayers, function(){
				this.setVisible(false);
			});
		},
		offBaseMapLayers : function() {
			$.each(this._mapInit.baseMapLayers, function(){
				this.setVisible(false);
			});
		},
		setVisibilityById : function(id){
			var lyr = this._mapInit.mapLayerMng.getLayerById(id);
			if(lyr != null){
				lyr.setVisible(true);  
				return true;
			} 
		},
		setVisibilityByLayer : function(id,visible){
			var lyr = this._mapInit.mapLayerMng.getLayerById(id);
			if(lyr != null){
				lyr.setVisible(visible);
				return true;
			}
		},
		transformCoordinate : function(oldCrsCode, newCrsCode, coordinate) {
			var transCodi = proj4(oldCrsCode, newCrsCode, coordinate) ;
			return transCodi;
		},
		transformFeatures : function(features, oldCrsCode, newCrsCode) {
			features.forEach(function(feature){ 
				feature.getGeometry().transform(oldCrsCode, newCrsCode);
			});
			return features;
		},
		transformFeature : function(oldCrsCode, newCrsCode) {
			
			this._mapInit.map.getLayers().forEach(function(layer) {
				if(layer instanceof ol.layer.Vector) {
					
					if($.isNullString(layer.getSource()))return;
					layer.getSource().getFeatures().forEach(function(feature){
						feature.getGeometry().transform(oldCrsCode, newCrsCode);
					});
				}
			});
		},
		_initMeasure : function() {
			this._mapInit.map.un("pointermove"); 
			$.each(this._mapInit.control.measure, function(){
				this.setActive(false);
			});
			this.measure.properties.isMeasure = false;
		},
		offMeasureStop : function() {
			
			var _mapInit = this._mapInit;
			$.each(this._mapInit.overlay, function(key, val){
				if (this instanceof ol.Overlay) { 
					_mapInit.map.removeOverlay(this);
				}
			});
			this._initMeasure();
			
			
		},
		offMeasure : function() {
			
			var _mapInit = this._mapInit;
			_mapInit.layer.measure.getSource().clear();
			$("div." + this.measure.properties.overlayViewClassName).remove();
			$.each(this._mapInit.overlay, function(key, val){
				if (this instanceof ol.Overlay) { 
					_mapInit.map.removeOverlay(this);
				}
			});
			this._initMeasure();
		},



		coordRegMeasure : function(type) {



		},

		startMeasure : function(type) {
		debugger;
			
			var _self = this;
			console.info(_self);//map객체
			_self.offMeasureStop();   
			_self.measure.geomAction = type;
			
			this.offControl();
			var map = this._mapInit.map;
			
			if ($.isNullString(map)) return;
			
			this._initMeasure(); 
			this.measure.properties.isMeasure = true;
			this.measure.feature = null;

			var control = this._mapInit.control.measure[type];
			console.info("mapInit control ")
			console.info(control);
				control.setActive(true);
				
			this._mapInit.createMeasureTooltip();
			this._mapInit.createHelpTooltip();
			
			
			if(type!="select"){
				this.layer.properties.isMeasureMode = false;
				
				control.on("drawstart", function(evt){
				    console.info("drawstart");
				    console.info(evt)
					_self.measure.feature = evt.feature;

				}, this);
				
				control.on('drawend', function(evt) {
				    console.info("drawend");
				    console.info(evt)
					
					_self._mapInit.overlay.overlayElement.className = _self.measure.properties.overlayClassName;
					_self._mapInit.overlay.overlayLayer.setOffset([0, -7]);
					_self.measure.feature = null;
					_self._mapInit.overlay.overlayLayer = null;  
					_self._mapInit.createMeasureTooltip();    
					 
				}, this);
			}else{ 
				this.layer.properties.isMeasureMode = true;
			}
			this._mapInit.mapEvtMng.setMeasureEvt();
		},
		mapControlHandle : function(bDisabled) {
			var mapControl = this._mapInit.config.mapControl;
			$(mapControl.elem).each(function(){
				var _this = $(this);
				$.each(mapControl.arrHandle, function(){
					var bCompare = mapControl.flag == "class" ? _this.hasClass(this) : _this.attr(mapControl.flag) == this;
					if (bCompare) {
						if (bDisabled) {
							_this.off("click");
							_this.on("click", function(){
								alert(_self.message.editFail);
							});
						} else {
							$(mapControl.elem).off("click");
							$.setMapControlEvt();
						}
					}
				});
			});
		},
		lyrClear : function () {
			$.each(this._mapInit.mapLayerMng.layers.wfs, function(){
				if(this instanceof ol.layer.Vector) {
					this.getSource().clear();
				}
			});
			$.each(this._mapInit.layer, function(){
				if(this instanceof ol.layer.Vector) { 
					this.getSource().clear();
				}
			}); 
		},

		offControl : function () {
			var _self = this;
			$.each(this._mapInit.control, function(kind, control){
				$.each(control, function(name){
					this.setActive(false); 
				});
			});
			//this.offSearch();
			var mapInit = this._mapInit;  
			mapInit.map.un("click");
			mapInit.map.removeEventListener("click");  
			
			var $measureOverlay = $("div." + this.measure.properties.overlayViewClassName);
			var overlayClassName = this.measure.properties.overlayClassName;
			
			if($measureOverlay.length != 0) {
				$measureOverlay.each(function(){
					if (!$(this).hasClass(overlayClassName)) {
						$(this).remove();
					}
				});
			}
			this.measure.feautres = [];
			this.search.featureIdList = []; 
			this.layer.properties.isMeasureMode = false;
			this.drawProperties.isOverlay = false;
		},
		setControl : function (keyValue) {
			$.each(this._mapInit.control.draw, function(kind, control){
				if(kind == keyValue){
					this.setActive(true);
				}else{
					this.setActive(false);
				}
			}); 
		},
		 
        drawFeatues:function(geomGbn, type, value){
        	 
        	var _self = this;
        	var $cellLayers = $("#cellLayers");
        	if(geomGbn=="areaId"){
        		var layerNm = type;
        		var uniqId = MapRcicMng.layer.wms[layerNm].uniqField;
        		var layerId = MapRcicMng.layer.wms[layerNm].id;
        		
        		 if($cellLayers.val() != layerId){
        			 $cellLayers.val(layerId);
            		 $cellLayers.trigger('change');
        		 }  
        		var layer = mapInit.mapLayerMng.getLayerById(layerId);
        		var ff = _self.getAttributeById(layerNm, uniqId, value);
    			_self._mapInit.layer.cell.getSource().addFeatures(ff); 
    			_self._mapInit.layer.measure.getSource().addFeatures(ff);

    			var tempArray = [];
				for(var z in ff){    
					var obj = new Object();
				    obj.uniqField= ff[z].get(uniqId);
					obj.id= ff[z].id_.split(".")[1];  
					obj.featureDrawSeq = 0; 
					obj.layerNm = _self._mapInit.currentLayer.id;
					tempArray.push(obj);
				} 
		    	_self.measure.feautres=tempArray;   
    			
        	}else{

        		 $cellLayers.val("");
        		 $cellLayers.trigger('change');
        		 
        		 var format = new ol.format.WKT(); 
        		 var feature = format.readFeature(value, {
        		   dataProjection: mapInit.map.getView().getProjection().getCode(),
        		   featureProjection: mapInit.map.getView().getProjection().getCode(),
        		 });
     			_self._mapInit.layer.cell.getSource().addFeature(feature);
    			_self._mapInit.layer.measure.getSource().addFeature(feature);
		    	_self.measure.feautres=value;    
        	} 
        }, 
        
		calculateDistance : function(line) {
			var length;
			var sourceProj = this._mapInit.map.getView().getProjection();
			if (sourceProj.code_ != "EPSG:4326") {
				var coordinates = line.getCoordinates();
				length = 0;
				for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
					var c1 = proj4(sourceProj.code_, 'EPSG:4326', coordinates[i]);
					var c2 = proj4(sourceProj.code_, 'EPSG:4326', coordinates[i+1]);
					length += ol.sphere.getDistance(c1, c2);
				}
			} else {
				length = Math.round(line.getLength() * 100) / 100;
			}
			var output = (Math.round(length * 100) / 100) + ' ' + 'm';
				return output;
		},

		calculateArea : function(polygon) {
			
			G.areaRange  = "";
			var area;
			var sourceProj = this._mapInit.map.getView().getProjection();			
			if (sourceProj.code_ != "EPSG:4326") {
				var geom = /** @type {ol.geom.Polygon} */ 
				(polygon.clone().transform(sourceProj, 'EPSG:4326'));
				area = Math.abs(ol.sphere.getArea(geom,{
					projection: 'EPSG:4326'
				}));  
			} else {
				area = polygon.getArea();
			}
			var output = (Math.round(area * 100) / 100) + ' ' + 'm<sup>2</sup>';
			G.areaRange = output;
			return output;
		},

		allClear : function () {
			this.offMeasure();
			this.lyrClear();
			this.offControl();
			this.mapControlHandle(false);
		},  
		isDuplicateFeature:function(feature){

			var isFlag = false;  
			var _self = this; 
			
			var uniqId = MapRcicMng.layer.wms[_self._mapInit.currentLayer.id].uniqField; 
			_self.properties.queryField = uniqId;
			
		    var searchCellFeatrues = _self._mapInit.layer.searchCell.getSource().getFeatures();
			var id = feature[0].get(_self.properties.queryField);
			var features =_self._mapInit.layer.searchCell.getSource().getFeatures();
			
			$.each(features, function(key, f){
				var readyF = f.get(_self.properties.queryField);
				if(id==readyF){
					_self._mapInit.layer.searchCell.getSource().removeFeature(f);
					isFlag = true; 
					return false;
				} 
			}) 
			return isFlag;
		},
		clearAreaGeom:function(type){
			var _self = this;
			var isValid = true;
		 
			switch (type) { 
			case "geom":
				if(_self._mapInit.layer.searchCell.getSource().getFeatures().length > 0){
			    	if(!confirm(_self.message.changeArea)){
			    		isValid = false;
			    	} 
			    } 
				break;
			default:
				if(_self._mapInit.layer.measure.getSource().getFeatures().length > 0){
			    	if(!confirm(_self.message.changeArea)){
			    		isValid = false;
			    	} 
			    } 
				break;
			}
		   return isValid; 
		},
		setGeometryFn : function(fnType){
			   
			var _self = this;
				_self.measure.eventAction = fnType;
		    var sourceProj = this._mapInit.map.getView().getProjection(); 
		    var searchCellFeatrues = this._mapInit.layer.searchCell.getSource().getFeatures();
		    var tempFeature;
		    var searchCellBox = this._mapInit.layer.searchCell.getSource().getExtent(); 
		    
		    if(_self._mapInit.layer.searchCell.getSource().getFeatures().length==0 && _self._mapInit.layer.measure.getSource().getFeatures().length==0){
		    	alert(_self.message.empty);
		    	 $(".tlt").removeClass("active");
		    	return;
		    }
  
		    if(searchCellFeatrues.length>0){
		    	
		    	this.getGeometryForAttribute(searchCellFeatrues,fnType);
		    	var features = _self.getAttributeByIdExtent(_self._mapInit.currentLayer.id, _self._mapInit.currentLayer.uniqField,
		    						   _self.search.featureIdList, searchCellBox);
		    	mapInit.layer.cell.getSource().addFeatures(features);
		    	_self.measure.feautres = [];
		    	var uniqId = MapRcicMng.layer.wms[_self._mapInit.currentLayer.id].uniqField;
		    	
		    	var tempArray =[];
				for(var z in features){  
					var obj = new Object();
						/* 추가2020-08-14  uniqField */
					 	obj.uniqField= features[z].get(uniqId);
					 	/* ..추가2020-08-14  uniqField */
						obj.id= features[z].id_.split(".")[1];  
						obj.featureDrawSeq = 0; 
						obj.layerNm = _self._mapInit.currentLayer.id;
					tempArray.push(obj); 
				}
		    	_self.measure.feautres=tempArray;
		    }else{
		    	var features = _self._mapInit.layer.measure.getSource().getFeatures();
		    		tempFeature = _self.setGeometryOpeator(features,fnType);
		    		if($.isNullString(tempFeature) || tempFeature.length==0)return; 
		    		mapInit.layer.measure.getSource().clear(); 
					mapInit.layer.measure.getSource().addFeatures(tempFeature);
					this.setGeometryWrite(tempFeature, fnType);
		    }
		},   
		getGeometryForAttribute:function(features,fnType){
			var _self = this;
			features.forEach(function(feature) {
				var val = feature.get(_self.properties.queryField);
				if(!$.isNullString(val)){
					_self.search.featureIdList.push(val);
				}
			});
		},
		getFeatureProp : function (params) {
			var _self = this;
				this.layer.properties.isFeatureSelect = true; 
 
				$(this._mapInit.config.roadModal).modalOpen(params.url, {
					width : "350px", 
					reqData : params.reqData,
					closeFunc : function() { 
					}
				});
		},
		getMapData:function(){
		  return this.measure.feautres; 
		}, 
		
		withoutExtentMeger:function(features, cleaned, fnType){
			var _self = this; 
			var extend=null;
			var outer = [];
			features.forEach(function (geom, i, array) { 
				var jstsGeom = _self.properties.ol3Parser.read(geom.getGeometry());
				if (i === 0) { 
					    cleaned[cleaned.length] = jstsGeom;
					    extend = geom.getGeometry().getExtent();
			        }else {  
			        	
			        	if (ol.extent.intersects(extend, geom.getGeometry().getExtent())) {
			        		if(fnType=="union"){
			        			cleaned[cleaned.length-1] = cleaned[cleaned.length-1].union(jstsGeom);			        			
			        		}else if(fnType=="intersection"){
			        			cleaned[cleaned.length-1] = cleaned[cleaned.length-1].intersection(jstsGeom);			        			
			        		}else if(fnType=="difference"){
			        			cleaned[cleaned.length-1] = cleaned[cleaned.length-1].difference(jstsGeom);
			        		}else if(fnType=="symDifference"){
			        			cleaned[cleaned.length-1] = cleaned[cleaned.length-1].symDifference(jstsGeom);
			        		}
			            }else{
			            	outer.push(geom);
			            }
		        	};
			})
			if(outer.length>1){
				_self.withoutExtentMeger(outer,cleaned,fnType);
			}
			return [cleaned, outer]; 
		},
		backMeasure: function(){
			var _self = this; 
			var la = _self._mapInit.layer.measure.getSource().getFeatures();   
				la.pop();      
				_self._mapInit.layer.measure.getSource().clear();
				_self._mapInit.layer.measure.getSource().addFeatures(la); 
		},
		setGeometryOpeator:function(features,fnType){
			
			var _self = this; 
			var idx=0;
			var tempFeature;
			var firstFeature=""; 
			var tempF = [];    
			   
			features.forEach(function(feature) {
				var type = feature.getGeometry().getType();
				var wktValue;
				
				   switch (type) {
					case "Circle":
						var center = ol.extent.getCenter(feature.getGeometry().getExtent());
						var raduis = feature.getGeometry().getRadius();
						
						var wktValue = _self.properties.ol3Parser.read(new ol.geom.Point(center)).buffer(raduis);
						var olFeatureGeom = _self.properties.ol3Parser.write(wktValue);
						var feature = new ol.Feature({  
							geometry : olFeatureGeom 
						}); 
						tempF.push(feature); 
					break; 
					default:  
						var wktValue =  _self.properties.ol3Parser.read(feature.getGeometry());
					var olFeatureGeom = _self.properties.ol3Parser.write(wktValue);
					var feature = new ol.Feature({ 
						geometry :  olFeatureGeom  
					});
					tempF.push(feature);
						break;
					}    
			});     
			  
			var geoms;
			var AllFeatures = _self.format.geojson.writeFeatures(tempF);
			var geoms = (new ol.format.GeoJSON()).readFeatures(AllFeatures);
			var wktFeatures = _self.format.wkt.writeFeatures(tempF);
			var cleaned =  [];
	        var tempFeature = [];
	        var firstExtent = null;
	        var withoutExtent = []; 
	        
			switch (fnType) {
				case "union":
					geoms.forEach(function (geom, i, array) {
						var jstsGeom = _self.properties.ol3Parser.read(geom.getGeometry());
						if (i === 0) { 
					        	cleaned[0]= jstsGeom; 
					        }else { 
					        	cleaned[0] = cleaned[0].union(jstsGeom); 
				        	};
					    });
					break; 
					
				case "intersection":
					
					var isIntersection = false;
					geoms.forEach(function (geom, i, array) { 
						var jstsGeom = _self.properties.ol3Parser.read(geom.getGeometry());
						if (i === 0) { 
							    firstExtent = geom.getGeometry().getExtent();
							    cleaned[0] = jstsGeom;
					        }else { 
					        	if (ol.extent.intersects(firstExtent,geom.getGeometry().getExtent())) {
					        		cleaned[0] = cleaned[0].intersection(jstsGeom);
					        		isIntersection = true;
					            }else{
					            	withoutExtent.push(geom); 
					            }
				        	};
				    });
					
					if(withoutExtent.length>0){ 
						var queryArray = _self.withoutExtentMeger(withoutExtent, cleaned,fnType);
						if(queryArray[1].length>1){
						}else{
							cleaned = queryArray[0]; 
						}
					}  
					if(!isIntersection){  
						alert(_self.message.isIntersection); 
						return false;
					}
					break; 
					
				case "difference":
					var isIntersection = false;
					geoms.forEach(function (geom, i, array) { 
						var jstsGeom = _self.properties.ol3Parser.read(geom.getGeometry());
						if (i === 0) { 
							    firstExtent = geom.getGeometry().getExtent();
							    cleaned[0] = jstsGeom;
					        }else { 
					        	if (ol.extent.intersects(firstExtent,geom.getGeometry().getExtent())) {
					        		cleaned[0] = cleaned[0].difference(jstsGeom);
					        		isIntersection = true;
					            }else{  
					            	withoutExtent.push(geom); 
					            }
				        	};
					    });
					if(withoutExtent.length>0){
						var queryArray = _self.withoutExtentMeger(withoutExtent, cleaned,fnType);
						if(queryArray[1].length>1){
							
						}else{
							cleaned = queryArray[0]; 
						}
					}
					if(!isIntersection){  
						alert(_self.message.isIntersection); 
						return false;
					}
					break; 
					case "symDifference":
					var isIntersection = false;
					geoms.forEach(function (geom, i, array) { 
						var jstsGeom = _self.properties.ol3Parser.read(geom.getGeometry());
						if (i === 0) { 
							    firstExtent = geom.getGeometry().getExtent();
							    cleaned[0] = jstsGeom;
					        }else { 
					        	if (ol.extent.intersects(firstExtent,geom.getGeometry().getExtent())) {
					        		cleaned[0] = cleaned[0].symDifference(jstsGeom);
					        		isIntersection = true;
					            }else{  
					            	withoutExtent.push(geom); 
					            }
				        	}; 
					    });
					if(withoutExtent.length>0){
						var queryArray = _self.withoutExtentMeger(withoutExtent, cleaned,fnType);
						if(queryArray[1].length>1){
						}else{
							cleaned = queryArray[0]; 
						}
					}
					if(!isIntersection){  
						alert(_self.message.isIntersection); 
						return false;
					}
					break;
				default:  
					break;   
			};
			
			if(cleaned!=null){ 
				for(var i in cleaned){
					var feature = new ol.Feature({  
						geometry : _self.properties.ol3Parser.write(cleaned[i]),
						area : cleaned[i].getArea()
					});   
					tempFeature.push(feature);
				}
			};  
			
			var overlay = _self._mapInit.overlay;  
			_self._mapInit.map.getOverlays().getArray().forEach(function(overlay) {
				_self._mapInit.map.removeOverlay(overlay);
			});  
			$.each(_self._mapInit.overlay, function(key, val){
				if (this instanceof ol.Overlay && key.indexOf("Tooltip") < 0) {
					mapInit.map.removeOverlay(this);  
				}
			});
			_self.offMeasureStop();  
			_self._mapInit.createMeasureTooltip();
			return tempFeature; 
		},
		
		setTransMultipolygonToPolygon:function(features){
			var polygonArray = [];
			for(var i in features){
				var f = features[i]; 
				var geom = f.getGeometry();
				
				if (geom instanceof ol.geom.MultiPolygon) {
					var geometryFeatureList = f.getGeometry().getCoordinates();
					for(var j in geometryFeatureList){
						var pointFeat = new ol.Feature({
							geometry : new ol.geom.Polygon(geometryFeatureList[j]),
						});
						polygonArray.push(pointFeat);
					} 
				}else{
					polygonArray.push(f); 
				}
			}
			return polygonArray;
		}, 
		setGeometryWrite:function(tempFeature,fnType){
			
			var _self= this;   
			var wktFeatures = _self.format.wkt.writeFeatures(tempFeature)    
			var geometries = []; 
			var polygonArray = this.setTransMultipolygonToPolygon(tempFeature);
			if(polygonArray.length > 3){
				alert(_self.message.overflowArea);
				return;
			}
			
			for(var i in  polygonArray){
				var feature = _self.format.wkt.writeFeature(polygonArray[i]); 
				_self.measure.feautres.push(feature);  
			}
			if($.isNullString(polygonArray))return;
			_self.measure.properties.targetLayer = mapInit.layer.cell;
			var polygonArrays = [];   
			if($.isNullString(polygonArray[0].getGeometry()))return; 
			
			try {    
				var originalFe;
				for(var i in polygonArray){
					var feature = polygonArray[i];
						originalFe = feature;  
					var tt = [];
					var feature2 = feature.clone();
					feature2.getGeometry().applyTransform(function (coords, coords2, stride) {
						for (var j = 0 ; j < coords.length ; j += stride) {
							var y = coords[j];
							var x = coords[j+1];
							coords[j] = x;
							coords[j + 1] = y;
						}
					});  
					polygonArrays[i] = feature2;  
				}  
			} catch (e) {
				//FIXME
			}
			  if(!$.isNullString($('#cellLayers').val())){
				    _self.measure.feautres = [];
				    var extent = mapInit.layer.cell.getSource().getExtent();
				    
				  _self.sendWfsExtent({     
						lyrName : _self._mapInit.currentLayer.id,  
						extent: extent,  
						targetLayer : mapInit.layer.cell,
						polygonArrays : polygonArrays
					});
			  }else{
				  _self.measure.feautres = [];
				  for(var i in polygonArrays){
					  polygonArrays[i].getGeometry().applyTransform(function (coords, coords2, stride) {
							for (var j = 0 ; j < coords.length ; j += stride) {
								var y = coords[j];
								var x = coords[j+1];
								coords[j] = x;
								coords[j + 1] = y;
							}
						}); 
					var wktFeature = _self.format.wkt.writeFeature(polygonArrays[i]);
					_self.measure.feautres.push(wktFeature);
				  } 
			  }
			_self.offMeasureStop();
			
		}, 
		setClearFn:function(){
			var measureSource = mapInit.layer.cell.getSource();
			switch (this.measure.eventAction) {
			case "intersection":
				measureSource.clear();
				break;
			case "difference":
				measureSource.clear();
				break;
			case "symDifference":
				measureSource.clear();
				break;
			default:
				break;
			}
		},
		sendWfsExtent:function(params){
			
			this.setClearFn(); 
			var _self = this;
			var measureFeatures = mapInit.layer.measure.getSource().getFeatures();
			
			var tempData = null;
            var reqData =	{
                request: "GetFeature", 
                version: "1.1.1",
                outputFormat: "application/json",  
                service:"wfs",
                typeNames: this._mapInit.config.workspace+":"+params.lyrName,
            }; 
            
            var queryStr = "";
            var idx=0; 
            var geojsonFormat = new ol.format.GeoJSON();
            var tempArray = new Array();  
            
            var cnt=0;
            
            for(var i in params.polygonArrays){ 
            	
				var wktFeature = _self.format.wkt.writeFeature(params.polygonArrays[i]); 
				var feature =params.polygonArrays[i]; 
				var extent = ol.extent.getCenter(feature.getGeometry().getExtent());
				
				if($.isNullString(wktFeature))continue; 
				
				if(wktFeature.startsWith('POLYGON(())'))continue; 
				
				var	cqlFilter = 'INTERSECTS(the_geom, ' + wktFeature +')'
					tempData = {CQL_FILTER :cqlFilter}  
	             
				$.ajax({
					url : _self._mapInit.config.mapUrl + _self._mapInit.config.workspace+_self._mapInit.config.noProxyWfs,
					dataType : "json",
					cache : false,
					async : false,  
	                data :$.extend({}, reqData,tempData),
					beforeSend	: function(){ 
						$.showBlock();
					},
					complete :function(){
						setTimeout(function(){
							$.hideBlock();	
						},100);
					},
					success:function(response){ 
						 
						var features = geojsonFormat.readFeatures(response);
						
						if(measureFeatures.length==1){
							_self.measure.properties.targetLayer.getSource().addFeatures(features); 
							if(!$.isNullString(_self._mapInit.currentLayer)){
								var uniqId = MapRcicMng.layer.wms[_self._mapInit.currentLayer.id].uniqField;
								for(var z in features){ 
									var obj = new Object();
										obj.uniqField= features[z].get(uniqId);
										obj.id= features[z].id_.split(".")[1];
										obj.featureDrawSeq = cnt; 
										obj.layerNm = _self._mapInit.currentLayer.id;
									tempArray.push(obj); 
								}
							} 
							var overlay = _self._mapInit.overlay;  
							_self._mapInit.map.getOverlays().getArray().slice(0).forEach(function(overlay) {
								_self._mapInit.map.removeOverlay(overlay);
							});  
							$.each(_self._mapInit.overlay, function(key, val){
								if (this instanceof ol.Overlay && key.indexOf("Tooltip") < 0) {
									mapInit.map.removeOverlay(this); 
								} 
							});
							cnt++; 
						}else{ 
							if(!$.isNullString(_self._mapInit.currentLayer)){    
								var uniqId = MapRcicMng.layer.wms[_self._mapInit.currentLayer.id].uniqField;
								for(var z in features){ 
									var obj = new Object();
									    obj.uniqField= features[z].get(uniqId);
										obj.id= features[z].id_.split(".")[1]; 
										obj.featureDrawSeq = cnt;
										obj.layerNm = _self._mapInit.currentLayer.id;
										tempArray.push(obj); 
								}
							}
							cnt++;
							_self.measure.properties.targetLayer.getSource().addFeatures(features);
						} 
					},
					error:function(){
						alert(_self.message.failGeometry);
						_self.offMeasureStop();
						return false;
					}
				});    
			}
            if(!$.isNullString(_self._mapInit.currentLayer)){
            	_self.measure.feautres = tempArray;
            } 
			return true;
		},  
	
		getFeatureByCoodi : function(lyrId, point,targetCRS, original, geometryName){
			
			if($.isNullString(geometryName)){
				geometryName = "geom";
			}
			var geojsonFormat = new ol.format.GeoJSON();
			var features = null;
			var layer = this._mapInit.mapLayerMng.getLayerById(this._mapInit.config.workspace+":"+lyrId);
			var transCodi = [point[0],point[1]];
			$.ajax({   
				url:  this._mapInit.config.mapUrl + this._mapInit.config.workspace+this._mapInit.config.noProxyWfs,
				dataType: 'json',
				type:'post',
				async: false,   
				data:{  
					srsName:targetCRS,
					srs:targetCRS,  
					request: 'GetFeature',
					version: '1.0.0',
					typename: this._mapInit.config.workspace+":"+lyrId, 
					outputFormat: 'application/json',
					CQL_FILTER: "DWITHIN("+geometryName+", POINT("+transCodi[0]+" "+transCodi[1]+"),1,meters)"
				},
				success:function(response){
					features = geojsonFormat.readFeatures(response);
				},
				error : function(a, b, c){
					console.log("error");
				}
			});
			return features;
		},
		transCoordinate:function(originalCrs, targetCrs, coodinate){
			return  proj4(originalCrs,targetCrs,coodinate);
		},
		

		/**
		 * wfs 레이어 Filter
		 * @method
		 * @param linkLayerId
		 */ 
		getAttributeByIdExtent : function(lyrId, attrId, attrValue , extent){
			
			var _self = this;
			var geojsonFormat = new ol.format.GeoJSON();
			var features = null;
			var layerNm = this._mapInit.config.workspace+":"+lyrId;
			var extent;
			if($.isNullString(extent)){
				extent = this._mapInit.map.getView().calculateExtent(this._mapInit.map.getSize())
			}
					
			 var url = this._mapInit.config.mapUrl + this._mapInit.config.workspace+this._mapInit.config.noProxyWfs;
			 var ss = '';
	  			ss+='<ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">';
	  			ss+='<ogc:And>';
	  			if(!$.isNullString(extent)){
  				ss+='<ogc:BBOX>';
	  			ss+='<ogc:PropertyName>the_geom</ogc:PropertyName><gml:Envelope srsName="EPSG:3857" xmlns:gml="http://www.opengis.net/gml">';
	  			ss+='<gml:coordinates>';
	  			ss+= extent[0]+','+extent[1]+' '+ extent[2]+','+extent[3]
	  			ss+='</gml:coordinates></gml:Envelope>';
	  			ss+='</ogc:BBOX>';
	  			}
	  			ss+='<ogc:Or>'; 
	  			for(var i in attrValue){
	  				ss+='<ogc:PropertyIsEqualTo><ogc:PropertyName>'+attrId+'</ogc:PropertyName>';
	  				ss+='<ogc:Literal>'+attrValue[i]+'</ogc:Literal>';
	  				ss+='</ogc:PropertyIsEqualTo>';
	  			}
	  			ss+='</ogc:Or>';
				ss+='</ogc:And>';
				ss+='</ogc:Filter>'	 
	        var data = {
	        		service : 'wfs', 
	        		srsName:_self._mapInit.config.baseCrsCode, 
	        		filter: ss,
	        		version:"1.1.0", 
	        		outputFormat: "application/json", 
	        		request : 'GetFeature', 
	        		typeNames:layerNm,
	        	}
			$.ajax({   
				url:  url,  
				type : 'post',
				dataType: 'json',
				async: false,  
				data: data,
				success:function(response){
					features = geojsonFormat.readFeatures(response);
					if($.isNullString(features))return; 	
					return features;
				},
				error : function(a, b, c){
					console.log("error");
				}
			}); 
			return features;
		},
		
		/**
		 * wfs 레이어 Filter
		 * @method
		 * @param linkLayerId
		 */ 
		getAttributeById: function(lyrId, attrId, attrValue){
			
			var _self = this;
			var geojsonFormat = new ol.format.GeoJSON();  
			var features = null;
			var layerNm = this._mapInit.config.workspace+":"+lyrId;
			var extent;
			
			var url = this._mapInit.config.mapUrl + this._mapInit.config.workspace+this._mapInit.config.noProxyWfs;
			var value="";	
		    for(var i in attrValue){
	  			value += "'"+layerNm.split(":")[1]+"."+attrValue[i]+"'" + ",";
		    }
			    value = value.slice(0,-1); 
	        var data = {  
	        		service : 'wfs', 
	        		srsName:_self._mapInit.config.baseCrsCode, 
	        		version:"1.1.0", 
	        		outputFormat: "application/json", 
	        		request : 'GetFeature', 
	        		typeNames:layerNm,
	        		cql_filter:'id IN ('+value+')' 
	        	}
					$.ajax({    
						url:  url,  
						type : 'post',
						dataType: 'json',
						async: false,  
						data: data,
						beforeSend: function() {
							 $.showBlock();
					    },  
					    complete: function() {
					    	setTimeout(function(){
								$.hideBlock();	
							},1000);  
					    },
						success:function(response){
							features = geojsonFormat.readFeatures(response);
							if($.isNullString(features))return; 	
							return features;
						},
						error : function(a, b, c){
							console.log("error");
						}
					}); 
			return features;
		}
	}
	window.MapAction = MapAction;
	window.name = "MapAction.js";
})(window, jQuery);