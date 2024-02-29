<div class="modal fade" id="testColl" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">공고문 조회/수집/분석</h4>
            </div>
			<div class="modal-body">
				<form class="form-inline" role="form" onsubmit="return false;">
					<div class="form-group mr10">
					<p class="modalSubTit mt10">공고문 수집/분석</p>
						<label for="testStartDt" class="mr10">공고기간</label> 
						<input id="testStartDt" name="startDt" type="text" class="form-control date" /> 
						<span>~</span> 
						<input id="testEndDt" name="endDt" type="text" class="form-control date mr10" />
						<button type="button" class="btn btn-primary" id="collection" onclick="javascript:void(0);">수집</button>
						<button type="button" class="btn btn-primary" id="analysis" onclick="javascript:void(0);">분석</button>
					</div>
					<p>※ 최대 1개월 이내만 수집/분석 가능</p>
					<p style="color: darkred;">※ 주의 : 기 분석 완료된 공고 기간을 분석시 공고 데이터가 중복 노출됨.</p>
					<div class="form-group mt10">
						<p class="modalSubTit mt10">나라장터 공고건 조회</p>
						<label class="mr10">수집키워드</label> 
						<input type="text" class="form-control mr10" name="keyword" id="collKeyword" placeholder="도로" />
						<input type="checkbox" class="checkUser" id="chkAll" value="5" />
						<label for="chkAll" class="mr10" style="margin-left: 3px;">전체(수집/제외/복구 키워드 적용)</label>
						<button type="button" class="btn btn-success searchBtn" onclick="modalTestColl.search()">조회</button>
					</div>
					<%--<p>※ 여러 개의 키워드 입력 시 콤마(,)로 구분하여 입력</p>--%>
				</form>
				<div id="resultArea">
					<p class="modalSubTit mt10">조회결과</p>
					<div class="">
						<table class="table table-striped table-advance table-hover">
							<thead>
								<tr>
									<th>수집키워드</th>
									<th>공고기간</th>
									<th>데이터건수</th>
								</tr>
							</thead>
							<tbody id="collTbody">
								<tr>
									<td>도로확장</td>
									<td>2022-01-01</td>
									<td>10건</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">닫기</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div>
<script type="text/javascript">
$(function() {
		$('#testColl').on('show.bs.modal', function(event) {
			modalTestColl.init();
		});
		$('#collKeyword').on('keyup', function(e) {
			if (e.keyCode == 13) {
				modalTestColl.search();
			}
		});
		
		$("#chkAll").change(function(){
	        if($("#chkAll").is(":checked")){
	        	$("#collKeyword").val("");
	        	$("#collKeyword").attr("readonly","true");
	        }else{
	        	$("#collKeyword").removeAttr("readonly");
	        }
	    });
	});
	
	
	$("#collection").click(function() {
		var start = $('#testStartDt').val();
		var end = $('#testEndDt').val();

		if ($.isEmpty(start)) {
			alert('공고시작일을 입력하세요.');
			$('#testStartDt').focus();
			return;
		}
		if ($.isEmpty(end)) {
			alert('공고종료일을 입력하세요.');
			$('#testEndDt').focus();
			return;
		}
		
		if(confirm("공고데이터를 수집하시겠습니까? "+"[공고기간:"+start+"~"+end+"]")){
			start = start.replace(/-/g, '');
			end = end.replace(/-/g, '');

			var url = '/admin/system/keyword/g2bRun/' + start + '/' + end;
			
	         $.ajax({
	            type: 'get',
	            url: url,
	            contentType : 'application/json',
				dataType : 'json'
	        }).done(function (res) {
	           	alert("수집이 완료되었습니다.");
	        }).error(function (request,status,error){
	            alert("error:"+error);
	        });
			
		}else{
			return;
		}
		
		
	});
	
	$("#analysis").click(function() {
		var start = $('#testStartDt').val();
		var end = $('#testEndDt').val();

		if ($.isEmpty(start)) {
			alert('공고시작일을 입력하세요.');
			$('#testStartDt').focus();
			return;
		}
		if ($.isEmpty(end)) {
			alert('공고종료일을 입력하세요.');
			$('#testEndDt').focus();
			return;
		}
		
		if(confirm("수집데이터를 분석하시겠습니까? "+"[공고기간:"+start+"~"+end+"]")){
			start = start.replace(/-/g, '');
			end = end.replace(/-/g, '');

			var url = '/admin/system/keyword/analysisRun/' + start + '/' + end;

			 $.ajax({
		            type: 'get',
		            url: url
		            //contentType : 'application/json',
					//dataType : 'json'
		        }).done(function (res) {
		           	alert("분석이 완료되었습니다.");
		        }).error(function (request,status,error){
		            alert("error:"+error);
		        });
			
		}else{
			return;
		}
	});

	
	var modalTestColl = {
		init : function() {
			var emptyRow = '<tr><td colspan="3">수집키워드를 입력 후 검색하세요.</td></tr>';
			$('#collTbody').html(emptyRow);

			$('#collKeyword').val('');
		},
		search : function() {
			var k = $('#collKeyword').val();
			if ($.isEmpty(k)) {
				if (!$("#chkAll").is(":checked")) {
					alert('수집키워드를 입력하세요.');
					$('#collKeyword').focus();
					return;
				} else {
					k = "all";
				}
			}

			var start = $('#testStartDt').val();
			var end = $('#testEndDt').val();

			if ($.isEmpty(start)) {
				alert('공고시작일을 입력하세요.');
				$('#testStartDt').focus();
				return;
			}
			if ($.isEmpty(end)) {
				alert('공고종료일을 입력하세요.');
				$('#testEndDt').focus();
				return;
			}

			start = start.replace(/-/g, '');
			end = end.replace(/-/g, '');

			var url = '/admin/system/keyword/test/' + start + '/' + end + '/'
					+ encodeURIComponent(k);

			$.ajax({
				type : 'get',
				url : url,
				contentType : 'application/json',
				dataType : 'json'
			}).done(
					function(res) {
						console.log(res);
						if (res.word == "all") {
							var row = '<tr><td>' + '전체' + '</td><td>'
									+ res.start.slice(0,4) + '-' + res.start.slice(4, 6) + '-' + res.start.slice(6,8) + " ~ "
									+ res.end.slice(0,4) + '-' + res.end.slice(4, 6) + '-' + res.end.slice(6,8) + '</td><td>'
									+ res.resultCount + '건</td></tr>';
						} else {
							var row = '<tr><td>' + k + '</td><td>'
									+ res.start.slice(0,4) + '-' + res.start.slice(4, 6) + '-' + res.start.slice(6,8) + " ~ "
									+ res.end.slice(0,4) + '-' + res.end.slice(4, 6) + '-' + res.end.slice(6,8) + '</td><td>'
									+ res.totalCount + '건</td></tr>';
						}
						$('#collTbody').html(row);

					}).error(defaultErrorFn);

		}
	}
</script>
