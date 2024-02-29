<section class="wrapper">
    <h3>게시판 관리</h3>
    <div class="row mt">
        <div class="col-md-12">
            <div class="content-panel">
                <h4>FAQ 목록</h4>
                <hr>
                <div class="row">
                    <div class="col-md-4">
                        <div class="input-group">
                            <select class="form-control" name="faqTy" id="selectFaqTy">
                                <option value="">분류</option>
                                <c:forEach items="${faqTypes}" var="item">
                                    <option value="${item.code}">${item.codeNm}</option>
                                </c:forEach>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="total">
                    <p id="totalLabel"></p>
                    <button type="button" class="btn btn-theme04 btnSearch" onclick="location.href='/admin/board/faq/form'">추가</button>
                </div>

                <table class="table table-striped table-advance table-hover faqTbl">
                    <colgroup>
                        <col width="80px"/>
                        <col width="140px"/>
                        <col width="*"/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>분류</th>
                        <th>제목</th>
                    </tr>
                    </thead>
                    <tbody id="resultTbody">
<%--                    <tr>--%>
<%--                        <td>1</td>--%>
<%--                        <td>도로변경정보</td>--%>
<%--                        <td>--%>
<%--                            <a href="javascript:void(0);">활용방법2</a>--%>
<%--                            <div class="answerBox mt10">--%>
<%--                                <div class="inline mr30">--%>
<%--                                    <p>Q&A 답변 지도를 잘 봐보세요!!!</p>--%>
<%--                                    <p>Q&A 답변 지도를 잘 봐보세요!!!</p>--%>
<%--                                    <p>Q&A 답변 지도를 잘 봐보세요!!!</p>--%>
<%--                                    <p>Q&A 답변 지도를 잘 봐보세요!!!</p>--%>
<%--                                </div>--%>
<%--                                <div class="inline">--%>
<%--                                    <button type="button" class="btn btn-theme04 mr10" onclick="location.href='qnaWrite.html'">수정</button>--%>
<%--                                    <button type="button" class="btn btn-default">삭제</button>--%>
<%--                                </div>--%>
<%--                            </div>--%>
<%--                        </td>--%>
<%--                    </tr>--%>
                    </tbody>
                </table>

                <div class="paging" id="pagination"></div>

            </div><!-- /content-panel -->
        </div><!-- /col-md-12 -->
    </div><!-- /row -->

</section>

<script type="text/javascript">

    $(function () {
        retrieve();

        $('#selectFaqTy').on('change', function () {
            retrieve(1);
        });
    });

    function getOne(id) {
        location.href = '/admin/board/faq/view?id=' + id;
    }

    function retrieve(currPage) {

        if (!currPage) currPage = 1;

        var p = setDefault({
            url: '/rcic/faq/getFaqList',
            listCnt: 10,
            currPage: currPage,
            faqTy: $('#selectFaqTy').val()
        });
        $.commonAjax(p, '', function (res) {

            // list
            $('#resultTbody').html('');
            $.each(res.list, function (idx, item) {
                var $subject = $('<a/>').attr('href', 'javascript:;').text(item.faqSj).on('click', function () {
                    getOne(item.faqNo);
                });
                var $tr = $('<tr/>').append($('<td/>').text(item.rnum))
                                    .append($('<td/>').text(item.faqTyNm))
                                    .append($('<td/>').append($subject));
                $('#resultTbody').append($tr);
            });

            // paging
            var maxPage = res.maxPageCnt;
            $('#pagination').pagination(currPage, maxPage, retrieve);

            $('#totalLabel').setTotalCount(res, currPage);
        }, null, function (e) {
            console.error(e);
        });
    }

</script>