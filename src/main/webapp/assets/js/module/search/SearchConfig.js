(function(window, $) {
	"use strict";
	var SearchConfig = {};
	SearchConfig.search = {
		collection : {
			tb_analysis_info : {
				id : "tb_analysis_info",
				layerKorName : "분석",
				keyword: ''
			},
			legaldong_sido : {
				id : "legaldong_sido",
				layerKorName : "시도",
				kind : "sido",
				category : "area",
				cd : 'sido_cd',
				nm : 'sido_nm',
				orderField: 'sido_cd asc',
				keyword: '',
				queryField: ''
			},
			legaldong_sgg : {
				id : "legaldong_sgg",
				layerKorName : "시군구",
				kind : "sgg",
				category : "area",
				cd : 'sgg_cd',
				nm : 'sgg_nm',
				orderField: 'sgg_nm asc',
				keyword: '',
				queryField: 'sido_cd'
			},
			legaldong_emd : {
				id : "legaldong_emd",
				layerKorName : "읍면동",
				kind : "emd",
				cd : 'emd_cd',
				nm : 'emd_nm',
				orderField: 'emd_nm asc',
				keyword: '',
				queryField: 'sgg_cd'
			}
		},
	};
	window.SearchConfig = SearchConfig;
})(window, jQuery);