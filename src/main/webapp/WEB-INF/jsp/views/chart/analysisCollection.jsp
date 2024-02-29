<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<style type="text/css">
		#analysisCollectionDiv{
			width: 100%;
			height: 500px;
			font-size: 15px;
		}
	</style>
	
</head>
<body>
	<div class="chart lineChart mt20" >
		<div class="chartTitleBox">
			<p class="chartTitle inline">분석/수집현황</p>
			<img src="/assets/images/icon/excl_mark.png" alt="mark" class="exclMark" data-title="입찰공고 수집과 분석추이를 확인할 수 있습니다.">  
			<div class="dateBtnBox analysisCollection">
				<img src="/assets/images/button/btn_day_off.png" onclick="_rcicChartMap.createChart7Data('day');" data-fileName="btn_day" alt="dateButton">
				<img src="/assets/images/button/btn_week_on.png" onclick="_rcicChartMap.createChart7Data('week');" data-fileName="btn_week" alt="dateButton">
				<img src="/assets/images/button/btn_month_off.png" onclick="_rcicChartMap.createChart7Data('month');" data-fileName="btn_month" alt="dateButton">
			</div>
		</div>
		<div id="analysisCollectionDiv"></div>    
	</div>
</body>

<script type="text/javascript">
var _rcicChartMap =  new RcicChart({});
</script>
