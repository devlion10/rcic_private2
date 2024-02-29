(function(window, $) {
	"use strict";

	var tempArray = new Array();
	var roadTyTempArray = new Array();
	var MapData = {
			/**
			 * 상단 진행공사,국도공사,도로개설,시설물,준공예정 카운터 조회
			 * */
			setMapWidget:function(){
				var _self = this;
				setTimeout(function(){
					ToolBarCnt.setToolbar1();
					ToolBarCnt.setToolbar2();
					ToolBarCnt.setToolbar3();
					ToolBarCnt.setToolbar4();
					ToolBarCnt.setToolbar5();
				},200);
			},
			/**
			 * 공사현황 조회
			 * */
			setSearchEvt : function (currPage) {
				
				//날짜유효성체크
				if (parseInt($('#startDate').val().replace(/[.]/g,"")) > parseInt($('#endDate').val().replace(/[.]/g,""))) { 
					$.swal("종료일자는 시작일자 이전으로\n선택할수 없습니다.");
					
                    return false;
                }
				
				var layer = mapInit.mapLayerMng.getLayerById('analysisDetailLayer');
				mapInit.map.removeLayer(layer);
				//위치분석참조정보 레이어
				var layer = mapInit.mapLayerMng.getLayerById('git');
				mapInit.map.removeLayer(layer);
				//sns 위치 삭제
				var layer = mapInit.mapLayerMng.getLayerById('snstempLayer');
				mapInit.map.removeLayer(layer);
				
				var color = mapInit.mapTheme.getIsActiveMenu();
				if(color == "purple"){
					$("input:radio[name='dRadio']:radio[value='stdr_dt']").prop('checked', true); 
				}
				
				$("#content1Plus").css("display","none");
				var _self = this;
				
				_self.setMapWidget(); //진행공사 건수 조회 
				
				//툴바 엑티브
				mapInit.mapTheme.setToolbarActive();
				
				
				
				if($.isNullString(currPage)){
					currPage = "1";
					$('ul[name="contents1"]').empty();
					G.contents1CurrPage = 1;
					$('.mRsList1').scrollTop(0);
					
				} 
				
				var listCnt = "5";
				var startDt = $('#startDate').val().replace(/[.]/g,"");
				var endDt = $('#endDate').val().replace(/[.]/g,"");
				var collection ="tb_analysis_info";
				var searchText = $("#mSearchText").val();
				var startPage = String((parseInt(currPage)-1)*parseInt(listCnt));
				var chekPeriod = $('input:radio[name=dRadio]:checked').val(); //공고일, 공사기간 
				var sidoCd = $('#sidoAreaCombo option:selected').val(); // 지역콤보
				var roadTyCd = $('#roadTyCombo option:selected').val(); // 공사콤보
				var authNo = $('#authNo').val();
				var resultNoArr = [];
				var data = new Object();
					
				var radioVal = "";
				var order = "stdr_dt desc"
				var keyword = "";	
				
				$("#"+endDt).on('changeDate', function (e) {
	                if ($("#"+startDt).val() > $(this).val()) { 
	                    alert("종료일자는 시작일자 이전으로 선택할수 없습니다."); 
						var fromDt = $("#"+startDt).val();
						fromDt = moment(fromDt).add(7, "days").format('YYYY.MM.DD'); 
	                    $("#"+endDt).datepicker('setDate',  fromDt);
	                    return;
	                }
	            }); 
				
				if($.isNullString(color) || color == "blue"){
					if(chekPeriod == "bidntcedt"){  
						radioVal = 'bidntcedt';	//공고일
						order = "bidntcedt desc"
						keyword = "bidntcedt:["+ startDt + " TO "+endDt+"]"
					}else if(chekPeriod == "stdr_dt"){    
						radioVal = 'forecast_st_dt'; 	//공사기간  
						order = "bidntcedt desc"
						keyword = "forecast_st_dt :["+startDt+ " TO " +endDt+"] OR forecast_end_dt:["+startDt+" TO "+endDt+"]"
					}else{
						radioVal = 'thtm_ccmplt_date'; 	//공사기간  
						order = "thtm_ccmplt_date desc"
						//keyword = "cbgn_date:["+startDt+ " TO " +endDt+"] OR thtm_ccmplt_date:["+startDt+" TO "+endDt+"]"
						keyword = "thtm_ccmplt_date:["+startDt+" TO "+endDt+"]"
					}  
				}else if(color == "green"){
					if(chekPeriod == "bidntcedt"){  
						radioVal = 'bidntcedt';	//공고일
						order = "bidntcedt desc"
						keyword = "bidntcedt:["+ startDt + " TO "+endDt+"] AND const_road_clss:161"
					}else if(chekPeriod == "stdr_dt"){    
						radioVal = 'forecast_st_dt'; 	//공사기간  
						order = "bidntcedt desc"
						keyword = "forecast_st_dt :["+startDt+ " TO " +endDt+"] OR forecast_end_dt:["+startDt+" TO "+endDt+"] AND const_road_clss:161"
					}else{
						radioVal = 'thtm_ccmplt_date'; 	//공사기간  
						order = "thtm_ccmplt_date desc"
						//keyword = "cbgn_date:["+startDt+ " TO " +endDt+"] OR thtm_ccmplt_date:["+startDt+" TO "+endDt+"] AND const_road_clss:161"
						keyword = "thtm_ccmplt_date:["+startDt+" TO "+endDt+"] AND const_road_clss:161"
					}
				}else if(color == "yellow"){
					data.roadTypeCd = "19 24 36 37 39 47 48";
					if(chekPeriod == "bidntcedt"){  
						radioVal = 'bidntcedt';	//공고일
						order = "bidntcedt desc"
						keyword = "bidntcedt:["+ startDt + " TO "+endDt+"]"
					}else if(chekPeriod == "stdr_dt"){  
						radioVal = 'forecast_st_dt'; 	//공사기간  
						order = "bidntcedt desc"
						keyword = "forecast_st_dt :["+startDt+ " TO " +endDt+"] OR forecast_end_dt:["+startDt+" TO "+endDt+"]"
					}else{
						radioVal = 'thtm_ccmplt_date'; 	//공사기간  
						order = "thtm_ccmplt_date desc"
						//keyword = "cbgn_date :["+startDt+ " TO " +endDt+"] OR thtm_ccmplt_date:["+startDt+" TO "+endDt+"]"
						keyword = "thtm_ccmplt_date:["+startDt+" TO "+endDt+"]"
					}
					
				}else if(color == "pink"){
					data.facTypeCd = "*:*";
					if(chekPeriod == "bidntcedt"){  
						radioVal = 'bidntcedt';	//공고일
						order = "bidntcedt desc"
						keyword = "bidntcedt:["+ startDt + " TO "+endDt+"]"
					}else if(chekPeriod == "stdr_dt"){   
						radioVal = 'forecast_st_dt'; 	//공사기간  
						order = "bidntcedt desc"
						keyword = "forecast_st_dt :["+startDt+ " TO " +endDt+"] OR forecast_end_dt:["+startDt+" TO "+endDt+"]"
					}else{
						radioVal = 'thtm_ccmplt_date'; 	//공사기간  
						order = "thtm_ccmplt_date desc"
						//keyword = "cbgn_date :["+startDt+ " TO " +endDt+"] OR thtm_ccmplt_date:["+startDt+" TO "+endDt+"]"
						keyword = "thtm_ccmplt_date:["+startDt+" TO "+endDt+"]"
					}
				}else if(color == "purple"){
					 startDt = $.toDayStr();
					 endDt = $.calPeriod('aft',1,'month').replace(/[-]/g,"");
					 /*startDt = $.calPeriod('pre',1,'month').replace(/[-]/g,"");
				     endDt =$.toDayStr();*/
					 order="bidntcedt desc";
					 keyword = "forecast_end_dt:["+ startDt + " TO "+ endDt +"]"
					 
					 $("#speriod").val($.setDateStrUnderBar(startDt)+"~"+$.setDateStrUnderBar(endDt));
					 $("#startDate").val($.setDateStrDot(startDt));
					 $("#endDate").val($.setDateStrDot(endDt));
					 
				}
					data.startDt = startDt;  //필수
					data.endDt = endDt;      //필수
					data.order= order;
					data.prdtReliCd = "";
				    data.authNo = authNo;
				    data.prdtReliChk = "Y";
				    // 검색어 있을경우 order =  order+", "+defalutOrder; 변경하기위해
				    if(!$.isNullString(searchText)){
				    	data.searchTextYN = "Y";
				    }
					
					if($.isNullString(searchText) && $.isNullString(sidoCd)){
						data.searchKeyword = keyword;
					}else if(!$.isNullString(searchText) && $.isNullString(sidoCd)){
						data.searchKeyword = keyword+" AND (bidntcenm:("+searchText+") OR cnstrtsitergnnm:("+searchText+"))"
					}else if($.isNullString(searchText) && !$.isNullString(sidoCd)){
						data.searchKeyword = keyword+" AND sido_cd:("+sidoCd+")"
					}else{
						data.searchKeyword = keyword+" AND (bidntcenm:("+searchText+") OR cnstrtsitergnnm:("+searchText+")) AND sido_cd:("+sidoCd+")"
					}
					
					
				_commonSearch.getSearchList(startPage, listCnt, data, collection
						, function(response){  
						   var resultData = response.result;
						   var totalCnt = response.totalCnt;
						   
						   if(totalCnt < 1){
							   $(".mapEmptyBox").css("display","");
							   $("#mapEmptyRst").css("display","");
						   }else{
							   $(".mapEmptyBox").css("display","none");
							   $("#mapEmptyRst").css("display","none");
						   }
						   
						   var html="";
						   var seqArr = [];
						   $("#content2Tot").text("(총  "+$.number(totalCnt)+"건)");
							/*loc_prdt_reli_cd*/
							for(var i in resultData){ 
								seqArr.push(resultData[i].seq);
								
								html+='<li>'
								html+='<div>'
								html+='<div class="rsAreaBox inline mr10"><span>'+resultData[i].sido_thin_nm+'</span>'
								
								
								if(!$.isNullString(resultData[i].bid_type)){
		                           if(!String(resultData[i].bid_type).match("RT")){
		                        	   html+='<span>'+String(resultData[i].bid_type).substr(0,2)+'</span>'   
		                           }
		                        }
								
								/*if(!$.isNullString(resultData[i].bid_type)){
									html+='<span>'+String(resultData[i].bid_type).substr(0,2)+'</span>'
								}*/
								html+='</div>'
								if(resultData[i].loc_prdt_reli_cd == "1"){
									html+='<div class="rsDotBox inline" id="listDot'+resultData[i].seq+'"><span class="active"></span><span></span><span></span></div>'
								}else if(resultData[i].loc_prdt_reli_cd == "2"){
									html+='<div class="rsDotBox inline" id="listDot'+resultData[i].seq+'"><span class="active"></span><span class="active"></span><span></span></div>'
								}else{
									html+='<div class="rsDotBox inline" id="listDot'+resultData[i].seq+'"><span class="active"></span><span class="active"></span><span class="active"></span></div>'
								}
								html+='</div>'
								html+='<div class="addressBox mt10">'
								html+='<p onclick="MapData.getAnalysisDetail('+resultData[i].resultno+')">'+resultData[i].bidntcenm+'</p>'
								html+='<p>'+resultData[i].cnstrtsitergnnm+'</p>'
								html+='</div>'
								html+='<div class="dateBox mt10">'
								html+='<span class="mr10">공고일자</span>'
								html+='<span>'+$.setDateStrUnderBar(resultData[i].bidntcedt)+'</span>'
								html+='</div>'

								if(resultData[i].forecast_end_dt == null){
									html+='<div class="dateBox mt5"><span class="mr10">공사기간</span><span>'+$.setDateStrUnderBar(resultData[i].forecast_st_dt)+'</span></div>'
								}else{
									html+='<div class="dateBox mt5"><span class="mr10">공사기간</span><span>'+$.setDateStrUnderBar(resultData[i].forecast_st_dt)+'~'+$.setDateStrUnderBar(resultData[i].forecast_end_dt)+'</span></div>'
								}
								if(!$.isNullString($("#userId").val())){
								html+='<div class="favorBox mFavorBox"  id="mFavorBox'+resultData[i].seq+'">'
								html+='<div class="favorIcon" id='+resultData[i].seq+' onclick="MapData.setUpdateUserMyRoadwork(this,'+resultData[i].seq+');"></div>'
								html+='</div>'
								}
								html+='</li>'
								
							}
							
							$('ul[name="contents1"]').append(html);
							
							// 등록된 관심목록 active 
							if(seqArr.length > 0){
								 
								 _self.getFavorList(seqArr);
							 }
							
							if(response.maxPageCnt == 0){
								$("#content1Plus").css("display","none");
							}else{
								if(response.maxPageCnt == currPage){
									$("#content1Plus").css("display","none");
								}else{
									$("#content1Plus").css("display","");
								}
							}
					});
			
			},
			/**
			 * 공사목록 상세보기
			 * */
			getAnalysisDetail : function(resultno,gbn){
				if($.isNullString(gbn)){
					$(".hamburger").click();
				}
				$(".slideContainer").css("bottom", "65px");
				$(".slideContainer").show();
				
				
				//MapData.btnClickEvent('corDtlBox');
				var layer = mapInit.mapLayerMng.getLayerById('analysisDetailLayer');
				mapInit.map.removeLayer(layer);
				
				//위치분석참조정보 레이어
				var layer = mapInit.mapLayerMng.getLayerById('git');
				mapInit.map.removeLayer(layer);
				
				//공사위치보정 포인트
				/*var rePositionLayer = mapInit.mapLayerMng.getLayerById('rePosition'); 
				if(!$.isNullString(rePositionLayer)){
					mapInit.map.removeLayer(rePositionLayer);
				}*/
				
				/*20.12.29 공사정보 위치포착검색어,참조명칭사전 추가*/
				var arr = MapData.constInfo(resultno);
				var analysiswordStr="";
				var collectionStr="";
				for (var i = 0; i < arr.length; i++) {
					if(i == 0){
						analysiswordStr+=arr[i].analysisword;
						collectionStr+=arr[i].collectionStr;
					}else{
						if(arr[i].analysisword != arr[i-1].analysisword){
							analysiswordStr+=arr[i].analysisword;
						}
						if(arr[i].collectionStr != arr[i-1].collectionStr){
							collectionStr+=arr[i].collectionStr;
						}
					}
				}
				/* ..//END 20.12.29 공사정보 위치포착검색어,참조명칭사전 추가*/
				var _self = this;
				var obj = new Object();
				obj.url = "/rcic/analysis/getAnalysisDetail/"+resultno;
				
				var dataList = setDefault(obj);
				var features = new Array();
				var wktFormat=  mapInit.mapFormat.wkt;
				var moveCnt=0;
				
				$.commonAjax(dataList,'', function(response, status, headers, config){ 
						var scoreList = response.scoreList;
						var analysisInfoList = response.analysisInfo;
						var locHistList = response.locHistList;
						
						var tempA = [];
						var features=[];
						var extent;
						
						if(locHistList.length == 0) {
							if(scoreList.length == 0){
								var locList = response.locList[0];
									var feature = wktFormat.readFeature(locList.geom_wkt);
										feature.set("loc_prdt_reli_cd",analysisInfoList.loc_prdt_reli_cd);
										features.push(feature);
									var obj = new Object();
								    	obj.feature  = feature;
								    	tempA.push(obj);
									extent = feature.getGeometry().getExtent();
									mapInit.map.getView().setZoom(8); 
					        		mapInit.map.getView().fit(extent); 
							}else{
								for(var i in scoreList){ 
									var idx = scoreList[i];
									var feature = (new ol.format.GeoJSON({})).readFeature(idx.geo_geom);
										feature.set("loc_prdt_reli_cd",analysisInfoList.loc_prdt_reli_cd);
										features.push(feature);
								    var obj = new Object();
								    	obj.score = idx.score;
								    	obj.feature  = feature;
								    	/* 추가  신뢰도가 상(우선순위 국도중심선,연속지적도,새주소,도로명주소 )이 있으면 지도 이동 상으로 먼저 이동 */
								    	obj.collection = idx.collection;
								    	switch (idx.collection) {
											case "tb_cbnd_info": obj.collectionStr = '연속지적도'; obj.collectionOrd = 2; break;
											case "tl_develop_info": obj.collectionStr = '개발지구정보';obj.collectionOrd = 5; break;
											case "tl_center_line": obj.collectionStr = '국도중심선'; obj.collectionOrd = 1; break;
											case "tl_poi_point": obj.collectionStr = '관심지점정보'; obj.collectionOrd = 5;break;
											case "tb_srch_addr": obj.collectionStr = '새주소'; obj.collectionOrd = 3;break;
											case "tl_road_name": obj.collectionStr = '도로명주소'; obj.collectionOrd = 4; break;
											case "tl_road_plan_info": obj.collectionStr = '도시계획'; obj.collectionOrd = 5;break;
											case "legaldong_sido": obj.collectionStr = '행정구역-시도'; obj.collectionOrd = 5;break;
											case "legaldong_sgg": obj.collectionStr = '행정구역-시군구'; obj.collectionOrd = 5;break;
											case "legaldong_emd": obj.collectionStr = '행정구역-읍명동'; obj.collectionOrd = 5;break;
											case "legaldong_li": obj.collectionStr = '행정구역_리'; bj.collectionOrd = 5;break;
											default: collectionStr = ''; obj.collectionOrd = 5;break;
								    	}
								    	/* ../추가  신뢰도가 상(우선순위 국도중심선,연속지적도,새주소,도로명주소 )이 있으면 지도 이동 상으로 먼저 이동 */
								    	
								    	tempA.push(obj);
								}
								
								//신뢰도가 상이 있으면 지도 이동 상으로 먼저 이동
								var tempA = _.sortBy(tempA,"score").reverse();
								var map = mapInit.map;
								if(tempA.length>0){
									/* 추가  신뢰도가 상(우선순위 국도중심선,연속지적도,새주소,도로명주소 )이 있으면 지도 이동 상으로 먼저 이동 */
									var tempB =  _.sortBy(tempA,"collectionOrd");
									for ( var t in tempB) {
										if(tempB[t].collectionStr == "국도중심선"){
											extent = tempB[t].feature.getGeometry().getExtent();
											mapInit.map.getView().setZoom(8); 
							        		mapInit.map.getView().fit(extent); 
											break;
										}else if(tempB[t].collectionStr == "연속지적도"){
											extent = tempB[t].feature.getGeometry().getExtent();
											mapInit.map.getView().setZoom(8); 
							        		mapInit.map.getView().fit(extent); 
											break;
										}else if(tempB[t].collectionStr == "새주소"){
											extent = tempB[t].feature.getGeometry().getExtent();
											mapInit.map.getView().setZoom(8); 
							        		mapInit.map.getView().fit(extent); 
											break;
										}else if(tempB[t].collectionStr == "도로명주소"){
											extent = tempB[t].feature.getGeometry().getExtent();
											mapInit.map.getView().setZoom(8); 
							        		mapInit.map.getView().fit(extent); 
											break;
										}
										
									}
									if($.isNullString(extent)){
										extent = tempA[0].feature.getGeometry().getExtent();
										mapInit.map.getView().setZoom(8); 
						        		mapInit.map.getView().fit(extent); 
									}
									
									/* ../추가  신뢰도가 상(우선순위 국도중심선,연속지적도,새주소,도로명주소 )이 있으면 지도 이동 상으로 먼저 이동 */
									
									/*extent = tempA[0].feature.getGeometry().getExtent();
									mapInit.map.getView().setZoom(8); 
					        		mapInit.map.getView().fit(extent); */
								}
							}
						}else{
							
							var locHistList = response.locHistList[0];
							var feature = (new ol.format.GeoJSON({})).readFeature(locHistList.geoGeom);
								feature.set("loc_prdt_reli_cd",analysisInfoList.loc_prdt_reli_cd);
								features.push(feature);
								
							var obj = new Object();
							
							extent = feature.getGeometry().getExtent();
							mapInit.map.getView().setZoom(8); 
			        		mapInit.map.getView().fit(extent);
						}
						
				        //$('#corInfoDiv').draggable(); 
						
						var favorActive = "";
						
						if(!$.isNullString($("#userId").val())){
							favorActive = $("#"+analysisInfoList.seq).attr("class");
						}
						var html = "";
							
							html+='<div class="swiper-slide">'
							html+='<div class="btmSlideBox">'
							html+='<div class="btmSlideInfo">'
							html+='<div class="qucikBtnBox" onclick="MapData.clickQucikBox(this);return false;"><div></div></div>'
							html+='<div class="mt10">'
							html+='<div class="rsAreaBox inline mr10"><span>'+analysisInfoList.sido_thin_nm+'</span>'
							/*if(!$.isNullString(analysisInfoList.bid_type)){
								html += '<span>'+String(analysisInfoList.bid_type).substr(0,2)+'</span>';
							}*/
							
							if(!$.isNullString(analysisInfoList.bid_type)){
	                           if(!String(analysisInfoList.bid_type).match("RT")){
	                        	   html += '<span>'+String(analysisInfoList.bid_type).substr(0,2)+'</span>';
	                           }
	                        }
							
							html+='</div>'
							if(analysisInfoList.loc_prdt_reli_cd == "1"){
								html+='<div class="rsDotBox inline"><span class="active"></span><span></span><span></span></div>'
							}else if(analysisInfoList.loc_prdt_reli_cd == "2"){
								html+='<div class="rsDotBox inline"><span class="active"></span><span class="active"></span><span></span></div>'
							}else if(analysisInfoList.loc_prdt_reli_cd == "3"){
								html+='<div class="rsDotBox inline"><span class="active"></span><span class="active"></span><span class="active"></span></div>'
							}
							html+='</div>'
							html+='<div class="btmAddress mt5">'
							html+='<p>'+analysisInfoList.bidntcenm+'</p>'
							html+='<p>'+analysisInfoList.cnstrtsitergnnm+'</p>'
							html+='</div>'
							html+='<div class="btmDateBox">'
							html+='<div class="dateBox mt10">'
							html+='<span class="mr10">공고일자</span>'
							html+='<span>'+$.setDateStrUnderBar(analysisInfoList.bidntcedt)+'</span>'
							html+='</div>'
							html+='<div class="dateBox mt5">'
							html+='<span class="mr10">공사기간</span>'
							if(analysisInfoList.forecast_end_dt == null){
								html+='<span>'+$.setDateStrUnderBar(analysisInfoList.forecast_st_dt)+'</span>'
							}else{
								html+='<span>'+$.setDateStrUnderBar(analysisInfoList.forecast_st_dt)+'~'+$.setDateStrUnderBar(analysisInfoList.forecast_end_dt)+'</span>'
							}
							html+='</div>'
							
							/* 20.12.29 공사정보 위치포착검색어,참조명칭사전 추가*/	
							html+='<div class="dateBox mt5">'
							html+='<span class="mr10">위치포착검색어</span>'
							html+='<span>'+$.removeLastComma(analysiswordStr)+'</span>'
							html+='</div>'
							html+='<div class="dateBox mt5">'
							html+='<span class="mr10">참조명칭사전</span>'
							html+='<span>'+$.removeLastComma(collectionStr)+'</span>'
							html+='</div>'
							/* ..//END 20.12.29 공사정보 위치포착검색어,참조명칭사전 추가*/
								
							if(!$.isNullString($("#userId").val())){	
							html+='<div class="btmFavorBox mFavorBox"  id="mFavorBox'+analysisInfoList.seq+'">'
							if(favorActive == "favorIcon active"){
								html+='<div class="favorIcon active" id='+analysisInfoList.seq+' onclick="MapData.setUpdateUserMyRoadwork(this,'+analysisInfoList.seq+');"></div>'
							}else{
								html+='<div class="favorIcon" id='+analysisInfoList.seq+' onclick="MapData.setUpdateUserMyRoadwork(this,'+analysisInfoList.seq+');"></div>'
							}
							html+='</div>'
							}
							html+='</div>'
							html+='</div>'
							html+='<div class="btmBtnBox mt20">'
							html+='<div class="btmBtn inline">'
							html+='<button class="btnAnaly" onclick="MapData.constAnaly('+analysisInfoList.resultno+');return false;">공고/분석내용</button>'
							html+='</div>'
							html+='<div class="btmBtn inline">'
							html+='<button class="btnPlace corEstateInfo" onclick="MapData.constPlace('+analysisInfoList.resultno+');return false;">공사예측위치</button>'
							html+='</div>'
							html+='<div class="btmBtn inline">'
							html+='<button class="btnFac" onclick="MapData.constFac('+analysisInfoList.resultno+');return false;">공사/시설종류</button>'
							html+='</div>'
							html+='</div>'
							html+='</div>'
							html+='</div>'
		              	     
							$("#contents1Dtl").html(html);
							
					      	/*if(!$.isNullString(mapInit.overlay.overlayTooltipLayer)){
					      		
					      		mapInit.overlay.overlayTooltipLayer.setPosition(undefined);
					      	}
	      	    	        _self.makeInfoWindow(html, ol.extent.getCenter(extent));*/
	      	    	        
		      	    	  	var obj = new Object();
		      	    	  		obj.type="analysisDetail";
							mapInit.mapLayerMng.addTempLayer("analysisDetailLayer",features,obj);
							
							
						//흑백이 최대 12레벨만 지원함.
						if($(".mapActBox").parents().attr("id")=="gray"){
			        		if(mapInit.map.getView().getZoom()>=12){ 
			        			mapInit.map.getView().setZoom(12); 
			        		}  
			        	}
			        	
			        	//mapInit.mapAction.reSizeZoomBar();
			        	
					},true,function(){},false); 
				
			},
			clickQucikBox:function(elem){
				if($(elem).hasClass("mini")){
					$(".slideContainer").removeAttr("style");
					 $(".slideContainer").css("bottom", '65px'); 
					$(elem).removeClass("mini"); return false;
				}

				$(".slideContainer").removeAttr("style")
				$(".slideContainer").css("top", 'calc(100% - 85px)');

				$(elem).addClass("mini");
			},
			makeInfoWindow:function(html,coordinate){
				  
				var _self = this;
				
				var highlightStyle = new ol.style.Style({
					  stroke: new ol.style.Stroke({
					    color: '#3399CC',
					    width: 3,
					  }),   
					}); 
					if (mapInit.overlay.overlayTooltipElement != null) {
						$layerTooltip = $(_self._mapInit.overlay.overlayTooltipElement).find(_self._mapInit.overlay.overlayTooltipAppendElem);
						$layerTooltip.empty();
					}
					
				  var info = mapInit.mapLayerMng.getCurrentOverlay('infoWindowPopUp');
				  	  info.setPosition(undefined);
				  	  
				  $('#infoWindowPopUp').empty();   
			      $('#infoWindowPopUp').append(html);  
			      $('#infoWindowPopUp').show(); 
					var popContainer = document.getElementById('infoWindowPopUp');
					info.setElement(popContainer);
					info.setPosition(coordinate); 
					info.setPositioning('top-left');
				  	info.setOffset([20, -50]);
			},
			/**
			 * 공사정보 공사예측위치 20.12.29 공사정보 위치포착검색어,참조명칭사전 추가
			 * */	
			constInfo:function(resultno){
				
				var arr =[];
				var obj = new Object();
				obj.url = "/rcic/analysis/getAnalysisDetail/"+resultno;
				var dataList = setDefault(obj);
				$.commonFalseAjax(dataList,'', function(response, status, headers, config){ 
					
				// 위치분석 참조정보
					var list = response.scoreList;
						list = _.sortBy(list,"analysisword")
					var collectionStr="";
					var collectionStr1="";
					var analysisword="";
					var num = 0;
					for(var i in list){
						
						if(i==0){
							var rtnObj = new Object();		
							analysisword = list[i].analysisword;
							switch (list[i].collection) {
								case "tb_cbnd_info": collectionStr = '연속지적도'; break;
								case "tl_develop_info": collectionStr = '개발지구정보'; break;
								case "tl_center_line": collectionStr = '국도중심선'; break;
								case "tl_poi_point": collectionStr = '관심지점정보'; break;
								case "tb_srch_addr": collectionStr = '새주소'; break;
								case "tl_road_name": collectionStr = '도로명주소';  break;
								case "tl_road_plan_info": collectionStr = '도시계획'; break;
								case "legaldong_sido": collectionStr = '행정구역-시도'; break;
								case "legaldong_sgg": collectionStr = '행정구역-시군구'; break;
								case "legaldong_emd": collectionStr = '행정구역-읍명동'; break;
								case "legaldong_li": collectionStr = '행정구역_리'; break;
								default: collectionStr = ''; break;
					        }
							
							analysisword=analysisword+", ";
							collectionStr=collectionStr+", ";
							
							rtnObj.analysisword = analysisword;
							rtnObj.collectionStr = collectionStr;
							
							arr.push(rtnObj);
							
						}else{
							
							if(list[i-1].analysisword == list[i].analysisword){
								var rtnObj = new Object();		
								switch (list[i].collection) {
									case "tb_cbnd_info": collectionStr1 = '연속지적도'; break;
									case "tl_develop_info": collectionStr1 = '개발지구정보'; break;
									case "tl_center_line": collectionStr1 = '국도중심선'; break;
									case "tl_poi_point": collectionStr1 = '관심지점정보'; break;
									case "tb_srch_addr": collectionStr1 = '새주소'; break;
									case "tl_road_name": collectionStr1 = '도로명주소';  break;
									case "tl_road_plan_info": collectionStr1 = '도시계획'; break;
									case "legaldong_sido": collectionStr1 = '행정구역-시도'; break;
									case "legaldong_sgg": collectionStr1 = '행정구역-시군구'; break;
									case "legaldong_emd": collectionStr1 = '행정구역-읍명동'; break;
									case "legaldong_li": collectionStr1 = '행정구역_리'; break;
									default: collectionStr1 = ''; break;
						        }
								analysisword=analysisword;
								collectionStr+=collectionStr1+", ";
								
								rtnObj.analysisword=analysisword;
								rtnObj.collectionStr=collectionStr;
								arr[num] = rtnObj;
								
							}else{
								
								var rtnObj2 = new Object();		
								num = parseInt(num)+parseInt(1);
								analysisword = list[i].analysisword;
								switch (list[i].collection) {
									case "tb_cbnd_info": collectionStr = '연속지적도'; break;
									case "tl_develop_info": collectionStr = '개발지구정보'; break;
									case "tl_center_line": collectionStr = '국도중심선'; break;
									case "tl_poi_point": collectionStr = '관심지점정보'; break;
									case "tb_srch_addr": collectionStr = '새주소'; break;
									case "tl_road_name": collectionStr = '도로명주소';  break;
									case "tl_road_plan_info": collectionStr = '도시계획'; break;
									case "legaldong_sido": collectionStr = '행정구역-시도'; break;
									case "legaldong_sgg": collectionStr = '행정구역-시군구'; break;
									case "legaldong_emd": collectionStr = '행정구역-읍명동'; break;
									case "legaldong_li": collectionStr = '행정구역_리'; break;
									default: collectionStr = ''; break;
						        }
								
								analysisword=analysisword+", ";
								collectionStr=collectionStr+", ";
								
								rtnObj2.analysisword=analysisword;
								rtnObj2.collectionStr=collectionStr;
								arr.push(rtnObj2);
								
							}
						} //else
						
					}   //for
				
				}); 
				
				return arr;	
		
			},
			//공고분석내용
			constAnaly:function(resultno){
				
				$(".corDtlBoxTopLeft").empty();
				var obj = new Object();
				obj.url = "/rcic/analysis/getAnalysisDetail/"+resultno;
				
				var dataList = setDefault(obj);
				$.commonAjax(dataList,'', function(response, status, headers, config){ 
					
					// 공고분석내용 
					var data = response.analysisInfo;
				    var dataStr = $("#detailForm").serializeArray();
				    var corDtlBoxTopLeftHtml = "";
				    var corDtlBoxTopLeftHtml = "";
				    if(!$.isNullString(data.bid_type)){
				    	if(!String(data.bid_type).match("RT")){
                            
				    		corDtlBoxTopLeftHtml += '<div class="rsAreaBox inline mr10"><span>'+data.sido_thin_nm+'</span><span>'+String(data.bid_type).substr(0,2)+'</span></div>'  
                         }else{
                        	 corDtlBoxTopLeftHtml += '<div class="rsAreaBox inline mr10"><span>'+data.sido_thin_nm+'</span></div>'
                         }
				    	
				    	
				    }else{
                    	 corDtlBoxTopLeftHtml += '<div class="rsAreaBox inline mr10"><span>'+data.sido_thin_nm+'</span></div>'
				    }
				    
				    if(data.loc_prdt_reli_cd == "1"){
				    	corDtlBoxTopLeftHtml+='<div class="rsDotBox inline"><span class="active"></span><span></span><span></span></div>'
					}else if(data.loc_prdt_reli_cd == "2"){
						corDtlBoxTopLeftHtml+='<div class="rsDotBox inline"><span class="active"></span><span class="active"></span><span></span></div>'
					}else{
						corDtlBoxTopLeftHtml+='<div class="rsDotBox inline"><span class="active"></span><span class="active"></span><span class="active"></span></div>'
					}
					
				    $(".corDtlBoxTopLeft").html(corDtlBoxTopLeftHtml);
				    $('p[name="bidntcenm"]').text(data.bidntcenm);
				    $('p[name="cnstrtsitergnnm"]').text(data.cnstrtsitergnnm);
				    $.each(data, function(key, value){
			            for (var i=0; i<dataStr.length; i++) { 
			                if(dataStr[i].name ==  key){
								if(!$.isNullString(value)){
									 $('input[name="' + dataStr[i].name +'"]').attr('title', value);
									if(dataStr[i].name == "stdr_dt" || dataStr[i].name == "forecast_end_dt" ||  dataStr[i].name == "analysis_dt" || dataStr[i].name == "forecast_st_dt"){
										 $('input[name="' + dataStr[i].name +'"]').val($.setDateStrUnderBar(value))
									}else if(dataStr[i].name == "presmptprce" || dataStr[i].name == "bdgtamt"){
										 $('input[name="' + dataStr[i].name +'"]').val($.number(value))
									}else{
										 $('input[name="' + dataStr[i].name +'"]').val(value);
									}
								}
			                }
			            }
		      	  });
					
				    $(".analy").show();
				},false,function(){},false);
				
			},
			//공사예측위치
			constPlace:function(resultno){
				// 위치분석 참조정보
				$('#refInfoUl').empty();
				
				var obj = new Object();
				obj.url = "/rcic/analysis/getAnalysisDetail/"+resultno;
				var firstFeature;
				var dataList = setDefault(obj);
				$.commonAjax(dataList,'', function(response, status, headers, config){ 
					
					// 공고분석내용 
					var data = response.analysisInfo;
					var list = response.scoreList;
					
					var corDtlBoxTopLeftHtml = "";
				    if(!$.isNullString(data.bid_type)){
				    	if(!String(data.bid_type).match("RT")){
                            
				    		corDtlBoxTopLeftHtml += '<div class="rsAreaBox inline mr10"><span>'+data.sido_thin_nm+'</span><span>'+String(data.bid_type).substr(0,2)+'</span></div>'
                         }else{
                        	 corDtlBoxTopLeftHtml += '<div class="rsAreaBox inline mr10"><span>'+data.sido_thin_nm+'</span></div>'
                         }
				    	
				    }else{
				    	corDtlBoxTopLeftHtml += '<div class="rsAreaBox inline mr10"><span>'+data.sido_thin_nm+'</span></div>'
				    }
				    
				    if(data.loc_prdt_reli_cd == "1"){
				    	corDtlBoxTopLeftHtml+='<div class="rsDotBox inline"><span class="active"></span><span></span><span></span></div>'
					}else if(data.loc_prdt_reli_cd == "2"){
						corDtlBoxTopLeftHtml+='<div class="rsDotBox inline"><span class="active"></span><span class="active"></span><span></span></div>'
					}else{
						corDtlBoxTopLeftHtml+='<div class="rsDotBox inline"><span class="active"></span><span class="active"></span><span class="active"></span></div>'
					}
					
				    $(".corDtlBoxTopLeft").html(corDtlBoxTopLeftHtml);
				    $('p[name="bidntcenm"]').text(data.bidntcenm);
				    $('p[name="cnstrtsitergnnm"]').text(data.cnstrtsitergnnm);
				    
					var html = "";
					var wktFormat=  mapInit.mapFormat.wkt;	
					if(list.length == 0){
						html += '<li style="text-align:center;"><span>정보가 존재하지 않습니다.</span></li>';
						var locList = response.locList[0];
							var feature = wktFormat.readFeature(locList.geom_wkt);
							firstFeature = feature; 
					} 
					for(var i in list){
							
						var idx = list[i];
						var num = parseInt(i)+parseInt(1);
						if(i==0){
							var feature = (new ol.format.GeoJSON({})).readFeature(idx.geo_geom);
							firstFeature = feature;
						}
						
						
						html += '<li>'
						//html += '<input type="checkbox" id="chkBox'+num+'" name="popChkBox"><label for="chkBox'+num+'">'
						
						switch (list[i].collection) {
				            case "tb_cbnd_info": html += '<span>연속지적도</span>'; break;
				            case "tl_develop_info": html += '<span>개발지구정보</span>'; break;
				            case "tl_center_line": html += '<span>국도중심선</span>'; break;
				            case "tl_poi_point": html += '<span>관심지점정보</span>'; break;
				            case "tb_srch_addr": html += '<span>새주소</span>'; break;
				            case "tl_road_name": html += '<span>도로명주소</span>';  break;
				            case "tl_road_plan_info": html += '<span>도시계획</span>'; break;
				            case "legaldong_sido": html += '<span>행정구역-시도</span>'; break;
				            case "legaldong_sgg": html += '<span>행정구역-시군구</span>'; break;
				            case "legaldong_emd": html += '<span>행정구역-읍명동</span>'; break;
				            case "legaldong_li": html += '<span>행정구역_리</span>'; break;
				            default: html += '<span></span>'; break;
				        }
						
						/*if(list[i].geom_type == "MULTIPOLYGON") html += '<td>면</td>';
						if(list[i].geom_type == "POINT") html += '<td>점</td>';
						if(list[i].geom_type == "MULTILINESTRING") html += '<td>선</td>';
						if(list[i].geom_type == "MULTIPOINT") html += '<td>다점</td>';*/
						
						
						html += '</label>'
						html += '<textarea id="geoInfo" style="display:none">' + list[i].geo_geom + '</textarea>';
						html += '<img src="/assets/images/mobile/icon/icon_pop_loc.png" alt="location" class="popLoc" onclick="MapData.localView(this);return false;">'
						html += '</li>'
						
					
						/*html += '	<td>' + list[i].analysisword + '</td>';
						html += '	<td>' + list[i].score +'점</td>';
						html += '	<td><textarea id="geoInfo" style="display:none">' + list[i].geo_geom + '</textarea>';
						html += '   <img src="/assets/images/map/popLocation.png" alt="location" id="ttt" onclick="MapData.localView(this);return false;"></td>';
						html += '</tr>';*/
					}   
					
				  $('#refInfoUl').html(html);
				  $(".place").show();
					
				},false,function(){},false);
				 
			},
			//공사/시설종류
			constFac:function(resultno){
				
				$('#facDiv').empty();
				var obj = new Object();
				obj.url = "/rcic/analysis/getAnalysisDetail/"+resultno;
				
				var dataList = setDefault(obj);
				$.commonAjax(dataList,'', function(response, status, headers, config){ 
		
					//공사 시설종류
					var roadList = response.roadList;
					var facList = response.facList;
					
					// 공고분석내용 
					var data = response.analysisInfo;
					var list = response.scoreList;
					
					var corDtlBoxTopLeftHtml = "";
				    if(!$.isNullString(data.bid_type)){
				    	if(!String(data.bid_type).match("RT")){
                            
				    		corDtlBoxTopLeftHtml += '<div class="rsAreaBox inline mr10"><span>'+data.sido_thin_nm+'</span><span>'+String(data.bid_type).substr(0,2)+'</span></div>'
                         }else{
                        	 corDtlBoxTopLeftHtml += '<div class="rsAreaBox inline mr10"><span>'+data.sido_thin_nm+'</span></div>'
                         }
				    	
				    }else{
				    	corDtlBoxTopLeftHtml += '<div class="rsAreaBox inline mr10"><span>'+data.sido_thin_nm+'</span></div>'
				    }
				    
				    if(data.loc_prdt_reli_cd == "1"){
				    	corDtlBoxTopLeftHtml+='<div class="rsDotBox inline"><span class="active"></span><span></span><span></span></div>'
					}else if(data.loc_prdt_reli_cd == "2"){
						corDtlBoxTopLeftHtml+='<div class="rsDotBox inline"><span class="active"></span><span class="active"></span><span></span></div>'
					}else{
						corDtlBoxTopLeftHtml+='<div class="rsDotBox inline"><span class="active"></span><span class="active"></span><span class="active"></span></div>'
					}
					
				    $(".corDtlBoxTopLeft").html(corDtlBoxTopLeftHtml);
				    $('p[name="bidntcenm"]').text(data.bidntcenm);
				    $('p[name="cnstrtsitergnnm"]').text(data.cnstrtsitergnnm);
					
					$('#constDiv').empty();
					
					var roadHtml = "";
					
					for(var i in roadList){
						roadHtml += '<div class="facList inline">';
						roadHtml += '	<img src="data:image/jpeg;base64, ' + roadList[i].base64_attr2 + '" alt="facilityImage">';
						roadHtml += '	<p>' + roadList[i].road_ty_nm + '</p>';
						roadHtml += '</div>';
					}
					
					$('#constDiv').html(roadHtml);
					$('#facDiv').empty();
					
					var facHtml = "";
					for(var i in facList){
						facHtml += '<div class="facList inline">';
						facHtml += '	<img src="data:image/jpeg;base64, ' + facList[i].base64_attr2 + '" alt="facilityImage">'; 
						facHtml += '	<p>' + facList[i].fac_ty_nm + '</p>';
						facHtml += '</div>'; 
					}
					
					$('#facDiv').html(facHtml);
					$(".fac").show();
					
				},false,function(){},false);
			},
			localView:function(elem){ 
				var geoInfo = $(elem).parent().find('textarea').val(); 
				var feature = (new ol.format.GeoJSON({})).readFeature(geoInfo);
					
				if($.isNullString(feature)){
					mapInit.map.getView().setZoom(1);
					mapInit.map.getView().setCenter([14197378.96, 4274375.9]);  
					
				}else{  
					var extent = feature.getGeometry().getExtent();  
					var obj = new Object();
						obj.type="tt";
					
						mapInit.map.getView().fit(extent); 
						
						if($(".mapActBox").parents().attr("id")=="gray"){
			        		if(mapInit.map.getView().getZoom()>=12){ 
			        			mapInit.map.getView().setZoom(12); 
			        		}  
			        	}
						
		    		mapInit.mapLayerMng.addTempLayer("git",[feature],obj); 
		    		infowindowOverLay.setPosition(ol.extent.getCenter(extent)); //포지션 이동
				}
			},
			/**
			 * SNS 조회
			 * */	
			getMapSnsList : function (currPage) {
				var layer = mapInit.mapLayerMng.getLayerById('analysisDetailLayer');
				mapInit.map.removeLayer(layer);
				//위치분석참조정보 레이어
				var layer = mapInit.mapLayerMng.getLayerById('git');
				mapInit.map.removeLayer(layer);
				//sns 위치 삭제
				var layer = mapInit.mapLayerMng.getLayerById('snstempLayer');
				mapInit.map.removeLayer(layer);
				
				$("#content2Plus").css("display","none");
				
				if($.isNullString(currPage)){
					currPage = "1";
					$('.msnsList').empty();
					G.contents2CurrPage =1;
					$('.mRsList2').scrollTop(0);
				} 
				var listCnt = "10";
				var keyword = $('#snsSearchText').val();
				var searchKeyword ="";
				var collection ="tb_sns_info";
				//var startDt = $('#snsStartDt').val().replace(/[.]/g,"");
				//var endDt = $('#snsEndDt').val().replace(/[.]/g,"");; 
				var startPage = String((parseInt(currPage)-1)*parseInt(listCnt));
				var snsAccount = $("#snsAccount option:selected").val();
				
				/*if(!$.isNullString(keyword) && !$.isNullString(startDt) && !$.isNullString(endDt) && !$.isNullString(snsAccount)) {
					searchKeyword = 'stdr_dt:['+startDt+' TO '+endDt+'] AND (sns_content:(공사) OR sns_content:(도로)  OR sns_content:('+keyword+')) AND sns_account:('+snsAccount+')';
				}else if(!$.isNullString(keyword) && !$.isNullString(startDt) && !$.isNullString(endDt) && $.isNullString(snsAccount)){
					searchKeyword = 'stdr_dt:['+startDt+' TO '+endDt+'] AND (sns_content:(공사) OR sns_content:(도로) OR sns_content:('+keyword+'))';
				}else if($.isNullString(keyword) && !$.isNullString(startDt) && !$.isNullString(endDt) && !$.isNullString(snsAccount)){
					searchKeyword = 'stdr_dt:['+startDt+' TO '+endDt+'] AND (sns_content:(공사) OR sns_content:(도로)) AND sns_account:('+snsAccount+')';
				}else{
					searchKeyword = 'stdr_dt:['+startDt+' TO '+endDt+'] AND (sns_content:(공사) OR sns_content:(도로))';
				}*/
				if($.isNullString(snsAccount)){
					//searchKeyword = 'sns_content:(공사~) OR sns_content:(도로~) OR sns_content:(사고~) OR sns_content:(국도~)';
					searchKeyword = 'sns_content:(개통 within)';
				}else{
					searchKeyword = 'sns_content:(개통 within) AND sns_account:('+snsAccount+')';
					//searchKeyword = '(sns_content:(공사~) OR sns_content:(도로~) OR sns_content:(사고~) OR sns_content:(국도~)) AND sns_account:('+snsAccount+')';
				}
				
				var data = new Object();
					data.searchKeyword = searchKeyword;
					data.order="sns_regist_dt"; 
					
				_commonSearch.getSearchList(startPage, listCnt, data, collection, function(response){
					    var resultData = response.result;
					    var slidehtml="";
					    var html="";
					    if(resultData < 1){
					    	html+='<div class="corListBox listEmptyBox">'
				    		html+='<img src="/assets/images/mobile/icon/icon_excl.png" alt="exclamation">'
			    			html+='<p class="mt20">검색 결과가 없습니다.</p>'
		    				html+='</div>'
					    }
					    
						 for(var i in resultData){
							 html+='<div class="btmSnsSlideBox">'
							 html+='<div class="btmSnsSlideInfo">'
							 html+='<div class="snsContentBox">'
							 html+='<div class="thumbBox inline mr10"><div class="thumbImg thumbImg1"></div></div>'
							 html+='<div class="goverBox inline">'
							 html+='<p>'+ resultData[i].sns_name +'</p>'
							 html+='<p>@' + resultData[i].sns_account + '</p>'
							 html+='</div>'
							 if(!$.isNullString(resultData[i].geo_wkt)){
							 html+='<div class="snsConfMarker" onclick="MapData.getSnsGeom(\''+ resultData[i].geo_wkt + '\');"><img src="/assets/images/mobile/icon/icon_sns_marker.png" alt="marker"></div>'
							 }
							 html+='<div class="snsDateBox mt10"><span>' + resultData[i].sns_regist_dt.substring(0,19) + '</span></div>'
							 html+='<div class="snsConfText">'
							 html+='<span>'+ resultData[i].sns_content
							 if(!$.isNullString(resultData[i].sns_url)){
								html += '    	' + resultData[i].sns_url
							 }
							 html+=	'</span>'
							 html+='</div>'
							 html+='</div>'
							 html+='</div>'
							 html+='</div>'
								 
						}
						 
						//$('#content2Ul').append(slidehtml);
						
						$('.msnsList').append(html);
						
						/*if(response.maxPageCnt == 0){
							$("#content2Plus").css("display","none");
						}else{
							if(response.maxPageCnt == currPage){
								$("#content2Plus").css("display","none");
							}else{
								$("#content2Plus").css("display","");
							}
						}*/
						
						/*var bh  = $("body").outerHeight() - 346; // 65 search, 42 likeTitleBox, 51 corListTop, 65 footer 고정 레이어의 크기를 제외한 크기
						var ch  = $(".snsInfoBox").height() * $(".snsList .btmSnsSlideBox").length;

						if(ch > bh){ $(".snsList").css("height", bh+"px"); }
						else{ $(".snsList").css("height", "auto"); }*/
						
						
					});
				},
				/**
				 * SNS 위치정보
				 * */
				getSnsGeom : function(geo_wkt){
					var layer = mapInit.mapLayerMng.getLayerById('snstempLayer');
					mapInit.map.removeLayer(layer);
					
					var _self = this;
					mapInit.mapAction.reSizeZoomBar();	
					var features = new Array();
					var wktFormat=  mapInit.mapFormat.wkt;	
					
							var tempA = [];
							var features=[];
								
							var feature = wktFormat.readFeature(geo_wkt);
				    		
							feature.set("type","sns");
							
						    features.push(feature);
						    var obj = new Object();
						    	obj.feature  = feature;
						    	tempA.push(obj);
							
							
							if(tempA.length>0){
								var extent = tempA[0].feature.getGeometry().getExtent();
					        	mapInit.map.getView().fit(extent);
							}
							
							var reverse_feature = []
							reverse_feature.push(tempA[0].feature);
							
							//흑백이 최대 12레벨만 지원함.
				        	if($(".mapActBox").parents().attr("id")=="gray"){
				        		if(mapInit.map.getView().getZoom()>=12){ 
				        			mapInit.map.getView().setZoom(12); 
				        		}  
				        	}
							
							var obj = new Object();
								obj.type="sns";
							mapInit.mapLayerMng.addTempLayer("snstempLayer",reverse_feature,obj);
							
				},
				/**
				 * SNS 계정 조회
				 * */
				getSnsAccount : function(currPage){
					$('#snsAccount').empty();
					if($.isNullString(currPage)){
						currPage = "1";
					}
					
					var obj = new Object();
						obj.url = "/rcic/snsAccountInfo/getSnsAccountInfoList";
						obj.useYn = "Y"
						obj.listCnt = "999";
						obj.currPage = currPage;
						
					var dataList = setDefault(obj);
				
					$.commonAjax(dataList,'', function(response, status, headers, config){ 
						var html = "";
						var list = response.list;
						
						if(list.length == "0"){
							html +='<option value ="">계정 전체</option>'
						}
						
						for(var i in list){
							if(i == 0){
								html +='<option value ="">계정 전체</option>'
							}
							html +='<option value ='+list[i].accountId+'>'+list[i].accountNm+'</option>'
						}
						
						$('#snsAccount').html(html);
						
					},true); 
				},
				/**
				 * 나의 관심목록 조회
				 * */
				getMapUserMyRoadwork : function(currPage){
					//sns 위치 삭제
					var layer = mapInit.mapLayerMng.getLayerById('snstempLayer');
					mapInit.map.removeLayer(layer);
					
					//$("#content3Plus").css("display","none");
					
					if($.isNullString(currPage)){
						currPage = "1";
						$('.mcorInfoList').empty();
						G.contents3CurrPage =1;
					}
					
					var obj = new Object();
						obj.url = "/rcic/userMyRoadwork/getUserMyRoadworkList";
						obj.userSeq = $('#userSeq').val();  
						obj.listCnt = "3";
						obj.currPage = currPage;
						obj.sortGbn = "DESC"
					/*if($(".corTopSort").hasClass("active")){ //최신순 오름차순
						obj.sortGbn = "ASC"
					}else{ //내림차순
						obj.sortGbn = "DESC"
					}*/
					var dataList = setDefault(obj);
				
					$.commonAjax(dataList,'', function(response, status, headers, config){ 
						var html = "";
						var list = response.list;
						$("#content3Tot").text("나의 관심공사 ("+$.number(response.totalCnt)+"건)");
						
						if(list.length < 1){
							html+='<div class="corListBox listEmptyBox">'
							html+='<img src="/assets/images/mobile/icon/icon_excl.png" alt="exclamation">'
							html+='<p class="mt20">등록된 관심공사가 없습니다.</p>'
							html+='</div>'
						}
						
						for(var i in list){
						
							html+='<div class="corListBox">'
								html+='<div class="mt10">'
								html+='<div class="rsAreaBox inline mr10"><span>'+list[i].sidoNm+'</span>'
								if(!$.isNullString(list[i].bid_type)){
									html+='<span>'+String(list[i].bid_type).substr(0,1)+'</span>'
								}
								html+='</div>'
								html+='<div class="rsDotBox inline"><span class="active"></span><span></span><span></span></div>'
								html+='</div>'
								html+='<div class="btmAddress mt5">'
								html+='<p onclick="MapData.getAnalysisDetail('+list[i].resultno+');">'+list[i].bidntcenm+'</p>'
								html+='<p>'+list[i].cnstrtsitergnnm+'</p>'
								html+='</div>'
								html+='<div class="btmDateBox">'
								html+='<div class="dateBox mt10">'
								html+='<span class="mr10">공고일자</span>'
								html+='<span>'+list[i].bidntcedt.substring(0,10)+'</span>'
								html+='</div>'
								html+='<div class="dateBox mt5">'
								html+='<span class="mr10">공사기간</span>'
								if(list[i].forecast_end_dt == null){
									html+='<span>'+list[i].bidntcedt.substring(0,10)+'</span>'
								}else{
									html+='<span>'+list[i].bidntcedt.substring(0,10)+'~'+$.setDateStrUnderBar(list[i].forecast_end_dt)+'</span>'
								}
								html+='</div>'
								html+='<div class="btmFavorBox mFavorBox" id="mFavorBox'+list[i].seq+'">'
								html+='<div class="favorIcon active" id='+list[i].seq+' onclick="MapData.setUpdateUserMyRoadwork(this,'+list[i].seq+');"></div>'
								html+='</div>'
								html+='</div>'
								html+='<div class="btmBtnBox mt20">'
								html+='<div class="btmBtn inline">'
								html+='<button class="btnAnaly" onclick="MapData.constAnaly('+list[i].resultno+');return false;">공고/분석내용</button>'
								html+='</div>'
								html+='<div class="btmBtn inline">'
								html+='<button class="btnPlace corEstateInfo" onclick="MapData.constPlace('+list[i].resultno+');return false;">공사예측위치</button>'
								html+='</div>'
								html+='<div class="btmBtn inline">'
								html+='<button class="btnFac" onclick="MapData.constFac('+list[i].resultno+');return false;">공사/시설종류</button>'
								html+='</div>'
								html+='</div>'
								html+='</div>'
						}	
						
						$('.mcorInfoList').append(html);
						

						
						/*if(response.maxPageCnt == 0){
							$("#content3Plus").css("display","none");
						}else{
							if(response.maxPageCnt == currPage){
								$("#content3Plus").css("display","none");
							}else{
								$("#content3Plus").css("display","");
							}
						} */
					},true); 
				},
				/**
				 * 나의 관심공사 위치 조회 ( 사용안함) getAnalysisDetail 같이사용
				 * */
				getMyRoadworkGeom : function (resultno){
					var _self = this;
					var obj = new Object();
						obj.url = "/rcic/analysis/getAnalysisDetail/"+resultno;
					
					var dataList = setDefault(obj);
					var features = new Array();
					var wktFormat=  mapInit.mapFormat.wkt;
					$.commonAjax(dataList,'', function(response, status, headers, config){ 
							
							var scoreList = response.scoreList;
							var analysisInfoList = response.analysisInfo;
							
							var tempA = [];
							var features=[];
							
							if(scoreList.length == 0){
								var locList = response.locList[0];
								var feature = wktFormat.readFeature(locList.geom_wkt);
								
									features.push(feature);
									
									var extent = feature.getGeometry().getExtent();  
									mapInit.map.getView().fit(extent);
								
							}else{
								for(var i in scoreList){ 
									var idx = scoreList[i];
									var feature = (new ol.format.GeoJSON({})).readFeature(idx.geo_geom);
										features.push(feature);
								    var obj = new Object();
								    	obj.score = idx.score;
								    	obj.feature  = feature;
								    	tempA.push(obj);
								}
							
								var tempA = _.sortBy(tempA,"score").reverse();
								
								if(tempA.length>0){
									var extent = tempA[0].feature.getGeometry().getExtent();
						        		mapInit.map.getView().fit(extent); 
			          	    	      	
								}
							}
							
							//흑백이 최대 12레벨만 지원함.
							if($(".mapActBox").parents().attr("id")=="gray"){
				        		if(mapInit.map.getView().getZoom()>=12){ 
				        			mapInit.map.getView().setZoom(12); 
				        		}  
				        	}
							
							var obj = new Object();
								obj.type = "myRoadwork";
							
							mapInit.mapLayerMng.addTempLayer("snstempLayer",features,obj);
						
						});
					
					
				},
				
				/**
				 * 나의 관심목록 등록,해제
				 * */
				setUpdateUserMyRoadwork : function(elem,seq,gbn){
					var _self = this;
					$.mFavorBoxHover("out");
					
					var url = "/rcic/userMyRoadwork/insertUserMyRoadwork";
					var msg = "";
					var obj = new Object();
					/*obj.userSeq = $('#userSeq').val();  */
					obj.seq = String(seq);
					
					
					if($(elem).hasClass("active")){ 
						url = "/rcic/userMyRoadwork/deleteUserMyRoadwork";
						msg = "관심공사에 해지되었습니다"
						obj.url = url;
						
					}else{
						url = "/rcic/userMyRoadwork/insertUserMyRoadwork";
						msg = "관심공사에 추가되었습니다"
						obj.url = url;
						/*obj.registId = $('#userId').val();
						obj.updtId = $('#userId').val();;*/
					}
					
					var dataList = setDefault(obj);
					
					$.commonAjax(dataList,'', function(response, status, headers, config){ 
						$.swal(msg);
						_self.getMapUserMyRoadwork();
						if(gbn == "favor"){
							_self.setSearchEvt();
						}
						
					});
					
				},
				/**
				 * 나의 관심목록 seq로 조회 공사현황 목록 관심등록 active
				 * */
				getFavorList : function(seqArr){
					var seqStr="";
					if(!$.isNullString(seqArr)){
						for (var i = 0; i < seqArr.length; i++) {
							seqStr+=seqArr[i]+", "
						}
						seqStr = $.removeLastComma(seqStr);
					}
					
					var obj = new Object();
						obj.url = "/rcic/userMyRoadwork/getFavorList";
						obj.userSeq = $('#userSeq').val();  
						obj.seqArr = seqStr;
						
					var dataList = setDefault(obj);

					$.commonAjax(dataList,'', function(response, status, headers, config){ 
						
						for(var i in response.list){ 
							$("#"+response.list[i].seq).addClass("active");
						}
					});
					
				},
				/**
				 * 나의 관심 지역 리스트 가져오기
				 * */
				myAreaList : function(){
					
					var _self = this;
					
					var url = "/rcic/userMyArea/getUserMyAreaList";
					var obj = new Object();
						obj.listCnt = "20"
						obj.url = url;
					
					var dataList = setDefault(obj);
					
					$("#myAreaText").val("");
					
					$.commonAjax(dataList,'', function(response, status, headers, config){ 
						
						$("#corBookMarkThead").css("display","");	
						$("#corBookMarkTbody").empty();
						var resultData = response.list;
						var resultCnt = response.cnt; 
						
						$("#corCnt").val(resultCnt);
						
						var html="";
						if(resultData.length <= 0){
							
							html+='<tr>'
							html+='<td colspan="3">'
							html+='<div class="listEmptyBox">'
							html+='<img src="/assets/images/mobile/icon/icon_excl.png" alt="exclamation">'
							html+='<p class="mt10">설정된 관심지역이 없습니다.</p>'
							html+='</div>'
							html+='</td>'
							html+='</tr>'
							$("#corBookMarkThead").css("display","none");	
								
						}
						
						for(var i in resultData){ 
							var num = parseInt(i)+parseInt(1);
							html+='<tr>'
							html+='<td>'+num+'</td>'
							html+='<td onclick="MapData.myAreaLocation('+resultData[i].centerX+','+resultData[i].centerY+','+resultData[i].zoomLv+')">'+resultData[i].myAreaNm+'</td>'
							html+='<td><input type="checkbox" name="areaLikChk" id="areaLikChk'+num+'" value='+resultData[i].myAreaNo+'><label for="areaLikChk'+num+'"></label></td>'
							html+='</tr>'
								
							
						}
						
						$("#corBookMarkTbody").html(html);
						
						
					});
					
				},
				/**
				 * 나의 관심 지역 리스트 가져오기 검색 TOP
				 * */
				myAreaTopList : function(){
					var _self = this;
					
					var url = "/rcic/userMyArea/getUserMyAreaList";
					var obj = new Object();
						obj.listCnt = "20"
						obj.url = url;
					
					var dataList = setDefault(obj);
					$.commonAjax(dataList,'', function(response, status, headers, config){ 
						var resultData = response.list;
						
						var contHtml = "";
						
						for(var i in resultData){ 
								
							contHtml+='<input type="button" value="'+resultData[i].myAreaNm+'" onclick="MapData.myAreaLocation('+resultData[i].centerX+','+resultData[i].centerY+','+resultData[i].zoomLv+',\'gbn\')">'
							
						}
						
						$("#myAreaTop").html(contHtml);
						
						
					});
				},
				
				/**
				 * 나의 관심지역 삭제
				 * */
				myAreaDel : function(gbn){
					
					var _self = this;
					var chkMyAreaNoArr = [];
					var chkMyAreaNoStr = "";
					
					$.swalConfirm("나의 관심 지역을 삭제하시겠습니까?",function(flag){
						if(flag){   
							
							$('input:checkbox[name=areaLikChk]:checked').each(function() { // 체크된 체크박스의 value 값을 가지고 온다.
								if(this.value != "on"){
									chkMyAreaNoArr.push(this.value);
								}
					        });

							
							if(!$.isNullString(chkMyAreaNoArr)){
								for (var i = 0; i < chkMyAreaNoArr.length; i++) {
									chkMyAreaNoStr+=chkMyAreaNoArr[i]+", "
								}
								chkMyAreaNoStr = $.removeLastComma(chkMyAreaNoStr);
							}
							
							if(gbn == "sel"){
								if(chkMyAreaNoArr.length <= 0){
									$.swal("삭제할 관심지역을 선택해주세요.");
									return;
								}
							}
							
							// 최대 10개 까지 저장 
							if($("#corCnt").val() == "10"){
								$.swal("나의 관심지역은 최대 10개까지만 저장됩니다.");
								return false;
							}
							
							
							var url = "/rcic/userMyArea/deleteUserMyArea";
							var obj = new Object();
								obj.url = url;
								obj.chkMyAreaNoStr = chkMyAreaNoStr;
							
							var dataList = setDefault(obj);
							var msg = "관심지역이 삭제되었습니다."
							$.commonAjax(dataList,'', function(response, status, headers, config){ 
								$.swal(msg);
								$("input[name=areaLikChk]").prop("checked",false);
								_self.myAreaList();
								
							});
							
						}else{
							return;
						} 
					});
					
					
					
				},
				/**
				 * 나의 관심 지역 저장
				 * */
				myAreaSave : function(){
					
					var _self = this;
					
					
					$.swalConfirm("나의 관심 지역으로 저장하시겠습니까?",function(flag){
						if(flag){   
							
							if($.isNullString($("#myAreaText").val())){
								$.swal("나의 관심지역명을 입력해주세요.");
								return false;
							}
							
							// 최대 10개 까지 저장 
							if($("#corCnt").val() == "10"){
								$.swal("나의 관심지역은 최대 10개까지만 저장됩니다.");
								return false;
							}
							
							
							var url = "/rcic/userMyArea/insertUserMyArea";
							var obj = new Object();
								obj.myAreaNm = $("#myAreaText").val();
								obj.centerX = mapInit.map.getView().getCenter()[0];
								obj.centerY = mapInit.map.getView().getCenter()[1];
								obj.zoomLv = mapInit.map.getView().getZoom();
								obj.url = url;
								
							var dataList = setDefault(obj);
							var msg = "관심지역 저장되었습니다."
							$.commonAjax(dataList,'', function(response, status, headers, config){ 
								$.swal(msg);
								$(".areaLikeContainer").hide();
								_self.myAreaList();
								
							});
							
						}else{
							return;
						} 
					});
					
				},
				/*
				 * 나의 관심지역으로 이동
				 * */
				myAreaLocation : function(x,y,zoom,gbn){
					console.log(gbn);
					if(!$.isNullString(gbn)){
						$(".hamburger").click();
					}
					
					mapInit.map.getView().setCenter([x,y]);
					mapInit.map.getView().setZoom(zoom);
				}
		}
	window.MapData = MapData;
	window.name = "MapData.js";
})(window, jQuery);
