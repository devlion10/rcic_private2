<!--sidebar start-->
<aside>
    <div id="sidebar"  class="nav-collapse ">
        <!-- sidebar menu start-->
        <ul class="sidebar-menu" id="nav-accordion">

            <p class="centered"><img src="/assets/admin/img/ui-sam.jpg" alt="Hypermap system administrator" class="img-circle" width="60"></p>
            <h5 class="centered">RCIC<br><span>system admin</span></h5>

            <li class="sub-menu">
                <a href="javascript:;" >
                    <i class="fa fa-user"></i>
                    <span>사용자 관리</span>
                </a>
                <ul class="sub">
                    <li><a href="/admin/user/users/list">사용자 목록</a></li>
                    <li><a href="/admin/user/authInfo/list">권한관리</a></li>
                </ul>
            </li>
            <li class="sub-menu">
                <a href="javascript:;" >
                    <i class=" fa fa-list-ul"></i>
                    <span>게시판 관리</span>
                </a>
                <ul class="sub">
                    <li><a href="/admin/board/notice/list">공지사항</a></li>
                    <li><a href="/admin/board/qna/list">질문답변</a></li>
                    <li><a href="/admin/board/faq/list">FAQ</a></li>
                </ul>
            </li>
            <li class="sub-menu">
                <a href="javascript:;" >
                    <i class="fa fa-th"></i>
                    <span>명칭사전 관리</span>
                </a>
                <ul class="sub">
                    <li><a href="/admin/dic/cbnd">연속지적</a></li>
                    <li><a href="/admin/dic/develop">지구단위계획</a></li>
                    <li><a href="/admin/dic/road-plan">도시계획도로</a></li>
                    <li><a href="/admin/dic/poi-point">지명(POI)</a></li>
                    <li><a href="/admin/dic/node-link">표준노드링크</a></li>
                    <li><a href="/admin/dic/road-name">도로명주소(도로구간)</a></li>
                    <li><a href="/admin/dic/legaldong">행정구역</a></li>
                    <li><a href="/admin/dic/cdpnt-sgnal">고속도로 기점표지</a></li>
                    <li><a href="/admin/dic/center-line">국도중심선</a></li>
                </ul>
            </li>
            <li class="sub-menu">
                <a href="javascript:;" >
                    <i class="fa fa-bar-chart-o"></i>
                    <span>데이터제공 관리</span>
                </a>
                <ul class="sub">
                    <li><a href="/admin/data-api/reg">API 신청현황</a></li>
                    <li><a href="/admin/data-api/use-status">API 사용현황</a></li>
                    <li><a href="/admin/data-api/blocked">API 차단관리</a></li>
                    <li><a href="/admin/data-api/data-status">데이터 제공현황</a></li>
                </ul>
            </li>
            <li class="sub-menu">
                <a href="javascript:;" >
                    <i class="fa fa-archive"></i>
                    <span>참조정보 관리</span>
                </a>
                <ul class="sub">
                    <li><a href="/admin/cmm/keyword">수집/분석 키워드</a></li>
                    <li><a href="/admin/cmm/code">공통코드</a></li>
                    <li><a href="/admin/cmm/interface">연계목록</a></li>
                </ul>
            </li>
            <li class="sub-menu">
                <a href="javascript:;" >
                    <i class="fa fa-desktop"></i>
                    <span>머신러닝</span>
                </a>
                <ul class="sub">
                    <li><a href="/admin/mach-learn/light">공고수집 모델</a></li>
                    <li><a href="/admin/mach-learn/linear">최대반경결정 모델</a></li>
                </ul>
            </li>
            <li class="sub-menu">
                <a href="javascript:;" >
                    <i class="fa fa-list-ul"></i>
                    <span>이력 관리</span>
                </a>
                <ul class="sub">
                    <li><a href="/admin/lochist/lochist">위치변경 이력 관리</a></li>
                </ul>
            </li>
            <li class="sub-menu" id="g2b" style="display: none;">
                <a href="javascript:;" >
                    <i class="fa fa-list-ul"></i>
                    <span>수집/분석 관리</span>
                </a>
                <ul class="sub">
                     <li><a href="/admin/system/g2b/list">수집/분석 관리</a></li>
                </ul>
            </li>
            
            <!-- chchchch --> 
            <li class="sub-menu" id="contract">
                <a href="javascript:;" >
                    <i class="fa fa-list-ul"></i>
                    <span>계약 정보 관리</span>
                </a>
                <ul class="sub">
                     <li><a href="/admin/system/contract/list">계약 정보 조회</a></li>
                </ul>
            </li> 
            

        </ul>
        <!-- sidebar menu end-->
    </div>
</aside>
<!--sidebar end-->


<script>
    (function(){
        var $nav = $('#nav-accordion');
        var href = location.href;

        $nav.find('a.active,li.active').removeClass('active');

        var links = [
            "/admin/user/users/list",
            "/admin/user/authInfo/list",
            "/admin/board/notice/list",
            "/admin/board/qna/list",
            "/admin/board/faq/list",
            "/admin/dic/cbnd",
            "/admin/dic/develop",
            "/admin/dic/road-plan",
            "/admin/dic/poi-point",
            "/admin/dic/node-link",
            "/admin/dic/road-name",
            "/admin/dic/legaldong",
            "/admin/dic/cdpnt-sgnal",
            "/admin/dic/center-line",
            "/admin/dic/accident",
            "/admin/data-api/reg",
            "/admin/data-api/use-status",
            "/admin/data-api/blocked",
            "/admin/data-api/data-status",
            "/admin/cmm/keyword",
            "/admin/cmm/code",
            "/admin/cmm/interface",
            "/admin/mach-learn/light",
            "/admin/mach-learn/linear",
            "/admin/lochist/lochist",
            "/admin/system/g2b/list",
            "/admin/system/contract/list"
        ];
        links.forEach(function (pattern) {
            if (href.indexOf(pattern) > -1) {
                var $a = $nav.find('a[href="'+pattern+'"]');
                $a.parent('li').addClass('active')
                    .parent('ul').css({display: 'block'})
                    .parent('li.sub-menu').find('a').eq(0).addClass('active');
            }
        });
    })();
</script>
