
/********************************************************
 설명  : UI 관제 클래스
 작성자 : 김한욱
 작성일 : 2020.6.01
 *********************************************************/
(function (e) {
    "use strict";
    
//맵 컨트롤 이벤트 셋팅
    $.setMapControlEvt = function () {

        $("ul.mapCtr_wrap>li").on("click", function () {
            var $self = $(this);

            if ($self.hasClass("btn_select")) {      
            	
            	var isValid = mapInit.mapAction.clearAreaGeom();
	          	  if(isValid){
	          		$(".ttip").removeClass("active");
	                $self.addClass("active"); 
	                mapInit.mapAction.allClear();  
	                mapInit.mapAction.startSearchCell();
	          	  }
            } else if ($self.hasClass("btn_areaMeasureRectangle")) {  
            	  var isValid = mapInit.mapAction.clearAreaGeom('geom');
            	  if(isValid){
            		  $.setRemoveSelectIntereaction();
            		  mapInit.mapAction.startMeasure("square");
            		  $(".ttip").removeClass("active");
                      $self.addClass("active"); 
            	  }
            } else if ($self.hasClass("btn_areaMeasureCircle")) { 
            	
            	var isValid = mapInit.mapAction.clearAreaGeom('geom');
	          	  if(isValid){
	          		  $.setRemoveSelectIntereaction();
	          		  mapInit.mapAction.startMeasure("circle");
	          		  $(".ttip").removeClass("active");
	                    $self.addClass("active"); 
	          	  }
            } else if ($self.hasClass("btn_areaMeasure")) { 
            	var isValid = mapInit.mapAction.clearAreaGeom('geom');
	          	  if(isValid){
	          		  $.setRemoveSelectIntereaction();
	          		  mapInit.mapAction.startMeasure("polygon");
	          		  $(".ttip").removeClass("active");
	                    $self.addClass("active"); 
	          	  }
            }
            /*else if ($self.hasClass("btn_reset") ){        //초기화
                mapInit.mapAction.allClear();
            } else if ($self.hasClass("btn_fullView") ){ //풀뷰
                mapInit.mapAction.initCenter(mapInit.baseMap.center);
            } else if($self.hasClass("btn_union")){   //도형 합산
                mapInit.mapAction.setGeometryFn('union');
            }else if($self.hasClass("btn_intersection")){ //도형 교차
                mapInit.mapAction.setGeometryFn('intersection');
            }else if($self.hasClass("btn_difference")){
                mapInit.mapAction.setGeometryFn('difference');  //도형 대치
            }else if($self.hasClass("btn_symDifference")){
                mapInit.mapAction.setGeometryFn('symDifference'); //도형 대치차이
            }else if($self.hasClass("btn_back")){
                mapInit.mapAction.backMeasure();
            } */
            else {
                mapInit.mapAction.allClear();
            }
            
        });
    }

//맵 컨트롤 이벤트 셋팅
    $.setMapOperatorEvt = function () {

        $("ul.mapOpr_wrap>li").on("click", function () {
            var $self = $(this);

            $(".tlt").removeClass("active");
            $self.addClass("active");

            if ($self.hasClass("btn_union")) {   //도형 합산
                mapInit.mapAction.setGeometryFn('union');
            } else if ($self.hasClass("btn_intersection")) { //도형 교차
                mapInit.mapAction.setGeometryFn('intersection');
            } else if ($self.hasClass("btn_difference")) {
                mapInit.mapAction.setGeometryFn('difference');  //도형 대치
            } else if ($self.hasClass("btn_symDifference")) {
                mapInit.mapAction.setGeometryFn('symDifference'); //도형 대치차이
            } else if ($self.hasClass("btn_back")) {
                mapInit.mapAction.backMeasure();
            } else {
                mapInit.mapAction.allClear();
            }
            $(".ttip").removeClass("active");
            $(".tlt").removeClass("active");
            
        });


        $.setUiEvt();
    }


//셀 선택시 중복제거
    $.setRemoveSelectIntereaction = function () {
       // if (mapInit.mapAction.layer.properties.isSearchCellMode) {
            mapInit.mapAction.allClear();
        //}
    }

//맵 기본이벤트
    $.setBaseMapEvt = function (params, baseMapName) {
        //베이스맵
        var $baseMap = $("#baseMap");
        var $baseMapLayer = $("#baseMapLayer");
        var $cellLayers = $("#cellLayers");
        $baseMap.empty();
        $.each(BaseMapConfig, function (idx, lyr) {
            $baseMap.append(new Option(lyr.korName, lyr.name));
        });

        if (baseMapName) $baseMap.val(params.baseMap.name);
       
        $baseMap.off();
        $baseMap.on("change", function () {
            baseMapName = $(this).val();
            $baseMapLayer.show();
            $('#baseMapLayer').val("base");
            mapInit.changeBaseMapWithName($(this).val());
            mapInit.config.initBaseMap = $(this).val();
            $.setBaseMapEvt(mapInit, params, $(this).val());
        });

        //베이스 레이엇
        /*$baseMapLayer.empty();
        $.each(mapInit.baseMap.layers, function (lyrName, lyr) {
            $baseMapLayer.append(new Option(lyr.name, lyrName));
        });
        $baseMapLayer.off();
        $baseMapLayer.on("change", function () {
            var baseMapLayerName = $(this).val();
            
            mapInit.mapAction.offBaseMapLayers();
            
            if (baseMapLayerName == "hybrid") {
                mapInit.mapAction.setVisibilityById("VWorld_" + "satellite"); 
                mapInit.mapAction.setVisibilityById("VWorld_" + baseMapLayerName);
            } else {
            	mapInit.mapAction.setVisibilityById("VWorld_" + baseMapLayerName);
            }
        });*/
        
      //베이스 레이엇
        $('.mapKind span').click(function() {
    		if($(this).hasClass("active")){ $(this).removeClass("active"); return false; }

    		$('#swipeDiv').hide();
    		mapInit.mapAction.offBaseMapLayers();
    		
            $(".mapKind span").removeClass("active");
            $(this).addClass("active");
            
            /*상단 흑백,위성,일반 버튼 클릭시 오른쪽 스와이프 버튼 초기화 */
            var imgStr = $(".rightCtlLi").eq(0).children("img").attr("src");
			if($(".rightCtlLi").eq(0).children("img").attr("src").match("_on")){
				var rightCtlImg = $(".rightCtlLi").eq(0).children("img").attr("src").replace("_on","_off");
				$(".rightCtlLi").eq(0).children("img").attr("src",rightCtlImg);
			}
            
    		$(".mapKind span").each(function(index, item){
    			if($(this).hasClass("active")){
    				var baseMapLayerName = $(this).attr("val");
    				
    				if(baseMapLayerName == "satellite"){
    					var layer = mapInit.mapLayerMng.getLayerById("VWorld_satellite");
	    					layer.on('precompose', function(event) {
						        var ctx = event.context;
						        ctx.restore();
						      });
							
							mapInit.map.render();
							layer.setVisible(true);
							
						var hybridLayer = mapInit.mapLayerMng.getLayerById("VWorld_hybrid");
							hybridLayer.on('precompose', function(event) {
						        var ctx = event.context;
						        ctx.restore();
						      });
							
							mapInit.map.render();
							hybridLayer.setVisible(true);	
							
    				}
    				
    				mapInit.mapAction.setVisibilityById("VWorld_" + baseMapLayerName);
    	            
    			}
    		});
        });
    }   
    var sidoGeom = [];
    var sggGeom = [];
    var emdGeom = [];

    $.setAreaGeom = function (type, obj) {
        if (type == "sido") {
            sidoGeom.push(obj);
        } else if (type == "sgg") {
            sggGeom.push(obj);
        } else if (type == "emd") {
            emdGeom.push(obj);
        }
    }

    $.findGeometry = function (type, id) {
        var obj;
        switch (type) {
            case "sido":
                for (var i in sidoGeom) {
                    if (sidoGeom[i].sidoCd == id) {
                        obj = sidoGeom[i];
                        break;
                    }
                }
                break;
            case "sgg":
                for (var i in sggGeom) {
                    if (sggGeom[i].sggCd == id) {
                        obj = sggGeom[i];
                        break;
                    }
                }
                break;
            case "emd":
                for (var i in emdGeom) {
                    if (emdGeom[i].emdCd == id) {
                        obj = emdGeom[i];
                        break;
                    }
                }
                break;
            default:
                break;
        }
		

       // var center = ol.proj.transform([parseFloat(obj.geom.split(",")[0]), parseFloat(obj.geom.split(",")[1])], "EPSG:3867", mapInit.map.getView().getProjection().getCode());
        return center;
    }
    
    $.setLegalZoneSearchEvt2 = function (emdcd) {
        var $sidoCombo = $("#sidoCombo");
        var $sggCombo = $("#sggCombo");
        var $emdCombo = $("#emdCombo");

        $sidoCombo.empty();
        search.searchOpration({
            collection: 'legaldong_sido',
            numRows: 17
        }, function callback(data) {
            sidoGeom = [];

            $.each(data.docs, function (i, data) {
            	
            	
                var html = "";
                html += '<li>';
                html += '	<a href="#">' + data.sido_nm + '</a>';
                html += '	<input type="hidden" name="sidoCd" value="' + data.sido_cd + '">'
                html += '</li>';
                $sidoCombo.append(html)

                var obj = new Object();
                obj.sidoCd = data.sido_cd;
                obj.geom = data.geom;
                $.setAreaGeom('sido', obj);
            });

            setTimeout(function(){
            	
            	 if (!$.isNullString(emdcd)) {
                     //$sidoCombo.val(emdcd.substring( 0, 2 ));
                     $('#sidoCombo li input').each(function (index) {
                         if ($(this).val() == emdcd.substring(0, 2)) {
                             $('#sidoCombo > li').eq(index).addClass("active");
                             $("#sidoCombo > li").eq(index).click();
                         }
                     });
                 }
            	
            },100)
        });

        $("#sidoCombo").on("click", "li", function () {
        //$("#sidoCombo > li").on("click", function () {
            $("#sidoCombo > li").removeClass("active");

            var sidoCd = $(this).find('input[name="sidoCd"]').val();
            var sidoNm = $(this).find('a').text();
            $('#sidoComboValue').val(sidoNm);
            $('#sidoComboCode').val(sidoCd);

            $(this).addClass('active');

            search.searchOpration({
                collection: 'legaldong_sgg',
                numRows: 100,
                keyword: sidoCd,
            }, function callback(data) {
                sggGeom = [];

                $sggCombo.empty();
                $emdCombo.empty();

                $.each(data.docs, function (i, data) {
                    var sggHtml = "";
                    if (i == 0) {
                        sggHtml += '<li>';
                        sggHtml += '	<a href="#">시/군/구 전체</a>';
                        sggHtml += '		<input type="hidden" name="sggCd" value="">'
                        sggHtml += '</li>';
                    }

                    sggHtml += '<li>';
                    sggHtml += '	<a href="#">' + data.sgg_nm + '</a>';
                    sggHtml += '		<input type="hidden" name="sggCd" value="' + data.sgg_cd + '">'
                    sggHtml += '</li>';

                    $sggCombo.append(sggHtml)

                    var obj = new Object();
                    obj.sggCd = data.sgg_cd;
                    obj.geom = data.geom;

//					sggGeom.push(obj);
                    $.setAreaGeom('sgg', obj);
                    $('#sggComboList').scrollTop();
                });

                $("#sggCombo > li").eq(0).trigger('click');
                $("#emdCombo > li").eq(0).trigger('click');

                //주소창에서 ▼ 버튼 클릭시 주소 자동셋팅
                if (!$.isNullString(emdcd)) {
                    if ($.isNullString($("#sggComboCode").val())) {
                        $("#sggCombo > li").eq(0).click();
                    }
                    if ($.isNullString($("#emdComboCode").val())) {
                        $("#emdCombo > li").eq(0).click();
                    }
                    //$sggCombo.val(emdcd.substring( 0, 5 ));
                    //$sggCombo.trigger('change');
                }

            });
        });


        $("#sggCombo").on("click", "li", function () {

            $("#sggCombo > li").removeClass("active");
            $(this).addClass('active');

            if ($(this).text().trim() == "시/군/구 전체") {
                $('#sggComboValue').val("");
                $('#sggComboCode').val("");
                $emdCombo.empty();
                $('#emdComboValue').val("");
                $('#emdComboCode').val("");


                var emdHtml = "";
                emdHtml += '<li class="active">';
                emdHtml += '	<a href="#">읍/면/동 전체</a>';
                emdHtml += '		<input type="hidden" name="sggCd" value="">'
                emdHtml += '</li>';
                $emdCombo.append(emdHtml)

                //$("#emdCombo > li").eq(0).click();

                return false;
            }

            var sggCd = $(this).find('input[name="sggCd"]').val();
            var sggNm = $(this).find('a').text();
            $('#sggComboValue').val(sggNm);
            $('#sggComboCode').val(sggCd);

            search.searchOpration({
                collection: 'legaldong_emd',
                numRows: 100,
                keyword: sggCd,
            }, function callback(data) {
                emdGeom = [];
                $emdCombo.empty();
                $.each(data.docs, function (i, data) {
                    var emdHtml = "";
                    if (i == 0) {
                        emdHtml += '<li>';
                        emdHtml += '	<a href="#">읍/면/동 전체</a>';
                        emdHtml += '		<input type="hidden" name="sggCd" value="">'
                        emdHtml += '</li>';
                    }

                    emdHtml += '<li>';
                    emdHtml += '	<a href="#">' + data.emd_nm + '</a>';
                    emdHtml += '	<input type="hidden" name="emdCd" value="' + data.emd_cd + '">'
                    emdHtml += '</li>';

                    $emdCombo.append(emdHtml)

                    var obj = new Object();
                    obj.emdCd = data.emd_cd;
                    obj.geom = data.geom;
                    $.setAreaGeom('emd', obj);

                    $('#emdComboList').scrollTop();
                });


                $("#emdCombo > li").eq(0).click();

                //주소창에서 ▼ 버튼 클릭시 주소 자동셋팅
                if (!$.isNullString(emdcd)) {
                    //$emdCombo.val(emdcd.substring( 0, 8 ));
                    //$emdCombo.trigger('change');
                    if ($.isNullString($("#emdComboCode").val())) {
                        $("#emdCombo > li").eq(0).click();
                    }
                }

            });
        });


        $("#emdCombo").on("click", "li", function () {

            $("#emdCombo > li").removeClass("active");
            $(this).addClass('active');

            if ($(this).text().trim() == "읍/면/동 전체") {
                $('#emdComboValue').val("");
                $('#emdComboCode').val("");

                return false;
            }

            var emdCd = $(this).find('input[name="emdCd"]').val();
            var emdNm = $(this).find('a').text();
            $('#emdComboValue').val(emdNm);
            $('#emdComboCode').val(emdCd);
            //지도이동
            //mapInit.map.getView().setCenter($.findGeometry('emd',emdCd));
            //mapInit.map.getView().setZoom(SearchConfig.emdVisibleZoomLv);

            //주소창에서 ▼ 버튼 클릭시 주소 자동셋팅
            if (!$.isNullString(emdCd)) {
                emdcd = ""; //초기화
            }
            
            
        });

    }

    $.setLegalZoneSearchEvt11 = function (emdcd) {
        var $sidoCombo = $("#sidoCombo");
        var $sggCombo = $("#sggCombo");
        var $emdCombo = $("#emdCombo");
        $("#sidoCombo").empty();
        
        search.searchOpration({
            collection: 'legaldong_sido',
            numRows: 17
        }, function callback(data) {
            sidoGeom = [];

            $.each(data.docs, function (i, data) {
            	//hidden 에서 센타 좌표정보를 가지고 잇자.
            	
                //$sidoCombo.append(new Option(data.sido_nm, data.sido_cd));
                var html = "";
                html += '<li>';
                html += '	<a href="#">' + data.sido_nm + '</a>';
                html += '	<input type="hidden" name="sidoCd"  value="' + data.sido_cd + '">'
                html += '	<input type="hidden" name="sidoGeom" value="' + data.geom + '">'
                html += '</li>';
                $("#sidoCombo").append(html)

                var obj = new Object();
                obj.sidoCd = data.sido_cd;
                obj.geom = data.geom;
                $.setAreaGeom('sido', obj);
            });
            

            //주소창에서 ▼ 버튼 클릭시 주소 자동셋팅
            if (!$.isNullString(emdcd)) {
                //$sidoCombo.val(emdcd.substring( 0, 2 ));
                $('#sidoCombo li input[name="sidoCd"]').each(function (index) {
                    if ($(this).val() == emdcd.substring(0,2)) {
                        $('#sidoCombo li').eq(index).addClass("active");
                        $('#sidoCombo li').eq(index).click();
                        return false;
                    }
                });
            }
        });

        $("#sidoCombo").on("click", "li", function () {
            $("#sidoCombo > li").removeClass("active");
            $(this).addClass('active');
            var sidoCd = $(this).find('input[name="sidoCd"]').val();
            var sidoGeom = $(this).find('input[name="sidoGeom"]').val();
            var sidoNm = $(this).find('a').text();
           
            $('#sidoComboValue').val(sidoNm);
            $('#sidoComboCode').val($.trim(sidoCd));
            $('#sidoComboGeom').val(sidoGeom);
          

            search.searchOpration({
                collection: 'legaldong_sgg',
                numRows: 100,
                keyword: sidoCd,
            }, function callback(data) {
                sggGeom = [];

                $("#sggCombo").empty();
                $("#emdCombo").empty();

                $.each(data.docs, function (i, data) {
                    var sggHtml = "";
                    if (i == 0) {
                        sggHtml += '<li>';
                        sggHtml += '	<a href="#">시/군/구 전체</a>';
                        sggHtml += '		<input type="hidden" name="sggCd" value="">';
                        sggHtml += '		<input type="hidden" name="sggGeom" value="">';
                        sggHtml += '</li>';
                    }

                    sggHtml += '<li>';
                    sggHtml += '	<a href="#">' + data.sgg_nm + '</a>';
                    sggHtml += '		<input type="hidden" name="sggCd" value="' + data.sgg_cd + '">';
                    sggHtml += '		<input type="hidden" name="sggGeom" value="' + data.geom + '">';
                    sggHtml += '</li>';

                    $("#sggCombo").append(sggHtml)

                    var obj = new Object();
                    obj.sggCd = data.sgg_cd;
                    obj.geom = data.geom;

                    $.setAreaGeom('sgg', obj);
                    $('#sggComboList').scrollTop();
                });
                
                if($.trim(sidoCd) !=  emdcd.substring(0,2)){
                	$("#sggCombo > li").eq(0).trigger('click');
                    $("#emdCombo > li").eq(0).trigger('click');
                }
                
                	

                //주소창에서 ▼ 버튼 클릭시 주소 자동셋팅
                else if (!$.isNullString(emdcd)) {
                	
                  /*  if ($.isNullString($("#sggComboCode").val())) {
                        $("#sggCombo > li").eq(0).click();
                    }
                    if ($.isNullString($("#emdComboCode").val())) {
                        $("#emdCombo > li").eq(0).click();
                    }*/
                    	$('#sggCombo li input[name="sggCd"]').each(function(index) {
	       					 if($(this).val() == emdcd.substring(0,5)){
	       						 $('#sggCombo > li').eq(index).click();
	       						return false;
	       					 }
                    	});
                }

            });
        });


        $("#sggCombo").on("click", "li", function () {
            $("#sggCombo > li").removeClass("active");
            $(this).addClass('active');

            if ($(this).text().trim() == "시/군/구 전체") {
                $('#sggComboValue').val("");
                $('#sggComboCode').val("");
                $('#sggComboGeom').val("");
                $("#emdCombo").empty();
                $('#emdComboValue').val("");
                $('#emdComboCode').val("");
                $('#emdComboGeom').val("");


                var emdHtml = "";
                emdHtml += '<li class="active">';
                emdHtml += '	<a href="#">읍/면/동 전체</a>';
                emdHtml += '		<input type="hidden" name="sggCd" value="">'
                emdHtml += '		<input type="hidden" name="sggGeom" value="">'
                emdHtml += '</li>';
                $("#emdCombo").append(emdHtml)

                //$("#emdCombo > li").eq(0).click();

                return false;
            }
            var sggCd = $(this).find('input[name="sggCd"]').val();
            var sggGeom = $(this).find('input[name="sggGeom"]').val();
            var sggNm = $(this).find('a').text();
            $('#sggComboValue').val(sggNm);
            $('#sggComboCode').val($.trim(sggCd));
            $('#sggComboGeom').val(sggGeom);
            
            search.searchOpration({
                collection: 'legaldong_emd',
                numRows: 100,
                keyword: sggCd,
            }, function callback(data) {
                emdGeom = [];
                $emdCombo.empty();
                $.each(data.docs, function (i, data) {
                    var emdHtml = "";
                    if (i == 0) {
                        emdHtml += '<li>';
                        emdHtml += '	<a href="#">읍/면/동 전체</a>';
                        emdHtml += '		<input type="hidden" name="emdCd" value="">'
                        emdHtml += '		<input type="hidden" name="emdGeom" value="">'
                        emdHtml += '</li>';
                    }

                    emdHtml += '<li>';
                    emdHtml += '	<a href="#">' + data.emd_nm + '</a>';
                    emdHtml += '	<input type="hidden" name="emdCd" value="' + data.emd_cd + '">'
                    emdHtml += '	<input type="hidden" name="emdGeom" value="' + data.geom + '">'
                    emdHtml += '</li>';

                    $("#emdCombo").append(emdHtml)
                    
                    var obj = new Object();
                    obj.emdCd = data.emd_cd;
                    obj.geom = data.geom;
                    $.setAreaGeom('emd', obj);

                    $('#emdComboList').scrollTop();
                });

                
                if($.trim(sggCd)!=  emdcd.substring(0,5)){
                    $("#emdCombo > li").eq(0).trigger('click');
                }
                	

                //주소창에서 ▼ 버튼 클릭시 주소 자동셋팅
                else if (!$.isNullString(emdcd)) {
                    //$emdCombo.val(emdcd.substring( 0, 8 ));
                    //$emdCombo.trigger('change');
                    //if ($.isNullString($("#emdComboCode").val())) {
                     //   $("#emdCombo > li").eq(0).click();
                    //}
                    	$('#emdCombo li input[name="emdCd"]').each(function(index) {
          					 if($(this).val() == emdcd){
          						 $('#emdCombo > li').eq(index).click();
          					 }
                       	});
                    
                    /*$('#emdCombo li input[name="emdCd"]').each(function(index) {
     					 if($(this).val() == emdcd.substring( 0, 8 )){
     						 $('#emdCombo > li').eq(index).click();
     					 }
                  	});*/
               
                	
                	
                }

            });
        });


        $("#emdCombo").on("click", "li", function () {

            $("#emdCombo > li").removeClass("active");
            $(this).addClass('active');
            
            if ($(this).text().trim() == "읍/면/동 전체") {
                $('#emdComboValue').val("");
                $('#emdComboCode').val("");
                $('#emdComboGeom').val("");

                return false;
            }

            var emdCd = $(this).find('input[name="emdCd"]').val();
            var emdGeom = $(this).find('input[name="emdGeom"]').val();
            var emdNm = $(this).find('a').text();
            $('#emdComboValue').val(emdNm);
            $('#emdComboCode').val($.trim(emdCd));
            $('#emdComboGeom').val(emdGeom);
            //지도이동
            //mapInit.map.getView().setCenter($.findGeometry('emd',emdCd));
            //mapInit.map.getView().setZoom(SearchConfig.emdVisibleZoomLv);

            //주소창에서 ▼ 버튼 클릭시 주소 자동셋팅
            if (!$.isNullString(emdCd)) {
                emdcd = ""; //초기화
            }
        });
        
        //_viewMainEvent.legalZoneFocus();

    }

    
    /**
     * 공사 즐겨찾기 hover 이벤트 tooltip
     * */
    $.mFavorBoxHover = function (gbn,id) {
		if(gbn == "hover"){
			var top  =  $("#"+id).offset().top - 2;
			var left =  $("#"+id).offset().left + 25;
			var text = "관심공사로 설정";
		
			if( $("#"+id).children(".favorIcon").hasClass("active")){ text = "관심공사 해제"; }
			$(".tooltipBox span").text(text); $(".tooltipBox").css("top", top).css("left", left); $(".tooltipBox").show();
		}else{
			$(".tooltipBox").hide();
		}
    };
    
    /**
     * 공사 신뢰도 hover 이벤트 tooltip
     * */
    $.listDotHover = function (gbn,id) {
		if(gbn == "hover"){
			var top   = $("#"+id).offset().top - 8;
			var left  = $("#"+id).offset().left + 30;
			var index = $("#"+id).children(".active").length;
			var text  = "";

			switch (index){
				case 3: text = "신뢰도가 높은 검색"; break;
				case 2: text = "신뢰도가 중간인 검색"; break;
				case 1: text = "신뢰도가 낮은 검색"; break;
				case 0: text = "신뢰도가 낮은 검색"; break;
			}

			$(".srTipText").children("span").text(text);
			$(".srTipText").css("top", top).css("left", left); $(".srTipText").show();
		}else{
			$(".srTipText").hide();
		}
    };
    
    

    /**
     * UI 이벤트
     * */
    $.setUiEvt = function () {
        var defaultDraggableOptions = {containment: '#hypermap', cancel: 'a,button,tr,td,.pagination li,span,input,dl,dt,label,p'};
        $('#areaPop').draggable(defaultDraggableOptions);
        $('#dataPop').draggable(defaultDraggableOptions);
        $('#dataResultPop').draggable(defaultDraggableOptions);
        $('#dataInfoPop').draggable(defaultDraggableOptions);

        $(".toggleBtn").on("click", function () {

            var $self = $(this);

            if ($self.hasClass("btnToggleB")) {  //left

                if ($self.hasClass("active")) { //active

                    /*$self.closest('div').find('.left').animate({
                        width: "toggle"
                    }, 400, "linear");*/

                    $self.closest('div').find('.left').fadeOut();
                    $self.animate({
                        left: '0'
                    }, 400, function () {
                        $self.css('transform', 'rotate(0deg)');
                        $self.removeClass('active');
                    });
                    $(".left-bottom").css("display", "none");

                } else {
                    $self.closest('div').find('.left').fadeIn();
                    $self.animate({
                        left: '367px'
                    }, 500, function () {
                        $self.css('transform', 'rotate(180deg)');
                        $self.addClass('active');
                    });

                    $(".left-bottom").css("display", "");
                }
            } else if ($self.hasClass("btnToggleG")) {  //right

                if ($self.hasClass("active")) { //active
                    $self.closest('div').find('.result').fadeOut();

                    $self.animate({
                        right: '0'
                    }, 1000, function () {
                        $self.css('transform', 'rotate(180deg)');
                        $self.removeClass('active');
                    });
                } else {
                    $self.closest('div').find('.result').fadeIn();
                    $self.animate({
                        right: '645px'
                    }, 500, function () {
                        $self.css('transform', 'rotate(0deg)');
                        $self.addClass('active');
                    });
                }
            } else {

                if ($self.hasClass("active")) { //active
                    $self.removeClass('active');
                    $self.show();
                    $self.removeClass('active');
                    $self.closest('div').animate({
                        width: '645px'
                    }, 300, function () {
                        $('.leftContents .toggleBtn').show();
                        $('.rightContents .toggleBtn').fadeIn();

                    });
                } else {
                    //최대화 좌측화면 숨기기
                    $self.addClass('active');
                    $('.rightContents .toggleBtn').hide();
                    $self.show();

                    //리절트 크게 키우기
                    $self.closest('div').animate({
                        width: '100%',
                    }, 500, function () {
                    });
                }
            }
        });

        $(".closeRight").on("click", function () {
            $('.result').animate({
                right: '0'
            }, 0, function () {
                $('.rightContents .toggleBtn').fadeIn();
                $('.rightContents .toggleBtn').animate({
                    right: '0'
                }, 1000, function () {
                    $('.rightContents .toggleBtn').css('transform', 'rotate(180deg)');
                    $('.rightContents .toggleBtn').removeClass('active');
                });

                $(this).fadeOut();
            });
            $('.rightContents .toggleBtn').removeClass('active');
            $('.btnToggleG').hide();
        })
        
        $('.ol-zoom-out').on("click", function () { 
        	
            if (mapInit.map.getView().getMinZoom() >= (mapInit.map.getView().getZoom())) {
            	mapInit.map.getView().setZoom(mapInit.map.getView().getMinZoom());
            } else {
                mapInit.map.getView().setZoom(mapInit.map.getView().getZoom() - 1); 
            }  
        });
        
        $('#srchNewaddrBtn').on("click", function (e) {
            $('.resultSearch').show();
            $('#adressCloseBtn').click();
        });

        $('#searchCloseBtn').on("click", function () {
            $('.resultSearch').hide();
        });

        $('#adressCloseBtn').on("click", function () {
            $('#addrPop').hide();
        });

        $('.adress').on("click", function () {
            $('#addrPop').show();
            $('#searchCloseBtn').click();
            $.viewMainEvent('legalZoneFocus');
        });
        
        
     // 검색, SNS, 관심공사 클릭
		$(".navLeftTab span").on("click", function(){
			var index = $(this).attr("data-index");

			$(".navLeftTab span").removeClass("active"); $(".contents").hide();
			$(this).addClass("active"); $("#contents"+index).show();
		});

		// 공사 즐겨 찾기 클릭
		$(document).on("click", ".mFavorBox", function(){
			if($(this).children(".favorIcon").hasClass("active")){
				$(this).children(".favorIcon").removeClass("active");
				$(".tooltipBox span").text("관심공사로 설정"); return false;
			}

			$(".favorIcon").removeClass("actvie");
			$(".tooltipBox span").text("관심공사 해제");
			$(this).children(".favorIcon").addClass("active");
		// 레프트 메뉴 닫기 / 열기 클릭
		}).on("click", ".navOCBox", function(){
			if($(this).hasClass("active")){
				$('.mapNavBox').animate({ left:'0' }); $(this).removeClass("active");
				$('.mapControllBox').animate({ padding:'15px 15px 0 364px' }); return false;
			}

			$('.mapNavBox').animate({ left:'-349px' });
			$('.mapControllBox').animate({ padding:'15px 15px 0 20px' });
			$(this).addClass("active");
		// 흑백, 위성, 일반 클릭
		})/*.on("click", ".mapKind span", function(){
			alert("#@@");
			if($(this).hasClass("active")){ $(this).removeClass("active"); return false; }

			$(".mapKind span").removeClass("active");
			$(this).addClass("active");
		// 기간설정 클릭
		})*/.on("click", ".mDateSet input", function(){
			$(".dateRangeBox").fadeIn("fast");
		// 기간설정 팝업 X버튼 클릭
		}).on("click", ".mCloseImg", function(){
			var popClass = $(this).attr("data-popid");

			$("."+popClass).fadeOut("fast");
		// SNS더보기 클릭
		}).on("click", "#content2Plus", function(){
			/*$(this).prev("ul").append($(this).prev("ul").children("li").clone());*/
			G.contents2CurrPage++;
			MapData.getMapSnsList(String(G.contents2CurrPage));
		//공사현황 스크롤 리스트 가져오기
		}).on("click", "#content1Plus", function(){
				/*$(this).prev("ul").append($(this).prev("ul").children("li").clone());*/
			 G.contents1CurrPage++;
	         MapData.setSearchEvt(String(G.contents1CurrPage))
				
		// 관심공사 더보기 클릭
		}).on("click", ".mCorMoreBox", function(){
			//$(this).prev("ul").append($(this).prev("ul").children("li").clone());
			G.contents3CurrPage++;
			MapData.getMapUserMyRoadwork(String(G.contents3CurrPage));
		// 관심공사 최신순 클릭
		}).on("click", ".corTopSort", function(){
			
			if($(".corTopSort").hasClass("active")){ //최신순 오름차순
				$(".corTopSort").removeClass("active");
			}else{ //내림차순
				$(".corTopSort").addClass("active");
			}
	        MapData.getMapUserMyRoadwork();
		}).on("click", ".Indigo, .violet", function(){
			var level  = $(this).parents(".mCounter").attr("data-level");
			var aIndex = [];
			var color  = $(this).attr("data-color"); 
			var $pClass, $class, src = "";
			
			/*
			if(level == 1){  }
			else if(level == 2){ $pClass = ".areaCircleBox"; $class = ".areaCircle"; src = "/assets/images/map/circle_"+color+".png"; }
			else if(level == 3){  }
			else if(level == 4){  }
			*/
			var layer = mapInit.mapLayerMng.getLayerById('analysisDetailLayer');
			mapInit.map.removeLayer(layer);

			if($(this).hasClass("active")){ 
					$(this).removeClass("active"); 
					$($class).hide();
					
					mapInit.mapLayerMng.removeTempLayer('pointLyr');
					mapInit.mapLayerMng.removeTempLayer('clusterLyr');
					mapInit.mapLayerMng.layers.wfs["sido"].setVisible(false);
					mapInit.mapLayerMng.layers.wfs["sgg"].setVisible(false);
					mapInit.mapTheme.setToolbarActive();
					//mapInit.mapTheme.offMapEvt();
					$("#mapLegend").css("display","none");
					MapData.setSearchEvt();
					return false; 
			}
			$(".Indigo, .violet").removeClass("active"); 
			$(this).addClass("active"); $($class).hide();
			$($class).children("img").attr("src", src); 
			$($class).show();
			$("#mapLegend").css("display","");
			
			//툴바 엑티브
			mapInit.mapAction.reSizeZoomBar();
			mapInit.mapTheme.setToolbarActive(); 
			//mapInit.mapTheme.offMapEvt();
			mapInit.mapTheme.onMapEvt();
			MapData.setSearchEvt();
			
		}).on("click", ".rCancleBtn", function(){
			var popClass = $(this).attr("data-popid");

			$("."+popClass).fadeOut("fast");
		}).on("click", ".refreshBox", function(){
			if($(this).hasClass("active")){ $(this).removeClass("active"); return false; }
			$(this).addClass("active");
		}).on("change", "#sidoCombo", function(){
			MapData.setSearchEvt();
		}).on("change", "#roadTyCombo", function(){
			//var rtnDataArr = mapInit.mapEvtMng.getAnalysisRoadInfo("",null,$("#roadTyCombo option:selected").val());
			//MapData.setSearchEvt("",rtnDataArr);
			// 공사정보 상세-> 아코디언 타이틀 클릭
		}).on("click", ".popupAccordion .accTitleBox", function(){
			if($(this).hasClass("active")){ return false; }

			if($(".popupAccordion").hasClass("mini")){
				$(".corDtlMapBox").show(); $(".dtlTop").show(); $(".accTitleBox.active").next(".accDtlInfo").show();
				$(".corDtlInfoBox").css("width", "auto");
				$(".popupAccordion li").css("display", "block").css("margin-right", "0").css("margin-top", "10px");
				$(".accTitleBox").css("width", "100%"); 
				$(".corDtlBox .mapBody").css("height", "690px"); $(".popupAccordion ul").css("float", "none");
				$(".popupAccordion .corName").remove();
				$(".corDtlBox").css("width", "1065px").css("right", "50%").css("bottom", "50%");

				$(".popupAccordion").removeClass("mini");
				$(".enlarg").attr("src", "/assets/images/map/icon_mini.png");
				$(".enlarg").addClass("popMiniBtn").removeClass("enlarg");
			}

			$(".popupAccordion .accTitleBox").removeClass("active"); $(".navicon-button").removeClass("pm");
			$(".accDtlInfo").slideUp("fast");
			$(".popupAccordion li").removeClass("active");

			$(this).parents("li").addClass("active");
			$(this).addClass("active"); $(this).find(".navicon-button").addClass("pm");
			$(this).next(".accDtlInfo").slideDown("fast");
		// 공사정보 상세-> 공사소개정보-> th 전체 체크
		}).on("click", "#allCheck", function(){
			if($("#allCheck").is(":checked")) {
				$("input[name=popCheck]").prop("checked",true);
			}else{
				$("input[name=popCheck]").prop("checked",false);
			}
		// 공사정보 상세-> 입력
		}).on("click", ".dtlTopBtn", function(){
			$(".corDtlReset").show();
		}).on("click", ".corResetClose", function(){
			$(".corDtlReset").hide();
		// 우측 컨트롤 관심공사 아이콘 클릭
		})/*.on("click", ".openBookMark", function(){
				var top  = $(this).offset().top;
				var left = $(this).offset().left - 360;
				$(".corBookMark").css("left", left).css("top", top).show();
		})*/.on("click", ".setBookArea li", function(){
				if($(this).hasClass("active")){ $(this).removeClass("active"); $(".bookAreaListBox").hide(); return false; }

				$(".bookAreaListBox").hide();
				$(".setBookArea li").removeClass("active");
				$(this).addClass("active");
				$(this).find(".bookAreaListBox").show();
			}).on("click", ".bookCloseBtn", function(){
				$(".corBookMark").hide();
				// 맵 상세정보 최소화 클릭
			}).on("click", ".popMiniBtn", function(){
				var name = $(".dtlTopLeft .corName").clone();
				$(".popupAccordion .corName").remove();

				$(".corDtlMapBox").hide(); $(".dtlTop").hide(); $(".accDtlInfo").hide();
				$(".corDtlInfoBox").css("width", "100%");
				$(".popupAccordion li").css("display", "inline-block").css("margin-right", "10px").css("margin-top", "0");
				$(".accTitleBox").css("width", "200px");
				$(".corDtlBox .mapBody").css("height", "auto"); $(".popupAccordion ul").css("float", "right");
				$(".popupAccordion ul li:last-child").css("margin-right", "0");
				$(".corDtlBox").css("width", "70%").css("right", "750px").css("bottom", "380px");
				$(".popupAccordion").prepend(name);
				
				$(".popupAccordion").addClass("mini");
				$(this).addClass("enlarg").removeClass("popMiniBtn");
				$(this).attr("src", "/assets/images/map/icon_enlarg.png");
			}).on("click", ".enlarg", function(){
				$(".corDtlMapBox").show(); $(".dtlTop").show(); $(".accTitleBox.active").next(".accDtlInfo").show();
				$(".corDtlInfoBox").css("width", "auto");
				$(".popupAccordion li").css("display", "block").css("margin-right", "0").css("margin-top", "10px");
				$(".accTitleBox").css("width", "100%"); 
				$(".corDtlBox .mapBody").css("height", "690px"); $(".popupAccordion ul").css("float", "none");
				$(".popupAccordion .corName").remove();
				$(".corDtlBox").css("width", "1065px").css("right", "50%").css("bottom", "50%");

				$(".popupAccordion").removeClass("mini");
				$(this).addClass("popMiniBtn").removeClass("enlarg");
				$(this).attr("src", "/assets/images/map/icon_mini.png");
			});
		// 공사 즐겨찾기 hover 이벤트 tooltip
		/*$(".mFavorBox").hover(function(){
			var top  = $(this).offset().top - 2;
			var left = $(this).offset().left + 25;
			var text = "관심공사로 설정";

			if($(this).children(".favorIcon").hasClass("active")){ text = "관심공사 해제"; }

			$(".tooltipBox span").text(text); $(".tooltipBox").css("top", top).css("left", left); $(".tooltipBox").show();
		}, function() {
			$(".tooltipBox").hide();
		});*/

		// 기간설정 팝업 느낌표 hover 이벤트 tooltip
		$(".exclMark").hover(function(){
			$(".exclTip").show();
		}, function() {
			$(".exclTip").hide();
		});
		

		$(".areaCircle").hover(function(){
			var top  = $(this).offset().top + 25;
			var left = $(this).offset().left + 100;
			var text = $(this).children("div").children(".cityText").text();

			$(".corToolTit").text(text);
			$(".corTooltip").css("top", top).css("left", left); $(".corTooltip").show();
		}, function() {
			$(".corTooltip").hide();
		});

		/*$(".listDot").hover(function(){
			var top   = $(this).offset().top - 8;
			var left  = $(this).offset().left + 30;
			var index = $(this).children(".active").index();
			var text  = "";

			switch (index){
				case 0: text = "신뢰도가 높은 검색"; break;
				case 1: text = "신뢰도가 중간인 검색"; break;
				case 2: text = "신뢰도가 낮은 검색"; break;
			}

			$(".srTipText").children("span").text(text);
			$(".srTipText").css("top", top).css("left", left); $(".srTipText").show();
		}, function() {
			$(".srTipText").hide();
		});*/

		$(".mapCtlIcon li").hover(function(){
			var top   = $(this).offset().top + 2;
			var text  = $(this).attr("data-text");
			var index = $(this).index();

			if(index > 0){
				$(".mapCtlTooltip").children("span").text(text);
				$(".mapCtlTooltip").css("top", top); $(".mapCtlTooltip").show();
			}
		}, function() {
			var index = $(this).index();
			if(index > 0){ $(".mapCtlTooltip").hide(); }
		});

		$(".mapCtlTooltip").hover(function(e){
			$(this).addClass("active");
		},function() {
			$(this).removeClass("active");
			$(this).hide();
		});

		/*$('.coControll div').mouseenter(function() {
		    var top   = "";
			var text  = "";
			var index = $(this).index();

			if($(".zoomControll").hasClass("close")){ text = "슬라이드 표시"; top = $(".coControll").offset().top + 20; }
			else{ text = "슬라이드 숨기기"; top = $(this).offset().top + 2; }

			if(index != 1){ $(".mapCtlTooltip").children("span").text(text); $(".mapCtlTooltip").css("top", top); $(".mapCtlTooltip").show(); }
		}).mouseleave(function() {
			var flag = ($('.mapCtlTooltip:hover').length>0);
		    if(!flag && !$('.mapCtlTooltip').hasClass('active')){ $('.mapCtlTooltip').hide(); }
		});*/

		$(".mapCtlTooltip").on("click", function(){
			if($(".zoomControll").hasClass("close")){ $(".zoomControll").removeClass("close"); $(".zoomControll").slideDown("fast"); }
			else{ $(".zoomControll").addClass("close"); $(".zoomControll").slideUp("fast"); }
			$(".mapCtlTooltip").hide();
		});
		
		// 공사현황 스크롤 리스트 가져오기
		/*$(".mRsList1").scroll(function(){   //스크롤이 최하단 으로 내려가면 리스트를 조회하고 page를 증가시킨다.
		     if($(".mRsList1").scrollTop() >= $('ul[name="contents1"]').height() - $(".mRsList1").height()){
		    	   G.contents1CurrPage++;
		           MapData.setSearchEvt(String(G.contents1CurrPage))
		     } 
		});*/

    }

})(window, jQuery);  