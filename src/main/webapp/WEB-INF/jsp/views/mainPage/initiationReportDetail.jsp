<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%@taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<%@page import="org.springframework.security.core.Authentication"%>
<%@page import="org.springframework.security.core.context.SecurityContextHolder"%>
<%@ page import="java.net.URLDecoder"%>
<%
    String userId_cookie = "";
    try {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (int i = 0; i < cookies.length; i++) {
                if (cookies[i].getName().equals("rcicId")) {
                    userId_cookie = URLDecoder.decode((cookies[i].getValue()),"UTF-8");
                }
            }
        }
    } catch (Exception e) {}

    HttpSession sess = request.getSession();
    String clientIp =(String)sess.getAttribute("clientIp");
    System.out.println(clientIp);

%>
<%
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String userName = authentication.getName();
    if(!userName.equals("anonymousUser")){
%>
<sec:authentication property="principal" var="user"/>
<sec:authentication property="principal.extInfo" var="userInfo"/>
<%
    }
    response.setHeader("Cache-Control","no-store");
    response.setHeader("Pragma","no-cache");
    response.setDateHeader("Expires",0);
    if (request.getProtocol().equals("HTTP/1.1"))
        response.setHeader("Cache-Control", "no-cache");
%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <!-- 부트스트랩 -->
    <link rel="stylesheet" href="/assets/css/bootstrap-5.3.1.min.css">
    <link rel="stylesheet" href="/assets/css/bootstrap.min.css">
    <%--
    <link rel="stylesheet" href="../lib/bootstrap-5.3.1.min.css">
    <link rel="stylesheet" href="../lib/bootstrap.min.css">
    --%>

    <!-- 부트스트랩 아이콘 -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css">

    <!--좌표등록 css -->
    <link rel="stylesheet" href="/assets/css/regCoordMap/regCoordMap.css">

    <!-- 퍼블작업용CSS -->
    <link href="/assets/css/style.css" type="text/css" rel="stylesheet" media="all">

    <!-- meta -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no,viewport-fit=cover">
    <meta name="HandheldFriendly" content="true">
    <meta name="format-detection" content="telephone=no" />
    <meta name="title" content="도로변경정보 수집시스템">
    <meta name="keywords" content="">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">

    <title>도로변경정보 수집시스템</title>

    <jsp:include page="/WEB-INF/jsp/views/include/htmlHead.jsp"></jsp:include>
    <script type="text/javascript" src="/assets/js/module/initiationReport/initiationReportDetail.js"></script>
    <script type="text/javascript" src="/assets/js/module/initiationReport/fileView.js"></script>
    <style>
        .row-tr {
            border-bottom: 1px solid #ccc;
            border-right: 1px solid #ccc;
            margin: 0;
        }
        .row_first {
            border-top: 1px solid #ccc;
        }

        .row-tr > div {
            padding: 8px;
        }

        .row-tr .col-th {
            background-color: #f8f8f8;
            display: flex;
            align-items: center;
            border-left: 1px solid #ccc;
            border-right: 1px solid #ccc;
        }

        .row-tr.row-th .col-th {
            display: block;
            border-left: none;
            text-align: center;
        }

        input[type=button] {
            font-size: 14px;
            font-weight: 700;
            width: 100%;
            height: 34px;
        }
        .searchBtn {
            color: #FFF;
            background-color: #58970f;
            border: 1px solid #58970f;
        }
        input[type="radio"] + label:after {
            top: 11px;
        }
        label {
            margin-bottom: 0;
        }

        .sub_th {
            font-weight: 500;
        }

        .sub_th:before {
            content: '';
            display: inline-block;
            width: 4px;
            height: 4px;
            border-radius: 2px;
            background-color: #999999;
            vertical-align: middle;
            margin-right: 5px;
        }
    </style>
