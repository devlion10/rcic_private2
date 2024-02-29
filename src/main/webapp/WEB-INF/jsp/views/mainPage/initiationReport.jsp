<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@page import="org.springframework.security.core.Authentication"%>
<%@page import="org.springframework.security.core.context.SecurityContextHolder"%>
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

		<jsp:include page="/WEB-INF/jsp/views/include/htmlHead.jsp"></jsp:include>
		<script type="text/javascript" src="/assets/js/module/initiationReport/initiationReport.js"></script>
		<style type="text/css">
			input:focus {outline:none;}
			input{
			  border:none;
			  hover:none;
			}

			.optionChoice #bidntceno {
				width:190px;
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
						<div class="parallaxBG initiationReport">
							<div class="topBGLeftTxt">
								<p><span>R</span>OAD</p>
								<p><span>C</span>HANGE</p>
								<p><span>I</span>NFO</p>
								<p><span>C</span>OLLECTION</p>
							</div>
							<div class="topBGBtmTxt">
								<p>initiationReport<span>착수신고현황</span></p>
							</div>
						</div>
					</div>
					<div class="pageBox">
						<div class="pageNav">
							<img src="/assets/images/icon/home.png" alt="icon">
							<span class="division">›</span>
							<span>착수신고서</span>
							<span class="division">›</span>
							<span>표준 서식 조회</span>
						</div>
						<div class="wInfoBox">
							<span class="sInfoTit">※ 검색 조건 설정 및 공사명 또는 노선명 등을 직접 입력하여 검색할 수 있습니다.</span>
						</div>
						<div class="searchBox">
							<form id="initiationReportSearchForm">
                                <div class="optionBox">
                                    <div class="opLayer">
                                        <div class="optionBorder">
                                            <div class="optionDtlBox">
												<div class="inline optionLeft">
                                                <!-- 필터 1행 -->
													<div class="optionChoice">
														<!-- 입찰공고번호 -->
														<div class="inline optionTxt" style="margin-right: 12.5px;"><span>입찰공고번호 </span></div>
														<div class="inline optionSel" style="width: 200px;">
															<input type="text" name="bidntceno" id="bidntceno" style="font-size: 14px;" placeholder="입찰공고번호 입력"/>
														</div>
														<!-- 공사종류 -->
														<div class="inline optionTxt"><span>공사종류</span></div>
														<div class="inline optionSel">
															<select class="" name="cstrnTypeCd" id="cstrnTypeCd">
																<option value='all'>전체</option>
															</select>
														</div>
													</div>
												</div>
												<div class="inline optionRight"></div>
                                                <!-- 필터 2행 -->
												<div class="inline optionLeft">
													<div class="optionChoice">
														<!-- 공사시행기간 -->
														<div class="inline optionTxt" style="margin-right: 12.5px;"><span>공사시행기간</span></div>
														<div class="inline optionSel">
															<div class="inline">
																<input type="button" name="week" value="1주일" onclick="InitiationReport.selectPeriod(this);return false;"/>
																<input type="button" name="1month" value="1개월" onclick="InitiationReport.selectPeriod(this);return false;"/>
																<input type="button" name="3month" value="3개월" onclick="InitiationReport.selectPeriod(this);return false;"/>
																<input type="button" name="6month" value="6개월" onclick="InitiationReport.selectPeriod(this);return false;"/>
															</div>
															<div class="inline opDateBtnBox">
																<input type="button" name="1year" value="1년" onclick="InitiationReport.selectPeriod(this);return false;"/>
																<input type="button" name="2year" value="2년" onclick="InitiationReport.selectPeriod(this);return false;"/>
																<input type="button" name="3year" value="3년" onclick="InitiationReport.selectPeriod(this);return false;"/>
																<input type="button" name="3yearafter" value="3년이상" onclick="InitiationReport.selectPeriod(this);return false;"/>
															</div>
														</div>
													</div>
												</div>
												<div class="inline optionRight">
													<div class="optionChoice">
														<div class="inline optionTxt"><span>직접 입력</span></div>
														<div class="inline optionSel">
														<span class="dateIcon"><input type="text" class="date" name="cstrnStDt" id="cstrnStDt" readonly="readonly"/><i class="datepicker" target="cstrnStDt"></i></span>
															<span class="wave">~</span>
															<span class="dateIcon"><input type="text" class="date" name="cstrnEndDt" id="cstrnEndDt" readonly="readonly"/><i class="datepicker" target="cstrnEndDt"></i></span>
														</div>
													</div>
												</div>
												<div class="inline optionLeft">
													<div class="optionChoice">
														<div class="inline optionTxt" style="margin-right: 12.5px;"><span>공사시행위치</span></div>
														<div class="inline optionSel">
															<select name="sido" id="sido" onchange="MainInfo.getSgg();">
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
														<div class="inline optionTxt"><span>도로종류</span></div>
														<div class="inline optionSel">
															<select class="ctSelect" name="roadTypeCd">
																<option value="all" selected="selected">도로전체</option>
															</select>
														</div>
													</div>
												</div>
                                                <!-- 필터 3행 -->
                                                <div class="optionChoice">
                                                    <!-- 키워드 -->
                                                    <div class="inline optionTxt" style="margin-right: 12.5px;"><span>키워드</span></div>
                                                    <div class="inline optionSel" style="margin-right: 12.5px;">
                                                        <select class="" name="keywordSb">
                                                            <option value="all" selected="selected">전체</option>
                                                            <option value="cstrnNm">공사명</option>
                                                            <option value="roadRteNo">노선번호(노선명)</option>
                                                        </select>
                                                    </div>
                                                    <!-- 공사명 입력창 -->
                                                    <div class="inline optionSel">
                                                        <input type="text" name="keyword" id="keyword" style="width: 823px; font-size: 14px;" placeholder="검색어 입력"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="optionBtnBox">
                                            <input type="button" value="검색" class="searchBtn" onclick="InitiationReport.setSearchInitiationReport()"/>
                                            <input type="button" value="조건 초기화" class="resetBtn" onclick="InitiationReport.resetEvt()"/>
                                        </div>
                                    </div>
                                </div>
                            </form>
						</div>

						<!-- 검색 결과 영역 -->
						<div class="sectionBtm">
							<div class="boardListBox mt-5" >
								<div class="boardSearchBox">
									<div class="bListCntBox d-flex justify-content-between">
										<span class="text-left" id="totCnt">Total <em>999</em> 건</span>
										<div class="d-flex inline justify-content-end select_wrap">
											<select style="width: 140px; margin-right: 12.5px;">
												<option value="10">10건씩 보기</option>
												<option value="20">20건씩 보기</option>
												<option value="30">30건씩 보기</option>
											</select>
											<select style="width: 140px;">
												<option value="">최근 가입일순</option>
											</select>
										</div>
									</div>
								</div>
								<div class="boardTblList">
									<table id="dataTable">
										<thead>
										<tr>
											<th>선택</th>
											<th>No.</th>
											<th>입찰공고번호</th>
											<th>도로종류</th>
											<th>노선번호(노선명)</th>
											<th>공사종류</th>
											<th>공사명</th>
											<th>세부공사건수</th>
											<th>전체 공사 시행기간</th>
										</tr>
										</thead>
										<tbody id="initiationReportList">
										</tbody>
									</table>
								</div>
								<!-- 페이징 -->
								<nav aria-label="page navigation" id="initiationReportNav">
									<ul class="pagination" id="initiationReportPagination" style="justify-content: center; margin-top: 20px;"></ul>
								</nav>
							</div>
							<!-- //.boardListBox -->
							<div class="optionBtnBox text-right">
								<% if(userName.equals("anonymousUser")) { %>
								<% } else { %>
								<input type="button" value="표준서식 등록" class="searchBtn" id="moveRegistPageBtn" onclick="location.href='/rcic/initiationReport/movePageInitiationReportRegist'">
								<% } %>
								<c:if test="${userInfo.auth_no == '1'}">
									<input type="button" value="삭제" class="resetBtn" id="delBtn" onclick="InitiationReport.delEvt()">
								</c:if>
							</div>
						</div>
					</div>
				</div>
				<!-- //.contentsBox -->
			</div>
			<div id="movePageDetailDiv"></div>
			<jsp:include page="/WEB-INF/jsp/views/include/footer.jsp"></jsp:include>
			<!-- //.footer -->
		</div>
		<script type="text/javascript">
			var _commonSearch = new CommonSearch({});
			var _search = null;
			var _self = this;
		</script>

	</body>
</html>