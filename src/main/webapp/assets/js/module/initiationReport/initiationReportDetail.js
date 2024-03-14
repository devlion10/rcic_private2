var InitiationReportDetail = {
	movePageInitiationReportUpdate() {
		let seq = parseInt(document.getElementById("seq").value);
		location.href = "/rcic/initiationReport/movePageInitiationReportUpdate?seq="+seq;

		// let obj = new Object();
		//
		// obj.url = "/rcic/initiationReport/movePageInitiationReportUpdate";
		// obj.seq = seq;
		//
		// let dataList = setDefault(obj);
		//
		// $.commonAjax(dataList, '', function(response){
		//     console.log("처리 됐니");
		// });
	},
	apprUpdate : function(){
		var params = {seq : parseInt(document.getElementById("seq").value)}
		let type = "post";
		let url = "/rcic/initiationReport/initiationReportAppr";
		let contentType = "application/json";
		$.ajax({
			url: url,
			type: type,
			data : JSON.stringify(params),
			datatype: "json",
			contentType: contentType,
			success: function(result) {
				// console.log("result = ", result);

				alert('승인되었습니다.');
				location.href = "/rcic/initiationReport/movePageInitiationReportDetail?seq="+parseInt(document.getElementById("seq").value);
			},
			error: function (jqXHR, textStatus) {
				alert("에러가 발생했습니다. 관리자에게 문의하세요");
			}
		});
	}
	// initiationReportApproval() {
	//     let formData;
	//
	//     formData = $("#initiationReportApprovalForm").serializeObject();
	//
	//     formData.currPage = '';
	//     formData.listCnt = 0;
	//     formData.url = "/rcic/initiationReport/initiationReportApproval";
	//
	//     let dataList = setDefault(formData);
	//     $.commonAjax(dataList,'', function(response, status, headers, config) {
	//         console.log(response);
	//         if (response == 1){
	//             MainInfo.movePage('initiationReport');return false;
	//         }
	//     },false,function(e){
	//         console.log(e);
	//     });
	//     // document.getElementById("initiationReportApprovalForm").submit();
	//
	// }
}

//
var InitiationReportDetailFile={

	airImgWinRef:null,
	filePreView:function(_this) {
		let userIdEl= _this.nextElementSibling;
		let dateEl = userIdEl.nextElementSibling;
		let fileNmEl= dateEl.nextElementSibling;

		let userId = userIdEl.value;
		let date = dateEl.value;
		let fileFullNm = fileNmEl.value;

		let fileCreateDate = date;
		let fileNmArr = fileFullNm.split('.');
		let fileNm = fileNmArr[0];
		let fileType = fileNmArr[1];

		console.log(userId);
		console.log(fileCreateDate);
		console.log(fileNm);
		console.log(fileType);

		airImgWinRef=window.open('/rcic/preViewFile'+'/'+fileNm+'/'+fileType+'/'+userId+'/'+fileCreateDate,"_blank",'width=#, height=#');

	}

}