</head>
<body>
<div class="containerWrap">
    <div class="contentsWrap">
        <%--<div class="headerWrap">
            <jsp:include page="/WEB-INF/jsp/views/include/header.jsp"></jsp:include>
        </div>--%>
        <div class="pageBox">
            <div class="pageNav">
                <img src="/assets/images/icon/home.png" alt="icon">
                <span class="division">›</span>
                <span>표준 서식</span>
                <span class="division">›</span>
                <span>표준 서식 조회</span>
                <span class="division">›</span>
                <span>표준 서식 상세</span>
            </div>
            <div class="bConTxtBox">
                <p>도로공사 착수신고서 표준서식 상세</p>
            </div>

            <div class="sectionBtm">
                <!-- 1행 -->
                <form action="/rcic/initiationReport/initiationReportApproval" method="post" id="initiationReportApprovalForm">
                    <input type="hidden" id="seq" name="seq" value="${dto.seq}"/>
                    <div class="row row-tr row_first">
                        <div class="col-2 col-th">
                            <label class="col-form-label-sm">입찰공고번호</label>
                        </div>
                        <div class="col-4">
                            <label class="col-form-label-sm">
                                <span id="bidntceno">${dto.bidntceno}</span>
                            </label>
                        </div>
                        <div class="col-2 col-th">
                            <label class="col-form-label-sm">공사구분정보</label>
                        </div>
                        <div class="col-4">
                            <label class="col-form-label-sm">
                                <span id="bidntcenoyn" style="display:none;">${dto.bidntcenoyn}</span>
                                <span id="workDivisionInfo">${dto.workDivisionInfo}</span>
                            </label>
                        </div>
                    </div>

                    <!-- 2행 -->
                    <div class="row row-tr">
                        <div class="col-2 col-th">
                            <label class="col-form-label-sm">신고인<br/>(공사시행자)</label>
                        </div>
                        <div class="col-4 align-self-center">
                            <label class="col-form-label-sm">
                                <span id="dclNm">${dto.dclNm}</span>
                            </label>
                        </div>
                        <div class="col-2 col-th">
                            <label class="col-form-label-sm">사업자등록번호</label>
                        </div>
                        <div class="col-4 align-self-center">
                            <label class="col-form-label-sm">
                                <span id="brno">${dto.brno}</span>
                            </label>
                        </div>
                    </div>

                    <!-- 3행 -->
                    <div class="row row-tr">
                        <div class="col-2 col-th">
                            <label class="col-form-label-sm">신고인 주소</label>
                        </div>
                        <div class="col-10">
                            <label class="col-form-label-sm">
                                <span id="dclAddr">${dto.dclAddr}</span>
                            </label>
                        </div>
                    </div>

                    <!-- 4행 -->
                    <div class="row row-tr">
                        <div class="col-2 col-th">
                            <label class="col-form-label-sm">도로종류</label>
                        </div>
                        <div class="col-4">
                            <label class="col-form-label-sm">
                                <input type="hidden" id="roadTypeCd" name="roadTypeCd" value="${dto.roadTypeCd}"/>
                                <span id="roadTypeNm">${dto.roadTypeNm}</span>
                            </label>
                        </div>
                        <div class="col-2 col-th">
                            <label class="col-form-label-sm">공사종류</label>
                        </div>
                        <div class="col-4">
                            <label class="col-form-label-sm">
                                <input type="hidden" id="cstrnTypeCd" name="cstrnTypeCd" value="${dto.cstrnTypeCd}"/>
                                <span id="cstrnTypeNm">${dto.cstrnTypeNm}</span>
                            </label>
                        </div>
                    </div>

                    <!-- 5행 -->
                    <div class="row row-tr">
                        <div class="col-2 col-th">
                            <label class="col-form-label-sm">노선번호(노선명)</label>
                        </div>
                        <div class="col-4">
                            <label class="col-form-label-sm">
                                <span id="roadRteNo">${dto.roadRteNo}</span>
                            </label>
                        </div>
                        <div class="col-2 col-th">
                            <label class="col-form-label-sm">관리청</label>
                        </div>
                        <div class="col-4">
                            <label class="col-form-label-sm">
                                <input type="hidden" id="ntnltyLandMngOfcCd" name="ntnltyLandMngOfcCd" value="${dto.ntnltyLandMngOfcCd}"/>
                                <span id="ntnltyLandMngOfcNm">${dto.ntnltyLandMngOfcNm}</span>
                            </label>
                        </div>
                    </div>

                    <!-- 6행 -->
                    <div class="row row-tr">
                        <div class="col-2 col-th">
                            <label class="col-form-label-sm">공사명</label>
                        </div>
                        <div class="col-4">
                            <label class="col-form-label-sm">
                                <span id="cstrnNm">${dto.cstrnNm}</span>
                            </label>
                        </div>
                        <div class="col-2 col-th">
                            <label class="col-form-label-sm">전체 공사기간</label>
                        </div>
                        <div class="col-4">
                            <label class="col-form-label-sm">
                                <span id="cstrnStDt">${dto.cstrnStDt}</span>
                                <span> ~ </span>
                                <span id="cstrnEndDt">${dto.cstrnEndDt}</span>
                            </label>
                        </div>
                    </div>

                    <!-- 7행 -->
                    <div class="row row-tr">
                        <div class="col-2 col-th">
                            <label class="col-form-label-sm">공사시행위치</label>
                        </div>
                        <div class="col-10">
                            <div class="inline optionSel cstrnLocation">
                                <label class="col-form-label-sm">
                                    <span id="sidoNm">${dto.sidoNm}&nbsp</span>
                                    <span id="sggNm">${dto.sggNm}&nbsp</span>
                                    <span id="emdNm">${dto.emdNm}&nbsp</span>
                                    <c:if test ="${dto.earthMountainCd eq 2}"><span id="earthMountainNm">${dto.earthMountainNm}&nbsp</span></c:if>
                                    <span id="bon">${dto.bon}</span>
                                    <span>-</span>
                                    <span id="bu">${dto.bu}</span>
                                </label>
                                <input type="hidden" name="sido" id="sido"/>
                                <input type="hidden" name="sgg" id="sgg"/>
                                <input type="hidden" name="emd" id="emd"/>
                            </div>
                        </div>
                    </div>

                    <!-- 8행 -->
                    <div class="row row-tr text-left">
                        <div class="col-2 col-th">
                            <label class="col-form-label-sm">파일첨부</label>
                        </div>
                        <div class="col-8 col-form-label-sm" style="line-height: 31px;">
                            <span class="sub_th">전체공사위치도 : </span>
                            <span id="cstrnLocMapFileOriginNm">
                                <a href="/rcic/initiationReport/initiationReportFileDown/${dto.seq}/0/master">${dto.cstrnLocMapFileOriginNm}</a>
                            </span>
 						</div>
                        <div class="col-1 text-right col-form-label-sm"style="line-height: 31px;">
                            <span>0MB</span>
                            <span> / </span>
                            <span>50MB</span>
                        </div>
                        <div class="col-1">
                            <%--
                            <input type="button" value="파일찾기" class="searchBtn"  style="font-size: 12px;">
                            --%>
                            <input type="button" value="미리보기" id="previewBtn" onclick="InitiationReportDetailFile.filePreView(this);" style="font-size: 12px; border: 1px solid #D4D4D4; background-color: #FFF;"/>
                            <input type="hidden" value="${dto.cstrnLocMapFilePathPartUserId}"/>
                            <input type="hidden" value="${dto.cstrnLocMapFilePathPartDate}"/>
                            <input type="hidden" value="${dto.cstrnLocMapFileNm}"/>
                        </div>
                    </div>

                    <!-- 세부공사 정보 -->
                    <div class="optionBtnBox d-flex justify-content-between pb-3 mt-5" style="border-bottom: 1px solid #ccc;">
                        <span style="font-size: x-large;">세부공사 정보</span>
                    </div>
                    <!-- 세부공사 1건 -->
                    <div id="subConstInfoDiv">
                        <c:forEach var="subList" items="${initRptSubInfoList}" varStatus="st">
                            <div id="subConstInfoSubDiv">
                                <div class="row row-tr row_first mt-5">
                                    <!-- 1열 (th)-->
                                    <div class="col-1 p-0 text-left border-end-0">
                                        <div class="ps-0 pe-0">
                                            <!-- 1-1행 -->
                                            <div class="row row-tr border-end-0" style="height: 52px;">
                                                <div class="col col-th">
                                                    <label class="col-form-label col-form-label-sm">세부공사명</label>
                                                </div>
                                            </div>
                                            <!-- 1-2행 -->
                                            <div class="row row-tr border-end-0" style="height: 156px;">
                                                <div class="col col-th">
                                                    <label class="col-form-label col-form-label-sm">공사시점</label>
                                                </div>
                                            </div>
                                            <!-- 1-3행 -->
                                            <div class="row row-tr border-bottom-0 border-end-0" style="height: 203px;">
                                                <div class="col col-th">
                                                    <label class="col-form-label col-form-label-sm">파일첨부</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- 2열 -->
                                    <div class="col-5 p-0 text-left">
                                        <!-- 2-1행 -->
                                        <div class="row row-tr border-end-0 align-items-center" style="height: 52px;">
                                            <div class="col">
                                                <label class="col-form-label-sm">
                                                    <span id="subCstrnNm">${subList.subCstrnNm}</span>
                                                </label>
                                            </div>
                                        </div>
                                        <!-- 2-2행 -->
                                        <div class="row row-tr border-end-0 align-items-center" style="height: 156px;">
                                            <div class="p-0">
                                                <div class="row row-tr border-end-0 align-items-center" style="height: 52px;">
                                                    <div class="d-flex justify-content-between">
                                                        <label class="col-form-label-sm">
                                                            <span class="sub_th">주소 :</span>
                                                            <span id="subCstrnStLocAddr">${subList.subCstrnStLocAddr}</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div class="row row-tr border-end-0 align-items-center" style="height: 52px;">
                                                    <div class="col-2">
                                                        <label class="col-form-label-sm">
                                                            <span class="sub_th">좌표 :</span>
                                                        </label>
                                                    </div>
                                                    <div class="col-5">
                                                        <label class="col-form-label-sm">
                                                            <span class="sub_th">위도 : </span>
                                                            <span id="subCstrnStCoodLatitude">${subList.subCstrnStCoodLatitude}</span>
                                                        </label>
                                                    </div>
                                                    <div class="col-5">
                                                        <label class="col-form-label-sm">
                                                            <span class="sub_th">경도 : </span>
                                                            <span id="subCstrnStCoodLongitude">${subList.subCstrnStCoodLongitude}</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div class="row row-tr border-end-0 align-items-center" style="height: 52px;">
                                                    <div class="d-flex justify-content-between">
                                                        <label class="col-form-label-sm">
                                                            <span class="sub_th">노선방향 :</span>
                                                            <span id="subCstrnStDir">${subList.subCstrnStDir}</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 2-3행 -->
                                        <div class="row row-tr border-bottom-0 border-end-0" style="height: 203px;">
                                            <div class="p-0">
                                                <div class="row row-tr border-end-0 align-items-center" style="height: 51px;">
                                                    <div class="col-12">
                                                        <label class="col-form-label-sm">
                                                            <span class="sub_th">세부공사위치도 : </span>
                                                            <span id="subCstrnLocMapFileOriginNm${st.index}">
                                                                <a href="/rcic/initiationReport/initiationReportFileDown/${subList.initRptSeq}/${subList.initRptSubSeq}/subCstrnLocMap">${subList.subCstrnLocMapFileOriginNm}</a>
                                                            </span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div class="row row-tr border-end-0 align-items-center" style="height: 51px;">
                                                    <div class="col-12">
                                                        <label class="col-form-label-sm">
                                                            <span class="sub_th">세부공사시점 : </span>
                                                            <span id="subCstrnStLocMapFileOriginNm${st.index}">
                                                                <a href="/rcic/initiationReport/initiationReportFileDown/${subList.initRptSeq}/${subList.initRptSubSeq}/subCstrnStLocMap">${subList.subCstrnStLocMapFileOriginNm}</a>
                                                            </span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div class="row row-tr border-end-0 align-items-center" style="height: 51px;">
                                                    <div class="col-12">
                                                        <label class="col-form-label-sm">
                                                            <span class="sub_th">세부공사종점 : </span>
                                                            <span id="subCstrnEndLocMapFileOriginNm${st.index}">
                                                        	    <a href="/rcic/initiationReport/initiationReportFileDown/${subList.initRptSeq}/${subList.initRptSubSeq}/subCstrnEndLocMap">${subList.subCstrnEndLocMapFileOriginNm}</a>
                                                            </span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div class="row row-tr border-end-0 align-items-center" style="height: 51px;">
                                                    <div class="col-12">
                                                        <label class="col-form-label-sm">
                                                            <span class="sub_th">세부공사 대표지점 : </span>
                                                            <span id="subCstrnRepsLocMapFileOriginNm${st.index}">
                                                                <a href="/rcic/initiationReport/initiationReportFileDown/${subList.initRptSeq}/${subList.initRptSubSeq}/subCstrnRepsLocMap">${subList.subCstrnRepsLocMapFileOriginNm}</a>
                                                            </span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- 3열 -->
                                    <div class="col-1 p-0">
                                        <div class="col-12 p-0">
                                            <!-- 3-1행 -->
                                            <div class="row row-tr border-end-0" style="height: 52px;">
                                                <div class="col col-th pe-0">
                                                    <label class="col-form-label col-form-label-sm">세부공사기간</label>
                                                </div>
                                            </div>
                                            <!-- 3-2행 -->
                                            <div class="row row-tr border-end-0" style="height: 156px;">
                                                <div class="col col-th">
                                                    <label class="col-form-label col-form-label-sm">공사종점</label>
                                                </div>
                                            </div>
                                            <!-- 3-3행 -->
                                            <div class="row row-tr border-bottom-0 border-end-0" style="height: 203px;">
                                                <div class="p-0">
                                                    <div class="row row-tr border-end-0" style="height: 51px;"></div>
                                                    <div class="row row-tr border-end-0" style="height: 51px;"></div>
                                                    <div class="row row-tr border-end-0" style="height: 51px;"></div>
                                                    <div class="row row-tr border-end-0" style="height: 51px;"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- 4열 -->
                                    <div class="col-5 p-0 text-left">
                                        <!-- 4-1행 -->
                                        <div class="row row-tr border-end-0 align-items-center" style="height: 52px;">
                                            <div class="col-form-label-sm">
                                                <span id="subCstrnStDt">${subList.subCstrnStDt}</span>
                                                <span> ~ </span>
                                                <span id="subCstrnEndDt">${subList.subCstrnEndDt}</span>
                                            </div>
                                        </div>
                                        <!-- 4-2행 -->
                                        <div class="row row-tr border-end-0 align-items-center"  style="height: 156px;">
                                            <div class="p-0">
                                                <div class="row row-tr border-end-0 align-items-center" style="height: 52px;">
                                                    <div class="d-flex justify-content-between">
                                                        <label class="col-form-label-sm">
                                                            <span class="sub_th">주소 :</span>
                                                            <span id="subCstrnEndLocAddr">${subList.subCstrnEndLocAddr}</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div class="row row-tr border-end-0 align-items-center" style="height: 52px;">
                                                    <div class="col-2">
                                                        <label class="col-form-label-sm">
                                                            <span class="sub_th">좌표 :</span>
                                                        </label>
                                                    </div>
                                                    <div class="col-5">
                                                        <label class="col-form-label-sm">
                                                            <span class="sub_th">위도 : </span>
                                                            <span id="subCstrnEndCoodLatitude">${subList.subCstrnEndCoodLatitude}</span>
                                                        </label>
                                                    </div>
                                                    <div class="col-5">
                                                        <label class="col-form-label-sm">
                                                            <span class="sub_th">경도 : </span>
                                                            <span id="subCstrnEndCoodLongitude">${subList.subCstrnEndCoodLongitude}</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div class="row row-tr border-end-0 align-items-center" style="height: 52px;">
                                                    <div class="d-flex justify-content-between">
                                                        <label class="col-form-label-sm">
                                                            <span class="sub_th">노선방향 :</span>
                                                            <span id="subCstrnEndDir">${subList.subCstrnEndDir}</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 4-3행 -->
                                        <div class="row row-tr border-bottom-0 border-end-0" style="height: 203px;">
                                            <div class="p-0">
                                                <div class="row row-tr border-end-0 align-items-center text-right">
                                                    <div class="col-9 col-form-label-sm" style="line-height: 31px;">
                                                        <span>0MB</span>
                                                        <span> / </span>
                                                        <span>50MB</span>
                                                    </div>
                                                    <div class="col-3">
                                                        <input type="button" value="미리보기" onclick="InitiationReportDetailFile.filePreView(this);" style="font-size: 12px; border: 1px solid #D4D4D4; background-color: #FFF;">
                                                        <input type="hidden" value="${dto.cstrnLocMapFilePathPartUserId}"/>
                                                        <input type="hidden" value="${dto.cstrnLocMapFilePathPartDate}"/>
                                                        <input type="hidden" value="${subList.subCstrnLocMapFileNm}"/>
                                                    </div>
                                                </div>
                                                <div class="row row-tr border-end-0 align-items-center text-right">
                                                    <div class="col-9 col-form-label-sm"style="line-height: 31px;">
                                                        <span>0MB</span>
                                                        <span> / </span>
                                                        <span>50MB</span>
                                                    </div>
                                                    <div class="col-3">
                                                        <input type="button" value="미리보기" onclick="InitiationReportDetailFile.filePreView(this);" style="font-size: 12px; border: 1px solid #D4D4D4; background-color: #FFF;">
                                                        <input type="hidden" value="${dto.cstrnLocMapFilePathPartUserId}"/>
                                                        <input type="hidden" value="${dto.cstrnLocMapFilePathPartDate}"/>
                                                        <input type="hidden" value="${subList.subCstrnStLocMapFileNm}"/>
                                                    </div>
                                                </div>
                                                <div class="row row-tr border-end-0 align-items-center text-right">
                                                    <div class="col-9 col-form-label-sm" style="line-height: 31px;">
                                                        <span>0MB</span>
                                                        <span> / </span>
                                                        <span>50MB</span>
                                                    </div>
                                                    <div class="col-3">
                                                        <input type="button" value="미리보기" onclick="InitiationReportDetailFile.filePreView(this);" style="font-size: 12px; border: 1px solid #D4D4D4; background-color: #FFF;">
                                                        <input type="hidden" value="${dto.cstrnLocMapFilePathPartUserId}"/>
                                                        <input type="hidden" value="${dto.cstrnLocMapFilePathPartDate}"/>
                                                        <input type="hidden" value="${subList.subCstrnEndLocMapFileNm}"/>
                                                    </div>
                                                </div>
                                                <div class="row row-tr border-end-0 border-bottom-0 align-items-center text-right">
                                                    <div class="col-9 col-form-label-sm" style="line-height: 31px;">
                                                        <span>0MB</span>
                                                        <span> / </span>
                                                        <span>50MB</span>
                                                    </div>
                                                    <div class="col-3">
                                                        <input type="button" value="미리보기" onclick="InitiationReportDetailFile.filePreView(this);" style="font-size: 12px; border: 1px solid #D4D4D4; background-color: #FFF;">
                                                        <input type="hidden" value="${dto.cstrnLocMapFilePathPartUserId}"/>
                                                        <input type="hidden" value="${dto.cstrnLocMapFilePathPartDate}"/>
                                                        <input type="hidden" value="${subList.subCstrnRepsLocMapFileNm}"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </c:forEach>
                    </div>
                    <!-- 버튼 -->
                    <div class="sectionBtm mt-5">
                        <div class="optionBtnBox text-right">
                            <input type="button" value="목록" class="resetBtn" onclick="MainInfo.movePage('initiationReport');return false;" style="float: left;"/>
                            <%--<c:if test="${userInfo.auth_no == '4' and dto.initiationRptApprFlag == '0'}">
                                <input type="button" value="승인" class="ms-2 me-0 searchBtn" onclick="InitiationReportDetail.initiationReportApproval()"/>
                            </c:if>
                            <c:if test="${userInfo.user_id == dto.regId}">
                                <input type="button" value="수정" class="ms-2 me-0 searchBtn" onclick="InitiationReportDetail.movePageInitiationReportUpdate()"/>
                            </c:if>--%>
                            <c:if test="${auth eq 'admin' && apprFlag eq true}">
                                <input type="button" value="승인" class="ms-2 me-0 searchBtn" onclick="InitiationReportDetail.apprUpdate()"/>
                            </c:if>
                            <c:if test="${auth eq '' && regFlag eq true}">
                                <input type="button" value="수정" class="ms-2 me-0 searchBtn" onclick="InitiationReportDetail.movePageInitiationReportUpdate()"/>
                            </c:if>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</body>
</html>
