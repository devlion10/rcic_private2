var roadWorkListCnt = 1;
var qaPageCnt=1;
var corporationChartTotCnt = 0;
var collectionnChartTotCnt = 0;
var _rcicChartMap;
var _rcicCollectChart;
var totalKeywordColl;
var MyPage={
	
	listTabMenu:function(elem){
 			
		var index   = $(elem).data("index");
		
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
		
		if($(".listTabMenu").hasClass("active")){
			
			if(!$.isNullString(mapInit)){
				mapInit.map.updateSize();	
			}
			
			if($(this).attr("data-index") == "1"){
			}else if($(elem).attr("data-index") == "2"){
				MyPage.getMyRoadWork(1);
				$('#favorList').empty();
			}else if($(elem).attr("data-index") == "3"){
				Corporation.getConstKind("const_road_clss")
				MyPage.getChartTypeList(1);  
				MyPage.getMyChart();    
				//MyPage.serchClickEvt();
			}else if($(elem).attr("data-index") == "4"){
				MyPage.getQuestionList();
//				Board.getQuestionType();
				$('.mQuestion').empty();
			}
			
		} 
		
	},
	
	getSido:function(){
		//시도 가져오기 
		var collection ="legaldong_sido";
		var searchKeyword = '*:*';
		
		var data = new Object();
			data.searchKeyword = searchKeyword;
			data.order="sido_cd asc";
		
		_commonSearch.getSearchList("0", "17", data, collection, function(response){
			var html = "";
			var list = response.result; 
			for(var i in list){ 
				html += '<option value = "' + list[i].sido_cd + '">' + list[i].sido_nm + '</option>';
			}
			$('select[name="myPageSido"]').append(html);
		},false);
	},
	
	getSgg:function(){
		//시군구 가져오기 
		var sido =  $('select[name="myPageSido"] option:selected').val();
		var collection ="legaldong_sgg";
		var searchKeyword = 'sido_cd:(' + sido + ')';
		
		var data = new Object();
			data.searchKeyword = searchKeyword;
			data.order="sgg_cd asc";
		
		$('select[name="myPageSgg"]').empty();
		$('select[name="myPageEmd"]').empty();
		$('select[name="myPageEmd"]').html('<option value="0" selected="selected">읍/면/동 선택</option>');
		
		_commonSearch.getSearchList("0", "100", data, collection, function(response){
			var html = "";
			var list = response.result; 
			
			html += '<option value="0" selected="selected">시/군/구 선택</option>';
			for(var i in list){
				html += '<option value = "' + list[i].sgg_cd + '">' + list[i].sgg_nm + '</option>';
			}
			
			$('select[name="myPageSgg"]').append(html);
		},false);
	},
	
	getEmd:function(){
		//읍면동  가져오기 
		var sido =  $('select[name="myPageSido"] option:selected').val();
		var sgg =  $('select[name="myPageSgg"] option:selected').val();
		var collection ="legaldong_emd";
		var searchKeyword = 'sido_cd:(' + sido + ') AND sgg_cd:(' + sgg + ')';
		
		var data = new Object();
			data.searchKeyword = searchKeyword;
			data.order="emd_cd asc";
		
		$('select[name="myPageEmd"]').empty();
		_commonSearch.getSearchList("0", "100", data, collection, function(response){
			var html = "";
			var list = response.result; 
			
			html += '<option value="0" selected="selected">읍/면/동 선택</option>';
			for(var i in list){
				html += '<option value = "' + list[i].emd_cd + '">' + list[i].emd_nm + '</option>';
			}
			
			$('select[name="myPageEmd"]').append(html);
		});
	},
	
	btnClickEvent:function(elem){
		var _self = this;
		var name = $(elem).attr('name');
		var classNm = $(elem).attr('class');
		
		if(name == "withdBtn"){
			$(".withdrawalWrap").show();
		}else if(classNm == "chgPwdBtn"){
			$(".signCompWrap").fadeIn("fast");
		}else if(classNm == "compCloseBox"){
			$(".popupWrap").fadeOut("fast"); 
		}else if(classNm == "cancleBtn cWithdBtn" || classNm =="closeBox"){
			$(".popupWrap").hide();
		}else if(classNm == "btn_close"){
			$(".corDtlBox").hide();
			$(".mypageLocBox").hide();
		}else if(classNm == "dtlTopBtn"){
			$(".corDtlReset").show();
		}else if(classNm == "floatR corResetClose"){
			$(".corDtlReset").hide();
		}else if(name == "btn_close"){
			$(".popupWrap").hide(); 
			$(".corCategory").hide(); 
			$(".signCompWrap").hide(); 
		}else if(classNm == "cancleBtn favorBtn"){
			$("input:checkbox[id='mystatsAllCheck']").attr("checked", false);
			$('#chartTpyeList li').removeClass('active');
			$(".categoryWrap").show();
			_self.getMyChart();
		}else if(name == "charTypeRemove"){ 
			$(elem).parents('li').remove();  
		}		
	},	
	
	
	
	// ============ 회원정보 수정 ===================
	updateUserInfo:function(){
		// 회원정보 수정
		if($.isNullString($('#infoUserNm').val())){ 
			$.swal("이름을 입력하세요.");
			$("#infoUserNm").focus();
			return false;
		}
		
		if($.isNullString($('#infoInsttNm').val())){ 
			$.swal("기관명을 입력하세요.");
			$("#infoInsttNm").focus();
			return false;
		}
		
		var regExpPhone = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
		var telNo = $('#infoContactTelno').val();
		if($.isNullString(telNo)){ 
			$.swal("휴대폰 번호를 입력하세요.");
			$("#infoContactTelno").focus();
			return false; 
		}
		
		if(!regExpPhone.test(telNo)) {
			$.swal("휴대폰번호 형식과 일치하지 않습니다.\nEx)000-0000-0000"); 
			$("#infoContactTelno").focus();
			return false;
		}
		
		var regExpIp = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
		
		if($.isNullString($('#info_conect_ip').val())){ 
			$.swal("IP주소를 입력하세요.");
			$("#info_conect_ip").focus();
			return false;
		}
		
		if(!regExpIp.test($('#info_conect_ip').val())) {
			$.swal("IP 형식과 일치하지 않습니다."); 
			$('#info_conect_ip').focus();
			return false;
		}
		
		telNo = telNo.replaceAll("-", "");
		
		var obj = new Object();
			obj.url = "/rcic/user/updateUser";
			obj.user_id = $('#infoUserId').text();  
			obj.user_nm = $('#infoUserNm').val();  
			obj.instt_nm = $('#infoInsttNm').val();  
			obj.instt_se = $('select[name="infoInsttSe"]').val();  
			obj.contact_telno = telNo;  
			obj.conect_ip = $('#info_conect_ip').val();  
		var dataList = setDefault(obj);
	
		$.commonAjax(dataList,'', function(response, status, headers, config){ 
			swal({
                  text: "회원정보가 수정되었습니다.",
                  button: "확인", 
				  closeOnEsc: false,
				  allowOutsideClick: false, 
               }).then(function(value){
                   if(value) {
                       location.href="/rcic/movePage?menuId=mypage&type=User";
                   }
               });
		});
		
	},
	
	pwChange:function(){
		// 비밀번호 변경
		var currPwd = $('#currPwd').val();
		var newPwd = $('#newPwd').val();
		var reNewPwd = $('#reNewPwd').val();
		var regExp =  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,15}$/;
		
		if($.isNullString(currPwd)){
			$.swal("현재 비밀번호를 입력해주세요.");
			$('#currPwd').focus();
			return false;
		}
		
		if($.isNullString(newPwd)){
			$.swal("새로운 비밀번호를 입력해주세요.");
			$('#currPwd').focus();
			return false;
		}
		
		if(!regExp.test(newPwd)){
			$.swal("비밀번호는 영문, 숫자, 특수기호 포함 8~15자리 이내로 입력하세요.");
			$('#newPwd').focus();
			return false;
		}
		
		if(newPwd != reNewPwd){
			$.swal("비빌번호와 비밀번호 확인이 일치하지 않습니다.");
			$('#newPwd').focus();
			return false;
		}
		
		var obj = new Object();
			obj.url = "/rcic/user/changeUserPwd";
			obj.userId = $('#infoUserId').text();
			obj.userInfoPwd =  $('#userInfoPwd').val();  // 회원정보 비밀번호
			obj.currPwd = currPwd;   // 입력한현재비밀번호
			obj.newPwd = newPwd;     // 새로운 비밀번호 
		var dataList = setDefault(obj);
	
		$.commonAjax(dataList,'', function(response, status, headers, config){ 
			if(response == 0){
				$.swal("현재 비밀번호가 일치하지 않습니다.");
				return;
			}else{
				$(".popupWrap").fadeOut("fast"); 
				swal({
                  text: "비밀번호가 변경되었습니다.\n새로운 비밀번호로 로그인하시기 바랍니다.",
                  button: "확인", 
				  closeOnEsc: false,
				  allowOutsideClick: false, 
			    }).then(function(value){
                   if(value) {
                       Login.logout();
                   }
               });

			}
		});
	},
	
	sttusWithd:function(){
		//회원탈퇴
		var obj = new Object();
			obj.url = "/rcic/user/updatetUserSttusWithd";
			obj.user_id = $('#infoUserId').text();  
		var dataList = setDefault(obj);
		
		$.commonAjax(dataList,'', function(response, status, headers, config){ 
			swal({
                  text: "정상적으로 탈퇴되었습니다.",
                  button: "확인", 
				  closeOnEsc: false,
				  allowOutsideClick: false, 
		    }).then(function(value){
                   if(value) {
                       Login.logout();
                   }
               });
		});
	},
	
	
	// ============ 나의 1:1 질문 ===================
	getQuestionList:function(currPage, qestnTy){
		// 질문 목록 
		var obj = new Object();
			obj.url = "/rcic/qaBbs/getQaBbsList";
			obj.userSeq = $('#userSeq').val();
			if(!$.isNullString(qestnTy)) obj.qestnTy = qestnTy;
			obj.listCnt = 5;
			obj.currPage = currPage;
		var dataList = setDefault(obj);
		
		$.commonAjax(dataList,'', function(response, status, headers, config){ 
			var list = response.list;
			var html = ""; 
		
//			$('.mQuestion').empty(); 
			if(list.length == 0){
				$('.emptyQuestionBox').show();
			}else{
				$('.emptyQuestionBox').hide();    
			}
			 
			for (var i = 0; i < list.length; i++) {
				html += '<li>';
				html += '	<div class="questionBox">';
				html += '		<div class="inline quIcon"><img src="/assets/images/icon/question_icon.png" alt="question"></div>';
				html += '		<div class="inline quText">';
				html += '			<div>';
				html += '				<span>등록일</span>';
				html += '				<p>' + list[i].qestnDt + '</p>';
				html += '			</div>';
				html += '			<div>';
				html += '				<span>분류</span>';
				html += '				<p>' + list[i].qestnTyNm + '</p>';
				html += '			</div>';
				html += '			<div>';
				html += '				<span>제목</span>';
				html += '				<p>' + list[i].qestnSj+ '</p>';
				html += '			</div>';
				html += '			<div>';
				html += '				<span>내용</span>';
				html += '				<p>' + list[i].qestnCn + '</p>';
				html += '			</div>';
				html += '		</div>'; 
				html += '		<div class="qDelBox">';
				html += '			<input type="button" value="X" class="delBtn" onclick="MyPage.deleteQuestion(this);return false;">';
				html += '			<input type="hidden" value="' +  list[i].bbscttNo   + '" name="bbscttNo" id="QnAseq">'; 
				html += '		</div>';
				
				if($.isNullString(list[i].answrCn)){
					html += '		<div class="answerStatus"><p>답변 대기 중</p></div>';
				}else{
					html += '	<div class="answerStatus" onclick="MyPage.ansertView(this);return false;">';
					html += '		<div><span>답변 열기</span><img src="/assets/images/icon/selectArrow.png" alt="arrow"></div>';
					html += '	</div>';
				}
				
				html += '	</div>';
				html += '	<div class="answerBox">';
				html += '		<div class="inline anIcon"><img src="/assets/images/icon/answer_icon_gray.png" alt="answer"></div>';
				html += '		<div class="inline anText">';
				html += '			<p>' + list[i].answrCn + '</p><br><br>';
				html += '			<p>답변일:' + list[i].answrDt  + '</p>';
				if(list[i].fileList.length != 0){
					html += '		<div class="viewDownBox" name="attachFileBox' + i + '" style="margin-top:30px"></div>'; 
				}		
				html += '		</div>';
				html += '	</div>';
				
				html += '</li>';
				
			}
			
			$('.mQuestion').append(html); 
			
			for (var i = 0; i < list.length; i++) {
				// 첨부파일
				$('div[name="attachFileBox' + i +'"]').empty();
				$.each(list[i].fileList, function (idx, fileInfo) {
					var $a = $('<a/>').text(fileInfo.orginlFileNm).attr('href', '/rcic/assets/attachment/' + fileInfo.atchFileNo);
					$('div[name="attachFileBox' + i +'"]').append($a); 
				});
			}
			
			if(response.totalCnt > $(".mQuestion li").length){
				$('.moreBox').css('display', '');
			}else{
				$('.moreBox').css('display', 'none');
			}
		});
	},
	
	moreQaList:function(){
		qaPageCnt++;
		MyPage.getQuestionList(qaPageCnt);
	}, 
	
	questionTyChange:function(){
		qaPageCnt=1; 
		var value = $('select[name="qestnTy"]').val();
		$('.mQuestion').empty();
		MyPage.getQuestionList("1", value);
	},
	
	
	ansertView:function(elem){
		// 자기자신을 클릭 한 경우
		if($(elem).hasClass("active")){
			$(elem).removeClass("active"); 
			$(elem).parents(".questionBox").next(".answerBox").slideUp("fast");
			$(elem).find("span").text("답변 열기"); return false; 
		}

		$(".answerBox").slideUp("fast");
		$(".answerStatus").removeClass("active");
		$(".answerStatus").find("span").text("답변 열기");

		$(elem).parents(".questionBox").next(".answerBox").slideDown("fast");
		$(elem).addClass("active"); 
		$(elem).find("span").text("답변 닫기");

	},
	
	deleteQuestion:function(elem){
		// 질문 삭제
		var type = $(elem).attr('class');
		var qestnTy = $('select[name="qestnTy"]').val();
		var msg = "";
		
		var obj = new Object();
			obj.url = "/rcic/qaBbs/deleteQaBbs";
			
			if(type == "delBtn"){
				msg = "삭제하시겠습니까?";
//				obj.bbscttNo = $('input[name="bbscttNo"]').val();
				obj.bbscttNo = elem.parentElement.children.QnAseq.value;
				obj.userSeq =  $('#userSeq').val();
			}else if (type == "allDelBtn"){
				msg = "전체 삭제하시겠습니까?";
				obj.userSeq =  $('#userSeq').val();
				obj.qestnTy = qestnTy;
			}
			
//			if(type == "delBtn"){
////				obj.bbscttNo = elem.parentElement.childNodes[3].value;
//				obj.bbscttNo = elem.parentElement.children.QnAseq.value;
//				alert(obj.bbscttNo);
//			}
					
					
		$.swalConfirm(msg,function(flag){
			if(flag){   
				var dataList = setDefault(obj);
				$.commonAjax(dataList,'', function(response, status, headers, config){ 
					swal({
	                  text: "삭제되었습니다.",
	                  button: "확인", 
					  closeOnEsc: false,
					  allowOutsideClick: false, 
				    }).then(function(value){
	                   if(value) {
	                      location.href="/rcic/movePage?menuId=mypage&type=QA";
	                   }
	               });
				});
			}else{
				return;
			} 
		}); 
		
	},
	
	
	// ============ 나의 관심공사 ===================
	getMyRoadWork:function(currPage){
		// 관심공사 목록 
		var obj = new Object();
			obj.url = "/rcic/userMyRoadwork/getUserMyRoadworkList";
			obj.userSeq = $('#userSeq').val();
			if($('select[name="sido"]').val() != 0) obj.sidoCd = $('select[name="sido"]').val();     
			obj.listCnt = 5;
			obj.currPage = currPage;
		var dataList = setDefault(obj);
		
		if($('select[name="sido"]').val() == 0){
			roadWorkListCnt = 1;
		}
		
		$.commonAjax(dataList,'', function(response, status, headers, config){     
			var list = response.list;
			var html = "";
			
			if( list.length == 0){
				$('#noneMyConst').show();
				$('.allDelBtn').hide();
//				$('#favorList').hide();
//				$('#favorMore').hide();
			}else{
				$('#noneMyConst').hide();
				$('.allDelBtn').show();
//				$('#favorList').show();
//				$('#favorMore').show();
			}
			
//			$('#favorList').empty();   
			
			for (var i = 0; i < list.length; i++) {
				html += '<li>';
				html += '	<input type="hidden" id = "roadWorkSeq" name = "roadWorkSeq" value="' + list[i].seq + '">';
				html += '	<div class="inline fNumberBox">';
				html += '		<p class="rwRnum">' + list[i].rnum+ '</p>';
				html += '	</div>';
				html += '	<div class="inline fCityBox">';
				html += '		<p>' + list[i].sidoNm + '</p>';
				html += '	</div>';
				html += '	<div class="inline fCorporBox">';
				html += '	<p><span>공사명</span>' + list[i].bidntcenm + '</p>';  
				html += '	<p><span>공고일</span>' + $.isNullString2(list[i].bidntcedt.substring(0,10),'-') + '</p>'; 
				html += '	<p><span>계약일</span>' + $.isNullString2(list[i].chgdt,'-') + '</p>';  
				html += '	</div>';
				html += '	<div class="inline fBtnBox fRoadBtnBox">';
				html += '		<input type="button" value="상세" class="greenBtn" onclick="Corporation.constDetail(' + list[i].resultno + ');" >';
				//html += '		<input type="button" value="지도" class="greenBtn btn_map" onclick="MyPage.mapView();return false;">';
				
				html += '		<div class="rDelBox">';
				html += '			<input type="button" value="X" class="delBtn" onclick="MyPage.deleteRoadWork(this);return false;">';
				html += '			<input type="hidden" value="' +  list[i].seq   + '" name="roadWorkSeq" id="roadSeq">';
				html += '		</div>';
				
				html += '	</div>';
				html += '</li>';
				$('input[name="registDt"]').val(list[i].registDt);
				$('input[name="bidntcenm"]').val(list[i].bidntcenm);
				$('input[name="ntceinsttnm"]').val(list[i].ntceinsttnm);
			}    
			
			$('#workTotalCnt').text("(" + response.totalCnt + ")");
			$('#favorList').append(html); 
		
			if(response.totalCnt > $("#favorList li").length){
				$('#favorMore').css('display', 'block');    
			}else{   
				$('#favorMore').css('display', 'none');
			}  
			
		});  
		
	},     
	
	moreRoadWork:function(){
		roadWorkListCnt++;
		MyPage.getMyRoadWork(roadWorkListCnt);
	},
	
	sidoChange:function(){
		$('#favorList').empty();   
		$('.emptyImgBox').hide();
		MyPage.getMyRoadWork();
	},
	
	deleteRoadWork:function(elem){
		// 관심공사 삭제
		var id = $(elem).attr('class');
		var msg = "";
		
		var obj = new Object();
			obj.url = "/rcic/userMyRoadwork/deleteUserMyRoadwork";
			
		if(id == "allDelBtn"){
			msg = "전체 삭제하시겠습니까?";
			obj.userSeq = $('#userSeq').val();
		}else if(id == "delBtn"){
			msg = "삭제하시겠습니까?";
			obj.seq = elem.parentElement.children.roadSeq.value;
			obj.userSeq = $('#userSeq').val();
		}
		
		var dataList = setDefault(obj);
			     
		$.swalConfirm(msg,function(flag){
			if(flag){   
				$.commonAjax(dataList,'', function(response, status, headers, config){ 
					swal({
	                  text: "삭제되었습니다.",
	                  button: "확인", 
					  closeOnEsc: false,
					  allowOutsideClick: false, 
				    }).then(function(value){
	                   if(value) {
	                      location.href="/rcic/movePage?menuId=mypage&type=RW";
	                   }
	               });
					
				});
			}else{
				return;
			} 
		}); 
		
	},
	
	moveUrl:function(elem){ 
		// 표준공고url
        var url = $('input[name="bidntcedtlurl"]').val();  
        window.open(url, "_blank");  
	},
	
	
	
	
	// ============ 나의 관심통계 ===================
	selectPeriod:function(elem,fromDtId,toDtId, gbn){
		
		// 기간선택 
		var period = $(elem).attr('name');
		var periodId = $(elem).attr('id');
		
		if(gbn == "Collection"){
			$('#optionSelCollection input').removeClass("active");
		}else{
			
			$('#optionSel input').removeClass("active");
		}
		
		if($(elem).hasClass("active")){ 
			$(elem).removeClass("active"); 
		}
  
		//$(".optionDate").removeClass("active");
		$("#"+periodId).addClass("active");
			
		$.selPeriod(period,fromDtId,toDtId);
	},
	
	
	corCategoryPopup:function(){
		
		Corporation.getConstKind("CD0004");
	
		$(".corCategory").css({
            "top": (($(window).height()-$(".corCategory").outerHeight())/2+$(window).scrollTop())+"px",
            "left": (($(window).width()-$(".corCategory").outerWidth())/2+$(window).scrollLeft())+"px"
     	});

    	$(".corCategory").show();
		
	},
	
	/*getConstKind:function(code){
		// 공사종류 리스트 
		var searchKeyword = $('#searchKeyword').val();
		var obj = new Object();
			obj.url = "/rcic/code/selectDetailCode";
			obj.groupCode = code;
		if(!$.isNullString(searchKeyword)) obj.searchKeyword = searchKeyword; 
		
		var dataList = setDefault(obj);
		
		$('#constKindList').empty();
		$.commonAjax(dataList,'', function(response, status, headers, config){ 
			var html = "";
			var list = response.list; 
			_.sortBy(list, "code")
			for(var i in list){
				html += '<li onclick="Corporation.selKindInfo(this); return false;">';
				html += '	<div class="corCateTbl">';
				html += '		<div class="corCateCell">';
				html += '			<img src="data:image/jpeg;base64, ' + list[i].base64Attr1 + '" data-filename="category_icon2" width="20" height="20">';
				html += '			<input type="hidden" name="kindCd" value="' + list[i].code + '">';
				html += '			<p name="kindNm">' + list[i].codeNm + '</p>';
				html += '		</div>';
				html += '	</div>';
				html += '</li>';
			}
			
			$('#constKindList').html(html);
		
		});
	},*/
	getChartTypeList:function(){
		// 관심통계 설정하기 버튼 클릭 시  -> 차트 종류 리스트
		var obj = new Object();
			obj.url = "/rcic/code/selectDetailCode";
			obj.groupCode = "STATS_CHRT_SE";
		
		var dataList = setDefault(obj);
		
		$('#chartTpyeList').empty();
		$.commonAjax(dataList,'', function(response, status, headers, config){ 
			var list = response.list;
			var corHtml = "";    
			var colHtml = "";    
			for (var i = 0; i < list.length; i++) {
				if(String(list[i].code).substr(0,1) == "B"){ // B :공사차트, A: 수집차트
					corporationChartTotCnt++;
					corHtml += '<li class="categoryTag inline" id="li'+ list[i].code + '"  onclick="MyPage.selectChartTy(this);return false;">';
					corHtml += '	<span id="' + list[i].code + '">' + list[i].codeNm + '</span>';
					corHtml += '	<input type="hidden" name="onImgValue" value="'+  list[i].base64Attr1 + '" />';
					corHtml += '	<input type="hidden" name="offImgValue" value="'+  list[i].base64Attr2 + '" />';
					corHtml += '	<img src="data:image/jpeg;base64, ' + list[i].base64Attr2 + '" data-fileName="category_icon1" width="20" height="20">';
					corHtml += '</li>';
				}
				
				if(String(list[i].code).substr(0,1) == "A"){ // B :공사차트, A: 수집차트
					if(String(list[i].code) !="A004"){
						collectionnChartTotCnt++;
						colHtml += '<li class="categoryTag inline" id="li'+ list[i].code + '" onclick="MyPage.selectChartTy(this);return false;">';
						colHtml += '	<span id="' + list[i].code + '">' + list[i].codeNm + '</span>';
						colHtml += '	<input type="hidden" name="onImgValue" value="'+  list[i].base64Attr1 + '" />';
						colHtml += '	<input type="hidden" name="offImgValue" value="'+  list[i].base64Attr2 + '" />';
						colHtml += '	<img src="data:image/jpeg;base64, ' + list[i].base64Attr2 + '" data-fileName="category_icon1" width="20" height="20">';
						colHtml += '</li>';
					}
				}
			}    
			$('#corChartList').html(corHtml);
			$('#colChartList').html(colHtml);
		});  
	},
	
	selectChartTy:function(elem){
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
		
		$(elem).addClass("active");
		src += onImg; 
		$(elem).find("img").attr("src", src);

	},
	selectChartTyResult:function(){
		var _self = this;
		$.swalConfirm("나의 관심 통계로 저장하시겠습니까?",function(flag){
			if(flag){   
				
				var arr = new Array(); 
				var corporationStr = "";
				var collectionStr = "";
				$('#corChartList li').each(function (index, item) {  //공사
					if($(item).attr('class') == "categoryTag inline active"){
						var selLi = $('#corChartList li:eq('+index+')')
						arr.push(selLi.find('span').text());
						corporationStr+=selLi.find('span').attr("id")+","
					}
				});
				
				$('#colChartList li').each(function (index, item) {	// 수집
					if($(item).attr('class') == "categoryTag inline active"){
						var selLi = $('#colChartList li:eq('+index+')')
						arr.push(selLi.find('span').text());
						collectionStr+=selLi.find('span').attr("id")+","
					}
				});
				
				if(corporationStr != ""){
					corporationStr = $.removeLastComma(corporationStr)
				}
				
				if(collectionStr != ""){
					collectionStr = $.removeLastComma(collectionStr)
				}
				
				
				// 최대 10개 까지 저장 
				if(collectionStr == "" &&  corporationStr == ""){
					$.swal("관심통계를 선택해주세요.");
					return false;
				}
				
				var url = "/rcic/userMyStats/insertUserMyStats";
				var obj = new Object();
					obj.url = url;
					obj.corporationStr = corporationStr;
					obj.collectionStr = collectionStr;
				 
				var dataList = setDefault(obj);
				
				var msg = "나의관심통계에 저장되었습니다."
				$.commonAjax(dataList,'', function(response, status, headers, config){ 
					$.swal(msg);
					_self.getMyChart();
					$(".categoryWrap").hide();
					location.href="/rcic/movePage?menuId=mypage&type=Chart"  
					
				});
				
			}else{
				return;
			} 
		});
		
		/*$('#selChartTypeList').empty();
		var html = "";
		for(var i in arr){
			html += '<li class="inline">';
			html += '	<span>' + arr[i] + '</span>';
			html += '	<img src="/assets/images/button/circleClose.png" alt="closeButton" name="charTypeRemove" onclick="MyPage.btnClickEvent(this);return false;">';
			html += '</li>';
		}	 
		
		$('#selChartTypeList').html(html);*/
				
	},
	
	setChartCancel:function(){
		var _self = this;
		$('#corChartList li').removeClass('active');
		$("input:checkbox[id='popCateCheck1']").attr("checked", false);
		$('#colChartList li').removeClass('active');
		$("input:checkbox[id='popCateCheck2']").attr("checked", false);
		$(".popupWrap").hide();
		_self.getMyChart();
	},
	
	clickRefash:function(elem){
		var _self = this;
		var id = $(elem).attr('id');
		if(id == "corRefash"){
			$('#corChartList li').removeClass('active');
			$("input:checkbox[id='popCateCheck1']").attr("checked", false);
		}else{
			$('#colChartList li').removeClass('active');
			$("input:checkbox[id='popCateCheck2']").attr("checked", false);
		}
		
		_self.getMyChart();
	},
	
	
	getMyChart:function(){
		// 나의관심통계 
		var obj = new Object();
			obj.url = "/rcic/userMyStats/getUserMyStatsList";
		var dataList = setDefault(obj);
		
		$('#noneMyChart').hide();
		$('#contentArea').show();
		
		$.commonAjax(dataList,'', function(response, status, headers, config){ 
			var list = response.list;
			
			var myStatsCorporationCnt = 0;
			var myStatsCollectionCnt = 0;
			if(list.length == 0){ 
				$('#noneMyChart').show();  
				$('#contentArea').hide(); 
			}
				
			for (var i = 0; i < list.length; i++) {
				
				var onImg = $('#li' + list[i].statsChrtSe).find('input[name="onImgValue"]').val();
				var src  = "data:image/jpeg;base64," + onImg;
				$('#li' + list[i].statsChrtSe).find("img").attr("src", src);
				
				if(list[i].statsListSe == "1"){  // 수집
					if(list[i].statsChrtSe!="A004"){
						
						myStatsCollectionCnt++;
					}
				}else{		// 공사
					myStatsCorporationCnt++; 
				}
				
				$("#li"+list[i].statsChrtSe).addClass("categoryTag inline active");
				
			}
			
			if( corporationChartTotCnt > 0){
				if(corporationChartTotCnt == myStatsCorporationCnt){ // 전체선택 체크 
					$("input:checkbox[id='popCateCheck1']").prop("checked", true);
				}
			}
			
			if( collectionnChartTotCnt > 0){
				if(collectionnChartTotCnt == myStatsCollectionCnt){ // 전체선택 체크 
					$("input:checkbox[id='popCateCheck2']").prop("checked", true);
				}
			}
			
		}); 
	},
	
	/* 아래부턴 관심통계  필요한 함수*/
	//검색조건저장
	getContition:function(){
		
		var listCnt = $("#listCnt option:selected").val(); //  건수
		var keyword = $('#keyword').val();
		var chekPeriod = $('input[name="dRadio"]:checked').val();
		var sido = $('select[name="myPageSido"] option:selected').val();
		var sgg = $('select[name="myPageSgg"] option:selected').val();
		var emd = $('select[name="myPageEmd"] option:selected').val();
		var road = $('select[name="road"] option:selected').val();
		var order = "stdr_dt desc"
		var authNo = $('#authNo').val();
			
		var searchKeyword ="";
		var collectionSearchKeyword ="";
		var radioVal = "";
		var selConst = "";
		var selFac = "";
		
		if(chekPeriod == "bidntcedt"){  
			radioVal = 'bidntcedt';	//공고일
			order = "bidntcedt desc"
			//startDt = masking(startDt,'date',startDt.length);
			//endDt = masking(endDt,'date',endDt.length);
		}else{   
			radioVal = 'forecast_st_dt'; 	//공사기간
			order = "forecast_st_dt desc"
		}
		
		startDt = $("#fromDt").val().replace(/[.]/g,"");
		endDt = $("#toDt").val().replace(/[.]/g,"");
		
		startDtCollection = $("#fromDtCollection").val().replace(/[.]/g,"");
		endDtCollection = $("#toDtCollection").val().replace(/[.]/g,"");
		
			
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
		
		G.contition = { 
   		        "base"      : { 'listCnt'   : listCnt         , 'keyword': keyword ,'radioVal':radioVal, 'startDt':startDt, 'endDt':endDt },
   		        "collection": {'startDt':startDtCollection, 'endDt':endDtCollection },
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
			
		}else{   //공사기간
			//searchKeyword = G.contition["base"]["radioVal"] + ':['+G.contition["base"]["startDt"]+' TO '+G.contition["base"]["endDt"]+']';
			searchKeyword = G.contition["base"]["radioVal"] +":["+G.contition["base"]["startDt"]+ " TO " +G.contition["base"]["endDt"]+"] OR forecast_end_dt:["+G.contition["base"]["startDt"]+" TO "+G.contition["base"]["endDt"]+"]"
		}
		
		for(var i in G.contition["legandong"]){
			var idx = G.contition["legandong"][i];
			if(idx.fieldValue != "0"){
				searchKeyword += " AND "+ idx.fieldName +":"+ idx.fieldValue;
			}
		}
		
		G.contition.searchKeyword = searchKeyword; 
		G.contition.collectionSearchKeyword = 'stdr_dt:['+G.contition["collection"]["startDt"]+' TO '+G.contition["collection"]["endDt"]+']';
		
	},
	/* 관심통계 초기화 버튼*/
	resetClickEvt:function(){
		// 초기화 버튼 클릭 시 
		$('select[name="myPageSgg"]').empty();
		$('select[name="myPageEmd"]').empty();
		$('select[name="myPageSido"]').val(0);
		$('select[name="myPageSgg"]').html('<option value="0" selected="selected">시/군/구 선택</option>');
		$('select[name="myPageEmd"]').html('<option value="0" selected="selected">읍/면/동 선택</option>');
		$.selPeriod('3month','fromDt','toDt');
		$('#optionSel input').removeClass("active");
		$('#3month').addClass("active");
		$('#selConstList li').remove();
		$('#selFacList li').remove();
		$('#noneSelConst').css('display', '');  
		$('#noneSelFac').css('display', ''); 
	},
	/* 관심통계 수집현황 초기화 버튼*/
	collResetClickEvt : function(){
		$('#optionSelCollection input').removeClass("active");
		$('#3monthCollection').addClass("active");
		$.selPeriod('3month','fromDtCollection','toDtCollection');
		
	},
	/* 관심통계 검색 버튼*/
	serchClickEvt:function(){
		// 공사현황
		this.getContition();	
		//$('#corShBox').trigger('click');
		
		
		/*$(".constTrend img").each(function(index, item){
			var name   = $(this).attr("data-fileName");
			if(name == "btn_week"){
				$(this).trigger('click');
				return;
			}			
		});
		
		$(".analysisCollection img").each(function(index, item){
			var name   = $(this).attr("data-fileName");
			if(name == "btn_week"){
				$(this).trigger('click');
				return;
			}			
		});*/
		
		
		var dayType = ""; 
		var pDayType = "";
		
		if($.isNullString(pDayType)){  
			pDayType = "week";
		} 
		
		var collection ="tb_analysis_info";
		var chekPeriod = $('input[name="dRadio"]:checked').val();
		
		if(chekPeriod == "bidntcedt"){  //공고일
			if(pDayType == "day"){
				dayType = "bidntcedt";
			}else if(pDayType == "week"){
				dayType = "bidntcedt_week";
			}else if(pDayType == "month"){
				dayType = "bidntcedt_yyyymm";
			}
		
		}else{ 	// 공사기간  
			if(pDayType == "day"){
				dayType = "stdr_dt";
			}else if(pDayType == "week"){
				dayType = "stdr_week";
			}else if(pDayType == "month"){
				dayType = "stdr_yyyymm";
			}
			
		}
		
        var data = new Object();
		    data.collection=collection;
		    data.dayType = dayType;
		    
			var searchKeyword = G.contition["base"]["radioVal"] + ':['+startDt+' TO '+endDt+']';
			for(var i in G.contition["legandong"]){
				var idx = G.contition["legandong"][i];
				if(idx.fieldValue != "0"){
					searchKeyword += " AND "+ idx.fieldName +":"+ idx.fieldValue;
				}
			}
			G.contition.searchKeyword = searchKeyword;
			
		    data.searchKeyword = G.contition["searchKeyword"];
			data.roadTypeCd = G.contition["roadType"]["fieldValue"];
			data.facTypeCd = G.contition["facType"]["fieldValue"];
		    data.gbn = "pivot";
		    data.pivot = dayType +",const_road_clss";  
		
		    if(!$.isNullString(startDt) && !$.isNullString(endDt)){
				$("#mypageRDateText").html('<span>'+$.setDateStr(startDt)+'</span> 부터 <span>'+$.setDateStr(endDt)+'</span> 기간의  통계  입니다.')
			}
		
		MyPage.viewChartCor(); //통계보기
		MyPage.constIngCnt(); // 공사현황 검색결과
		
	},
	viewChartCor:function(){
		_rcicChartMap =  new RcicChart({  
			
				chart1Config:{
					divId : "constTrendDiv",
					theme : am4themes_animated,
					chartType: am4charts.XYChart
				 } ,  
				 chart2Config:{
					divId : "localConstDiv",
					theme : am4themes_animated,
					chartType: am4charts.TreeMap
				 },
				 chart3Config:{
					divId : "oderConstDiv1",
					theme : am4themes_animated,
					chartType: am4charts.TreeMap
				 },
				 chart4Config:{
						divId : "soidoConstDiv",  
						theme : am4themes_animated,
						chartType: am4charts.TreeMap
					 } ,  
				 chart5Config:{
					divId : "constKindDiv",  
					theme : am4themes_animated,
					chartType: am4charts.PieChart3D
				 } ,
				 chart6Config:{
						divId : "facKindDiv",  
						theme : am4themes_animated,
						chartType: am4charts.PieChart3D
				 } , 
				 chart7Config:{
						divId : "analysisCollectionDiv",  
						theme : am4themes_animated,
						chartType: am4charts.XYChart
				 }
			});
			
			
	},
	collSerchClickEvt:function(){
	
		/*var startDt = $("#fromDt").val().replace(/[.]/g,"");
		var endDt = $("#toDt").val().replace(/[.]/g,"");
		var keyword = $('#keyword').val();
		var collection ="g2b_result_info";
		var searchKeyword ="";*/
		
		this.getContition();
		var collection ="g2b_result_info";
		
		//searchKeyword = 'stdr_dt:['+startDt+' TO '+endDt+']';
		
		/*if(!$.isNullString(keyword)){
			searchKeyword += ' AND ntceinsttnm:('+keyword+')'
		}*/
		
		totalKeywordColl = G.contition["collectionSearchKeyword"];
		MyPage.viewChartColl(); //통계보기
		MyPage.setSearchCollectionListEvt(); //수집현황 검색결과
		
		
	},
	// 공사현황 검색결과 진행공사수
	constIngCnt:function(){
		
		this.getContition();
		var collection ="tb_analysis_info";
		var data = new Object();
			data.searchKeyword = G.contition["searchKeyword"];
			data.roadTypeCd = G.contition["roadType"]["fieldValue"];
			data.facTypeCd = G.contition["facType"]["fieldValue"];
			data.constRoadClss = G.contition["constRoadClss"]["fieldValue"];
			data.order = G.contition["order"]["order"];
		_commonSearch.getSearchList("0", "", data, collection, function(response){
			var dateHtml = "";
			dateHtml += '<span class="sMtLine"><span class="gColor">';
			dateHtml += $.setDateStr(startDt)+'</span> 부터 <span class="gColor">'+$.setDateStr(endDt)+'</span></span>';
			dateHtml += '<span class="block">기간의 공사 현황입니다.</span>';
			dateHtml += '<p class="searchRCnt">검색결과는 <span>총 ' +  $.number(response.totalCnt) + '건</span> 입니다.</p>'
			$("#myPageCorporationSearch").html(dateHtml);
		}); 
	},	
	setSearchCollectionListEvt : function () {
		this.getContition();
		var collection ="g2b_result_info";
		var data = new Object();
			data.searchKeyword = G.contition["collectionSearchKeyword"];
		_commonSearch.getSearchList("0", "", data, collection, function(response){
		   var resultData = response.result;
			
		   var dateHtml = "";
			   dateHtml += '<span class="sMtLine"><span class="gColor">';
			   dateHtml += $.setDateStr(G.contition["collection"]["startDt"])+'</span> 부터 <span class="gColor">'+$.setDateStr(G.contition["collection"]["endDt"])+'</span></span>';
			   dateHtml += '<span class="block">기간의 수집 현황입니다.</span>';
			   dateHtml += '<p class="searchRCnt">검색결과는 <span>총 ' +  $.number(response.totalCnt) + '건</span> 입니다.</p>'
			$("#myPageCollectionSearch").html(dateHtml);
				
		});
	},
	viewChartColl:function(){
		
		_rcicCollectChart =  new RcicCollectChart({  
				
				chart1Config:{
					divId : "collStateDiv",
					theme : am4themes_animated,
					chartType: am4charts.XYChart
				 },
				 chart2Config:{
						divId : "keywordDisDiv",
						theme : am4themes_animated,
						chartType: am4charts.SlicedChart
				 }, 
				 chart3Config:{
						divId : "orderAmountDiv",
						theme : am4themes_animated, 
						chartType: am4charts.XYChart3D,
						gbn: "mypage",
				 }, 
				 chart4Config:{ 
						divId : "roadDiv",
						theme : am4themes_animated,
						chartType: am4charts.RadarChart
				 }
				 
			})
		
	}
	
		
}
