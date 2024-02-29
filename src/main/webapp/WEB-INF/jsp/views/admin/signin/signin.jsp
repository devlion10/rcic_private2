<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">

    <title>RCIC Admin</title>

    <!-- Bootstrap core CSS -->
    <link href="/assets/admin/css/bootstrap.css" rel="stylesheet">
    <!--external css-->
    <link href="/assets/admin/font-awesome/css/font-awesome.css" rel="stylesheet" />
    <!-- Custom styles for this template -->
    <link href="/assets/admin/css/style.css" rel="stylesheet">
    <link href="/assets/admin/css/style-responsive.css" rel="stylesheet">
</head>

<body>

<div id="login-page">
    <div class="container">

        <h1><img src="/assets/admin/img/img-logo.png" alt="도로변경정보 수집시스템 관리자"/></h1>

        <form:form class="form-login" action="/admin/spring_login" method="post" id="loginForm">
            <h2><span>system</span> administrator</h2>
            <h3>LOGIN</h3>
            <h4>RCIC 관리자 시스템입니다. 로그인을 해주세요.</h4>
            <div class="login-wrap">
                <input type="text"     name="userId" class="form-control" placeholder="아이디를 입력하세요." autofocus value="">
                <input type="password" name="password" class="form-control" placeholder="비밀번호를 입력하세요." value="">
                <button class="btn btn-theme btn-block mt20" href="sub01_01_list.html" type="submit"><i class="fa fa-lock"></i> 로그인</button>
                <div class="checkbox">
                    <label>
                        <input type="checkbox" value=""  name="remember" id="rememberCheck">
                        아이디 기억하기
                    </label>
                </div>
            </div>
        </form:form>

        <p class="copyright">(C) 2020 all rights reserved.</p>

    </div>
</div>

<!-- js placed at the end of the document so the pages load faster -->
<script src="/assets/admin/js/jquery.js"></script>
<script src="/assets/admin/js/bootstrap.min.js"></script>

<!--BACKSTRETCH-->
<!-- You can use an image of whatever size. This script will stretch to fit in any screen size.-->
<script type="text/javascript" src="/assets/admin/js/jquery.backstretch.min.js"></script>
<script>
    $.backstretch("/assets/admin/img/login-bg.jpg", {speed: 500});

    var REMEMBER_LOGIN_ID = 'saved_username';

    $(function () {
        $('#loginForm').on('submit', prevSubmit)


        var userId = getCookie(REMEMBER_LOGIN_ID);
        if (userId) {
            $('input[name=userId]').val(userId);
            $('#rememberCheck').prop('checked', true);
        }
    });

    function prevSubmit() {
        var userId = $('input[name=userId]').val();

        var checked = $('#rememberCheck').is(':checked');
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

    var securityMessage = '${sessionScope["SPRING_SECURITY_LAST_EXCEPTION"].message}';
    if (securityMessage){
        alert(securityMessage);
    }
    <c:remove scope="session" var="SPRING_SECURITY_LAST_EXCEPTION"/>
</script>


</body>
</html>
