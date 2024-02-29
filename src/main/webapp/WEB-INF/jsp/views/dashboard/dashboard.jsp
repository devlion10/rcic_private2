<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="org.springframework.security.core.Authentication"%>
<%@page import="org.springframework.security.core.context.SecurityContextHolder"%> 
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
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
		
		<!-- css -->
		<link href="/assets/css/dashboard/common.css" type="text/css" rel="stylesheet" media="all">
		<link href="/assets/css/dashboard/layout.css" type="text/css" rel="stylesheet" media="all">
		<link href="/assets/js/common/lib/ol/dist/ol-contextmenu.min.css" rel="stylesheet">
		<!-- js -->
		<script type='text/javascript' src='/assets/js/common/lib/jquery/jquery-3.5.1.min.js'></script>
		<script type='text/javascript' src='/assets/js/common/lib/jquery/jquery.min.js'></script>
		<script type="text/javascript" src="/assets/js/common/lib/jquery/jquery.blockUI.js"></script>    
		<script type="text/javascript" src="/assets/js/common/lib/jquery/jquery-ui.js"></script>
		<script type="text/javascript" src="/assets/js/common/lib/jquery/jquery.number.min.js"></script>
		<script type="text/javascript" src="/assets/js/common/lib/jquery/jquery.bxslider.js"></script>
		<script type="text/javascript" src="/assets/js/common/lib/bootstrap/bootstrap.min.js"></script>
		<script type="text/javascript" src="/assets/js/common/lib/common/underscore.js"></script> 
		<script type='text/javascript' src='/assets/js/common/lib/moment/moment.min.js'></script>
		<script type="text/javascript" src="/assets/js/common/lib/moment/moment.js"></script>
		<script type="text/javascript" src="/assets/admin/js/lodash.min.js"></script>
		
		<!-- <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script> -->
		<script type="text/javascript" src="/assets/js/common/lib/hls/hls.js"></script>
		
		<!-- chart.js  -->  
		<script src="/assets/js/common/lib/amcharts4/core.js"></script>
		<script src="/assets/js/common/lib/amcharts4/charts.js"></script>
		<script src="/assets/js/common/lib/amcharts4/lang/de_DE.js"></script>
		<script src="/assets/js/common/lib/amcharts4/lang/ko_KR.js"></script>
		<script src="/assets/js/common/lib/amcharts4/lang/es_ES.js"></script> 
		<script src="/assets/js/common/lib/amcharts4/themes/animated.js"></script>
		<script src="/assets/js/common/lib/amcharts4/themes/material.js"></script>
		<script src="/assets/js/common/lib/amcharts4/themes/dataviz.js"></script>
		<script src="/assets/js/common/lib/amcharts4/plugins/forceDirected.js"></script>
		<!-- ol -->
		<script type="text/javascript" src="/assets/js/common/lib/ol/ol.js"></script>
		<script type="text/javascript" src="/assets/js/common/lib/ol/dist/ol-ext.js"></script>
		<script type="text/javascript" src="/assets/js/common/lib/ol/proj/proj4.js"></script>
		<script type="text/javascript" src="/assets/js/common/lib/ol/proj/projection.js"></script>
		<script type="text/javascript" src="/assets/js/common/lib/ol/dist/ol-contextmenu.js"></script>
		<!-- module.js  -->
		<script type="text/javascript" src="/assets/js/module/cmmn/CommonSearch.js"></script>
		<script type="text/javascript" src="/assets/js/common/util/commonUtil.js"></script>
		<script type='text/javascript' src='/assets/js/common/commonN.js'></script>
		<script type='text/javascript' src="/assets/js/module/dashboard/RcicDashboardChart.js"></script>
		<script type='text/javascript' src="/assets/js/module/dashboard/dashboard.js"></script>
		<script type='text/javascript' src="/assets/js/module/sns/sns.js"></script>  
	</head>
	
	<body>
		<div class="wrap">
			<header class="header">
				<div class="inner">
					<h1><a href="#"><img src="/assets/images/dashboard/logo.png" alt="RCIC"></a></h1>
					<div class="util">
						<%-- <div class="temp">
							<span class="weather" id="weatherImg"></span>
							<span class="num" id="temp"></span>
							<span class="txt" id="tempDesc"></span>
							강우/강설량
							<span class="txt" id="prec"></span>
						</div> --%>
						<a href="#"><img src="/assets/images/dashboard/lx.png" alt="한국국토정보공사"></a>
					</div>
				</div>		
			</header>
			<div class="contents">
				<div class="inner">
					<div class="left-section">
						<article class="panel s-small change-info">
							<div class="info-slide">
								<div class="item collection">
									<h2 class="panel-title">주요 변경 정보(공사)</h2>
									<ul class="bar-chart">
									</ul>
								</div>
								<div class="item renew">
									<h2 class="panel-title">주요 변경 정보(갱신)</h2>
									<ul class="bar-chart">
									</ul>
								</div>
								<div class="item call">
									<h2 class="panel-title">주요 변경 정보(호출)</h2>
									<ul class="bar-chart">
									</ul>
								</div>
							</div>
						</article>
						<div class="panel s-small kinds-info">
							<input type="hidden">
							<input type="hidden" class="date" name="fromDt" id="fromDt">
							<input type="hidden" class="date" name="toDt" id="toDt">
							<article>
								<h2 class="panel-title">공사 종류</h2>
								<div class="chart" id="chartConstruction"></div>
							</article>
							<article>
								<h2 class="panel-title">시설물 종류</h2>
								<div class="chart" id="chartFacility"></div>
							</article>
						</div>
					</div>
					<div class="right-section">
						<div class="right-top">
							<div>
								<article class="panel s-large today-status">
									<h2 class="panel-title">TODAY</h2>
									<div class="item-wrap">
										
										<div class="item item02">
											<div class="number">
												<div class="chart">
													<!-- <div style="background:conic-gradient(#53aed4 0% 80%, #b2b2b2 0% 0%);"></div> -->
													<canvas id="today02" width="78" height="78"></canvas>
													<p class="total">0<span>건</span></p>
												</div>
												<strong>수집현황</strong>
											</div>
											<ul class="legend">
												<li id="yesterday">
													<span class="sbj">전일대비</span>
													<div class="keep">0%</div>
												</li>
												<li id="weekAgo">
													<span class="sbj">전주대비</span>
													<div class="keep">0%</div>
												</li>
												<li id="today">
													<span class="sbj">금일발생</span>
													<div>-</div>
												</li>
											</ul>
										</div>
										<div class="item item01">
											<div class="number">
												<div class="chart">
													<!-- <div style="background:conic-gradient(#07bda1 0% 10%, #b2b2b2 0% 0%);"></div> -->
													<canvas id="today01" width="78" height="78"></canvas>
													<p class="total">0<span>건</span></p>
												</div>
												<strong>공사현황</strong>
											</div>
											<ul class="legend">
												<li id="yesterday">
													<span class="sbj">전일대비</span>
													<div class="keep">0%</div>
												</li>
												<li id="weekAgo">
													<span class="sbj">전주대비</span>
													<div class="keep">0%</div>
												</li>
												<li id="today">
													<span class="sbj">금일발생</span>
													<div>-</div>
												</li>
											</ul>
										</div>
										<div class="item item03">
											<div class="number">
												<div class="chart">
													<!-- <div style="background:conic-gradient(#8277c1 0% 10%, #b2b2b2 0% 0%);"></div> -->
													<canvas id="today03" width="78" height="78"></canvas>
													<p class="total">0<span>건</span></p>
												</div>
												<strong>갱신현황</strong>
											</div>
											<ul class="legend">
												<li id="yesterday">
													<span class="sbj">전일대비</span>
													<div class="keep">0%</div>
												</li>
												<li id="weekAgo">
													<span class="sbj">전주대비</span>
													<div class="keep">0%</div>
												</li>
												<li id="today">
													<span class="sbj">금일발생</span>
													<div>-</div>
												</li>
											</ul>
										</div>
										<div class="item item04">
											<div class="number">
												<div class="chart">
													<!-- <div style="background:conic-gradient(#f55c50 0% 50%, #b2b2b2 0% 0%);"></div> -->
													<canvas id="today04" width="78" height="78"></canvas>
													<p class="total">0<span>건</span></p>
												</div>
												<strong>호출현황</strong>
											</div>
											<ul class="legend">
												<li id="yesterday">
													<span class="sbj">전일대비</span>
													<div class="keep">0%</div>
												</li>
												<li id="weekAgo">
													<span class="sbj">전주대비</span>
													<div class="keep">0%</div>
												</li>
												<li id="today">
													<span class="sbj">금일발생</span>
													<div>-</div>
												</li>
											</ul>
										</div>
									</div>
								</article>
								<article class="panel s-large map">
									<h2 class="blind">map</h2>
								</article>
							</div>
							<div>
								<article class="panel s-xmall traffic-info">
									<h2 class="panel-title">도로교통정보<span><img src="/assets/images/dashboard/ts.jpg" alt="국가교통정보센터"></span></h2>
									<div>
										<div class="info">
											<p>국가교통정보센터 제공 <span>CCTV</span></p>
											<%-- <a href="">https://www.its.go.kr/opendata/opendataList?service=cctv</a> --%>
										</div>
										<div class="cctv">
											<input type="hidden" id="cctvIdx" name="cctvIdx"/>
											<video width="265" height="140" id="cctvVideo" controls muted autoplay style="object-fit:fill;" crossorigin="anonymous"></video>
											<div class="overlay">
										        Content above your video
										    </div>
											<p></p>
										</div>
										<!-- <div class="cctv">
											<input type="hidden" id="cctvIdx" name="cctvIdx"/>
											<video width="130" height="140" id="cctvVideo" controls muted autoplay style="object-fit:fill;" crossorigin="anonymous"></video>
											<div class="overlay">
										        Content above your video
										    </div>
											<p></p>
										</div> -->
									</div>
								</article>
								<article class="panel s-xmall road-info">
									<h2 class="panel-title">도로변화정보</h2>
									<ul class="tab">
										<li class="on"><a href="#tab1">국도공사</a></li>
										<li><a href="#tab2">도로개설</a></li>
										<li><a href="#tab3">시설공사</a></li>
									</ul>
									<div class="tab-con">
										<div id="tab1" style="display:block;">
											<table class="tbl-base">
												<caption>국도공사</caption>
												<colgroup>
													<col style="width:35%">
													<col>
												</colgroup>
												<thead>
													<tr>
														<th scope="col">지역</th>
														<th scope="col">공사명</th>
													</tr>
												</thead>
												<tbody style="height: 253px;">
												</tbody>
											</table>
										</div>
										<div id="tab2">
											<table class="tbl-base">
												<caption>국도공사</caption>
												<colgroup>
													<col style="width:35%">
													<col>
												</colgroup>
												<thead>
													<tr>
														<th scope="col">지역</th>
														<th scope="col">공사명</th>
													</tr>
												</thead>
												<tbody style="height: 253px;">
												</tbody>
											</table>
										</div>
										<div id="tab3">
											<table class="tbl-base">
												<caption>국도공사</caption>
												<colgroup>
													<col style="width:35%">
													<col>
												</colgroup>
												<thead>
													<tr>
														<th scope="col">지역</th>
														<th scope="col">공사명</th>
													</tr>
												</thead>
												<tbody style="height: 253px;">
												</tbody>
											</table>
										</div>
									</div>
								</article>
							</div>
						</div>
						<div class="right-bottom">
							<%-- <article class="panel s-medium construction-info">
								<h2 class="panel-title">도로별 공사현황</h2>
								<div class="btn-wrap">
									<button type="button" onclick="_rcicChartMap.createChart1(dayArr,'bidntcedt');" class="active">일</button>
									<button type="button" onclick="_rcicChartMap.createChart1(weekArr,'bidntcedt_week');">주</button>
									<button type="button" onclick="_rcicChartMap.createChart1(monthArr,'bidntcedt_yyyymm');">월</button>
								</div>
								<div class="chartStatus" id="chartStatus"></div>
							</article> --%>
							<article class="panel s-bigger collection-info">
								<h2 class="panel-title">도로변화 수집정보</h2>
								<div class="collection-info-tab">
									<div id="ctab1" style="display:block;">
										<ul>
										</ul>
									</div>
									<div id="ctab2">
										<ul>
										</ul>
									</div>
									<div id="ctab3">
										<ul>
										</ul>
									</div>
								</div>
							</article>
						</div>
					</div>
				</div>
		
				<div class="modal">
					<div class="modal-inner">
						<div class="modal-header">
							<h1>도로교통정보</h1>
							<button type="button" class="btn-close">닫기</button>
						</div>
						<div class="modal-body">
							<div class="cctv div01">
								<div class="sorting">
									<div class="select routeNo">
										<input type="text" value="국도1호선" readonly>
										<ul class="option">
										</ul>
									</div>
									<div class="select cctvNm">
										<input type="text" value="중등포저수지" readonly>
										<ul class="option">
										</ul>
									</div>
									<div class="checkbox">
										<input type="checkbox" name="check01" id="check01">
										<label for="check01">선택</label>
									</div>
								</div>
								<video width="377" height="343" id="cctvVideo01" controls muted autoplay style="object-fit:fill;" crossorigin="anonymous"></video>
								<div class="overlay">Content above your video</div>
							</div>
							<div class="cctv div02">
								<div class="sorting">
									<div class="select routeNo">
										<input type="text" value="국도1호선" readonly>
										<ul class="option">
											<!-- <li><a href="#">국도1호선</a></li> -->
										</ul>
									</div>
									<div class="select cctvNm">
										<input type="text" value="중등포저수지" readonly>
										<ul class="option">
										</ul>
									</div>
									<div class="checkbox">
										<input type="checkbox" name="check01" id="check02">
										<label for="check02">선택</label>
									</div>
								</div>
								<video width="377" height="343" id="cctvVideo02" controls muted autoplay style="object-fit:fill;" crossorigin="anonymous"></video>
								<div class="overlay">Content above your video</div>
							</div>
							<div class="cctv div03">
								<div class="sorting">
									<div class="select routeNo">
										<input type="text" value="국도1호선" readonly>
										<ul class="option">
										</ul>
									</div>
									<div class="select cctvNm">
										<input type="text" value="중등포저수지" readonly>
										<ul class="option">
										</ul>
									</div>
									<div class="checkbox">
										<input type="checkbox" name="check01" id="check03">
										<label for="check03">선택</label>
									</div>
								</div>
								<video width="377" height="343" id="cctvVideo03" controls muted autoplay style="object-fit:fill;" crossorigin="anonymous"></video>
								<div class="overlay">Content above your video</div>
							</div>
							<div class="cctv div04">
								<div class="sorting">
									<div class="select routeNo">
										<input type="text" value="국도1호선" readonly>
										<ul class="option">
										</ul>
									</div>
									<div class="select cctvNm">
										<input type="text" value="중등포저수지" readonly>
										<ul class="option">
										</ul>
									</div>
									<div class="checkbox">
										<input type="checkbox" name="check01" id="check04">
										<label for="check04">선택</label>
									</div>
								</div>
								<video width="377" height="343" id="cctvVideo04" controls muted autoplay style="object-fit:fill;" crossorigin="anonymous"></video>
								<div class="overlay">Content above your video</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<footer class="footer">
				<div class="inner">
					<div class="sns">
						<h2>SNS 소식</h2>
						<!-- <div class="txt"><span>교통정보센터 : [수도권 14:00 분 현재] 소통: 수도권 전 구간 소통원활 합니다.  ~~~  서울시 교통정보과 : [21:54] 상도로(장승배)  ~~~~~~ 교통정보센터 : [수도권 14:00 분 현재] 소통: 수도권 전 구간 소통원활 합니다.  ~~~  서울시 교통정보과 : [21:54] 상도로(장승배)  ~~~~~~ 교통정보센터 : [수도권 14:00 분 현재] 소통: 수도권 전 구간 소통원활 합니다.  ~~~  서울시 교통정보과 : [21:54] 상도로(장승배)  ~~~~~~ 교통정보센터 : [수도권 14:00 분 현재] 소통: 수도권 전 구간 소통원활 합니다.  ~~~  서울시 교통정보과 : [21:54] 상도로(장승배)  ~~~~~~ 교통정보센터 : [수도권 14:00 분 현재] 소통: 수도권 전 구간 소통원활 합니다.  ~~~  서울시 교통정보과 : [21:54] 상도로(장승배)  ~~~~~~ </span></div> -->
						<div class="sns-wrap-inner ellipsis">
							<div class="sns-scroll">
								<ul>
									<!-- <li><span>1동두천시(Dongducheon):[2021-10-26 13:45][중앙도심광장 지하주차장 폐쇄 안내] 행복드림센터(시민수영장) 건립공사 착공에 따라 중앙도심광장 지상건축물 철거 및 지하보강 작업으로 인해 중앙도심광장 지하주차장을 2021년 11월 1일부터 폐쇄합니다. 자세히 보기 : https://t.co/Kn0tbeofHp https://t.co/bBw6zijDTw https://t.co/BNIbHCV5a8</span></li>
									<li><span>2동두천시(Dongducheon):[2021-10-26 13:45][중앙도심광장 지하주차장 폐쇄 안내] 행복드림센터(시민수영장) 건립공사 착공에 따라 중앙도심광장 지상건축물 철거 및 지하보강 작업으로 인해 중앙도심광장 지하주차장을 2021년 11월 1일부터 폐쇄합니다. 자세히 보기 : https://t.co/Kn0tbeofHp https://t.co/bBw6zijDTw https://t.co/BNIbHCV5a8</span></li>
									<li><span>3동두천시(Dongducheon):[2021-10-26 13:45][중앙도심광장 지하주차장 폐쇄 안내] 행복드림센터(시민수영장) 건립공사 착공에 따라 중앙도심광장 지상건축물 철거 및 지하보강 작업으로 인해 중앙도심광장 지하주차장을 2021년 11월 1일부터 폐쇄합니다. 자세히 보기 : https://t.co/Kn0tbeofHp https://t.co/bBw6zijDTw https://t.co/BNIbHCV5a8</span></li>
									<li><span>4동두천시(Dongducheon):[2021-10-26 13:45][중앙도심광장 지하주차장 폐쇄 안내] 행복드림센터(시민수영장) 건립공사 착공에 따라 중앙도심광장 지상건축물 철거 및 지하보강 작업으로 인해 중앙도심광장 지하주차장을 2021년 11월 1일부터 폐쇄합니다. 자세히 보기 : https://t.co/Kn0tbeofHp https://t.co/bBw6zijDTw https://t.co/BNIbHCV5a8</span></li>
									<li><span>5동두천시(Dongducheon):[2021-10-26 13:45][중앙도심광장 지하주차장 폐쇄 안내] 행복드림센터(시민수영장) 건립공사 착공에 따라 중앙도심광장 지상건축물 철거 및 지하보강 작업으로 인해 중앙도심광장 지하주차장을 2021년 11월 1일부터 폐쇄합니다. 자세히 보기 : https://t.co/Kn0tbeofHp https://t.co/bBw6zijDTw https://t.co/BNIbHCV5a8</span></li> -->
								</ul>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</div>
		<script>
			var _commonSearch = new CommonSearch({});
			var _search = null;
			var _self = this;
			var _detailMap = null;
			var dashMap = null;
			var mapUrl = '${mapUrl}';
			$(document).ready(function() {
				//console.log('dashboard start >> ' + Dashboard.getCurrentTime());
				// 지도 초기화
				dashMap = Dashboard.initMap();

				Dashboard.lotateMap();
				Dashboard.getGPSData();
				
				// sns 소식
				Dashboard.getSnsList();
				// cctv 목록
				Dashboard.getCctvApi();
				// 대시보드 차트
				Dashboard.viewChart();
				// today
				Dashboard.constIngCnt();
				Dashboard.searchCollectionCnt();
				Dashboard.searchRenewCnt();
				Dashboard.searchApiUseStatus();
				// 대시보드 reload
				Dashboard.reload();
				Dashboard.cctvApiInterval();
			});
			
			// 주요변경정보 슬라이드
			$('.info-slide').bxSlider({
				touchEnabled: false,
				auto: true,
				controls: false,
				pager: false,
				speed:500,
				autoControlsCombine: true,
				responsive: true,
				pause: 5000,				
				onSliderLoad: function() {
					Dashboard.getCollectionChangeInfo();
					Dashboard.getRenewChangeInfo();
					Dashboard.getCallChangeInfo();
				},
				onSlideBefore: function(slideElement, oldIndex, newIndex){
					// 주요변경정보 animate 효과
					$(slideElement).find('.bar-chart li').each(function(){
						var bar = $(this).find('.bar span');
						var percent = bar.data('width');
						bar.delay(500).animate({
							width: percent + '%'
						}, 1000);
					});
				},
				onSlideAfter: function(slideElement, oldIndex, newIndex){
					$('.info-slide .bar-chart li .bar span').css('width', '0%');
				}
			});
			
			// 도로변화정보 슬라이드
			var trafficSlide = $('.tab-con').bxSlider({
				auto: true,
				controls: false,
				pager: false,
				speed:500,
				autoControlsCombine: true,
				responsive: true,
				pause: 5000,
				onSliderLoad: function() {
					// 도로변화정보(진행공사목록)
					Dashboard.getRoadChangeInfo(0,'roadConst');
					Dashboard.getRoadChangeInfo(0,'roadMake');
					Dashboard.getRoadChangeInfo(0,'fac');
					$('.road-info .bx-viewport').css('height', '100%');
				},
				onSlideBefore: function($slideElement, oldIndex, newIndex){
					//console.log(oldIndex + ' / ' + newIndex);
					$('.tab li').eq(newIndex).addClass('on').siblings().removeClass('on');
					statusSlide.goToSlide(newIndex);
				},
			});
			// 도로변화 수집정보 슬라이드
			var statusSlide = $('.collection-info-tab').bxSlider({
				auto: false,
				controls: false,
				pager: false,
				speed:500,
				autoControlsCombine: true,
				responsive: true,
				pause: 5000,
				onSliderLoad: function() {
					$('.collection-info .bx-viewport').css('height', '100%');
				},
				onSlideBefore: function($slideElement, oldIndex, newIndex){
					trafficSlide.goToSlide(newIndex);
				},
			});
			// 도로변화정보 [국도공사/도로개설/시설공사] 클릭 이벤트
			$('.tab a').on('click', function(e){
		        e.preventDefault();
		        var idx= $(this).parent().index();
				trafficSlide.goToSlide(idx);
				statusSlide.goToSlide(idx);
		    });
			// 도로별 공사현황 슬라이드
			/*var curIdx = 1;
			setInterval(function(){
				$('.construction-info .btn-wrap button').eq(curIdx % 3).addClass('active').siblings().removeClass('active');
				if(curIdx % 3 == 0) {
					_rcicChartMap.createChart1(dayArr,'bidntcedt');
				} else if(curIdx % 3 == 1) {
					_rcicChartMap.createChart1(weekArr,'bidntcedt_week');
				} else {
					_rcicChartMap.createChart1(monthArr,'bidntcedt_yyyymm');
				}
				curIdx++;
			}, 4000);
			// 도로별 공사현황 [일/주/월] 클릭 이벤트
			$('.construction-info button').click(function(){
				$(this).addClass('active').siblings().removeClass('active');
			});*/
			
			//[s]----------- cctv modal popup
		    $('.traffic-info .cctv').click(function() {
		    	if($('.cctvNm ul>li').length == 0) {
		    		Dashboard.getHlsUrl(cctvMap.list[0].cctvurl, 'cctvVideo01', null, cctv01);
		    		Dashboard.getHlsUrl(cctvMap.list[1].cctvurl, 'cctvVideo02', null, cctv02);
		    		Dashboard.getHlsUrl(cctvMap.list[2].cctvurl, 'cctvVideo03', null, cctv03);
		    		Dashboard.getHlsUrl(cctvMap.list[3].cctvurl, 'cctvVideo04', null, cctv04);
		    		
			    	for (var i = 0; i < 4; i++) {
			    		$('.cctv.div0'+(i+1)+' .routeNo input[type=text]').val(cctvMap.list[i].route);
			    		$('.cctv.div0'+(i+1)+' .cctvNm input[type=text]').val(cctvMap.list[i].cctvNm);
			    		
			    		cctvList(cctvMap.list[i].routeNo, $('.cctv.div0'+(i+1)+' .cctvNm ul'));
			    		$('.cctv.div0'+(i+1)+' input[type=checkbox]').val(i);
					}
		    	}
		    	$('.modal input[type=checkbox]').prop('checked', false);
				$('.modal').show();
		    });
			$('.checkbox label').click(function(){
				//$('#cctvIdx').val($(this).prev().val());
				$('.cctv input[type=checkbox]').not($(this).prev()).prop('checked', false);
			});
			$('body').on('click', function(){
				if($('.select .option').is(':visible')){
					$('.select .option').hide();
				}
			});
		   	$('.select').click(function(){
				var _option = $(this).find('.option');
				$('.cctv .option').not(_option).hide();
				
				if(_option.is(':hidden')) 	_option.show();
				else						_option.hide();
				return false;
			});
		    $('.modal .btn-close').on('click', function(){
		    	if($('.cctv input[type=checkbox]:checked').length > 0) {
		    		var idx = $('.cctv input[type=checkbox]:checked').val();
		    		
		    		$('#cctvVideo').removeAttr('src');
		    		Dashboard.getHlsUrl(cctvMap.list[idx].cctvurl, 'cctvVideo', $('#cctvIdx').val(), mainCctv);
		    		$('.traffic-info .cctv p').text(cctvMap.list[idx].cctvname);
		    		$('#cctvIdx').val(idx);
		    	}
		        $('.modal').fadeOut(200);
		        
		        cctv01.hls.stopLoad();
		        cctv02.hls.stopLoad();
		        cctv03.hls.stopLoad();
		        cctv04.hls.stopLoad();
		    });
		  	//[e]----------- cctv modal popup
		  
			function optionSelect(obj) {
				$(obj).parents('.option').prev().val($(obj).text());
				$(obj).parents('.cctv').find('.cctvNm input[type=text]').val('-선택-');
	
				var _ul = $(obj).parents('.cctv').find('.cctvNm>ul');
				var routeNo = $(obj).parent().attr('routeno');
				cctvList(routeNo, _ul);
			}
		  	function cctvList(routeNo, _selUl) {
		  		var videoId = _selUl.parents('.sorting').next().attr('id');
		  		_selUl.html('');
		  		for(var i in cctvMap.list){
					if(cctvMap.list[i].routeNo == routeNo) {
						_selUl.append('<li idx="'+i+'"><a href="#" onclick="cctvSelect(this, '+i+', \''+videoId+'\'); return false;">'+cctvMap.list[i].cctvNm+'</a></li>');
					}
				}
		  		_selUl.scrollTop(0);
		  	}
		  	function cctvSelect(obj, idx, videoId) {
		  		var beforeIdx = $(obj).parents('.sorting').find('input[type=checkbox]').val();
		  		$(obj).parents('.sorting').find('input[type=checkbox]').val(idx);
		  		$(obj).parents('.option').prev().val($(obj).text());
		  		
		  		var videoObj;
		  		if($(obj).parents('.cctv').index() == 0) {
		  			videoObj = cctv01;
		  		} else if($(obj).parents('.cctv').index() == 1) {
		  			videoObj = cctv02;
		  		} else if($(obj).parents('.cctv').index() == 2) {
		  			videoObj = cctv03;
		  		} else if($(obj).parents('.cctv').index() == 3) {
		  			videoObj = cctv04;
		  		}
		  		
		  		$('#'+videoId).removeAttr('src');
		  		Dashboard.getHlsUrl(cctvMap.list[idx].cctvurl, videoId, beforeIdx, videoObj);
		  	}
		</script>
	</body>
</html>