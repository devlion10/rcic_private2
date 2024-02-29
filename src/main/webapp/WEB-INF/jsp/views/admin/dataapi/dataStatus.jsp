<head>
    <title>데이터제공 관리</title>
</head>
<%--데이터 제공 현황--%>
<section class="wrapper">
    <h3>데이터제공 관리</h3>

    <div class="row mt">

        <div class="col-md-12">
            <div class="content-panel">
                <h4>데이터 제공현황</h4>
                <hr>
                <div class="col-md-12 searchMB">
                    <form class="form-inline" role="form" id="searchForm" onsubmit="return false">
                        <div class="form-group mr10">
                            <label for="startDt" class="mr10">기간</label>
                            <input id="startDt" name="startDt" type="text" class="form-control date" />
                            <label>~</label>
                            <input id="endDt" name="endDt" type="text" class="form-control date" />
                        </div>
                        <div class="form-group mr30">
                            <div class="form-check inline mr10">
                                <input class="form-check-input" type="radio" name="periodType" id="inlineRadio1" value="M" checked>
                                <label class="form-check-label" for="inlineRadio1">월별</label>
                            </div>
<%--                            TODO 분기별 구현 --%>
<%--                            <div class="form-check inline mr10">--%>
<%--                                <input class="form-check-input" type="radio" name="periodType" id="inlineRadio2" value="Q">--%>
<%--                                <label class="form-check-label" for="inlineRadio2">분기별</label>--%>
<%--                            </div>--%>
                            <div class="form-check inline">
                                <input class="form-check-input" type="radio" name="periodType" id="inlineRadio3" value="Y">
                                <label class="form-check-label" for="inlineRadio3">년별</label>
                            </div>
                        </div>
                        <div class="form-group mr10">
                            <label class="mr10">데이터명</label>
                            <select class="form-control" id="groupKey">
                                <option value="">전체</option>
                                <option value="1">고속도로 공사현황</option>
                                <option value="2">국도 공사현황</option>
                                <option value="3">지방도/기타 공사현황</option>
                            </select>
                        </div>
                        <button type="button" class="btn btn-success searchBtn" onclick="retrieve()">조회</button>
                    </form>
                </div>
                <div class="total">
                    <button type="button" class="btn btn-theme04 btnSearch"  onclick="exportTableToExcel('dataTable', 'data_api_stats')"><i class="fa fa-file-excel-o" aria-hidden="true"></i></button>
                </div>
                <div class="usageStatus">
                    <div class="inline wid50" id="chartdiv" style="height:600px;">
<%--                        <canvas id="bar" width="800" height="600"></canvas>--%>
                    </div>
                    <div class="inline wid50">
                        <table class="table table-striped table-advance table-hover" id="dataTable">
                            <thead id="resultThead">
<%--                            <tr>--%>
<%--                                <th>기간</th>--%>
<%--                                <th>API1</th>--%>
<%--                                <th>API2</th>--%>
<%--                                <th>API3</th>--%>
<%--                                <th>API4</th>--%>
<%--                                <th>합계</th>--%>
<%--                            </tr>--%>
                            </thead>
                            <tbody id="resultTbody">
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- <div class="paging" id="pagination"></div> -->

            </div><!-- /content-panel -->
        </div><!-- /col-md-12 -->
    </div><!-- /row -->

</section>



<jsp:include page="modal/apiAgency.jsp"/>


