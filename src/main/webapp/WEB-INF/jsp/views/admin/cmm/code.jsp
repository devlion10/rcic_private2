<head>
    <title>참조정보 관리</title>
</head>
<%--코드 관리--%>
<section class="wrapper">
    <h3>참조정보 관리</h3>

    <div class="row mt">

        <div class="col-md-12">
            <div class="content-panel">
                <h4>공통코드</h4>
                <hr>
                <div class="col-md-12 searchMB">
                    <form class="form-inline" role="form" id="searchForm" onsubmit="return false;">
                        <div class="form-group mr10">
                            <select class="form-control" name="searchType">
                                <option value="groupNm">그룹코드명</option>
                                <option value="groupCode">그룹코드</option>
                            </select>
                        </div>
                        <div class="form-group mr10">
                            <input type="text" class="form-control" placeholder="검색어" name="keyword">
                        </div>

                        <button type="button" class="btn btn-success searchBtn" onclick="CodeGroup.retrieve(1)">검색</button>
                    </form>
                </div>

                <div>
                    <div class="total">
                        <p>코드그룹 목록</p>
                        <button type="button" class="btn btn-theme04 btnSearch" onclick="" data-toggle="modal" data-target="#deleteCode" data-type="group">삭제</button>
                        <button type="button" class="btn btn-primary mr10" onclick="" data-toggle="modal" data-target="#codeGroup">추가</button>
                    </div>

                    <table class="table table-striped table-advance table-hover">
                        <colgroup>
                            <col width="80px"/>
                            <col width="80px"/>
                            <col width="200px"/>
                            <col width="200px"/>
                            <col width="*"/>
                            <col width="100px"/>
                            <col width="120px"/>
                            <col width="100px"/>
                        </colgroup>
                        <thead>
                        <tr>
                            <th>선택</th>
                            <th>번호</th>
                            <th>그룹코드</th>
                            <th>코드그룹명</th>
                            <th>설명</th>
                            <th>사용여부</th>
                            <th>등록일자</th>
                            <th>수정</th>
                        </tr>
                        </thead>
                        <tbody id="resultTbody">
<%--                        <tr>--%>
<%--                            <td><input type="checkbox" name="check"  value=""></td>--%>
<%--                            <td>10</td>--%>
<%--                            <td>CD0001</td>--%>
<%--                            <td>공사종류</td>--%>
<%--                            <td>도로공사의 종류</td>--%>
<%--                            <td>사용</td>--%>
<%--                            <td>2020.05.04</td>--%>
<%--                            <td><button type="button" class="btn btn-info" data-toggle="modal" data-target="#codeGroup">수정</button></td>--%>
<%--                        </tr>--%>
                        </tbody>
                    </table>

                    <div class="paging" id="pagination"></div>
                </div>

                <div>
                    <div class="total">
                        <p>코드 목록</p>
                        <button type="button" class="btn btn-theme04 btnSearch" onclick="" data-toggle="modal" data-target="#deleteCode" data-type="detail">삭제</button>
                        <button type="button" class="btn btn-primary mr10" onclick="" data-toggle="modal" data-target="#code">추가</button>
                    </div>

                    <table class="table table-striped table-advance table-hover">
                        <colgroup>
                            <col width="80px"/>
                            <col width="80px"/>
                            <col width="*"/>
                            <col width="*"/>
                            <col width="100px"/>
                            <col width="120px"/>
                            <col width="100px"/>
                        </colgroup>
                        <thead>
                        <tr>
                            <th>선택</th>
                            <th>번호</th>
                            <th>코드</th>
                            <th>코드명</th>
                            <th>사용여부</th>
                            <th>등록일자</th>
                            <th>수정</th>
                        </tr>
                        </thead>
                        <tbody id="resultTbody2">
<%--                        <tr>--%>
<%--                            <td><input type="checkbox" name="check"  value=""></td>--%>
<%--                            <td>10</td>--%>
<%--                            <td>001</td>--%>
<%--                            <td>유지보수</td>--%>
<%--                            <td>사용</td>--%>
<%--                            <td>2020.05.04</td>--%>
<%--                            <td><button type="button" class="btn btn-info" data-toggle="modal" data-target="#code">수정</button></td>--%>
<%--                        </tr>--%>
                        </tbody>
                    </table>

                    <div class="paging" id="pagination2"></div>
                </div>

            </div><!-- /content-panel -->
        </div><!-- /col-md-12 -->
    </div><!-- /row -->

</section>

<jsp:include page="modal/modalCode.jsp"/>
<jsp:include page="modal/modalCodeGroup.jsp"/>
<jsp:include page="modal/modalDeleteCode.jsp"/>

