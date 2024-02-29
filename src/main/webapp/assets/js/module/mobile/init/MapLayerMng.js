
(function(window, $) {
	"use strict";

	var MapLayerMng = function(mapInit) {
		this._mapInit = mapInit;
	};
	
	MapLayerMng.prototype = {
		layers : {
			wms : {},
			wfs : {},
		}, 
		setWfsLayer : function(lyrName, params){
			var _self = this;
			var layerName = params.hasOwnProperty("layerName") ? params.layerName : lyrName;
			_self.layers.wfs[layerName] = new ol.layer.Vector({
				name: layerName,
				id: layerName,
				title : params.layerKorName,
				maxResolution : params.hasOwnProperty("maxResolution") ? params.maxResolution : 50,
				minResolution : params.hasOwnProperty("minResolution") ? params.minResolution : 0,
				source: new ol.source.Vector({
					loader: function(extent, resolution, projection) {
						_self.layers.wfs[layerName].getSource().clear(true);
						extent = ol.proj.transformExtent(extent,  _self._mapInit.crsCode, _self._mapInit.map.getView().getProjection().getCode());
						var tempData = null;
						var reqData =	{
								request: "GetFeature",
								version: "1.1.1",
								typename: "seoul:" + lyrName,
								outputFormat: "application/json"
						};
						if(!params.hasOwnProperty("cqlFilter")){
							tempData = {bbox: extent.join(",") + "," + _self._mapInit.map.getView().getProjection().getCode()}
						}else{
							tempData = {CQL_FILTER : "BBOX(XGEO,"+extent+ ",'" + _self._mapInit.map.getView().getProjection().getCode()+"') And " + params.cqlFilter}
						}
						$.ajax({
							url : _self._mapInit.config.noProxyWfs,
							dataType : "json",
							type: 'post',
							data :$.extend({}, reqData,tempData),
							success:function(response){
								var fs = (new ol.format.GeoJSON()).readFeatures(response, {
									dataProjection : _self._mapInit.map.getView().getProjection().getCode() ,
									featureProjection : _self._mapInit.crsCode
								});
								_self.layers.wfs[layerName].getSource().addFeatures(fs);
							},
							error: function (a) {
								console.log(a);
							},
						});
					},
					strategy: ol.loadingstrategy.bbox
				}),
				visible : params.visible,
				style : params.style
			});
			_self._mapInit.map.addLayer(this.layers.wfs[layerName]);
		},
		_addWmsLayer : function(layerId, params){
			
			var opacity=1.0;
			var layer = new ol.layer.Tile({
				kind : params.kind,
				title : params.layerKorName, 
				id : layerId,
				visible : params.visible,
				opacity:opacity,
				baseLayer: true,
				source : new ol.source.TileWMS({
					projection: params.projection,
					url : this._mapInit.config.mapUrl + this._mapInit.config.workspace+this._mapInit.config.noProxyWms,
					params : {
						LAYERS : layerId,
						VERSION : '1.1.0',
						QUERY_LAYERS: layerId,
						FORMAT : "image/png"
					}, 
					serverType : "geoserver"
				})
			});
			
			this.layers.wms[layerId] = layer;
			this._mapInit.map.addLayer(this.layers.wms[layerId]);
			
		},
		 
		_addWfsLayer : function(layerId, params){
			var _self = this;
			var opacity=1.0;
			var url = this._mapInit.config.mapUrl + this._mapInit.config.workspace+this._mapInit.config.noProxyWfs;
			var laySource;
			var layer = new ol.layer.Vector({
				  kind : 'wfs',
				  title : layerId, 
				  id : layerId,
				  visible : true,
				  opacity: 0.8, 
				  minResolution: params.minResolution,
				  maxResolution: params.maxResolution,
				  source : new ol.source.Vector({
				  }) 
				});
			this.layers.wfs[layerId] = layer;
			this._mapInit.map.addLayer(this.layers.wfs[layerId]);
			
		}, 
		getLayerById : function(id){
			var layers = this._mapInit.map.getLayers().getArray();
			var layer = null;
			$.each(layers, function(idx, lyr){
				if(lyr.get("id") == id) {
					layer = lyr;
					return false;
				}
			});
			return layer;
		},
		allHideLayer:function(){
			
			var _self=this;
				_self._mapInit.mapUiMng._overlayPopup.hide();
		},
        allLayerRemove : function(){
			var _self=this;
            var layers = _self._mapInit.map.getLayers().getArray();
            $.each(layers, function(idx, lyr){
            	if(lyr != null) {
            		if(lyr.get("kind") != undefined && lyr.get("kind") != "base") {
                        _self._mapInit.map.removeLayer(lyr);
                   }
				}
            });
        },
        layerRemoveById : function(layerNm){
			var _self=this;
            var layers = _self._mapInit.map.getLayers().getArray();
            $.each(layers, function(idx, lyr){ 
            	if(lyr != null) {
            		if(lyr.get("id") != undefined && lyr.get("id").match(layerNm)) {
                        _self._mapInit.map.removeLayer(lyr);
                   }
				}
            });
        },
        
        allTempLayerRemove : function(){
        	var arrLayer = [];
			var _self=this;
            var layers = _self._mapInit.map.getLayers().getArray();
            $.each(layers, function(idx, lyr){
	            if(lyr instanceof ol.layer.Vector){
	                if(lyr != null) {
	                    if(lyr.get("id").match("temp")) {
	                    	arrLayer.push(lyr);
	                   }
	                }
	            }
	        });;
	        
	        for (var i = 0; i < arrLayer.length; i++) {
	        	mapInit.map.removeLayer(arrLayer[i]);
	    	}
        }, 
        getCurrentOverlay:function(layerId){  
    		var _self = this;
    		var layers;  
        	_self._mapInit.map.getOverlays().forEach(function(layer){  
                if(layer.getId()==layerId){
                	layers = layer;
                	return false;
                }
            });
        	return layers;
    	},
        addBaseMapLayers : function(){
        	
			var _self = this;
				_self._mapInit.baseMapLayers = [];
			 
			var proxyBackground = _self._mapInit.config.proxyBackground;
			
			$.each(_self._mapInit.baseMap.layers, function(lyrName, lyr){
				
				var baseMapName = _self._mapInit.baseMap.name;
				var baseMapKorName = _self._mapInit.baseMap.korName;
				var tileGrid;
				var layer;
				
				if (baseMapName == "Naver" ) {
					tileGrid = new ol.tilegrid.TileGrid({
						extent : [ 90112, 1192896, 1990673, 2765760 ],
						tileSize : 256,
						resolutions : [ 4096, 2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25 ],
						minZoom : 1,
						crossOrigin: "Anonymous"
					});
				} else if (baseMapName == "Daum") {
					tileGrid = new ol.tilegrid.TileGrid({
						extent : [ (-30000 - 524288), (-60000 - 524288), (494288 + 524288), (988576 + 524288) ],
						origin : [ -30000, -60000 ],
						tileSize : 256,
						resolutions : [ 4096, 2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25 ],
						minZoom : 1,
						crossOrigin: "Anonymous"
					});
				} 
				
				layer = _self._setBaseMapLayer({
					layerName : baseMapName + "_" + lyrName,
					layerKorName : lyr.name,
					url : lyr.url,
					visible : lyr.visible,
					crsCode : _self._mapInit.baseMap.crsCode,
					kind : "base", 
					tileGrid : tileGrid,
					crossOrigin: "Anonymous"
				});
				
				var tileUrlFunction;
				var zRegEx = /\{z\}/g;
				var xRegEx = /\{x\}/g;
				var yRegEx = /\{y\}/g;
				var jRegEx = /\{j\}/g;
				var kRegEx = /\{k\}/g;
				
				
				if (baseMapName == "Daum") {
					 
					 tileUrlFunction = function(tileCoord, pixelRatio, projection) {   
						 
						var s = Math.floor(Math.random() * 4); 
						var z = this.tileGrid.getResolutions().length - tileCoord[0];
						var x = tileCoord[1].toString();
						var y = tileCoord[2].toString();
						return lyr.url.replace(xRegEx, x).replace(yRegEx, y).replace(zRegEx, z).replace("{0-3}", s);
					};

					layer.getSource().setTileUrlFunction(tileUrlFunction);

				} 
				_self._mapInit.baseMapLayers.push(layer);	
			});
  
			$.each(_self._mapInit.baseMapLayers, function(idx, lyr){
				_self._mapInit.map.getLayers().insertAt(idx, lyr);  
			});  
		},
		_setBaseMapLayer : function(params){
			
			var _self = this; 
			var baseMapLyr;
			
			if(params.layerName.indexOf("Daum")>-1){
				baseMapLyr = new ol.layer.Tile({
					kind : params.kind,
					title : params.layerKorName,
					id : params.layerName,
					visible : params.visible,
					source : new ol.source.XYZ({
						url : params.url,
						projection : params.crsCode,
						tileGrid : params.tileGrid,
					})  
				});
			}else{
				baseMapLyr = new ol.layer.Tile({
					kind : params.kind,
					title : params.layerKorName,
					id : params.layerName,
					visible : params.visible,
					source : new ol.source.XYZ({
						url : params.url,
						projection : params.crsCode,
						tileGrid : params.tileGrid,
						crossOrigin: "Anonymous"
					})
				});
			}
			
			return baseMapLyr;
		},
		addTempLayer : function(layerId, features, obj) {
			
			var _self = this;
			var layer = new ol.layer.Vector({
					title : layerId,
					id	: layerId,
					minResolution: !$.isNullString(obj.minResolution)?obj.minResolution:'0',
					maxResolution: !$.isNullString(obj.maxResolution)?obj.maxResolution:'1025', 
					source: new ol.source.Vector({
					}),
				}); 
			var type="";
				type = !$.isNullString(obj.type)?obj.type:"";
			
			for(var i in features){
				
				var anchor =  [0.5, 46];
				var feature = features[i];
				var geomType = feature.getGeometry().getType();
				//var img = '/assets/images/map/marker-icon.png' ;
				var img = '/assets/images/map/mcor_mark_on.png' ;
				
				if(null!= feature.get("loc_prdt_reli_cd")){
					if(feature.get("loc_prdt_reli_cd")){
						if(feature.get("loc_prdt_reli_cd")==1){
						  img = '/assets/images/map/mapicon_01.png' ;
				          anchor = [0.5, 150];         					
						}
					}					  
				}
				
				var scale = 1;
				if(type == "acc"){
					img ='/assets/images/map/cor_mark_off.png'
				}else if(type == "sns"){
					img ='/assets/images/map/twitter_mark.png'
					scale = 0.75;
				}
				
					var style="";
					switch (geomType) {
						case "Point":
							style = new ol.style.Style({
								image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
							        anchor: [0.5, 46],
							        anchorXUnits: 'fraction',
							        anchorYUnits: 'pixels',
							        src: img//"acc" ?'/assets/images/map/cor_mark_off.png' :'/assets/images/map/marker-icon.png'
							    }))
						});
						break;
						case "MultiPoint":
							style = new ol.style.Style({
								image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
							        anchor: [0.5, 46],
							        anchorXUnits: 'fraction',
							        anchorYUnits: 'pixels',
							        src: img//"acc" ?'/assets/images/map/cor_mark_off.png' :'/assets/images/map/marker-icon.png'
							    }))
						});
						break;
						
						case "Polygon":
							style = new ol.style.Style({
								fill : new ol.style.Fill({
									color : 'rgba(255, 255, 255, 0.0)'
								}),
								stroke : new ol.style.Stroke({
									color : 'rgba(255, 0, 0, 1)',
									width : 2
								}),
							});
							break;
						case "MultiPolygon":
							style = new ol.style.Style({
								fill : new ol.style.Fill({
									color : 'rgba(255, 255, 255, 0.0)'
								}),
								stroke : new ol.style.Stroke({
									color : 'rgba(255, 0, 0, 1)',
									width : 2
								}),
							});
							break;
						case "LineString":
							style = 
								new ol.style.Style({
									stroke: new ol.style.Stroke({
										color: 'rgba(255, 0, 0, 1)',
										width: 2
									})
								});
						break;
						case "MultiLineString":
							style =  
								[new ol.style.Style({
									stroke: new ol.style.Stroke({
										color: 'rgba(255, 0, 0, 1)',
										width: 4,
										pointRadius: 6
									})  
								})];
						break;
						default:
							break;
					}
					features[i].setStyle(style);
				    var oo = ol.extent.getCenter(features[i].getGeometry().getExtent());
			}
			 
			layer.getSource().addFeatures(features);  
			_self._mapInit.layer[layerId] = layer;
			_self._mapInit.map.addLayer(_self._mapInit.layer[layerId]);
		},
		addMainTempLayerT : function(layerId, features) {
			var _self = this;
			var layer = new ol.layer.Vector({
					title : layerId,
					id	: layerId,
					source: new ol.source.Vector({
					}),
				}); 
			  
			layer.getSource().addFeatures(features); 
			_self._mapInit.layer[layerId] = layer;
			_self._mapInit.map.addLayer(_self._mapInit.layer[layerId]);
			
			//  
			//_self._mapInit.map.addLayer(layer);
		},
		addMainTempLayer : function(layerId, features, legendArray) {
			
			var _self = this;
			var layer = new ol.layer.Vector({
					title : layerId,
					id	: layerId,
					source: new ol.source.Vector({
					}),
				}); 
			
			var legendArray = _.sortBy(legendArray,"count") ;
			
			var minValue =0;
			var maxValue =100;
			
			var sum = 0;
			var index = 0;
			//제일 작은수와 제일큰수를 뺀고 평균을 구한후 5등분함 
			for(var i=1; i<legendArray.length-1; i++ ){     
				 if($.isNullString(legendArray[i].count)){ 
					  continue;
				  } 
				sum+= legendArray[i].count;		 
				index++;
			}
			
			var avg = (sum/index);
			function getColor(d) {
			    return d > 20   ? '#800026' :
			           d > 1.0   ? '#BD0026' :
			           d > 0.9  ? '#E31A1C' :
			           d > 0.6   ? '#FC4E2A' :
			           d > 0.5   ? '#FD8D3C' :
			           d > 0.2   ? '#FEB24C' :
			           d > 0.1   ? '#FED976' :
			                       '#FFEDA0';
			}
			  
			for(var i in features){
				var feature = features[i];
				var count = feature.get("count"); 
				var color;

				if(isNaN(count)){
					count=0;  
				}
				color = getColor(avg/count);   
				var	style = new ol.style.Style({
						fill : new ol.style.Fill({
							color : color 
						}),
						stroke : new ol.style.Stroke({
							color : 'rgba(255, 255, 255, 0.5)', 
							width : 1
						})	
				});
				features[i].setStyle(style); 
			}
			layer.getSource().addFeatures(features);  
			_self._mapInit.map.addLayer(layer);
		},
		setTempLayer : function(layerId, feature) {
			
			var _self = this;
			
			$.each(_self._mapInit.layer, function(layerId){
				var layer;
				if(layerId == "measure" ) {
					layer = new ol.layer.Vector({
						source : new ol.source.Vector(),
						style : new ol.style.Style({
							fill : new ol.style.Fill({
								color : 'rgba(6, 54, 248, 0.1)' 
							}),
							stroke : new ol.style.Stroke({
								color : 'rgba(6, 54, 248, 1)',
								width : 2
							}),
							image : new ol.style.Circle({
								radius : 7,
								fill : new ol.style.Fill({
									color : '#ffcc33'
								})
							})
						})  
					});
				}else if(layerId == "cell") {
					layer = new ol.layer.Vector({
						source : new ol.source.Vector(),
						style : new ol.style.Style({
							fill : new ol.style.Fill({
								color : 'rgba(0, 255, 255, 0.4)',
								opacity: 0.5
							}),
							stroke : new ol.style.Stroke({
								color : 'rgba(0, 255, 255, 0.4)',
								width : 2, 
								opacity: 0.5
							}),
							image : new ol.style.Circle({
								radius : 7,
								fill : new ol.style.Fill({
									color : '#ffcc33'
								})
							})
						})  
					,zIndex:10    
					});
				}else if (layerId == "marker") {
					layer = new ol.layer.Vector({
						source : new ol.source.Vector(),
						style : new ol.style.Style({
							image: new ol.style.Icon({
								size: [256,256], 
								anchor: [0.5, 1.0],
								opacity: 1, 
								scale: 0.3,
								src: '/assets/images/map/marker.png'  
							})
						})
					});
				}else if(layerId == "searchCell") {
					
					layer = new ol.layer.Vector({
						source : new ol.source.Vector(),
						style : new ol.style.Style({
							stroke : new ol.style.Stroke({ 
								color : 'rgba(6, 54, 248, 1)',  
								width : 2, 
								opacity: 0.5
							}), 
							fill : new ol.style.Fill({
								color : 'rgba(0, 255, 255, 0.4)',
								opacity: 0.5
							}),
							image : new ol.style.Circle({
								radius : 7,
								fill : new ol.style.Fill({
									color : '#ffcc33'
								})
							})
						})
					,zIndex:11 
					});
				}else {
					layer = new ol.layer.Vector({
						title : layerId,
						id	: layerId,
						source: new ol.source.Vector(),
					});
				}
				_self._mapInit.layer[layerId] = layer;
				_self._mapInit.map.addLayer(_self._mapInit.layer[layerId]);
			});
		},
		setTempLayerNoStyle : function(layerId, feature) {
			
			var _self = this;
			var layer = new ol.layer.Vector({
					title : layerId,
					id	: layerId,
					source: new ol.source.Vector(),
				});
			
				layer.getSource().addFeature(feature);
				_self._mapInit.map.addLayer(layer);
		},
		setVectorTileLayer : function(layerId) {
			var vectorLayer = new ol.layer.VectorTile({
				id : layerId,
				visible : true,
				opacity:1,
				source : new ol.source.VectorTile({
					projection: this._mapInit.map.getView().getProjection().getCode(),
					url : this._mapInit.config.mapUrl + this._mapInit.config.workspace+this._mapInit.config.noProxyWms,
					params : {
						LAYERS : layerId,
						VERSION : '1.1.0',
						QUERY_LAYERS: layerId,
						FORMAT : "image/png"
					}, 
					serverType : "geoserver"
				})
			});
			_self._mapInit.map.addLayer(vectorLayer);
		}, 
		getStyles:function(feature){

			 
			//if($.isNullString(feature.get('features')))return;
			var f = feature.get('features');
			
			
			for(var i in f){
				var size = f[i].get('size');
				var style = GL.styleCache[size];
				if (!style)
				{	var color = size>25 ? "248, 128, 0" : size>8 ? "248, 192, 0" : "128, 192, 64";
					var radius = Math.max(8, Math.min(size*0.75, 20));
					style = GL.styleCache[size] =
						[ new ol.style.Style(
							{	image: new ol.style.Circle(
								{	radius: radius+4,
									stroke: new ol.style.Stroke(
									{	color: "rgba("+color+",0.3)", 
										width: 7
									})
								})
							}),
							new ol.style.Style(
							{	image: new ol.style.Circle(
								{	radius: radius,
									fill: new ol.style.Fill(
									{	color:"rgba("+color+",0.6)"
									})
								}),
								text: new ol.style.Text(
								{	text: size.toString(),
									fill: new ol.style.Fill(
									{	color: '#000'
									})
								})
							})
						];
				}
				return style;	
			}
		},	 
		addRcicLayers : function(){ 
			var _self = this;
			_self._mapInit.baseCellLayers = [];
			$.each(MapRcicMng.layer.wms, function(k, v){
				_self._addWmsLayer(k, v);
			});
			$.each(MapRcicMng.layer.wfs, function(k, v){
				_self._addWfsLayer(k, v);
			});
		},
		removeTempLayer:function(layerId){
			var _self = this;
			var layer = _self.getLayerById(layerId);  
			_self._mapInit.map.removeLayer(layer);
		},

	setClusterLayer:function(layerId, features){
		if(features==null)return;
		if(features.length <= 0)return;
		var _self = this;
		var map = this._mapInit.map; 
			var clusterSource=new ol.source.Cluster({
				    distance: 10,           
				    source: new ol.source.Vector()  
			 });
			
			clusterSource.getSource().clear();
			//if($.isNullString(feature.get('features')))return;
			var f = features; 
			for(var i in f){
				var size = f[i].get('size');
				var style = GL.styleCache[size];  
				if (!style)
				{	var color = size>25 ? "248, 128, 0" : size>8 ? "248, 192, 0" : "128, 192, 64";
					var radius = Math.max(8, Math.min(size*0.75, 20));
					style = GL.styleCache[size] =
						[ new ol.style.Style(
							{	image: new ol.style.Circle(
								{	radius: radius+4,
									stroke: new ol.style.Stroke(
									{	color: "rgba("+color+",0.3)", 
										width: 7
									})
								})
							}),
							new ol.style.Style(
							{	image: new ol.style.Circle(
								{	radius: radius,
									fill: new ol.style.Fill(
									{	color:"rgba("+color+",0.6)"
									})
								}),
								text: new ol.style.Text(
								{	text: size.toString(),
									fill: new ol.style.Fill(
									{	color: '#000'
									})
								})
							})
						];
				}
				f[i].setStyle(style);
			} 
			if(features.length>0){
				clusterSource.getSource().addFeatures(features);
			}
		  var layer = new ol.layer.AnimatedCluster({
			    id :  layerId,
			    name: layerId,
			    source: clusterSource,
			    animationDuration: 700,
			    style: _self.getStyles,  
			    minResolution: 31,
			    maxResolution: 65, 
						
			  });
	  		mapInit.map.addLayer(layer);
		}, 
	},
	window.MapLayerMng = MapLayerMng;
	window.name = "MapLayerMng.js";
})(window, jQuery);