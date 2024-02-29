<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="org.springframework.security.core.Authentication"%>
<%@page import="org.springframework.security.core.context.SecurityContextHolder"%> 
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@page import="org.springframework.security.core.Authentication"%>
<%@page import="org.springframework.security.core.context.SecurityContextHolder"%>
<%@page import="java.net.URLEncoder"%>
<%@ page import="java.net.URLDecoder"%>
<%@taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<%
  String userId_cookie = "";
  try {
    Cookie[] cookies = request.getCookies();
    if (cookies != null) {
      for (int i = 0; i < cookies.length; i++) {
        if (cookies[i].getName().equals("rcicId")) {
          userId_cookie = URLDecoder.decode((cookies[i].getValue()),"UTF-8");
        }
      }
    }
  } catch (Exception e) {}
  
  HttpSession sess = request.getSession();
  String clientIp =(String)sess.getAttribute("clientIp");
  
%>
<%
Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
String userName = authentication.getName();
  if(!userName.equals("anonymousUser")){
%>
<sec:authentication property="principal" var="user"/> 
<sec:authentication property="principal.extInfo" var="userInfo"/>
<%
  }
  response.setHeader("Cache-Control","no-store");   
  response.setHeader("Pragma","no-cache");   
  response.setDateHeader("Expires",0);   
  if (request.getProtocol().equals("HTTP/1.1")) 
          response.setHeader("Cache-Control", "no-cache");  
