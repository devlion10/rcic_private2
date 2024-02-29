var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
window.requestAnimationFrame = requestAnimationFrame;
var _rcicChartMap;
var cctvMap;

var Dashboard = {
	// 대시보드 페이지 reload(1시간마다 : 지도, cctv 제외)
	reload : function(interval) {
		var _self = this;
		setTimeout(function() {
			//console.log('dashboard page >> ' + _self.getCurrentTime());

			// 지도 초기화
			//dashMap = _self.initMap();
			
			// 주요변경정보
			_self.getCollectionChangeInfo();
			_self.getRenewChangeInfo();
			_self.getCallChangeInfo();
			// 대시보드 차트(공사종류, 시설물종류)
			_self.viewChart();
			// today
			_self.constIngCnt();
			_self.searchCollectionCnt();
			_self.searchRenewCnt();
			_self.searchApiUseStatus();
			// 도로변화정보(진행공사목록)
			_self.getRoadChangeInfo(0,'roadConst');
			_self.getRoadChangeInfo(0,'roadMake');
			_self.getRoadChangeInfo(0,'fac');
			// sns 소식
			_self.getSnsList();
			
			_self.reload();
		}, 1000*60*60);
	},
	// 도로교통정보 5분마다 reload
	cctvApiInterval : function(interval) {
		var _self = this;
		setTimeout(function() {
			console.log('cctv api >> ' + _self.getCurrentTime());
			_self.getCctvApi();
			_self.cctvApiInterval();
		}, 5*60*1000);
	},
	getCurrentTime : function() {
		var date = new Date(); 
		var year = date.getFullYear(); 
		var month = date.getMonth()+1; 
		var day = date.getDate(); 
		var hour = date.getHours();
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();
		return `${year}-${month<10 ? `0${month}`:month}-${day<10 ? `0${day}`:day} ${hour<10 ? `0${hour}`:hour}:${minutes<10 ? `0${minutes}`:minutes}:${seconds<10 ? `0${seconds}`:seconds}`;
	},
	//today 현황 animate 효과
	todayDonut : function(target, precent, color){
		var endPercent = precent;
		var canvas = document.getElementById(target);
		var context = canvas.getContext('2d');
		var x = canvas.width / 2;
		var y = canvas.height / 2;
		var radius = 37;
		var curPerc = 0;
		var counterClockwise = false;
		var circ = Math.PI * 2;
		var quart = Math.PI / 2;
	
		context.lineWidth = 4;
		context.strokeStyle = color;
	
		function animate(current) {
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.beginPath();
			context.arc(x, y, radius, -(quart), ((circ) * current) - quart, false);
			context.stroke();
			curPerc++;
			if (curPerc < endPercent) {
				requestAnimationFrame(function () {
					animate(curPerc / 99)
				});
			}
		}
		animate();
	},
	// 지도 이동시 날씨 정보 가져오기
	getWeatherInfo : function(coord, sgg, emd) {
		const epsg3857 = "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs";
		const epsg4326 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
		var p = proj4(epsg3857, epsg4326, coord);
		
		var obj = new Object();
		obj.url = "/rcic/dashboard/getWheatherInfo";
		obj.cityName = '부산';
		obj.lat = String(p[1]);
		obj.lon = String(p[0]);
		var dataList = setDefault(obj);
		
		$.commonAjax3(dataList,'', function(response, status, headers, config){ 
			var result = response.result;
        	var weatherEn = result['weather'][0]['main'].toLowerCase();
        	$('#weatherImg').attr('class', 'weather');
        	
        	var weatherKr = '';
        	if(weatherEn == 'clear') {
        		weatherKr = '맑음';
        		$('#prec').hide();
        	} else if(weatherEn == 'clouds' || weatherEn == 'haze' || weatherEn == 'mist') {
        		weatherKr = '흐림';
        		weatherEn = 'clouds';
        		$('#prec').hide();
        	} else if(weatherEn == 'rain') {
        		weatherKr = '비';
        		$('#prec').text(result['rain']['1h'] + 'mm');
        		$('#prec').show();
        	} else if(weatherEn == 'snow') {
        		weatherKr = '눈';
        		$('#prec').text(result['snow']['1h'] + 'mm');
        		$('#prec').show();
        	}
        	$('#weatherImg').addClass(weatherEn);
        	$('#temp').text(parseInt(result['main']['temp']));
        	
        	var addr = sgg != null ? sgg + (emd != null ? ' ' + emd : '') : result['name'];
        	$('#tempDesc').text(addr + '/' + weatherKr);
		},false,function(e){
			console.log(e);
		});
	},
	// sns 목록 가져오기
	getSnsList : function(currPage) {
		var _self = this;
		if($.isNullString(currPage)){
			currPage = "1";
		}
		
		var listCnt = "5";
		var keyword = ""; //$('#snsKeyword').val();
		var collection ="tb_sns_info";
		var searchKeyword =  "0"; //$('#selectKeyword option:selected').val();
		var startPage = String((parseInt(currPage)-1) * parseInt(listCnt));
		
		if(!$.isNullString(keyword)){  
			if(searchKeyword == "0"){
				//searchKeyword = "sns_content:공사 OR sns_content:도로  OR sns_content:사고 OR sns_content:국도 AND sns_content:" + keyword + '';
				searchKeyword = "sns_content:개통 OR sns_content:공사  AND sns_content:" + keyword + '';
			}else if(searchKeyword == "1"){
				searchKeyword = "sns_content:공사 AND sns_content:" + keyword + '';
			}else if(searchKeyword == "2"){
				searchKeyword = "sns_content:도로 AND sns_content:" + keyword + '';
			}
		}else {
			if(searchKeyword == "0"){
				//searchKeyword = "sns_content:공사 OR sns_content:도로  OR sns_content:사고 OR sns_content:국도";
				searchKeyword = "sns_content:개통 OR sns_content:공사"
			}else if(searchKeyword == "1"){
				searchKeyword = "sns_content:공사";
			}else if(searchKeyword == "2"){
				searchKeyword = "sns_content:도로";
			}
		}
		
		var data = new Object();
		data.searchKeyword = searchKeyword;  
		data.order="sns_regist_dt";
		
		_commonSearch.getSearchList(startPage, listCnt, data, collection, function(response){
		    var resultData = response.result;
			var html = '';
		    for(var i in resultData){
		    	html += '<li>' + resultData[i].sns_name + ':[' + resultData[i].sns_regist_dt.substr(0, 16) + ']' + resultData[i].sns_content.replace(/\n/g, "") + '</li>';
		    }
		    $('.sns .sns-scroll ul').html(html);
		});
	},
	//공사현황 검색조건저장
	getContition : function(gbn){
		var listCnt = '10'; //  건수
		var keyword = '';
		var chekPeriod = 'bidntcedt';
		var sido = '0';
		var sgg = '0';
		var emd = '0';
		var road = '';
		var order = "stdr_dt desc"
		var authNo = '1';
			
		var searchKeyword ="";
		var radioVal = "";
		var selConst = ""; 
		var selFac = "";
		var searchTextYN = "Y";
		
		if(chekPeriod == "bidntcedt"){  
			radioVal = 'bidntcedt';	//공고일
			order = "bidntcedt desc"
		}else if(chekPeriod =="consrdt"){   
			radioVal = 'forecast_st_dt'; 	//공사기간
			order = "bidntcedt desc"
		}else{
			radioVal = 'thtm_ccmplt_date'; 
			order = "bidntcedt desc"
		}
		
		if($.isNullString(gbn)) {
			startDt = $.calPeriod('pre',3,'month').replace(/[-]/g,"");
			endDt = $.toDayStr();
		} else if(gbn == 'today') {
			startDt = $.toDayStr();
			endDt = $.toDayStr();
		} else if(gbn == 'yesterday') {
			startDt = $.calPeriod('pre',1,'day').replace(/[-]/g,"");
			endDt = $.calPeriod('pre',1,'day').replace(/[-]/g,"");
		} else if(gbn == 'weekago') {
			startDt = $.calPeriod('pre',7,'day').replace(/[-]/g,"");
			endDt = $.calPeriod('pre',7,'day').replace(/[-]/g,"");
		} else if(gbn == 'year') {
			startDt = $.calPeriod('pre',1,'year').replace(/[-]/g,"");
			endDt = $.toDayStr();
		} else if(gbn == '3yearafter') {
			startDt = $.calPeriod('pre',10,'year').replace(/[-]/g,"");
			endDt = $.toDayStr();
		}
			
		/*
		// 공사 선택
		$('ul[name="selConstList"] li').each(function (index, item) { 
			var selLi = $('#selConstList li:eq('+index+')')
			selConst += selLi.find('input[name="constCdResult"]').val() + " ";
		});
		
		//시설물 선택
		$('ul[name="selFacList"] li').each(function (index, item) { 
			var selLi = $('#selFacList li:eq('+index+')')
			selFac +=  selLi.find('input[name="facCdResult"]').val() + " ";
		});
		
		// 검색어 있을경우 order =  order+", "+defalutOrder; 변경하기위해
	    //if(!$.isNullString(keyword)){
	    	
	    //}
		*/
		selConst = "";
		selFac = "";
		G.contition = { 
   		        "base"      : { 'listCnt'   : listCnt         , 'keyword': keyword ,'radioVal':radioVal, 'startDt':startDt, 'endDt':endDt, 'searchTextYN':searchTextYN },
   		        "legandong" :[
   		        	          { 'fieldName' :'sido_cd'        , 'fieldValue': sido}
   		                     ,{ 'fieldName' :'sgg_cd'        , 'fieldValue': sgg}
   		        	         ,{ 'fieldName' :'emd_cd'        , 'fieldValue': emd}
	        	            ],
   		        "constRoadClss"  : { 'fieldName' :'const_road_clss', 'fieldValue':  road           },             //도로선택
   		        "roadType"  : { 'fieldName' :'road_ty_cd'     , 'fieldValue': selConst.replace(/\s+$/,"")       }, //공사종류
   		        "facType"   : { 'fieldName' :'fac_ty_cd'      , 'fieldValue': selFac.replace(/\s+$/,"")         }, //시설물선택
   		        "authNo"    : { 'authNo' : authNo},
		}; 
		
		G.contition.order=order;
		
		if(chekPeriod == "bidntcedt"){  //공고일
			searchKeyword = G.contition["base"]["radioVal"] + ':['+G.contition["base"]["startDt"]+' TO '+G.contition["base"]["endDt"]+']';
		}else if(chekPeriod =="consrdt"){   //공사기간
			//searchKeyword = G.contition["base"]["radioVal"] + ':['+G.contition["base"]["startDt"]+' TO '+G.contition["base"]["endDt"]+']';
			searchKeyword = G.contition["base"]["radioVal"] +":["+G.contition["base"]["startDt"]+ " TO " +G.contition["base"]["endDt"]+"] OR forecast_end_dt:["+G.contition["base"]["startDt"]+" TO "+G.contition["base"]["endDt"]+"]"
		}else{
			searchKeyword = "thtm_ccmplt_date:["+G.contition["base"]["startDt"]+" TO "+G.contition["base"]["endDt"]+"]"
		}
		
		for(var i in G.contition["legandong"]){
			var idx = G.contition["legandong"][i];
			if(idx.fieldValue != "0"){
				searchKeyword += " AND "+ idx.fieldName +":"+ idx.fieldValue;
			}
		}
		G.contition.searchKeyword = searchKeyword;  
	},
	// 차트 
	viewChart:function(){
		this.getContition();
		_rcicChartMap =  new RcicDashboardChart({  
				/*chart1Config:{
					divId : "chartStatus",
					theme : am4themes_animated,
					chartType: am4charts.XYChart
				} ,*/
				chart2Config:{
					divId : "chartConstruction",
					theme : am4themes_animated,
					chartType: am4charts.PieChart3D
				} ,
				chart3Config:{
					divId : "chartFacility",
					theme : am4themes_animated,
					chartType: am4charts.PieChart3D
				}/* ,
				chart4Config:{
					divId : "chartStatus",
					theme : am4themes_animated,
					chartType: am4charts.XYChart
				} ,
				chart5Config:{
					divId : "chartStatus",
					theme : am4themes_animated,
					chartType: am4charts.XYChart
				} ,*/
			});
	},
	//today - 공사현황
	constIngCnt : function(){
		var _self = this;
		var collection ="tb_analysis_info";
		var totalCnt, todayCnt, yesterdayCnt, weekagoCnt = 0;
		
		// 총공사현황
		this.getContition();
		
		var data = new Object();
		data.searchKeyword = G.contition["searchKeyword"];
		data.roadTypeCd = G.contition["roadType"]["fieldValue"];
		data.facTypeCd = G.contition["facType"]["fieldValue"];
		data.constRoadClss = G.contition["constRoadClss"]["fieldValue"];
		data.order = G.contition["order"]["order"];  
		data.authNo = G.contition["authNo"]["authNo"];
		data.prdtReliCd = "";
	    data.prdtReliChk = "Y";
	    
		_commonSearch.getSearchList("0", "", data, collection, function(response){
			totalCnt = response.totalCnt;
			//console.log('총 공사현황 >>>>> ' + $.number(totalCnt));
			$('.item01').find('.total').html($.number(totalCnt)+'<span>건</span>');
			//_self.todayDonut('today01', Math.round(totalCnt/500000*100), '#07bda1');
			_self.todayDonut('today01', 100, '#07bda1');
		});
		// 금일발생
		this.getContition('today');
		data.searchKeyword = G.contition["searchKeyword"];
		_commonSearch.getSearchList("0", "", data, collection, function(response){
			todayCnt = response.totalCnt;
			//console.log('금일 공사현황 >>>>> ' + $.number(todayCnt));
			$('.item01 .legend').find('#today div').text($.number(todayCnt)+'건');
		});
		// 전일대비
		this.getContition('yesterday');
		data.searchKeyword = G.contition["searchKeyword"];
		_commonSearch.getSearchList("0", "", data, collection, function(response){
			yesterdayCnt = response.totalCnt;
			//console.log('전일 공사현황 >>>>> ' + $.number(yesterdayCnt));
			_self.returnPercent(todayCnt, yesterdayCnt, '01', 'yesterday');
		});
		// 전주대비
		this.getContition('weekago');
		data.searchKeyword = G.contition["searchKeyword"];
		_commonSearch.getSearchList("0", "", data, collection, function(response){
			weekagoCnt = response.totalCnt;
			//console.log('전주 공사현황 >>>>> ' + $.number(weekagoCnt));
			_self.returnPercent(todayCnt, weekagoCnt, '01', 'weekAgo');
		});
	},
	// 전일대비, 전주대비 % return
	returnPercent : function(num, compareNum, itemNum, id) {
		var percent = (num - compareNum) / compareNum * 100;
		if(isNaN(percent) || percent == Infinity) {
			percent = 0;
		}
		var _ul = '.item'+itemNum+' .legend';
		var _div = '#'+id+' div';
		
		if(percent == 0) {
			$(_ul).find(_div).removeClass().addClass('keep').text('0%');
		} else if(percent > 0) {
			$(_ul).find(_div).removeClass().addClass('up').text(percent.toFixed(1)+'%');
		} else {
			$(_ul).find(_div).removeClass().addClass('down').text(percent.toFixed(1).substr(1)+'%');
		}
		if(percent == -100 || percent == 100) {
			$(_ul).find(_div).text('100%');
		}
	},
	// 수집현황 검색조건
	getCollectionContition : function(gbn) {
		var startDt,endDt;
		var keyword = "";
		var searchKeyword = "";
		
		if($.isNullString(gbn)) {
			startDt = $.calPeriod('pre',3,'month').replace(/[-]/g,"");
			endDt = $.toDayStr();
		} else if(gbn == 'today') {
			startDt = $.toDayStr();
			endDt = $.toDayStr();
		} else if(gbn == 'yesterday') {
			startDt = $.calPeriod('pre',1,'day').replace(/[-]/g,"");
			endDt = $.calPeriod('pre',1,'day').replace(/[-]/g,"");
		} else if(gbn == 'weekago') {
			startDt = $.calPeriod('pre',7,'day').replace(/[-]/g,"");
			endDt = $.calPeriod('pre',7,'day').replace(/[-]/g,"");
		} else if(gbn == '3yearafter') {
			startDt = $.calPeriod('pre',10,'year').replace(/[-]/g,"");
			endDt = $.toDayStr();
		}
		
		searchKeyword = 'stdr_dt:['+startDt+' TO '+endDt+']';
		if(!$.isNullString(keyword)){
			searchKeyword += ' AND ntceinsttnm:('+keyword+')'
		}

		var data = new Object();
		data.startDt = startDt;  //필수
		data.endDt = endDt;      //필수
		data.searchKeyword = searchKeyword;
		data.order="bidntcedt desc";
		
		return data;
	},
	// today - 수집현황
	searchCollectionCnt : function() {
		var _self = this;
		var listCnt = "10";
		var startPage = "0";
		var collection = "g2b_result_info";
		var data;
		var totalCnt, todayCnt, yesterdayCnt, weekagoCnt = 0;
		
		// 총수집현황
		data = this.getCollectionContition();
		_commonSearch.getSearchList(startPage, listCnt, data, collection, function(response){
			totalCnt = response.totalCnt;
			//console.log('총 수집현황 >>>>> ' + $.number(totalCnt));
			$('.item02').find('.total').html($.number(totalCnt)+'<span>건</span>');
			//_self.todayDonut('today02', Math.round(totalCnt/500000*100), '#53aed4');
			_self.todayDonut('today02', 100, '#53aed4');
		});
		// 금일발생
		data = this.getCollectionContition('today');
		_commonSearch.getSearchList(startPage, listCnt, data, collection, function(response){
			todayCnt = response.totalCnt;
			//console.log('금일 수집현황 >>>>> ' + $.number(todayCnt));
			$('.item02 .legend').find('#today div').text($.number(todayCnt)+'건');
		});
		// 전일대비
		data = this.getCollectionContition('yesterday');
		_commonSearch.getSearchList(startPage, listCnt, data, collection, function(response){
			yesterdayCnt = response.totalCnt;
			//console.log('전일 수집현황 >>>>> ' + $.number(yesterdayCnt));
			_self.returnPercent(todayCnt, yesterdayCnt, '02', 'yesterday');
		});
		// 전주대비
		data = this.getCollectionContition('weekago');
		_commonSearch.getSearchList(startPage, listCnt, data, collection, function(response){
			weekagoCnt = response.totalCnt;
			//console.log('전주 수집현황 >>>>> ' + $.number(weekagoCnt));
			_self.returnPercent(todayCnt, weekagoCnt, '02', 'weekAgo');
		});
	},
	getRenewContition : function(gbn) {
		var startDt,endDt;
		var keyword = "";
		var searchKeyword = "";
		
		if($.isNullString(gbn)) {
			startDt = $.calPeriod('pre',3,'month').replace(/[-]/g,"");
			endDt = $.toDayStr();
		} else if(gbn == 'today') {
			startDt = $.toDayStr();
			endDt = $.toDayStr();
		} else if(gbn == 'yesterday') {
			startDt = $.calPeriod('pre',1,'day').replace(/[-]/g,"");
			endDt = $.calPeriod('pre',1,'day').replace(/[-]/g,"");
		} else if(gbn == 'weekago') {
			startDt = $.calPeriod('pre',7,'day').replace(/[-]/g,"");
			endDt = $.calPeriod('pre',7,'day').replace(/[-]/g,"");
		} else if(gbn == '3yearafter') {
			startDt = $.calPeriod('pre',10,'year').replace(/[-]/g,"");
			endDt = $.toDayStr();
		}
		searchKeyword = "forecast_end_dt:["+ startDt + " TO "+ endDt +"]";

		var data = new Object();
		data.startDt = startDt;
		data.endDt = endDt;
		data.searchKeyword = searchKeyword;
		
		return data;
	},
	// today - 갱신현황
	searchRenewCnt : function(){
		var _self = this;
		var collection ="tb_analysis_info";
		var data;
		var totalCnt, todayCnt, yesterdayCnt, weekagoCnt = 0;
		
		// 총갱신현황
		data = this.getRenewContition();
		_commonSearch.getSearchList("0", "", data, collection, function(response){
			totalCnt = response.totalCnt;
			//console.log('총 갱신현황 >>>>> ' + $.number(totalCnt));
			$('.item03').find('.total').html($.number(totalCnt)+'<span>건</span>');
			//_self.todayDonut('today03', Math.round(totalCnt/500000*100), '#8277c1');
			_self.todayDonut('today03', 100, '#8277c1');
		});
		// 금일발생
		data = this.getRenewContition('today');
		_commonSearch.getSearchList("0", "", data, collection, function(response){
			todayCnt = response.totalCnt;
			//console.log('금일 갱신현황 >>>>> ' + $.number(todayCnt));
			$('.item03 .legend').find('#today div').text($.number(todayCnt)+'건');
		});
		// 전일대비
		data = this.getRenewContition('yesterday');
		_commonSearch.getSearchList("0", "", data, collection, function(response){
			yesterdayCnt = response.totalCnt;
			//console.log('전일 갱신현황 >>>>> ' + $.number(yesterdayCnt));
			_self.returnPercent(todayCnt, yesterdayCnt, '03', 'yesterday');
		});
		// 전주대비
		data = this.getRenewContition('weekago');
		_commonSearch.getSearchList("0", "", data, collection, function(response){
			weekagoCnt = response.totalCnt;
			//console.log('전주 갱신현황 >>>>> ' + $.number(weekagoCnt));
			_self.returnPercent(todayCnt, weekagoCnt, '03', 'weekAgo');
		});

	},
	// 호출현황(사용현황) 검색조건
	getApiUseStatusContition : function(gbn) {
		var obj = new Object();
		obj.url = '/rcic/dashboard/getApiUseStats';
  		if($.isNullString(gbn)) {
			startDt = $.calPeriod('pre',3,'month').replace(/[-]/g,"");
			endDt = $.toDayStr();
		} else if(gbn == 'today') {
			startDt = $.toDayStr();
			endDt = $.toDayStr();
		} else if(gbn == 'yesterday') {
			startDt = $.calPeriod('pre',1,'day').replace(/[-]/g,"");
			endDt = $.calPeriod('pre',1,'day').replace(/[-]/g,"");
		} else if(gbn == 'weekago') {
			startDt = $.calPeriod('pre',7,'day').replace(/[-]/g,"");
			endDt = $.calPeriod('pre',7,'day').replace(/[-]/g,"");
		} else if(gbn == '3yearafter') {
			startDt = $.calPeriod('pre',10,'year').replace(/[-]/g,"");
			endDt = $.toDayStr();
		}
  		obj.startDt = startDt;
		obj.endDt = endDt;
		
  		return setDefault(obj);
	},
	// today 호출현황(api 사용현황)
	searchApiUseStatus : function() {
		var _self = this;
		var data;
		var totalCnt, todayCnt, yesterdayCnt, weekagoCnt = 0;
		
		// 총호출현황
		data = this.getApiUseStatusContition();
		$.commonAjax3(data,'', function(response, status, headers, config){
			totalCnt = response.count;
			//console.log('총 호출현황 >>>>> ' + $.number(totalCnt));
			$('.item04').find('.total').html($.number(totalCnt)+'<span>건</span>');
			//_self.todayDonut('today04', Math.round(totalCnt/500000*100), '#f55c50');
			_self.todayDonut('today04', 100, '#f55c50');
		});
		// 금일발생
		data = this.getApiUseStatusContition('today');
		$.commonAjax3(data,'', function(response, status, headers, config){
			todayCnt = response.count;
			//console.log('금일 호출현황 >>>>> ' + $.number(todayCnt));
			$('.item04 .legend').find('#today div').text($.number(todayCnt)+'건');
		});
		// 전일대비
		data = this.getApiUseStatusContition('yesterday');
		$.commonAjax3(data,'', function(response, status, headers, config){
			yesterdayCnt = response.count;
			//console.log('전일 호출현황 >>>>> ' + $.number(yesterdayCnt));
			_self.returnPercent(todayCnt, yesterdayCnt, '04', 'yesterday');
		});
		// 전주대비
		data = this.getApiUseStatusContition('weekago');
		$.commonAjax3(data,'', function(response, status, headers, config){
			weekagoCnt = response.count;
			//console.log('전주 호출현황 >>>>> ' + $.number(weekagoCnt));
			_self.returnPercent(todayCnt, weekagoCnt, '04', 'weekAgo');
		});
	},
	// cctv api(its) 목록조회
	getCctvApi : function() {
		var _self = this;
		
		$.ajax({
			method : 'POST', 
			dataType : 'json',
			url : '/rcic/dashboard/getCctvApi',
		    complete: function() {
	    		$.hideBlock();			    		
		    }, 
		    success: function(response, status, headers, config) {
		    	cctvMap = response.result;
				var result = response.result;
				if(result.success) {
					var list = result.list;
					if(result.totalCnt > 0) {
						_self.getHlsUrl(list[0].cctvurl, 'cctvVideo', null, mainCctv);
						$('#cctvIdx').val(0);
						$('.traffic-info .cctv p').text(list[0].cctvname);
						
						var routeList = result.routeList;
						$('.cctv .routeNo>ul').html('');
						for(var i in routeList){
							$('.cctv .routeNo>ul').append('<li routeNo="'+routeList[i]+'"><a href="#" onclick="optionSelect(this); return false;">국도'+routeList[i]+'호선</a></li>');
						}
						
						if($('.modal:visible').length > 0) {
							_self.getHlsUrl(cctvMap.list[0].cctvurl, 'cctvVideo01', null, cctv01);
							_self.getHlsUrl(cctvMap.list[1].cctvurl, 'cctvVideo02', null, cctv02);
							_self.getHlsUrl(cctvMap.list[2].cctvurl, 'cctvVideo03', null, cctv03);
							_self.getHlsUrl(cctvMap.list[3].cctvurl, 'cctvVideo04', null, cctv04);
							
							for (var i = 0; i < 4; i++) {
								$('.cctv.div0'+(i+1)+' .routeNo input[type=text]').val(cctvMap.list[i].route);
								$('.cctv.div0'+(i+1)+' .cctvNm input[type=text]').val(cctvMap.list[i].cctvNm);
								
								cctvList(cctvMap.list[i].routeNo, $('.cctv.div0'+(i+1)+' .cctvNm ul'));
								$('.cctv.div0'+(i+1)+' input[type=checkbox]').val(i);
							}
							$('.modal input[type=checkbox]').prop('checked', false);
						}
					}
				}
			},
			error:function(jqXHR, textStatus, errorThrown){
				if(jqXHR.responseJSON == undefined){
					//alert("에러가 발생했습니다. 관리자에게 문의하세요");
					console.log('에러가 발생했습니다. 관리자에게 문의하세요');
				}
				
			}
		});
	},
	// cctv 실시간 스트리밍 재생
	getHlsUrl : function(_reqUrl, _videoId, _beforeIdx, _obj) {
		_reqUrl = _reqUrl || '';
	    if (location.protocol.indexOf('https') > -1) {
	        _reqUrl = _reqUrl.replace('http','https');
	    }
	    $.ajax({
	        type: "GET"
	        , url: _reqUrl + "!hls"
	        , crossDomain: true
	        , dataType: "text"})
        .done(function (responseText) {
        	$('#'+_videoId).parents('.cctv').find('.overlay').hide();
        	_obj.hls.stopLoad();
        	//_obj.hls.destroy();
        	
            var video = document.getElementById(_videoId),
                videoSrc = responseText,
	            hls = new Hls(hlsConfig);
	            _obj.hls = hls;
            
            function onLevelLoaded(event, data) {
                var level_duration = data.details.totalduration;
                console.log('hls onLevelLoaded event', event);
                console.log('hls onLevelLoaded data', data);
                console.log('hls onLevelLoaded level_duration', level_duration);
            }
            hls.once(Hls.Events.LEVEL_LOADED, onLevelLoaded);
            
            if (Hls.isSupported()) {
                hls.attachMedia(video);
                hls.on(Hls.Events.ERROR, function (event, data) {
                    if (data.fatal) {
                        switch (data.type) {
                            case Hls.ErrorTypes.NETWORK_ERROR:
                                // try to recover network error
                                console.log("fatal network error encountered, try to recover");
                                hls.startLoad();
                                break;
                            case Hls.ErrorTypes.MEDIA_ERROR:
                                console.log("fatal media error encountered, try to recover");
                                hls.recoverMediaError();
                                break;
                            default:
                                // cannot recover
                                hls.destroy();
                                break;
                        }
                    }
                });
                hls.on(Hls.Events.MEDIA_ATTACHED, function () {
                    console.log('video and hls.js are now bound together !');
                    hls.loadSource(videoSrc);
                    hls.on(Hls.Events.MANIFEST_PARSED, function () {
                    	//video.play();
                        var promise = video.play();
                        if (promise !== undefined) {
                            promise.then(function (res) {
                                // Autoplay started!
                            	console.log('res', res);
                            	$('#'+_videoId).parents('.cctv').find('.overlay').hide();
                            })['catch'](function (error) {
                                // Autoplay was prevented.
                                // Show a "Play" button so that user can start playback.
                                console.log('error', error);
                            });
                        }
                    });
                });
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = videoSrc;
                video.addEventListener('loadedmetadata', function () {
                    video.play();
                });
            }
        })
        .fail(function (xhr) {
        	if (xhr.status === 400) {
                console.log('입력 값을 확인 해 주세요. =>{}', xhr);
            } else if (xhr.status === 401) {
                console.log('권한이 없습니다. =>{}', xhr);
            } else if (xhr.status === 404) {
                console.log('잘못 된 요청입니다. =>{}', xhr);
            } else if (xhr.status === 500) {
                console.log('서버 오류가 발생하였습니다. =>{}', xhr);
            } else {
                console.log('처리 도중 오류가 발생 하였습니다. =>{'+xhr.status+'}', xhr);
            }
        	
        	var errMsg = xhr.status + ' ' + xhr.statusText;
        	$('#'+_videoId).parents('.cctv').find('.overlay').text(errMsg);
        	$('#'+_videoId).parents('.cctv').find('.overlay').show();
        	
        	if(_beforeIdx != null || _beforeIdx != undefined) {
        		//alert('해당 cctv 영상을 불러올 수 없습니다.');
        		if(_videoId == 'cctvVideo') {
        			$('.traffic-info .cctv p').text(cctvMap.list[_beforeIdx].cctvname);
		    		$('#cctvIdx').val(_beforeIdx);
        		} else {
        			//console.log(_beforeIdx);
        			$cctvDiv = $('#'+_videoId).parents('.cctv');
        			$cctvDiv.find('input[type=checkbox]').val(_beforeIdx);
        			$cctvDiv.find('.routeNo input[type=text]').val(cctvMap.list[_beforeIdx].route);
        			$cctvDiv.find('.cctvNm input[type=text]').val(cctvMap.list[_beforeIdx].cctvNm);
        			cctvList(cctvMap.list[_beforeIdx].routeNo, $cctvDiv.find('.cctvNm ul'));
        		}
        	}
        });
	},
	/* cjw 추가 */
	initMap : function() {
		proj4.defs([
			["EPSG:4019","+proj=longlat +ellps=GRS80 +no_defs"],
			["EPSG:3857","+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs"],
			["EPSG:900913","+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs"],
			["EPSG:4326", "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs"],
			["EPSG:5179","+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs"],
			["EPSG:5181","+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs"],
			["EPSG:5185","+proj=tmerc +lat_0=38 +lon_0=125 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs"],
			["EPSG:5186","+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs"],
			["EPSG:5187","+proj=tmerc +lat_0=38 +lon_0=129 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs"],
			["EPSG:5188","+proj=tmerc +lat_0=38 +lon_0=131 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs"]
		]);

		ol.proj.proj4.register(proj4);
				
		// 기본 레이어는 백지도(gray)
		var grayLayer = new ol.layer.Tile({
			preload: Infinity,
			source: new ol.source.XYZ({
				projection: 'EPSG:3857',
				hidpi: false,
				wrapX : false,
				url : 'https://api.vworld.kr/req/wmts/1.0.0/9081FF2E-DA77-38FE-A44E-6C3F1D1E0EF0/white/{z}/{y}/{x}.png',
				minZoom: 5,
				maxZoom: 17,
			})
		});
		
		// 기본 서울시 중심좌표
		var centerCoord = [14136663.094087001, 4516316.688899491];
		
		var map = new ol.Map({
			controls: ol.control.defaults().extend([new Dashboard.addressControl(), new Dashboard.wheatherControl(), new ol.control.ScaleLine()]),
			layers: [ grayLayer ],
			target : $('.map')[0],
			view: new ol.View({
	            projection: new ol.proj.Projection({
					code: 'EPSG:3857',
					units: 'm',
					axisOrientation : 'enu'
				}),
	            center: centerCoord,
	            maxZoom: 19,
	            zoom: 11
			})
		});
		
		Dashboard.changeAddress(centerCoord);
		
		// context 메뉴 생성
		var ctxItems = [
			{
				text: '자동 화면전환 시작',
				classname: 'bold',
				icon: '/assets/images/dashboard/map/map_lotate.png',
				callback: Dashboard.lotateMap
			},
			/*{
				text: 'GPS 수신 시작',
				classname: 'bold',
				icon: '/assets/images/dashboard/map/map_gps.png',
				callback: Dashboard.getGPSData
			},
			{
				text: '도로 레이어 추가',
				classname: 'bold',
				icon: '',
				callback: Dashboard.AddLineLayer
			},
			{
				text: 'POI 레이어 추가',
				classname: 'bold',
				icon: '',
				callback: Dashboard.AddPOILayer
			},*/
			
			/* 추가 시 위와 같은 형태로 입력*/
		];
		
		var ctxMenu = new ContextMenu({
			width: 180,
			items: ctxItems
		});
		
		ctxMenu.on('open', function (evt) {
			ctxMenu.clear();
			ctxMenu.extend(ctxItems);
		});
		map.addControl(ctxMenu);

		map.on('moveend', function(e) {
			const map = e.map;
			const pntCenter = map.getView().getCenter();
			
			var pnt = new ol.geom.Point(pntCenter);
			
			var featureWFS = new ol.format.WFS().writeGetFeature({
		        srsName: 'EPSG:3857',
		        featureNS: 'RCIC',
		        featurePrefix: 'RCIC',
		        featureTypes: ['tb_legaldong_emd'],
		        outputFormat: 'application/json',
		        filter: ol.format.filter.intersects('geom', pnt, 'EPSG:3857')
			});	
			
			fetch('/rcic/dashboard/getWFS', {
				method: 'POST',
				mode: 'cors',
				headers: new Headers({
					'Access-Control-Allow-Origin':'*',
					'Content-Type': 'application/json'
				}),
				body: JSON.stringify({params: new XMLSerializer().serializeToString(featureWFS)})
			}).then(function(response) {
				return response.json();
			}).then(function(json) {
				//console.log(json);
				var features = json.features;
				if(features.length > 0) {
					$('#sidoZone').text(features[0].properties.sido_nm);
					$('#sggZone').text(features[0].properties.sgg_nm);
					$('#emdZone').text(features[0].properties.emd_nm);
					
					var sgg = features[0].properties.sgg_nm.split(' ')[0];
					var emd = features[0].properties.emd_nm.split(' ' )[0];
					if(features[0].properties.sido_nm.indexOf('특별시') > -1 || features[0].properties.sido_nm.indexOf('광역시') > -1) {
						sgg = features[0].properties.sido_nm.substr(0,2) + ' ' + features[0].properties.sgg_nm.split(' ')[0];
					}
					Dashboard.getWeatherInfo(pntCenter, sgg, emd);
				}
			}).catch(function(error) {
				//console.log(error);
				Dashboard.getWeatherInfo(pntCenter);
			});
			Dashboard.changeAddress(pntCenter);
		});
		
		return map;
	},
	changeAddress: function(pntCenter) {
		var pnt = new ol.geom.Point(pntCenter);
		
		var featureWFS = new ol.format.WFS().writeGetFeature({
	        srsName: 'EPSG:3857',
	        featureNS: 'RCIC',
	        featurePrefix: 'RCIC',
	        featureTypes: ['tb_legaldong_emd'],
	        outputFormat: 'application/json',
	        filter: ol.format.filter.intersects('geom', pnt, 'EPSG:3857')
		});	
		
		fetch('/rcic/dashboard/getWFS', {
			method: 'POST',
			mode: 'cors',
			headers: new Headers({
				'Access-Control-Allow-Origin':'*',
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify({params: new XMLSerializer().serializeToString(featureWFS)})
		}).then(function(response) {
			return response.json();
		}).then(function(json) {
			//console.log(json);
			var features = json.features;
			if(features.length > 0) {
				$('#sidoZone').text(features[0].properties.sido_nm);
				$('#sggZone').text(features[0].properties.sgg_nm);
				$('#emdZone').text(features[0].properties.emd_nm);
				
				var sgg = features[0].properties.sgg_nm.split(' ')[0];
				var emd = features[0].properties.emd_nm.split(' ' )[0];
				if(features[0].properties.sido_nm.indexOf('특별시') > -1 || features[0].properties.sido_nm.indexOf('광역시') > -1) {
					sgg = features[0].properties.sido_nm.substr(0,2) + ' ' + features[0].properties.sgg_nm.split(' ')[0];
				}
				Dashboard.getWeatherInfo(pntCenter, sgg, emd);
			}
		}).catch(function(error) {
			//console.log(error);
			Dashboard.getWeatherInfo(pntCenter);
		});
	}, 
	addressControl: (function(Control) {
		function addressControl(opt) {
			var options = opt || {};
			
			var $div = $('<div />', {
				class: 'mInfoBox ol-unselectable ol-control',
				style: 'position:absolute;top:5px;left:10px;'
			});
			
			$div.unbind('click');
			
			var $div2 = $('<div />', {
				class: 'mArea'
			});
			
			$('<span />', {
				id: 'sidoZone'
			}).appendTo($div2);
			
			$('<span />', {
				class: 'mDvision',
				text: '>'
			}).appendTo($div2);
			
			$('<span />', {
				id: 'sggZone'
			}).appendTo($div2);
			
			$('<span />', {
				class: 'mDvision',
				text: '>'
			}).appendTo($div2);
			
			$('<span />', {
				id: 'emdZone'
			}).appendTo($div2);
			
			$div2.appendTo($div);
			
			ol.control.Control.call(this, {
				element: $div[0],
				target: options.target
			});
		}
		
		if (Control) {
			addressControl.__proto__ = Control;
		}
		
		addressControl.prototype = Object.create(Control && ol.control.Control.prototype);
		addressControl.prototype.constructor = addressControl;
		
		return addressControl;
	}(ol.control.Control)),
	wheatherControl: (function(Control){
		function wheatherControl(opt) {
			var options = opt || {}
			
			var $div = $('<div />', {
				class: 'mWheatherBox ol-unselectable ol-control',
				style: 'position:absolute;top:5px;right:10px;'
			});
			
			var $temp_div = $('<div />', {
				class: 'temp'
			});
			
			$('<span />', {
				class: 'weather',
				id: 'weatherImg'
			}).appendTo($temp_div);
			
			$('<span />', {
				class: 'num',
				id: 'temp',
			}).appendTo($temp_div);
			
			$('<span />', {
				class: 'txt',
				id: 'tempDesc'
			}).appendTo($temp_div);
			
			$('<span />', {
				class: 'txt',
				id: 'prec'
			}).appendTo($temp_div);
			
			$temp_div.appendTo($div);
			
			$div.unbind('click');
			
			ol.control.Control.call(this, {
				element: $div[0],
				target: options.target
			});
		}
		
		if (Control) {
			wheatherControl.__proto__ = Control;
		}
		
		wheatherControl.prototype = Object.create(Control && ol.control.Control.prototype);
		wheatherControl.prototype.constructor = wheatherControl;
		
		return wheatherControl;
	}(ol.control.Control)),
	lotateIndex : -1,
	lotateMap : function() {
		const pntCenters = [
			//서울	
			{zoom: 11, coordinate: [14136663.094087001, 4516316.688899491]},
			//인천
			{zoom: 11, coordinate: [14099534.595880553, 4509505.612746615]},
			//춘천
			{zoom: 11, coordinate: [14219937.10917518, 4563869.470872286]},
			//강릉
			{zoom: 11, coordinate: [14341554.812371917, 4538412.79107885]},
			//수원
			{zoom: 11, coordinate: [14138440.222469544, 4478258.527838252]},
			//성남
			{zoom: 11, coordinate: [14150514.714129059, 4496036.229435539]},
			//홍성
			{zoom: 11, coordinate: [14095922.872024253, 4379351.022490039]},
			//청주
			{zoom: 11, coordinate: [14193092.68332613, 4387271.794584873]},
			//안동
			{zoom: 11, coordinate: [14335728.775905587, 4380758.355721521]},
			//포항
			{zoom: 11, coordinate: [14394200.802543933, 4313408.632526075]},
			//전주
			{zoom: 11, coordinate: [14150466.067980763, 4277010.384182183]},
			//대전
			{zoom: 11, coordinate: [14181437.432897177, 4347467.900521325]},
			//세종
			{zoom: 11, coordinate: [14166382.597638374, 4378043.782889294]},
			//대구
			{zoom: 11, coordinate: [14311816.946895571, 4277220.421767987]},
			//울산
			{zoom: 11, coordinate: [14386667.266721275, 4239449.989173963]},
			//부산
			{zoom: 11, coordinate: [14366932.13481658, 4191328.9485080405]},
			//창원
			{zoom: 11, coordinate: [14315639.364312861, 4191367.00682328]},
			//광주
			{zoom: 11, coordinate: [14119256.022759223, 4185065.39863005]},
			//목포
			{zoom: 11, coordinate: [14069874.743783167, 4137245.351374672]},
			//여수
			{zoom: 11, coordinate: [14210306.511523375, 4122931.277866271]},
			//제주
			{zoom: 10, coordinate: [14087889.635070177, 3946792.776071169]},
		]
		
		function next(more) {
			if(more) {
				++Dashboard.lotateIndex;
				if (Dashboard.lotateIndex < pntCenters.length) {
					const delay = Dashboard.lotateIndex === 0 ? 0 : 5000;
					setTimeout(function() {
						Dashboard.flyTo(pntCenters[Dashboard.lotateIndex], next);
					}, delay);
				} else {
					setTimeout(function() {
						Dashboard.lotateIndex = -1;
						next(true);
					}, 5000);
				}
			}
		}
		next(true);
	},
	flyTo(location, done) {
		const duration = 2000;
		const view = dashMap.getView();
		const zoom = location.zoom;
		let parts = 2;
		let called = false;
		function callback(complete) {
			--parts;
			if (called) {
				return;
			}
			if (parts === 0 || !complete) {
				called = true;
				done(complete);
			}
		}
		view.animate({
			center: location.coordinate,
			duration: duration,
		}, callback);
		view.animate({
			zoom: zoom,
			duration: duration / 2,
		}, {
			zoom: zoom,
			duration: duration / 2,
		}, callback);
	},
	// get GPS Data
	getGPSData : function() {
		var sampleSeq = [1,2,3,5,6,7,8,9,10,11,13,14,15,16,17,18,19,20,21,22,23];
		
		// GPS 포인트용
		var gpsSource = new ol.source.Vector({
			projection: 'EPSG:3857',
			wrapX: false
		});
		
		var gpsLayer = new ol.layer.Vector({
			source: gpsSource,
			style : new ol.style.Style({
				image: new ol.style.Icon({
					anchor: [0.5, 16],
				    anchorXUnits: 'fraction',
				    anchorYUnits: 'pixels',
				    src: '/assets/images/dashboard/map/icon_light.png',
				    opacity: 0.5,
				  }),
			})
		});
		
		// 최초지점 Marker
		var markerSource = new ol.source.Vector({
			projection: 'EPSG:3857',
			wrapX: false
		});
		
		var markerLayer = new ol.layer.Vector({
			source: markerSource,
		}); 
		
		dashMap.addLayer(gpsLayer);
		dashMap.addLayer(markerLayer);
		
		for(var i=0;i<sampleSeq.length;i++) {
			(function(x) {
				setTimeout(function() {
					var obj = new Object();
					obj.url = '/rcic/dashboard/getGPSData';
					obj.seq = sampleSeq[x];
					
					var dataList = setDefault(obj);
					
					$.commonAjax3(dataList, '', function(response, status, headers, config) {
						var result = response.result;
						
						var listener = null;
						
						// response 바탕으로 데이터 생성하여 넣기
						if (result.length > 0) {
							var idx = 0;			
							
							// 미리 포인트 출력
							for(var i=0;i<result.length;i++) {
								var data = result[i];
								if(i == Math.ceil(result.length / 2) || i == result.length - 1) {
									// 여기서 marker feature를 추가해준다.
									var geom = new ol.geom.Point([data.longitude, data.latitude]);
									var feature = new ol.Feature({
										geometry : geom
									});
									
									var iconUrl = '/assets/images/dashboard/map/road_type_' + $.fillzero(data.fRoadTyCd, 3) + '.png';
																			
									feature.setStyle(
										new ol.style.Style({
											image: new ol.style.Icon({
												anchor: [0.5, 16],
												anchorXUnits: 'fraction',
												anchorYUnits: 'pixels',
												src: iconUrl,
												opacity: 1,
											}),
										})
									);
									
									markerSource.addFeature(feature);
								}
							}
							
							var interval = setInterval(function() {
								if (idx == result.length) {
									//clearInterval(interval);
									idx = 0;
								}
								//else {
									var data = result[idx];
									
									var geom = new ol.geom.Point([data.longitude, data.latitude]);
									var feature = new ol.Feature({
										geometry : geom
									});
									
									gpsSource.addFeature(feature);
									dashMap.render();
									Dashboard.AddAnimateFeature(feature, idx, gpsSource, result.length);
									
									idx += 1;
								//}
								
							}, 500);
						}
					}, false, function(e) {
						console.log(e);
					});
				}, 1000 * x);
			})(i);
		}
	},
	AddAnimateFeature : function(feature, i, source, maxFeature) {
		const duration = 1000;
		var start = new Date();
		var listener = null;
		
		function animate(e) {
			var vectorContext = e.vectorContext;
			var frameState = e.frameState;
			
			var geom = feature.getGeometry().clone();
			var elapsed = frameState.time - start;
			var elapsedRatio = elapsed / duration;
			
			var radius = ol.easing.easeOut(elapsedRatio) * 5 + 5;
			var opacity = ol.easing.easeOut(1 - elapsedRatio);
			
			var flashStyle = new ol.style.Style({
				image: new ol.style.Circle({
					radius: radius,
					snapToPixel: false,
					stroke: new ol.style.Stroke({
						color: [255, 0, 0, opacity],
						width: 0.25 + opacity
					}),
					fill: new ol.style.Fill({
						color: [255,0,0,opacity]
					})
				})
			})
			
			vectorContext.setStyle(flashStyle);
			vectorContext.drawGeometry(geom);
			if(elapsed > duration) {
				if (source.getFeatures().length - 1 > i) {
					ol.Observable.unByKey(listener);
					return;
				} else if (i + 1 == maxFeature) {
					ol.Observable.unByKey(listener);
					return;
				} else {
					start = new Date();
				}
			}
			
			dashMap.render();
		}
		
		listener = dashMap.on('postcompose', animate);
	},
	AddTileLayer: function(layerId, filter) {
		var source = new ol.source.TileWMS({
			//url: 'http://geonworks.iptime.org:20004/geoserver/RCIC/wms',
			url: mapUrl + '/RCIC/wms',
			params: {
				'LAYERS': layerId,
				'TILED': true,
				'CQL_FILTER': filter
			},
			serverType: 'geoserver',
			transition: 0,
		});
		
		var layer = new ol.layer.Tile({
			source: source,
		});
		
		dashMap.addLayer(layer);
	},
	AddLineLayer: function() {
		Dashboard.AddTileLayer('RCIC:tl_center_line', null);
	},
	AddPOILayer: function() {
		Dashboard.AddTileLayer('RCIC:tl_poi_point', "cata_nm IN ('교량','터널','교차시설')");
	},
	// 도로변화정보(진행공사목록)
	getRoadChangeInfo :function(currPage, isCondition){
		this.getContition();
		if(isCondition == "fac") {
			G.contition["facType"]["fieldValue"] = "*:*";
		} else if(isCondition == "roadMake") {
			G.contition["roadType"]["fieldValue"]= "19 24 36 37 39 47 48";
		} else if(isCondition == "roadConst") {
			G.contition["constRoadClss"]["fieldValue"]="161";
		}
		G.contition["base"]["listCnt"] = '6';
		if($.isNullString(currPage)){  
			currPage = "1";
		}
		var startPage = String((parseInt(currPage)-1)*parseInt(G.contition["base"]["listCnt"]));
		var collection ="tb_analysis_info";
		
		var data = new Object();
		data.roadTypeCd = G.contition["roadType"]["fieldValue"]; 
		data.facTypeCd = G.contition["facType"]["fieldValue"];
		data.constRoadClss = G.contition["constRoadClss"]["fieldValue"];
		data.searchKeyword = $.isNullString(G.contition["base"]["keyword"]) ? G.contition["searchKeyword"] :  G.contition["searchKeyword"]+" AND bidntcenm:("+G.contition["base"]["keyword"]+")";
		data.order="bidntcedt desc"; 
		data.authNo = G.contition["authNo"]["authNo"];
		data.prdtReliCd = "";
	    data.prdtReliChk = "Y";
	    data.searchTextYN = G.contition["base"]["searchTextYN"];
		    
		_commonSearch.getSearchList(startPage, G.contition["base"]["listCnt"], data, collection, function(response){
			var resultData = response.result;
			var maxPageCnt = response.maxPageCnt;
			
			var _tbody, _ul;
			if(isCondition == "fac") {
				_tbody = '#tab3 tbody';
				_ul = '#ctab3 ul';
			} else if(isCondition == "roadMake") {
				_tbody = '#tab2 tbody';
				_ul = '#ctab2 ul';
			} else if(isCondition == "roadConst") {
				_tbody = '#tab1 tbody';
				_ul = '#ctab1 ul';
			}
			
			// 도로변화정보
			var roadHtml = '';
			for(var i in resultData) {
				roadHtml += '<tr>';
				roadHtml += '	<td>'+resultData[i].sido_nm+'</td>';
				roadHtml += '	<td><span>'+resultData[i].bidntcenm+'</span></td>'; 
				roadHtml += '</tr>';
			}
			if(roadHtml == '') {
				roadHtml += '<tr>';
				roadHtml += '    <td colspan="2">데이터가 없습니다.</td>';
				roadHtml == '</tr>';
			}
			$(_tbody).empty();
			$(_tbody).html(roadHtml);
			
			// 도로변화 수집정보
			var collectionHtml = '';
			
			for(var i in resultData) {
				if(i > 5) break;
				
				var obj2 = new Object();
				obj2.url = '/rcic/dashboard/getMediaType';
				obj2.seq = resultData[i].seq;
				
				var dataList2 = setDefault(obj2);
				
				$.commonAjax4(dataList2, '', function(response2, status2, headers2, config2) {
					var result = response2.result;
					
					if(result.length > 0) {
						if(result[0].mediaType == '1') {
							collectionHtml += '<li>';
							collectionHtml += '		<div class="img">';
							collectionHtml += '			<img src="/rcic/dashboard/getImgDownload?seq='+resultData[i].seq+'" onerror="this.src=\'/assets/images/dashboard/no_img.png\';" alt="">';
							collectionHtml += '		</div>';
							collectionHtml += '		<div class="txt">';
							collectionHtml += '			<b>' + resultData[i].search_word + '</b>';
							collectionHtml += '			<p>'+resultData[i].sido_nm+' '+resultData[i].bidntcenm+'</p>';
							collectionHtml += '		</div>';
							collectionHtml += '</li>';
						}
						else {
							collectionHtml += '<li>';
							collectionHtml += '		<div class="img">';
							collectionHtml += '			<embed src="http://localhost:18080/rcic/dashboard/getVideoDownload?seq='+resultData[i].seq+'" autoplay="autoplay"></embed>';
							collectionHtml += '		</div>';
							collectionHtml += '		<div class="txt">';
							collectionHtml += '			<b>' + resultData[i].search_word + '</b>';
							collectionHtml += '			<p>'+resultData[i].sido_nm+' '+resultData[i].bidntcenm+'</p>';
							collectionHtml += '		</div>';
							collectionHtml += '</li>';
						}
					}
				});
			}
			
			if(collectionHtml == '') {
				collectionHtml += '<li>';
				collectionHtml += '		<div class="img">';
				collectionHtml += '			<img src="/assets/images/dashboard/no_img.png" alt="">';
				collectionHtml += '		</div>';
				collectionHtml += '		<div class="txt">';
				collectionHtml += '			<p>수집 데이터가 없습니다.</p>';
				collectionHtml += '		</div>';
				collectionHtml += '</li>';
			}
			
			$(_ul).empty();
			$(_ul).html(collectionHtml);
		});
	},
	//주요변경정보(갱신)
	getRenewChangeInfo : function() {
		var collection ="tb_analysis_info";
		var chekPeriod = "bidntcedt";
		var dayType = "forecast_end_dt";
		var radioVal = "forecast_end_dt";
		
		this.getContition();
        var data = new Object();
	    data.collection=collection;
	    data.dayType = dayType;
	    data.authNo = "1";
		data.prdtReliCd = "";
	    data.prdtReliChk = "Y";
	 			
		var searchKeyword = radioVal + ':['+startDt+' TO '+endDt+']';
		for(var i in G.contition["legandong"]){
			var idx = G.contition["legandong"][i];
			if(idx.fieldValue != "0"){
				searchKeyword += " AND "+ idx.fieldName +":"+ idx.fieldValue;
			}
		}
		G.contition.searchKeyword = searchKeyword;
		 
	    data.searchKeyword = G.contition["searchKeyword"];
		data.roadTypeCd = G.contition["roadType"]["fieldValue"];
		data.facTypeCd = G.contition["facType"]["fieldValue"];
	    data.gbn = "pivot";  
	    data.pivot = ",search_word";//"road_ty_cd,road_ty_nm";
	    data.facet = "on" ;
	    data.limit = "30" ;  
			
		var newArr = new Array();
	    var totalCnt = 0;
		_commonSearch.getSearchCount(data, collection, function(response){  
			var obj = new Object();
			obj.url = "/rcic/code/selectDetailCode";
			obj.groupCode = "CD0000";
			
			var data = response.result;  
			var dataList = setDefault(obj);
			
			$.commonAjax3(dataList,'', function(response, status, headers, config){
				var codeList = response.list;
				var extCnt=0;
				for(var i in data){ 
					if(newArr.length>=5)break;   
					for(var j in codeList){
						if(data[i].value==codeList[j].codeNm){ 
							var obj = new Object();
							obj.value = codeList[j].codeNm;
							obj.valueCount = data[i].valueCount;
							
							newArr.push(obj);
							totalCnt += data[i].valueCount;
						}
					}
				}
				if (newArr.length == 0) {
					// 아무것도없을때는 초기화시키기
					var nm = ['도로', '보수공사', '배수로', '유지보수', '개선공사']
					totalCnt = 0;
					for(var i=0;i<5;i++) {
						var obj = new Object();
						obj.value = nm[i];
						obj.valueCount = 0;
						newArr.push(obj);
					}
				}
				Dashboard.createChangeInfoHtml('.change-info .renew ul', totalCnt, newArr);
			});
		});
	},
	//주요변경정보(수집)
	getCollectionChangeInfo : function() {
		var collection ="g2b_result_info";
		var dayType = "stdr_week";  
		
		// 수집현황 검색조건 셋팅
		var cond = this.getCollectionContition();
		      
        var data = new Object();
		//data.startDt = startDt;  //필수
		//data.endDt = endDt;      //필수
		data.collection = collection;
		data.dayType = dayType;
		data.searchKeyword = cond.searchKeyword;
		data.gbn = "pivot";
		data.pivot = ",search_word"; // default "", 솔라 그룹별 카운트 dayType 검색어 카운트를 돌라 data.pivot=stdr_yyyymm,search_word2
		data.facet = "on" ;
		data.limit = "30" ;  

	    var newArr = new Array();
	    var totalCnt = 0;
		_commonSearch.getSearchCount(data, collection, function(response){  
			var obj = new Object();
			obj.url = "/rcic/code/selectDetailCode";
			obj.groupCode = "CD0000";
			
			var data = response.result;  
			var dataList = setDefault(obj);
			
			$.commonAjax3(dataList,'', function(response, status, headers, config){
				var codeList = response.list;
				var extCnt=0;
				for(var i in data){ 
					if(newArr.length>=5)break;   
					for(var j in codeList){
						if(data[i].value==codeList[j].codeNm){ 
							var obj = new Object();
							obj.value = codeList[j].codeNm;
							obj.valueCount = data[i].valueCount;
							
							newArr.push(obj);
							totalCnt += data[i].valueCount;
						}
					}
				}
				if (newArr.length == 0) {
					// 아무것도없을때는 초기화시키기
					var nm = ['도로', '보수공사', '배수로', '유지보수', '개선공사']
					for(var i=0;i<5;i++) {
						var obj = new Object();
						obj.value = nm[i];
						obj.valueCount = 0;
					}
				}
				Dashboard.createChangeInfoHtml('.change-info .collection ul', totalCnt, newArr);
			});
		});	  
	},
	//주요변경정보(호출)
	getCallChangeInfo : function() {
		var allApiList = [
	        {apiProvdNo : 1, apiInfoNm : '고속도로'},
	        {apiProvdNo : 2, apiInfoNm : '국도'},
	        {apiProvdNo : 3, apiInfoNm : '지방도/기타'},
	        {apiProvdNo : 4, apiInfoNm : '공사/시설'}
	    ];
		
		var param = {
				startDt : $.calPeriod('pre',3,'month').replace(/[-]/g,""),
				endDt : $.toDayStr(),
				periodType : 'M',
				groupFormat : 'YYYYMM',
		};
		
		var newArr = new Array();
		var totalCnt = 0;
		$.ajax({
            type : 'get',
            url : '/rcic/dashboard/getCallStats',
            data : param,
            contentType: 'application/json'
        }).done(function(res){
        	//console.log(res);
			_.each(allApiList, function (h) {
				var targetApi = _.find(res, {apiProvdNo : parseInt(h.apiProvdNo)});
				var valueByApi = targetApi != null ? targetApi.cnt : 0;
				
				var obj = new Object();
				obj.value = h.apiInfoNm;
				obj.valueCount = valueByApi;
				
				newArr.push(obj);
				totalCnt += valueByApi;
			});
			Dashboard.createChangeInfoHtml('.change-info .call ul', totalCnt, newArr);
        });
	},
	createChangeInfoHtml : function(id, totalCnt, data) {
		var html = '';
		for(var i in data) {
			html += '<li>';
			html += '<span class="sbj">'+data[i].value+'</span>';
			html += '<div class="bar"><span data-width="'+Math.round(data[i].valueCount/totalCnt*100)+'"></span></div>'; 
			html += '</li>';
		}
		$(id).empty();
		$(id).html(html);
		
		$(id + ' li').each(function(){
			var bar = $(this).find('.bar span');
			var percent = bar.data('width');
			bar.delay(500).animate({
				width: percent + '%'
			}, 1000);
		});
	}
}
/*
 * 선언하지 않고 hls 재생시에 이전에 불러온 스트리밍을 계속 load해옴 stopload를 위해 선언함.....
 */
var hlsConfig = {
	autoStartLoad: true,
    startPosition: -1,
    debug: false,
    capLevelOnFPSDrop: false,
    capLevelToPlayerSize: false,
    defaultAudioCodec: undefined,
    initialLiveManifestSize: 1,
    maxBufferLength: 30,
    maxMaxBufferLength: 600,
    backBufferLength: Infinity,
    maxBufferSize: 60 * 1000 * 1000,
    maxBufferHole: 0.5,
    highBufferWatchdogPeriod: 2,
    nudgeOffset: 0.1,
    nudgeMaxRetry: 3,
    maxFragLookUpTolerance: 0.25,
    liveSyncDurationCount: 5,
    liveMaxLatencyDurationCount: Infinity,
    liveDurationInfinity: true,
    liveBackBufferLength:0,
    enableWorker: true,
    enableSoftwareAES: true,
    manifestLoadingTimeOut: 10000,
    manifestLoadingMaxRetry: 3,
    manifestLoadingRetryDelay: 1000,
    manifestLoadingMaxRetryTimeout: 64000,
    startLevel: undefined,
    levelLoadingTimeOut: 10000,
    levelLoadingMaxRetry: 4,
    levelLoadingRetryDelay: 1000,
    levelLoadingMaxRetryTimeout: 64000,
    fragLoadingTimeOut: 20000,
    fragLoadingMaxRetry: 6,
    fragLoadingRetryDelay: 1000,
    fragLoadingMaxRetryTimeout: 64000,
    startFragPrefetch: false,
    testBandwidth: true,
    progressive: true,
    lowLatencyMode: true,
    fpsDroppedMonitoringPeriod: 5000,
    fpsDroppedMonitoringThreshold: 0.2,
    appendErrorMaxRetry: 3,
    enableWebVTT: true,
    enableIMSC1: true,
    enableCEA708Captions: true,
    stretchShortVideoTrack: false,
    maxAudioFramesDrift: 1,
    forceKeyFrameOnDiscontinuity: true,
    abrEwmaFastLive: 3.0,
    abrEwmaSlowLive: 9.0,
    abrEwmaFastVoD: 3.0,
    abrEwmaSlowVoD: 9.0,
    abrEwmaDefaultEstimate: 500000,
    abrBandWidthFactor: 0.95,
    abrBandWidthUpFactor: 0.7,
    abrMaxWithRealBitrate: false,
    maxStarvationDelay: 4,
    maxLoadingDelay: 4,
    minAutoBitrate: 0,
    emeEnabled: false,
    widevineLicenseUrl: undefined,
    drmSystemOptions: {},
}
var mainCctv = {
	video : document.getElementById('cctvVideo'),
	videoSrc : '',
	hls : new Hls(hlsConfig),
}
var cctv01 = {
	video : document.getElementById('cctvVideo01'),
	videoSrc : '',
	hls : new Hls(hlsConfig),
}
var cctv02 = {
	video : document.getElementById('cctvVideo02'),
	videoSrc : '',
	hls : new Hls(hlsConfig),
}
var cctv03 = {
	video : document.getElementById('cctvVideo03'),
	videoSrc : '',
	hls : new Hls(hlsConfig),
}
var cctv04 = {
	video : document.getElementById('cctvVideo04'),
	videoSrc : '',
	hls : new Hls(hlsConfig),
}
