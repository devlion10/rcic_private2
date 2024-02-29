/************************************************************
설명 : Join 컴포넌트
************************************************************/
var Join = {
	
	btnIdCheck:function(){
		// 아이디 중복체크
		var id = $('#joinUserId').val();
		
		if($.isNullString(id)){ 
			$.swal("아이디를 입력하세요.");
			$("#joinUserId").focus();
			return false;
		}
		
		if(Join.isEmailCheck(id) == false) return false;
		
		var obj = new Object();
			obj.url = "/rcic/user/getIdCheck";
			obj.userId = id
		var dataList = setDefault(obj);
			
		$.commonAjax(dataList,'', function(response, status, headers, config){ 
			if (response >=  1) {  
				$.swal("중복된 아이디가 존재합니다. 다시 입력하세요.");		
				$("#idCheckYn").val("N");
				$("#joinUserId").focus();
			} else {			
				$.swal( "사용가능한 아이디 입니다.");
				$("#idCheckYn").val("Y");
			}
			
		});
		
	},
	
	isEmailCheck:function(id){
		//이메일 정규식 
		var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
		
		if(!regExp.test(id)) {
			$.swal("이메일 형식과 일치하지 않습니다."); 
			$("#joinUserId").focus();
			return false;
		}
		
	},
	
	isPwdCheck:function(){
		// 비밀번호 체크
		var pwd = $('#pwd').val();
		var rePwd = $('#rePwd').val();
		var regExp =  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,15}$/;
		
		if($.isNullString(pwd)){ 
			$.swal("비밀번호를 입력하세요.");
			$("#pwd").focus();
			return false;
		}
		
		if($.isNullString(rePwd)){ 
			$.swal("비밀번호 확인을 입력하세요.");
			$("#rePwd").focus();
			return false;
		}
		
		if(!regExp.test(pwd)){
			$.swal("비밀번호는 영문, 숫자, 특수기호 포함 8~15자리 이내로 입력하세요.");
			$('#pwd').focus();
			return false;
		}
		
		if(pwd != rePwd){
			$.swal("비빌번호와 비밀번호 확인이 일치하지 않습니다.");
			$('#rePwd').focus();
			return false;
		}

	},
	
	isPhoneCheck:function(){
		// 휴대폰번호 정규식 체크 
		var phone = $('#contactTelno').val();
		var regExp = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
		
		if($.isNullString(phone)){ 
			$.swal("휴대폰 번호를 입력하세요.");
			$("#contactTelno").focus();
			return false;
		}
		
		if(!regExp.test(phone)) {
			$.swal("휴대폰번호 형식과 일치하지 않습니다."); 
			$("#contactTelno").focus();
			return false;
		}

	},
	
	isIpCheck:function(){ 
		// IP 정규식 체크 (IPv4) 
		var ip = $('#conectIp').val();
		var regExp = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
		
		if($.isNullString(ip)){ 
			$.swal("접속 IP 주소를 입력하세요.");
			$("#conectIp").focus();
			return false;
		}
		
		if(!regExp.test(ip)) {
			$.swal("IP 형식과 일치하지 않습니다."); 
			$('#conectIp').focus();
			return false;
		}
	},
	
	getIinsttList:function(){
		
		var obj = new Object();
			obj.url = "/rcic/code/selectDetailCode";
			obj.groupCode = "INSTT_SE";
		var dataList = setDefault(obj);
		
		$.commonAjax(dataList,'', function(response, status, headers, config){ 
			var html = "";
			var list = response.list; 
			for(var i in list){
				html += '<option value = "' + list[i].code + '">' + list[i].codeNm + '</option>';
			}
			
			$('select[name="insttSe"]').append(html); // 회원가입
			$('select[name="infoInsttSe"]').append(html); // 마이페이지 -회원가입수정
		});
	},
	
	btnJoin:function(){
		
		if($.isNullString($('#joinUserId').val())){ 
			$.swal("아이디를 입력하세요.");
			$("#joinUserId").focus();
			return false;
		}
		
		if($("input:checkbox[name=agreeChk]").is(":checked") != true) {
			$.swal("이용약관에 동의해주세요.");  
			return false;
		}

		if(Join.isPwdCheck() == false) return false;
		
		if($.isNullString($('#insttNm').val())){ 
			$.swal("기관명을 입력하세요.");
			$("#insttNm").focus();
			return false;
		}
		
		if($.isNullString($('#insttSe').val())){
			$.swal("조직/기관을 선택하세요.");
			$('select option:selected').focus();
			return false;
		}
		

		if($.isNullString($('#userNm').val())){ 
			$.swal("이름을 입력하세요.");
			$("#userNm").focus();
			return false;
		}
		
		if(Join.isPhoneCheck() == false) return false;
		if(Join.isIpCheck() == false) return false;
		
		if($("#idCheckYn").val() == "N"){
			$.swal("아이디 중복확인를 해주세요.");
			return false;
		}
		
		var userId = $('#joinUserId').val();
		var userNm = $('#userNm').val();  
		
		var obj = new Object();
			obj.url = "/rcic/user/insertUser";
			obj.userId = userId;
			obj.userNm = userNm;
			obj.pwd = $('#pwd').val();  
			obj.insttNm = $('#insttNm').val();  
			obj.insttSe = $('#insttSe').val();  
			obj.contactTelno = $('#contactTelno').val();  
			obj.conectIp = $('#conectIp').val();  
		var dataList = setDefault(obj);
		
		var param = JSON.parse(dataList);
		
			$.showBlock();	
			setTimeout(function(){
				$.ajax({
				method : 'POST', 
				dataType : "json",  
				url : param[0].url,
				async:true,  
				data: 'paramList=' + encodeURIComponent(dataList),
			    success: function(response, status, headers, config) {
					
			    	if(response.message == "success"){
						setTimeout(function(){ 
							Join.sendMail(userId, userNm); 
						}, 100);
						$("body").css("overflow", "auto");
						$(".signWrap").hide();
					}
				},
				error:function(jqXHR, textStatus, errorThrown){
					$.hideBlock();	
				}
			});
		},100);
	},
	
	sendMail:function(id, name){
		$.ajax({
			url :'/rcic/user/sendAuthMail?id=' + id + '&name=' + name,  
			type : 'get', 
			data: "",
			dataType: "json",  
			async: false, 
		    complete: function() {
				$.hideBlock();
				$(".signCompWrap").show();    	
		    },
			error:function(jqXHR, textStatus, errorThrown){
				$.hideBlock();	
			}
		});
	},
	
}