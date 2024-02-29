<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<style type="text/css">
		#constTrendDiv{
			width: 100%;
			height: 500px;
			font-size: 15px;
		}
	</style>
	
</head>
<body>
	<div class="chart lineChart mt20" >
		<div class="chartTitleBox">
			<p class="chartTitle inline">총 공사추이</p>  
			<img src="/assets/images/icon/excl_mark.png" alt="mark" class="exclMark" data-title="총공사, 국도공사, 고속도로공사, 지방도 및 기타 공사로 구분하여 공사추이(일별, 주별, 월별)를 확인할 수 있습니다.">
			<div class="dateBtnBox constTrend">
				<img src="/assets/images/button/btn_day_off.png" onclick="_rcicChartMap.createChart1Data('day');" data-fileName="btn_day" alt="dateButton">
				<img src="/assets/images/button/btn_week_on.png" onclick="_rcicChartMap.createChart1Data('week');" data-fileName="btn_week" alt="dateButton">
				<img src="/assets/images/button/btn_month_off.png" onclick="_rcicChartMap.createChart1Data('month');" data-fileName="btn_month" alt="dateButton">
			</div>
		</div>
		<div id="constTrendDiv"></div>    
	</div>
</body>

<script type="text/javascript">
var _rcicChartMap =  new RcicChart({});
</script>
