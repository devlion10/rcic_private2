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
				<div class="headerWrap">
					<jsp:include page="/WEB-INF/jsp/views/include/header.jsp"></jsp:include>
				</div>
				<!-- //.headerWrap -->

				<div class="contentsBox">
					<div class="parallaxBox">
						<div class="parallaxBG board">
							<div class="topBGLeftTxt">
								<p><span>R</span>OAD</p>
								<p><span>C</span>HANGE</p>
								<p><span>I</span>NFO</p>
								<p><span>C</span>OLLECTION</p>
							</div>
							<div class="topBGBtmTxt">
								<p>notice<span>게시판</span></p>
							</div>
						</div>
					</div>
					<div class="pageBox">
						<div class="pageNav">
							<img src="/assets/images/icon/home.png" alt="icon">
							<span class="division">&#8250;</span>
							<span>게시판</span>
							<span class="division">&#8250;</span>
							<span class="siteName">공지사항</span>
						</div>

						<div class="listTab boardTab">
							<span class="listTabMenu active" data-index="1" onclick="Board.listTabMenu(this); return false;">   
								<img src="/assets/images/icon/icon_notice_on.png" alt="icon" data-fileName="icon_notice">
								<span>공지사항</span>
							</span>
							<span class="listTabMenu" data-index="2" onclick="Board.listTabMenu(this); return false;">
								<img src="/assets/images/icon/icon_faq_off.png" alt="icon" data-fileName="icon_faq">
								<span>FAQ</span>
							</span>
							<span class="listTabMenu" data-index="3" onclick="Board.listTabMenu(this); return false;">
								<img src="/assets/images/icon/icon_question_off.png" alt="icon" data-fileName="icon_question">
								<span>1:1질문</span> 
							</span>
						</div>
						<!-- //.listTab -->

						<div class="bConTxtBox">
							<p>도로변경정보 수집시스템에서 전달하는 <span>공지, 뉴스</span>를 만나보세요.</p>
						</div>

						<div class="sectionBtm">
							<div class="boardListBox">
								<div class="boardUlList">
									<div id="tabContents1" class="tabContetns">
										<div class="bListBox">
											<div class="boardSearchBox">
												<div class="inline wid50 alginLeft bListCntBox">
													<span>전체게시물<span id="totalCnt"></span></span>
												</div>
												<div class="inline wid50 alginRight">
													<div class="bSearchForm">
														<input type="text" name="keyword" id="keyword" style="font-size: 14px;" onkeypress="if(event.which == 13){Board.getNoticeList()}">
														<img src="/assets/images/icon/searchIcon.png" alt="icon" onclick="Board.getNoticeList();">
													</div>
												</div>
											</div>

											<ul class="boardList" id="noticeList"></ul>	
											
											<nav aria-label="page navigation" id="noticeNav">
												<ul class="pagination" id="noticePagination" style="justify-content: center; margin-top: 20px;"></ul>
											</nav>
										</div>

										 <div class="viewBox" id="noticeDtlView" style="display: none;">
											<div class="bViewTop">
												<div class="inline bType">
													<span class="notice" id="noticeTy"></span>
												</div>
												<div class="inline bTD">
													<p id="sj"></p>
													<p id ="registDt"></p>
												</div>
												<div class="inline bWH">
													<div class="inline bWriter"><span>작성자</span><span id="registId"></span></div>
													<div class="inline bHit"><span>조회수</span><span id="rdcnt"></span></div>
												</div>
											</div>
											<div class="viewContents">
												<div class="viewContext" id="cn" style="font-size: 12px;">
												</div>
												<div class="viewDownBox" id="attachFileBox">
													<%--<a href="javascript:void(0);">첨부파일 이미지명 영역.pdf</a>--%>
												</div>
											</div>
											<div class="npListBox">
												<div class="npInfo tBoder">
													<div class="inline pnTxt"><p>윗글</p></div>
													<div class="inline pnImg"><img src="/assets/images/icon/top_arrow.png" alt="arrow"></div>
													<div class="inline pnTitle" style="cursor: pointer;"><p id="nextSj" onclick="Board.sjClickEvn(this); return false;"></p></div>
													<input type="hidden" id="nextNo">
							 					</div>
												<div class="npInfo">
													<div class="inline pnTxt"><p>아랫글</p></div>
													<div class="inline pnImg"><img src="/assets/images/icon/btm_arrow.png" alt="arrow"></div>
													<div class="inline pnTitle" style="cursor: pointer;"><p id ="preSj" onclick="Board.sjClickEvn(this); return false;"></p></div>
													<input type="hidden" id="preNo">
												</div>
											</div>
											<div class="listBtnBox">
												<input type="button" value="목록"  id="noticeListBtn" onclick="Board.noticeListBtn();">
											</div>
										</div> 
									</div>

									<!-- FAQ -->
									<div id="tabContents2" class="tabContetns">
									
										<div class="faqTabCateBox">
											<div class="inline faqTab active" onclick="Board.faqTabClivkEvn(this);return false;">
												<p class="cateTabTitle">전체</p>
												<p class="cateTabCount" id="faqTotalCnt"></p>
											</div> 
										</div>
									
										<!-- //.boardSearchBox  -->
										<div class="mt30"> 
											<ul class="bFaqBox" id="faqList"></ul>
										</div>
										<div class="moreBox" style="display:none;" onclick="Board.moreFaqList();"><p>더보기 +</p></div>
									</div>

									<div id="tabContents3" class="tabContetns">
										<div class="customerBox" style="font-size: 14px;">
											<div class="customerIn">
												<p class="customTitle">분류</p>
												<select class="mt10" name="qestnTy">
													<option value="0">질의의 분류를 선택하세요.</option>
												</select>
											</div>
											<div class="customerIn">
												<p class="customTitle">제목</p>
												<input type="text" id="qestnSj" placeholder="제목을 입력하세요." class="mt10">
											</div>
											<div class="customerIn">
												<p class="customTitle">내용</p>
												<textarea class="mt10" id="qestnCn" placeholder=""></textarea>
											</div>
											<div class="customBtnBox">
												<input type="button" value="확인" class="enter" onclick="Board.insertQuestion();return false;">
												<input type="button" value="취소" class="cancle">
											</div>
										</div>
									</div>
								</div>
							</div>
							<!-- //.boardListBox -->
						</div>
						<!-- //.sectionBtm -->
					</div>
				</div>
				
				<input type = "hidden" id="faqValue" value="N">
				<input type = "hidden" id="queValue" value="N">
				

				<jsp:include page="/WEB-INF/jsp/views/include/footer.jsp"></jsp:include>
				<!-- //.footer -->
			</div>
		</div>
		<!-- //.container -->

		<script type="text/javascript">
			var placeholder = '내용을 입력하세요.\n불건전한 내용 및 광고성 게시글은 사전통보 없이 삭제될 수 있습니다.';
			$('#qestnCn').attr('placeholder', placeholder);
			
			var boardType = '${type}';
		    var noticeNo =  '${noticeNo}';
		    
			$( document ).ready(function() {
				Board.getNoticeList();
				Board.getQuestionType();
				Board.getFaqType(); 
				
				if(boardType == 'F'){ 
					 $('.listTabMenu[data-index="2"]').trigger("click");
				}else if(boardType == 'Q'){    
					 $('.listTabMenu[data-index="3"]').trigger("click");
				}
				
				if(!$.isNullString(noticeNo)){
					Board.noticeDetail(noticeNo);
				}				
				
			});
			
		</script>
	</body>
</html>