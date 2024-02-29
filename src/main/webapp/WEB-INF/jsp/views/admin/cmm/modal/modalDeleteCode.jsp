<div class="modal fade" id="deleteCode" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">삭제확인</h4>
            </div>
            <div class="modal-body">
                <p id="delCodeConfirmText"></p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-theme04" onclick="modalDeleteCode.remove()">확인</button>
                <button type="button" class="btn btn-default" data-dismiss="modal" id="modalDeleteCodeCloseBtn">취소</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div>

<script type="text/javascript">
    $(function () {
        $('#deleteCode').on('show.bs.modal', function (event) {
            var type = $(event.relatedTarget).data('type');
            modalDeleteCode.type = type;

            var list = modalDeleteCode.checkedList();
            if (list.length == 0) {
                alert('삭제할 코드를 선택하세요.');
                return false;
            }

            modalDeleteCode.init();
            modalDeleteCode.setData(list);
        });
    });

    var modalDeleteCode = {
        type: null, // group, detail
        init: function () {

        },
        setData: function (list) {
            modalDeleteCode.setMessage(list.length);

        },
        setMessage(len) {
            var typeNm = modalDeleteCode.isGroup() ? '코드그룹' : '코드';
            var message = '선택된 (' + len + ')개의 ' + typeNm + '을 삭제하시겠습니까?';
            $('#delCodeConfirmText').text(message);
        },
        remove: function () {

            function errFn(e) {
                alert('오류가 발생했습니다. 시스템 관리자에게 문의하세요.');
                console.error(e);
            }

            var list = modalDeleteCode.checkedList();
            if (modalDeleteCode.isGroup()) {
                CodeGroup.remove({codeGroupList: list}).done(function (res) {
                    alert('삭제되었습니다.');
                    CodeGroup.retrieve(1);
                    modalDeleteCode.close();
                }).error(errFn)
            } else {

                var param = {codeGroup: CodeDetail.groupCode, codeList: list};
                CodeDetail.remove(param).done(function (res) {
                    alert('삭제되었습니다.');
                    CodeDetail.retrieve(1);
                    modalDeleteCode.close();
                }).error(errFn)
            }
        },
        checkedList() {
            return modalDeleteCode.isGroup() ? CodeGroup.getCheckedList() : CodeDetail.getCheckedList();
        },
        isGroup: function () {
            if (modalDeleteCode.type == 'group') {
                return true;
            } else if (modalDeleteCode.type == 'detail') {
                return false;
            } else {
                throw new Error('Unknown code type.');
            }
        },
        close: function () {
            $('#modalDeleteCodeCloseBtn').click();
        }
    }
</script>