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
						<div class="parallaxBG sns">
							<div class="topBGLeftTxt">
								<p><span>R</span>OAD</p>
								<p><span>C</span>HANGE</p>
								<p><span>I</span>NFO</p>
								<p><span>C</span>OLLECTION</p>
							</div>
							<div class="topBGBtmTxt">
								<p>sns<span>sns소식</span></p>
							</div>
						</div>
					</div>
					
					<div class="pageBox">
						<div class="pageNav">
							<img src="/assets/images/icon/home.png" alt="icon">
							<span class="division">&#8250;</span>
							<span>sns소식</span>
						</div>

						<div class="bConTxtBox">
							<p>도로변경정보 관련 실시간 소식을 접하세요.</p>
						</div>
						<div class="sectionBtm">
							<div class="boardSearchBox">
								<div class="inline wid50 alginLeft bListCntBox">
									<select class="mr10" id="selectKeyword" onchange="Sns.onChangeSnsList();">
										<option value = "0" selected="selected">전체</option>
										<option value = "1">공사</option>
										<option value = "2">도로</option>
									</select>
								</div>
								<div class="inline wid50 alginRight">
									<div class="bSearchForm">
										<input type="text" id="snsKeyword" style="font-size: 14px;" onkeypress="if(event.which == 13){Sns.onChangeSnsList();}">
										<img src="/assets/images/icon/searchIcon.png" alt="icon" onclick="Sns.onChangeSnsList();return false;">
									</div>
								</div>  
							</div>
							<!-- //.boardSearchBox -->
							<div class="goveBox">
								<ul class="goveListBox"></ul>
								<div class="moreBox" onclick="Sns.moreSnsList();return false;"><p>더보기 +</p></div>
							</div>
							<!-- //.goveBox -->
						</div>
					</div>
				</div>
				
				<div id="snsMap" style="display: none"></div>
 
				<jsp:include page="/WEB-INF/jsp/views/include/footer.jsp"></jsp:include>
				<!-- //.footer -->
			</div>
		</div>
		<!-- //.container -->
		<script type="text/javascript"> 
		
			var _commonSearch = new CommonSearch({})
			var _snsMap;
			$( document ).ready(function() {
				Sns.getSnsList();
				
			 _snsMap = new MapInit('snsMap',{   
		            baseMap:'VWorld',
		            baseMapVislble : true, 
		            mapUrl : '${mapUrl}', 
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
		            minZoom:2,       
		            maxZoom:12,     
		            zoom:7, 
		            center:[14197378.96, 4274375.9],
		        });	
				
			});
			
		</script>
	</body>
</html>