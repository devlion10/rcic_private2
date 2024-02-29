<head>
    <title>게시판 관리</title>
</head>
<section class="wrapper">
    <h3>게시판 관리</h3>
    <div class="row mt">
        <div class="col-md-12">
            <div class="content-panel">
                <h4>공지사항 목록</h4>
                <hr>
                <div class="col-md-12 boardSearch">
                    <form class="form-inline" role="form" onsubmit="return false">
                        <div class="row">
                            <div class="col-md-12">
<%--                                TODO--%>
<%--                                <div class="input-group mr10">--%>
<%--                                    <select class="form-control">--%>
<%--                                        <option>전체기간</option>--%>
<%--                                        <option>1일</option>--%>
<%--                                        <option>1주</option>--%>
<%--                                        <option>1개월</option>--%>
<%--                                        <option>6개월</option>--%>
<%--                                        <option>1년</option>--%>
<%--                                        <option>기간선택</option>--%>
<%--                                    </select>--%>
<%--                                </div>--%>
                                <div class="input-group mr10">
                                    <select class="form-control" id="searchType">
                                        <option value="sj">제목</option>
                                        <option value="sjcn">제목+내용</option>
                                    </select>
                                </div>
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Search" id="keyword"/>
                                    <div class="input-group-btn">
                                        <button type="button" class="btn btn-primary" onclick="retrieve(1)"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="total">
                    <p id="totalLabel"></p>
                    <button type="button" class="btn btn-theme04 btnSearch" onclick="location.href='/admin/board/notice/form'">공지사항 등록</button>
                </div>

                <table class="table table-striped table-advance table-hover boardListTbl">
                    <colgroup>
                        <col width="80px"/>
                        <col width="*"/>
                        <col width="80px"/>
                        <col width="15%"/>
                        <col width="15%"/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>첨부파일</th>
                        <th>작성일</th>
                        <th>조회수</th>
                    </tr>
                    </thead>
                    <tbody id="resultTbody">
<%--                    <tr>--%>
<%--                        <td>1</td>--%>
<%--                        <td><a href="boardView.html?bno=1">공지1</a></td>--%>
<%--                        <td><span class="glyphicon glyphicon-folder-open" aria-hidden="true"></span></td>--%>
<%--                        <td>2020.05.12</td>--%>
<%--                        <td>23</td>--%>
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

        $('#keyword').on('keydown', function (e) {
            if (e.keyCode === 13) {
                retrieve(1);
            }
        });
    });

    function getOne(id) {
        location.href = '/admin/board/faq/view?id=' + id;
    }

    function retrieve(currPage) {
        if (!currPage) currPage = 1;

        var p = setDefault({
            url: '/rcic/notice/getNoticeList',
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

    function createRow(item) {
        var attachIcon = '';
        if (hasFile(item)) {
            attachIcon = '<span class="glyphicon glyphicon-folder-open" aria-hidden="true"></span>';
        }

        var $subject = $('<a/>').attr('href', 'javascript:;').text(item.sj).on('click', function () {
            goDetail(item.noticeNo);
        });

        var $tr = $('<tr/>')
                .append($('<td/>').txt(item.rnum)) // 번호
                .append($('<td/>').html($subject))   // 공지제목
                .append($('<td/>').html(attachIcon)) // 첨부파일
                .append($('<td/>').txt(item.registDt)) // 작성일
                .append($('<td/>').txt(item.rdcnt)); // 조회수
        return $tr;
    }

    function hasFile(item) {
        return item.fileCnt > 0;
    }

    function goDetail(id) {
        location.href = '/admin/board/notice/view?id=' + id;
    }

</script>
</c:set>