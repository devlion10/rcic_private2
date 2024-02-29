<div class="modal fade" id="code" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">코드 추가/수정</h4>
            </div>
            <div class="modal-body">
                <form id="modalCodeDetailForm">
                    <div class="codeInfoTbl">
                        <table>
                            <colgroup>
                                <col width="" />
                                <col width="" />
                            </colgroup>
                            <tr>
                                <td>그룹코드</td>
                                <td>
                                    <p id="codeDetailGroupTxt"></p>
                                    <input type="hidden" name="groupCode" value="" />
                                </td>
                            </tr>
                            <tr>
                                <td>코드</td>
                                <td>
                                    <p id="detailCodeTxt"></p>
                                    <input type="text" class="form-control" name="code">
                                </td>
                            </tr>
                            <tr>
                                <td>코드명</td>
                                <td><input type="text" class="form-control" name="codeNm"></td>
                            </tr>
                            <tr>
                                <td>사용여부</td>
                                <td>
                                    <select class="form-control" name="useYn">
                                        <option value="Y">사용</option>
                                        <option value="N">미사용</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>등록일자</td>
                                <td id="codeDetailRegistDtTxt"></td>
                            </tr>
                        </table>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" onclick="modalCode.save()">확인</button>
                <button type="button" class="btn btn-default" data-dismiss="modal" id="modalCodeDetailClose">취소</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div>
<script type="text/javascript">
    $(function () {
        $('#code').on('show.bs.modal', function (event) {

            if (!CodeDetail.groupCode) {
                alert('코드 그룹을 먼저 선택하세요.');
                return false;
            }

            modalCode.init();
            var d = $(event.relatedTarget).data('item');
            modalCode.setData(d);
        });
    });


    var modalCode = {
        isNew: true,
        init: function () {

            var $form = $('#modalCodeDetailForm');
            $form.find('#detailCodeTxt').empty();
            $form.find('#codeDetailRegistDtTxt').empty();
            $form.find('[name=useYn]').val('Y');
            $form.find('[name=codeNm]').val('');
            $form.find('[name=code]').val('');
            $form.find('#codeDetailGroupTxt').text(CodeDetail.groupCode);
            $form.find('[name=groupCode]').val(CodeDetail.groupCode);
            modalCode.setStatusNewCode(true);
        },
        setData: function (data) {
            if (!data) return;
            var $form = $('#modalCodeDetailForm');
            $form.find('[name=groupCode]').val(data.groupCode);
            $form.find('#codeDetailGroupTxt').text(data.groupCode);
            $form.find('[name=code]').val(data.code);
            $form.find('#detailCodeTxt').text(data.code);
            $form.find('[name=codeNm]').val(data.codeNm);
            $form.find('[name=useYn]').val(data.useYn);
            $form.find('#codeDetailRegistDtTxt').text(data.registDt);
            modalCode.setStatusNewCode(false);
        },
        save: function () {
            var $form = $('#modalCodeDetailForm');
            var data = $form.serializeObject();

            if (!data.code) {
                alert('코드를 입력하세요.');
                return;
            }

            if (!data.codeNm) {
                alert('코드명을 입력하세요.');
                return;
            }

            var alertAndClose = function () {
                alert('저장되었습니다.');
                CodeDetail.retrieve(1);
                modalCode.close();
            };

            // 새 코드면 저장 검사
            if (modalCode.isNew) {
                CodeDetail.get(data.groupCode, data.code).done(function (res) {
                    if (!res) {
                        CodeDetail.save(data).done(alertAndClose);
                    } else {
                        alert('이미 등록된 코드입니다. 다른 코드를 입력하세요.');
                        $form.find('[name=code]').focus();
                    }
                });
            } else {
                CodeDetail.save(data).done(alertAndClose);
            }
        },
        setStatusNewCode: function (isNew) {
            modalCode.isNew = isNew;
            var $form = $('#modalCodeDetailForm');
            if (isNew) {
                $form.find('#detailCodeTxt').hide();
                $form.find('[name=code]').show();
                $form.find('#codeDetailRegistDtTxt').parent('tr').hide();
            } else {
                $form.find('[name=code]').hide();
                $form.find('#detailCodeTxt').show();
                $form.find('#codeDetailRegistDtTxt').parent('tr').show();
            }
        },
        cancel: function () {

        },
        close: function () {
            $('#modalCodeDetailClose').click();
        }
    }
</script>