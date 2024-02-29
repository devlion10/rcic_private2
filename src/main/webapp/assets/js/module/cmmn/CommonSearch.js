(function(window, $){
	var CommonSearch = function(){
	};

	CommonSearch.prototype = {
		
			/**
			 * currPage : 현재 페이지 번호
			 * listCnt : 페이지당 표출 건수 
			 * startDt : 검색조건 시작일시
			 * endDt : 검색일자 종료일시
			 * collection : 조회할 컬렉션
			 * return callback 
			 * */
			
		getSearchList : function (currPage, listCnt, data, collection, callback, isFlag) {
		console.info("common getSearchList");
			var _self = this;
			if($.isNullString(currPage)){
				currPage = "0";
			} 
			if($.isNullString(listCnt)){
				listCnt = "10";
			} 
			
			var searchData = new Object();   
			      searchData.collection=collection;  //조회 할 컬렉션
			      searchData.start= currPage;  //  현재 페이지 
			      searchData.rows= listCnt;   //페이지 갯수
			      searchData.keyword = data.searchKeyword;  //조건 
			      searchData.order = data.order;  //정렬
			      searchData.roadTypeCd = data.roadTypeCd;
			      searchData.facTypeCd = data.facTypeCd; 
			      searchData.constRoadClss = data.constRoadClss; //도로선택
			      if(!$.isNullString(data.prdtReliChk)){
			    	  searchData.prdtReliChk = data.prdtReliChk;
			    	  searchData.prdtReliCd = data.prdtReliCd;
			    	  searchData.authNo = data.authNo;
			      }
			      if(!$.isNullString(data.searchTextYN)){
			    	  searchData.searchTextYN = data.searchTextYN;
			      }
			      
			      
			var url ="/search";	 
			searchData = $.stringify([searchData]);
			$.rcicSolrMapAjax(url       
					, searchData  
					, callback
					, isFlag
				);
		},
			
		/**
		 * data : 데이터
		 * startDt : 검색조건 시작일시
		 * endDt : 검색일자 종료일시
		 * collection : 조회할 컬렉션
		 * dayType : 년,월,주,일 구분
		 * type : 
		 * return callback 
		 * */
		
		getSearchCount : function (data, collection, callback, isFlag) {
			
			var _self = this;  
			/*var mapInit = this._mapInit;
			var map = this._mapInit.map;
			var mapAction = this._mapInit.mapAction;*/
			
			var searchData = new Object();  
		        searchData.collection=collection;  //조회 할 컬렉션
		        searchData.keyword=data.searchKeyword;  //조건
		        searchData.dayType = data.dayType;
		        searchData.pivot=data.pivot; 
		        searchData.facet=data.facet;
		        searchData.limit=data.limit;
		        searchData.roadTypeCd = data.roadTypeCd;
			    searchData.facTypeCd = data.facTypeCd; 
			    searchData.constRoadClss = data.constRoadClss; //도로선택
			    if(!$.isNullString(data.prdtReliChk)){
			    	  searchData.prdtReliChk = data.prdtReliChk;
			    	  searchData.prdtReliCd = data.prdtReliCd;
			    	  searchData.authNo = data.authNo;
			      }
			      
			var url ="/count";	 
			if(data.gbn == "pivot"){
				url ="/pcount";
			}
			searchData = $.stringify([searchData]);
			$.rcicSolrMapAjax(url    
					, searchData  
					, callback
					, isFlag
				);
					/*, function(resultData){  
				});*/
			} 
	};
  
	window.CommonSearch = CommonSearch;
	window.name = "CommonSearch.js";
})(window, jQuery);