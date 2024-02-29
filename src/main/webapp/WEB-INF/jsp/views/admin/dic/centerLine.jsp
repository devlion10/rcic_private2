<head>
    <title>명칭사전 관리</title>
</head>
<%--도로중심선--%>
<section class="wrapper">
    <h3>명칭사전 관리</h3>
    <div class="row mt">

        <div class="col-md-12">
            <div class="content-panel">
                <h4>국도중심선</h4>
                <hr>
                <div class="col-md-12 searchMB">
                    <form class="form-inline" role="form" id="searchForm">
                        <div class="form-group mr10">
                            <input type="text" class="form-control" placeholder="통과지역" name="full_area_nm">
                        </div>
                        <button type="button" class="btn btn-success searchBtn" onclick="retrieve(1)">검색</button>
                    </form>
                </div>
                <div class="total">
                    <!-- <p>전체 <span>10건</span>[<span>1/1</span>페이지]</p> -->

                    <button type="button" class="btn btn-theme04 btnSearch" data-toggle="modal" data-target="#dataimport" data-dic-nm="도로중심선" data-dic-tbl-nm="tl_center_line">데이터 업로드</button>
                </div>

                <table class="table table-striped table-advance table-hover">
                    <colgroup>
                        <col width="80px"/>
                        <col width="200px"/>
                        <col width="35%"/>
                        <col width="35%"/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>국도번호</th>
                        <th>국도구간</th>
                        <th>통과지역</th>
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
        retrieve(1);
    });

    // functions
    function init() {

    }

    function retrieve(currPage) {

        if (!currPage) currPage = '1';

        var listCnt = '10';
        var startPage = String((parseInt(currPage)-1)*parseInt(listCnt));
        var collection = "tl_center_line";
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
        var roadName = '국도 ' + (item.road_no + '').replace(/^0+/, '') + '호선';


        var $tr = $('<tr/>')
            .append($('<td/>').txt(item.rnum)) // 번호
            .append($('<td/>').txt(roadName)) // 국도번호
            .append($('<td/>').txt(item.sect_st + ' - ' + item.sect_ed).addClass('align-left')) // 구간
            .append($('<td/>').txt(item.full_area_nm ).addClass('align-left')) // 통과지역
        return $tr;
    }

</script>
</c:set>