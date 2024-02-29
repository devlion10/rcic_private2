<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="org.springframework.security.core.Authentication"%>
<%@page import="org.springframework.security.core.context.SecurityContextHolder"%> 
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
    
    
<!-- css -->
<link href="/assets/css/swiper.css" type="text/css" rel="stylesheet" media="all">
<link href="/assets/css/aos.css" type="text/css" rel="stylesheet" media="all">
<link href="/assets/css/bootstrap.min.css" type="text/css" rel="stylesheet" media="all">
<link href="/assets/css/jquery-ui/jquery-ui.css" type="text/css" rel="stylesheet" media="all"/>

<link href="/assets/css/ion.rangeSlider.min.css" type="text/css" rel="stylesheet" media="all">
<link href="/assets/css/bootstrap-datepicker.css" type="text/css" rel="stylesheet" media="all">
<link href="/assets/css/style.css" type="text/css" rel="stylesheet" media="all">
<link rel="shortcut icon" type="image/x-icon" href="/assets/images/favicon/favicon.ico"> 
<!-- js -->
<script type='text/javascript' src='/assets/js/common/lib/jquery/jquery-3.5.1.min.js'></script>
<script type='text/javascript' src='/assets/js/common/lib/jquery/jquery.min.js'></script>
<script type="text/javascript" src="/assets/js/common/lib/jquery/jquery.blockUI.js"></script>    
<script type="text/javascript" src="/assets/js/common/lib/jquery/jquery-ui.js"></script>
<script type="text/javascript" src="/assets/js/common/lib/jquery/jquery.number.min.js"></script>
<script type='text/javascript' src='/assets/js/common/lib/common/swiper.min.js'></script>
<script type="text/javascript" src="/assets/js/common/lib/common/twbsPagination.min.js"></script>
<script type="text/javascript" src="/assets/js/common/lib/bootstrap/bootstrap.min.js"></script> 		
<script type="text/javascript" src="/assets/js/common/lib/common/underscore.js"></script> 		

<script type='text/javascript' src='/assets/js/common/lib/modal/modal.min.js'></script>
<script type='text/javascript' src='/assets/js/common/lib/moment/moment.min.js'></script>
<script type='text/javascript' src='/assets/js/common/lib/common/ion.rangeSlider.min.js'></script>
<script type='text/javascript' src='/assets/js/common/lib/bootstrap/bootstrap-datepicker.min.js'></script>
<script type='text/javascript' src='/assets/js/common/lib/bootstrap/bootstrap-datepicker.kr.js'></script>
<script type="text/javascript" src="/assets/js/common/lib/moment/moment.js"></script>
<script type='text/javascript' src='/assets/js/common/lib/common/aos.js'></script>
<script type='text/javascript' src='/assets/js/common/lib/common/swiper.min.js'></script>
<script type='text/javascript' src='/assets/js/common/lib/common/base.js'></script>
<script type='text/javascript' src='/assets/js/common/lib/sweetalert/sweetalert.js'></script>


<!-- ol -->
<script type="text/javascript" src="/assets/js/common/lib/ol/ol.js"></script> 
<script type="text/javascript" src="/assets/js/common/lib/ol/dist/ol-ext.js"></script>
<script type="text/javascript" src="/assets/js/common/lib/ol/jsts.1.3.0.min.js"></script>
<script type="text/javascript" src="/assets/js/common/lib/ol/proj/proj4.js"></script>  
<script type="text/javascript" src="/assets/js/common/lib/ol/proj/projection.js"></script>
<script type="text/javascript" src="/assets/js/common/lib/ol/geostats.min.js"></script>
<script type="text/javascript" src="/assets/js/common/lib/ol/chroma.js"></script>
<script type="text/javascript" src="/assets/js/module/map/init/Config.js"></script>
<script type="text/javascript" src="/assets/js/module/map/init/BaseMapConfig.js"></script>
<script type="text/javascript" src="/assets/js/module/map/init/MapAction.js"></script>
<script type="text/javascript" src="/assets/js/module/map/init/MapEventMng.js"></script>    
<script type="text/javascript" src="/assets/js/module/map/init/MapLayerMng.js"></script>
<script type="text/javascript" src="/assets/js/module/map/init/MapInit.js"></script>
<script type="text/javascript" src="/assets/js/module/map/init/MapRcicMng.js"></script>
<script type="text/javascript" src="/assets/js/module/map/init/MapGeoStats.js"></script>
<script type="text/javascript" src="/assets/js/module/map/init/MapTheme.js"></script>


<!-- chart.js  -->  
<script src="/assets/js/common/lib/amcharts4/core.js"></script>
<script src="/assets/js/common/lib/amcharts4/charts.js"></script>
<script src="/assets/js/common/lib/amcharts4/lang/de_DE.js"></script>
<script src="/assets/js/common/lib/amcharts4/lang/ko_KR.js"></script>
<script src="/assets/js/common/lib/amcharts4/lang/es_ES.js"></script> 
<script src="/assets/js/common/lib/amcharts4/themes/animated.js"></script>
<script src="/assets/js/common/lib/amcharts4/themes/material.js"></script>
<script src="/assets/js/common/lib/amcharts4/themes/dataviz.js"></script>

<script src="/assets/js/common/lib/amcharts4/plugins/forceDirected.js"></script>



<!-- module.js  -->
<script type="text/javascript" src="/assets/js/module/cmmn/CommonSearch.js"></script>
<script type="text/javascript" src="/assets/js/module/dataCntc/DataCntc.js"></script>
<script type="text/javascript" src="/assets/js/common/util/commonUtil.js"></script>
<script type='text/javascript' src='/assets/js/common/commonN.js'></script>
<script type='text/javascript' src='/assets/js/module/calrendar/Calrendar.js'></script>
<script type='text/javascript' src="/assets/js/module/mypage/mypage.js"></script> 
<script type='text/javascript' src="/assets/js/module/join/join.js"></script>  
<script type='text/javascript' src="/assets/js/module/login/login.js"></script>   
<script type='text/javascript' src="/assets/js/module/main/main.js"></script>
<script type='text/javascript' src="/assets/js/module/board/board.js"></script>  
<script type='text/javascript' src="/assets/js/module/sns/sns.js"></script>  
<script type='text/javascript' src="/assets/js/module/corporation/corporation.js"></script>       
<script type='text/javascript' src="/assets/js/module/chart/RcicChart.js"></script>
<script type='text/javascript' src="/assets/js/module/chart/RcicCollectChart.js"></script>
<script type='text/javascript' src="/assets/js/module/api/dataApi.js"></script>


