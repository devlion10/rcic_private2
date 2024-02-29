<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page import="org.springframework.security.core.Authentication"%>
<%@page import="org.springframework.security.core.context.SecurityContextHolder"%>
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
		
		
		 <script src="/assets/js/common/lib/amcharts4/core.js"></script>
        <script src="/assets/js/common/lib/amcharts4/charts.js"></script>
        <script src="/assets/js/common/lib/amcharts4/lang/de_DE.js"></script>
        <script src="/assets/js/common/lib/amcharts4/lang/ko_KR.js"></script>
        <script src="/assets/js/common/lib/amcharts4/lang/es_ES.js"></script> 
        <script src="/assets/js/common/lib/amcharts4/themes/animated.js"></script>
        <script src="/assets/js/common/lib/amcharts4/themes/material.js"></script>
        <script src="/assets/js/common/lib/amcharts4/themes/dataviz.js"></script>
		<jsp:include page="/WEB-INF/jsp/views/include/htmlHead.jsp"></jsp:include>
	
	<style type="text/css">
		input:focus {outline:none;}
		input{
		  border:none;
		  hover:none;
		}
	</style>
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
						<div class="parallaxBG mypage">
							<div class="topBGLeftTxt">
								<p><span>R</span>OAD</p>
								<p><span>C</span>HANGE</p>
								<p><span>I</span>NFO</p>
								<p><span>C</span>OLLECTION</p>
							</div>
							<div class="topBGBtmTxt">
								<p>MYPAGE<span>마이페이지</span></p>
							</div>
						</div>
					</div>
					<div class="pageBox">
						<div class="pageNav">
							<img src="/assets/images/icon/home.png" alt="icon">
							<span class="division">&#8250;</span>
							<span class="siteName">마이페이지</span>
						</div>

						<div class="listTab">
							<span class="listTabMenu bmNone active" data-index="1" onclick="MyPage.listTabMenu(this);return false;">
								<img src="/assets/images/icon/icon_myinfo_on.png" alt="icon" data-fileName="icon_myinfo">
								<span>회원정보수정</span>
							</span>
							<span class="listTabMenu brNone bmNone" data-index="2" onclick="MyPage.listTabMenu(this);return false;">
								<img src="/assets/images/icon/icon_myconstruction_off.png" alt="icon" data-fileName="icon_myconstruction">
								<span>나의 관심공사</span>
							</span>
							<span class="listTabMenu" data-index="3" onclick="MyPage.listTabMenu(this);return false;">
								<img src="/assets/images/icon/icon_mychart_off.png" alt="icon" data-fileName="icon_mychart">
								<span>나의 관심통계</span>
							</span>
							<span class="listTabMenu" data-index="4" onclick="MyPage.listTabMenu(this); return false;">
								<img src="/assets/images/icon/icon_myquestion_off.png" alt="icon" data-fileName="icon_myquestion">
								<span>나의 1:1질문</span>
							</span>
						</div>
						<!-- //.listTab -->

						<div class="sectionBtm">
							<div class="">
								<div id="tabContents1" class="tabContetns">
									<div class="bConTxtBox">
										<p>등록된 회원정보를 수정할 수 있습니다.</p>
									</div>

									<div class="mUserInfoBox">
										<div class="mUserInBox">
											<div class="mUserInForm">
												<div class="mt10">
													<div class="inline uFormTitle"><p>아이디</p></div>
													<div class="inline uFormInfo"><p id="infoUserId">${userInfo.user_id}</p></div>
												</div>
												<div class="mt10">
													<div class="inline uFormTitle"><p>비밀번호</p></div>
													<div class="inline uFormInfo"><input type="button" value="비밀번호 변경" class="chgPwdBtn" onclick="MyPage.btnClickEvent(this);return false;" autocomplete="off"><span>비밀번호를 변경하시려면 클릭하세요.</span>
												</div>
												<div class="mt10">
													<div class="inline uFormTitle"><p>이름</p></div>
													<div class="inline uFormInfo"><input type="text" id="infoUserNm" value="${userInfo.user_nm}"></div>
												</div>
												<div class="mt10">
													<div class="inline uFormTitle"><p>기관명</p></div>
													<div class="inline uFormInfo"><input type="text" id="infoInsttNm" value="${userInfo.instt_nm}"></div>
												</div>
												<div class="mt10">
													<div class="inline uFormTitle"><p>기관/조직</p></div>
													<div class="inline uFormInfo">
														<select name="infoInsttSe"></select>
													</div>
												</div>
												<div class="mt10">
													<div class="inline uFormTitle"><p>휴대폰</p></div>
													<div class="inline uFormInfo"><input type="text" id="infoContactTelno" value="" ></div>
												</div>
											 	<div class="mt10">
													<div class="inline uFormTitle"><p>접속 IP 주소</p></div>
													<div class="inline uFormInfo"><input type="text" id="info_conect_ip" value="${userInfo.conect_ip}"></div>
												</div> 
											</div>
										</div>
										<div class="popBtnBox">
											<input type="button" value="수정" class="gBasicBtn" onclick="MyPage.updateUserInfo();return false;">
											<input type="button" value="취소" class="cancleBtn" onclick="window.history.back();">
										</div>
									</div>
									<div class="secessBox">
										<div class="inline secessTitle">
											<p>회원탈퇴</p>
										</div>
										<div class="inline secessInfo">
											<div class="diagonal"></div>
											<div class="inline secessTxt">
												<p>회원탈퇴를 하시려면 “회원탈퇴” 버튼을 클릭하세요.</p>
												<p>탈퇴는 되돌릴 수 없습니다. 신중히 생각하세요.</p>
											</div>
											<div class="inline popBtnBox">
												<input type="button" value="회원탈퇴" class="cancleBtn withdBtn" name="withdBtn" onclick="MyPage.btnClickEvent(this);return false;">
											</div>
										</div>
									</div>
									</div>
								</div>
								<div id="tabContents2" class="tabContetns">
									<div class="favorListBox">
										<div class="bConTxtBox">
											<div class="attenBox">
												<div class="inline favorImg"><img src="/assets/images/icon/icon_myFavorite.png" alt="favor"></div>
												<div class="inline favorTitle">
													<p>나의 관심공사</p>
												</div>
												<div class="inline favorTxt">
													<p>관심공사를 등록하시면 보다 편리하게 공사 정보를 확인 할 수 있습니다.</p>
													<p>지금 바로 관심공사를 등록해 보세요.</p>
												</div>
												<div class="inline favorAdd">
													<div class="inline popBtnBox">
														<input type="button" value="관심공사 등록하기" class="cancleBtn" onclick="window.open('/rcic/movePage?menuId=map');">
													</div>
												</div>
											</div>
										</div>
											<div class="boardSearchBox">
												<div class="inline wid50 alginLeft bListCntBox">
													<span>관심공사<span id="workTotalCnt"></span></span>
													<select name ="sido" onchange="MyPage.sidoChange();return false;">
														<option value="0" selected="selected">지역전체</option> 
													</select>
												</div>
												<div class="inline wid50 alginRight">
													<input type="button" value="전체 삭제" class="allDelBtn" id="allDelete" onclick="MyPage.deleteRoadWork(this);return false;">
												</div>
											</div>
											<!-- //.boardSearchBox  --> 
											<div>
												<ul class="favorList" id="favorList"></ul>												
											</div>
											<div class="moreBox favorMore" id="favorMore" onclick="MyPage.moreRoadWork();return false;"><p>더보기 +</p></div>
										<div class="emptyImgBox" id="noneMyConst" style="display: none;" >
											<img src="/assets/images/thumb/img_noMyconstruction.png">
											<p class="mt20">관심 공사가 등록되어 있지 않습니다.</p>
										</div>
										<!-- 
										<div class="moreBox favorMore" id="favorMore" onclick="MyPage.moreRoadWork();return false;"><p>더보기 +</p></div>
										 -->
									</div>
								</div>

								<div id="tabContents3" class="tabContetns">
									<div class="bConTxtBox">
										<div class="attenBox">
											<div class="inline favorImg"><img src="/assets/images/icon/icon_myChart.png" alt="favor"></div>
											<div class="inline favorTitle">
												<p>나의 관심통계</p>
											</div>
											<div class="inline favorTxt">
												<p>관심통계를 설정하시면 보다 편리하게 통계 정보를 확인 할 수 있습니다.</p>
												<p>지금 바로 관심통계를 등록해 보세요.</p>
											</div>
											<div class="inline favorAdd">
												<div class="inline popBtnBox">
													<input type="button" value="관심통계 설정하기" class="cancleBtn favorBtn" onclick="MyPage.btnClickEvent(this); return false;">
												</div>
											</div>
										</div>
									</div>
									
									<div class="emptyImgBox" id="noneMyChart" style="display: none" >  
										<img src="/assets/images/thumb/img_noStatistics.png">
										<p style="margin-top:20px !important;">관심 공사가 등록되어 있지 않습니다.</p>
									</div>
									
									<div id="contentArea">
										<div class="bConTxtBox">
											<p>등록하신 관심통계 목록 입니다.</p>
										</div>
										
										<div class="contListTab"> 
											<span class="contListTabMenu active" data-index="1">
												<span>공사현황</span>
											</span>
											<span class="contListTabMenu" data-index="2">
												<span>수집현황</span> 
											</span>
										</div>
										
										<div id="subCont1" class="subCont">
											<!-- //.favorTagBox -->
											<div class="searchBox mt10">
												<div class="optionBox">
													<div class="opLayer" id="opLayerCor">
														<div class="optionBorder">
															<div class="radioBox">
																<div class="inline">
																	<input type="radio" name="dRadio" id="dRadio1" checked="true" value="bidntcedt"><label for="dRadio1">공고일</label>
																</div>
																<div class="inline">
																	<input type="radio" name="dRadio" id="dRadio2" value="consrdt"><label for="dRadio2">예상공사기간</label>
																</div>
															</div>
															<div class="optionDtlBox">
																<div class="inline optionLeft">
																	<div class="optionChoice">
																		<div class="inline optionTxt"><span>기간 선택</span></div>
																		<div class="inline optionSel" id="optionSel">
																			<div class="inline">
																				<input type="button" value="1주일"  name="week" id="week" onclick="MyPage.selectPeriod(this,'fromDt','toDt');return false;">
																				<input type="button" value="1개월" name="1month" id="1month" onclick="MyPage.selectPeriod(this,'fromDt','toDt');return false;">
																				<input type="button" value="3개월" class="active" name="3month" id="3month" onclick="MyPage.selectPeriod(this,'fromDt','toDt');return false;">
																				<input type="button" value="6개월" name="6month" id="6month" onclick="MyPage.selectPeriod(this,'fromDt','toDt');return false;">  
																			</div>
																			<div class="inline opDateBtnBox">	
																				<input type="button" value="1년" name="1year" id="1year" onclick="MyPage.selectPeriod(this,'fromDt','toDt');return false;">
																				<input type="button" value="2년" name="2year" id="2year" onclick="MyPage.selectPeriod(this,'fromDt','toDt');return false;">
																				<input type="button" value="3년" name="3year" id="3year" onclick="MyPage.selectPeriod(this,'fromDt','toDt');return false;">
																				<input type="button" value="3년이상" name="3yearafter" id="3yearafter" onclick="MyPage.selectPeriod(this,'fromDt','toDt');return false;">
																			</div>
																		</div>
																	</div>
																	<div class="optionChoice">
																		<div class="inline optionTxt"><span>지역 선택</span></div>
																		<div class="inline optionSel">
																			<select name="myPageSido" onchange="MyPage.getSgg();"> 
																				<option value="0" selected="selected">시/도 선택</option>
																			</select>
																			<select  name="myPageSgg" onchange="MyPage.getEmd();">
																				<option value="0" selected="selected">시/군/구 선택</option>
																			</select>
																			<select name="myPageEmd">
																				<option value="0" selected="selected">읍/면/동 선택</option>
																			</select>
																		</div>
																	</div>
																</div>
																<div class="inline optionRight">
																	<div class="optionChoice">
																		<div class="inline optionTxt"><span>직접 입력</span></div>
																		<div class="inline optionSel">
																			<span class="dateIcon"><input type="text" class="date" name="fromDt" id="fromDt"><i class="datepicker datepickerCorporation"  target="fromDt"></i></span>
																			<span class="wave">~</span>
																			<span class="dateIcon"><input type="text" class="date" name="toDt" id="toDt"><i class="datepicker datepickerCorporation"  target="toDt"></i></span>
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
															<!-- //.optionDtlBox -->
														</div>
														<!-- //.optionBorder -->
														
														<div class="optionBtnBox">
															<input type="button" value="검색" class="searchBtn" onclick="MyPage.serchClickEvt();return false;" style="font-size: 14px;">
															<input type="button" value="초기화" class="resetBtn" onclick="MyPage.resetClickEvt();return false;" style="font-size: 14px;">
														</div>
													</div>
		
													<div class="shBox" id="corShBox">
														<img src="/assets/images/icon/arrow.png" alt="arrow">
													</div>
												</div>
												<!-- //.optionBox -->
												<div class="searchRDate">
													<div class="layerTable">
														<div class="layerCell" id="myPageCorporationSearch">
															<span class="sMtLine"><span class="gColor">2018년 5월 1일</span> 부터 <span class="gColor">2020년 5월 1일</span></span>
															<span class="block"> 기간의 공사 현황입니다.</span>
															<p class="searchRCnt" id="searchRCnt">검색결과는 <span>총 0,000건</span> 입니다.</p>
														</div>
													</div>
												</div>
											</div>
											<!-- //.searchBox -->
		
											<div id="">
												<c:forEach var="list" items="${list}" >
													 <c:if test="${list.statsListSe eq '2'}"> <!-- 공사 -->
													    <c:if test="${list.statsChrtSe eq 'B001'}"> <!-- 총 공사추이 -->
													    	<%@ include file="/WEB-INF/jsp/views/chart/constTrend.jsp" %>
														</c:if>
														<c:if test="${list.statsChrtSe eq 'B002'}"> <!-- 지역별 공사 대상 건수 -->
													    	<%@ include file="/WEB-INF/jsp/views/chart/localConstTargetCnt.jsp" %>
														</c:if>
														<c:if test="${list.statsChrtSe eq 'B003'}"> <!-- 발주처별 공사 건수 -->
													    	<%@ include file="/WEB-INF/jsp/views/chart/orderConstCnt.jsp" %>
														</c:if>
														<c:if test="${list.statsChrtSe eq 'B004'}"> <!-- 시도별 공사현황 -->
													    	<%@ include file="/WEB-INF/jsp/views/chart/sidoconst.jsp" %>
														</c:if>
														<c:if test="${list.statsChrtSe eq 'B005'}"> <!-- 공사종류 -->
													    	<%@ include file="/WEB-INF/jsp/views/chart/constKind.jsp" %>
														</c:if>
														<c:if test="${list.statsChrtSe eq 'B006'}"> <!-- 시설물종류 -->
													    	<%@ include file="/WEB-INF/jsp/views/chart/facKind.jsp" %>
														</c:if>
														<c:if test="${list.statsChrtSe eq 'B007'}"> <!-- 시설물종류 -->
													    	<%@ include file="/WEB-INF/jsp/views/chart/analysisCollection.jsp" %>
														</c:if>
													</c:if> 
												</c:forEach>
												<!-- //.multiChartBox -->
											</div>
										</div>
									</div>
									
									<div id="subCont2" class="subCont">
										<div class="searchBox mt10">
											<div class="optionBox">
												<div class="opLayer" id="opLayerColl">
													<div class="optionBorder">
														<div class="optionDtlBox">
															<div class="inline optionLeft">
																<div class="optionChoice">
																	<div class="inline optionTxt"><span>기간 선택</span></div>
																	<div class="inline optionSel" id="optionSelCollection">
																		<div class="inline">
																			<input type="button" value="1주일"  name="week"  id="weekCollection" onclick="MyPage.selectPeriod(this,'fromDtCollection','toDtCollection','Collection');return false;">
																			<input type="button" value="1개월" name="1month" id="1monthCollection" onclick="MyPage.selectPeriod(this,'fromDtCollection','toDtCollection','Collection');return false;">
																			<input type="button" value="3개월" class="active" name="3month" id="3monthCollection" onclick="MyPage.selectPeriod(this,'fromDtCollection','toDtCollection','Collection');return false;">
																			<input type="button" value="6개월" name="6month" id="6monthCollection" onclick="MyPage.selectPeriod(this,'fromDtCollection','toDtCollection','Collection');return false;">  
																		</div>
																		<div class="inline opDateBtnBox">	
																			<input type="button" value="1년" name="1year" id="1yearCollection" onclick="MyPage.selectPeriod(this,'fromDtCollection','toDtCollection','Collection');return false;">
																			<input type="button" value="2년" name="2year" id="2yearCollection" onclick="MyPage.selectPeriod(this,'fromDtCollection','toDtCollection','Collection');return false;">
																			<input type="button" value="3년" name="3year" id="3yearCollection" onclick="MyPage.selectPeriod(this,'fromDtCollection','toDtCollection','Collection');return false;">
																			<input type="button" value="3년이상" name="3yearafter" id="3yearafterCollection" onclick="MyPage.selectPeriod(this,'fromDtCollection','toDtCollection','Collection');return false;">
																		</div>
																	</div>
																</div>
															</div>
															<div class="inline optionRight">
																<div class="optionChoice">
																	<div class="inline optionTxt"><span>직접 입력</span></div>
																	<div class="inline optionSel">
																		<span class="dateIcon"><input type="text" class="date" name="fromDtCollection" id="fromDtCollection"><i class="datepicker datepickerCollection"  target="fromDtCollection"></i></span>
																		<span class="wave">~</span>
																		<span class="dateIcon"><input type="text" class="date" name="toDtCollection" id="toDtCollection"><i class="datepicker datepickerCollection"  target="toDtCollection"></i></span>
																	</div>
																</div>
															</div>
														</div>
														<!-- //.optionDtlBox -->
													</div>
													<!-- //.optionBorder -->

													<div class="optionBtnBox">
														<input type="button" value="검색" class="searchBtn" onclick="MyPage.collSerchClickEvt();">
														<input type="button" value="초기화" class="resetBtn" onclick="MyPage.collResetClickEvt();">
													</div>
												</div>

												<div class="shBox" id="collShBox">
													<img src="/assets/images/icon/arrow.png" alt="arrow">
												</div>
											</div>
											<!-- //.optionBox -->
											<div class="searchRDate">
												<div class="layerTable">
													<div class="layerCell" id="myPageCollectionSearch">
														<span class="sMtLine" id="searchRDateText"><span class="gColor">2018년 5월 1일</span> 부터 <span class="gColor">2020년 5월 1일</span></span>
														<span class="block"> 기간의 수집  현황입니다.</span>
														<p class="searchRCnt" id="searchRCnt">검색결과는 <span>총 0,000건</span> 입니다.</p>
													</div>
												</div>
											</div>
										</div>
										<!-- //.searchBox -->
										<div>
											<c:forEach var="list" items="${list}" >
												<c:if test="${list.statsListSe eq '1'}"> <!-- 수집 -->
												    <c:if test="${list.statsChrtSe eq 'A001'}"> <!-- 수집현황 통계 -->
												    	<%@ include file="/WEB-INF/jsp/views/chart/collectionState.jsp" %>
													</c:if>
													<c:if test="${list.statsChrtSe eq 'A002'}"> <!--키워드 분포 -->
												    	<%@ include file="/WEB-INF/jsp/views/chart/keywordDistribution.jsp" %>
													</c:if>
													<c:if test="${list.statsChrtSe eq 'A003'}"> <!-- 발주금액분포 -->
												    	<%@ include file="/WEB-INF/jsp/views/chart/orderAmountDistribution.jsp" %>
													</c:if>
													<%-- <c:if test="${list.statsChrtSe eq 'A004'}"> <!-- 도로구분별 수집현황 -->
												    	<%@ include file="/WEB-INF/jsp/views/chart/roadDivision.jsp" %>
													</c:if> --%>
												</c:if>  
											</c:forEach>
										</div>
									</div>
								</div>
								<div id="tabContents4" class="tabContetns">
									<div class="questionListBox">
										<div id="qaContents">
											<div class="bConTxtBox">
												<p>등록한 질문의 답변을 확인하세요.</p>
											</div>
	                                        <div class="boardSearchBox borderBtm">
												<div class="inline wid50 alginLeft bListCntBox">
													<select name="qestnTy" onchange="MyPage.questionTyChange();">
														<option value= "" selected="selected">분류전체</option>
													</select>
												</div>
												<div class="inline wid50 alginRight">
													<input type="button" value="전체 삭제" class="allDelBtn" onclick="MyPage.deleteQuestion(this);return false;">
												</div>
											</div>
										</div>
										<ul class="mQuestion"></ul>
										<div class="emptyQuestionBox" style="display: none;">
											<img src="/assets/images/thumb/not_question.png">
											<p>등록된 질문이 없습니다.</p>
										</div> 
										 
										<div class="moreBox favorMore" id="qaMoreBox" style="display:none;" onclick="MyPage.moreQaList();"><p>더보기 +</p></div>
									</div>
								</div>
							</div>
							<!-- //.boardListBox -->
						</div>
						<!-- //.sectionBtm -->
					</div>
				</div>

				<jsp:include page="/WEB-INF/jsp/views/include/footer.jsp"></jsp:include>
				<!-- //.footer -->
			</div>
		</div>
		<!-- //.container -->

		<div class="popupWrap withdrawalWrap">
			<div class="popupBox">
				<div class="popup">
					<div class="popupContents withdrawal">
						<div class="popupBody">
							<div class="closeBox" onclick="MyPage.btnClickEvent(this); return false;"><img src="/assets/images/popup/closeBtn.png" alt="closeButton"></div>
							<div class="popupLogo">
								<img src="/assets/images/popup/popupLogo.png" alt="popupLogo">
							</div>
							<h2 class="popupTitle">회원탈퇴</h2>
							<div class="popThumbBox">
								<img src="/assets/images/popup/exit.png" alt="exit">
							</div>

							<div class="popupAgree">
								<div class="withdrawalTxt">
									<p class="wExpTxt">회원탈퇴를 하시고 비회원으로 시스템을 이용하실 경우,</p>
									<p class="wExpTxt">관심공사로 등록하셨던 모든 데이터가 삭제되며</p>
									<p class="wExpTxt">RCIC 에서 받고 계신 서비스를 더 이상 이용하실 수 없습니다.</p>
									<p class="wExpTxt mt20">또한, 회원 탈퇴 후 동일한 이메일로 재가입이 불가능합니다.</p>
									<p class="wExcTxt">정말 회원탈퇴를 하시겠습니까?</p>
								</div>
							</div>
							<!-- //.popupAgree -->

							<div class="popBtnBox">
								<input type="button" value="회원탈퇴 하기" class="gBasicBtn" onclick="MyPage.sttusWithd(); return false;">
								<input type="button" value="취소" class="cancleBtn cWithdBtn" onclick="MyPage.btnClickEvent(this); return false;">
							</div>
						</div>
					</div>
					<!-- //.popupContents -->
				</div>
				<!-- //.popup -->
			</div>
			<!-- //.popupBox -->
		</div>
		<!-- //.withdrawalWrap -->

		<!-- //.categoryWrap -->
		<div class="popupWrap categoryWrap">
			<div class="popupBox">
				<div class="popup">
					<div class="popupContents category">
						<div class="popupBody">
							<div class="closeBox" onclick="MyPage.setChartCancel(); return false;"><img src="/assets/images/popup/closeBtn.png" alt="closeButton" name="btn_close" ></div>
							<div class="popupLogo"> 
								<img src="/assets/images/popup/popupLogo.png" alt="popupLogo">
							</div>
							<h2 class="popupTitle">관심통계설정하기</h2>

							<div class="inline cateInLine cateInLineMa">
								<div class="cateTitleBox">
									<span>공사현황</span>
								</div>
								<div class="cateChkBox">
									<div class="inline wid50 alginLeft">
										<input id="popCateCheck1" name="popCateCheck1" type="checkbox">
										<label for="popCateCheck1">전체선택</label>
									</div>
									<div class="inline wid50 alginRight refreshBox" id="corRefash" onclick="MyPage.clickRefash(this);return false;">
										<img src="/assets/images/popup/refresh.png" alt="refresh">
										<span>초기화</span>
									</div>
								</div>
								<div class="popupAgree cate1">
									<ul class="categoryTagBox" id="corChartList"></ul>
								</div>
								<!-- //.popupAgree -->
							</div>
							<div class="inline cateInLine">
								<div class="cateTitleBox">
									<span>수집현황</span>
								</div>
								<div class="cateChkBox">
									<div class="inline wid50 alginLeft">
										<input id="popCateCheck2" name="popCateCheck2" type="checkbox">
										<label for="popCateCheck2">전체선택</label>
									</div>
									<div class="inline wid50 alginRight refreshBox" id="colRefash" onclick="MyPage.clickRefash(this);return false;">
										<img src="/assets/images/popup/refresh.png" alt="refresh">
										<span>초기화</span>
									</div>
								</div>
								<div class="popupAgree cate2">
									<ul class="categoryTagBox" id="colChartList"></ul>
								</div>
								<!-- //.popupAgree -->
							</div>

							<div class="popBtnBox">
								<input type="button" value="저장" class="gBasicBtn saveBtn" onclick="MyPage.selectChartTyResult();return false;">
								<input type="button" value="취소" class="cancleBtn cCorpBtn" onclick="MyPage.setChartCancel(); return false;">
							</div>
						</div>
					</div>
					<!-- //.popupContents -->
				</div>
				<!-- //.popup -->
			</div>
			<!-- //.popupBox -->
		</div>

		<div class="popupWrap signCompWrap">
			<div class="popupBox">
				<div class="popup">
					<div class="popupContents completeBox">
						<div class="popupTxt">
							<p>비밀번호 변경</p>
							<div class="compCloseBox" name="btn_close" onclick="MyPage.btnClickEvent(this);return false;"><img src="/assets/images/popup/closeBtn.png" alt="closeButton"></div>
						</div>
						<div class="popupBodyCom">
							<div class="pwdText"><p>새로운 비밀번호로 변경하시기 바랍니다.</p></div> 
							<div class="pwdForm mt20">
								<form>
									<div><input type="password" id="currPwd" placeholder="현재 비밀번호를 입력하세요." autocomplete="off"></div>   
									<div class="mt10"><input type="password" id="newPwd" placeholder="새로운 비밀번호를 입력하세요." autocomplete="off"></div>
									<div class="mt10 "><p class="warning">영문, 숫자, 특수기호 포함 8~15자리 이내로 입력하세요.</p></div>
									<div class="mt10"><input type="password" id="reNewPwd" placeholder="새로운 비밀번호를 입력하세요." autocomplete="off"></div>
								</form>
							</div>
							<div class="popupBtnBox mt20">
								<input type="button" value="확인" class="pwdEnterBtn" onclick="MyPage.pwChange();return false;">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- //.signCompWrap -->  
		
		
		<!-- 상세보기 -->
		 <div class="mapPopupWrap mypageCorBox">
			<div class="mapPopupBox">
				<div class="mapHeader">
					<div class="inline wid50 alginLeft"><img src="/assets/images/icon/wDelp_icon.png" alt="delp" class="mr5"><span>공사정보 상세</span></div>
					<div class="inline wid50 alginRight"><img src="/assets/images/button/wCloseBtn.png" alt="closeButton" class="btn_close" onclick="Corporation.btnClickEvent(this);return false;"></div>
				</div>
				<div class="mapBody">  
					<div class="corDtlMapBox inline">
						<div  id="corDtlMap" style="position: absolute; height: 678px; width: 100%;"></div>    
					</div>
					<div class="corDtlInfoBox inline">
						<form id="detailForm" name="detailForm" method="post"> 
						<div class="dtlTop">
							<div class="inline dtlTopRight">
								<div class="corName"><span class="gMark">종목</span><span class="mark">단가</span></div>
								<div class="corName"><span class="business" name="bidntcenm"></span></div>
								<div class="addrName"><span name="cnstrtsitergnnm"></span></div>
							</div>
							<!--
							<div class="inline dtlTopRight">
								 <div><span class="reloadText">도로대장 관리시스템 갱신일자</span></div>
								<div class="mt15">
									<div class="inline wid50 alginLeft"><span class="reloadDate">2018.05.01</span></div>
									<div class="inline wid50 alginRight"><input type="button" value="입력" class="dtlTopBtn" onclick="MyPage.btnClickEvent(this);return false;"></div>
								</div> 
							</div>
							-->
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
					</div>
				</div>
			</div>
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
		
		<div class="countTooltip"><div class="tipArrow"><p>입찰공고가 국도에 해당되는 것으로 분석된 공사수</p></div></div>	
		<input type = "hidden" id="type" value='${type}'>

		<script type="text/javascript">
			var type = '${type}';
			var _commonSearch = new CommonSearch({})
			
			var instt_se_val = '${userInfo.instt_se}';
			var phone = '${userInfo.contact_telno}';
			var type = '${type}';
			 
			 $(".contListTabMenu").on("click", function(){
				var index  = $(this).data("index");
	
				// tab class add
				$(".contListTabMenu").removeClass("active");
				$(this).addClass("active");
	
				$(".subCont").hide();
				$("#subCont"+index).show();
				
				if($(".contListTabMenu").hasClass("active")){
					if($(this).attr("data-index") == "1"){
						// 공사현황
						MyPage.serchClickEvt();
					}else{
						MyPage.collSerchClickEvt();
					}
				}
			});
			
			$( document ).ready(function() {				
				 $('.corDtlBox').draggable({handle: '.mapHeader'})
				 $('.corCategory').draggable({handle: '.mapHeader'})
				if(type == 'User'){ 
					$('.listTabMenu[data-index="1"]').trigger("click");
				}else if (type == 'RW'){
					 $('.listTabMenu[data-index="2"]').trigger("click");
				}else if (type == 'Chart'){
					 $('.listTabMenu[data-index="3"]').trigger("click");
				}else if(type =='QA'){
					$('.listTabMenu[data-index="4"]').trigger("click");
				}
				 
				MainInfo.getSido();
				MyPage.getSido();
				Board.getQuestionType();
				
				$('select[name="infoInsttSe"]').val(instt_se_val).prop("selected", true);
				phone = phone.substring(0, 3) + "-"  + phone.substring(3, 7) + "-" + phone.substring(7);
				$('#infoContactTelno').val(phone);
		    	$.selPeriod('3month','fromDt','toDt');
		    	$.selPeriod('3month','fromDtCollection','toDtCollection');
				 
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
				 
				 $("#fromDtCollection").datepicker({
					 changeYear:true,
					 changeMonth:true,
					 format: "yyyy.mm.dd",
			         language: "kr"
			     });
				 
				 $("#toDtCollection").datepicker({
					 changeYear:true,
					 changeMonth:true,
					 format: "yyyy.mm.dd",
			         language: "kr"
			     });
				 
				 $("#updateDt").datepicker({
					 changeYear:true,
					 changeMonth:true,
					 format: "yyyy.mm.dd",
			         language: "kr"
			     });
				 
				 $(".datepickerCorporation").click(function(){
					var target = $(this).attr('target');
					$('#' + target).datepicker().focus();
				});
				 
				 $(".datepickerCollection").click(function(){
						var target = $(this).attr('target');
						$('#' + target).datepicker().focus();
					});

				$(".popupAccordion .accTitleBox").on("click", function(){
					if($(this).hasClass("active")){ return false; }
					$(".popupAccordion .accTitleBox").removeClass("active"); $(".navicon-button").removeClass("pm");
					$(".accDtlInfo").slideUp("fast");

					$(this).addClass("active"); $(this).find(".navicon-button").addClass("pm");
					$(this).next(".accDtlInfo").slideDown("fast");
				});
				Corporation.getConstKind("const_road_clss")
				MyPage.serchClickEvt();
			});
			

			$("#corShBox").on("click", function(){
				if($(this).hasClass("close")){
					$("#opLayerCor").slideDown("fast"); 
					$(this).removeClass("close");
					$(this).children("img").removeClass("open");
				}else{
					$("#opLayerCor").slideUp("fast"); 
					$(this).addClass("close");
					$(this).css('opacity', '100%')
					$(this).children("img").addClass("open");
				}
			});
			
			$("#collShBox").on("click", function(){
				if($(this).hasClass("close")){
					$("#opLayerColl").slideDown("fast"); 
					$(this).removeClass("close");
					$(this).children("img").removeClass("open");
				}else{
					$("#opLayerColl").slideUp("fast"); 
					$(this).addClass("close");
					$(this).css('opacity', '100%')
					$(this).children("img").addClass("open");
				}
			});

			$(".dateBtnBox img").on("click", function(){
				$(".dateBtnBox img").each(function(index, item){
					var name   = $(this).attr("data-fileName");
					var reName = "/assets/images/button/"+name+"_off.png";

					$(this).attr("src", reName);
				});

				var name = $(this).attr("data-fileName");
				$(this).attr("src", "/assets/images/icon/"+name+"_on.png");
			});

			
			$('.date').on("click", function(){
				$('.optionSel input').removeClass("active");
			 });  
			
			  $('#popCateCheck1').on("click", function (e) {
				if($("#popCateCheck1").is(":checked")) {
					$('#corChartList li').addClass('active');
					$('#corChartList li').each(function (index, item) {
						 var id =   this.id
					     var onImg = $("#"+id).find('input[name="onImgValue"]').val();
						 var src  = "data:image/jpeg;base64," + onImg;
						 $("#"+id).find("img").attr("src", src);
					});
					
				}else{
					$("input:checkbox[id='popCateCheck1']").attr("checked", false);
					$('#corChartList li').removeClass('active');
					
					$('#corChartList li').each(function (index, item) {
						 var id =   this.id
					     var offImg = $("#"+id).find('input[name="offImgValue"]').val();
						 var src  = "data:image/jpeg;base64," + offImg;
						 $("#"+id).find("img").attr("src", src);
					});
				}
	        }); 
			
			$('#popCateCheck2').on("click", function (e) {
				if($("#popCateCheck2").is(":checked")) {
					$('#colChartList li').addClass('active');
					$('#colChartList li').each(function (index, item) {
						 var id =   this.id
					     var onImg = $("#"+id).find('input[name="onImgValue"]').val();
						 var src  = "data:image/jpeg;base64," + onImg;
						 $("#"+id).find("img").attr("src", src);
					});
				}else{
					$("input:checkbox[id='popCateCheck2']").attr("checked", false);
					$('#colChartList li').removeClass('active');
					
					$('#colChartList li').each(function (index, item) {
						 var id =   this.id
					     var offImg = $("#"+id).find('input[name="offImgValue"]').val();
						 var src  = "data:image/jpeg;base64," + offImg;
						 $("#"+id).find("img").attr("src", src);
					});
				}
	        }); 
			
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
			
			
		</script>
	</body>
</html>