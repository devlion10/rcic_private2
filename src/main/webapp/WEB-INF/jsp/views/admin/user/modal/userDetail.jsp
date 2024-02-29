<!-- Modal -->
<div class="modal fade" id="detailModal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">사용자정보 상세</h4>
            </div>

            <div class="modal-body">
                <form>
                    <p class="modalSubTit">사용자정보</p>
                    <div class="userInfoTbl">
                        <table>
                            <colgroup>
                                <col width=""/>
                                <col width=""/>
                            </colgroup>
                            <tr>
                                <td>사용자ID</td>
                                <td class="textData" data-name="userId"></td>
                            </tr>
                            <tr>
                                <td>사용자 명</td>
                                <td class="textData" data-name="userNm"></td>
                            </tr>
                            <tr>
                                <td>기관구분</td>
                                <td class="textData" data-name="insttSeNm"></td>
                            </tr>
                            <tr>
                                <td>기관명</td>
                                <td class="textData" data-name="insttNm"></td>
                            </tr>
                            <tr>
                                <td>연락처</td>
                                <td class="textData" data-name="contactTelno"></td>
                            </tr>
                            <tr>
                                <td>가입일자</td>
                                <td class="textData" data-name="registDt"></td>
                            </tr>
                            <tr>
                                <td>접속IP</td>
                                <td class="textData" data-name="conectIp"></td>
                            </tr>
                            <tr>
                                <td>계정잠금여부</td>
                                <td class="textData" data-name="lockYn"></td>
                            </tr>
                            <tr>
                                <td>최종로그인 일시</td>
                                <td class="textData" data-name="lastLoginDt"></td>
                            </tr>
                            <tr>
                                <td>상태</td>
                                <td class="textData" data-name="sttusNm"></td>
                            </tr>
                            <tr>
                                <td>사용자권한</td>
                                <td>
                                    <select class="form-control" id="detailAuthSelector">
                                        <c:forEach var="item" items="${authInfoList}">
                                            <option value="${item.authNo}">${item.authNm}</option>
                                        </c:forEach>
                                    </select>
                                </td>
                            </tr>
                        </table>
                    </div>
                </form>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-theme04" onclick="detailModal.updateUser()">사용자승인</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">취소</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<script type="text/javascript">
    var detailModal = {};

    (function () {
        $(function () {
        });

        detailModal = {
            data: {
                currUser: null
            },
            refs: {
                $textData: $('#detailModal td.textData'),
                $authSelector: $('#detailAuthSelector')
            },
            init: function (item) {
                detailModal.data.currUser = item;

                detailModal.refs.$textData.each(function () {
                    var name = $(this).data('name');

                    if (name && detailModal.data.currUser.hasOwnProperty(name)) {
                        $(this).text(detailModal.data.currUser[name]);
                    }
                });

                detailModal.refs.$authSelector.val(item.authNo);
            },
            updateUser: function () {
                var requestData = setDefault({
                    url: '/admin/user/users/updateUserAuth',
                    authNo: detailModal.refs.$authSelector.val(),
                    userSeq: detailModal.data.currUser.userSeq,
                    
                    //edayeon
                    userEmail: detailModal.data.currUser.userId,
                    userName: detailModal.data.currUser.userNm
                });
                $.commonAjax(requestData, '', function (response, status, headers, config) {
                    alert('회원정보가 수정되었습니다.');

                    detailModal.closeDetailModal();
                    page.retrieve(page.data.currPage);
                });
            },
            closeDetailModal: function () {
                $('#detailModal').modal('hide');
            }
        };
    })();
</script>
