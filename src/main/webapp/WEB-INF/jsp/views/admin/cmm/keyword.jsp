<head>
    <title>참조정보 관리</title>
</head>
<%--수집분석 키워드 --%>
<section class="wrapper">
    <h3>참조정보 관리</h3>

    <div class="row mt">

        <div class="col-md-12">
            <div class="content-panel">
                <h4>수집/분석 키워드</h4>
                <hr>
                <div class="col-md-12 searchMB">
                    <form class="form-inline" role="form" onsubmit="return false;" id="searchForm">
                        <div class="form-group mr10">
                            <select class="form-control" name="groupCode">
                                <option value="">구분</option>
                                <option value="CD0004">공사종류</option>
                                <option value="CD0002">시설물종류</option>
                            </select>
                        </div>
                        <div class="form-group mr10">
                            <input type="text" class="form-control" placeholder="검색어" name="keyword">
                        </div>

                        <button type="button" class="btn btn-success searchBtn" onclick="Keyword.retrieve(1)">검색</button>
                    </form>
                </div>
                <div class="total">
                    <p id="totalLabel"></p>
                    <button type="button" class="btn btn-theme04 btnSearch" onclick="javascript:;" data-toggle="modal" data-target="#deleteConf">삭제</button>
                    <button type="button" class="btn btn-primary mr10" onclick="javascript:;" data-toggle="modal" data-target="#amKeyword">추가</button>
                    <!-- <button type="button" class="btn btn-secondary mr20" data-toggle="modal" data-target="#testColl">테스트 수집</button> -->
                </div>

                <table class="table table-striped table-advance table-hover">
                    <colgroup>
                        <col width="80px"/>
                        <col width="80px"/>
                        <col width="20%"/>
                        <col width="*"/>
                        <col width="200px"/>
                        <col width="200px"/>
                        <col width="100px"/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th>선택</th>
                        <th>번호</th>
                        <th>구분</th>
                        <th>키워드</th>
                        <th>사용여부</th>
                        <th>생성일자</th>
<%--                        <th>수정일자</th>--%>
                        <th>수정</th>
                    </tr>
                    </thead>
                    <tbody id="resultTbody">
<%--                    <tr>--%>
<%--                        <td><input type="checkbox" name="check" id="" value=""></td>--%>
<%--                        <td>10</td>--%>
<%--                        <td>공사종류</td>--%>
<%--                        <td>도로확장</td>--%>
<%--                        <td>사용</td>--%>
<%--                        <td>2020.05.04</td>--%>
<%--                        <td></td>--%>
<%--                        <td><button type="button" class="btn btn-info" data-toggle="modal" data-target="#amKeyword">수정</button></td>--%>
<%--                    </tr>--%>
                    </tbody>
                </table>

                <div class="paging" id="pagination">
                    <div class="testCollBox">
                        <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#testColl">테스트 수집</button>
                    </div>
                </div>

            </div><!-- /content-panel -->
        </div><!-- /col-md-12 -->
    </div><!-- /row -->

</section>

<jsp:include page="modal/modalKeyword.jsp"/>
<jsp:include page="modal/modalDeleteKeyword.jsp"/>
<jsp:include page="modal/modalTestCollect.jsp"/>

<c:set var="scripts" scope="request">
<script type="text/javascript">

    // ready
    $(function(){
        init();
        Keyword.retrieve(1);
    });

    // functions
    function init() {
        $('#searchForm input[type=text]').off('keydown').on('keydown', function (e) { // 전역에서 임의로 세팅한 것 off 했음
            if (e.keyCode === 13) {
                Keyword.retrieve(1);
            }
        });
    }

    var Keyword = {
        retrieve: function (currPage) {
            if (!currPage) currPage = 1;
            $('#pagination').twbsPagination('destroy');

            var param = {
                listCnt: 10,
                currPage: currPage,
                codeGroupList: 'CD0002,CD0004'
            }
            var condition = $('#searchForm').serializeObject();
            $.extend(param, condition);


            apiGet('getCodeDetailList', param).done(function (res) {
                if (res.list && res.list.length > 0) {
                    var result = [];
                    $.each(res.list, function (idx, item) {
                        var row = Keyword.createRow(item);
                        result.push(row);
                    })
                    $('#resultTbody').html(result);
                    $('#pagination').pagination(currPage, res.maxPageCnt, Keyword.retrieve);
                } else {
                    $('#resultTbody').noDataList(8);
                }
                $('#totalLabel').setTotalCount(res, currPage);
            }).error(function (e) {
                console.error(e);
                $('#resultTbody').noDataList(7);
                alert('오류가 발생했습니다.');
            })
        },
        createRow: function (item) {

            var codeData = {groupCode: item.groupCode, code: item.code};
            var checkbox = $('<input/>').attr({type: 'checkbox', name: 'chk'}).val(item.code).data('delCodeInfo', codeData);
            var button = $('<button type="button" class="btn btn-info" data-toggle="modal" data-target="#amKeyword">수정</button>').data('item', item);
            var useLabel = item.useYn.toUpperCase() == 'Y' ? '사용':'미사용';

            var row = $('<tr/>')
                .append($('<td/>').append(checkbox))
                .append($('<td/>').txt(item.rnum)) // 번호
                .append($('<td/>').txt(item.groupNm)) // 구분
                .append($('<td/>').txt(item.codeNm)) // 키워드
                .append($('<td/>').txt(useLabel)) // 사용여부
                .append($('<td/>').txt(item.registDt)) // 생성일자
                // .append($('<td/>').txt(item.updtDt)) // 수정일자
                .append($('<td/>').append(button)) // 수정
            return row;
        },
        getCheckedList: function () {
            var $checked = $('#resultTbody').find('input[type=checkbox]:checked')
            return $.map($checked, function (ele) {
                return $(ele).data('delCodeInfo');
            });
        }
    }




    function apiGet(service, param, async) {
        return $.ajax({
            type: 'get',
            url: '/admin/cmm/code/' + service,
            contentType: 'application/json',
            traditional: true,
            async: async !== null ? async : true,
            data: param
        });
    }
    function apiPost(service, param) {
        return $.ajax({
            type: 'post',
            url: '/admin/cmm/code/' + service,
            contentType: 'application/json',
            data: JSON.stringify(param)
        });
    }
</script>
</c:set>