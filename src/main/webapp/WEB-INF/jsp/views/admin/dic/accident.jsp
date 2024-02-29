<head>
    <title>명칭사전 관리</title>
</head>
<%--유고정보--%>
<section class="wrapper">
    <h3>명칭사전 관리</h3>

    <div class="row mt">

        <div class="col-md-12">
            <div class="content-panel">
                <h4>유고정보</h4>
                <hr>
                <div class="col-md-12 searchMB">
                    <form class="form-inline" role="form" id="searchForm">
                        <div class="form-group mr10">
                            <label class="mr10">도로구분</label>
                            <select class="form-control">
                                <option>도로구분</option>
                            </select>
                        </div>

<%--                        TODO FIXME 날짜검색 구현 --%>
                        <div class="form-group mr10">
                            <label for="startDate" class="mr10">검색 시작일</label>
                            <input id="startDate" name="" type="text" class="form-control" />
                            &nbsp;
                            <label for="endDate" class="mr10">검색 종료일</label>
                            <input id="endDate" name="" type="text" class="form-control" />
                        </div>
                        <button type="button" class="btn btn-success searchBtn" onclick="retrieve(1)">검색</button>
                    </form>
                </div>
                <div class="total">
                    <p>※ 최종 업데이트 일자 : 2020.09.30</p>
                </div>

                <table class="table table-striped table-advance table-hover">
                    <colgroup>
                        <col width="80px"/>
                        <col width="100px"/>
                        <col width="100px"/>
                        <col width="100px"/>
                        <col width="100px"/>
                        <col width="100px"/>
                        <col width="100px"/>
                        <col width="100px"/>
                        <col width="*"/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>도로구분</th>
                        <th>공사고유<br />식별번호</th>
                        <th>공사정보<br />유형</th>
                        <th>차로차단<br />방법</th>
                        <th>차단된<br />차로수</th>
                        <th>공사실제<br />개시시간</th>
                        <th>공사실제<br />종료시간</th>
                        <th>공사상황<br />정보</th>
                    </tr>
                    </thead>
                    <tbody id="resultTbody">
<%--                    <tr>--%>
<%--                        <td>10</td>--%>
<%--                        <td>고속도로</td>--%>
<%--                        <td></td>--%>
<%--                        <td></td>--%>
<%--                        <td>전면통제</td>--%>
<%--                        <td>4</td>--%>
<%--                        <td>2020.10.21</td>--%>
<%--                        <td>2020.10.25</td>--%>
<%--                        <td>10:00</td>--%>
<%--                        <td>06:00</td>--%>
<%--                        <td>노면보수</td>--%>
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

    var _commonSearch = new CommonSearch({});

    // ready
    $(function () {
        init();
        retrieve(1); // TODO 아직 인덱스 없음 2020.09.30
    });

    // functions
    function init() {

    }

    function retrieve(currPage) {

        if (!currPage) currPage = '1';

        var listCnt = '10';
        var startPage = String((parseInt(currPage)-1)*parseInt(listCnt));
        var collection = "tl_accdnt_info";
        var query = $('#searchForm').serializeObject();
        var data = {
            searchKeyword: '*:*' // toSolrQuery(query, 'AND') // TODO 기간 검색
        }

        _commonSearch.getSearchList(startPage, listCnt, data, collection, function (res) {
            console.log(res);
            var html = "";

            $('#resultTbody').empty();
            var list = [];
            $.each(res.result, function (i, item) {
                item.rnum = ((parseInt(currPage) - parseInt(1)) * res.result.length) + parseInt(i) + parseInt(1);
                var item = createRow(item);
                list.push(item);
            });
            $('#resultTbody').html(list);
            $('#pagination').dicPagination(currPage, res.maxPageCnt, retrieve);
        });
    }

    function createRow(item) {
        var $tr = $('<tr/>')
            .append($('<td/>').txt(item.rnum)) // 번호
            .append($('<td/>').txt('')) // 도로구분 FIXME
            .append($('<td/>').txt(item.esntl_idntfc_no)) // 공사고유 식별번호
            .append($('<td/>').txt('')) // 공사정보 유형 FIXME
            .append($('<td/>').txt(item.cartrk_intrcp_mth)) // 차로차단 방법 FIXME 코드값임
            .append($('<td/>').txt(item.block_lane_cnt)) // 차단된 차로수
            .append($('<td/>').txt(formatDate(item.cntrwk_real_begin_time))) // 공사실제 개시시간
            .append($('<td/>').txt(formatDate(item.cntrwk_real_end_time))) // 공사실제 종료시간
            .append($('<td/>').txt(item.sittn_info_mssage).addClass('align-left')) // 공사상황 정보
        return $tr;
    }

</script>
</c:set>