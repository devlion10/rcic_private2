<head>
    <title>명칭사전 관리</title>
</head>
<%--행정구역--%>
<section class="wrapper">
    <h3>명칭사전 관리</h3>
    <div class="row mt">

        <div class="col-md-12">
            <div class="content-panel">
                <h4>행정구역</h4>
                <hr>
                <div class="col-md-12 searchMB">
                    <form class="form-inline" role="form" id="searchForm">
                        <jsp:include page="../common/search-region-select.jsp">
                            <jsp:param name="styleClass" value="mr10"/>
                        </jsp:include>

                        <button type="button" class="btn btn-success searchBtn" onclick="retrieve(1)">검색</button>
  <!--                  <button type="button" class="btn btn-success searchBtn" id="legaldongAPI">API테스트</button>  --> 
                    </form>
                </div>
                <div class="total">
                    <!-- <p>전체 <span>10건</span>[<span>1/1</span>페이지]</p> 
                	<button type="button" class="btn btn-theme04 btnSearch" data-toggle="modal" data-target="#dataimport" data-dic-nm="행정구역" data-dic-tbl-nm="tb_legaldong_li">리 데이터 업로드</button>&nbsp;
                	<button type="button" class="btn btn-theme04 btnSearch" data-toggle="modal" data-target="#dataimport" data-dic-nm="행정구역" data-dic-tbl-nm="tb_legaldong_emd">읍면동 데이터 업로드</button>&nbsp; 
                	<button type="button" class="btn btn-theme04 btnSearch" data-toggle="modal" data-target="#dataimport" data-dic-nm="행정구역" data-dic-tbl-nm="tb_legaldong_sgg">시군구 데이터 업로드</button>&nbsp;
                	<button type="button" class="btn btn-theme04 btnSearch" data-toggle="modal" data-target="#dataimport" data-dic-nm="행정구역" data-dic-tbl-nm="tb_legaldong_sido">시도 데이터 업로드</button>&nbsp;
                	-->
                </div>

                <table class="table table-striped table-advance table-hover">
                    <colgroup>
                        <col width="80px"/>
                        <col width="*"/>
                        <col width="20%"/>
                        <col width="20%"/>
                        <col width="20%"/>
                        <col width="20%"/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>기관코드</th>
                        <th>시도</th>
                        <th>시군구</th>
                        <th>읍면동</th>
                        <th>리</th>
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
<!--  
<jsp:include page="modal/modalDataImport.jsp"/>
-->
<c:set var="scripts" scope="request">
    <script type="text/javascript">

        var _commonSearch = new CommonSearch({});

        // ready
        $(function () {
            init();
            retrieve(1);    // ready
//            initEvent()
                
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
<!--
	    // API테스트
        function initEvent() {
    		document.getElementById('legaldongAPI').addEventListener('click', function(event){
               var param = {
                    };
                
    			$.ajax({
                    type: 'get',
                    url: '/admin/dic/legaldongAPI',
                    data: param,
                    contentType: 'application/json'
                }).done(function (res) {
                	alert("Done!!");
                }).error(function (e) {
                	alert("Error!!");
                });
     		});

        }
 -->       
        
        function retrieve(currPage) {
            if (!currPage) currPage = '1';
            $('#pagination').twbsPagination('destroy');
            var query = $('#searchForm').serializeObject();

            var param = {
                listCnt: 10,
                currPage: currPage,
                sidoCd: query.sido_cd,
                sggCd: query.sgg_cd,
                emdCd: query.emd_cd,
            };

            $.ajax({
                type: 'get',
                url: '/admin/dic/legaldong/li',
                data: param,
                contentType: 'application/json'
            }).done(function (res) {
                console.log(res);

                if ($.isNotEmpty(res.list)) {
                    $('#resultTbody').empty();
                    var list = [];
                    $.each(res.list, function (i, item) {
                        var item = createRow(item);
                        list.push(item);
                    });
                    $('#resultTbody').html(list);
                    $('#pagination').dicPagination(currPage, res.maxPageCnt, retrieve);
                } else {
                    $('#resultTbody').noDataList(6);
                }
            }).error(defaultErrorFn);

        }

        function retrieve22(currPage) {

            if (!currPage) currPage = '1';
            $('#pagination').twbsPagination('destroy');

            var listCnt = '10';
            var startPage = String((parseInt(currPage)-1)*parseInt(listCnt));
            var collection = "legaldong_emd";
            var query = $('#searchForm').serializeObject();
            var data = {
                searchKeyword: toSolrQuery(query, 'AND')
            }

            console.log(data);

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
        	
       		if(item.liNm == null){
       			item.liCd = item.emdCd;
       			item.liNm = "-";
       		}
       		
            var $tr = $('<tr/>')
                .append($('<td/>').txt(item.rnum))
                .append($('<td/>').txt(item.liCd ))
                .append($('<td/>').txt(item.sidoNm))
                .append($('<td/>').txt(item.sggNm ))
                .append($('<td/>').txt(item.emdNm ))
                .append($('<td/>').txt(item.liNm  ))
                .append($('<td/>').txt(item.registDt  ))
                
            return $tr;
        }

    </script>
</c:set>