<head>
    <title>명칭사전 관리</title>
</head>
<%--도시계획정보--%>
<section class="wrapper">
    <h3>명칭사전 관리</h3>
    <div class="row mt">

        <div class="col-md-12">
            <div class="content-panel">
                <h4>도시계획도로</h4>
                <hr>
                <div class="col-md-12 searchMB">
                    <form class="form-inline" role="form" id="searchForm">
                        <jsp:include page="../common/search-region-select.jsp">
                            <jsp:param name="styleClass" value="mr10"/>
                        </jsp:include>
                        <div class="form-group mr10">
                            <input type="text" class="form-control" placeholder="고시도로명" name="dgm_nm">
                        </div>
                        <button type="button" class="btn btn-success searchBtn" onclick="retrieve(1)">검색</button>
                    </form>
                </div>
                <div class="total">
                    <!-- <p>전체 <span>10건</span>[<span>1/1</span>페이지]</p> -->

                    <button type="button" class="btn btn-theme04 btnSearch" data-toggle="modal" data-target="#dataimport" data-dic-nm="도시계획" data-dic-tbl-nm="tl_road_plan_info">데이터 업로드</button>
                </div>

                <table class="table table-striped table-advance table-hover">
                    <colgroup>
                        <col width="80px"/>
                        <col width="*"/>
                        <col width="*"/>
                        <col width="*"/>
                        <col width="*"/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th>순번</th>
                        <th>고시관리번호</th>
                        <th>도로형태</th>
                        <th>임시도로번호</th>
                        <th>고시도로명</th>
                    </tr>
                    </thead>
                    <tbody id="resultTbody">
<%--                    <tr>--%>
<%--                        <td>10</td>--%>
<%--                        <td>27000UQ151PS200908310089</td>--%>
<%--                        <td>중로2류</td>--%>
<%--                        <td>406</td>--%>
<%--                        <td>중로2류-406</td>--%>
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
        retrieve(1);
    });

    // functions
    function init() {
    	$('#selectRegion4').hide();
    }

    function retrieve(currPage) {

        if (!currPage) currPage = '1';

        var listCnt = '10';
        var startPage = String((parseInt(currPage)-1)*parseInt(listCnt));
        var collection = "tl_road_plan_info";
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
            .append($('<td/>').txt(item.rnum)) // 순번
            .append($('<td/>').txt(item.present_sn)) // 고시관리번호
            .append($('<td/>').txt(item.dgm_nm)) // 도로형태
            .append($('<td/>').txt(item.drawing_no)) // 임시도로번호
            .append($('<td/>').txt(item.upis_rnm)) // 고시도로명
        return $tr;
    }
</script>
</c:set>