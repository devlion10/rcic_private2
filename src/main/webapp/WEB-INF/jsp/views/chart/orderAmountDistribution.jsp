<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<style type="text/css">
		#orderAmountDiv{
			width: 100%;
			height: 500px;
			font-size: 15px;
		}
	</style>
</head>
<body>
	<div class="chart lineChart mt20">
		<div class="chartTitleBox">
			<p class="chartTitle inline">발주금액 분포</p>
			<img src="/assets/images/icon/excl_mark.png" alt="mark" class="exclMark" data-title="입찰공고 금액대별 분포를 확인할 수 있습니다.">
		</div>
		<div id="orderAmountDiv"></div> 
	</div>
</body>

<script type="text/javascript">

</script>
