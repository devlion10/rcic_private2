<head>
    <title>게시판 관리</title>
</head>
<section class="wrapper">
    <h3>게시판 관리</h3>
    <div class="row mt">
        <div class="col-md-12">
            <div class="content-panel">
                <h4>질문/답변 목록</h4>
                <hr>
                <div class="col-md-12 boardSearch">
                    <form class="form-inline" role="form" id="searchForm" onsubmit="return false;">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="input-group mr10">
                                    <select class="form-control" id="selectQnaTy" name="qestnTy">
                                        <option value="">전체</option>
                                        <c:forEach items="${questionTypes}" var="item">
                                            <option value="${item.code}">${item.codeNm}</option>
                                        </c:forEach>
                                    </select>
                                </div>
                                <div class="input-group mr10">
                                    <select class="form-control" name="searchType">
                                        <option value="sj">제목</option>
                                        <option value="sjcn">제목+내용</option>
                                    </select>
                                </div>
                                <div class="input-group mr10">
                                    <select class="form-control" name="answer">
                                        <option value="">상태</option>
                                        <option value="W">답변필요</option>
                                        <option value="A">답변완료</option>
                                    </select>
                                </div>
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Search" id="searchKeyword" name="keyword"/>
                                    <div class="input-group-btn">
                                        <button type="button" class="btn btn-primary" id="searchBtn" onclick="retrieve(1)"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="total">
                    <p id="totalLabel"></p>
                </div>

                <table class="table table-striped table-advance table-hover QATbl">
                    <colgroup>
                        <col width="80px"/>
                        <col width="120px"/>
                        <col width="*"/>
                        <col width="15%"/>
                        <col width="15%"/>
                        <col width="15%"/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>분류</th>
                        <th>제목</th>
                        <th>질문자</th>
                        <th>작성일</th>
                        <th>확인여부</th>
                    </tr>
                    </thead>
                    <tbody id="resultTbody">
<%--                    <tr>--%>
<%--                        <td>6</td>--%>
<%--                        <td>도로명정보</td>--%>
<%--                        <td><a href="QaView.html?bno=6">국도1호선 OOO구간 도로공사 관련</a></td>--%>
<%--                        <td>기관명/성명</td>--%>
<%--                        <td>2020.08.16</td>--%>
<%--                        <td>답변필요</td>--%>
<%--                    </tr>--%>
                    </tbody>
                </table>

                <div class="paging" id="pagination"></div>

            </div><!-- /content-panel -->
        </div><!-- /col-md-12 -->
    </div><!-- /row -->

</section>

<c:set var="scripts" scope="request">
<script type="text/javascript">

    $(function () {
        retrieve();
    });

    function getOne(id) {
        location.href = '/admin/board/qna/view?id=' + id;
    }

    function retrieve(currPage) {

        if (!currPage) currPage = 1;

        var param = {
            url: '/rcic/qaBbs/getQaBbsList',
            listCnt: 10,
            currPage: currPage,
        };
        var condition = $('#searchForm').serializeObject();
        $.extend(param, condition);

        $('#resultTbody').empty();

        var p = setDefault(param);
        $.commonAjax(p, '', function (res) {

            if ($.isNotEmpty(res.list)) {
                // list
                $('#resultTbody').html('');
                var list = [];
                $.each(res.list, function (idx, item) {
                    var row = createRow(item);
                    list.push(row);
                });
                $('#resultTbody').html(list);

                // paging
                var maxPage = res.maxPageCnt;
                $('#pagination').pagination(currPage, maxPage, retrieve);
            } else {
                $('#resultTbody').noDataList(6);
            }

            $('#totalLabel').setTotalCount(res, currPage);
        }, null, function (e) {
            console.error(e);
        });
    }

    function createRow(item) {
        var status = $.trim(item.answrDt) ? '답변완료' : '답변필요';
        var $title = $('<a/>').text(item.qestnSj).attr('href', '/admin/board/qna/form?id=' + item.id);

        var $tr = $('<tr/>')
                    .append($('<td/>').txt(item.rnum)) // 번호
                    .append($('<td/>').txt(item.qestnTyNm)) // 분류
                    .append($('<td/>').html($title)) // 제목
                    .append($('<td/>').txt(item.userNm)) // 질문자
                    .append($('<td/>').txt(item.registDate)) // 작성일
                    .append($('<td/>').txt(status)) // 확인여부
        return $tr;
    }

</script>
</c:set>