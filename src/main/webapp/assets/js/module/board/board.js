/************************************************************
설명 : CodeMng 컴포넌트
************************************************************/
var faqPageCnt=1;
var selectedFaqMenu="";
var Board = {
		
		listTabMenu:function(elem){
			$("#keyword").val("");
			var index   = $(elem).data("index");
			var siteNav = "";
			var title   = "";
			
			if(index == 3 && $('#userSeq').val() == null){
				$.swal("1:1 질문하기는 로그인 후 이용할 수 있습니다.");
				return;
			}
			
			if(index == 1){ siteNav = "공지사항"; title = "<p>도로변경정보 수집시스템에서 전달하는 <span>공지, 뉴스</span>를 만나보세요.</p>"; }
			else if(index == 2){ siteNav = "FAQ"; title = "<p>도로변경정보 수집시스템 관련 궁금증을 찾아보세요.</p>" }
			else{ siteNav = "1:1질문"; title = "<p>궁금한 점을 질문하시면 관리자가 확인 후 친절히 답변해 드리겠습니다.</p>"; }

			$(".listTab span").each(function(index, item){  
				var name   = $(item).children("img").attr("data-fileName");
				var reName = "/assets/images/icon/"+name+"_off.png";
				$(item).children("img").attr("src", reName); 
			});

			var name = $(elem).find("img").attr("data-fileName");
			$(elem).find("img").attr("src", "/assets/images/icon/"+name+"_on.png");

			// tab class add
			$(".listTabMenu").removeClass("active");
			$(elem).addClass("active");

			$(".tabContetns").hide();
			$("#tabContents"+index).show();

			$(".siteName").text(siteNav);
			$(".bConTxtBox").html(title);
			
			if($(".listTabMenu").hasClass("active")){
				if($(elem).attr("data-index") == "1"){
					Board.getNoticeList();
				}else if($(elem).attr("data-index") == "2"){
					Board.getFaqList("1"); 
				}
			}
			
			
 			
 		},
 		
 		// 공지시항 
 		noticeListBtn:function(){
 			$('#noticeDtlView').hide();
 			$('#noticeNav').show();
 			
	        Board.getNoticeList();
 		},
 		
		getNoticeList:function(curr_page) {
			$('#noticeDtlView').hide();
			if($.isNullString(curr_page)){
				curr_page = 1;
			}
			
			var list_cnt = 5;
			
			var obj = new Object();
				obj.url = "/rcic/notice/getNoticeList";
				obj.listCnt = parseInt(list_cnt),
				obj.currPage = curr_page;
				obj.keyword = $('#keyword').val();
			var dataList = setDefault(obj);
			
			$.commonAjax(dataList,'', function(response, status, headers, config){ 
				var html="";
            	var list = response.list;
            	var max_page = response.maxPageCnt;
            	
            	$("#noticeList").empty();

				if(list.length <= 0){
					html += '<div class="emptyListBox">';
					html += '	<div class="emptyBimgBox">';
					html += '		<img src="/assets/images/icon/exc_mark.png" alt="mark">';
					html += '	</div>';
					html += '	<div class="emptyTxtBox mt20">';
					html += '		<p>등록된 게시물이 없습니다.</p>';
					html += '		<p class="mt10">이용에 불편을 드려 죄송합니다.</p>';
					html += '	</div>';
					html += '</div>';
				}
           	
            	for (var i = 0; i < list.length; i++) {
					 list[i].registDt.replace("/-/gi",".");    
			
					html += '<li>';
					html += '	<div class="numbering">'+ list[i].rnum +'</div>';
					html += '	<div class="lDateBox inline">';
					html += '		<p style="margin-bottom:0px;">'+ list[i].registDt.substring(8) +'</p>';
					html += '		<p style="margin-bottom:0px;">'+ list[i].registDt.substring(0, 7) +'</p>';
					html += '	</div>';	
					html += '	<div class="lTitleBox inline" style="cursor:pointer" onclick="Board.noticeDetail('+ list[i].noticeNo +')">';
					html += '		<a>';
					html += '			<div class="inline"><span class="notice inline">' + list[i].noticeTyNm + '</span></div>';
					html += '			<div class="inline"><span class="inline noticeTit">' + list[i].sj + '</span></div>';
					html += '		</a>';
					html += '	</div>';	
					html += '	<div class="lWriterBox inline">';
					html += '		<div class="writer inline">'; 
					html += '			<span>작성자</span>';
					html += '			<span>' + list[i].userNm +'</span>';
					html += '		</div>';
					html += '		<div class="lookup inline">';
					html += '			<span>조회수</span>';
					html += '			<span>' + list[i].rdcnt + '</span>';
					html += '		</div>';
					html += '	</div>';
					html += '</li>';				
				}
            	
            	$("#noticeList").html(html); 
            	$('#totalCnt').text("(" + response.totalCnt + ")")
            	$('#noticeList').show();
            	// 페이징 호출 
            	$.paging('noticePagination',curr_page,max_page,list.length,function(event,page){  
            		Board.getNoticeList(page);
            	}); 
            	
			},false,function(e){
				console.log(e);
			}); 
		 },
		 
		 noticeDetail : function(notice_no) {
			
			 var obj = new Object();
				 obj.url = "/rcic/notice/getNoticeDetail";
				 obj.noticeNo = notice_no
			var dataList = setDefault(obj);

			 $('#attachFileBox').empty();
			$.commonAjax(dataList,'', function(response, status, headers, config){
				$('#noticeTy').text(response.noticeTyNm);
				$('#sj').text(response.sj);
				$('#registId').text(response.registId);
				$('#registDt').text(response.registDt);
				$('#rdcnt').text(response.rdcnt);    
				$('#cn').html(response.cn);
				$('#preNo').val(response.preNo);
				$('#preSj').text(response.preSj);
				$('#nextNo').val(response.nextNo);
				$('#nextSj').text(response.nextSj);
				
				$('#noticeNav').hide();
				// 첨부파일
				$.each(response.fileList, function (idx, fileInfo) {
					var $a = $('<a/>').text(fileInfo.orginlFileNm).attr('href', '/rcic/assets/attachment/' + fileInfo.atchFileNo);
					$('#attachFileBox').append($a);
				});
				
			  $('#noticeList').hide();
			  $('#noticeDtlView').show();
			}); 
		 },
		 
		 sjClickEvn:function(elem){
			 var id = $(elem).attr('id');
			 var num;
			 if(id == "nextSj"){
				 num = $('#nextNo').val();
			 }else if(id == "preSj"){
				 num = $('#preNo').val();
			 }
			 Board.noticeDetail(num);
			 
		 }, // END 공지사항
		 
		 
		//============== FAQ ========================
		 getFaqType:function(){
			// faq 타입, 갯수 가져오기 
			var obj = new Object();	
				obj.url = "/rcic/faq/getFaqTypeCount";
			var dataList = setDefault(obj);
			
			$.commonAjax(dataList,'', function(response, status, headers, config){ 
				var html = "";
				var list = response.list; 
				var total = 0;
				 list = _.sortBy(list, "faqTy");   
				
				for(var i in list){
					html += '<div class="inline faqTab" onclick="Board.faqTabClivkEvn(this);return false;">'; 
					html += '	<input type="hidden" id = "faqTypeNum" value ="' + list[i].faqTy +'" />'
					html += '	<p class="cateTabTitle">' + list[i].faqTyNm + '</p>';
					html += '	<p class="cateTabCount">(' + list[i].faqCnt + ')</p>';   
					html += '</div>';
					total += list[i].faqCnt;
				}
				
        		$('#faqTotalCnt').text("(" + total + ")")
				$('.faqTabCateBox').append(html);
			});
		 },
	
		faqTabClivkEvn:function(elem){
			faqPageCnt = 1;
			$(".faqTab").removeClass("active");
			$(elem).addClass("active");   
			$("#faqList").empty();
			var type = $(elem).find('#faqTypeNum').val();
			selectedFaqMenu = type;
			Board.getFaqList("1");      
		},
   
		 getFaqList:function(currPage) {
				var obj = new Object();
					obj.url = "/rcic/faq/getFaqList";
					obj.listCnt = 5;
					obj.currPage = currPage;
					obj.faqType = selectedFaqMenu;
				var dataList = setDefault(obj);
				
				$.commonAjax(dataList,'', function(response, status, headers, config){ 
					var html="";
	            	var list = response.list;
	            	
					if(list.length <= 0){
						html += '<div class="emptyListBox">';
						html += '	<div class="emptyBimgBox">';
						html += '		<img src="/assets/images/icon/exc_mark.png" alt="mark">';
						html += '	</div>';
						html += '	<div class="emptyTxtBox mt20">';
						html += '		<p>등록된 게시물이 없습니다.</p>';
						html += '		<p class="mt10">이용에 불편을 드려 죄송합니다.</p>';
						html += '	</div>';
						html += '</div>';
					}
				
	            	for (var i = 0; i < list.length; i++) {
	            		html += '<li onclick="Board.faqDetail(this);" >'; 
						html += '	<div class="questionBox">'; 
						html += '		<div class="inline quIcon">'; 
						html += '			<img src="/assets/images/icon/question_icon.png" alt="question" class="pQueIcon">'; 
						html += '			<img src="/assets/images/icon/m_question_icon.png" alt="question" class="mQueIcon">'; 
						html += '		</div>';
						html += '		<div class="inline quText"><p>' + list[i].faqSj + '</p></div>'; 
						html += '		<div class="inline quOPBtn"><img src="/assets/images/icon/btm_arrow.png" alt="opImage"></div>'; 
						html += '	</div>'; 
						html += '	<div class="answerBox">';
						html += '		<div class="inline anIcon"><img src="/assets/images/icon/answer_icon.png" alt="answer"></div>';
						html += '		<div class="inline anText">';
						html += '		<p>';
						html +=  			list[i].faqCn
						if(list[i].fileList.length != 0){
							html += '		<div class="viewDownBox" name="attachFileBoxFaq' + i + '" style="margin-top:30px"></div>'; 
						}		
						
						html += '		</div>';
						html += '	</div>';
						html += '</li>';
						
					}   
					
					$("#faqList").append(html);  
					
					for (var i = 0; i < list.length; i++) {
						// 첨부파일
						$('div[name="attachFileBoxFaq' + i +'"]').empty();
						$.each(list[i].fileList, function (idx, fileInfo) {
							var $a = $('<a/>').text(fileInfo.orginlFileNm).attr('href', '/rcic/assets/attachment/' + fileInfo.atchFileNo);
							$('div[name="attachFileBoxFaq' + i +'"]').append($a); 
						});
					}
					
					if(response.totalCnt > $(".bFaqBox li").length){
						$('.moreBox').css('display', '');
					}else{
						$('.moreBox').css('display', 'none');
					}
	            	
				},false,function(e){
					console.log(e);
				}); 
			 },
		
			moreFaqList:function(){
				faqPageCnt++;
				Board.getFaqList(faqPageCnt,selectedFaqMenu);
			},
			 
			 faqDetail:function(elem){
				// 자기자신을 클릭 한 경우
				if($(elem).hasClass("active")){
					$(elem).removeClass("active"); $(elem).children(".answerBox").slideUp("fast");
					$(elem).find(".quOPBtn").removeClass("active"); return false;
				}

				$(".answerBox").slideUp("fast");
				$(".bFaqBox li").removeClass("active");
				$(".quOPBtn").removeClass("active");

				$(elem).children(".answerBox").slideDown("fast");
				$(elem).find(".quOPBtn").addClass("active");
				$(elem).addClass("active");
				
	        },

			getQuestionType:function(){
				// 질문분류 가져오기 
				var obj = new Object();	
					obj.url = "/rcic/code/selectDetailCode";
					obj.groupCode = "QESTN_TY";
				var dataList = setDefault(obj);
				
				$.commonAjax(dataList,'', function(response, status, headers, config){ 
					var html = "";
					var list = response.list;
					for(var i in list){
						html += '<option value = "' + list[i].code + '">' + list[i].codeNm + '</option>';						
					}
					
					$('select[name="qestnTy"]').append(html);
					
				});
			},

			insertQuestion:function(){
				
				if($('select[name="qestnTy"]').val() == 0){
					$.swal("질문분류를 선택하세요.");
					return;
				}
				
				if($.isNullString($('#qestnSj').val())){ 
					$.swal("제목을 입력하세요.");
					$("#qestnSj").focus();
					return false;
				}
				
				if($.isNullString($('#qestnCn').val())){ 
					$.swal("내용을 입력하세요.");
					$("#qestnCn").focus();
					return false;
				}
				
				var obj = new Object();
					obj.url = "/rcic/qaBbs/insertQaBbs";
					obj.userSeq = $('#userSeq').val();
					obj.qestnTy = $('select[name="qestnTy"]').val();
					obj.qestnSj =  $('#qestnSj').val();
					obj.qestnCn = $('#qestnCn').val();
				var dataList = setDefault(obj);
				
				$.commonAjax(dataList,'', function(response, status, headers, config){
					swal({
		                  text: "문의가 등록되었습니다.\n문의내용 및 답변은\n마이페이지에서 확인할 수 있습니다.",
		                  button: "확인", 
						  closeOnEsc: false,
						  allowOutsideClick: false, 
				    }).then(function(value){
	                   if(value) {
	                       //location.reload();
							location.href="/rcic/movePage?menuId=mypage&type=QA";
	                   }
	               });
					
				});
			}
	} 
