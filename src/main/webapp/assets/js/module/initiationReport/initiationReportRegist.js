$(document).ready(function(){
    // 공사시행위치 selectBox
    InitiationReportRegist.getSido();
});


var InitiationReportRegist = {
    getAnalysisBidntceno : function (param) {
        let bidntceno;
        let formData = new FormData($("#initiationReportRegistForm")[0]);
        let bidntcenoyn = document.querySelector('input[name="bidntcenoyn"]:checked').value;
        if ( bidntcenoyn == 'N') {
         return alert("입찰공고번호 유무가 '무'일 경우 조회할 수 없습니다.");
        }
        if (param != "update"){
            // 입찰공고번호 조회 셋팅
            bidntceno = $("#bidntceno").val();
            // formData = $("#initiationReportRegistForm").serializeObject();
            if ( bidntceno == '' ) {
                return alert("입찰공고번호를 입력 후 다시 조회해주세요.");
            }
        } else {
            // 입찰공고번호 조회 셋팅
            bidntceno = $("#bidntcenoUpt").val();
            formData = $("#initiationReportUpdateForm").serializeObject();
            if ( bidntceno == '' ) {
                return alert("입찰공고번호를 입력 후 다시 조회해주세요.");
            }
        }

        formData.currPage = '';
        formData.listCnt = 0;
        formData.url = "/rcic/initiationReport/getAnalysisBidntceno";

        let dataList = setDefault(formData);
        $.commonAjax(dataList,'', function(response, status, headers, config) {

            let bidntcenoyn = document.getElementsByName("bidntcenoyn");
            let bidntcenoY = document.getElementById("bidntcenoYBtn");
            let bidntcenoN = document.getElementById("bidntcenoNBtn");
            if ( response.dto.bidntceno == "" || response.dto.bidntceno == undefined) {
                bidntcenoY.checked = false;
                bidntcenoN.checked = true;
                bidntcenoynChange();
                // bidntcenoynChange('update');
                // bidntcenoynChange('regist');
                return alert("존재하지 않는 입찰공고번호 입니다.");
            }
            let roadTypeCd = response.dto.constRoadClss;
            let roadTypeNm = response.dto.constRoadNm;
            let cstrnStDt = response.dto.cstrnStDt;
            let cstrnEndDt = response.dto.cstrnEndDt;
            let sidoCd = response.dto.sidoCd;
            let sggCd = response.dto.sggCd;
            let emdCd = response.dto.emdCd;

            $("#roadTypeCdSb").val(roadTypeCd);
            $("#roadTypeNm").val(roadTypeNm);
            $("#cstrnStDt").val(cstrnStDt);
            $("#cstrnEndDt").val(cstrnEndDt);
            $("#sido").val(sidoCd);

            let sggHtml = "";
            let sggList = response.sggList;

            for(var i in sggList){
                if (response.dto.sgg == sggList[i].sgg){
                    sggHtml += '<option value = "' + sggList[i].sgg + '" selected="selected">' + sggList[i].sggNm + '</option>';
                } else {
                    sggHtml += '<option value = "' + sggList[i].sgg + '">' + sggList[i].sggNm + '</option>';
                }
            }
            $('select[name="sgg"]').append(sggHtml);

            let emdHtml = "";
            let emdList = response.emdList;

            for(var i in emdList){
                if (response.dto.emd == emdList[i].emd){
                    emdHtml += '<option value = "' + emdList[i].emd + '" selected="selected">' + emdList[i].emdNm + '</option>';
                } else {
                    emdHtml += '<option value = "' + emdList[i].emd + '">' + emdList[i].emdNm + '</option>';
                }
            }

            $('select[name="emd"]').append(emdHtml);

            bidntcenoY.checked = true;
            bidntcenoynChange();
            alert("도로종류, 전체 공사기간, 공사시행위치 의 경우\n불러온 데이터가 정확하지 않을 수 있으니\n입력할 내용과 일치하는지 꼭 확인하여\n수정하여 주시기 바랍니다.");
        },false,function(e){
            console.log(e);
        });
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

        $("#sidoNm").val($("#sido option:checked").text());
        $("#sidoNmUpt").val($("#sidoUpt option:checked").text());

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

        $("#sggNm").val($("#sgg option:checked").text());
        $("#sggNmUpt").val($("#sggUpt option:checked").text());

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

    resetClick: function(){
        if (!confirm("취소하시겠습니까?")) {
            return;
        }
        MainInfo.movePage('initiationReport');
    }
}

let i = 0;
// 세부 공사정보 div 추가
function subConstInfoDivAdd() {
    const checkVal = document.querySelector('input[name="subFormList[0].initRptSubSeq"]');

    if (checkVal != null) {
        i++;
    };

    let str = `
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
                        <input type="hidden" name="subFormList[`+i+`].initRptSubSeq" value="`+ (i+1) +`"/>
                        <input type="text" name="subFormList[`+i+`].subCstrnNm" class="form-control form-control-sm" placeholder="세부공사명 입력"/>
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
                                <input type="text" name="subFormList[`+i+`].subCstrnStLocAddr" class="form-control-sm" placeholder="공사 시점 위치를 입력하세요." style="width: 433px;"/>
                            </div>
                        </div>
                        <div class="row row-tr border-end-0">
                            <div class="d-flex justify-content-between">
                                <label class="col-form-label-sm">
                                    <span class="sub_th">좌표 :</span>
                                </label>
                                <input type="text" name="subFormList[`+i+`].subCstrnStCoodLatitude" class="form-control-sm" placeholder="위도를 선택하세요." style="width: 150px;"/>
                                <input type="text" name="subFormList[`+i+`].subCstrnStCoodLongitude" class="form-control-sm" placeholder="경도를 선택하세요." style="width: 150px;"/>
                                <input type="button" id='startCoordBtn' value="지도에서찾기" class="searchBtn w-auto" style="font-size: 12px;" onclick="CoordRegMap.createMapClass(this);">
                            </div>
                        </div>
                        <div class="row row-tr border-end-0">
                            <div class="d-flex justify-content-between">
                                <label class="col-form-label-sm">
                                    <span class="sub_th">노선방향 :</span>
                                </label>
                                <input type="text" name="subFormList[`+i+`].subCstrnStDir" class="form-control-sm" placeholder="노선의 상하행 또는 방향을 입력하세요." style="width: 406px;">
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
                                    <span class="sub_th">세부공사 위치도 : </span>
                                    <span id="subCstrnLocMapFileSp`+i+`"></span>
                                </label>
                            </div>
                        </div>
                        <div class="row row-tr border-end-0" style="height: 51px;">
                            <div class="col-12">
                                <label class="col-form-label-sm">
                                    <span class="sub_th">세부공사 위치도 : </span>
                                    <span id="subCstrnStLocMapFileSp`+i+`"></span>
                                </label>
                            </div>
                        </div>
                        <div class="row row-tr border-end-0" style="height: 51px;">
                            <div class="col-12">
                                <label class="col-form-label-sm">
                                    <span class="sub_th">세부공사 위치도 : </span>
                                    <span id="subCstrnEndLocMapFileSp`+i+`"></span>
                                </label>
                            </div>
                        </div>
                        <div class="row row-tr border-end-0" style="height: 51px;">
                            <div class="col-12">
                                <label class="col-form-label-sm">
                                    <span class="sub_th">세부공사 위치도 : </span>
                                    <span id="subCstrnRepsLocMapFileSp`+i+`"></span>
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
                        <input type="date" max="9999-12-31" name="subFormList[`+i+`].subCstrnStDt" class="form-control form-control-sm d-inline-block wid30">
                        <span> ~ </span>
                        <input type="date" max="9999-12-31" name="subFormList[`+i+`].subCstrnEndDt" class="form-control form-control-sm d-inline-block wid30">
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
                                <input type="text" name="subFormList[`+i+`].subCstrnEndLocAddr" class="form-control-sm" placeholder="공사 종점 위치를 입력하세요." style="width: 433px;"/>
                            </div>
                        </div>
                        <div class="row row-tr border-end-0">
                            <div class="d-flex justify-content-between">
                                <label class="col-form-label-sm">
                                    <span class="sub_th">좌표 :</span>
                                </label>
                                <input type="text" name="subFormList[`+i+`].subCstrnEndCoodLatitude" class="form-control-sm" placeholder="위도를 선택하세요." style="width: 150px;">
                                <input type="text" name="subFormList[`+i+`].subCstrnEndCoodLongitude" class="form-control-sm" placeholder="경도를 선택하세요." style="width: 150px;">
                                <input type="button" id='endCoordBtn' value="지도에서찾기" class="searchBtn w-auto" style="font-size: 12px;" onclick="CoordRegMap.createMapClass(this);">
                            </div>
                        </div>

                        <div class="row row-tr border-end-0">
                            <div class="d-flex justify-content-between">
                                <label class="col-form-label-sm">
                                    <span class="sub_th">노선방향 :</span>
                                </label>
                                <input type="text" name="subFormList[`+i+`].subCstrnEndDir" class="form-control-sm" placeholder="노선의 상하행 또는 방향을 입력하세요." style="width: 406px;">
                            </div>
                        </div>

                    </div>
                </div>
                <!-- 4-3행 -->
                <div class="row row-tr border-bottom-0 border-end-0" style="height: 203px;">
                    <div class="p-0">
                        <div class="row row-tr border-end-0 text-right">
                            <div class="col-9 col-form-label-sm" style="line-height: 31px;">
                            </div>
                            <div class="col-3">
                                <label for="subCstrnLocMapFileBtn`+i+`" style="width: 84px; height: 34px;">
                                    <div class="fileBtn">파일찾기</div>
                                </label>
                                <input type="file" id="subCstrnLocMapFileBtn`+i+`" onchange="fileCheckUpt(this, i)" class="file" accept="image/jpeg, image/jpg, image/png"/>
                            </div>
                        </div>
                        <div class="row row-tr border-end-0 text-right">
                            <div class="col-9 col-form-label-sm"style="line-height: 31px;">
                            </div>
                            <div class="col-3">
                                <label for="subCstrnStLocMapFileBtn`+i+`" style="width: 84px; height: 34px;">
                                    <div class="fileBtn">파일찾기</div>
                                </label>
                                <input type="file" id="subCstrnStLocMapFileBtn`+i+`" onchange="fileCheckUpt(this, i)" class="file" accept="image/jpeg, image/jpg, image/png"/>
                            </div>
                        </div>
                        <div class="row row-tr border-end-0 text-right">
                            <div class="col-9 col-form-label-sm" style="line-height: 31px;">
                            </div>
                            <div class="col-3">
                                <label for="subCstrnEndLocMapFileBtn`+i+`" style="width: 84px; height: 34px;">
                                    <div class="fileBtn">파일찾기</div>
                                </label>
                                <input type="file" id="subCstrnEndLocMapFileBtn`+i+`" onchange="fileCheckUpt(this, i)" class="file" accept="image/jpeg, image/jpg, image/png"/>
                            </div>
                        </div>
                        <div class="row row-tr border-end-0 text-right">
                            <div class="col-9 col-form-label-sm" style="line-height: 31px;">
                            </div>
                            <div class="col-3">
                                <label for="subCstrnRepsLocMapFileBtn`+i+`" style="width: 84px; height: 34px;">
                                    <div class="fileBtn">파일찾기</div>
                                </label>
                                <input type="file" id="subCstrnRepsLocMapFileBtn`+i+`" onchange="fileCheckUpt(this, i)" class="file" accept="image/jpeg, image/jpg, image/png"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`
    $("#subConstInfoDiv").prepend(str);
};

function displayFileList(fileList) {
    if (fileList && fileList.length > 0) {
        var html = '';
        $.each(fileList, function (idx, atchFile) {
            html += '<div class="mt5"><span>'
                + '<a href="/rcic/assets/attachment/'+atchFile.id+'">'
                + atchFile.orginlFileNm
                + '</a>'
                +'</span><span class="glyphicon glyphicon-trash" aria-hidden="true" style="cursor:pointer; margin-bottom: 5px;" onclick="deleteFile()" data-fileid="'+atchFile.id+'"></span></div>'
        });
        $('.attachBox').html(html);
    }
}



function validateForm() {

	var vailiFlag = true;
	const forms = document.querySelectorAll('.needs-validation');
	const bidYn = document.querySelector('input[name="bidntcenoyn"]:checked').value;
	const bidNo = document.querySelector('input[name="bidntceno"]');
	const bidTxt = document.querySelector('input[name="workDivisionInfo"]');
	const stDt = document.querySelector('input[name="cstrnStDt"]');
	const endDt = document.querySelector('input[name="cstrnEndDt"]');
	var f = document.forms[0];
	for(var i=0; i<f.elements.length-1; i++) {
		if(f.elements[i].value === 'all' || f.elements[i].value === '0'){
			if(f.elements[i].value === 'all'){
				var eLtxt = f.elements[i].parentNode.previousElementSibling.childNodes[1].innerText;
				alert(eLtxt.replace("*", "").trim() +"을 선택해 주세요.");
				setTimeout(function(){
					f.elements[i].focus();
				}, 1);
				return vailiFlag = false;
			}
			if(f.elements[i].value === '0'){
				var eLtxt = f.elements[i][0].innerText;
				alert(eLtxt +"해 주세요.");
				setTimeout(function(){
					f.elements[i].focus();
				}, 1);
				return vailiFlag = false;
			}
		}
		if(!f.elements[i].value && f.elements[i].type != 'file' && f.elements[i].type != 'button' && f.elements[i].type != 'hidden') {
			console.log(f.elements[i].type);
			console.log("f.elements[i].type = ", f.elements[i].type);
			console.log("!f.elements[i].id = ", !f.elements[i].id);
			if(f.elements[i].name === 'bidntceno'){
				if(bidYn === "Y"){
					alert(f.elements[i].placeholder +"을 입력해 주세요.");
					setTimeout(function(){
						f.elements[i].focus();
					}, 1);
					return vailiFlag = false;
				}
			}else if(f.elements[i].name === 'workDivisionInfo'){
				if(bidYn === "N"){
					alert(f.elements[i].placeholder +"을 입력해 주세요.");
					setTimeout(function(){
						f.elements[i].focus();
					}, 1);
					return vailiFlag = false;
				}
			}else if(f.elements[i].name === 'bon' || f.elements[i].name === 'bu'){
				alert("공사시행위치 본번 또는 부번을 입력해 주세요.");
				setTimeout(function(){
					f.elements[i].focus();
				}, 1);
				return vailiFlag = false;
			}else if(f.elements[i].type === 'select-one'){
				var eLtxt = f.elements[i].parentNode.previousElementSibling.childNodes[1].innerText;
				alert(eLtxt.replace("*", "").trim() +"을  선택해 주세요.");
				setTimeout(function(){
					f.elements[i].focus();
				}, 1);
				return vailiFlag = false;
			}else if(f.elements[i].type === 'date'){
				var eLtxt = "";
				if(f.elements[i].parentNode.previousElementSibling.childNodes[1].innerText != null){
					eLtxt = f.elements[i].parentNode.previousElementSibling.childNodes[1].innerText;
				}else {
					eLtxt = f.elements[i].parentNode.parentNode.parentNode.previousElementSibling.childNodes[1].childNodes[3].innerText;
				}
				alert(eLtxt.replace("*", "").trim() +"을 입력해 주세요.");
				setTimeout(function(){
					f.elements[i].focus();
				}, 1);
				return vailiFlag = false;
			}else{
				console.log(f.elements);
				alert(f.elements[i].placeholder +"을 입력해 주세요.");
				setTimeout(function(){
					f.elements[i].focus();
				}, 1);
				return vailiFlag = false;
			}
		}
	}
	return vailiFlag;
}

// 제출 버튼 클릭 -> 착수신고서 등록
function initiationReportRegist() {
    let bidntcenoyn = document.querySelector('input[name="bidntcenoyn"]:checked').value;
    if (bidntcenoyn === "N"){
        $('#bidntceno').val('');
        $('#bidntceno').attr("disabled", "disabled");
    }
    // $("#initiationReportRegistForm").submit; 안돼
    // $("#initiationReportRegistForm").submit(); 안돼

    if ($("input[name=brno]").val().length < 10) { return alert("사업자등록번호 또는 주민번호는 10자리 이상 입력해주세요.");}
	// if (validateForm()){document.getElementById("initiationReportRegistForm").submit();} // 돼 왜?

    let formData = new FormData($("#initiationReportRegistForm")[0]);
    $("#initiationReportRegistForm").serializeObject();
    formData.currPage = '';
    formData.listCnt = 0;
    formData.url = "/rcic/initiationReport/initiationReportRegist";
    let dataList = setDefault(formData);

    if (validateForm()){
        $.commonAjax(dataList,'', function(response, status, headers, config) {
            console.log("넵");
            console.log(response);
        });
    }
}

// 수정 버튼 클릭 -> 착수신고서 수정
function initiationReportUpdate() {
    let bidntcenoyn = document.querySelector('input[name="bidntcenoyn"]:checked').value;
    if (bidntcenoyn === "N"){
        $('#bidntceno').val('');
        $('#bidntceno').attr("disabled", "disabled");
    }

    if(validateForm()){document.getElementById("initiationReportUpdateForm").submit();} // 돼 왜?
}

function bidntcenoynChange(){
    let bidntcenoyn = document.querySelector('input[name="bidntcenoyn"]:checked').value;
    // let bidntcenoyn;
    // if ( param == "regist" ) {
        // bidntcenoyn = $("#bidntceno :checked").val();
        console.log("bidntcenoyn = ", bidntcenoyn);
        if (bidntcenoyn === "N"){
            // $('#bidntceno').val('');
            $('#bidntceno').attr("disabled", "disabled");
            $('#workDivisionInfo').removeAttr("disabled");
            $('#bidntcenoUpt').attr("disabled", "disabled");
            $('#workDivisionInfoUpt').removeAttr("disabled");
        } else {
            $('#bidntceno').removeAttr("disabled");
            $('#workDivisionInfo').attr("disabled", "disabled");
            $('#bidntcenoUpt').removeAttr("disabled");
            $('#workDivisionInfoUpt').attr("disabled", "disabled");

            
        }
    // } else {
    //     // bidntcenoyn = $("#bidntcenoUpt :checked").val();
    //     console.log("bidntcenoyn = ", bidntcenoyn);
    //     if (bidntcenoyn === "N"){
    //         // $('#bidntceno').val('');
    //         $('#bidntcenoUpt').attr("disabled", "disabled");
    //         $('#workDivisionInfoUpt').removeAttr("disabled");
    //     } else {
    //         $('#bidntcenoUpt').removeAttr("disabled");
    //         $('#workDivisionInfoUpt').attr("disabled", "disabled");
    //     }
    // }
};

function roadTypeChange(){
    let roadTypeCdSb = document.getElementById("roadTypeCdSb");
    let val = roadTypeCdSb.options[roadTypeCdSb.selectedIndex].text;
    $('input[name="roadTypeNm"]').val(val);
    $('#roadTypeNmUpt').val(val);
};

function cstrnTypeChange(){
    let cstrnTypeCdSb = document.getElementById("cstrnTypeCdSb");
    let val = cstrnTypeCdSb.options[cstrnTypeCdSb.selectedIndex].text;
    $('input[name="cstrnTypeNm"]').val(val);
    $('#cstrnTypeNmUpt').val(val);
};

function ntnltyLandMngOfcCdChange(){
    let ntnltyLandMngOfcCdSb = document.getElementById("ntnltyLandMngOfcCdSb");
    let val = ntnltyLandMngOfcCdSb.options[ntnltyLandMngOfcCdSb.selectedIndex].text;
    $('input[name="ntnltyLandMngOfcNm"]').val(val);
    $('#ntnltyLandMngOfcNmUpt').val(val);
};

function emdCdChange(){
    $("#emdNm").val($("#emd option:checked").text());
    $("#emdNmUpt").val($("#emdUpt option:checked").text());
};

function earthMountainChange(){
    $("#earthMountainNm").val($("#earthMountainCd option:checked").text());
    $("#earthMountainNmUpt").val($("#earthMountainCdUpt option:checked").text());
    console.log($("#earthMountainNm").val());
    console.log($("#earthMountainNmUpt").val());
};

// 세부공사정보 수정 파일체크(다건)
function fileCheckUpt(_this, idx) {
    let file = _this;
    console.log(file);
    let inputId = _this.id;
    console.log(inputId);

    //파일 경로.
    let filePath = file.value;
    //전체경로를 \ 나눔.
    let filePathSplit = filePath.split('\\');
    //전체경로를 \로 나눈 길이.
    let filePathLength = filePathSplit.length;
    // 마지막 경로를 .으로 나눔.
    let fileNameSplit = filePathSplit[filePathLength - 1].split('.');
    //파일명 : .으로 나눈 앞부분
    let fileName = fileNameSplit[0];
    //파일 확장자 : .으로 나눈 뒷부분
    let fileExt = fileNameSplit[1];
    //파일 크기
    let fileSize = file.files[0].size;

    // console.log("file = ", file);
    // console.log("filePath = ", filePath);
    // console.log("filePathSplit = ", filePathSplit);
    // console.log("filePathLength = ", filePathLength);
    // console.log("fileNameSplit = ", fileNameSplit);
    // console.log("fileName = ", fileName);
    // console.log("fileExt = ", fileExt);
    // console.log("fileSize = ", fileSize);

    // 등록화면
    if (inputId == 'cstrnLocMapFileBtn') {
        document.getElementById("cstrnLocMapFileSp").innerText=fileName + '.' + fileExt;
        document.getElementById("cstrnLocMapFileBtn").setAttribute("name", "cstrnLocMapFile");
    }
    if (inputId == 'subCstrnLocMapFileBtn'+i) {
        document.getElementById("subCstrnLocMapFileSp"+i).innerText=fileName + '.' + fileExt;
        document.getElementById("subCstrnLocMapFileBtn"+idx).setAttribute("name", "subFormList["+idx+"].subCstrnLocMapFile");
    }
    if (inputId == 'subCstrnStLocMapFileBtn'+i) {
        document.getElementById("subCstrnStLocMapFileSp"+i).innerText=fileName + '.' + fileExt;
        document.getElementById("subCstrnStLocMapFileBtn"+idx).setAttribute("name", "subFormList["+idx+"].subCstrnStLocMapFile");
    }
    if (inputId == 'subCstrnEndLocMapFileBtn'+i) {
        document.getElementById("subCstrnEndLocMapFileSp"+i).innerText=fileName + '.' + fileExt;
        document.getElementById("subCstrnEndLocMapFileBtn"+idx).setAttribute("name", "subFormList["+idx+"].subCstrnEndLocMapFile");

    }
    if (inputId == 'subCstrnRepsLocMapFileBtn'+i) {
        document.getElementById("subCstrnRepsLocMapFileSp"+i).innerText=fileName + '.' + fileExt;
        document.getElementById("subCstrnRepsLocMapFileBtn"+idx).setAttribute("name", "subFormList["+idx+"].subCstrnRepsLocMapFile");
    }

    // 수정화면
    if (inputId == 'cstrnLocMapFileBtnUpt') {
        document.getElementById("cstrnLocMapFileSpUpt").innerText=fileName + '.' + fileExt;
        document.getElementById("cstrnLocMapFileBtnUpt").setAttribute("name", "cstrnLocMapFile");
    }
    if (inputId == 'subCstrnLocMapFileBtnUpt'+idx) {
        document.getElementById("subCstrnLocMapFileSpUpt"+idx).innerText=fileName + '.' + fileExt;
        document.getElementById("subCstrnLocMapFileBtnUpt"+idx).setAttribute("name", "subFormList["+idx+"].subCstrnLocMapFile");
    }
    if (inputId == 'subCstrnStLocMapFileBtnUpt'+idx) {
        document.getElementById("subCstrnStLocMapFileSpUpt"+idx).innerText=fileName + '.' + fileExt;
        document.getElementById("subCstrnStLocMapFileBtnUpt"+idx).setAttribute("name", "subFormList["+idx+"].subCstrnStLocMapFile");
    }
    if (inputId == 'subCstrnEndLocMapFileBtnUpt'+idx) {
        document.getElementById("subCstrnEndLocMapFileSpUpt"+idx).innerText=fileName + '.' + fileExt;
        document.getElementById("subCstrnEndLocMapFileBtnUpt"+idx).setAttribute("name", "subFormList["+idx+"].subCstrnEndLocMapFile");
    }
    if (inputId == 'subCstrnRepsLocMapFileBtnUpt'+idx) {
        document.getElementById("subCstrnRepsLocMapFileSpUpt"+idx).innerText=fileName + '.' + fileExt;
        document.getElementById("subCstrnRepsLocMapFileBtnUpt"+idx).setAttribute("name", "subFormList["+idx+"].subCstrnRepsLocMapFile");
    }
};

function ajaxCall(url, type, param, contentType, callback) {
    $.ajax({
        url: url,
        type: type,
        data: param,
        datatype: "json",
        contentType: false,
        processData: false,
        success: function(result) {
            console.log(result);
            return callback(result);
        }
    });
};