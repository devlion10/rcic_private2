/************************************************************
설명 : CodeMng 컴포넌트
************************************************************/
(function(window, $) {
	"use strict";
	var CodeMng = function(_options) {
		var _self = this;
		    _self.init(_options);  	
	};  
	CodeMng.prototype = {
		config:null,
		data:null,
		element:null,
		menuPrntId:null,
		source:null,
		init:function(_options){
			
			var _self = this;
			    _self.config = $.extend({}, _options);
			    _self.source = _self.config.source;
			    _self.element = _self.config.source.element;
			var dataAdapter = new $.jqx.dataAdapter(_self.source);
				dataAdapter.dataBind();
				
				_self.data = dataAdapter.records;
				_self.bindSetData();
		},
		bindSetData:function(){
		}
	}
	window.CodeMng = CodeMng;
	window.name = "CodeMng.js";
})(window, jQuery);