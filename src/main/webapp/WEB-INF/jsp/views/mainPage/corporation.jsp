<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<!-- meta -->
		<meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	    <meta name="HandheldFriendly" content="true">
	    <meta name="format-detection" content="telephone=no" />
	    <meta name="title" content="도로변경정보 수집시스템">
	    <meta name="description" content="">
	    <meta name="keywords" content="">
	    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
	    <!-- meta -->

	    <!-- Open Graph -->
	    <meta property="og:title"       content="도로변경정보 수집시스템" />
	    <meta property="og:type"        content="website" />
	    <meta property="og:image"       content="" />
	    <meta property="og:site_name"   content="도로변경정보 수집시스템" />
	    <meta property="og:url"         content="" />
	    <meta property="og:description" content="" />
	    <!-- Open Graph -->
		
		<title>도로변경정보 수집시스템</title>
		
		<style type="text/css">
		
			#corporationDiv1{
				width: 100%;
				height: 500px;
				font-size: 15px;
			}
			#corporationDiv2{
				width: 100%;
				height: 500px;
				font-size: 15px;
			}
			#corporationDiv3{
				width: 100%;
				height: 500px;
				font-size: 15px;
			}
			#corporationDiv4{
				width: 100%;
				height: 700px;    
			}   
			#corporationDiv5{
				width: 100%;
				height: 400px;
				font-size: 15px;  
			}
			#corporationDiv6{
				width: 100%;
				height: 400px;
				font-size: 15px;  
			}    
			
			#corporationDiv7{
				width: 100%;
				height: 400px;
				font-size: 15px;  
			}    
			
			
			input:focus {outline:none;}
			input{
			  border:none;
			  hover:none;
			}
			
			#mapLegend{
				font-size: 10px;
			}
		    
		    .geostats-legend-title {
		      font-weight: bold;
		      margin-bottom: 4px;
		    }
		    
		    .geostats-legend-block {
		      border: 1px solid #555555;
		      display: block;
		      float: left;
		      height: 12px;
		      margin: 0 5px 0 20px; 
		      width: 20px;
		    }
		    .geostats-legend-counter {
		      font-size: 0.8em;
		      color: #666;
		      font-style: italic;
		}
		</style>

		<script src="/assets/js/common/lib/amcharts4/core.js"></script>
		<script src="/assets/js/common/lib/amcharts4/charts.js"></script>
		<script src="/assets/js/common/lib/amcharts4/lang/de_DE.js"></script>
		<script src="/assets/js/common/lib/amcharts4/lang/ko_KR.js"></script>
		<script src="/assets/js/common/lib/amcharts4/lang/es_ES.js"></script> 
		<script src="/assets/js/common/lib/amcharts4/themes/animated.js"></script>
		<script src="/assets/js/common/lib/amcharts4/themes/material.js"></script>
		<script src="/assets/js/common/lib/amcharts4/themes/dataviz.js"></script>
		<jsp:include page="/WEB-INF/jsp/views/include/htmlHead.jsp"></jsp:include>
		
	</head>
	<body>
		<div class="containerWrap">
			<div class="contentsWrap">
				<div class="headerWrap">
					<jsp:include page="/WEB-INF/jsp/views/include/header.jsp"></jsp:include>
				</div>
				<!-- //.headerWrap -->
				<div class="contentsBox">
					<div class="parallaxBox">
						<div class="parallaxBG corporation">
							<div class="topBGLeftTxt">
								<p><span>R</span>OAD</p>
								<p><span>C</span>HANGE</p>
								<p><span>I</span>NFO</p>
								<p><span>C</span>OLLECTION</p>
							</div>
							<div class="topBGBtmTxt">
								<p>construction<span>공사현황</span></p>
							</div>
						</div>
					</div>
					<div class="pageBox">
						<div class="pageNav">
							<img src="/assets/images/icon/home.png" alt="icon">
							<span class="division">&#8250;</span>
							<span>공사현황</span>
						</div>
						<div class="wInfoBox">
							<span class="sInfoTit">※나라장터에서 수집된 데이터를 기반으로 분석, 정제를 통한 공사현황을 예측하여 표출합니다.</span>
						</div>
						<div class="sInfoBox">
							<div>
								<div class="gDot"></div><span class="sInfoTit">공고일</span><span class="colon">:</span>
								<span>입찰공고의 공고일자 기준으로 검색합니다.</span>
							</div>
							<div class="mt10">
								<div class="gDot"></div><span class="sInfoTit">예상공사기간</span><span class="colon">:</span>
								<span>입찰공고문에서 분석된 공사기간을 기준으로 검색합니다</span>
							</div>
							<%--
							<div class="mt10">
								<div class="gDot"></div><span class="sInfoTit">계약공사기간</span><span class="colon">:</span>
								<span>계약정보의 착공, 준공일자를 기준으로 검색합니다</span>
							</div>
							--%>
							<div class="mt10">
								<div class="sInfoWrBox">
									<span class="sInfoTit">※ 준공예정(1개월 내)</span><span class="colon">:</span>
									<span>예상공사기간으로 기간을 정하여 검색이 가능합니다 (1개월내 준공예정 : 현재일자 ~ 현재일자+30)</span>
								</div>
							</div>
						</div>
						
						<div class="searchBox">
							<div class="optionBox">
								<div class="opLayer">
									<div class="optionBorder">
										<div class="radioBox">
											<div class="inline">
												<input type="radio" name="dRadio" id="dRadio1" checked="true" value="bidntcedt"><label for="dRadio1">공고일</label>
		 									</div>
											<div class="inline">
												<input type="radio" name="dRadio" id="dRadio2" value="consrdt"><label for="dRadio2">예상공사기간</label>
											</div>
											<%--
											<div class="inline" style="margin-left: 20px;">
												<input type="radio" name="dRadio" id="dRadio3" value="cbgnDate"><label for="dRadio3">계약공사기간</label>
											</div>
											--%>  
										</div>
										<div class="optionDtlBox">
											<div class="inline optionLeft">
												<div class="optionChoice">
													<div class="inline optionTxt"><span>기간 선택</span></div>
													<div class="inline optionSel">
														<div class="inline">
															<input type="button" value="1주일"  name="week" onclick="Corporation.selectPeriod(this);return false;">
															<input type="button" value="1개월" name="1month" onclick="Corporation.selectPeriod(this);return false;">
															<input type="button" value="3개월" class="active" name="3month" onclick="Corporation.selectPeriod(this);return false;">
															<input type="button" value="6개월" name="6month" onclick="Corporation.selectPeriod(this);return false;">  
														</div>
														<div class="inline opDateBtnBox">		
															<input type="button" value="1년" name="1year" onclick="Corporation.selectPeriod(this);return false;">
															<input type="button" value="2년" name="2year" onclick="Corporation.selectPeriod(this);return false;">
															<input type="button" value="3년" name="3year" onclick="Corporation.selectPeriod(this);return false;">
															<input type="button" value="3년이상" name="3yearafter" onclick="Corporation.selectPeriod(this);return false;">
														</div>
													</div>
												</div>
												<div class="optionChoice">
													<div class="inline optionTxt"><span>지역 선택</span></div>
													<div class="inline optionSel">
														<select name="sido" onchange="MainInfo.getSgg();">
															<option value="0" selected="selected">시/도 선택</option>
														</select>
														<select  name="sgg" onchange="MainInfo.getEmd();">
															<option value="0" selected="selected">시/군/구 선택</option>
														</select>
														<select name="emd">
															<option value="0" selected="selected">읍/면/동 선택</option>
														</select>
													</div>
												</div>
											</div>
											<div class="inline optionRight">
												<div class="optionChoice">
													<div class="inline optionTxt"><span>직접 입력</span></div>
													<div class="inline optionSel">
														<span class="dateIcon"><input type="text" class="date" name="fromDt" id="fromDt" readonly="readonly"><i class="datepicker"  target="fromDt"></i></span>
														<span class="wave">~</span>
														<span class="dateIcon"><input type="text" class="date" name="toDt" id="toDt" readonly="readonly"><i class="datepicker" target="toDt"></i></span>
													</div>
												</div>
												<div class="optionChoice">
													<div class="inline optionTxt"><span>도로 선택</span></div>
													<div class="inline optionSel">
														<select class="ctSelect" name="road">
															<option value="">도로전체</option>
														</select>
													</div>
												</div>
											</div>
											<div>
												<div class="optionChoice">
													<div class="inline optionTxt"><span>공사 선택</span></div>
													<div class="inline optionSel">
														<input type="button" value="선택하기" class="choiceBtn corBtn" id="selConstBtn" onclick="Corporation.corCategoryPopup(this);return false;">
														<span class="optionRTxt" id="noneSelConst" name="noneSelConst">선택된 공사가 없습니다.</span>
														<div class="inline corporSel">
															<ul id="selConstList" name="selConstList"></ul>
														</div>
													</div>
												</div>
												<div class="optionChoice">
													<div class="inline optionTxt"><span>시설물 선택</span></div>
													<div class="inline optionSel">
														<input type="button" value="선택하기" class="choiceBtn facBtn" id="selFac" onclick="Corporation.corCategoryPopup(this);return false;">
														<span class="optionRTxt" id="noneSelFac" name="noneSelFac">선택된 시설물이 없습니다.</span>
														<div class="inline corporSel">
															<ul id="selFacList" name="selFacList"></ul>
														</div>
													</div>
												</div>
											</div>
										</div>
										<!-- //.optionDtlBox -->
									</div>
									<!-- //.optionBorder -->
									<div class="optionBtnBox">
										<input type="button" value="검색" class="searchBtn" onclick="Corporation.serchClickEvt();return false;">
										<input type="button" value="조건 초기화" class="resetBtn" onclick="Corporation.resetClickEvt();return false;">
									</div>
								</div>
								<div class="shBox">
									<img src="/assets/images/icon/arrow.png" alt="arrow">
								</div>
							</div>
							<!-- //.optionBox -->
							<div class="searchRDate">
								<div class="layerTable">
									<div class="layerCell">
										<span class="sMtLine" id="searchRDateText"></span>
									</div>
								</div>
							</div>
						</div>
						<div class="listTab">
							<span class="listTabMenu" data-index="1" > 
								<img src="/assets/images/icon/icon_list_off.png" alt="icon" data-fileName="icon_list">
								<span>목록보기</span>
							</span>
							<span class="listTabMenu active" data-index="2" >
								<img src="/assets/images/icon/icon_chart_on.png" alt="icon" data-fileName="icon_chart">
								<span>통계보기</span>
							</span>
						</div>

						<div class="sectionBtm">
							<div class="counterBox" id="counterBox">
								<div class="inline countBox">
									<div class="countHead inline wid50">
										<p>국도공사 수</p>
										<img src="/assets/images/icon/excl_mark.png" alt="mark" class="exclMark" data-title="입찰공고가 국도에 해당되는 것으로 분석된 공사수 ">
									</div>
									<div class="countNum inline wid50"><p id="roadConst">000,000<span>건</span></p></div>
								</div>
								<div class="inline countBox">
									<div class="countHead inline wid50">
										<p>도로개설 수</p><img src="/assets/images/icon/excl_mark.png" alt="mark" class="exclMark" data-title="입찰공고가 도로개설에 해당되는 것으로 분석된 공사수">
									</div>
									<div class="countNum inline wid50"><p id="roadMake">000,000<span>건</span></p></div>
								</div>
								<div class="inline countBox mr0">
									<div class="countHead inline wid50">
										<p>시설공사 수</p><img src="/assets/images/icon/excl_mark.png" alt="mark" class="exclMark" data-title="입찰공고가 도로시설의 공사에 해당하는 것으로 분석된 공사수">
									</div>
									<div class="countNum inline wid50"><p id="constFac">000,000<span>건</span></p></div>
								</div>
							</div>
							<!-- //.counterBox -->
							<div class="boardListBox tabContetns" id="tabContents1">
								<div class="boardSearchBox">
									<div class="inline wid50 alginLeft bListCntBox">
										<span>진행공사 목록</span>
										<select id="listCnt" onchange="Corporation.getCorporationList();">
											<option value="10">10건씩 보기</option>
											<option value="20">20건씩 보기</option>
											<option value="30">30건씩 보기</option>
										</select>
									</div>
									<div class="inline wid50 alginRight">
										<div class="bSearchForm">
											<span>공사명 검색</span>
											<div class="sInputBox">
												<input type="text" id="keyword" onkeypress="if(event.which == 13){Corporation.getCorporationList();return false;}" style="font-size: 14px;">
												<img src="/assets/images/icon/searchIcon.png" alt="icon" onclick="Corporation.getCorporationList();return false;">
											</div>
											<div class="optionBtnBox" style="float: right; margin-left: 20px; margin-top: 0px;">
												<%--<input type="button" value="엑셀다운로드" id="excelDwnBtn" class="resetBtn" onclick="exportTableToExcel('dataTable', '공사현황');"><span></span>--%>
												<input type="button" value="엑셀다운로드" id="excelDwnBtn" class="resetBtn" onclick="Corporation.getCorporationListExcel();"><span></span>
												<input type="button" value="엑셀전체다운로드" id="excelAllDwnBtn" class="resetBtn" onclick="Corporation.getCorporationListExcelAll();">
											</div>
										</div>
									</div>
								</div>
								<div class="boardTblList">
									<table id="dataTable">
										<colgroup>
											<col width="3%" />
											<col width="8%" />
											<col width="*" />
											<col width="10%" />
											<col width="10%" />
											<col width="25%" />
											<col width="5%" />
										</colgroup>
										<thead>
											<tr>
												<th>No.</th>
												<th>지역</th>
												<th>공사명</th>
												<th>공고일자</th>
												<th>공사기간</th>
												<th>발주처</th>
												<th>상세</th>
											</tr>
										</thead>
										<tbody id="corporationList"></tbody>
									</table>
									 <table id="dataTableExcel" style="display:none;">
										<colgroup>
											<col width="3%" />
											<col width="8%" />
											<col width="*" />
											<col width="10%" />
											<col width="10%" />
											<col width="25%" />
											<col width="5%" />
										</colgroup>
										<thead>
											<tr>
												<th>No.</th>
												<th>지역</th>
												<th>공사명</th>
												<th>공고일자</th>
												<th>공사기간</th>
												<th>발주처1</th>
												<th>발주처2</th>
												<th>발주처3</th>
												<th>상세</th>
											</tr>
										</thead>
										<tbody id="corporationListAll"></tbody>
									</table>
								</div>
								<nav aria-label="page navigation" id="corporationNav">
									<ul class="pagination" id="corporationPagination" style="justify-content: center; margin-top: 20px;"></ul>
								</nav>
							</div>
							<!-- //.boardListBox -->
							
							<div class="chartBox tabContetns" id="tabContents2"> 
								<div class="chart lineChart"  id="chart1">
									<div class="chartTitleBox">
										<p class="chartTitle inline">도로구분별 공사추이</p>  
										<img src="/assets/images/icon/excl_mark.png" alt="mark" class="exclMark" data-title="총공사, 국도공사, 고속도로공사, 지방도 및 기타 공사로 구분하여 공사추이(일별, 주별, 월별)를 확인할 수 있습니다.">
										<div class="dateBtnBox topDateBtn" id="topDate">
											<img src="/assets/images/button/btn_day_off.png" onclick="_rcicChartMap.createChart1Data('day');" data-fileName="btn_day" alt="dateButton">
											<img src="/assets/images/button/btn_week_on.png" onclick="_rcicChartMap.createChart1Data('week');" data-fileName="btn_week" alt="dateButton">
											<img src="/assets/images/button/btn_month_off.png" onclick="_rcicChartMap.createChart1Data('month');" data-fileName="btn_month" alt="dateButton">
										</div>
									</div>
									<div id="corporationDiv1"></div>    
								</div>
								<!-- //.lineChart --> 
								<div class="multiChartBox" id="chart2">
									<div class="chart lineChart" >  
										<div class="chartTitleBox">
											<p class="chartTitle inline">지역별 공사 대상 건수</p>
											<img src="/assets/images/icon/excl_mark.png" alt="mark" class="exclMark" data-title="시도/시군구/읍면동별 공사건수를 확인할 수 있습니다. (표시되는 영역이 큰 곳이 공사수가 많은 지역) ※ 차트 클릭 시 시도 → 시군구 → 읍면동 단위로 확대/축소가 가능합니다.">
										</div>
										<div id="corporationDiv2"></div>  
									</div>
								</div>
								<div class="multiChartBox" id="chart3">
									<div class="chart lineChart">
										<div class="chartTitleBox">  
											<p class="chartTitle inline">발주처별 공사 건수</p>
											<img src="/assets/images/icon/excl_mark.png" alt="mark" class="exclMark" data-title="발주처 기관유형(국도관련기관, 지자체) 및 기관별 공사건수를 확인할 수 있습니다.">
										</div>
										<div id="corporationDiv3"></div>    
									</div>
								</div>
								<div class="multiChartBox" id="chart4">
									<div class="chart lineChart">
										<div class="chartTitleBox">  
											<p class="chartTitle inline">시도별 공사현황</p>
											<img src="/assets/images/icon/excl_mark.png" alt="mark" class="exclMark" data-title="시도별 공사현황을 색상주제도로 확인할 수 있습니다.">
										</div>
										<div id="corporationDiv4"></div>  
										<div class="zoom_Control" style="visibility: visible; position: absolute; top: 66px; right: 50px;  display: none;/*inline-grid;*/" >
											<a style="cursor:pointer; margin-left: -1px;" title="확대" onclick="mapInit.mapAction.zoomIn(); return false;" class="btn_zoom plus"><img src="/assets/images/button/mapBtn_01_off.png" alt="확대" style="width: 26px;"></a>
											<a style="cursor:pointer;margin-left: -1px;" title="축소" onclick="mapInit.mapAction.zoomOut(); return false;" class="btn_zoom minus"><img src="/assets/images/button/mapBtn_02_off.png" alt="축소" style="width: 26px;"></a>
										</div>
										<div id='mapLegend' style="visibility: visible; position: absolute; width: 110px; margin-top: -10%; margin-left: 3%;"></div>         
									</div>  
								</div>  
								<!-- //.multiChartBox -->
								<div class="areaTblBox">
									<div class="inline wid50 areaChartBox mr20" id="chart5">
										<div class="chart">
											<div class="chartTitleBox">
												<p class="chartTitle inline">공사종류</p>
												<img src="/assets/images/icon/excl_mark.png" alt="mark" class="exclMark" data-title="공사종류별 통계를 차트로 확인할 수 있습니다.">
											</div>
											<div id="corporationDiv5"></div>      
										</div>
									</div>
									<div class="inline wid50 areaChartBox" id="chart6">   
										<div class="chart">
											<div class="chartTitleBox">
												<p class="chartTitle inline">시설물종류</p>
												<img src="/assets/images/icon/excl_mark.png" alt="mark" class="exclMark" data-title="시설종류별 통계를 차트로 확인할 수 있습니다.">
											</div>
											 <div id="corporationDiv6"></div>
										</div>
									</div>
								</div>
								<div class="multiChartBox" id="chart7">
									<div class="chart lineChart">
										<div class="chartTitleBox">  
											<p class="chartTitle inline">분석/수집현황</p>
											<img src="/assets/images/icon/excl_mark.png" alt="mark" class="exclMark" data-title="입찰공고 수집과 분석추이를 확인할 수 있습니다.">
											<div class="dateBtnBox btmDateBtn">
												<img src="/assets/images/button/btn_day_off.png" onclick="_rcicChartMap.createChart7Data('day');" data-fileName="btn_day" alt="dateButton">
												<img src="/assets/images/button/btn_week_on.png" onclick="_rcicChartMap.createChart7Data('week');" data-fileName="btn_week" alt="dateButton">
												<img src="/assets/images/button/btn_month_off.png" onclick="_rcicChartMap.createChart7Data('month');" data-fileName="btn_month" alt="dateButton">
											</div>	
										</div>
										<div id="corporationDiv7"></div>  
									</div>  
								</div>  
							</div>
							<!-- //.chartBox -->
						</div>
					</div>
				</div>
				<!-- //.contentsBox -->
				</div>
				<jsp:include page="/WEB-INF/jsp/views/include/footer.jsp"></jsp:include>
				<!-- //.footer -->
			</div>
			
			
			
        <!-- 공사선택 팝업  -->
        <div class="mapPopupWrap corCategory">
            <div class="mapPopupBox">
                <div class="mapHeader">
                    <div class="inline wid50 alginLeft"><span name="corTitle">공사 선택</span></div>
                    <div class="inline wid50 alginRight"><img src="/assets/images/button/wCloseBtn.png" alt="closeButton" class="btn_close" onclick="Corporation.btnClickEvent(this);return false;"></div>
                </div>
                <div class="mapBody">   
                    <div class="corCategoryBox">
                        <div class="corCateTop">
                            <div class="inline wid50 alginLeft">
                                <div class="inline mr10"><input type="button" value="선택해제" class="cateAllCan" onclick="Corporation.constKindImgOff();return false;"></div>
                                <div class="inline"><span class="corCateWarning">최대 5개까지 선택 할 수 있습니다.</span></div>
                            </div>
                            <div class="inline wid50 alginRight">
                                <div class="bSearchForm">
                                    <input type="text" id="searchKeyword" style="font-size: 14px;" onkeypress="if(event.which == 13){Corporation.searchConstKind(this); return false;}">
                                    <img src="/assets/images/icon/searchIcon.png" alt="icon" onclick="Corporation.searchConstKind(this); return false;">
                                </div>
                            </div>
                        </div>
                        <div class="corCateList mt10">
                            <ul id="constKindList" name="constKindList"></ul>
                        </div>

                        <div class="corCateEnterBox mt20">
                            <input type="button" value="확인" class="compButton" onclick="Corporation.selectCorCategory();return false;">
                        </div>
                    </div>
                </div>
            </div>
        </div>
		  
		<!-- 상세보기 -->
		 <div class="mapPopupWrap mypageCorBox">
			<div class="mapPopupBox">
				<div class="mapHeader">
					<div class="inline wid50 alginLeft"><img src="/assets/images/icon/wDelp_icon.png" alt="delp" class="mr5"><span>공사정보 상세</span></div>
					<div class="inline wid50 alginRight"><img src="/assets/images/button/wCloseBtn.png" alt="closeButton" class="btn_close" onclick="Corporation.btnClickEvent(this);return false;"></div>
				</div>
				<div class="mapBody">  
					<div class="corDtlMapBox inline">
						<div class="corDtlMap" id="corDtlMap" ></div>     
					</div>
					<div class="corDtlInfoBox inline">
						<form id="detailForm" name="detailForm" method="post">  
						<div class="dtlTop">
							<div class="inline dtlTopLeft">
								<div class="corName" id="corDtlBoxTopLeft"></div>   
								<div class="corName"><span class="business" name="bidntcenm"></span></div>
								<div class="addrName"><span name="cnstrtsitergnnm"></span></div>
							</div>
							<!--<div class="inline dtlTopRight">
								 <div><span class="reloadText">도로대장 관리시스템 갱신일자</span></div>
								<div class="mt15">
									<div class="inline wid50 alginLeft"><span class="reloadDate">2018.05.01</span></div>
									<div class="inline wid50 alginRight"><input type="button" value="입력" class="dtlTopBtn" onclick="MyPage.btnClickEvent(this);return false;"></div>
								</div> 
							</div>-->
						</div>
						<div class="popupAccordion">
							<ul>
								<li class="active">
									<div class="accTitleBox active" id="accTitleBox1">
										<img src="/assets/images/icon/accordion_arrow.png" alt="accordion" class="accImg mr5"><span class="accTitle">공고/분석내용</span>
										<span class="navicon-button pm"><div class="navicon"></div></span>
									</div>
									<div class="accDtlInfo mt10" style="display:block;">
										<div class="inline accDtlInfoL">
											<div class="accDtlTit"><span>공고내용</span></div>
											<div class="accTbl mt5">
												<table id="">
													<colgroup>
														<col width="">
														<col width="">
													</colgroup>
													<tbody>
													<tr>
														<td>입찰공고번호</td>
														<td>
															<input type="text" name="bidntceno" value="" readonly="readonly" style="width:100%;">
														</td>
													</tr>
													<tr>
														<td>입찰공고차수</td>
														<td>
															<input type="text" name="bidntceord" readonly="readonly" style="width:100%;">
														</td>
													</tr>
													<tr>
														<td>등록유형명</td>
														<td>
															<input type="text" name="bidmethdnm" readonly="readonly" style="width:100%;">
														</td>
													</tr>
													<tr>
														<td>공고종류</td>
														<td>
															<input type="text" name="ntcekindnm" readonly="readonly" style="width:100%;">
														</td>
													</tr>
													<tr>
														<td>입찰공고일시</td>
														<td>
															<input type="text" name="bidntcedt" readonly="readonly" style="width:100%;">
														</td>
													</tr>
													<!-- <tr>
														<td>입찰공고명</td>
														<td>
															<input type="text" name="bidntcenm" readonly="readonly" style="width:100%; text-overflow: ellipsis;">
														</td>
													</tr> -->
													<tr>
														<td>공고기관코드</td>
														<td>
															<input type="text" name="ntceinsttcd" readonly="readonly" style="width:100%;">
														</td>
													</tr>
													<tr>
														<td>공고기관명</td>
														<td>
															<input type="text" name="ntceinsttnm" readonly="readonly" style="width:100%; text-overflow: ellipsis;">
														</td>
													</tr>
													<tr>
														<td>추정가격</td>
														<td>
															<input type="text" name="presmptprce" readonly="readonly" style="width:100%;">
														</td>
													</tr>
													<tr>
														<td>표준공고서URL</td>
														<td>
															<input type="button" value="입찰공고보기 (새창)" class="dtlUrlBtn"  onclick="MyPage.moveUrl(this);return false;">
															<input type="hidden" name="bidntcedtlurl" >
														</td>
													</tr>
													<tr>
														<td>예산금액</td>
														<td>
															<input type="text" name="bdgtamt" readonly="readonly" style="width:100%;">
														</td>
													</tr>
													<tr>
														<td>공사현장지역명</td>
														<td>
															<input type="text" name="cnstrtsitergnnm" readonly="readonly" style="width:100%; text-overflow: ellipsis;">
														</td>
													</tr>
												</tbody></table>
											</div>
										</div>
										<div class="inline accDtlInfoR">
											<div class="accDtlTit"><span>분석내용</span></div>
											<div class="accTbl mt5">
												<table>
													<colgroup>
														<col width="" />
														<col width="" />
													</colgroup>
													<tbody>
													<tr>
														<td>검색키워드</td>
														<td>
															<input type="text" name="search_word" readonly="readonly" style="width:100%;">
														</td>
													</tr>
													
													<tr>
														<td>분석일시</td>
														<td>
															<input type="text" name="analysis_dt" readonly="readonly" style="width:100%;">
														</td>
													</tr>
													
													<tr>
														<td>예상공사시작시기</td>
														<td>
															<input type="text" name="forecast_st_dt" readonly="readonly" style="width:100%;">
														</td>
													</tr>
													<tr>
														<td>예상공사완료시기</td>
														<td>
															<input type="text" name="forecast_end_dt" readonly="readonly" style="width:100%;">
														</td>
													</tr>
													<tr>
														<td>도로종류</td>
														<td>
															<input type="text" name="const_road_nm" readonly="readonly" style="width:100%;">
														</td>
													</tr>
													<tr>
														<td>시도코드</td>
														<td>
															<input type="text" name="sido_cd" readonly="readonly" style="width:100%;">
														</td>
													</tr>
													<tr>
														<td>시군구코드</td>
														<td>
															<input type="text" name="sgg_cd" readonly="readonly" style="width:100%;">
														</td>
													</tr>
													<tr>
														<td>읍면동코드</td>
														<td>
															<input type="text" name="emd_cd" readonly="readonly" style="width:100%;">
														</td>
													</tr>
													<tr>
														<td>인근도로멸실여부</td>
														<td>
															<input type="text" name="road_loss_yn" readonly="readonly" style="width:100%;" value="해당없음">
														</td>
													</tr>
												</tbody></table>
											</div>
										</div>
									</div>
								</li>
								<li>
									<div class="accTitleBox" >
										<img src="/assets/images/icon/accordion_arrow.png" alt="accordion" class="accImg mr5"><span class="accTitle">공사예측위치</span>
										<span class="navicon-button"><div class="navicon"></div></span>
									</div>
									<div class="accDtlInfo mt10">
										<div class="corPopTbl mt10">
											<table>
												<colgroup>
													<col width="" />
													<col width="" />
													<col width="" />
													<col width="" />
												</colgroup>
												<thead>
													<th>순번</th>
													<th>위치포착검색어</th>
													<th>참조명칭사전</th>
													<th>위치</th>
												</thead>
												<tbody id="refInfoTbody"></tbody>
											</table>
										</div>
									</div>
								</li>
								<li>
									<div class="accTitleBox">
										<img src="/assets/images/icon/accordion_arrow.png" alt="accordion" class="accImg mr5"><span class="accTitle" id="accTitle">공사/시설종류</span>
										<span class="navicon-button"><div class="navicon"></div></span>
									</div>
									<div class="accDtlInfo mt10">
										<div class="CorFaci">
											<div class="inline CorFaciLeft">
												<table>
													<colgroup>
														<col width="" />
														<col width="" />
													</colgroup>
													<thead>
														<tr>
															<th colspan="2">공사</th>
														</tr>
													</thead>
													<tbody id="constTbody"></tbody>
												</table>
											</div>
											<div class="inline CorFaciRight">
												<table>
													<colgroup>
														<col width="" />
														<col width="" />
													</colgroup>
													<thead>
														<tr>
															<th colspan="2">시설</th>
														</tr>
													</thead>
													<tbody id="facTbody"></tbody>
												</table>
											</div>
										</div>
									</div>
								</li>
								
								<li>
									<div class="accTitleBox">
										<img src="/assets/images/icon/accordion_arrow.png" alt="accordion" class="accImg mr5"><span class="accTitle" id="accTitle">공사계약내용</span>
										<span class="navicon-button"><div class="navicon"></div></span>
									</div>
									<div class="accDtlInfo mt10">
										<div class="corPopTbl mt10">
											<table>
												<colgroup>
													<col width="" />
													<col width="" />
												</colgroup>
												<thead>
													<tr>
														<th>계약일자</th>
														<th>계약업체</th>
														<th>계약금액</th>
														<th>착공일자</th>
														<th>준공일자</th>
													</tr>
												</thead>
												<tbody id="conInfoTbody"></tbody>
											</table>
										</div>
									</div>
								</li>
								
								
							</ul>
						</div>
						</form>
					</div>
					<div class="infoTxtSite">
						<p>본 시스템은 도로공사 발주정보에 대한 자동판단에 의해 수집·분석된 결과를 안내하는 시스템으로 실제 공사위치 및 기간과 다소 차이가 발생할 수 있습니다</p>
					</div>
				</div>
			</div>
		</div>
		<!-- //.container -->
		<div class="countTooltip"><div class="tipArrow"><p>입찰공고가 국도에 해당되는 것으로 분석된 공사수</p></div></div>
		<div class="ocTooltip"><span>검색창 접기</span></div>
		
		<script type="text/javascript">
			var _commonSearch = new CommonSearch({})
			var _search = null; 
			var _self = this;  
			var _detailMap =null;  
			var mapInit = null;
			
			$(".shBox").on("click", function(){
				if($(this).hasClass("close")){
					
					$('.sInfoBox').show();  
					$(".opLayer").slideDown("fast"); 
					$(this).removeClass("close");
					$(this).children("img").removeClass("open");
				}else{
					$('.sInfoBox').hide();    
					$(".opLayer").slideUp("fast"); 
					$(this).addClass("close");
					$(this).css('opacity', '100%')
					$(this).children("img").addClass("open");
				}
			});

			$(".shBox").hover(function(){
				var top  = $(this).offset().top + 40;
				var left = $(this).offset().left;
				var text = $(this).hasClass("close") ? "검색창 펼치기" : "검색창 접기";

				$(".ocTooltip span").text(text);
				$(".ocTooltip").css("top", top).css("left", left); $(".ocTooltip").show();
			}, function() {
				$(".ocTooltip").hide();
			});
			
			
			$(".listTabMenu").on("click", function(){
				var index = $(this).data("index");
				
				if(index == 1 && $('#userSeq').val() == null){
					$.swal("목록보기는 로그인 후 이용할 수 있습니다.");
					return;
				}
				
				$(".listTabMenu").each(function(index, item){
					var name   = $(this).children("img").attr("data-fileName");
					var reName = "/assets/images/icon/"+name+"_off.png";

					$(this).children("img").attr("src", reName);
				});

				var name = $(this).children("img").attr("data-fileName");
				$(this).children("img").attr("src", "/assets/images/icon/"+name+"_on.png");

				// tab class add
				$(".listTabMenu").removeClass("active");
				$(this).addClass("active");

				/*
				Corporation.getCorporationList();
				$('#counterBox').show();
				*/
				
				// 통계보기
				$(".tabContetns").hide();
				$("#tabContents"+index).show();
				
				Corporation.viewChart();
				$('#counterBox').hide();
				
				if($(".listTabMenu").hasClass("active")){
					if($(this).attr("data-index") == "1"){
						Corporation.getCorporationList(); //목록보기
						$('#counterBox').show();
					} 
				}
				
			});

			
			$(".topDateBtn img").on("click", function(){
				$(".topDateBtn img").each(function(index, item){
					var name   = $(this).attr("data-fileName");
					var reName = "/assets/images/button/"+name+"_off.png";

					$(this).attr("src", reName);
					$(this).removeClass("topDateBtnActive");
				});

				var name = $(this).attr("data-fileName");
				$(this).attr("src", "/assets/images/icon/"+name+"_on.png");
				$(this).addClass("topDateBtnActive");
			});

			$(".btmDateBtn img").on("click", function(){
				$(".btmDateBtn img").each(function(index, item){
					var name   = $(this).attr("data-fileName");
					var reName = "/assets/images/button/"+name+"_off.png";

					$(this).attr("src", reName);
					$(this).removeClass("btmDateBtnActive");
				});

				var name = $(this).attr("data-fileName");
				$(this).attr("src", "/assets/images/icon/"+name+"_on.png");
				$(this).addClass("btmDateBtnActive");
			});
			
			$( document ).ready(function() {
				 MainInfo.getSido();
				 $.selPeriod('3month','fromDt','toDt');
				 $('.corDtlBox').draggable({handle: '.mapHeader'})
				 $('.mypageCorBox').draggable({handle: '.mapHeader'})
				 
				 $("#fromDt").datepicker({
					 changeYear:true,
					 changeMonth:true,
					 format: "yyyy.mm.dd", 
			         language: "kr"
			     });				 
				 
				 $("#toDt").datepicker({
					 changeYear:true,
					 changeMonth:true,
					 format: "yyyy.mm.dd", 
			         language: "kr"
			     });
				 
				 $(".datepicker").click(function(){
					var target = $(this).attr('target');
					$('#' + target).datepicker().focus();
				});			
				 
				 $("#tabContents1").css("display","none");
				 $("#tabContents2").css("display","block");
				 				 
				 Corporation.constIngCnt();	// 진행공사 수				 
				 Corporation.roadConstCnt(); // 국도공사 수
				 Corporation.roadMakeCnt();	//도로개설
				 Corporation.constFacCnt();	// 시설공사 수				 
				 Corporation.getConstKind("const_road_clss")
				 Corporation.getCorporationList();
				 Corporation.viewChart();
				 
				 $('#counterBox').hide();				 
				 
			});
			
			
			$('.date').on("click", function(){
				$('.optionSel input').removeClass("active");
			 });  
			
			$(".popupAccordion .accTitleBox").on("click", function(){
				
				if($(this).hasClass("active")){ return false; }
				$(".popupAccordion .accTitleBox").removeClass("active"); $(".navicon-button").removeClass("pm");
				$(".accDtlInfo").slideUp("fast");

				$(this).addClass("active"); $(this).find(".navicon-button").addClass("pm");
				$(this).next(".accDtlInfo").slideDown("fast");
			});
			
			
			//공사지도
			mapInit = new MapInit('corporationDiv4',{   
	            baseMap:'VWorld',   
	            baseMapVislble : true, 
	            mapUrl : '${mapUrl}'+'/',      
	            interactions:{    
	                shiftDragZoom : false,  
	                dragPan: false,   
	                mouseWheelZoom : false  
	            },
	            mapControl : {  
	                elem : "ul.mapCtr_wrap>li span",  
	                flag : "class",
	                arrHandle : ["btn_distanceMeasure", "btn_areaMeasure", "btn_circle", "btn_reset" , "btn_merge"]
	            },        
	            //targetLayer:["thin_legaldong_sido","tb_legaldong_sgg"],    
	            //targetLayer:["thin_legaldong_sido"],        
	            minZoom:0,       
	            maxZoom:12,   
	            zoom:0,   
	            center:[14197378.96, 4274375.9],   
	            roadModal : "#modal-controller-1",
	        });
			mapInit.mapAction.setVisibilityById("VWorld_gray");
			
			 var popup = new ol.Overlay.Popup (
					    {	popupClass: "default", //"tooltips", "warning" "black" "default", "tips", "shadow",
					      closeBox: false,
					      onshow: function(){ console.log("You opened the box"); },
					      onclose: function(){ console.log("You close the box"); },
					      positioning: 'auto',
					      autoPan: true,
					      autoPanAnimation: { duration: 250 }  
					    });
					
			mapInit.overlay.overlayTooltipLayer = popup;
			mapInit.map.addOverlay(popup);  
			
			
		 	// 팁 hover
		    $(".exclMark").hover(function(){
				var top  = $(this).offset().top - 8;
				var left = $(this).offset().left + 28;
				var text = $(this).attr("data-title");

				$(".countTooltip p").text(text);
				$(".countTooltip").css("top", top).css("left", left); $(".countTooltip").show();
			}, function() {
				$(".countTooltip").hide();
			});
		 
		    // 카운트 박스 클릭
			$(".countBox").on("click", function(){
				$(".exclMark").attr("src", "/assets/images/icon/excl_mark.png");
				$(".countBox").removeClass("active");

				$(this).addClass("active");
				$(this).find(".exclMark").attr("src", "/assets/images/icon/excl_mark_w.png");
			});
		    
			//230511_kyj_Excel다운로드(corporationList:10/20/30, corporationListAll:전체)
			function exportTableToExcel(tableID, filename){ //tableId = dataTable(10/20/30), dataTableExcel(전체)
			    var downloadLink;
			    var dataType = 'application/vnd.ms-excel';
			    var tableSelect = document.getElementById(tableID);
			    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

			    // Specify file name
			    filename = filename?filename+'.xls':'excel_data.xls';

			    // Create download link element
			    downloadLink = document.createElement("a");

			    document.body.appendChild(downloadLink);

			    if(navigator.msSaveOrOpenBlob){
			        var blob = new Blob(['\ufeff', tableHTML], {
			            type: dataType
			        });
			        navigator.msSaveOrOpenBlob( blob, filename);
			    }else{
			        // Create a link to the file
			        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

			        // Setting the file name
			        downloadLink.download = filename;

			        //triggering the function
			        downloadLink.click();
			    }
			}
		</script>
	</body>
</html>