<div class="modal fade" id="testColl" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">데이터 조회/수집</h4>
            </div>
            <div class="modal-body">
                <form class="form-inline" role="form" onsubmit="return false;">
                    <div class="form-group mr10">
                        <label for="testStartDt" class="mr10">공고기간</label>
                        <input id="testStartDt" name="startDt" type="text" class="form-control date" />
                        <span>~</span>
                        <input id="testEndDt" name="endDt" type="text" class="form-control date" />
                    </div>
                    <p>※ 최대 1개월 이내만 가능</p>
                    <div class="form-group mt10">
                        <label class="mr10">수집키워드</label>
                        <input type="text" class="form-control mr10" name="keyword" id="collKeyword">
                        <button type="button" class="btn btn-secondary" onclick="modalTestColl.search()">데이터 조회/수집</button>
                    </div>
<%--                    <p>※ 여러 개의 키워드 입력 시 콤마(,)로 구분하여 입력</p>--%>
                </form>
                <p class="modalSubTit mt10">데이터 조회결과</p>
                <div class="">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th>번호</th>
                            <th>수집키워드</th>
                            <th>수집건수</th>
                        </tr>
                        </thead>
                        <tbody id="collTbody">
                            <tr>
                                <td>10</td>
                                <td>도로확장</td>
                                <td>10</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">닫기</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div>
<script type="text/javascript">
    $(function () {
        $('#testColl').on('show.bs.modal', function (event) {
            modalTestColl.init();
        });
        $('#collKeyword').on('keyup', function (e) {
            if (e.keyCode == 13) {
                modalTestColl.search();
            }
        });
    });

    var modalTestColl = {
        init: function () {
            var emptyRow = '<tr><td colspan="3">수집 키워드를 입력하세요.</td></tr>';
            $('#collTbody').html(emptyRow);

            $('#collKeyword').val('');
        },
        search: function () {
            var k = $('#collKeyword').val();
            if ($.isEmpty(k)) {
                alert('키워드를 입력하세요.');
                $('#collKeyword').focus();
                return;
            }

            var start = $('#testStartDt').val();
            var end = $('#testEndDt').val();

            if ($.isEmpty(start)) {
                alert('시작일을 입력하세요.');
                $('#testStartDt').focus();
                return;
            }
            if ($.isEmpty(end)) {
                alert('시작일을 입력하세요.');
                $('#testEndDt').focus();
                return;
            }

            start = start.replace(/-/g, '');
            end   = end.replace(/-/g, '');

            var url = '/admin/cmm/keyword/test/' + start + '/' + end + '/' + encodeURIComponent(k);
            console.log(url);
            $.ajax({
                type: 'get',
                url: url,
                contentType: 'application/json',
                dataType: 'json'
            }).done(function (res) {
                console.log(res, res.count);
                var row = '<tr><td>1</td><td>' + k + '</td><td>' + res.count + '</td></tr>'
                $('#collTbody').html(row);
            }).error(defaultErrorFn);

        }
    }


</script>