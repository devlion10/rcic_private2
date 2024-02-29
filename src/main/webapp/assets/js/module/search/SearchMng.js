(function(window, $) {
	"use strict";
	var SearchMng = function(_options) {
		this.init(_options);  	
	};
	SearchMng.prototype = {
		_defaults:{
					firstRow : 1,
					numRows : 10,
					orderField : '',
					sort : "desc",
					keyword : "",
					queryField:"",
		},
		config:null,
		init:function(_options){
				this.config = $.extend({}, this._defaults, _options); 
 		}, 
 		searchOpration:function(reqData,callback){
			var _self = this; 
			var searchData = {
					collection: SearchConfig.search.collection[reqData.collection].id,
					orderField : SearchConfig.search.collection[reqData.collection].orderField,
					sort : SearchConfig.search.collection[reqData.collection].sort, 
					queryField : SearchConfig.search.collection[reqData.collection].queryField,
					keyword : $.isNullString(reqData.keyword)?'': encodeURI(reqData.keyword), 
					numRows: $.isNullString(reqData.numRows)?_self.config.numRows:reqData.numRows,
					currentPage:$.isNullString(reqData.currentPage)?0:reqData.currentPage,
					type:$.isNullString(reqData.type)?'list':reqData.type,
					startDt:$.isNullString(reqData.startDt)?"":reqData.startDt,
					endDt:$.isNullString(reqData.endDt)?0:reqData.endDt,
		 }
			searchData = $.extend({}, this.config , searchData);
			var url ="/legalZoneSearch";
			if(!$.isNullString(reqData.searchUrl)){
				url = reqData.searchUrl;
			}  
			searchData = $.stringify([searchData]);
			$.rcicSolrMapAjax(url   
							, searchData  
							, function(resultData){  
								if(url=="/getTotalSrchData"){
									return callback(resultData);
								}else{
									return callback(resultData[0].response);								
								}
							},false);
		}
	}
	window.SearchMng = SearchMng;
	window.name = "SearchMng.js";
})(window, jQuery);