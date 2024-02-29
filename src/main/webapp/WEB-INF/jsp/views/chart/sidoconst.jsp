<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<style type="text/css">
		#soidoConstDiv{
			width: 100%;
			height: 700px;   
		}
	</style>
</head>
<body>
	<div class="chart lineChart mt20">
		<div class="chartTitleBox">  
			<p class="chartTitle inline">시도별 공사현황</p>
			<img src="/assets/images/icon/excl_mark.png" alt="mark" class="exclMark" data-title="시도별 공사현황을 색상주제도로 확인할 수 있습니다.">
		</div>
		<div id="soidoConstDiv"></div>  
		<div class="zoom_Control" style="visibility: visible; position: absolute; top: 66px; right: 50px;  display: none;" >
			<a style="cursor:pointer; margin-left: -1px;" title="확대" onclick="mapInit.mapAction.zoomIn(); return false;" class="btn_zoom plus"><img src="/assets/images/button/mapBtn_01_off.png" alt="확대" style="width: 26px;"></a>
			<a style="cursor:pointer;margin-left: -1px;" title="축소" onclick="mapInit.mapAction.zoomOut(); return false;" class="btn_zoom minus"><img src="/assets/images/button/mapBtn_02_off.png" alt="축소" style="width: 26px;"></a>
		</div>
		<div id='mapLegend' style="visibility: visible; position: absolute; width: 110px; margin-top: -10%; margin-left: 3%;"></div>         
	</div>  
</body>

<script type="text/javascript">
//var mapInit = null;
//공사지도
var mapInit = new MapInit('soidoConstDiv',{   
    baseMap:'VWorld',   
    baseMapVislble : true, 
    mapUrl : '${mapUrl}'+'/',      
    interactions:{    
        shiftDragZoom : false,  
        dragPan: false,   
        mouseWheelZoom : false  
    },
    mapControl : {  
        elem : "ul.mapCtr_wrap>li span",  
        flag : "class",
        arrHandle : ["btn_distanceMeasure", "btn_areaMeasure", "btn_circle", "btn_reset" , "btn_merge"]
    },        
    //targetLayer:["thin_legaldong_sido","tb_legaldong_sgg"],    
    //targetLayer:["thin_legaldong_sido"],        
    minZoom:0,       
    maxZoom:12,   
    zoom:0,   
    center:[14197378.96, 4274375.9],   
    roadModal : "#modal-controller-1",
});
mapInit.mapAction.setVisibilityById("VWorld_gray");

 var popup = new ol.Overlay.Popup (
		    {	popupClass: "default", //"tooltips", "warning" "black" "default", "tips", "shadow",
		      closeBox: false,
		      onshow: function(){ console.log("You opened the box"); },
		      onclose: function(){ console.log("You close the box"); },
		      positioning: 'auto',
		      autoPan: true,
		      autoPanAnimation: { duration: 250 }  
		    });
		
mapInit.overlay.overlayTooltipLayer = popup;
mapInit.map.addOverlay(popup);  
mapInit.map.updateSize();
</script>
