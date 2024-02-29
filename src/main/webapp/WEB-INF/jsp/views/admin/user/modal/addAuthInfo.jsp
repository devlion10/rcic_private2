<!-- Modal -->
<div class="modal fade" id="addAuthInfoModal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" aria-label="Close" onclick="addAuthInfoModal.close()"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">권한정보 추가</h4>
            </div>

            <div class="modal-body">
                <form>
                    <p>권한정보</p>
                    <div class="form-group">
                        <label for="authInfoNm" class="control-label">권한명</label>
                        <input type="text" class="form-control" id="authInfoNm">
                    </div>
                </form>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-primary" onclick="addAuthInfoModal.add()">확인</button>
                <button type="button" class="btn btn-default" onclick="addAuthInfoModal.close()">취소</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<script type="text/javascript">
    var addAuthInfoModal = {};

    (function () {
        $(function () {
        });

        addAuthInfoModal = {
            data: {
            },
            refs: {
            },
            add: function () {

                var nm = $('#authInfoNm').val().trim();
                if (!nm) {
                    alert('권한명을 입력하세요.');
                    $('#authInfoNm').focus();
                    return;
                }

                $.ajax({
                    url: '/admin/user/authInfo/insertAuthInfo',
                    type: 'post',
                    contentType:"application/json;charset=UTF-8",
                    data: JSON.stringify({
                        authNm: $('#authInfoNm').val().trim(),
                        sttus: '01'
                    }),
                }).done(function (result) {
                    if (result['RESULT_CODE'] === 'SUCCESS') {
                        alert('권한을 추가했습니다.');

                        addAuthInfoModal.close();
                        page.retrieve(page.data.currPage);
                    } else if (result['RESULT_CODE'] === 'EXIST') {
                        alert('이미 사용중인 이름입니다.');
                    }
                }).fail(function (result) {
                    alert('오류가 발생했습니다.');
                });
            },
            close: function () {
                $('#authInfoNm').val('');
                $('#addAuthInfoModal').modal('hide');
            }
        };
    })();
</script>
