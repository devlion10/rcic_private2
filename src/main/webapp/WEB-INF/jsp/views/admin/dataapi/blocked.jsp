<head>
    <title>데이터제공 관리</title>
</head>
<%--차단 관리--%>
<section class="wrapper">
    <h3>데이터제공 관리</h3>
    <div class="row mt">

        <div class="col-md-12">
            <div class="content-panel">
                <h4>API 차단관리</h4>
                <hr>
                <div class="col-md-12 searchMB">
                    <form class="form-inline" role="form" id="searchForm" onsubmit="return false;">
                        <div class="form-group mr10">
                            <label class="mr10">기관명</label>
                            <input type="text" class="form-control" placeholder="검색어" name="insttNm">
                        </div>
                        <div class="form-group mr10">
                            <label for="selblockSe" class="mr10">차단/해제구분</label>
                            <select class="form-control mr10" name="blockSe" id="selblockSe">
                                <option value="">전체</option>
                                <option value="1">차단</option>
                                <option value="2">해제</option>
                            </select>
                        </div>

                        <button type="button" class="btn btn-success searchBtn" onclick="retrieve(1)">검색</button>
                    </form>
                </div>
                <div class="total">
                    <p id="totalLabel"></p>
                    <button type="button" class="btn btn-theme04 btnSearch" data-toggle="modal" data-target="#userBlock">차단등록</button>
                </div>

                <table class="table table-striped table-advance table-hover">
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>기관명</th>
                        <th>API 인증키</th>
                        <th>차단/해제구분</th>
                        <th>차단/해제사유</th>
                        <th>차단시작일</th>
                        <th>차단종료일</th>
                        <th>해제일자</th>
                    </tr>
                    </thead>
                    <tbody id="resultTbody">
<%--                    <tr>--%>
<%--                        <td>1</td>--%>
<%--                        <td><a href="javascript:void(0)" data-toggle="modal" data-target="#apiDtlInfo">OOO</a></td>--%>
<%--                        <td>QVBJMjAyMDEwMzExMDMxMTEzOQ==</td>--%>
<%--                        <td>차단</td>--%>
<%--                        <td>사용자 요청</td>--%>
<%--                        <td>2020.04.21</td>--%>
<%--                        <td>2020.05.30</td>--%>
<%--                        <td>2020.05.05</td>--%>
<%--                    </tr>--%>
                    </tbody>
                </table>

                <div class="paging" id="pagination"></div>

            </div><!-- /content-panel -->
        </div><!-- /col-md-12 -->
    </div><!-- /row -->

</section><!-- /wrapper -->

<!-- 여기서부터 모달 -->
<jsp:include page="modal/userBlock.jsp"/>
<jsp:include page="modal/apiAgency.jsp"/>
<jsp:include page="modal/blockUserDetail.jsp"/>

<c:set var="scripts" scope="request">
<script type="text/javascript">

    // ready
    $(function(){
        retrieve(1);

        // modal 차단등록
        $('#userBlock').on('show.bs.modal', function (event) {
            modalUserBlock.init();
            modalUserBlock.onAdd = function () {
                retrieve(1);
            };
        });

        // modal 차단된 유저 상세
        $('#blockUserDtlInfo').on('show.bs.modal', function (event) {
            modalBlockUser.init();

            var button = $(event.relatedTarget) // Button that triggered the modal
            var item = button.data('item');
            modalBlockUser.setData(item);
        });


    });

    // functions
    function init() {

    }

    /**
     * 목록 조회
     * @param currPage
     */
    function retrieve(currPage) {
        if (!currPage) currPage = 1;

        $('#resultTbody').noDataList(7);

        var param = {
            type: 'get',
            listCnt: 10,
            currPage: currPage
        };
        var condition = $('#searchForm').serializeObject();
        $.extend(param, condition);

        $.ajax({
            url: '/admin/data-api/block/getApiBlockInfoList',
            dataType: 'json',
            contentType: 'application/json',
            data: param
        }).done(function (res) {
            console.log('response', res);
            if (res.list && res.list.length > 0) {
                var result = [];
                $.each(res.list, function (idx, item) {

                    if (item.blockSe == '1') item.blockSeNm = '차단';
                    if (item.blockSe == '2') item.blockSeNm = '해제';


                    var row = createRow(item);
                    result.push(row);
                })
                $('#resultTbody').html(result);
                $('#pagination').pagination(currPage, res.maxPageCnt, retrieve);
            } else {
                $('#resultTbody').noDataList(8);
            }
            $('#totalLabel').setTotalCount(res, currPage);

        }).error(function (e) {
            console.error(e);
        });
    }

    function createRow(item) {

        var $title = $('<a/>').attr({'href': '#', 'data-toggle': 'modal', 'data-target': '#blockUserDtlInfo'}).text(item.insttNm).data('item', item);
        var $tr = $('<tr/>')
            .append($('<td/>').text(item.rnum))
            .append($('<td/>').append($title))
            .append($('<td/>').text(item.apiCrtfcKey))
            .append($('<td/>').text(item.blockSeNm))
            .append($('<td/>').text(item.blockReason))
            .append($('<td/>').text(formatDate(item.blockBeginDe)))
            .append($('<td/>').text(formatDate(item.blockEndDe)))
            .append($('<td/>').text(formatDate(item.relisDe)))
        return $tr;
    }

</script>
</script>
</c:set>