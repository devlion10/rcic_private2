<head>
    <title>게시판 관리</title>
    <style>
        .vFileBox>div:nth-child(n+2) {
            margin-top: 10px;
        }
    </style>
</head>
<section class="wrapper">
    <h3>게시판 관리</h3>
    <div class="row mt">
        <div class="col-md-12">
            <div class="content-panel">
                <h4>공지사항 조회</h4>
                <hr>

                <div class="viewBox">
                    <div class="col-md-12">
                        <div class="row viewTitle">
                            <div class="col-md-2">제목</div>
                            <div class="col-md-10" id="noticeSj"></div>
                        </div>
                        <div class="row viewDate">
                            <div class="col-md-2">공지일자</div>
                            <div class="col-md-6" id="noticeRegistDt"></div>
                            <div class="col-md-2">조회수</div>
                            <div class="col-md-2" id="noticeRdcnt"></div>
                        </div>
                        <div class="row viewContents mt10" id="noticeCn">
                        </div>
                        <div class="row mt10">
                            <div class="viewFile">
                                <div class="vFileTxt">첨부파일</div>
                                <div class="vFileBox" id="fileList"></div>
                            </div>
                        </div>
                    </div>
                    <div class="BoardBtnBox">
                        <button type="button" class="btn btn-theme04 mr10" onclick="goModify()">수정</button>
                        <button type="button" class="btn btn-primary mr10" onclick="remove()">삭제</button>
                        <button type="button" class="btn btn-default" onclick="goList()">목록</button>
                    </div>
                </div>

            </div><!-- /content-panel -->
        </div><!-- /col-md-12 -->
    </div><!-- /row -->

</section>

<script>

    $(function () {
        getNotice();
    })

    function getNotice() {

        var p = setDefault({
            url: '/rcic/notice/getNoticeDetail',
            noticeNo: ${param.id}
        });
        $.commonAjax(p, '', function (notice) {
            console.log('response', notice);
            $('#noticeSj').text(notice.sj);
            $('#noticeRegistDt').text(notice.registDt);
            $('#noticeRdcnt').text(notice.rdcnt);
            $('#noticeCn').html(notice.cn);

            if (notice.fileList && notice.fileList.length > 0) {
                $.each(notice.fileList, function (idx, atchFile) {
                    var button = createFileDownloadButton(atchFile);
                    $('#fileList').append(button);
                });
            }

        }, null, function (e) {
            console.error(e);
            alert('오류가 발생했습니다. 관리자에게 문의하세요.');
            goList();
        });
    }

    function createFileDownloadButton(fileInfo) {
        var template =
            '<div class="">' +
                '<div class="vFileName">' +
                '<span>' + fileInfo.orginlFileNm + '</span><span class="glyphicon glyphicon-cloud-download" aria-hidden="true"></span>' +
                '</div>' +
            '</div>';
        var $tmpl = $(template);
        $tmpl.on('click', function () {
            location.href = '/rcic/assets/attachment/' + fileInfo.id;
        });
        return $tmpl;
    }

    function goList() {
        location.href = '/admin/board/notice/list';
    }

    function goModify() {
        location.href = '/admin/board/notice/form?id=${param.id}';
    }
    
    function remove() {

        if(!confirm('이 게시물을 삭제 하시겠습니까?')) return;

        $.ajax({
            type: 'post',
            url : '/admin/board/notice/deleteNotice',
            data: JSON.stringify({noticeNo: '${param.id}'}),
            dataType: 'json',
            contentType: 'application/json'
        }).done(function () {
            goList();
        }).error(function (e) {
            alert('오류가 발생했습니다. 관리자에게 문의하세요.');
        })
    }
</script>