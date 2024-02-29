<!-- Modal -->
<div class="modal fade" id="apiAgency" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">API 사용자기관 선택</h4>
            </div>
            <div class="modal-body">
                <form class="form-inline">
                    <div class="form-group mr10">
                        <label for="modalAgencyInsttNm" class="mr10">API 사용기관</label>
                        <input type="text" class="form-control" placeholder="선택기관 명" id="modalAgencyInsttNm">
                    </div>
                    <button type="button" class="btn btn-success searchBtn" onclick="modalApiAgency.retrieve(1)">조회</button>
                </form>
                <table class="table table-striped table-advance table-hover mt10">
                    <colgroup>
                        <col width="80px"/>
                        <col width="*"/>
                        <col width="80px"/>
                        <col width="100px"/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>기관명</th>
                        <th>상태</th>
                        <th>가입일자</th>
                    </tr>
                    </thead>
                    <tbody id="agencyTbody">
<%--                    <tr>--%>
<%--                        <td>6</td>--%>
<%--                        <td>ㅇㅇㅇㅇㅇ</td>--%>
<%--                        <td>신청</td>--%>
<%--                        <td>2020.04.02</td>--%>
<%--                    </tr>--%>
                    </tbody>
                </table>
                <div class="paging" id="agencyPagination"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal" id="btnApiAgencyClose">취소</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div>
<!-- /.modal -->

<script>

    // $(function () {
    //     $('#apiAgency').on('show.bs.modal', function (event) {
    //         modalApiAgency.init();
    //     });
    // });

    var modalApiAgency = {
        init: function () {
            $('#agencyTbody').empty();
            $('#modalAgencyInsttNm').val('');
            modalApiAgency.retrieve(1);
        },
        retrieve: function (currPage) {

            var param = {
                listCnt: 5,
                currPage: currPage,
                insttNm: $('#modalAgencyInsttNm').val()
            };

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

                        var $title = $('<a/>').attr({'href': 'javascript:;'}).text(item.insttNm).on('click', function () {
                            if (modalApiAgency.onSelect) {
                                modalApiAgency.onSelect(item);
                                modalApiAgency.close();
                            }
                        });

                        var row = $('<tr/>')
                                    .append($('<td/>').text(item.rnum))
                                    .append($('<td/>').append($title))
                                    .append($('<td/>').text(item.sttusNm))
                                    .append($('<td/>').text(item.srbde))
                        result.push(row);
                    })
                    $('#agencyTbody').html(result);
                    $('#agencyPagination').pagination(currPage, res.maxPageCnt, modalApiAgency.retrieve);

                } else {
                    $('#agencyTbody').noDataList(4);
                }
            }).error(function (e) {
                console.error(e);
            });
        },
        close: function () {
            $('#btnApiAgencyClose').click();
        },
        onSelect: function (item) {

        }
    }
</script>