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
		  <script src="/assets/js/common/lib/amcharts4/core.js"></script>
        <script src="/assets/js/common/lib/amcharts4/charts.js"></script>
        <script src="/assets/js/common/lib/amcharts4/lang/de_DE.js"></script>
        <script src="/assets/js/common/lib/amcharts4/lang/ko_KR.js"></script>
        <script src="/assets/js/common/lib/amcharts4/lang/es_ES.js"></script> 
        <script src="/assets/js/common/lib/amcharts4/themes/animated.js"></script>
        <script src="/assets/js/common/lib/amcharts4/themes/material.js"></script>
        <script src="/assets/js/common/lib/amcharts4/themes/dataviz.js"></script>
		<jsp:include page="/WEB-INF/jsp/views/include/htmlHead.jsp"></jsp:include>
		<script type="text/javascript" src="/assets/js/module/collection/collection.js"></script>
		<style type="text/css">
			.collectionDiv{
				width: 100%;
				height: 500px;
				font-size: 15px;
				padding: 30px;
			}
		
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
						<div class="parallaxBG collection">
							<div class="topBGLeftTxt">
								<p><span>R</span>OAD</p>
								<p><span>C</span>HANGE</p>
								<p><span>I</span>NFO</p>
								<p><span>C</span>OLLECTION</p>
							</div>
							<div class="topBGBtmTxt">
								<p>collection<span>수집현황</span></p>
							</div>
						</div>
					</div>
					<div class="pageBox">
						<div class="pageNav">
							<img src="/assets/images/icon/home.png" alt="icon">
							<span class="division">&#8250;</span>
							<span>수집현황</span>
						</div>
						<div class="wInfoBox">
							<span class="sInfoTit">※나라장터에서 제공하는 입찰공고 API를 통해 수집된 현황을 표출합니다.</span>
						</div>
						<div class="searchBox">
							<div class="optionBox">
								<div class="opLayer">
									<div class="optionBorder">
										<div class="optionDtlBox">
											<div class="inline optionLeft">
												<div class="optionChoice">
													<div class="inline optionTxt"><span>기간 선택</span></div>
													<div class="inline optionSel">
															<input type="button" value="1주일"  name="week" onclick="Corporation.selectPeriod(this);return false;">
															<input type="button" value="1개월" name="1month" onclick="Corporation.selectPeriod(this);return false;">
															<input type="button" value="3개월" class="active" name="3month" onclick="Corporation.selectPeriod(this);return false;">
															<input type="button" value="6개월" name="6month" onclick="Corporation.selectPeriod(this);return false;">  
															<input type="button" value="1년" name="1year" onclick="Corporation.selectPeriod(this);return false;">
															<input type="button" value="2년" name="2year" onclick="Corporation.selectPeriod(this);return false;">
															<input type="button" value="3년" name="3year" onclick="Corporation.selectPeriod(this);return false;">
															<input type="button" value="3년이상" name="3yearafter" onclick="Corporation.selectPeriod(this);return false;">
													</div>
												</div>
											</div>
											<div class="inline optionRight">
												<div class="optionChoice">
													<div class="inline optionTxt"><span>직접 입력</span></div>
													<div class="inline optionSel">
														<span class="dateIcon"><input type="text" class="date" name="fromDt" id="fromDt" readonly="readonly"><i class="datepicker" target="fromDt"></i></span>
														<span class="wave">~</span>
														<span class="dateIcon"><input type="text" class="date" name="toDt" id="toDt" readonly="readonly"><i class="datepicker" target="toDt"></i></span>
													</div>
												</div>
											</div>
										</div>
										<!-- //.optionDtlBox -->
									</div>
									<!-- //.optionBorder -->

									<div class="optionBtnBox">
										<input type="button" value="검색" class="searchBtn" onclick="Collection.setSearchCollection('search');">
										<input type="button" value="조건 초기화" class="resetBtn" onclick="Collection.collResetClickEvt();">
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
										<span class="sMtLine" id="searchRDateText"><span class="gColor">2018년 5월 1일</span> 부터 <span class="gColor">2020년 5월 1일</span></span>
										<span class="block"> 기간의 수집 현황입니다.</span>
										<p class="searchRCnt" id="searchRCnt">검색결과는 <span>총 0,000건</span> 입니다.</p>
									</div>
								</div>
							</div>
						</div>
						<!-- //.searchBox -->

						<div class="listTab">
							<span class="listTabMenu" data-index="1" >
								<img src="/assets/images/icon/icon_list_off.png" alt="icon" data-fileName="icon_list">
								<span>목록보기</span>
							</span>
							<span class="listTabMenu active" data-index="2">
								<img src="/assets/images/icon/icon_chart_on.png" alt="icon" data-fileName="icon_chart">
								<span>통계보기</span>
							</span>
						</div>
						<!-- //.listTab -->

						<div class="sectionBtm">
							<div class="boardListBox tabContetns" id="tabContents1">
								<div class="boardSearchBox">
									<div class="inline wid50 alginLeft bListCntBox">
										<span>진행공사 목록</span>
										<select id="collectionListCnt" onchange="Collection.setSearchCollectionListEvt();">
											<option value="10">10건씩 보기</option>
											<option value="20">20건씩 보기</option>
											<option value="30">30건씩 보기</option>
										</select>
									</div>
									<div class="inline wid50 alginRight">
										<div class="bSearchForm">
											<span>공사명 검색</span>
											<div class="sInputBox">
												<input type="text" name="keyword" id="keyword" onkeypress="if(event.which == 13){Collection.setSearchCollectionListEvt()}" style="font-size: 14px;">
												<img src="/assets/images/icon/searchIcon.png" alt="icon" onclick="Collection.setSearchCollectionListEvt();">
											</div>
										</div>
									</div>
								</div>
								<div class="boardTblList">
									<table id="collectionListTable">
										<colgroup>
											<col width="3%" />
											<col width="10%" />
											<col width="12%" />
											<col width="*" /> 
											<col width="25%" />
											<col width="5%" />
											<col width="10%" />  
										</colgroup>
										<thead>
											<tr>
												<th>No.</th>
												<th>공고번호</th>
												<th>공고일시</th>
												<th>공고명</th>
												<th>기관명</th>
												<th>공고종류</th>
												<th>수집키워드</th>
											</tr>
										</thead>
										<tbody name="collectionListTbody">
										</tbody>
									</table>
								</div>
								<nav aria-label="page navigation" id="collectionNav">
									<ul class="pagination" id="collectionPagination" style="justify-content: center; margin-top: 20px;"></ul>
								</nav>
							</div>
							<!-- //.boardListBox -->

							<div class="chartBox tabContetns" id="tabContents2">
								<div class="chart lineChart">
									<div class="chartTitleBox">
										<p class="chartTitle inline">수집현황 통계</p>
										<img src="/assets/images/icon/excl_mark.png" alt="mark" class="exclMark" data-title="입찰공고 수집추이(일별, 주별, 월별)을 확인할 수 있습니다.">
										<div class="dateBtnBox topDateBtn" id="topDate">
											<img src="/assets/images/button/btn_day_off.png" onclick="_rcicCollectChart.createChart1Data('stdr_dt');" data-fileName="btn_day" alt="dateButton">
											<img src="/assets/images/button/btn_week_on.png" onclick="_rcicCollectChart.createChart1Data('stdr_week');" data-fileName="btn_week" alt="dateButton">
											<img src="/assets/images/button/btn_month_off.png" onclick="_rcicCollectChart.createChart1Data('stdr_yyyymm');" data-fileName="btn_month" alt="dateButton">
										</div>
									</div>
									<div id="collectionDiv1" class="collectionDiv"></div>
								</div>
								<!-- //.lineChart -->
								
								<div class="chart lineChart mt15">
									<div class="chartTitleBox">
										<p class="chartTitle inline">발주금액 분포</p>
										<img src="/assets/images/icon/excl_mark.png" alt="mark" class="exclMark" data-title="입찰공고 금액대별 분포를 확인할 수 있습니다.">
									</div>
									<div id="collectionDiv3" class="collectionDiv"></div> 
								</div>
								
								<!-- <div class="chart lineChart mt15">
									<div class="chartTitleBox">
										<p class="chartTitle inline">도로구분별 수집현황</p>
										<img src="/assets/images/icon/excl_mark.png" alt="mark" class="exclMark" data-title="총공사, 국도공사, 고속도로공사, 지방도 및 기타 공사로 구분하여 수집추이(일별, 주별, 월별)를 확인할 수 있습니다.">
										<div class="dateBtnBox btmDateBtn">
											<img src="/assets/images/button/btn_day_off.png" onclick="_rcicCollectChart.createChart4Data('stdr_dt');" data-fileName="btn_day" alt="dateButton">
											<img src="/assets/images/button/btn_week_on.png" onclick="_rcicCollectChart.createChart4Data('stdr_week');" data-fileName="btn_week" alt="dateButton">
											<img src="/assets/images/button/btn_month_off.png" onclick="_rcicCollectChart.createChart4Data('stdr_yyyymm');" data-fileName="btn_month" alt="dateButton">
										</div>
									</div>
									<div id="collectionDiv4" class="collectionDiv"></div>   
								</div> -->
								
								<div class="chart lineChart mt15">
									<div class="chartTitleBox">
										<p class="chartTitle inline">키워드 분포</p>
										<img src="/assets/images/icon/excl_mark.png" alt="mark" class="exclMark" data-title="입찰공고 키워드별 분포를 확인할 수 있습니다.">
									</div>
									<div  id="collectionDiv2" class="collectionDiv"></div>
								</div>
								
								
								<div class="chart lineChart mt15">
									<div class="chartTitleBox">
										<p class="chartTitle inline">키워드 분포 건수</p>
										<img src="/assets/images/icon/excl_mark.png" alt="mark" class="exclMark" data-title="입찰공고 키워드별 건수 확인할 수 있습니다.">
									</div>
									<div  id="collectionDiv" class="collectionDiv" style="height: 650px;">
										<div id="collectionScroll" style="width: 100%;height: 100%;overflow: auto;">
											<table class="table"> 
												<thead id="keywordCntThead">
												  <tr class="table-active" style="background-color:#DADADA;">
										            <th>No</th>
										            <th>키워드</th>
										            <th>건수</th>
										         </tr>
												<thead>
												<tbody id="keywordCntTbody"></tbody>
											</table>
											<nav aria-label="page navigation" id="keywordNav">
												<ul class="pagination" id="keywordPagination" style="justify-content: center; margin-top: 20px;"></ul>
											</nav>
										</div>
									</div>
								</div>
								
								<!-- //.lineChart -->
							</div>
							<!-- //.chartBox -->
						</div>
					</div>
				</div>

			</div>
		</div>
		<!-- //.container -->
		
		<div class="popupWrap collectWrap">
			<div class="popupBox">
				<div class="popup">
					<div class="popupContents collect">
						<div class="popupBody">
							<div class="closeBox collectClose"><img src="/assets/images/popup/closeBtn.png" alt="closeButton"></div>
							<div class="popupLogo">
								<img src="/assets/images/popup/popupLogo.png" alt="popupLogo">
							</div>
							<form id="detailForm" name="detailForm" method="post"> 
							<div class="collectTop">
								<h2 class="popupTitle" id="popupTitle"></h2><br>
								<a href="" target="_blank" class="openBidding" id="moveUrl">입찰공고 보기 (새창)</a>
							</div>
							<div class="collectInfo">
								<div class="biddAnno mt10">
									<p class="collectTit">공고일반</p>
									<table class="mt10">
										<colgroup>
			                                 <col width="20%">
			                                 <col width="30%">
			                                 <col width="20%">
			                                 <col width="30%">
		                              	</colgroup>
										<tr>
											<td>입찰공고번호</td>
											<td><input type="text" name="bidntceno" value="" readonly="readonly" style="width:100%; text-overflow: ellipsis;" ></td>
											<td>입찰공고차수</td>
											<td><input type="text" name="bidntceord" value="" readonly="readonly" style="width:100%;"></td>
										</tr>
										<tr>
											<td>참조번호</td>
											<td><input type="text" name="refno" value="" readonly="readonly" style="width:100%; text-overflow: ellipsis;" ></td>
											<td>입찰공고일시</td>
											<td><input type="text" name="bidntcedt" value="" readonly="readonly" style="width:100%;"></td>
										</tr>
										<tr>
											<td>공고기관명</td>
											<td><input type="text" name="ntceinsttnm" value="" readonly="readonly" style="width:100%; text-overflow: ellipsis;"></td>
											<td>수요기관명</td>
											<td><input type="text" name="dminsttnm" value="" readonly="readonly" style="width:100%; text-overflow: ellipsis;"></td>
										</tr>
										<tr>
											<td>입찰방식</td>
											<td><input type="text" name="bidmethdnm" value="" readonly="readonly" style="width:100%; text-overflow: ellipsis;"></td>
											<td>낙찰방법</td>
											<td><input type="text" name="sucsfbidmthdnm" value="" readonly="readonly" style="width:100%; text-overflow: ellipsis;"></td>
										</tr>
										<tr>
											<td>계약방법</td>
											<td><input type="text" name="cntrctcnclsmthdnm" value="" readonly="readonly" style="width:100%; text-overflow: ellipsis;"></td>
											<td>국제입찰구분</td>
											<td><input type="text" name="intrbidyn" value="" readonly="readonly" style="width:100%;"></td>
										</tr>
										<tr>
											<td>재입찰</td>
											<td><input type="text" name="rbidopengdt" value="" readonly="readonly" style="width:100%;"></td>
											<td>발주계획번호</td>
											<td><input type="text" name="orderplanuntyno" value="" readonly="readonly" style="width:100%; text-overflow: ellipsis;"></td>
										</tr>
										<tr>
											<td>공사현장</td>
											<td><input type="text" name="cnstrtsitergnnm" value="" readonly="readonly" style="width:100%; text-overflow: ellipsis;"></td>
											<td>입찰자격</td>
											<td><input type="text" name="" value="" readonly="readonly" style="width:100%;"></td>
										</tr>
										<tr>
											<td>관련공고</td>
											<td><input type="text" name="refno" value="" readonly="readonly" style="width:100%;"></td>
											<td>공고상태</td>
											<td><input type="text" name="ntcekindnm" value="" readonly="readonly" style="width:100%;"></td>
										</tr>
									</table>
								</div>
								<div class="biddIng mt10">
									<p class="collectTit">입찰진행</p>
									<table class="mt10">
										<colgroup>
			                                 <col width="20%">
			                                 <col width="30%">
			                                 <col width="20%">
			                                 <col width="30%">
		                              	</colgroup>
										<tr>
											<td>입찰개시일시</td>
											<td><input type="text" name="bidbegindt" value="" readonly="readonly" style="width:100%;"></td>
											<td>입찰종료일시</td>
											<td><input type="text" name="bidclsedt" value="" readonly="readonly" style="width:100%;"></td>
										</tr>
										<tr>
											<td>개찰일시</td>
											<td><input type="text" name="opengdt" value="" readonly="readonly" style="width:100%;"></td>
											<td>개찰장소</td>
											<td><input type="text" name="opengplce" value="" readonly="readonly" style="width:100%; text-overflow: ellipsis;"></td>
										</tr>
									</table>
								</div>
								<div class="biddPrice mt10">
									<p class="collectTit">입찰금액 정보</p>
									<table class="mt10">
										<colgroup>
			                                 <col width="20%">
			                                 <col width="30%">
			                                 <col width="20%">
			                                 <col width="30%">
		                              	</colgroup>
										<tr>
											<td>예가방법</td>
											<td><input type="text" name="prearngprcedcsnmthdnm" value="" readonly="readonly" style="width:100%;"></td>
											<td>추첨예가건수<br />총예가건수</td>
											<td>
												<input type="text" name="drwtprdprcnum" value="" readonly="readonly" style="float: left;"><br />
												<input type="text" name="totprdprcnum" value="" readonly="readonly" style="float: left;">
											</td>
										</tr>
										<tr>
											<td>추정금액</td>
											<td><input type="text" name="asignbdgtamt" value="" readonly="readonly" style="width:100%;"></td>
											<td>추정가격</td>
											<td><input type="text" name="presmptprce" value="" readonly="readonly" style="width:100%;"></td>
										</tr>
									</table>
								</div>
							</div>

							<div class="collectBtm mt20">
								<p id="moveUrlDelLink">※ 	 입찰공고 첨부파일은 <a href="" target="_blank" id="">입찰공고보기(새창)</a>를 통해 확인해주시기 바랍니다.</p>
							</div>
							</form>
						</div>
					</div>
					<!-- //.popupContents -->
				</div>
				<!-- //.popup -->
			</div>
			<!-- //.popupBox -->
		</div>
		
		<div class="countTooltip"><div class="tipArrow"><p>입찰공고가 국도에 해당되는 것으로 분석된 공사수</p></div></div>
		
		<script type="text/javascript">
		
		$( document ).ready(function() {
			
			 $.selPeriod('3month','fromDt','toDt');
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
			 
			Collection.setSearchCollectionListEvt();
			Collection.setSearchCollectionCountEvt();
			Collection.keywordCntList();
			
			 var $tr = $('#collectionDiv').find('thead tr');
			   $('#collectionScroll').on('scroll', function() {
			      //console.log("aaaa");
			      $tr.css('transform', 'translateY('+ this.scrollTop +'px)');
			   });
			   
			$("#tabContents1").css("display","none");
			$("#tabContents2").css("display","block");

		});
		
		$(".collectClose").on("click", function(){
			$(".collectWrap").fadeOut("fast");
		});
		
		var _commonSearch = new CommonSearch({})
		
		$(".shBox").on("click", function(){
			if($(this).hasClass("close")){
				$(".opLayer").slideDown("fast"); 
				$(this).removeClass("close");
				$(this).children("img").removeClass("open");
			}else{
				$(".opLayer").slideUp("fast"); 
				$(this).addClass("close");
				$(this).css('opacity', '100%')
				$(this).children("img").addClass("open");
			}
		});
		
		$(".listTabMenu").on("click", function(){
			$("#keyword").val("");
			Collection.setSearchCollectionListEvt();
			
			var index = $(this).data("index");			
			
			if(index == 1 && $('#userSeq').val() == null){
				$.swal("목록보기는 로그인 후 이용할 수 있습니다.");
				return;
			};			
			
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

			$(".tabContetns").hide();
			$("#tabContents"+index).show();
			
			if($(".listTabMenu").hasClass("active")){
				if($(this).attr("data-index") == "2"){
					Collection.setSearchCollectionCountEvt();
					Collection.keywordCntList();
					//location.reload();
				}else{
					Collection.setSearchCollectionListEvt();
				}
			};
			
			/*
			if($(".listTabMenu").hasClass("active")){
				if($(this).attr("data-index") == "1"){
					Collection.setSearchCollectionListEvt();
				}else{
					Collection.setSearchCollectionCountEvt();
					Collection.keywordCntList();
				}
			};
			*/
			
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
		
		$('.dateIcon').on("click", function(){
			$('.optionSel input').removeClass("active"); 
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