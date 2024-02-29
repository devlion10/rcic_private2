<head>
    <title>계약 정보 관리</title>
</head>
<section class="wrapper">
    <h3>계약 정보 관리</h3>
    <div class="row mt">
        <div class="col-md-12">
            <div class="content-panel">
                <h4>계약 정보 조회</h4>
                <hr>
                <!-- 날짜 검색 -->
                <div class="col-md-12 searchMB">
                    <form class="form-inline" role="form" id="searchForm">
                       <div class="form-group mr10">
                            <label for="startDate" class="mr10">계약일자</label>
                            <input id="startDate" type="text" value="" class="form-control"/>
                            &nbsp;
                            ~
                            &nbsp;
                            <input id="endDate" type="text" value="" class="form-control"/>
                        </div>
                         <div class="form-group mr10">
                            <label for="keyword" class="mr10">검색어</label>
                            <input type="text" id="keyword" class="form-control" placeholder="검색어">
                        </div>
                        <button type="button" class="btn btn-success searchBtn" id="keywordBtn" onclick="page.retrieve(1)">검색</button>
                    </form>
                </div>
				
                <table class="table table-striped table-advance table-hover boardListTbl">
                    <colgroup>
						<col width="80px" />
						<col width="*" />
						<col width="*" />
						<col width="*" />
						<col width="*" />
						<col width="*" />
					</colgroup>
                    <thead>
                    <tr>
                        <th>수집일자</th>
                        <th>계약일자</th>
                        <th>계약업체</th>
                        <th>계약금액</th>
                        <th>착공일자</th>
                        <th>준공일자</th>
                    </tr>
                    </thead>
                    <span id="totalLabel"></span>
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
var page = {};


(function () {
    $(function () {

        $('#startDate').datepicker('setDate', moment().add(-3, 'months').format('YYYY-MM-DD'));
        
        $('#endDate').datepicker('setDate', moment().add(0, 'day').format('YYYY-MM-DD'));

        page.retrieve(1);

        $('#keyword').on('keyup', function (key) {
            if (key.keyCode === 13) {
                page.retrieve(1);
            }
        });

    });

    page = {
        data: {
            currPage: 1
        },
        refs: {
        },
        retrieve: function (searchPage) {
            page.data.currPage = searchPage ? searchPage : 1;

            var p = setDefault({
                url: '/admin/system/contract/getContractList',
                 listCnt: 10,
                currPage: page.data.currPage,
                startDate: $('#startDate').val()+' 00:00',
                endDate: $('#endDate').val()+' 23:59',
                keyword: $('#keyword').val()
            });
            
            
            
            $.commonAjax(p, '', function (res) {
                // list
                $('#resultTbody').empty();

                $('#totalLabel').setTotalCount(res, page.data.currPage);

                if ($.isNotEmpty(res.list)) {
                	
                	
                    $.each(res.list, function (idx, item) {
                    	console.log(idx)
                    	console.log(item)
						
                        var $tr = $('<tr/>').append($('<td style="width: 100px;"/>').text(item.rgstdt))					//수집일자
                                            .append($('<td style="text-align: center;"/>').text(item.cntrctcnclsdate))	//계약일자
                                            .append($('<td/>').text(item.corplist))										//계약업체
                                            .append($('<td/>').text(item.totcntrctamt + "원"))							//계약금액
                                            .append($('<td/>').text(item.cbgnDate))										//착공일자
                                            .append($('<td/>').text(item.ttalccmpltDate))								//준공일자
                        $('#resultTbody').append($tr);
                    });
                    
                    
                    function retrieve(currPage) {
                        if (!currPage) currPage = 1;

                        var p = setDefault({
                            url: '/admin/system/contract/getContractList',
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

                    // paging
                    var maxPage = res.maxPageCnt;
                    $('#pagination').pagination(page.data.currPage, maxPage, page.retrieve);

                } else {
                    $('#resultTbody').noDataList(10);
                }

            }, null, function (e) {
                console.error(e);
            });
        },
        
    }
})();
	
    
</script>
</c:set>