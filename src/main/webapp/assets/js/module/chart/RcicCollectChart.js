/************************************************************
	설명 : RCIC 용 차트 
	@Param : Chart Type : Pie, Line, Stack
************************************************************/
var cchart1;
var cchart2;
var cchart3;
var cchart4;
var cchart5;
var cchart6;

(function(window, $) {  
	"use strict";
	var RcicCollectChart = function(options){
		var _self = this;
		this.init(options);
	};

	/************************************************************
	설명 : 맵 전역함수 설정
	    : chartType이 없으면 기본 LineChart로 설정
	************************************************************/
	RcicCollectChart.prototype = {
		config:null, 
		_defaults : {
			    chartType: am4charts.TreeMap,
				theme: am4themes_animated,
		},
		init : function(_options){
			am4core.addLicense("CH245886500");
			var _self = this; 
				_self.config = $.extend({}, _self._defaults, _options);
				_self.setChart();
		},
		setChart:function(){
			var _self = this;
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
			//도로구분별 수집현황
			if(!$.isNullString(_self.config.chart4Config)){
				_self.createChart4Data();  
			}  
			//공사종류
			if(!$.isNullString(_self.config.chart5Config)){
				//_self.createChart5Data();  
			}  			
			//시설종류		
			if(!$.isNullString(_self.config.chart6Config)){
				//_self.createChart6Data();  
			}  		
		},
		createChart1Data:function(pDayType){ 
			
			var _self = this; 
			if($.isNullString(_self.config.chart1Config)) return;
			if ($('#'+_self.config.chart1Config.divId).length == 0) {
			    return;
			}
			var collection ="g2b_result_info";
			var dayType = "stdr_week";  
			
			if(!$.isNullString(pDayType)){  
				dayType = pDayType;
			}
			
			var keyword = totalKeywordColl;   
			
			      
	        var data = new Object();
			  //  data.startDt = startDt;  //필수
			  //  data.endDt = endDt;      //필수
			    data.collection=collection;
			    data.dayType = dayType;
			    data.searchKeyword = keyword;
			    data.gbn = "pivot";
			    data.pivot = dayType ;
			    
				_commonSearch.getSearchCount(data, collection, function(response){
					
					var data = response.result; 
					
					var nArray = new Array();
					for(var i in data){
						if(dayType=="stdr_week"){
							if(data[i].value.length==5){
								data[i].value = data[i].value.substring(0,4)+"년 0"+data[i].value.substring(4)+"주";
							}else{
								data[i].value = data[i].value.substring(0,4)+"년 "+data[i].value.substring(4)+"주";
							}
						}else if(dayType=="stdr_yyyymm"){
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
							obj.기간 =  data[i].value;
							obj.건수 =  data[i].valueCount;
							nArray.push(obj);
					}
						_self.createChart1(nArray);   
				});	 
		},  
		createChart1:function(data,dayType){  
			
			var _self = this; 
			
				if(cchart1 != null){  
					cchart1.dispose(); 
				}
			
				am4core.useTheme(am4themes_animated);
				am4core.ready(function() {

					// Themes begin
					am4core.useTheme(am4themes_animated);
					// Themes end  

					// Create chart instance 
					var chart = am4core.create(_self.config.chart1Config.divId, _self.config.chart1Config.chartType);

					// Export
					chart.exporting.menu = new am4core.ExportMenu();
					chart.exporting.filePrefix = "수집 현황 통계";

					// Data for both series
					/* Create axes */ 
					var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
					categoryAxis.dataFields.category = "기간";
					
					var label = categoryAxis.renderer.labels.template;
					categoryAxis.renderer.ticks.template.strokeOpacity = 0.1;
					categoryAxis.title.text = "기간";
					/* Create value axis */
					var valueAxis = chart.yAxes.push(new am4charts.ValueAxis()); 
					valueAxis.title.text = "건수";
					
					var lineSeries1 = chart.series.push(new am4charts.LineSeries());
					lineSeries1.name = "수집건수";
					lineSeries1.dataFields.valueY = "건수";
					lineSeries1.dataFields.categoryX = "기간";
					lineSeries1.stroke = am4core.color("#20a8d8");
					lineSeries1.strokeWidth = 2;
					lineSeries1.propertyFields.strokeDasharray = "lineDash";
					lineSeries1.tooltip.label.textAlign = "middle";

					var bullet1 = lineSeries1.bullets.push(new am4charts.Bullet());
					bullet1.fill = am4core.color("#20a8d8"); // tooltips grab fill from parent by default
					bullet1.tooltipText = "[#fff font-size: 14px]수집: {valueY}건"
						
					var circle1 = bullet1.createChild(am4core.Circle);
					circle1.radius = 4;
					
					categoryAxis.adapter.add("getTooltipText",  function(text){
					 return  text;  
					});
					
					chart.cursor = new am4charts.XYCursor();
					chart.data = data;
					cchart1 = chart;
				}); 
			
		},
		createChart2Data:function(pDayType){
			   
			var _self = this;
			if($.isNullString(_self.config.chart2Config)) return;
			if ($('#'+_self.config.chart2Config.divId).length == 0) {
			    return;
			}
			var collection ="g2b_result_info";
			var dayType = "stdr_week";  
			//var startDt = $("#fromDt").val().replace(/[.]/g,"");
			//var endDt = $("#toDt").val().replace(/[.]/g,"");
			var keyword = totalKeywordColl;
			
			if(!$.isNullString(pDayType)){  
				dayType = pDayType;
			}
			
			
			      
	        var data = new Object();
			   // data.startDt = startDt;  //필수
			  //  data.endDt = endDt;      //필수
			    data.collection=collection;
			    data.dayType = dayType;
			    data.searchKeyword = keyword;
			    data.gbn = "pivot";
			    data.pivot = ",search_word"; // default "", 솔라 그룹별 카운트 dayType 검색어 카운트를 돌라 data.pivot=stdr_yyyymm,search_word2
			    data.facet = "on" ;
			    data.limit = "30" ;  

			    var newArr  = new Array();
				_commonSearch.getSearchCount(data, collection, function(response){  
					
					var obj = new Object();
						obj.url = "/rcic/code/selectDetailCode";
						obj.groupCode = "CD0000";
						var data = response.result;  
					var dataList = setDefault(obj);
					
					$.commonAjax(dataList,'', function(response, status, headers, config){
						var codeList = response.list;
						var extCnt=0;
						for(var i in data){ 
							if(newArr.length>=7)break;   
							for(var j in codeList){
								if(data[i].value==codeList[j].codeNm){ 
									var obj = new Object();
									obj.value = codeList[j].codeNm;
									obj.valueCount = data[i].valueCount;
 									
									newArr.push(obj);						 		
								}
							}
						}
						_self.createChart2(newArr);
					});
				});	  
		},
		createChart2:function(data){
			  
			var _self = this;
			if(cchart2 != null){  
				cchart2.dispose(); 
			}
			am4core.ready(function() {
				am4core.useTheme(am4themes_animated);
				var chart = am4core.create(_self.config.chart2Config.divId,  _self.config.chart2Config.chartType);
				
				chart.exporting.menu = new am4core.ExportMenu();
				chart.exporting.filePrefix = "키워드 분포";
				
				chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect
				var series = chart.series.push(new am4charts.PyramidSeries());
				
				 
				series.colors.step = 2;
				series.dataFields.value = "valueCount";
				series.dataFields.category = "value"; 
				series.alignLabels = true;

				
				series.labelsContainer.paddingLeft = 30;
				series.labelsContainer.width = 200;  
				//series.orientation = "horizontal";
				//series.bottomRatio = 1;  

				chart.legend = new am4charts.Legend();
				chart.legend.position = "left";
				chart.legend.valign = "bottom";
				chart.legend.margin(5,5,30,5);  
				chart.data = data;
				cchart2 = chart;
			}); 
		},
		createChart3Data:function(pDayType){
			 
			var _self = this;
			if($.isNullString(_self.config.chart3Config)) return;
			if ($('#'+_self.config.chart3Config.divId).length == 0) {
			    return;
			}
			
			var startDt = $('#fromDt').val().replace(/\./gi, "");
			var endDt = $('#toDt').val().replace(/\./gi, "");
			if(_self.config.chart3Config.gbn == "mypage"){
				startDt = $('#fromDtCollection').val().replace(/\./gi, "");
				endDt = $('#toDtCollection').val().replace(/\./gi, "");
			}
			 
			
	        var data = new Object();
			    data.startDt = startDt;  
			    data.endDt = endDt;
			    data.url = "/rcic/collection/getCollectAtm";
			    
			    var dataList = setDefault(data);
			    var nArray =new Array();
				$.commonAjax(dataList,'', function(response, status, headers, config){ 
					var list = response;
					if(list.length>0){
						var obj = new Object();
							obj.공사건수 =list[0].under_1_cnt;
							obj.공사금액 =list[0].under_1_amt;
							obj.공사비율 =list[0].under_1_rate;
							obj.금액비율 =list[0].under_1_amt_rate;
							obj.value ="1억 미만";
							nArray.push(obj);
							
						var obj = new Object();
							obj.공사건수 =list[0].under_5_cnt;
							obj.공사금액 =list[0].under_5_amt;
							obj.공사비율 =list[0].under_5_rate;
							obj.금액비율 =list[0].under_5_amt_rate;
							obj.value ="1억~5억미만";
							nArray.push(obj);
							
						var obj = new Object();
							obj.공사건수 =list[0].under_10_cnt;
							obj.공사금액 =list[0].under_10_amt;
							obj.공사비율 =list[0].under_10_rate;
							obj.금액비율 =list[0].under_10_amt_rate;
							obj.value ="5억~10억미만";
							nArray.push(obj);
							
						var obj = new Object();
							obj.공사건수 =list[0].under_50_cnt;
							obj.공사금액 =list[0].under_50_amt;
							obj.공사비율 =list[0].under_50_rate;
							obj.금액비율 =list[0].under_50_amt_rate;
							obj.value ="10억~50억미만";
							nArray.push(obj);
							
						var obj = new Object();
							obj.공사건수 =list[0].under_100_cnt;
							obj.공사금액 =list[0].under_100_amt;
							obj.공사비율 =list[0].under_100_rate;
							obj.금액비율 =list[0].under_100_amt_rate;
							obj.value ="50억~100억미만";
							nArray.push(obj);
							
						var obj = new Object();
							obj.공사건수 =list[0].under_500_cnt;
							obj.공사금액 =list[0].under_500_amt;
							obj.공사비율 =list[0].under_500_rate;
							obj.금액비율 =list[0].under_500_amt_rate;
							obj.value ="100억~500억미만";
							nArray.push(obj);
							
						var obj = new Object();
							obj.공사건수 =list[0].under_1000_cnt;
							obj.공사금액 =list[0].under_1000_amt;
							obj.공사비율 =list[0].under_1000_rate;
							obj.금액비율 =list[0].under_1000_amt_rate;
							obj.value ="500억~1000억미만";
							nArray.push(obj);
							
						var obj = new Object();
							obj.공사건수 =list[0].over_1000_cnt;
							obj.공사금액 =list[0].over_1000_amt;
							obj.공사비율 =list[0].over_1000_rate;
							obj.금액비율 =list[0].over_1000_amt_rate;
							obj.value ="1000억 이상";
							nArray.push(obj);
					}
					
					_self.createChart3(nArray);
				
				},false,function(e){
					console.log(e);
				}); 
				   
		},
		createChart3:function(data){
			  
			var _self = this;  
			
			if(cchart3 != null){  
				cchart3.dispose(); 
			} 
			   
			am4core.ready(function() { 
				am4core.useTheme(am4themes_dataviz);
				var chart = am4core.create(_self.config.chart3Config.divId, am4charts.XYChart);
				chart.data = data;
				
				chart.exporting.menu = new am4core.ExportMenu();
				chart.exporting.filePrefix = "발주금액 분포";
				
				// Create axes
				var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
				categoryAxis.dataFields.category = "value";
				categoryAxis.numberFormatter.numberFormat = "#";
				categoryAxis.renderer.inversed = true;
				categoryAxis.renderer.grid.template.location = 0;
				categoryAxis.renderer.cellStartLocation = 0.1;
				categoryAxis.renderer.cellEndLocation = 0.9;

				var  valueAxis = chart.xAxes.push(new am4charts.ValueAxis()); 
				valueAxis.renderer.opposite = true;
				valueAxis.min = 0;
				valueAxis.max = 100;
				valueAxis.renderer.minGridDistance = 10;

				// Create series
				function createSeries(field, name) {
					  var series = chart.series.push(new am4charts.ColumnSeries());
					  series.dataFields.valueX = field;
					  series.dataFields.categoryY = "value";
					  series.name = name;
					  series.columns.template.tooltipText = "{name}: [bold]{valueX}[/]%";
					  series.columns.template.height = am4core.percent(95);
					  series.sequencedInterpolation = true; 
					  
					  if(name=="금액비율"){
						  series.stroke = am4core.color("#f1890e");
						  series.fill = am4core.color("#f1890e");
					  }
					  
					  var valueLabel = series.bullets.push(new am4charts.LabelBullet());
					  if(field == "공사비율"){
					   	valueLabel.label.text = "{valueX}% ({공사건수}건)";
					  }else{
						  valueLabel.label.text = "{valueX}%";
					  }
					  //valueLabel.label.text = "{valueX}% ({공사금액}원)";
					  valueLabel.label.horizontalCenter = "left";
					  valueLabel.label.dx = 10;
					  valueLabel.label.hideOversized = false;
					  valueLabel.label.truncate = false;
	
					  var categoryLabel = series.bullets.push(new am4charts.LabelBullet());
					  //categoryLabel.label.text = "{공사금액}원";
					  categoryLabel.label.horizontalCenter = "right";
					  categoryLabel.label.dx = -10;
					  categoryLabel.label.fill = am4core.color("#fff");
					  categoryLabel.label.hideOversized = false;
					  categoryLabel.label.truncate = false;
					
				}
				
				chart.legend = new am4charts.Legend();
				chart.legend.position="bottom";
				cchart3 = chart; 
				createSeries("공사비율", "공사비율");
				createSeries("금액비율", "금액비율");
			});
		},
		createChart4Data:function(pDayType){
			
			var _self = this;
			if($.isNullString(_self.config.chart4Config)) return;
			if ($('#'+_self.config.chart4Config.divId).length == 0) {
			    return;
			}
			//var collection ="vw_g2b_result_info_sum";
			var collection ="g2b_result_info";
			var dayType = "stdr_week";  
			
			if(!$.isNullString(pDayType)){  
				dayType = pDayType;
			}
			//var startDt = $('#fromDt').val().replace(/\./gi, "");
			//var endDt = $('#toDt').val().replace(/\./gi, "");  
			var keyword = totalKeywordColl;   
			      
	        var data = new Object();
			   // data.startDt = startDt;  
			   // data.endDt = endDt;  
			    data.collection=collection;
			    data.dayType = dayType;
			    data.searchKeyword = keyword; 
			    data.gbn = "pivot";  
			    //data.pivot = dayType+",orga";  
			    data.pivot = dayType+",search_word";  
			    data.facet = "on" ;
			    
				_commonSearch.getSearchCount(data, collection, function(response){  
					
					var data = response.result;  
					var newArr  = new Array();
					
					var Code161Cnt = 0;    
					var Code99Cnt = 0; 
					var CodeB50Cnt = 0; 
					for(var i in data){
						var Code161Cnt = 0;    
						var Code99Cnt = 0; 
						var CodeB50Cnt = 0;
						var totalCnt=0;
						console.log(data);
						for(var p in data[i].pivot){
							if(data[i].pivot[p].value.startsWith("99")){
							//if(data[i].pivot[p].value.startsWith("기타")){
								Code99Cnt  = data[i].pivot[p].valueCount;
							}else if(data[i].pivot[p].value.startsWith("B500004")){
							//}else if(data[i].pivot[p].value.startsWith("고속도로")){  //FIXME 고속도로 더 추가될수도 있음. 코드테이블의 const_road_clss 확인해봐야함.
								CodeB50Cnt  = data[i].pivot[p].valueCount;
							}else{ 
								Code161Cnt  = data[i].pivot[p].valueCount;
							}  
						}
						if(dayType=="stdr_week"){
							if(data[i].value.length==5){
								data[i].value = data[i].value.substring(0,4)+"년 0"+data[i].value.substring(4)+"주";
							}else{
								data[i].value = data[i].value.substring(0,4)+"년 "+data[i].value.substring(4)+"주";
							}
						}else if(dayType=="stdr_yyyymm"){
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
							/*obj.총수집건수 =  Code161Cnt+ CodeB50Cnt +Code99Cnt;
							obj.기간 =  data[i].value; 
							obj.국도 =  Code99Cnt;
							obj.고속도로 =  CodeB50Cnt;
							obj.기타 =  Code161Cnt;*/
							
							obj.총수집건수 =  Code161Cnt+ CodeB50Cnt +Code99Cnt;
							obj.기간 =  data[i].value; 
							obj.국도 =  Code161Cnt;
							obj.고속도로 =  CodeB50Cnt;
							obj.기타 =  Code99Cnt;
							newArr.push(obj);
					}
					
					_self.createChart4(newArr,dayType);   
				});	  
		},    
		createChart4:function(data,dayType){ 
			
			var _self = this; 
			am4core.ready(function() {

				// Themes begin 
				if(cchart4 != null){  
					cchart4.dispose(); 
				}
				am4core.useTheme(_self.config.chart4Config.theme);
				var chart = am4core.create(_self.config.chart4Config.divId, _self.config.chart4Config.chartType);
				chart.exporting.menu = new am4core.ExportMenu();
				chart.exporting.filePrefix = "도로구분별 수집현황";
				
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
				lineSeries1.dataFields.valueY = "총수집건수";
				lineSeries1.dataFields.categoryX = "기간";
				lineSeries1.name = "총수집";
				lineSeries1.strokeWidth = 2;
				lineSeries1.tooltipText = "[#fff font-size: 14px]{name} : [#fff font-size: 14px]{valueY}건[/]";
				
				var lineSeries2 = chart.series.push(new am4charts.LineSeries());
				lineSeries2.stroke = am4core.color("#61b80c");
				lineSeries2.fill = am4core.color("#61b80c");
				lineSeries2.dataFields.valueY = "국도";
				lineSeries2.dataFields.categoryX = "기간";
				lineSeries2.name = "국도관련";  
				lineSeries2.strokeWidth = 2;
				lineSeries2.tooltipText = "[#fff font-size: 14px]{name} : [#fff font-size: 14px]{valueY}건[/]";
				
				var lineSeries3 = chart.series.push(new am4charts.LineSeries());
				lineSeries3.stroke = am4core.color("#ffc107");
				lineSeries3.fill = am4core.color("#ffc107");
				lineSeries3.dataFields.valueY = "기타";
				lineSeries3.dataFields.categoryX = "기간";  
				lineSeries3.name = "기타";
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
				categoryAxis.adapter.add("getTooltipText",  function(text){
					 return  text;  
					});
				chart.data = data;
				chart.legend = new am4charts.Legend();
				chart.legend.position="top";
				cchart4 = chart; 
			}); 
		}
	}
	window.RcicCollectChart = RcicCollectChart;
	window.name = "RcicCollectChart.js";
})(window, jQuery);