<c:set var="scripts" scope="request">
<script type="text/javascript">

    // ready
    $(function(){
        console.clear();
        init();
        CodeGroup.retrieve(1);
    });

    // functions
    function init() {
        $('#searchForm input[type=text]').off('keydown').on('keydown', function (e) { // 전역에서 임의로 세팅한 것 off 했음
            if (e.keyCode === 13) {
                CodeGroup.retrieve(1);
            }
        });
    }

    var CodeGroup = {
        retrieve: function (currPage) {
            if (!currPage) currPage = 1;

            $('#pagination').twbsPagination('destroy');
            CodeDetail.initList();

            var param = {
                listCnt: 5,
                currPage: currPage,
            };
            var condition = $('#searchForm').serializeObject();
            $.extend(param, condition);

            apiGet('getCodeGroupList', param)
            .done(function (res) {
                if (res.list && res.list.length > 0) {
                    var result = [];
                    $.each(res.list, function (idx, item) {
                        var row = CodeGroup.createRow(item);
                        result.push(row);
                    })
                    $('#resultTbody').html(result);
                    $('#pagination').pagination(currPage, res.maxPageCnt, CodeGroup.retrieve);
                } else {
                    $('#resultTbody').noDataList(8);
                }
                $('#totalLabel').setTotalCount(res, currPage);
            }).error(function (e) {
                console.error(e);
                $('#resultTbody').noDataList(7);
                alert('오류가 발생했습니다.');
            });
        },
        createRow: function (item) {

            var checkbox = $('<input/>').attr({type: 'checkbox', name: 'chk'}).val(item.groupCode);
            var button = $('<button type="button" class="btn btn-info" data-toggle="modal" data-target="#codeGroup">수정</button>').data('item', item);
            var $title = $('<a/>').text(item.groupNm).attr('href', 'javascript:;').on('click', function () {
                CodeDetail.groupCode = item.groupCode;
                CodeDetail.retrieve(1);
            });
            var useLabel = item.useYn.toUpperCase() == 'Y' ? '사용':'미사용';

            var row = $('<tr/>')
                .append($('<td/>').html(checkbox)) // 선택
                .append($('<td/>').txt(item.rnum)) // 번호
                .append($('<td/>').txt(item.groupCode)) // 그룹코드
                .append($('<td/>').html($title)) // 코드그룹명
                .append($('<td/>').txt(item.codeDc)) // 설명
                .append($('<td/>').txt(useLabel)) // 사용여부
                .append($('<td/>').txt(item.registDt)) // 등록일자
                .append($('<td/>').html(button)) // 수정 FIXME
            return row;
        },
        get: function (code) {
            return apiGet('getCodeGroup', {groupCode: code});
        },
        save: function (param) {
            return apiPost('saveCodeGroup', param)
        },
        update: function (param) {
            return apiPost('saveCodeGroup', param)
        },
        remove: function (param) {
            return apiPost('deleteCodeGroupList', param)
        },
        getCheckedList: function () {
            var $checked = $('#resultTbody').find('input[type=checkbox]:checked')
            return $.map($checked, function (ele) {
                return $(ele).val();
            });
        }
    };

    var CodeDetail = {
        groupCode: null, // selected
        initList: function () {
            CodeDetail.groupCode = null;
            $('#resultTbody2').noDataList(7, '코드 그룹을 선택하세요.');
            $('#pagination2').twbsPagination('destroy');
        },
        retrieve: function (currPage) {
            if (!CodeDetail.groupCode) return;

            if (!currPage) currPage = 1;

            var param = {
                listCnt: 5,
                currPage: currPage,
                groupCode: CodeDetail.groupCode
            };

            apiGet('getCodeDetailList', param)
                .done(function (res) {
                    if (res.list && res.list.length > 0) {
                        var result = [];
                        $.each(res.list, function (idx, item) {
                            var row = CodeDetail.createRow(item);
                            result.push(row);
                        })
                        $('#resultTbody2').html(result);
                        $('#pagination2').pagination(currPage, res.maxPageCnt, CodeDetail.retrieve);
                    } else {
                        $('#resultTbody2').noDataList(8);
                    }
                    $('#totalLabel2').setTotalCount(res, currPage);
                }).error(function (e) {
                console.error(e);
                $('#resultTbody2').noDataList(7);
                alert('오류가 발생했습니다.');
            });
        },
        createRow: function (item) {

            var checkbox = $('<input/>').attr({type: 'checkbox', name: 'chk'}).val(item.code);
            var button = $('<button type="button" class="btn btn-info" data-toggle="modal" data-target="#code">수정</button>').data('item', item);
            var useLabel = item.useYn.toUpperCase() == 'Y' ? '사용':'미사용';

            var row = $('<tr/>')
                .append($('<td/>').html(checkbox)) // 선택
                .append($('<td/>').txt(item.rnum)) // 번호
                .append($('<td/>').txt(item.code)) // 코드
                .append($('<td/>').txt(item.codeNm)) // 코드명
                .append($('<td/>').txt(useLabel)) // 사용여부
                .append($('<td/>').txt(item.registDt)) // 등록일자
                .append($('<td/>').html(button)) // 수정
            return row;
        },
        getListByGroup: function (groupCode) {
            var param = {skipPaging: 'true', listCnt: 10, currPage: 1, gruopCode: groupCode};
            return apiGet('getCodeDetailList', param);
        },
        getList: function (param) {
            return apiGet('getCodeDetailList', param);
        },
        get: function (groupCode, detailCode) {
            var param = {groupCode: groupCode, code: detailCode};
            return apiGet('getCodeDetail', param);
        },
        save: function (param) {
            return apiPost('saveCodeDetail', param);
        },
        update: function (param) {
            return apiPost('updateCodeDetail', param);
        },
        remove: function (param) {
            return apiPost('deleteCodeDetailList', param);
        },
        getCheckedList: function () {
            var $checked = $('#resultTbody2').find('input[type=checkbox]:checked')
            return $.map($checked, function (ele) {
                return $(ele).val();
            });
        }
    };


    // region etc
    function apiGet(service, param) {
        return $.ajax({
            type: 'get',
            url: '/admin/cmm/code/' + service,
            contentType: 'application/json',
            traditional: true,
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
    // endregion
</script>
</c:set>