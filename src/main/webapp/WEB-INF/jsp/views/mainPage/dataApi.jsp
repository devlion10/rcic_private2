<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
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

	    <!-- Open Graph -->
	    <meta property="og:title"       content="도로변경정보 수집시스템" />
	    <meta property="og:type"        content="website" />
	    <meta property="og:image"       content="" />
	    <meta property="og:site_name"   content="도로변경정보 수집시스템" />
	    <meta property="og:url"         content="" />
	    <meta property="og:description" content="" />
	    <!-- Open Graph -->
	    
		<title>도로변경정보 수집시스템</title>

		<jsp:include page="/WEB-INF/jsp/views/include/htmlHead.jsp"></jsp:include>
		<style type="text/css">
			.contentsWrap{ min-width:280px; }
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
						<div class="parallaxBG api">
							<div class="topBGLeftTxt">
								<p><span>R</span>OAD</p>
								<p><span>C</span>HANGE</p>
								<p><span>I</span>NFO</p>
								<p><span>C</span>OLLECTION</p>
							</div>
							<div class="topBGBtmTxt">
								<p>api<span>데이터제공 API</span></p>
							</div>
						</div>
					</div>
					<div class="pageBox">
						<div class="pageNav">
							<img src="/assets/images/icon/home.png" alt="icon">
							<span class="division">&#8250;</span>
							<span>데이터제공 API</span>
							<span class="division">&#8250;</span>
							<span class="siteName">파일데이터</span>
						</div>

						<div class="listTab apiTab">
							<span class="listTabMenu active" data-index="1" onclick="DataApi.listTabMenu(this);return false;">
								<img src="/assets/images/icon/icon_filedata_on.png" alt="icon" data-fileName="icon_filedata">
								<span>파일데이터</span>
							</span>
							<span class="listTabMenu" data-index="2" onclick="DataApi.listTabMenu(this);return false;">
								<img src="/assets/images/icon/icon_api_off.png" alt="icon" data-fileName="icon_api">
								<span>open api</span>
							</span>
							<span class="listTabMenu" data-index="3" onclick="DataApi.listTabMenu(this);return false;">
								<img src="/assets/images/icon/icon_request_off.png" alt="icon" data-fileName="icon_request">
								<span>신청현황</span>
							</span>
						</div>
						<!-- //.listTab -->

						<div class="bConTxtBox">
							<span>도로변경정보 수집시스템에서는</span><span class="block">&nbsp;<span class="gColor"> 수집된 공사목록 데이터를 제공</span>합니다.</span>
						</div>

						<div class="sectionBtm">
							<div class="boardListBox">
								<div class="boardUlList">
									<div id="tabContents1" class="tabContetns">
										<div class="boardSearchBox apiBoard">
											<div class="inline wid30 alginLeft bListCntBox">
												<span class="bInline absolute">제공목록<span class="bInline"  id="fileDataTotalCnt"></span></span>
												<div class="inline optionSel wid50 ml10">
													<select class="selectOpt" onchange="DataApi.getFileDataList();return false;" id="dataPerPage">
														<option value="5">5건씩 보기</option>
														<option value="10">10건씩 보기</option>
														<option value="15">15건씩 보기</option>
														<option value="20">20건씩 보기</option>
													</select>
												</div>
											</div>
											<div class="inline wid70 alginRight ">
												<div class="inline optionChoice apiOpt">
													<span class="oLabel mr10">수집년월</span>
													<span class="dateIcon">
														<input type="text" class="date" id="stdrDe" value='전체' readonly="readonly">
														<i class="datepicker" target="stdrDe"></i>
													</span>
												</div>
												<div class="inline optionSel">
													<span class="oLabel mr10">데이터 종류</span>
													<select class="selectOpt" onchange="DataApi.getFileDataList();return false;" id="dataTypeList">
														<option value="">전체</option>
													</select>
												</div>
											</div>
										</div>
										<!-- //.boardSearchBox  -->
										<!-- 등록된 게시물이 없는경우 -->
										<div class="emptyListBox" style="display: none;">
											<div class="emptyBimgBox">
												<img src="/assets/images/icon/exc_mark.png" alt="mark">
											</div>
											<div class="emptyTxtBox mt20">
												<p>등록된 게시물이 없습니다.</p>
												<p class="mt10">이용에 불편을 드려 죄송합니다.</p>
											</div>
										</div> 
										<ul id="fileDataList"></ul> 
										
										<nav aria-label="page navigation" id="dataFileNav">
											<ul class="pagination" id="dataFilePagination" style="justify-content: center; margin-top: 20px;"></ul>
										</nav>
									</div>

									<div id="tabContents2" class="tabContetns">
										<div class="boardSearchBox">
											<div class="inline wid50 alginLeft bListCntBox">
												<span class="bInline absolute">제공목록<span class="bInline" id="openApTotalCnt"></span></span>
											</div>
											
											<div class="inline wid50 alginRight">
											 <%  if(!userName.equals("anonymousUser")){%>
												<div class="authKeyBox"><input type="button" value="인증키 신청" class="authButton" onclick="DataApi.btnClickEvent(this);return false;"></div>
											 <%} %>
											</div>
										
										</div>
										<!-- //.boardSearchBox  -->
										<div class="emptyListBox" style="display: none;" id="noneApi">
											<div class="emptyBimgBox">
												<img src="/assets/images/icon/exc_mark.png" alt="mark">
											</div>
											<div class="emptyTxtBox mt20">
												<p>등록된 게시물이 없습니다.</p>
												<p class="mt10">이용에 불편을 드려 죄송합니다.</p>
											</div>
										</div>
										<ul id="openApiList"></ul>
										
										<nav aria-label="page navigation" id="openApiNav">
											<ul class="pagination" id="openApiPagination" style="justify-content: center; margin-top: 20px;"></ul>
										</nav>
									</div>

									<div id="tabContents3" class="tabContetns">
										<div class="boardSearchBox">
											<div class="alginLeft bListCntBox">
												<span>인증키 신청목록</span>
											</div>
										</div>
										<!-- //.boardSearchBox  -->
										<div class="authListBox">
											<table>
												<colgroup>
													<col width="" />
													<col width="" />
													<col width="" />
													<col width="" />
												</colgroup>
												<thead>
													<tr>
														<th>No.</th>
														<th>상태</th>
														<th>발급일자</th>
														<!-- <th>재발급여부</th> --> 
														<th>인증키</th>
													</tr>
												</thead>
												<tbody id="apiReqList">
												</tbody>
											</table>
											
											<nav aria-label="page navigation" id="apiReqNav">
												<ul class="pagination" id="apiReqPagination" style="justify-content: center; margin-top: 20px;"></ul>
											</nav>
										</div>
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

		<div class="popupWrap certification">
			<div class="popupBox">
				<div class="popup">
					<div class="popupContents authApply">
						<div class="popupBody">
							<div class="closeBox authClose" onclick="DataApi.btnClickEvent(this);return false;"><img src="/assets/images/popup/closeBtn.png" alt="closeButton"></div>
							<div class="popupLogo">
								<img src="/assets/images/popup/popupLogo.png" alt="popupLogo">
							</div>
							<h2 class="popupTitle">인증키 신청</h2>
							<div class="formBox mt20">
								<div class="signForm authForm">
									<form>
										<table>
											<colgroup>
												<col width="" />
												<col width="" />
											</colgroup>
											<tr>
												<th>기관명</th>
												<td><input type="text" id="apiInsttNm" name="apiInsttNm" placeholder="기관명을 입력하세요." value="${userInfo.instt_nm}"  maxlength="50"></td>
											</tr>
											<tr>
												<th>접속 URL</th>
												<td><input type="text" id="connetUrl" name="connetUrl"  placeholder="예) www.lx.or.kr" maxlength="200"></td>
											</tr>
										</table>
										<input type="hidden" id="registId" value="${userInfo.user_id}">
									</form>
								</div>
								<!-- //.signForm -->
							</div>
							<!-- //.formBox -->
							<!-- //.popupAgree -->

							<div class="popBtnBox">
								<input type="button" value="신청하기" class="gBasicBtn" onclick="DataApi.insertApiUser();return false;">
								<input type="button" value="취소" class="cancleBtn" onclick="DataApi.btnClickEvent(this);return false;">
							</div>
						</div>
					</div>
					<!-- //.popupContents -->
				</div>
				<!-- //.popup -->
			</div>
			<!-- //.popupBox -->
		</div>
		<!-- //.signWrap -->
		
		
		<!-- 데이터 레이아웃  -->
		<div class="popupWrap apiDataLayout">
			<div class="popupBox">
				<div class="popup">
					<div class="popupContents apiLayoutCon">
						<div class="popupTxt">
							<p>데이터 레이아웃</p>
							<div class="compCloseBox" onclick="DataApi.btnClickEvent(this);return false;"><img src="/assets/images/popup/closeBtn.png" alt="closeButton"></div>
						</div>
						<div class="popupBody">
							<div>
								<h4 id="dataLayoutTitle">고속도로 공사현황</h4>
								<table>
									<colgroup>
										<col width="" />
										<col width="" />
										<col width="" />
										<col width="" />
										<col width="" />
									</colgroup>
									<tr>
										<th>순번</th>
										<th>컬럼명</th>
										<th>데이터유형</th>
										<th>크기</th>
										<th>설명</th>
									</tr>
									<tbody id="dataInfo">
									<tr>
										<td>1</td>
										<td>입찰공고번호</td>
										<td>문자</td>
										<td>11</td>
										<td>G2B 입찰공고번호</td>
									</tr>
									<tr>
										<td>2</td>
										<td>입찰공고차수</td>
										<td>문자</td>
										<td>2</td>
										<td>입찰공고차수</td>
									</tr>
									<tr>
										<td>3</td>
										<td>공고종류명</td>
										<td>문자</td>
										<td>20</td>
										<td>공고종류 (일반, 긴급, 변경, 재입찰)</td>
									</tr>
									<tr>
										<td>4</td>
										<td>공고기관명</td>
										<td>문자</td>
										<td>200</td>
										<td>공고기관명</td>
									</tr>
									<tr>
										<td>5</td>
										<td>공고명</td>
										<td>문자</td>
										<td>500</td>
										<td>공고명</td>
									</tr>
									<tr>
										<td>6</td>
										<td>입찰공고일시</td>
										<td>문자</td>
										<td>19</td>
										<td>입찰공고일시 (YYYY-MM-DD HH24:MM:SS)</td>
									</tr>
									<tr>
										<td>7</td>
										<td>조달청</td>
										<td>공고URL</td>
										<td>200</td>
										<td>G2B 입찰공고 상세 URL</td>
									</tr>
									<tr>
										<td>8</td>
										<td>관련공고번호</td>
										<td>문자</td>
										<td>100</td>
										<td>관련공고번호</td>
									</tr>
									<tr>
										<td>9</td>
										<td>수요기관코드</td>
										<td>문자</td>
										<td>7</td>
										<td>수요기관코드</td>
									</tr>
									<tr>
										<td>10</td>
										<td>수요기관명</td>
										<td>문자</td>
										<td>200</td>
										<td>수요기관명</td>
									</tr>
									<tr>
										<td>11</td>
										<td>시도코드</td>
										<td>문자</td>
										<td>2</td>
										<td>공사예측장소의 시도코드</td>
									</tr>
									<tr>
										<td>12</td>
										<td>시군구코드</td>
										<td>문자</td>
										<td>5</td>
										<td>공사예측장소의 시군구코드</td>
									</tr>
									<tr>
										<td>13</td>
										<td>읍면동코드</td>
										<td>문자</td>
										<td>8</td>
										<td>공사예측장소의 읍면동코드</td>
									</tr>
									<tr>
										<td>14</td>
										<td>공사예측시작일</td>
										<td>문자</td>
										<td>8</td>
										<td>공사예측시작일 (YYYYMMDD)</td>
									</tr>
									<tr>
										<td>15</td>
										<td>공사예측종료일</td>
										<td>문자</td>
										<td>8</td>
										<td>공사예측종료일 (YYYYMMDD)<br>(공고문내 공사일수+30일)</td>
									</tr>
									<tr>
										<td>16</td>
										<td>공사종류</td>
										<td>문자</td>
										<td>1000</td>
										<td>입찰공고에 대해 예측된 공사종류 (콤마로 구분)</td>
									</tr>
									<tr>
										<td>17</td>
										<td>시설종류</td>
										<td>문자</td>
										<td>1000</td>
										<td>입찰공고에 대해 예측된 시설종류 (콤마로 구분)</td>
									</tr>
									<tr>
										<td>18</td>
										<td>예측위치 정확도 분류</td>
										<td>문자</td>
										<td>10</td>
										<td></td>
									</tr>
									<tr>
										<td>19</td>
										<td>도로번호</td>
										<td>문자</td>
										<td>20</td>
										<td>공사예측된 도로번호</td>
									</tr>
									<tr>
										<td>20</td>
										<td>예측위치 (POINT)</td>
										<td>문자</td>
										<td>100</td>
										<td>공사예측 위치의 점 공간정보, WKT 포맷</td>
									</tr>
									<tr>
										<td>21</td>
										<td>예측도로라인 공간정보</td>
										<td>문자</td>
										<td>1000</td>
										<td>공사예측 도로의 라인 공간정보, WKT포맷</td>
									</tr> 
									<tr>
										<td>22</td>
										<td>계약일자</td>
										<td>문자</td>
										<td>10</td>
										<td>계약체결일자(YYYY-MM-DD)</td>
									</tr> 
									<tr>
										<td>23</td>
										<td>계약금액</td>
										<td>문자</td>
										<td>20</td>
										<td>계약금액</td>
									</tr> 
									<tr>
										<td>24</td>
										<td>착공일자</td>
										<td>문자</td>
										<td>20</td>
										<td>착공일자(YYYY-MM-DD)</td>
									</tr> 
									<tr>
										<td>25</td>
										<td>준공일자</td>
										<td>문자</td>
										<td>20</td>
										<td>준공기한일자(YYYY-MM-DD)</td>
									</tr> 
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="popupWrap popApiInfo" id="popApiInfo">
			<div class="popupBox">
				<div class="popup">
					<div class="popupContents apiInfoCon">
						<div class="popupTxt">
							<p id="apiDetailTitle">고속도로 공사현황 API 정보</p>
							<div class="compCloseBox" onclick="DataApi.btnClickEvent(this);return false;"><img src="/assets/images/popup/closeBtn.png" alt="closeButton"></div>
						</div>
						<div class="popupBody">
							<div class="popTabMenu">
								<div class="popTabBox">
									<span data-index="1" class="active" id="popTabBox1">API 상세정보</span>
									<span data-index="2">오류코드</span>
								</div>
							</div>
							<div class="popTabContent popTabContent1">
								<p class="popTabTit">&middot; API 호출정보</p>
								<div>
									<table>
										<colgroup>
											<col width="" />
											<col width="" />
											<col width="" />
										</colgroup>
										<tr>
											<th>호출방식</th>
											<th>요청 URL</th>
											<th>출력형식</th>
										</tr>
										<tbody id="apiInfoTbody1">
										<tr>
											<td>POST<br />GET</td>
											<td><span name="apiUrl"></span></td>
											<td>json</td>
										</tr> 
										</tbody>
									</table>
								</div>
								<p class="popTabTit mt10">&middot; API 요청 변수정보</p>
								<div>
									<table>
										<colgroup>
											<col width="" />
											<col width="" />
											<col width="" />
										</colgroup>
										<tr>
											<th>변수명</th>
											<th>Type</th>
											<th>필수/선택</th>
											<th>샘플데이터</th>
											<th>설명</th>
										</tr>
										<tbody id="apiInfoTbody2">
										<tr>
											<td>apiKey</td>
											<td>String</td>
											<td>필수</td>
											<td>인증키</td>
											<td>API 인증키</td>
										</tr>
										<tr>
											<td>startYmd</td>
											<td>String</td>
											<td>필수</td>
											<td>20200901</td>
											<td>검색하고자 하는 공고시작일자 (YYYYMMDD)</td>
										</tr>
										<tr>
											<td>endYmd</td>
											<td>String</td>
											<td>필수</td>
											<td>20201231</td>
											<td>검색하고자 하는 공고종료일자 (YYYYMMDD)</td>
										</tr>
										<tr>
											<td>curPage</td>
											<td>Integer</td>
											<td>필수</td>
											<td>1</td>
											<td>현재 페이지 번호</td>
										</tr>
										<tr>
											<td>cntPerPage</td>
											<td>Integer</td>
											<td>선택</td>
											<td>10</td>
											<td>한 페이지 결과수 (기본값 10)</td>
										</tr>
										<tr>
											<td>sidoCd</td>
											<td>String</td>
											<td>선택</td>
											<td>41</td>
											<td>검색하고자 하는 광역시도의 코드 ('41' : 경기도)</td>
										</tr>
										<tr>
											<td>sigunguCd</td>
											<td>String</td>
											<td>선택</td>
											<td>41110</td>
											<td>검색하고자 하는 시군구의 코드 ('41110' : 경기도 수원시)<br>* 시군구 조건 입력 시 광역시도의 코드는 필수 입력되어야 함</td>
										</tr>
										<tr>
											<td>workType</td>
											<td>String</td>
											<td>선택</td>
											<td>11, 12, 13</td>
											<td>공사종류 및 시설종류 코드 목록 API로 제공된 공사종류코드<br>여러 개의 공사종류를 검색 시 콤마로 구분</td>
										</tr>
										<tr>
											<td>facilType</td>
											<td>String</td>
											<td>선택</td>
											<td>21, 22, 23</td>
											<td>공사종류 및 시설종류 코드 목록 API로 제공된 공사종류코드<br>여러 개의 공사종류를 검색 시 콤마로 구분</td>
										</tr>
										</tbody>
									</table>
								</div>
								<p class="popTabTit mt10">&middot; API 출력결과</p>
								<div>
									<table>
										<tr>
											<th style="width:30%" colspan="2">변수명</th>
											<th style="width:5%">Type</th>
											<th style="width:30%">샘플데이터</th>
											<th>설명</th>
										</tr>
										<tr>
											<td rowspan="5">common</td>
											<td>totCnt</td>
											<td>숫자</td>
											<td>256</td>
											<td>조회조건에 의한 총 검색건수</td>
										</tr>
										<tr>
											<td>curPage</td>
											<td>숫자</td>
											<td>1</td>
											<td>현재 페이지번호</td>
										</tr>
										<tr>
											<td>cntPerPage</td>
											<td>숫자</td>
											<td>10</td>
											<td>페이지당 출력할 레코드 수</td>
										</tr>
										<tr>
											<td>errCd</td>
											<td>문자</td>
											<td>00</td>
											<td>오류코드</td>
										</tr>
										<tr>
											<td>errMsg</td>
											<td>문자</td>
											<td></td>
											<td>오류메시지</td>
										</tr>
										<tr>  
											<td rowspan="28">item</td>
											<td>bidntceno</td>
											<td>문자</td>
											<td>20200608606</td>
											<td>G2B 입찰공고번호</td>
										</tr>
										<tr>
											<td>bidntceord</td>
											<td>문자</td>
											<td>00</td>
											<td>입찰공고차수</td>
										</tr>
										<tr>
											<td>ntcekindnm</td>
											<td>문자</td>
											<td>일반</td>
											<td>공고종류 (일반, 긴급, 변경, 재입찰)</td>
										</tr>
										<tr>
											<td>ntceinsttnm</td>
											<td>문자</td>
											<td>조달청</td>
											<td>공고기관명</td>
										</tr>
										<tr>
											<td>bidntcenm</td>
											<td>문자</td>
											<td>국도31호선 양구-원통 도로건설공사</td>
											<td>공고명</td>
										</tr>
										<tr>
											<td>bidntcedt</td>
											<td>문자</td>
											<td>2020-02-12 18:04:11</td>
											<td>입찰공고일시 (YYYY-MM-DD HH24:MM:SS)</td>
										</tr>
										<tr>
											<td>bidntcedtlurl</td>
											<td>문자</td>
											<td>http://www.g2b.go.kr:8081/ep/invitation/publish/bidInfoDtl.do?bidno=20200130745&bidseq=01&releaseYn=Y&taskClCd=3</td>
											<td>G2B 입찰공고 상세 URL</td>
										</tr>
										<tr>
											<td>refno</td>
											<td>문자</td>
											<td>200001200</td>
											<td>관련공고번호</td>
										</tr>
										<tr>
											<td>dminsttcd</td>
											<td>문자</td>
											<td>1613191</td>
											<td>수요기관코드</td>
										</tr>
										<tr>
											<td>dminsttnm</td>
											<td>문자</td>
											<td>국토교통부 원주지방국토관리청</td>
											<td>수요기관명</td>
										</tr>
										<tr>
											<td>sido_cd</td>
											<td>문자</td>
											<td>42</td>
											<td>공사예측장소의 시도코드</td>
										</tr>
										<tr>
											<td>sgg_cd</td>
											<td>문자</td>
											<td>42750</td>
											<td>공사예측장소의 시군구코드</td>
										</tr>
										<tr>
											<td>emd_cd</td>
											<td>문자</td>
											<td>42750253</td>
											<td>공사예측장소의 읍면동코드</td>
										</tr>
										<tr>
											<td>forecast_st_dt</td>
											<td>문자</td>
											<td>20200507</td>
											<td>공사예측시작일 (YYYYMMDD)</td>
										</tr>
										<tr>
											<td>forecast_end_dt</td>
											<td>문자</td>
											<td>20231231</td>
											<td>공사예측종료일 (YYYYMMDD)<br>(공고문내 공사일수+30일)</td>
										</tr>
										<tr>
											<td>road_ty_nms</td>
											<td>문자</td>
											<td>포장공사,도로확장(전기)</td>
											<td>입찰공고에 대해 예측된 공사종류 (콤마로 구분)</td>
										</tr>
										<tr>
											<td>fac_ty_nms</td>
											<td>문자</td>
											<td>가로등,도로,전기공사</td>
											<td>입찰공고에 대해 예측된 시설종류 (콤마로 구분)</td>
										</tr>
										<tr>
											<td>loc_accu_clss</td>
											<td>문자</td>
											<td></td>
											<td>예측위치 정확도 분류</td>
										</tr>
										<tr>
											<td>road_no</td>
											<td>문자</td>
											<td>13</td>
											<td>공사예측된 도로번호</td>
										</tr>
										<tr>
											<td>point_geom</td>
											<td>문자</td>
											<td>POINT(14135280.1067748 4204047.06035549)</td>
											<td>공사예측 위치의 점 공간정보, WKT 포맷(좌표계 EPSG 3857)</td>
										</tr>
										<tr>
											<td>line_geom</td>
											<td>문자</td>
											<td>MULTILINESTRING((14292178.5986464 4266539.48504754,14292178.5702867 4266539.4804826))</td>
											<td>공사예측 도로의 라인 공간정보, WKT포맷(좌표계 EPSG 3857)</td>
										</tr>
										<tr>
											<td>min_cntrctCnclsDate</td>
											<td>문자</td>
											<td>2021-01-21</td>
											<td>최초계약체결일</td>
										</tr>
										<tr>
											<td>max_cntrctCnclsDate</td>
											<td>문자</td>
											<td>2021-05-21</td>
											<td>최종계약체결일</td>
										</tr>
										
										<tr>
											<td>totCntrctAmt</td>
											<td>문자</td>
											<td>162315412</td>
											<td>총계약금액</td>
										</tr>
										
										<tr>
											<td>thtmCntrctAmt</td>
											<td>문자</td>
											<td>72315412</td>
											<td>금차계약금액</td>
										</tr>
										
										<tr>
											<td>cbgnDate</td>
											<td>문자</td>
											<td>2021-03-21</td>
											<td>착공일자</td>
										</tr>
										
										<tr>
											<td>thtmCcmpltDate</td>
											<td>문자</td>
											<td>2021-10-04</td>
											<td>금차준공일자</td>
										</tr>
										
										<tr>
											<td>ttalCcmpltDate</td>
											<td>문자</td>
											<td>2022-01-01</td>
											<td>총준공일자</td>
										</tr>
										
									</table>
								</div>
							</div>
							<div class="popTabContent popTabContent2">
								<p class="popTabTit">&middot; API 응답 오류 코드</p>
								<div>
									<table>
										<colgroup>
											<col width="" />
											<col width="" />
											<col width="" />
										</colgroup>
										<tr>
											<th>오류코드</th>
											<th>오류 메시지</th>
											<th>비고</th>
										</tr>
										<tr>
											<td>000</td>
											<td>정상</td>
											<td></td>
										</tr>
										<tr>
											<td>999</td>
											<td>시스템 오류</td>
											<td></td>
										</tr>
										<tr>
											<td>001</td>
											<td>승인되지 않은 Key입니다</td>
											<td></td>
										</tr>
										<tr>
											<td>002</td>
											<td>필수입력값이 입력되지 않았습니다.</td>
											<td></td>
										</tr>
										<tr>
											<td>003</td>
											<td>입력된 날짜가 유효하지 않습니다.</td>
											<td></td>
										</tr>
										<tr>
											<td>004</td>
											<td>일일 최대 요청 트래픽을 초과하였습니다.</td>
											<td></td>
										</tr>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		
		<!-- 공사종류 및 시설종류 코드목록   -->
		<div class="popupWrap popApiInfo" id="popApiInfoCor">
			<div class="popupBox">
				<div class="popup">
					<div class="popupContents apiInfoCon">
						<div class="popupTxt">
							<p>공사종류 및 시설종류 코드목록</p>
							<div class="compCloseBox" onclick="DataApi.btnClickEvent(this);return false;"><img src="/assets/images/popup/closeBtn.png" alt="closeButton"></div>
						</div>
						<div class="popupBody">
							<div class="popTabMenu">
								<div class="popTabBox">
									<span data-index="1" class="mr10 active">API 상세정보</span>
									<span data-index="2">오류코드</span>
								</div>
							</div>
							<div class="popTabContent popTabContent1">
								<p class="popTabTit">&middot; API 호출정보</p>
								<div>
									<table>
										<colgroup>
											<col width="" />
											<col width="" />
											<col width="" />
										</colgroup>
										<tr>
											<th>호출방식</th>
											<th>요청 URL</th>
											<th>출력형식</th>
										</tr>
										<tr>
											<td>POST<br />GET</td>
											<td><span name="apiUrl"></span></td>
											<td>json</td>
									</table>
								</div>
								<p class="popTabTit mt10">&middot; API 요청 변수정보</p>
								<div>
									<table>
										<colgroup>
											<col width="12%" />
											<col width="12%" />
											<col width="10%" />
											<col width="12%" />
											<col width="*" />
										</colgroup>
										<tr>
											<th>변수명</th>
											<th>Type</th>
											<th>필수/선택</th>
											<th>샘플데이터</th>
											<th>설명</th>
										</tr>
										<tr>
											<td>apiKey</td>
											<td>String</td>
											<td>필수</td>
											<td>인증키</td>
											<td>API 인증키</td>
										</tr>
										<tr>
											<td>codeGb</td>
											<td>String</td>
											<td>필수</td>
											<td>all</td>
											<td>검색하고자하는 코드 구분 ('all' : 전체, 'work' : 도로공사종류, 'facil' : 시설종류)</td>
										</tr>
									</table>
								</div>
								<p class="popTabTit">&middot; API 출력결과</p>
								<div>
									<table>
										<tr>
											<th style="width:30%" colspan="2">변수명</th>
											<th style="width:5%">Type</th>
											<th style="width:30%">샘플데이터</th>
											<th>설명</th>
										</tr>
										<tr>
											<td rowspan="3">common</td>
											<td>totCnt</td>
											<td>숫자</td>
											<td>256</td>
											<td>조회조건에 의한 총 검색건수</td>
										</tr>
										<tr>
											<td>errCd</td>
											<td>문자</td>
											<td>00</td>
											<td>오류코드</td>
										</tr>
										<tr>
											<td>errMsg</td>
											<td>문자</td>
											<td></td>
											<td>오류메시지</td>
										</tr>
										<tr>
											<td rowspan="3">item</td>
											<td>codeType</td>
											<td>문자</td>
											<td>공사종류</td>
											<td>공사종류, 시설종류</td>
										</tr>
										<tr>
											<td>code</td>
											<td>문자</td>
											<td>10</td>
											<td>코드</td>
										</tr>
										<tr>
											<td>codeNm</td>
											<td>문자</td>
											<td>도로보수</td>
											<td>코드명</td>
										</tr>
									</table>
								</div>
							</div>
							<div class="popTabContent popTabContent2">
								<p class="popTabTit">&middot; API 응답 오류코드</p>
								<div>
									<table>
										<colgroup>
											<col width="" />
											<col width="" />
											<col width="" />
										</colgroup>
										<tr>
											<th>오류코드</th>
											<th>오류 메시지</th>
											<th>비고</th>
										</tr>
										<tr>
											<td>000</td>
											<td>정상</td>
											<td></td>
										</tr>
										<tr>
											<td>999</td>
											<td>시스템 오류</td>
											<td></td>
										</tr>
										<tr>
											<td>001</td>
											<td>승인되지 않은 Key입니다</td>
											<td></td>
										</tr>
										<tr>
											<td>002</td>
											<td>필수입력값이 입력되지 않았습니다.</td>
											<td></td>
										</tr>
										<tr>
											<td>003</td>
											<td>입력된 날짜가 유효하지 않습니다.</td>
											<td></td>
										</tr>
										<tr>
											<td>004</td>
											<td>일일 최대 요청 트래픽을 초과하였습니다.</td>
											<td></td>
										</tr>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<iframe id="apiDownloadIframe" style="display:none;"></iframe>
		<script type="text/javascript">
			$( document ).ready(function() {
				DataApi.getFileDataList();
				DataApi.selectDataKind();    
			});
			 
			 $("#stdrDe").datepicker({
				 changeYear:true,
				 changeMonth:true,
				 format: "yyyy.mm", 
		         language: "kr",
		         viewMode: "months", 
		         minViewMode: "months", 
		     });
			
			 $("#stdrDe").on("change", function(){
				 DataApi.getFileDataList();
			 });
			 
			 $(".popTabBox span").on("click", function(){
	    		var index = $(this).attr("data-index");

	    		$(".popTabBox span").removeClass("active");
	    		$(this).addClass("active");
	    		$(".popTabContent").hide();
	    		$(".popTabContent"+index).show();
	    	});
		
			
		</script>
	</body>
</html>