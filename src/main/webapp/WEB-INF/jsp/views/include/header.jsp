<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@page import="org.springframework.security.core.Authentication"%>
<%@page import="org.springframework.security.core.context.SecurityContextHolder"%>
<%@page import="java.net.URLEncoder"%>
<%@ page import="java.net.URLDecoder"%>
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
  System.out.println(clientIp);
  
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
<style>
 .amcharts-amexport-menu-level-1{
			display:-webkit-inline-box !important;
		 } 
		
</style>
<jsp:include page="/WEB-INF/jsp/views/include/htmlHead.jsp"></jsp:include>
<div class="headerWrap">
	<div class="hBorder">
		<div class="signBtnBox">
		<%  if(userName.equals("anonymousUser")){%>
	      <input type="button" id ="signBtn" name="signBtn" class="headerOnBtn signBtn" value="회원가입" onclick="MainInfo.btnClickEvent(this);return false;">
	      <input type="button" id="loginBtn" name="loginBtn" class="headerOnBtn loginBtn" value="로그인"  onclick="MainInfo.btnClickEvent(this);return false;">
	    <%}else{ %>
	      <span class="onUserInfoTxt">${userInfo.instt_se_nm}<span class="onUserName">${userInfo.user_nm}</span>님 환영합니다.</span>
	      <input type="button" name="myBtn" class="onUserBtn myBtn" value="마이페이지" onclick="MainInfo.movePage('mypage');return false;"> 
	      <input type="button" id="logoutBtn" name="logoutBtn" class="headerOnBtn loginBtn" value="로그아웃"   onclick="Login.logout();return false;">
		  <input type="hidden" id="userSeq" name="userSeq" value="${userInfo.user_seq}" >
		  <input type="hidden" id="userInfoPwd" name="userInfoPwd" value="${userInfo.password}" >
		  <input type="hidden" id="authNo" name="authNo" value="${userInfo.auth_no}" >
	    <%}%> 
		</div>
		<div class="headMenu">
			<div class="logoBox inline">
				<a href="/rcic/public_main"><span>RCIC</span></a>
			</div>
			<div class="menuBox inline">
				<ul class="inline mr40">
		      	  <li><a name="about" href="#" onclick="MainInfo.movePage('about');return false;">RCIC소개</a></li>
		      	  <li><a name="corporation"  href="#" onclick="MainInfo.movePage('corporation');return false;">공사현황</a></li>
		          <li><a name="collection" href="#" onclick="MainInfo.movePage('collection');return false;">수집현황</a></li>
		          <li><a name="dataApi" href="#" onclick="MainInfo.movePage('dataApi');return false;">데이터제공API</a></li> 
		          <li><a name="initiationReport" href="#" onclick="MainInfo.movePage('initiationReport');return false;">착수신고현황</a></li>
		          <li><a name="board" href="#" onclick="MainInfo.movePage('board');return false;">게시판</a></li>
		          <c:if test="${userInfo.auth_no == '1' }">
		      	  <li><a name="sns" href="#" onclick="MainInfo.movePage('sns');return false;">SNS소식</a></li>
		      	  </c:if>
		        </ul>
				<div class="inline">
					<input type="button" id="execBtn" class="execBtn" value="RCIC 지도" onclick="$.chekPop();"/>
				</div>
			</div>
			<div class="mMenuBox" onclick="MainInfo.btnClickEvent(this);return false;">
				<img src="/assets/images/icon/icon_hamburger.png" alt="menuIcon">
			</div>
		</div>
	</div>
	
	
	<!-- 모바일용 -->
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
					<div class="inline wid30 alginRight"><img src="/assets/images/button/wCloseBtn.png" alt="closeButton" class="navClose" onclick="MainInfo.btnClickEvent(this);return false;"></div>
				</div>
				<div class="mNavUser">
					<div class="mNavUserCell">
						<!-- 로그인 전 -->
						<%  if(userName.equals("anonymousUser")){%>
						<input type="button" value="회원가입" name="signBtn" class="mr10 signBtn" onclick="MainInfo.btnClickEvent(this);return false;">
						<input type="button" value="로그인"  name="loginBtn" onclick="MainInfo.btnClickEvent(this);return false;">
						<%}else{ %>
						<!-- 로그인 후 -->
						<span class="navUserInfoTxt">${userInfo.instt_se_nm}<span class="navUserName">${userInfo.user_nm}</span>님 환영합니다.</span>
						<%}%> 
					</div>
				</div>
			</div>
			<div class="mNavPage">
				<ul>
				  <li><a name="about" href="#" onclick="MainInfo.movePage('about');return false;">RCIC소개</a></li>
		      	  <li><a name="corporation"  href="#" onclick="MainInfo.movePage('corporation');return false;">공사현황</a></li>
		          <li><a name="collection" href="#" onclick="MainInfo.movePage('collection');return false;">수집현황</a></li>
		          <li><a name="dataApi" href="#" onclick="MainInfo.movePage('dataApi');return false;">데이터제공API</a></li> 
		          <li><a name="board" href="#" onclick="MainInfo.movePage('board');return false;">게시판</a></li>
		          <c:if test="${userInfo.auth_no == '1' }">
		      	  <li><a name="sns" href="#" onclick="MainInfo.movePage('sns');return false;">SNS소식</a></li>
		      	  </c:if>
		      	  <%  if(userName.equals("anonymousUser")){%>
					<%}else{ %>
						<li><a name="mypage" href="#" onclick="MainInfo.movePage('mypage');return false;">마이페이지</a></li>
					<%}%>
		      	  
				</ul>
				<div class="mNavBtnBox">
					<input type="button" value="RCIC 지도" onclick="$.chekPop();">
					<%  if(userName.equals("anonymousUser")){%>
					<%}else{ %>
						<input type="button" value="로그아웃"  name="logoutBtn" onclick="Login.logout();return false;">
					<%}%> 
				</div>
			</div>
			<div class="mNavFoot">
				<div class="mNavFootCell">
					<div class="navFootTop"><span class="mr20">이용약관</span><span>개인정보처리방침</span></div>
					<div class="navFootBtm mt5">
						<p>54870 전라북도 전주시 덕진구 기지로 120 (중동)</p>
						<p>대표전화 : 063-713-1000</p>
						<p>바로처리 콜센터 : <span>1588-7704</span></p>
						<p class="mt10">COPYRIGHT(C) LX, ALL RIGHTS RESERVED.</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<form action="/rcic/login/logout" method="post" id="logoutForm" style="display: none"></form>

