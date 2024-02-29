<head>
    <title>수집/분석 관리</title>
</head>
<section class="wrapper">
    <h3>수집/분석 관리</h3>
    <div class="row mt">
        <div class="col-md-12">
            <div class="content-panel">
                <h4>수집/분석 목록</h4>
                <hr>
                <div class="total">
                    <p id="totalLabel"></p>
                    <button type="button" class="btn btn-success searchBtn" data-toggle="modal" data-target="#testColl">공고문 조회/수집/분석</button>
                </div>

                <table class="table table-striped table-advance table-hover boardListTbl">
                    <colgroup>
						<col width="80px" />
						<col width="*" />
						<col width="*" />
						<col width="*" />
						<col width="*" />
					</colgroup>
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>수집시작일시</th>
                        <th>공고기간</th>
                        <th>수집데이터</th>
                        <th>분석데이터</th>
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

<jsp:include page="modal/modalTestCollect.jsp"/>
<jsp:include page="modal/modalAnalResult.jsp"/>

<c:set var="scripts" scope="request">
<script type="text/javascript">

    $(function () {
        retrieve();

        $('#keyword').on('keydown', function (e) {
            if (e.keyCode === 13) {
                retrieve(1);
            }
        });
        
        $("#g2b").show();
    });

    function retrieve(currPage) {
        if (!currPage) currPage = 1;

        var p = setDefault({
            url: '/admin/system/g2b/getG2bList',
            listCnt: 10,
            currPage: currPage,
            searchType: $('#searchType').val(),
            keyword: $('#keyword').val(),
        });
        $.commonAjax(p, '', function (res) {
            console.log('response', res);
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

        }, null, function (e) {
            console.error(e);
        });
    }
    
    function createRow(item) {
        var attachIcon = '';
        var button = $('<button type="button" class="btn btn-info" data-toggle="modal" data-target="#analResult">결과</button>').data('item', item);
        
        var $tr = $('<tr/>')
                .append($('<td/>').txt(item.rnum)) // 번호
                .append($('<td style="text-align: center;"/>').txt(item.startDt)) // 수집/분석 시작일시
                .append($('<td/>').txt(item.searchStartDt+" ~ "+item.searchEndDt)) // 검색일시 
                .append($('<td/>').txt(item.getdatacnt + "건")) // 수집데이터건수
                .append($('<td/>').append(button)) // 분석데이터건수
        return $tr;
    }
    
</script>
</c:set>