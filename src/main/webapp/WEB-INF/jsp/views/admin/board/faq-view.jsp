<section class="wrapper">
    <h3>게시판 관리</h3>
    <div class="row mt">
        <div class="col-md-12">
            <div class="content-panel">
                <h4>FAQ 조회</h4>
                <hr>

                <div class="viewBox">
                    <div class="col-md-12">
                        <div class="row viewTitle">
                            <div class="col-md-2">제목</div>
                            <div class="col-md-10">${faq.faqSj}</div>
                        </div>
                        <div class="row viewDate">
                            <div class="col-md-2">공지일자</div>
                            <div class="col-md-6">${faq.registDt}</div>
                            <div class="col-md-2">조회수</div>
                            <div class="col-md-2">-</div>
                        </div>
                        <div class="row viewContents mt10">
                            ${faq.faqCn}
                        </div>
                        <div class="row mt10">
                            <div class="viewFile">
                                <div class="vFileTxt">첨부파일</div>
                                <div class="vFileBox">
                                    <c:forEach items="${faq.fileList}" var="fileInfo" varStatus="sts">
                                    <div class="${sts.index > 0 ? ' mt10' : ''}">
                                        <div class="vFileName" onclick="location.href='/rcic/assets/attachment/${fileInfo.id}'">
                                            <span>${fileInfo.orginlFileNm}</span><span class="glyphicon glyphicon-cloud-download" aria-hidden="true"></span>
                                        </div>
                                    </div>
                                    </c:forEach>
                                </div>
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
    function goList() {
        location.href = '/admin/board/faq/list';
    }

    function goModify() {
        location.href = '/admin/board/faq/form?id=${faq.id}';
    }

    function remove() {

        if(!confirm('이 게시물을 삭제 하시겠습니까?')) return;

        $.ajax({
            type: 'post',
            url : '/admin/board/faq/deleteFaq',
            data: JSON.stringify({id: '${faq.id}'}),
            dataType: 'json',
            contentType: 'application/json'
        }).done(function () {
            goList();
        }).error(function (e) {
            alert('오류가 발생했습니다. 관리자에게 문의하세요.');
        })
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
</script>