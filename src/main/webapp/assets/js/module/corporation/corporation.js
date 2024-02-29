var _rcicChartMap;
var _detailMap;
var totalKeyword;
var selkind;
var chartConst;
var chartFac;
var _detailMap =null;
var constIngCntTxt;
var isSelected="";
var Corporation = {

	btnClickEvent:function(elem){
		var name = $(elem).attr('name');
		var classNm = $(elem).attr('class');

		if( classNm == "btn_close"){
			$('.mypageCorBox').hide();
			$("body").css("overflow", "auto");
			$('.corCategory').hide();
		}
	},
	//검색조건저장
	getContition:function(){

		var listCnt = $("#listCnt option:selected").val(); //  건수
		var keyword = $('#keyword').val();
		var chekPeriod = $('input[name="dRadio"]:checked').val();
		var sido = $('select[name="sido"] option:selected').val();
		var sgg = $('select[name="sgg"] option:selected').val();
		var emd = $('select[name="emd"] option:selected').val();
		var road = $('select[name="road"] option:selected').val();
		var order = "stdr_dt desc"
		var authNo = $('#authNo').val();

		var searchKeyword ="";
		var radioVal = "";
		var selConst = "";
		var selFac = "";
		var searchTextYN = "Y";

		if(chekPeriod == "bidntcedt"){
			radioVal = 'bidntcedt';	//공고일
			order = "bidntcedt desc"
		}else if(chekPeriod =="consrdt"){
			radioVal = 'forecast_st_dt'; 	//공사기간
			order = "bidntcedt desc"
		}else{
			radioVal = 'thtm_ccmplt_date';
			order = "bidntcedt desc"
		}

		startDt = $("#fromDt").val().replace(/[.]/g,"");
		endDt = $("#toDt").val().replace(/[.]/g,"");

		// 공사 선택
		$('ul[name="selConstList"] li').each(function (index, item) {
			var selLi = $('#selConstList li:eq('+index+')')
			selConst += selLi.find('input[name="constCdResult"]').val() + " ";
		});

		//시설물 선택
		$('ul[name="selFacList"] li').each(function (index, item) {
			var selLi = $('#selFacList li:eq('+index+')')
			selFac +=  selLi.find('input[name="facCdResult"]').val() + " ";
		});

		 // 검색어 있을경우 order =  order+", "+defalutOrder; 변경하기위해
	    //if(!$.isNullString(keyword)){

	    //}

		G.contition = {
   		        "base"      : { 'listCnt'   : listCnt         , 'keyword': keyword ,'radioVal':radioVal, 'startDt':startDt, 'endDt':endDt, 'searchTextYN':searchTextYN },
   		        "legandong" :[
   		        	          { 'fieldName' :'sido_cd'        , 'fieldValue': sido}
   		                     ,{ 'fieldName' :'sgg_cd'        , 'fieldValue': sgg}
   		        	         ,{ 'fieldName' :'emd_cd'        , 'fieldValue': emd}
	        	            ],
   		        "constRoadClss"  : { 'fieldName' :'const_road_clss', 'fieldValue':  road           },             //도로선택
   		        "roadType"  : { 'fieldName' :'road_ty_cd'     , 'fieldValue': selConst.replace(/\s+$/,"")       }, //공사종류
   		        "facType"   : { 'fieldName' :'fac_ty_cd'      , 'fieldValue': selFac.replace(/\s+$/,"")         }, //시설물선택
   		        "authNo"    : { 'authNo' : authNo},
		};

		G.contition.order=order;

		if(chekPeriod == "bidntcedt"){  //공고일
			searchKeyword = G.contition["base"]["radioVal"] + ':['+G.contition["base"]["startDt"]+' TO '+G.contition["base"]["endDt"]+']';
		}else if(chekPeriod =="consrdt"){   //공사기간
			//searchKeyword = G.contition["base"]["radioVal"] + ':['+G.contition["base"]["startDt"]+' TO '+G.contition["base"]["endDt"]+']';
			searchKeyword = G.contition["base"]["radioVal"] +":["+G.contition["base"]["startDt"]+ " TO " +G.contition["base"]["endDt"]+"] OR forecast_end_dt:["+G.contition["base"]["startDt"]+" TO "+G.contition["base"]["endDt"]+"]"
		}else{
			searchKeyword = "thtm_ccmplt_date:["+G.contition["base"]["startDt"]+" TO "+G.contition["base"]["endDt"]+"]"
		}

		for(var i in G.contition["legandong"]){
			var idx = G.contition["legandong"][i];
			if(idx.fieldValue != "0"){
				searchKeyword += " AND "+ idx.fieldName +":"+ idx.fieldValue;
			}
		}
		G.contition.searchKeyword = searchKeyword;
	},

	getConstKind:function(code){

		// 공사종류, 시설물 종류 리스트
		var searchKeyword = $('#searchKeyword').val();
		var obj = new Object();
			obj.url = "/rcic/code/selectDetailCode";
			obj.groupCode = code;
		if(!$.isNullString(searchKeyword)) obj.searchKeyword = searchKeyword;

		var dataList = setDefault(obj);

		//$('#constKindList').empty();
		$('ul[name="constKindList"]').empty();
		$.commonAjax(dataList,'', function(response, status, headers, config){
			var html = "";
			var list = response.list;
			_.sortBy(list, "code")

			if(code != "const_road_clss"){
				for(var i in list){
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
					html += '<option value="">도로전체</option>'
				for(var i in list){
					html += '<option value="' + list[i].code + '">' + list[i].codeNm+ '</option>'
				}

				$('.ctSelect').html(html);
			}

		});
	},

	corCategoryPopup:function(elem){

		$('#searchKeyword').val("");
		$("body").css("overflow", "hidden");

		var type = $(elem).attr('id');

		if(type == "selConstBtn"){ // 공사선택
			$('span[name="corTitle"]').text("공사 선택");
			 Corporation.getConstKind("CD0004");
			 $('ul[name="selConstList"]').show();
		}else{
			$('span[name="corTitle"]').text("시설물 선택");
			 Corporation.getConstKind("CD0002");
			 $('ul[name="selFacList"]').show();
		}
		$(".corCategory").css({
            "top": (($(window).height()-$(".corCategory").outerHeight())/2+$(window).scrollTop())+"px",
            "left": (($(window).width()-$(".corCategory").outerWidth())/2+$(window).scrollLeft())+"px"
     	});

    	$(".corCategory").show();

	},

	searchConstKind:function(elem){
		// 공사/시설물 종류 검색
		var type = $(elem).parents().find($('span[name="corTitle"]')).text();

		if(type == "공사 선택"){ // 공사선택
			 Corporation.getConstKind("CD0004");
		}else{
			 Corporation.getConstKind("CD0002");
		}
	},

	selKindInfo:function(elem){
		// 공사종류 시설물 종류 선택
		var onImg = $(elem).find('input[name="onImgValue"]').val();
		var offImg = $(elem).find('input[name="offImgValue"]').val();
		var src  = "data:image/jpeg;base64,";
		if($(elem).hasClass("active")){
			// 이미지 off
			$(elem).removeClass("active");
			src += offImg;
			$(elem).find("img").attr("src", src);
			return false;
		}

		if($('ul[name="constKindList"]').find('.active').length >= 5){
			$.swal("최대 5개만 선택할 수 있습니다.");
			return;
		}else{
			$(elem).addClass("active");
			src += onImg;
			$(elem).find("img").attr("src", src);
		}

	},

	constKindImgOff:function(){
		// 선택해제 버튼
		$(".corCateList li").each(function(index, item){
			if($(item).attr('class') == "active"){
				var src  = "data:image/jpeg;base64,";
				var offImg = $(item).find('input[name="offImgValue"]').val();
				src += offImg;
				$(item).find("img").attr("src", src);
			}
		});

		$(".corCateList li").removeClass("active");
	},

	selectCorCategory:function(){
		// 공사종류, 시서물종류 선택 후
		$("body").css("overflow", "auto");
		var constCd = new Array();
		var constNm = new Array();
		var title = $('span[name="corTitle"]').text();
		$('ul[name="constKindList"] li').each(function (index, item) {
			if($(item).attr('class') == "active"){
				var selLi = $('ul[name="constKindList"] li:eq('+index+')')
				constNm.push(selLi.find('p').text());
				constCd.push(selLi.find('input[name="kindCd"]').val());
			}
		});

		if(title == "공사 선택"){
			$('ul[name="selConstList"]').empty();
			var html = "";
			for(var i in constCd){
				html += '<li class="inline">';
				html += '	<input type="hidden" name="constCdResult" value="' + constCd[i] + '">';
				html += '	<span>' + constNm[i] + '</span>';
				html += '	<img src="/assets/images/button/circleClose.png" alt="closeButton" onclick="Corporation.removeCorCategory(this);return false;">';
				html += '</li>';
			}

			if(constCd.length != 0){
				$('span[name="noneSelConst"]').css('display', 'none');
			}else{
				$('span[name="noneSelConst"]').css('display', '');
			}

			$('ul[name="selConstList"]').html(html);
		}else{
			$('ul[name="selFacList"]').html(html);
			var html = "";
			for(var i in constCd){
				html += '<li class="inline">';
				html += '	<input type="hidden" name="facCdResult" value="' + constCd[i] + '">';
				html += '	<span>' + constNm[i] + '</span>';
				html += '	<img src="/assets/images/button/circleClose.png" alt="closeButton" onclick="Corporation.removeCorCategory(this);return false;">';
				html += '</li>';
			}

			if(constCd.length != 0){
				$('span[name="noneSelFac"]').css('display', 'none');
			}else{
				$('span[name="noneSelFac"]').css('display', '');
			}
			$('ul[name="selFacList"]').html(html);
		}

		$('.corCategory').hide();

	},


	removeCorCategory:function(elem){
		$(elem).parents("li").remove();

		 if($('ul[name="selConstList"] li').length == 0){
			$('span[name="noneSelConst"]').css('display', '');
		 }

		 if($('ul[name="selFacList"] li').length == 0){
			$('span[name="noneSelFac"]').css('display', '');
		 }

	},

	getCorporationList :function(currPage, isCondition){

		this.getContition();

		isCondition = isSelected;

		if(isCondition=="fac"){
			if($('ul[name="selFacList"] li').length == 0){
				G.contition["facType"]["fieldValue"] = "*:*";
			}
		}else if(isCondition=="roadMake"){
			G.contition["roadType"]["fieldValue"]= "19 24 36 37 39 47 48";
		}else if(isCondition == "roadConst"){
			G.contition["constRoadClss"]["fieldValue"]="161";
		}

		if($.isNullString(currPage)){
			currPage = "1";
		}

		var startPage = String((parseInt(currPage)-1)*parseInt(G.contition["base"]["listCnt"]));
		var collection ="tb_analysis_info";
		var data = new Object();
			data.roadTypeCd = G.contition["roadType"]["fieldValue"];
			data.facTypeCd = G.contition["facType"]["fieldValue"];
			data.constRoadClss = G.contition["constRoadClss"]["fieldValue"];
			data.searchKeyword = $.isNullString(G.contition["base"]["keyword"]) ? G.contition["searchKeyword"] :  G.contition["searchKeyword"]+" AND bidntcenm:("+G.contition["base"]["keyword"]+")";
			data.order="bidntcedt desc";
			data.authNo = G.contition["authNo"]["authNo"];
			data.prdtReliCd = "";
		    data.prdtReliChk = "Y";
		    data.searchTextYN = G.contition["base"]["searchTextYN"];

		_commonSearch.getSearchList(startPage, G.contition["base"]["listCnt"], data, collection, function(response){
			   var resultData = response.result;
			   var maxPageCnt = response.maxPageCnt;

				if(!$.isNullString(startDt) && !$.isNullString(endDt)){
					var dateHtml = "";
					dateHtml += '<span class="sMtLine" id="searchRDateText"><span class="gColor">';
					dateHtml += $.setDateStr(startDt)+'</span> 부터 <span class="gColor">'+$.setDateStr(endDt)+'</span>';
					dateHtml += '<p class="searchRCnt">검색결과는 <span id="constIngCntTxt">총 ' +  $.number(constIngCntTxt) + '건</span> 입니다.</p>'
					$("#searchRDateText").html(dateHtml);
				}

			   var html="";

				if(resultData.length == 0){
					html+='<tr>';
					html+='	<td colspan="6">공사가 존재하지 않습니다.</td>';
					html+='</tr>';
				}

				var listCnt = $("#listCnt option:selected").val(); //  건수

			   for(var i in resultData){

					var dminsttnm = resultData[i].dminsttnm.split(" ");
					var num = (((parseInt(currPage))*parseInt(listCnt))+1)-parseInt(listCnt)+parseInt(i);
					html+='<tr>';
					html+='	<td>'+num+'</td>';
					html+='	<td>'+resultData[i].sido_nm+'</td>';
					html+='	<td class="alginLeft">'+resultData[i].bidntcenm+'</td>';
					html+='	<td>'+$.setDateStrUnderBar(resultData[i].bidntcedt)+'</td>';

					if($.isNullString(resultData[i].thtm_ccmplt_date)){
    					html+='	<td>'+$.setDateStrUnderBar(resultData[i].forecast_st_dt) + '~' +  $.setDateStrUnderBar(resultData[i].forecast_end_dt) +'</td>';
					}else{
						// html+='	<td>'+$.setDateStrUnderBar(resultData[i].cbgn_date) + "~" + $.setDateStrUnderBar(resultData[i].thtm_ccmplt_date)+'</td>'; 230530  공사계약내용 수정
    					html+='	<td>'+$.setDateStrUnderBar(resultData[i].cbgn_date) + "~" + resultData[i].thtm_ccmplt_date +'</td>';
					}
					html+=' <td>';
					for(var j in dminsttnm){
						html+= dminsttnm[j] + '<br>';
					}
					html+=' </td>';
					html+='	<td><input type="button" value="보기" class="dtlBtn" onclick="Corporation.constDetail(' + resultData[i].resultno + ');return false;"></td>';
					html+='</tr>';
				}

			   $('#corporationList').html(html);
				// 페이징 호출
            	$.corPaging('corporationPagination',parseInt(currPage),maxPageCnt, resultData.length,function(event,page){
            		Corporation.getCorporationList(String(page));
            	});

			});
		},
		// 엑셀다운로드
		getCorporationListExcel :function(currPage, isCondition, flag){
			this.getContition();

			isCondition = isSelected;

			if(isCondition=="fac"){
				if($('ul[name="selFacList"] li').length == 0){
					G.contition["facType"]["fieldValue"] = "*:*";
				}
			}else if(isCondition=="roadMake"){
				G.contition["roadType"]["fieldValue"]= "19 24 36 37 39 47 48";
			}else if(isCondition == "roadConst"){
				G.contition["constRoadClss"]["fieldValue"]="161";
			}

			if($.isNullString(currPage)){
				currPage = "1";
			}

			var startPage = String((parseInt(currPage)-1)*parseInt(G.contition["base"]["listCnt"]));
			var collection ="tb_analysis_info";
			var data = new Object();
				data.roadTypeCd = G.contition["roadType"]["fieldValue"];
				data.facTypeCd = G.contition["facType"]["fieldValue"];
				data.constRoadClss = G.contition["constRoadClss"]["fieldValue"];
				data.searchKeyword = $.isNullString(G.contition["base"]["keyword"]) ? G.contition["searchKeyword"] :  G.contition["searchKeyword"]+" AND bidntcenm:("+G.contition["base"]["keyword"]+")";
				data.order="bidntcedt desc";
				data.authNo = G.contition["authNo"]["authNo"];
				data.prdtReliCd = "";
				data.prdtReliChk = "Y";
				data.searchTextYN = G.contition["base"]["searchTextYN"];

			var row = String($.number(constIngCntTxt)).replace(/,/g, "");
			G.contition["base"]["listCnt"] = row;
			_commonSearch.getSearchList(startPage, G.contition["base"]["listCnt"], data, collection, function(response){
			   var resultData = response.result;
			   // var maxPageCnt = response.maxPageCnt;

				// if(!$.isNullString(startDt) && !$.isNullString(endDt)){
				// 	var dateHtml = "";
				// 	dateHtml += '<span class="sMtLine" id="searchRDateText"><span class="gColor">';
				// 	dateHtml += $.setDateStr(startDt)+'</span> 부터 <span class="gColor">'+$.setDateStr(endDt)+'</span>';
				// 	dateHtml += '<p class="searchRCnt">검색결과는 <span id="constIngCntTxt">총 ' +  $.number(constIngCntTxt) + '건</span> 입니다.</p>'
				// 	$("#searchRDateText").html(dateHtml);
				// }

			   var html="";

				if(resultData.length == 0){
					html+='<tr>';
					html+='	<td colspan="6">공사가 존재하지 않습니다.</td>';
					html+='</tr>';
				}

				var listCnt = $("#listCnt option:selected").val(); //  건수

			   for(var i in resultData){

					var dminsttnm = resultData[i].dminsttnm.split(" ");
					var num = (((parseInt(currPage))*parseInt(listCnt))+1)-parseInt(listCnt)+parseInt(i);
					html+='<tr>';
					html+='	<td>'+num+'</td>';
					html+='	<td>'+resultData[i].sido_nm+'</td>';
					html+='	<td class="alginLeft">'+resultData[i].bidntcenm+'</td>';
					html+='	<td>'+$.setDateStrUnderBar(resultData[i].bidntcedt)+'</td>';

					if($.isNullString(resultData[i].thtm_ccmplt_date)){
						html+='	<td>'+$.setDateStrUnderBar(resultData[i].forecast_st_dt)+'~' +  $.setDateStrUnderBar(resultData[i].forecast_end_dt) +'</td>';
					}else{
						html+='	<td>'+$.setDateStrUnderBar(resultData[i].cbgn_date) + "~" + $.setDateStrUnderBar(resultData[i].thtm_ccmplt_date)+'</td>';
					}
					// html+=' <td>';
					for(var j in dminsttnm){
						html+= '<td>' + dminsttnm[j] + '</td>';
					}
					// html+=;
					html+='	<td><input type="button" value="보기" class="dtlBtn" onclick="Corporation.constDetail(' + resultData[i].resultno + ');return false;"></td>';
					html+='</tr>';
				}

			   $('#corporationListAll').html(html);
				if(flag != "list"){
				   exportTableToExcel('dataTableExcel', '공사현황');
				}
			});
		},

		//엑셀전체다운로드
		getCorporationListExcelAll :function(currPage, isCondition, flag){
			this.getContition();

			isCondition = isSelected;

			if(isCondition=="fac"){
				if($('ul[name="selFacList"] li').length == 0){
					G.contition["facType"]["fieldValue"] = "*:*";
				}
			}else if(isCondition=="roadMake"){
				G.contition["roadType"]["fieldValue"]= "19 24 36 37 39 47 48";
			}else if(isCondition == "roadConst"){
				G.contition["constRoadClss"]["fieldValue"]="161";
			}

			if($.isNullString(currPage)){
				currPage = "1";
			}

			var startPage = String((parseInt(currPage)-1)*parseInt(G.contition["base"]["listCnt"]));
			var collection ="tb_analysis_info";
			var data = new Object();
			data.roadTypeCd = G.contition["roadType"]["fieldValue"];
			data.facTypeCd = G.contition["facType"]["fieldValue"];
			data.constRoadClss = G.contition["constRoadClss"]["fieldValue"];
			data.searchKeyword = $.isNullString(G.contition["base"]["keyword"]) ? G.contition["searchKeyword"] :  G.contition["searchKeyword"]+" AND bidntcenm:("+G.contition["base"]["keyword"]+")";
			data.order="bidntcedt desc";
			data.authNo = G.contition["authNo"]["authNo"];
			data.prdtReliCd = "";
			data.prdtReliChk = "Y";
			data.searchTextYN = G.contition["base"]["searchTextYN"];

			var row = String($.number(constIngCntTxt)).replace(/,/g, "");
			G.contition["base"]["listCnt"] = row;
			_commonSearch.getSearchList(startPage, G.contition["base"]["listCnt"], data, collection, function(response){
				var resultData = response.result;

				var html="";

				if(resultData.length == 0){
					html+='<tr>';
					html+='	<td colspan="6">공사가 존재하지 않습니다.</td>';
					html+='</tr>';
				}

				var listCnt = $("#listCnt option:selected").val(); //  건수

				for(var i in resultData){

					var dminsttnm = resultData[i].dminsttnm.split(" ");
					var num = (((parseInt(currPage))*parseInt(listCnt))+1)-parseInt(listCnt)+parseInt(i);
					html+='<tr>';
					html+='	<td>'+num+'</td>';
					html+='	<td>'+resultData[i].sido_nm+'</td>';
					html+='	<td class="alginLeft">'+resultData[i].bidntcenm+'</td>';
					html+='	<td>'+$.setDateStrUnderBar(resultData[i].bidntcedt)+'</td>';

					if($.isNullString(resultData[i].thtm_ccmplt_date)){
						html+='	<td>'+$.setDateStrUnderBar(resultData[i].forecast_st_dt)+'~' +  $.setDateStrUnderBar(resultData[i].forecast_end_dt) +'</td>';
					}else{
						html+='	<td>'+$.setDateStrUnderBar(resultData[i].cbgn_date) + "~" + $.setDateStrUnderBar(resultData[i].thtm_ccmplt_date)+'</td>';
					}
					// html+=' <td>';
					for(var j in dminsttnm){
						html+= '<td>' + dminsttnm[j] + '</td>';
					}
					// html+=;
					html+='	<td><input type="button" value="보기" class="dtlBtn" onclick="Corporation.constDetail(' + resultData[i].resultno + ');return false;"></td>';
					html+='</tr>';
				}

				$('#corporationListAll').html(html);
				if(flag != "list"){
					exportTableToExcel('dataTableExcel', '전체공사현황');
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

			$.selPeriod(period,'fromDt','toDt');
		},

		resetClickEvt:function(){
			// 초기화 버튼 클릭 시
			$('select[name="sgg"]').empty();
			$('select[name="emd"]').empty();
			$('select[name="sido"]').val(0);
			$('select[name="sgg"]').html('<option value="0" selected="selected">시/군/구 선택</option>');
			$('select[name="emd"]').html('<option value="0" selected="selected">읍/면/동 선택</option>');
			$.selPeriod('3month','fromDt','toDt');
			$('.optionSel input').removeClass("active");
			$('input[name="3month"]').addClass("active");
			$('ul[name="selConstList"] li').remove();
			$('ul[name="selFacList"] li').remove();
			$('span[name="noneSelConst"]').css('display', '');
			$('span[name="noneSelFac"]').css('display', '');
		},

		serchClickEvt:function(tabGbn){

			//날짜유효성체크
			if (parseInt($('#fromDt').val().replace(/[.]/g,"")) > parseInt($('#toDt').val().replace(/[.]/g,""))) {
	            $.swal("종료일자는 시작일자 이전으로 선택할수 없습니다.");
	            return false;
	        }

			$('.shBox').trigger('click');

			$('li[name="removeMe"]').remove();
			$('.exclMark').attr('src', '/assets/images/icon/excl_mark.png');
			$(".listTabMenu").each(function(index, item){
				if($(this).hasClass("active")){
					tabGbn = $(this).attr("data-index");
				}
			});

			Corporation.constIngCnt();	// 진행공사 수
			Corporation.getCorporationList();

			if(tabGbn == "1"){
				$(".countBox").removeClass("active");
				Corporation.roadConstCnt(); // 국도공사 수
				Corporation.roadMakeCnt();	// 도로개설 수
				Corporation.constFacCnt();	// 시설공사 수
			}else{
				$(".topDateBtn img").each(function(index, item){
					var name   = $(this).attr("data-fileName");
					if(name == "btn_week"){
						$(this).trigger('click');
						return;
					}
				});

				$(".btmDateBtn img").each(function(index, item){
					var name   = $(this).attr("data-fileName");
					if(name == "btn_week"){
						$(this).trigger('click');
						return;
					}
				});
				Corporation.viewChart(); //통계보기
			}

		},

		constDetail:function(resultno){

			var firstFeature;
			$('#accTitleBox1').trigger('click');
			//공사 상세보기
			if($(window).width() > 1023){
	    		$(".mypageCorBox").css({
	                "top": (($(window).height()-$(".mypageCorBox").outerHeight())/2+$(window).scrollTop())+"px",
	                "left": (($(window).width()-$(".mypageCorBox").outerWidth())/2+$(window).scrollLeft())+"px"
             	});
	    	}else{
	    		$(".mypageCorBox").css({ "top":$(window).scrollTop() + "px", "left":0 });
	    	}

			var obj = new Object();
			obj.url = "/rcic/analysis/getAnalysisDetail/"+resultno;

			var dataList = setDefault(obj);
			$.commonAjax(dataList,'', function(response, status, headers, config){
				// 공고분석내용
				var data = response.analysisInfo;
			    var dataStr = $("#detailForm").serializeArray();
				var corDtlBoxTopLeftHtml = "";
				if(!$.isNullString(data.bid_type)){
                   corDtlBoxTopLeftHtml = '<span class="gMark">'+data.sido_thin_nm+'</span><span class="mark">'+String(data.bid_type).substr(0,2)+'</span>'
                }else{
                   corDtlBoxTopLeftHtml = '<span class="gMark">'+data.sido_thin_nm+'</span>'
                }

				$("#corDtlBoxTopLeft").html(corDtlBoxTopLeftHtml);
				$('span[name="bidntcenm"]').text(data.bidntcenm);
			    $.each(data, function(key, value){
		            for (var i=0; i<dataStr.length; i++) {
		                if(dataStr[i].name ==  key){
							if(!$.isNullString(value)){
								 $('input[name="' + dataStr[i].name +'"]').attr('title', value);
								if(dataStr[i].name == "stdr_dt" || dataStr[i].name == "forecast_end_dt" ||  dataStr[i].name == "analysis_dt" || dataStr[i].name == "forecast_st_dt"){
									 $('input[name="' + dataStr[i].name +'"]').val($.setDateStrUnderBar(value))
								}else if(dataStr[i].name == "presmptprce" || dataStr[i].name == "bdgtamt"){
									 $('input[name="' + dataStr[i].name +'"]').val($.number(value))
								}else{
									 $('input[name="' + dataStr[i].name +'"]').val(value);
									 $('input[name="' + dataStr[i].name +'"]').attr('title', value);
								}
							}
		                }
		            }
	      	  });

					$('#conInfoTbody').empty();;
 					if(!$.isNullString(data.min_cntr_ctcncls_date)){

						var html="";
						html += '<tr>';
						html += '<td>'+$.setDateStrUnderBar(data.min_cntr_ctcncls_date)+'</td>';
						html += '<td>'+data.coplist+'</td>';
						html += '<td>'+$.number(data.tot_cntr_ct_amt)+'</td>';
						html += '<td>'+$.setDateStrUnderBar(data.cbgn_date)+'</td>';
						html += '<td>'+data.thtm_ccmplt_date+'</td>';
						html += '</tr>';
						$('#conInfoTbody').append(html);
					}





			// 위치분석 참조정보
			 $('#refInfoTbody').empty();

				var list = response.scoreList;
				//var html = "";

				//_.sortBy(list, "score")

				var wktFormat= new ol.format.WKT();
				if(list.length == 0){
					html += '<tr><td colspan="4">정보가 존재하지 않습니다.</td></tr>';
					var locList = response.locList[0];
						var feature = wktFormat.readFeature(locList.geom_wkt, {
					    			  dataProjection: 'EPSG:3857',
					    			  featureProjection: 'EPSG:3857',
					    			});
						feature.set("loc_prdt_reli_cd",data.loc_prdt_reli_cd);
						firstFeature = feature;
				}

				list = _.sortBy(list,"analysisword");

				for(var i in list){

					var idx = list[i];
					var num = parseInt(i)+parseInt(1);

					if(i==0){
						var html = "";
						var feature = (new ol.format.GeoJSON({})).readFeature(idx.geo_geom);
						firstFeature = feature;
						html += '<tr>';
						html += '<td id="num'+i+'">'+num+'</td>';
						html += '<td id="analysisword'+i+'">' + list[i].analysisword + '</td>';
						switch (list[i].collection) {
				            case "tb_cbnd_info": html += '<td>연속지적도</td>'; break;
				            case "tl_develop_info": html += '<td>개발지구정보</td>'; break;
				            case "tl_center_line": html += '<td>국도중심선</td>'; break;
				            case "tl_poi_point": html += '<td>관심지점정보</td>'; break;
				            case "tb_srch_addr": html += '<td>새주소</td>'; break;
				            case "tl_road_name": html += '<td>도로명주소</td>';  break;
				            case "tl_road_plan_info": html += '<td>도시계획</td>'; break;
				            case "legaldong_sido": html += '<td>행정구역-시도</td>'; break;
				            case "legaldong_sgg": html += '<td>행정구역-시군구</td>'; break;
				            case "legaldong_emd": html += '<td>행정구역-읍명동</td>'; break;
				            case "legaldong_li": html += '<td>행정구역_리</td>'; break;
				            default: html += '<td></td>'; break;
				        }

						html += '	<td><textarea id="geoInfo" style="display:none">' + list[i].geo_geom + '</textarea>';
						html += '   <img src="/assets/images/map/popLocation.png" alt="location" id="ttt" onclick="Corporation.localView(this);return false;"></td>';
						html += '</tr>';

						$('#refInfoTbody').append(html);
					}else{
						var html = "";
						var preNum = parseInt(i)-parseInt(1);
						var curNum = parseInt(i)+parseInt(1);
						if(list[i-1].analysisword == list[i].analysisword){
							$("#num"+preNum).addClass("numrowspan");
							$("#analysisword"+preNum).addClass("rowspan");

							html += '<tr>';
							html += '<td id="num'+i+'" class="numrowspan">'+i+'</td>';
							html += '<td id="analysisword'+i+'" class="rowspan">' + list[i].analysisword + '</td>';
							switch (list[i].collection) {
					            case "tb_cbnd_info": html += '<td>연속지적도</td>'; break;
					            case "tl_develop_info": html += '<td>개발지구정보</td>'; break;
					            case "tl_center_line": html += '<td>국도중심선</td>'; break;
					            case "tl_poi_point": html += '<td>관심지점정보</td>'; break;
					            case "tb_srch_addr": html += '<td>새주소</td>'; break;
					            case "tl_road_name": html += '<td>도로명주소</td>';  break;
					            case "tl_road_plan_info": html += '<td>도시계획</td>'; break;
					            case "legaldong_sido": html += '<td>행정구역-시도</td>'; break;
					            case "legaldong_sgg": html += '<td>행정구역-시군구</td>'; break;
					            case "legaldong_emd": html += '<td>행정구역-읍명동</td>'; break;
					            case "legaldong_li": html += '<td>행정구역_리</td>'; break;
					            default: html += '<td></td>'; break;
					        }

							html += '	<td><textarea id="geoInfo" style="display:none">' + list[i].geo_geom + '</textarea>';
							html += '   <img src="/assets/images/map/popLocation.png" alt="location" id="ttt" onclick="Corporation.localView(this);return false;"></td>';
							html += '</tr>';

						}else{
							html += '<tr>';
							html += '<td id="num'+i+'">'+num+'</td>';
							html += '<td id="analysisword'+i+'">' + list[i].analysisword + '</td>';
							switch (list[i].collection) {
					            case "tb_cbnd_info": html += '<td>연속지적도</td>'; break;
					            case "tl_develop_info": html += '<td>개발지구정보</td>'; break;
					            case "tl_center_line": html += '<td>국도중심선</td>'; break;
					            case "tl_poi_point": html += '<td>관심지점정보</td>'; break;
					            case "tb_srch_addr": html += '<td>새주소</td>'; break;
					            case "tl_road_name": html += '<td>도로명주소</td>';  break;
					            case "tl_road_plan_info": html += '<td>도시계획</td>'; break;
					            case "legaldong_sido": html += '<td>행정구역-시도</td>'; break;
					            case "legaldong_sgg": html += '<td>행정구역-시군구</td>'; break;
					            case "legaldong_emd": html += '<td>행정구역-읍명동</td>'; break;
					            case "legaldong_li": html += '<td>행정구역_리</td>'; break;
					            default: html += '<td></td>'; break;
					        }

							html += '	<td><textarea id="geoInfo" style="display:none">' + list[i].geo_geom + '</textarea>';
							html += '   <img src="/assets/images/map/popLocation.png" alt="location" id="ttt" onclick="Corporation.localView(this);return false;"></td>';
							html += '</tr>';
						}
						$('#refInfoTbody').append(html);
					}

					$.genRowspan("numrowspan");
					$.genRowspan("rowspan");

				}

				/*for(var i in list){

					var idx = list[i];
					var num = parseInt(i)+parseInt(1);
					if(i==0){
						var feature = (new ol.format.GeoJSON({})).readFeature(idx.geo_geom);
						firstFeature = feature;
					}

					html += '<tr>';
					html += '<td>'+num+'</td>';
					switch (list[i].collection) {
			            case "tb_cbnd_info": html += '<td>연속지적도</td>'; break;
			            case "tl_develop_info": html += '<td>개발지구정보</td>'; break;
			            case "tl_center_line": html += '<td>국도중심선</td>'; break;
			            case "tl_poi_point": html += '<td>관심지점정보</td>'; break;
			            case "tb_srch_addr": html += '<td>새주소</td>'; break;
			            case "tl_road_name": html += '<td>도로명주소</td>';  break;
			            case "tl_road_plan_info": html += '<td>도시계획</td>'; break;
			            case "legaldong_sido": html += '<td>행정구역-시도</td>'; break;
			            case "legaldong_sgg": html += '<td>행정구역-시군구</td>'; break;
			            case "legaldong_emd": html += '<td>행정구역-읍명동</td>'; break;
			            case "legaldong_li": html += '<td>행정구역_리</td>'; break;
			            default: html += '<td></td>'; break;
			        }

					html += '	<td>' + list[i].analysisword + '</td>';
					html += '	<td><textarea id="geoInfo" style="display:none">' + list[i].geo_geom + '</textarea>';
					html += '   <img src="/assets/images/map/popLocation.png" alt="location" id="ttt" onclick="Corporation.localView(this);return false;"></td>';
					html += '</tr>';
				}  */

				 _detailMap = new MapInit('corDtlMap',{
		            baseMap:'VWorld',
		            baseMapVislble : true,
		            mapUrl : '${mapUrl}',
		            interactions:{
		                shiftDragZoom : true,
		                dragPan: true,
		                mouseWheelZoom : true
		            },
		            mapControl : {
		                elem : "ul.mapCtr_wrap>li span",
		                flag : "class",
		                arrHandle : ["btn_distanceMeasure", "btn_areaMeasure", "btn_circle", "btn_reset" , "btn_merge"]
		            },
		            minZoom:2,
		            maxZoom:12,
		            zoom:7,
		            center:[14197378.96, 4274375.9],
		        });


			if($.isNullString(firstFeature)){
				_detailMap.mapAction.setVisibilityById("VWorld_gray");
				_detailMap.map.getView().setZoom(1);
				_detailMap.map.getView().setCenter([14197378.96, 4274375.9]);

			}else{
				var extent = firstFeature.getGeometry().getExtent();
				var obj = new Object();
					obj.type="tt";

				_detailMap.map.getView().fit(extent);
	        	//흑백이 최대 12레벨만 지원함.
        		if(_detailMap.map.getView().getZoom()>=12){
        			_detailMap.map.getView().setZoom(12);
        		}

				_detailMap.mapLayerMng.addTempLayer("git",[firstFeature],obj);
			}

			 // $('#refInfoTbody').html(html);

				//공사 시설종류
				var roadList = response.roadList;
				var facList = response.facList;

				$('#constTbody').empty();
				var roadHtml = "";

				if(roadList.length == 0){
					roadHtml += '<tr>';
					roadHtml += '	<td colspan="2">공사가 존재하지 않습니다.</td>';
					roadHtml += '</tr>';
				}

				for(var i in roadList){
					roadHtml += '<tr>';
					roadHtml += '	<td><img src="data:image/jpeg;base64, ' + roadList[i].base64_attr2 + '" alt="icon"></td>';
					roadHtml += '	<td>' + roadList[i].road_ty_nm + '</td>';
					roadHtml += '</tr>';
				}

				$('#constTbody').html(roadHtml);
				$('#facTbody').empty();

				var facHtml = "";

				if(facList.length == 0){
					facHtml += '<tr>';
					facHtml += '	<td colspan="2">시설물이 존재하지 않습니다.</td>';
					facHtml += '</tr>';
				}

				for(var i in facList){
					facHtml += '<tr>';
					facHtml += '	<td><img src="data:image/jpeg;base64, ' + facList[i].base64_attr2 + '" alt="icon"></td>';
					facHtml += '	<td>' + facList[i].fac_ty_nm + '</td>';
					facHtml += '</tr>';
				}

				$('#accTitle').text('공사/시설종류 (' + roadList.length + '건/'  + facList.length + '건)');
				$('#facTbody').html(facHtml);

			},false,function(){},false);

			$(".mypageCorBox").show();
			$('#corDtlMap').empty();

	},


	localView:function(elem){
		var geoInfo = $(elem).parent().find('textarea').val();
		var feature = (new ol.format.GeoJSON({})).readFeature(geoInfo);

		if($.isNullString(feature)){
			_detailMap.map.getView().setZoom(1);
			_detailMap.map.getView().setCenter([14197378.96, 4274375.9]);

		}else{
			var extent = feature.getGeometry().getExtent();
			var obj = new Object();
				obj.type="tt";

			_detailMap.map.getView().fit(extent);
        	//흑백이 최대 12레벨만 지원함.
    		if(_detailMap.map.getView().getZoom()>=12){
    			_detailMap.map.getView().setZoom(12);
    		}

			_detailMap.mapLayerMng.addTempLayer("git",[feature],obj);
		}
	},

	roadConstCnt:function(){
		// 국도공사 수
		this.getContition();
		if($.isNullString(currPage)){
			currPage = "1";
		}
		var collection ="tb_analysis_info";
		var data = new Object();
			data.searchKeyword = G.contition["searchKeyword"];
			data.roadTypeCd = G.contition["roadType"]["fieldValue"];
			data.facTypeCd = G.contition["facType"]["fieldValue"];
			data.constRoadClss = "161";
			data.order = G.contition["order"]["order"];
			data.authNo = G.contition["authNo"]["authNo"];
			data.prdtReliCd = "";
		    data.prdtReliChk = "Y";

		_commonSearch.getSearchList("0", "", data, collection, function(response){
			var html = "";
				html += '<p id="roadConst">' + $.number(response.totalCnt) + '<span>건</span></p>';
				var $row = $(html);
				$('#roadConst').html($row);
				$row.off("click");
				$row.on({
					"click" : function(evt) {
						isSelected="roadConst";
						Corporation.getCorporationList(0,'roadConst');
						Corporation.getCorporationListExcelAll(0,'roadConst', 'list');
					}
			   });
		});
	},

	roadMakeCnt:function(){
		// 도로개설 수
		var collection ="tb_analysis_info";
		var roadType="19 24 36 37 39 47 48";

		var data = new Object();
			data.searchKeyword = G.contition["searchKeyword"];
			data.roadTypeCd = roadType.replace(/\s+$/,"");
			//data.roadTypeCd = G.contition["roadType"]["fieldValue"];
			data.facTypeCd = G.contition["facType"]["fieldValue"];
			data.constRoadClss = G.contition["constRoadClss"]["fieldValue"];
			data.authNo = G.contition["authNo"]["authNo"];
			data.prdtReliCd = "";
		    data.prdtReliChk = "Y";

		_commonSearch.getSearchList("0", "", data, collection, function(response){
			var html = "";
				html += '<p id="roadMake" style="cursor: pointer;">' + $.number(response.totalCnt) + '<span>건</span></p>';
				var $row = $(html);

				$('#roadMake').html($row);
				$row.off("click");
				$row.on({
					"click" : function(evt) {
						isSelected="roadMake";
						Corporation.getCorporationList(0, "roadMake");
						Corporation.getCorporationListExcelAll(0,'roadMake', 'list');
					}
			   });
		});
	},

	//진행공사수
	constIngCnt:function(){

		this.getContition();
		var collection ="tb_analysis_info";
		var data = new Object();
			data.searchKeyword = G.contition["searchKeyword"];
			data.roadTypeCd = G.contition["roadType"]["fieldValue"];
			data.facTypeCd = G.contition["facType"]["fieldValue"];
			data.constRoadClss = G.contition["constRoadClss"]["fieldValue"];
			data.order = G.contition["order"]["order"];
			data.authNo = G.contition["authNo"]["authNo"];
			data.prdtReliCd = "";
		    data.prdtReliChk = "Y";
		_commonSearch.getSearchList("0", "", data, collection, function(response){
			$('#constIngCntTxt').html('<span id="constIngCntTxt">총 ' +  $.number(response.totalCnt) + '건</span>');
			constIngCntTxt = response.totalCnt;
		});
	},
	//시설공사수
	constFacCnt:function(){

		var collection ="tb_analysis_info";
		var data = new Object();
			startDt = $("#fromDt").val().replace(/[.]/g,"");
			endDt = $("#toDt").val().replace(/[.]/g,"");

		//var searchKeyword = G.contition["base"]["radioVal"] + ':['+$("#fromDt").val().replace(/[.]/g,"")+' TO '+$("#toDt").val().replace(/[.]/g,"")+']';
		for(var i in G.contition["legandong"]){
			var idx = G.contition["legandong"][i];
			if(idx.fieldValue != "0"){
				searchKeyword += " AND "+ idx.fieldName +":"+ idx.fieldValue;
			}
		}
		//G.contition.searchKeyword = searchKeyword;
		data.searchKeyword = G.contition["searchKeyword"];
		data.roadTypeCd = G.contition["roadType"]["fieldValue"];
		data.facTypeCd = G.contition["facType"]["fieldValue"]==""?"*:*":G.contition["facType"]["fieldValue"];
		data.constRoadClss = G.contition["constRoadClss"]["fieldValue"];
		data.authNo = G.contition["authNo"]["authNo"];
		data.prdtReliCd = "";
	    data.prdtReliChk = "Y";

		_commonSearch.getSearchList("0", "", data, collection, function(response){

			var html = "";
			html += '<p id="constFac" style="cursor: pointer;">' + $.number(response.totalCnt) + '<span>건</span></p>';
			var $row = $(html);
			$('#constFac').html($row);
			$row.off("click");
			$row.on({
				"click" : function(evt) {
					//$('ul[name="selFacList"]').empty();
					$('ul[name="selConstList"]').empty();

					if($('ul[name="selFacList"]').length == 0){
						G.contition["facType"]["fieldValue"]=="*:*";
						$('span[name="noneSelFac"]').show();
					}

					$('span[name="noneSelConst"]').show();
					isSelected="fac";
					Corporation.getCorporationList(0, "fac");
					Corporation.getCorporationListExcelAll(0,'fac', 'list');
				}
		    });
		});
	},

	viewChart:function(){
		_rcicChartMap =  new RcicChart({

				chart1Config:{
					divId : "corporationDiv1",
					theme : am4themes_animated,
					chartType: am4charts.XYChart
				 } ,
				 chart2Config:{
					divId : "corporationDiv2",
					theme : am4themes_animated,
					chartType: am4charts.TreeMap
				 } ,
				 chart3Config:{
					divId : "corporationDiv3",
					theme : am4themes_animated,
					chartType: am4charts.TreeMap
				 } ,
				 chart4Config:{
					divId : "corporationDiv4",
					theme : am4themes_animated,
					chartType: am4charts.TreeMap
				 } ,
				 chart5Config:{
					divId : "corporationDiv5",
					theme : am4themes_animated,
					chartType: am4charts.PieChart3D
				 } ,
				 chart6Config:{
						divId : "corporationDiv6",
						theme : am4themes_animated,
						chartType: am4charts.PieChart3D
				 } ,
				 chart7Config:{
						divId : "corporationDiv7",
						theme : am4themes_animated,
						chartType: am4charts.XYChart
				 }
			});
	},

}