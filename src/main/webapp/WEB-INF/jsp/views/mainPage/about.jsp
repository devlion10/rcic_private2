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
		<jsp:include page="/WEB-INF/jsp/views/include/htmlHead.jsp"></jsp:include>
	
	</head>
	<body>
		<div class="containerWrap">
			<div class="contentsWrap">
				<jsp:include page="/WEB-INF/jsp/views/include/header.jsp"></jsp:include>
				<!-- //.headerWrap -->

				<div class="contentsBox">
					<div class="parallaxBox">
						<div class="parallaxBG about">
							<div class="topBGLeftTxt">
								<p><span>R</span>OAD</p>
								<p><span>C</span>HANGE</p>
								<p><span>I</span>NFO</p>
								<p><span>C</span>OLLECTION</p>
							</div>
							<div class="topBGBtmTxt">
								<p>about<span>RCIC소개</span></p> 
							</div>
						</div>
					</div>  
					
					<div class="pageBox">
					<div class="pageNav">
						<img src="/assets/images/icon/home.png" alt="icon">
						<span class="division">&#8250;</span>
						<span>RCIC 소개</span>
					</div>
					<div class="aboutBox">
						<div class="aboutTitle"><p><span>R</span>OAD <span>C</span>HANGE <span>I</span>NFO <span>C</span>OLLECTION</p></div>
						<div class="purposeTxt">
							<p class="pPurTxt">RCIC는 도로를 구성하고 있는 모든 요소의 </p>
								<p class="pPurTxt"><strong>신설·변경·철거사항에 대해 확보가능한 모든 정보를 수집</strong>하여</p>
								<p class="pPurTxt"><strong>변경정보를 예측</strong>하는 시스템입니다.</p>
								<p class="mPurTxt">RCIC는 도로를 구성하고 있는 모든 요소의<strong>신설·변경·철거사항에 대해 확보가능한 모든 정보를 수집</strong>하여 <strong>변경정보를 예측</strong>하는 시스템입니다.</p>
						</div>
						<div class="purposeBox">
							<div class="purposeList">
								<dl>
									<dt>목적</dt>
									<dd>도로의 변경정보통합관리(일원화)를 통한 효율적 도로정보 운영·관리</dd>
									<dd>신속한 도로 변경정보 모니터링 환경 구축</dd>
									<dd>IT기반 예측정보 제공을 통한 도로관련 유관기관 상생협력</dd>
								</dl>
							</div>
						</div>
						<div class="serviceTitle"><p>주요서비스</p></div>
						<div class="serviceRoadBox">
							<div class="serviceMark"><span>도로 변경 정보 제공</span></div>
							<div class="roadText mt30">
								<p>조달청 등 공고정보를 통해 수집된 도로의 공사 내역을</p>
								<p>지도상에 표현하여 정부, 지자체, 유관기관 등에 정보를 제공하여 도로업무에 활용토록 지원합니다.</p>
							</div>
							<div class="serviceList">
								<div class="inline">
									<img src="/assets/images/icon/about_1.png" alt="about">
									<p>조달청 웹크롤링</p>
								</div>
								<div class="aboutArr inline"><img src="/assets/images/icon/about_arrow.png" alt="about"></div>
								<div class="inline">
									<img src="/assets/images/icon/about_2.png" alt="about">
									<p>가공 및 분석</p>
								</div>
								<div class="aboutArr inline"><img src="/assets/images/icon/about_arrow.png" alt="about"></div>
								<div class="inline">
									<img src="/assets/images/icon/about_3.png" alt="about">
									<p>온라인 서비스</p>
								</div>
							</div>
							<div class="sectorList">
								<div>
									<div class="sectorTxt inline wid50 mSector">
										<p class="aBold">검색 부문</p>
										<p class="aBase">공사현황 화면에서 다양한 검색 조건을 통해 공사를 검색 할 수 있습니다.</p>
										<p class="aPink">공고일, 공사기간, 지역, 공사명, 시설물명, 도로명 등</p>
									</div>
									<div class="sectorImg inline wid50">
										<img src="/assets/images/bg/about_monitor.png" alt="monitor">
									</div>
									<div class="sectorTxt inline wid50 pSector">
										<p class="aBold">검색 부문</p>
										<p class="aBase">공사현황 화면에서 다양한 검색 조건을 통해 공사를 검색 할 수 있습니다.</p>
										<p class="aPink">공고일, 공사기간, 지역, 공사명, 시설물명, 도로명 등</p>
									</div>
								</div>
								<div class="sectorTblBox">
									<div class="sectorTxt inline wid50">
										<p class="aBold">통계 부분</p>
										<p class="aBase">"공사현황" 과 "수집현황" 및 마이페이지의 "나의 관심통계" 화면을 통해</p>
										<p class="aBase">통계내역을 확인 할 수 있습니다.</p>
										<p class="aPink">총공사추이, 지역별 공사 대상건수, 발주처별 공사건수, 시도별 공사현황, 공사종류,</p>
										<p class="aPink">시설물종류, 수집현황 통계, 키워드 분포, 발주금액 분포, 도로구분별 수집현황 등</p>
									</div>
									<div class="sectorTbl inline wid50">
										<table>
											<colgroup>
												<col width="30%" />
												<col width="" />
											</colgroup>
											<thead>
												<tr>
													<th>통계병</th>
													<th>설명</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>총 공사추이</td>
													<td>총공사, 국도공사, 고속도로공사, 지방도 및 기타 공사로 구분하여<br />공사추이(일별, 주별, 월별)를 확인할 수 있습니다.</td>
												</tr>
												<tr>
													<td>지역별 공사 대상건수</td>
													<td>시도/시군구/읍면동별 공사건수를 확인할 수 있습니다.<br />※ 차트 클릭 시 시도 → 시군구 → 읍면동 단위로 확대/축소가 가능합니다.</td>
												</tr>
												<tr>
													<td>발주처별 공사건수</td>
													<td>발주처 기관유형(국도관련기관, 지자체) 및 기관별 공사건수를 확인할 수 있습니다.</td>
												</tr>
												<tr>
													<td>시도별 공사현황</td>
													<td>시도별 공사현황을 색상주제도로 확인할 수 있습니다.</td>
												</tr>
												<tr>
													<td>공사종류</td>
													<td>공사종류별 통계를 차트로 확인할 수 있습니다.</td>
												</tr>
												<tr>
													<td>시설종류</td>
													<td>시설종류별 통계를 차트로 확인할 수 있습니다.</td>
												</tr>
												<tr>
													<td>수집현황 통계</td>
													<td>입찰공고 수집추이(일별, 주별, 월별)를 확인할 수 있습니다.</td>
												</tr>
												<tr>
													<td>키워드 분포</td>
													<td>수집된 입찰공고의 키워드별 분포를 확인할 수 있습니다.</td>
												</tr>
												<tr>
													<td>발주금액 분포</td>
													<td>입찰공고 금액대별 분포를 확인할 수 있습니다.</td>
												</tr>
												<tr>
													<td>도로구분별 수집현황</td>
													<td>총공사, 국도공사, 고속도로공사, 지방도 및 기타 공사로 구분하여 수집추이 (일별, 주별, 월별)를 확인할 수 있습니다.</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
						<!-- //.serviceRoadBox -->

						<div class="serviceApiBox">
							<div class="serviceMark"><span>오픈 API 지원</span></div>
							<div class="roadText mt30">
								<p>도로정보의 개방/공유의 일환으로 RCIC 에서 제공하는 Open-API 서비스를</p>
								<p>다른 정보시스템에서 연계·활용할 수 있습니다.</p>
							</div>
							<div class="serviceUse mt20">
								<p>RCIC 오픈 API서비스는 회원을 위한 서비스입니다. 로그인(회원가입) 후 진행해 주시기 바랍니다.</p>
							</div>
							<div class="sUseTxtBox"><p>제공 항목</p></div>
							<div class="apiUseListBox">
								<div class="apiUseList inline">
									<div class="useImg useImg1">
										<div class="useImgTxt">
											<p class="useBold">고속도로 공사현황</p>
											<p class="useSub mt60">전국의 고속도로 공사 현황정보를</p>
											<p class="useSub">제공합니다.</p>
										</div>
									</div>
								</div>
								<div class="apiUseList inline mMr0">
									<div class="useImg useImg2">
										<div class="useImgTxt">
											<p class="useBold">국도 공사현황</p>
											<p class="useSub mt60">전국의 국도 공사 현황정보를</p>
											<p class="useSub">제공합니다.</p>
										</div>
									</div>
								</div>
								<div class="apiUseList inline">
									<div class="useImg useImg3">
										<div class="useImgTxt">
											<p class="useBold">지방도/기타 공사현황</p>
											<p class="useSub mt60">전국의 지방도 및 기타 공사</p>
											<p class="useSub">현황정보를 제공합니다.</p>
										</div>
									</div>
								</div>
								<div class="apiUseList inline mr0">
									<div class="useImg useImg4">
										<div class="useImgTxt">
											<p class="useBold">공사종류 및 시설종류</p>
											<p class="useBold">코드목록</p>
											<p class="useSub mt60">공사현황을 조회하기 위한 공사 및</p>
											<p class="useSub">시설종류 코드를 제공합니다.</p>
										</div>
									</div>
								</div>
							</div>
							<div class="sUseTxtBox"><p>서비스제공</p></div>
							<div class="sUseOrderBox mt50">
									<div class="sUseOrder inline">
										<div class="sOrderTxt"><p>step 01<span>인증 기관 등록</span></p></div>
										<div class="sOrderImg">
											<img src="/assets/images/bg/uOrder1.png" alt="order" class="pOrderImg">
											<img src="/assets/images/bg/muOrder1.png" alt="order" class="mOrderImg">
										</div>
										<div class="sOrderSub"><p>회원가입을 통해 인증기관 등록을 진행 합니다.</p></div>
									</div>
									<div class="sUseOrder inline">
										<div class="sOrderTxt"><p>step 02<span>인증키 발급 신청</span></p></div>
										<div class="sOrderImg">
											<img src="/assets/images/bg/uOrder2.png" alt="order" class="pOrderImg">
											<img src="/assets/images/bg/muOrder2.png" alt="order" class="mOrderImg">
										</div>
										<div class="sOrderSub"><p>로그인 후 데이터제공API 메뉴 중 OpenAPI 탭에서 인증키신청을 합니다.</p></div>
									</div>
									<div class="sUseOrder inline">
										<div class="sOrderTxt"><p>step 03<span>인증키 발급</span></p></div>
										<div class="sOrderImg">
											<img src="/assets/images/bg/uOrder3.png" alt="order" class="pOrderImg">
											<img src="/assets/images/bg/muOrder3.png" alt="order" class="mOrderImg">
										</div>
										<div class="sOrderSub"><p>인증키를 정상적으로 발급 받습니다.</p></div>
									</div>
									<div class="sUseOrder inline">
										<div class="sOrderTxt"><p>step 04<span>서비스 실시</span></p></div>
										<div class="sOrderImg">
											<img src="/assets/images/bg/uOrder4.png" alt="order" class="pOrderImg">
											<img src="/assets/images/bg/muOrder4.png" alt="order" class="mOrderImg">
										</div>
										<div class="sOrderSub"><p>OpenAPI 목록에서 사용하고자 하는 정보를 조회합니다.</p></div>
									</div>
									<div class="sUseOrder inline mr0">
										<div class="sOrderTxt"><p>step 05<span>API 내역관리</span></p></div>
										<div class="sOrderImg">
											<img src="/assets/images/bg/uOrder5.png" alt="order" class="pOrderImg">
											<img src="/assets/images/bg/muOrder5.png" alt="order" class="mOrderImg">
										</div>
										<div class="sOrderSub"><p>API에 대한 인증키 신청 내역을 조회합니다.</p></div>
									</div>
								</div>
						</div>
						<!-- //.serviceApiBox -->
					</div>
				</div>
			</div>
				</div>
				
				
				
				<jsp:include page="/WEB-INF/jsp/views/include/footer.jsp"></jsp:include>
				<!-- //.footer -->
			</div>
		</div>
		<!-- //.container -->
	</body>
</html>