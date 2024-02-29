function inputOnlyNum(event){ 
	var acode = event.keyCode; 
	if(acode == 37 || acode == 39 || acode == 8 || acode == 127 || acode == 9 || (acode>47 && acode<58) || (acode>95 && acode<106)) {
		return true;
	}else {
		return false;
	}
}


/**
 * 파일 다운로드
 * @param orgFileName
 * @param realFileName
 */
function fileDown(realDir, fileName) {
	
	$("#direct-download-form").remove();
	$("body").append("<form id=\"direct-download-form\" name=\"direct-download-form\" method=\"post\" style=\"display:none;\"></form>");

	var form = $("#direct-download-form");
	form.append("<input type=\"hidden\" name=\"f_realDir\" id=\"f_realDir\">");
	form.append("<input type=\"hidden\" name=\"f_fileName\" id=\"f_fileName\">");
	form.append("<input type=\"hidden\" name=\"f_dbcId\" id=\"f_dbcId\">");

	$('#f_realDir').val(realDir);
	$('#f_fileName').val(fileName);
	$('#f_dbcId').val(G.dbcId);

	form.attr("action", "/dbc/fileByteDownload");
	form.submit();
}


function getContextPath(){
    var offset=location.href.indexOf(location.host)+location.host.length;
    var ctxPath=location.href.substring(offset,location.href.indexOf('/',offset+1));
    return ctxPath;
}  

function isNull2String(elem){
    var flag ="";
    if(typeof elem !="undefined" && ( elem!=null) && ( elem!="") ){
    	flag=elem;
    }
    return flag;
}
 
  
function replaceChar(str, fChar,rChar) {
    var tar = '';
    var len= str.length;
    for (var i=0; i < len; i++){
        if (str.charAt(i) == fChar)
            tar += rChar;
        else
            tar += str.charAt(i);
    }
    return tar;
};
 
function reduceComma(val){
	
    var x,ch;
    var newVal="";
    for(x=0; x<val.length; x++) {
        ch=val.substring(x,x+1);
        if(ch!=",") newVal += ch;
    }
    return newVal;
}
 
 

//중복제거 함수
function uniqArr(arr) {
    var chk = [];
    for (var i = 0; i < arr.length; i++) {
        if (chk.length == 0) {
            chk.push(arr[i]);
        } else {
            var flg = true;
            for (var j = 0; j < chk.length; j++) {
                if (chk[j] == arr[i]) {
                    flg = false;
                    break;
                }
            }
            if (flg) {
                chk.push(arr[i]);
            }
        }
    }
    return chk;
}

//중복제거 함수
function uniqArrObj(arr) {
    var chk = [];
    for (var i = 0; i < arr.length; i++) {
        if (chk.length == 0) {
            chk.push(arr[i]);
        } else {
            var flg = true;
            for (var j = 0; j < chk.length; j++) {
                if (chk[j] == arr[i]) {
                    flg = false;
                    break;
                }
            }
            if (flg) {
                chk.push(arr[i]);
            }
        }
    }
    return chk;
}


function removeDuplicates(originalArray, objKey) {
	  var trimmedArray = [];
	  var values = [];
	  var value;

	  for(var i = 0; i < originalArray.length; i++) {
	    value = originalArray[i][objKey];
	    if(values.indexOf(value) === -1) {
	      trimmedArray.push(originalArray[i]);
	      values.push(value);
	    }
	  }
	  return trimmedArray;
	} 
 
 	

function readURL(input,targetImgTagId) {
	 
    if (input.files && input.files[0]) {
        var reader = new FileReader();
 
        reader.onload = function (e) {
            $('.'+targetImgTagId).attr('src', e.target.result);
        }
 
        reader.readAsDataURL(input.files[0]);
    }
}

function setDefault(pObj){
	var obj = new Object();
	var array = new Array();
	if(typeof(pObj)=="object" && !$.isNullString(pObj)){
		for( var key in pObj ) { 
			  obj[key] = pObj[key];
		} 
	} 
	array.push(obj)
	return $.stringify(array);
}

function validateEmail(sEmail) {
	var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	if (filter.test(sEmail)) {
	return true;
	}
	else {
	return false;
	}
}