<div class="popupWrap loginWrap">
  <div class="popupBox">
    <div class="popup">
      <div class="popupContents login">
        <div class="popupLogo">
          <img src="/assets/images/popup/popupLogo.png" alt="popupLogo">
        </div>
        <div class="popupBody">
          <div class="closeBox loginClose" id="loginClose" onclick="MainInfo.btnClickEvent(this);return false;"><img src="/assets/images/popup/closeBtn.png" alt="closeButton"></div>
          <div class="popupTxtBox">
            <p>LOGIN</p>
            <p>일반인은 로그인할 수 없습니다.</p>
            <p>기관사용자 중 회원가입을 한 유저만 로그인 가능합니다.</p>
          </div>
          <div class="popupInputBox">
              <div class="popupInput">
              	 <form id="userLoginForm" method="post" autocomplete="off" onsubmit="return;false;">
	                <input type="text" id="userId" name="userId" placeholder="아이디를 입력하세요." >
	                <input type="password" id="password" name="password" placeholder="비밀번호를 입력하세요." onkeypress="if(event.which == 13){Login.btnUserLogin();return false;}" autocomplete="off">
	                <input type="button" value="로그인" id="btnUserLogin" onclick="Login.btnUserLogin();return false;" >
                </form>
              </div>
            <div class="rememChkBox font0">
              <div class="inline wid50 alginLeft">
                <input type="checkbox" name="saved_username" id="saved_username" >
                <label for="saved_username">아이디 기억하기</label>
              </div>
              <div class="inline wid50 alginRight">
                <div class="searchUserBtnBox" id ="searchIdPw" onclick="MainInfo.btnClickEvent(this);return false;">
                  <span>아이디/비밀번호 찾기</span>
                </div>
              </div>
            </div>
            <div class="popupBottom">
              <input type="button" value="회원가입" name="signBtn" onclick="MainInfo.btnClickEvent(this);return false;">
              <p>로그인 관련문의 02-000-0000</p>
            </div>
          </div>
        </div>
      </div>
      <!-- //.popupContents -->
    </div>
    <!-- //.popup -->
  </div>
  <!-- //.popupBox -->
</div>
<!-- //.loginWrap -->


