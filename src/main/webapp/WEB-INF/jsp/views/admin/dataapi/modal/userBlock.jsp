<!-- Modal -->
<div class="modal fade" id="userBlock" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">API 차단 등록</h4>
            </div>
            <div class="modal-body">
                <form id="userBlockForm">
                    <div class="userInfoTbl">
                        <table>
                            <colgroup>
                                <col width="" />
                                <col width="" />
                            </colgroup>
                            <tr>
                                <td>기관명</td>
                                <td>
                                    <div class="form-inline">
                                        <input type="hidden" name="apiUserNo" id="ubApiUserNo"/>
                                        <input type="text" class="form-control mr10" id="ubInsttNm" readonly>
                                        <button type="button" class="btn btn-info" data-toggle="modal" data-target="#apiAgency">선택</button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>API 인증키</td>
                                <td id="ubApiKey"></td>
                            </tr>
                            <tr>
                                <td>가입일자</td>
                                <td id="ubJoinDate"></td>
                            </tr>
                            <tr>
                                <td>차단사유</td>
                                <td><input type="text" name="blockReason" class="form-control" id="ubBlockReason" maxlength="500"></td>
                            </tr>
                            <tr>
                                <td>차단시작일</td>
                                <td><input name="blockBeginDe" type="text" class="form-control" id="ubBlockBeginDe"/></td>
                            </tr>
                            <tr>
                                <td>차단종료일</td>
                                <td><input name="blockEndDe" type="text" class="form-control" id="ubBlockEndDe"/></td>
                            </tr>
                        </table>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" onclick="modalUserBlock.submit()">확인</button>
                <button type="button" class="btn btn-default" data-dismiss="modal" id="modalUserBlockClose">취소</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<script type="text/javascript">

    $(function () {
        // modal 기관검색
        $('#apiAgency').on('show.bs.modal', function (event) {
            modalApiAgency.init();
            modalApiAgency.onSelect = function (item) {
                console.log('selected item', item);
                modalUserBlock.setData(item);
            };
        });
    });

    var modalUserBlock = {
        init: function () {
            $('#ubApiKey,#ubJoinDate').text('');
            $('#ubApiUserNo,#ubInsttNm').val('');
            $('#ubBlockReason,#ubBlockBeginDe,#ubBlockEndDe').val('');
            $('#ubBlockBeginDe,#ubBlockEndDe').datetimepicker({
                pickTime: false,
                format: "YYYY-MM-DD",
            });
        },
        setData: function (item) {

            $('#ubApiKey').text(item.apiCrtfcKey);
            $('#ubJoinDate').text(item.srbde);

            $('#ubApiUserNo').val(item.apiUserNo);
            $('#ubInsttNm').val(item.insttNm);
        },
        submit: function () {
            var data = $('#userBlockForm').serializeObject();
            console.log('block data', data);
            if (!data.apiUserNo) {
                alert('차단 기관을 선택하세요.');
                return;
            }
            if (!data.blockReason) {
                alert('차단 사유를 입력하세요.');
                $('#ubBlockReason').focus();
                return;
            }
            if (!data.blockBeginDe) {
                alert('차단 시작일을 입력하세요.');
                $('#ubBlockBeginDe').focus();
                return;
            }
            if (!data.blockEndDe) {
                alert('차단 종료일을 입력하세요.');
                $('#ubBlockEndDe').focus();
                return;
            }

            var start = moment(data.blockBeginDe, 'YYYY-MM-DD');
            var end = moment(data.blockEndDe, 'YYYY-MM-DD');
            if (!start.isBefore(end)) {
                alert('시작일과 종료일을 올바르게 입력하세요.');
                return;
            }

            data.blockSe = 1; // 1차단 2해제
            data.blockBeginDe = data.blockBeginDe.replace(/-/g, '');
            data.blockEndDe = data.blockEndDe.replace(/-/g, '');

            var pp = {
                listCnt: 10,
                currPage: 1,
                apiUserNo: data.apiUserNo,
                blockSe: 1,
                searchBeginDe: data.blockBeginDe,
                searchEndDe: data.blockEndDe,
            }
            var exist = true;
            $.ajax({
                type: 'get',
                url: '/admin/data-api/block/getApiBlockInfoList',
                contentType: 'application/json',
                async: false,
                data: pp,
                beforeSend: function () {
                    // nothing
                },
                complete: function () {
                    // nothing
                }
            }).done(function (response) {
                console.log(response);
                if (response.totalCnt > 0) {
                    alert('해당 기간에 이미 차단된 정보가 있습니다.');
                    return;
                } else {
                    exist = false
                }
            });

            if (exist) return;

            if (!confirm('선택하신 사용자를 차단하시겠습니까?')) return;
            $.ajax({
                type: 'post',
                url: '/admin/data-api/block/insertApiBlockInfo',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(data)
            }).done(function (res) {
                console.log(res);
                alert('선택하신 사용자가 차단되었습니다.');
                modalUserBlock.onAdd();
                modalUserBlock.close();
            }).error(function (e) {
                console.error(e);
            });

        },
        close: function () {
            $('#modalUserBlockClose').click();
        },
        onAdd: function () {
            console.log('on added block info.');
        }
    }
</script>