function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};
    
    $.map(unindexed_array, function(n, i){
    	
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}


function masking(value, type, length){
	
	var retunStr ="";
	
	if(type=="date"){
		if(length==8){ 
			value=value.replace(/[.]/g,"");
			retunStr = moment(value).format("YYYY-MM-DD");
		}if(length==10){
			value=value.replace(/[.]/g,"");
			retunStr = moment(value).format("YYYY-MM-DD");
		}else if(length==12){
			value=value.replace(/[.]/g,"");
			retunStr = moment(value).format("YYYY-MM-DD");
		}else{
			retunStr =value;
		}
		
	}else if(type=="phone"){
		if(length==10){
			retunStr = value.substr(0,3)+"-"+value.substr(3,4)+"-"+value.substr(7,9);
		}else if(length==9){
			retunStr = value.substr(0,3)+"-"+value.substr(3,3)+"-"+value.substr(6,9);

		}else if(length==11){
			retunStr = value.substr(0,3)+"-"+value.substr(3,4)+"-"+value.substr(7,10);	
		}
	}
	return retunStr;
	
}
 
function getDateYYYYMMDD(date, dot){
	
	if($.isNullString(dot)){
		dot = ".";
	}
	var str = "";
		if($.isNullString(date)){
			alert("입력 date가 없음.")
			return;
		}else{
			if(date.length==8){
				str = date.substr(0,4)+dot+date.substr(4,2)+dot+date.substr(6,2);
			}else if(date.length==6){
				str = date.substr(0,4)+dot+date.substr(4,2)
			}
		}
		return str;
	
}
 


function createHiddenTr(list,notKeyword){
	
	var tempHtml="";
	for(var obj in list){
	    if(list.hasOwnProperty(obj)){
	    	tempHtml+='<tr>';
		    for(var prop in list[obj]){ 
		        if(list[obj].hasOwnProperty(prop)){ 
		        	if(prop==notKeyword)continue;
		        	tempHtml+='<td style="display:none" name="'+prop+'">';
		        	tempHtml+=list[obj][prop];
		        	tempHtml+="</td>";
		        }
		    }
		    tempHtml+='</tr>';
	    }
	}
	return tempHtml;
}

/*
 * 
 * Hidden Td자동 생성
 * list, 현재 index ,제외할 키워들의 Array
 * */
 
function createHiddenTd(list,index,array){  
	var tempHtml="";
	for(var obj in list){
		if(obj==index){
		    if(list.hasOwnProperty(obj)){
		    
			    for(var prop in list[obj]){
			    	
			        if(list[obj].hasOwnProperty(prop)){ 
			        	if($.isNullString(list[obj][prop]))continue;
			        	var flag = false;
			        	for(i in array){
			        		if(array[i]==prop){
			        			flag = true;
			        		}
			        	}  
			        	if(!flag){
			        		tempHtml+='<td style="display:none" name="'+prop+'">';
				        	tempHtml+=list[obj][prop];
				        	tempHtml+="</td>";
			        	}
			    	}
			    }
		    }
		}
	}
	return tempHtml;
}

//정규식 특수문자 제거하기
function specialCharRemove(obj) {
	var val = obj.value;
	//var pattern = /[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9)]/gi;   // 특수문자 제거
	  
	var pattern = /[^(0-9)]/gi;   // 숫자이외는 제거
	  
	if(pattern.test(val)){
		obj.value = val.replace(pattern,"");
	}
}



//스크롤 이벤트
$(window).scroll(function() {
    var win = $(this).scrollTop();

    // 헤더 고정 클래스
    if(win > 0) { $(".headerWrap").addClass("fixed"); }
    else { $(".headerWrap").removeClass("fixed"); }
});


//콤마찍기
function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

//콤마풀기
function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}

function setToggleAllCheck(allCheckSelector, checkSelector, click) {
    var $allCheck = $(allCheckSelector);
    var $checkList = $(checkSelector);

    // 전체 체크하기
    $allCheck.on('change', function () {
        var checked = $(this).prop('checked');
        if (checked) {
            // 전체 체크 on: 전체 체크
            $checkList.each(function () {
                if (click) {
                    if ($(this).prop('checked') === false) {
                        $(this).click().trigger('change');
                    }
                } else {
                    $(this).prop('checked', true).trigger('change');
                }
            });
        } else {
            // 전체체크 off: 모두 체크되어 있으면 모두 해제함
            var $checked = $(checkSelector + ':checked');
            if ($checked.length === $checkList.length) {
                if (click) {
                    $checkList.click().trigger('change');
                } else {
                    $(this).prop('checked', false).trigger('change');
                }
            }
        }
    });

    // 하나라도 체크 풀면 전체체크를 풀기
    $checkList.on('change', function () {
        var checked = $(this).prop('checked');
        if (checked === false) {
            if ($allCheck.prop('checked') === true) {
                if (click) {
                    $allCheck.click();
                } else {
                    $allCheck.prop('checked', false);
                }
            }
        } else {
            var $checked = $(checkSelector + ':checked');
            if ($checked.length === $checkList.length) {
                if ($allCheck.prop('checked') === false) {
                    if (click) {
                        $allCheck.click();
                    } else {
                        $allCheck.prop('checked', true);
                    }
                }
            }
        }
    });
    
   
}
