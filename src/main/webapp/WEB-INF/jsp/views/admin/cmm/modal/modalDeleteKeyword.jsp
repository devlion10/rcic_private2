<div class="modal fade" id="deleteConf" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">삭제확인</h4>
            </div>
            <div class="modal-body">
                <p>선택된 <span id="selectedKeywordCnt"></span>개의 키워드를 삭제하시겠습니까?</p><p>삭제하시면 키워드에 해당하는 데이터를 더 이상 수집하지 않게 됩니다.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-theme04" onclick="modalDeleteKeyword.remove()">확인</button>
                <button type="button" class="btn btn-default" data-dismiss="modal" id="modalDeleteKeywordCloseBtn">취소</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div>


<script type="text/javascript">
    $(function () {
        $('#deleteConf').on('show.bs.modal', function (event) {

            var list = Keyword.getCheckedList();
            if (list.length == 0) {
                alert('삭제할 코드를 선택하세요.');
                return false;
            }

            modalDeleteKeyword.init();
            modalDeleteKeyword.setData(list);
        });
    });

    var modalDeleteKeyword = {
        groupCode: null,
        init: function () {
            $('#selectedKeywordCnt').empty()
        },
        setData: function (list) {
            console.log('checked', list);
            $('#selectedKeywordCnt').text(list.length);
        },
        remove: function () {
            var list = Keyword.getCheckedList();
            var param = {codeMapList: list};

            apiPost('deleteCodeDetailMapList', param).done(function (res) {
                alert('삭제되었습니다.');
                Keyword.retrieve(1);
                modalDeleteKeyword.close();
            }).error(defaultErrorFn)
        },
        close: function () {
            $('#modalDeleteKeywordCloseBtn').click();
        }
    }
</script>