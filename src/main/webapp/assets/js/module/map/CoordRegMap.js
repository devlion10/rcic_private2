(function(window, $) {
	"use strict";
  var CoordRegMap = {

         vworldKey : "9081FF2E-DA77-38FE-A44E-6C3F1D1E0EF0",
        _map : {},//전역 ol 맵 객체
        baseLayers :{},//기본 배경 지도(기본 배경레이어)
        wmsLayer :{},//wms 레이어
        wmsSource:{},
        mapView :{},//mapView
        clickedEle_shcInMap: '',//지도에서 버튼 찾기 요소 (시점, 종점 구분)

        createMapClass: function(_this) {//지도에서 찾기 버튼 클릭 시


                        if(document.querySelector('#coordRegMapParent')){//존재하면삭제
                            document.querySelector('#coordRegMapParent').remove();
                        }

                        var insertDiv=document.createElement('div');//프레그먼트 삽입될 div 생성
                        document.body.appendChild(insertDiv);
                        insertDiv.setAttribute("id","coordRegMapParent");



                        var template=document.querySelector('#coordRegMapTemp');
                        var fragCopy = template.content.cloneNode(true);

                        insertDiv.appendChild(fragCopy);

                        this.clickedEle_shcInMap=_this;//클릭 된 요소 전역변수 셋팅
                        console.info(_this.getBoundingClientRect().top);
                        var elementTop = window.pageYOffset + _this.getBoundingClientRect().top+35;//클릭한 요소의 절대좌표+5
                        console.info(elementTop);


                        var ele=_this;
                        if (ele.id==='startCoordBtn'){//시점에서 지도 표출 시
                             document.querySelector('#coordRegMap').style.left='23px';
                             document.querySelector('#coordRegMap').style.top=elementTop+'px';//클릭한 버튼 요소 절대좌표로 지도 셋팅
                             document.querySelector('#coordRegMapClose').style.position='relative';//시점등록 지도표출시 닫기버튼 왼쪽
                             document.querySelector('#coordRegMapClose').style.left='15px';
                             document.querySelector('#coordRegMapClose').style.top='9px';
                        }else{//종점에서 지도표출 시
                             document.querySelector('#coordRegMap').style.left='888px';
                             document.querySelector('#coordRegMap').style.top=elementTop+'px';//클릭한 버튼 요소 절대좌표로 지도 셋팅
                             document.querySelector('#coordRegMapClose').style.position='relative';//종점등록 지도표출시 닫기버튼 오른쪽
                             document.querySelector('#coordRegMapClose').style.left='807px';
                             document.querySelector('#coordRegMapClose').style.top='9px';

                        }
                        document.querySelector('#coordRegMapClose').style.display='block';//닫기버튼 표시

                        console.info(document.querySelector('#coordRegMap').classList.contains("on"));
                        if(document.querySelector('#coordRegMap').classList.contains("on")){//왼쪽, 오른 쪽 지도에서 찾기 클릭 시 이미 지도가 on 일 시


                                var layers=this._map.getLayers().array_;
                                console.info(layers)
                                 for(var i=0; i<layers.length; i++){//좌표 관련 피쳐레이어들 모두 삭제
                                        console.info(i)
                                        console.info(layers[i].values_.name);
                                        if(layers[i].values_.name==='coordDrawVector'){
                                            layers.splice(i);
                                        }
                                 }
                                 //화면에 남아있는 feature들을 포함하는 각각의 vectoer layer를 안보이게 하기위해 센터이동 한번 해줌
                                 //this._map.getView().setCenter([14124834.96, 4520351.90]);


                                 return;



                        }else{
                             document.querySelector('#coordRegMap').className +=' on'
                        }




                        console.info(document.querySelector('#coordRegMap'));
                        console.info("CREATE MAP CLASS");
                        // 기본이 될 Layer 저장
                        // 레이어 (단일 또는 다중)

                        this.baseLayers["VWorld"] = new ol.layer.Tile({
                          title: "VWorld Gray Map",
                          visible: true,
                          id: "VWorld",
                          type: "base",
                          source: new ol.source.XYZ({
                            url: "http://api.vworld.kr/req/wmts/1.0.0/"+this.vworldKey+"/Base/{z}/{y}/{x}.png",
                            crossOrigin: "anonymous",
                          }),
                        }),

                        this.baseLayers["OSM"] = new ol.layer.Tile({
                                              source: new ol.source.OSM(),

                        });


                        // 지도그리기
                        this.mapView = new ol.View({
                            center: [14124834.96, 4520351.90],
                            zoom: 12,
                            minZoom: 7,
                            maxZoom: 18
                            ,projection : 'EPSG:3857'
                        });


                        // 기본지도 그리기
                        this._map = new ol.Map({
                            target: 'coordRegMap',
                             layers :[
                                          // baseLayers['VWorld'], tmprVectorLayer
                                          //baseLayers를 제외하고 융합정보 나열시 CheckBox랑 순서 똑같이 맞춰야됨
                                          this.baseLayers['VWorld']
                                          //, this.baseLayers['OSM']//순차적으로 기본 레이어 쌓임
                                      ],
                            overlays: [],
                            view: this.mapView
                            //,controls: ol.control.defaults({ attributionOptions: { collapsible: true } })
                            //.extend([new ol.control.ZoomToExtent({ extent: [13599573.582313137, 4044710.672790877, 14753466.961306157, 4621963.110400528] })])
                            //.extend([new ol.control.FullScreen()])
                        });




                        this._map.on('singleclick', function(evt) {//이벤트리스너 안에서는 this 사용 금지
                                     //   이벤트리스너 안에서는 this 사용 금지
                                    var map=CoordRegMap._map;//클릭 이벤트 안이기 때문에 this가 먹질 않음 , 직접 전역변수 객체 정의해야함
                                    console.info(evt);
                                    var coordinate = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:3857');
                                                               //let coordinate = evt.coordinate;
                                    console.log(coordinate);


                                    //좌표 관련 피쳐레이어들 모두 삭제
                                    var layers=map.getLayers().array_;
                                    console.info(layers)
                                     for(var i=0; i<layers.length; i++){//좌표 관련 피쳐레이어들 모두 삭제
                                            console.info(i)
                                            console.info(layers[i].values_.name);
                                            if(layers[i].values_.name==='coordDrawVector'){
                                                layers.splice(i);
                                            }
                                     }
                                     //좌표 관련 피쳐레이어들 모두 삭제



                                      var feature = new ol.Feature({
                                                geometry: new ol.geom.Point(coordinate)
                                          });
                                      console.info(feature);
                                      var img ='/assets/images/map/cor_mark_on.png';
                                      var anchor =  [0.5, 46];
                                      var style = new ol.style.Style({
                                                                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                                                                        anchor: anchor,
                                                                        anchorXUnits: 'fraction',
                                                                        anchorYUnits: 'pixels',
                                                                        scale : 1,
                                                                        src: img//"acc" ?'/assets/images/map/cor_mark_off.png' :'/assets/images/map/marker-icon.png'
                                                                    }))
                                                                });
                                      feature.setStyle(style);
                                      var features=[];
                                      features.push(feature);//피쳐 어레이에 피쳐 하나만 추가

                                      var layer = new ol.layer.Vector({
                                                    name : "coordDrawVector",
                                                    id	: "coordDraw",
                                                    minResolution: '0',
                                                            maxResolution: '1025',
                                                                    source: new ol.source.Vector({
                                                                    }),
                                                });


                                      console.info(layer.getSource())
                                      layer.getSource().addFeatures(features);


                                      map.addLayer(layer);
                                      var coord_latlon= new ol.geom.Point(coordinate).transform('EPSG:3857', 'EPSG:4326').getCoordinates();
                                      console.info(coord_latlon);

                                      console.info(CoordRegMap.clickedEle_shcInMap);

                                      var lon_input_ele=CoordRegMap.clickedEle_shcInMap.previousElementSibling//경도 input 요소
                                      console.info(lon_input_ele);
                                      lon_input_ele.value=coord_latlon[0];//경도셋팅
                                      lon_input_ele.previousElementSibling.value=coord_latlon[1];//위도셋팅



                       });








        },





        getCoordDraw : function(resultno) {
                    console.info("mapPageGbn");
                    console.info(mapInit);





                     mapInit.map.on('singleclick', function(evt) {
                           console.info(evt);

                           var coordinate = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:3857');
                           //let coordinate = evt.coordinate;
                           console.log(coordinate);

                           var feature = new ol.Feature({
                                    geometry: new ol.geom.Point(coordinate)
                              });
                          console.info(feature);
                          var img ='/assets/images/map/cor_mark_on.png';
                          var anchor =  [0.5, 46];
                          var style = new ol.style.Style({
                                                        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                                                            anchor: anchor,
                                                            anchorXUnits: 'fraction',
                                                            anchorYUnits: 'pixels',
                                                            scale : 1,
                                                            src: img//"acc" ?'/assets/images/map/cor_mark_off.png' :'/assets/images/map/marker-icon.png'
                                                        }))
                                                    });
                          feature.setStyle(style);
                          var features=[];
                          features.push(feature);

                          var layer = new ol.layer.Vector({
                                        title : "coordDrawtest",
                                        id	: "coordDraw",
                                        minResolution: '0',
                                                maxResolution: '1025',
                                                        source: new ol.source.Vector({
                                                        }),
                                    });
                          layer.getSource().addFeatures(features);
                          mapInit.layer["coordDraw"] = layer;
                          mapInit.map.addLayer(mapInit.layer["coordDraw"]);

                          mapInit.map.addControl(new ol.control.MousePosition({
                            coordinateFormat: function() {

                            },
                            projection: 'EPSG:3857',
                          }));




                     });

                },

        emptyMapDiv : function(_this){//닫기 버튼

               document.querySelector('#coordRegMapParent').remove();





        }


   }
	window.CoordRegMap = CoordRegMap;
	window.name = "CoordRegMap.js";
})(window, jQuery);