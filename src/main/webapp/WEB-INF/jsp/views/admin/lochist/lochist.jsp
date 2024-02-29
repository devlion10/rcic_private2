<head>
    <title>위치변경 이력관리</title>
</head>

<section class="wrapper">
    <h3>위치변경 이력관리</h3>

    <div class="row mt">
        <div class="col-md-12">
            <div class="content-panel">
                <h4>이력목록</h4>
                <hr>

                <div class="col-md-12 searchMB">
                    <form class="form-inline" role="form" id="searchForm">
                       <div class="form-group mr10">
                            <label for="startDate" class="mr10">변동일자</label>
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
                

                <table class="table table-striped table-advance table-hover">
                    <colgroup>
                        <col width="100px"/>
                        <col width="100px"/>
                        <col width="100px"/>
                        <col width="*"/>
                        <col width="150px"/>
                        <col width="150px"/>
                        <col width="*"/>
                        <col width="*"/>
                        <col width="*"/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th>No.</th>
                        <th>공고일</th>
                        <th>수정변경일</th>
                        <th>공사건</th>
                        <th>기존참조명칭사전</th>
                        <th>변경참조명칭사전</th>
                        <th>기존위치포착단어</th>
                        <th>변경위치포착단어</th>
                        <th>변경사유</th>
                    </tr>
                    </thead>
                    <tbody id="resultBody"> 
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

        $('#startDate').datepicker('setDate', moment().add(-6, 'months').format('YYYY-MM-DD'));
        
        $('#endDate').datepicker('setDate', moment().add(1, 'day').format('YYYY-MM-DD'));

        page.retrieve(1);

        $('#keyword').on('keyup', function (key) {
            if (key.keyCode === 13) {
                page.retrieve(1);
            }
        });

        $('#detailModal').on('show.bs.modal', function (event) {
            detailModal.init($(event.relatedTarget).data('item'));
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
                url: '/admin/lochist/getLocHistList',
                 listCnt: 10,
                currPage: page.data.currPage,
                startDate: $('#startDate').val()+' 00:00',
                endDate: $('#endDate').val()+' 23:59',
                keyword: $('#keyword').val()
            });

            $.commonAjax(p, '', function (res) {
                console.log(res);
                // list
                $('#resultBody').empty();

                $('#totalLabel').setTotalCount(res, page.data.currPage);

                if ($.isNotEmpty(res.list)) {
                	
                    $.each(res.list, function (idx, item) {
                        var refDicName = "";
                        var changereason = "";
                        if(item.refDicName=="tb_cbnd_info"){
                        refDicName = "연속지적도";
                        }else if(item.refDicName=="tl_develop_info"){
                        refDicName = "지구단위계획";
                        }else if(item.refDicName=="tl_poi_point"){
                        refDicName = "지명(POI)";
                        }else if(item.refDicName=="tl_road_name"){
                        refDicName = "도로명주소(도로구간)";
                        }
                        
                        if(item.changereason=="NotFoundLocation"){
                        changereason = "위치부정확";
                        }else if(item.changereason=="AfterChangeLocation"){
                        changereason = "공고 후 위치변경";
                        }

                        var refDicName;
						
						if(item.refDicName == "tb_cbnd_info"){
							refDicName = "연속지적";
						}else if(item.refDicName == "tl_develop_info"){
							refDicName = "지구단위";
						}else if(item.refDicName == "tl_poi_point"){
							refDicName = "지명(POI)";
						}else if(item.refDicName == "tl_road_name"){
							refDicName = "도로명주소(도로구간)";
						}
						
                        var $tr = $('<tr/>').append($('<td/>').text(item.rnum))
                       		 				.append($('<td/>').text(item.bidntcedt.substr(0,10)))
                                            .append($('<td/>').text(item.chgDt))
                                            .append($('<td/>').text(item.bidntcenm))
                                            .append($('<td/>').text(item.refDicNameOg.replace("& #40;","(").replace("& #41;",")")))
                                            .append($('<td/>').text(refDicName))
                                            .append($('<td/>').text(item.serwordOg))
                                            .append($('<td/>').text(item.serword))
                                            .append($('<td/>').text(changereason))
											console.log(item.bidntcedt)
                        $('#resultBody').append($tr);
                    });

                    // paging
                    var maxPage = res.maxPageCnt;
                    $('#pagination').pagination(page.data.currPage, maxPage, page.retrieve);

                } else {
                    $('#resultBody').noDataList(10);
                }

            }, null, function (e) {
                console.error(e);
            });
        },
        openBatchModal: function () {
            var $checkUsers = $('input.checkUser:checked');

            if ($checkUsers.length < 1) {
            }

            var items = $checkUsers.map(function () {
                return $(this).data('item');
            }).get();
            batchModal.init(items);
            $('#batchModal').modal();
        }
    }
})();


	
</script>
</c:set>
