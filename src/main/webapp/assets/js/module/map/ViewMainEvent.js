(function(window, $) {
	"use strict";
	var adm_curr_page;
	var poi_curr_page;
	var road_curr_page;
	var flag = 1;
	
	var ViewMainEvent = function(_options) {
		this.init(_options);  	
	};

	ViewMainEvent.prototype = {
		config:null,
		pagingConfig:{
			listCnt:5,
			rstListCnt:20
		},
		init:function(_options){
				this.config = $.extend({}, this._defaults, _options);
 		}, 
 		message :{
 			noSperiod:'기간을 선택해주세요',
 			selectArea:'영역지정과 영역연산을 해주세요',
 			selectData:'데이터 목록에서 데이터를 선택해주세요',
 			checkSearch:'검색영역 또는 검색데이터 목록을 체크해주세요',
 			dataNull: '데이터가 없습니다',
 			NoSearchWord:'검색어를 입력하세요',
 			SearchException:'검색어를 다시 확인해주세요',
 			checkExtractionGeomNm:'저장할 영역명을 입력해주세요',
 			checkExtractionDispListNm:'저장할 데이터 목록명을 입력해주세요',
 			checkDataListUseYn:'해당 데이터는 선택할 수 없습니다\n관리자에게 문의하세요'
		},
 		/* 시도시군구읍면동 확인 버튼 EVENT */
 		legalZoneConfirm : function(){
			var sido = "";
			var sgg = "";
			var emd = "";
			var code="";
			
			$('#sidoZone').text("");
			$('#sggZone').text("전체");
			$('#emdZone').text("전체");
			
			sido = $('#sidoComboValue').val();
			code = $('#sidoComboCode').val();
			mapInit.map.getView().setCenter($.findGeometry('sido',code));
			mapInit.map.getView().setZoom(MapRcicMng.layer.wfs.sido.minZoom);
			$('#sidoZone').text(sido);
			
			sgg = $('#sggComboValue').val();
			emd = $("#emdComboValue").val();
			if(sgg.length > 0){
				$('#sggZone').text(sgg);
				code = $('#sggComboCode').val();
				mapInit.map.getView().setCenter($.findGeometry('sgg',code));
				mapInit.map.getView().setZoom(MapRcicMng.layer.wfs.sgg.minZoom);
				
			}
			
			if(emd.length > 0){
				$('#emdZone').text(emd);
				code = $('#emdComboCode').val();
				mapInit.map.getView().setCenter($.findGeometry('emd',code));
				mapInit.map.getView().setZoom(MapRcicMng.layer.wfs.emd.minZoom);
			}
			$("#slegalCd").val(code);
			$('#addrPop').hide();
		},
		/* 위치검색 버튼 EVENT */
		legalZoneSearch : function(){
			$('#sggCombo').text("");
			$('#emdCombo').text("");
				if($('#addrPop').css("display") === "none") {
					var _self = this;
					var emdcd = $("#slegalCd").val();
					_mapArea = new MapArea({ 
						 emdCd:$("#slegalCd").val()
					});
					
					//_mapArea.legalZoneCancle(); //시도시군구읍면동 취소 버튼 시 원래 주소 셋팅 
					
					$('#addrPop').show();
					$('.addrBtnDown').hide();
					$('.addrBtnUp').show();
					//_viewMainEvent.legalZoneFocus();
				} else {
					$('#addrPop').hide();
					$('.addrBtnDown').show();
					$('.addrBtnUp').hide();
				}
		},
		legalZoneFocus: function () {
			setTimeout(function () {
				var minusTop = $('#sidoCombo').position().top;
				$('#sidoComboList').scrollTop(($('#sidoComboList li.active').position().top - minusTop));
				var minusTop = $('#sggCombo').position().top;
				$('#sggComboList').scrollTop(($('#sggComboList li.active').position().top - minusTop));
				var minusTop = $('#emdCombo').position().top;
				$('#emdComboList').scrollTop(($('#emdComboList li.active').position().top - minusTop));
			}, 1000);
		}
		
	}
	window.ViewMainEvent = ViewMainEvent;
	window.name = "ViewMainEvent.js";
})(window, jQuery);