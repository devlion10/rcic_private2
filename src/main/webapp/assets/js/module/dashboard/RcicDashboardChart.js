/************************************************************
	설명 : RCIC 대시보드용 차트 
	@Param : Chart Type : Pie, Line, Stack
************************************************************/
var chart1;
var chart2;
var chart3;
var chart4;
var chart5;
var chart6;
var chart7;
var mapInit;

var dayArr;
var weekArr;
var monthArr;
(function(window, $) {  
	"use strict";
	var RcicDashboardChart = function(options){
		var _self = this;
		this.init(options);
	};

	/************************************************************
	설명 : 맵 전역함수 설정
	    : chartType이 없으면 기본 LineChart로 설정
	************************************************************/
	RcicDashboardChart.prototype = {
		config:null, 
		roadList:null,
		facList:null,
		_defaults : {
			    chartType: am4charts.TreeMap,
				theme: am4themes_animated,
		},
		init : function(_options){
			var _self = this; 
				_self.config = $.extend({}, _self._defaults, _options);
				_self.setChart();
		},
		setZoomIn:function(){
			
		},
		setZoomOut:function(){
			
		},
		setChart:function(){
			var _self = this;
			am4core.addLicense("CH245886500");
			// 도로별 공사현황(공사추이)
			/*if(!$.isNullString(_self.config.chart1Config)){
				_self.createChart1Data();
			}
			if(!$.isNullString(_self.config.chart4Config)){
				_self.createChart4Data();
			}
			if(!$.isNullString(_self.config.chart5Config)){
				_self.createChart5Data();
			}*/
			//공사종류
			if(!$.isNullString(_self.config.chart2Config)){
				_self.createChart2Data();  
			}  			
			//시설종류		
			if(!$.isNullString(_self.config.chart3Config)){
				_self.createChart3Data();  
			}
		},
		createChart1Data:function(pDayType){ 
			var _self = this; 
			if($.isNullString(_self.config.chart1Config)) return;
			if ($('#'+_self.config.chart1Config.divId).length == 0) {
			    return;
			}
			
			var collection ="tb_analysis_info";
			var chekPeriod = "bidntcedt"; //$('input[name="dRadio"]:checked').val();
		
			var dayType = "bidntcedt";  
			/*if($.isNullString(pDayType)){  
				pDayType = "week";
			} 
			if(chekPeriod == "bidntcedt"){  //공고일
				if(pDayType == "day"){
					dayType = "bidntcedt";
				}else if(pDayType == "week"){
					dayType = "bidntcedt_week";
				}else if(pDayType == "month"){
					dayType = "bidntcedt_yyyymm";
				}
			
			}else if(chekPeriod == "consrdt"){ 	// 공사기간  
				if(pDayType == "day"){
					dayType = "stdr_dt";
				}else if(pDayType == "week"){
					dayType = "stdr_week";
				}else if(pDayType == "month"){
					dayType = "stdr_yyyymm";
				}
			}else{
				if(pDayType == "day"){
					dayType = "thtm_ccmplt_date";
				}else if(pDayType == "week"){
					dayType = "thtm_ccmplt_week";
				}else if(pDayType == "month"){
					dayType = "thtm_ccmplt_yyyymm";
				}
			}*/
			
	        var data = new Object();
		    data.collection=collection;
		    data.dayType = dayType;
		    
			var searchKeyword = G.contition["base"]["radioVal"] + ':['+startDt+' TO '+endDt+']';
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
		    data.pivot = dayType +",const_road_clss";  
		    data.authNo = G.contition["authNo"]["authNo"];
			data.prdtReliCd = "";
		    data.prdtReliChk = "Y";

			_commonSearch.getSearchCount(data, collection, function(response){  
				var data = _.sortBy(response.result,"value");  
				
				var nArray = new Array();
				/*var Code161Cnt = 0;    
				var Code99Cnt = 0;  
				var CodeB50Cnt = 0; */
				for(var i in data){
					var totalCnt=0;
					var Code161Cnt = 0;    
					var Code99Cnt = 0;  
					var CodeB50Cnt = 0; 
					for(var p in data[i].pivot){
						if(data[i].pivot[p].value.startsWith("161")){
							Code161Cnt  = data[i].pivot[p].valueCount;
						}else if(data[i].pivot[p].value.startsWith("B500")){  //FIXME 고속도로 더 추가될수도 있음. 코드테이블의 const_road_clss 확인해봐야함.
							CodeB50Cnt  = data[i].pivot[p].valueCount;
						}else if(data[i].pivot[p].value.startsWith("99")){ 
							Code99Cnt  = data[i].pivot[p].valueCount;
						}  
					}
					/*if(dayType=="stdr_week" || dayType=="bidntcedt_week"  || dayType=="thtm_ccmplt_week"){
						if(data[i].value.length==5){
							data[i].value = data[i].value.substring(0,4)+"년 0"+data[i].value.substring(4)+"주";
						}else{
							data[i].value = data[i].value.substring(0,4)+"년 "+data[i].value.substring(4)+"주";
						}
					}else if(dayType=="stdr_yyyymm" || dayType=="bidntcedt_yyyymm" || dayType=="thtm_ccmplt_yyyymm"){
						if(data[i].value.length==5){
							data[i].value = data[i].value.substring(0,4)+"년 0"+data[i].value.substring(4)+"월";
						}else{
							data[i].value = data[i].value.substring(0,4)+"년 "+data[i].value.substring(4)+"월";
						}
					}else{
						if(data[i].value.length==5){
							data[i].value = data[i].value.substring(2,4)+"/0"+data[i].value.substring(4,6)+"/"+data[i].value.substring(6);
						}else{
							data[i].value = data[i].value.substring(2,4)+"/"+data[i].value.substring(4,6)+"/"+data[i].value.substring(6);
						}     
					}*/
					if(data[i].value.length==5){
						data[i].value = data[i].value.substring(2,4)+"/0"+data[i].value.substring(4,6)+"/"+data[i].value.substring(6);
					}else{
						data[i].value = data[i].value.substring(2,4)+"/"+data[i].value.substring(4,6)+"/"+data[i].value.substring(6);
					}
					
					var obj = new Object();
						obj.총공사 =  Code161Cnt+ CodeB50Cnt +Code99Cnt;
						obj.기간 =  data[i].value; 
						obj.국도 =  Code161Cnt;
						obj.고속도로 =  CodeB50Cnt;
						obj.지방도 =  Code99Cnt;
						nArray.push(obj);
				}
				dayArr = nArray;
				_self.createChart1(nArray,dayType);   
			});
		},  
		createChart1:function(data,dayType,divId){
		    var _self = this; 
		
			if(chart1 != null){  
				chart1.dispose(); 
			}
			
			var chartDivId;
			if($.isNullString(divId)){  
				chartDivId = _self.config.chart1Config.divId;
			} else {
				chartDivId = divId;
			}
			
			am4core.ready(function() {				
				am4core.useTheme(_self.config.chart1Config.theme);
				var chart = am4core.create(chartDivId, _self.config.chart1Config.chartType);
				
				//chart.exporting.menu = new am4core.ExportMenu(); 
				
				chart.exporting.filePrefix = "총공사추이";
				var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
				categoryAxis.dataFields.category = "기간";
				
				var label = categoryAxis.renderer.labels.template;
				categoryAxis.renderer.ticks.template.strokeOpacity = 0.1;
				categoryAxis.title.text = "기간";
				var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
				valueAxis.title.text = "건수";
				
				var lineSeries1 = chart.series.push(new am4charts.LineSeries());
				lineSeries1.stroke = am4core.color("#20a8d8");
				lineSeries1.fill = am4core.color("#20a8d8");
				lineSeries1.dataFields.valueY = "총공사";
				lineSeries1.dataFields.categoryX = "기간";
				lineSeries1.name = "총공사";
				lineSeries1.strokeWidth = 2;
				lineSeries1.tooltipText = "[#fff font-size: 14px]{name} : [#fff font-size: 14px]{valueY}건[/]";
				
				var lineSeries2 = chart.series.push(new am4charts.LineSeries());
				lineSeries2.stroke = am4core.color("#61b80c");
				lineSeries2.fill = am4core.color("#61b80c");
				lineSeries2.dataFields.valueY = "국도";
				lineSeries2.dataFields.categoryX = "기간";
				lineSeries2.name = "국도";  
				lineSeries2.strokeWidth = 2;
				lineSeries2.tooltipText = "[#fff font-size: 14px]{name} : [#fff font-size: 14px]{valueY}건[/]";
				
				var lineSeries3 = chart.series.push(new am4charts.LineSeries());
				lineSeries3.stroke = am4core.color("#ffc107");
				lineSeries3.fill = am4core.color("#ffc107");
				lineSeries3.dataFields.valueY = "지방도";
				lineSeries3.dataFields.categoryX = "기간";  
				lineSeries3.name = "지방도";
				lineSeries3.strokeWidth = 2;
				lineSeries3.tooltipText = "[#fff font-size: 14px]{name} : [#fff font-size: 14px]{valueY}건[/]";
				
				var lineSeries4 = chart.series.push(new am4charts.LineSeries());
				lineSeries4.stroke = am4core.color("#ff241b");
				lineSeries4.fill = am4core.color("#ff241b");
				lineSeries4.dataFields.valueY = "고속도로";
				lineSeries4.dataFields.categoryX = "기간";
				lineSeries4.name = "고속도로";  
				lineSeries4.strokeWidth = 2;
				lineSeries4.tooltipText = "[#fff font-size: 14px]{name} : [#fff font-size: 14px]{valueY}건[/]";
			 	
				var bullet1 = lineSeries1.bullets.push(new am4charts.Bullet());
				bullet1.fill = am4core.color("#20a8d8"); // tooltips grab fill from parent by default
					
				var bullet2 = lineSeries2.bullets.push(new am4charts.Bullet());
				bullet2.fill = am4core.color("#61b80c"); // tooltips grab fill from parent by default
				
				var bullet3 = lineSeries3.bullets.push(new am4charts.Bullet());
				bullet3.fill = am4core.color("#ffc107"); // tooltips grab fill from parent by default
				
				var bullet4 = lineSeries4.bullets.push(new am4charts.Bullet());  
				bullet4.fill = am4core.color("#ff241b"); // tooltips grab fill from parent by default
			 	
				var circle1 = bullet1.createChild(am4core.Circle);
				circle1.radius = 3;
				
				var circle2 = bullet2.createChild(am4core.Circle);
				circle2.radius = 3;
				
				var circle3 = bullet3.createChild(am4core.Circle);
				circle3.radius = 3;  
				
				var circle4 = bullet4.createChild(am4core.Circle);
				circle4.radius = 3;  
			 	
				chart.cursor = new am4charts.XYCursor();
				categoryAxis.adapter.add("getTooltipText", function (text) {
					/*var str="";                                             
					if(dayType=="stdr_week" || dayType=="bidntcedt_week"){
						str = text.substring(0,4)+"년"+text.substring(4,6) + "주";
					}else if(dayType=="stdr_yyyymm" || dayType=="bidntcedt_yyyymm" ){ 
						str = text.substring(0,4)+"년"+text.substring(4,6) + "월";
					}else if(dayType=="stdr_dt" || dayType=="bidntcedt_dt"){
						str = text.substring(0,4)+"년"+text.substring(4,6) + "월"+text.substring(6,8) + "일";
					}*/
					return  text;
				});
				chart.data = data;
				chart.legend = new am4charts.Legend();
				chart.legend.position="top";
				chart1 = chart;
			});
		},
		createChart2Data:function(pDayType){
			var _self = this;
			
			if($.isNullString(_self.config.chart2Config)) return;
			if ($('#'+_self.config.chart2Config.divId).length == 0) {
			    return;
			}
			var collection ="tb_analysis_road_info";
			var chekPeriod = "bidntcedt"; //$('input[name="dRadio"]:checked').val();
			var dayType = "";
			var radioVal = "";
			
			if(chekPeriod == "bidntcedt"){  
				dayType = 'bidntcedt_week';	//공고일
				radioVal = 'bidntcedt';
			}else if(chekPeriod == "consrdt"){
				dayType = 'stdr_week'; 	//공사기간
				radioVal = 'stdr_dt';
			}else{   
				dayType = 'thtm_ccmplt_week'; 	//공사기간
				radioVal = 'thtm_ccmplt_date';
			}
			
			if(!$.isNullString(pDayType)){  
				dayType = pDayType;
			}
			      
	        var data = new Object();
			    data.collection=collection;
			    data.dayType = dayType;
			    //data.authNo = G.contition["authNo"]["authNo"];
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
			    data.pivot = "road_ty_cd,road_ty_nm";
			    data.facet = "on" ;
			    data.limit = "10" ;  

				var obj = new Object();
				obj.url = "/rcic/code/selectDetailCode";
				obj.groupCode = "CD0004";
				var dataList = setDefault(obj);
				$.commonAjax3(dataList,'', function(response, status, headers, config){
					_self.roadList = response.list;  
					
					_commonSearch.getSearchCount(data, collection, function(response){  
						var data = response.result;
						var newArr  = new Array();
						var extCnt=0;
						for(var i in data){
							for(var j in _self.roadList){
								if(data[i].value==_self.roadList[j].code){
									var obj = new Object();
									obj.value = _self.roadList[j].codeNm;
									obj.valueCount = data[i].valueCount;
									if(!$.isNullString(data[i].value)){
										newArr.push(obj);
									}
								}
							}
						} 
						_self.createChart2(newArr);   
					});	  
				});  
				
		},  
		createChart2:function(data){ 
			var _self = this;
			if(chart2 != null){  
				chart2.dispose(); 
			} 
			
			am4core.ready(function() {
				am4core.useTheme(am4themes_animated);
				var chart = am4core.create(_self.config.chart2Config.divId, am4charts.PieChart);
				chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
				chart.data = data;
				chart.innerRadius = am4core.percent(30);
				//chart.radius = am4core.percent(60);
				
				/*if(data.length == 1){
					chart.depth = 50; 
				}else{
					chart.depth = 120;  
				}*/
				chart.depth = 50;
				
				var series = chart.series.push(new am4charts.PieSeries3D()); 
				series.dataFields.value = "valueCount";
				series.dataFields.depthValue = "valueCount";
				series.dataFields.category = "value";
				
				series.slices.template.cornerRadius = 1;
				series.colors.step = 4;
				
				series.ticks.template.disabled = true;
				series.alignLabels = false;
				series.labels.template.text = "{value.percent.formatNumber('#.0')}%";
				series.labels.template.radius = am4core.percent(-30); 
				series.labels.template.fill = am4core.color("black");
				series.labels.template.fontSize = 8;
				
				chart.legend = new am4charts.Legend();
				chart.legend.position="right";
				chart.legend.maxWidth = 120;
				chart.legend.fontSize="9";
				chart.legend.itemContainers.template.paddingTop = 4;
				chart.legend.itemContainers.template.paddingBottom = 4;
				
				var markerTemplate = chart.legend.markers.template;
				markerTemplate.width = 12;
				markerTemplate.height = 12;
				
				if (!chart.data || chart.data.length === 0){
					  const noDataMessagecontainer = chart.chartContainer.createChild(am4core.Container);
					  noDataMessagecontainer.align = 'center';
					  noDataMessagecontainer.isMeasured = false;
					  noDataMessagecontainer.x = am4core.percent(50);
					  noDataMessagecontainer.horizontalCenter = 'middle';
					  noDataMessagecontainer.y = am4core.percent(50);
					  noDataMessagecontainer.verticalCenter = 'middle';
					  noDataMessagecontainer.layout = 'vertical';

					  const messageLabel = noDataMessagecontainer.createChild(am4core.Label);
					  messageLabel.text = '데이터가 없습니다.';
					  messageLabel.textAlign = 'middle';
					  messageLabel.maxWidth = 300;
					  messageLabel.wrap = true;
				}
				
				chart2 = chart;
			});
		},
		createChart3Data:function(pDayType){
			var _self = this;
			if ($('#'+_self.config.chart3Config.divId).length == 0) {
			    return;
			}
			var collection ="tb_analysis_fac_info";
			var chekPeriod = "bidntcedt";//$('input[name="dRadio"]:checked').val();
			var dayType = "";
			if(chekPeriod == "bidntcedt"){  
				dayType = 'bidntcedt_week';	//공고일
			}else if(chekPeriod == "consrdt"){
				dayType = 'stdr_week'; 	//공사기간
			}else{   
				dayType = 'thtm_ccmplt_week'; 	//공사기간
			}
			if(!$.isNullString(pDayType)){  
				dayType = pDayType;
			}
			
	        var data = new Object();
		    data.collection=collection;
		    data.dayType = dayType;
		    data.authNo = G.contition["authNo"]["authNo"];
			data.prdtReliCd = "";
		    data.prdtReliChk = "Y";
		 		
			var searchKeyword = G.contition["base"]["radioVal"] + ':['+startDt+' TO '+endDt+']';
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
		    data.pivot = "fac_ty_cd,fac_ty_nm";     
		    data.facet = "on" ;
		    data.limit = "10" ;   
			    
			// 시설물 종류 리스트
			var obj = new Object();
			obj.url = "/rcic/code/selectDetailCode";
			obj.groupCode = "CD0002";
			var dataList = setDefault(obj);
			
			$.commonAjax3(dataList,'', function(response, status, headers, config){
				_self.facList= response.list;
				_commonSearch.getSearchCount(data, collection, function(response){  
					var data = response.result;  
					var newArr  = new Array();
					var extCnt=0;
					
					for(var i in data){ 
						for(var j in _self.facList){
							if(data[i].value==_self.facList[j].code){
								var obj = new Object();
								obj.value = _self.facList[j].codeNm;
								obj.valueCount = data[i].valueCount; 
								if(!$.isNullString(data[i].value)){
									newArr.push(obj);
								}
							}
						}
					} 
					_self.createChart3(newArr);   
				});	  
			});
		},  
		createChart3:function(data){ 
			var _self = this;
			if(chart3 != null){  
				chart3.dispose(); 
			} 
			
			am4core.ready(function() {
				am4core.useTheme(am4themes_animated);
				
				var chart = am4core.create(_self.config.chart3Config.divId, am4charts.PieChart);
				chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
				chart.data = data;
				chart.innerRadius = am4core.percent(30); 
				//chart.radius = am4core.percent(60);
				
				/*if(data.length == 1){
					chart.depth = 50; 
				}else{
					chart.depth = 120;  
				}*/
				chart.depth = 50;
				
				var series = chart.series.push(new am4charts.PieSeries3D()); 
				series.dataFields.value = "valueCount";
				series.dataFields.depthValue = "valueCount";
				series.dataFields.category = "value";
				
				series.slices.template.cornerRadius = 1;
				series.colors.step = 4;
				
				series.ticks.template.disabled = true;
				series.alignLabels = false;
				series.labels.template.text = "{value.percent.formatNumber('#.0')}%";
				series.labels.template.radius = am4core.percent(-30); 
				series.labels.template.fill = am4core.color("black");
				series.labels.template.fontSize = 8;
				
				chart.legend = new am4charts.Legend();
				chart.legend.position="right";
				chart.legend.maxWidth = 120;
				chart.legend.fontSize="9";
				chart.legend.itemContainers.template.paddingTop = 4;
				chart.legend.itemContainers.template.paddingBottom = 4;
				var markerTemplate = chart.legend.markers.template;
				markerTemplate.width = 12;
				markerTemplate.height = 12;
				
				if (!chart.data || chart.data.length === 0){
					  const noDataMessagecontainer = chart.chartContainer.createChild(am4core.Container);
					  noDataMessagecontainer.align = 'center';
					  noDataMessagecontainer.isMeasured = false;
					  noDataMessagecontainer.x = am4core.percent(50);
					  noDataMessagecontainer.horizontalCenter = 'middle';
					  noDataMessagecontainer.y = am4core.percent(50);
					  noDataMessagecontainer.verticalCenter = 'middle';
					  noDataMessagecontainer.layout = 'vertical';

					  const messageLabel = noDataMessagecontainer.createChild(am4core.Label);
					  messageLabel.text = '데이터가 없습니다.';
					  messageLabel.textAlign = 'middle';
					  messageLabel.maxWidth = 300;
					  messageLabel.wrap = true;
				}
				
				chart3 = chart;
			});
		},
		createChart4Data:function(pDayType){ 
			var _self = this; 
			if($.isNullString(_self.config.chart4Config)) return;
			if ($('#'+_self.config.chart4Config.divId).length == 0) {
			    return;
			}
			
			var collection ="tb_analysis_info";
			var chekPeriod = "bidntcedt"; //$('input[name="dRadio"]:checked').val();
		
			var dayType = "bidntcedt_week";  
			
	        var data = new Object();
		    data.collection=collection;
		    data.dayType = dayType;
		    
			var searchKeyword = G.contition["base"]["radioVal"] + ':['+startDt+' TO '+endDt+']';
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
		    data.pivot = dayType +",const_road_clss";  
		    data.authNo = G.contition["authNo"]["authNo"];
			data.prdtReliCd = "";
		    data.prdtReliChk = "Y";

			_commonSearch.getSearchCount(data, collection, function(response){  
				var data = _.sortBy(response.result,"value");  
				
				var nArray = new Array();
				/*var Code161Cnt = 0;    
				var Code99Cnt = 0;  
				var CodeB50Cnt = 0; */
				for(var i in data){
					var totalCnt=0;
					var Code161Cnt = 0;    
					var Code99Cnt = 0;  
					var CodeB50Cnt = 0; 
					for(var p in data[i].pivot){
						if(data[i].pivot[p].value.startsWith("161")){
							Code161Cnt  = data[i].pivot[p].valueCount;
						}else if(data[i].pivot[p].value.startsWith("B500")){  //FIXME 고속도로 더 추가될수도 있음. 코드테이블의 const_road_clss 확인해봐야함.
							CodeB50Cnt  = data[i].pivot[p].valueCount;
						}else if(data[i].pivot[p].value.startsWith("99")){ 
							Code99Cnt  = data[i].pivot[p].valueCount;
						}  
					}
					if(data[i].value.length==5){
						data[i].value = data[i].value.substring(0,4)+"년 0"+data[i].value.substring(4)+"주";
					}else{
						data[i].value = data[i].value.substring(0,4)+"년 "+data[i].value.substring(4)+"주";
					}
					
					var obj = new Object();
						obj.총공사 =  Code161Cnt+ CodeB50Cnt +Code99Cnt;
						obj.기간 =  data[i].value; 
						obj.국도 =  Code161Cnt;
						obj.고속도로 =  CodeB50Cnt;
						obj.지방도 =  Code99Cnt;
						nArray.push(obj);
				}
				weekArr = nArray;
				//_self.createChart1(nArray,dayType,_self.config.chart4Config.divId);   
			});
		},
		createChart5Data:function(pDayType){ 
			var _self = this; 
			if($.isNullString(_self.config.chart5Config)) return;
			if ($('#'+_self.config.chart5Config.divId).length == 0) {
			    return;
			}
			
			var collection ="tb_analysis_info";
			var chekPeriod = "bidntcedt"; //$('input[name="dRadio"]:checked').val();
		
			var dayType = "bidntcedt_yyyymm";  
			
	        var data = new Object();
		    data.collection=collection;
		    data.dayType = dayType;
		    
			var searchKeyword = G.contition["base"]["radioVal"] + ':['+startDt+' TO '+endDt+']';
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
		    data.pivot = dayType +",const_road_clss";  
		    data.authNo = G.contition["authNo"]["authNo"];
			data.prdtReliCd = "";
		    data.prdtReliChk = "Y";

			_commonSearch.getSearchCount(data, collection, function(response){  
				var data = _.sortBy(response.result,"value");  
				
				var nArray = new Array();
				/*var Code161Cnt = 0;    
				var Code99Cnt = 0;  
				var CodeB50Cnt = 0; */
				for(var i in data){
					var totalCnt=0;
					var Code161Cnt = 0;    
					var Code99Cnt = 0;  
					var CodeB50Cnt = 0; 
					for(var p in data[i].pivot){
						if(data[i].pivot[p].value.startsWith("161")){
							Code161Cnt  = data[i].pivot[p].valueCount;
						}else if(data[i].pivot[p].value.startsWith("B500")){  //FIXME 고속도로 더 추가될수도 있음. 코드테이블의 const_road_clss 확인해봐야함.
							CodeB50Cnt  = data[i].pivot[p].valueCount;
						}else if(data[i].pivot[p].value.startsWith("99")){ 
							Code99Cnt  = data[i].pivot[p].valueCount;
						}  
					}
					if(data[i].value.length==5){
						data[i].value = data[i].value.substring(0,4)+"년 0"+data[i].value.substring(4)+"월";
					}else{
						data[i].value = data[i].value.substring(0,4)+"년 "+data[i].value.substring(4)+"월";
					}
					
					var obj = new Object();
						obj.총공사 =  Code161Cnt+ CodeB50Cnt +Code99Cnt;
						obj.기간 =  data[i].value; 
						obj.국도 =  Code161Cnt;
						obj.고속도로 =  CodeB50Cnt;
						obj.지방도 =  Code99Cnt;
						nArray.push(obj);
				}
				monthArr = nArray;
				//_self.createChart1(nArray,dayType,_self.config.chart5Config.divId);   
			});
		},
	}
	window.RcicDashboardChart = RcicDashboardChart;
	window.name = "RcicDashboardChart.js";
})(window, jQuery);
