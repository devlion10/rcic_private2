<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<style type="text/css">
		#collStateDiv{
			width: 100%;
			height: 500px;
			font-size: 15px;
		}
	</style>
</head>
<body>
	<div class="chart lineChart mt20">
		<div class="chartTitleBox">
			<p class="chartTitle inline">수집현황 통계</p>
			<img src="/assets/images/icon/excl_mark.png" alt="mark" class="exclMark" data-title="입찰공고 수집추이(일별, 주별, 월별)을 확인할 수 있습니다.">
			<div class="dateBtnBox topDateBtn" id="topDate">
				<img src="/assets/images/button/btn_day_off.png" onclick="_rcicCollectChart.createChart1Data('stdr_dt');" data-fileName="btn_day" alt="dateButton">
				<img src="/assets/images/button/btn_week_on.png" onclick="_rcicCollectChart.createChart1Data('stdr_week');" data-fileName="btn_week" alt="dateButton">
				<img src="/assets/images/button/btn_month_off.png" onclick="_rcicCollectChart.createChart1Data('stdr_yyyymm');" data-fileName="btn_month" alt="dateButton">
			</div>
		</div>
		<div id="collStateDiv"></div>
	</div>
</body>

<script type="text/javascript">
	_rcicCollectChart =  new RcicCollectChart({ }); 
</script>
