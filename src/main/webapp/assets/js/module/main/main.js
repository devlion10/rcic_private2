var aniYN  = false;
var MainInfo = {
		
		btnClickEvent:function(elem){
			
			$('.sResultId').empty();
			$('.searchResult').hide();
			var name = $(elem).attr('name');
			var id = $(elem).attr('id');
			var classNm = $(elem).attr('class');
			var id = $(elem).attr('id'); 
			
			if(name == "loginBtn"){
				$("body").css("overflow", "hidden");  
				$(".popupWrap").hide();
				$(".loginWrap").fadeIn("fast");
			}else if(id == "loginClose"){
				$("body").css("overflow", "auto");
				$(".loginWrap").fadeOut("fast");
			}else if(name == "signBtn"){
				$("body").css("overflow", "hidden");  
				$(".popupWrap").hide();
				$(".signWrap").fadeIn("fast");
			}else if (id == "signClose"){
				$("body").css("overflow", "auto");
				$(".signWrap").fadeOut("fast");
			}else if(classNm == "cancleBtn"){
				$("body").css("overflow", "auto");
				$(".popupWrap").hide();
			}else if(id == "searchIdPw"){
				$('#searchName').val("");
				$('#searchPhone').val("");
				$('#searchID').val("");
				$('#searchAgency').val("");
				$(".userSearchWrap").fadeIn("fast");
			}else if(id == "searchClose"){
				$(".userSearchWrap").fadeOut("fast");
			}else if(classNm == "compButton"){
				$(".popupWrap").fadeOut("fast");
				$("body").css("overflow", "auto");
			}else if(classNm == "compCloseBox"){
				$(".popupWrap").fadeOut("fast");
			}else if(name=="agreeDetail"){
		    	$(".termsWrap").fadeIn("fast");
			}else if(classNm == "gBasicBtn enterBtn" || classNm == "closeBox termsClose"){
				$(".termsWrap").fadeOut("fast");
			}else if( classNm == "mMenuBox"){
				// 햄버거메뉴 열기
				$(".mNavWrap").show(); $(".mNavBox").animate({right:"0"}, 200);
			}else if(classNm == "navClose"){
				// 햄버거메뉴 닫기
				$(".mNavBox").animate({
					right:"-80%"},
					{ duration: 200, complete: function () {
						$(".mNavWrap").hide();
					}
				});
			}
			
		},
		
		
		movePage:function(menuId){
			var authNo = $('#authNo').val();
			var url = "/rcic/movePage?menuId="+menuId;
			
			location.href=url;
		},
	
		
		getSido:function(){
			//시도 가져오기 
			var collection ="legaldong_sido";
			var searchKeyword = '*:*';
			
			var data = new Object();
				data.searchKeyword = searchKeyword;
				data.order="sido_cd asc";
			
			$('select[name="sido"]').empty();
			$('select[name="sido"]').html('<option value="0" selected="selected">지역 선택</option>');
			_commonSearch.getSearchList("0", "17", data, collection, function(response){
				var html = "";
				var list = response.result; 
				for(var i in list){ 
					html += '<option value = "' + list[i].sido_cd + '">' + list[i].sido_nm + '</option>';
				}
				$('select[name="sido"]').append(html);
			},false);
		},
		
		getSgg:function(){
			//시군구 가져오기 
			var sido =  $('select[name="sido"] option:selected').val();
			var collection ="legaldong_sgg";
			var searchKeyword = 'sido_cd:(' + sido + ')';
			
			var data = new Object();
				data.searchKeyword = searchKeyword;
				data.order="sgg_cd asc";
			
			$('select[name="sgg"]').empty();
			$('select[name="emd"]').empty();
			$('select[name="emd"]').html('<option value="0" selected="selected">읍/면/동 선택</option>');
			
			_commonSearch.getSearchList("0", "100", data, collection, function(response){
				var html = "";
				var list = response.result; 
				
				html += '<option value="0" selected="selected">시/군/구 선택</option>';
				for(var i in list){
					html += '<option value = "' + list[i].sgg_cd + '">' + list[i].sgg_nm + '</option>';
				}
				
				$('select[name="sgg"]').append(html);
			},false);
		},
		
		getEmd:function(){
			//읍면동  가져오기 
			var sido =  $('select[name="sido"] option:selected').val();
			var sgg =  $('select[name="sgg"] option:selected').val();
			var collection ="legaldong_emd";
			var searchKeyword = 'sido_cd:(' + sido + ') AND sgg_cd:(' + sgg + ')';
			
			var data = new Object();
				data.searchKeyword = searchKeyword;
				data.order="emd_cd asc";
			
			$('select[name="emd"]').empty();
			_commonSearch.getSearchList("0", "100", data, collection, function(response){
				var html = "";
				var list = response.result; 
				
				html += '<option value="0" selected="selected">읍/면/동 선택</option>';
				for(var i in list){
					html += '<option value = "' + list[i].emd_cd + '">' + list[i].emd_nm + '</option>';
				}
				
				$('select[name="emd"]').append(html);
			});
		},
		
		roadConstCnt:function(){
			//국도공사 수
			var collection ="tb_analysis_info";
			var endDt = moment().format('YYYYMMDD');
			//var startDt = moment().subtract(3, 'years').format('YYYYMMDD');
			// 20230510 3개월로 변경
			var startDt = moment().subtract(3, 'month').format('YYYYMMDD');
			var sido = $('select[name="sido"] option:selected').val();
			var searchKeyword = "";
			
			// 20230515 공사현황 공고일 기준으로 변경
			if(sido == 0){
				//searchKeyword = "stdr_dt:["+startDt+ " TO " +endDt+"] OR forecast_end_dt:["+startDt+" TO "+endDt+"] AND const_road_clss:161"
				searchKeyword = "bidntcedt:["+startDt+ " TO " +endDt+"] AND const_road_clss:161"
			}else{
				//searchKeyword = "stdr_dt:["+startDt+ " TO " +endDt+"] OR forecast_end_dt:["+startDt+" TO "+endDt+"] AND const_road_clss:161 AND sido_cd:(" + sido + ")"
				searchKeyword = "bidntcedt:["+startDt+ " TO " +endDt+"] AND const_road_clss:161 AND sido_cd:(" + sido + ")"
			}
			var data = new Object();
				data.startDt = startDt;  //필수
				data.endDt = endDt;      //필수
				data.constRoadClss = "161";
				data.searchKeyword = searchKeyword;
						
			_commonSearch.getSearchList("0", "", data, collection, function(response){
				$('#roadConstCnt').attr('data-count',response.totalCnt);
				MainInfo.counterAnimate('roadConstCnt', response.totalCnt);
			});
		},
		
		roadMakeCnt:function(){
			// 도로개설 수
			var collection ="tb_analysis_info";
			var endDt = moment().format('YYYYMMDD');
			//var startDt = moment().subtract(3, 'years').format('YYYYMMDD');
			// 20230510 3개월로 변경
			var startDt = moment().subtract(3, 'month').format('YYYYMMDD');
			var sido = $('select[name="sido"] option:selected').val();
			var searchKeyword = "";
			var order = "stdr_dt desc"
			
			// 20230516 공사현황 공고일 기준으로 변경, const_road_clss:161 키워드 제거, sido_cd 키워드 제거.
			if(sido == 0){
				//searchKeyword = "stdr_dt:["+startDt+ " TO " +endDt+"] OR forecast_end_dt:["+startDt+" TO "+endDt+"]"
				searchKeyword = "bidntcedt:["+startDt+ " TO " +endDt+"]"
			}else{
				//searchKeyword = "stdr_dt:["+startDt+ " TO " +endDt+"] OR forecast_end_dt:["+startDt+" TO "+endDt+"] AND sido_cd:" + sido;
				searchKeyword = "bidntcedt:["+startDt+ " TO " +endDt+"]"
			}
			
			var data = new Object(); 
				data.startDt = startDt;  //필수
				data.endDt = endDt;      //필수
				data.order= order;
				data.searchKeyword = searchKeyword;
				data.gbn = "pivot";
			    data.pivot = "sido_cd,sido_nm";
			    data.roadTypeCd = "19 24 36 37 39 47 48";
			_commonSearch.getSearchCount(data, collection, function(response){
				var sumCnt = 0;
				for(var j in response.result){ 
					 sumCnt+= response.result[j].valueCount;
				}
				 $('#roadMakeCnt').attr('data-count',sumCnt);
				 MainInfo.counterAnimate('roadMakeCnt', sumCnt);
			});
			
		},
		
		
		constExpectCnt:function(){
			// 준공예정 수
			var collection ="tb_analysis_info";
			var startDt = $.toDayStr();
			var endDt = $.calPeriod('aft',1,'month').replace(/[-]/g,"");
			var sido = $('select[name="sido"] option:selected').val();
			var searchKeyword = "";
			   
			if(sido == 0){
				searchKeyword = "forecast_end_dt:["+ startDt + " TO "+ endDt +"]"
			}else{
				searchKeyword = "forecast_end_dt:["+ startDt + " TO "+ endDt +"] AND sido_cd:"+sido;
			}
			
			var data = new Object();
				data.startDt = startDt;  //필수
				data.endDt = endDt;      //필수
				data.searchKeyword = searchKeyword;
			
			_commonSearch.getSearchList("0", "", data, collection, function(response){
				$('#expectCnt').attr('data-count',response.totalCnt);
				MainInfo.counterAnimate('expectCnt', response.totalCnt);
			});

		},	
		
		constFacCnt:function(){
			// 시설공사 수
			var collection ="tb_analysis_info";
			var endDt = moment().format('YYYYMMDD');
			//var startDt = moment().subtract(3, 'years').format('YYYYMMDD');
			// 20230510 3개월로 변경
			var startDt = moment().subtract(3, 'month').format('YYYYMMDD');
			var sido = $('select[name="sido"] option:selected').val();
			var searchKeyword = "";
			var order = "stdr_dt desc"
			
			// 20230516 공사현황 공고일 기준으로 변경, forecast_end_dt 키워드 제거, sido_cd 키워드 제거.
			if(sido == 0){
				//searchKeyword = "stdr_dt:["+startDt+ " TO " +endDt+"] OR forecast_end_dt:["+startDt+" TO "+endDt+"]"
				searchKeyword = "stdr_dt:["+startDt+ " TO " +endDt+"]"
			}else{
				//searchKeyword = "stdr_dt:["+startDt+ " TO " +endDt+"] OR forecast_end_dt:["+startDt+" TO "+endDt+"] AND sido_cd:"+sido;
				searchKeyword = "stdr_dt:["+startDt+ " TO " +endDt+"]";
			}
			
			var data = new Object(); 
				data.startDt = startDt;  //필수
				data.endDt = endDt;      //필수
				data.order= order;
				data.searchKeyword = searchKeyword;	
				data.gbn = "pivot";
			    data.pivot = "sido_cd,sido_nm";
			    data.facTypeCd = "*:*";
		    
		    var sidoDataList ={};
			_commonSearch.getSearchCount(data, collection, function(response){  
				var sumCnt = 0;
				for(var j in response.result){ 
					 sumCnt+= response.result[j].valueCount;
				}
				 $('#facConstCnt').attr('data-count',sumCnt);
				 MainInfo.counterAnimate('facConstCnt', sumCnt);
			});     
	
		},
		
		
		// 시도선택시 
		sidoChange:function(){
        	MainInfo.roadConstCnt(); 	// 도로공사 수
        	MainInfo.roadMakeCnt(); 	// 도로개설 수
 			MainInfo.constFacCnt();		// 시설공사 수
		    MainInfo.constExpectCnt(); 	// 준공예정 수
		},
		
		counter:function(){
			
        	var hT = jQuery('.corporationBox').offset().top,
		        hH = jQuery('.corporationBox').outerHeight(),
		        wH = jQuery(window).height(); 

	        if(!aniYN){
			    if (jQuery(window).scrollTop() > (hT+hH-wH-$(".corMTxt").height()-$(".corSTxt").height()-$(".areaSelectBox").height())) {
			    	aniYN = true;
	            	$('.circleCnt').each(function () {
	            		
					    $(this).prop('Counter',0).animate({
					    	 Counter: $(this).data("count")
					    }, {
					        duration: 1000,
					        easing: 'swing',
					        step: function (now) {
					            $(this).text(comma(Math.ceil(now)));
					        }
					    });
					});
            	}
        	}
        },

		counterAnimate:function(id,number){
			
		  $({ val : 0 }).animate({ val : number }, {
			   duration: 1000,
			  step: function() {
				 var number = (Math.floor(this.val));
			    $('#' + id).text($.number(number));
			  },
			  complete: function() {
				 var number = (Math.floor(this.val));
			    $('#' + id).text($.number(number));
			  }
			});
			
		},

		noticeList:function(){
			// 공지사항
			var list_cnt = 5;
			
			var obj = new Object();
				obj.url = "/rcic/notice/getNoticeList";
				obj.listCnt = parseInt(list_cnt);
			var dataList = setDefault(obj);
			var mainHtml = "";
			
			$.commonAjax(dataList,'', function(response, status, headers, config){ 
				var list = response.list;
				for (var i in list) { 
					if(i == 5){
						return;
					}
					mainHtml += '<li style="cursor: pointer;" onclick="MainInfo.moveNoticeDetail(' + list[i].noticeNo + '); return false;">';
					mainHtml += '	<div class="lDateBox inline">';
					mainHtml += '		<p style="margin-bottom:0px;">'+ list[i].registDt.substring(8) +'</p>';
					mainHtml += '		<p style="margin-bottom:0px;">'+ list[i].registDt.substring(0, 7) +'</p>';
					mainHtml += '	</div>';
					mainHtml += '	<div class="lTitleBox inline">';
					mainHtml += '		<span class="notice inline">' + list[i].noticeTyNm + '</span>';
					mainHtml += '		<span class="inline noticeTit">' + list[i].sj + '</span>';
					mainHtml += '	</div>';
					mainHtml += '	<div class="lWriterBox inline">';
					mainHtml += '		<div class="writer inline">';
					mainHtml += '			<span>작성자</span>';
					mainHtml += '			<span>' + list[i].registId +'</span>';
					mainHtml += '		</div>';
					mainHtml += '		<div class="lookup inline">';
					mainHtml += '			<span>조회수</span>';
					mainHtml += '			<span>' + list[i].rdcnt + '</span>';
					mainHtml += '		</div>';
					mainHtml += '	</div>';
					mainHtml += '</li>';
				}
				
				$("#mainNotice").html(mainHtml); 
			},false,function(e){
				console.log(e);
			}); 
		},
		
		moveNoticeDetail:function(noticeNo){
			// 공지사항 상세보기로 이동 
			location.href="/rcic/movePage?menuId=board&noticeNo="+noticeNo;
		}
}





