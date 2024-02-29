<% pageContext.setAttribute("newLine", "\n"); %>

<head>
    <title>게시판 관리</title>
</head>
<section class="wrapper">
    <h3>게시판 관리</h3>
    <div class="row mt">
        <div class="col-md-12">
            <div class="content-panel">
                <h4>질문/답변 등록</h4>
                <hr>
                <div class="row">
                    <div class="writeTbl">
                        <form id="qnaForm" enctype="multipart/form-data" method="post" onsubmit="return false;">

                            <input type="hidden" name="id" value="${qna.id}"/>

                            <table>
                                <colgroup>
                                    <col width="15%" />
                                    <col width="" />
                                </colgroup>
                                <tr>
                                    <td>문의일자</td>
                                    <td style="text-align: left">${qna.qestnDt}</td>
                                </tr>
                                <tr>
                                    <td>분류</td>
                                    <td style="text-align: left">${qna.qestnTyNm}</td>
                                </tr>
                                <tr>
                                    <td>제목</td>
                                    <td style="text-align: left">${qna.qestnSj}</td>
                                </tr>
                                <tr>
                                    <td>내용</td>
                                    <td style="text-align: left">
                                        ${fn:replace(qna.qestnCn, newLine, "<br/>")}
                                    </td>
                                </tr>
                                <tr>
                                    <td>답변</td>
                                    <td style="text-align: left">
                                        <textarea class="customTextArea mt10" name="answrCn" id="answrCn">${qna.answrCn}</textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td>첨부</td>
                                    <td>
                                        <c:if test="${qna.answrDt eq null}">
                                            <jsp:include page="board-attach-file.jsp"/>
                                        </c:if>
                                        <div class="attachBox">
                                            <c:forEach items="${qna.fileList}" var="fileInfo" varStatus="sts">
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
                            <button type="button" class="btn btn-primary mr10" onclick="save()">저장</button>
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
        // ready
        if ('${param.id}' == '') {
            goList();
        }
    });

    function save() {

        var data = {
            id: ${param.id},
            answrCn: $('#answrCn').val()
        }

        if ($.isEmpty(data.answrCn)) {
            alert('답변 내용을 입력하세요.');
            $('#answrCn').focus();
            return;
        }

        if (!confirm('저장하시겠습니까?')) {
            return;
        }

        var form = document.getElementById('qnaForm');
        var formData = new FormData(form);

        $.ajax({
            url: '/admin/board/qna/answer',
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
        });
    }

    function goList() {
        location.href = '/admin/board/qna/list';
    }

    function cancel() {
        if (!confirm('수정한 내용은 저장되지 않습니다. 목록으로 이동 하시겠습니까?')) return;
        location.href = '/admin/board/qna/list';
    }
</script>