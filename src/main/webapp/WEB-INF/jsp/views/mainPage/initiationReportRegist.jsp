<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%@taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
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
    <script type="text/javascript" src="/assets/js/module/initiationReport/initiationReportRegist.js"></script>
    <script type="text/javascript" src="/assets/js/module/map/CoordRegMap.js"></script>
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

        .file {
            display: none;
        }

        .fileBtn {
            color: #FFF;
            background-color: #58970f;
            border: 1px solid #58970f;
            font-weight: 700;
            width: 100%;
            height: 34px;
            text-align: center;
            padding: 6px;
            font-size: 12px;
            cursor:pointer;
        }

        .fileBtn {
            color: #FFF;
            background-color: #58970f;
            border: 1px solid #58970f;
            font-weight: 700;
            width: 100%;
            height: 34px;
            text-align: center;
            padding: 6px;
            font-size: 12px;
            cursor:pointer;
        }

        .cstrnLocation {
            display: flex;
        }

        .invalid-feedback {
        	text-align: left;
        }
        input[name=workDivisionInfo] {
			display:inline-block;
		}

        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }
    </style>
</head>
<body>
<div class="containerWrap">
    <div class="contentsWrap">
        <div class="pageBox">

            <!-- 등록화면 -->
            <c:if test="${dto == null}">
                <div class="pageNav">
                    <img src="/assets/images/icon/home.png" alt="icon">
                    <span class="division">›</span>
                    <span>표준 서식</span>
                    <span class="division">›</span>
                    <span>표준 서식 조회</span>
                    <span class="division">›</span>
                    <span>표준 서식 등록</span>
                </div>
                <div class="bConTxtBox">
                    <p>도로공사 착수신고서 표준서식 등록</p>
                </div>
                <div class="sectionBtm">
                    <form id="initiationReportRegistForm" class="needs-validation" > <!-- action="/rcic/initiationReport/initiationReportRegist" method="post" enctype="multipart/form-data" -->
                        <p class="text-right mb-3"style="font-size: 14px;"><span style="color: red">*&nbsp;</span>필수 입력 항목입니다.</p>
                        <!-- 1행 -->
                        <div class="row row-tr row_first">
                            <div class="col-2 col-th">
                                <label class="col-form-label-sm">입찰공고번호</label>
                            </div>
                            <div class="col-3">
                                <input type="text" name="bidntceno" id="bidntceno" class="form-control form-control-sm" oninput="this.value = this.value.replace(/[^0-9.]/g, '');" maxlength="11" required placeholder="입찰공고번호 입력">
                                <p class="invalid-feedback">※ 입찰공고번호를 입력해주세요.</p>
                            </div>
                            <div class="col-1 ps-0">
                                <input type="button" value="조회" class="searchBtn" style="font-size: 12px;" onclick="InitiationReportRegist.getAnalysisBidntceno()"/>
                            </div>
                            <div class="col-2 col-th">
                                <label class="col-form-label-sm">입찰공고번호 유무<span style="color: red">&nbsp;*</span></label>
                            </div>
                            <div class="col-4 text-left">
                                <input type="radio" name="bidntcenoyn" id="bidntcenoYBtn" class="bidntcenoynBtn" value="Y" onchange="bidntcenoynChange()" checked="checked">
                                <label style="font-size: 14px;" for="bidntcenoYBtn">유 </label>
                                <input type="radio" name="bidntcenoyn" id="bidntcenoNBtn" class="bidntcenoynBtn ms-3" value="N" onchange="bidntcenoynChange()">
                                <label style="font-size: 14px;" for="bidntcenoNBtn">무</label>
                                <input type="text" name="workDivisionInfo" id="workDivisionInfo" class="form-control-sm ms-2 wid70 ph_mini" placeholder="입찰공고번호 없을 시 공사구분 정보 입력" disabled="disabled" required/>
                                <p class="invalid-feedback">※ 입찰공고번호 없을 시 공사구분 정보를 입력하세요.</p>
                            </div>
                        </div>

                        <!-- 2행 -->
                        <div class="row row-tr">
                            <div class="col-2 col-th">
                                <label class="col-form-label-sm">신고인<span style="color: red">&nbsp;*</span><br/>(공사시행자)</label>
                            </div>
                            <div class="col-4 align-self-center">
                                <input type="text" name="dclNm" class="form-control form-control-sm" required placeholder="신고인 성명 또는 업체명 입력">
                                <p class="invalid-feedback">※ 신고인 성명 또는 업체명을 입력해주세요.</p>
                            </div>
                            <div class="col-2 col-th">
                                <label class="col-form-label-sm">사업자등록번호<span style="color: red">&nbsp;*</span></label>
                            </div>
                            <div class="col-4 text-left align-self-center">
                                <input type="text" name="brno" class="form-control form-control-sm" oninput="this.value = this.value.replace(/[^0-9.]/g, '');" minlength="10" maxlength="13" required placeholder="숫자만입력(최소10자리, 최대13자리)"/>
                                <p class="invalid-feedback">※ 사업자등록번호를 입력해주세요.</p>
    <%--                            <input type="text" name="dclRegNum1" class="form-control-sm wid30" maxlength="6" placeholder="앞 6자리 입력">--%>
    <%--                            ---%>
    <%--                            <input type="text" name="dclRegNum2" class="form-control-sm wid30 " maxlength="7" placeholder="뒷 7자리 입력">--%>
    <%--                            <p class="invalid-feedback">※ 주민번호를 숫자만 입력해주세요.</p>--%>
                            </div>
                        </div>

                        <!-- 3행 -->
                        <div class="row row-tr">
                            <div class="col-2 col-th">
                                <label class="col-form-label-sm">주소<span style="color: red">&nbsp;*</span></label>
                            </div>
                            <div class="col-10">
                                <input type="text" name="dclAddr" class="form-control form-control-sm" required placeholder="법인의 경우에는 주된 사무소의 소재지 입력">
                                <p class="invalid-feedback">※ 주소지를 정확하게 입력해주세요.</p>
                            </div>
                        </div>

                        <!-- 4행 -->
                        <div class="row row-tr">
                            <div class="col-2 col-th">
                                <label class="col-form-label-sm">도로종류<span style="color: red">&nbsp;*</span></label>
                            </div>
                            <div class="col-4">
                                <select id="roadTypeCdSb" name="roadTypeCd" class="form-select form-select-sm" required onchange="roadTypeChange()">
                                    <option value="all">선택</option>
                                    <c:forEach var="rtList" items="${roadTypeList}">
                                        <option value="${rtList.cdkey}">${rtList.cdvalue}</option>
                                    </c:forEach>
                                </select>
                                <p class="invalid-feedback">※ 도로종류를 선택해주세요.</p>
                                <input type="hidden" id="roadTypeNm" name="roadTypeNm"/>
                            </div>
                            <div class="col-2 col-th">
                                <label class="col-form-label-sm">공사종류<span style="color: red">&nbsp;*</span></label>
                            </div>
                            <div class="col-4">
                                <select id="cstrnTypeCdSb" name="cstrnTypeCd" class="form-select form-select-sm" required onchange="cstrnTypeChange()">
                                    <option value="all">선택</option>
                                    <c:forEach var="ctList" items="${cstrnTypeList}">
                                        <option value="${ctList.cdkey}">${ctList.cdvalue}</option>
                                    </c:forEach>
                                </select>
                                <p class="invalid-feedback">※ 공사종류를 선택해주세요.</p>
                                <input type="hidden" id="cstrnTypeNm" name="cstrnTypeNm"/>
                            </div>
                        </div>

                        <!-- 5행 -->
                        <div class="row row-tr">
                            <div class="col-2 col-th">
                                <label class="col-form-label-sm">노선번호(노선명)<span style="color: red">&nbsp;*</span></label>
                            </div>
                            <div class="col-4">
                                <input type="text" name="roadRteNo" class="form-control form-control-sm" required placeholder="노선명 입력"/>
                                <p class="invalid-feedback">※ 노선명을 입력해주세요.</p>
                            </div>
                            <div class="col-2 col-th">
                                <label class="col-form-label-sm">관리청<span style="color: red">&nbsp;*</span></label>
                            </div>
                            <div class="col-4">
                                <select id="ntnltyLandMngOfcCdSb" name="ntnltyLandMngOfcCd" class="form-select form-select-sm" onchange="ntnltyLandMngOfcCdChange()" required>
                                    <option value="all">선택</option>
                                    <c:forEach var="nlmoList" items="${ntnltyLandMngOfcList}">
                                        <option value="${nlmoList.cdkey}">${nlmoList.cdvalue}</option>
                                    </c:forEach>
                                </select>
                                <p class="invalid-feedback">※ 관리청을 선택해주세요.</p>
                                <input type="hidden" id="ntnltyLandMngOfcNm" name="ntnltyLandMngOfcNm">
                            </div>
                        </div>

                        <!-- 6행 -->
                        <div class="row row-tr">
                            <div class="col-2 col-th">
                                <label class="col-form-label-sm">공사명<span style="color: red">&nbsp;*</span></label>
                            </div>
                            <div class="col-4">
                                <input type="text" name="cstrnNm" class="form-control form-control-sm" required placeholder="공사명 입력">
                                <p class="invalid-feedback">※ 계약서 상에 기재된공사명을 입력해주세요.</p>
                            </div>
                            <div class="col-2 col-th">
                                <label class="col-form-label-sm">전체 공사기간<span style="color: red">&nbsp;*</span></label>
                            </div>
                            <div class="col-4 text-left">
                                <input type="date" max="9999-12-31" id="cstrnStDt" name="cstrnStDt" class="form-control form-control-sm d-inline-block wid30">
                                <span> ~ </span>
                                <input type="date" max="9999-12-31" id="cstrnEndDt" name="cstrnEndDt" class="form-control form-control-sm d-inline-block wid30">
                                <p class="invalid-feedback">※ 전체 공사기간을 입력해주세요.</p>
                            </div>
                        </div>

                        <!-- 7행 -->
                        <div class="row row-tr">
                            <div class="col-2 col-th">
                                <label class="col-form-label-sm">공사시행위치<span style="color: red">&nbsp;*</span></label>
                            </div>
                            <div class="col-6">
                                <div class="inline optionSel cstrnLocation">
                                    <select name="sido" id="sido" onchange="InitiationReportRegist.getSgg();">
                                        <option value="0" selected="selected">시/도 선택</option>
                                        <c:forEach var="list1" items="${sidoList}">
                                            <option value="${list1.sido}" ${list1.sido == dto.sido ? 'selected="selected"' : '' }>${list1.sidoNm}</option>
                                        </c:forEach>
                                    </select>
                                    <select  name="sgg" id="sgg" onchange="InitiationReportRegist.getEmd();">
                                        <option value="0" selected="selected">시/군/구 선택</option>
                                    </select>
                                    <select name="emd" id="emd" onchange="emdCdChange();">
                                        <option value="0" selected="selected">읍/면/동 선택</option>
                                    </select>
                                    <input type="hidden" name="sidoNm" id="sidoNm"/>
                                    <input type="hidden" name="sggNm" id="sggNm"/>
                                    <input type="hidden" name="emdNm" id="emdNm"/>
                                </div>
                            </div>
                            <div class="col-2 inline optionSel cstrnLocation">
                                <select name="earthMountainCd" id="earthMountainCd" onchange="earthMountainChange()">
                                    <option value="1" selected>대지</option>
                                    <option value="2">산</option>
                                </select>
                                <input type="hidden" name="earthMountainNm" id="earthMountainNm" value="대지"/>
                            </div>
                            <div class="col-2 align-self-center" style="display: flex;">
                                <input type="text" name="bon" oninput="this.value = this.value.replace(/[^0-9.]/g, '')" maxlength="10" style="width: 80px;" />
                                <span>&nbsp&nbsp-&nbsp&nbsp</span>
                                <input type="text" name="bu" oninput="this.value = this.value.replace(/[^0-9.]/g, '')" maxlength="10" style="width: 80px;" />
                            </div>
                        </div>

                        <!-- 8행 -->
                        <div class="row row-tr text-left">
                            <div class="col-2 col-th">
                                <label class="col-form-label-sm">파일첨부<span style="color: red">&nbsp;*</span></label>
                            </div>
                            <div class="col-8 col-form-label-sm" style="line-height: 31px;">
                                <span class="sub_th">전체공사위치도 : </span>
                                <span id="cstrnLocMapFileSp"></span>
                            </div>
                            <div class="col-1 text-right col-form-label-sm"style="line-height: 31px;">
                                <%--
                                <span>0MB</span>
                                <span> / </span>
                                <span>50MB</span>
                                --%>
                            </div>
                            <div class="col-1">
                                <label for="cstrnLocMapFileBtn" style="width: 84px; height: 34px;">
                                    <div class="fileBtn">파일찾기</div>
                                </label>
                                <input type="file" name="cstrnLocMapFile" id="cstrnLocMapFileBtn" onchange="fileCheckUpt(this, 0)" class="file" accept="image/jpeg, image/jpg, image/png"/>
                            </div>
                        </div>

                        <!-- 세부공사 정보 등록 -->
                        <div class="optionBtnBox d-flex justify-content-between pb-3 mt-5" style="border-bottom: 1px solid #ccc;">
                            <span style="font-size: x-large;">세부공사 정보 등록</span>
                            <input type="button" value="+ 세부 공사정보 추가" class="searchBtn w-auto" onclick="subConstInfoDivAdd()"/>
                            <input type="hidden" name="subCstrnCnt"/>
                        </div>
                        <!-- 세부공사 1건 -->
                        <div id="subConstInfoDiv">
                            <div id="subConstInfoSubDiv">
                                <div class="row row-tr row_first mt-5">
                                    <!-- 1열 (th)-->
                                    <div class="col-1 p-0 text-left border-end-0">
                                        <div class="ps-0 pe-0">
                                            <!-- 1-1행 -->
                                            <div class="row row-tr border-end-0" style="height: 52px;">
                                                <div class="col col-th">
                                                    <label class="col-form-label col-form-label-sm">세부공사명<span style="color: red">&nbsp;*</span></label>
                                                </div>
                                            </div>
                                            <!-- 1-2행 -->
                                            <div class="row row-tr border-end-0" style="height: 156px;">
                                                <div class="col col-th">
                                                    <label class="col-form-label col-form-label-sm">공사시점<span style="color: red">&nbsp;*</span></label>
                                                </div>
                                            </div>
                                            <!-- 1-3행 -->
                                            <div class="row row-tr border-bottom-0 border-end-0" style="height: 203px;">
                                                <div class="col col-th">
                                                    <label class="col-form-label col-form-label-sm">파일첨부<span style="color: red">&nbsp;*</span></label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- 2열 -->
                                    <div class="col-5 p-0 text-left">
                                        <!-- 2-1행 -->
                                        <div class="row row-tr border-end-0" style="height: 52px;">
                                            <div class="col">
                                                <input type="hidden" name="subFormList[0].initRptSubSeq" value="1"/>
                                                <input type="text" name="subFormList[0].subCstrnNm" class="form-control form-control-sm" placeholder="세부공사명 입력"/>
                                                <p class="invalid-feedback">※ 계약서 상에 기재된공사명을 입력해주세요.</p>
                                            </div>
                                        </div>
                                        <!-- 2-2행 -->
                                        <div class="row row-tr border-end-0"  style="height: 156px;">
                                            <div class="p-0">
                                                <div class="row row-tr border-end-0">
                                                    <div class="d-flex justify-content-between">
                                                        <label class="col-form-label-sm">
                                                            <span class="sub_th">주소 :</span>
                                                        </label>
                                                        <input type="text" name="subFormList[0].subCstrnStLocAddr" class="form-control-sm" placeholder="공사 시점 위치를 입력하세요." style="width: 433px;"/>
                                                    </div>
                                                </div>
                                                <div class="row row-tr border-end-0">
                                                    <div class="d-flex justify-content-between">
                                                        <label class="col-form-label-sm">
                                                            <span class="sub_th">좌표 :</span>
                                                        </label>
                                                        <input type="text" name="subFormList[0].subCstrnStCoodLatitude" class="form-control-sm" placeholder="위도를 선택하세요." style="width: 150px;"/>
                                                        <input type="text" name="subFormList[0].subCstrnStCoodLongitude" class="form-control-sm" placeholder="경도를 선택하세요." style="width: 150px;"/>
                                                        <input type="button" id='startCoordBtn' value="지도에서찾기" class="searchBtn w-auto" style="font-size: 12px;" onclick="CoordRegMap.createMapClass(this);">
                                                    </div>
                                                </div>
                                                <div class="row row-tr border-end-0">
                                                    <div class="d-flex justify-content-between">
                                                        <label class="col-form-label-sm">
                                                            <span class="sub_th">노선방향 :</span>
                                                        </label>
                                                        <input type="text" name="subFormList[0].subCstrnStDir" class="form-control-sm" placeholder="노선의 상하행 또는 방향을 입력하세요." style="width: 406px;">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 2-3행 -->
                                        <div class="row row-tr border-bottom-0 border-end-0" style="height: 203px;">
                                            <div class="p-0">
                                                <div class="row row-tr border-end-0" style="height: 51px;">
                                                    <div class="col-12">
                                                        <label class="col-form-label-sm">
                                                            <span class="sub_th">세부공사위치도 : </span>
                                                            <span id="subCstrnLocMapFileSp0"></span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div class="row row-tr border-end-0" style="height: 51px;">
                                                    <div class="col-12">
                                                        <label class="col-form-label-sm">
                                                            <span class="sub_th">세부공사시점 : </span>
                                                            <span id="subCstrnStLocMapFileSp0"></span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div class="row row-tr border-end-0" style="height: 51px;">
                                                    <div class="col-12">
                                                        <label class="col-form-label-sm">
                                                            <span class="sub_th">세부공사종점 : </span>
                                                            <span id="subCstrnEndLocMapFileSp0"></span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div class="row row-tr border-end-0" style="height: 51px;">
                                                    <div class="col-12">
                                                        <label class="col-form-label-sm">
                                                            <span class="sub_th">세부공사대표지점 : </span>
                                                            <span id="subCstrnRepsLocMapFileSp0"></span>
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
                                                    <label class="col-form-label col-form-label-sm">세부공사기간<span style="color: red">&nbsp;*</span></label>
                                                </div>
                                            </div>
                                            <!-- 3-2행 -->
                                            <div class="row row-tr border-end-0" style="height: 156px;">
                                                <div class="col col-th">
                                                    <label class="col-form-label col-form-label-sm">공사종점<span style="color: red">&nbsp;*</span></label>
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
                                        <div class="row row-tr border-end-0" style="height: 52px;">
                                            <div class="col">
                                                <input type="date" max="9999-12-31" name="subFormList[0].subCstrnStDt" class="form-control form-control-sm d-inline-block wid30">
                                                <span> ~ </span>
                                                <input type="date" max="9999-12-31" name="subFormList[0].subCstrnEndDt" class="form-control form-control-sm d-inline-block wid30">
                                                <p class="invalid-feedback">※ 세부 공사기간을 입력해주세요.</p>
                                            </div>
                                        </div>
                                        <!-- 4-2행 -->
                                        <div class="row row-tr border-end-0"  style="height: 156px;">
                                            <div class="p-0">
                                                <div class="row row-tr border-end-0">
                                                    <div class="d-flex justify-content-between">
                                                        <label class="col-form-label-sm">
                                                            <span class="sub_th">주소 :</span>
                                                        </label>
                                                        <input type="text" name="subFormList[0].subCstrnEndLocAddr" class="form-control-sm" placeholder="공사 종점 위치를 입력하세요." style="width: 433px;"/>
                                                    </div>
                                                </div>
                                                <div class="row row-tr border-end-0">
                                                    <div class="d-flex justify-content-between">
                                                        <label class="col-form-label-sm">
                                                            <span class="sub_th">좌표 :</span>
                                                        </label>
                                                        <input type="text" name="subFormList[0].subCstrnEndCoodLatitude" class="form-control-sm" placeholder="위도를 선택하세요." style="width: 150px;">
                                                        <input type="text" name="subFormList[0].subCstrnEndCoodLongitude" class="form-control-sm" placeholder="경도를 선택하세요." style="width: 150px;">
                                                        <input type="button" id='endCoordBtn' value="지도에서찾기" class="searchBtn w-auto" style="font-size: 12px;" onclick="CoordRegMap.createMapClass(this);">
                                                    </div>
                                                </div>

                                                <div class="row row-tr border-end-0">
                                                    <div class="d-flex justify-content-between">
                                                        <label class="col-form-label-sm">
                                                            <span class="sub_th">노선방향 :</span>
                                                        </label>
                                                        <input type="text" name="subFormList[0].subCstrnEndDir" class="form-control-sm" placeholder="노선의 상하행 또는 방향을 입력하세요." style="width: 406px;">
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <!-- 4-3행 -->
                                        <div class="row row-tr border-bottom-0 border-end-0" style="height: 203px;">
                                            <div class="p-0">
                                                <div class="row row-tr border-end-0 text-right">
                                                    <div class="col-9 col-form-label-sm" style="line-height: 31px;">
                                                        <%--<span>0MB</span>
                                                        <span> / </span>
                                                        <span>50MB</span>--%>
                                                    </div>
                                                    <div class="col-3">
                                                        <label for="subCstrnLocMapFileBtn0" style="width: 84px; height: 34px;">
                                                            <div class="fileBtn">파일찾기</div>
                                                        </label>
                                                        <input type="file" name="subFormList[0].subCstrnLocMapFile" id="subCstrnLocMapFileBtn0" onchange="fileCheckUpt(this, 0)" class="file" accept="image/jpeg, image/jpg, image/png"/>
                                                    </div>
                                                </div>
                                                <div class="row row-tr border-end-0 text-right">
                                                    <div class="col-9 col-form-label-sm"style="line-height: 31px;">
                                                        <%--<span>0MB</span>
                                                        <span> / </span>
                                                        <span>50MB</span>--%>
                                                    </div>
                                                    <div class="col-3">
                                                        <label for="subCstrnStLocMapFileBtn0" style="width: 84px; height: 34px;">
                                                            <div class="fileBtn">파일찾기</div>
                                                        </label>
                                                        <input type="file" name="subFormList[0].subCstrnStLocMapFile" id="subCstrnStLocMapFileBtn0" onchange="fileCheckUpt(this, 0)" class="file" accept="image/jpeg, image/jpg, image/png"/>
                                                    </div>
                                                </div>
                                                <div class="row row-tr border-end-0 text-right">
                                                    <div class="col-9 col-form-label-sm" style="line-height: 31px;">
                                                        <%--<span>0MB</span>
                                                        <span> / </span>
                                                        <span>50MB</span>--%>
                                                    </div>
                                                    <div class="col-3">
                                                        <label for="subCstrnEndLocMapFileBtn0" style="width: 84px; height: 34px;">
                                                            <div class="fileBtn">파일찾기</div>
                                                        </label>
                                                        <input type="file" name="subFormList[0].subCstrnEndLocMapFile" id="subCstrnEndLocMapFileBtn0" onchange="fileCheckUpt(this, 0)" class="file" accept="image/jpeg, image/jpg, image/png"/>
                                                    </div>
                                                </div>
                                                <div class="row row-tr border-end-0 text-right">
                                                    <div class="col-9 col-form-label-sm" style="line-height: 31px;">
                                                        <%--<span>0MB</span>
                                                        <span> / </span>
                                                        <span>50MB</span>--%>
                                                    </div>
                                                    <div class="col-3">
                                                        <label for="subCstrnRepsLocMapFileBtn0" style="width: 84px; height: 34px;">
                                                            <div class="fileBtn">파일찾기</div>
                                                        </label>
                                                        <input type="file" name="subFormList[0].subCstrnRepsLocMapFile" id="subCstrnRepsLocMapFileBtn0" onchange="fileCheckUpt(this, 0)" class="file" accept="image/jpeg, image/jpg, image/png"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 버튼 -->
                        <div class="sectionBtm mt-5">
                            <div class="optionBtnBox text-right">
                                <input type="button" value="목록" class="resetBtn" onclick="MainInfo.movePage('initiationReport');return false;" style="float: left;">
                                <input type="button" value="취소" class="resetBtn" onclick="InitiationReportRegist.resetClick()">
                                <!--<input type="submit" value="제출" class="ms-2 me-0 searchBtn">-->
                                <input type="button" value="제출" class="ms-2 me-0 searchBtn" onclick="initiationReportRegist()">
                            </div>
                        </div>
                        <template id="coordRegMapTemp">
                            <div id='coordRegMap' class='coordRegMap' >
                                <div id='mapDivHeader' class='mapDivHeaderCls'  >
                                        <img id='coordRegMapClose' src="/assets/images/button/wCloseBtn.png" class="coordRegMapCloseCls" onclick="CoordRegMap.emptyMapDiv(this);" >
                                </div>
                            </div>
                        </template>
                    </form>
                </div>
            </c:if>

            <!-- 수정화면 -->
            <c:if test="${dto != null}">
                <div class="pageNav">
                    <img src="/assets/images/icon/home.png" alt="icon">
                    <span class="division">›</span>
                    <span>표준 서식</span>
                    <span class="division">›</span>
                    <span>표준 서식 조회</span>
                    <span class="division">›</span>
                    <span>표준 서식 수정</span>
                </div>
                <div class="bConTxtBox">
                    <p>도로공사 착수신고서 표준서식 수정</p>
                </div>
                <div class="sectionBtm">
                    <form id="initiationReportUpdateForm" class="needs-validation"><%--action="/rcic/initiationReport/initiationReportUpdate" method="post" enctype="multipart/form-data"--%>
                        <input type="hidden" id="seq" name="seq" value="${dto.seq}"/>
                        <input type="hidden" id="initRptSeq" name="initRptSeq" value="${dto.seq}"/>
                        <p class="text-right mb-3"style="font-size: 14px;"><span style="color: red">*&nbsp;</span>필수 입력 항목입니다.</p>
                        <!-- 1행 -->
                        <div class="row row-tr row_first">
                            <div class="col-2 col-th">
                                <label class="col-form-label-sm">입찰공고번호</label>
                            </div>
                            <div class="col-3">
                                <input type="text" name="bidntceno" id="bidntcenoUpt" class="form-control form-control-sm" oninput="this.value = this.value.replace(/[^0-9.]/g, '');" maxlength="11" placeholder="입찰공고번호 입력" value="${dto.bidntceno}" readonly required/>
                                <p class="invalid-feedback">※ 입찰공고번호를 입력해주세요.</p>
                            </div>
                            <div class="col-1 ps-0">
                                <input type="button" value="조회" class="searchBtn" style="font-size: 12px;" onclick="InitiationReportRegist.getAnalysisBidntceno('update')"/>
                            </div>
                            <div class="col-2 col-th">
                                <label class="col-form-label-sm">입찰공고번호 유무<span style="color: red">&nbsp;*</span></label>
                            </div>
                            <div class="col-4 text-left">
                                <c:choose>
                                    <c:when test="${dto.bidntcenoyn == 'Y'}">
                                        <input type="radio" name="bidntcenoyn" id="bidntcenoYBtn" class="bidntcenoynBtn" value="Y" onchange="bidntcenoynChange()" <c:if test ="${dto.bidntcenoyn eq 'Y'}">checked="checked"</c:if>/>
                                        <label style="font-size: 14px;" for="bidntcenoYBtn">유</label>
                                        <input type="radio" name="bidntcenoyn" id="bidntcenoNBtn" class="bidntcenoynBtn ms-3" value="N" onchange="bidntcenoynChange()"/>
                                        <label style="font-size: 14px;" for="bidntcenoNBtn">무</label>
                                        <input type="text" name="workDivisionInfo" id="workDivisionInfoUpt" class="form-control-sm ms-2 wid70 ph_mini" placeholder="입찰공고번호 없을 시 공사구분 정보 입력" disabled="disabled" required/>
                                    </c:when>
                                    <c:otherwise>
                                        <input type="radio" name="bidntcenoyn" id="bidntcenoYBtn" class="bidntcenoynBtn" value="Y" onchange="bidntcenoynChange()"/>
                                        <label style="font-size: 14px;" for="bidntcenoYBtn">유</label>
                                        <input type="radio" name="bidntcenoyn" id="bidntcenoNBtn" class="bidntcenoynBtn ms-3" value="N" onchange="bidntcenoynChange()" <c:if test ="${dto.bidntcenoyn eq 'N'}">checked="checked"</c:if>/>
                                        <label style="font-size: 14px;" for="bidntcenoNBtn">무</label>
                                        <input type="text" name="workDivisionInfo" id="workDivisionInfoUpt" class="form-control-sm ms-2 wid70 ph_mini" placeholder="입찰공고번호 없을 시 공사구분 정보 입력" value="${dto.workDivisionInfo}" required/>
                                    </c:otherwise>
                                </c:choose>
                                <p class="invalid-feedback">※ 입찰공고번호 없을 시 공사구분 정보를 입력하세요.</p>
                            </div>
                        </div>

                        <!-- 2행 -->
                        <div class="row row-tr">
                            <div class="col-2 col-th">
                                <label class="col-form-label-sm">신고인<span style="color: red">&nbsp;*</span><br/>(공사시행자)</label>
                            </div>
                            <div class="col-4 align-self-center">
                                <input type="text" name="dclNm" class="form-control form-control-sm" placeholder="신고인 성명 또는 업체명 입력" value="${dto.dclNm}" required/>
                                <p class="invalid-feedback">※ 신고인 성명 또는 업체명을 입력해주세요.</p>
                            </div>
                            <div class="col-2 col-th">
                                <label class="col-form-label-sm">사업자등록번호<span style="color: red">&nbsp;*</span></label>
                            </div>
                            <div class="col-4 text-left align-self-center">
                                <input type="text" name="brno" class="form-control form-control-sm" oninput="this.value = this.value.replace(/[^0-9.]/g, '')" minlength="10" maxlength="13" placeholder="숫자만입력(최소10자리, 최대13자리)" value="${dto.brno}" required/>
                                <p class="invalid-feedback">※ 사업자등록번호를 입력해주세요.</p>
    <%--                            <input type="text" name="dclRegNum1" class="form-control-sm wid30" maxlength="6" placeholder="앞 6자리 입력">--%>
    <%--                            ---%>
    <%--                            <input type="text" name="dclRegNum2" class="form-control-sm wid30 " maxlength="7" placeholder="뒷 7자리 입력">--%>
    <%--                            <p class="invalid-feedback">※ 주민번호를 숫자만 입력해주세요.</p>--%>
                            </div>
                        </div>

                        <!-- 3행 -->
                        <div class="row row-tr">
                            <div class="col-2 col-th">
                                <label class="col-form-label-sm">주소<span style="color: red">&nbsp;*</span></label>
                            </div>
                            <div class="col-10">
                                <input type="text" name="dclAddr" class="form-control form-control-sm" placeholder="법인의 경우에는 주된 사무소의 소재지 입력" value="${dto.dclAddr}" required/>
                                <p class="invalid-feedback">※ 주소지를 정확하게 입력해주세요.</p>
                            </div>
                        </div>

                        <!-- 4행 -->
                        <div class="row row-tr">
                            <div class="col-2 col-th">
                                <label class="col-form-label-sm">도로종류<span style="color: red">&nbsp;*</span></label>
                            </div>
                            <div class="col-4">
                                <select id="roadTypeCdSb" name="roadTypeCd" class="form-select form-select-sm" onchange="roadTypeChange()" required>
                                    <option value="all">선택</option>
                                    <c:forEach var="rtList" items="${roadTypeList}">
                                        <option value="${rtList.cdkey}" ${rtList.cdkey == dto.roadTypeCd ? 'selected="selected"' : '' }>${rtList.cdvalue}</option>
                                    </c:forEach>
                                </select>
                                <p class="invalid-feedback">※ 도로종류를 선택해주세요.</p>
                                <input type="hidden" id="roadTypeNmUpt" name="roadTypeNm" value="${dto.roadTypeNm}"/>
                            </div>
                            <div class="col-2 col-th">
                                <label class="col-form-label-sm">공사종류<span style="color: red">&nbsp;*</span></label>
                            </div>
                            <div class="col-4">
                                <select id="cstrnTypeCdSb" name="cstrnTypeCd" class="form-select form-select-sm" onchange="cstrnTypeChange()" required>
                                    <option value="all">선택</option>
                                    <c:forEach var="ctList" items="${cstrnTypeList}">
                                        <option value="${ctList.cdkey}" ${ctList.cdkey == dto.cstrnTypeCd ? 'selected="selected"' : '' }>${ctList.cdvalue}</option>
                                    </c:forEach>
                                </select>
                                <p class="invalid-feedback">※ 공사종류를 선택해주세요.</p>
                                <input type="hidden" id="cstrnTypeNmUpt" name="cstrnTypeNm" value="${dto.cstrnTypeNm}"/>
                            </div>
                        </div>

                        <!-- 5행 -->
                        <div class="row row-tr">
                            <div class="col-2 col-th">
                                <label class="col-form-label-sm">노선번호(노선명)<span style="color: red">&nbsp;*</span></label>
                            </div>
                            <div class="col-4">
                                <input type="text" name="roadRteNo" class="form-control form-control-sm" placeholder="노선명 입력" value="${dto.roadRteNo}" required/>
                                <p class="invalid-feedback">※ 노선명을 입력해주세요.</p>
                            </div>
                            <div class="col-2 col-th">
                                <label class="col-form-label-sm">관리청<span style="color: red">&nbsp;*</span></label>
                            </div>
                            <div class="col-4">
                                <select id="ntnltyLandMngOfcCdSb" name="ntnltyLandMngOfcCd" class="form-select form-select-sm" onchange="ntnltyLandMngOfcCdChange()" required>
                                    <option value="all">선택</option>
                                    <c:forEach var="nlmoList" items="${ntnltyLandMngOfcList}">
                                        <option value="${nlmoList.cdkey}" ${nlmoList.cdkey == dto.ntnltyLandMngOfcCd ? 'selected="selected"' : '' }>${nlmoList.cdvalue}</option>
                                    </c:forEach>
                                </select>
                                <p class="invalid-feedback">※ 관리청을 선택해주세요.</p>
                                <input type="hidden" id="ntnltyLandMngOfcNmUpt" name="ntnltyLandMngOfcNm" value="${dto.ntnltyLandMngOfcNm}"/>
                            </div>
                        </div>

                        <!-- 6행 -->
                        <div class="row row-tr">
                            <div class="col-2 col-th">
                                <label class="col-form-label-sm">공사명<span style="color: red">&nbsp;*</span></label>
                            </div>
                            <div class="col-4">
                                <input type="text" name="cstrnNm" class="form-control form-control-sm" placeholder="공사명 입력" value="${dto.cstrnNm}" required/>
                                <p class="invalid-feedback">※ 계약서 상에 기재된공사명을 입력해주세요.</p>
                            </div>
                            <div class="col-2 col-th">
                                <label class="col-form-label-sm">전체 공사기간<span style="color: red">&nbsp;*</span></label>
                            </div>
                            <div class="col-4 text-left">
                                <input type="date" max="9999-12-31" name="cstrnStDt" class="form-control form-control-sm d-inline-block wid30" value="${dto.cstrnStDt}"/>
                                <span> ~ </span>
                                <input type="date" max="9999-12-31" name="cstrnEndDt" class="form-control form-control-sm d-inline-block wid30" value="${dto.cstrnEndDt}"/>
                                <p class="invalid-feedback">※ 전체 공사기간을 입력해주세요.</p>
                            </div>
                        </div>

                        <!-- 7행 -->
                        <div class="row row-tr">
                            <div class="col-2 col-th">
                                <label class="col-form-label-sm">공사시행위치<span style="color: red">&nbsp;*</span></label>
                            </div>
                            <div class="col-6">
                                <div class="inline optionSel cstrnLocation">
                                    <select name="sido" id="sidoUpt" onchange="InitiationReportRegist.getSgg();">
                                        <option value="0" selected="selected">시/도 선택</option>
                                        <c:forEach var="list1" items="${sidoList}">
                                            <option value="${list1.sido}" ${list1.sido == dto.sido ? 'selected="selected"' : '' }>${list1.sidoNm}</option>
                                        </c:forEach>
                                    </select>
                                    <select  name="sgg" id="sggUpt" onchange="InitiationReportRegist.getEmd();">
                                        <option value="0" selected="selected">시/군/구 선택</option>
                                        <c:forEach var="list2" items="${sggList}">
                                            <option value="${list2.sgg}" ${list2.sgg == dto.sgg ? 'selected="selected"' : '' }>${list2.sggNm}</option>
                                        </c:forEach>
                                    </select>
                                    <select name="emd" id="emdUpt" onchange="emdCdChange()">
                                        <option value="0" selected="selected">읍/면/동 선택</option>
                                        <c:forEach var="list3" items="${emdList}">
                                            <option value="${list3.emd}" ${list3.emd == dto.emd ? 'selected="selected"' : '' }>${list3.emdNm}</option>
                                        </c:forEach>
                                    </select>
                                    <input type="hidden" name="sidoNm" id="sidoNmUpt" value="${dto.sidoNm}"/>
                                    <input type="hidden" name="sggNm" id="sggNmUpt" value="${dto.sggNm}"/>
                                    <input type="hidden" name="emdNm" id="emdNmUpt" value="${dto.emdNm}"/>
                                </div>
                            </div>
                            <div class="col-2 inline optionSel cstrnLocation">
                                <select name="earthMountainCd" id="earthMountainCdUpt" onchange="earthMountainChange()">
                                    <option value="1" <c:if test ="${dto.earthMountainCd eq 1}">selected="selected"</c:if>>대지</option>
                                    <option value="2" <c:if test ="${dto.earthMountainCd eq 2}">selected="selected"</c:if>>산</option>
                                </select>
                                <input type="hidden" name="earthMountainNm" id="earthMountainNmUpt" value="${dto.earthMountainNm}"/>
                            </div>
                            <div class="col-2 align-self-center" style="display: flex;">
                                <input type="text" name="bon" oninput="this.value = this.value.replace(/[^0-9.]/g, '')" maxlength="10" style="width: 80px;" value="${dto.bon}"/>
                                <span>&nbsp&nbsp-&nbsp&nbsp</span>
                                <input type="text" name="bu" oninput="this.value = this.value.replace(/[^0-9.]/g, '')" maxlength="10" style="width: 80px;" value="${dto.bu}"/>
                            </div>
                        </div>

                        <!-- 8행 -->
                        <div class="row row-tr text-left">
                            <div class="col-2 col-th">
                                <label class="col-form-label-sm">파일첨부<span style="color: red">&nbsp;*</span></label>
                            </div>
                            <div class="col-8 col-form-label-sm" style="line-height: 31px;">
                                <span class="sub_th">전체공사위치도 : </span>
                                <span id="cstrnLocMapFileSpUpt">${dto.cstrnLocMapFileOriginNm}</span>
                            </div>
                            <div class="col-1 text-right col-form-label-sm"style="line-height: 31px;">
                                <%--<span>0MB</span>
                                <span> / </span>
                                <span>50MB</span>--%>
                            </div>
                            <div class="col-1">
                                <label for="cstrnLocMapFileBtnUpt" style="width: 84px; height: 34px;">
                                    <div class="fileBtn">파일찾기</div>
                                </label>
                                <input type="file" id="cstrnLocMapFileBtnUpt" onchange="fileCheckUpt(this, 'all')" class="file" accept="image/jpeg, image/jpg, image/png"/>
                            </div>
                        </div>


                        <!-- 세부공사 정보 등록 -->
                        <div class="optionBtnBox d-flex justify-content-between pb-3 mt-5" style="border-bottom: 1px solid #ccc;">
                            <span style="font-size: x-large;">세부공사 정보 등록</span>
                            <input type="button" value="+ 세부 공사정보 추가" class="searchBtn w-auto" onclick="subConstInfoDivAdd()"/>
                            <input type="hidden" id="subCstrnCntUpt" name="subCstrnCnt"/>
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
                                                        <label class="col-form-label col-form-label-sm">세부공사명<span style="color: red">&nbsp;*</span></label>
                                                    </div>
                                                </div>
                                                <!-- 1-2행 -->
                                                <div class="row row-tr border-end-0" style="height: 156px;">
                                                    <div class="col col-th">
                                                        <label class="col-form-label col-form-label-sm">공사시점<span style="color: red">&nbsp;*</span></label>
                                                    </div>
                                                </div>
                                                <!-- 1-3행 -->
                                                <div class="row row-tr border-bottom-0 border-end-0" style="height: 203px;">
                                                    <div class="col col-th">
                                                        <label class="col-form-label col-form-label-sm">파일첨부<span style="color: red">&nbsp;*</span></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- 2열 -->
                                        <div class="col-5 p-0 text-left">
                                            <!-- 2-1행 -->
                                            <div class="row row-tr border-end-0" style="height: 52px;">
                                                <div class="col">
                                                    <input type="hidden" name="subFormList[${st.index}].initRptSubSeq" value="${subList.initRptSubSeq}"/>
                                                    <input type="text" name="subFormList[${st.index}].subCstrnNm" class="form-control form-control-sm" value="${subList.subCstrnNm}" placeholder="세부공사명 입력"/>
                                                    <p class="invalid-feedback">※ 계약서 상에 기재된공사명을 입력해주세요.</p>
                                                </div>
                                            </div>
                                            <!-- 2-2행 -->
                                            <div class="row row-tr border-end-0"  style="height: 156px;">
                                                <div class="p-0">
                                                    <div class="row row-tr border-end-0">
                                                        <div class="d-flex justify-content-between">
                                                            <label class="col-form-label-sm">
                                                                <span class="sub_th">주소 :</span>
                                                            </label>
                                                            <input type="text" name="subFormList[${st.index}].subCstrnStLocAddr" class="form-control-sm" value="${subList.subCstrnStLocAddr}" placeholder="공사 시점 위치를 입력하세요." style="width: 433px;"/>
                                                        </div>
                                                    </div>
                                                    <div class="row row-tr border-end-0">
                                                        <div class="d-flex justify-content-between">
                                                            <label class="col-form-label-sm">
                                                                <span class="sub_th">좌표 :</span>
                                                            </label>
                                                            <input type="text" name="subFormList[${st.index}].subCstrnStCoodLatitude" class="form-control-sm" value="${subList.subCstrnStCoodLatitude}" placeholder="위도를 선택하세요." style="width: 150px;"/>
                                                            <input type="text" name="subFormList[${st.index}].subCstrnStCoodLongitude" class="form-control-sm" value="${subList.subCstrnStCoodLongitude}" placeholder="경도를 선택하세요." style="width: 150px;"/>
                                                            <input type="button" id='startCoordBtn' value="지도에서찾기" class="searchBtn w-auto" style="font-size: 12px;" onclick="CoordRegMap.createMapClass(this);">
                                                        </div>
                                                    </div>
                                                    <div class="row row-tr border-end-0">
                                                        <div class="d-flex justify-content-between">
                                                            <label class="col-form-label-sm">
                                                                <span class="sub_th">노선방향 :</span>
                                                            </label>
                                                            <input type="text" name="subFormList[${st.index}].subCstrnStDir" class="form-control-sm" value="${subList.subCstrnStDir}" placeholder="노선의 상하행 또는 방향을 입력하세요." style="width: 406px;">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- 2-3행 -->
                                            <div class="row row-tr border-bottom-0 border-end-0" style="height: 203px;">
                                                <div class="p-0">
                                                    <div class="row row-tr border-end-0" style="height: 51px;">
                                                        <div class="col-12">
                                                            <label class="col-form-label-sm">
                                                                <span class="sub_th">세부공사위치도 : </span>
                                                                <span id="subCstrnLocMapFileSpUpt${st.index}">${subList.subCstrnLocMapFileOriginNm}</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div class="row row-tr border-end-0" style="height: 51px;">
                                                        <div class="col-12">
                                                            <label class="col-form-label-sm">
                                                                <span class="sub_th">세부공사시점 : </span>
                                                                <span id="subCstrnStLocMapFileSpUpt${st.index}">${subList.subCstrnStLocMapFileOriginNm}</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div class="row row-tr border-end-0" style="height: 51px;">
                                                        <div class="col-12">
                                                            <label class="col-form-label-sm">
                                                                <span class="sub_th">세부공사종점 : </span>
                                                                <span id="subCstrnEndLocMapFileSpUpt${st.index}">${subList.subCstrnEndLocMapFileOriginNm}</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div class="row row-tr border-end-0" style="height: 51px;">
                                                        <div class="col-12">
                                                            <label class="col-form-label-sm">
                                                                <span class="sub_th">세부공사대표지점 : </span>
                                                                <span id="subCstrnRepsLocMapFileSpUpt${st.index}">${subList.subCstrnRepsLocMapFileOriginNm}</span>
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
                                                        <label class="col-form-label col-form-label-sm">세부공사기간<span style="color: red">&nbsp;*</span></label>
                                                    </div>
                                                </div>
                                                <!-- 3-2행 -->
                                                <div class="row row-tr border-end-0" style="height: 156px;">
                                                    <div class="col col-th">
                                                        <label class="col-form-label col-form-label-sm">공사종점<span style="color: red">&nbsp;*</span></label>
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
                                            <div class="row row-tr border-end-0" style="height: 52px;">
                                                <div class="col">
                                                    <input type="date" max="9999-12-31" name="subFormList[${st.index}].subCstrnStDt" value="${subList.subCstrnStDt}" class="form-control form-control-sm d-inline-block wid30">
                                                    <span> ~ </span>
                                                    <input type="date" max="9999-12-31" name="subFormList[${st.index}].subCstrnEndDt" value="${subList.subCstrnEndDt}" class="form-control form-control-sm d-inline-block wid30">
                                                    <p class="invalid-feedback">※ 세부 공사기간을 입력해주세요.</p>
                                                </div>
                                            </div>
                                            <!-- 4-2행 -->
                                            <div class="row row-tr border-end-0"  style="height: 156px;">
                                                <div class="p-0">
                                                    <div class="row row-tr border-end-0">
                                                        <div class="d-flex justify-content-between">
                                                            <label class="col-form-label-sm">
                                                                <span class="sub_th">주소 :</span>
                                                            </label>
                                                            <input type="text" name="subFormList[${st.index}].subCstrnEndLocAddr" class="form-control-sm" value="${subList.subCstrnEndLocAddr}" placeholder="공사 종점 위치를 입력하세요." style="width: 433px;"/>
                                                        </div>
                                                    </div>
                                                    <div class="row row-tr border-end-0">
                                                        <div class="d-flex justify-content-between">
                                                            <label class="col-form-label-sm">
                                                                <span class="sub_th">좌표 :</span>
                                                            </label>
                                                            <input type="text" name="subFormList[${st.index}].subCstrnEndCoodLatitude" class="form-control-sm" value="${subList.subCstrnEndCoodLatitude}" placeholder="위도를 선택하세요." style="width: 150px;">
                                                            <input type="text" name="subFormList[${st.index}].subCstrnEndCoodLongitude" class="form-control-sm" value="${subList.subCstrnEndCoodLongitude}" placeholder="경도를 선택하세요." style="width: 150px;">
                                                            <input type="button" id='endCoordBtn' value="지도에서찾기" class="searchBtn w-auto" style="font-size: 12px;" onclick="CoordRegMap.createMapClass(this);">
                                                        </div>
                                                    </div>

                                                    <div class="row row-tr border-end-0">
                                                        <div class="d-flex justify-content-between">
                                                            <label class="col-form-label-sm">
                                                                <span class="sub_th">노선방향 :</span>
                                                            </label>
                                                            <input type="text" name="subFormList[${st.index}].subCstrnEndDir" class="form-control-sm" value="${subList.subCstrnEndDir}" placeholder="노선의 상하행 또는 방향을 입력하세요." style="width: 406px;">
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <!-- 4-3행 -->
                                            <div class="row row-tr border-bottom-0 border-end-0" style="height: 203px;">
                                                <div class="p-0">
                                                    <div class="row row-tr border-end-0 text-right">
                                                        <div class="col-9 col-form-label-sm" style="line-height: 31px;">
                                                            <%--<span>0MB</span>
                                                            <span> / </span>
                                                            <span>50MB</span>--%>
                                                        </div>
                                                        <div class="col-3">
                                                            <label for="subCstrnLocMapFileBtnUpt${st.index}" style="width: 84px; height: 34px;">
                                                                <div class="fileBtn">파일찾기</div>
                                                            </label>
                                                            <input type="file" id="subCstrnLocMapFileBtnUpt${st.index}" onchange="fileCheckUpt(this, ${st.index})" class="file" accept="image/jpeg, image/jpg, image/png"/>
                                                        </div>
                                                    </div>
                                                    <div class="row row-tr border-end-0 text-right">
                                                        <div class="col-9 col-form-label-sm"style="line-height: 31px;">
                                                            <%--<span>0MB</span>
                                                            <span> / </span>
                                                            <span>50MB</span>--%>
                                                        </div>
                                                        <div class="col-3">
                                                            <label for="subCstrnStLocMapFileBtnUpt${st.index}" style="width: 84px; height: 34px;">
                                                                <div class="fileBtn">파일찾기</div>
                                                            </label>
                                                            <input type="file" id="subCstrnStLocMapFileBtnUpt${st.index}" onchange="fileCheckUpt(this, ${st.index})" class="file" accept="image/jpeg, image/jpg, image/png"/>
                                                        </div>
                                                    </div>
                                                    <div class="row row-tr border-end-0 text-right">
                                                        <div class="col-9 col-form-label-sm" style="line-height: 31px;">
                                                            <%--<span>0MB</span>
                                                            <span> / </span>
                                                            <span>50MB</span>--%>
                                                        </div>
                                                        <div class="col-3">
                                                            <label for="subCstrnEndLocMapFileBtnUpt${st.index}" style="width: 84px; height: 34px;">
                                                                <div class="fileBtn">파일찾기</div>
                                                            </label>
                                                            <input type="file" id="subCstrnEndLocMapFileBtnUpt${st.index}" onchange="fileCheckUpt(this, ${st.index})" class="file" accept="image/jpeg, image/jpg, image/png"/>
                                                        </div>
                                                    </div>
                                                    <div class="row row-tr border-end-0 text-right">
                                                        <div class="col-9 col-form-label-sm" style="line-height: 31px;">
                                                            <%--<span>0MB</span>
                                                            <span> / </span>
                                                            <span>50MB</span>--%>
                                                        </div>
                                                        <div class="col-3">
                                                            <label for="subCstrnRepsLocMapFileBtnUpt${st.index}" style="width: 84px; height: 34px;">
                                                                <div class="fileBtn">파일찾기</div>
                                                            </label>
                                                            <input type="file" id="subCstrnRepsLocMapFileBtnUpt${st.index}" onchange="fileCheckUpt(this, ${st.index})" class="file" accept="image/jpeg, image/jpg, image/png"/>
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
                                <input type="button" value="목록" class="resetBtn" onclick="MainInfo.movePage('initiationReport');return false;" style="float: left;">
                                <input type="button" value="취소" class="resetBtn" onclick="InitiationReportRegist.resetClick()">
                                <input type="button" value="저장" class="ms-2 me-0 searchBtn" onclick="initiationReportUpdate()">
                            </div>
                        </div>
                        <div id='coordRegMap' class='coordRegMap' >
                            <button id='coordRegMapClose' type="button" class="btn btn-default" data-dismiss="modal" style="display:none"
                                    onclick="CoordRegMap.emptyMapDiv(this);">닫기</button>
                        </div>
                    </form>
                </div>
            </c:if>
        </div>
    </div>
</div>
<script type="text/javascript">
    var _commonSearch = new CommonSearch({});
    var _search = null;
    var _self = this;
</script>
</body>
</html>
