<head>
    <title>사용자 관리</title>
</head>

<section class="wrapper">
    <h3>사용자 관리</h3>

    <div class="row mt">
        <div class="col-md-12">
            <div class="content-panel">
                <h4>권한 목록</h4>
                <hr>

                <div class="total">
                    <p id="totalLabel"></p>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addAuthInfoModal">추가</button>
                </div>

                <table class="table table-striped table-advance table-hover">
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>권한명</th>
                        <th>사용자 수</th>
                        <th>등록자아이디</th>
                        <th>등록 일시</th>
                        <th>수정 일시</th>
                    </tr>
                    </thead>
                    <tbody id="resultBody">
                    <%--<tr>--%>
                    <%--    <td>5</td>--%>
                    <%--    <td><a href="javascript:showAuthInfoDetail();">국토관리청</a></td>--%>
                    <%--    <td>120</td>--%>
                    <%--    <td>Rcic.adm</td>--%>
                    <%--    <td>2020.09.09</td>--%>
                    <%--    <td>2020.09.15</td>--%>
                    <%--</tr>--%>
                    </tbody>
                </table>

                <div class="paging" id="pagination">
                </div>
            </div><!-- /content-panel -->
        </div><!-- /col-md-12 -->
    </div><!-- /row -->

    <%@ include file="authInfoDetail.jsp" %>
</section>

<jsp:include page="modal/addAuthInfo.jsp"/>

<c:set var="scripts" scope="request">
<script type="text/javascript">
    var page = {};

    (function () {
        $(function () {
            page.retrieve(1);
        });

        page = {
            data: {
                currPage: 1
            },
            refs: {
            },
            retrieve: function (searchPage) {
                page.data.currPage = searchPage ? searchPage : 1

                var p = setDefault({
                    url: '/admin/user/authInfo/getAuthInfoList',
                    listCnt: 10,
                    currPage: page.data.currPage
                });

                $.commonAjax(p, '', function (res) {
                    // list
                    $('#resultBody').empty();

                    $('#totalLabel').setTotalCount(res, page.data.currPage);

                    $.each(res.list, function (idx, item) {


                        var $authNm = $('<a/>').attr({ 'href': 'javascript:', 'class': 'showAuthInfoDetail' })
                                               .text(item.authNm).data('item', item);

                        var $tr = $('<tr/>').append($('<td/>').text(item.rnum))
                                            .append($('<td/>').append($authNm))
                                            .append($('<td/>').text(item.useCnt))
                                            .append($('<td/>').text(item.registId))
                                            .append($('<td/>').text(item.registDt))
                                            .append($('<td/>').text(item.updtDt));

                        $('#resultBody').append($tr);
                    });

                    $('a.showAuthInfoDetail').on('click', page.showAuthInfoDetail);

                    // paging
                    var maxPage = res.maxPageCnt;
                    $('#pagination').pagination(page.data.currPage, maxPage, page.retrieve);
                }, null, function (e) {
                    console.error(e);
                });
            },
            showAuthInfoDetail: function () {
                authInfoDetail.show($(this).data('item'));
            }
        }
    })();
</script>
</c:set>
