var _rcicCollectChart;
var totalKeywordColl;
var Collection ={
	/**
	 * 수집 현황 통계
	 * */
	/*listTabMenu:function(elem){
	 			
		var index = $(elem).data("index");
		
		$(".listTabMenu").each(function(index, item){
			var name   = $(elem).children("img").attr("data-fileName");
			var reName = "/assets/images/icon/"+name+"_off.png";

			$(elem).children("img").attr("src", reName);
		});

		var name = $(elem).children("img").attr("data-fileName");
		$(elem).children("img").attr("src", "/assets/images/icon/"+name+"_on.png");

		// tab class add
		$(".listTabMenu").removeClass("active");
		$(elem).addClass("active");

		$(".tabContetns").hide();
		$("#tabContents"+index).show();
		
		if($(".listTabMenu").hasClass("active")){
			if($(elem).attr("data-index") == "1"){
				Collection.setSearchCollectionListEvt();
			}else{
				Collection.setSearchCollectionCountEvt();
			}
		}
		
	},*/
	
		
		setSearchCollectionListEvt : function (currPage) {
			
			//날짜유효성체크
			if (parseInt($('#fromDt').val().replace(/[.]/g,"")) > parseInt($('#toDt').val().replace(/[.]/g,""))) { 
				$.swal("종료일자는 시작일자 이전으로 선택할수 없습니다.");
				
                return false;
            }
			var _self = this;
			
			if($.isNullString(currPage)){
				currPage = "1";
			}
			var listCnt = $("#collectionListCnt option:selected").val();
			var startPage = String((parseInt(currPage)-1)*parseInt(listCnt));
			var startDt = $("#fromDt").val().replace(/[.]/g,"");
			var endDt = $("#toDt").val().replace(/[.]/g,"");
			var keyword = $('#keyword').val();
			var collection ="g2b_result_info";
			var searchKeyword ="";
			
			
			searchKeyword = 'stdr_dt:['+startDt+' TO '+endDt+']';
			
			if(!$.isNullString(keyword)){
				searchKeyword += ' AND ntceinsttnm:('+keyword+')'
			}
			
			totalKeywordColl = searchKeyword;
			
			var data = new Object();
				data.startDt = startDt;  //필수
				data.endDt = endDt;      //필수
				data.searchKeyword = searchKeyword;
				data.order="bidntcedt desc"; 
				
			if(!$.isNullString(startDt) && !$.isNullString(endDt)){
				var dateHtml = "";
				dateHtml += '<span class="sMtLine" id="searchRDateText"><span class="gColor">';
				dateHtml += $.setDateStr(startDt)+'</span> 부터 <span class="gColor">'+$.setDateStr(endDt)+'</span>';
				$("#searchRDateText").html(dateHtml);
			}	
			
			_commonSearch.getSearchList(startPage, listCnt, data, collection, function(response){
			   var resultData = response.result;
			   var maxPageCnt = response.maxPageCnt;
 			   var totalCnt = response.totalCnt;
			   var html="";
			   var elem = $('#collectionListTable').find('tbody[name="collectionListTbody"]');
					
				$('#searchRCnt').html('<p class="searchRCnt" id="searchRCnt">검색결과는 <span>총 ' + $.number(totalCnt) + '건</span> 입니다.</p>');
			
				if(resultData.length == 0){
					html+='<tr>';
					html+='	<td colspan="7">공사가 존재하지 않습니다.</td>'; 
					html+='</tr>';
				}
			 
			   for(var i in resultData){
					var dminsttnm = resultData[i].dminsttnm.split(" ");
					var num = (((parseInt(currPage))*parseInt(listCnt))+1)-parseInt(listCnt)+parseInt(i);
					html+='<tr>';
					html+='<td>'+num+'</td>';
					html+='<td class="gNumber" style="cursor: pointer;" onclick="Collection.collectionDetail(' + resultData[i].resultno + ')">'+resultData[i].bidntceno+'</td>';
					html+='<td>'+$.setDateStrUnderBar(resultData[i].bidntcedt)+'</td>';
					html+='<td class="alginLeft">'+resultData[i].bidntcenm+'</td>'; 
					//html+='<td>'+resultData[i].dminsttnm+'</td>'; 
					html+=' <td>';
					for(var j in dminsttnm){	
						html+= dminsttnm[j] + '<br>';
					}
					html += '</td>';
					html+='<td>'+resultData[i].bidmethdnm+'</td>'; 
					html+='<td>'+resultData[i].search_word+'</td>';
					//html+='<td name="url" style="display:none">'+resultData[i].bidntcedtlurl+'</td>';
					html+='</tr>';
				}
				
			   $(elem).html(html);
				// 페이징 호출 
            	$.corPaging('collectionPagination',parseInt(currPage),maxPageCnt,resultData.length,function(event,page){ 
            		Collection.setSearchCollectionListEvt(String(page));
            	});
					
			});
			Collection.setSearchCollectionCountEvt();
			Collection.keywordCntList();
			
		},
		
		collectionDetail:function(resultno){
			
			var collection ="g2b_result_info";
			var startDt = $("#fromDt").val().replace(/[.]/g,"");
			var endDt = $("#toDt").val().replace(/[.]/g,"");
			var data = new Object();
				data.startDt = startDt;  //필수
				data.endDt = endDt;      //필수
				data.searchKeyword = "resultno:" + resultno;
				
			_commonSearch.getSearchList("0", "", data, collection, function(response){
				var data = response.result[0];
			    var dataStr = $("#detailForm").serializeArray();
				$.each(data, function(key, value){
		            for (var i=0; i<dataStr.length; i++) { 
						if(key == "bidntcenm"){
							$('#popupTitle').text(value); 
						}
		                if(dataStr[i].name ==  key){
							if(dataStr[i].name == "rbidopengdt"){
								if($.isNullString(value)) {
									$('input[name="' + dataStr[i].name +'"]').val("N");
								} else{
									$('input[name="' + dataStr[i].name +'"]').val("Y");
								}
							}
							
							if(!$.isNullString(value)){
								if(dataStr[i].name=="intrbidyn"){
									if(value == "N"){
										$('input[name="' + dataStr[i].name +'"]').val("국내입찰");
									} else{
										$('input[name="' + dataStr[i].name +'"]').val("국제입찰");
									}
								}else if(dataStr[i].name=="presmptprce"){
									$('input[name="' + dataStr[i].name +'"]').val($.number(value));
								}else if(dataStr[i].name == "bidntcedt"){
									console.log(value);
									$('input[name="' + dataStr[i].name +'"]').val($.setDateStrUnderBar(value));
								}else if(dataStr[i].name == "bidbegindt"){
									$('input[name="' + dataStr[i].name +'"]').val(value.substr(0, 10));
								}else if(dataStr[i].name == "bidclsedt"){
									$('input[name="' + dataStr[i].name +'"]').val(value.substr(0, 10));
								}else if(dataStr[i].name == "opengdt"){
									$('input[name="' + dataStr[i].name +'"]').val(value.substr(0, 10));
								}else if(dataStr[i].name == "drwtprdprcnum"){
									$('input[name="' + dataStr[i].name +'"]').val(value+"건");
								}else if(dataStr[i].name == "totprdprcnum"){
									$('input[name="' + dataStr[i].name +'"]').val(value+"건");
								}else {
									$('input[name="' + dataStr[i].name +'"]').val(value);
									$('input[name="' + dataStr[i].name +'"]').attr('title', value);
								}
								 
							}
		                }
		            }
	      	  });
				
				$('#moveUrl').attr('href', data.bidntcedtlurl)
				$('#moveUrlDelLink').html('<p id="moveUrlLink">※ 상세공고내용과 입찰공고 첨부파일은 입찰공고보기(새창)</a>를 통해 확인해주시기 바랍니다.</p>')
					
			});
			
			$(".collectWrap").fadeIn("fast");
		},
		selectChartDataLoader1 : function () {
			
			var _self = this;
			var collection ="g2b_result_info";
			var dayType = $(".topDateBtnActive").attr("val");
			var startDt = $("#fromDt").val().replace(/[.]/g,"");
			var endDt = $("#toDt").val().replace(/[.]/g,"");
			var keyword = "stdr_dt:["+ startDt + " TO "+endDt+"]";
			      
	        var data = new Object();
			    data.startDt = startDt;  //필수
			    data.endDt = endDt;      //필수
			    data.collection=collection;
			    data.dayType = dayType;
			    data.keyword = keyword;
			    data.gbn = "group";
			    
			_commonSearch.getSearchCount(data, collection, function(response){  
			});	      
			      
		},
		selectChartDataLoader2 : function () {
			
			var _self = this;
			var collection ="g2b_result_info";
			var dayType = $(".topDateBtnActive").attr("val");
			var startDt = $("#fromDt").val().replace(/[.]/g,"");
			var endDt = $("#toDt").val().replace(/[.]/g,"");
			var keyword = "stdr_dt:["+ startDt + " TO "+endDt+"]";
			      
	        var data = new Object();
			    data.startDt = startDt;  //필수
			    data.endDt = endDt;      //필수
			    data.collection=collection;
			    data.dayType = dayType;
			    data.keyword = keyword;
			    data.gbn = "pivot";
			    data.pivot = "stdr_yyyymm,search_word2"; // default "", 솔라 그룹별 카운트 dayType 검색어 카운트를 돌라 data.pivot=stdr_yyyymm,search_word2
			    
				_commonSearch.getSearchCount(data, collection
						, function(response){  
					});	      
			      
		},
		setSearchCollectionCountEvt:function(){
			 
			_rcicCollectChart =  new RcicCollectChart({  
				
				chart1Config:{
					divId : "collectionDiv1",
					theme : am4themes_animated,
					chartType: am4charts.XYChart
				 },
				 chart2Config:{
						divId : "collectionDiv2",
						theme : am4themes_animated,
						chartType: am4charts.SlicedChart
				 },
				 chart3Config:{
						divId : "collectionDiv3",
						theme : am4themes_animated,     
						chartType: am4charts.XYChart3D,
						gbn : "collection"
				 }/*,  
				 chart4Config:{ 
						divId : "collectionDiv4",
						theme : am4themes_animated,
						//chartType: am4charts.RadarChart
						chartType: am4charts.XYChart
				 }*/
				 
			})
		},
		setSearchCollection : function(gbn){
			// 탭  목록보기, 통계보기 구분
			var tabGbn="1";
			
			$(".listTabMenu").each(function(index, item){
				if($(this).hasClass("active")){
					tabGbn = $(this).attr("data-index");
				}
			});
			
			Collection.setSearchCollectionListEvt(); //목록보기
			
			if(tabGbn == "1"){ 
				//초기화 버튼 일 경우
				if(gbn == "reset"){ 
					Collection.selPeriod('3month');
				}
				
			}else{
				$(".topDateBtn img").each(function(index, item){
					var name   = $(this).attr("data-fileName");
					if(name == "btn_week"){
						$(this).trigger('click');   
						return;
					}			
				});
				
				$(".btmDateBtn img").each(function(index, item){
					var name   = $(this).attr("data-fileName");
					if(name == "btn_week"){
						$(this).trigger('click');
						return;
					}			
				});
				Collection.setSearchCollectionCountEvt(); //통계보기
				Collection.keywordCntList();
				setSearchCollectionListEvt();
			}
			
		},
		/* 초기화 버튼*/
		collResetClickEvt : function(){
			$("input[name='3month']").click();
			
		},
		selectPeriod:function(elem){
			// 기간선택 
			var period = $(elem).attr('name');
			if($(elem).hasClass("active")){ 
				$(elem).removeClass("active"); 
			}else{
				$('.optionSel input').removeClass("active");
			}
  
			$(".optionDate").removeClass("active");
			$(elem).addClass("active");
				
			$.selPeriod(period,'fromDt','toDt');
		},
		
		keywordCntList:function(curr_page){
			// 키워드 분포 건수 
			var _self = this;
			var collection ="g2b_result_info";
			var dayType = "stdr_week";  
			var keyword = totalKeywordColl;
			      
	        var data = new Object();
			   // data.startDt = startDt;  //필수
			  //  data.endDt = endDt;      //필수
			    data.collection=collection;
			    data.dayType = dayType;
			    data.searchKeyword = keyword;
			    data.gbn = "pivot";
			    data.pivot = ",search_word"; // default "", 솔라 그룹별 카운트 dayType 검색어 카운트를 돌라 data.pivot=stdr_yyyymm,search_word2
			    data.facet = "on" ;
			    data.limit = "100" ;  

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
						
						var road = "";
						for(var i in data){ 
							//if(newArr.length>=10)break;   
							for(var j in codeList){
								
								if(data[i].value==codeList[j].codeNm){
									if(data[i].value=="도로"){
										road = data[i].valueCount;
										continue;
									} 
									var obj = new Object();
									obj.value = codeList[j].codeNm;
									obj.valueCount = data[i].valueCount;
									newArr.push(obj);						 		
								}
								//else if(data[i].value=="도"){
								//	road = data[i].valueCount;
								//}
							}
						} 
						
						if(road!=""){
							var obj = new Object();
									obj.value = "도로";
									obj.valueCount = road;
									newArr.push(obj);
						}
						
						newArr = _.sortBy(newArr,"valueCount").reverse();   
						
						var html = "";
						if(newArr.length == 0){
							html += '<tr>';
							html += '	<td colspan="3">키워드가 존재하지 않습니다.</td>';
							html += '</tr>';
						}
						
						if(newArr.length <= 10){
							$('#keywordNav').hide();
						}else{
							$('#keywordNav').show();
						}
						
						for(var i in newArr){
							var num = parseInt(i)+parseInt(1);
							html += '<tr>';
							html += '	<td>' + num + '</td>';
							html += '	<td>' + newArr[i].value + '</td>';
							html += '	<td>' + $.number(newArr[i].valueCount) + '</td>';
							html += '</tr>';
						}
						$('#keywordCntTbody').html(html);
						
						
					});
				});
		}
}