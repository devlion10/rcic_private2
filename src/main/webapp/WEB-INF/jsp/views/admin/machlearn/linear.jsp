<head>
    <title>머신 러닝</title>
</head>
<%--머신 러닝--%>
<section class="wrapper">
    <h3>머신러닝</h3>

    <div class="row mt">

        <div class="col-md-12">
            <div class="content-panel">
                <h4>최대반경결정 모델</h4>
                <div style="margin: 0 0 10px 10px;">위치 포착에 실패한 공고에 대하여 인근 도로로 위치를 예측하기 위한 검색 반경을 머신러닝 기법으로 결정합니다.</div>
                <hr>

                <div>

                    <ul class="nav nav-tabs" role="tablist" style="margin-bottom: 10px;" id="tabnavi">
                        <li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#tab1" role="tab" aria-selected="true"  ><span class="hidden-sm-up"></span> <span class="hidden-xs-down">모델 학습 </span></a> </li>
                        <li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#tab2" role="tab" aria-selected="false" ><span class="hidden-sm-up"></span> <span class="hidden-xs-down">모델 분석 결과</span></a> </li>
                    </ul>


                    <div class="tab-content tabcontent-border">
                        <div class="tab-pane" id="tab1" >
                            <div class="p-20">
                                <div class="total">
                                    <p><!--table title--></p>
                                    <button type="button" class="btn btn-theme04 btnSearch" data-toggle="modal" onclick="runModel()">모델 업데이트</button>
                                </div>
                                <table class="table table-striped table-advance table-hover">
                                    <thead>
                                    <tr>
                                        <th>실행일시</th>
                                        <th>결과구분</th>
                                        <th>학습시작일</th>
                                        <th>학습종료일</th>
                                        <th>학습결과</th>
                                        <th>결과메시지</th>
                                    </tr>
                                    </thead>
                                    <tbody id="resultTbody">
                                    </tbody>
                                </table>
                                <div class="paging" id="pagination"></div>
                            </div>
                        </div>

                        <div class="tab-pane" id="tab2" >
                            <div class="p-20">

                               <!-- <div class="row" style="margin-bottom: 10px;">
                                    <div class="col-md-4">
                                        <div class="input-group">
                                            <select class="form-control" id="tab2Select">
                                                <option value="caught" selected>위치 포착 공고</option>
                                                <option value="missed">위치 미포착 공고</option>
                                            </select>
                                        </div>
                                    </div>
                                </div> -->

                                <table class="table table-striped table-advance table-hover">
                                    <colgroup>
                                        <col width="140px"/>
                                        <col width="100px"/>
                                        <col width="*"/>
                                        <col width="30%"/>
                                        <col width="100px"/>
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th>공고번호</th>
                                        <th>차수</th>
                                        <th>공고명</th>
                                        <th>수요기관명</th>
                                        <th>반경(km)</th>
                                    </tr>
                                    </thead>
                                    <tbody id="resultTbody2">
                                    </tbody>
                                </table>
                                <div class="paging" id="pagination2"></div>


                            </div>
                        </div>

                    </div>


                </div>


            </div><!-- /content-panel -->
        </div><!-- /col-md-12 -->
    </div><!-- /row -->

</section>

<c:set var="scripts" scope="request">
<script type="text/javascript">

    // ready
    $(function(){
        $('#tabnavi').find('a').eq(0).click();
        retrieve(1);
        retrieve2(1);

        /* $('#tab2Select').on('change', function () {
            retrieve2(1);
        }); */
    });

    function retrieve(currPage) {
        if (!currPage) currPage = 1;
        $('#pagination').twbsPagination('destroy');
        var param = {
            listCnt: 10,
            currPage: currPage
        };
        var condition = $('#searchForm').serializeObject();
        $.extend(param, condition);

        $.ajax({
            type: 'get',
            url: '/admin/mach-learn/linear/log',
            contentType: 'application/json',
            data: param
        }).done(function (res) {
            //console.log('response', res);
            if (res.list && res.list.length > 0) {
                var result = [];
                $.each(res.list, function (idx, item) {

                    var resultLabel = item.lrnNm == 'fail' ? '오류' : '정상';
                    var percent = item.lrnNm == 'fail' ? '' : '오차(RMSE): '+ parseFloat(item.lrnResult).toFixed(2) +'km';
                    var resultMsg = item.lrnNm == 'fail' ? '수집된 데이터가 없습니다.' : '학습이 완료되었습니다.';

                    var $tr = $('<tr/>')
                                        .append($('<td/>').text(item.executDt))
                                        .append($('<td/>').text(resultLabel))
                                        .append($('<td/>').text(formatDate(item.lrnBgnde)))
                                        .append($('<td/>').text(formatDate(item.lrnEndde)))
                                        .append($('<td/>').text(percent))
                                        .append($('<td/>').text(resultMsg).addClass('align-left'))
                    result.push($tr);
                })
                $('#resultTbody').html(result);
                $('#pagination').pagination(currPage, res.maxPageCnt, retrieve);
            } else {
                $('#resultTbody').noDataList(6);
            }

        }).error(function (e) {
            console.error(e);
        });
    }

    // 학습모델 실행
    function runModel() {

        if (!confirm('학습모델을 실행하시겠습니까?')) return;

        $.ajax({
            type: 'post',
            url: '/admin/mach-learn/linear/runModelPy',
        }).done(function (res) {
            //console.log(res);
            alert('학습모델이 실행되었습니다.');
            retrieve(1);
        }).error(function (e) {
            alert('오류가 발생했습니다.');
            console.error(e);
        });
    }

    function retrieve2(currPage) {
        if (!currPage) currPage = 1;
        //$('#resultTbody2').noDataList(4, '데이터를 조회 중입니다.');
        $('#pagination2').twbsPagination('destroy');
        var param = {
            listCnt: 10,
            currPage: currPage
        };

        //var searchApi = $('#tab2Select').val();
        $.ajax({
            type: 'get',
            /* url: '/admin/mach-learn/linear/result/' + searchApi, */
            url: '/admin/mach-learn/linear/result/caught',
            contentType: 'application/json',
            data: param
        }).done(function (res) {
            //console.log('response', res);
            if (res.list && res.list.length > 0) {
                var result = [];
                $.each(res.list, function (idx, item) {

                    var $title = $('<a>').attr('href', item.bidntcedtlurl).attr('target', '_blank').text(item.bidntcenm);

                    var $tr = $('<tr/>')
                        .append($('<td/>').text(item.resultno))
                        .append($('<td/>').text(item.bidntceord))
                        .append($('<td/>').text(item.bidntcenm).addClass('align-left'))
                        .append($('<td/>').text(item.ntceinsttnm))
                        .append($('<td/>').text(item.radius).addClass('align-right'))
                    result.push($tr);
                })
                $('#resultTbody2').html(result);
                $('#pagination2').pagination(currPage, res.maxPageCnt, retrieve2);
            } else {
                $('#resultTbody2').noDataList(4);
            }

        }).error(function (e) {
            console.error(e);
        });
    }

</script>
</c:set>