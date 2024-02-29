(function(window, $) {
	"use strict";
	var MapTheme = function(mapInit) {
		this._mapInit = mapInit;
		this.init(mapInit);
	};
	MapTheme.prototype = {
		render : false,
		properties : {
		},
		currentLayer: null,
		activeTheme:null,
		activeColor:null,
		sggList : null,
		mapEvt : {
			moveend : null,
		},
		init:function(mapInit){
			var _self = this;
			_self.map = mapInit.map;
			
			var moveend = function(evt){
				evt.preventDefault(); 
				_self.getThemeLayer();
				_self._mapInit.mapAction.reSizeZoomBar();
 			}  
			_self.mapEvt.moveend = moveend;
			_self._mapInit.map.getViewport().addEventListener('contextmenu', function (evt) {
				evt.preventDefault();
			});  
		},
		getCurrentLayer:function(){
				var _self = this;
				var layer;
				var zoom = _self._mapInit.map.getView().getZoom();
				if(zoom > 0 && zoom <=2){
					layer = mapInit.mapLayerMng.layers.wfs["sido"];
				}else if(2 < zoom && 4 >=zoom ){
					layer = mapInit.mapLayerMng.layers.wfs["sgg"];
				}else if(4 < zoom && 6 >=zoom ){ 
					layer = mapInit.mapLayerMng.getLayerById('clusterLyr');
					if($.isNullString(layer)){
						_search.getClusterData('cluster',_self.activeColor);
					}
				}else{
					_search.getClusterData('point',_self.activeColor);
				}
			return layer;
		},
		setToolbarActive:function(){
			var _self = this;
			var color = this.getIsActiveMenu();
			_self.activeColor = color;
			_self.getThemeLayer();   
			
		},
		getIsActiveMenu:function(){
			var activeMenu = "";
			$('.countSliderBox li.active').each(function(e,k){
				activeMenu = $(k).attr('data-color');
			});
			return activeMenu;
		},
		themeMapLegend:function(legendArr, legendCnt,type){
			//getAndSetClassesFromData(legendArr, legendCnt, "method_SD",type);
			getAndSetClassesFromData(legendArr, legendCnt, "method_Q",type);
		},
		themeMap:function(themeMapKind, layer){
			this.activeTheme = 	themeMapKind;	
			layer.setStyle(geoSetStyle);
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

		setToolbarMapLoader1 : function () { 
			
			var _self = this;
			var collection ="tb_analysis_info";
			var dayType = "stdr_dt";  
			var startDt = $('#startDate').val().replace(/[.]/g,"");
			var endDt = $('#endDate').val().replace(/[.]/g,""); 
			var chekPeriod = $('input:radio[name=dRadio]:checked').val(); //공고일, 공사기간 
			var radioVal = "";
			var order = "stdr_dt desc"
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
			var data = new Object(); 
				data.startDt = startDt;  //필수
				data.endDt = endDt;      //필수
				data.order= order;
				data.searchKeyword = keyword;
				data.gbn = "pivot";
			    data.pivot = "sido_cd,sido_nm";     
			    
			    data.theme = "legend";
			    data.mapGbn = "sido";
			    data.joinKey = "sido_cd";
			    data.collection = collection;
				
				var keyword = "*:*";   
		        var listCnt = '17';
		        var startPage = "0";
		        
		        data.keyword = keyword;
		        data.list_cnt = listCnt;
		        data.curr_page = startPage;
		        var returnDataArray = new Array();
		        
		        var url ="/themeMapSido";
				var searchData = $.stringify([data]);
				$.rcicSolrMapAjax(url, searchData ,function(res) {
			    		returnDataArray.push(res.result);
				    	returnDataArray.push(res.sidoList);
				    	_self.makeLayerSido(returnDataArray,'toolbar1');
				    	//_self.setToolbarMapLoader1Sgg();
		        },false); 
		},
		//툴바 1 시군구 조회
		setToolbarMapLoader1Sgg : function () {
			
			var _self = this;
			var collection ="tb_analysis_info";
			var dayType = "stdr_dt";  
			var startDt = $('#startDate').val().replace(/[.]/g,"");
			var endDt = $('#endDate').val().replace(/[.]/g,""); 
			var chekPeriod = $('input:radio[name=dRadio]:checked').val(); //공고일, 공사기간 
			var radioVal = "";
			var order = "stdr_dt desc"
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
			var data = new Object(); 
				data.startDt = startDt;  
				data.endDt = endDt;      
				data.order= order;
				data.searchKeyword = keyword;
				data.gbn = "pivot";
			    data.pivot = "sgg_cd,sgg_nm";     
			    
			    data.theme = "legend";
			    data.mapGbn = "sgg";
			    data.joinKey = "sgg_cd";
			    data.collection = collection;
				
				var keyword = "*:*";   
		        var listCnt = '255';
		        var startPage = "0";
		        
		        data.keyword = keyword;
		        data.list_cnt = listCnt;
		        data.curr_page = startPage;
		        var returnDataArray = new Array();
		        
		        var url ="/themeMapSgg";	 
				var searchData = $.stringify([data]);
				$.rcicSolrMapAjax(url, searchData ,function(res) {
			    		returnDataArray.push(res.result);
				    	returnDataArray.push(res.sggList);
				    	_self.makeLayerSgg(returnDataArray,'toolbar1');
		        },false); 
		},
		//툴바 2 시도 조회 
		setToolbarMapLoader2 : function () {

			var _self = this;
			var collection ="tb_analysis_info";
			var dayType = "stdr_dt";  
			var startDt = $('#startDate').val().replace(/[.]/g,"");
			var endDt = $('#endDate').val().replace(/[.]/g,""); 
			var chekPeriod = $('input:radio[name=dRadio]:checked').val(); //공고일, 공사기간 
			var radioVal = "";
			var order = "stdr_dt desc"
			var keyword = "";	
			
			if(chekPeriod == "bidntcedt"){  
				radioVal = 'bidntcedt';	//공고일
				order = "bidntcedt desc"
				keyword = "bidntcedt:["+ startDt + " TO "+endDt+"] AND const_road_clss:161"
			}else if(chekPeriod == "stdr_dt"){ 	// 공사기간  
				radioVal = 'stdr_dt'; 	//공사기간  
				order = "stdr_dt desc"
				keyword = "stdr_dt:["+startDt+ " TO " +endDt+"] OR forecast_end_dt:["+startDt+" TO "+endDt+"] AND const_road_clss:161"
			}else{   
				radioVal = 'thtm_ccmplt_date'; 	//공사기간  
				order = "thtm_ccmplt_date desc"
				//keyword = "cbgn_date:["+startDt+ " TO " +endDt+"] OR thtm_ccmplt_date:["+startDt+" TO "+endDt+"] AND const_road_clss:161"
				keyword = "thtm_ccmplt_date:["+startDt+" TO "+endDt+"]"
			} 
			var data = new Object(); 
				data.startDt = startDt;  //필수
				data.endDt = endDt;      //필수
				data.order= order;
				data.searchKeyword = keyword;
				data.gbn = "pivot";
			    data.pivot = "sido_cd,sido_nm";
			    
			    data.theme = "legend";
			    data.mapGbn = "sido";
			    data.joinKey = "sido_cd";
			    data.collection = collection;
				
				var keyword = "*:*";   
			    var listCnt = '17';
			    var startPage = "0";
			    
			    data.keyword = keyword;
			    data.list_cnt = listCnt;
			    data.curr_page = startPage;
			    var returnDataArray = new Array();
			    
			    var url ="/themeMapSido";
				var searchData = $.stringify([data]);
				$.rcicSolrMapAjax(url, searchData ,function(res) {
			    		returnDataArray.push(res.result);
				    	returnDataArray.push(res.sidoList);
				    	_self.makeLayerSido(returnDataArray,'toolbar2');
			    },false); 

		},
		setToolbarMapLoader2Sgg : function () {
			
			var _self = this;
			var collection ="tb_analysis_info";
			var dayType = "stdr_dt";  
			var startDt = $('#startDate').val().replace(/[.]/g,"");
			var endDt = $('#endDate').val().replace(/[.]/g,""); 
			var chekPeriod = $('input:radio[name=dRadio]:checked').val();  
			var radioVal = "";
			var order = "stdr_dt desc"
			var keyword = "";	
			
			if(chekPeriod == "bidntcedt"){  
				radioVal = 'bidntcedt';	//공고일
				order = "bidntcedt desc"
				keyword = "bidntcedt:["+ startDt + " TO "+endDt+"] AND const_road_clss:161"
			}else if(chekPeriod == "stdr_dt"){ 	// 공사기간  
				radioVal = 'stdr_dt'; 	//공사기간  
				order = "stdr_dt desc"
				keyword = "stdr_dt:["+startDt+ " TO " +endDt+"] OR forecast_end_dt:["+startDt+" TO "+endDt+"] AND const_road_clss:161"
			}else{   
				radioVal = 'thtm_ccmplt_date'; 	//공사기간  
				order = "thtm_ccmplt_date desc"
				//keyword = "cbgn_date:["+startDt+ " TO " +endDt+"] OR thtm_ccmplt_date:["+startDt+" TO "+endDt+"] AND const_road_clss:161"
				keyword = "thtm_ccmplt_date:["+startDt+" TO "+endDt+"]"
			} 
			var data = new Object(); 
				data.startDt = startDt;  //필수
				data.endDt = endDt;      //필수
				data.order= order;
				data.searchKeyword = keyword; 
				data.gbn = "pivot";
			    data.pivot = "sgg_cd,sgg_nm";  
			    
			    data.theme = "legend";
			    data.mapGbn = "sgg";
			    data.joinKey = "sgg_cd";
			    data.collection = collection;
				
				var keyword = "*:*";   
		        var listCnt = '255';
		        var startPage = "0";
		        var returnDataArray = new Array();
		        
		        var url ="/themeMapSgg";	 
				var searchData = $.stringify([data]);
				$.rcicSolrMapAjax(url, searchData ,function(res) {
			    		returnDataArray.push(res.result);
				    	returnDataArray.push(res.sggList);
				    	_self.makeLayerSgg(returnDataArray,'toolbar2');
		        },false); 
		},
		setToolbarMapLoader3 : function () {
			
			
			var _self = this;
			var collection ="tb_analysis_info";
			var dayType = "stdr_dt";  
			var startDt = $('#startDate').val().replace(/[.]/g,"");
			var endDt = $('#endDate').val().replace(/[.]/g,""); 
			var chekPeriod = $('input:radio[name=dRadio]:checked').val(); //공고일, 공사기간 
			var radioVal = "";
			var order = "stdr_dt desc"
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
			var data = new Object(); 
				data.startDt = startDt;  //필수
				data.endDt = endDt;      //필수
				data.order= order;
				data.searchKeyword = keyword;
				data.gbn = "pivot";
			    data.pivot = "sido_cd,sido_nm";     
			    data.roadTypeCd = "19 24 36 37 39 47 48";  
			    
			    data.theme = "legend";
			    data.mapGbn = "sido";
			    data.joinKey = "sido_cd";
			    data.collection = collection;
				
				var keyword = "*:*";   
			    var listCnt = '17';
			    var startPage = "0";
			    
			    data.keyword = keyword;
			    data.list_cnt = listCnt;
			    data.curr_page = startPage;
			    var returnDataArray = new Array();
			    
			    var url ="/themeMapSido";
				var searchData = $.stringify([data]);
				$.rcicSolrMapAjax(url, searchData ,function(res) {
			    		returnDataArray.push(res.result);
				    	returnDataArray.push(res.sidoList);
				    	_self.makeLayerSido(returnDataArray,'toolbar3');
			    },false); 
		},
		setToolbarMapLoader3Sgg : function () {
			
			var _self = this;
			var collection ="tb_analysis_info";
			var dayType = "stdr_dt";  
			var startDt = $('#startDate').val().replace(/[.]/g,"");
			var endDt = $('#endDate').val().replace(/[.]/g,""); 
			var chekPeriod = $('input:radio[name=dRadio]:checked').val();  
			var radioVal = "";
			var order = "stdr_dt desc"
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
			var data = new Object(); 
				data.startDt = startDt;  //필수
				data.endDt = endDt;      //필수
				data.order= order;
				data.searchKeyword = keyword; 
				data.gbn = "pivot";
			    data.pivot = "sgg_cd,sgg_nm";
			    data.roadTypeCd = "19 24 36 37 39 47 48";
			    
			    data.theme = "legend";
			    data.mapGbn = "sgg";
			    data.joinKey = "sgg_cd";
			    data.collection = collection;
				
				var keyword = "*:*";   
		        var listCnt = '255';
		        var startPage = "0";
		        var returnDataArray = new Array();
		        
		        var url ="/themeMapSgg";	 
				var searchData = $.stringify([data]);
				$.rcicSolrMapAjax(url, searchData ,function(res) {
			    		returnDataArray.push(res.result);
				    	returnDataArray.push(res.sggList);
				    	_self.makeLayerSgg(returnDataArray,'toolbar3');
		        },false); 
		},
		setToolbarMapLoader4 : function () {
			
			var _self = this;
			var collection ="tb_analysis_info";
			var dayType = "stdr_dt";  
			var startDt = $('#startDate').val().replace(/[.]/g,"");
			var endDt = $('#endDate').val().replace(/[.]/g,""); 
			var chekPeriod = $('input:radio[name=dRadio]:checked').val(); //공고일, 공사기간 
			var radioVal = "";
			var order = "stdr_dt desc"
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
			var data = new Object(); 
				data.startDt = startDt;  //필수
				data.endDt = endDt;      //필수
				data.order= order;
				data.searchKeyword = keyword;
				data.gbn = "pivot";
			    data.pivot = "sido_cd,sido_nm";     
			    data.facTypeCd = "*:*";
			    
			    data.theme = "legend";
			    data.mapGbn = "sido";
			    data.joinKey = "sido_cd";
			    data.collection = collection;
				
				var keyword = "*:*";   
			    var listCnt = '17';
			    var startPage = "0";
			    
			    data.keyword = keyword;
			    data.list_cnt = listCnt;
			    data.curr_page = startPage;
			    var returnDataArray = new Array();
			    
			    var url ="/themeMapSido";
				var searchData = $.stringify([data]);
				$.rcicSolrMapAjax(url, searchData ,function(res) {
			    		returnDataArray.push(res.result);
				    	returnDataArray.push(res.sidoList);
				    	_self.makeLayerSido(returnDataArray,'toolbar4');
			    },false);
		},

		setToolbarMapLoader4Sgg : function () {
			var _self = this;
			var collection ="tb_analysis_info";
			var dayType = "stdr_dt";  
			var startDt = $('#startDate').val().replace(/[.]/g,"");
			var endDt = $('#endDate').val().replace(/[.]/g,""); 
			var chekPeriod = $('input:radio[name=dRadio]:checked').val();  
			var radioVal = "";
			var order = "stdr_dt desc"
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
			var data = new Object(); 
				data.startDt = startDt;  //필수
				data.endDt = endDt;      //필수
				data.order= order;
				data.searchKeyword = keyword; 
				data.gbn = "pivot";
			    data.pivot = "sgg_cd,sgg_nm";
			    data.facTypeCd = "*:*";
			    
			    data.theme = "legend";
			    data.mapGbn = "sgg";
			    data.joinKey = "sgg_cd";
			    data.collection = collection;
				
				var keyword = "*:*";   
		        var listCnt = '255';
		        var startPage = "0";
		        var returnDataArray = new Array();
		        
		        var url ="/themeMapSgg";	 
				var searchData = $.stringify([data]);
				$.rcicSolrMapAjax(url, searchData ,function(res) {
			    		returnDataArray.push(res.result);
				    	returnDataArray.push(res.sggList);
				    	_self.makeLayerSgg(returnDataArray,'toolbar4');
		        },false); 
			
		},
		setToolbarMapLoader5 : function () {
			
			var _self = this;
			var collection ="tb_analysis_info";
			var dayType = "stdr_dt";  
			var chekPeriod = $('input:radio[name=dRadio]:checked').val(); //공고일, 공사기간 
			var radioVal = "";
			var order = "stdr_dt desc"
			var keyword = "";	
			
			/*var startDt = $.calPeriod('pre',1,'month').replace(/[-]/g,"");
			var endDt = $.toDayStr(); */
			var startDt = $.toDayStr();
			var endDt = $.calPeriod('aft',1,'month').replace(/[-]/g,"");
			var authNo = $('#authNo').val();
			
				
			var data = new Object(); 
				if(authNo != "1"){
					data.searchKeyword = "forecast_end_dt:["+ startDt + " TO "+ endDt +"] AND loc_prdt_reli_cd:[2 TO 3]"
				}else{
					data.searchKeyword = "forecast_end_dt:["+ startDt + " TO "+ endDt +"]"
				}
				//data.searchKeyword = "forecast_end_dt:["+ startDt + " TO "+ endDt +"]"
				data.gbn = "pivot";
			    data.pivot = "sido_cd,sido_nm";
			
				data.startDt = startDt;  //필수
				data.endDt = endDt;      //필수
				data.order= order;
				data.gbn = "pivot";
			    data.pivot = "sido_cd,sido_nm";     
			    
			    data.theme = "legend";
			    data.mapGbn = "sido";
			    data.joinKey = "sido_cd";
			    data.collection = collection;
				
				var keyword = "*:*";   
			    var listCnt = '17';
			    var startPage = "0";
			    
			    data.list_cnt = listCnt; 
			    data.curr_page = startPage;
			    var returnDataArray = new Array();
			    
			    var url ="/themeMapSido";
				var searchData = $.stringify([data]);
				$.rcicSolrMapAjax(url, searchData ,function(res) {
			    		returnDataArray.push(res.result);
				    	returnDataArray.push(res.sidoList);
				    	_self.makeLayerSido(returnDataArray,'toolbar5');
			    },false);
		},
		setToolbarMapLoader5Sgg : function () {
			var _self = this;
			var collection ="tb_analysis_info";
			var dayType = "stdr_dt";  
			/*var startDt = $.calPeriod('pre',1,'month').replace(/[-]/g,"");
			var endDt = $.toDayStr();*/
			var startDt = $.toDayStr();
			var endDt = $.calPeriod('aft',1,'month').replace(/[-]/g,"");
			var chekPeriod = $('input:radio[name=dRadio]:checked').val(); //공고일, 공사기간 
			var radioVal = "";
			var order = "forecast_end_dt desc"
			var authNo = $('#authNo').val();
			
			var data = new Object(); 
				if(authNo != "1"){
					data.searchKeyword = "forecast_end_dt:["+ startDt + " TO "+ endDt +"] AND loc_prdt_reli_cd:[2 TO 3]"
				}else{
					data.searchKeyword = "forecast_end_dt:["+ startDt + " TO "+ endDt +"]"
				}
				data.startDt = startDt;  //필수
				data.endDt = endDt;      //필수
				data.order= order;
				data.searchKeyword = "forecast_end_dt:["+ startDt + " TO "+ endDt +"]"
				data.gbn = "pivot";
			    data.pivot = "sgg_cd,sgg_nm";     
			    
			    //data.bbox1 = parseFloat(mapInit.map.getView().calculateExtent(mapInit.map.getSize())[0]);
			    //data.bbox2 = parseFloat(mapInit.map.getView().calculateExtent(mapInit.map.getSize())[1]);
			    //data.bbox3 = parseFloat(mapInit.map.getView().calculateExtent(mapInit.map.getSize())[2]);
			    //data.bbox4 = parseFloat(mapInit.map.getView().calculateExtent(mapInit.map.getSize())[3]);
			    
			    data.theme = "legend";
			    data.mapGbn = "sgg";
			    data.joinKey = "sgg_cd";
			    data.collection = collection;
				
				var keyword = "*:*";   
		        var listCnt = '255';
		        var startPage = "0";
		        var returnDataArray = new Array();
		        
		        var url ="/themeMapSgg";	 
				var searchData = $.stringify([data]);
				$.rcicSolrMapAjax(url, searchData ,function(res) {
			    		returnDataArray.push(res.result);
				    	returnDataArray.push(res.sggList);
				    	_self.makeLayerSgg(returnDataArray,'toolbar5');
		        },false); 
		},
		makeLayerSido:function(datas, type){  
			var geojsonArray = new Array();
			var valueArray = new Array(); 
			 
			if($.isNullString(datas))return;
			if($.isNullString(datas[0].list))return;
		 	var countList = datas[0].list;
		 	var data = datas[1];
		 
		 	for(var i in data){
				var feature = (new ol.format.GeoJSON({})).readFeature(data[i].geo_json);  
				  var id = data[i].sido_cd;
				  for(var j in countList){ 
					  if(id==countList[j].value){
						  var dataPivot = countList[j].pivot;
							for(var p in dataPivot){
								var s  = dataPivot[p];
								feature.set("name",s.value);		 
							}
						  feature.set("count",countList[j].valueCount);
						  feature.set("type",type); 
						  valueArray.push(countList[j].valueCount);
						  geojsonArray.push(feature);  
						  break;
					  } 
				  } 
			}   
		 	
			var layer = mapInit.mapLayerMng.layers.wfs["sido"];
			layer.getSource().clear();    
			layer.getSource().addFeatures(geojsonArray);
			
			mapInit.mapTheme.themeMapLegend(valueArray,5,type);
			mapInit.mapTheme.themeMap("legend",layer);
			
		},
		makeLayerSgg:function(datas,type){  
			
			var geojsonArray = new Array();
			var valueArray = new Array(); 
			 
			if($.isNullString(datas))return;
			if($.isNullString(datas[0].list))return;
		 	var countList = datas[0].list;
		 	var data = datas[1];
		 
		 	for(var i in data){
				var feature = (new ol.format.GeoJSON({})).readFeature(data[i].geo_json);  
				  var id = data[i].sgg_cd;
				  for(var j in countList){ 
					  if(id==countList[j].value){
						  var dataPivot = countList[j].pivot;
							for(var p in dataPivot){
								var s  = dataPivot[p];
								feature.set("name",s.value);		
							}
						  feature.set("count",countList[j].valueCount);
						  feature.set("type",type); 
						  valueArray.push(countList[j].valueCount);
						  geojsonArray.push(feature);  
						  break;
					  } 
				  } 
			} 
			var layer = mapInit.mapLayerMng.layers.wfs["sgg"];
			layer.getSource().clear();    
			layer.getSource().addFeatures(geojsonArray);
			//mapInit.mapTheme.themeMap("legend",layer);
			
			mapInit.mapTheme.themeMapLegend(valueArray,5,type);
			mapInit.mapTheme.themeMap("legend",layer);
		},
		getThemeLayer:function(){
		
			var _self = this; 
			var zoom = _self._mapInit.map.getView().getZoom();
				_self.activeTheme = "legend";
				
				var layer = _self.getCurrentLayer();
				
				if($.isNullString(layer)){
					return;
				}else{
					
					if(!$.isNullString(_self.activeColor)){
						layer.setVisible(true);						
					}
					if(layer.get("id")=="clusterLyr"){
						_search.getClusterData('cluster',_self.activeColor);
					}
				}
				
				if(_self.activeColor=="blue"){ 
					_self.setToolbarMapLoader1();
					if(layer.get("id")=="sgg") {
						_self.setToolbarMapLoader1Sgg();						
					}
				}else if(_self.activeColor=="green"){
					_self.setToolbarMapLoader2();
					if(layer.get("id")=="sgg") {
						_self.setToolbarMapLoader2Sgg();
					}
				}else if(_self.activeColor=="yellow"){
					_self.setToolbarMapLoader3();
					if(layer.get("id")=="sgg") {
						_self.setToolbarMapLoader3Sgg();  
					}
				}else if(_self.activeColor=="pink"){
					_self.setToolbarMapLoader4();
					if(layer.get("id")=="sgg") {
						_self.setToolbarMapLoader4Sgg();
					}
				}else if(_self.activeColor=="purple"){
					_self.setToolbarMapLoader5();
					if(layer.get("id")=="sgg") {
						_self.setToolbarMapLoader5Sgg();
					}
				}else{
					layer = mapInit.mapLayerMng.getLayerById('clusterLyr');
					if(!$.isNullString(layer)){
						layer.setVisible(false);	
					}
				}
		}
	}
	window.MapTheme = MapTheme;
})(window, jQuery);