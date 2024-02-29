<head>
    <title>사용자 관리</title>
</head>

<section class="wrapper">
    <h3>사용자 관리</h3>

    <div class="row mt">
        <div class="col-md-12">
            <div class="content-panel">
                <h4>사용자 목록</h4>
                <hr>

                <div class="col-md-12 searchMB">
                    <form class="form-inline" role="form">
                        <div class="form-group mr10">
                            <label for="userId" class="mr10">사용자 ID</label>
                            <input type="text" id="userId" class="form-control">
                        </div>
                        <div class="form-group mr10">
                            <label for="userNm" class="mr10">이름</label>
                            <input type="text" id="userNm" class="form-control">
                        </div>
                        <div class="form-group mr10">
                            <label for="startDate" class="mr10">가입일자</label>
                            <input id="startDate" name="startDate" type="text" value="" class="form-control"/>
                            &nbsp;
                            ~
                            &nbsp;
                            <input id="endDate" name="endDate" type="text" value="" class="form-control"/>
                        </div>
                        <div class="form-group mr10">
                            <label for="insttSe" class="mr10">기관구분</label>
                            <select class="form-control" id="insttSe">
                                <option value="">기관</option>
                                <c:forEach var="item" items="${insttSeList}">
                                    <option value="${item.code}">${item.codeNm}</option>
                                </c:forEach>
                            </select>
                        </div>
                        <div class="form-group mr20">
                            <label class="mr10">상태</label>
                            <select class="form-control" id="sttus">
                                <option value="">상태</option>
                                <c:forEach var="item" items="${sttusList}">
                                    <option value="${item.code}">${item.codeNm}</option>
                                </c:forEach>
                            </select>
                        </div>
                        <button type="button" class="btn btn-success searchBtn" onclick="page.retrieve(1)">검색</button>
                    </form>
                </div>

                <div class="total">
                    <p id="totalLabel"></p>
                    <button type="button" class="btn btn-theme04 btnSearch" onclick="page.openBatchModal()">사용자 승인</button>
                </div>

                <table class="table table-striped table-advance table-hover">
                    <colgroup>
                        <col width="80px"/>
                        <col width="80px"/>
                        <col width="*"/>
                        <col width="8%"/>
                        <col width="8%"/>
                        <col width="8%"/>
                        <col width="8%"/>
                        <col width="8%"/>
                        <col width="8%"/>
                        <col width="10%"/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th><input type="checkbox" id="checkAllUser"></th>
                        <th>No.</th>
                        <th>사용자ID</th>
                        <th>사용자명</th>
                        <th>기관구분</th>
                        <th>기관명</th>
                        <th>연락처</th>
                        <th>상태</th>
                        <th>가입일자</th>
                        <th>권한</th>
                    </tr>
                    </thead>
                    <tbody id="resultBody"> 
                    </tbody>
                </table>

                <div class="paging" id="pagination">
                </div>
            </div><!-- /content-panel -->
        </div><!-- /col-md-12 -->
    </div><!-- /row -->
</section>

<jsp:include page="modal/userDetail.jsp">
    <jsp:param name="authInfoList" value="${authInfoList}"/>
</jsp:include>

<jsp:include page="modal/userBatch.jsp">
    <jsp:param name="authInfoList" value="${authInfoList}"/>
</jsp:include>

<c:set var="scripts" scope="request">
<script type="text/javascript">
    var page = {};

    (function () {
        $(function () {

            $('#startDate').datepicker('setDate', moment().add(-6, 'months').format('YYYY-MM-DD'));
            
            $('#endDate').datepicker('setDate', moment().add(1, 'day').format('YYYY-MM-DD'));

            page.retrieve(1);

            $('#userId, #userNm').on('keyup', function (key) {
                if (key.keyCode === 13) {
                    page.retrieve(1);
                }
            });

            $('#detailModal').on('show.bs.modal', function (event) {
                detailModal.init($(event.relatedTarget).data('item'));
            });
        });

        page = {
            data: {
                currPage: 1
            },
            refs: {
            },
            retrieve: function (searchPage) {
                page.data.currPage = searchPage ? searchPage : 1;

                var p = setDefault({
                    url: '/admin/user/users/getUserList',
                    listCnt: 10,
                    currPage: page.data.currPage,
                    userId: $('#userId').val(),
                    userNm: $('#userNm').val(),
                    startDate: $('#startDate').val(),
                    endDate: $('#endDate').val(),
                    insttSe: $('#insttSe').val(),
                    sttus: $('#sttus').val()
                });

                $.commonAjax(p, '', function (res) {
                    // list
                    $('#resultBody').empty();

                    $('#totalLabel').setTotalCount(res, page.data.currPage);

                    if ($.isNotEmpty(res.list)) {
                        $.each(res.list, function (idx, item) {
                            var $checkBox = $('<input/>').attr({ 'type': 'checkbox', 'class': 'checkUser', 'value': item.userSeq })
                                                         .data('item', item);

                            var $userId = $('<a/>').attr({ 'href': 'javascript:', 'data-toggle': 'modal', 'data-target': '#detailModal' })
                                                   .text(item.userId).data('item', item);

                            var $tr = $('<tr/>').append($('<td/>').append($checkBox))
                                                .append($('<td/>').text(item.rnum))
                                                .append($('<td/>').append($userId))
                                                .append($('<td/>').text(item.userNm))
                                                .append($('<td/>').text(item.insttSeNm))
                                                .append($('<td/>').text(item.insttNm))
                                                .append($('<td/>').text(item.contactTelno))
                                                .append($('<td/>').text(item.sttusNm))
                                                .append($('<td/>').text(item.registDt))
                                                .append($('<td/>').text(item.authNm));

                            $('#resultBody').append($tr);
                        });

                        $('#checkAllUser').prop('checked', false);
                        setToggleAllCheck('#checkAllUser', 'input.checkUser', true);

                        // paging
                        var maxPage = res.maxPageCnt;
                        $('#pagination').pagination(page.data.currPage, maxPage, page.retrieve);

                    } else {
                        $('#resultBody').noDataList(10);
                    }

                }, null, function (e) {
                    console.error(e);
                });
            },
            openBatchModal: function () {
                var $checkUsers = $('input.checkUser:checked');

                if ($checkUsers.length < 1) {
                    alert('ss');
                }

                var items = $checkUsers.map(function () {
                    return $(this).data('item');
                }).get();
                batchModal.init(items);
                $('#batchModal').modal();
            }
        }
    })();
</script>
</c:set>
