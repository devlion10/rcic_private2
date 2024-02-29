<section class="wrapper">
    <h3>게시판 관리</h3>
    <div class="row mt">
        <div class="col-md-12">
            <div class="content-panel">
                <h4>FAQ 등록/수정</h4>
                <hr>
                <div class="row">
                    <div class="writeTbl">
                        <form id="faqForm">

                            <input type="hidden" name="id"    value="${faq.id}"/>
                            <input type="hidden" name="useYn" value="${faq.useYn}"/>

                            <table>
                                <colgroup>
                                    <col width="15%" />
                                    <col width="" />
                                </colgroup>
                                <tr>
                                    <td>분류</td>
                                    <td>
                                        <select class="form-control" name="faqTy" id="selectFaqTy">
                                            <option value="">분류</option>
                                            <c:forEach items="${faqTypes}" var="item">
                                                <option value="${item.code}" <c:if test="${item.code eq faq.faqTy}">selected</c:if>>${item.codeNm}</option>
                                            </c:forEach>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>제목</td>
                                    <td><input type="text" name="faqSj" value="${faq.faqSj}"></td>
                                </tr>
                                <tr>
                                    <td>내용</td>
                                    <td>
                                        <textarea id="summernote" name="faqCn">${faq.faqCn}</textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td>첨부</td>
                                    <td>
                                        <jsp:include page="board-attach-file.jsp"/>
                                        <div class="attachBox">
                                            <c:forEach items="${faq.fileList}" var="fileInfo" varStatus="sts">
                                                <div class="mt5"><span>
                                                    <a href="/rcic/assets/attachment/${fileInfo.id}">${fileInfo.orginlFileNm}</a>
                                                    </span><span class="glyphicon glyphicon-trash" aria-hidden="true" style="cursor:pointer; margin-bottom: 5px;" onclick="deleteFile()" data-fileid="${fileInfo.id}"></span>
                                                </div>
                                            </c:forEach>
                                        </div>
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
        //여기 아래 부분
        $('#summernote').summernote({
            height: 300,
            minHeight: null,
            maxHeight: null,
            focus: true,
            lang: "ko-KR"
        });
    });

    function save() {

        var data = $('#faqForm').serializeObject();
        console.log(data);

        if (!data.faqTy) {
            alert('분류를 선택하세요.');
            return;
        }
        if (!data.faqSj) {
            alert('제목을 입력하세요.');
            return;
        }
        if (!data.faqCn) {
            alert('내용을 입력하세요.');
            return;
        }

        if (!confirm('저장하시겠습니까?')) return;


        var form = document.getElementById('faqForm');
        var formData = new FormData(form);

        $.ajax({
            url: '/admin/board/faq/saveFaq',
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
        location.href = '/admin/board/faq/list';
    }

    function cancel() {
        if (!confirm('수정한 내용은 저장되지 않습니다. 취소하시겠습니까?')) return;
        location.href = '/admin/board/faq/list';
    }
</script>