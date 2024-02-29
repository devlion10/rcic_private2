<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<style type="text/css">
		#localConstDiv{
			width: 100%;
			height: 500px;
			font-size: 15px;
			padding: 30px;
		}
	</style>
</head>
<body>
	<div class="chart lineChart mt20" >  
		<div class="chartTitleBox">
			<p class="chartTitle inline">지역별 공사 대상 건수</p>
			<img src="/assets/images/icon/excl_mark.png" alt="mark" class="exclMark" data-title="시도/시군구/읍면동별 공사건수를 확인할 수 있습니다. (표시되는 영역이 큰 곳이 공사수가 많은 지역) ※ 차트 클릭 시 시도 → 시군구 → 읍면동 단위로 확대/축소가 가능합니다.">
		</div>
		<div id="localConstDiv"></div>  
	</div>
</body>

<script type="text/javascript">
//var _rcicChartMap =  new RcicChart({});

</script>

