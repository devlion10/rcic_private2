<!-- Modal -->
<div class="modal fade" id="blockUserDtlInfo" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">API 사용자 상세</h4>
            </div>
            <div class="modal-body">
                <form id="modalBlockForm">

                    <input type="hidden" name="seqNo" value="" id="blockInfoSeqNo"/>

                    <p class="modalSubTit">API 사용자 정보</p>
                    <div class="userInfoTbl">
                        <table>
                            <colgroup>
                                <col width="150px" />
                                <col width="*" />
                            </colgroup>
                            <tr>
                                <td>기관명</td>
                                <td data-name="insttNm"></td>
                            </tr>
                            <tr>
                                <td>API 인증키</td>
                                <td data-name="apiCrtfcKey"></td>
                            </tr>
                            <tr>
                                <td>가입일자</td>
                                <td data-name="srbde"></td>
                            </tr>
                            <tr>
                                <td>차단사유</td>
                                <td data-name="blockReason"></td>
                            </tr>
                            <tr>
                                <td>차단시작일</td>
                                <td data-name="blockBeginDe"></td>
                            </tr>
                            <tr>
                                <td>차단종료일</td>
                                <td data-name="blockEndDe"></td>
                            </tr>
                            <tr>
                                <td>해제여부</td>
                                <td>
                                    <div class="material-switch">
                                        <input id="someSwitchOptionInfo" name="someSwitchOption001" type="checkbox">
                                        <label for="someSwitchOptionInfo" class="label-info"></label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>해제사유</td>
                                <td><input type="text" class="form-control" placeholder="해제사유" name="blockReason" id="inputBlockReason"></td>
                            </tr>
                        </table>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" onclick="modalBlockUser.save(modalBlockUser.item)">확인</button>
                <button type="button" class="btn btn-default" data-dismiss="modal" id="modalBlockUserCloseBtn">닫기</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<script type="text/javascript">
    var modalBlockUser = {
        item: null,
        init: function () {
            $('#blockUserDtlInfo table tr').each(function (idx, ele) {
                var $td = $(this).find('td').eq(1);
                if ($td.data('name')) $td.text('');
            });
            $('.tr-blocked').hide();
            $('#someSwitchOptionInfo').prop('checked', false);
            $('#inputBlockReason').val('');
            $('#blockInfoSeqNo').val('');
        },
        setData: function (item) {
            console.log(item)
            modalBlockUser.item = item;
            $('#blockInfoSeqNo').val(item.seqNo);
            $('#blockUserDtlInfo table td').each(function (idx, td) {
                var name = $(this).data('name');
                if (name && item.hasOwnProperty(name)) {
                    $(this).text(item[name]);
                }
            });

            if (item.blockSe == '1') { // 차단
                $('#someSwitchOptionInfo').prop('checked', false).val(item.blockSe).prop('readonly', false);
                $('#inputBlockReason').prop('readonly', false);
            } else if (item.blockSe == '2') { // 해제
                $('#someSwitchOptionInfo').prop('checked', true).val(item.blockSe).prop('readonly', true);
                $('#inputBlockReason').prop('readonly', true);
            }

            $('#inputBlockReason').val(item.blockReason);
        },
        save: function (item) {

            if (item.blockSe == '2') {
                modalBlockUser.close();
                return;
            }

            var data = {
                id: $('#blockInfoSeqNo').val(),
                blockSe: $('#someSwitchOptionInfo').prop('checked') ? '2' : '1',
                blockReason: $('#inputBlockReason').val()
            };

            if ($.isEmpty(data.blockReason)) {
                alert('해제사유를 입력하세요.');
                return;
            }

            $.ajax({
                type: 'post',
                url: '/admin/data-api/block/updateApiBlockInfo',
                contentType: 'application/json',
                data: JSON.stringify(data)
            }).done(function (res) {
                alert('저장되었습니다.');
                modalBlockUser.close();
                retrieve(1);
            });
        },
        close: function () {
            $('#modalBlockUserCloseBtn').click();
        }
    }
</script>