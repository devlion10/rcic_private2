<div class="tabMenuBox" id="authInfoDetail">
    <!-- Nav tabs -->
    <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" id="baseSetLi"><a href="#baseSet" aria-controls="baseSet" role="tab" data-toggle="tab">기본정보</a></li>
        <li role="presentation" id="authSetLi"><a href="#authSet" aria-controls="authSet" role="tab" data-toggle="tab">권한설정</a></li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content">
        <div role="tabpanel" class="tab-pane active" id="baseSet">
            <div class="customTbl">
                <table>
                    <colgroup>
                        <col width="30%"/>
                        <col width="70%"/>
                    </colgroup>
                    <tr>
                        <td>권한명</td>
                        <td><input type="text" name="authInfoNm"></td>
                    </tr>
                    <tr>
                        <td>사용자수</td>
                        <td data-name="useCnt"></td>
                    </tr>
                </table>

                <div class="CustomBtnBox">
                    <button type="button" class="btn btn-danger" id="deleteAuthInfo">삭제</button>
                    <button type="button" class="btn btn-success" id="patchAuthInfo">수정</button>
                </div>
            </div>
        </div>

        <div role="tabpanel" class="tab-pane" id="authSet">
            <div class="inline customList" style="min-width: 250px; max-height: 300px; overflow-y: auto;">
                <dl>
                    <dt>전체</dt>
                    <c:forEach var="menu" items="${menuList}">
                        <dd class="menuBtn" data-menuNo="${menu.id}" data-menuNm="${menu.menuNm}" style="cursor: pointer; ">${menu.menuNm}</dd>
                        <%--
                        <c:forEach var="child" items="${menu.childMenuList}">
                            <dd class="menuBtn" data-menuNo="${child.id}" data-menuNm="${child.menuNm}" style="cursor: pointer">- ${child.menuNm}</dd>
                        </c:forEach>
                        --%>
                    </c:forEach>
                </dl>
            </div>
            <div class="inline customTbl">
                <table class="">
                    <colgroup>
                        <col width="40%"/>
                        <col width="60%"/>
                    </colgroup>
                    <tr>
                        <td>기능명</td>
                        <td id="menuNm"></td>
                    </tr>
                    <tr>
                        <td>권한</td>
                        <td>
                            <div class="custom-control custom-checkbox">
                                <input type="radio" class="custom-control-input chkAuthDtlSe" id="radio_auth" value="Y" name="authDtlSe">
                                <label class="custom-control-label" for="radio_auth">사용 가능</label>
                                <input type="radio" class="custom-control-input chkAuthDtlSe" id="radio_auth2" value="N" name="authDtlSe">
                                <label class="custom-control-label" for="radio_auth2">불가능</label>
                            </div>
                        </td>
                    </tr>
                </table>
                <div class="CustomBtnBox">
                    <button type="button" class="btn btn-primary" id="saveAuthDtl">확인</button>
                    <button type="button" class="btn btn-default" onclick="authInfoDetail.close()">취소</button>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    var authInfoDetail = {};

    (function () {
        $(function () {
            $('#patchAuthInfo').on('click', authInfoDetail.patchAuthInfo);
            $('#deleteAuthInfo').on('click', authInfoDetail.deleteAuthInfo);

            $('dd.menuBtn').on('click', authInfoDetail.getAuthDtl);

            $('#saveAuthDtl').on('click', authInfoDetail.saveAuthDtl);
        });

        authInfoDetail = {
            data: {
                item: null,
                currentMenu: null
            },
            refs: {
            },
            show: function (item) {
                authInfoDetail.data.item = item;

                $('#baseSet input[name=authInfoNm]').val(item.authNm);
                $('#baseSet td[data-name=useCnt]').text(item.useCnt);
                $('#deleteAuthInfo').data('item', item);
                $('#patchAuthInfo').data('item', item);

                $('#baseSetLi').addClass('active');
                $('#baseSet').addClass('active');
                $('#authSetLi').removeClass('active');
                $('#authSet').removeClass('active');

                $('#authInfoDetail').show();
            },
            close: function () {
                $('#menuNm').text('');
                $('.chkAuthDtlSe').prop('checked', false);
                $('#authInfoDetail').hide();
            },
            patchAuthInfo: function () {
                var $this = $(this);

                $.ajax({
                    url: '/admin/user/authInfo/patchAuthInfo',
                    type: 'post',
                    contentType:"application/json;charset=UTF-8",
                    data: JSON.stringify({
                        id: $this.data('item').authNo,
                        authNm: $('#baseSet input[name=authInfoNm]').val().trim()
                    }),
                }).done(function (result) {
                    if (result['RESULT_CODE'] === 'SUCCESS') {
                        alert('권한을 수정했습니다.');

                        page.retrieve(page.data.currPage);
                    } else if (result['RESULT_CODE'] === 'EXIST') {
                        alert('이미 사용중인 이름입니다.');
                    }
                }).fail(function (result) {
                    alert('오류가 발생했습니다.');
                });
            },
            deleteAuthInfo: function () {
                var $this = $(this);

                if ($this.data('item').useCnt > 0) {
                    alert('권한을 사용중입니다.');
                    return;
                }

                if (!confirm('권한을 삭제하시겠습니까?')) {
                    return;
                }

                $.ajax({
                    url: '/admin/user/authInfo/deleteAuthInfo',
                    type: 'post',
                    contentType:"application/json;charset=UTF-8",
                    data: JSON.stringify({
                        id: $this.data('item').authNo
                    }),
                }).done(function (result) {
                    if (result['RESULT_CODE'] === 'SUCCESS') {
                        alert('권한을 삭제했습니다.');

                        authInfoDetail.close();
                        page.retrieve(page.data.currPage);
                    }
                }).fail(function (result) {
                    alert('오류가 발생했습니다.');
                });
            },
            getAuthDtl: function () {
                var $this = $(this);

                authInfoDetail.data.currentAuthDtl = null;
                authInfoDetail.data.currentMenu = $this.data('menuno');

                $('#menuNm').text($this.data('menunm'));

                $.ajax({
                    url: '/admin/user/authInfo/getAuthDtl',
                    type: 'get',
                    data: {
                        authNo: authInfoDetail.data.item.authNo,
                        menuNo: authInfoDetail.data.currentMenu
                    },
                }).done(function (result) {
                    $('.chkAuthDtlSe').prop('checked', false);

                    if (result) {
                        authInfoDetail.data.currentAuthDtl = result.id;

                        var se = result.authDtlSe;

                        $('.chkAuthDtlSe').each(function () {
                            if (se.includes($(this).val())) {
                                $(this).prop('checked', true);
                            }
                        });
                    }
                }).fail(function (result) {
                    alert('오류가 발생했습니다.');
                });
            },
            saveAuthDtl: function () {
                var $this = $(this);

                var authDtlSe = $('[name=authDtlSe]:checked').val();

                var data = {
                    id: authInfoDetail.data.currentAuthDtl,
                    authNo: authInfoDetail.data.item.authNo,
                    menuNo: authInfoDetail.data.currentMenu,
                    authDtlSe: authDtlSe
                };

                if (!data.menuNo) {
                    alert('메뉴를 선택하세요.');
                    return;
                }

                if (!data.authDtlSe) {
                    alert('사용가능 여부를 선택하세요.');
                    return;
                }

                $.ajax({
                    url: '/admin/user/authInfo/saveAuthDtl',
                    type: 'post',
                    contentType:"application/json;charset=UTF-8",
                    data: JSON.stringify(data),
                }).done(function (result) {
                    alert('권한을 수정했습니다.');
                }).fail(function (result) {
                });
            }
        }
    })();
</script>
