<head>
    <title>참조정보 관리</title>
</head>
<%--연계목록--%>
<section class="wrapper">
    <h3>참조정보 관리</h3>

    <div class="row mt">

        <div class="col-md-12">
            <div class="content-panel">
                <h4>연계목록</h4>
                <hr>
                <p class="bPoint">※ 연계정보는 조회만 가능합니다.</p>
                <div class="optionBox">
                    <form class="form-inline" role="form">
                        <div class="form-group mr10">
                            <select class="form-control" id="insttSelect">
                                <option value="">연계기관</option>
                                <c:forEach items="${insttList}" var="insttNm">
                                    <option value="${insttNm}">${insttNm}</option>
                                </c:forEach>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="total">
                    <p id="totalLabel">전체 <span>12건 </span>[<span>1/2</span>페이지]</p>
                </div>

                <table class="table table-striped table-advance table-hover">
                    <colgroup>
                        <col width="80px"/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>기관명</th>
                        <th>서비스명</th>
                        <th>서비스URL</th>
                        <th>세부서비스 구분</th>
                        <th>연계방법</th>
                        <th>연계주기</th>
                        <th>실행스케쥴</th>
                        <th>사용여부</th>
                    </tr>
                    </thead>
                    <tbody id="resultTbody">
<%--                    <tr>--%>
<%--                        <td>10</td>--%>
<%--                        <td>조달청</td>--%>
<%--                        <td>입찰공고 공사현황 조회</td>--%>
<%--                        <td>http://apis.data.go.kr/1230000/BidPublicInfoService</td>--%>
<%--                        <td>getBidPblancListInfoCnstwkPPSSrch</td>--%>
<%--                        <td>API</td>--%>
<%--                        <td>일</td>--%>
<%--                        <td>01:00</td>--%>
<%--                        <td>사용</td>--%>
<%--                    </tr>--%>
                    </tbody>
                </table>

                <div class="paging" id="pagination"></div>

            </div><!-- /content-panel -->
        </div><!-- /col-md-12 -->
    </div><!-- /row -->

</section>

<c:set var="scripts" scope="request">
<script type="text/javascript">

    var resultList = [];

    // ready
    $(function(){
        retrieve(1);

        $('#insttSelect').on('change', function () {
            retrieve(1);
        });
    });

    // functions
    function init() {

    }

    /**
     * 목록 조회
     * @param currPage
     */
    function retrieve(currPage) {
        if (!currPage) currPage = 1;

        $('#resultTbody').noDataList(7);

        var param = {
            listCnt: 10,
            currPage: currPage,
            serviceNm: $('#insttSelect').val()
        };
        var condition = $('#searchForm').serializeObject();
        $.extend(param, condition);

        $.ajax({
            type: 'get',
            url: '/admin/cmm/getServiceInfoList',
            dataType: 'json',
            contentType: 'application/json',
            data: param
        }).done(function (res) {
            resultList = res.list;
            if (res.list && res.list.length > 0) {
                var result = [];
                $.each(res.list, function (idx, item) {
                    var row = createRow(item);
                    result.push(row);
                })
                $('#resultTbody').html(result);
                $('#pagination').pagination(currPage, res.maxPageCnt, retrieve);
            } else {
                $('#resultTbody').noDataList(8);
            }
            $('#totalLabel').setTotalCount(res, currPage);
        }).error(function (e) {
            console.error(e);
        });
    }
    
    function createRow(item) {

        var $tr = $('<tr/>')
            .append($('<td/>').text(item.rnum)) // 번호
            .append($('<td/>').text(item.serviceNm)) // 기관명
            .append($('<td/>').text(item.detailServiceNm)) // 서비스명 FIXME ?? 맞는것같기도 ..
            .append($('<td/>').text(item.serviceUrl)) // 서비스URL
            .append($('<td/>').text(item.detailServiceTy)) // 세부서비스
            .append($('<td/>').text('')) // 연계방법 FIXME
            .append($('<td/>').text('')) // 연계주기 FIXME
            .append($('<td/>').text('')) // 실행스케쥴 FIXME
            .append($('<td/>').text(item.useYn)) // 사용여부
        return $tr;
    }

</script>
</c:set>