<div class="popupWrap signWrap">
  <div class="popupBox">
    <div class="popup">
      <div class="popupContents sign">
        <div class="popupBody">
          <div class="closeBox signClose" id="signClose" onclick="MainInfo.btnClickEvent(this);return false;"><img src="/assets/images/popup/closeBtn.png" alt="closeButton"></div>
          <div class="popupLogo">
            <img src="/assets/images/popup/popupLogo.png" alt="popupLogo">
          </div>
          <h2 class="popupTitle">회원가입</h2>
          <div class="popupAgree">
            <div class="agreeBox">
              <div class="areaTitle alginLeft"><span>step01. 약관동의</span></div>
              <div class="agreeChkBox">
                <div class="inline wid50 alginLeft">
                  <span class="termsTxt">이용약관</span>
                  <a href="#" name="agreeDetail" onclick="MainInfo.btnClickEvent(this);return false;"><img src="/assets/images/popup/dtlBtn.png" alt="detail"></a>
                </div>
                <div class="inline wid50 alginRight">
                  <span class="agreeTxt">동의 <span class="mustTxt">(필수)</span></span>
                  <input type="checkbox" id="agreeChk" name="agreeChk">
                  <label for="agreeChk"></label>
                </div>
              </div>
            </div>
          </div>
          <!-- //.popupAgree -->

          <div class="formBox">
            <div class="areaTitle alginLeft"><span>step02. 정보입력</span><span>모든 항목은 필수 입력 항목 입니다.</span></div>
            <div class="signForm">
              <form>
                <table>
                  <colgroup>
                    <col style="width:15%"/>
                    <col style="width:50%"/>
                    <col style="width:35%"/>
                  </colgroup>
                  <tr>
                    <th>아이디</th>
                    <td><input type="text" id="joinUserId" name="joinUserId" placeholder="아이디는 이메일 형식입니다.">
                    	<input type="hidden" id="idCheckYn" value="N"></td>
                    <td><input type="button" value="중복확인" class="overlap" id="btnIdCheck" onclick="Join.btnIdCheck(); return false;"></td>
                  </tr>
                  <tr>
                    <th>비밀번호</th>
                    <td><input type="password" id="pwd" name="pwd" placeholder="비밀번호를 입력하세요." autocomplete="off"></td> 
                    <td><p class="warning">영문, 숫자, 특수기호 포함 8~15자리 이내로 입력하세요.</p></td>
                  </tr>
                  <tr>
                    <th>비밀번호 확인</th>
                    <td colspan="2"><input type="password" id="rePwd" name="rePwd" placeholder="비밀번호를 한번 더 입력하세요." autocomplete="off"></td>
                  </tr>
                  <tr>
                    <th>기관명</th>
                    <td colspan="2"><input type="text" id="insttNm" name="insttNm" placeholder="기관명을 입력하세요." autocomplete="off"></td>
                  </tr>
                  <tr>
                    <th>기관/조직</th>
                    <td colspan="2">
                      <select id="insttSe" name="insttSe">
                        <option value="">기관/조직 구분 선택</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th>이름</th>
                    <td colspan="2"><input type="text" id="userNm" name="userNm" placeholder="이름을 입력하세요."></td>
                  </tr>
                  <tr>
                    <th>휴대폰</th>
                    <td colspan="2"><input type="text" id="contactTelno" name="contactTelno" placeholder="“-” 없이 숫자만 입력하세요."  onkeydown="return inputOnlyNum(event);"></td>
                  </tr>
                  <tr>
                    <th>접속 IP 주소</th>
                    <td colspan="2">
                    	<!-- 
                    	<input type="text" id="conectIp" name="conectIp" value="<%=clientIp%>" readonly="readonly" style="border: none;">
                    	 -->
                    	<input type="text" id="conectIp" name="conectIp" value="183.97.173.69" readonly="readonly" style="border: none;">
                    </td>
                  </tr>
                </table>
              </form>
            </div> 
            <!-- //.signForm -->
            
            <div class="popBtnBox">
              <input type="button" value="가입하기" class="gBasicBtn joinBtn" id="btnJoin" onclick="Join.btnJoin(); return false;">
              <input type="button" value="취소" class="cancleBtn" onclick="MainInfo.btnClickEvent(this);return false;">
            </div>
          </div>
          <!-- //.formBox -->
        </div>
      </div>
      <!-- //.popupContents -->
    </div>
    <!-- //.popup -->
  </div>
  <!-- //.popupBox -->
