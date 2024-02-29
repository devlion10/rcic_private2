<header class="header black-bg">
    <div class="sidebar-toggle-box">
<%--        <div class="fa fa-bars tooltips" data-placement="right" data-original-title="좌측메뉴 감추기"></div>--%>
    </div>
    <!--logo start-->
    <a href="javascript:;" class="logo"><img src="/assets/admin/img/logo_rcic.png" alt="도로변경정보 수집시스템 관리자"/></a>
    <!--logo end-->
    <form:form action="/admin/spring_logout" method="post" id="logoutForm">
        <div class="top-menu">
            <ul class="nav pull-right top-menu">
                <li class="userInfo"><span>관리자</span>님 환영합니다. </li>
                <li><a class="logout" href="javascript:document.getElementById('logoutForm').submit();">로그아웃</a></li>
            </ul>
        </div>
    </form:form>
</header>