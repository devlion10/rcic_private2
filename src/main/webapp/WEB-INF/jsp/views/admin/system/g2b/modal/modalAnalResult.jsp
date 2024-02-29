<div class="modal fade" id="analResult" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">분석데이터</h4>
            </div>
			<div class="modal-body">
				<div id="resultArea">
					<p class="modalSubTit mt10">분석데이터 결과</p>
					<form id="modalAmKeywordForm" onsubmit="return false;">
					<div class="">
						<table class="table table-striped table-advance table-hover">
							<thead>
								<tr>
									<th>공고기간</th>
									<th>분석데이터건수</th>
								</tr>
							</thead>
							<tbody id="collTbody">
								<tr>
									<td><span id="date"></span></td>
									<td><span id="cnt">0건</span></td>
								</tr>
							</tbody>
						</table>
					</div>
					</form>
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
		$('#analResult').on('show.bs.modal', function (event) {
            modalKeyword.init();
            var d = $(event.relatedTarget).data('item');
            modalKeyword.setData(d);
        });
	});
	var modalKeyword = {
	        init: function () {
	            var $form = $('#modalAmKeywordForm');
	            $form.find('[id=date]').text('');
	        },
	        setData: function (data) {
	            if (!data) return;
	            var start = data.searchStartDt.replace(/-/g, '');
	            var end = data.searchEndDt.replace(/-/g, '');
	            var $form = $('#modalAmKeywordForm');
	            $form.find('[id=date]').text(data.searchStartDt+" ~ "+data.searchEndDt);
	            
	            var url = '/admin/system/g2b/getAnalCnt/' + start + '/' + end;
	            
	        	$.ajax({
	        	    url: url, 
	        	    type:'get',
	        	    dataType : 'json',
	        	    success: function(data) {
	        	    	$form.find('[id=cnt]').text(data.cnt + "건");
	        	    },
	        	    error: function(err) {
	        	    	alert("error");
	        	    }
	        	});

	        }
	}

</script>