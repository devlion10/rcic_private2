
var now   = new Date();
var thisMonth = now.getMonth();			//주의 : 현재월 - 1의 값이 입력된다.
var thisYear = now.getFullYear();
var thisDay = now.getDate();

(function($) {

	function calendarWidget(el, params) {

		var opts = {
				month: thisMonth,
				year: thisYear,
				data: '',
                datStart : '',
                datEnd : ''
		};

		//params의 값이 있으면 opts의 값을 병합한다. 반대로 params의 값이 없으면 opts의 값을 사용한다.
		$.extend(opts, params);

		$('#frmYear').val(opts.year);
		$('#frmMonth').val(opts.month + 1);

		var yearMonthHtml = $('#frmYear').val() + '.' + $('#frmMonth').val();

		$('#frmYearMonth01').text(yearMonthHtml);
		$('#frmYearMonth02').text(yearMonthHtml);

		var dayNames = ['일', '월', '화', '수', '목', '금', '토'];
		month = i = parseInt(opts.month);
		year = parseInt(opts.year);
		var m = 0;
		//PC
		var table = '';

			//table += ('<h3 id="current-month">'+monthNames[month]+' '+year+'</h3>');  //현재 월과 년도를 표시
			table += ('<table>');
			table += '<caption>검진 날짜 선택</caption><thead>';
			table += '<tr>';
			for (d=0; d<7; d++) {
				table += '<th scope="col">' + dayNames[d] + '</th>';
			}
			table += '</tr></thead>';

			var days = getDaysInMonth(month,year);
            var firstDayDate=new Date(year,month,1);
            var firstDay=firstDayDate.getDay();

			var prev_days = getDaysInMonth(month,year);
            var firstDayDate=new Date(year,month,1);
            var firstDay=firstDayDate.getDay();

			var prev_m = month == 0 ? 11 : month-1;
			var prev_y = prev_m == 11 ? year - 1 : year;
			var prev_days = getDaysInMonth(prev_m, prev_y);
			firstDay = (firstDay == 0 && firstDayDate) ? 7 : firstDay;

			var i = 0;
            for (j=0;j<42;j++){

              if ((j<firstDay)){
                table += ('<td class="other"><span class="day">'+ (prev_days-firstDay+j+1) +'</span></td>');
			  } else if ((j>=firstDay+getDaysInMonth(month,year))) {
				i = i+1;
                table += ('<td class="other"><span class="day">'+ i +'</span></td>');
              }else{
            	  var custDay = (j-firstDay+1);
            	  if(custDay < 10) custDay = '0' + custDay;
            	  table += ('<td id="day_'+ custDay +'"><span class="day">'+ custDay +'</span></td>');
//            	var custDay = (j-firstDay+1);
//            	if(custDay < 10) custDay = '0' + custDay;
//
//            	if (j%7==6){		//토요일일 경우
//            		table += ('<td id="day_'+ custDay +'"><span class="day">'+ custDay +'</span></td>');
//            	}else if(j%7==0){	//일요일일 경우
//            		table += ('<td id="day_'+ custDay +'"><span class="day">'+ custDay +'</span></td>');
//            	}else{
//            		table += ('<td id="day_'+ custDay +'"><span>'+ custDay +'</span></td>');
//            	}
              }
              if (j%7==6)  table += ('</tr>');	//<tr>로 열지 않고 닫기만 해도 <tr></tr>이 됨
            }

            table += ('</table>');

		el.html(table);

		//mobile
		var table1 = '';
		if(opts.distinctHospital == 'COOP'){
			table1 += ('<table>');
			table1 += '<caption>검진 날짜 선택</caption>';
			table1 += '<colgroup>';
			table1 += '<col style="width:40%">';
			table1 += '<col style="width:auto">';
			table1 += '</colgroup>';
			table1 += '<thead><tr>';
			table1 += '<th scope="col">일</th>';
			table1 += '<th scope="col">가능 여부</th>';
			table1 += '</tr></thead><tbody></tbody>';
	        table1 += ('</table>');
		}else{
			table1 += ('<table>');
			table1 += '<caption>검진 날짜 선택</caption>';
			table1 += '<colgroup>';
			table1 += '<col style="width:25%">';
			table1 += '<col style="width:auto">';
			table1 += '<col style="width:auto">';
			table1 += '</colgroup>';
			table1 += '<thead><tr>';
			table1 += '<th scope="col">일(요일)</th>';
			table1 += '<th scope="col">오전</th>';
			table1 += '<th scope="col">오후</th>';
			table1 += '</tr></thead><tbody></tbody>';
	        table1 += ('</table>');
		}

        $('#moCalDiv').html(table1);

		var reserableDate = 1;
		if (typeof opts.possibleDate != 'undefined') {
			reserableDate = opts.possibleDate;
		}

		var dt = new Date();
		var currYear = moment().format('YYYY');
		var currMonth = moment().format('MM');
		var currDay = moment().format('DD');
		var currDate = moment().format('YYYYMMDD');
		
		console.log(currYear);
		console.log(currMonth);
		console.log(currDay);
		console.log(currDate);

		 
		//해당일에 데이터를 뿌린다.
		$.each(opts.data, function(idx, val){
			
			var dayId = 'day_' + val.DAT_YEYAK.substring(6, 8); 
			var moDayId = 'moDay_' + val.DAT_YEYAK.substring(6, 8);
		 
				var moTableHtml = "";
				var moTableDay = val.DAT_YEYAK.substring(6, 8);
				var moTableGbWeek = "";
				if(val.GUBN_WEEK == "1"){
					moTableGbWeek = "일";
					moTableHtml += '<tr id="'+moDayId+'"><td class="holiday"><span class="day">'+moTableDay+'</span><span class="day_info">('+moTableGbWeek+')</span></td></tr>';
				}else if(val.GUBN_WEEK == "2"){
					moTableGbWeek = "월";
					moTableHtml += '<tr id="'+moDayId+'"><td><span class="day">'+moTableDay+'</span><span class="day_info">('+moTableGbWeek+')</span></td></tr>';
				}else if(val.GUBN_WEEK == "3"){
					moTableGbWeek = "화";
					moTableHtml += '<tr id="'+moDayId+'"><td><span class="day">'+moTableDay+'</span><span class="day_info">('+moTableGbWeek+')</span></td></tr>';
				}else if(val.GUBN_WEEK == "4"){
					moTableGbWeek = "수";
					moTableHtml += '<tr id="'+moDayId+'"><td><span class="day">'+moTableDay+'</span><span class="day_info">('+moTableGbWeek+')</span></td></tr>';
				}else if(val.GUBN_WEEK == "5"){
					moTableGbWeek = "목";
					moTableHtml += '<tr id="'+moDayId+'"><td><span class="day">'+moTableDay+'</span><span class="day_info">('+moTableGbWeek+')</span></td></tr>';
				}else if(val.GUBN_WEEK == "6"){
					moTableGbWeek = "금";
					moTableHtml += '<tr id="'+moDayId+'"><td><span class="day">'+moTableDay+'</span><span class="day_info">('+moTableGbWeek+')</span></td></tr>';
				}else if(val.GUBN_WEEK == "7"){
					moTableGbWeek = "토";
					moTableHtml += '<tr id="'+moDayId+'"><td><span class="day">'+moTableDay+'</span><span class="day_info">('+moTableGbWeek+')</span></td></tr>';
				}
				$("#moCalDiv tbody").append(moTableHtml);
				
				console.log(eval(currDate));
				console.log(eval(val.DAT_YEYAK));
				if (eval(currDate) > eval(val.DAT_YEYAK) || eval(opts.datStart) > eval(val.DAT_YEYAK) || eval(opts.datEnd) < eval(val.DAT_YEYAK) ) {
					
					
				}
				/*
				if (eval(currDate) > eval(val.DAT_YEYAK) || eval(opts.datStart) > eval(val.DAT_YEYAK) || eval(opts.datEnd) < eval(val.DAT_YEYAK) ) {
					//현재날짜보다 지난 날짜에 대해서는 아무것도 처리하지 않음.
					//품의에 있는 검진 시작일, 마감일에 해당되지 않는 날에 대해서는 아무것도 처리하지 않음.
					if (val.YSNO_HOLIDAY == 'Y') {
						// 예약불가능일 경우 휴일코드값이 'Y'일 경우 휴일설명글 보이기
						if(val.GUBN_APM == 'AM'){
							$('#'+dayId).append('<span class="day_info">'+ val.DESC_HOLIDAY +'</span>');
							$('#'+dayId).append('<button type="button" class="btn_time" disabled>오전 <span>예약불가</span></button>');
							$('#'+dayId).addClass('holiday');
							$('#'+moDayId).append('<td><button type="button" class="btn_time" disabled><span>예약불가</span></button></td>');
							$('#'+moDayId).children().eq(0).addClass('holiday');
						}else{
							$('#'+dayId).append('<button type="button" class="btn_time" disabled>오후 <span>예약불가</span></button>');
							$('#'+moDayId).append('<td><button type="button" class="btn_time" disabled><span>예약불가</span></button></td>');
						}
					} else {
						// 휴일이 아닌 예약불가능일 '예약불가'(#666) 출력
						if(val.GUBN_APM == 'AM'){
							$('#'+dayId).append('<button type="button" class="btn_time" disabled>오전 <span>예약불가</span></button>');
							$('#'+moDayId).append('<td><button type="button" class="btn_time" disabled><span>예약불가</span></button></td>');
						}else{
							$('#'+dayId).append('<button type="button" class="btn_time" disabled>오후 <span>예약불가</span></button>');
							$('#'+moDayId).append('<td><button type="button" class="btn_time" disabled><span>예약불가</span></button></td>');
						}
					}
				} else {
					if (val.YSNO_LIMIT == 'N' || val.YSNO_LIMIT == null ) {
						// 예약가능일
						if(val.GUBN_APM == 'AM'){
							$('#'+dayId).append('<button type="button" class="btn_time hangmokCheck" userData="AM">오전 <span>예약가능</span></button>');
							$('#'+moDayId).append('<td><button type="button" class="btn_time hangmokCheckMo" userData="AM"><span>예약가능</span></button></td>');
						}else{
							$('#'+dayId).append('<button type="button" class="btn_time hangmokCheck" userData="PM">오후 <span>예약가능</span></button>');
							$('#'+moDayId).append('<td><button type="button" class="btn_time hangmokCheckMo" userData="PM"><span>예약가능</span></button></td>');
						}

					} else if (val.YSNO_HOLIDAY == 'Y') {
						// 예약불가능일 경우 휴일코드값이 'Y'일 경우 휴일설명글 보이기
						if(val.GUBN_APM == 'AM'){
							$('#'+dayId).append('<span class="day_info">'+ val.DESC_HOLIDAY +'</span>');
							$('#'+dayId).append('<button type="button" class="btn_time" disabled>오전 <span>예약불가</span></button>');
							$('#'+dayId).addClass('holiday');
							$('#'+moDayId).append('<td><button type="button" class="btn_time" disabled><span>예약불가</span></button></td>');
							$('#'+moDayId).children().eq(0).addClass('holiday');
						}else{
							$('#'+dayId).append('<button type="button" class="btn_time" disabled>오후 <span>예약불가</span></button>');
							$('#'+moDayId).append('<td><button type="button" class="btn_time" disabled><span>예약불가</span></button></td>');
						}
					} else {
						// 센터 휴일, 오후 예약 아예 안받는 경우
						if(val.GUBN_APM == 'AM'){
							$('#'+dayId).append('<button type="button" class="btn_time hangmokCheck" userData="AM">오전 <span style="color:red;">예약불가</span></button>');
							$('#'+moDayId).append('<td><button type="button" class="btn_time hangmokCheckMo" userData="AM"><span style="color:red;">예약불가</span></button></td>');
						}else{
							$('#'+dayId).append('<button type="button" class="btn_time hangmokCheck" userData="PM">오후 <span style="color:red;">예약불가</span></button>');
							$('#'+moDayId).append('<td><button type="button" class="btn_time hangmokCheckMo" userData="PM"><span style="color:red;">예약불가</span></button></td>');
						}
					}
				}
				*/
		});
	}

	function getDaysInMonth(month,year)  {
		var daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];
		if ((month==1)&&(year%4==0)&&((year%100!=0)||(year%400==0))){
		  return 29;
		}else{
		  return daysInMonth[month];
		}
	}


	// jQuery plugin initialisation : http://eisabainyo.net/demo/jquery.calendar-widget.php
	$.fn.calendarWidget = function(params) {
		calendarWidget(this, params);
		return this;
	};

})(jQuery);