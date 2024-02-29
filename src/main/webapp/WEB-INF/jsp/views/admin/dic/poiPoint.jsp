<head>
    <title>명칭사전 관리</title>
</head>
<%--지명정보--%>
<section class="wrapper">
    <h3>명칭사전 관리</h3>
    <div class="row mt">

        <div class="col-md-12">
            <div class="content-panel">
                <h4>지명(POI)</h4>
                <hr>
                <div class="col-md-12 searchMB">
                    <form class="form-inline" role="form" id="searchForm">
                        <jsp:include page="../common/search-region-select.jsp">
                            <jsp:param name="styleClass" value="mr10"/>
                        </jsp:include>
                        <div class="form-group mr10">
                            <input type="text" class="form-control" placeholder="지명" name="korean_nm">
                        </div>
                        <button type="button" class="btn btn-success searchBtn" onclick="retrieve(1)">검색</button>
                    </form>
                </div>
                <div class="total">
                    <!-- <p>전체 <span>10건</span>[<span>1/1</span>페이지]</p> -->
                </div>

                <table class="table table-striped table-advance table-hover">
                    <colgroup>
                        <col width="80px"/>
                        <col width="*"/>
                        <col width="200px"/>
                        <col width="200px"/>
                        <col width="200px"/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>지명</th>
                        <th>시도</th>
                        <th>시군구</th>
                        <th>읍면동</th>
                        <th>등록일시</th>
                    </tr>
                    </thead>
                    <tbody id="resultTbody">
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
        retrieve(1);
        
        $('select[name="sido_cd"]').on('change', function () {
        	retrieve(1);
        });
        
        $('select[name="sgg_cd"]').on('change', function () {
        	retrieve(1);
        });
        
        $('select[name="emd_cd"]').on('change', function () {
        	retrieve(1);
        });
    });

    // functions
    function init() {
    	$('#selectRegion4').hide();
    }

    function retrieve(currPage) {

        if (!currPage) currPage = '1';

        var listCnt = '10';
        var startPage = String((parseInt(currPage)-1)*parseInt(listCnt));
        var collection = "tl_poi_point";
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
            .append($('<td/>').txt(item.korean_nm)) // 지명
            .append($('<td/>').txt(item.sido_nm)) // 시도
            .append($('<td/>').txt(item.sgg_nm )) // 시군구
            .append($('<td/>').txt(item.emd_nm )) // 읍면동
            .append($('<td/>').txt( "2022-07-16" )) // 등록일시
            
        return $tr;
    }

</script>
</c:set>