%>
<html lang="ko">
	<head>
		<!-- meta -->
		<meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	    <meta name="HandheldFriendly" content="true">
	    <meta name="format-detection" content="telephone=no" />
	    <meta name="title" content="도로명수집시스템">
	    <meta name="description" content="">
	    <meta name="keywords" content="">
	    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
	    <!-- meta -->

	    <!-- Open Graph -->
	    <meta property="og:title"       content="도로명수집시스템" />
	    <meta property="og:type"        content="website" />
	    <meta property="og:image"       content="" />
	    <meta property="og:site_name"   content="도로명수집시스템" />
	    <meta property="og:url"         content="" />
	    <meta property="og:description" content="" />
	    <!-- Open Graph -->

		<title>도로명변경정보 수집시스템</title>

		<jsp:include page="/WEB-INF/jsp/views/include/mobileHead.jsp"></jsp:include>
        <link href="/assets/css/ol.css" type="text/css" rel="stylesheet" media="all">
        <link href="/assets/css/map.css" type="text/css" rel="stylesheet" media="all">

        <!-- js -->  
        <!-- <script type='text/javascript' src='/assets/js/common/lib/jquery/jquery-3.5.1.min.js'></script> -->
        <!-- html -->
        <script type='text/javascript' src='/assets/js/common/lib/jquery/jquery.min.js'></script>
		<script type="text/javascript" src="/assets/js/common/lib/jquery/jquery.blockUI.js"></script>
		<script type="text/javascript" src="/assets/js/common/lib/jquery/jquery-ui.js"></script> 
		<script type="text/javascript" src="/assets/js/common/lib/jquery/jquery.number.min.js"></script>
        <script type='text/javascript' src='/assets/js/common/lib/common/swiper.min.js'></script>
        <!-- html -->
		<script type="text/javascript" src="/assets/js/common/lib/common/twbsPagination.min.js"></script>
		<script type="text/javascript" src="/assets/js/common/lib/bootstrap/bootstrap.min.js"></script> 		
		<script type="text/javascript" src="/assets/js/common/lib/common/underscore.js"></script> 
        
		<script type='text/javascript' src='/assets/js/common/lib/modal/modal.min.js'></script>		
        <script type='text/javascript' src='/assets/js/common/lib/moment/moment.min.js'></script>
        <script type='text/javascript' src='/assets/js/common/lib/common/ion.rangeSlider.min.js'></script>
        <script type='text/javascript' src='/assets/js/common/lib/bootstrap/bootstrap-datepicker.js'></script>
        <script type='text/javascript' src='/assets/js/common/lib/bootstrap/bootstrap-datepicker.ko.min.js'></script>
		<script type='text/javascript' src='/assets/js/common/lib/common/aos.js'></script>
		<script type='text/javascript' src='/assets/js/common/lib/common/base.js'></script>
		<script type='text/javascript' src='/assets/js/common/lib/sweetalert/sweetalert.js'></script>
        
        <!-- ol -->
		<script type="text/javascript" src="/assets/js/common/lib/ol/ol.js"></script> 
		<script type="text/javascript" src="/assets/js/common/lib/ol/dist/ol-ext.js"></script>
		<script type="text/javascript" src="/assets/js/common/lib/ol/jsts.1.3.0.min.js"></script>
		<script type="text/javascript" src="/assets/js/common/lib/ol/proj/proj4.js"></script>  
		<script type="text/javascript" src="/assets/js/common/lib/ol/proj/projection.js"></script>
		<script type="text/javascript" src="/assets/js/common/lib/ol/geostats.min.js"></script>
		<script type="text/javascript" src="/assets/js/common/lib/ol/chroma.js"></script>
        
        <!-- map   -->
        <script type="text/javascript" src="/assets/js/module/mobile/SetUI.js"></script>
		<script type="text/javascript" src="/assets/js/module/mobile/init/BaseMapConfig.js"></script>
		<script type="text/javascript" src="/assets/js/module/mobile/init/MapAction.js"></script>
		<script type="text/javascript" src="/assets/js/module/mobile/init/MapEventMng.js"></script>    
		<script type="text/javascript" src="/assets/js/module/mobile/init/MapLayerMng.js"></script>
		<script type="text/javascript" src="/assets/js/module/mobile/init/MapTheme.js"></script>
		<script type="text/javascript" src="/assets/js/module/mobile/init/MapInit.js"></script>
		<script type="text/javascript" src="/assets/js/module/mobile/init/MapRcicMng.js"></script>
		<script type="text/javascript" src="/assets/js/module/mobile/init/MapArea.js"></script>
        <script type="text/javascript" src="/assets/js/module/mobile/Search.js"></script>
        
        <script type="text/javascript" src="/assets/js/module/cmmn/CommonSearch.js"></script>
        <script type="text/javascript" src="/assets/js/module/dataCntc/DataCntc.js"></script>
        <script type="text/javascript" src="/assets/js/common/util/commonUtil.js"></script>
        <script type='text/javascript' src='/assets/js/common/commonN.js'></script>
        <script type='text/javascript' src='/assets/js/module/calrendar/Calrendar.js'></script>
        
        <script type="text/javascript" src="/assets/js/module/search/SearchConfig.js"></script>
	    <script type="text/javascript" src="/assets/js/module/search/SearchMng.js"></script>
	    <script type="text/javascript" src="/assets/js/module/mobile/AccInfo.js"></script>
	    <script type="text/javascript" src="/assets/js/module/mobile/MapData.js"></script>
	    <script type="text/javascript" src="/assets/js/module/mobile/ToolBarCnt.js"></script>
	    
	    <script type="text/javascript" src="/assets/js/module/mobile/ViewMainEvent.js"></script>
	    
	    <script type='text/javascript' src="/assets/js/module/corporation/corporation.js"></script>   
	    <script type="text/javascript" src="/assets/js/module/mobile/init/MapGeoStats.js"></script>
	    <style type="text/css">
    	.ol-zoom ol-unselectable ol-control{
    		display: none; 
    	}
    	.ol-control{
    		display: none;
    	}
	    </style>
	</head>
	<body>
		<div class="containerWrap">
			<div id="rcicMap"></div>
			<div id="mapLegend" style="display: none;"></div>
			<!-- //.map -->
			<div class="contentsBox" style="height: 0%; "> 
			<!-- //.map -->
				<div class="mNavWrap">
					<div class="mNavBox">
						<div class="mNavHead">
							<div class="mNavHeadTop">
								<div class="inline wid70 alginLeft">
									<div class="mNavLogoBox inline mr10"><a href="/"><span>RCIC</span></a></div>
									<div class="mNavTopTxt inline">
										<p>ROAD CHANGE</p>
										<p>INFO COLLECTION</p>
									</div>
								</div>
								<div class="inline wid30 alginRight"><img src="/assets/images/mobile/button/wCloseBtn.png" alt="closeButton" class="navClose"></div>
							</div>
							<div class="mNavUser">
								<div class="mNavUserCell">
								<%  if(!userName.equals("anonymousUser")){%>
									<span class="navUserInfoTxt">${userInfo.instt_se_nm}<span class="navUserName">${userInfo.user_nm}</span>님 환영합니다.</span>
								<%}%>	
								</div>
							</div>
						</div>
						<div class="mNavPage">
							<ul>
								<li><a href="/rcic/movePage?menuId=corporation">공사현황</a></li>
								<li><a href="/rcic/movePage?menuId=collection">수집현황</a></li>
								<li><a href="/rcic/movePage?menuId=dataApi">데이터제공API</a></li>
								<li><a href="/rcic/movePage?menuId=board">게시판</a></li>
								<li><a href="/rcic/movePage?menuId=sns">SNS소식</a></li>
								<li><a href="/rcic/public_main">RCIC소개</a></li>
								<li><a href="/rcic/movePage?menuId=mypage">마이페이지</a></li>
							</ul>
							<%-- <div class="mNavBtnBox">
								<input type="button" value="RCIC실행">
								<%  if(userName.equals("anonymousUser")){%>
									<input type="button" value="로그인"  name="loginBtn" onclick="MainInfo.btnClickEvent(this);return false;">
								<%}else{ %>
								<!-- 로그인 후 -->
									<input type="button" id="logoutBtn" name="logoutBtn" class="headerOnBtn loginBtn" value="로그아웃" onclick="Login.logout();return false;">
								<%}%> 
							</div> --%>
						</div>
					</div>
				</div>
				<!-- //.mNavWrap -->

				<div class="searchBox">
					<div class="searchTopBox">
						<div class="search">
							<div class="icon hamburger"><span></span><span></span><span></span></div>
							<div class="logoBox"><p class="logo">RCIC</p></div>
							<div class="keywordBox">
								<input type="text" name="mSearchText" id="mSearchText" placeholder="공사명 또는 지역명 입력" class="keyword">
								<div class="iconSearchBox"><img src="/assets/images/mobile/icon/icon_search.jpg" alt="icon" onclick="MapData.setSearchEvt();"></div>
							</div>
						</div>
						<div class="bookMarkBox mt10">
							<div class="bookMark">
								<img src="/assets/images/mobile/icon/icon_bookmark.png" alt="bookmark">
								<!-- 등록된 관심지역이 없는경우 -->
								<!-- <div class="inline noAttenBox">
									<span class="mr15">등록된 관심 지역이 없습니다.</span>
									<input type="button" value="관심지역 설정하기">
								</div> -->
								<!-- 등록된 관심지역이 있는경우 -->
								<div class="inline" id="myAreaTop">
									<!-- <input type="button" value="강서구 전체">
									<input type="button" value="상평동">
									<input type="button" value="한남동">
									<input type="button" value="충청북도">
									<input type="button" value="강서구 전체">
									<input type="button" value="상평동">
									<input type="button" value="한남동">
									<input type="button" value="충청북도"> -->
								</div>
							</div>
						</div>
					</div>
					<div class="searchMidBox">
						<div class="line"></div>
						<div class="setDateBox">
							<div class="dateBoxTop">
								<div class="inline wid50 alignLeft">
									<img src="/assets/images/mobile/icon/icon_date.png" alt="date" class="iconDate"><span class="dateText">기간설정</span>
								</div>
								<div class="inline wid50 alignRight"><img src="/assets/images/mobile/button/arrow_down.png" alt="arrow" class="iconArrowDn"></div>
							</div>
							<div class="dateBoxConf">
								<div class="radioBox">
									<label for="dRadio1" class="radio mr20">
										<input type="radio" name="dRadio" id="dRadio1" value="bidntcedt" class="hidden" checked="true">
										<span class="label"></span>공고일
									</label>
									<label for="dRadio2" class="radio">
										<input type="radio" name="dRadio" id="dRadio2" value="stdr_dt" class="hidden">
										<span class="label"></span>예정공사기간
									</label>
								</div>
								<div class="inDateBox mt10">
									<div class="inDateLeft inline">
										<input type="text" name="startDate" id="startDate" readonly="readonly" >
										<img src="/assets/images/mobile/icon/icon_calender.png" class="iconCalender" alt="calender" target="startDate">
									</div>
									<div class="inDateMid inline"><span class="wave">~</span></div>
									<div class="inDateRight inline">
										<input type="text" name="endDate" id="endDate" readonly="readonly" >
										<img src="/assets/images/mobile/icon/icon_calender.png" class="iconCalender" alt="calender" target="endDate">
									</div>
								</div>
								<div class="dateBtnBox mt20">
									<div class="dateBtnMonth">
										<input type="button" value="1주일" onclick="$.selPeriod('week','startDate','endDate');return false;">
										<input type="button" value="1개월" onclick="$.selPeriod('1month','startDate','endDate');return false;">
										<input type="button" value="3개월" onclick="$.selPeriod('3month','startDate','endDate');return false;">
										<input type="button" value="6개월" onclick="$.selPeriod('6month','startDate','endDate');return false;">
									</div>
									<div class="dateBtnYear mt10">
										<input type="button" value="1년" onclick="$.selPeriod('1year','startDate','endDate');return false;">
										<input type="button" value="2년" onclick="$.selPeriod('2year','startDate','endDate');return false;">>
										<input type="button" value="3년" onclick="$.selPeriod('3year','startDate','endDate');return false;">>
										<input type="button" value="3년이상" onclick="$.selPeriod('3yearafter','startDate','endDate');return false;">>
									</div>
								</div>
							</div>
						</div>
						<div class="searchListBox">
							<div>
								<div class="rsText"><span>검색결과</span><span id="content2Tot"></span></div>
								<div class="rsOption mt15" style="display: none;">
									<select id="sidoAreaCombo">
									</select>
									<select id="roadTyCombo">>
									</select>
								</div>
							</div>
							<div class="rsList mt20">
								<div class="mapEmptyBox">
									<div class="mapEmptyImgBox"><img src="/assets/images/map/map_empty.png" alt="empty"></div>
									<div class="mapEmptyTxtBox mt20">
										<p id="mapEmptyRst" style="display: none;">검색 결과가 없습니다.</p>
									</div>
								</div>
								<ul name="contents1">
								</ul>
							</div>
							<div class="moreBtnBox mt10" id="content1Plus">
								<button>더보기</button>
							</div>
						</div>
						</div>
					</div>
				</div>
				<!-- //.searchBox -->

				<div class="countSliderBox">
					<ul>
						<li class="base" data-color="blue"><span>진행공사</span><span id="toolbar1">000,000 건</span></li>
						<li class="base" data-color="green"><span>국도공사</span><span id="toolbar2">000,000 건</span></li>
						<li class="base" data-color="yellow"><span>도로개설</span><span id="toolbar3">000,000 건</span></li>
						<li class="base" data-color="pink"><span>시설공사</span><span id="toolbar4">000,000 건</span></li>
						<li class="purple" data-color="purple"><span>준공예정</span><span id="toolbar5">000,000 건</span></li>
					</ul>
				</div>
				<!-- //.countSliderBox -->

				<div class="mapMarkerBox">
					<div class="iconMarkerBox">
						<img src="/assets/images/mobile/icon/icon_circle_blue.png" alt="marker" class="iconCircle">
						<div class="icon_marker"><img src="/assets/images/mobile/icon/icon_maker_cor.png" alt="marker"></div>
					</div>
				</div>
				<!-- //.mapMarkerBox -->

				<div class="iconMapBox">
					<img src="/assets/images/mobile/icon/icon_map.png" alt="map">
				</div>
				<!-- //.iconMapBox -->

				<div class="iconControllBox">
					<div><img src="/assets/images/mobile/icon/icon_plus.png" alt="controll" onclick="mapInit.mapAction.zoomIn(); return false;"></div>
					<div class="mt5"><img src="/assets/images/mobile/icon/icon_minus.png" alt="controll" onclick="mapInit.mapAction.zoomOut(); return false;"></div>
				</div>
				<!-- //.iconMapBox -->

				<div class="fixBtmWrap">
					<div class="fixBtmBox">
						<div class="btmMenuBox">
							<ul>
								<li><a href="javascript:btmMenu(1);"><img src="/assets/images/mobile/button/btm_menu1.png" alt="menu"></a></li>
								<li><a href="javascript:btmMenu(2);"><img src="/assets/images/mobile/button/btm_menu2.png" alt="menu"></a></li>
								<li><a href="javascript:btmMenu(3);"><img src="/assets/images/mobile/button/btm_menu3.png" alt="menu"></a></li>
								<li><a href="javascript:btmMenu(4);"><img src="/assets/images/mobile/button/btm_menu4.png" alt="menu"></a></li>
							</ul>
						</div>
						<!-- //.btmMenuBox -->

						<div class="slideContainer reset">
							<div class="swiper-container corInfoBox">
								<div class="swiper-wrapper"  id="contents1Dtl"></div>
								<!-- Add Arrows -->
								<!-- <div class="swiper-button-next"></div>
								<div class="swiper-button-prev"></div> -->
							</div>
						</div>
						<!-- //.slideContainer -->

						<div class="snsContainer reset">
							<div class="snsListBox">
								<div class="snsTitleBox">
									<div class="inline wid50 alignLeft"><span>SNS 소식</span></div>
									<div class="inline wid50 alignRight"><img src="/assets/images/mobile/button/icon_sns_arrow.png" class="snsArrow"></div>
								</div>
								<div class="snsDataListBox">
									<div class="snsListTopBox">
										<!-- <div class="inDateBox mt10">
											<div class="inDateLeft inline">
												<input type="text" name="snsStartDt" id="snsStartDt" readonly="readonly" >
												<img src="/assets/images/mobile/icon/icon_calender.png" class="iconCalender" alt="calender" target="snsStartDt">
											</div>
											<div class="inDateMid inline"><span class="wave">~</span></div>
											<div class="inDateRight inline">
												<input type="text" name="snsEndDt" id="snsEndDt" readonly="readonly" >
												<img src="/assets/images/mobile/icon/icon_calender.png" class="iconCalender" alt="calender" target="snsEndDt">
											</div>
										</div>
										<div class="dateBtnBox mt20">
											<div class="dateBtnMonth">
												<button value="1주일" onclick="$.selPeriod('week','snsStartDt','snsEndDt');return false;">1주일</button>
												<button value="1개월" onclick="$.selPeriod('1month','snsStartDt','snsEndDt');return false;">1개월</button>
												<button value="6개월" onclick="$.selPeriod('6month','snsStartDt','snsEndDt');return false;">3개월</button>
												<button value="1년" onclick="$.selPeriod('1year','snsStartDt','snsEndDt');return false;">1년</button>
											</div>
										</div> -->
										<div class="accBox mt10" id="snsAccountDiv">
											<select class="wid100" id="snsAccount" >
												<option value = "">계정 전체</option>
											</select>
										</div>
									</div>
									<div class="snsList">
										<div class="msnsList">
										<!-- <div class="btmSnsSlideBox">
											<div class="btmSnsSlideInfo">
												<div class="snsContentBox">
													<div class="thumbBox inline mr10"><div class="thumbImg thumbImg1"></div></div>
													<div class="goverBox inline">
														<p>원주지방국토관리청</p>
														<p>@wjdoro</p>
													</div>
													<div class="snsConfMarker"><img src="/assets/images/mobile/icon/icon_sns_marker.png" alt="marker"></div>
													<div class="snsDateBox mt10"><span>2020-04-05 10:35:28</span></div>
													<div class="snsConfText">
														<span>[강원권 공사] 국도7호선 고성 상리교차로 부근 ○ 일시: 04월 05일 10:22 ~ ○ 위치: 고상군 간성읍 신안리 308-3 고성 상리교차로 부근 (고성방향) ○ 내용: 2차로 차단 … https://t.co/G0cIPu2bkw</span>
													</div>
												</div>
											</div>
										</div>
										<div class="btmSnsSlideBox">
											<div class="btmSnsSlideInfo">
												<div class="snsContentBox">
													<div class="thumbBox inline mr10"><div class="thumbImg thumbImg1"></div></div>
													<div class="goverBox inline">
														<p>원주지방국토관리청</p>
														<p>@wjdoro</p>
													</div>
													<div class="snsConfMarker"><img src="/assets/images/mobile/icon/icon_sns_marker.png" alt="marker"></div>
													<div class="snsDateBox mt10"><span>2020-04-05 10:35:28</span></div>
													<div class="snsConfText">
														<span>[강원권 공사] 국도7호선 고성 상리교차로 부근 ○ 일시: 04월 05일 10:22 ~ ○ 위치: 고상군 간성읍 신안리 308-3 고성 상리교차로 부근 (고성방향) ○ 내용: 2차로 차단 … https://t.co/G0cIPu2bkw</span>
													</div>
												</div>
											</div>
										</div>
										<div class="btmSnsSlideBox">
											<div class="btmSnsSlideInfo">
												<div class="snsContentBox">
													<div class="thumbBox inline mr10"><div class="thumbImg thumbImg1"></div></div>
													<div class="goverBox inline">
														<p>원주지방국토관리청</p>
														<p>@wjdoro</p>
													</div>
													<div class="snsConfMarker"><img src="/assets/images/mobile/icon/icon_sns_marker.png" alt="marker"></div>
													<div class="snsDateBox mt10"><span>2020-04-05 10:35:28</span></div>
													<div class="snsConfText">
														<span>[강원권 공사] 국도7호선 고성 상리교차로 부근 ○ 일시: 04월 05일 10:22 ~ ○ 위치: 고상군 간성읍 신안리 308-3 고성 상리교차로 부근 (고성방향) ○ 내용: 2차로 차단 … https://t.co/G0cIPu2bkw</span>
													</div>
												</div>
											</div>
										</div>
										<div class="btmSnsSlideBox">
											<div class="btmSnsSlideInfo">
												<div class="snsContentBox">
													<div class="thumbBox inline mr10"><div class="thumbImg thumbImg1"></div></div>
													<div class="goverBox inline">
														<p>원주지방국토관리청</p>
														<p>@wjdoro</p>
													</div>
													<div class="snsConfMarker"><img src="/assets/images/mobile/icon/icon_sns_marker.png" alt="marker"></div>
													<div class="snsDateBox mt10"><span>2020-04-05 10:35:28</span></div>
													<div class="snsConfText">
														<span>[강원권 공사] 국도7호선 고성 상리교차로 부근 ○ 일시: 04월 05일 10:22 ~ ○ 위치: 고상군 간성읍 신안리 308-3 고성 상리교차로 부근 (고성방향) ○ 내용: 2차로 차단 … https://t.co/G0cIPu2bkw</span>
													</div>
												</div>
											</div>
										</div> -->
										</div>
									</div>
								</div>
							</div>
						</div>
						<!-- //.snsContainer -->

						<div class="corLikeContainer reset">
							<div class="corLikeListBox">
								<div class="likeTitleBox">
									<div class="inline alignLeft"><span id="content3Tot">나의 관심공사</span></div>
									<div class="inline"><img src="/assets/images/mobile/button/icon_sns_arrow.png" class="corLikeArrow"></div>
								</div>
								
								<div class="corInfoBoxList">
								<div class="corList">
											<!-- <div class="corListBox listEmptyBox">
												<img src="images/icon/icon_excl.png" alt="exclamation">
												<p class="mt20">등록된 관심공사가 없습니다.</p>
											</div> -->
											<div class="mcorInfoList">
											</div>
								</div>
							</div>
						</div>
					</div>
					<!-- //.corLikeContainer -->
					<div class="areaLikeContainer reset">
							<div class="areaLikeListBox">
								<div class="likeTitleBox">
									<div class="inline alignLeft"><span>관심지역설정</span></div>
									<div class="inline"><img src="/assets/images/mobile/button/icon_sns_arrow.png" class="areaLikeArrow"></div>
								</div>
								<div class="setAreaInfoBox">
									<div class="areaTitle">
										<p>등록된 관심지역 입니다.</p>
										<p>관심지역명을 선택하시면 해당 지역으로 지도가 이동됩니다.</p>
										<p>관심지역은 최대 10개까지 지정할 수 있습니다.</p>
									</div>
									<div class="areaLikeList">
										<table>
											<colgroup>
												<col width="" />
												<col width="" />
												<col width="" />
											</colgroup>
											<thead id="corBookMarkThead">
												<tr>
													<th>No.</th>
													<th>관심지역 명</th>
													<th><input type="checkbox" id="likChkAll" name="likChkAll"><label for="likChkAll"></label></th>
												</tr>
											</thead>
											<tbody id="corBookMarkTbody">
												<!-- <tr>
													<td colspan="3">
														<div class="listEmptyBox">
															<img src="/assets/images/mobile/icon/icon_excl.png" alt="exclamation">
															<p class="mt20">등록된 관심지역 명이 없습니다.</p>
														</div>
													</td>
												</tr> -->
												<!-- <tr>
													<td>10</td>
													<td>한국도로공사 고속국도 상수-영덕간</td>
													<td><input type="checkbox" id="areaLikChk1" name="areaLikChk"><label for="areaLikChk1"></label></td>
												</tr>
												<tr>
													<td>10</td>
													<td>한국도로공사 고속국도 상수-영덕간</td>
													<td><input type="checkbox" id="areaLikChk2" name="areaLikChk"><label for="areaLikChk2"></label></td>
												</tr>
												<tr>
													<td>10</td>
													<td>한국도로공사 고속국도 상수-영덕간</td>
													<td><input type="checkbox" id="areaLikChk3" name="areaLikChk"><label for="areaLikChk3"></label></td>
												</tr>
												<tr>
													<td>10</td>
													<td>한국도로공사 고속국도 상수-영덕간</td>
													<td><input type="checkbox" id="areaLikChk4" name="areaLikChk"><label for="areaLikChk4"></label></td>
												</tr> -->
											</tbody>
										</table>
									</div>
									<div class="releaseBtnBox mt10"><button onclick="MapData.myAreaDel('sel'); return false;">선택 삭제</button></div>
									<div class="mInfoBox">
										<div class="areaTitle">
											<p>관심지역 저장</p>
											<p>현재 지도화면의 위치가 지정한 명칭으로 저장됩니다.</p>
										</div>
										<div class="areaLikeTextBox"><input type="text" name="" placeholder="관심지역 명을 입력해주세요" id="myAreaText" name="myAreaText" maxlength="100"></div>
									</div>
									<div class="areaBtnBox mt15">
										<button class="likeSaveBtn" onclick="MapData.myAreaSave(); return false;">저장</button>
										<button onclick="MapData.myAreaDel(); return false;">전체 삭제</button>
									</div>
								</div>
							</div>
						</div>
						<!-- //.areaLikeContainer -->
				</div>

				<div class="wrapper"></div>

				<div class="pinPointBox reset">
					<div class="pointBox point1"><img src="/assets/images/mobile/icon/icon_pinpointer.png" alt="point"></div>
					<div class="pointBox point2"><img src="/assets/images/mobile/icon/icon_pinpointer.png" alt="point"></div>
					<div class="pointBox point3"><img src="/assets/images/mobile/icon/icon_pinpointer.png" alt="point"></div>
					<div class="pointBox point4"><img src="/assets/images/mobile/icon/icon_pinpointer.png" alt="point"></div>
					<div class="pointBox point5"><img src="/assets/images/mobile/icon/icon_pinpointer.png" alt="point"></div>
					<div class="pointBox point6"><img src="/assets/images/mobile/icon/icon_pinpointer.png" alt="point"></div>
					<div class="pointBox point7"><img src="/assets/images/mobile/icon/icon_pinpointer.png" alt="point"></div>
				</div>

				<div class="snsPinPoint reset"><img src="/assets/images/mobile/icon/icon_sns_marker.png" alt="marker" width="30px"></div>

				<div class="pointTip reset">
					<span>선택한 개소명</span>
				</div>

				<div class="setMapBox reset">
					<div class="setMap">
						<div class="mapImgBox">
							<div class="setMapTitle"><span>지도설정</span></div>
							<div class="inline setMapBg">
								<div class="mapImgBg setMapBg1" id="base">
								</div>
								<span>일반</span>
							</div>
							<div class="inline setMapBg">
								<div class="mapImgBg setMapBg2" id="gray"><div class="mapActBox"><div><img src="/assets/images/mobile/icon/icon_check.png" alt="check"></div></div></div>
								<span>흑백</span>
							</div>
							<div class="inline setMapBg mr0">
								<div class="mapImgBg setMapBg3" id="satellite"></div>
								<span>위성</span>
							</div>
						</div>
					</div>
				</div>

				<div class="likeCorBox">
					<div class="emptyTbl">
						<div class="emptyCell">
							<div class="emptyConf">
								<img src="/assets/images/mobile/icon/icon_excl.png" alt="exclamation">
								<!-- <p>등록된 관심공사가 없습니다.</p> -->
								<p>로그인 후 이용할 수 있습니다.</p>
							</div>
						</div>
					</div>
				</div>

				<div class="likeAreaBox">
					<div class="emptyTbl">
						<div class="emptyCell">
							<div class="emptyConf">
								<img src="/assets/images/mobile/icon/icon_excl.png" alt="exclamation">
								<!-- <p>등록된 관심지역이 없습니다.</p> -->
								<p>로그인 후 이용할 수 있습니다.</p>
							</div>
						</div>
					</div>
				</div>

				<div class="popupWrap analy">
					<div class="popupBox">
						<div class="popup">
							<div class="popupTitle">
								<span>공고/분석내용</span>
								<img src="/assets/images/mobile/button/wCloseBtn.png" alt="closeButton" class="popupClose">
							</div>
							<div class="popupContents analyConf">
							<form id="detailForm" name="detailForm" method="post"> 
								<div class="">
									<div class="corDtlBoxTopLeft">
										<!-- <div class="rsAreaBox inline mr10" id="corDtlBoxTopLeft"><span>서울 특별시</span><span>단가</span></div>
										<div class="rsDotBox inline"><span class="active"></span><span></span><span></span></div> -->
									</div>
									<div class="btmAddress mt5">
										<p name='bidntcenm'></p>
										<p name='cnstrtsitergnnm'></p>
									</div>
								</div>
								<div class="popCorDtlBox mt10">
									<div class="popCorInfo">
										<div class="infoTitle grayBC"><span>공고내용</span></div>
										<table>
											<colgroup>
												<col width="30%" />
												<col width="" />
											</colgroup>
											<tr>
												<th>입찰공고번호</th>
												<td><input type="text" name="bidntceno" value="" readonly="readonly" style="width:100%;"></td>
											</tr>
											<tr>
												<th>입찰공고차수</th>
												<td><input type="text" name="bidntceord" readonly="readonly" style="width:100%;"></td>
											</tr>
											<tr>
												<th>등록유형명</th>
												<td><input type="text" name="bidmethdnm" readonly="readonly" style="width:100%;"></td>
											</tr>
											<tr>
												<th>공고종류</th>
												<td><input type="text" name="ntcekindnm" readonly="readonly" style="width:100%;"></td>
											</tr>
											<tr>
												<th>입찰공고일시</th>
												<td><input type="text" name="bidntcedt" readonly="readonly" style="width:100%;"></td>
											</tr>
											<tr>
												<th>수요기관코드</th>
												<td><input type="text" name="dminsttcd" readonly="readonly" style="width:100%;"></td>
											</tr>
											<tr>
												<th>예산금액</th>
												<td><input type="text" name="bdgtamt" readonly="readonly" style="width:100%;"></td>
											</tr>
										</table>
									</div>
									<div class="popCorInfo mt10">
										<div class="infoTitle greenBC"><span>분석내용</span></div>
										<table>
											<colgroup>
												<col width="30%" />
												<col width="" />
											</colgroup>
											<tr>
												<th>검색키워드</th>
												<td><input type="text" name="search_word" readonly="readonly" style="width:100%;"></td>
											</tr>
											<tr>
												<th>분석일시</th>
												<td><input type="text" name="analysis_dt" readonly="readonly" style="width:100%;"></td>
											</tr>
											<tr>
												<th>예상공사시작시기</th>
												<td><input type="text" name="forecast_st_dt" readonly="readonly" style="width:100%;"></td>
											</tr>
											<tr>
												<th>예상공사완료시기</th>
												<td><input type="text" name="forecast_end_dt" readonly="readonly" style="width:100%;"></td>
											</tr>
											<tr>
												<th>도로종류</th>
												<td><input type="text" name="const_road_nm" readonly="readonly" style="width:100%;"></td>
											</tr>
											<tr>
												<th>시도코드</th>
												<td><input type="text" name="sido_cd" readonly="readonly" style="width:100%;"></td>
											</tr>
											<tr>
												<th>시군구코드</th>
												<td><input type="text" name="sgg_cd" readonly="readonly" style="width:100%;"></td>
											</tr>
											<tr>
												<th>읍면동코드</th>
												<td><input type="text" name="emd_cd" readonly="readonly" style="width:100%;"></td>
											</tr>
											<tr>
												<th>인근도로멸실<br/>여부</th>
												<td><input type="text" name="road_loss_yn" readonly="readonly" style="width:100%;" value="해당없음"></td>
											</tr>
										</table>
									</div>
								</div></form>
							</div>
						</div>
					</div>
				</div>
				<!-- //.analy -->

				<div class="popupWrap place">
					<div class="popupBox">
						<div class="popup">
							<div class="popupTitle">
								<span>공사예측위치</span>
								<img src="/assets/images/mobile/button/wCloseBtn.png" alt="closeButton" class="popupClose">
							</div>
							<div class="popupContents placeConf">
								<div class="">
									<div class="corDtlBoxTopLeft">
										<!-- <div class="rsAreaBox inline mr10" id="corDtlBoxTopLeft"><span>서울 특별시</span><span>단가</span></div>
										<div class="rsDotBox inline"><span class="active"></span><span></span><span></span></div> -->
									</div>
									<div class="btmAddress mt5">
										<p name="bidntcenm"></p>
										<p name="cnstrtsitergnnm"></p>
									</div>
								</div>
								<div class="popupLocBox">
									<ul id="refInfoUl">
									</ul>
								</div>
								<!-- <div class="popupBtnBox mt10">
									<button class="btnGreen">전체 위치 보기</button>
									<button class="btnGray">선택 위치 보기</button>
								</div> -->
							</div>
						</div>
					</div>
				</div>
				<!-- //.place -->

				<div class="popupWrap fac">
					<div class="popupBox">
						<div class="popup">
							<div class="popupTitle">
								<span>공사/시설 종류</span>
								<img src="/assets/images/mobile/button/wCloseBtn.png" alt="closeButton" class="popupClose">
							</div>
							<div class="popupContents facConf">
								<div class="">
									<div class="corDtlBoxTopLeft">>
										<!-- <div class="rsAreaBox inline mr10"><span>서울 특별시</span><span>단가</span></div>
										<div class="rsDotBox inline"><span class="active"></span><span></span><span></span></div> -->
									</div>
									<div class="btmAddress mt5">
										<p name="bidntcenm"></p>
										<p name="cnstrtsitergnnm"></p>
									</div>
								</div>
								<div class="popCorDtlBox mt10">
									<div class="popFacInfo">
										<div class="infoTitle grayBC"><span>공사종류</span></div>
										<div class="facTbl mt10" id="constDiv">
										</div>
									</div>
									<div class="popFacInfo mt20">
										<div class="infoTitle grayBC"><span>시설종류</span></div>
										<div class="facTbl mt10" id="facDiv">
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- //.fac -->
			</div>
			<!-- //.contentsBox -->
		</div>
		<!-- //.containerWrap -->
		<input type="hidden" id="userSeq" name="userSeq" value="${userInfo.user_seq}" >
        <input type="hidden" id="userId" name="userId" value="${userInfo.user_id}" >
        <input type="hidden" id="authNo" name="authNo" value="${userInfo.auth_no}" >

		<script>
			$.selPeriod('3month','startDate','endDate');
        
			$("#startDate").datepicker({
				 changeYear:true,
				 changeMonth:true,
				 format: "yyyy.mm.dd",
				 language: "kr"
			});
			
			$("#endDate").datepicker({
				 changeYear:true,
				 changeMonth:true,
				 format: "yyyy.mm.dd",
				 language: "kr"
			});
			
			/* $.selPeriod('3month','snsStartDt','snsEndDt');
	        
	        $("#snsStartDt").datepicker({
				 changeYear:true,
				 changeMonth:true,
				 format: "yyyy.mm.dd",
		         language: "kr"
		     });
			 
			 $("#snsEndDt").datepicker({
				 changeYear:true,
				 changeMonth:true,
				 format: "yyyy.mm.dd",
		         language: "kr"
		     }); */
			
			$(".iconCalender").click(function(){
				var target = $(this).attr('target');
				$('#' + target).datepicker().focus();
			})
			
			
			
			//지도
        var mapInit = new MapInit('rcicMap',{ 
            baseMap:'VWorld',   
            baseMapVislble : true, 
            mapUrl : '${mapUrl}'+'/', 
            interactions:{    
                shiftDragZoom : true,  
                dragPan: true,
                mouseWheelZoom : true
            },
            mapControl : {  
                elem : "ul.mapCtr_wrap>li span",
                flag : "class",
                arrHandle : ["btn_distanceMeasure", "btn_areaMeasure", "btn_circle", "btn_reset" , "btn_merge"]
            },        
            minZoom:1,       
            maxZoom:13, 
            zoom:1,                           
            center:[14229869.092020644, 4324026.9759789],
            roadModal : "#modal-controller-1",
        });
          
		mapInit.mapEvtMng.onMapEvt(); 
        var _search = new Search({
			target:'tb_analysis_loc_info',
		});
        
        // 검색
    	var search = new SearchMng({});
        
        //레이어 추가 
        mapInit.mapLayerMng.addRcicLayers();
        mapInit.mapLayerMng.setTempLayer();
        //클러스터 레이어 추가
        ///mapInit.mapLayerMng.setClusterLayer("clusterLyr",null);
        
        mapInit.setControl(); 
     
        var infoWindowPopUpElem = document.getElementById('infoWindowPopUp');
		var infowindowOverLay = new ol.Overlay({
		    positioning: 'top-left',
		    offset: [20, -50],
		    element: infoWindowPopUpElem,
		    stopEvent: true,
		    id:"infoWindowPopUp"
		});
		
		 mapInit.map.addOverlay(infowindowOverLay);
        
        $.setMapControlEvt();
        $.setMapOperatorEvt();
        
        var _commonSearch = new CommonSearch({});
        var _calrendar = new Calrendar({});
        var _viewMainEvent = new ViewMainEvent({});
        
       
        var _accInfo = new AccInfo({});
        
        $.setBaseMapEvt({
            baseMapElem : "#baseMap", 
            baseMapLayerElem : "#baseMapLayer",
        });
        
        MapData.setSearchEvt();
        MapData.getSnsAccount();
		MapData.getMapSnsList();
		if(!$.isNullString($("#userId").val())){
			
			MapData.getMapUserMyRoadwork();
			MapData.myAreaList();
		}
		
        
       /*  MapData.setSearchEvt();
        MapData.myAreaTopList(); */
         
       /*  MapData.getMapSnsList();
        MapData.getSnsAccount();
        MapData.getMapUserMyRoadwork(); */
		
		    var swiper1 = new Swiper('.corInfoBox', {
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			});

		    var swiper2 = new Swiper('.snsInfoBox', {
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			});

		   /*  var swiper3 = new Swiper('.corLikeInfoBox', {
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			}); */


			/* 현황 슬라이드 클릭 */
			$(".countSliderBox li").on("click", function(){
				$(".reset").hide();

				var color = $(this).attr("data-color");
				var src   = "/assets/images/mobile/icon/icon_circle_"+color+".png";
				
				var layer = mapInit.mapLayerMng.getLayerById('analysisDetailLayer');
				mapInit.map.removeLayer(layer);
				
				if($(this).hasClass("active")){ 
					$(this).removeClass("active"); 
					//$(".mapMarkerBox").hide(); 
					
					mapInit.mapLayerMng.removeTempLayer('pointLyr');
					mapInit.mapLayerMng.removeTempLayer('clusterLyr');
					mapInit.mapLayerMng.layers.wfs["sido"].setVisible(false);
					mapInit.mapLayerMng.layers.wfs["sgg"].setVisible(false);
					mapInit.mapTheme.setToolbarActive();
					//mapInit.mapTheme.offMapEvt();
					$("#mapLegend").css("display","none");
					MapData.setSearchEvt();
					
					return false; 
				}
				$(".countSliderBox li").removeClass("active");
				$(this).addClass("active");
				$(".iconCircle").attr("src", src);
				//$(".mapMarkerBox").show();
				
				mapInit.mapAction.reSizeZoomBar();
				mapInit.mapTheme.setToolbarActive(); 
				//mapInit.mapTheme.offMapEvt();
				mapInit.mapTheme.onMapEvt();
				MapData.setSearchEvt();
				
				
			});

			$(".mapMarkerBox").on("click", function(){
				$(".slideContainer").css("bottom", "65px");
				$(".slideContainer").show();
			});

			/* 검색 아이콘 클릭 */
			$(".iconSearchBox").on("click", function(){
				$(".latelyBox").hide();
				$(".searchListBox").show();
			});

			$(".hamburger").on("click", function(){
				$('.contentsBox').css('height','0%');
				if($(this).hasClass("open")){
					$(".countSliderBox").css("z-index", "10");
					$(".mapMarkerBox").css("z-index", "10");
					$(".searchBox").css("z-index", "2");
					$(".bookMarkBox").hide();
					$(".searchMidBox").hide();
					$(this).removeClass("open");
					$(".wrapper").removeClass("active");
					return false;
				}

				$("body").css("overflow", "hidden");
		    	$(".mNavWrap").show(); $(".mNavBox").animate({left:"0"}, 200);
		    	

				//$(this).addClass("open");
			});

			var keyword = $('.keyword');
			keyword.focus(function(){
				MapData.setSearchEvt();
				if(!$.isNullString($("#userId").val())){
			    	MapData.myAreaTopList();
				}
				$(".searchBox").css("z-index", "11");
				$(".countSliderBox").css("z-index", "2");
				$(".mapMarkerBox").css("z-index", "2");
				$(".wrapper").addClass("active");
				$(".hamburger").addClass("open");
				$(".bookMarkBox").fadeIn(500);
				$(".searchMidBox").fadeIn(500);
				$('.contentsBox').css('height','100%');
				
			});


			// 기간설정 화살표 클릭
			$(".iconArrowDn").on("click", function(){
				if($(this).hasClass("active")){ $(this).removeClass("active"); $(".dateBoxConf").slideUp("fast"); return false; }

				$(this).addClass("active");
				$(".dateBoxConf").slideDown("fast");
			});


			// 슬라이드 팝업 공사개소정보 클릭
			$(".corEstateInfo").on("click", function(){
				$(".mapMarkerBox").hide();
				$(".pinPointBox").show();
			});

			// 핀포인트 클릭시
			$(".pointBox").on("click", function(){
				alert("pointBox")
				if($(this).hasClass("active")){ $(this).removeClass("active"); $(".pointTip").hide(); return false; }

				var top  = $(this).offset().top - 35;
				var left = $(this).offset().left - 25;
				$(".pointTip").css("left", left).css("top", top).show();

				$(".pointBox").removeClass("active");
				$(this).addClass("active");
			});

			// 지도설정 아이콘 선택
			$(".iconMapBox").on("click", function(){
				$(".setMapBox").css("display", "table");
			});

			// 지도설정 지도 선택(일반, 흑백, 위성)
			$(".mapImgBg").on("click", function(){
				mapInit.mapAction.offBaseMapLayers();
				if($(this).attr('id') == "satellite"){
					mapInit.mapAction.setVisibilityById("VWorld_" + $(this).attr('id'));
					mapInit.mapAction.setVisibilityById("VWorld_hybrid");
				}else{
					
					mapInit.mapAction.setVisibilityById("VWorld_" + $(this).attr('id'));
				}
				$(".mapActBox").remove();
				$("#"+$(this).attr("id")).html('<div class="mapActBox"><div><img src="/assets/images/mobile/icon/icon_check.png" alt="check"></div></div>')
				
				$(".setMapBox").css("display", "none");
			});

			// sns 화살표 클릭
			$(".snsArrow").on("click", function(){
				$(".snsContainer").removeAttr("style");

				if($(this).hasClass("open")){
					$(".snsContainer").css("top", 'calc(100% - 107px)').show();
					$(this).removeClass("open"); return false;
				}

				$(".snsContainer").css("bottom", '65px').show(); 
				$(this).addClass("open");
			});

			$(".snsConfMarker").on("click", function(){
				$(".snsPinPoint").show(); $(".snsArrow").removeClass("open");
				$(".snsContainer").removeAttr("style")
				$(".snsContainer").css("top", 'calc(100% - 107px)').show();
			});

			// 빈 관심공사 클릭
			$(".likeCorBox").on("click", function(){
				$(this).hide();
			});

			// 빈 관심지역 클릭
			$(".likeAreaBox").on("click", function(){
				$(this).hide();
			});

			// 관심공사 펼치기
			$(".corLikeArrow").on("click", function(){
				$(".corLikeContainer").removeAttr("style");

				if($(this).hasClass("open")){
					$(".corLikeContainer").css("top", 'calc(100% - 107px)').show();
					$(this).removeClass("open"); return false;
				}

				$(".corLikeContainer").css("bottom", '65px').show(); 
				$(this).addClass("open");
			});

			// 관심지역 최소화
			$(".areaLikeArrow").on("click", function(){
				$(".areaLikeContainer").removeAttr("style");

				if($(this).hasClass("open")){
					$(".areaLikeContainer").css("top", 'calc(100% - 107px)').show(); 
					$(this).removeClass("open");
					return false;
				}

				$(".areaLikeContainer").css("bottom", '65px').show(); 
				$(this).addClass("open");
			});

			// nav닫기 버튼 클릭
		    $(".navClose").on("click", function(){
				$(".mNavBox").animate({
					left:"-80%"},
					{ duration: 200, complete: function () {
						$(".mNavWrap").hide();
					}
				});
				$("body").css("overflow", "auto");
		    });

		    // 팝업 닫기
		    $(".popupClose").on("click", function(){
		    	$(".popupWrap").hide();
		    });

		    //체크박스 전체선택 
		    $("#likChkAll").on("click", function(){
				if($("#likChkAll").is(":checked")) {
					$("input[name=areaLikChk]").prop("checked",true);
				}else{
					$("input[name=areaLikChk]").prop("checked",false);
				}
		    });

			function btmMenu(index)
			{
				$(".reset").hide();

				if(index == 1){
					MapData.setSearchEvt();
					
					if(!$.isNullString($("#userId").val())){
				    	MapData.myAreaTopList();
					}
					$(".searchBox").css("z-index", "11");
					$(".countSliderBox").css("z-index", "2");
					$(".mapMarkerBox").css("z-index", "2");
					$(".wrapper").addClass("active");
					$(".hamburger").addClass("open");
					$(".bookMarkBox").fadeIn(500);
					$(".searchMidBox").fadeIn(500);
					$('.contentsBox').css('height','100%');
				}else if(index == 2){
				
					
					$(".snsContainer").show();
					var bh  = $("body").outerHeight() - 346; // 65 search, 42 likeTitleBox, 51 corListTop, 65 footer 고정 레이어의 크기를 제외한 크기
					var ch  = $(".btmSnsSlideBox").height() * $(".snsList .btmSnsSlideBox").length;
					if(ch > bh){ $(".snsList").css("height", bh+"px"); }
					else{ $(".snsList").css("height", "auto"); }

					$(".snsContainer").removeAttr("style");
					$(".snsContainer").css("bottom", "65px");
					$(".snsArrow").addClass("open");
					MapData.getSnsAccount();
					MapData.getMapSnsList();
					
					/* $(".snsContainer").show();

					$(".snsArrow").addClass("open");
					$(".snsInfoBox").hide();
					//$(".snsDataListBox").show();
					$(".snsContainer").removeAttr("style")
					$(".snsContainer").css("bottom", "65px");

					$(".snsArrow").addClass("open");
					
					MapData.getSnsAccount();
					MapData.getMapSnsList(); */
					
					
				}else if(index == 3){
					/* // 관심공사가 없는경우
					//$(".likeCorBox").show();
					if($.isNullString($("#userId").val())){
						$(".likeAreaBox").show();
						return false;
					}

					// 관심공사가 있는 경우
					$(".corLikeContainer").show();
					
					$(".corLikeArrow").addClass("open");
					$(".corLikeInfoBox").hide();
					$(".corInfoBoxList").show();
					$(".corLikeContainer").css("bottom", "65px"); */
					
					
					// 관심공사가 없는경우
					if($.isNullString($("#userId").val())){
						$(".likeAreaBox").show();
						return false;
					}


					// 관심공사가 있는 경우
					
					$(".corLikeContainer").show();
					var bh  = $("body").outerHeight() - 223; // 65 search, 42 likeTitleBox, 51 corListTop, 65 footer 고정 레이어의 크기를 제외한 크기
					var ch  = $(".corListBox").height() * $(".corListBox").length;
					
					if(ch > bh){ $(".corList").css("height", bh+"px"); }
					else{ $(".corList").css("height", "auto"); }

					$(".corLikeContainer").removeAttr("style");
					$(".corLikeContainer").css("bottom", "65px");
					$(".corLikeArrow").addClass("open");
					
					MapData.getMapUserMyRoadwork();
				}else{
					// 관심지역이 없는경우
					if($.isNullString($("#userId").val())){
						$(".likeAreaBox").show();
						return false;
					}

					// 관심지역이 있는경우
				/* 	$(".areaLikeContainer").css("bottom", "65px");
					$(".areaLikeContainer").show();
					$(".areaLikeArrow").addClass("open"); */
					
					$(".areaLikeContainer").removeAttr("style");
					$(".areaLikeContainer").css("bottom", "65px");
					$(".areaLikeContainer").show();
					$(".areaLikeArrow").addClass("open");
					MapData.myAreaList();
					
				}
			}
			
			
			$(".snsList").scroll(function(){   //스크롤이 최하단 으로 내려가면 리스트를 조회하고 page를 증가시킨다.
			     if($(".snsList").scrollTop() >= $('.msnsList').height()- $(".snsList").height()){
			    	   G.contents2CurrPage++;
			    	   MapData.getMapSnsList(G.contents2CurrPage); 
			     } 
			});
			
			$(".corList").scroll(function(){   //스크롤이 최하단 으로 내려가면 리스트를 조회하고 page를 증가시킨다.
			     if($(".corList").scrollTop() >= $('.mcorInfoList').height()- $(".corList").height()){
			    	   G.contents3CurrPage++;
			    	   MapData.getMapUserMyRoadwork(G.contents3CurrPage); 
			     } 
			});
			
			$("#snsAccount").on("change" , function (){
				
				MapData.getMapSnsList();
			});
			
			
		</script>
	</body>
</html>