<div class="modal fade" id="dataimport" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">데이터 업로드 <span id="modal_sub"></span></h4>
            </div>
            <div class="modal-body">
                <form id="shpImportForm">
                    <div class="codeInfoTbl">
                        <table>
                            <colgroup>
                                <col width="" />
                                <col width="" />
                            </colgroup>
                            <tr>
                                <td>기준일자</td>
                                <td>
                                    <input type="text"   name="stdrDt" id="shpStdrDt"/>
                                </td>
                            </tr>
                            <tr>
                                <td>파일</td>
                                <td>
                                    <input type="hidden" name="dicNm" value=""/>
                                    <input type="hidden" name="dicTblNm" value=""/>
                                    <input type="file"   name="shpFiles" id="shpFile" multiple="multiple" accept=".shp,.shx,.dbf"/><br>
                                    * shp, shx, dbf 파일을 선택하세요.
                                </td>
                            </tr>
                        </table>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" onclick="modalDataImport.save()">확인</button>
                <button type="button" class="btn btn-default" data-dismiss="modal" id="modalDataImportCloseBtn">취소</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div>
<script type="text/javascript">
    $(function () {
        $('#dataimport').on('show.bs.modal', function (event) {
        	//alert($(event.relatedTarget).data().dicTblNm);
        	
       		switch($(event.relatedTarget).data().dicTblNm){
       			case "tb_legaldong_sido" : 
       				document.getElementById("modal_sub").innerHTML = "_시도 데이터"
       				break;
       			case "tb_legaldong_sgg" : 
       				document.getElementById("modal_sub").innerHTML = "_시군구 데이터"
       				break;
       			case "tb_legaldong_emd" : 
       				document.getElementById("modal_sub").innerHTML = "_읍면동 데이터"
       				break;
       			case "tb_legaldong_li" : 
       				document.getElementById("modal_sub").innerHTML = "_리 데이터"
       				break;
       			case "tb_cbnd_info" : 
       				document.getElementById("modal_sub").innerHTML = "_연속지적"
       				break;
       		}
        	
            modalDataImport.init();

            var d = $(event.relatedTarget).data();
            console.log('data', d);
            modalDataImport.setData(d);

            $('#shpStdrDt').datetimepicker({
                lang: 'ko',
                format: 'YYYY-MM-DD'
            })
        });
    });


    var modalDataImport = {
        init: function () {
            var $form = $('#shpImportForm');
            $form.find('[name=stdrDt]').val('');
            $form.find('[name=dicNm]').val('');
            $form.find('[name=dicTblNm]').val('');
            $form.find('[name=shpfile]').val(null);
        },
        setData: function (data) {
            if (!data) return;
            var $form = $('#shpImportForm');

		console.log(data.dicTblNm);
		
            $form.find('[name=stdrDt]').val('');
            $form.find('[name=dicNm]').val(data.dicNm);
            $form.find('[name=dicTblNm]').val(data.dicTblNm);
            $form.find('[name=shpfile]').val(null);

        },
        save: function () {
            var files = $('#shpFile')[0].files
            if (files.length == 0) {
                alert('파일을 선택하세요.');
                return;
            }

            var exts = $.map(files, function (item) {
                var fileName = item.name;
                var ext = fileName.substr(fileName.lastIndexOf('.')+1);
                return ext;
            })
            if (exts.indexOf('shp') == -1 || exts.indexOf('shx') == -1 || exts.indexOf('dbf') == -1) {
                alert('첨부 파일은 shp, shx, dbf 파일을 포함해야 합니다.');
                return;
            }

            var form = document.getElementById('shpImportForm');
            var formData = new FormData(form);
            if (!formData.get('stdrDt')) {
                alert('기준일자를 선택하세요.');
                return;
            }
            formData.set('stdrDt', formData.get('stdrDt').replace(/-/g, ''));

            if (!confirm('저장하시겠습니까?')) {
                return;
            }

            $.ajax({
                url: '/admin/dic/develop/import',
                type: 'post',
                enctype: 'multipart/form-data',
                data: formData,
                processData: false,
                contentType: false,
                cache: false,
                timeout: 600000,
            }).done(function (res) {
                console.log('res', res);

                if (res.dicNm && res.cnt) {
                    alert(res.dicNm + ' ' + res.cnt + '건이 업로드 되었습니다.');
                    modalDataImport.close();

                    // 콜백 있으면 실행
                    if (window.onSuccessDataImport) {
                        onSuccessDataImport(res);
                    }
                }
            }).error(function (e) {
                console.error(e);
                alert('오류가 발생했습니다. 관리자에게 문의하세요.');
            })
        },
        cancel: function () {

        },
        close: function () {
            $('#modalDataImportCloseBtn').click();
        }
    }
</script>