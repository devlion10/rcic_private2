<head>
    <title>게시판 관리</title>
</head>
<section class="wrapper">
    <h3>게시판 관리</h3>
    <div class="row mt">
        <div class="col-md-12">
            <div class="content-panel">
                <h4>공지사항 등록/수정</h4>
                <hr>
                <div class="row">
                    <div class="writeTbl">
                        <form id="noticeForm" enctype="multipart/form-data" method="post">
                            <%-- pk --%>
                            <input type="hidden" name="noticeNo" value="">

                            <%-- TODO 확인--%>
                            <input type="hidden" name="noticeTy" value="1">
                            <input type="hidden" name="registId" value="admin">
                            <input type="hidden" name="updtId"   value="admin">
                            <input type="hidden" name="noticeBgnde" value="20000101">
                            <input type="hidden" name="noticeEndde" value="20501231">

                            <table>
                                <colgroup>
                                    <col width="15%" />
                                    <col width="" />
                                </colgroup>
                                <tr>
                                    <td>제목</td>
                                    <td><input type="text" value="" name="sj"></td>
                                </tr>
                                <tr>
                                    <td>내용</td>
                                    <td>
                                        <textarea id="summernote" name="cn"></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td>첨부</td>
                                    <td>
                                        <jsp:include page="board-attach-file.jsp"/>
                                    </td>
                                </tr>
                            </table>
                        </form>
                        <div class="BoardBtnBox">
                            <button type="button" class="btn btn-primary mr10" onclick="save()">등록</button>
                            <button type="button" class="btn btn-default" onclick="cancel()">취소</button>
                        </div>
                    </div>
                </div>
            </div><!-- /content-panel -->
        </div><!-- /col-md-12 -->
    </div><!-- /row -->

</section>


<script type="text/javascript">
    $(document).ready(function() {
        console.clear();
        //여기 아래 부분
        $('#summernote').summernote({
            height: 300,
            minHeight: null,
            maxHeight: null,
            focus: true,
            lang: "ko-KR"
        });

        var noticeNo = '${param.id}';
        if (noticeNo) {
            getNotice(noticeNo);
        }

    });


    function getNotice(noticeNo) {

        var p = setDefault({
            url: '/rcic/notice/getNoticeDetail',
            noticeNo: noticeNo
        });
        $.commonAjax(p, '', function (notice) {
            var $form = $('#noticeForm');
            for (var k in notice) {
                var $field = $form.find('input[name='+k+']');
                if (k !== 'cn') {
                    if ($field.length > 0) {
                        $field.val(notice[k]);
                    }
                } else {
                    $('#summernote').summernote('code', notice[k]);
                }
            }
            displayFileList(notice.fileList);
        }, null, function (e) {
            console.error(e);
            alert('오류가 발생했습니다. 관리자에게 문의하세요.');
            goList();
        });
    }
    
    function save() {
        if (!confirm('저장하시겠습니까?')) {

            return;
        }
        var form = document.getElementById('noticeForm');
        var formData = new FormData(form);

        $.ajax({
            url: '/admin/board/notice/saveNotice',
            type: 'post',
            enctype: 'multipart/form-data',
            data: formData,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
        }).done(function (res) {
            console.log('res', res);
            goList();
        }).error(function (e) {
            console.error(e);
            alert('오류가 발생했습니다. 관리자에게 문의하세요.');
        })
    }

    function goList() {
        location.href = '/admin/board/notice/list';
    }

    function cancel() {
        if (!confirm('수정한 내용은 저장되지 않습니다. 취소하시겠습니까?')) return;
        location.href = '/admin/board/notice/list';
    }

</script>