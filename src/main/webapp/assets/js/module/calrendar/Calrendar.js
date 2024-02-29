(function(window, $) {
	"use strict";

	var Calrendar = function(_options) {
		this.init(_options);
	};
	Calrendar.prototype = {
		initFlag :false,
		initStartDate:'2012-01-01',   					 //달력 생성 기준일자
		initEndDate: moment().format('YYYY-MM-DD'),      //달력 생성 기준일자
		_defaults:{
					eventType : 'double',
					format: "YYYY/MM",
				    viewMode: "day",
				    minViewMode: "day",
				    language : "ko",
					skin : "round",
					type : "double",
					grid : true,
					grid_snap: false,
		},
		config:null,
		modal:null,
		datepickerConfig: {
			datePicker: null,
			datePickerModal1: null,
			datePickerModal2: null,
		},
		rangeSliderConfig:{
			rangeSlider: null,
		},
		properties: {
			format:'day',
			period: null,
			periodArr: [],
			seletStartDate: null, //선택
			seletEndDate: null,  //선택
		},
		dateFormat: {
		        year: 'YYYY',
		        quarter : 'YYYY-Q[Q]',
		        month : 'YYYY-MM',
		        day : 'YYYY-MM-DD'
	    },
	    dateFormatForApi: {
	        year: 'YYYY',
	        quarter : 'YYYYQ[Q]',
	        month : 'YYYYMM',
	        day : 'YYYYMMDD'
	    },
		init:function(_options){
				this.config = $.extend({}, this._defaults, _options);
				 $.fn.datepicker.dates['ko-quarter'] = $.extend({}, $.fn.datepicker.dates.ko, {
					 	months: ["1Q", "", "", "2Q", "", "", "3Q", "", "", "4Q", "", ""],
				        monthsShort: ["1Q", "", "", "2Q", "", "", "3Q", "", "", "4Q", "", ""],
				        titleFormat: "yyyy MM DD",
			    });

				//달력생성 기준일자
				this.initStartDate = this.config.initStartDate;
				this.initEndDate = this.config.initEndDate;

				//달력생성일자
				this.properties.seletStartDate = this.config.seletStartDate;
				this.properties.seletEndDate = this.config.seletEndDate;

				this.properties.period = this.config.period;
				this.properties.format = $(this.config.period).val();

				//최초 달력 생성 기준일자
				this.rangeSliderConfig.rangeSlider = this.config.rangeSlider;
				this.modal = this.config.modal;

				this.datepickerConfig.datepicker = this.config.datepicker;
				this.datepickerConfig.datePickerModal1 = this.config.datePickerModal1;
				this.datepickerConfig.datePickerModal2 = this.config.datePickerModal2;

				//달력일자 생성
				//var date = this.simplifyDate(this.properties.periodArr);
				//달력이벤트
				this.setCalrendarInitFunction();
				//달력생성
				this.createCalrendar();
				
				var _self = this;
				
				var startDate = moment(new Date(_self.properties.seletStartDate).valueOf()).format(_self.dateFormatForApi[_self.properties.format]);
            	var endDate = moment(new Date(_self.properties.seletEndDate).valueOf()).format(_self.dateFormatForApi[_self.properties.format]);
            	_self.converterDateDouble(startDate,endDate);
            	$('#speriod').val(_self.tsToDate(new Date(_self.properties.seletStartDate).valueOf()) +" ~ "+ _self.tsToDate(new Date(_self.properties.seletEndDate).valueOf()));
				

 		},
        setCalrendarInitFunction:function(elem){

        	var _self = this;
        	$('#btn_calrendar').click(function(){
        		$(this).attr('data-target','#calrendar');
        		_self.createCalrendar();
        	});
        	
        	
        	/*추가 디폴트 설정*/
        	var f = moment();
            var ff = new Date(moment(f).subtract(3,'month').format('YYYY-MM-DD')).valueOf();
        	_self.properties.seletStartDate = ff;
            _self.properties.seletEndDate = moment().format('YYYY-MM-DD');//new Date(_self.properties.seletEndDate).valueOf();
            
	        $('#customSwitch').change(function () {

	        	_self.config.eventType  = "double";

	           if ($('#customSwitch').prop('checked') == true) {

	            	var format = _self.properties.format;
	            	var my_range = $(_self.rangeSliderConfig.rangeSlider).data("ionRangeSlider");
	            	var ff;

	            	switch (format) {
		            	case "year":
							var f = moment();
								ff = new Date(moment(f).subtract(1,'year').format('YYYY')).valueOf();
							break;
						case "month":
							var f = moment();
								ff = new Date(moment(f).subtract(1,'month').format('YYYY-MM')).valueOf();
							break;
						case "day":
							var f = moment();
			                    ff = new Date(moment(f).subtract(30,'day').format('YYYY-MM-DD')).valueOf();
							break;
						default:
							var f = moment();
								ff = new Date(moment(f).subtract(180,'day').format('YYYY-MM-DD')).valueOf();
							break;
					}

	            	my_range.update({
	            		from : ff,
                        to: new Date(_self.properties.seletEndDate).valueOf(),
                        type: 'double',
	                });
	            	my_range.update_check.from = ff;

	                _self.properties.seletStartDate = my_range.update_check.from;
	                _self.properties.seletEndDate =  my_range.update_check.to;

	            } else {

	            	var my_range = $(_self.rangeSliderConfig.rangeSlider).data("ionRangeSlider");
	            	_self.config.eventType = "single";
	            	var f = moment();
	                my_range.update({
	                    type: "single",
                    	from : new Date(moment(f).format('YYYY-MM-DD')).valueOf()
	                });
	                $("span").removeClass('irs-bar irs-bar--single');
	            }
	        });

            // 슬라이드 화면에서 기간선택 콤보박스 변경시
            $(_self.config.ps).change(function () {
            	_self.properties.format = this.value;
            	$("span").removeClass('irs-bar irs-bar--single');

            	// 슬라이드에서 선택된 값을 달력 화면 select에도 적용
                $(_self.config.pc).val(_self.properties.format);

                var my_range = $(_self.rangeSliderConfig.rangeSlider).data("ionRangeSlider");
                	my_range.reset();
                	my_range.update({
                        from: new Date(_self.properties.seletStartDate).valueOf(),
                        to: new Date(_self.properties.seletEndDate).valueOf(),
                        prettify: _self.tsToDate,
                        format: _self.properties.format
                    });
                    _self.setColorCalrendar();
            });

	        $(this.config.pc).on('change',function () {
	        	_self.properties.format = this.value;
	            _self.initDatepicker(_self.properties.format);
	            $(_self.config.pc).val(_self.properties.format);
	            $(_self.config.ps).val(_self.properties.format);
	            _self.setColorCalrendar();
	        });

        },
        changeDate:function(gbn,num,dateGbn){
        	var _self = this;
        	
        	var f = moment();
            var ff = new Date(moment(f).subtract(4,'month').format('YYYY-MM-DD')).valueOf();
        	var startDt = moment().format('YYYY-MM-DD');
        	var endDt = new Date(_self.properties.seletEndDate).valueOf();
        	
        	_self.properties.seletStartDate = ff;
            _self.properties.seletEndDate = moment().format('YYYY-MM-DD');//new Date(_self.properties.seletEndDate).valueOf();
        	
            if(gbn == "pre"){
        		startDt = new Date(moment(f).subtract(num,dateGbn).format('YYYY-MM-DD')).valueOf();
        		endDt = new Date(_self.properties.seletEndDate).valueOf();
        	}else{
        		startDt = new Date(_self.properties.seletEndDate).valueOf();
        		endDt = new Date(moment(f).add(num,dateGbn).format('YYYY-MM-DD')).valueOf(); 
        	}
            
            var my_range = $(this.rangeSliderConfig.rangeSlider).data("ionRangeSlider");
        	my_range.update({
        		from : startDt,
                to: endDt,
                type: 'double',
            });
        	
        	_self.properties.seletStartDate = startDt;
            _self.properties.seletEndDate = endDt;//new Date(_self.properties.seletEndDate).valueOf();
            
        },
        tsToDate:function (ts) {

        	 var d = new Date(ts);
             var _self = this;
             var format = _self.format;
             var date;

             var year = d.getFullYear();
  			 var month = new String(d.getMonth()+1);
  			 var day = new String(d.getDate());

             if(format=="year"){
             	 date = d.toLocaleDateString('ko-KR' , {
                      year: 'numeric',
                   });
             }else if(format=="month"){
     			if(month.length == 1){
     			  month = "0" + month;
     			}
     			if(day.length == 1){
     			  day = "0" + day;
     			}
     			date =  year+"-"+month+"-";
             }else if(format=="day"){
      			if(month.length == 1){
      			  month = "0" + month;
      			}
      			if(day.length == 1){
      			  day = "0" + day;
      			}
      			date =  year+"-"+month+"-"+day;
             }else{
            	 if(month.length == 1){
         			  month = "0" + month;
         			}
         			if(day.length == 1){
         			  day = "0" + day;
         			}
         			date =  year+"-"+month+"-"+day;
            	 /*date = d.toLocaleDateString('ko-KR' , {
                     year: 'numeric',
                     month: 'long',
                     day: 'numeric'
                  });*/
            	 var agent = navigator.userAgent.toLowerCase();
            	 //ie
            	 //if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
	              //	date = date.replace("년",".").replace("월",".").replace("일",".").replace(/ /gi, "");
	               //	var arr = date.split(".");
	              // 	var str = "";
	  	     	//	date = str;
             }
             return date;
        },
        createCalrendar:function(date){

 			var _self = this;
 				_self.format = _self.properties.format;
 				
            //슬라이더
 			var slider =  $(this.rangeSliderConfig.rangeSlider).ionRangeSlider({
                skin: "round",
                type: "double",
                grid: true,
                grid_snap: false,
                min: new Date(_self.initStartDate).valueOf(),
                max: new Date(moment().add(1,'year').format('YYYY-MM-DD')).valueOf(),
                from: new Date(_self.properties.seletStartDate).valueOf(),
                to: new Date(_self.properties.seletEndDate).valueOf(),
                prettify: _self.tsToDate,
                force_edges: true,
                format: _self.properties.format,
                onStart: function (data) {
                	_self.properties.seletStartDate = data.from;
                    _self.properties.seletEndDate =   data.to;
                    
                },
                onChange: function (data) {
                	if (_self.config.eventType != "double") {
                        $("span").removeClass('irs-bar irs-bar--single');
                    }
                    _self.properties.seletStartDate = data.from;
                    _self.properties.seletEndDate =   data.to;
                },
            });
 			
 			_self.setColorCalrendar();
		},
		setColorCalrendar:function(){
			var _self = this;
            if(_self.config.eventType=="single"){
            	$('.irs--round .irs-bar').css('background-color','transparent');
            }else{
            	$('.irs--round .irs-bar').css('background-color','#61A121');
            }
            
		},
		initSlider: function () {
			// 슬라이더 기간 기간선택/기간기준 이벤트를 트리거해서 슬라이더를 초기화 한다.
			var _self = this;
			/*if(!_self.initFlag){
				$('#customSwitch').change();
				_self.initFlag = true;
			}*/
			$(this.config.ps).change();
		},
		initDatepicker: function () {

			var _self = this;
				_self.format = $.isNullString(_self.properties.format)?"day":_self.properties.format;
			this.properties.format = _self.format;
			var my_range = $(_self.rangeSliderConfig.rangeSlider).data("ionRangeSlider");

            var new_options = {};
            var startMoment = moment(_self.properties.seletStartDate);
            var endMoment = moment(_self.properties.seletEndDate);
            
            var startDate, endDate; // 결과값
            switch (this.properties.format.toLowerCase()) {
                case "year":
                    new_options = {
                        autoclose: false,  // 날짜를 선택해도 달력 안없어지게
                        viewMode: moment(_self.properties.seletStartDate).format('YYYY'),
                        minViewMode: 'years',
                        language: "ko",
                        changeMonth: true,
                        changeYear: true
                    }
                    startDate =  startMoment.format(_self.dateFormat.year) + '-01-01';
                    endDate   = endMoment.format(_self.dateFormat.year) + '-01-01';
                    break;
                case "month":
                    new_options = {
                        autoclose: false,
                        format: "yyyy-mm",
                        viewMode: "months",
                        minViewMode: "months",
                        changeMonth: true,
                        changeYear: true,
                        language: "ko",
                    }
                    startDate = startMoment.format(_self.dateFormat.month);
                    endDate = endMoment.format(_self.dateFormat.month);
                    break;
                case "day":
                    new_options = {
                        autoclose: false,
                        language: "ko",
                        changeMonth: true,
                        changeYear: true
                    }
                    startDate = startMoment.format(_self.dateFormat.day);
                    endDate = endMoment.format(_self.dateFormat.day);
                    break;
                case "quarter":
                    new_options = {
                        format: "yyyy-mm",
                        autoclose: false,
                        viewMode: "months",
                        minViewMode: "months",
                        forceParse: false,
                        language: "ko-quarter",
                        changeMonth: true,
                        changeYear: true
                    }
                    startDate = startMoment.format(_self.dateFormat.month);
                    endDate = endMoment.format(_self.dateFormat.month);
                    break;
                  default:
                	  startDate = startMoment.format(_self.dateFormat.month);
                      endDate = endMoment.format(_self.dateFormat.month);
            	  break;
            }

            //$(_self.modal).modal('hide');
            $(_self.datepickerConfig.datepicker).datepicker("destroy");
            $(_self.datepickerConfig.datepicker).each(function () {
            	new_options.endDate = new Date();
                var $el = $(this).datepicker(new_options);
            })

			// 분기달력 처리
            if (_self.properties.format === 'quarter') {
                $(_self.datepickerConfig.datepicker).addClass('quarterpicker');
                	//startDate = startDate.split("-")[0]+ "-"+ Math.ceil(startDate.split("-")[1]/3.0)+"Q";
                	//endDate = endDate.split("-")[0]+ "-"+ Math.ceil(endDate.split("-")[1]/3.0)+"Q";

                 startDate = startDate.split("-")[0]+ "-"+ _self.getRange(Math.ceil(startDate.split("-")[1]));
        		 endDate = endDate.split("-")[0]+ "-"+ _self.getRange(Math.ceil(endDate.split("-")[1]));
            } else {
                $(_self.datepickerConfig.datepicker).removeClass('quarterpicker');
            }

            if (_self.config.eventType == "double") {
                //$(_self.datepickerConfig.datePickerModal2).modal('show');
                $(_self.datepickerConfig.datePickerModal2).fadeIn("fast");

                $('#datepickerStart').datepicker('setDate', startDate);
                $('#datepickerEnd').datepicker('setDate', endDate);

                $('#datepickerStart').on('changeDate', function (e) {

                	_self.initFlag = true;
                	_self.properties.seletStartDate = e.date;
                	my_range.reset();
                 	my_range.update({
                         type: _self.properties.format,
                         from: new Date(_self.properties.seletStartDate).valueOf(),
                         to: new Date(_self.properties.seletEndDate).valueOf(),
                         prettify: _self.tsToDate,
                     });
                });

                $('#datepickerEnd').on('changeDate', function (e) {
                    if (_self.properties.seletStartDate > e.date) {
                        alert("종료일자는 시작일자 이전으로 선택할수 없습니다.");
                        $('#datepickerEnd').datepicker('setDate', endDate);
                        return;
                    }else{
                    	_self.initFlag = true;
                    	_self.properties.seletEndDate = e.date;
                     	my_range.update({
                             type: _self.properties.format,
                             from: new Date(_self.properties.seletStartDate).valueOf(),
                             to: new Date(_self.properties.seletEndDate).valueOf(),
                             prettify: _self.tsToDate,
                             format: _self.properties.format
                         });
                    }
                });

            } else {

                $(_self.datepickerConfig.datePickerModal1).modal('show');
                $('#singleDatepicker').datepicker('setDate', moment(_self.properties.seletStartDate).format(_self.config.format));


                $('#singleDatepicker').off();
                $('#singleDatepicker').on('changeDate', function (e) {
                	_self.properties.seletStartDate = e.date;


                	my_range.reset();
                 	my_range.update({
                         type: _self.properties.format,
                         from: new Date(e.date).valueOf(),
                         to: new Date(_self.properties.seletStartDate).valueOf(),
                         prettify: _self.tsToDate,
                     });
                });
            }
            _self.setColorCalrendar();
        },
        getRange:function(month){
        	var v;
        	if(month>1 && month<=3){
        		v = 1;
        	}else if(month>4 && month<=6){
        		v = 4;
        	}else if(month>7 && month<=9){
        		v = 7;
        	}else{
        		v = 10;
    		}
        	return v;
        },
        converterDateSingle:function(date){
        	var _self = this;

        	if(date.length==4){ //year
        		var startDate = moment(date).format(_self.dateFormatForApi['year']);
            	var endDate = moment(startDate).endOf('month').format(_self.dateFormatForApi['year']);
            	$('#startDate').val(startDate+"0101");
            	$('#endDate').val(endDate+"1231");

        	} else if(date.length==6){  //month || 분기일때
        		if(_self.properties.format=="quarter"){
        			var dateArr = date.split("Q");
                	$('#startDate').val(moment(dateArr[0],'YYYYQ').startOf('quarter').format(_self.dateFormatForApi['day']));
                	$('#endDate').val(moment(dateArr[0],'YYYYQ').endOf('quarter').format(_self.dateFormatForApi['day']));
        		}else{
        			var startDate = moment(date).format(_self.dateFormatForApi['month']);
                	var endDate = moment(startDate).endOf('month').format(_self.dateFormatForApi['day']);
                	$('#startDate').val(startDate);
                	$('#endDate').val(endDate);
        		}
        	}else{ //일
        		$('#startDate').val(date);
            	$('#endDate').val(date);
        	}
        },
        converterDateDouble:function(startDate, endDate){
        	var _self = this;
        	var dateArr1 = startDate.split("Q");
			var dateArr2 = endDate.split("Q");
			debugger;
			if(document.querySelector(".navLeftTab .active").innerText==='관리청'){
                var dateStartEleId='startDate';
                var dateEndEleId='endDate';
            }else if(document.querySelector(".navLeftTab .active").innerText==='비관리청'){
                var dateStartEleId='startDateBmng';
                var dateEndEleId='endDateBmng';
            }

        	if(startDate.length==4){ //year
        		var startDate = moment(startDate).format(_self.dateFormatForApi['year']);
            	var endDate = moment(endDate).endOf('month').format(_self.dateFormatForApi['year']);
            	$('#'+dateStartEleId).val(startDate+"0101");
            	$('#'+dateEndEleId).val(endDate+"1231");

        	} else if(startDate.length==6){  //month || 분기일때
        		if(_self.properties.format=="quarter"){
                	$('#'+dateStartEleId).val(moment(dateArr1[0],'YYYYQ').startOf('quarter').format(_self.dateFormatForApi['day']));
                	$('#'+dateEndEleId).val(moment(dateArr2[0],'YYYYQ').endOf('quarter').format(_self.dateFormatForApi['day']));

        		}else{
        			var startDate = moment(dateArr1,'YYYYMM').startOf('month').format(_self.dateFormatForApi['day']);
                	var endDate = moment(dateArr2,'YYYYMM').endOf('month').format(_self.dateFormatForApi['day']);
                	$('#'+dateStartEleId).val(startDate);
                	$('#'+dateEndEleId).val(endDate);
        		}
        	}else{ //일
        		
        		;
        		$('#'+dateStartEleId).val(moment(startDate).format('YYYY.MM.DD'));
            	$('#'+dateEndEleId).val(moment(endDate).format('YYYY.MM.DD'));
        	}
        },
        // 선택완료 버튼 클릭 시
        complete: function (elem) {
            debugger;
        	var _self = this;
        		_self.format = _self.properties.format;
        		$("#periodGbn").val($("select[name='periodSlider'] option:selected").val());
        		$("#btn_calrendar").text($("select[name='periodSlider'] option:selected").text());
    		if (elem.name == "completeSlider") {
                // 슬라이더 화면에서 선택완료
                var slider = _self.rangeSliderConfig.rangeSlider.data("ionRangeSlider");
                var from = slider.result.from;
                var to = slider.result.to;
                if (_self.config.eventType == "double") {

                	var startDate = moment(new Date(_self.properties.seletStartDate).valueOf()).format(_self.dateFormatForApi[_self.properties.format]);
                	var endDate = moment(new Date(_self.properties.seletEndDate).valueOf()).format(_self.dateFormatForApi[_self.properties.format]);


                	_self.converterDateDouble(startDate,endDate);
                	//$('#speriod').val(_self.tsToDate(new Date(_self.properties.seletStartDate).valueOf()) +" ~ "+ _self.tsToDate(new Date(_self.properties.seletEndDate).valueOf()));

                	//관리청 비관리청 분기처리
                    if(document.querySelector(".navLeftTab .active").innerText==='관리청'){
                        $('#speriod').val(_self.tsToDate(new Date(_self.properties.seletStartDate).valueOf()) +" ~ "+ _self.tsToDate(new Date(_self.properties.seletEndDate).valueOf()));
                    }else if(document.querySelector(".navLeftTab .active").innerText==='비관리청'){
                        $('#speriodBmng').val(_self.tsToDate(new Date(_self.properties.seletStartDate).valueOf()) +" ~ "+ _self.tsToDate(new Date(_self.properties.seletEndDate).valueOf()));
                    }
                } else {
                	var date = moment(new Date(_self.properties.seletStartDate).valueOf()).format(_self.dateFormatForApi[_self.properties.format]);
                	//싱글..
                	_self.converterDateSingle(date);
                	//관리청 비관리청 분기처리
                    if(document.querySelector(".navLeftTab .active").innerText==='관리청'){
                        $('#speriod').val(_self.tsToDate(new Date(_self.properties.seletStartDate).valueOf()));
                    }else if(document.querySelector(".navLeftTab .active").innerText==='비관리청'){
                        $('#speriodBmng').val(_self.tsToDate(new Date(_self.properties.seletStartDate).valueOf()));
                    }

                }
            } else {

                // 달력 화면에서 선택완료
                if (_self.config.eventType == "double") {

                	var startDate = moment(new Date(_self.properties.seletStartDate).valueOf()).format(_self.dateFormatForApi[_self.properties.format]);
                	var endDate = moment(new Date(_self.properties.seletEndDate).valueOf()).format(_self.dateFormatForApi[_self.properties.format]);
                		_self.converterDateDouble(startDate,endDate);
                	//$('#speriod').val(_self.tsToDate(new Date(_self.properties.seletStartDate).valueOf()) +" ~ "+ _self.tsToDate(new Date(_self.properties.seletEndDate).valueOf()));

                    //관리청 비관리청 분기처리
                    if(document.querySelector(".navLeftTab .active").innerText==='관리청'){
                        $('#speriod').val(moment(new Date(_self.properties.seletStartDate).valueOf()).format('YYYY.MM.DD') +" ~ "+ _self.tsToDate(new Date(_self.properties.seletEndDate).valueOf()));
                    }else if(document.querySelector(".navLeftTab .active").innerText==='비관리청'){
                        $('#speriodBmng').val(moment(new Date(_self.properties.seletStartDate).valueOf()).format('YYYY.MM.DD') +" ~ "+ _self.tsToDate(new Date(_self.properties.seletEndDate).valueOf()));
                    }

                } else {
                	var date = moment(new Date(_self.properties.seletStartDate).valueOf()).format(_self.dateFormatForApi[_self.properties.format]);
                	_self.converterDateSingle(date);
                    //관리청 비관리청 분기처리
                    if(document.querySelector(".navLeftTab .active").innerText==='관리청'){
                        $('#speriod').val(_self.tsToDate(new Date(_self.properties.seletStartDate).valueOf()));
                    }else if(document.querySelector(".navLeftTab .active").innerText==='비관리청'){
                        $('#speriodBmng').val(_self.tsToDate(new Date(_self.properties.seletStartDate).valueOf()));
                    }



                }
            }
            //$(elem).parents(".modal").modal('hide');
            $(".datemodal").css('display','');


            //관리청 비관리청 분기처리
            if(document.querySelector(".navLeftTab .active").innerText==='관리청'){
                MapData.setSearchEvt();
            }else if(document.querySelector(".navLeftTab .active").innerText==='비관리청'){
                MapData.setSearchEvtBmng();
            }

        }
	}
	window.Calrendar = Calrendar;
	window.name = "Calrendar.js";
})(window, jQuery);