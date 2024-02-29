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
	    <meta name="title" content="ROAD CHANGE INFO COLLECTION">
	    <meta name="description" content="">
	    <meta name="keywords" content="">
	    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
	    <!-- meta -->
	    
	    <!-- Open Graph -->
	    <meta property="og:title"       content="ROAD CHANGE INFO COLLECTION" />
	    <meta property="og:type"        content="website" />
	    <meta property="og:image"       content="" />
	    <meta property="og:site_name"   content="ROAD CHANGE INFO COLLECTION" />
	    <meta property="og:url"         content="" />
	    <meta property="og:description" content="" />
	    <!-- Open Graph -->
	
		<title>ROAD CHANGE INFO COLLECTION</title>
		
		<!-- css -->
		<link href="/assets/css/dashboard/common.css" type="text/css" rel="stylesheet" media="all">
		<link href="/assets/css/dashboard/layout.css" type="text/css" rel="stylesheet" media="all">
		
		<!-- js -->
		<script type='text/javascript' src='/assets/js/common/lib/jquery/jquery-3.5.1.min.js'></script>
		<script type='text/javascript' src='/assets/js/common/lib/jquery/jquery.min.js'></script>
		<script type="text/javascript" src="/assets/js/common/lib/jquery/jquery.bxslider.js"></script>
	</head>
	
	<body>
		<div class="sub-wrap">
			<div class="sub-contents">
				<div class="info-wrap">
		            <div class="info-nav">
		                <div class="nav-inner">
		                    <ul>
		                        <li><a href="#none">LX 디지털 SOC 센터</a></li>
		                        <li class="img active"><a href="#none" class="krris">도로대장정보시스템</a></li>
		                        <li class="img"><a href="#none" class="rcic">도로변경정보수집시스템</a></li>
		                        <li><a href="#none">도로정보 플랫폼</a></li>
		                        <li><a href="#none">도로정보 통합맵</a></li>
		                        <li><a href="#none">3 차원 가상도로<br>시뮬레이션</a></li>
		                    </ul>
		                </div>
		                <a href="#none" class="lx"><img src="/assets/images/intro/lx_sub.png" alt="한국국토정보공사"></a>
		            </div>
		            <div class="info-content">
		                <div class="title-area">
		                    <h1>도로변경정보수집시스템</h1>
		                    <div class="btn-area">
		                        <a href="#none" class="btn-vod" style="display:none;">영상보기</a>
		                        <a href="#none" class="btn-link">도로대장정보시스템 바로가기</a>
		                    </div>
		                </div>
		                <div class="detail-area">
		                    <div class="txt-area">
		                        <p>신산업과 기존산업이 윈윈할 수 있는 방법을 찾고 이용자들에게 서비스 향상이라는 혜택을 안겨주는 것이 혁신을 위해 노력하는 사람들의 책무라는 생각이 들었습니다.<br>
					                        마찬가지로 저희 공사가 디지털 SOC센터를 개소하고 ‘도로정보 통합 플랫폼’을 구축하려는 이유도 일맥상통 합니다. <br>
					                        자율주행ㆍ친환경 시대가 우리 앞에 성큰 다가와 있고, 이러한 시대에 걸맞는 미래형 도로관리체계가 매우 필요하기 때문입니다. <br>
					                        현재 우리나라는 고속국도, 일반국도, 지방도, 시·군도 등이 각기 다른 기관에서 각기 다른 방식으로 관리되고 있습니다.  <br>
					                        이로 인해 도로정보의 다양한 융·복합 및 유통을 통한  시너지 창출이 어려운 상황입니다.<br>
					                        이러한 문제들을 해결하기 위해 공공재로서의 다양한 도로정보가 연결되고 실시간으로 갱신되며 서로 호환되는 것이 가장 시급하며이를 통해서 모빌리티 혁명을 위한 토대가 비로소 마련된다고 생각합니다.</p>
		                        <p>이로써 정부는 첨단 ICT 기반하에서 효율적으로 도로를 관리할 수 있고 업계는 자율주행 상용화를 앞당기는 기술 개발과 산업 혁신에 매진할 수 있을 것입니다. <br>
					                        이를 위하여 저희 디지털 SOC센터가 산ㆍ학ㆍ연ㆍ관의 협업을 이끌어 모빌리티 혁신의 연착륙을 유도하는 거점기지가 되도록 최선을 다하겠습니다. <br>
					                        아울러 오늘 컨퍼런스가 도로정보 공유를 위한 선순환의 출발점이 될 수 있도록 여러분들의 고견을 잘 경청하고 다양한 실행계획에 이를 반영하도록 하겠습니다.</p>
		                        <p>감사합니다.</p>
		                    </div>
		                    <div class="img-area">
		                        <!-- <img src="/assets/images/intro/img.jpg" alt="">
		                        <img src="/assets/images/intro/img.jpg" alt=""> -->
		                    </div>
		                </div>
		                <div class="vod-modal">
		                    <div class="flex-wrap">
		                        <div class="vod-inner">
		                            <a href="#" class="btn-close">닫기</a>
		                            <!-- <video poster="/assets/images/intro/poster.jpg">
		                                <source src="/assets/video/intro.mp4" type="video/mp4">
		                            </video> -->
		                            <video id="video01" src="/assets/video/intro.mp4" playsinline controls="true"></video>
		                        </div>
		                    </div>
		                </div>
		            </div>
				</div>
			</div>
		</div>
		<script>
			$(function(){
				$('.nav-inner ul').bxSlider({
					infiniteLoop:false,
					pager: false,
					minSlides:6,
					maxSlides:6,
					moveSlides:1,
					slideWidth: 206,
					slideMargin: 0
				});
				$('.nav-inner ul a').on('click', function(){
					$(this).parent().addClass('active').siblings().removeClass('active');
					if($(this).parent().index() == 0) {
						$('.btn-vod').show();
					} else {
						$('.btn-vod').hide();
					}
				});
				$('.btn-vod').click(function(){
					var height = $('.detail-area').height() - 10;
					$('#video01').attr('style','max-height:'+height+'px');
					$('#video01').get(0).play(); 
					$('.vod-modal').fadeIn();
				});
				$('.vod-modal .btn-close').click(function(){
					$('#video01').get(0).pause(); 
					$('.vod-modal').fadeOut();
				});
			});
		</script>
	</body>
</html>