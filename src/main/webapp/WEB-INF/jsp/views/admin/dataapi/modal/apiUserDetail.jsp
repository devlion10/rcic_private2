<!-- Modal -->
<div class="modal fade" id="apiDtlInfo" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">API 사용자 상세</h4>
            </div>
            <div class="modal-body">
                <form>
                    <p class="modalSubTit">API 사용자 정보</p>
                    <div class="userInfoTbl">
                        <table>
                            <colgroup>
                                <col width="150px" />
                                <col width="*" />
                            </colgroup>
                            <tr>
                                <td>기관명</td>
                                <td data-name="insttNm"></td>
                            </tr>
                            <tr>
                                <td>접속URL</td>
                                <td data-name="conectUrl"></td>
                            </tr>
                            <tr>
                                <td>상태</td>
                                <td data-name="sttusNm"></td>
                            </tr>
                            <tr>
                                <td>가입일자</td>
                                <td data-name="srbde"></td>
                            </tr>
                            <tr>
                                <td>API 인증키</td>
                                <td data-name="apiCrtfcKey"></td>
                            </tr>
                            <tr>
                                <td>차단여부</td>
                                <td data-name="blockAt">Y</td>
                            </tr>

                            <tr class="tr-blocked">
                                <td>차단기간</td>
                                <td data-name="blockPeriod">
                                    <%--2020.12.12 ~ 2021.01.31--%>
                                </td>
                            </tr>
                            <tr class="tr-blocked">
                                <td>차단사유</td>
                                <td data-name="blockReason"></td>
                            </tr>

                        </table>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">닫기</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<script type="text/javascript">
    var apiUserDetailModal = {
        init: function () {
            $('#apiDtlInfo table tr').each(function (idx, ele) {
                $(this).find('td').eq(1).text('');
            });
            $('.tr-blocked').hide();
        },
        setData: function (item) {
            $('#apiDtlInfo table td').each(function (idx, td) {
                var name = $(this).data('name');
                if (name && item.hasOwnProperty(name)) {
                    $(this).text(item[name]);
                }
            });

            if (item.blockAt === 'Y') {
                $('.tr-blocked').show();
            }
            // TODO 차단기간 차단사유 값 보여주기
        }
    }
</script>