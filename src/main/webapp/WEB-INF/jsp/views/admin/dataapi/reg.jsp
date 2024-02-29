<head>
    <title>데이터제공 관리</title>
</head>
<%--신청 현황--%>
<section class="wrapper">
    <h3>데이터제공 관리</h3>
    <div class="row mt">

        <div class="col-md-12">
            <div class="content-panel">
                <h4>API 신청현황</h4>
                <hr>
                <div class="col-md-12 searchMB">
                    <form class="form-inline" role="form" id="searchForm" onsubmit="return false;">
                        <div class="form-group mr10">
                            <select class="form-control" name="period">
                                <option value="">전체기간</option>
                                <option value="day">1일</option>
                                <option value="week">1주</option>
                                <option value="month">1개월</option>
                                <option value="halfyear">6개월</option>
                                <option value="year">1년</option>
                            </select>
                        </div>
                        <div class="form-group mr10">
                            <label for="id" class="mr10">상태</label>
                            <select class="form-control mr10" name="sttus">
                                <option value="">선택</option>
                                <option value="A">사용중</option>
                                <option value="R">신청</option>
                            </select>
                        </div>
                        <div class="form-group mr10">
                            <label class="mr10">기관명</label>
                            <input type="text" class="form-control" placeholder="검색어" name="insttNm">
                        </div>
                        <button type="button" class="btn btn-success searchBtn" onclick="retrieve(1)">검색</button>
                    </form>
                </div>
                <div class="total">
                    <p id="totalLabel"></p>
                </div>

                <table class="table table-striped table-advance table-hover">
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>기관명</th>
                        <th>접속URL</th>
                        <th>상태</th>
                        <th>API 인증키</th>
                        <th>가입일자</th>
                        <th>차단여부</th>
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

<jsp:include page="modal/apiUserDetail.jsp"/>


<c:set var="scripts" scope="request">
<script type="text/javascript">

    // ready
    $(function(){
        retrieve(1);

        // modal
        $('#apiDtlInfo').on('show.bs.modal', function (event) {
            apiUserDetailModal.init();

            var button = $(event.relatedTarget) // Button that triggered the modal
            var item = button.data('item');
            apiUserDetailModal.setData(item);
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
            listCnt: 10,
            currPage: currPage
        };
        var condition = $('#searchForm').serializeObject();
        $.extend(param, condition);

        $.ajax({
            type: 'get',
            url: '/admin/data-api/getApiUserList',
            dataType: 'json',
            contentType: 'application/json',
            data: param
        }).done(function (res) {
            console.log('response', res);

            if (res.list && res.list.length > 0) {
                var result = [];
                $.each(res.list, function (idx, item) {
                    var status = '';
                    if (item.sttus === 'R') item.sttusNm = '신청';
                    if (item.sttus === 'A') item.sttusNm = '사용중';

                    var row = createRow(item);
                    result.push(row);
                })
                $('#resultTbody').html(result);
                $('#pagination').pagination(currPage, res.maxPageCnt, retrieve);

            } else {
                $('#resultTbody').noDataList(7);
            }
            $('#totalLabel').setTotalCount(res, currPage);
        }).error(function (e) {
            console.error(e);
        });
    }

    function createRow(item) {
        // <tr>
        //     <td>10</td>
        //     <td><a href="javascript:void(0)" data-toggle="modal" data-target="#apiDtlInfo">SK텔레콤</a></td>
        //     <td>www.skt.co.kr</td>
        //     <td>신청</td>
        //     <td></td>
        //     <td>2020.05.12</td>
        //     <td>N</td>
        // </tr>
        var $title = $('<a/>').attr({'href': 'javascript:;', 'data-toggle': 'modal', 'data-target': '#apiDtlInfo'}).text(item.insttNm).data('item', item);

        if (item.blockAt == 'Y') {
            item.blockAtNm = '차단';
        } else if (item.blockAt == 'N') {
            item.blockAtNm = '-';
        }

        var $tr = $('<tr/>')
                    .append($('<td/>').text(item.rnum))
                    .append($('<td/>').append($title))
                    .append($('<td/>').text(item.conectUrl))
                    .append($('<td/>').text(item.sttusNm))
                    .append($('<td/>').text(item.apiCrtfcKey))
                    .append($('<td/>').text(formatDate(item.srbde)))
                    .append($('<td/>').text(item.blockAtNm));
        return $tr;
    }

</script>
</c:set>