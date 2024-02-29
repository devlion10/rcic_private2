<!-- Modal -->
<div class="modal fade" id="batchModal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">사용자정보 상세</h4>
            </div>

            <div class="modal-body">
                <form>
                    <p class="modalSubTit" id="batchSubTitle"></p>
                    <div class="userInfoTbl">
                        <table>
                            <colgroup>
                                <col width=""/>
                                <col width=""/>
                            </colgroup>
                            <tr>
                                <td>사용자ID</td>
                                <td id="batchUserIds"></td>
                            </tr>
                            <tr>
                                <td>사용자권한</td>
                                <td>
                                    <select class="form-control" id="batchAuthSelector">
                                        <option value="">권한 선택</option>
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
                <button type="button" class="btn btn-primary" onclick="batchModal.updateUsers()">승인</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">취소</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<script type="text/javascript">
    var batchModal = {};

    (function () {
        $(function () {
        });

        batchModal = {
            data: {
                selectedUsers: null
            },
            refs: {
                $subTitle: $('#batchSubTitle'),
                $userIds: $('#batchUserIds'),
                $authSelector: $('#batchAuthSelector')
            },
            init: function (items) {
                batchModal.data.selectedUsers = items;

                batchModal.refs.$subTitle.text('선택한 ' + batchModal.data.selectedUsers.length + '명의 사용자를 선택한 권한으로 승인합니다.');

                var userIds = [];
                $.each(batchModal.data.selectedUsers, function (index, user) {
                    userIds.push(user.userId);
                });
                batchModal.refs.$userIds.html(userIds.join('<br/>'));
            },
            updateUsers: function () {
                if (batchModal.refs.$authSelector.val() === '') {
                    alert('권한을 선택해주세요.');
                    return;
                }

                var userSeqList = [];
                $.each(batchModal.data.selectedUsers, function (index, user) {
                    userSeqList.push(user.userSeq);
                });
				
                //edayeon
                var userEmailList = [];
                $.each(batchModal.data.selectedUsers, function (index, user) {
                	userEmailList.push(user.userId);
                });
                var userNameList = [];
                $.each(batchModal.data.selectedUsers, function (index, user) {
                	userNameList.push(user.userNm);
                });
                
                
                var requestData = setDefault({
                    url: '/admin/user/users/updateUserAuth',
                    authNo: batchModal.refs.$authSelector.val(),
                    userSeqList: userSeqList,
                    
                    //edayeon
                    userEmailList: userEmailList,
                    userNameList: userNameList
                });

                $.commonAjax(requestData, '', function (response, status, headers, config) {
                    alert('회원정보가 수정되었습니다.');

                    batchModal.closeBatchModal();
                    page.retrieve(page.data.currPage);
                });
            },
            closeBatchModal: function () {
                $('#batchModal').modal('hide');
            }
        }
    })();
</script>
