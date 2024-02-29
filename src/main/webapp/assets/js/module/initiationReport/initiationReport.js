let seq;

$(document).ready(function() {
	// 공사종류 selectBox
	InitiationReport.getCstrnType();
	// 공사시행위치 selectBox
	MainInfo.getSido();
	// 도로종류 selectBox
	InitiationReport.getConstKind("const_road_clss");
	// 착수신고현황 조회
	InitiationReport.setSearchInitiationReport();
	$("#cstrnStDt").datepicker({
		changeYear:true,
		changeMonth:true,
		format: "yyyy.mm.dd", 
	    language: "kr"
	});
	$("#cstrnEndDt").datepicker({
		changeYear:true,
		changeMonth:true,
		format: "yyyy.mm.dd", 
		language: "kr"
	}); 
	$(".datepicker").click(function(){
		var target = $(this).attr('target');
		$('#' + target).datepicker().focus();
	});
	$('.date').on("click", function(){
		$('.optionSel input').removeClass("active");
	});
});

var InitiationReport = {
    setSearchInitiationReport : function(curr_page) {
		//날짜유효성체크
		if (parseInt($('#cstrnStDt').val().replace(/[.]/g,"")) > parseInt($('#cstrnEndDt').val().replace(/[.]/g,""))) {
			$.swal("종료일자는 시작일자 이전으로 선택할수 없습니다.");
			return false;
		}

		// 검색 버튼 클릭 시
        let formData = $("#initiationReportSearchForm").serializeObject();

		if($.isNullString(curr_page)){
				curr_page = 1;
		}
		
		let list_cnt = 10;
		
		formData.currPage = curr_page;
		formData.listCnt = parseInt(list_cnt);
		formData.url = "/rcic/initiationReport/getInitiationReportList";
		
		var dataList = setDefault(formData);

		$.commonAjax(dataList,'', function(response, status, headers, config){
			let str="";
            let list = response.list;
            let max_page = response.maxPageCnt;

			for (let i = 0; i < list.length; i++) {
				seq = list[i].seq;
				str += "<form action='/rcic/initiationReport/movePageInitiationReportDetail' method='get' id='movePageDetailForm"+seq+"'>";
				// str += "<input type='hidden' name='seq' value='"+seq+"'/>";
				str += '<input type="hidden" name="seq" value="'+seq+'"/>';
				str += "<tr><td><input type='checkbox' id='choice" + i + "' class='deleteCheckBox' value='"+seq+"'><label for='choice" + i + "'></label></td>";
	            str += "<td>" + list[i].rn + "</td>";
	            // str += "<td>" + parseInt(i+1) + "</td>";
	            // str += "<td><a href='#' onclick='InitiationReport.movePageInitiationReportDetail("+seq+");'>" + list[i].bidntceno + "</a></td>";
	            str += "<td><a href='/rcic/initiationReport/movePageInitiationReportDetail?seq="+seq+"'>" + list[i].bidntceno + "</a></td>";
	            str += "<td>" + list[i].roadTypeNm + "</td>";
	            str += "<td>" + list[i].roadRteNo + "</td>";
	            str += "<td>" + list[i].cstrnTypeNm + "</td>";
	            str += "<td>" + list[i].cstrnNm + "</td>";
	            str += "<td>" + list[i].subCstrnCnt + "</td>";
	            str += "<td>" + list[i].cstrnDt + "</td></tr></form>";
	        }

 			$("#initiationReportList").html(str);
			$("#totCnt").html("Total : " + response.totalCnt + "건");
			$.paging('initiationReportPagination',curr_page,max_page,list.length,function(event,page){
           		InitiationReport.setSearchInitiationReport(page);
            }); 
		},false,function(e){
			console.log(e);
		});


        // InitiationReport.setSearchInitiationReportListEvt(); //목록보기
        //
        // if(tabGbn == "1"){
        //     //초기화 버튼 일 경우
        //     if(gbn == "reset"){
        //         Collection.selPeriod('3month');
        //     }
        //
        // }else{
        //     $(".topDateBtn img").each(function(index, item){
        //         var name   = $(this).attr("data-fileName");
        //         if(name == "btn_week"){
        //             $(this).trigger('click');
        //             return;
        //         }
        //     });
        //
        //     $(".btmDateBtn img").each(function(index, item){
        //         var name   = $(this).attr("data-fileName");
        //         if(name == "btn_week"){
        //             $(this).trigger('click');
        //             return;
        //         }
        //     });
        //     Collection.setSearchCollectionCountEvt(); //통계보기
        //     Collection.keywordCntList();
        //     setSearchCollectionListEvt();
        // }

    },
	getConstKind:function(code){
		// 도로종류 selectBox
		let obj = new Object();
		obj.url = "/rcic/code/selectDetailCode";
		obj.groupCode = code;

		let dataList = setDefault(obj);

		//$('#constKindList').empty();
		$('ul[name="constKindList"]').empty();
		$.commonAjax(dataList,'', function(response, status, headers, config){
			let html = "";
			let list = response.list;
			_.sortBy(list, "code")

			if(code != "const_road_clss"){
				for(let i in list){
					html += '<li onclick="Corporation.selKindInfo(this); return false;">';
					html += '	<div class="corCateTbl">';
					html += '		<div class="corCateCell">';
					html += '			<input type="hidden" name="onImgValue" value="'+  list[i].base64Attr1 + '" />';
					html += '			<input type="hidden" name="offImgValue" value="'+  list[i].base64Attr2 + '" />';
					html += '			<img src="data:image/jpeg;base64,' + list[i].base64Attr2 + '" data-filename="category_icon2" width="20" height="20">';
					html += '			<input type="hidden" name="kindCd" value="' + list[i].code + '">';
					html += '			<p name="kindNm">' + list[i].codeNm + '</p>';
					html += '		</div>';
					html += '	</div>';
					html += '</li>';
				}
				$('ul[name="constKindList"]').html(html);
				//$('#constKindList').html(html);
			}else{

				$('.ctSelect').empty();
				html += '<option value="all">도로전체</option>'
				for(let i in list){
					html += '<option value="' + list[i].code + '">' + list[i].codeNm+ '</option>'
				}

				$('.ctSelect').html(html);
			}

		});
	},
	getCstrnType: function () {
		// 공사종류 selectBox
		let formData = {};

		formData.currPage = '';
		formData.listCnt = 0;
		formData.url = "/rcic/initiationReport/getCstrnType";

		let dataList = setDefault(formData);
		$.commonAjax(dataList,'', function(response, status, headers, config) {
			let str = '<option value="all">전체</option>';
			for(let i in response) {
				str += '<option value="' + response[i].cdkey + '">' + response[i].cdvalue + '</option>';
			}
			$('#cstrnTypeCd').html(str);
		});
	},
	movePageInitiationReportDetail : function (seq) {
		$("#movePageDetailForm"+seq).submit();
	},
	resetEvt:function(){
		// 조건 초기화 버튼 클릭 시
		$('input[name="bidntceno"]').val('');
		$('select[name="cstrnTypeCd"]').val(0);
		$('input[name="cstrnStDt"]').val('');
		$('input[name="cstrnEndDt"]').val('');
		$('#sido option:eq(0)').prop('selected', true);
		$('select[name="sgg"]').empty();
		$('select[name="emd"]').empty();
		$('select[name="sgg"]').html('<option value="0" selected="selected">시/군/구 선택</option>');
		$('select[name="emd"]').html('<option value="0" selected="selected">읍/면/동 선택</option>');
		$('select[name="roadTypeCd"]').val(0);
		$('select[name="keywordSb"]').val(0);
		$('input[name="keyword"]').val("");
		$('.optionSel input').removeClass("active");
	},
	delEvt:function(){
		var chk_arr = [];

		var chk = $("input:checkbox[class='deleteCheckBox']:checked").val();
		if (chk == undefined) {return alert("삭제할 목록을 선택 후 다시 진행해주세요.");}

		$("input:checkbox[class='deleteCheckBox']:checked").each(function(){
			chk = $(this).val();
			chk_arr.push(chk);
		});
		// var params = {jsonData : chk_arr};
		 $.ajax({
	        url: "/rcic/initiationReport/initiationReportDel",
	        type: "post",
			// data : JSON.stringify(param),
			data : JSON.stringify(chk_arr),
			traditional : true,
			// dataType: "json",
			contentType: "application/json",
	        success: function(result) {
				confirm("삭제되었습니다.");
				return MainInfo.movePage('initiationReport');
			},
			error: function (jqXHR, textStatus) {
				alert("에러가 발생했습니다. 관리자에게 문의하세요");
			}
	    });
		
	},
	selectPeriod:function(elem){
		// 기간선택
		var period = $(elem).attr('name');
		if($(elem).hasClass("active")){
			$(elem).removeClass("active");
		}else{
			$('.optionSel input').removeClass("active");
		}

		$(".optionDate").removeClass("active");
		$(elem).addClass("active");

		$.selPeriod(period,'cstrnStDt','cstrnEndDt');
	}
}
//
// $("#moveRegistPageBtn").click(() => {
//     location.href = "/rcic/initiationReport/movePageInitiationReportRegist";
// })
