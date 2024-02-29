(function(window, $) {
	"use strict";

	var MapArea = function(options) {
		this.options = options;
		this._init();
	};

	MapArea.prototype = {
		 config : null,
		_defaults : {
			areaCd			: "",
			areaNm			: "",
			areaGeom			: "",
			areaTarget      :""
		},
		onRowClick	: function(rowIdx, data, gbn) {
			var _self = this;
			if(gbn=="sido"){
				
				_self.config.areaCd = data.sido_cd;
				_self.config.areaNm = data.sido_nm;
				_self.config.areaGeom = data.geom;
				_self.config.areaTarget = "sido";
				_self.setLegalZoneSgg();
				
			}else if(gbn=="sgg"){
				_self.config.areaCd = data.sgg_cd;
				_self.config.areaNm = data.sgg_nm;
				_self.config.areaGeom = data.geom;
				_self.config.areaTarget = "sgg";
				_self.setLegalZoneEmd();  
			}else{
				_self.config.areaCd = data.emd_cd;
				_self.config.areaNm = data.emd_nm;
				_self.config.areaGeom = data.geom;
				_self.config.areaTarget = "emd";
			}
		},
  
		_init : function () {  
			
			this.config = $.extend({}, this._defaults, this.options);
			this.setLegalZoneSearchEvt();
			var _self = this; 
		},
		setLegalZoneSearchEvt : function () { 
			
			   var _self = this;
				var $sidoCombo = $("#sidoCombo");
		        var $sggCombo = $("#sggCombo");
		        var $emdCombo = $("#emdCombo");
		        $sidoCombo.empty();
		        search.searchOpration({
		            collection: 'legaldong_sido',
		            numRows: 17
	        	}, function callback(data) {
		            $.each(data.docs, function (i, data) {
		            	var html = "";
		                html += '<li>';
		                html += '	<a href="#">' + data.sido_nm + '</a>';
		                html += '	<input type="hidden" name="sidoCd" value="' + data.sido_cd + '">'
		                html += '</li>';
		            	var $row;
		            	$row = $(html); 
		                $sidoCombo.append($row); 
		                $row.off("click");  
						$row.on({ 
							"click" : function(evt) {
								_self.onRowClick(i,data,'sido');
								$('#sidoCombo').find('li').removeClass();
								$(this).addClass("active");
								$('#sidoComboValue').val(data.sido_nm);
					            $('#sidoComboCode').val(data.sido_cd);
					        	$('#sggComboValue').val("전체");
					            $('#sggComboCode').val("");
					            $('#emdComboValue').val("전체");
					            $('#emdComboCode').val("");
							},
						});
						$sidoCombo.append($row);
		            });
		        });
		        
		        var html="";
		        html += '<li class="active">';
                html += '	<a href="#">시/군/구 전체</a>';
                html += '		<input type="hidden" name="sggCd" value="">';
                html += '		<input type="hidden" name="sggGeom" value="">';
                html += '</li>';
                var $row;
            	$row = $(html); 
            	
            	$("#sggCombo").append($row);
            	 
            	 var html = "";
                 	html += '<li class="active">';
                 	html += '	<a href="#">읍/면/동 전체</a>';
                 	html += '		<input type="hidden" name="emdCd" value="">'
             		html += '		<input type="hidden" name="emdGeom" value="">'
         			html += '</li>';
                 var $row;
	            	$row = $(html); 
	            	$("#emdCombo").append($row);
		},
		setLegalZoneSgg:function(){
			
			var _self = this;
			 search.searchOpration({
	                collection: 'legaldong_sgg',
	                numRows: 100,
	                keyword: _self.config.areaCd,
	            }, function callback(data) {

	                $("#sggCombo").empty();
	                $("#emdCombo").empty();

	                $.each(data.docs, function (i, data) {
	                	
	                	 if(i == 0){
	 	            		var firsthtml = "";
	 		            	 firsthtml += '<li class="active">';
	                         firsthtml += '	<a href="#">시/군/구 전체</a>';
	                         firsthtml += '		<input type="hidden" name="sggCd" value="">';
	                         firsthtml += '		<input type="hidden" name="sggGeom" value="">';
	                         firsthtml += '</li>';
	                         
	                         var $firstrow = $(firsthtml);
	                         $("#sggCombo").prepend($firstrow);
	                         
	                         $firstrow.off("click");  
	 		            	 $firstrow.on({ 
	 							"click" : function(evt) {
	 								_self.onRowClick(i,data,'sgg');
	 								$('#sggCombo').find('li').removeClass();
	 								$(this).addClass("active");
	 								//$('#sggComboValue').val("전체");
						            //$('#sggComboCode').val("");
						            //$('#emdComboValue').val("전체");
						            //$('#emdComboCode').val("");
	 							},
	 						});
	 	            	}
	                	 
	                    var html = "";
	                    html += '<li>';
	                    html += '	<a href="#">' + data.sgg_nm + '</a>';
	                    html += '		<input type="hidden" name="sggCd" value="' + data.sgg_cd + '">';
	                    html += '		<input type="hidden" name="sggGeom" value="' + data.geom + '">';
	                    html += '</li>';
	                    
	                    var $row;
		            	$row = $(html); 
		            	$("#sggCombo").append($row);
		            	$row.off("click");  
						$row.on({ 
							"click" : function(evt) {
								_self.onRowClick(i,data,'sgg');  
								$('#sggCombo').find('li').removeClass();
								$('#sggCombo > li').eq(i+1).addClass("active");
								$('#sggComboValue').val(data.sgg_nm);
					            $('#sggComboCode').val(data.sgg_cd);
							},
						});
	                });
	                
	                var html = "";
                 	html += '<li class="active">';
                 	html += '	<a href="#">읍/면/동 전체</a>';
                 	html += '		<input type="hidden" name="emdCd" value="">'
             		html += '		<input type="hidden" name="emdGeom" value="">'
         			html += '</li>';
                 var $row;
	            	$row = $(html); 
	            	$("#emdCombo").append($row)
	                
            });
		},
		setLegalZoneEmd:function(){
			
			var _self = this;
			 search.searchOpration({
	                collection: 'legaldong_emd',
	                numRows: 100,
	                keyword: _self.config.areaCd,
	            }, function callback(data) {

	                $("#emdCombo").empty();
	                $.each(data.docs, function (i, data) {
	                	
	                	 if(i == 0){
	 	            		var firsthtml = "";
	 		            	firsthtml += '<li class="active">';
	                         firsthtml += '	<a href="#">읍/면/동 전체</a>';
	                         firsthtml += '		<input type="hidden" name="emdCd" value="">';
	                         firsthtml += '		<input type="hidden" name="emdGeom" value="">';
	                         firsthtml += '</li>';
	                         
	                         var $firstrow = $(firsthtml); 
	                         $("#emdCombo").prepend($firstrow);
	                         
	                         $firstrow.off("click");  
	 		            	 $firstrow.on({ 
	 							"click" : function(evt) {
	 								_self.onRowClick(i,data,'emd');
	 								$('#emdCombo').find('li').removeClass();
	 								$(this).addClass("active");
	 								//$('#emdComboValue').val("전체");
						            //$('#emdComboCode').val("");
	 							},
	 						});
	 	            	}
	                	
	                    var html = "";

	                    html += '<li>';
	                    html += '	<a href="#">' + data.emd_nm + '</a>';
	                    html += '	<input type="hidden" name="emdCd" value="' + data.emd_cd + '">'
	                    html += '	<input type="hidden" name="emdGeom" value="' + data.geom + '">'
	                    html += '</li>';
	                    
	                    var $row;
		            	$row = $(html); 
		            	$("#emdCombo").append($row);
		                $row.off("click");  
						$row.on({ 
							"click" : function(evt) {
								_self.onRowClick(i,data,'emd');  
								$('#emdCombo').find('li').removeClass();
								$('#emdCombo > li').eq(i+1).addClass("active");
								$('#emdComboValue').val(data.emd_nm);
					            $('#emdComboCode').val(data.emd_cd);
							},
						});
						
                });
            }); 
		},
		legalZoneConfirm:function(){
			var _self = this;
			
			if(!$.isNullString(_self.config.areaGeom)){
				var features = mapInit.mapFormat.wkt.readFeature(_self.config.areaGeom);
				var extent = features.getGeometry().getExtent();
				mapInit.map.getView().setCenter(ol.extent.getCenter(extent));
				
				if(_self.config.areaTarget=="sido"){
					mapInit.map.getView().setZoom(3);	
				}else if(_self.config.areaTarget=="sgg"){
					mapInit.map.getView().setZoom(7);	
				}else if(_self.config.areaTarget=="emd"){
					mapInit.map.getView().setZoom(11);	 
				}
				
				$("#sidoZone").text($('#sidoComboValue').val());
				$("#sggZone").text($('#sggComboValue').val());
				$("#emdZone").text($('#emdComboValue').val());
				$("#slegalCd").val($("#emdComboCode").val())
			}
		},
		/* 시도시군구읍면동 취소 버튼 EVENT */
		legalZoneCancle : function(){
			// 취소 했을 때 원래 주소 셋팅
			var emdcd = $("#slegalCd").val();
			$("#sidoCombo").empty();
			  $("#sggCombo").empty();
              $("#emdCombo").empty();
			/*$("#sidoCombo > li").eq(0).addClass("active");
			$('#sidoCombo > li').eq(0).click();*/
			
			
			/*$('#sidoCombo li input').each(function(index) {
				 if($(this).val() == emdcd.substring( 0, 2 )){
					 $("#sidoCombo > li").removeClass("active");
					 $('#sidoCombo > li').eq(index).addClass("active");
				 }
			});
			 
				$('#sggCombo li input').each(function(index) {
					 if($(this).val() == emdcd.substring( 0, 5 )){
						 console.log(index);
						$("#sggCombo > li").removeClass("active");
						$('#sggCombo > li').eq(index-1).addClass("active");
						$('#sggCombo > li').eq(index-1).click();
					 }
				});
			
				$('#emdCombo li input').each(function(index) {
					 if($(this).val() == emdcd.substring( 0, 8 )){
						 console.log(index);
						 $("#emdCombo > li").removeClass("active");
						 $('#emdCombo > li').eq(index-1).addClass("active");  
						 

					 }
				});
			*/
			// ../취소 했을 때 원래 주소 셋팅
			
		},
		
	}

	window.MapArea = MapArea;
})(window, jQuery);