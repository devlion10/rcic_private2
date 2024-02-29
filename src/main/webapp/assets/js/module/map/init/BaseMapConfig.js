


(function(window, $) {

	"use strict";


	var BaseMapConfig = {

			Daum : {
				name : "Daum",
				korName : "다음지도",
				crsCode : "EPSG:5181",
				extent : [-30000, -60000, 494288, 988576], 
				resolutions : [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25, 0.125, 0.0625, 0.03125, 0.015625], 
				center : [190382.3454148999, 453181.8290321287],
				layers : {
					base : {
						name : "기본지도",
						url : "https://map{0-3}.daumcdn.net/map_2d/1806shn/L{z}/{y}/{x}.png",
						visible : true  
					},
					satellite : {
						name : "위성지도",
						url : "https://map3.daumcdn.net/map_skyview/L{z}/{y}/{x}.jpg?v=160114",
						visible : false
					}
				} 
			}, 
			
			VWorld : {
				name : "VWorld",
				korName : "브이월드",
				crsCode : "EPSG:3857",
				//extent : [14097459.98, 4498797.83, 14172948.52, 4537291.27],  
				resolutions : [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25, 0.125, 0.0625, 0.03125, 0.015625],   
				center: [14124834.96, 4520351.90],
				layers: { 
					base : {
						name : "기본지도", //현재 무허가건물시스템과 같은 vworld 지도 api키를 사용
						url : "https://api.vworld.kr/req/wmts/1.0.0/"+Config.vworldBaseMapKey+"/Base/{z}/{y}/{x}.png", // key만료(2024-01-19)
						visible : false
					},
					gray : {
						name : "흑백지도",
						url : "https://api.vworld.kr/req/wmts/1.0.0/"+Config.vworldBaseMapKey+"/white/{z}/{y}/{x}.png", // key만료(2024-01-19)
						visible : true
					},
					satellite : {
						name : "위성지도",
						url : "https://api.vworld.kr/req/wmts/1.0.0/"+Config.vworldBaseMapKey+"/Satellite/{z}/{y}/{x}.jpeg", // key만료(2024-01-19)
						visible : false
					},
//					midnight : {
//						name : "야간지도",
//						url : "https://xdworld.vworld.kr/2d/midnight/201512/{z}/{x}/{y}.png",
//						visible : false
//					},
					hybrid : {
						name : "하이브리드",
						url : "https://api.vworld.kr/req/wmts/1.0.0/"+Config.vworldBaseMapKey+"/Hybrid/{z}/{y}/{x}.png", // key만료(2024-01-19)
						visible : false
					}
				}
			},
			ImageMap : {
				name : "ImageMap",
				korName: "ImageMap",
				crsCode: "EPSG:5181",
				extent : [168123.95, 436421.637360, 228039.09, 466843.609998], 
				resolutions : [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25, 0.125, 0.0625, 0.03125, 0.015625], 
				center : [190382.3454148999, 453181.8290321287],
				layers: {
					base : {
						name : "기본지도",
						url : "", 
						visible : false
					}
				} 
			}
	}
	window.BaseMapConfig = BaseMapConfig;
	window.name = "BaseMapConfig.js";
})(window, jQuery);
