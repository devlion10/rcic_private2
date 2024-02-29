<head>
    <title>명칭사전 관리</title>
</head>
<%--고속도로기점표지--%>
<section class="wrapper">
    <h3>명칭사전 관리</h3>
    <div class="row mt">

        <div class="col-md-12">
            <div class="content-panel">
                <h4>고속도로 기점표지</h4>
                <hr>
                <div class="col-md-12 searchMB">
                    <form class="form-inline" role="form" id="searchForm">
                        <div class="form-group mr10">
                            <label for="id" class="mr10">도로형태</label>
                            <select class="form-control mr10">
                                <option>도로형태</option>
                            </select>
                        </div>
                        <div class="form-group mr10">
                            <input type="text" class="form-control" placeholder="고시도로명" name="road_nm">
                        </div>
                        <button type="button" class="btn btn-success searchBtn" onclick="retrieve(1)">검색</button>
                    </form>
                </div>
                <div class="total">
                    <!-- <p>전체 <span>10건</span>[<span>1/1</span>페이지]</p> -->

                    <button type="button" class="btn btn-theme04 btnSearch" data-toggle="modal" data-target="#dataimport" data-dic-nm="고속도로 기점표지" data-dic-tbl-nm="tl_cdpnt_sgnal_info">데이터 업로드</button>
                </div>

                <table class="table table-striped table-advance table-hover">
                    <colgroup>
                        <col width="80px"/>
                        <col width="120px"/>
                        <col width="120px"/>
                        <col width="120px"/>
                        <col width="180px"/>
                        <col width="*"/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>도로구분</th>
                        <th>시도</th>
                        <th>시군구</th>
                        <th>도로명</th>
                        <th>구간</th>
                    </tr>
                    </thead>
                    <tbody id="resultTbody">
<%--                    <tr>--%>
<%--                        <td>10</td>--%>
<%--                        <td>고속도로</td>--%>
<%--                        <td></td>--%>
<%--                        <td></td>--%>
<%--                        <td>경부고속도로</td>--%>
<%--                        <td>OO-OO 구간</td>--%>
<%--                    </tr>--%>
                    </tbody>
                </table>

                <div class="paging" id="pagination"></div>

            </div><!-- /content-panel -->
        </div><!-- /col-md-12 -->
    </div><!-- /row -->

</section>

<jsp:include page="modal/modalDataImport.jsp"/>

<c:set var="scripts" scope="request">
<script type="text/javascript">

    var _commonSearch = new CommonSearch({});

    // ready
    $(function () {
        init();
        retrieve(1); // TODO 아직 인덱스  없음 2020.09.30
    });

    // functions
    function init() {

    }

    function retrieve(currPage) {

        if (!currPage) currPage = '1';

        var listCnt = '10';
        var startPage = String((parseInt(currPage)-1)*parseInt(listCnt));
        var collection = "tl_cdpnt_sgnal_info";
        var query = $('#searchForm').serializeObject();
        var data = {
            searchKeyword: toSolrQuery(query, 'AND')
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
            .append($('<td/>').txt(item.sido_nm)) // 도로구분
            .append($('<td/>').txt(item.sgg_nm )) // 시도
            .append($('<td/>').txt(item.emd_nm )) // 시군도
            .append($('<td/>').txt(item.road_nm)) // 도로명
            .append($('<td/>').txt(item.keyword)) // 구간
        return $tr;
    }

</script>
</c:set>