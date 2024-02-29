(function(window, $) {
	"use strict";
	var ReferenceNameType = "";
	var ReferenceNameType_og = "";
	var SearchName = "";
	var SearchName_og = "";
	var addr = "";
	var tempArray = new Array();
	var roadTyTempArray = new Array();
	var MapData = {
		/**
		 * 상단 진행공사,국도공사,도로개설,시설물,준공예정 카운터 조회
		 */
		setMapWidget : function() {
			var _self = this;
			setTimeout(function() {
				ToolBarCnt.setToolbar1();
				ToolBarCnt.setToolbar2();
				ToolBarCnt.setToolbar3();
				ToolBarCnt.setToolbar4();
				ToolBarCnt.setToolbar5();
			}, 200);
		},
		/**
		 * 공사현황 조회
		 */
		setSearchEvt : function(currPage) {
		    console.info("setSearchEvt")

			// sns 마커 삭제
			var layer = mapInit.mapLayerMng.getLayerById('snstempLayer');
			mapInit.map.removeLayer(layer);

			var color = mapInit.mapTheme.getIsActiveMenu();
			if (color == "purple") {
				$("input:radio[name='dRadio']:radio[value='stdr_dt']").prop(
						'checked', true);
			}

			$("#content1Plus").css("display", "none");
			var _self = this;

			_self.setMapWidget(); // 진행공사 건수 조회

			// 툴바 엑티브
			mapInit.mapTheme.setToolbarActive();

			if ($.isNullString(currPage)) {
				currPage = "1";
				$('ul[name="contents1"]').empty();
				G.contents1CurrPage = 1;
				$('.mRsList1').scrollTop(0);

			}

			var listCnt = "10";
			var startDt = $('#startDate').val().replace(/[.]/g, "");
			var endDt = $('#endDate').val().replace(/[.]/g, "");
			var collection = "tb_analysis_info";
			var searchText = $("#mSearchText").val();
			var startPage = String((parseInt(currPage) - 1) * parseInt(listCnt));
			var chekPeriod = $('input:radio[name=dRadio]:checked').val(); // 공고일,예상공사기간 체크 여부,
			// 공사기간
			var sidoCd = $('#sidoAreaCombo option:selected').val(); // 지역콤보
			var roadTyCd = $('#roadTyCombo option:selected').val(); // 공사콤보
			var prdtReliCd = $('#prdtReliCombo option:selected').val(); // 신뢰도
			// 콤보
			var authNo = $('#authNo').val();
			var resultNoArr = [];
			var data = new Object();

			var radioVal = "";
			var order = "stdr_dt desc"
			var keyword = "";

			if ($.isNullString(color) || color == "blue") {
				if (chekPeriod == "bidntcedt") {
					radioVal = 'bidntcedt'; // 공고일
					order = "bidntcedt desc"
					keyword = "bidntcedt:[" + startDt + " TO " + endDt + "]"
				} else if (chekPeriod == "stdr_dt") {
					radioVal = 'forecast_st_dt'; // 공사기간
					order = "bidntcedt desc"
					keyword = "forecast_st_dt :[" + startDt + " TO " + endDt
							+ "] OR forecast_end_dt:[" + startDt + " TO "
							+ endDt + "]"
				} else {
					radioVal = 'thtm_ccmplt_date'; // 공사기간
					order = "thtm_ccmplt_date desc"
					// keyword = "cbgn_date:["+startDt+ " TO " +endDt+"] OR
					// thtm_ccmplt_date:["+startDt+" TO "+endDt+"]"
					keyword = "thtm_ccmplt_date:[" + startDt + " TO " + endDt
							+ "]"
				}
			} else if (color == "green") {
				if (chekPeriod == "bidntcedt") {
					radioVal = 'bidntcedt'; // 공고일
					order = "bidntcedt desc"
					keyword = "bidntcedt:[" + startDt + " TO " + endDt
							+ "] AND const_road_clss:161"
				} else if (chekPeriod == "stdr_dt") {
					radioVal = 'forecast_st_dt'; // 공사기간
					order = "bidntcedt desc"
					keyword = "forecast_st_dt :[" + startDt + " TO " + endDt
							+ "] OR forecast_end_dt:[" + startDt + " TO "
							+ endDt + "] AND const_road_clss:161"
				} else {
					radioVal = 'thtm_ccmplt_date'; // 공사기간
					order = "thtm_ccmplt_date desc"
					// keyword = "cbgn_date:["+startDt+ " TO " +endDt+"] OR
					// thtm_ccmplt_date:["+startDt+" TO "+endDt+"] AND
					// const_road_clss:161"
					keyword = "thtm_ccmplt_date:[" + startDt + " TO " + endDt
							+ "] AND const_road_clss:161"
				}
			} else if (color == "yellow") {
				data.roadTypeCd = "19 24 36 37 39 47 48";
				if (chekPeriod == "bidntcedt") {
					radioVal = 'bidntcedt'; // 공고일
					order = "bidntcedt desc"
					keyword = "bidntcedt:[" + startDt + " TO " + endDt + "]"
				} else if (chekPeriod == "stdr_dt") {
					radioVal = 'forecast_st_dt'; // 공사기간
					order = "bidntcedt desc"
					keyword = "forecast_st_dt :[" + startDt + " TO " + endDt
							+ "] OR forecast_end_dt:[" + startDt + " TO "
							+ endDt + "]"
				} else {
					radioVal = 'thtm_ccmplt_date'; // 공사기간
					order = "thtm_ccmplt_date desc"
					// keyword = "cbgn_date :["+startDt+ " TO " +endDt+"] OR
					// thtm_ccmplt_date:["+startDt+" TO "+endDt+"]"

					keyword = "thtm_ccmplt_date:[" + startDt + " TO " + endDt
							+ "]"
				}

			} else if (color == "pink") {
				data.facTypeCd = "*:*";
				if (chekPeriod == "bidntcedt") {
					radioVal = 'bidntcedt'; // 공고일
					order = "bidntcedt desc"
					keyword = "bidntcedt:[" + startDt + " TO " + endDt + "]"
				} else if (chekPeriod == "stdr_dt") {
					radioVal = 'forecast_st_dt'; // 공사기간
					order = "bidntcedt desc"
					keyword = "forecast_st_dt :[" + startDt + " TO " + endDt
							+ "] OR forecast_end_dt:[" + startDt + " TO "
							+ endDt + "]"
				} else {
					radioVal = 'thtm_ccmplt_date'; // 공사기간
					order = "thtm_ccmplt_date desc"
					// keyword = "cbgn_date :["+startDt+ " TO " +endDt+"] OR
					// thtm_ccmplt_date:["+startDt+" TO "+endDt+"]"
					keyword = "thtm_ccmplt_date:[" + startDt + " TO " + endDt
							+ "]"

				}
			} else if (color == "purple") {
				startDt = $.toDayStr();
				endDt = $.calPeriod('aft', 1, 'month').replace(/[-]/g, "");

				/*
				 * startDt = $.calPeriod('pre',1,'month').replace(/[-]/g,"");
				 * endDt =$.toDayStr();
				 */
				order = "bidntcedt desc";
				keyword = "thtm_ccmplt_date:[" + startDt + " TO " + endDt + "]"
				$("#speriod").val(
						$.setDateStrUnderBar(startDt) + "~"
								+ $.setDateStrUnderBar(endDt));
				$("#startDate").val($.setDateStrDot(startDt));
				$("#endDate").val($.setDateStrDot(endDt));
				_calrendar.changeDate('aft', 1, 'month');

			}
			data.startDt = startDt; // 필수
			data.endDt = endDt; // 필수
			data.order = order;
			data.prdtReliCd = prdtReliCd;
			data.authNo = authNo;
			data.prdtReliChk = "Y";
			// 검색어 있을경우 order = order+", "+defalutOrder; 변경하기위해
			if (!$.isNullString(searchText)) {
				data.searchTextYN = "Y";
			}

			if ($.isNullString(searchText) && $.isNullString(sidoCd)) {
				data.searchKeyword = keyword;
			} else if (!$.isNullString(searchText) && $.isNullString(sidoCd)) {
				data.searchKeyword = keyword + " AND (bidntcenm:(" + searchText
						+ ") OR cnstrtsitergnnm:(" + searchText + "))"
				// data.searchKeyword = radioVal+":["+ data.startDt + " TO
				// "+data.endDt+"] AND (bidntcenm:("+searchText+") OR
				// cnstrtsitergnnm:("+searchText+"))"
			} else if ($.isNullString(searchText) && !$.isNullString(sidoCd)) {
				data.searchKeyword = keyword + " AND sido_cd:(" + sidoCd + ")"
				// data.searchKeyword = radioVal+":["+ data.startDt + " TO
				// "+data.endDt+"] AND sido_cd:("+sidoCd+")"
			} else {
				data.searchKeyword = keyword + " AND (bidntcenm:(" + searchText
						+ ") OR cnstrtsitergnnm:(" + searchText
						+ ")) AND sido_cd:(" + sidoCd + ")"
				// data.searchKeyword = radioVal+":["+ data.startDt + " TO
				// "+data.endDt+"] AND (bidntcenm:("+searchText+") OR
				// cnstrtsitergnnm:("+searchText+")) AND sido_cd:("+sidoCd+")"
			}
			/*
			 * if(!$.isNullString(prdtReliCd)){ data.searchKeyword =
			 * data.searchKeyword + " AND loc_prdt_reli_cd:("+prdtReliCd+")";
			 * }else{ if($("#authNo").val() != "1"){ data.searchKeyword =
			 * data.searchKeyword + " AND (loc_prdt_reli_cd:(3) OR
			 * loc_prdt_reli_cd:(2))"; } }
			 */

			 console.info(startPage);
			 console.info(listCnt);
			 console.info(data);
			 console.info(collection);
			_commonSearch
					.getSearchList(
							startPage,
							listCnt,
							data,
							collection,
							function(response) {
							    console.info(response)
								var resultData = response.result;
								var totalCnt = response.totalCnt;

								var html = "";
								if (totalCnt < 1) {
									$(".mapEmptyBox").css("display", "");
									$("#mapEmptyRst").css("display", "");
									$("#mapEmptyReset").css("display", "none");
								} else {
									$(".mapEmptyBox").css("display", "none");
									$("#mapEmptyRst").css("display", "none");
									$("#mapEmptyReset").css("display", "none");
								}

								var sidoArr = [];
								var resultNoArr = [];
								var seqArr = [];
								$("#content2Tot").text(
										"(총  " + $.number(totalCnt) + "건)");
								/* loc_prdt_reli_cd */
								for ( var i in resultData) {
									var obj = new Object();
									resultNoArr.push(resultData[i].resultno);
									seqArr.push(resultData[i].seq);

									obj["sidoCd"] = resultData[i].sido_cd;
									obj["value"] = resultData[i].sido_nm;
									sidoArr[i] = obj;

									html += '<li >';
									html += '<div class="mMarkBox">'
									html += '<span class="gyMark">'
											+ resultData[i].sido_thin_nm
											+ '</span>'

									if (!$.isNullString(resultData[i].bid_type)) {
										if (!String(resultData[i].bid_type)
												.match("RT")) {

											html += '<span class="gnMark">'
													+ String(
															resultData[i].bid_type)
															.substr(0, 2)
													+ '</span>'
										}
									}

									/*
									 * if(!$.isNullString(resultData[i].bid_type)){
									 * html+='<span
									 * class="gnMark">'+String(resultData[i].bid_type).substr(0,2)+'</span>' }
									 */

									if (resultData[i].loc_prdt_reli_cd == "1") {
										html += '<div class="inline listDot" id="listDot'
												+ resultData[i].seq
												+ '" onmouseover="$.listDotHover(\'hover\',this.id)" onmouseout="$.listDotHover(\'out\')"><span class="active"></span><span></span><span></span></div>'
									} else if (resultData[i].loc_prdt_reli_cd == "2") {
										html += '<div class="inline listDot"  id="listDot'
												+ resultData[i].seq
												+ '" onmouseover="$.listDotHover(\'hover\',this.id)" onmouseout="$.mFavorBoxHover(\'out\')" ><span class="active"></span><span class="active"></span><span></span></div>'
									} else {
										html += '<div class="inline listDot"  id="listDot'
												+ resultData[i].seq
												+ '" onmouseover="$.listDotHover(\'hover\',this.id)" onmouseout="$.listDotHover(\'out\')"><span class="active"></span><span class="active"></span><span class="active"></span></div>'
									}
									html += '</div>'
									html += '<div class="mCorBox mt5" style="cursor: pointer;" onclick="MapData.getAnalysisDetail('
											+ resultData[i].resultno
											+ ')"><p>'
											+ resultData[i].bidntcenm
											+ '</p></div>'
									html += '<div class="mAreaBox mt5"><p>'
											+ resultData[i].cnstrtsitergnnm
											+ '</p></div>'
									html += '<div class="mAnnoBox mt15"><span class="mr10">공고일자</span><span>'
											+ $
													.setDateStrUnderBar(resultData[i].bidntcedt)
											+ '</span></div>'
									if (resultData[i].forecast_end_dt == null) {
										html += '<div class="mCorDate"><span class="mr10">공사기간</span><span>'
												+ $
														.setDateStrUnderBar(resultData[i].forecast_st_dt)
												+ '</span></div>'
									} else {
										html += '<div class="mCorDate"><span class="mr10">공사기간</span><span>'
												+ $
														.setDateStrUnderBar(resultData[i].forecast_st_dt)
												+ '~'
												+ $
														.setDateStrUnderBar(resultData[i].forecast_end_dt)
												+ '</span></div>'
									}

									if (resultData[i].thtm_ccmplt_date != null) {
										// 230530 공사계약내용 수정 .setDateStrUnderBar(resultData[i]
										html += '<div class="mCorDate"><span class="mr10">계약공사기간</span><span>'
            									+ $
									                    .setDateStrUnderBar(resultData[i].cbgn_date)
            									+ '~'
            									+ 
                    									resultData[i].thtm_ccmplt_date
            									+ '</span></div>'
									}

									if (!$.isNullString($("#userId").val())) {
										html += '<div class="mFavorBox" id="mFavorBox'
												+ resultData[i].seq
												+ '" onmouseover="$.mFavorBoxHover(\'hover\',this.id)" onmouseout="$.mFavorBoxHover(\'out\')"><div id='
												+ resultData[i].seq
												+ ' class="favorIcon" onclick="MapData.setUpdateUserMyRoadwork(this,'
												+ resultData[i].seq
												+ ');"></div></div>'
									}
									html += '</li>';

								}

								_self.getAnalysisRoadInfo("", resultNoArr,
										roadTyCd);

								for (var i = 0; i < sidoArr.length; i++) {
									tempArray.push(sidoArr[i]);
								}

								for (var i = 0; i < sidoArr.length; i++) {
									tempArray.push(sidoArr[i]);
								}

								tempArray = removeDuplicates(tempArray,
										"sidoCd");
								tempArray = _.sortBy(tempArray, "sidoCd");

								$('#sidoAreaCombo').empty();
								$('#sidoAreaCombo').append(
										"<option value=''>지역 전체</option>");
								for (var count = 0; count < tempArray.length; count++) {
									var option = $("<option value="
											+ tempArray[count].sidoCd + ">"
											+ tempArray[count].value
											+ "</option>");
									$('#sidoAreaCombo').append(option);
								}

								$("#sidoAreaCombo").val(sidoCd);

								$('ul[name="contents1"]').append(html);

								// 등록된 관심목록 active
								if (seqArr.length > 0) {

									_self.getFavorList(seqArr);
								}

								if (response.maxPageCnt == 0) {
									$("#content1Plus").css("display", "none");
								} else {
									if (response.maxPageCnt == currPage) {
										$("#content1Plus").css("display",
												"none");
									} else {
										$("#content1Plus").css("display", "");
									}
								}
							});

		},

		/*비관리청 공사목록 조회*/

		setSearchEvtBmng : function(_this) {
            debugger;
            console.info("setSearchEvtBmng")

            // sns 마커 삭제
            var layer = mapInit.mapLayerMng.getLayerById('snstempLayer');
            mapInit.map.removeLayer(layer);

            var color = mapInit.mapTheme.getIsActiveMenu();
            if (color == "purple") {
                $("input:radio[name='dRadioBmng']:radio[value='stdr_dtBmng']").prop(
                        'checked', true);
            }


            var _self = this;

            _self.setMapWidget(); // 진행공사 건수 조회

            // 툴바 엑티브
            mapInit.mapTheme.setToolbarActive();



         	//startDt = $.calPeriod('pre',3,'month').replace(/[-]/g,"");
            //endDt = $.toDayStr();
            //$("#speriodBmng").val( $.setDateStrUnderBar(startDt) + "~"+ $.setDateStrUnderBar(endDt));
            //$("#startDateBmng").val($.setDateStrDot(startDt));
            //$("#endDateBmng").val($.setDateStrDot(endDt));

            var dateSchGbn = $('input:radio[name=dRadioBmng]:checked').val(); // 점용허가일,예상공사기간 체크 여부
            console.info(dateSchGbn);
            var listCnt = "10";
            var startDt = $('#startDateBmng').val().replace(/[.]/g, "");
            var endDt = $('#endDateBmng').val().replace(/[.]/g, "");

            var searchText = $("#mSearchTextBmng").val();


            // 공사기간
            var sidoCd = $('#sidoAreaComboBmng option:selected').val(); // 지역콤보
            var roadTyCd = $('#roadTyComboBmng option:selected').val(); // 공사콤보

            //더보기 페이징 처리
           var pageNum=document.querySelector('#pageNumBmngList').value;
           console.info("pageNumBmngList");
           console.info(pageNum)

           console.info(_this);//더보기 클릭 검색인 경우
           if(_this === undefined){//더보기 클릭이 아닌 경우
                $('ul[name="contents4"]').empty();//검색목록 섹션 초기화
                $('.mRsList4').scrollTop(0);
                pageNum='1';//페이징 초기화
                document.querySelector('#pageNumBmngList').value=pageNum;

           }else if(_this.innerText==='더보기'){//더보기 페이징 증가 처리
                    pageNum++;
                    document.querySelector('#pageNumBmngList').value=pageNum;
           }



            var jsonobj={};//백단전송파라미터

            jsonobj.dateSchGbn=dateSchGbn;
            jsonobj.sidoCd=sidoCd;
            jsonobj.startDt=startDt;
            jsonobj.endDt=endDt;
            jsonobj.searchText=searchText;
            jsonobj.pageNum=pageNum;


            fetch("/searchBmng", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(jsonobj),
            })
              .then((response) => response.json())
              .then(function(data) {
                        console.info(JSON.stringify(data))

                        var resultData=data.list;
                        var totalCnt=data.listCnt[0].cnt
                        console.info(totalCnt);
                        $("#content2TotBmng").text( "(총  " + $.number(totalCnt) + "건)");

                        var html='';
                        for ( var i in resultData) {

                                var ocpyLoc=resultData[i].ocpyLoc;
                                html += '<li >';
                                html += '<div class="mMarkBox">'
                                html += '<span class="gyMark">'+ resultData[i].mngrNm.substring(0, 2) + '</span>'

                                html += "<div class='mCorBox mt5' style='cursor: pointer;'"+
                                 "onclick=MapData.getAnalysisDetailBmng(" + 'this' + ")><p>" + resultData[i].ocpyLoc   + "</p>"

                                              +"<input class='prmsnNo_InputHidden'type='hidden' value='"+resultData[i].prmsnNo  +"'/>"
                                              +"<input class='mngrNm_InputHidden'type='hidden' value='"+resultData[i].mngrNm  +"'/>"
                                              +"<input class='ocpyArea_InputHidden'type='hidden' value='"+resultData[i].ocpyArea  +"'/>"
                                              +"<input class='ocpyDur_InputHidden'type='hidden' value='"+resultData[i].ocpyDur  +"'/>"
                                              +"<input class='ocpyPerInfo_InputHidden'type='hidden' value='"+resultData[i].ocpyPerInfo  +"'/>"
                                              +"<input class='ocpyPos_InputHidden'type='hidden' value='"+resultData[i].ocpyPos  +"'/>"
                                              +"<input class='prmsnDt_InputHidden'type='hidden' value='"+resultData[i].prmsnDt  +"'/>"
                                              +"<input class='reqDt_InputHidden'type='hidden' value='"+resultData[i].reqDt  +"'/>"
                                              +"<input class='reqType_InputHidden'type='hidden' value='"+resultData[i].reqType  +"'/>"
                                              +"<input class='roadNm_InputHidden'type='hidden' value='"+resultData[i].roadNm  +"'/>"
                                              +"<input class='roadType_InputHidden'type='hidden' value='"+resultData[i].roadType +"'/>"
                                              +"<input class='stateCd_InputHidden'type='hidden' value='"+resultData[i].stateCd  +"'/>"
                                              +"<input class='workEnDt_InputHidden'type='hidden' value='"+resultData[i].workEnDt +"'/>"
                                              +"<input class='workStDt_InputHidden'type='hidden' value='"+resultData[i].workStDt +"'/>"



                                   + "</div>"
                                html += "<div class='mAreaBox mt5'><p>"
                                        + resultData[i].prmsnNo
                                        + '</p></div>'
                                html += '<div class="mAnnoBox mt15"><span class="mr10">허가일자</span><span>'
                                        + $.setDateStrUnderBar(resultData[i].prmsnDt)
                                        + '</span></div>'

                                html += '<div class="mCorDate"><span class="mr10">공사기간</span><span>'
                                            + $.setDateStrUnderBar(resultData[i].workStDt)
                                            + '~'
                                            + $.setDateStrUnderBar(resultData[i].workEnDt)
                                            + '</span></div>'
                               html += '</li>';
                            }//for loop end..
                            $('ul[name="contents4"]').append(html);
                            $("#content4Plus").css("display", "block");




                  });//fetch reponse data 처리 끝
        },

		/**
		 * 공사현황 초기화
		 */
		setSearchEvtRefresh : function() {
		    console.info("setSearchEvtRefresh")
			var _self = this;
			$("#mSearchText").val("");
			$("#dRadio1").prop("checked", true);
			$('#prdtReliCombo option:eq(0)').prop('selected', true);
			this.setSearchEvt();
		},

		/**
         * 비관리청공사현황 초기화
         */
        setSearchEvtRefreshBmng : function() {
            console.info("setSearchEvtRefreshBmng")
            var _self = this;
            $("#mSearchTextBmng").val("");
            $("#dRadio1Bmng").prop("checked", true);
            $('#prdtReliComboBmng option:eq(0)').prop('selected', true);
            this.setSearchEvtBmng();
        },
		/**
		 * 공사목록 조회
		 */
		getAnalysisRoadInfo : function(currPage, resultNoArr, roadTyCd) {

			$(".corDtlBox").hide(); // 싱세보기 팝업
			var resultNoStr = "";
			var _self = this;
			var listCnt = "10";

			if ($.isNullString(currPage)) {
				currPage = "1";
			}
			if ($.isNullString(roadTyCd)) {
				roadTyCd = "";
			}

			if (!$.isNullString(resultNoArr)) {
				listCnt = String(resultNoArr.length);
				for (var i = 0; i < resultNoArr.length; i++) {
					resultNoStr += resultNoArr[i] + ", "
				}
				resultNoStr = $.removeLastComma(resultNoStr);
			}

			var resultNo = "";
			var collection = "tb_analysis_road_info";
			var startPage = String((parseInt(currPage) - 1) * parseInt(listCnt));
			var data = new Object();
			data.order = "stdr_dt desc";

			if ($.isNullString(resultNoStr)) {
				data.searchKeyword = "*:*";
			} else {

				data.searchKeyword = "resultno:(" + resultNoStr + ")";
			}

			var rtnDataArr = [];
			_commonSearch
					.getSearchList(
							startPage,
							listCnt,
							data,
							collection,
							function(response) {
								var resultData = response.result;
								var totalCnt = response.totalCnt;
								var roadTyArr = [];
								for ( var i in resultData) {
									rtnDataArr.push(resultData[i].resultno);
									var obj = new Object();
									obj["roadTyCd"] = resultData[i].road_ty_cd;
									obj["value"] = resultData[i].road_ty_nm;
									roadTyArr[i] = obj;
								}

								for (var i = 0; i < roadTyArr.length; i++) {
									roadTyTempArray.push(roadTyArr[i]);
								}

								roadTyTempArray = removeDuplicates(
										roadTyTempArray, "roadTyCd");
								roadTyTempArray = _.sortBy(roadTyTempArray,
										"roadTyCd");

								$('#roadTyCombo').empty();
								$('#roadTyCombo').append(
										"<option value=''>공사 전체</option>");
								for (var count = 0; count < roadTyTempArray.length; count++) {
									var option = $("<option value="
											+ roadTyTempArray[count].roadTyCd
											+ ">"
											+ roadTyTempArray[count].value
											+ "</option>");
									$('#roadTyCombo').append(option);
								}

								$("#roadTyCombo").val(roadTyCd);

							});

		},

		/**
         * 공사목록 상세보기
         */
        getAnalysisDetailBmng : function(fulladdr) {
            console.info("getAnalysisDetailBmng");
            console.info(fulladdr.innerText);
            //항목 요소 클릭 시 해당하는 DATA모두 파라미터 셋팅
            console.info(fulladdr);
            console.info(fulladdr.nextSibling.innerText);
            var ocpyLoc=fulladdr.innerText;
            var prmsnNo=fulladdr.getElementsByClassName('prmsnNo_InputHidden')[0].defaultValue;
            var mngrNm=fulladdr.getElementsByClassName('mngrNm_InputHidden')[0].defaultValue;
            var ocpyArea=fulladdr.getElementsByClassName('ocpyArea_InputHidden')[0].defaultValue;

            var ocpyDur=fulladdr.getElementsByClassName('ocpyDur_InputHidden')[0].defaultValue;
            console.info(ocpyDur)

            var ocpyDurArr=ocpyDur.split(" / ");
            var ocpyDurStr=ocpyDurArr[0]
            var ocpyDurEnd=ocpyDurArr[1]


            var ocpyPerInfo=fulladdr.getElementsByClassName('ocpyPerInfo_InputHidden')[0].defaultValue;
            var ocpyPos=fulladdr.getElementsByClassName('ocpyPos_InputHidden')[0].defaultValue;
            var prmsnDt=fulladdr.getElementsByClassName('prmsnDt_InputHidden')[0].defaultValue;
            var reqDt=fulladdr.getElementsByClassName('reqDt_InputHidden')[0].defaultValue;
            var reqType=fulladdr.getElementsByClassName('reqType_InputHidden')[0].defaultValue;
            var roadNm=fulladdr.getElementsByClassName('roadNm_InputHidden')[0].defaultValue;
            var roadType=fulladdr.getElementsByClassName('roadType_InputHidden')[0].defaultValue;
            var stateCd=fulladdr.getElementsByClassName('stateCd_InputHidden')[0].defaultValue;
            var workEnDt=fulladdr.getElementsByClassName('workEnDt_InputHidden')[0].defaultValue;
            var workStDt=fulladdr.getElementsByClassName('workStDt_InputHidden')[0].defaultValue;
            //항목 요소 클릭 시 해당하는 DATA모두 파라미터 셋팅

            console.info(prmsnNo);


            var fulladdrStr=fulladdr.innerText;
            var stringToArray = fulladdrStr.split(" ");
            console.info("stringToArray")
            console.info(stringToArray)

            var rnChk='N';//도로명주소여부 판단
            var sidoNm='';
            var sggNm='';
            var emdNm='';
            var liNm='';
            var finalJibun='';
            var mountainChk='';
            var jibunPnu='';
            var siExChk='';
            var siTbExChk='N';//검색어에 특별,자치, 광역 시 포함 되어 있는지 체크하는 변수

             if(fulladdrStr.includes("특별")|| fulladdrStr.includes("서울") || fulladdrStr.includes("광역시") || fulladdrStr.includes("자치시")){//특별시인경우
                    siTbExChk='Y'
              }

              var siChkCnt=0;
              for (var i = 0; i < stringToArray.length; i++) {

                    if(stringToArray[i].charAt(stringToArray[i].length - 1)==='시'){//검색 문자열에 시 정보가 존재하는 지 체크

                    }else{//시정보 존재 하지 않을 시
                            siChkCnt++;
                    }

            }
            console.info(stringToArray.length)
            console.info(siChkCnt)
            if(stringToArray.length===siChkCnt){//검사결과 총 문자열 배열에서 시정보 존재 하지 않을 시
                    siExChk='N'
             }else{
                    siExChk='Y'
             }

            //var paramTestArry=[];//점용장소가 리스트형태의 텍스트로 존재 할 시 첫번쨰 항목만 가져오기 위해 체크하는 배열 //배열이 다 차면 for문 중지


            for (var i = 0; i < stringToArray.length; i++) {
                  var str=stringToArray[i]
                    if(str.charAt(str.length - 1)==='도' ||str.includes("특별")|| str.includes("서울") || str.includes("광역시") || str.includes("자치시")){//시도
                        var sidoNm=str;
                        continue;


                  }//추후 광역시 제외 후 시도 목록 정제 필요

                    //시군구
                  if(str.charAt(str.length - 1)==='시'||str.charAt(str.length - 1)==='군'||str.charAt(str.length - 1)==='구'){
                        if(siExChk==='N'){//해당 점용주소 문자열 배열 에 시가없고 군, 구 인경우
                                var sggNm=str;
                                continue;
                        }
                        if(siExChk==='Y' && siTbExChk==='N' && str.charAt(str.length - 1) !=='군'&& str.charAt(str.length - 1)!=='구'){
                        //해당 점용주소 문자열 배열  일반 시 (군,구 아닌 경우)인 경우 시를 가져와야함.
                                var sggNm=str;
                                continue;
                        }
                        if(siExChk==='Y' && siTbExChk==='Y' && str.charAt(str.length - 1) !=='군'&& str.charAt(str.length - 1)!=='구'){
                       //해당 점용주소 문자열 배열  특별관련 시 인 경우 군, 구를 가져와야함
                                 continue;
                        }
                        if(siExChk==='Y' && siTbExChk==='Y' && (str.charAt(str.length - 1) ==='군'|| str.charAt(str.length - 1) ==='구') ){
                       //해당 점용주소 문자열 배열  특별관련 시 인 경우와 군이나 구 일 경우
                                 var sggNm=str;
                                 continue;
                        }

                  }//시군구 분기처리


                  if(str.charAt(str.length - 1)==='길'||str.charAt(str.length - 1)==='로'){
                        var rn=str;
                        rnChk='Y';
                  }
                  if(str.charAt(str.length - 1)==='읍'||str.charAt(str.length - 1)==='면'||str.charAt(str.length - 1)==='동'){
                        var emdNm=str;
                  }
                  if(str.charAt(str.length - 1)==='리'){
                        var liNm=str;
                  }


                  if(rnChk==='Y'){//도로명주소인 경우
                      if(!isNaN(str)  || str.includes('-'))  {//숫자를 포함하는 경우 건물번호를 판별하기위함
                         var buldNo=str;
                         var buldNoArr=buldNo.split('-');
                         if(buldNoArr.length==1){
                            var buldMainNo=buldNoArr[0];
                            var buldSubNo='0';
                         }else{
                           var buldMainNo=buldNoArr[0];
                           var buldSubNo=buldNoArr[1];
                         }


                      }


                  }else{
                      if(str.charAt(str.length - 1)==='번지' || str.includes("번지") || str.includes('-')){
                          var jibun=str;
                          if(jibun.includes('산')){//산인경우
                              mountainChk=2
                          }else{
                              mountainChk=1
                          }
                          var jibunRmvKor=jibun.replace( /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '' ) ;//지번에서 한글제거
                          var finalJibun=jibunRmvKor.replace( ')', '' ).replace( '(', '' );//지번에서 괄호제거
                      }
                  }


            }

            //pnu추출을 위해 지번 본번 부번으로 분리
            var jibunArray = finalJibun.split("-");

            console.info(jibunArray);
            if(jibunArray.length===1){//본번만있는경우
                if(jibunArray[0].length===1){
                    jibunPnu='000'+jibunArray[0]+'0000';
                }
                if(jibunArray[0].length===2){
                    jibunPnu='00'+jibunArray[0]+'0000';
                }
                if(jibunArray[0].length===3){
                    jibunPnu='0'+jibunArray[0]+'0000';
                }
                if(jibunArray[0].length===4){
                    jibunPnu=jibunArray[0]+'0000';
                }

            }//본번만있는경우
            if(jibunArray.length===2){//본번q부번모두 있는경우
                var bon='';
                var bu='';
                 if(jibunArray[0].length===1){
                     bon='000'+jibunArray[0];
                 }
                 if(jibunArray[0].length===2){
                     bon='00'+jibunArray[0]
                 }
                 if(jibunArray[0].length===3){
                     bon='0'+jibunArray[0];
                 }
                 if(jibunArray[0].length===4){
                     bon=jibunArray[0];
                 }//pnu 본번부분정제

                 if(jibunArray[1].length===1){
                      bu='000'+jibunArray[1];
                  }
                  if(jibunArray[1].length===2){
                      bu='00'+jibunArray[1];
                  }
                  if(jibunArray[1].length===3){
                      bu='0'+jibunArray[1];
                  }
                  if(jibunArray[1].length===4){
                      bu=jibunArray[1];
                  }//pnu 부번부분정제

                  jibunPnu=bon+bu;

            }//본번q부번모두 있는경우


            console.info(jibunPnu);



           //GEOM을 가져오기 위한 파라미터 셋팅
           var paramObj={};
           var paramArr=[];

           paramObj.rnChk=rnChk;//도로명주소인지 아닌지 체크
           paramObj.sidoNm=sidoNm;
           paramObj.sggNm=sggNm;
           paramObj.emdNm=emdNm;
           paramObj.liNm=liNm;
           paramObj.jibun=finalJibun;
           paramObj.mountainChk=mountainChk;
           paramObj.jibunPnu=jibunPnu;
           paramObj.mjPnu=mountainChk+jibunPnu;
           paramObj.siExChk=siExChk;
           paramObj.siTbExChk=siTbExChk;
           paramObj.prmsnNo=prmsnNo;
           //새주소도로명부분
           paramObj.rn=rn;
           paramObj.buldNo=buldNo;
           paramObj.buldMainNo=buldMainNo;
           paramObj.buldSubNo=buldSubNo;
           //GEOM을 가져오기 위한 파라미터 셋팅

           console.info("__paramObj");
           console.info(JSON.stringify(paramObj));

           var calsdata="{"+
                            "\"data\":"+
                                "["+
                                    "{\"sidoNm\":\"\",\"sggNm\":\"화순군\",\"emdNm\":\"능주면\",\"liNm\":\"만수리\",\"jibun\":\"565-34\",\"mountainChk\":1,\"jibunPnu\":\"05650034\",\"mjPnu\":\"105650034\",\"siExChk\":\"N\",\"siTbExChk\":\"N\",\"prmsnNo\":\"광주2024-0003\"},"+
                                    "{\"sidoNm\":\"\",\"sggNm\":\"화순군\",\"emdNm\":\"능주면\",\"liNm\":\"만수리\",\"jibun\":\"565-34\",\"mountainChk\":1,\"jibunPnu\":\"05650034\",\"mjPnu\":\"105650034\",\"siExChk\":\"N\",\"siTbExChk\":\"N\",\"prmsnNo\":\"광주2024-0003\"},"+
                                    "{\"sidoNm\":\"\",\"sggNm\":\"화순군\",\"emdNm\":\"능주면\",\"liNm\":\"만수리\",\"jibun\":\"565-34\",\"mountainChk\":1,\"jibunPnu\":\"05650034\",\"mjPnu\":\"105650034\",\"siExChk\":\"N\",\"siTbExChk\":\"N\",\"prmsnNo\":\"광주2024-0003\"}"+
                                 "]"+
                          "}"



            var strParam=JSON.stringify(paramObj);
            if(rnChk==='Y'){//새주소도로명인지 아닌에 따라 url 분리
             var fetchUrl = "/searchBmngGeoFromOcpyLocRn";
            }else{
             var fetchUrl = "/searchBmngGeoFromOcpyLoc";
            }

            //var fetchUrl = "/api/calsdata";
             fetch(fetchUrl, {
                         method: "POST",
                         headers: {
                           "Content-Type": "application/json",
                         },
                         body: strParam,

                       })
                         .then((response) => response.json())
                         .then(function(data) {
                            console.info(data);
                            var geoGeom = data.cnbdList[0].geoGeom;
                            console.info(geoGeom);
                            var feature = (new ol.format.GeoJSON({})).readFeature(geoGeom);
                            console.info(feature);

                            var extent = feature.getGeometry().getExtent();

                            mapInit.map.getView().fit(extent);
                            mapInit.map.getView().setZoom(10);

                            var obj = new Object();
                            obj.type = "analysisDetailBmng";
                            var features= new Array();
                            features.push(feature)
                            mapInit.mapLayerMng.addTempLayer("analysisDetailBmngLayer", features, obj);




                           var html=''
                           html += "<div class='mapPopupWrap corInfoBox ui-draggable' style='display: block; left: 38px; top: -27px;' id='corInfoDiv'>"
                           html +="<div class='mapPopupBox'>"
                           html +="<div class='mapHeader ui-draggable-handle'>"
                           html +="<div class='inline wid50 alginLeft'>"
                                           html +="<img src='/assets/images/icon/wDelp_icon.png' alt='delp' class='mr5'>"
                                           html +="<span>비관리청공사정보</span>"
                                       html +="</div>"
                                       html +="<div class='inline wid50 alginRight'>"
                                        html += '<div class="inline wid50 alginRight"><img src="/assets/images/button/wCloseBtn.png" alt="closeButton" name= "corInfoBox" onclick="MapData.btnClickEvent(\'corInfoBox\');return false;"></div>';                                       html +="</div>"
                                  html +=" </div>"
                                   html +="<div class='mapBody'>"
                                       html +="<div class='corName mMarkBox'>"
                                           html +="<span class='gyMark'>"+mngrNm.substring(0, 2)+"</span>"
                                           html +="<div class='inline listDot'>"
                                               html +="<span class='active'></span>"
                                               html +="<span class='active'></span>"
                                               html +="<span class='active'></span>"
                                           html +="</div><span class='business'>"+ocpyLoc+"</span>"
                                       html +="</div>"
                                       html +="<div class='addrName'>"
                                           html +="<span>"+prmsnNo+"</span>"
                                       html +="</div>"
                                       html +="<div class='AnnoDtl mt20'>"
                                           html +="<div class='corCont inline'>"
                                               html +="<table>"
                                                   html +="<colgroup>"
                                                       html +="<col width=''>"
                                                       html +="<col width=''>"
                                                   html +="</colgroup>"
                                                   html +="<tbody>"

                                                       html +="<tr>"
                                                           html +="<td>허가일</td>"
                                                           html +="<td>"+$.setDateStrUnderBar(prmsnDt)+"</td>"
                                                       html +="</tr>"
                                                       html +="<tr>"
                                                           html +="<td>도로종류</td>"
                                                           html +="<td>"+roadType+"</td>"
                                                       html +="</tr>"
                                                       html +="<tr>"
                                                           html +="<td>노선명</td>"
                                                           html +="<td>"+roadNm+"</td>"
                                                       html +="</tr>"
                                                       html +="<tr>"
                                                          html +="<td>점용면적</td>"
                                                          html +="<td>"+ocpyArea+"</td>"
                                                       html +="</tr>"
                                                       html +="<tr>"
                                                         html +="<td>점용기간</td>"
                                                         html +="<td>"+$.setDateStrUnderBar(ocpyDurStr)+"~"+$.setDateStrUnderBar(ocpyDurEnd)+"</td>"
                                                       html +="</tr>"
                                                       html +="<tr>"
                                                        html +="<td>공사기간</td>"
                                                        html +="<td>"+$.setDateStrUnderBar(workStDt)+"~"+$.setDateStrUnderBar(workEnDt)+"</td>"
                                                       html +="</tr>"
                                                       html +="<tr>"
                                                           html +="<td>점용자주소/성명</td>"
                                                           html +="<td>"+ocpyPerInfo+"</td>"
                                                       html +="</tr>"
                                                   html +="</tbody>"
                                               html +="</table>"
                                           html +="</div>"
                                       html +="</div>"
                                    /*   html +="<div class='mapBtn mt20'>"
                                           html +="<input type='button' value='상세정보' class='funBtn mr5' id='constDetailBtn' onclick='MapData.constDetail(998070);return false;'><input type='button' value='도로대장' class='funBtn mr5' id='layBtn' onclick='MapData.getLayer(998070);return false;'>"
                                       html +="</div>"*/
                                   html +="</div>"
                               html +="</div>"
                           html +="</div>"

                            //var _self=this;
                            MapData.makeInfoWindow( html, ol.extent.getCenter(extent));


                            /* 공사정보 drag */
                            $('.corInfoBox').draggable({
                                handle : '.mapHeader'
                            });








                         });//fetch reponse end









        },

        getCoordDraw : function(resultno) {
            console.info("mapPageGbn");
		    console.info(mapInit);





             mapInit.map.on('singleclick', function(evt) {
                   console.info(evt);

                   var coordinate = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:3857');
                   //let coordinate = evt.coordinate;
                   console.log(coordinate);

                   var feature = new ol.Feature({
                            geometry: new ol.geom.Point(coordinate)
                      });
                  console.info(feature);
                  var img ='/assets/images/map/cor_mark_on.png';
                  var anchor =  [0.5, 46];
                  var style = new ol.style.Style({
                     							image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                     								anchor: anchor,
                     								anchorXUnits: 'fraction',
                     								anchorYUnits: 'pixels',
                     								scale : 1,
                     								src: img//"acc" ?'/assets/images/map/cor_mark_off.png' :'/assets/images/map/marker-icon.png'
                     							}))
                     						});
                  feature.setStyle(style);
                  var features=[];
                  features.push(feature);

                  var layer = new ol.layer.Vector({
                  				title : "coordDrawtest",
                  				id	: "coordDraw",
                  				minResolution: '0',
                  						maxResolution: '1025',
                  								source: new ol.source.Vector({
                  								}),
                  			});
                  layer.getSource().addFeatures(features);
                  mapInit.layer["coordDraw"] = layer;
                  mapInit.map.addLayer(mapInit.layer["coordDraw"]);

                  mapInit.map.addControl(new ol.control.MousePosition({
                    coordinateFormat: function() {

                    },
                    projection: 'EPSG:3857',
                  }));




             });

        },



		/**
		 * 공사목록 상세보기
		 */
		getAnalysisDetail : function(resultno) {
			// 로드뷰 초기화
			MapData.btnClickEvent('roadViewPopup');
			$("#SearchWord_hidden").val();
			$('#resultno').val(resultno);
			MapData.btnClickEvent('corDtlBox');
			var layer = mapInit.mapLayerMng.getLayerById('analysisDetailLayer');
			mapInit.map.removeLayer(layer);
			MapData.btnClickEvent('corDtlBox04');
			// 위치분석참조정보 레이어
			var layer = mapInit.mapLayerMng.getLayerById('git');
			mapInit.map.removeLayer(layer);
			// 도로대장 레이어
			var layer = mapInit.mapLayerMng.getLayerById('layerInfoLayer');
			mapInit.map.removeLayer(layer);
			// 도로대장 범례 레이어
			$("#krrisLayerInfoDiv").hide();
			// 공사위치보정 포인트
			var _self = this;
			_self.isUpdateMap = false;
			var rePositionLayer = mapInit.mapLayerMng
					.getLayerById('rePosition');
			if (!$.isNullString(rePositionLayer)) {
				mapInit.map.removeLayer(rePositionLayer);
			}

			var obj = new Object();
			obj.url = "/rcic/analysis/getAnalysisDetail/" + resultno;

			var dataList = setDefault(obj);
			var features = new Array();
			var wktFormat = mapInit.mapFormat.wkt;
			var moveCnt = 0;

			/* 20.12.29 공사정보 위치포착검색어,참조명칭사전 추가 */
			var arr = MapData.constInfo(resultno);
			var analysiswordStr = "";
			var collectionStr = "";
			for (var i = 0; i < arr.length; i++) {
				if (i == 0) {
					analysiswordStr += arr[i].analysisword;
					collectionStr += arr[i].collectionStr;
				} else {
					// console.log("##"+arr[i].collectionStr+"##",arr[i-1].collectionStr)
					if (arr[i].analysisword != arr[i - 1].analysisword) {
						analysiswordStr += arr[i].analysisword;
					}

					if (arr[i].collectionStr != arr[i - 1].collectionStr) {
						collectionStr += arr[i].collectionStr;
					}
				}
			}
			/* ..//END 20.12.29 공사정보 위치포착검색어,참조명칭사전 추가 */
            debugger;
			$
					.commonAjax(
							dataList,
							'',
							function(response, status, headers, config) {
								var scoreList = response.scoreList;
								var analysisInfoList = response.analysisInfo;
								var locHistList = response.locHistList;
								var change_yn = response.change_yn;
								// console.log(resultno,"getAnalysisDetail",response)
								var tempA = [];
								var features = [];
								var extent;

								if (locHistList.length == 0) {
									if (scoreList.length == 0) {
										var locList = response.locList[0];
										var feature = wktFormat
												.readFeature(locList.geom_wkt);
										feature
												.set(
														"loc_prdt_reli_cd",
														analysisInfoList.loc_prdt_reli_cd);
										features.push(feature);
										var obj = new Object();
										obj.feature = feature;
										tempA.push(obj);
										extent = feature.getGeometry()
												.getExtent();
										mapInit.map.getView().setZoom(8);
										mapInit.map.getView().fit(extent);
									} else {
										for ( var i in scoreList) {
											var idx = scoreList[i];
											var feature = (new ol.format.GeoJSON(
													{}))
													.readFeature(idx.geo_geom);
											if (idx.collection == "tl_road_name") {
												    //feature.getGeometry().transform('EPSG:3857','EPSG:3857');
											} else if (idx.collection == 'tb_cbnd_info') {
												if (String(parseInt(feature.getGeometry().getExtent()[0])).length < 4) {
													feature.getGeometry().transform('EPSG:4326','EPSG:3857');
												}
											}
											feature.set("loc_prdt_reli_cd",analysisInfoList.loc_prdt_reli_cd);
											features.push(feature);
											var obj = new Object();
											obj.score = idx.score;
											obj.feature = feature;
											/*
											 * 추가 신뢰도가 상(우선순위
											 * 국도중심선,연속지적도,새주소,도로명주소 )이 있으면 지도
											 * 이동 상으로 먼저 이동
											 */
											obj.collection = idx.collection;
											switch (idx.collection) {
											case "tb_cbnd_info":
												obj.collectionStr = '연속지적도';
												obj.collectionOrd = 2;
												break;
											case "tl_develop_info":
												obj.collectionStr = '개발지구정보';
												obj.collectionOrd = 5;
												break;
											case "tl_center_line":
												obj.collectionStr = '국도중심선';
												obj.collectionOrd = 1;
												break;
											case "tl_poi_point":
												obj.collectionStr = '관심지점정보';
												obj.collectionOrd = 5;
												break;
											case "tb_srch_addr":
												obj.collectionStr = '새주소';
												obj.collectionOrd = 3;
												break;
											case "tl_road_name":
												obj.collectionStr = '도로명주소';
												obj.collectionOrd = 4;
												break;
											case "tl_road_plan_info":
												obj.collectionStr = '도시계획';
												obj.collectionOrd = 5;
												break;
											case "legaldong_sido":
												obj.collectionStr = '행정구역-시도';
												obj.collectionOrd = 5;
												break;
											case "legaldong_sgg":
												obj.collectionStr = '행정구역-시군구';
												obj.collectionOrd = 5;
												break;
											case "legaldong_emd":
												obj.collectionStr = '행정구역-읍명동';
												obj.collectionOrd = 5;
												break;
											case "legaldong_li":
												obj.collectionStr = '행정구역_리';
												bj.collectionOrd = 5;
												break;
											default:
												collectionStr = '';
												obj.collectionOrd = 5;
												break;
											}
											/*
											 * ../추가 신뢰도가 상(우선순위
											 * 국도중심선,연속지적도,새주소,도로명주소 )이 있으면 지도
											 * 이동 상으로 먼저 이동
											 */

											tempA.push(obj);
										}

										// 신뢰도가 상이 있으면 지도 이동 상으로 먼저 이동
										var tempA = _.sortBy(tempA, "score")
												.reverse();
										var map = mapInit.map;
										if (tempA.length > 0) {
											/*
											 * 추가 신뢰도가 상(우선순위
											 * 국도중심선,연속지적도,새주소,도로명주소 )이 있으면 지도
											 * 이동 상으로 먼저 이동
											 */
											var tempB = _.sortBy(tempA,
													"collectionOrd");
											for ( var t in tempB) {
												if (tempB[t].collectionStr == "국도중심선") {
													extent = tempB[t].feature
															.getGeometry()
															.getExtent();
													mapInit.map.getView()
															.setZoom(8);
													mapInit.map.getView().fit(
															extent);
													break;
												} else if (tempB[t].collectionStr == "연속지적도") {
													extent = tempB[t].feature
															.getGeometry()
															.getExtent();
													mapInit.map.getView()
															.setZoom(8);
													mapInit.map.getView().fit(
															extent);
													break;
												} else if (tempB[t].collectionStr == "새주소") {
													extent = tempB[t].feature
															.getGeometry()
															.getExtent();
													mapInit.map.getView()
															.setZoom(8);
													mapInit.map.getView().fit(
															extent);
													break;
												} else if (tempB[t].collectionStr == "도로명주소") {
													extent = tempB[t].feature
															.getGeometry()
															.getExtent();
													mapInit.map.getView()
															.setZoom(8);
													mapInit.map.getView().fit(
															extent);
													break;
												}

											}
											if ($.isNullString(extent)) {
												extent = tempA[0].feature
														.getGeometry()
														.getExtent();
												mapInit.map.getView()
														.setZoom(8);
												mapInit.map.getView().fit(
														extent);
											}

											/*
											 * ../추가 신뢰도가 상(우선순위
											 * 국도중심선,연속지적도,새주소,도로명주소 )이 있으면 지도
											 * 이동 상으로 먼저 이동
											 */

											/*
											 * extent =
											 * tempA[0].feature.getGeometry().getExtent();
											 * mapInit.map.getView().setZoom(8);
											 * mapInit.map.getView().fit(extent);
											 */

										}
									}
								} else {

									var locHistList = response.locHistList[0];
									var feature = (new ol.format.GeoJSON({}))
											.readFeature(locHistList.geoGeom);
									feature.set("loc_prdt_reli_cd",
											analysisInfoList.loc_prdt_reli_cd);
									features.push(feature);

									var obj = new Object();

									extent = feature.getGeometry().getExtent();
									mapInit.map.getView().setZoom(8);
									mapInit.map.getView().fit(extent);
								}

								$('#corInfoDiv').draggable();
								var htmCont = "";
								htmCont += '<div class="mapPopupWrap corInfoBox" style="display: block;" id="corInfoDiv">';
								htmCont += '<div class="mapPopupBox">';
								htmCont += '<div class="mapHeader">';
								htmCont += '<div class="inline wid50 alginLeft"><img src="/assets/images/icon/wDelp_icon.png" alt="delp" class="mr5"><span>공사정보</span></div>';
								htmCont += '<div class="inline wid50 alginRight"><img src="/assets/images/button/wCloseBtn.png" alt="closeButton" name= "corInfoBox" onclick="MapData.btnClickEvent(\'corInfoBox\');return false;"></div>';
								htmCont += '</div>';
								htmCont += '<div class="mapBody">';
								htmCont += '<div class="corName mMarkBox">';
								htmCont += '<span class="gyMark">'
										+ analysisInfoList.sido_thin_nm
										+ '</span>';

								if (!$.isNullString(analysisInfoList.bid_type)) {
									if (!String(analysisInfoList.bid_type)
											.match("RT")) {
										htmCont += '<span class="mark">'
												+ String(
														analysisInfoList.bid_type)
														.substr(0, 2)
												+ '</span>';
									}
									/*
									 * htmCont += '<span
									 * class="mark">'+String(analysisInfoList.bid_type).substr(0,2)+'</span>';
									 */

									if (analysisInfoList.loc_prdt_reli_cd == "1") {
										htmCont += '<div class="inline listDot"><span class="active"></span><span></span><span></span></div>'
									} else if (analysisInfoList.loc_prdt_reli_cd == "2") {
										htmCont += '<div class="inline listDot"><span class="active"></span><span class="active"></span><span></span></div>'
									} else {
										htmCont += '<div class="inline listDot"><span class="active"></span><span class="active"></span><span class="active"></span></div>'
									}
									htmCont += '<span class="business">'
											+ analysisInfoList.bidntcenm
											+ '</span>';

								} else {
									if (analysisInfoList.loc_prdt_reli_cd == "1") {
										htmCont += '<div class="inline listDot"><span class="active"></span><span></span><span></span></div>'
									} else if (analysisInfoList.loc_prdt_reli_cd == "2") {
										htmCont += '<div class="inline listDot"><span class="active"></span><span class="active"></span><span></span></div>'
									} else {
										htmCont += '<div class="inline listDot"><span class="active"></span><span class="active"></span><span class="active"></span></div>'
									}
									htmCont += '<span class="business">'
											+ analysisInfoList.bidntcenm
											+ '</span>';

								}
								htmCont += '</div>'
								htmCont += '<div class="addrName"><span>'
										+ analysisInfoList.cnstrtsitergnnm
										+ '</span></div>';
								htmCont += '<div class="AnnoDtl mt20">';
								htmCont += '<div class="corCont inline">';
								htmCont += '<table>';
								htmCont += '<colgroup>';
								htmCont += '<col width="">';
								htmCont += '<col width="">';
								htmCont += '</colgroup>';
								htmCont += '<tbody><tr>';
								htmCont += '<td>공고일</td>';
								htmCont += '<td>'
										+ $.setDateStrUnderBar(analysisInfoList.bidntcedt)
										+ '</td>';
								htmCont += '</tr>';
								htmCont += '<tr>';
								htmCont += '<td>공사기간</td>';
								if (analysisInfoList.forecast_end_dt == null) {
									htmCont += '<td>'
											+ $
													.setDateStrUnderBar(analysisInfoList.forecast_st_dt)
											+ '</td>';
								} else {
									htmCont += '<td>'
											+ $
													.setDateStrUnderBar(analysisInfoList.forecast_st_dt)
											+ '~'
											+ $
													.setDateStrUnderBar(analysisInfoList.forecast_end_dt)
											+ '</td>';
								}
								/*
								 * htmCont += '<td>공고종류</td>'; htmCont += '<td>'+analysisInfoList.ntcekindnm+'</td>';
								 */
								htmCont += '</tr>';
								console.log(analysisInfoList)
								if (analysisInfoList.cbgn_date != null) {
									htmCont += '<tr>';
									htmCont += '<td>계약공사기간</td>';
									htmCont += '<td>'
											+ $
													.setDateStrUnderBar(analysisInfoList.cbgn_date)
											+ '~'
											+ $
													.setDateStrUnderBar(analysisInfoList.thtm_ccmplt_date)
											+ '</td>';
									htmCont += '</tr>';
								}

								/* 20.12.29 공사정보 위치포착검색어,참조명칭사전 추가 */
								htmCont += '<tr>';
								htmCont += '<td>위치포착검색어</td>';
								if (change_yn == "N") {
									htmCont += '<td>'
											+ $
													.removeLastComma(analysiswordStr)
											+ '</td>';
								} else {
									if (typeof locHistList.serword != "undefined") {
										htmCont += '<td>' + locHistList.serword
												+ '</td>';
									} else if (typeof locHistList.serword == "undefined") {
										htmCont += '<td></td>';
									}
								}
								htmCont += '</tr>';

								htmCont += '<tr>';
								htmCont += '<td>참조명칭사전</td>';
								if (change_yn == "N") {
									htmCont += '<td>'
											+ $.removeLastComma(collectionStr)
											+ '</td>';
								} else {
									if (locHistList.refDicName == "tb_cbnd_info") {
										htmCont += '<td>연속지적도</td>';
									} else if (locHistList.refDicName == "tl_develop_info") {
										htmCont += '<td>지구단위계획</td>';
									} else if (locHistList.refDicName == "tl_poi_point") {
										htmCont += '<td>지명(POI)</td>';
									} else if (locHistList.refDicName == "tl_road_name") {
										htmCont += '<td>도로명주소(도로구간)</td>';
									}

								}
								htmCont += '</tr>';
								/* ..//END 20.12.29 공사정보 위치포착검색어,참조명칭사전 추가 */

								htmCont += '</tbody></table>';
								htmCont += '</div>';
								/*
								 * htmCont += '<div class="inline"><img
								 * src="/assets/images/icon/road_icon.png"
								 * alt="road"></div>';
								 */
								htmCont += '</div>';
								htmCont += '<div class="mapBtn mt20">';
								htmCont += '<input type="button" value="상세정보" class="funBtn mr5" id="constDetailBtn" onclick="MapData.constDetail('
										+ analysisInfoList.resultno
										+ ');return false;" >';
								if (!$.isNullString($("#userId").val())) {
									htmCont += '<input type="button" value="공사위치보정" class="funBtn mr5" id="ChangeLocationBtn" onclick="MapData.ChangeLocation('
											+ analysisInfoList.seq
											+ ','
											+ analysisInfoList.resultno
											+ ');return false;">';
								}
								htmCont += '<input type="button" value="도로대장" class="funBtn mr5" id="layBtn" onclick="MapData.getLayer('
										+ analysisInfoList.resultno
										+ ');return false;" >';
								htmCont += '</div>';
								htmCont += '</div>';
								htmCont += '</div>';

								if (!$
										.isNullString(mapInit.overlay.overlayTooltipLayer)) {

									mapInit.overlay.overlayTooltipLayer
											.setPosition(undefined);
								}
								_self.makeInfoWindow(htmCont, ol.extent
										.getCenter(extent));

								var obj = new Object();
								obj.type = "analysisDetail";
								mapInit.mapLayerMng.addTempLayer("analysisDetailLayer", features, obj);

								/* 공사정보 drag */
								$('.corInfoBox').draggable({
									handle : '.mapHeader'
								});

								// 흑백이 최대 12레벨만 지원함.
								if ($('.mapKind').find('span.active').attr(
										'val') == "gray") {
									if (mapInit.map.getView().getZoom() >= 12) {
										mapInit.map.getView().setZoom(12);
									}
								}

								// mapInit.mapAction.reSizeZoomBar();

							}, true, function() {
							}, false);

		},
		makeInfoWindow : function(html, coordinate) {

			var _self = this;

			var highlightStyle = new ol.style.Style({
				stroke : new ol.style.Stroke({
					color : '#3399CC',
					width : 3,
				}),
			});
			if (mapInit.overlay.overlayTooltipElement != null) {
				$layerTooltip = $(_self._mapInit.overlay.overlayTooltipElement)
						.find(_self._mapInit.overlay.overlayTooltipAppendElem);
				$layerTooltip.empty();
			}

			var info = mapInit.mapLayerMng.getCurrentOverlay('infoWindowPopUp');
			info.setPosition(undefined);

			$('#infoWindowPopUp').empty();
			$('#infoWindowPopUp').append(html);
			$('#infoWindowPopUp').show();
			var popContainer = document.getElementById('infoWindowPopUp');
			info.setElement(popContainer);
			info.setPosition(coordinate);
			info.setPositioning('top-left');
			info.setOffset([ 20, -50 ]);
		},
		/**
		 * 공사정보 공사예측위치 20.12.29 공사정보 위치포착검색어,참조명칭사전 추가
		 */

		/*
		 * RCIC지도 화면 공사 위치변경 시 새로운 주소 -> 명칭사전 검색
		 * 
		 */

		insertChangeLocation : function() {
			var seq = $('input[id=hid_seq]').val();
			var resultno = $('input[id=hid_resultno]').val();

			mapInit.mapEvtMng.updatePosition(seq, resultno);

			/*
			 * $.swalConfirm("현재 위치로 보정하시겠습니까?",function(flag){ if(flag){ var
			 * ReferenceNameDic = $("#ReferenceNameDic option:selected").val();
			 * var SearchWord = $("#SearchWord").val(); var ChangeReason =
			 * $("#ChangeReason option:selected").val(); var SearchWord_hidden=
			 * $("#SearchWord_hidden").val();
			 * 
			 * if(ReferenceNameDic==""){ $.swal("명칭사전을 선택해주세요."); return; }else
			 * if(ChangeReason==""){ $.swal("변경사유를 선택해주세요."); return; }else
			 * if(SearchWord_hidden==""){ $.swal("공사위치를 선택해주세요."); return; }
			 * 
			 * if(mapInit.mapLayerMng.getLayerById('analysisDetailChangeLocLayer') ==
			 * null){ $.swal("검색어를 다시 입력하고 위치를 지정해주세요."); return; }
			 * 
			 * var _self = this;
			 * 
			 * var seq = $('input[id=hid_seq]').val(); var resultno =
			 * $('input[id=resultno]').val();
			 * 
			 * var obj = new Object(); obj.url =
			 * "/rcic/analysisLocHist/insertAnalysisLocHist";
			 * 
			 * var format = new ol.format.WKT(); var wkt =
			 * format.writeGeometry(mapInit.mapLayerMng.getLayerById('analysisDetailChangeLocLayer').getSource().getFeatures()[0].getGeometry());
			 * obj.geom = String(wkt); obj.locTy = "01"; obj.seq = seq;
			 * obj.resultno = resultno; obj.ReferenceNameDic =
			 * $("#ReferenceNameDic option:selected").val();
			 * obj.ReferenceNameDic_og = $('.corCont table tbody
			 * tr').find("td").eq(7).html(); obj.ChangeReason = $("#ChangeReason
			 * option:selected").val(); obj.SearchWord = SearchWord_hidden;
			 * obj.SearchWord_og = $('.corCont table tbody
			 * tr').find("td").eq(5).html(); obj.Hid_seq = $('#hid_seq').val();
			 * 
			 * var dataList = setDefault(obj);
			 * 
			 * $.commonAjax(dataList,'', function(response, status, headers,
			 * config){ $.swal("보정되었습니다."); $("#corDtlBox04").hide();
			 * infowindowOverLay.setPosition([evt.coordinate[0],evt.coordinate[1]]);
			 * mapInit.map.getView().setCenter([evt.coordinate[0],evt.coordinate[1]]);
			 * _self.isUpdateMap = false; var layer =
			 * mapInit.mapLayerMng.getLayerById('analysisDetailChangeLocLayer');
			 * mapInit.map.removeLayer(layer);
			 * 
			 * },false);
			 * 
			 * }else{ } },500);
			 */
		},

		constInfo : function(resultno) {

			var arr = [];
			var obj = new Object();
			obj.url = "/rcic/analysis/getAnalysisDetail/" + resultno;
			var dataList = setDefault(obj);
			$.commonFalseAjax(dataList, '', function(response, status, headers,
					config) {

				// 위치분석 참조정보
				var list = response.scoreList;
				list = _.sortBy(list, "analysisword");
				var collectionStr = "";
				var collectionStr1 = "";
				var analysisword = "";
				var num = 0;
				for ( var i in list) {

					if (i == 0) {
						var rtnObj = new Object();
						analysisword = list[i].analysisword;
						switch (list[i].collection) {
						case "tb_cbnd_info":
							collectionStr = '연속지적도';
							break;
						case "tl_develop_info":
							collectionStr = '개발지구정보';
							break;
						case "tl_center_line":
							collectionStr = '국도중심선';
							break;
						case "tl_poi_point":
							collectionStr = '관심지점정보';
							break;
						case "tb_srch_addr":
							collectionStr = '새주소';
							break;
						case "tl_road_name":
							collectionStr = '도로명주소';
							break;
						case "tl_road_plan_info":
							collectionStr = '도시계획';
							break;
						case "legaldong_sido":
							collectionStr = '행정구역-시도';
							break;
						case "legaldong_sgg":
							collectionStr = '행정구역-시군구';
							break;
						case "legaldong_emd":
							collectionStr = '행정구역-읍명동';
							break;
						case "legaldong_li":
							collectionStr = '행정구역_리';
							break;
						default:
							collectionStr = '';
							break;
						}

						analysisword = analysisword + ", ";
						collectionStr = collectionStr + ", ";

						rtnObj.analysisword = analysisword;
						rtnObj.collectionStr = collectionStr;

						arr.push(rtnObj);

					} else {

						if (list[i - 1].analysisword == list[i].analysisword) {
							var rtnObj = new Object();
							switch (list[i].collection) {
							case "tb_cbnd_info":
								collectionStr1 = '연속지적도';
								break;
							case "tl_develop_info":
								collectionStr1 = '개발지구정보';
								break;
							case "tl_center_line":
								collectionStr1 = '국도중심선';
								break;
							case "tl_poi_point":
								collectionStr1 = '관심지점정보';
								break;
							case "tb_srch_addr":
								collectionStr1 = '새주소';
								break;
							case "tl_road_name":
								collectionStr1 = '도로명주소';
								break;
							case "tl_road_plan_info":
								collectionStr1 = '도시계획';
								break;
							case "legaldong_sido":
								collectionStr1 = '행정구역-시도';
								break;
							case "legaldong_sgg":
								collectionStr1 = '행정구역-시군구';
								break;
							case "legaldong_emd":
								collectionStr1 = '행정구역-읍명동';
								break;
							case "legaldong_li":
								collectionStr1 = '행정구역_리';
								break;
							default:
								collectionStr1 = '';
								break;
							}
							analysisword = analysisword;
							collectionStr += collectionStr1 + ", ";

							rtnObj.analysisword = analysisword;
							rtnObj.collectionStr = collectionStr;
							arr[num] = rtnObj;

						} else {

							var rtnObj2 = new Object();
							num = parseInt(num) + parseInt(1);
							analysisword = list[i].analysisword;
							switch (list[i].collection) {
							case "tb_cbnd_info":
								collectionStr = '연속지적도';
								break;
							case "tl_develop_info":
								collectionStr = '개발지구정보';
								break;
							case "tl_center_line":
								collectionStr = '국도중심선';
								break;
							case "tl_poi_point":
								collectionStr = '관심지점정보';
								break;
							case "tb_srch_addr":
								collectionStr = '새주소';
								break;
							case "tl_road_name":
								collectionStr = '도로명주소';
								break;
							case "tl_road_plan_info":
								collectionStr = '도시계획';
								break;
							case "legaldong_sido":
								collectionStr = '행정구역-시도';
								break;
							case "legaldong_sgg":
								collectionStr = '행정구역-시군구';
								break;
							case "legaldong_emd":
								collectionStr = '행정구역-읍명동';
								break;
							case "legaldong_li":
								collectionStr = '행정구역_리';
								break;
							default:
								collectionStr = '';
								break;
							}

							analysisword = analysisword + ", ";
							collectionStr = collectionStr + ", ";

							rtnObj2.analysisword = analysisword;
							rtnObj2.collectionStr = collectionStr;
							arr.push(rtnObj2);

						}
					} // else

				} // for

			});

			return arr;

		},
		/**
		 * 공사목록 info 상세보기
		 */
		constDetail : function(resultno) {
			if ($("#constDetailBtn").attr("class").includes('funBtn')) {
				$("#constDetailBtn").attr("class", "linkBtn mr5");
			} else {
				$("#constDetailBtn").attr("class", "funBtn mr5");
				MapData.btnClickEvent('corDtlBox');
				return false;
			}
			var firstFeature;

			// 공사 상세보기
			$(".corDtlBox").css('left', 'calc(50% - 15%)');

			// 상세보기 항상 첫번째 열기
			$("#popupAccordion1").trigger('click');

			var obj = new Object();
			obj.url = "/rcic/analysis/getAnalysisDetail/" + resultno;

			var dataList = setDefault(obj);
			$
					.commonAjax(
							dataList,
							'',
							function(response, status, headers, config) {

								// 공고분석내용
								var data = response.analysisInfo;
								var dataStr = $("#detailForm").serializeArray();
								$("#corDtlResultno").val(data.resultno);
								$("#corDtlSeq").val(data.seq);
								var corDtlBoxTopLeftHtml = "";

								$('#conInfoTbody').empty();
								
								if (!$.isNullString(data.min_cntr_ctcncls_date)) {

									var html = "";
									html += '<tr>';
									html += '<td>'
											+ $
													.setDateStrUnderBar(data.min_cntr_ctcncls_date)
											+ '</td>';
									html += '<td>' + data.coplist + '</td>';
									html += '<td>'
											+ $.number(data.tot_cntr_ct_amt)
											+ '</td>';
									html += '<td>'
											+ $
													.setDateStrUnderBar(data.cbgn_date)
											+ '</td>';
    								html += '<td>' + data.thtm_ccmplt_date + '</td>';
									html += '</tr>';
									$('#conInfoTbody').append(html);
								}

								if (!$.isNullString(data.bid_type)) {

									if (!String(data.bid_type).match("RT")) {
										corDtlBoxTopLeftHtml = '<span class="gMark">'
												+ data.sido_thin_nm
												+ '</span><span class="mark">'
												+ String(data.bid_type).substr(
														0, 2) + '</span>'
									} else {
										corDtlBoxTopLeftHtml = '<span class="gMark">'
												+ data.sido_thin_nm + '</span>'
									}

									/*
									 * corDtlBoxTopLeftHtml = '<span
									 * class="gMark">'+data.sido_thin_nm+'</span><span
									 * class="mark">'+String(data.bid_type).substr(0,2)+'</span>'
									 */
									if (data.loc_prdt_reli_cd == "1") {
										corDtlBoxTopLeftHtml += '<div class="inline listDot"><span class="active"></span><span></span><span></span></div>'
									} else if (data.loc_prdt_reli_cd == "2") {
										corDtlBoxTopLeftHtml += '<div class="inline listDot"><span class="active"></span><span class="active"></span><span></span></div>'
									} else {
										corDtlBoxTopLeftHtml += '<div class="inline listDot"><span class="active"></span><span class="active"></span><span class="active"></span></div>'
									}
								} else {
									corDtlBoxTopLeftHtml = '<span class="gMark">'
											+ data.sido_thin_nm + '</span>'
									if (data.loc_prdt_reli_cd == "1") {
										corDtlBoxTopLeftHtml += '<div class="inline listDot"><span class="active"></span><span></span><span></span></div>'
									} else if (data.loc_prdt_reli_cd == "2") {
										corDtlBoxTopLeftHtml += '<div class="inline listDot"><span class="active"></span><span class="active"></span><span></span></div>'
									} else {
										corDtlBoxTopLeftHtml += '<div class="inline listDot"><span class="active"></span><span class="active"></span><span class="active"></span></div>'
									}
								}
								$("#corDtlBoxTopLeft").html(
										corDtlBoxTopLeftHtml);
								$('span[name="bidntcenm"]')
										.text(data.bidntcenm);
								$
										.each(
												data,
												function(key, value) {
													for (var i = 0; i < dataStr.length; i++) {
														if (dataStr[i].name == key) {
															if (!$
																	.isNullString(value)) {
																$(
																		'input[name="'
																				+ dataStr[i].name
																				+ '"]')
																		.attr(
																				'title',
																				value);
																if (dataStr[i].name == "stdr_dt"
																		|| dataStr[i].name == "forecast_end_dt"
																		|| dataStr[i].name == "analysis_dt"
																		|| dataStr[i].name == "forecast_st_dt") {
																	$(
																			'input[name="'
																					+ dataStr[i].name
																					+ '"]')
																			.val(
																					$
																							.setDateStrUnderBar(value));
																} else if (dataStr[i].name == "presmptprce"
																		|| dataStr[i].name == "bdgtamt") {
																	$(
																			'input[name="'
																					+ dataStr[i].name
																					+ '"]')
																			.val(
																					$
																							.number(value))
																} else {
																	$(
																			'input[name="'
																					+ dataStr[i].name
																					+ '"]')
																			.val(
																					value);
																}
															}
														}
													}
												});
								// 도로대장 관리시스템 갱신일자 셋팅
								/*
								 * $(".corResetClose").click();
								 * 
								 * if(!$.isNullString(response.analysisInfoData.krrisUpdYn)){
								 * $("#popChk").attr("checked", true);
								 * $(".reloadDate").text($.setDateStrDot(response.analysisInfoData.krrisUpdDt));
								 * $("#corDtlDt").datepicker("update",
								 * $.setDateType($.setDateStrDot(response.analysisInfoData.krrisUpdDt)));
								 * }else{ $("#popChk").attr("checked", false);
								 * $("#corDtlDt").datepicker("update", new
								 * Date());
								 * $(".reloadDate").text($("#corDtlDt").val()); }
								 */

								/*
								 * $.each(data, function(key, value){ for (var
								 * i=0; i<dataStr.length; i++) {
								 * if(dataStr[i].name == key){
								 * if(!$.isNullString(value)){ $('input[name="' +
								 * dataStr[i].name +'"]').attr('title', value);
								 * if(dataStr[i].name == "stdr_dt" ||
								 * dataStr[i].name == "forecast_end_dt" ||
								 * dataStr[i].name == "analysis_dt" ||
								 * dataStr[i].name == "bidntcedt"){
								 * $('input[name="' + dataStr[i].name
								 * +'"]').val($.setDateStrUnderBar(value)) }else
								 * if(dataStr[i].name == "presmptprce" ||
								 * dataStr[i].name == "bdgtamt"){
								 * $('input[name="' + dataStr[i].name
								 * +'"]').val($.number(value)) }else
								 * if(dataStr[i].name == "bidntcenm"){
								 * $('span[name="' + dataStr[i].name
								 * +'"]').text(value) $('input[name="' +
								 * dataStr[i].name +'"]').val(value) }else{
								 * $('input[name="' + dataStr[i].name
								 * +'"]').val(value); } } } } });
								 */

								// 위치분석 참조정보
								$('#refInfoTbody').empty();

								var list = response.scoreList;
								// console.log("위치분석 참조정보",list);
								var wktFormat = mapInit.mapFormat.wkt;
								if (list.length == 0) {
									html += '<tr><td colspan="4">정보가 존재하지 않습니다.</td></tr>';
									var locList = response.locList[0];
									var feature = wktFormat
											.readFeature(locList.geom_wkt);
									firstFeature = feature;
								}

								list = _.sortBy(list, "analysisword")
								var idxNum = 0;
								for ( var i in list) {

									var idx = list[i];
									var num = parseInt(i) + parseInt(1);
									if (i == 0) {
										idxNum = num;
										var html = "";
										var feature = (new ol.format.GeoJSON({}))
												.readFeature(idx.geo_geom);
										firstFeature = feature;
										html += '<tr>';
										html += '<td id="num' + i + '">'
												+ idxNum + '</td>';
										html += '<td id="analysisword' + i
												+ '">' + list[i].analysisword
												+ '</td>';
										switch (list[i].collection) {
										case "tb_cbnd_info":
											html += '<td>연속지적도</td>';
											break;
										case "tl_develop_info":
											html += '<td>개발지구정보</td>';
											break;
										case "tl_center_line":
											html += '<td>국도중심선</td>';
											break;
										case "tl_poi_point":
											html += '<td>관심지점정보</td>';
											break;
										case "tb_srch_addr":
											html += '<td>새주소</td>';
											break;
										case "tl_road_name":
											html += '<td>도로명주소</td>';
											break;
										case "tl_road_plan_info":
											html += '<td>도시계획</td>';
											break;
										case "legaldong_sido":
											html += '<td>행정구역-시도</td>';
											break;
										case "legaldong_sgg":
											html += '<td>행정구역-시군구</td>';
											break;
										case "legaldong_emd":
											html += '<td>행정구역-읍명동</td>';
											break;
										case "legaldong_li":
											html += '<td>행정구역_리</td>';
											break;
										default:
											html += '<td></td>';
											break;
										}

										html += '	<td><textarea id="geoInfo" style="display:none">'
												+ list[i].geo_geom
												+ '</textarea>';
										html += '   <img src="/assets/images/map/popLocation.png" alt="location" id="ttt" onclick="MapData.localView(this);return false;"></td>';
										html += '</tr>';

										$('#refInfoTbody').append(html);
									} else {
										var html = "";
										var preNum = parseInt(i) - parseInt(1);
										var curNum = parseInt(i) + parseInt(1);
										if (list[i - 1].analysisword == list[i].analysisword) {

											$("#num" + preNum).addClass(
													"numrowspan");
											$("#analysisword" + preNum)
													.addClass("rowspan");

											html += '<tr>';
											html += '<td id="num' + i
													+ '" class="numrowspan">'
													+ idxNum + '</td>';
											html += '<td id="analysisword' + i
													+ '" class="rowspan">'
													+ list[i].analysisword
													+ '</td>';
											switch (list[i].collection) {
											case "tb_cbnd_info":
												html += '<td>연속지적도</td>';
												break;
											case "tl_develop_info":
												html += '<td>개발지구정보</td>';
												break;
											case "tl_center_line":
												html += '<td>국도중심선</td>';
												break;
											case "tl_poi_point":
												html += '<td>관심지점정보</td>';
												break;
											case "tb_srch_addr":
												html += '<td>새주소</td>';
												break;
											case "tl_road_name":
												html += '<td>도로명주소</td>';
												break;
											case "tl_road_plan_info":
												html += '<td>도시계획</td>';
												break;
											case "legaldong_sido":
												html += '<td>행정구역-시도</td>';
												break;
											case "legaldong_sgg":
												html += '<td>행정구역-시군구</td>';
												break;
											case "legaldong_emd":
												html += '<td>행정구역-읍명동</td>';
												break;
											case "legaldong_li":
												html += '<td>행정구역_리</td>';
												break;
											default:
												html += '<td></td>';
												break;
											}

											html += '	<td><textarea id="geoInfo" style="display:none">'
													+ list[i].geo_geom
													+ '</textarea>';
											html += '   <img src="/assets/images/map/popLocation.png" alt="location" id="ttt" onclick="MapData.localView(this);return false;"></td>';
											html += '</tr>';

										} else {
											idxNum = parseInt(idxNum)
													+ parseInt(1);
											html += '<tr>';
											html += '<td id="num' + i + '">'
													+ idxNum + '</td>';
											html += '<td id="analysisword' + i
													+ '">'
													+ list[i].analysisword
													+ '</td>';
											switch (list[i].collection) {
											case "tb_cbnd_info":
												html += '<td>연속지적도</td>';
												break;
											case "tl_develop_info":
												html += '<td>개발지구정보</td>';
												break;
											case "tl_center_line":
												html += '<td>국도중심선</td>';
												break;
											case "tl_poi_point":
												html += '<td>관심지점정보</td>';
												break;
											case "tb_srch_addr":
												html += '<td>새주소</td>';
												break;
											case "tl_road_name":
												html += '<td>도로명주소</td>';
												break;
											case "tl_road_plan_info":
												html += '<td>도시계획</td>';
												break;
											case "legaldong_sido":
												html += '<td>행정구역-시도</td>';
												break;
											case "legaldong_sgg":
												html += '<td>행정구역-시군구</td>';
												break;
											case "legaldong_emd":
												html += '<td>행정구역-읍명동</td>';
												break;
											case "legaldong_li":
												html += '<td>행정구역_리</td>';
												break;
											default:
												html += '<td></td>';
												break;
											}

											html += '	<td><textarea id="geoInfo" style="display:none">'
													+ list[i].geo_geom
													+ '</textarea>';
											html += '   <img src="/assets/images/map/popLocation.png" alt="location" id="ttt" onclick="MapData.localView(this);return false;"></td>';
											html += '</tr>';
										}
										$('#refInfoTbody').append(html);
									}

									$.genRowspan("numrowspan");
									$.genRowspan("rowspan");

								}

								// 공사 시설종류
								var roadList = response.roadList;
								var facList = response.facList;

								$('#constTbody').empty();

								var roadHtml = "";
								for ( var i in roadList) {
									roadHtml += '<tr>';
									roadHtml += '	<td><img src="data:image/jpeg;base64, '
											+ roadList[i].base64_attr2
											+ '" alt="icon"></td>';
									roadHtml += '	<td>'
											+ roadList[i].road_ty_nm + '</td>';
									roadHtml += '</tr>';
								}

								$('#constTbody').html(roadHtml);
								$('#facTbody').empty();

								var facHtml = "";
								for ( var i in facList) {
									facHtml += '<tr>';
									facHtml += '	<td><img src="data:image/jpeg;base64, '
											+ facList[i].base64_attr2
											+ '" alt="icon"></td>';
									facHtml += '	<td>' + facList[i].fac_ty_nm
											+ '</td>';
									facHtml += '</tr>';
								}

								$('#accTitle').text(
										'공사/시설종류 (' + roadList.length + '건/'
												+ facList.length + '건)');
								$('#facTbody').html(facHtml);

							}, false, function() {
							}, false);

			$(".corDtlBox").show();
			$('#corDtlMap').empty();

			/*
			 * _detailMap = new MapInit('corDtlMap',{ baseMap:'VWorld',
			 * baseMapVislble : true, mapUrl : mapUrl, interactions:{
			 * shiftDragZoom : true, dragPan: true, mouseWheelZoom : true },
			 * mapControl : { elem : "ul.mapCtr_wrap>li span", flag : "class",
			 * arrHandle : ["btn_distanceMeasure", "btn_areaMeasure",
			 * "btn_circle", "btn_reset" , "btn_merge"] }, minZoom:2,
			 * maxZoom:12, zoom:7, center:[14197378.96, 4274375.9], });
			 * _detailMap.mapAction.setVisibilityById("VWorld_gray");
			 * 
			 * if($.isNullString(firstFeature)){
			 * _detailMap.map.getView().setZoom(1);
			 * _detailMap.map.getView().setCenter([14197378.96, 4274375.9]);
			 * 
			 * }else{ var extent = firstFeature.getGeometry().getExtent(); var
			 * obj = new Object(); obj.type="tt";
			 * 
			 * _detailMap.map.getView().fit(extent); //흑백이 최대 12레벨만 지원함.
			 * if(_detailMap.map.getView().getZoom()>=12){
			 * _detailMap.map.getView().setZoom(12); }
			 * 
			 * _detailMap.mapLayerMng.addTempLayer("git",[firstFeature],obj); }
			 */

		},
		/**
		 * 공사목록 info 상세보기
		 */
		ChangeLocation : function(seq, resultno) {
			if ($("#ChangeLocationBtn").attr("class").includes('funBtn')) {
				$("#ChangeLocationBtn").attr("class", "linkBtn mr5");
			} else {
				$("#ChangeLocationBtn").attr("class", "funBtn mr5");
				MapData.btnClickEvent('corDtlBox04');
				return false;
			}

			// 공사 상세보기
			$(".corDtlBox04").css('left', 'calc(50% - 10px)');
			$(".corDtlBox04").css('top', 'calc(12% - 10px)');
			$(".corDtlBox04").show();
			$('#corDtlMap').empty();
			ReferenceNameType = $('.corCont table tbody tr').find("td").eq(7)
					.html();
			SearchName = $('.corCont table tbody tr').find("td").eq(5).html();
			$('#SearchWord').attr('value', SearchName);
			$('#hid_seq').attr('value', seq);
			$('#hid_resultno').attr('value', resultno);

			$("#ReferenceNameDic option:eq(0)").prop("selected", true);
			$("#ChangeReason option:eq(0)").prop("selected", true);
			$("#selectRegion option:eq(0)").prop("selected", true);
			$("#selectRegion2 option:eq(0)").prop("selected", true);
			$("#selectRegion3 option:eq(0)").prop("selected", true);
			$("#selectRegion4 option:eq(0)").prop("selected", true);
			$("#SearchWord").val("");
			$('#test').empty();
			$('#pagination').empty();
			$("#ReferenceNameDic").val('').trigger('change');
			$("#selectRegion").css("width", "139px");
			$("#selectRegion2").css("width", "139px");
			$("#selectRegion3").css("width", "139px");
			$("#selectRegion4").css("width", "139px");

		},
		/**
		 * 도로대장 49종 연계
		 */
		getLayer : function(resultno) {
			if ($("#layBtn").attr("class").includes('linkBtn')) {
				$("#layBtn").attr("class", "funBtn mr5");
				var layer = mapInit.mapLayerMng.getLayerById('layerInfoLayer');
				mapInit.map.removeLayer(layer);
				$("#krrisLayerInfoDiv").hide();
				return;
			}

			var obj = new Object();
			var dataList;
			// obj.url = "/rcic/analysis/getLayerInfo/"+resultno; // localhost
			// obj.url = "/admin/dic/reqLayerInfo/"+resultno; // test
			// obj.url = "http://183.97.173.69:20011/reqLayerInfo/"+resultno; //
			// rcic(개발)
			// obj.url = "http://103.7.190.138:8080/getLayerInfo/"+resultno; //
			// rcic(운영)

			obj.url = "/rcic/analysis/getLayerInfo/" + resultno;
			$
					.ajax({
						method : "GET",
						dataType : "json",
						url : obj.url,
						async : true,
						data : "",
						beforeSend : function() {
							$.showBlock2();
						},
						complete : function() {
							$.hideBlock();
						},
						success : function(response, status, headers, config) {
							if (response.layerDataList.length < 1
									|| response.layerInfo.length < 1
									|| response.layerDataList == undefined) {
								$.swal("검색된 도로대장 데이터가 없습니다.");
								return;
							}
							var features = [];
							var feature;
							var cnt = 0;

							for (var i = 0; i < response.layerDataList.length; i++) {
								var layerData = response.layerDataList[i];
								for (var j = 0; j < layerData.length; j++) {
									feature = (new ol.format.GeoJSON({}))
											.readFeature(layerData[j].geometry);
									feature.getGeometry().transform(
											'EPSG:5179', 'EPSG:3857');
									feature.layNm = layerData[j].layNm;
									feature.layColor = layerData[j].layColor;
									feature.layImg = layerData[j].layImg;
									features.push(feature);
									cnt++;
								}
							}

							if (cnt < 1) {
								$.swal("검색된 도로대장 데이터가 없습니다.");
								return;
							}

							var obj = new Object();
							obj.type = "layerInfoLayer";
							mapInit.mapLayerMng.addTempLayer("layerInfoLayer",
									features, obj);
							$("#layBtn").attr("class", "linkBtn mr5");
							$("#krrisLayerInfoDiv").show();

							if (response.layerInfo != undefined
									&& response.layerInfo.length > 0) {
								var html = "";
								for (var k = 0; k < response.layerInfo.length; k++) {
									// 개발서버
									html += "<tr>";
									if (response.layerInfo[k].layColor != "rgba(255, 0, 0, 1)") {
										html += "<td style='text-align: center;'>"
												+ "<hr style='width:32px; height:2px; background-color:"
												+ response.layerInfo[k].layColor
												+ "'/>" + "</td>";
									} else {
										html += "<td style='text-align: center;'>"
												+ "<img src='data:image/jpeg;base64,"
												+ response.layerInfo[k].layImg
												+ "\'"
												+ "alt='icon'>"
												+ "</td>";
									}
									html += "<td style='text-align: center;'>"
											+ response.layerInfo[k].layNm
											+ "</td>";
									html += "</tr>";
								}
								$("#krrisLayerInfoTbody").html(html);
							}
						},
						error : function(jqXHR, textStatus, errorThrown) {
							if (jqXHR.responseJSON == undefined) {
								alert("에러가 발생했습니다. 관리자에게 문의하세요");
							} else {
								errorFun(jqXHR, textStatus, errorThrown);
							}

						}
					});

			/*
			 * $.ajax({ method : "GET", dataType : "json", url : obj.url, async:
			 * true, data: "", beforeSend: function() { $.showBlock2(); } });
			 */

			/*
			 * var result = "N";
			 * 
			 * var interval = setInterval(function() { if(result == "Y"){
			 * clearInterval(interval); }else{
			 * 
			 * 
			 * obj.url = "/rcic/analysis/getLayerInfo/"+resultno; $.ajax({
			 * method : "GET", dataType: "json", url : obj.url, async: false,
			 * data: "", beforeSend: function() { }, complete: function() { },
			 * success: function(response, status, headers, config) {
			 * if(response.result=="Y"){ $.hideBlock(); result = "Y";
			 * if(response.layerDataList.length < 1 || response.layerInfo.length <
			 * 1 || response.layerDataList == undefined ){ $.swal("검색된 도로대장 데이터가
			 * 없습니다."); return; } var features=[]; var feature; var cnt=0;
			 * 
			 * for(var i=0; i<response.layerDataList.length; i++){ var
			 * layerData = response.layerDataList[i]; for(var j=0; j<layerData.length;
			 * j++){ feature = (new
			 * ol.format.GeoJSON({})).readFeature(layerData[j].geometry);
			 * feature.getGeometry().transform('EPSG:5179', 'EPSG:3857');
			 * feature.layNm = layerData[j].layNm; feature.layColor =
			 * layerData[j].layColor; feature.layImg = layerData[j].layImg;
			 * features.push(feature); cnt++; } }
			 * 
			 * if(cnt < 1){ $.swal("검색된 도로대장 데이터가 없습니다."); return; }
			 * 
			 * var obj = new Object(); obj.type="layerInfoLayer";
			 * mapInit.mapLayerMng.addTempLayer("layerInfoLayer",features, obj);
			 * $("#layBtn").attr("class","linkBtn mr5");
			 * $("#krrisLayerInfoDiv").show();
			 * 
			 * if(response.layerInfo != undefined && response.layerInfo.length >
			 * 0){ var html = ""; for(var k=0; k<response.layerInfo.length;
			 * k++){ // 개발서버 html += "<tr>"; if(response.layerInfo[k].layColor !=
			 * "rgba(255, 0, 0, 1)"){ html += "<td style='text-align: center;'>"+ "<hr style='width:32px; height:2px; background-color:"+response.layerInfo[k].layColor+"'/>" +"</td>";
			 * }else{ html += "<td style='text-align: center;'>"+"<img
			 * src='data:image/jpeg;base64,"+response.layerInfo[k].layImg+"\'"+"alt='icon'>"+"</td>"; }
			 * html += "<td style='text-align: center;'>"+response.layerInfo[k].layNm +"</td>";
			 * html += "</tr>"; } $("#krrisLayerInfoTbody").html(html); } } },
			 * error:function(jqXHR, textStatus, errorThrown){
			 * clearInterval(interval); if(jqXHR.responseJSON == undefined){
			 * alert("에러가 발생했습니다. 관리자에게 문의하세요"); }else{ errorFun(jqXHR,
			 * textStatus, errorThrown); } } }); } }, 1000);
			 */

			/*
			 * var layerDataList = response;
			 * 
			 * if(layerDataList.length < 1 || layerDataList[0].layerInfo.length <
			 * 1 || layerDataList[1] == undefined ||
			 * layerDataList[1].layerData.length < 1){ $.swal("검색된 도로대장 데이터가
			 * 없습니다."); return; }
			 * 
			 * var layer = mapInit.mapLayerMng.getLayerById('layerInfoLayer');
			 * mapInit.map.removeLayer(layer); var features=[]; var feature; var
			 * cnt=0;
			 * 
			 * for(var i=0; i<layerDataList[1].layerData.length; i++){
			 * if(layerDataList[1].layerData[i].features != undefined){ for(var
			 * j=0; j<layerDataList[1].layerData[i].features.length; j++){
			 * feature = (new
			 * ol.format.GeoJSON({})).readFeature(layerDataList[1].layerData[i].features[j].geometry);
			 * feature.getGeometry().transform('EPSG:5179', 'EPSG:3857');
			 * feature.layNm = layerDataList[1].layerData[i].layNm;
			 * feature.layColor = layerDataList[1].layerData[i].layColor;
			 * feature.layImg = layerDataList[1].layerData[i].layImg;
			 * features.push(feature); cnt++; } } }
			 * 
			 * if(cnt < 1){ $.swal("검색된 도로대장 데이터가 없습니다."); return; }
			 * 
			 * var obj = new Object(); obj.type="layerInfoLayer";
			 * mapInit.mapLayerMng.addTempLayer("layerInfoLayer",features, obj);
			 * $("#layBtn").attr("class","linkBtn mr5");
			 * $("#krrisLayerInfoDiv").show();
			 * 
			 * if(layerDataList[0].layerInfo != undefined &&
			 * layerDataList[0].layerInfo.length > 0){ var html = ""; for(var
			 * k=0; k<layerDataList[0].layerInfo.length; k++){ // 운영서버
			 * 
			 * html += "<tr>"; if(layerDataList[0].layerInfo[k].lay_color !=
			 * "rgba(255, 0, 0, 1)"){ html += "<td style='text-align: center;'>"+ "<hr style='width:32px; height:2px; background-color:"+layerDataList[0].layerInfo[k].lay_color+"'/>" +"</td>";
			 * }else{ html += "<td style='text-align: center;'>"+"<img
			 * src='data:image/jpeg;base64,"+layerDataList[0].layerInfo[k].lay_img+"\'"+"alt='icon'>"+"</td>"; }
			 * html += "<td style='text-align: center;'>"+layerDataList[0].layerInfo[k].lay_nm +"</td>";
			 * html += "</tr>";
			 *  // 개발서버 html += "<tr>";
			 * if(layerDataList[0].layerInfo[k].layColor != "rgba(255, 0, 0,
			 * 1)"){ html += "<td style='text-align: center;'>"+ "<hr style='width:32px; height:2px; background-color:"+layerDataList[0].layerInfo[k].layColor+"'/>" +"</td>";
			 * }else{ html += "<td style='text-align: center;'>"+"<img
			 * src='data:image/jpeg;base64,"+layerDataList[0].layerInfo[k].layImg+"\'"+"alt='icon'>"+"</td>"; }
			 * html += "<td style='text-align: center;'>"+layerDataList[0].layerInfo[k].layNm +"</td>";
			 * html += "</tr>"; } $("#krrisLayerInfoTbody").html(html); }
			 */
		},
		/**
		 * SNS 조회
		 */
		getMapSnsList : function(currPage) {
			// 날짜유효성체크
			if (parseInt($('#snsStartDt').val().replace(/[.]/g, "")) > parseInt($(
					'#snsEndDt').val().replace(/[.]/g, ""))) {
				$.swal("종료일자는 시작일자 이전으로 선택할수 없습니다.");
				return false;
			}

			$("#content2Plus").css("display", "none");

			if ($.isNullString(currPage)) {
				currPage = "1";
				$('#content2Ul').empty();
				G.contents2CurrPage = 1;
				$('.mRsList2').scrollTop(0);
			}
			var listCnt = "10";
			var keyword = $('#snsSearchText').val();
			var searchKeyword = "";
			var collection = "tb_sns_info";
			var startDt = $('#snsStartDt').val().replace(/[.]/g, "");
			var endDt = $('#snsEndDt').val().replace(/[.]/g, "");
			var startPage = String((parseInt(currPage) - 1) * parseInt(listCnt));
			var snsAccount = $("#snsAccount option:selected").val();

			if (!$.isNullString(keyword) && !$.isNullString(startDt)
					&& !$.isNullString(endDt) && !$.isNullString(snsAccount)) {
				// searchKeyword = 'stdr_dt:['+startDt+' TO '+endDt+'] AND
				// (sns_content:(공사~) OR sns_content:(도로!) OR sns_content:(사고~)
				// OR sns_content:(국도~) OR sns_content:('+keyword+')) AND
				// sns_account:('+snsAccount+')';
				searchKeyword = 'stdr_dt:[' + startDt + ' TO ' + endDt
						+ '] AND (sns_content:(개통 within) OR sns_content:('
						+ keyword + ')) AND sns_account:(' + snsAccount + ')';
			} else if (!$.isNullString(keyword) && !$.isNullString(startDt)
					&& !$.isNullString(endDt) && $.isNullString(snsAccount)) {
				searchKeyword = 'stdr_dt:[' + startDt + ' TO ' + endDt
						+ '] AND (sns_content:(개통 within)) OR sns_content:('
						+ keyword + '))';
				// searchKeyword = 'stdr_dt:['+startDt+' TO '+endDt+'] AND
				// (sns_content:(공사~) OR sns_content:(도로~) OR sns_content:(사고~)
				// OR sns_content:(국도~) OR sns_content:('+keyword+'))';
			} else if ($.isNullString(keyword) && !$.isNullString(startDt)
					&& !$.isNullString(endDt) && !$.isNullString(snsAccount)) {
				searchKeyword = 'stdr_dt:[' + startDt + ' TO ' + endDt
						+ '] AND (sns_content:개통 within) AND sns_account:('
						+ snsAccount + ')';
				// searchKeyword = 'stdr_dt:['+startDt+' TO '+endDt+'] AND
				// (sns_content:(공사~) OR sns_content:(도로~) OR sns_content:(사고~)
				// OR sns_content:(국도~)) AND sns_account:('+snsAccount+')';
			} else {
				// searchKeyword = 'stdr_dt:['+startDt+' TO '+endDt+'] AND
				// (sns_content:(공사~) OR sns_content:(도로~) OR sns_content:(사고~)
				// OR sns_content:(국도~))';
				searchKeyword = '(sns_content:공사)  OR (sns_content:개통)';
			}
			var data = new Object();
			data.searchKeyword = searchKeyword;
			data.order = "sns_regist_dt";

			_commonSearch
					.getSearchList(
							startPage,
							listCnt,
							data,
							collection,
							function(response) {
								var resultData = response.result;
								var html = "";
								for ( var i in resultData) {
									html += '<li>'
									html += '<div>'
									html += '<div class="inline mThumbBox"><span style="background-image:url('
											+ resultData[i].sns_profile_img
											+ ');"></span></div>'
									html += '<div class="inline mSnsText">'
									html += '<p>' + resultData[i].sns_name
											+ '</p>'
									if (!$.isNullString(resultData[i].geo_wkt)) {
										html += '<div class="twtIconBox" onclick="MapData.getSnsGeom(\''
												+ resultData[i].geo_wkt
												+ '\');">'
										html += '<img src="/assets/images/map/twitter_mark.png" alt="marker">'
										html += '</div>'
									}
									html += '<p>@' + resultData[i].sns_account
											+ '</p>'
									html += '</div>'
									html += '</div>'
									html += '<div class="mSnsDate mt10"><p>'
											+ resultData[i].sns_regist_dt
													.substring(0, 19)
											+ '</p></div>'
									html += '<div class="mSnsCont mt5">'
									html += '<a href = "https://twitter.com/'
											+ resultData[i].sns_account
											+ '" target="_blank"><p>'
											+ resultData[i].sns_content
									if (!$.isNullString(resultData[i].sns_url)) {
										html += '    	' + resultData[i].sns_url
									}
									html += '</p></a>'
									html += '</div>'
									html += '</li>'
								}

								$('#content2Ul').append(html);

								if (response.maxPageCnt == 0) {
									$("#content2Plus").css("display", "none");
								} else {
									if (response.maxPageCnt == currPage) {
										$("#content2Plus").css("display",
												"none");
									} else {
										$("#content2Plus").css("display", "");
									}
								}

							});
		},
		/**
		 * SNS 위치정보
		 */
		getSnsGeom : function(geo_wkt) {
			var layer = mapInit.mapLayerMng.getLayerById('snstempLayer');
			mapInit.map.removeLayer(layer);

			var _self = this;
			mapInit.mapAction.reSizeZoomBar();
			var features = new Array();
			var wktFormat = mapInit.mapFormat.wkt;

			var tempA = [];
			var features = [];

			var feature = wktFormat.readFeature(geo_wkt);

			feature.set("type", "sns");

			features.push(feature);
			var obj = new Object();
			obj.feature = feature;
			tempA.push(obj);

			if (tempA.length > 0) {
				var extent = tempA[0].feature.getGeometry().getExtent();
				mapInit.map.getView().fit(extent);
			}

			var reverse_feature = []
			reverse_feature.push(tempA[0].feature);

			// 흑백이 최대 12레벨만 지원함.
			if ($('.mapKind').find('span.active').attr('val') == "gray") {
				if (mapInit.map.getView().getZoom() >= 12) {
					mapInit.map.getView().setZoom(12);
				}
			}

			var obj = new Object();
			obj.type = "sns";
			mapInit.mapLayerMng.addTempLayer("snstempLayer", reverse_feature,
					obj);

		},
		/**
		 * SNS 조회 초기화
		 */
		getMapSnsListRefresh : function() {
			var _self = this;
			$("#snsSearchText").val("");
			$.selPeriod('1month', 'snsStartDt', 'snsEndDt');
			return false;
			this.getMapSnsList();
		},
		/**
		 * SNS 계정 조회
		 */
		getSnsAccount : function(currPage) {
			$('#snsAccount').empty();
			if ($.isNullString(currPage)) {
				currPage = "1";
			}

			var obj = new Object();
			obj.url = "/rcic/snsAccountInfo/getSnsAccountInfoList";
			obj.useYn = "Y"
			obj.listCnt = "999";
			obj.currPage = currPage;

			var dataList = setDefault(obj);

			$.commonAjax(dataList, '', function(response, status, headers,
					config) {
				var html = "";
				var list = response.list;

				if (list.length == "0") {
					html += '<option value ="">계정 전체</option>'
				}

				for ( var i in list) {
					if (i == 0) {
						html += '<option value ="">계정 전체</option>'
					}
					html += '<option value =' + list[i].accountId + '>'
							+ list[i].accountNm + '</option>'
				}

				$('#snsAccount').html(html);

			}, true);
		},
		/**
		 * 나의 관심목록 조회
		 */
		getMapUserMyRoadwork : function(currPage) {
			$("#content3Plus").css("display", "none");

			if ($.isNullString(currPage)) {
				currPage = "1";
				$('#content3Ul').empty();
				G.contents3CurrPage = 1;
			}

			var obj = new Object();
			obj.url = "/rcic/userMyRoadwork/getUserMyRoadworkList";
			obj.userSeq = $('#userSeq').val();
			obj.listCnt = "10";
			obj.currPage = currPage;

			if ($(".corTopSort").hasClass("active")) { // 최신순 오름차순
				obj.sortGbn = "ASC"
			} else { // 내림차순
				obj.sortGbn = "DESC"
			}
			var dataList = setDefault(obj);

			$
					.commonAjax(
							dataList,
							'',
							function(response, status, headers, config) {
								var html = "";
								var list = response.list;
								$("#content3Tot").text(
										"(총  " + $.number(response.totalCnt)
												+ "건)");

								console.log(list)

								for ( var i in list) {

									html += '<li>'
									// MapData.getAnalysisDetail
									// html+='<li
									// onclick="MapData.getMyRoadworkGeom('+list[i].resultno+');">'

									html += '<div class="mMarkBox"><span class="gyMark">'
											+ list[i].sidoNm + '</span>'
									if (!$.isNullString(list[i].bid_type)) {
										html += '<span class="gnMark">'
												+ String(list[i].bid_type)
														.substr(0, 1)
												+ '</span>'
									}
									html += '<div class="mCorBox mt5" style="cursor: pointer;" onclick="MapData.getAnalysisDetail('
											+ list[i].resultno
											+ ');"><p>'
											+ list[i].bidntcenm + '</p></div>'
									html += '<div class="mAreaBox mt5"><p>'
											+ list[i].cnstrtsitergnnm
											+ '</p></div>'
									html += '<div class="mAnnoBox mt15"><span class="mr10">공고일자</span><span>'
											+ list[i].bidntcedt
													.substring(0, 10)
											+ '</span></div>'
									if (list[i].forecast_end_dt == null) {
										html += '<div class="mCorDate"><span class="mr10">공사기간</span><span>'
												+ list[i].bidntcedt.substring(
														0, 10)
												+ '</span></div>'
									} else {
										html += '<div class="mCorDate"><span class="mr10">공사기간</span><span>'
												+ list[i].bidntcedt.substring(
														0, 10)
												+ '~'
												+ $
														.setDateStrUnderBar(list[i].forecast_end_dt)
												+ '</span></div>'
									}

									if (list[i].thtmCcmpltDate != null) {
										html += '<div class="mCorDate"><span class="mr10">계약공사기간</span><span>'
												+ list[i].chgdt
												+ '~'
												+ list[i].thtmCcmpltDate
												+ '</span></div>'
									}

									html += '<div class="mFavorBox" id="mFavorBox'
											+ list[i].seq
											+ 'favor" onmouseover="$.mFavorBoxHover(\'hover\',this.id)" onmouseout="$.mFavorBoxHover(\'out\')"><div class="favorIcon active" onclick="MapData.setUpdateUserMyRoadwork(this,'
											+ list[i].seq
											+ ',\'favor\'); "></div></div>'

									html += '</li>'
								}

								$('#content3Ul').append(html);

								if (response.maxPageCnt == 0) {
									$("#content3Plus").css("display", "none");
								} else {
									if (response.maxPageCnt == currPage) {
										$("#content3Plus").css("display",
												"none");
									} else {
										$("#content3Plus").css("display", "");
									}
								}
							}, true);
		},
		/**
		 * 나의 관심공사 위치 조회 ( 사용안함) getAnalysisDetail 같이사용
		 */
		getMyRoadworkGeom : function(resultno) {
			var _self = this;
			var obj = new Object();
			obj.url = "/rcic/analysis/getAnalysisDetail/" + resultno;

			var dataList = setDefault(obj);
			var features = new Array();
			var wktFormat = mapInit.mapFormat.wkt;
			$
					.commonAjax(
							dataList,
							'',
							function(response, status, headers, config) {

								var scoreList = response.scoreList;
								var analysisInfoList = response.analysisInfo;

								var tempA = [];
								var features = [];

								if (scoreList.length == 0) {
									var locList = response.locList[0];
									var feature = wktFormat
											.readFeature(locList.geom_wkt);

									features.push(feature);

									var extent = feature.getGeometry()
											.getExtent();
									mapInit.map.getView().fit(extent);

								} else {
									for ( var i in scoreList) {
										var idx = scoreList[i];
										var feature = (new ol.format.GeoJSON({}))
												.readFeature(idx.geo_geom);
										features.push(feature);
										var obj = new Object();
										obj.score = idx.score;
										obj.feature = feature;
										tempA.push(obj);
									}

									var tempA = _.sortBy(tempA, "score")
											.reverse();

									if (tempA.length > 0) {
										var extent = tempA[0].feature
												.getGeometry().getExtent();
										mapInit.map.getView().fit(extent);

									}
								}

								// 흑백이 최대 12레벨만 지원함.
								if ($('.mapKind').find('span.active').attr(
										'val') == "gray") {
									if (mapInit.map.getView().getZoom() >= 12) {
										mapInit.map.getView().setZoom(12);
									}
								}

								var obj = new Object();
								obj.type = "myRoadwork";

								mapInit.mapLayerMng.addTempLayer(
										"snstempLayer", features, obj);

							});

		},

		/**
		 * 나의 관심목록 등록,해제
		 */
		setUpdateUserMyRoadwork : function(elem, seq, gbn) {
			var _self = this;
			$.mFavorBoxHover("out");

			var url = "/rcic/userMyRoadwork/insertUserMyRoadwork";
			var msg = "";
			var obj = new Object();
			/* obj.userSeq = $('#userSeq').val(); */
			obj.seq = String(seq);

			if ($(elem).hasClass("active")) {
				url = "/rcic/userMyRoadwork/deleteUserMyRoadwork";
				msg = "관심공사에 해지되었습니다"
				obj.url = url;

			} else {
				url = "/rcic/userMyRoadwork/insertUserMyRoadwork";
				msg = "관심공사에 추가되었습니다"
				obj.url = url;
				/*
				 * obj.registId = $('#userId').val(); obj.updtId =
				 * $('#userId').val();;
				 */
			}

			var dataList = setDefault(obj);

			$.commonAjax(dataList, '', function(response, status, headers,
					config) {
				// console.log("response",response);
				$.swal(msg);
				_self.getMapUserMyRoadwork();
				if (gbn == "favor") {
					_self.setSearchEvt();
				}

			});

		},
		/**
		 * 나의 관심목록 seq로 조회 공사현황 목록 관심등록 active
		 */
		getFavorList : function(seqArr) {
			var seqStr = "";
			if (!$.isNullString(seqArr)) {
				for (var i = 0; i < seqArr.length; i++) {
					seqStr += seqArr[i] + ", "
				}
				seqStr = $.removeLastComma(seqStr);
			}

			var obj = new Object();
			obj.url = "/rcic/userMyRoadwork/getFavorList";
			obj.userSeq = $('#userSeq').val();
			obj.seqArr = seqStr;

			var dataList = setDefault(obj);

			$.commonAjax(dataList, '', function(response, status, headers,
					config) {

				for ( var i in response.list) {
					$("#" + response.list[i].seq).addClass("active");
				}
			});

		},
		/**
		 * 나의 관심 지역 리스트 가져오기
		 */
		myAreaList : function() {

			var _self = this;

			var url = "/rcic/userMyArea/getUserMyAreaList";
			var obj = new Object();
			obj.listCnt = "20"
			obj.url = url;

			var dataList = setDefault(obj);

			$("#myAreaText").val("");

			$
					.commonAjax(
							dataList,
							'',
							function(response, status, headers, config) {

								$("#corBookMarkTbody").empty();
								var resultData = response.list;
								var resultCnt = response.cnt;

								$("#corCnt").val(resultCnt);

								var html = "";
								if (resultData.length <= 0) {
									html += '<tr>'
									html += '<td colspan="3">'
									html += '<div class="bookEmptyBox">'
									html += '<img src="/assets/images/map/icon_empty.png" alt="icon_empty">'
									html += '<p class="mt10">설정된 관심지역이 없습니다.</p>'
									html += '</div>'
									html += '</td>'
									html += '</tr>'
								}

								for ( var i in resultData) {
									var num = parseInt(i) + parseInt(1);
									html += '<tr>'
									html += '<td>' + num + '</td>'
									html += '<td onclick="MapData.myAreaLocation('
											+ resultData[i].centerX
											+ ','
											+ resultData[i].centerY
											+ ','
											+ resultData[i].zoomLv
											+ ')"><p style="cursor: pointer;">'
											+ resultData[i].myAreaNm
											+ '</p></td>'
									html += '<td><input type="checkbox" name="popCheck" id="popChk'
											+ num
											+ '" value='
											+ resultData[i].myAreaNo
											+ '><label for="popChk'
											+ num
											+ '"></label></td>'
									html += '</tr>'

								}

								$("#corBookMarkTbody").html(html);

							});

		},
		/**
		 * 나의 관심지역 삭제
		 */
		myAreaDel : function(gbn) {

			var _self = this;
			var chkMyAreaNoArr = [];
			var chkMyAreaNoStr = "";

			$.swalConfirm("나의 관심 지역을 삭제하시겠습니까?", function(flag) {
				if (flag) {

					$('input:checkbox[name=popCheck]:checked').each(function() { // 체크된
						// 체크박스의
						// value
						// 값을
						// 가지고
						// 온다.
						if (this.value != "on") {
							chkMyAreaNoArr.push(this.value);
						}
					});

					if (!$.isNullString(chkMyAreaNoArr)) {
						for (var i = 0; i < chkMyAreaNoArr.length; i++) {
							chkMyAreaNoStr += chkMyAreaNoArr[i] + ", "
						}
						chkMyAreaNoStr = $.removeLastComma(chkMyAreaNoStr);
					}

					if (gbn == "sel") {
						if (chkMyAreaNoArr.length <= 0) {
							$.swal("삭제할 관심지역을 선택해주세요.");
							return;
						}
					}

					// 최대 10개 까지 저장
					if ($("#corCnt").val() == "10") {
						$.swal("나의 관심지역은 최대 10개까지만 저장됩니다.");
						return false;
					}

					var url = "/rcic/userMyArea/deleteUserMyArea";
					var obj = new Object();
					obj.url = url;
					obj.chkMyAreaNoStr = chkMyAreaNoStr;

					var dataList = setDefault(obj);
					var msg = "관심지역이 삭제되었습니다."
					$.commonAjax(dataList, '', function(response, status,
							headers, config) {
						$.swal(msg);
						_self.myAreaList();

					});

				} else {
					return;
				}
			});

		},
		/**
		 * 나의 관심 지역 저장
		 */
		myAreaSave : function() {

			var _self = this;

			$.swalConfirm("나의 관심 지역으로 저장하시겠습니까?", function(flag) {
				if (flag) {

					if ($.isNullString($("#myAreaText").val())) {
						$.swal("나의 관심지역명을 입력해주세요.");
						return false;
					}

					// 최대 10개 까지 저장
					if ($("#corCnt").val() == "10") {
						$.swal("나의 관심지역은 최대 10개까지만 저장됩니다.");
						return false;
					}

					var url = "/rcic/userMyArea/insertUserMyArea";
					var obj = new Object();
					obj.myAreaNm = $("#myAreaText").val();
					obj.centerX = mapInit.map.getView().getCenter()[0];
					obj.centerY = mapInit.map.getView().getCenter()[1];
					obj.zoomLv = mapInit.map.getView().getZoom();
					obj.url = url;

					var dataList = setDefault(obj);
					var msg = "관심지역 저장되었습니다."
					$.commonAjax(dataList, '', function(response, status,
							headers, config) {
						$.swal(msg);
						_self.myAreaList();

					});

				} else {
					return;
				}
			});

		},
		/*
		 * 나의 관심지역으로 이동
		 */
		myAreaLocation : function(x, y, zoom) {
			mapInit.map.getView().setCenter([ x, y ]);
			mapInit.map.getView().setZoom(zoom);
		},
		/*
		 * 버튼 클릭 EVNET
		 */
		btnClickEvent : function(name) {

			// var name = $(elem).attr('name');
			// var classNm = $(elem).attr('class');

			if (name == "corInfoBox") {
				$(".corInfoBox").hide();
				var layer = mapInit.mapLayerMng.getLayerById('analysisDetailLayer');
				mapInit.map.removeLayer(layer);

				// 위치분석참조정보 레이어
				var layer = mapInit.mapLayerMng.getLayerById('git');
				mapInit.map.removeLayer(layer);

				var rePositionLayer = mapInit.mapLayerMng
						.getLayerById('rePosition');
				mapInit.map.removeLayer(rePositionLayer);

			} else if (name == "corDtlBox") {
				$(".corDtlBox").hide();
				$("#constDetailBtn").attr("class", "funBtn mr5");
			} else if (name == "addrPop") {
				$("#addrPop").hide();
				$("#addrBtnUp").hide();
				$("#addrBtnDown").show();
				_mapArea.legalZoneCancle();
			} else if (name == "corDtlBox04") {
				$(".corDtlBox04").hide();
				$('#SearchWord_hidden').val("");
				$("#ChangeLocationBtn").attr("class", "funBtn mr5");
			} else if (name == "corBookMark") {
				$("#corBookMark").hide();
				var rightCtlImg = $(".rightCtlLi").eq(4).children("img").attr("src").replace("_on", "_off");
				$(".rightCtlLi").eq(4).children("img").attr("src", rightCtlImg);
			} else if (name == "krrisLayerInfoBox") {
				$("#krrisLayerInfoDiv").hide();
			} else if (name == "roadViewPopup") {
				$("#ROADVIEW_o2map-marker").html("");
				$(".roadViewPopup").hide();
				$(".roadViewPopup").prop("style","width:18%;height:40%;");
				var style = "style";
				/*var value = "width:100%;height:300px;"; kyj89_221129주석 */
				var value = "width:100%;height:100%;";
				var _self = mapInit.mapEvtMng;
				
				_self.roadView = false;
				
				$("#roadview").html("");
				$("#roadview").prop(style, value);
				$("#roadview").append("<img style='width:100%;height: inherit;' src='/assets/images/bg/rv_text.png' alt='원하는 위치의 도로를 클릭해 주세요.'>");
				var rightCtlImg = $("#roadViewBtn").children("img").attr("src").replace("_on", "_off");
				$("#roadViewBtn").children("img").attr("src", rightCtlImg);
			}

		},

		// map 상세정보 -> 공사예측위치 -> 위치 버튼 클릭시
		localView : function(elem) {
			var geoInfo = $(elem).parent().find('textarea').val();
			var feature = (new ol.format.GeoJSON({})).readFeature(geoInfo);

			/*
			 * 위치 버튼 여러번 클릭시 레이어가 쌓이는 것을 방지 var layer =
			 * mapInit.mapLayerMng.getLayerById('analysisDetailLayer');
			 * mapInit.map.removeLayer(layer);
			 * 
			 * //위치분석참조정보 레이어 var layer =
			 * mapInit.mapLayerMng.getLayerById('git');
			 * mapInit.map.removeLayer(layer);
			 * 
			 * var rePositionLayer =
			 * mapInit.mapLayerMng.getLayerById('rePosition');
			 * mapInit.map.removeLayer(rePositionLayer);
			 */

			if ($.isNullString(feature)) {
				_detailMap.map.getView().setZoom(1);
				_detailMap.map.getView().setCenter([ 14197378.96, 4274375.9 ]);

			} else {
				var extent = feature.getGeometry().getExtent();
				var obj = new Object();
				obj.type = "tt";

				mapInit.map.getView().fit(extent);
				// 흑백이 최대 12레벨만 지원함.
				if ($('.mapKind').find('span.active').attr('val') == "gray") {
					if (mapInit.map.getView().getZoom() >= 12) {
						mapInit.map.getView().setZoom(12);
					}
				}
				mapInit.mapLayerMng.addTempLayer("git", [ feature ], obj);
				infowindowOverLay.setPosition(ol.extent.getCenter(extent)); // 포지션
				// 이동
			}
		},


		addWmsImgLayer:function(layerNm, visible){//지오서버에서 wms이미지 소스를 겟 한 뒤 지도에 셋팅
                 console.info("addWmsImgLayer");

                //wms 벡터소스 변수 정의->Using TileWMS, label repeated probelms occurs, so change Tile to Image
                 var wmsSource= new ol.source.ImageWMS({
                                          url: Config.geoserverWmsUrl,
                                          //url: MAP.geoserverUrl+'/noper2/wms',
                                          params: {
                                                     //'FORMAT': 'application/openlayers',
                                                     "FORMAT": "image/png",
                                                     "VERSION": "1.1.1",
                                                     "STYLES": '',
                                                     "LAYERS": layerNm,
                                                     //"noper2:noper5174_1200_garo", // "noper2:noper5174_1200_garo",
                                                     //,"noper2:noper5174_1200_sero"
                                                     //"CQL_FILTER": obj.CQL_FILTER,
                                                     tiled: true,
                                                 },

                                          crossOrigin: 'anonymous',
                                          serverType: 'geoserver'
                                      })

                 //wms 벡터레이어 변수 정의->Using Tile, label repeated probelms occurs, so change Tile to Image
                 var wmsLayer = new ol.layer.Image({
                                        id: layerNm+"_id"
                                        ,visible: true
                                        //,declutter: true
                                        ,source: wmsSource
                 });


                debugger;
                if(mapInit.layers===undefined){//초기 실행시 layers전역객체 최초 한번만 선언
                    mapInit.layers={};
                    mapInit.layers.wmsLayers={};
                }
                 mapInit.layers.wmsLayers[layerNm]=wmsLayer;
                 mapInit.map.addLayer(wmsLayer);
                 wmsLayer.setVisible(visible)





        },

        showWmsLayer:function(_this){//지도에 레이어를 보여줌
                console.info(_this);

                var clickedEle=_this;
                var layerNm=clickedEle.getAttribute('id');
                console.info(layerNm);

                if(clickedEle.classList.contains('on')){//버튼 on인경우off
                    clickedEle.classList.remove('on');
                    //clickedEle.children[0].style.color='#FFF';
                    mapInit.layers.wmsLayers[layerNm].setVisible(false);




                }else{//버튼 off인경우 on
                    clickedEle.classList.add('on');
                    //clickedEle.children[0].style.color='#ffee00';
                    mapInit.layers.wmsLayers[layerNm].setVisible(true);



                };







        },

        showNoPrmsnLayerListDiv:function(_this){

            var clickedEle=_this;
            var noPrmsnLayerListDiv=document.querySelector('#noPrmsnLayerListDiv');


            if(clickedEle.classList.contains('on')){//버튼 on인경우off
                clickedEle.classList.remove('on');
                clickedEle.style.backgroundColor='#484d5b';
                noPrmsnLayerListDiv.style.display='none';
            }else{//버튼 off인경우 on
                clickedEle.classList.add('on');
                clickedEle.style.backgroundColor='#ff7f00';
                noPrmsnLayerListDiv.style.display='block';
            }

        }






	}
	window.MapData = MapData;
	window.name = "MapData.js";
})(window, jQuery);