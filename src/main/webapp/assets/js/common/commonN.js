/********************************************************
설명  : 공통 클래스작성자 : 김한욱
작성일 : 2020.1.08
*********************************************************/
var G={};
G.contents1CurrPage = 1;
G.contents2CurrPage = 1;
G.contents3CurrPage = 1;

G.contition = {};
var winRef;
//초기설정값    
var initParam = {  
        nationalZoom:9,
        sidoZoom:2, 
        sggZoom:5,
        emdZoom:8
}
var GL={};
	GL.styleCache={};
(function($, undefined) {
	"use strict";
	$.extend({
		commonAjax:function(dataList,dataType,callBackFun,ascType,errorFun){
			
			if($.isNullString(dataType)){     
				dataType = "json";
			}
			if(!$.isNullString(ascType)){
				ascType = true;
			}
			var param = JSON.parse(dataList);
			$.ajax({
				method : 'POST', 
				dataType : dataType,
				url : param[0].url,
				async:true,  
				data: 'paramList=' + encodeURIComponent(dataList),
				beforeSend: function() {
					//$.showBlock();	
			    },
			    complete: function() {
		    		$.hideBlock();			    		
			    }, 
			    success: function(response, status, headers, config) {
			    	callBackFun(response, status); 
				},
				error:function(jqXHR, textStatus, errorThrown){
					if(jqXHR.responseJSON == undefined){
						alert("에러가 발생했습니다. 관리자에게 문의하세요");
					}else{
						errorFun(jqXHR, textStatus, errorThrown);
					}
					
				}
			});
		},
		commonAjax2:function(dataList,dataType,callBackFun,ascType,errorFun){
			
			if($.isNullString(dataType)){     
				dataType = "json";
			}
			if(!$.isNullString(ascType)){
				ascType = true;
			}
			var param = JSON.parse(dataList);
			$.ajax({
				method : 'POST', 
				dataType: dataType,
				url : param[0].url,
				async:true,  
				data: 'paramList=' + encodeURIComponent(dataList),
				beforeSend: function() {
					$.showBlock2();	
			    },
			    complete: function() {
			    	//if(mapInit._options.time != "Y"){
			    		$.hideBlock();	
			    	//}
			    }, 
			    success: function(response, status, headers, config) {
			    	callBackFun(response, status); 
				},
				error:function(jqXHR, textStatus, errorThrown){
					if(jqXHR.responseJSON == undefined){
						alert("에러가 발생했습니다. 관리자에게 문의하세요");
					}else{
						errorFun(jqXHR, textStatus, errorThrown);
					}
					
				}
			});
		},
		
		commonFalseAjax:function(dataList,dataType,callBackFun,ascType,errorFun){
			
			if($.isNullString(dataType)){     
				dataType = "json";
			}
			if(!$.isNullString(ascType)){
				ascType = true;
			}
			var param = JSON.parse(dataList);
			$.ajax({
				method : 'POST', 
				dataType : dataType,
				url : param[0].url,
				async:false,  
				data: 'paramList=' + encodeURIComponent(dataList),
				beforeSend: function() {
					//$.showBlock();	
			    },
			    complete: function() {
		    		$.hideBlock();			    		
			    }, 
			    success: function(response, status, headers, config) {
			    	callBackFun(response, status); 
				},
				error:function(jqXHR, textStatus, errorThrown){
					errorFun(jqXHR, textStatus, errorThrown);
				}
			});
		},
		 
		rcicSolrMapAjax:function(url, data, callback, isLoading){
			
			$.ajax({ 
				url : url,
				type : 'post',
				data: 'paramList='+data,
				dataType: "json",    
				async: true,      
				beforeSend: function() {
					if(isLoading){  
						$.showBlock();	
					}
			    },
			    complete: function() {
		    		$.hideBlock();			    		
			    },
			    success: function(returnData) {
			    	callback(returnData);
				},
				error:function(jqXHR, textStatus, errorThrown){
					if(jqXHR.responseJSON == undefined){
						alert("에러가 발생했습니다. 관리자에게 문의하세요");
					}else{
						alert(jqXHR.responseJSON.message);
					}
				}
			});
		}, 
		
		rcicAjaxMultiPart : function(url, data, callback){
			$.ajax({   
				url : url,
				data: 'paramList='+data,
		        async:true,
		        type: "POST",
		        enctype: 'multipart/form-data',
		        processData: false,  
		        contentType: false,    
		        success: function(response) {  
		        	
		        },
		        error:function(e){
		        }
		    });
		},
		showBlock: function(options) {
			options = $.extend({}, { 
				message : '<img alt="로딩" src="/assets/images/loading/loading.gif" align="">',
				centerY: false,
			    centerX: false,
			    css:{
			        position: 'fixed',
			        margin: 'auto' 
			    }, 
				baseZ: 2000 
			}, options)
			$.blockUI(options);    
		},
		showBlock2: function(options) {
			options = $.extend({}, { 
				message : '<img alt="로딩" src="/assets/images/loading/loading.gif" align="">',
				centerY: false,
			    centerX: false,
			    css:{
			        position: 'fixed',
			        margin: 'auto',
			        width: 'unset',
			        left: '50%'
			    }, 
				baseZ: 500 
			}, options)
			$.blockUI(options);    
		},
		hideBlock: function() {
			setTimeout(function(){  
			$.unblockUI(); 
			},100); 
		}, 
		isNullString :function(elem){
			var flag =true;
		    if( typeof elem !="undefined" && ( elem!=null) && ( elem!="") ){
		        flag=false;
		    }
		    return flag;
		},
		isNullString2 : function(elem){
			var _self = this;
			var value="-";

		    if(_self.isNullString(elem)){
		    	value=value;
		    }else{
		        value=elem;
		    }
		    return value;
		},
		isNull2String : function(elem){
		    var flag ="";
		    if(typeof elem !="undefined" && ( elem!=null) && ( elem!="") ){
		    	flag=elem;
		    }
		    return flag;
		},
		isNullStringOfVal:function(elem,value){  
			
			var returnValue  = "";
		    if(typeof elem !="undefined" && ( elem!=null) && ( elem!="") ){
		    	returnValue=elem;
		    }else{
		    	returnValue=value;
		    }
		    return returnValue;
		},
		stringify:function (object) {
			var string = JSON.stringify(object);
			return string.replace(/\\u([0-9A-Za-z]{2,4})/g, function(m, c0) {
				return String.fromCharCode(parseInt(c0, 16));
		  });
		},
		setLog:function(message, Opener){ 
			if(G.isTest){
				var obj = new Object();
					obj.source_name = Opener.name;
					obj.message = message; 
			}
		},  
		regExp:function(str){
			var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\_+<>@\#$%&\\\=\(\'\"]/gi;
			var t="";
			if(regExp.test(str)){
		        t = str.replace(regExp, " ");   
		    }else{  
		    	t = str;
		    }
			return t;
		},
		getUuId:function() {
			  function s4() {
			    return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
			  }
			  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
		},
		/**
		 *  배열의 유니크값만 리턴
		 * */
		uniqArr:function(arr) {
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
		},
		/**
		 *  배열의 오브젝트의 중복을 제거함 
		 * */
		removeDuplicates:function(originalArray, objKey) {
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
		},
		randomNumberBounds:function(min, max){
			 return Math.floor(Math.random() * max) + min;
		},
		/**
		 *  페이징 
		 *  id :  페이징 elem id
		 *  curr_page : 현재페이지
		 *  max_page : 최대 페이징 수 
		 *  listLen : 토탈건수
		 *  callBackFun: 콜백 함수
		 * */
		paging : function(id,curr_page,max_page,listLen,callBackFun){
			
			if($('#'+id).data("twbs-pagination")){
		        $('#'+id).twbsPagination('destroy'); 
		    }
			
			if(listLen>0){ 
				$('#'+id).twbsPagination({  
					totalPages: parseInt(max_page),
					visiblePages: max_page > 5 ? 5 : max_page,
					startPage: curr_page,
					first: '',
					last:'',
					next: '<img src="/assets/images/icon/pagingNext.png" alt="prevButton" class="pagingNext">',
					prev: '<img src="/assets/images/icon/pagingPrev.png" alt="prevButton" class="pagingPrev">',
					initiateStartPageClick: false, 
					onPageClick: function (event,page) {
						callBackFun(event,page);
					}
				});
				  
				$('.pagination').css('border', 'none');
				$('.page-item').find('a').attr('style', 'font-size: 14px; height: 40px; width: 40px; line-height: 20px; font-weight: 400;');
				$('.page-item').attr('style', 'padding: 30px 0px; padding-right:5px; border:none;');
				$('.next').find('a').attr('style', 'border:none; font-size:16px;');
				$('.prev').find('a').attr('style', 'border:none; font-size:16px;');
			} 
			if(curr_page == 1){
				$('#'+id).find('a:eq(0)').css('display', 'none');
				//$('#'+id).find('a:eq(1)').css('color', 'rgb(255, 255, 255)');
			}else if(curr_page == max_page ){
				$('#'+id).find('a:eq(-1)').css('display', 'none');
			}
		},
		
		
		corPaging : function(id,curr_page,max_page, listLen,callBackFun){
			
			if($('#'+id).data("twbs-pagination")){
		        $('#'+id).twbsPagination('destroy'); 
		    }
			
			if(listLen>0){ 
				$('#'+id).twbsPagination({  
					totalPages: parseInt(max_page),
					visiblePages: max_page > 5 ? 5 : max_page,
					startPage: curr_page,
					first: '<img src="/assets/images/icon/pagingFirst.png" alt="prevButton" class="pagingPrev">',
					last:'<img src="/assets/images/icon/pagingFirst.png" alt="prevButton" class="pagingPrev" style="transform: rotate(180deg);">',
					next: '<img src="/assets/images/icon/pagingNext.png" alt="prevButton" class="pagingNext">',
					prev: '<img src="/assets/images/icon/pagingPrev.png" alt="prevButton" class="pagingPrev">',
					initiateStartPageClick: false, 
					onPageClick: function (event,page) {
						callBackFun(event,page);
					}
				});
				  
				$('.pagination').css('border', 'none');
				$('.page-item').attr('style', 'padding: 30px 0px; padding-right:5px; border:none;');
				$('.page-item').find('a').attr('style', 'font-size: 14px; height: 40px; width: 40px; line-height: 20px; font-weight: 400;');
				$('.first').find('a').attr('style', 'border:none; font-size:16px;');
				$('.last').find('a').attr('style', 'border:none; font-size:16px;');
				$('.next').find('a').attr('style', 'border:none; font-size:16px;');
				$('.prev').find('a').attr('style', 'border:none; font-size:16px;');
			} 
			
			if(curr_page == 1){
				$('#'+id).find('a:eq(0)').css('display', 'none');
				$('#'+id).find('a:eq(1)').css('display', 'none');
			}else if(curr_page == max_page ){
				$('#'+id).find('a:eq(-1)').css('display', 'none');
				$('#'+id).find('a:eq(-2)').css('display', 'none');
			}
			
			
		},
		
		searchPaging : function(id,curr_page,max_page,listLen,callBackFun){
			var html ="";
			if($('#'+id).data("twbs-pagination")){
		        $('#'+id).twbsPagination('destroy'); 
		    }
			
			if(listLen>0){
				$('#'+id).twbsPagination({  
					totalPages: parseInt(max_page),
					visiblePages: max_page > 5 ? 5 : max_page,
					startPage: curr_page,  
					first: '',
					last:'',
					next: '&rsaquo;',
					prev: '&lsaquo;',
					initiateStartPageClick: false, 
					onPageClick: function (event,page) {
						callBackFun(event,page);
					}
				});
				$('.page-item').find('a').attr('style', 'font-size: 12px !important');
			} 

			if(curr_page == 1){
				$('#'+id).find('a:eq(1)').css('background-color', '#4cc4f2');
				$('#'+id).find('a:eq(1)').css('color', 'white');
			}
		},
		removeLastComma : function(str){
			var n = str.lastIndexOf(",");
			var rtnStr = str.substring(0,n);
			return rtnStr;
		},
		getFormData : function(form){
//		    var unindexed_array = $form.serializeArray();
		    var unindexed_array = $("#"+form).serializeArray();
		    var indexed_array = {};

		    $.map(unindexed_array, function(n, i){
		        indexed_array[n['name']] = n['value'];
		    });

		    return indexed_array;
		},
		toDayStr : function(){
			var date = new Date(); 
			var year = date.getFullYear(); 
			var month = new String(date.getMonth()+1); 
			var day = new String(date.getDate()); 

			// 한자리수일 경우 0을 채워준다. 
			if(month.length == 1){ 
			  month = "0" + month; 
			} 
			if(day.length == 1){ 
			  day = "0" + day; 
			} 
			return year+month+day;
		},
		setDateStr : function (date) {
			date = date+ "";
			var year = date.substr(0,4);
			var month = date.substr(4,2);
			var day = date.substr(6,2);
			
			return year+"년 "+month+"월 "+day+"일 ";
		},
		setDateStrUnderBar : function (date) {
			date = date+ "";
			var year = date.substr(0,4);
			var month = date.substr(4,2);
			var day = date.substr(6,2);
			
			return year+"-"+month+"-"+day;
		},
		setDateStrDot : function (date) {
			date = date+ "";
			var year = date.substr(0,4);
			var month = date.substr(4,2);
			var day = date.substr(6,2);
			
			return year+"."+month+"."+day;
		},
		swal:function(msg){
			swal({
				  text: msg,
				  button: "확인", 
				  closeOnEsc: false,
				  allowOutsideClick: false, 
				  closeOnClickOutside: false,
				});  
		},
		
		swalConfirm:function(msg, callback){
			swal({
			    text: msg,
			    buttons: {
					confirm: {
						text: "확인",
						value: true,
					},
					cancle : {
						text: "취소",
						value : false,
					},
				},
				closeOnEsc: false,
				allowOutsideClick: false, 
			}).then(function(confirmed){
				callback(confirmed);
			});

		},
		
	    calPeriod : function(gbn,num,dateGbn){
        	
        	var f = moment();
        	var rtnDate = "";
        	
            if(gbn == "pre"){
            	rtnDate = moment(f).subtract(num,dateGbn).format('YYYY-MM-DD');
        	}else{
        		rtnDate = moment(f).add(num,dateGbn).format('YYYY-MM-DD'); 
        	}
            
            
            return rtnDate;
            
        },
	    selPeriod : function(gbn,start,end){
			var date = new Date();
			var newdate = new Date(date);
			
			 $("#"+start).datepicker({
				 changeYear:true,
				 changeMonth:true,
				 format: "yyyy.mm.dd", 
		         language: "kr"
		     });

			 $("#"+end).datepicker({
				 changeYear:true,
				 changeMonth:true,
				 format: "yyyy.mm.dd", 
		         language: "kr",
		     });
			
			 $("#"+end).on('changeDate', function (e) {
                if ($("#"+start).val() > $(this).val()) { 
                    alert("종료일자는 시작일자 이전으로 선택할수 없습니다."); 
					var fromDt = $("#"+start).val();
					fromDt = moment(fromDt).add(7, "days").format('YYYY.MM.DD'); 
                    $("#"+end).datepicker('setDate',  fromDt);
                    return;
                }
            }); 

			if(gbn == "week"){
				newdate.setDate(newdate.getDate() - 7);
				var nd = new Date(newdate);
				$("#"+start).val(moment(nd).format('YYYY.MM.DD'));
				$("#"+end).val(moment(date).format('YYYY.MM.DD'));
				$("#"+start).datepicker('setDate', moment(nd).format('YYYY.MM.DD'));
				$("#"+end).datepicker('setDate',moment(date).format('YYYY.MM.DD'));  
			}else if( gbn == "1month"){
				newdate.setMonth(newdate.getMonth() - 1);
				var nd = new Date(newdate);
				$("#"+start).val(moment(nd).format('YYYY.MM.DD'));
				$("#"+end).val(moment(date).format('YYYY.MM.DD'));
				$("#"+start).datepicker('setDate', moment(nd).format('YYYY.MM.DD'));
				$("#"+end).datepicker('setDate',moment(date).format('YYYY.MM.DD'));  
			}else if( gbn == "3month"){
				newdate.setMonth(newdate.getMonth() - 3);
				var nd = new Date(newdate);
				$("#"+start).val(moment(nd).format('YYYY.MM.DD'));
				$("#"+end).val(moment(date).format('YYYY.MM.DD'));
				$("#"+start).datepicker('setDate', moment(nd).format('YYYY.MM.DD'));
				$("#"+end).datepicker('setDate',moment(date).format('YYYY.MM.DD'));  
			}else if( gbn == "6month"){
				newdate.setMonth(newdate.getMonth() -6);
				var nd = new Date(newdate);
				$("#"+start).val(moment(nd).format('YYYY.MM.DD'));
				$("#"+end).val(moment(date).format('YYYY.MM.DD'));
				$("#"+start).datepicker('setDate', moment(nd).format('YYYY.MM.DD'));
				$("#"+end).datepicker('setDate',moment(date).format('YYYY.MM.DD'));  
			}else if( gbn == "1year"){
				newdate.setFullYear(newdate.getFullYear()-1);
				var nd = new Date(newdate);
				$("#"+start).val(moment(nd).format('YYYY.MM.DD'));
				$("#"+end).val(moment(date).format('YYYY.MM.DD'));
				$("#"+start).datepicker('setDate', moment(nd).format('YYYY.MM.DD'));
				$("#"+end).datepicker('setDate',moment(date).format('YYYY.MM.DD'));  
			}else if( gbn == "2year"){
				newdate.setFullYear(newdate.getFullYear()-2);
				var nd = new Date(newdate);
				$("#"+start).val(moment(nd).format('YYYY.MM.DD'));
				$("#"+end).val(moment(date).format('YYYY.MM.DD'));
				$("#"+start).datepicker('setDate', moment(nd).format('YYYY.MM.DD'));
				$("#"+end).datepicker('setDate',moment(date).format('YYYY.MM.DD'));  
			}else if( gbn == "3year"){
				newdate.setFullYear(newdate.getFullYear()-3);
				var nd = new Date(newdate);
				$("#"+start).val(moment(nd).format('YYYY.MM.DD'));
				$("#"+end).val(moment(date).format('YYYY.MM.DD'));
				$("#"+start).datepicker('setDate', moment(nd).format('YYYY.MM.DD'));
				$("#"+end).datepicker('setDate',moment(date).format('YYYY.MM.DD'));  
			}else if( gbn == "3yearafter"){
				newdate.setFullYear(newdate.getFullYear()-10);
				var nd = new Date(newdate);
				$("#"+start).val(moment(nd).format('YYYY.MM.DD'));
				$("#"+end).val(moment(date).format('YYYY.MM.DD'));
				$("#"+start).datepicker('setDate', moment(nd).format('YYYY.MM.DD'));
				$("#"+end).datepicker('setDate',moment(date).format('YYYY.MM.DD'));  
			}
			
		}, 
		setDateType : function(str){
	        var yyyy = str.substr(0,4);
	        var mm = str.substr(5,2);
	        var dd = str.substr(8,2);                        
	        var nd = new Date(yyyy, mm-1, dd);
	        
	        return nd
	        
		},
		 chekPop : function(_this, gbn){
			var filter = "win16|win32|win64|mac|macintel";
		    if( navigator.platform  ){
		        if( filter.indexOf(navigator.platform.toLowerCase())<0 ){
		            // 모바일
					 winRef = window.open("/rcic/movePage?menuId=mmap","_blank");
		        }else{


                    if(gbn==='reg'){
                        console.info("reg_menuId")
				        winRef = window.open("/rcic/movePage?menuId=map&gbn=coordReg","_blank");
				        return;
                    }
					// pc
		            if(winRef == null){
		                console.info("winRef is null")
				        winRef = window.open("/rcic/movePage?menuId=map","_blank");
				    }else{
				        if (winRef.closed == false) {

				            console.info("winRef is focus")
				            winRef.focus();
				        }else{

				            console.info("winRef is not focus")
				        	window.open("/rcic/movePage?menuId=map","_blank");
				        } 
				    }
		        }
		    }
			
		},
		genRowspan : function(className){
		    $("." + className).each(function() {
		        var rows = $("." + className + ":contains('" + $(this).text() + "')");
		        if (rows.length > 1) {
		            rows.eq(0).attr("rowspan", rows.length);
		            rows.not(":eq(0)").remove();
		        }
		    });
		},
		
		/**
		 * 특정 자리수 만큼 0을 채움
	     * 추가 : cjw
		 */
		fillzero : function(n, digits) { 
			var zero = '';
			n = n.toString();
			if (digits > n.length) {
				for (var i = 0; digits - n.length > i; i++) {
					zero += '0';
				}
			}
			return zero + n;
		},
		commonAjax3:function(dataList,dataType,callBackFun,ascType,errorFun){
			
			if($.isNullString(dataType)){     
				dataType = "json";
			}
			if(!$.isNullString(ascType)){
				ascType = true;
			}
			var param = JSON.parse(dataList);
			$.ajax({
				method : 'POST', 
				dataType : dataType,
				url : param[0].url,
				async:true,  
				data: 'paramList=' + encodeURIComponent(dataList),
				beforeSend: function() {
					//$.showBlock();	
			    },
			    complete: function() {
		    		$.hideBlock();			    		
			    }, 
			    success: function(response, status, headers, config) {
			    	callBackFun(response, status); 
				},
				error:function(jqXHR, textStatus, errorThrown){
					if(jqXHR.responseJSON == undefined){
						console.log('에러가 발생했습니다. 관리자에게 문의하세요')
					}else{
						errorFun(jqXHR, textStatus, errorThrown);
					}
					
				}
			});
		},
		
		commonAjax4:function(dataList,dataType,callBackFun,ascType,errorFun){
			
			if($.isNullString(dataType)){     
				dataType = "json";
			}
			if(!$.isNullString(ascType)){
				ascType = true;
			}
			var param = JSON.parse(dataList);
			$.ajax({
				method : 'POST', 
				dataType : dataType,
				url : param[0].url,
				async:false,  
				data: 'paramList=' + encodeURIComponent(dataList),
				beforeSend: function() {
					//$.showBlock();	
			    },
			    complete: function() {
		    		$.hideBlock();			    		
			    }, 
			    success: function(response, status, headers, config) {
			    	callBackFun(response, status); 
				},
				error:function(jqXHR, textStatus, errorThrown){
					if(jqXHR.responseJSON == undefined){
						console.log('에러가 발생했습니다. 관리자에게 문의하세요')
					}else{
						errorFun(jqXHR, textStatus, errorThrown);
					}
					
				}
			});
		},
	}); 
	
	String.prototype.startsWith = function(str) {
	if (this.length < str.length) { return false; }
	return this.indexOf(str) == 0;
	}

	String.prototype.endsWith = function(str) {
	if (this.length < str.length) { return false; }
	return this.lastIndexOf(str) + str.length == this.length;
	}

	$.fn.serializeObject = function() {
		var result = {}
		var extend = function(i, element) {
			var node = result[element.name]
			if ("undefined" !== typeof node && node !== null) {
				if ($.isArray(node)) {
					node.push(element.value)
				} else {
					result[element.name] = [node, element.value]
				}
			} else {
				result[element.name] = element.value
			}
		}

		$.each(this.serializeArray(), extend)
		return result
	}
	
})(jQuery);
