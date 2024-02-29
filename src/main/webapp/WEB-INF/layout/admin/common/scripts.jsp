<%--퍼블 start--%>
<!-- js placed at the end of the document so the pages load faster -->
<script src="/assets/admin/js/jquery.js"></script>
<script src="/assets/admin/js/bootstrap.min.js"></script>
<script class="include" type="text/javascript" src="/assets/admin/js/jquery.dcjqaccordion.2.7.js"></script>
<script src="/assets/admin/js/jquery.scrollTo.min.js"></script>
<%--<script src="/assets/admin/js/jquery.nicescroll.js" type="text/javascript"></script>--%>
<script src="/assets/admin/js/bootstrapValidator.min.js" type="text/javascript"></script>
<script src="/assets/admin/js/moment.min.js" type="text/javascript"></script>
<script src="/assets/admin/js/bootstrap-datetimepicker.min.js" type="text/javascript"></script>

<script type='text/javascript' src='/assets/js/common/lib/bootstrap/bootstrap-datepicker.min.js'></script>
<script type='text/javascript' src='/assets/js/common/lib/bootstrap/bootstrap-datepicker.kr.js'></script>

<!--common script for all pages-->
<script src="/assets/admin/js/common-scripts.js"></script>
<script src="/assets/admin/js/summernote/summernote-lite.min.js"></script>
<script src="/assets/admin/js//summernote/summernote-ko-KR.min.js"></script>
<%--퍼블 end--%>

<!-- chart.js  -->
<script src="/assets/js/common/lib/amcharts4/core.js"></script>
<script src="/assets/js/common/lib/amcharts4/charts.js"></script>
<script src="/assets/js/common/lib/amcharts4/lang/de_DE.js"></script>
<script src="/assets/js/common/lib/amcharts4/lang/ko_KR.js"></script>
<script src="/assets/js/common/lib/amcharts4/themes/animated.js"></script>
<script src="/assets/js/common/lib/amcharts4/plugins/forceDirected.js"></script>

<%--개발 추가--%>
<script src="/assets/admin/js/lodash.min.js"></script>

<script type="text/javascript" src="/assets/js/common/lib/jquery/jquery.blockUI.js"></script>

<script type="text/javascript" src="/assets/js/common/lib/common/twbsPagination.min.js"></script>
<script type="text/javascript" src="/assets/js/common/lib/moment/moment.js"></script>
<script type='text/javascript' src='/assets/js/common/lib/sweetalert/sweetalert.js'></script>
<script type='text/javascript' src='/assets/js/common/lib/common/base.js'></script>
<script type="text/javascript" src="/assets/js/common/util/commonUtil.js"></script>
<script type='text/javascript' src='/assets/js/common/commonN.js'></script>
<script type="text/javascript" src="/assets/js/module/cmmn/CommonSearch.js"></script>
<script type="text/javascript" src="/assets/js/module/dataCntc/DataCntc.js"></script>
<script type='text/javascript' src='/assets/js/module/admin/admin.utils.js'></script>



<%--퍼블 스크립트 TODO 뭐하는 건지 확인 --%>
<!--script for this page-->
<script type="text/javascript">

    <%-- start: 개발 추가  --%>
    $(function () {
        $('#searchForm').on('submit', function () {
            return false;
        });
        $('#searchForm input[type=text]').on('keydown', function (e) {
            if (e.keyCode === 13) retrieve(1);
        });

        $('input.date').datepicker({
            format: 'yyyy-mm-dd',
            language: 'kr'
        })

        $(document).ajaxStart(function () {
            $.showBlock();
        });
        $(document).ajaxComplete(function () {
            $.hideBlock();
        });

    });
    <%-- end: 개발 추가  --%>

    $(function () {
        var sd = new Date(), ed = new Date();


        $('#startDate,#endDate').datepicker({
            format: 'yyyy-mm-dd',
            language: 'kr'
        })

    });
</script>
