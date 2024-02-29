(function(window, $){
	var DataCntc = function(){
	};

	DataCntc.prototype = {
			
		getRoadNameList : function (data, callback, isFlag) {
			var _self = this;
			
			var RoadNameData = new Object();   
			var url ="/road-name/DataCntc";	 
			RoadNameData = $.stringify([RoadNameData]);
			$.rcicSolrMapAjax(url       
					, RoadNameData  
					, callback
					, isFlag
				);
		}
	};
  
	window.DataCntc = DataCntc;
	window.name = "DataCntc.js";
})(window, jQuery);