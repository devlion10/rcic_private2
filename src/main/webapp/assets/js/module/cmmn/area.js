var AreaInfo={
		/**
		 * 지역 클릭시
		 * */
		clickArea:function(targetElem){
			if($(targetElem).css('display')=="none"){
				$(targetElem).show();
			}else{
				$(targetElem).hide();
			}
		},
		closeArea:function(targetElem){
			$(targetElem).hide();
		},
		
		/**
		 * 시도리스트
		 * param:targetElem(타켓엘리먼트)
		 * */
		
		getSidoList:function(targetElem,sggListElemName,emdListElemName){
			var obj = new Object();
				obj.url = serverUrl+"/rcic/cmmn/selectSidoList";
				obj.keyword = "*:*"
				obj.rows = 17;
			var dataList = setDefault(obj);
			$.commonAjax(dataList,'', function(response, status, headers, config){
				
				$(targetElem).empty();
				var list = response.list;
				var html="";
				html+='<li style="display:none" name="sggListElemName">'+sggListElemName+'</li>';
				html+='<li style="display:none" name="emdListElemName">'+emdListElemName+'</li>';
				html+='<li class="active" onclick="AreaInfo.clickSidoList(this);return false;"><a href="#">전국</a></li>';
				for(var i in list){
					html+='<li onclick="AreaInfo.clickSidoList(this);return false;"><a href="#" sidoVal="'+list[i].sido_cd+'">'+list[i].sido_nm+'</a></li>';
				}
				$(targetElem).html(html);
			});
		},
		clickSidoList:function(elem){
			sidoNm = "전국";
			sggNm = "전체";
			emdNm = "전체";
			var sido_cd = $(elem).find('a').attr('sidoVal');
			var sido_nm = $(elem).find('a').text();
			
			var sggElem = $(elem).parent().find('li[name="sggListElemName"]').text();
			var emdElem = $(elem).parent().find('li[name="emdListElemName"]').text();
			AreaInfo.getSggList(sido_cd,sggElem,emdElem);
			AreaInfo.clearEmdList(emdElem);
			
			$(elem).parent().find('li.active').removeClass('active');
		    $(elem).addClass('active');
		    
		    if(isNullString(sido_cd)){
		    	sidoCd="";
		    	sggCd="";
		    	emdCd="";
		    	sidoNm = "전국";
		    }else{
		    	sidoCd = sido_cd;  
		    }
			sidoNm = sido_nm;
		},
		/**
		 * 시군구 리스트
		 * param: sido_cd(시도코드)
		 * param:targetElem(타켓엘리먼트)  
		 * */
		
		getSggList:function(sido_cd,targetElem,emdListElemName){
			var obj = new Object();
				obj.url = serverUrl+"/rcic/cmmn/selectSggList";
				obj.keyword = "sido_cd:("+sido_cd+")";
				obj.rows = 100;
			var dataList = setDefault(obj);
			
			$.commonAjax(dataList,'', function(response, status, headers, config){
				
				$(targetElem).empty();
				var list = response.list;
				var html="";
				html+='<li class="active" onclick="AreaInfo.clickSggList(this);return false;"><a href="#">전체</a></li>';
				html+='<li style="display:none" name="emdListElemName">'+emdListElemName+'</li>';
				for(var i in list){
					html+='<li onclick="AreaInfo.clickSggList(this);return false;"><a href="#" sggVal="'+list[i].sgg_cd+'">'+list[i].sgg_nm+'</a></li>';
				}
				$(targetElem).html(html);
			});
		},
		clickSggList:function(elem){
			
			sggNm = "전체";
			emdNm = "전체";
			
			var sgg_cd = $(elem).find('a').attr('sggVal');
			var sgg_nm = $(elem).find('a').text();
			var emdElem = $(elem).parent().find('li[name="emdListElemName"]').text();
			AreaInfo.getEmdList(sgg_cd,emdElem);
			
			$(elem).parent().find('li.active').removeClass('active');
		    $(elem).addClass('active');
		    
		    if(isNullString(sgg_cd)){
		    	sggCd="";
		    	emdCd="";
		    	sgg_nm="전체";
		    }else{
		    	sggCd = sgg_cd;  
		    }
		    sggNm = sgg_nm;
		},
		clearSggList:function(targetElem){
			sgg_nm="전체";
			$(targetElem).empty();
			var html="";
			html+='<li class="active" onclick="AreaInfo.clickSggList(this);return false;"><a href="#">전체</a></li>';
			$(targetElem).html(html);
		},
		getEmdList:function(sgg_cd,targetElem){
			var obj = new Object();
				obj.url = serverUrl+"/rcic/cmmn/selectEmdList";
				obj.rows = 100;
				obj.keyword = "sgg_cd:("+sgg_cd+")";
			var dataList = setDefault(obj);
			
			$.commonAjax(dataList,'', function(response, status, headers, config){
				
				$(targetElem).empty();
				var list = response.list;
				var html="";
				html+='<li class="active" onclick="AreaInfo.clickEmdList(this);return false;"><a href="#">전체</a></li>';
				for(var i in list){
					html+='<li onclick="AreaInfo.clickEmdList(this);return false;"><a href="#" emdVal="'+list[i].emd_cd+'">'+list[i].emd_nm+'</a></li>';
				}
				$(targetElem).html(html);
			});
		},
		clickEmdList:function(elem){
			$(elem).parent().find('li.active').removeClass('active');
			var emd_cd = $(elem).find('a').attr('emdVal');
			var emd_nm = $(elem).find('a').text();
		    $(elem).addClass('active');
		    
		    if(isNullString(emd_cd)){
		    	emdCd="";
		    	emd_nm="전체";
		    }else{
		    	emdCd = emd_cd;  
		    }
		    emdNm = emd_nm;
		},
		clearEmdList:function(targetElem){
			emd_nm="전체";
			$(targetElem).empty();
			var html="";
				html+='<li class="active" onclick="AreaInfo.clickEmdList(this);return false;"><a href="#">전체</a></li>';
			$(targetElem).html(html);
		}
}