<div class="modal fade" id="amKeyword" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">수집/분석 키워드 추가/수정</h4>
            </div>
            <div class="modal-body">
                <form id="modalAmKeywordForm" onsubmit="return false;">

                    <input type="hidden" name="code" value=""/>

                    <div class="userInfoTbl">
                        <table>
                            <colgroup>
                                <col width="" />
                                <col width="" />
                            </colgroup>
                            <tr>
                                <td>구분</td>
                                <td>
                                    <p id="modalKeywordGroupNameTxt"></p>
                                    <select class="form-control" name="groupCode">
                                        <option value="CD0004" selected>공사종류</option>
                                        <option value="CD0002">시설물종류</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>키워드</td>
                                <td><input type="text" class="form-control" name="codeNm"></td>
                            </tr>
                            <tr>
                                <td>사용여부</td>
                                <td>
                                    <select class="form-control" name="useYn">
                                        <option value="Y" selected>사용</option>
                                        <option value="N">미사용</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>아이콘1</td>
                                <td>
                                    <img src="" id="imgIconFile"  style="margin-right: 10px; border: 1px solid #ddd; border-radius: 3px; background-color: #eee;"/>
                                    <input type="file" name="iconFile" id="inputIconFile" class="form-control-file" accept="image/*" style="display: inline">
                                </td>
                            </tr>
                            <tr>
                                <td>아이콘2</td>
                                <td>
                                    <img src="" id="imgIconFile2" style="margin-right: 10px; border: 1px solid #ddd; border-radius: 3px; background-color: #eee;"/>
                                    <input type="file" name="iconFile" id="inputIconFile2" class="form-control-file" accept="image/*" style="display: inline">
                                </td>
                            </tr>
                        </table>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" onclick="modalKeyword.save()">확인</button>
                <button type="button" class="btn btn-default" data-dismiss="modal" id="modalAmKeywordCloseBtn">취소</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div>

<script type="text/javascript">
    $(function () {
        $('#amKeyword').on('show.bs.modal', function (event) {
            modalKeyword.init();
            var d = $(event.relatedTarget).data('item');
            modalKeyword.setData(d);
        });

        $('#inputIconFile').on('change', function (e) {
            var files = e.target.files;
            modalKeyword.readAndPreview(files[0], $('#imgIconFile'));
        });
        $('#inputIconFile2').on('change', function (e) {
            var files = e.target.files;
            modalKeyword.readAndPreview(files[0], $('#imgIconFile2'));
        });

    });

    var modalKeyword = {
        isNew: true,
        init: function () {
            var $form = $('#modalAmKeywordForm');
            $form.find('[name=groupCode]').val('CD0004');
            $form.find('[name=code]').val('');
            $form.find('[name=codeNm]').val('').prop('readonly', false);
            $form.find('[name=useYn]').val('Y');
            $form.find('#modalKeywordGroupNameTxt').empty();

            $form.find('#imgIconFile').attr('src', '').hide();
            $form.find('#imgIconFile2').attr('src', '').hide();
            $form.find('#inputIconFile' ).val('');
            $form.find('#inputIconFile2').val('');

            modalKeyword.setStatusNewCode(true);
        },
        setData: function (data) {
            console.log(data);
            if (!data) return;
            var $form = $('#modalAmKeywordForm');
            $form.find('[name=groupCode]').val(data.groupCode);
            $form.find('#modalKeywordGroupNameTxt').text(data.groupNm);
            $form.find('[name=codeNm]').val(data.codeNm).prop('readonly', true);
            $form.find('[name=code]').val(data.code);
            $form.find('[name=useYn]').val(data.useYn);

            modalKeyword.setBase64ImageIfExist('imgIconFile', data.base64Attr1);
            modalKeyword.setBase64ImageIfExist('imgIconFile2', data.base64Attr2);

            modalKeyword.setStatusNewCode(false);
        },
        save: function () {
            var $form = $('#modalAmKeywordForm');
            var data = $form.serializeObject();

            if (!data.groupCode) {
                alert('구분을 선택하세요.');
                return false;
            }
            if (!data.codeNm) {
                alert('키워드를 입력하세요.');
                return false;
            }


            // TODO 중복 키워드 검사
            var duplCheckParam = {
                currPage: 1,
                listCnt: 1,
                groupCode: data.groupCode,
                codeNm: $.trim(data.codeNm)
            }

            if (modalKeyword.isNew) {
                var dupl = true;
                apiGet('getCodeDetailList', duplCheckParam, false).done(function (res) {
                    console.log('detail', res);
                    if (res.totalCnt && res.totalCnt > 0) {
                        alert('이미 등록된 키워드입니다.');
                        return;
                    } else {
                        dupl = false;
                    }
                });

                if (dupl) return;
            }
            // 아이콘 저장
            var img1 = $('#inputIconFile').val();
            var img2 = $('#inputIconFile2').val();
            if (modalKeyword.isNew && !img1) {
                alert('아이콘1 항목을 등록하세요.');
                return;
            }
            if (modalKeyword.isNew && !img2) {
                alert('아이콘2 항목을 등록하세요.');
                return;
            }
            if ($.isNotEmpty(img1)) {
                var img1Src = $('#imgIconFile').attr('src');
                data.base64Attr1 = img1Src.replace(/^data:.+base64,/, '');
            }
            if ($.isNotEmpty(img2)) {
                var img2Src = $('#imgIconFile2').attr('src');
                data.base64Attr2 = img2Src.replace(/^data:.+base64,/, '');
            }

            // sequencial : 신규 데이터일 경우 코드를 max 숫자로 생성한다.
            data.sequencial = true;

            if (!confirm('저장 하시겠습니까?')) return;

            apiPost('saveCodeDetail', data).done(function (res) {
                alert('저장되었습니다.');
                modalKeyword.close();
                Keyword.retrieve(1);
            }).error(defaultErrorFn);
        },
        setStatusNewCode: function (isNew) {
            modalKeyword.isNew = isNew;
            var $form = $('#modalAmKeywordForm');
            if (isNew) {
                $form.find('[name=groupCode]').show();
                $form.find('#modalKeywordGroupNameTxt').hide();
            } else {
                $form.find('[name=groupCode]').hide();
                $form.find('#modalKeywordGroupNameTxt').show();
            }
        },
        close: function () {
            $('#modalAmKeywordCloseBtn').click();
        },
        // 이미지 미리보기
        readAndPreview: function(file, $imgElem) {
            if ( /\.(jpe?g|png|gif)$/i.test(file.name) ) {
                var reader = new FileReader();

                reader.addEventListener("load", function () {
                    if (this.result) {
                        $imgElem.attr('src', this.result).show();
                    }
                }, false);
                reader.readAsDataURL(file);
            }

        },
        setBase64ImageIfExist: function (targetId, data) {
            var $form = $('#modalAmKeywordForm');
            if (!_.isEmpty(data)) {
                if (data.indexOf('data:') !== 0) {
                    data = 'data:image/png;base64,' + data;
                }
                $form.find('#' + targetId).attr('src', data).show();
            } else {
                $form.find('#' + targetId).hide();
            }
        }
    }


</script>