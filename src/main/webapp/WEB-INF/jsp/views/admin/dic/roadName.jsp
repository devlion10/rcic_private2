<head>
    <title>명칭사전 관리</title>
</head>
<%--새주소도로명--%>
<section class="wrapper">
    <h3>명칭사전 관리</h3>
    <div class="row mt">

        <div class="col-md-12">
            <div class="content-panel">
                <h4>도로명주소(도로구간)</h4>
                <hr>
                <div class="col-md-12 searchMB">
                    <form class="form-inline" role="form" id="searchForm">
                        <jsp:include page="../common/search-region-select.jsp">
                            <jsp:param name="styleClass" value="mr10"/>
                        </jsp:include>
                        <div class="form-group mr10">
                            <input type="text" class="form-control" placeholder="도로명" name="rn">
                        </div>
                        <button type="button" class="btn btn-success searchBtn" onclick="retrieve(1)">검색</button>
                         <!--
                         <button type="button" class="btn btn-success searchBtn" id="btnDataCntcAll">전체분 적재</button>
                        <button type="button" class="btn btn-success searchBtn" id="btnDataCntcAllMig">전체분을 기존테이블에 마이그레이션</button>
                        <button type="button" class="btn btn-success searchBtn" id="btnDataCntcChange">변동분 연계</button> 
                        -->
                    </form>
                </div>
                <div class="total">
                    <!-- <p>전체 <span>10건</span>[<span>1/1</span>페이지]</p> -->
                </div>

                <table class="table table-striped table-advance table-hover">
                    <colgroup>    
                        <col width="120px"/>
                        <col width="*"/>
                        <col width="*"/>
                        <col width="*"/>
                        <col width="*"/>
                        <col width="*"/>
                        <col width="*"/>
                        <col width="150px"/>
                        <col width="150px"/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>도로명</th>
                        <th>도로명(영문)</th>
                        <th>기점/종점</th>
                        <th>시도</th>
                        <th>시군구</th>
                        <th>읍면동</th>
                        <th>등록일시</th>
                        <th>변동일시</th>
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
        initEvent1();
        initEvent2();
        initEvent3();
        
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
    
    function initEvent1() {
		// 전체분 적재
		document.getElementById('btnDataCntcAll').addEventListener('click', function(event){
            var param = {
                };
             $.ajax({
                type: 'get',
                url: '/admin/dic/road-name/DataCntcAll',
                data: param,
                contentType: 'application/json'
            }).done(function (res) {
               	alert("Done!!");
            }).error(function (e) {
            	alert("Error!!");
            });
 		});

    }
    
    function initEvent2() {
    	// 전체분 마이그레이션
		document.getElementById('btnDataCntcAllMig').addEventListener('click', function(event){
           var param = {
                };
            
			$.ajax({
                type: 'get',
                url: '/admin/dic/road-name/DataCntcAllMig',
                data: param,
                contentType: 'application/json'
            }).done(function (res) {
            	alert("Done!!");
            }).error(function (e) {
            	alert("Error!!");
            });
 		});

    }
    
    function initEvent3() {
    	// 변동분 적재
		document.getElementById('btnDataCntcChange').addEventListener('click', function(event){
            var param = {
                };
            
			$.ajax({
                type: 'get',
                url: '/admin/dic/road-name/DataCntcChange',
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

        if (!currPage) currPage = '1';

        var listCnt = '10';
        var startPage = String((parseInt(currPage)-1)*parseInt(listCnt));
        var collection = "tl_road_name";
        // var collection = "tl_road_name";
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
            .append($('<td/>').txt(item.rn)) // 도로명
            .append($('<td/>').txt(item.eng_rn)) // 도로명(영문)
            //.append($('<td/>').txt(item.rds_man_no)) // 도로구간일련번호
            .append($('<td/>').txt(item.rbp_cn + " → " + item.rep_cn )) // 기점/종점
            .append($('<td/>').txt(item.sido_nm)) // 시도
            .append($('<td/>').txt(item.sgg_nm)) // 시군구
            .append($('<td/>').txt(item.emd_nm)) // 읍면동
            .append($('<td/>').txt(item.regist_dt!=null?item.regist_dt.substring(0, 10):'')) // 등록일시
            .append($('<td/>').txt(item.updt_dt!=null?item.updt_dt.substring(0, 10):'')) // 수정일시
        return $tr;
    }
    
   

</script>
</c:set>