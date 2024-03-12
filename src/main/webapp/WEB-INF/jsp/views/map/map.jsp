<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="org.springframework.security.core.Authentication"%>
<%@page import="org.springframework.security.core.context.SecurityContextHolder"%> 
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@page import="org.springframework.security.core.Authentication"%>
<%@page import="org.springframework.security.core.context.SecurityContextHolder"%>
<%@page import="java.net.URLEncoder"%>
<%@page import="java.net.URLDecoder"%>
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
<html lang="ko" class="mapHtml">
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
        <link rel="shortcut icon" type="image/x-icon" href="/assets/images/favicon/favicon.ico">
        <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
		<meta http-equiv="Pragma" content="no-cache" />
		<meta http-equiv="Expires" content="0" />
		<!-- <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"> -->
        <!-- meta -->

        <!-- Open Graph -->
        <meta property="og:title"       content="도로명수집시스템" />
        <meta property="og:type"        content="website" />
        <meta property="og:image"       content="" />
        <meta property="og:site_name"   content="도로명수집시스템" />
        <meta property="og:url"         content="" />
        <meta property="og:description" content="" /> 
        <!-- Open Graph -->
     
        <title>도로 변경정보 수집시스템</title>
        
        
	 <jsp:include page="/WEB-INF/jsp/views/include/htmlHead.jsp"></jsp:include>
        <%-- <jsp:include page="/WEB-INF/jsp/views/include/htmlHead.jsp"></jsp:include> --%>
		<link href="/assets/css/ol.css" type="text/css" rel="stylesheet" media="all">
		<link href="/assets/css/map.css" type="text/css" rel="stylesheet" media="all">

        <!-- js -->  
        <script type='text/javascript' src='/assets/js/common/lib/jquery/jquery-3.5.1.min.js'></script>
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
        <script type="text/javascript" src="/assets/js/module/map/SetUI.js"></script>
		<script type="text/javascript" src="/assets/js/module/map/init/MapAction.js"></script>
		<script type="text/javascript" src="/assets/js/module/map/init/MapEventMng.js"></script>    
		<script type="text/javascript" src="/assets/js/module/map/init/MapLayerMng.js"></script>
		<script type="text/javascript" src="/assets/js/module/map/init/MapTheme.js"></script>
		<script type="text/javascript" src="/assets/js/module/map/init/MapInit.js"></script>
		<script type="text/javascript" src="/assets/js/module/map/init/MapRcicMng.js"></script>
		<script type="text/javascript" src="/assets/js/module/map/init/MapArea.js"></script>
        <script type="text/javascript" src="/assets/js/module/map/Search.js"></script>
        
        
        
        <script type="text/javascript" src="/assets/js/module/cmmn/CommonSearch.js"></script>
        <script type="text/javascript" src="/assets/js/common/util/commonUtil.js"></script>
        <script type='text/javascript' src='/assets/js/common/commonN.js'></script>
        <script type='text/javascript' src='/assets/js/module/calrendar/Calrendar.js'></script>
        
        <script type="text/javascript" src="/assets/js/module/search/SearchConfig.js"></script>
	    <script type="text/javascript" src="/assets/js/module/search/SearchMng.js"></script>
	    <script type="text/javascript" src="/assets/js/module/map/AccInfo.js"></script>
	    <script type="text/javascript" src="/assets/js/module/map/MapData.js"></script>
	    <script type="text/javascript" src="/assets/js/module/map/ToolBarCnt.js"></script>
	    
	    <script type="text/javascript" src="/assets/js/module/map/ViewMainEvent.js"></script>
	    
	    <script type='text/javascript' src="/assets/js/module/corporation/corporation.js"></script>   
	    <script type="text/javascript" src="/assets/js/module/map/init/MapGeoStats.js"></script>
	    <script type="text/javascript" src="/assets/js/module/map/MapMove.js"></script>
	    
	    <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapApiKey}"></script>
         
    </head>
    <body>	
		<div class="containerWrap">
			<div class="mapWrap">
				<div class="mapNavBox">
                    <div class="mapSLBox">
						<div class="navLeftTop">
							<div class="navTop">
								<div class="inline"><a href="/rcic/public_main"><img src="/assets/images/map/map_rcicLogo.png" alt="logo"></a></div>
								<!-- <div class="inline">
									<input type="button" value="로그인" class="mapLoginBtn">
									<input type="button" value="로그아웃" class="mapLogOutBtn">
								</div> -->
							</div>
							<div class="navLeftTab">
								<div class="inline">
									<span class="active" data-index="1">관리청</span>
								</div>
								<div class="inline">
                                    <span data-index="4">비관리청</span>
                                </div>
								<c:if test="${userInfo.auth_no == '1' }">
                                   <div class="inline">
                                       <span data-index="2">SNS</span>
                                   </div>
								</c:if>

								<%  if(!userName.equals("anonymousUser")){%>
                                <div class="inline">
                                    <span data-index="3">관심공사</span>
                                </div>

								<%} %>


							</div>
						</div><!-- navLeftTop -->
						<!-- //.navLeftTop -->
						<div class="conditionBox">
							<div class="conList">
								<div id="contents1" class="contents">
									<div class="listTop">
										<div class="mSearchForm">
											<div class="mSearch">
												<input type="text" name="mSearchText" id="mSearchText" placeholder="공사명 또는 지역명을 입력하세요."  onkeypress="if(event.which == 13){MapData.setSearchEvt()}">
                                            	<img src="/assets/images/icon/icon_search.png" alt="search" onclick="MapData.setSearchEvt();">
											</div>
											<div class="optionBox mt15">
												<div class="inline radioBox">
													<input type="radio" name="dRadio" id="dRadio1" value="bidntcedt" checked="true"><label for="dRadio1" class="mr10" >공고일</label>
													<input type="radio" name="dRadio" id="dRadio2" value="stdr_dt"><label for="dRadio2">예상공사기간</label>
													<%--
													<input type="radio" name="dRadio" id="dRadio3" value="cbgnDate"><label for="dRadio3">계약공사기간</label>
													--%>
 												</div>
												<div class="inline refreshBox" onclick="MapData.setSearchEvtRefresh();">
													<img src="/assets/images/popup/refresh.png" alt="refresh" class="mr5">
													<span class="refreshTxt">초기화</span>
												</div>
											</div>
											<div class="dateBetweenBox mt15">
						                    <input type="hidden" id="startDate">
						                    <input type="hidden" id="endDate">
												<div class="inline mDateTxt"><span class="mr10">기간</span><input type="text" name="speriod" id="speriod" readonly="readonly"></div>
												<div class="inline mDateSet"><input type="button" value="기간설정" id="btn_calrendar" data-toggle="modal"></div>
											</div>
										</div>
										<div class="mLineBox"></div>
										<div class="mSearchResult">
											<div class="mRsCntBox"><span class="mRsTxt mr5">검색결과</span><span class="mRsCnt" id="content2Tot">(총 0 건)</span></div>
											<div class="inline" style="width: 37%;">
												<select id="prdtReliCombo" style="background-color: #ececec;border: 1px solid #C1C1C1;border-radius: 5px;height: 30px;color: #5a5a5a;font-size: 13px;letter-spacing: -0.25px;font-weight: 500;width: 95%;padding-left: 10px;" onchange="MapData.setSearchEvt();">
													<option value="">신뢰도 전체</option>
													<option value="3"selected>신뢰도 상</option>
													<option value="2">신뢰도 중</option>
													<c:if test="${userInfo.auth_no == '1' }">
													<!-- <option value="1">신뢰도 하</option> -->
													</c:if>
												</select>
											</div>
											<div class="mSelectBox mt10" style="display: none;">
												<div class="inline wid50">
													<select id="sidoAreaCombo">
														<option value="">지역 전체</option>
													</select>
												</div>
												<div class="inline wid50 alginRight">
													<select class="mFilter2" id="roadTyCombo">
														<option value="">공사 전체</option>
													</select>
												</div>
											</div>
										</div>
									</div>

									<div class="mResultList mRsList1">
										<div class="mapEmptyBox">
											<div class="mapEmptyImgBox"><img src="/assets/images/map/map_empty.png" alt="empty"></div>
											<div class="mapEmptyTxtBox mt20">
												<p id="mapEmptyRst" style="display: none;">검색 결과가 없습니다.</p>
												<p id="mapEmptyReset">데이터를 조회중입니다.</p>
											</div>
										</div>
										<ul name="contents1">
										</ul>
										<div class="mSnsMoreBox" id="content1Plus" style=""><p>더보기</p></div>
									</div>
								</div>
								<!-- //#contents1 -->

								<div id="contents2" class="contents">
									<div class="listTop">
										<div class="mRsCntBox">
											<span class="mRsTxt inline wid50 alginLeft">SNS 실시간 수집목록</span>
											<div class="inline wid50 refreshBox alginRight" onclick="MapData.getMapSnsListRefresh()">
												<img src="/assets/images/popup/refresh.png" alt="refresh" class="mr5">
												<span class="refreshTxt">초기화</span>
											</div>
										</div>
										<div class="mSearchForm mt10">
											<div class="mSearch">
												<input type="text" name="snsSearchText" id="snsSearchText" onkeypress="if(event.which == 13){MapData.getMapSnsList()}">
                                            	<img src="/assets/images/icon/icon_search.png" alt="search" onclick="MapData.getMapSnsList();">
											</div>
											<div class="dateBetweenBox mt15">
												<div class="snsDatePick inline"><input type="text" name="snsStartDt" id="snsStartDt"><i class="datepicker" target="snsStartDt"></i></div>
												<span class="wave">~</span>
												<div class="snsDatePick inline"><input type="text" name="snsEndDt" id="snsEndDt"><i class="datepicker" target="snsEndDt"></i></div>
											</div>
											<div class="quickDateBox mt10">
												<input type="button" value="1주일" onclick="$.selPeriod('week','snsStartDt','snsEndDt');return false;">
												<input type="button" value="1개월" onclick="$.selPeriod('1month','snsStartDt','snsEndDt');return false;">
												<input type="button" value="6개월" onclick="$.selPeriod('6month','snsStartDt','snsEndDt');return false;">
												<input type="button" value="1년" onclick="$.selPeriod('1year','snsStartDt','snsEndDt');return false;">
											</div>
										</div>
										<div class="mLineBox"></div>
										<div class="mSearchResult">
											<div class="mSelectBox mt15" id="snsAccountDiv" style="width: 100%;">
												<select class="wid100" id="snsAccount" onchange="MapData.getMapSnsList();">
													<option value = "">계정 전체</option>
												</select>
											</div>
										</div>
									</div>

									<div class="mResultList mRsList2">
										<ul name="contents2" id="content2Ul">
										</ul>
										<div class="mSnsMoreBox" id="content2Plus" style="display: none;"><p>SNS 더보기</p></div>
									</div>
								</div>
								<!-- //#contents2 -->

								<div id="contents3" class="contents">
									<div class="listTop">
										<div class="mSearchResult">
											<div class="mRsCntBox">
												<span class="mRsTxt mr5">검색결과</span><span class="mRsCnt" id="content3Tot">(총 0 건)</span>
												<span class="corTopSort">최신순<img src="/assets/images/icon/icon_sort.png" /></span>
											</div>
											<div class="mSelectBox mt10" style="display: none;">
												<div class="inline wid50">
													<select>
														<option>지역 전체</option>
													</select>
												</div>
												<div class="inline wid50 alginRight">
													<select class="mFilter2">
														<option>공사 전체</option>
													</select>
												</div>
											</div>
										</div>
									</div>

									<div class="mResultList mRsList3">
										<ul name="contents3" id="content3Ul">
										</ul>
										<div class="mCorMoreBox" id="content3Plus" style="display: none;"><p>관심공사 더보기</p></div>
									</div>
								</div>
								<!-- //#contents3 -->

								<div id="contents4" class="contents">
                                    <div class="listTop">
                                        <div class="mSearchForm">
                                            <div class="mSearch">

                                                <input type="text" name="mSearchTextBmng" id="mSearchTextBmng" placeholder="허가번호 또는 지역명을 입력하세요."  onkeypress="if(event.which == 13){MapData.setSearchEvtBmng()}">
                                                <img src="/assets/images/icon/icon_search.png" alt="search" onclick="MapData.setSearchEvtBmng();">
                                            </div>
                                            <div class="optionBox mt15">
                                                <div class="inline radioBox">
                                                    <input type="radio" name="dRadioBmng" id="dRadio1Bmng" value="prmsnDt" checked="true"><label for="dRadio1Bmng" class="mr10" >점용허가일</label>
                                                    <input type="radio" name="dRadioBmng" id="dRadio2Bmng" value="preDt"><label for="dRadio2Bmng">예상공사기간</label>
                                                    <%--
                                                    <input type="radio" name="dRadioBmng" id="dRadio3Bmng" value="cbgnDateBmng"><label for="dRadio3Bmng">계약공사기간</label>
                                                    --%>
                                                </div>
                                                <div class="inline refreshBox" onclick="MapData.setSearchEvtRefreshBmng();">
                                                    <img src="/assets/images/popup/refresh.png" alt="refresh" class="mr5">
                                                    <span class="refreshTxt">초기화</span>
                                                </div>
                                            </div>
                                            <div class="dateBetweenBox mt15">
                                                <input type="hidden" id="startDateBmng">
                                                <input type="hidden" id="endDateBmng">
                                                    <div class="inline mDateTxt"><span class="mr10">기간</span><input type="text" name="speriodBmng" id="speriodBmng"
                                                                                                                                                readonly="readonly"></div>
                                                    <div class="inline mDateSet"><input type="button" value="기간설정" id="btn_calrendarBmng" data-toggle="modal"></div>
                                            </div>
                                        </div>
                                        <div class="mLineBox"></div>
                                        <div class="mSearchResult">
                                            <div class="mRsCntBox"><span class="mRsTxt mr5">검색결과</span><span class="mRsCnt" id="content2TotBmng">(총 0 건)</span></div>
                                            <!--<div class="inline" style="width: 37%;">
                                                <select id="prdtReliComboBmng" style="background-color: #ececec;border: 1px solid #C1C1C1;border-radius: 5px;height: 30px;color: #5a5a5a;font-size: 13px;letter-spacing: -0.25px;font-weight: 500;width: 95%;padding-left: 10px;" onchange="MapData.setSearchEvtBmng();">
                                                    <option value="">신뢰도 전체</option>
                                                    <option value="3"selected>신뢰도 상</option>
                                                    <option value="2">신뢰도 중</option>
                                                    <c:if test="${userInfo.auth_no == '1' }">
                                                     <option value="1">신뢰도 하</option>
                                                    </c:if>
                                                </select>
                                                </div>-->
                                            <div class="mSelectBox mt10" style="display: none;">
                                                <div class="inline wid50">
                                                    <select id="sidoAreaComboBmng">
                                                        <option value="">지역 전체</option>
                                                    </select>
                                                </div>
                                                <div class="inline wid50 alginRight">
                                                    <select class="mFilter2" id="roadTyComboBmng">
                                                        <option value="">공사 전체</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="mResultList mRsList4">
                                        <div class="mapEmptyBox">
                                            <div class="mapEmptyImgBox"><img src="/assets/images/map/map_empty.png" alt="empty"></div>
                                            <div class="mapEmptyTxtBox mt20">
                                                <p id="mapEmptyRstBmng" style="display: none;">검색 결과가 없습니다.</p>
                                                <p id="mapEmptyResetBmng">데이터를 조회중입니다.</p>
                                            </div>
                                        </div>
                                        <ul name="contents4">
                                        </ul>
                                        <div onclick="MapData.setSearchEvtBmng(this)" class="mSnsMoreBox" id="content4Plus" style="">
                                                  <input type="hidden" id="pageNumBmngList" value='1'/>
                                                  <p>더보기</p>
                                        </div>
                                    </div>
                                </div>
                                <!-- //#contents4 -->
							</div>
						</div>
						<!-- //.conditionBox -->
						<div class="navOCBox">
							<img src="/assets/images/icon/mCloseIcon.png" alt="close">
						</div>
						<!-- //.navOCBox -->
					</div><!-- mapSLBox -->
				</div><!-- mapNavBox -->
				<!-- //.mapNavBox -->

				<div class="mapGridBox">
                    <div id="rcicMap"></div>
                    <div id="mapLegend" style="display: none;"></div>
                </div>
                <div class="customizing" id="swipeDiv" style="display: none">
					<input id="swipe" type="range">
				</div>
				<!-- //.mapGridBox -->
  
				<div class="mapControllBox">
					<div class="mInfoBox">
						<div class="mArea" onclick="_viewMainEvent.legalZoneSearch(); return false;">
							<input type="hidden" name="slegalCd" id="slegalCd" readonly="readonly"/>
							<span class="mAreaTit">지역 검색 : </span>
							<span id="sidoZone">서울특별시</span><span class="mDvision">></span>
							<span id="sggZone">강서구</span><span class="mDvision">></span>
							<span id="emdZone">마곡동</span>
							<span class="mapAngle addrBtnDown" style="display:visible"><img src="/assets/images/map/angle-down.svg" alt="angle-down"/></span>
							<span class="mapAngle addrBtnUp" style="display:none"><img src="/assets/images/map/angle-up.svg" alt="angle-up"/></span>
						</div>
						<div class="mCounter" data-level="2">
						    <div class="inline erection noPrmsnLayerCls" id="noPrmsnLayerBtn" data-color="pink" onclick="MapData.showNoPrmsnLayerListDiv(this)">
                                <div class=""><p>점용불허구간</p></div>

                            </div>
                            <div id='noPrmsnLayerListDiv' class="noPrmsnLayerList">

                                <!--<li id='rcic:carOnlyRoad5179' onclick="MapData.showWmsLayer(this)">-->
                                <div class="checkLayer" >
                                        <li ><label><input id='rcic:carOnlyRoad5179' type="checkbox"  onclick="MapData.showWmsLayer(this)" ><span>자동차전용도로</span></label></li>
                                        <li ><label><input id='rcic:bridge5179' type="checkbox"  onclick="MapData.showWmsLayer(this)"><span>교량시설물</span></label></li>
                                        <li ><label><input id='rcic:stopstand5179' type="checkbox"  onclick="MapData.showWmsLayer(this)"><span>정차대</span></label></li>
                                        <li ><label><input id='rcic:ternal5179' type="checkbox"  onclick="MapData.showWmsLayer(this)"><span>터널</span></label></li>
                                        <!--<li ><label><input id='rcic:resiFac5179' type="checkbox"  onclick="MapData.showWmsLayer(this)"><span>주민편의시설</span></label></li>-->
                                        <li ><label><input id='rcic:curRad5179' type="checkbox"  onclick="MapData.showWmsLayer(this)"><span>곡선반지름</span></label></li>
                                        <li ><label><input id='rcic:gulNoPrmsn5179' type="checkbox"  onclick="MapData.showWmsLayer(this)"><span>굴착불허구간</span></label></li>
                                        <li ><label><input id='rcic:intersection5179' type="checkbox"  onclick="MapData.showWmsLayer(this)"><span>교차로</span></label></li>
                                        <li ><label><input id='rcic:carBoundary5179' type="checkbox"  onclick="MapData.showWmsLayer(this)"><span>차도부경계</span></label></li>
                                        <li ><label><input id='rcic:roadBook5179' type="checkbox"  onclick="MapData.showWmsLayer(this)"><span>도로중심선</span></label></li>
                                        <li ><label><input id='rcic:longitudinal_slope5179' type="checkbox"  onclick="MapData.showWmsLayer(this)"><span>종단기울기</span></label></li>
                                        <li ><label><input id='rcic:tb_cbnd_info3857' type="checkbox"  onclick="MapData.showWmsLayer(this)"><span>지적경계</span></label></li>
                                        <!--<li ><label><input id='rcic:tb_legaldong_emd3857' type="checkbox"  onclick="MapData.showWmsLayer(this)"><span>읍면동</span></label></li>-->
                                </div>
                                </li>
                            </div>
							<div class="inline erection Indigo mr5 nIndex1" id="Indigo0" data-color="blue">
								<div class="inline wid50 alginLeft"><p>진행공사</p><p>건수</p></div>
								<div class="inline wid50 alginRight"><p id="toolbar1">000 건</p></div>
								<div class="erectionTip">
									<span>전체 공사수<br />(검색조건 기준)</span>
								</div>
							</div>  
							<div class="inline erection Indigo mr5 nIndex2" data-color="green">
								<div class="inline wid50 alginLeft"><p>국도공사</p><p>건수</p></div>
								<div class="inline wid50 alginRight"><p id="toolbar2">000 건</p></div>
								<div class="erectionTip">
									<span>입찰공고가 국도에 해당하는 것으로 분석된 공사 건수<br />(검색조건 기준)</span>
								</div>
							</div>
							<div class="inline erection Indigo mr5 nIndex3" data-color="yellow">
								<div class="inline wid50 alginLeft"><p>도로개설</p><p>건수</p></div>
								<div class="inline wid50 alginRight"><p id="toolbar3">000 건</p></div>
								<div class="erectionTip">
									<span>입찰공고가 도로개설에 해당하는 것으로 분석된 공사 건수<br />(검색조건 기준)</span>
								</div>
							</div>
							<div class="inline erection Indigo mr5 nIndex4" data-color="pink">
								<div class="inline wid50 alginLeft"><p>시설공사</p><p>건수</p></div>
								<div class="inline wid50 alginRight"><p id="toolbar4">000 건</p></div>
								<div class="erectionTip">
									<span>입찰공고가 도로시설의 공사에 해당하는 것으로 분석된 공사 건수<br />(검색조건 기준)</span>
								</div>
							</div>
							<div class="inline erection violet mr20 nIndex5" id="Indigo4" data-color="purple">
								<div class="inline wid50 alginLeft"><p>준공예정</p><p>(1개월 내)</p></div>
								<div class="inline wid50 alginRight"><p id="toolbar5">000 건</p></div>
								<div class="erectionTip">
									<span>현재일 기준으로 1개월 내에 준공예정인 공사건수<br />(현재일 기준)</span>
								</div>
							</div>

							<div class="inline erection mapKind">
								<span class="active" val="gray">흑백</span>
								<span val="satellite">위성</span>
								<span val="base">일반</span>
							</div>
						</div>
						<!-- //.mInfoBox -->

						<div class="datemodal dateRangeBox">
							<div class="dateSetTop">
								<div class="inline wid50 alginLeft"> 
									<span class="mr10">기간설정</span><img src="/assets/images/icon/excl_mark.png" alt="exclamation" class="exclMark">
								</div>
								<div class="inline wid50 alginRight">
									<img src="/assets/images/icon/icon_datepicker.png" alt="date" class="mr10">
									<span class="mr15" onclick="_calrendar.initDatepicker(); popupLayer('picker')">달력전환</span>
									<img src="/assets/images/icon/icon_close.png" alt="close" class="mCloseImg" data-popid="dateRangeBox">
								</div>
								<div class="exclTip"><p class="mt5">공사건수 조회는 2012년 부터</p><p>최대 1년 후까지 가능합니다.</p></div>
							</div>
							<div class="quickSetBox mt10">
								<div class="inline mr15 quickTxt"><span>빠른 기간 설정</span></div>
								<div class="inline">
									<ul class="prevDate">
										<li onclick="_calrendar.changeDate('pre',5,'year');"><span>- 5년 이전</span></li>
										<li onclick="_calrendar.changeDate('pre',4,'year');"><span>- 4년</span></li>
										<li onclick="_calrendar.changeDate('pre',3,'year');"><span>- 3년</span></li>
										<li onclick="_calrendar.changeDate('pre',2,'year');"><span>- 2년</span></li>
										<li onclick="_calrendar.changeDate('pre',1,'year');"><span>- 1년</span></li>
										<li onclick="_calrendar.changeDate('pre',6,'month');"><span>- 6개월</span></li>
										<li onclick="_calrendar.changeDate('pre',3,'month');"><span>- 3개월</span></li>
										<li onclick="_calrendar.changeDate('pre',1,'month');"><span>- 1개월</span></li>
									</ul>
								</div>
								<div class="inline quickWave"><span>~</span></div>
								<div class="inline">
									<ul class="nextDate">
										<li onclick="_calrendar.changeDate('aft',0,'day');"><span>오늘</span></li>
										<li onclick="_calrendar.changeDate('aft',1,'month');"><span>+ 1개월</span></li>
										<li onclick="_calrendar.changeDate('aft',3,'month');"><span>+ 3개월</span></li>
										<li onclick="_calrendar.changeDate('aft',6,'month');"><span>+ 6개월</span></li>
										<li onclick="_calrendar.changeDate('aft',1,'year');"><span>+ 1년</span></li>
									</ul>
								</div>
							</div>
							<div class="dateRange">
								<input type="text" class="js-range-slider" name="my_range" value=""/>
							</div>
							<div class="rangeBtnBox">
								<input type="button" value="검색하기" class="rSearchBtn mr10" name="completeSlider" onclick="_calrendar.complete(this);">
								<input type="button" value="취소" class="rCancleBtn" data-popid="dateRangeBox">
							</div>
						</div>
						<!-- //.dateRangeBox -->

						<div class="datemodal calrendarModal" id="doubleModal">
						    <div>
						        <div style="width: 675px;">
						        	<div class="dateSetTop">
										<div class="inline wid50 alginLeft">
											<span class="mr10">기간설정</span><img src="/assets/images/icon/excl_mark.png" alt="exclamation" class="exclMark">
										</div>
										<div class="inline wid50 alginRight">
											<img src="/assets/images/icon/icon_slice.png" alt="date" class="mr10">
											<span class="mr15" onclick="_calrendar.initSlider(); popupLayer('slide');">슬라이드전환</span>
											<img src="/assets/images/icon/icon_close.png" alt="close" class="mCloseImg" data-popid="calrendarModal">
										</div>
										<div class="exclTip"><p class="mt5">공사건수 조회는 2012년 부터</p><p>최대 1년 후까지 가능합니다.</p></div>
									</div>

						            <!-- Modal body -->
						            <div class="modal-body">
						                <div style="padding-bottom: 10px; text-align: right;">
						                    <!-- <button type="button" class="btn btn-primary btn-sm slider" data-toggle="modal" data-target="#calrendar" data-dismiss="modal" onclick="_calrendar.initSlider()">슬라이드전환</button> -->
						                    <select name="periodCalendar" class="custom-select selecSlider" style="display:none;">
						                        <option value="year">년도기준</option>
						                        <option value="quarter">분기기준</option>
						                        <option value="month">월기준</option>
						                        <option value="day" selected="selected">일자기준</option>
						                    </select>
						                </div>

						                <div id="datepickerStart" class="inline alginLeft" name="datepicker"></div>
						                <div id="datepickerEnd" class="inline alginRight" name="datepicker"></div>
						            </div>

						            <!-- Modal footer -->
						            <div class="cModalBtnBox mt20">
							            <div class="rangeBtnBox">
											<input type="button" value="검색하기" class="rSearchBtn mr10" name="completeSlider" onclick="_calrendar.complete(this);">
											<input type="button" value="취소" class="rCancleBtn" data-popid="calrendarModal">
										</div>
									</div>
						        </div>
						    </div>
						</div>
					</div>

					<div class="controllerBox">
						<div class="mapCtlIcon">
							<ul id="rightCtl">
								<li data-text="">
								
								
								 
								</li>
								<li class="mt180 rightCtlLi" data-text="스와이프" onclick="mapInit.mapEvtMng.changeMap('swipe',this); return false;">
									<img src="/assets/images/button/mapBtn_03_off.png"  alt="button" ><!-- onmouseover="this.src='/assets/images/button/mapBtn_03_on.png'" onmouseout="this.src='/assets/images/button/mapBtn_03_off.png'" -->
								</li>
								<li class="mt5 rightCtlLi" data-text="거리재기" onclick="mapInit.mapEvtMng.changeMap('lengthMeasureRectangle',this); return false;">
									<img src="/assets/images/button/mapBtn_04_off.png"  alt="button"><!-- onmouseover="this.src='/assets/images/button/mapBtn_04_on.png'" onmouseout="this.src='/assets/images/button/mapBtn_04_off.png'" -->
								</li>
								<li class="mt5 rightCtlLi" data-text="면적재기" onclick="mapInit.mapEvtMng.changeMap('areaMeasureRectangle',this); return false;">
									<img src="/assets/images/button/mapBtn_05_off.png"  alt="button"><!-- onmouseover="this.src='/assets/images/button/mapBtn_05_on.png'" onmouseout="this.src='/assets/images/button/mapBtn_05_off.png'" -->
								</li>
								<li class="mt5 rightCtlLi" data-text="초기화" onclick="mapInit.mapEvtMng.changeMap('init',this); return false;">
									<img src="/assets/images/button/mapBtn_06_off.png"  alt="button"><!-- onmouseover="this.src='/assets/images/button/mapBtn_06_on.png'" onmouseout="this.src='/assets/images/button/mapBtn_06_off.png'" -->
								</li>
								<%  if(!userName.equals("anonymousUser")){%>
								<li class="mt5 rightCtlLi openBookMark" data-text="관심지역" onclick="mapInit.mapEvtMng.changeMap('openBookMark',this); return false;">
									<img src="/assets/images/button/mapBtn_07_off.png"  alt="button"><!-- onmouseover="this.src='/assets/images/button/mapBtn_07_on.png'" onmouseout="this.src='/assets/images/button/mapBtn_07_off.png'" -->
								</li>
								<%}%>
								<%--
								<c:if test="${userInfo.auth_no == '1' }">
 								<li class="mt5 rightCtlLi" data-text="유고정보" onclick="mapInit.mapEvtMng.changeMap('accdnt',this); return false;">
									<img src="/assets/images/button/mapBtn_08_off.png" alt="button"><!-- onmouseover="this.src='/assets/images/button/mapBtn_08_on.png'" onmouseout="this.src='/assets/images/button/mapBtn_08_off.png'"   -->
								</li>
								</c:if>
								--%>
								<li class="mt5 rightCtlLi roadView" data-text="로드뷰" id="roadViewBtn" onclick="mapInit.mapEvtMng.changeMap('roadView',this); return false;">
									<img src="/assets/images/button/mapBtn_09_off.png" alt="button"><!-- onmouseover="this.src='/assets/images/button/mapBtn_08_on.png'" onmouseout="this.src='/assets/images/button/mapBtn_08_off.png'"  -->
								</li>
								
							</ul>
						</div>
					</div>
				</div>
				<!-- //.mapControllBox -->

				<div class="areaCircleBox">
					<div class="areaCircle circle1">
						<img src="/assets/images/map/circle_blue.png" alt="circle">
						<div class="circleTbl"><div class="circleCell"><p class="cityText">인천광역시</p><p>32건</p></div></div>
					</div>
					<div class="areaCircle circle2">
						<img src="/assets/images/map/circle_blue.png" alt="circle">
						<div class="circleTbl"><div class="circleCell"><p class="cityText">서울특별시</p><p>32건</p></div></div>
					</div>
					<div class="areaCircle circle3">
						<img src="/assets/images/map/circle_blue.png" alt="circle">
						<div class="circleTbl"><div class="circleCell"><p class="cityText">경기도</p><p>32건</p></div></div>
					</div>
					<div class="areaCircle circle4">
						<img src="/assets/images/map/circle_blue.png" alt="circle">
						<div class="circleTbl"><div class="circleCell"><p class="cityText">강원도</p><p>32건</p></div></div>
					</div>
					<div class="areaCircle circle5">
						<img src="/assets/images/map/circle_blue.png" alt="circle">
						<div class="circleTbl"><div class="circleCell"><p class="cityText">충청남도</p><p>32건</p></div></div>
					</div>
					<div class="areaCircle circle6">
						<img src="/assets/images/map/circle_blue.png" alt="circle">
						<div class="circleTbl"><div class="circleCell"><p class="cityText">충청북도</p><p>32건</p></div></div>
					</div>
					<div class="areaCircle circle7">
						<img src="/assets/images/map/circle_blue.png" alt="circle">
						<div class="circleTbl"><div class="circleCell"><p class="cityText">경상북도</p><p>32건</p></div></div>
					</div>
					<div class="areaCircle circle8">
						<img src="/assets/images/map/circle_blue.png" alt="circle">
						<div class="circleTbl"><div class="circleCell"><p class="cityText">대전광역시</p><p>32건</p></div></div>
					</div>
					<div class="areaCircle circle9">
						<img src="/assets/images/map/circle_blue.png" alt="circle">
						<div class="circleTbl"><div class="circleCell"><p class="cityText">전라북도</p><p>32건</p></div></div>
					</div>
					<div class="areaCircle circle10">
						<img src="/assets/images/map/circle_blue.png" alt="circle">
						<div class="circleTbl"><div class="circleCell"><p class="cityText">대구광역시</p><p>32건</p></div></div>
					</div>
					<div class="areaCircle circle11">
						<img src="/assets/images/map/circle_blue.png" alt="circle">
						<div class="circleTbl"><div class="circleCell"><p class="cityText">울산광역시</p><p>32건</p></div></div>
					</div>
					<div class="areaCircle circle12">
						<img src="/assets/images/map/circle_blue.png" alt="circle">
						<div class="circleTbl"><div class="circleCell"><p class="cityText">광주광역시</p><p>32건</p></div></div>
					</div>
					<div class="areaCircle circle13">
						<img src="/assets/images/map/circle_blue.png" alt="circle">
						<div class="circleTbl"><div class="circleCell"><p class="cityText">경상남도</p><p>32건</p></div></div>
					</div>
					<div class="areaCircle circle14">
						<img src="/assets/images/map/circle_blue.png" alt="circle">
						<div class="circleTbl"><div class="circleCell"><p class="cityText">부산광역시</p><p>32건</p></div></div>
					</div>
					<div class="areaCircle circle15">
						<img src="/assets/images/map/circle_blue.png" alt="circle">
						<div class="circleTbl"><div class="circleCell"><p class="cityText">전라남도</p><p>32건</p></div></div>
					</div>
				</div>

				<div class="snsMarkerBox">
					<div class="twitterBox sns1"><img src="/assets/images/map/twitter_mark.png" alt="marker"></div>
					<div class="twitterBox sns2"><img src="/assets/images/map/twitter_mark.png" alt="marker"></div>
					<div class="twitterBox sns3"><img src="/assets/images/map/twitter_mark.png" alt="marker"></div>
					<div class="twitterBox sns4"><img src="/assets/images/map/twitter_mark.png" alt="marker"></div>
				</div>
			</div><!-- mapWrap -->
			<!-- //.mapWrap -->

			<div class="tooltipBox"><span></span></div>
			<!-- //.tooltipBox -->

			<div class="corTooltip">
				<ul>
					<li><p class="corToolTit">충청북도</p></li>
					<li><span class="inline wid50 alginLeft">국도 공사</span><span class="inline wid50 alginRight">04건</span></li>
					<li><span class="inline wid50 alginLeft">도로 공사</span><span class="inline wid50 alginRight">29건</span></li>
					<li><span class="inline wid50 alginLeft">시설 공사</span><span class="inline wid50 alginRight">17건</span></li>
				</ul>
			</div>

			<div class="srTipText"><span></span></div>
			<div class="mapCtlTooltip"><span></span></div>
		</div><!-- containerWrap -->
		<!-- //.container -->


		<!-- 도로대장49종 범례  -->
		<div class="mapPopupWrap ui-draggable" style="display: none; top:unset; left:unset; bottom:50px; right:20px; min-width:200px;" id="krrisLayerInfoDiv">
			<div class="mapPopupBox" style="min-width:200px;">
				<div class="mapHeader ui-draggable-handle">
					<div class="inline wid50 alginLeft">
						<span>도로대장 범례</span>
					</div>
					<div class="inline wid50 alginRight">
						<img src="/assets/images/button/wCloseBtn.png" alt="closeButton" name="corInfoBox" onclick="MapData.btnClickEvent('krrisLayerInfoBox');return false;">
					</div>
				</div>
				<div class="mapBody" style="padding:0;">
				<div class="CorFaci">
					<div class="corCont inline ">
						<table>
							<colgroup>
								<col width="">
								<col width="">
							</colgroup>
							<tbody id="krrisLayerInfoTbody">
							
							</tbody>
						</table>
					</div>
				</div>
			</div>
			</div>
		</div>
		<!-- //도로대장49종 범례 --> 
	
		<!-- 레이어 선택 팝업 -->
		<div class="layer_wrap layer_mapInfo" style="display: none;">
			<!-- layer_inner -->
			<div class="layer_inner">
				<div class="layer_header">
					<h3>중첩레이어</h3>
				</div>
				<!-- layer_body -->
				<div class="layer_body">
					<div class="layer_box">
						<ul class="mapInfo_list">
						</ul>
					</div>
				</div>
				<!-- //layer_body -->
			</div>
			<!-- //layer_inner -->
		</div>
		<!--//레이어 -->
        <div class="mapCtlTooltip" id="modal-controller-1" style="width:270px; left:460px; top:60px; z-index:400;"></div>
      
			
        <input type="hidden" id="startDt" value="20200101"/>
        <input type="hidden" id="endDt" value="20201201"/>
        <input type="hidden" id="userSeq" name="userSeq" value="${userInfo.user_seq}" >
        <input type="hidden" id="userId" name="userId" value="${userInfo.user_id}" >
        <input type="hidden" id="authNo" name="authNo" value="${userInfo.auth_no}" >
        <div id="infoWindowPopUp">
			
		</div>  
		<!-- 상세보기 -->
		 <div class="mapPopupWrap corDtlBox">
			<div class="mapPopupBox">
				<div class="mapHeader">
					<div class="inline wid50 alginLeft"><img src="/assets/images/icon/wDelp_icon.png" alt="delp" class="mr5"><span>공사정보 상세</span></div>
					<div class="inline wid50 alginRight">
						<img src="/assets/images/map/icon_mini.png" alt="miniButton" class="popMiniBtn mr20">
						<img src="/assets/images/button/wCloseBtn.png" alt="closeButton" class="btn_close" name="corDtlBox" onclick="MapData.btnClickEvent('corDtlBox');return false;">
					</div>
				</div>
				<div class="mapBody">  
					<!-- <div class="corDtlMapBox inline">
							<div  id="corDtlMap" style="position: absolute; height: 648px; width: 100%;"></div>
					</div> 찾음 -->

					<div class="corDtlInfoBox inline">
						<form id="detailForm" name="detailForm" method="post"> 
						<div class="dtlTop">
							<div class="inline dtlTopLeft">
								<div class="corName" id="corDtlBoxTopLeft"></div>
								<div class="corName"><span class="business" name="bidntcenm"></span></div>
								<div class="addrName"><span name='cnstrtsitergnnm'></span></div>
							</div>
							<div class="inline dtlTopRight" style="border-left: none;">
								<!-- <div><span class="reloadText">도로대장 관리시스템 갱신일자</span></div>
								<div class="mt15">
									<div class="inline wid50 alginLeft"><span class="reloadDate">2018.05.01</span></div>
									<div class="inline wid50 alginRight"><input type="button" value="입력" class="dtlTopBtn" style="display:none;"></div>
								</div> -->
							</div>
						</div>
						<div class="popupAccordion">
							<ul>
								<li>
									<div class="accTitleBox active" id="popupAccordion1">
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
														
															<input type="text" name="bidntceno" value="" readonly="readonly" style="width:100%; border:unset;">
														</td>
													</tr>
													<tr>
														<td>입찰공고차수</td>
														<td>
															<input type="text" name="bidntceord" readonly="readonly" style="width:100%; border:unset;">
														</td>
													</tr>
													<tr>
														<td>등록유형명</td>
														<td>
															<input type="text" name="bidmethdnm" readonly="readonly" style="width:100%; border:unset;">
														</td>
													</tr>
													<tr>
														<td>공고종류</td>
														<td>
															<input type="text" name="ntcekindnm" readonly="readonly" style="width:100%; border:unset;">
														</td>
													</tr>
													<tr>
														<td>입찰공고일시</td>
														<td>
															<input type="text" name="bidntcedt" readonly="readonly" style="width:100%; border:unset;">
														</td>
													</tr>
													<tr>
														<td>수요기관코드</td>
														<td>
															<input type="text" name="dminsttcd" readonly="readonly" style="width:100%; border:unset;">
														</td>
													</tr>
													<tr>
														<td>수요기관명</td>
														<td>
															<input type="text" name="dminsttnm" readonly="readonly" style="width:100%; text-overflow: ellipsis; border:unset;">
														</td>
													</tr>
													<tr>
														<td>추정가격</td>
														<td>
															<input type="text" name="presmptprce" readonly="readonly" style="width:100%; border:unset;">
														</td>
													</tr>
													<tr>
														<td>표준공고서URL</td>
														<td>
															<input type="button" value="입찰공고보기(새창)" class="dtlUrlBtn"  onclick="MyPage.moveUrl(this);return false; border:unset;">
															<input type="hidden" name="bidntcedtlurl" >
														</td>
													</tr>
													<tr>
														<td>예산금액</td>
														<td>
															<input type="text" name="bdgtamt" readonly="readonly" style="width:100%; border:unset;">
														</td>
													</tr>
													<tr>
														<td>공사현장지역명</td>
														<td>
															<input type="text" name="cnstrtsitergnnm" readonly="readonly" style="width:100%; border:unset;">
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
															<input type="text" name="search_word" readonly="readonly" style="width:100%; border:unset;">
														</td>
													</tr>
													
													<tr>
														<td>분석일시</td>
														<td>
															<input type="text" name="analysis_dt" readonly="readonly" style="width:100%; border:unset;">
														</td>
													</tr>
													
													<tr>
														<td>예상공사시작시기</td>
														<td>
															<input type="text" name="forecast_st_dt" readonly="readonly" style="width:100%; border:unset;">
														</td>
													</tr>
													<tr>
														<td>예상공사완료시기</td>
														<td>
															<input type="text" name="forecast_end_dt" readonly="readonly" style="width:100%; border:unset;">
														</td>
													</tr>
													<tr>
														<td>도로종류</td>
														<td>
															<input type="text" name="const_road_nm" readonly="readonly" style="width:100%; border:unset;">
														</td>
													</tr>
													<tr>
														<td>시도코드</td>
														<td>
															<input type="text" name="sido_cd" readonly="readonly" style="width:100%; border:unset;">
														</td>
													</tr>
													<tr>
														<td>시군구코드</td>
														<td>
															<input type="text" name="sgg_cd" readonly="readonly" style="width:100%; border:unset;">
														</td>
													</tr>
													<tr>
														<td>읍면동코드</td>
														<td>
															<input type="text" name="emd_cd" readonly="readonly" style="width:100%; border:unset;">
														</td>
													</tr>
													<tr>
														<td>인근도로멸실여부</td>
														<td>
															<input type="text" name="road_loss_yn" readonly="readonly" style="width:100%; border:unset;" value="해당없음">
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
													<col width="200px" />
													<col width="" />
													<col width="" />
													<col width="" />
												</colgroup>
												<thead>
													<tr>
														<th>순번</th>
														<th>위치포착검색어</th>
														<th>참조명칭사전</th>
														<th>위치</th>
													</tr>
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
					</div><!-- corDtlInfoBox -->
				</div><!-- mapBody -->
			</div><!-- mapPopupBox -->
		</div><!-- mapPopupWrap -->
		
		<!-- 여ㄱㄱ -->

	<div class="mapPopupWrap corDtlBox04" id="corDtlBox04"
		style="width: 780px; overflow: hidden;">
		<div class="mapPopupBox">
			<div class="mapHeader">
				<div class="inline wid50 alginLeft">
					<img src="/assets/images/icon/wDelp_icon.png" alt="delp"
						class="mr5"><span>공사 위치변경</span>
				</div>
				<div class="inline wid50 alginRight">
					<img src="/assets/images/map/icon_mini.png" alt="miniButton"
						class="popMiniBtn mr20"> <img
						src="/assets/images/button/wCloseBtn.png" alt="closeButton"
						class="btn_close" name="corDtlBox"
						onclick="MapData.btnClickEvent('corDtlBox04');return false;">
				</div>
			</div>
			<div class="mapBody" style="width:780px; position: fixed;">
				<!-- <div class="corDtlMapBox inline">
							<div  id="corDtlMap" style="position: absolute; height: 648px; width: 100%;"></div>
					</div> 찾음 -->
				<div class="corDtlInfoBox inline">
					<div class="dtlTop">
						<div class="inline dtlTopRight" style="border-left: none; padding: 5px 20px 5px 20px;">
							<div class="mSelectBox mt20" style="width: 210px; border-bottom: unset; padding: unset;">
								<h6>참조명칭사전 선택</h6>
								<select class="wid100" id="ReferenceNameDic"
									name="ReferenceNameDic">
									<option value="tb_cbnd_info">연속지적</option>
									<option value="tl_develop_info">지구단위</option>
									<option value="tl_poi_point">지명(POI)</option>
									<option value="tl_road_name">도로명주소(도로구간)</option>
								</select>
							</div>
							<div class="row mt">
								<div class="col-md-12">
									<div class="content-panel">
										<hr>
										<input type="hidden" id="hid_seq" name="hid_seq"> 
										<input type="hidden" id="resultno" name="resultno">
										<input type="hidden" id="hid_resultno" name="hid_resultno">
										<div class="col-md-12 searchMB" style="margin-bottom: 15px;">
											<form class="form-inline" role="form" id="LsearchForm"
												onsubmit="return false">
												<div class="form-group mr10">
												<jsp:include page="../admin/common/search-region-select.jsp">
													<jsp:param name="styleClass" value="mr10" />
												</jsp:include>
												</div>
												<div class="form-group mr10" style="margin-left: 10px;margin-top: 10px;">
													<input type="text" name="SearchWord" id="SearchWord"
														style="font: caption; width:200px;" placeholder="검색어">
												</div>
													<button type="button" class="btn btn-success searchBtn"
														onclick="retrieve(1)" style="margin-top: 10px;">검색</button>
													<input type="hidden" id="SearchWord_hidden" value="">
											</form>
										</div>
										<div class="total">
											<!-- <p>ì ì²´ <span>10ê±´</span>[<span>1/1</span>íì´ì§]</p> -->
										</div>
										<div id="test"></div>
										<div class="paging" id="pagination" style="left:calc(50% - 15%);"></div>

									</div>
									<!-- /content-panel -->
								</div>
								<!-- /col-md-12 -->
							</div>
							<!-- /row -->
							<hr>
							<div class="mSelectBox mt20" id=""
								style="width: 210px; border-bottom: unset;">
								<h6>변경사유</h6>
								<select class="wid100" id="ChangeReason"
									onchange="MapData.getMapSnsList();">
									<option value="">선택</option>
									<option value="NotFoundLocation">위치부정확</option>
									<option value="AfterChangeLocation">공고 후 위치변경</option>
									<option value="Gita">기타</option>
								</select>
							</div>
						</div>
					</div>
					<div class="mapBtn mt10">
						<input type="button" value="변경" id="" class="linkBtn mr5" id="ChangeLocationbtn" onclick="MapData.insertChangeLocation();return false;"> 
						<input type="button" value="취소" class="linkBtn mr5" style="margin-left: 20px;" id="ChangeLocationbtncancle" onclick="MapData.btnClickEvent('corDtlBox04');return false;">
					</div>
				</div><!-- corDtlInfoBox -->
			</div><!-- mapBody -->
		</div><!-- mapPopupBox -->
	</div><!-- mapPopupWrap -->
	
	<!-- 여기ㄲㅏㅏ -->
		<!-- /행정구역 선택 -->
			<div class="BoxWrap_adress" id="addrPop">
				<h3>지역검색<span><a href="#"><img src="/assets/images/button/wCloseBtn.png" alt="close" class="aClose" onclick="MapData.btnClickEvent('addrPop');return false;"></a></span></h3>
				<div class="choice">
					<div class="inline chArea">
						<h4>시/도 선택</h4>
						<div class="List" id="sidoComboList">
							<ul id="sidoCombo">
							</ul>
						</div>
					</div>

					<div class="inline chArea">
						<h4>시/군/구 선택</h4>
						<div class="List" id="sggComboList">
							<ul id="sggCombo">
							</ul>
						</div>
					</div>

					<div class="inline chArea">
						<h4>읍/면/동 선택</h4>
						<div class="List" id="emdComboList">
							<ul id="emdCombo">
								<!-- <li>
									<a href="#">읍/면/동 전체</a>
									<input type="hidden" name="sggCd" value="">
								</li> -->
							</ul>
						</div>
					</div>
				</div>
				
				<input type="hidden" id="sidoComboValue"/>
	            <input type="hidden" id="sidoComboCode"/>
	            <!-- <input type="hidden" id="sidoComboGeom"/> -->
	            
	            <input type="hidden" id="sggComboValue"/>
	            <input type="hidden" id="sggComboCode"/>
	            <!-- <input type="hidden" id="sggComboGeom"/> -->
	            
	            <input type="hidden" id="emdComboValue"/>
	            <input type="hidden" id="emdComboCode"/>
	            <!-- <input type="hidden" id="emdComboGeom"/> -->

				<div class="btnBottom">
				<button onclick="MapData.btnClickEvent('addrPop');return false;">취소</button>
				<button onclick="_mapArea.legalZoneConfirm(); return false;">확인</button> 
				</div>
			</div><!-- BoxWrap_adress -->
			<!-- //행정구역 선택 -->
			
			<div class="mapPopupWrap corBookMark">
				<div class="mapPopupBox">
					<div class="popupHeader">
						<div class="inline wid50 alginLeft"><span>관심지역설정</span></div>
						<div class="inline wid50 alginRight"><img src="/assets/images/button/wCloseBtn.png" alt="closeButton" class="bookCloseBtn" onclick="MapData.btnClickEvent('corBookMark');return false;"></div>
					</div>
					<div class="popupBody">
						<div class="popBookTop">
							<div class="popBookTit">
								<p class="bookTit">등록된 관심지역 입니다.</p>
								<p class="bookSubTit">관심지역명을 선택하시면 해당 지역으로 지도가 이동됩니다.</p>
								<p class="bookSubTit">관심지역은 최대 10개까지 지정할 수 있습니다.</p>
							</div>
							<div class="bookDelBox mt10">
								<input type="button" value="선택삭제" onclick="MapData.myAreaDel('sel'); return false;">
							</div>
						<div class="popBookMid mt5">
							<input type="hidden" id="corCnt"/>
							<div class="bookListBox">
								<table>
									<colgroup>
										<col width="35px" />
										<col width="" />
										<col width="35px" />
									</colgroup>
									<thead>
									<tr>
										<th>No.</th>
										<th>관심지역 명</th>
										<th>
											<input id="allCheck" name="allCheck" type="checkbox">
											<label for="allCheck"></label>
										</th>
									</tr>
									</thead>
									<tbody id="corBookMarkTbody">
									</tbody>
								</table>
							</div>
						</div>
						<div class="popBookTit mt10">
							<p class="bookTit">관심지역 저장</p>
							<p class="bookSubTit">현재 지도화면의 위치가 지정한 명칭으로 저장됩니다.</p>
						</div>

						<div class="bookInBox mt10"><input type="text" placeholder="관심지역명을 입력해주세요." id="myAreaText" name="myAreaText" maxlength="100"></div>

						<div class="bookBtnBox mt10">
							<input type="button" value="저장" class="bookSave mr5" onclick="MapData.myAreaSave(); return false;">
							<input type="button" value="전체삭제" class="bookDel" onclick="MapData.myAreaDel(); return false;">
						</div>
					</div>
				</div>
			</div>
		</div><!-- mapPopupWrap -->
		
		<!-- //.container -->
		<%--
		<div class="mapPopupWrap mapRoadViewPopup" id="mapRoadViewPopup" style="width:18%;height:40%;">
			<!-- <div class="mapPopupBox"> kyj89-->
			<div class="mapRoadviewPopupBox" style="width:100%;height:100%;">
				<div class="roadviewPopupHeader" style="width:100%;height:40px;">
					<div class="inline wid50 alginLeft"><span>로드뷰</span></div>
					<div class="inline wid50 alginRight"><img src="/assets/images/button/wCloseBtn.png" alt="closeButton" class="roadViewCloseBtn" onclick="MapData.btnClickEvent('mapRoadViewPopup');return false;"></div>
				</div>
				<div class="roadviewPopupBody" style="width:100%;height:calc(100% - 39px);">
					<!-- 로드뷰를 표시할 div 입니다 -->
					<div id="roadview" style="width:100%;height:calc(100% - 39x);"><p> 도로 위를 클릭해주세요. </p></div>
				</div>
			</div>
		</div>
		--%>
		<div class="mapPopupWrap roadViewPopup" style="width:18%;height:40%;">
			<!-- <div class="mapPopupBox"> kyj89-->
			<div class="mapRoadviewPopupBox mapRoadviewBody" style="width:100%;height:100%;">
				<div class="roadviewPopupHeader" style="width:100%;height:40px;">
					<div class="inline wid50 alginLeft"><span>로드뷰</span></div>
					<div class="inline wid50 alginRight"><img src="/assets/images/button/wCloseBtn.png" alt="closeButton" class="roadViewCloseBtn" onclick="MapData.btnClickEvent('roadViewPopup');return false;"></div>
				</div>
				<div class="popupBody" style="width:100%;height:calc(100% - 39px);">
					<!-- 로드뷰를 표시할 div 입니다 -->
					<div id="roadview" style="width:100%;height:100%;">
						<img style="width:100%;height: inherit;" src="/assets/images/bg/rv_text.png" alt="원하는 위치의 도로를 클릭해 주세요.">
					</div>
				</div>
			</div>
		</div> 

        <script type="text/javascript">

        console.info('${gbn}');

        var mapPageGbn='${gbn}';

		var ReferenceNameType ="";
		var SearchType = "";

        $('.corDtlBox').draggable({handle: '.mapHeader'});
        $('.corDtlBox04').draggable({handle: '.mapHeader'});
        /* kyj89_221129 추가 */
        $('.roadViewPopup').draggable({
    		scroll : false,
    		containment : 'parent', //부모 요소 안에서만 이동 범위 제한
    		handle : '.roadviewPopupHeader' // drag 대상 안 특정 요소에 제한 (여러개 사용 가능)
    	});
        
        var msg = '${msg}';
        if(!$.isNullString(msg)){
			alert(msg);
			location.href="/rcic/public_main";
			window.close();
		}
        
        var _mapArea; // viewMainEvnet 에서 생성
        $.selPeriod('3month','snsStartDt','snsEndDt');
        
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
	     });
		 
		 var date = new Date();
		 $("#corDtlDt").val(moment(date).format('YYYY.MM.DD'));
		 $("#corDtlDt").datepicker({
			 changeYear:true,
			 changeMonth:true,
			 format: "yyyy.mm.dd",
	         language: "kr"
	     });
		 
		 
		 $(".datepicker").click(function(){
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
            center:[14089168.15, 4380585.25],
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
        
        console.log("1111");
        //if(!$.isNullString($("#userId").val())){
        	MapData.setSearchEvt();
        //}
        	console.log("2222");
        	
        MapData.getMapSnsList();

        //초기에만 기간설정 검색 기간 셋팅
        startDt = $.calPeriod('pre',3,'month').replace(/[-]/g,"");
        endDt = $.toDayStr();
        $("#speriodBmng").val( $.setDateStrUnderBar(startDt) + "~"+ $.setDateStrUnderBar(endDt));
        $("#startDateBmng").val($.setDateStrDot(startDt));
        $("#endDateBmng").val($.setDateStrDot(endDt));
        MapData.setSearchEvtBmng();
        console.log("3333");
        
        MapData.getSnsAccount();
        console.log("4444");
        
        MapData.getMapUserMyRoadwork();
        console.log("5555");
        
        //건수검색 
        /** 
         dayType: yyyy
         dayType: yyyymm
         dayType: yyyymmdd
        */
        //mapInit.mapEvtMng.getFacCount();
    
      //달력
		var _calrendar = new Calrendar({
			period : $('select[name="periodSlider"]'),
			rangeSlider : $(".js-range-slider"),
			periodSlider : $('select[name="periodSlider"]'),
			modal : $('#calrendar'),
			datePickerModal1 : $('#singleModal'),
			datePickerModal2 : $('#doubleModal'),
			datepicker : $('div[name="datepicker"]'),
			ps : $('select[name="periodSlider"]'),
			pc : $('select[name="periodCalendar"]'),
			initStartDate : moment().subtract(parseInt(moment().format("YYYY")-2012),'year'), // 날짜 기준일자
			initEndDate : moment().add(1, 'year').format('YYYY.MM.DD'), //
			seletStartDate : moment().subtract(8,'year'),
			seletEndDate : moment().add(1, 'year'),
			eventType : "double"
			//날짜 종료
		});

		function popupLayer(type)
		{
			if(type == "picker"){
				$(".dateRangeBox").fadeOut("fast");
				$(".calrendarModal").fadeIn("fast");
			}else{
				$(".calrendarModal").fadeOut("fast");
				$(".dateRangeBox").fadeIn("fast");
			}
		}
		//명칭사전기반 검색어조회
		var _commonSearch = new CommonSearch({});

        // ready
        $(function () {
            init();
            $('#SearchWord').on('keyup', function (key) {
                if (key.keyCode === 13) {
                    retrieve(1);
                }
            });
            
        });

        // functions
        function init() {
       
        }

		$.fn.serializeObject = function() {
		    var result = {}
		    var extend = function(i, element) {
		        var node = result[element.name]
		        if ("undefined" !== typeof node && node !== null) {
		            if ($.isArray(node)) {
		                node.push(element.value)
		            } else {
		                result[element.name] = [node, element.value]
		            }
		        } else {
		            result[element.name] = element.value
		        }
		    }
		
		    $.each(this.serializeArray(), extend)
		    return result
		}
		function toSolrQuery(data, operator) {
		    var query = '';
		    var logicalOpr = ' ' + operator + ' ';
		    for (var key in data) {
		        if (!data[key]) continue;
		        if (query !== '') {
		            query += logicalOpr;
		        }
		        if(key == "rn" || key == "name" || key == "korean_nm"){
		        	 query += key + ':(*' + data[key] + '*)';
		        }if(key == "sub_jibun"){
		        	query += key + ':(' + data[key] + '*)';
		        }else{
			         query += key + ':(' + data[key] + ')';
		        }
		    }
		    return query === '' ? '*:*' : query;
		}
		//필요
		$.fn.txt = function (val) {
    	if (val == null) val = '';
   		return $(this).text(val);
		};
		
		//필요
		$.fn.pagination = function (currPage, maxPage, onclickFn) {
		    if (!maxPage) maxPage = 1;
		    $(this).twbsPagination('destroy');
		    $(this).twbsPagination({
		        totalPages: parseInt(maxPage),
		        visiblePages: 5,
		        startPage: currPage,
		        first: null,
		        last: null,
		        next: '&rsaquo;',
		        prev: '&lsaquo;',
		        initiateStartPageClick: false,
		        hideOnlyOnePage: false,
		        onPageClick: function (event,page) {
		            onclickFn(page);
		        }
		    });
		};
		
		
		
		$("#ReferenceNameDic").change(function(){
            $('#selectRegion option').prop("selected", false); 
            $('#selectRegion2 option').prop("selected", false); 
            $('#selectRegion3 option').prop("selected", false); 
            $('#selectRegion4 option').prop("selected", false); 
            $("#SearchWord").val("");
            $('#SearchWord_hidden').val("");
			//실행할 내용
			var ReferenceNameDic = $('#ReferenceNameDic option:selected').val();
			console.log(ReferenceNameDic);
			if(ReferenceNameDic == 'tb_cbnd_info'){
	            $('#SearchWord').show();
	            $('#SearchWordTitle').show();
	            $('#selectRegion4').css('visibility','unset');
	            document.getElementById( 'SearchWord' ).setAttribute( 'name', 'sub_jibun' );
	            $("#SearchWord").attr("placeholder","지번 입력");
            }else if(ReferenceNameDic == "tl_develop_info"){
	            $('#SearchWord').show();
	            $('#SearchWordTitle').show();
	            $('#selectRegion4').css('visibility','hidden');
	            document.getElementById( 'SearchWord' ).setAttribute( 'name', 'name' );
	            $("#SearchWord").attr("placeholder","지구단위 입력");
            }else if(ReferenceNameDic == "tl_poi_point"){
	            $('#SearchWord').show();
	            $('#SearchWordTitle').show();
	            $('#selectRegion4').css('visibility','hidden');
	            document.getElementById( 'SearchWord' ).setAttribute( 'name', 'korean_nm' );
	            $("#SearchWord").attr("placeholder","지명 입력");
            }else if(ReferenceNameDic == "tl_road_name"){
	            $('#SearchWord').show();
	            $('#SearchWordTitle').show();
	            $('#selectRegion4').css('visibility','hidden');
	            document.getElementById( 'SearchWord' ).setAttribute( 'name', 'rn' );
	            $("#SearchWord").attr("placeholder","도로명 입력");
            }else{
            	$('#SearchWord').hide();
                $('#SearchWordTitle').hide();
                $('#selectRegion4').css('visibility','hidden');
            }
			retrieve(1);
			
			});
				
		//참조사전
		
        function retrieve(currPage) {
			
			if($("#ReferenceNameDic option:selected").val() == ""){
				$.swal("참조명칭사전을 선택해주세요.");
				return;
			}
			
			if(!$("#ReferenceNameDic option:selected").val() == "tb_cbnd_info"){
				if($("#SearchWord").val() == ""){
					$.swal("검색어를 입력해주세요.");
					$("#SearchWord").focus();
					return;
				}
			}
        
	        ReferenceNameType = $('.corCont table tbody tr').find("td").eq(7).html();
			SearchType = $('.corCont table tbody tr').find("td").eq(5).html();
		
		
            if ($.isNullString(currPage)) {
                currPage = "1";
            }
            var listCnt = '5';
            var startPage = String((parseInt(currPage)-1)*parseInt(listCnt));
            //명칭사전 선택값
            var ReferenceNameDic = $('#ReferenceNameDic option:selected').val();
            
            if(ReferenceNameDic == 'tb_cbnd_info'){
            var collection = "tb_cbnd_info";
            }else if(ReferenceNameDic == "tl_develop_info"){
            var collection = "tl_develop_info";
            }else if(ReferenceNameDic == "tl_poi_point"){
            var collection = "tl_poi_point";
            }else if(ReferenceNameDic == "tl_road_name"){
            var collection = "tl_road_name";
            }
            
            
            
            var query = $('#LsearchForm').serializeObject();
            console.log(query);
            var data = {
                //searchKeyword:$('#SearchWord').val()
                searchKeyword: toSolrQuery(query, 'AND')
            }

            _commonSearch.getSearchList(startPage, listCnt, data, collection, function (res) {
                var html = "";
             	 //명칭사전에 맞는 테이블 tr생성
                mktr(ReferenceNameDic);
                $('#resultTable').empty();
                mktr(ReferenceNameDic);
                var list = [];
                $.each(res.result, function (i, item) {
                    item.rnum = ((parseInt(currPage) - parseInt(1)) * res.result.length) + parseInt(i) + parseInt(1);
                    var item = createRow(item,ReferenceNameDic);
                    list.push(item);
                });
                $('#resultTable').html(list);
                if(res.totalCnt < 1){
                $('#resultTable').empty();
              	  $('#resultTable').html("<tr style='background:unset; pointer-events:none;'><td colspan='10' style='text-align: center;'>검색된 결과가 없습니다.</td></tr>");
                }
                $('#pagination').pagination(currPage, res.maxPageCnt, retrieve);
            });
        }
        
		function mktr(ReferenceNameDic){
		if(ReferenceNameDic == 'tb_cbnd_info'){
				var dynamicHtml = "";
				dynamicHtml +='<table  class="table table-striped table-advance table-hover" style="width:100%;  font:caption;">';
				dynamicHtml +='<colgroup>';
				dynamicHtml +='<col width="70px">';
				dynamicHtml +='<col width="*">';
				dynamicHtml +='<col width="*">';
				dynamicHtml +='<col width="*">';
				dynamicHtml +='<col width="*">';
				dynamicHtml +='</colgroup>';
				dynamicHtml +='<thead>';
				dynamicHtml +='<tr>';
				dynamicHtml +='<th style="text-align: center;">번호</th>';
				dynamicHtml +='<th>주소</th>';
				dynamicHtml +='<th>지번</th>';
				dynamicHtml +='<th style="text-align: center;">산 여부</th>';
				dynamicHtml +='<th style="text-align: center;">시도</th>';
				dynamicHtml +='</tr>';
				dynamicHtml +='</thead>';
				dynamicHtml +='<tbody id="resultTable">';
				dynamicHtml +='</tbody>';
				dynamicHtml +='</table>';
				var $elementInner = $(dynamicHtml);
				$('#test').empty();
				$("#test").append($elementInner);
		}else if(ReferenceNameDic == 'tl_develop_info'){
		var dynamicHtml = "";
				dynamicHtml +='<table id=result_table class="table table-striped table-advance table-hover" style="width:100%; font:caption;">';
				dynamicHtml +='<colgroup>';
				dynamicHtml +='<col width="80px">';
				dynamicHtml +='<col width="220px">';
				dynamicHtml +='<col width="*">';
				dynamicHtml +='<col width="*">';
				dynamicHtml +='<col width="*">';
				dynamicHtml +='<col width="*">';
				//dynamicHtml +='<col width="*">';
				dynamicHtml +='</colgroup>';
				dynamicHtml +='<thead>';
				dynamicHtml +='<tr>';
				dynamicHtml +='<th style="text-align: center;">번호</th>';
				dynamicHtml +='<th>지구단위명칭</th>';
				dynamicHtml +='<th style="text-align: center;">시도</th>';
				dynamicHtml +='<th style="text-align: center;">시군구</th>';
				dynamicHtml +='<th style="text-align: center;">읍면동</th>';
				dynamicHtml +='<th style="text-align: center;">리</th>';
				//dynamicHtml +='<th style="text-align: center;">지번주소</th>';
				dynamicHtml +='</tr>';
				dynamicHtml +='</thead>';
				dynamicHtml +='<tbody id="resultTable">';
				dynamicHtml +='</tbody>';
				dynamicHtml +='</table>';
				var $elementInner = $(dynamicHtml);
				$('#test').empty();
				$("#test").append($elementInner);
		}else if(ReferenceNameDic == 'tl_poi_point'){
		var dynamicHtml = "";
				dynamicHtml +='<table id=result_table class="table table-striped table-advance table-hover" style="width:100%; font:caption;">';
				dynamicHtml +='<colgroup>';
				dynamicHtml +='<col width="80px">';
				dynamicHtml +='<col width="*">';
				dynamicHtml +='<col width="*">';
				dynamicHtml +='<col width="*">';
				dynamicHtml +='<col width="*">';
				dynamicHtml +='</colgroup>';
				dynamicHtml +='<thead>';
				dynamicHtml +='<tr>';
				dynamicHtml +='<th style="text-align: center;">번호</th>';
				dynamicHtml +='<th>지명</th>';
				dynamicHtml +='<th style="text-align: center;">시도</th>';
				dynamicHtml +='<th style="text-align: center;">시군구</th>';
				dynamicHtml +='<th style="text-align: center;">읍면동</th>';
				dynamicHtml +='</tr>';
				dynamicHtml +='</thead>';
				dynamicHtml +='<tbody id="resultTable">';
				dynamicHtml +='</tbody>';
				dynamicHtml +='</table>';
				var $elementInner = $(dynamicHtml);
				$('#test').empty();
				$("#test").append($elementInner);
		}else if(ReferenceNameDic == 'tl_road_name'){
		var dynamicHtml = "";
				dynamicHtml +='<table id=result_table class="table table-striped table-advance table-hover" style="width:100%; font:caption;">';
				dynamicHtml +='<colgroup>';
				dynamicHtml +='<col width="80px">';
				dynamicHtml +='<col width="*">';
				dynamicHtml +='<col width="*">';
				//dynamicHtml +='<col width="*">';
				dynamicHtml +='<col width="*">';
				//dynamicHtml +='<col width="*">';
				dynamicHtml +='<col width="*">';
				dynamicHtml +='<col width="*">';
				dynamicHtml +='</colgroup>';
				dynamicHtml +='<thead>';
				dynamicHtml +='<tr>';
				dynamicHtml +='<th style="text-align: center;">번호</th>';
				dynamicHtml +='<th>도로명</th>';
				//dynamicHtml +='<th style="text-align: center;">도로명(영문)</th>';
				dynamicHtml +='<th style="text-align: center;">기점/종점</th>';
				//dynamicHtml +='<th style="text-align: center;">도로구간<br/>일련번호</th>';
				dynamicHtml +='<th style="text-align: center;">시도</th>';
				dynamicHtml +='<th style="text-align: center;">시군구</th>';
				dynamicHtml +='<th style="text-align: center;">읍면동</th>';
				dynamicHtml +='</tr>';
				dynamicHtml +='</thead>';
				dynamicHtml +='<tbody id="resultTable">';
				dynamicHtml +='</tbody>';
				dynamicHtml +='</table>';
				var $elementInner = $(dynamicHtml);
				$('#test').empty();
				$("#test").append($elementInner);
		}
		
		}
		
        function createRow(item,ReferenceNameDic) {
        if(ReferenceNameDic == 'tb_cbnd_info'){
             var san = item.pnu.substr(11, 1) == '2' ? '산' : '일반';
             var bonbun = parseInt(item.pnu.substr(12, 3))==0?'':parseInt(item.pnu.substr(12, 3));
             var bubun = bonbun==''?parseInt(item.pnu.substr(15, 4)):'-' + parseInt(item.pnu.substr(15, 4));
             if(bubun=="-0") bubun="";
             var $tr = $("<tr id='"+item.seq+"' style='cursor: pointer;'>")
             .append($('<td style=\'text-align: center;\'/>').txt(item.rnum))
             .append($('<td/>').txt(item.addr))
             .append($('<td/>').txt(bonbun+bubun))
             .append($('<td style=\'text-align: center;\'/>').txt(san))
             .append($('<td style=\'text-align: center;\'/>').txt(item.sido_nm))
             return $tr;
             
            }else if(ReferenceNameDic == 'tl_develop_info'){
            
            var $tr = $("<tr id='"+item.id+"' style='cursor: pointer;'>")
            .append($('<td style=\'text-align: center;\'/>').txt(item.rnum))
            .append($('<td/>').txt(item.name))
            .append($('<td style=\'text-align: center;\'/>').txt(item.sido_nm))
            .append($('<td style=\'text-align: center;\'/>').txt(item.sgg_nm ))
            .append($('<td style=\'text-align: center;\'/>').txt(item.emd_nm ))
            .append($('<td style=\'text-align: center;\'/>').txt(item.li_nm == undefined?"-":item.li_nm))
            //.append($('<td/>').txt(item.addr).addClass('align-left'))
        	return $tr;
        	
            }else if(ReferenceNameDic == 'tl_poi_point' ){
            
            var $tr = $("<tr id='"+item.seq+"' style='cursor: pointer;'>")
            .append($('<td style=\'text-align: center;\'/>').txt(item.rnum)) // ë²í¸
            .append($('<td/>').txt(item.korean_nm)) // ì§ëª
            .append($('<td style=\'text-align: center;\'/>').txt(item.sido_nm)) // ìë
            .append($('<td style=\'text-align: center;\'/>').txt(item.sgg_nm )) // ìêµ°êµ¬
            .append($('<td style=\'text-align: center;\'/>').txt(item.emd_nm )) // ìë©´ë
       	 	return $tr;
       	 	
            }else if(ReferenceNameDic == 'tl_road_name' ){
            var $tr = $("<tr id='"+item.seq+"' style='cursor: pointer;'>")
            .append($('<td style=\'text-align: center;\'/>').txt(item.rnum)) // 번호
            .append($('<td/>').txt(item.rn)) // 도로명
            //.append($('<td/>').txt(item.eng_rn)) // 도로명(영문)
            .append($('<td style=\'text-align: center;\'/>').txt(item.rbp_cn + " → " + item.rep_cn )) // 기점/종점
            //.append($('<td style=\'text-align: center;\'/>').txt(item.rds_man_no)) // 도로구간일련번호
            .append($('<td style=\'text-align: center;\'/>').txt(item.sido_nm)) // 시도
            .append($('<td style=\'text-align: center;\'/>').txt(item.sgg_nm )) // 시군구
            .append($('<td style=\'text-align: center;\'/>').txt(item.emd_nm )) // 읍면동 
       	  	return $tr;
       	  	
            }
            
        }
        
        //클릭했을 때 tr값가져오기 위치이동!
        $(document).on('click','#resultTable tr',function(){
				
			var arr =[];
			var obj = new Object();
			
			var ReferenceType = $('#ReferenceNameDic option:selected').val();
			
			$("#resultTable tr:nth-of-type(odd)").css('background-color','rgba(0,0,0,.05)');
			$("#resultTable tr:nth-of-type(even)").css('background-color','unset');
			$(this).css('background-color','#70bb18');
			
			if(ReferenceType == 'tb_cbnd_info'){
				obj.url = "/rcic/analysis/getAnalysisDetailCbnd/"+parseInt($(this).context.id);	
				$('#SearchWord_hidden').val($(this).find("td").eq(1).html()+" "+$(this).find("td").eq(2).html());

				
			}else if(ReferenceType == 'tl_develop_info'){
				obj.url = "/rcic/analysis/getAnalysisDetailDevelop/"+parseInt($(this).context.id);
				$('#SearchWord_hidden').val($(this).find("td").eq(1).html());

				
			}else if(ReferenceType == 'tl_poi_point'){
				obj.url = "/rcic/analysis/getAnalysisDetailPoi/"+parseInt($(this).context.id);
				$('#SearchWord_hidden').val($(this).find("td").eq(1).html());

				
			}else if(ReferenceType == 'tl_road_name'){
				obj.url = "/rcic/analysis/getAnalysisDetailRoad/"+parseInt($(this).context.id);
				$('#SearchWord_hidden').val($(this).find("td").eq(1).html());

			}
			
			var dataList = setDefault(obj);
			
			$.commonAjax(dataList,'', function(response, status, headers, config){ 
                var layer = mapInit.mapLayerMng.getLayerById('analysisDetailChangeLocLayer');
				mapInit.map.removeLayer(layer);
				
                var features=[];
          	    var feature;
                
                if(ReferenceType == 'tb_cbnd_info'){
                	feature = (new ol.format.GeoJSON({})).readFeature(response.solrcbndinfo.geom);
              	    //byjang : 주석 (연속지적도는 3857 좌표계로 그대로 투영)
              	    // 기존 김건호 주임 연속지적도 4326으로 넣어서 투영시 3857한 부분(솔라에 올라간 db는 3857임)
                	//feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
				}else if(ReferenceType == 'tl_road_name'){
					feature = (new ol.format.GeoJSON({})).readFeature(response.solrRoadNameInfo.geom);
					feature.getGeometry().transform('EPSG:5179', 'EPSG:3857');
				}else{
					  var feature = (new ol.format.GeoJSON({})).readFeature(response.rtnData[0].geoGeom);
				}
				
                features.push(feature);
                
                extent = feature.getGeometry().getExtent();
        		mapInit.map.getView().fit(extent);
        		mapInit.map.getView().setZoom(8);
        		drawFeature(ol.extent.getCenter(extent));
	    	       
  	    	  	var obj = new Object();
  	    	  		obj.type="analysisDetailChangeLoc";
				mapInit.mapLayerMng.addTempLayer("analysisDetailChangeLocLayer",features, obj);

            });
				 
			
		});
        
        function drawFeature(coordinate){
			  
			var _self = this;
			
			var highlightStyle = new ol.style.Style({
				stroke: new ol.style.Stroke({
					color: '#3399CC',
				    width: 3,
				}),   
			}); 
			
		};
		 //진행공사 건수 조회
		
		/* $(".Indigo").eq(0).click();
		 
		$("#Indigo0").click(); */



		if(mapPageGbn==='coordReg'){
		  //  MapData.getCoordDraw();
		}




        //최초 점용불허가 레이어 mapInit 이란 ol map객체를 담은 객체에 추가
        for(var i=0;i<document.querySelector('#noPrmsnLayerListDiv .checkLayer').children.length;i++){
                    var layerNm=document.querySelector('#noPrmsnLayerListDiv .checkLayer').children[i].children[0].children[0].id;
                    MapData.addWmsImgLayer(layerNm,false);
        }

        </script>
    </body>
</html>