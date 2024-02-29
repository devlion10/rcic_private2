/************************************************************
설명 : login 컴포넌트
************************************************************/
var Login = {
	logout:function(){
		jQuery('#logoutForm').submit();
	},

	btnUserLogin: function(){
		
		if($.isNullString($('#userId').val())){
			$.swal("아이디를 입력하세요.");
			return;
		}
		if($.isNullString($('#password').val())){
			$.swal("비밀번호를 입력하세요.");
			return;
		}
		
		if($("#saved_username").is(":checked")) {
			$("#saved_username").val($("#userId").val());
			document.cookie = "saved_username" + "=" + $("#userId").val();
		}else{
			$("#saved_username").val("");				
		}
		
		//$("#userLoginForm").attr("action", "/rcic/login/loginProc").submit();
		//$(".loginWrap").fadeOut("fast");
		 $.ajax({
			type: "post", 
			url: "/rcic/login/loginProc", 
			data: {userId: $("#userId").val(), password:$('#password').val()},
			//dataType: "JSON", 
			success: function(res, b, c, d) { 
				window.location.reload();
			},
			error: function(xhr, status, error) {
				try {
					var res = JSON.parse(xhr.responseText);
					console.log(res);
					$.swal(res.message);
				} catch(e) {
					$.swal("아이디와 비밀번호를 확인하세요.");
				}

			}
		});
		
	},
	
	searchTabMenu:function(elem){
		
		$("#searchID").val("");
    	$("#searchName").val("");
    	$("#searchPhone").val("");
    	$("#searchAgency").val("");
		
		var index  = $(elem).data("index");
    	var result = '<p class="sBasicTxt">정보 입력 후 검색버튼을 클릭하세요.</p>';

    	if(index == "1"){ $(".searchPWIn").hide(); $(".searchIDIn").show(); $(".searchIDPWIn").css("margin-top", "0"); }
    	else{ $(".searchIDIn").hide(); $(".searchPWIn").show(); $(".searchIDPWIn").css("margin-top", "20px"); }
    	$(".searchResult").html(result);

    	$(".searchTabMenu").removeClass("active");
    	$(elem).addClass("active");
	},
	
	
	saveUserId:function(){
		var cName = "saved_username=";
		var cookieData = document.cookie;
	    var start = cookieData.indexOf(cName);
	    var cValue = '';
	    if(start != -1){
	         start += cName.length;
	         var end = cookieData.indexOf(';', start);
	         if(end == -1)end = cookieData.length;
	         cValue = cookieData.substring(start, end);
	    }
	    cValue = cValue.replace(/\"/g,"");
	    if(cValue != "" && null != cValue) {
	    	$("#userId").val(cValue);
	    	$("#saved_username").prop("checked", true);
	    }
	},
	
	searchIdPw:function(){
		$('.searchResult').show();
		var searchID     = $("#searchID").val();
    	var searchName   = $("#searchName").val();
    	var searchPhone  = $("#searchPhone").val();
    	var searchAgency = $("#searchAgency").val();
    	var result 	     = "";
    	var index        = $(".searchTabMenu.active").data("index");


		if(index == 1){
			
			if($.isNullString(searchName)){
				$.swal("이름을 입력하세요.");
				$("#searchName").focus();
				return false;
			}
			
			if($.isNullString(searchPhone)){
				$.swal("휴대폰 번호를 입력하세요.");
				$("#searchPhone").focus();
				return false;
			}
			
		}else{
			if($.isNullString(searchID)){
				$.swal("아이디를 입력하세요.");
				$("#searchID").focus();
				return false;
			}
			
			
			if($.isNullString(searchName)){
				$.swal("이름을 입력하세요.");
				$("#searchName").focus();
				return false;
			}
			
			if($.isNullString(searchAgency)){
				$.swal("기관명을 입력하세요.");
				$("#searchAgency").focus();
				return false;
			}
			
		}

		var obj = new Object();
			obj.url = "/rcic/user/searchId";
			obj.userNm = searchName;    
			obj.contactTelno = searchPhone;
			obj.userId = searchID;
			obj.insttNm = searchAgency;  
		
		var dataList = setDefault(obj);
		
		$.commonAjax(dataList,'', function(response, status, headers, config){ 
			// 첫번째 탭메뉴(아이디 찾기)
	    	if(index == 1){
		    	if(response.result == null){
		    		result += '<p class="sBasicTxt">입력하신 정보와 일치하는 아이디가 발견되지 않았습니다.</p>';
					result += '<p class="sBasicTxt">다시한번 정확히 입력해주세요.</p>';
					result += '<p class="sGreenTxt">아직 회원이 아니라면 회원가입을해주세요.</p>';
					result += '<img src="/assets/images/popup/searchSignBtn.png" alt="signButton">';
		    	}else{
					result += '<p class="sBasicTxt">입력하신 정보와 일치하는 아이디는</p>';
		    		result += '<p class="sBasicTxt"><span class="sResultId">' + response.result.user_id + '</span> 입니다.</p>';
		    		result += '<div name="loginBtn" onclick="MainInfo.btnClickEvent(this);return false;"><img src="/assets/images/popup/searchLoginBtn.png" alt="loginButton" ></div>';
				} 

	    	}else{
		    	if(response.result == null){
		    		result += '<p class="sBasicTxt">입력하신 정보와 일치하는 정보가 없습니다.</p>';
					result += '<p class="sBasicTxt">다시한번 정확히 입력해주세요.</p>';
					result += '<p class="sGreenTxt">아직 회원이 아니라면 회원가입을해주세요.</p>';
					result += '<div name="signBtn" onclick="MainInfo.btnClickEvent(this);return false;"><img src="/assets/images/popup/searchSignBtn.png" alt="signButton"></div>';
		    	}else{
		    		result += '<p class="sReInTxt">새로운 비밀번호로 변경하시기 바랍니다.</p>';
		    		result += '<input type="password" id="newPwd" name="newPwd" placeholder="새로운 비밀번호를 입력하세요.">';
		    		result += '<p class="sWarning">영문, 숫자, 특수기호 포함 8~15자리 이내로 입력하세요.</p>';
		    		result += '<input type="password" id="reNewPwd" name="reNewPwd" placeholder="비밀번호를 한번 더 입력하세요.">';
		    		result += '<div onclick="Login.updatePwd(); return false;"><img src="/assets/images/popup/confirmBtn.png" alt="confirmButton" class="sConfirmBtn"></div>';
				}
	    	}

	    	$(".searchResult").html(result);
		});
	},
	 
	updatePwd:function(){
		
		var pwd = $('#newPwd').val();
		var rePwd = $('#reNewPwd').val();
		var regExp =  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,15}$/;
		
		if($.isNullString(pwd)){ 
			$.swal("새로운 비밀번호를 입력하세요.");
			$("#newPwd").focus();
			return false;
		}
		
		if($.isNullString(rePwd)){ 
			$.swal("새로운 비밀번호 확인을 입력하세요.");
			$("#reNewPwd").focus();
			return false;
		}
		
		if(!regExp.test(pwd)){
			$.swal("영문, 숫자, 특수기호 포함 8~15자리 이내로 입력하세요.");
			$('#newPwd').focus();
			return false;
		}
		
		if(pwd != rePwd){
			$.swal("새로운 비빌번호와 비밀번호 확인이 일치하지 않습니다.");
			$('#reNewPwd').focus();
			return false;
		}
			
		
		var obj = new Object();
			obj.url = "/rcic/user/updatePwd";
			obj.searchName = $('#searchName').val();  
			obj.searchID = $('#searchID').val();  
			obj.searchAgency = $('#searchAgency').val();  
			obj.newPwd = $('#newPwd').val();  
			
		var dataList = setDefault(obj);	
			
		$.commonAjax(dataList,'', function(response, status, headers, config){ 
			$.swal("비밀번호가 변경되었습니다.\n새로운 비밀번호로 로그인하시기 바랍니다.");
		});
		
		$(".popupWrap").hide();
	}
		
}