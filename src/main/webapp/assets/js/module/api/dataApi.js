var DataApi = {
	
	btnClickEvent:function(elem){
		var name = $(elem).attr('name');
		var classNm = $(elem).attr('class');
		
		if(classNm == "compCloseBox" || classNm == "gBasicBtn"){
			$(".popupWrap").fadeOut("fast");
			$("body").css("overflow", "auto");
		}else if(classNm == "authButton"){
			$('#apiInsttNm').val("");
			$('#connetUrl').val("");
		   $(".certification").fadeIn("fast");
		}else if(classNm == "closeBox authClose" || classNm == "cancleBtn"){
			 $(".popupWrap").fadeOut("fast");
		}
		
	},
		
	listTabMenu:function(elem){
 			
		$('.emptyListBox').css('display', 'none');
		var index   = $(elem).data("index");
		var siteNav = "";

		if(index == 1){ 
			siteNav = "파일데이터"; 
			$('#stdrDe').val("전체");
			$('#dataTypeList option:eq(0)').prop("selected", 'true');
			DataApi.getFileDataList();
		}else if(index == 2){ 
			siteNav = "Open API";  
			DataApi.getApiList(); 
		}else{ 
			siteNav = "신청현황"; 
			DataApi.apiReqList();    
		}
		
		if(index == 3 && $('#userSeq').val() == null){
			$.swal("신청현황은 로그인 후 이용할 수 있습니다.");
			return;
		}

		$(".listTab span").each(function(index, item){  
			var name   = $(item).children("img").attr("data-fileName");
			var reName = "/assets/images/icon/"+name+"_off.png";
			$(item).children("img").attr("src", reName); 
		});

		var name = $(elem).children("img").attr("data-fileName");
		$(elem).children("img").attr("src", "/assets/images/icon/"+name+"_on.png");

		// tab class add
		$(".listTabMenu").removeClass("active");
		$(elem).addClass("active");

		$(".tabContetns").hide();
		$("#tabContents"+index).show();

		$(".siteName").text(siteNav);
		
	},
	
	
	//==============파일데이터===================
	getFileDataList:function(curr_page){
		// 파일데이터 
		if($.isNullString(curr_page)){
			curr_page = 1;
		}
			
		var list_cnt = $('#dataPerPage').val();
		var stdrDe = $('#stdrDe').val().replace(/[.]/g,"");;
		var obj = new Object();
			obj.url = "/rcic/dataProvdInfo/getDataProvdInfoList";
			obj.listCnt = parseInt(list_cnt),
			obj.currPage = curr_page;
			if(!$.isNullString($('#dataTypeList').val()))obj.dataKnd = $('#dataTypeList option:selected').val();
			if( stdrDe != "전체")obj.stdrDe = stdrDe;
		var dataList = setDefault(obj);
		
		$.commonAjax(dataList,'', function(response, status, headers, config){ 
			var html="";
        	var list = response.list;
        	var max_page = response.maxPageCnt;
        	
        	$("#fileDataList").empty();

			if(list.length <= 0){
				$('.emptyListBox').css('display', '')
			}else{
				$('.emptyListBox').css('display', 'none')
			}
			
			
        	for (var i = 0; i < list.length; i++) {

        		// FIXME 파일 임시처리
				var fileName = '';
				if (list[i].dataKnd == '1') fileName = 'expway.xls';
				if (list[i].dataKnd == '2') fileName = 'highway.xls';
				if (list[i].dataKnd == '3') fileName = 'localroad.xls';

				html += '<li>'; 
				html += '	<div class="extBox csv"><span>' + list[i].fileTy + '</span></div>';  
				html += '	<div class="bDataBox">';
				html += '		<p class="bDataTitle">' + list[i].dataNm + '</p>';
				html += '		<p class="bDataCont">' + list[i].dataDc + '</p>';
				html += '		<p class="bDataDate"><span>등록일</span><span>' + list[i].registDt + '</span><span>다운로드수</span><span>' + list[i].cnt + '</span></p>';    
				html += '	</div>';
				html += '	<div class="pBtnBox">'; 
				html += '		<input type="button" class="previewBtn dataLayout" value="데이터 레이아웃" onclick="DataApi.dataLayout(' + list[i].dataKnd + ')">';
				html += '		<a href="/rcic/dataProvdInfo/getDataProvdInfoDownload/'+list[i].dataProvdNo+'" ><input type="button" class="donwloadBtn" value="다운로드"></a>';
				html += '		<input type="hidden" name = "dataProvdNo" value="' + list[i].dataProvdNo + '">';
				html += '		<input type="hidden" name = "dataProvdSrc" value="/assets/data/road/'+list[i].stdrDe+'/' + fileName + '">';
				html += '	</div>';
				html += '</li>';
			
			}  
        	
        	$("#fileDataList").html(html); 
        	$('#fileDataTotalCnt').text("(" + response.totalCnt + ")")
        	// 페이징 호출 
        	$.paging('dataFilePagination',curr_page,max_page,list.length,function(event,page){ 
        		DataApi.getFileDataList(page);
        	}); 
        	
		},false,function(e){
			console.log(e);
		}); 
	},  
	
	increDownloadCnt:function(elem){
		var dataProvdNo = $(elem).parent().find('input[name="dataProvdNo"]').val();
		var dataProvdSrc = $(elem).parent().find('input[name="dataProvdSrc"]').val();
		
		var obj = new Object();
			obj.url = "/rcic/dataProvdInfo/insertDownloadHistory";
			obj.dataProvdNo = dataProvdNo;
		
		var dataList = setDefault(obj);
		$.commonAjax(dataList,'', function(response, status, headers, config){
			 var iframe = document.getElementById('apiDownloadIframe');
		     	 iframe.src = dataProvdSrc;
		});
		
	},
	dataLayout:function(dataKnd){
		// 미리보기
		if(dataKnd == 1){	//고속도로 공사현황
			$('#dataLayoutTitle').text("고속도로 공사현황");
		}else if(dataKnd == 2){	//국도 공사현황
			$('#dataLayoutTitle').text("국도 공사현황");
		}else if(dataKnd == 3){	// 지방도/기타
			$('#dataLayoutTitle').text("지방도/기타 공사현황");
		}
		
		$("body").css("overflow", "hidden");
		$(".apiDataLayout").fadeIn("fast");

	} ,
	
	selectDataKind:function(){
		// 데이터 종류 리스트
		var obj = new Object();
			obj.url = "/rcic/code/selectDetailCode";
			obj.groupCode = "DATA_KND";
		var dataList = setDefault(obj);
		
		$.commonAjax(dataList,'', function(response, status, headers, config){ 
			var list = response.list;
			var html = "";
			for(var i in list){
				html += '<option value="' + list[i].code + '">' + list[i].codeNm + '</option>';
			}
			$('#dataTypeList').append(html);
		});
	},
	
	fileDownload:function(provdNo){
		
		$.ajax({
			url :'/rcic/dataProvdInfo/getDataProvdInfoList/' + provdNo,  
			type : 'get', 
			data: "",
			dataType: "json",  
			async: false, 
			beforeSend: function() {
				$.showBlock();	
		    },
		    complete: function() {
	    		$.hideBlock();			    		
		    },
		});
	},
	
	//==============open Api===================
	
	getApiList:function(curr_page){
		// open Api 
		if($.isNullString(curr_page)){
			curr_page = 1;
		}
			
		var list_cnt = 10;
		
		var obj = new Object();
			obj.url = "/rcic/apiProvdInfo/getApiProvdInfoList";
			obj.listCnt = parseInt(list_cnt),
			obj.currPage = curr_page;
			obj.apiInfoNm = $('#apiKeyword').val();
		var dataList = setDefault(obj);
		
		$.commonAjax(dataList,'', function(response, status, headers, config){ 
			var html="";
        	var list = response.list;
        	var max_page = response.maxPageCnt;
        	
        	$("#openApiList").empty();

			if(list.length <= 0){
				$('#noneApi').css('display', '')
			}else{
				$('#noneApi').css('display', 'none')
			}
       	
        	for (var i = 0; i < list.length; i++) {
				html += '<li>';
				html += '	<div class="extBox json"><span>JSON</span></div>'; 
				html += '	<div class="bDataBox">';
				html += '		<p class="bDataTitle">' + list[i].apiInfoNm + '</p>'; 
				html += '		<p class="bDataCont">' + list[i].apiDc + '</p>';
				html += '		<p class="bDataDate"><span>등록일</span><span>' + list[i].registDt + '</span><span>신청현황</span><span>' + list[i].cnt + '</span></p>';
				html += '		<p class="bDataDate">&middot; 요청주소 :' + list[i].apiProvdUrl + '</p>';
				html += '		<p class="bDataDate">&middot; 일 최대 요청 트래픽 건수 : '+  $.number(list[i].dmaxReqCnt)+ '건</p>';
				html += '	</div>';
				html += '	<div class="pBtnBox">';
				html += '		<input type="button" class="previewBtn apiInfo" value="API 정보 보기" onclick="DataApi.apiDetailInfo(\''+  list[i].apiInfoNm +  '\',\''+  list[i].apiProvdUrl + '\')">';
				html += '		<a href="/assets/data/api/RCIC_OpenAPI활용가이드.pdf"  download="RCIC_OpenAPI활용가이드.pdf"><input type="button" class="donwloadBtn" value="가이드 다운로드"></a>';
				html += '		<input type="hidden" id="apiProvdNo" value="' + list[i].apiProvdNo + '">';
				html += '		<input type="hidden" name="apiInfoNm" value="' + list[i].apiInfoNm + '">';
				html += '	</div>';
				html += '</li>';	
				
			}
        	
        	$("#openApiList").html(html); 
        	$('#openApTotalCnt').text("(" + response.totalCnt + ")")   
        	
		},false,function(e){
			console.log(e); 
		}); 
	
	},
	
	apiDetailInfo:function(elem, url){  
		$('#apiDetailTitle').text( elem + "API 정보");
		$('span[name="apiUrl"]').text(url);
		
		if(elem == "공사종류 및 시설종류 코드목록"){  
			$('#popApiInfoCor').fadeIn("fast");
		}else{
			$("#popApiInfo").fadeIn("fast");
		}
		
		$("body").css("overflow", "hidden");
		$('#popTabBox1').trigger('click');
		
	},
	
	
	insertApiUser:function(){
		// api 신청
		
		if($.isNullString($('#apiInsttNm').val())){
			$.swal("기관명을 입력하세요.");
			$("#apiInsttNm").focus();
			return;
		}
		
		if($.isNullString($('#connetUrl').val())){
			$.swal("접속 URL을 입력하세요.");
			$("#connetUrl").focus();
			return;
		}
		
		var urlRegExp = /^(http\:\/\/)?((\w+)[.])+(asia|biz|cc|cn|com|de|eu|in|info|jobs|jp|kr|mobi|mx|name|net|nz|org|travel|tv|tw|uk|us)(\/(\w*))*$/i;
		var ipRegExp = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
		
		var isValid = true;
		if(!urlRegExp.test($('#connetUrl').val())) {
			$.swal("URL 형식과 일치하지 않습니다."); 
			$("#connetUrl").focus();
			isValid = false; 
			return;
		}
		
		if(!isValid){
			if(!ipRegExp.test($('#connetUrl').val())) {
				$.swal("URL 형식과 일치하지 않습니다."); 
				$("#connetUrl").focus(); 
				return;
			}
		}
		var obj = new Object();
			obj.url = "/rcic/apiUser/insertApiUser";
			obj.userSeq = $('#userSeq').val();
			obj.insttNm = $('#apiInsttNm').val();
			obj.conectUrl = $('#connetUrl').val();
			obj.srbde =  moment().format('YYYYMMDD');
			obj.registId = $('#registId').val();
		var dataList = setDefault(obj);
		
		$.commonAjax(dataList,'', function(response, status, headers, config){ 
			if(response.message == "success"){
				$.swal("API 인증키가 신청되었습니다.\n\n인증키\n" + response.apiCrtfcKey);
				$(".popupWrap").fadeOut("fast");
			}
		},true,function(){
			$.swal("신청된 API키가 존재합니다."); 
			$(".popupWrap").fadeOut("fast");
		}); 
	},
	
	
	apiReqList:function(curr_page){
		//api 신청현황
		
		if($.isNullString(curr_page)){
			curr_page = 1;
		}
			
		var list_cnt = 10;
		
		var obj = new Object();
			obj.url = "/rcic/apiUser/getApiUserList";
			obj.userSeq = $('#userSeq').val();
			obj.listCnt = parseInt(list_cnt),
			obj.currPage = curr_page;
			
		var dataList = setDefault(obj);
		
		$.commonAjax(dataList,'', function(response, status, headers, config){ 
			var list = response.list;
			var max_page = response.maxPageCnt;
			
			var html ="";
			$('#apiReqList').empty();
			if(list.length == 0){
				html += '<tr>';
				html += '	<td colspan="5">데이터가 존재하지 않습니다.</td>';
				html += '</tr>';
			}
			
			for(var i in list){
				html += '<tr>';
				html += '	<td>' + list[i].rnum + '</td>';
				html += '	<td>' + list[i].sttus + '</td>';
				html += '	<td>' + list[i].registDt + '</td>';
				html += '	<td>' + list[i].apiCrtfcKey + '</td>';
				html += '</tr>';   
			}
			
			$('#apiReqList').html(html);
			// 페이징 호출 
        	$.paging('apiReqPagination',curr_page,max_page,list.length,function(event,page){ 
        		DataApi.apiReqList(page);
        	}); 
		}); 
	}
	
	
	
	 

}