<c:set var="scripts" scope="request">
<script type="text/javascript">

    var stackChart = null;

    // FIXME
    var allGroups = [
        {groupKey: '1', groupNm: '고속도로 공사현황'},
        {groupKey: '2', groupNm: '국도 공사현황'},
        {groupKey: '3', groupNm: '지방도/기타 공사현황'},
    ];

    // ready
    $(function(){
        init();
        retrieve();
    });

    // functions
    function init() {
        $('#startDt').val(moment().startOf('year').format('YYYY-MM-DD'));
        $('#endDt').val(moment().endOf('year').format('YYYY-MM-DD'));

        $('input.date').datepicker({
            format: 'yyyy-mm-dd',
            language: 'kr'
        })
    }

    function retrieve() {

        var targetHeaders = allGroups;
        if ($('#groupKey').val() !== '') {
            targetHeaders = [{groupKey: $('#groupKey').val(), groupNm: $('#groupKey option:selected').text()}]
        }
        createThead(targetHeaders);

        var groupFormat = getFormatByCondition();


        var param = $('#searchForm').serializeObject();
        console.log(param);
        if (!param.startDt) {
            alert('검색 시작일을 입력하세요.');
            return;
        }
        if (!param.endDt) {
            alert('검색 종료일을 입력하세요.');
            return;
        }

        param.startDt = param.startDt.replace(/-/gi, '');
        param.endDt = param.endDt.replace(/-/gi, '');
        param.groupFormat = groupFormat;

        $.ajax({
            type: 'get',
            url: '/admin/data-api/data-statistics',
            data: param,
            contentType: 'application/json'
        }).done(function(res){
            console.log('response', res);

            // 년월 그룹만 추출
            var dateList = _.map(res, function(r){
                return r.useDe;
            })
            dateList = _.uniqBy(dateList);

            // 기간별 API 데이터 만들기
            var tableData = [];
            var chartData = [];
            _.each(dateList, function (d) {
                var useDeLabel = moment(d, groupFormat).format(groupFormat == 'YYYYMM' ? 'YYYY년 MM월' : 'YYYY년');
                var row = {
                    useDeLabel: useDeLabel,
                    useDe: d,
                    values: [],
                    total: 0
                }; // 기간

                var chartRow = {
                    useDeLabel: useDeLabel,
                    useDe: d
                }

                // API별 통계값
                _.each(targetHeaders, function (h) {
                    var targetApiDate = _.find(res, {useDe: d, groupKey: h.groupKey });
                    var valueByApi = targetApiDate != null ? targetApiDate.summary : 0;
                    row.values.push(valueByApi);
                    row.total += valueByApi;

                    chartRow[h.groupKey + ''] = valueByApi;
                })
                tableData.push(row);
                chartData.push(chartRow);
            });

            var tbody = [];
            _.each(tableData, function (row) {

                var $tr = $('<tr>').append($('<td>').text(row.useDeLabel))
                _.each(row.values, function (val) {
                    $tr.append($('<td>').text(comma(val)));
                })
                $tr.append($('<td>').text(comma(row.total)));
                tbody.push($tr);
            })
            $('#resultTbody').html(tbody);

            drawChart(targetHeaders, chartData.reverse());

        });
    }

    // 월 분기 년 그룹핑
    function processData(resList) {
        // $.each(resList, function (idx, item) {
        //
        // })
        return resList;
    }

    function createThead(headers) {
        console.log('target Headers', headers);
        var $head = $('<tr/>').append($('<th>').text('기간'))
        for (var i in headers) {
            var h = headers[i];
            $head.append($('<th/>').text(h.groupNm));
        }
        $head.append($('<th>').text('합계'));
        $('#resultThead').html($head);
    }

    function getFormatByCondition() {
        var type = $('#searchForm input[name=periodType]:checked').val();
        if (type == 'M') return 'YYYYMM';
        if (type == 'Q') return 'YYYYMM';
        if (type == 'Y') return 'YYYY';
    }


    function drawChart(headers, chartData) {

        if (stackChart != null) {
            stackChart.dispose();
        }

        am4core.addLicense("CH245886500");
        am4core.ready(function() {

            console.log('chartData', chartData);

            // Themes begin
            // am4core.useTheme(am4themes_animated);
            // Themes end

            // Create chart instance
            var chart = am4core.create("chartdiv", am4charts.XYChart);
            chart.tooltip.label.fontSize = 12;

            // Create axes
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "useDeLabel";
            categoryAxis.renderer.grid.template.location = 0;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.renderer.inside = true;
            valueAxis.renderer.labels.template.disabled = true;
            valueAxis.min = 0;

            // Create series
            function createSeries(field, name) {
                console.log('createSeries', field, name);

                // Set up series
                var series = chart.series.push(new am4charts.ColumnSeries());
                series.name = name;
                series.dataFields.valueY = field;
                series.dataFields.categoryX = "useDeLabel";
                series.sequencedInterpolation = true;

                // Make it stacked
                series.stacked = true;

                // Configure columns
                series.columns.template.width = am4core.percent(60);
                series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";
                // series.columns.template.tooltipText = "{name}: {categoryX}: {valueY}";

                // Add label
                var labelBullet = series.bullets.push(new am4charts.LabelBullet());
                labelBullet.label.text = "{valueY}";
                labelBullet.label.text = "{name}";
                labelBullet.locationY = 0.5;
                labelBullet.label.hideOversized = true;

                return series;
            }

            _.each(headers, function (h) {
                createSeries(h.groupKey + '', h.groupNm);
            })

            chart.data = chartData;
            chart.legend = new am4charts.Legend();
            chart.legend.fontSize = 12;

            stackChart = chart;
        });

    }

</script>
</c:set>