var proj = new Proj();
(function(window, $) {
	"use strict";

	var MapInit = function(mapId, options){
	    console.info('MapInit class')
		var _self = this;
		_self.mapId = mapId;
		_self._options = options;
		_self.init();
	};
	
	MapInit.prototype = {
		layer : {
			polyline : null,
			polygon : null,
			draw : null,			
			measure : null,			
			point : null,
			cell : null,
			searchCell : null,
			marker: null
		},
		mapFormat:{
			wkt : new ol.format.WKT()
		},
		message:{
			failGeometry: '잘못된 형식의 도형입니다 \n꼬이지 않게 그려주세요'
		},
		overlay : {
			overlayElement : null,				
			overlayLayer : null,				
			overlayViewElement : null,			
			overlayViewLayer : null,			
			overlayTooltipElement : null,		
			overlayTooltipLayer : null,			
			overlayTooltipAppend : null,		
			overlayTooltipAppendElem : null,	
		},
		control : {
			draw : {
				point : null,
				polyline : null,
				polygon : null,
			},
			edit : {
				select : null
			},
			measure : {
				polyline : null,
				polygon : null,
				circle : null,
				square: null,
			},
			angle : {
				select : null,
				modify : null,
			},
			search : {
				polygon : null,
			},
		},
		valid:{
			polygon: true
		},
		drag : {
			control : null,			
			selectedFeature : null, 
		}, 
		map : null,					
		mapAction : null,			
		mapLayerMng : null,		
		mapUiMng: null,
		mapEvtMng : null,		
		baseMapList : [],			
		baseMapLayers : null,
		baseCellLayers : null,	 
		baseMap : null,			
		mapName : null,			
		crsCode : null,			
		center : null,			
		config : null,			
		targetArea:null,
		mapAngle:null,
		baseMapVislble:null,
		rotateFeature : null,
		mapMethod:null,
		moveEndEvt : null,
		currentLayer:null,
		_defaults : {
			noProxyWms : "/wms", 
			noProxyWfs : "/wfs",
			noProxyWmts : "gwc/service/wmts",
			proxyBackground : "",
			workspace : "rcic",
			initBaseMap : "VWorld", 
			baseCrsCode : "EPSG:3857",
			arrOlDefaultCtrl : [ new ol.control.ScaleLine(), new ol.control.ZoomSlider() ],
			defaultsCtrl : { attribution: false }, 
			interactions : {dragPan: true, shiftDragZoom : false, altShiftDragRotate : false, doubleClickZoom : false, pinchRotate : false, interactionSelectPointerMove : false},
		},
		init : function(){
		console.info("realinit")
			var _self = this;
			_self.config = $.extend({}, _self._defaults, _self._options);
			_self.config.interactions = $.extend({}, _self._defaults.interactions, _self.config.interactions);
			$.each(BaseMapConfig, function(idx, lyr){
				_self.baseMapList.push(lyr);
			});
			_self.config.initBaseMap = $.isNullString(_self._options.baseMap)?_self.config.initBaseMap:_self._options.baseMap;
			_self.baseMap = BaseMapConfig[$.isNullString(_self.config.baseMap)?_self.config.initBaseMap:_self.config.baseMap];
			_self.baseMapVislble = $.isNullString(_self._options.baseMapVislble)?false:_self._options.baseMapVislble;
			
			if(!_self.baseMapVislble){
				_self.baseMap.layers.base.visible=false; 
			}
			_self.center = $.isNullString(_self.config.center)?_self.baseMap.center:_self.config.center;
			_self.crsCode = _self.baseMap.crsCode;
			_self.map = new ol.Map({
				renderer : 'canvas',
				controls : ol.control.defaults(_self.config.defaultsCtrl).extend(_self.config.arrOlDefaultCtrl),
				target : _self.mapId,
				interactions : ol.interaction.defaults(_self.config.interactions),
				view : _self.getViewByCrsCode(_self.crsCode),
				loadTilesWhileAnimating: true,
				loadTilesWhileInteracting: true
			});
			_self.mapAction = new MapAction(_self); 
			_self.mapLayerMng = new MapLayerMng(_self); 
			_self.mapEvtMng = new MapEvtMng(_self); 
			_self.addBaseMapLayers();
			_self.setAddTileLayer(_self);
			_self.mapTheme = new MapTheme(_self);
			
		},   
		setAddTileLayer:function(mapInit){
		console.info("adTileLayer")
			
			var _self = this; 
			for(var i in _self.config.targetLayer){
				
				var layer;
				var visible;
				var service;
				var kind;
				var roadSectionId;
				var center;
				var zoom;

				if(!$.isNullString(_self.config.targetLayer[i].name)){
						
						layer = _self.config.targetLayer[i].name;
						visible = _self.config.targetLayer[i].visible;
						service = _self.config.targetLayer[i].service;
						kind =  _self.config.targetLayer[i].kind;
						roadSectionId =  _self.config.targetLayer[i].roadSectionId;
						center =  _self.config.targetLayer[i].center;
						zoom =  _self.config.targetLayer[i].zoom;
						 
					}else{
						layer = _self.config.targetLayer[i];
						visible = true;  
						service = "wms"; 
						kind  =  "map";
						roadSectionId = null;
						center = null;
						zoom = null;
				}  
			 
				this.mapLayerMng._addWmsLayer(_self.config.workspace+":"+layer, {
					kind : kind,
					roadSectionId:roadSectionId,
					layerKorName: _self.config.workspace+":"+layer,
					visible:visible,
					projection: mapInit.crsCode,
					center : center,
					zoom : zoom,
					zIndex:15
				});
			} 
		},
		getWktFromGeom : function(geom) { 
			var format = new ol.format.WKT(); 
			var wkt = format.writeGeometry(geom);
			return wkt;
		},
		getViewByCrsCode : function(crsCode) {
			var _self = this;
			var extent;
			var minZoom;
			var maxZoom;
			var zoom;
			var center;  
			var resolutions;
			if (crsCode == "EPSG:4326") {
				resolutions = [ 0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125, 0.001373291015625, 0.0006866455078125, 0.00034332275390625, 0.000171661376953125, 0.0000858306884765625, 0.00004291534423828125, 0.000021457672119140625, 0.000010728836059570312, 0.000005364418029785156, 0.000002682209014892578 ]
			} 
			else if (crsCode == "EPSG:3857") {
				resolutions = [2048,1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5,0.25] 
			}else {
				resolutions = this.baseMap.resolutions;
			}
			var projection = new ol.proj.Projection({
				code : crsCode, 
				units : 'm',
				axisOrientation : 'enu'
			}); 
			var baseMap = null;
				baseMap = BaseMapConfig[_self._options.baseMap];
			var center =  _self.center;
				minZoom = $.isNullString(_self.config.minZoom) ? 1 : _self.config.minZoom; 
				maxZoom = $.isNullString(_self.config.maxZoom) ? 15 : _self.config.maxZoom;
				zoom = $.isNullString(_self.config.zoom) ? 0 : _self.config.zoom;
			
				var view = new ol.View({  
					projection : projection,
					resolutions : resolutions,
					center : center,
					zoom : zoom,
					minZoom : minZoom, 
					maxZoom : maxZoom
				});
			return view;
		},
		addBaseMapLayers : function() {
			this.mapLayerMng.addBaseMapLayers();
		},
		changeBaseMapWithName : function(baseMapName){ 
			var baseMapCrsCode;
			var oldProj;
			var newProj;
			var coord;
			var zoom;
			var baseMap = BaseMapConfig[baseMapName];
				baseMapCrsCode = baseMap.crsCode;
				oldProj = this.baseMap.crsCode;
				coord = this.map.getView().getCenter();
				zoom = this.map.getView().getZoom();
			
			this.changeCrsCode(baseMapCrsCode);
			this.changeBaseMap(baseMap);
		},
		changeCrsCode : function(crsCode){
			var prevCrsCode = this.crsCode;
			this.crsCode = crsCode;
			this.map.setView(this.getViewByCrsCode(crsCode)); 
			this.mapAction.zoomExtent();  
			if(prevCrsCode != this.crsCode){
				this.mapAction.transformFeature(prevCrsCode, this.crsCode);
			}
		},
		changeBaseMap : function(baseMap) {
			this.baseMap = baseMap;
			this.addBaseMapLayers();
		},
		createMeasureTooltip : function(id) {
			
			this.overlay.overlayElement = document.createElement('div');
			this.overlay.overlayElement.className = this.mapAction.measure.properties.overlayClassName;
			 
			this.overlay.overlayLayer = new ol.Overlay({
				element : this.overlay.overlayElement,
				offset : [ 0, -15 ],
				positioning : 'bottom-center'
			});
			this.map.addOverlay(this.overlay.overlayLayer);	
		},
		createHelpTooltip : function(){
			if (this.overlay.overlayViewLayer) {
				this.map.removeOverlay(this.overlay.overlayViewLayer);
			}
			this.overlay.overlayViewElement = document.createElement('div');
			this.overlay.overlayViewElement.className = this.mapAction.measure.properties.overlayViewClassName;
			this.overlay.overlayViewLayer = new ol.Overlay({
				element : this.overlay.overlayViewElement,
				offset : [ 15, 0 ],
				positioning : 'center-left'
			});
			this.map.addOverlay(this.overlay.overlayViewLayer);
		},
		setControl : function() {
			var _self = this;
			var measureStyle = new ol.style.Style({
				fill : new ol.style.Fill({
					color : 'rgba(6, 54, 248, 0.2)'
				}),
				stroke : new ol.style.Stroke({
					color : 'rgba(6, 54, 248, 0.2)',  
					lineDash : [ 30, 30 ],
					width : 3
				}),
				image : new ol.style.Circle({
					radius : 5,
					stroke : new ol.style.Stroke({
						color : 'rgba(6, 54, 248, 0.5)'
					}),
					fill : new ol.style.Fill({
						color : 'rgba(6, 54, 248, 0.5)'
					})
				})
			});
			var vertexStyles = [
				new ol.style.Style({
					stroke : new ol.style.Stroke({
						color : 'blue',
						width : 3
					}), 
					fill : new ol.style.Fill({
						color : 'rgba(6, 54, 248, 1)'
					}) 
				}),
				new ol.style.Style({
					image : new ol.style.Circle({
						radius : 6,
						fill : new ol.style.Fill({
							color : 'orange'
						})
					}),
					geometry : function(feature) {
						var geometryType =  feature.getGeometry().getType();
						var geometry = null;
						var coordinates = new Array();
						 
						switch(true){
							case geometryType.indexOf("Point") > -1:
								coordinates = feature.getGeometry().getCoordinates();
								geometry =  new ol.geom.Point(coordinates);
								break;
							case geometryType.indexOf("Circle") > -1:
								coordinates = feature.getGeometry().getCoordinates();
								geometry =  new ol.geom.Circle(coordinates);
								break;
							case geometryType.indexOf("MultiPolygon") > -1:
								coordinates = feature.getGeometry().getCoordinates()[0][0];
								geometry =  new ol.geom.MultiPoint(coordinates);
								break;
							case geometryType == "MultiLineString":
								coordinates = feature.getGeometry().getCoordinates()[0];
								geometry =  new ol.geom.MultiPoint(coordinates);
								break;
							case geometryType.indexOf("LineString") > -1:
								coordinates = feature.getGeometry().getCoordinates();
								geometry =  new ol.geom.MultiPoint(coordinates);
								break;
							default:
								coordinates = feature.getGeometry().getCoordinates()[0];
								geometry =  new ol.geom.Polygon(coordinates);
								break;
						}
						return geometry;
					}
				})
			];

			var select = new ol.interaction.Select({
				style : function(feature, resolution) {
					var zoom = _self.map.getView().getZoom();
					var scale;

					if (zoom == 9) {
						scale = 0.8;
					} else if (zoom == 8) {
						scale = 0.5;
					} else if (zoom == 7) {
						scale = 0.2;
					} else if (zoom == 6) {
						scale = 0.1;
					} else if (zoom == 5) {
						scale = 0.1;
					} else {
						return 0;
					} 
					 
					var style;
					var styles = [];
					if(resolution > 1.5){
						return vertexStyles;
					}else if(resolution <= 1.5 ){
						var id = feature.get("id");
						if (!id) id = feature.getId().split(".")[0];
						var image = "";
						if (style != null) styles.push(style);

						if (style != vertexStyles) {
							$.each(vertexStyles, function(){
								styles.push(this);
							});
						}
						return styles;
					} 
				},
				toggleCondition : ol.events.condition.singleClick
			});

			var modify = new ol.interaction.Modify({
				features : select.getFeatures(),
			});
			var multiSelect = new ol.interaction.Select({
				condition : ol.events.condition.singleClick,
				multi : true,
				layers : [_self.layer.drawReal],
				style : vertexStyles
			});

			var translate = new ol.interaction.Translate({
				  features: multiSelect.getFeatures()
			});

			var multiModify = new ol.interaction.Modify({
				features : multiSelect.getFeatures(),
			});

			$.each(_self.control, function(kind){
				$.each(this, function(name){
					var control;
					var opt = null;
					if (kind == "draw" || kind == "measure") {
						var typeNm = name.substring(0,1).toUpperCase() + name.substring(1);

						if (typeNm == "Polyline") {
							typeNm = "LineString";
						}else if (typeNm == "Circle" ) { 
							typeNm = "Circle";
						}else if (name == "square" ) { 
							typeNm = "Circle";
							opt = {
									geometryFunction : ol.interaction.Draw.createBox(4),
								};
						} else if (typeNm.indexOf("Draw") > -1) {
							typeNm = typeNm.replace("Draw", "");
						} else if (typeNm == "SearchPolygon" || typeNm == "SearchCircle") {
							typeNm = typeNm.replace("Search", "");
						}

						var source;
						var style;

						if (kind == "draw") {
							source = _self.layer[name.indexOf("draw") > -1 ? "draw" : name].getSource();
							if (name == "square" || name == "drawSquare") {
								typeNm = "Circle";
								opt = {
									geometryFunction : ol.interaction.Draw.createRegularPolygon(4),
								};
							}
						} else {
							style = measureStyle;
							source = _self.layer[kind].getSource();
						}
						var drawOpt = $.extend({}, {
							source : source,
							type : typeNm,
							style : style,
						}, opt);

						control = new ol.interaction.Draw(drawOpt);

							_self.valid.polygon = true;
						
							control.on("drawend", function(evt){
								  
								_self.valid.polygon = true; 	
								var geom = evt.feature.getGeometry();  
								if (geom instanceof ol.geom.Circle) {
									geom = ol.geom.Polygon.fromCircle(geom);
								}
								var jstsGeom = _self.getWktFromGeom(geom);  
								var reader = new jsts.io.WKTReader(); 
								var geom = reader.read(jstsGeom);
								
								if(!geom.isValid()){
									 alert(_self.message.failGeometry);  
									 _self.valid.polygon = false;
								 }   
						 	});  
					} else {
						if(name.indexOf("multi") >= 0){
							control = name == "multiSelect" ? multiSelect : multiModify;
							if (name == "multiSelect") {
								control = multiSelect;
							} else {
								control = multiModify;
								control.on("modifyend", function(e){
									e.features.forEach(function(ft){
										
									});
								});
							}
						}else{ 
							control = name == "select" ? select : modify;
							if (name == "select") {
								control = select;
							} else {
								control = modify;
							}
						}
					}
					 control.setActive(false);
					_self.control[kind][name] = control; 
					_self.map.addInteraction(_self.control[kind][name]);
				});
			});
		},
		setOverlayLayerTooltip : function(params) {
			
			this.overlay = $.extend({}, this.overlay, params);
			this.overlay.overlayTooltipLayer = new ol.Overlay({
				id: 'layer-tooltip',
				element: this.overlay.overlayTooltipElement,
				offset: [10, 0],
				positioning: 'bottom-left'
			});

			mapInit.map.addOverlay(this.overlay.overlayTooltipLayer); 
		}
	}
	window.MapInit = MapInit;
	window.name = "MapInit.js";
})(window, jQuery);