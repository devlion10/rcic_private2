<input type="file" class="custom-file-input" name="attachFileList" id="fileUpload" multiple="multiple">
<div class="attachBox"></div>

<script>

    function displayFileList(fileList) {
        if (fileList && fileList.length > 0) {
            var html = '';
            $.each(fileList, function (idx, atchFile) {
                html += '<div class="mt5"><span>'
                    + '<a href="/rcic/assets/attachment/'+atchFile.id+'">'
                    + atchFile.orginlFileNm
                    + '</a>'
                    +'</span><span class="glyphicon glyphicon-trash" aria-hidden="true" style="cursor:pointer; margin-bottom: 5px;" onclick="deleteFile()" data-fileid="'+atchFile.id+'"></span></div>'
            });
            $('.attachBox').html(html);
        }
    }

    function deleteFile() {

        if (!confirm('파일은 확인 즉시 삭제되며 되돌릴 수 없습니다. \n선택하신 파일을 삭제하시겠습니까?')) return;

        var $btn = $(event.target);
        var fileId = $btn.data('fileid');
        console.log('fileid', fileId);

        var data = {
            id: fileId
        }
        $.ajax({
            type: 'post',
            url: '/admin/board/attach/deleteAttachFile',
            contentType: 'application/json',
            data: JSON.stringify(data),
        }).done(function (res) {
            console.log(res);
            if (res.cnt && res.cnt > 0) {
                $btn.parent().remove();
            }
        }).error(function () {
            alert('오류가 발생했습니다.');
        })
    }
</script>