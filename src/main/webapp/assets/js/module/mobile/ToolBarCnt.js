
(function(window, $) {
	"use strict";

	var ToolBarCnt ={
		/**
		 * 진행공사 건수 조회
		 * */
		setToolbar1 : function (currPage,collection,gbn) {
			
			var _self = this;
			if($.isNullString(currPage)){
				currPage = "1";
			} 
			
			var listCnt = "5";
			var startPage = String((parseInt(currPage)-1)*parseInt(listCnt));
			var startDt = $('#startDate').val().replace(/[.]/g,"");
			var endDt = $('#endDate').val().replace(/[.]/g,""); 
			var chekPeriod = $('input:radio[name=dRadio]:checked').val(); //공고일, 공사기간 
			var collection ="tb_analysis_info";
			
			var radioVal = "";
			var keyword = "";
			var order = "stdr_dt desc"
			var keyword = "";	
			var authNo = $('#authNo').val();
				
			if(chekPeriod == "bidntcedt"){  
				radioVal = 'bidntcedt';	//공고일
				order = "bidntcedt desc"
				keyword = "bidntcedt:["+ startDt + " TO "+endDt+"]"
			}else if(chekPeriod == "stdr_dt"){  
				radioVal = 'stdr_dt'; 	//공사기간  
				order = "bidntcedt desc"
				keyword = "forecast_st_dt:["+startDt+ " TO " +endDt+"] OR forecast_end_dt:["+startDt+" TO "+endDt+"]"
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
				data.searchKeyword = keyword;//radioVal+":["+ data.startDt + " TO "+data.endDt+"]"	
				data.prdtReliCd = "";
			    data.authNo = authNo;
			    data.prdtReliChk = "Y";
				//console.log(data);
			_commonSearch.getSearchList(startPage, listCnt, data, collection
					, function(response){  
					   var totalCnt = response.totalCnt;
					   $("#toolbar1").text($.number(totalCnt)+"건"); 
				},false);      
		},
		/**
		 * 국도공사 건수 조회
		 * */	
		setToolbar2 : function (currPage) {
		
			var _self = this;
			if($.isNullString(currPage)){
				currPage = "1";
			} 
			
			var listCnt = "5";
			var startPage = String((parseInt(currPage)-1)*parseInt(listCnt));
			var startDt = $('#startDate').val().replace(/[.]/g,"");
			var endDt = $('#endDate').val().replace(/[.]/g,""); 
			var chekPeriod = $('input:radio[name=dRadio]:checked').val(); //공고일, 공사기간 
			var collection ="tb_analysis_info";
			var radioVal = "";
			var order = "stdr_dt desc"
			var keyword = "";	
			var authNo = $('#authNo').val();
			
			if(chekPeriod == "bidntcedt"){  
				radioVal = 'bidntcedt';	//공고일
				order = "bidntcedt desc"
				keyword = "bidntcedt:["+ startDt + " TO "+endDt+"] AND const_road_clss:161"
			}else if(chekPeriod == "stdr_dt"){ 	// 공사기간  
				radioVal = 'stdr_dt'; 	//공사기간  
				order = "bidntcedt desc"
				keyword = "forecast_st_dt:["+startDt+ " TO " +endDt+"] OR forecast_end_dt:["+startDt+" TO "+endDt+"] AND const_road_clss:161"
			}else{
				radioVal = 'thtm_ccmplt_date'; 	//공사기간  
				order = "thtm_ccmplt_date desc"
				//keyword = "cbgn_date:["+startDt+ " TO " +endDt+"] OR thtm_ccmplt_date:["+startDt+" TO "+endDt+"] AND const_road_clss:161"
				keyword = "thtm_ccmplt_date:["+startDt+" TO "+endDt+"] AND const_road_clss:161"
			}
			
			if($("#authNo").val() != "1"){
				keyword = keyword + " AND (loc_prdt_reli_cd:(3) OR loc_prdt_reli_cd:(2))";
			}
			
			var data = new Object();
				data.startDt = startDt;  //필수
				data.endDt = endDt;      //필수
				data.order= order;
				data.searchKeyword = keyword;
				data.prdtReliCd = "";
			    data.authNo = authNo;
			    data.prdtReliChk = "Y";
				//data.searchKeyword = radioVal+":["+ data.startDt + " TO "+data.endDt+"] AND const_road_clss:161"
			
			_commonSearch.getSearchList(startPage, listCnt, data, collection
					, function(response){  
					   var totalCnt = response.totalCnt;
					   $("#toolbar2").text($.number(totalCnt)+"건");
				},false);       
		
		},
		/**
		 * 도로개설 건수 조회
		 * */	
		setToolbar3 : function (currPage) {
		
			var _self = this;
			var collection ="tb_analysis_info";
			var dayType = "stdr_dt";  
			      
			var startDt = $('#startDate').val().replace(/[.]/g,"");
			var endDt = $('#endDate').val().replace(/[.]/g,""); 
			var chekPeriod = $('input:radio[name=dRadio]:checked').val(); //공고일, 공사기간 
			var radioVal = "";
			var order = "stdr_dt desc"
			var keyword = "";	
			var authNo = $('#authNo').val();
			
			if(chekPeriod == "bidntcedt"){  
				radioVal = 'bidntcedt';	//공고일
				order = "bidntcedt desc"
				keyword = "bidntcedt:["+ startDt + " TO "+endDt+"]"
			}else if(chekPeriod == "stdr_dt"){ 	// 공사기간 
				radioVal = 'stdr_dt'; 	//공사기간  
				order = "bidntcedt desc"
				keyword = "forecast_st_dt:["+startDt+ " TO " +endDt+"] OR forecast_end_dt:["+startDt+" TO "+endDt+"]"
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
			    data.prdtReliCd = "";
			    data.authNo = authNo;
			    data.prdtReliChk = "Y";
			    //data.searchKeyword = radioVal+":["+ data.startDt + " TO "+data.endDt+"] AND road_ty_nm:('도로조성' '도로변경'  '도로이설' '시설물조성' '도로개설' '개설공사' '배후도로')"
			    
			    var sidoDataList ={};
				_commonSearch.getSearchCount(data, collection, function(response){  
					var sumCnt = 0;
					for(var j in response.result){ 
						 sumCnt+= response.result[j].valueCount;
					}
					
					 $("#toolbar3").text($.number(sumCnt)+"건");
				});
		},
		/**
		 * 시설공사 건수 조회
		 * */	
		setToolbar4 : function (currPage) {
		
			var _self = this;
			var collection ="tb_analysis_info";
			var dayType = "stdr_dt";  
			      
			var startDt = $('#startDate').val().replace(/[.]/g,"");
			var endDt = $('#endDate').val().replace(/[.]/g,""); 
			var chekPeriod = $('input:radio[name=dRadio]:checked').val(); //공고일, 공사기간 
			var radioVal = "";
			var order = "stdr_dt desc"
			var keyword = "";	
			var authNo = $('#authNo').val();
			
			if(chekPeriod == "bidntcedt"){  
				radioVal = 'bidntcedt';	//공고일
				order = "bidntcedt desc"
				keyword = "bidntcedt:["+ startDt + " TO "+endDt+"]"
			}else if(chekPeriod == "stdr_dt"){ 	
				radioVal = 'forecast_st_dt'; 	//공사기간  
				order = "bidntcedt desc"
				keyword = "forecast_st_dt:["+startDt+ " TO " +endDt+"] OR forecast_end_dt:["+startDt+" TO "+endDt+"]"
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
			    data.prdtReliCd = "";
			    data.authNo = authNo;
			    data.prdtReliChk = "Y";
			    //data.searchKeyword = radioVal+":["+ data.startDt + " TO "+data.endDt+"] AND road_ty_nm:('도로조성' '도로변경'  '도로이설' '시설물조성' '도로개설' '개설공사' '배후도로')"
			    
			    var sidoDataList ={};
				_commonSearch.getSearchCount(data, collection, function(response){  
					var sumCnt = 0;
					for(var j in response.result){ 
						 sumCnt+= response.result[j].valueCount;
					}
					
					 $("#toolbar4").text($.number(sumCnt)+"건");
				});     
		
		},
		/**
		 * 준공예정 건수 조회
		 * */	
		setToolbar5 : function (currPage) {
		
			var _self = this;
			if($.isNullString(currPage)){
				currPage = "1";
			} 
			
			/*var startDt = $.calPeriod('pre',1,'month').replace(/[-]/g,"");
			var endDt =$.toDayStr();*/
			var startDt = $.toDayStr();
			var endDt = $.calPeriod('aft',1,'month').replace(/[-]/g,"");
			var prdtReliCd = $('#prdtReliCombo option:selected').val(); //신뢰도 콤보
			var authNo = $('#authNo').val();
			var listCnt = "5";
			var startPage = String((parseInt(currPage)-1)*parseInt(listCnt));
			var collection ="tb_analysis_info";
			var data = new Object();
				data.startDt = startDt;  //필수
				data.endDt = endDt;      //필수
				data.order="bidntcedt desc";
				data.searchKeyword = "forecast_end_dt:["+ startDt + " TO "+ endDt +"]"		
				data.prdtReliCd = prdtReliCd;
			    data.authNo = authNo;
			    data.prdtReliChk = "Y";
			_commonSearch.getSearchList(startPage, listCnt, data, collection
					, function(response){  
					   var totalCnt = response.totalCnt;
					   $("#toolbar5").text($.number(totalCnt)+"건");
			},false);  
		
		},
	}
	window.ToolBarCnt = ToolBarCnt;
	window.name = "ToolBarCnt.js";
})(window, jQuery);