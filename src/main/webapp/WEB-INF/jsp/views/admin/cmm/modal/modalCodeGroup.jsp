<div class="modal fade" id="codeGroup" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">코드그룹 추가/수정</h4>
            </div>
            <div class="modal-body">
                <form id="modalCodeGroupForm">
                    <div class="codeInfoTbl">
                        <table>
                            <colgroup>
                                <col width="" />
                                <col width="" />
                            </colgroup>
                            <tr>
                                <td>그룹코드</td>
                                <td>
                                    <p id="groupCodeTxt"></p>
                                    <input type="text" class="form-control" name="groupCode">
                                </td>
                            </tr>
                            <tr>
                                <td>코드그룹명</td>
                                <td>
                                    <input type="text" class="form-control" name="groupNm">
                                </td>
                            </tr>
                            <tr>
                                <td>설명</td>
                                <td><textarea name="codeDc"></textarea></td>
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
                                <td>등록일시</td>
                                <td id="groupCodeRgDtTxt"></td>
                            </tr>
                        </table>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" onclick="modalCodeGroup.save()">확인</button>
                <button type="button" class="btn btn-default" data-dismiss="modal" onclick="modalCodeGroup.cancel()" id="modalCodeGroupClose">취소</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div>
<script type="text/javascript">
    $(function () {
        $('#codeGroup').on('show.bs.modal', function (event) {
            modalCodeGroup.init();
            var d = $(event.relatedTarget).data('item');
            modalCodeGroup.setData(d);
        });
    });

    var modalCodeGroup = {
        isNew: true,
        init: function () {
            var $form = $('#modalCodeGroupForm');
            $form.find('#groupCodeTxt').empty()
            $form.find('#groupCodeRgDtTxt').empty()
            $form.find('[name=groupCode]').val('')
            $form.find('[name=groupNm]').val('')
            $form.find('[name=codeDc]').val('')
            $form.find('[name=useYn]').val('Y')

            modalCodeGroup.setStatusNewCode(true);
        },
        setData: function (data) {
            if (!data) return;
            var $form = $('#modalCodeGroupForm');
            $form.find('#groupCodeTxt').text(data.groupCode)
            $form.find('#groupCodeRgDtTxt').text(data.registDt)
            $form.find('[name=groupCode]').val(data.groupCode)
            $form.find('[name=groupNm]').val(data.groupNm)
            $form.find('[name=codeDc]').val(data.codeDc)
            $form.find('[name=useYn]').val(data.useYn)

            modalCodeGroup.setStatusNewCode(false);
        },
        save: function () {
            var $form = $('#modalCodeGroupForm');
            var data = $form.serializeObject();

            if (!data.groupCode) {
                alert('그룹코드를 입력하세요.');
                return;
            }

            if (!data.groupNm) {
                alert('코드그룹명을 입력하세요.');
                return;
            }

            var alertAndClose = function () {
                alert('저장되었습니다.');
                CodeGroup.retrieve(1);
                modalCodeGroup.close();
            };

            // 새 코드면 저장 검사
            if (modalCodeGroup.isNew) {
                CodeGroup.get(data.groupCode).success(function (res) {
                    if (!res) {
                        CodeGroup.save(data).done(alertAndClose);
                    } else {
                        alert('이미 등록된 그룹코드입니다. 다른 코드를 입력하세요.');
                        $form.find('[name=groupCode]').focus();
                    }
                });
            } else {
                CodeGroup.save(data).done(alertAndClose);
            }
        },
        setStatusNewCode: function (isNew) {
            modalCodeGroup.isNew = isNew;
            var $form = $('#modalCodeGroupForm');
            if (isNew) {
                $form.find('[name=groupCode]').show();
                $form.find('#groupCodeTxt').hide();
                $form.find('#groupCodeRgDtTxt').parent('tr').hide();
            } else {
                $form.find('[name=groupCode]').hide();
                $form.find('#groupCodeTxt').show();
                $form.find('#groupCodeRgDtTxt').parent('tr').show();
            }
        },
        cancel: function () {

        },
        close: function () {
            $('#modalCodeGroupClose').click();
        }
    }
</script>