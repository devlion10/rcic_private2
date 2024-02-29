/************************************************************
	설명 : RCIC 용 차트 
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

(function(window, $) {  
	"use strict";
	var RcicChart = function(options){
		var _self = this;
		this.init(options);
	};

	/************************************************************
	설명 : 맵 전역함수 설정
	    : chartType이 없으면 기본 LineChart로 설정
	************************************************************/
	RcicChart.prototype = {
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
			//공사추이
			if(!$.isNullString(_self.config.chart1Config)){
				_self.createChart1Data();
			}
			//지역별			
			if(!$.isNullString(_self.config.chart2Config)){
				_self.createChart2Data();
			}
			//발주처 
			if(!$.isNullString(_self.config.chart3Config)){
				_self.createChart3Data();   
			}
			//지도
			if(!$.isNullString(_self.config.chart4Config)){
				_self.createChart4Data();  
			}  
			//공사종류
			if(!$.isNullString(_self.config.chart5Config)){
				_self.createChart5Data();  
			}  			
			//시설종류		
			if(!$.isNullString(_self.config.chart6Config)){
				_self.createChart6Data();  
			}
			//수집 및 분석 현황 차트 추가		
			if(!$.isNullString(_self.config.chart7Config)){
				_self.createChart7Data();  
			}  		
		},
		createChart1Data:function(pDayType){ 
		
			var _self = this; 
			if($.isNullString(_self.config.chart1Config)) return;
			if ($('#'+_self.config.chart1Config.divId).length == 0) {
			    return;
			}
			var dayType = "";  
			
			if($.isNullString(pDayType)){  
				pDayType = "week";
			} 
			
			// 공사종류, 시설물 종류 리스트
		/*	var obj = new Object();
				obj.url = "/rcic/code/selectDetailCode";
				obj.groupCode = "CD0004";
				var dataList = setDefault(obj);
				$.commonAjax(dataList,'', function(response, status, headers, config){
					_self.roadList= response.list;
				});
				
				obj.url = "/rcic/code/selectDetailCode";
				obj.groupCode = "CD0002";
				var dataList = setDefault(obj);
				$.commonAjax(dataList,'', function(response, status, headers, config){
					_self.facList= response.list;
				});
			*/   
			
			var collection ="tb_analysis_info";
			var chekPeriod = $('input[name="dRadio"]:checked').val();
		
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
			}
			
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
						if(dayType=="stdr_week" || dayType=="bidntcedt_week"  || dayType=="thtm_ccmplt_week"){
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
						}
						
						var obj = new Object();
							obj.총공사 =  Code161Cnt+ CodeB50Cnt +Code99Cnt;
							obj.기간 =  data[i].value; 
							obj.국도 =  Code161Cnt;
							obj.고속도로 =  CodeB50Cnt;
							obj.지방도 =  Code99Cnt;
							nArray.push(obj);
					}
					_self.createChart1(nArray,dayType);   
				});	 
		},  
		createChart1:function(data,dayType){
			    var _self = this; 
			
				if(chart1 != null){  
					chart1.dispose(); 
				}
				
				am4core.ready(function() {				
				am4core.useTheme(_self.config.chart1Config.theme);
				var chart = am4core.create(_self.config.chart1Config.divId, _self.config.chart1Config.chartType);
				
				
				chart.exporting.menu = new am4core.ExportMenu(); 
				
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
			var collection ="tb_analysis_info";
			var dayType = "";  
			var chekPeriod = $('input[name="dRadio"]:checked').val();
			if(chekPeriod == "bidntcedt"){  
				dayType = 'bidntcedt_week';	//공고일
			}else if(chekPeriod == "consrdt"){
				dayType = 'stdr_week'; 	//공사기간
			}else{   
				dayType = 'thtm_ccmplt_week'; 	//공사기간
			}
			
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
			
	        var data = new Object();
			    data.collection=collection;
			    data.searchKeyword = G.contition["searchKeyword"];
				data.roadTypeCd = G.contition["roadType"]["fieldValue"];
				data.facTypeCd = G.contition["facType"]["fieldValue"];
			    data.gbn = "pivot";  
			    data.pivot = "sido_nm,sgg_nm,emd_nm";     
			    data.facet = "on" ; 
			    data.limit = "50" ;  
			    //data.limit = "10" ;   
			    data.authNo = G.contition["authNo"]["authNo"];
				data.prdtReliCd = "";
			    data.prdtReliChk = "Y";
				_commonSearch.getSearchCount(data, collection, function(response){
					
					var data = response.result;  
					var nArray = new Array();
					for(var i in data){
						var sggArray = new Array();
						
						var sidoPivot = data[i].pivot
						for(var p in sidoPivot){
							var s  = sidoPivot[p];  
							var emdArray = new Array();
							var sggPivot = s.pivot;
							
							for(var z in sggPivot){ 
								var e  = sggPivot[z];   
								var obj = new Object();
									obj.name =  e.value;
									obj.value =  e.valueCount;
									emdArray.push(obj); 
							}
							var obj = new Object();
								obj.name =  s.value;
								obj.value =  s.valueCount;
								obj.children = emdArray;
								sggArray.push(obj);
						} 
						var obj = new Object();
							obj.name =  data[i].value; 
							obj.value =  data[i].valueCount; 
							obj.children = sggArray;
							nArray.push(obj);
				 }  
				_self.createChart2(nArray);   
			});	  
		},
		createChart2:function(data){
			
			var _self = this;
			if(chart2 != null){  
				chart2.dispose(); 
			} 
			am4core.ready(function() {
				var chart = am4core.create(_self.config.chart2Config.divId,_self.config.chart2Config.chartType);
					chart.data = data; 
					chart.maxLevels = 1;
					chart.colors.step = 2;
					
					 
				/* Define data fields */
					chart.dataFields.value = "value";
					chart.dataFields.name = "name";
					chart.dataFields.children = "children";
	
				var level1 = chart.seriesTemplates.create("0");
				var level1_bullet = level1.bullets.push(new am4charts.LabelBullet());
				level1_bullet.locationY = 0.5;
				level1_bullet.locationX = 0.5;
				level1_bullet.label.text = "{name}";
				level1_bullet.label.fill = am4core.color("#fff");
				
				var level1_column = level1.columns.template;
				level1_column.column.cornerRadius(10, 10, 10, 10);
				level1_column.fillOpacity = 0.8;
				level1_column.stroke = am4core.color("#fff");
				level1_column.strokeWidth = 5;
				level1_column.strokeOpacity = 1;
				level1_column.tooltipText = "{name}:{value}건";
	
				var level2 = chart.seriesTemplates.create("1");
				var level2_bullet = level2.bullets.push(new am4charts.LabelBullet());
				level2_bullet.locationY = 0.5;
				level2_bullet.locationX = 0.5;
				level2_bullet.label.text = "{name}";
				level2_bullet.label.fill = am4core.color("#fff");
				
				var level2_column = level1.columns.template;
				level2_column.column.cornerRadius(10, 10, 10, 10);
				level2_column.fillOpacity = 0.8;
				level2_column.stroke = am4core.color("#fff");
				level2_column.strokeWidth = 5;
				level2_column.strokeOpacity = 1;
				level2_column.tooltipText = "{name}:{value}건";  
	
				var level3 = chart.seriesTemplates.create("2");
				var level3_bullet = level3.bullets.push(new am4charts.LabelBullet());
				level3_bullet.locationY = 0.5;
				level3_bullet.locationX = 0.5;
				level3_bullet.label.text = "{name}";
				level3_bullet.label.fill = am4core.color("#fff");
				var level3_column = level1.columns.template;
				level3_column.column.cornerRadius(10, 10, 10, 10);
				level3_column.fillOpacity = 0.8;
				level3_column.stroke = am4core.color("#fff");
				level3_column.strokeWidth = 5;
				level3_column.strokeOpacity = 1; 
				level3_column.tooltipText = "{name}:{value}건"; 
	
				chart.navigationBar = new am4charts.NavigationBar();
				chart2 = chart; 
			});
		},
		createChart3Data:function(pDayType){
			 
			
			var _self = this;
			if($.isNullString(_self.config.chart3Config)) return;
			if ($('#'+_self.config.chart3Config.divId).length == 0) {
			    return;
			}
			if(!$.isNullString(pDayType)){
				dayType = pDayType;
			}
			var dayType = "";  
			var collection ="tb_analysis_info";
			var chekPeriod = $('input[name="dRadio"]:checked').val();
			if(chekPeriod == "bidntcedt"){  
				dayType = 'bidntcedt_week';	//공고일
			}else if(chekPeriod == "consrdt"){
				dayType = 'stdr_week'; 	//공사기간
			}else{
				dayType = 'thtm_ccmplt_week'; 	//공사기간
			}
				
			var data = new Object();
		    data.collection=collection;
		    
			
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
			
	        var data = new Object();
			    data.collection=collection;
			    data.searchKeyword = G.contition["searchKeyword"];
				data.roadTypeCd = G.contition["roadType"]["fieldValue"];
				data.facTypeCd = G.contition["facType"]["fieldValue"];
			    data.gbn = "pivot";  
			    data.pivot = "organization_step1_nm,organization_step2_nm,dminsttnm";     
			    data.facet = "on" ;  
			    data.limit = "30" ;    
			    data.authNo = G.contition["authNo"]["authNo"];
				data.prdtReliCd = "";
			    data.prdtReliChk = "Y";
				_commonSearch.getSearchCount(data, collection, function(response){  

					var data = response.result; 
					var nArray = new Array();
					for(var i in data){
						var sggArray = new Array();
						var sidoPivot = data[i].pivot
						
						for(var p in sidoPivot){
							var s  = sidoPivot[p];  
							var emdArray = new Array();
							var sggPivot = s.pivot;
							
							for(var z in sggPivot){ 
								var e  = sggPivot[z];   
								var obj = new Object();
									obj.name =  e.value;
									obj.value =  e.valueCount;  
									emdArray.push(obj); 
							}
							var obj = new Object();
								obj.name =  s.value;
								obj.value =  s.valueCount;
								obj.children = emdArray;
								sggArray.push(obj);
						} 
						
						if(data[i].value=="전라남도"){
							continue;	
						}
						
						if(data[i].value=="전체합계"){
							continue;
						}
						
						
						var obj = new Object();
							obj.name =  data[i].value; 
							obj.value =  data[i].valueCount; 
							obj.children = sggArray;
							nArray.push(obj);
				 } 
				_self.createChart3(nArray);   
			});	  
		},
		createChart3:function(nArray){
			  
			var _self = this;
			if(chart3 != null){  
				chart3.dispose(); 
			} 
			am4core.ready(function() {
				
				var chart = am4core.create(_self.config.chart3Config.divId,am4plugins_forceDirected.ForceDirectedTree);
				var networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())
					networkSeries.data = nArray;
				
				chart.legend = new am4charts.Legend();
				chart.legend.position="right";
				chart.legend.fontSize="0";
										
				networkSeries.dataFields.value = "value";
				networkSeries.dataFields.name = "name";
				networkSeries.dataFields.children = "children";
				networkSeries.nodes.template.tooltipText = "{name}:{value}";
				networkSeries.nodes.template.fillOpacity = 1;

				networkSeries.nodes.template.label.text = "{name}"
				networkSeries.fontSize = 10;
				networkSeries.maxLevels = 1;
				networkSeries.minRadius = 20;
				networkSeries.maxRadius = 60;

				networkSeries.links.template.strokeWidth = 1; 
				networkSeries.nodes.template.label.truncate = true;

				networkSeries.nodes.template.outerCircle.filters.push(new am4core.DropShadowFilter());
				networkSeries.nodes.template.label.hideOversized = false;
				
				var hoverState = networkSeries.links.template.states.create("hover");
				hoverState.properties.strokeWidth = 3;
				hoverState.properties.strokeOpacity = 1;
				
				

				networkSeries.nodes.template.events.on("over", function(event) {
				  event.target.dataItem.childLinks.each(function(link) {
				    link.isHover = true;
				  })
				  if (event.target.dataItem.parentLink) {
				    event.target.dataItem.parentLink.isHover = true;
				  }

				})

				networkSeries.nodes.template.events.on("out", function(event) {
				  event.target.dataItem.childLinks.each(function(link) {
				    link.isHover = false;
				  })
				  if (event.target.dataItem.parentLink) {
				    event.target.dataItem.parentLink.isHover = false;
				  }
				})
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
			var dayType = "";  
			var chekPeriod = $('input[name="dRadio"]:checked').val();
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
				G.contition.searchKeyword = searchKeyword;
				
			    data.searchKeyword = G.contition["searchKeyword"];
				data.roadTypeCd = G.contition["roadType"]["fieldValue"];
				data.facTypeCd = G.contition["facType"]["fieldValue"];
			    data.gbn = "pivot";
			    data.pivot = "sido_cd,sido_nm";     
			    
			 var sidoDataList ={};
			 var sggDataList ={};
				_commonSearch.getSearchCount(data, collection, function(response){  
					sidoDataList = response;
				});
				  data.pivot = "sgg_cd,sgg_nm";   
				_commonSearch.getSearchCount(data, collection, function(response){  
					sggDataList = response;
				});
			 
		        var listCnt = '17';
				var collection ="legaldong_sido";
		        var startPage = "0";
 
		        var data = {}; 
				    data.collection=collection;
				    data.searchKeyword = "*:*";   
				 var geojsonArray = new Array();
				 var legendArray = new Array();
				 
				 var valueArray = new Array();
			    _commonSearch.getSearchList(startPage, listCnt, data, collection, function (res) {
					var data = res.result;
					for(var i in data){
						if(data[i].geo_json == '' || data[i].geo_json == null) continue;
						var feature = (new ol.format.GeoJSON({})).readFeature(data[i].geo_json);  
						  var aa = feature.getGeometry().getExtent();
						  var centerPoint = ol.extent.getCenter(aa);
						  var sidoCd = data[i].sido_cd;
						  var obj = new Object();
						  for(var j in sidoDataList.result){ 
							  if(sidoCd==sidoDataList.result[j].value){
								  
								  var sidoPivot = sidoDataList.result[j].pivot;
									for(var p in sidoPivot){
										var s  = sidoPivot[p];
										feature.set("name",s.value);		
									}
								  feature.set("count",sidoDataList.result[j].valueCount);
								  feature.set("type","mainChart"); 
								  obj.count = sidoDataList.result[j].valueCount;
								  valueArray.push(sidoDataList.result[j].valueCount);
								  break;
							  }
						  } 
						  if($.isNullString(feature.get("count"))){
							 // continue;
						  } 
						  geojsonArray.push(feature);  
						  legendArray.push(obj);
					} 
	            		_self.createChart4(res,geojsonArray,legendArray,valueArray);
		        });
		},  
		/**
		 * 지도
		 * */
		createChart4:function(data,features,legendArray,valueArray){
			
			var _self = this; 
				if(mapInit!=null){ 
					//$('#'+_self.config.chart4Config.divId).empty();
					mapInit.map.updateSize();
				}
				
				var obj = {};
				    obj.type="mainChart";  
				    
			    var sidoLayer = mapInit.mapLayerMng.getLayerById('sidoLayer'); 
		        if(!$.isNullString(sidoLayer)){ 
		    	   mapInit.map.removeLayer(sidoLayer);
		        };     
		        mapInit.mapLayerMng.addMainTempLayerT("sidoLayer",features);
		        
		        getAndSetClassesFromData(valueArray, 5, "method_Q", null); 
		        var sidoLayer = mapInit.mapLayerMng.getLayerById('sidoLayer');
		        sidoLayer.setStyle(geoSetStyle);
		          
				var sggLayer = mapInit.mapLayerMng.getLayerById('RCIC:tb_legaldong_sgg');
				mapInit.mapEvtMng.onMapEvt();  
				
				mapInit.map.getView().on("change:resolution",function(){
				  if (mapInit.map.getView().getAnimating()) { 
			          return;
				  }
				  if(mapInit.map.getView().getZoom()>0 && mapInit.map.getView().getZoom() <= 2){    
					   sidoLayer.setVisible(true);  
					   sggLayer.setVisible(false);
				   }else if(mapInit.map.getView().getZoom() > 2  && mapInit.map.getView().getZoom() <=4){
					   sidoLayer.setVisible(false);
					   sggLayer.setVisible(true);
				   }else if(mapInit.map.getView().getZoom() >  4 ){   
					   sidoLayer.setVisible(false);
					   sggLayer.setVisible(false);
				   }
				})
		},
		createChart5Data:function(pDayType){
			
			var _self = this;
			if($.isNullString(_self.config.chart5Config)) return;
			if ($('#'+_self.config.chart5Config.divId).length == 0) {
			    return;
			}
			var collection ="tb_analysis_road_info";
			var chekPeriod = $('input[name="dRadio"]:checked').val();
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
			    data.authNo = G.contition["authNo"]["authNo"];
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
				$.commonAjax(dataList,'', function(response, status, headers, config){
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
						_self.createChart5(newArr);   
					});	  
				});  
				
		},  
		createChart5:function(data){ 
			var _self = this;
			if(chart5 != null){  
				chart5.dispose(); 
			} 
			
			am4core.ready(function() {
				am4core.useTheme(am4themes_animated);
				var chart = am4core.create(_self.config.chart5Config.divId, am4charts.PieChart);
					chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
					chart.data = data;
					chart.innerRadius = am4core.percent(30);
					chart.radius = am4core.percent(60);
				
					if(data.length == 1){
						chart.depth = 50; 
					}else{
						chart.depth = 120;  
					}
					
					var series = chart.series.push(new am4charts.PieSeries3D()); 
					series.dataFields.value = "valueCount";
					series.dataFields.depthValue = "valueCount";
					series.dataFields.category = "value";
					
					series.slices.template.cornerRadius = 1;
					series.colors.step = 4;
					
					series.ticks.template.disabled = true;
					series.alignLabels = false;
					//series.labels.template.text = "{value.percent.formatNumber('#.0')}%";
					series.labels.template.text = "";
					series.labels.template.radius = am4core.percent(-30); 
					series.labels.template.fill = am4core.color("black");
					series.labels.template.fontSize = "13";
					
					chart.legend = new am4charts.Legend();
					chart.legend.position="right";
					chart.legend.fontSize="13";
					chart5 = chart;
				});
		},
		createChart6Data:function(pDayType){
			
			var _self = this;
			if ($('#'+_self.config.chart6Config.divId).length == 0) {
			    return;
			}
			var collection ="tb_analysis_fac_info";
			var chekPeriod = $('input[name="dRadio"]:checked').val();
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
				$.commonAjax(dataList,'', function(response, status, headers, config){
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
					_self.createChart6(newArr);   
					
				});	  
			});
				
				
		},  
		createChart6:function(data){ 
			var _self = this;
			if(chart6 != null){  
				chart6.dispose(); 
			} 
			
			am4core.ready(function() {
				am4core.useTheme(am4themes_animated);
				
				var chart = am4core.create(_self.config.chart6Config.divId, am4charts.PieChart);
					chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
					chart.data = data;
					chart.innerRadius = am4core.percent(30); 
					chart.radius = am4core.percent(60);
					
					if(data.length == 1){
						chart.depth = 50; 
					}else{
						chart.depth = 120;  
					}
					
					var series = chart.series.push(new am4charts.PieSeries3D()); 
					series.dataFields.value = "valueCount";
					series.dataFields.depthValue = "valueCount";
					series.dataFields.category = "value";
					
					series.slices.template.cornerRadius = 1;
					series.colors.step = 4;
					
					series.ticks.template.disabled = true;
					series.alignLabels = false;
					//series.labels.template.text = "{value.percent.formatNumber('#.0')}%";
					series.labels.template.text = "";
					series.labels.template.radius = am4core.percent(-30); 
					series.labels.template.fill = am4core.color("black");
					
					chart.legend = new am4charts.Legend();
					chart.legend.position="right";
					chart.legend.fontSize="13";
					chart6 = chart;
				});
		},
		createChart7Data:function(pDayType){
			
			var _self = this;
			if($.isNullString(_self.config.chart7Config)) return;
			if ($('#'+_self.config.chart7Config.divId).length == 0) {
			    return;
			}
			var collection ="g2b_result_info";
			var chekPeriod = $('input[name="dRadio"]:checked').val();
			var dayType = "";
			
			if($.isNullString(pDayType)){  
				pDayType = "week";
			}
			
			if(pDayType == "day"){
				dayType = "bidntcedt";
			}else if(pDayType == "week"){
				dayType = "bidntcedt_week";
			}else if(pDayType == "month"){
				dayType = "bidntcedt_yyyymm";
			}
			
	        var data = new Object(); 
			    data.collection=collection;
			    data.dayType = dayType;
			    
			    var searchKeyword = "stdr_dt" + ':['+startDt+' TO '+endDt+']';
				
			    data.searchKeyword = searchKeyword;
			    data.gbn = "pivot";  
			    data.pivot = dayType;     
			    data.facet = "on" ;
			    
			    var collectArray = new Array();
			    var analysisArray = new Array();
			    
			    _commonSearch.getSearchCount(data, collection, function(response){
			    	collectArray = response.result;
			    	
			    	var collectData = collectArray;
			    	
			    	var nArray = new Array();
			     
			    	var collection ="tb_analysis_info";
			    	
			    	 _commonSearch.getSearchCount(data, collection, function(response){
					    	analysisArray = response.result;
					    	
					    	for(var i in collectArray){
					    		
					    		var stdrDt = collectArray[i].value;
					    		
					    		if(dayType=="bidntcedt_week"){
									if(collectArray[i].value.length==5){
										collectArray[i].value = collectArray[i].value.substring(0,4)+"년 0"+collectArray[i].value.substring(4)+"주";
									}else{
										collectArray[i].value = collectArray[i].value.substring(0,4)+"년 "+collectArray[i].value.substring(4)+"주";
									}
								}else if(dayType=="bidntcedt_yyyymm"){
									if(collectArray[i].value.length==5){
										collectArray[i].value = collectArray[i].value.substring(0,4)+"년 0"+collectArray[i].value.substring(4)+"월";
									}else{
										collectArray[i].value = collectArray[i].value.substring(0,4)+"년 "+collectArray[i].value.substring(4)+"월";
									}
								}else{
									if(collectArray[i].value.length==5){
										collectArray[i].value = collectArray[i].value.substring(2,4)+"/0"+collectArray[i].value.substring(4,6)+"/"+collectArray[i].value.substring(6);
									}else{
										collectArray[i].value = collectArray[i].value.substring(2,4)+"/"+collectArray[i].value.substring(4,6)+"/"+collectArray[i].value.substring(6);
									}     
								}
					    		
					    		
					    		
					    		var obj = new Object();
								    obj.기간 =  collectData[i].value;
								    obj.수집 =  collectData[i].valueCount;
								    var isFind = false;
								      
					    		for(var j in analysisArray){
					    			if(stdrDt == analysisArray[j].value){
					    				obj.분석 =  analysisArray[j].valueCount;
					    				isFind = true;
					    				break;
					    			}
					    		}
					    		
					    		if(!isFind){
					    			obj.분석 =0;
					    		}
					    		nArray.push(obj);
					    	}
					    	
					    	var dd = _.sortBy(nArray,"기간");  
					    		dd = removeDuplicates(dd,"기간");
					    	_self.createChart7(dd);
						});	
			});	
		},
		
		createChart7:function(data){
			
			var _self = this;
			if(chart7 != null){  
				chart7.dispose(); 
			} 
			
			am4core.ready(function() {
				// Themes begin
				am4core.useTheme(am4themes_animated);
				// Themes end

				// Create chart instance
				var chart = am4core.create(_self.config.chart7Config.divId, am4charts.XYChart);  

				// Increase contrast by taking evey second color
				chart.colors.step = 2;
				// Export
				chart.exporting.menu = new am4core.ExportMenu();
				chart.exporting.filePrefix = "기간별 수집 및 분석 현황";
				
 
				// Data for both series

				/* Create axes */
				var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
				
				categoryAxis.dataFields.category = "기간";
				categoryAxis.renderer.ticks.template.strokeOpacity = 0.1;
				categoryAxis.title.text = "기간";
				/* Create value axis */
				var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
				valueAxis.title.text = "건수";
				
				var lineSeries1 = chart.series.push(new am4charts.LineSeries());
				lineSeries1.stroke = am4core.color("#20a8d8");
				lineSeries1.fill = am4core.color("#20a8d8");
				lineSeries1.dataFields.valueY = "분석";  
				lineSeries1.dataFields.categoryX = "기간";
				lineSeries1.name = "분석";
				lineSeries1.strokeWidth = 2;
				lineSeries1.tooltipText = "[#fff font-size: 14px]{name} : {valueY}건[/]";
				
				var lineSeries2 = chart.series.push(new am4charts.LineSeries());
				lineSeries2.stroke = am4core.color("#f86c6b");
				lineSeries2.fill = am4core.color("#f86c6b");
				lineSeries2.dataFields.valueY = "수집";
				lineSeries2.dataFields.categoryX = "기간";
				lineSeries2.name = "수집";
				lineSeries2.strokeWidth = 2;
				lineSeries2.tooltipText = "[#fff font-size: 14px]{name} : {valueY}건[/]";
				
				var bullet1 = lineSeries1.bullets.push(new am4charts.Bullet());
				bullet1.fill = am4core.color("#20a8d8"); // tooltips grab fill from parent by default
					
				var bullet2 = lineSeries2.bullets.push(new am4charts.Bullet());
				bullet2.fill = am4core.color("#f86c6b"); // tooltips grab fill from parent by default
					
				var circle1 = bullet1.createChild(am4core.Circle);
				circle1.radius = 3;
				
				var circle2 = bullet2.createChild(am4core.Circle);
				circle2.radius = 3;
				
				chart.cursor = new am4charts.XYCursor();
				chart.cursor.lineX.disabled = true;
				chart.cursor.lineY.disabled = true;
				
				categoryAxis.adapter.add("getTooltipText", function (text) {
					
				 return  text; 	
				});

				chart.data = data;
				chart.legend = new am4charts.Legend();
				chart.legend.position="top";
				
				chart7 = chart;
				
				

			}); // end am4core.ready()
		}
	}
	window.RcicChart = RcicChart;
	window.name = "RcicChart.js";
})(window, jQuery);