</div>


  <div class="popupWrap userSearchWrap">
    <div class="popupBox">
      <div class="popup">
        <div class="popupContents search">
          <div class="popupBody">
            <div class="closeBox searchClose" id="searchClose" onclick="MainInfo.btnClickEvent(this);return false;">
              <img src="/assets/images/popup/closeBtn.png" alt="closeButton">
            </div>
            <div class="popupLogo">
              <img src="/assets/images/popup/popupLogo.png" alt="popupLogo">
            </div>
            <h2 class="popupTitle">아이디 / 비밀번호 찾기</h2>
            <div class="searchTabBox">
              <div class="searchTab">
                <span class="searchTabMenu active" data-index="1" onclick="Login.searchTabMenu(this); return false;">아이디찾기</span> 
                <span class="searchTabMenu" data-index="2" onclick="Login.searchTabMenu(this); return false;">비밀번호 찾기</span>
              </div>
            </div>
            <div class="searchForm">
              <div class="searchBoder">
                <div class="formInputBox">
                  <div class="searchPWIn">
                    <p>아이디</p>
                    <input type="text" name="searchID" id="searchID" placeholder="아이디는 이메일 형식입니다.">
                  </div>
                  <div class="searchIDPWIn">
                    <p>이름</p>
                    <input type="text" name="searchName" id="searchName" placeholder="이름을 입력하세요.">
                  </div>
                  <div class="searchIDIn">
                    <p>휴대폰</p>
                    <input type="text" name="searchPhone" id="searchPhone" placeholder="“-” 없이 숫자만 입력하세요." onkeydown="return inputOnlyNum(event);">
                  </div>
                  <div class="searchPWIn">
                    <p>기관명</p>
                    <input type="text" name="searchAgency" id="searchAgency" placeholder="기관명 입력하세요.">
                  </div>
                </div>
                <div class="popBtnBox">
                  <input type="button" value="검색" class="gBasicBtn searchBtn" onclick="Login.searchIdPw(this);return false;">
                  <input type="button" value="취소" class="cancleBtn" onclick="MainInfo.btnClickEvent(this);return false;">
                </div>
              </div>
            </div>
            <div class="searchResultBox">
              <div class="searchResult">
                <p class="sBasicTxt">정보 입력 후 검색버튼을 클릭하세요.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- 가입완료 메세지 -->
  <div class="popupWrap signCompWrap">
		<div class="popupBox">
			<div class="popup">
				<div class="popupContents completeBox">
					<div class="popupTxt">
						<p>회원가입 신청완료</p>
						<div class="compCloseBox" onclick="MainInfo.btnClickEvent(this); return false;"><img src="/assets/images/popup/closeBtn.png" alt="closeButton"></div>
					</div>
					<div class="popupBodyCom">
						<div class="compTxtBox">
							<p class="compGTxt">RCIC에 가입해 주셔서 감사합니다.</p>
							<div class="rsComp">
								<p class="compBTxt">입력하신 이메일로 가입완료 메일이 발송되었습니다.</p>
								<p class="compBTxt">메일을 확인하시고 link를 통해 가입을 완료하세요.</p>
							</div>
						</div>
						<div class="popupBtnBox mt50">
							<input type="button" value="확인" class="compButton" onclick="MainInfo.btnClickEvent(this); return false;">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
  <!-- //.userSearchWrap -->
  
<script>
var menuId = '${menuId}';
var pageFail = '${movePageYn}'
var REMEMBER_LOGIN_ID = 'saved_username';


$(function () {
    $('#loginForm').on('submit', prevSubmit)

    var userId = getCookie(REMEMBER_LOGIN_ID);
    
    console.log()
    
    if (userId) {
        $('input[name=userId]').val(userId);
        $('#saved_username').prop('checked', true);
    }
});

function prevSubmit() {
    var userId = $('input[name=userId]').val();

    var checked = $('#saved_username').is(':checked');
    if (checked) {
        setCookie(REMEMBER_LOGIN_ID, userId);
    } else {
        setCookie(REMEMBER_LOGIN_ID, '');
    }
    return true;
}

function setCookie(cookieName, cookieValue, cookieExpire, cookiePath, cookieDomain, cookieSecure){
    var cookieText=escape(cookieName)+'='+escape(cookieValue);
    cookieText+=(cookieExpire ? '; EXPIRES='+cookieExpire.toGMTString() : '');
    cookieText+=(cookiePath ? '; PATH='+cookiePath : '');
    cookieText+=(cookieDomain ? '; DOMAIN='+cookieDomain : '');
    cookieText+=(cookieSecure ? '; SECURE' : '');
    document.cookie=cookieText;
}

function getCookie(cookieName){
    var cookieValue=null;
    if(document.cookie){
        var array=document.cookie.split((escape(cookieName)+'='));
        if(array.length >= 2){
            var arraySub=array[1].split(';');
            cookieValue=unescape(arraySub[0]);
        }
    }
    return cookieValue;
}

	if(pageFail == "N"){
		$.swal("로그인 후 이용할 수 있습니다.");
	}
	if('${SPRING_SECURITY_LAST_EXCEPTION.message}'!=''){
		setTimeout(function(){
			alert('${SPRING_SECURITY_LAST_EXCEPTION.message}');	
		},500)
	};

$(document).ready( function() {
	$('li a').removeClass('active');
	$('ul[class="inline mr40"]').find('a[name="' + menuId + '"]').addClass('active');
	Join.getIinsttList();
});

var securityMessage = '${sessionScope["SPRING_SECURITY_LAST_EXCEPTION"].message}';
if (securityMessage){
    alert(securityMessage);
}
<c:remove scope="session" var="SPRING_SECURITY_LAST_EXCEPTION"/>

</script>
