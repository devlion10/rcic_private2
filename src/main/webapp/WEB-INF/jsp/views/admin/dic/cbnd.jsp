<head>
    <title>명칭사전 관리</title>
</head>

<section class="wrapper">
    <h3>명칭사전 관리</h3>
    <div class="row mt">

        <div class="col-md-12">
            <div class="content-panel">
                <h4>연속지적</h4>
                <hr>
                <div class="col-md-12 searchMB">
                    <form class="form-inline" role="form" id="searchForm" onsubmit="return false">
                        <jsp:include page="../common/search-region-select.jsp">
                            <jsp:param name="styleClass" value="mr10"/>
                        </jsp:include>
                         <div class="form-group mr10">
                            <input type="text" class="form-control" placeholder="지번입력" name="sub_jibun">
                        </div>
                        <button type="button" class="btn btn-success searchBtn" onclick="retrieve(1)">검색</button>
                        <!-- <button type="button" class="btn btn-success searchBtn" id="cbndAPI">API테스트</button> -->
                    </form>
                </div>
                <div class="total">
                    <!-- <p>전체 <span>10건</span>[<span>1/1</span>페이지]</p> -->
                </div>

                <table class="table table-striped table-advance table-hover">
                    <colgroup>
                        <col width="80px">
                        <col width="*">
                        <col width="*">
                        <col width="*">
                        <col width="*">
                        <col width="*">
                        <col width="*">
                        <col width="*">
                        <col width="*">
                        <col width="*">
                    </colgroup>
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>지번고유번호</th>
                        <th>시도</th>
                        <th>시군구</th>
                        <th>읍면동</th>
                        <th>리</th>
                        <th>산 여부</th>
                        <th>본번</th>
                        <th>부번</th>
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
            initEvent();
            
            
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
        	$('#selectRegion4').css('visibility','unset');
        }
        
	    // API테스트
        function initEvent() {
    		document.getElementById('cbndAPI').addEventListener('click', function(event){
               var param = {
                    };
                
    			$.ajax({
                    type: 'get',
                    url: '/admin/dic/cbndAPI',
                    data: param,
                    contentType: 'application/json'
                }).done(function (res) {
                	alert("Done!!");
                }).error(function (e) {
                	alert("Error!!");
                });
     		});

        }

        function retrieve(currPage) {

            if ($.isNullString(currPage)) {
                currPage = "1";
            }
            var listCnt = '10';
            var startPage = String((parseInt(currPage)-1)*parseInt(listCnt));
            var collection = "tb_cbnd_info";

            var query = $('#searchForm').serializeObject();
            var data = {
                searchKeyword: toSolrQuery(query, 'AND')
            }

            console.log('search', startPage, listCnt, data, collection);
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
             var san = item.pnu.substr(11, 1) == '2' ? '산' : '일반';
             var bubun = parseInt(item.pnu.substr(15, 4));
             var jibun = parseInt(item.pnu.substr(11, 4));
            var $tr = $('<tr/>')
                .append($('<td/>').txt(item.rnum))
                .append($('<td/>').txt(item.pnu)) // 지번??
                .append($('<td/>').txt(item.sido_nm))
                .append($('<td/>').txt(item.sgg_nm))
                .append($('<td/>').txt(item.emd_nm))
                .append($('<td/>').txt(item.ri_nm))
                .append($('<td/>').txt(san)) // 산여부
                .append($('<td/>').txt(jibun)) //번지
                .append($('<td/>').txt(bubun)) //부번
                .append($('<td/>').txt(item.stdr_dt!=null?item.stdr_dt.substring(0, 10):'')); //등록일시
            return $tr;
        }
        
    </script>
</c:set>