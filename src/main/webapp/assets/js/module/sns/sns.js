var currPage = 1;
var addCnt = 0;
var addClickFlag = false;
var Sns = {
	
	getSnsList : function (currPage) {
			if($.isNullString(currPage)){
				currPage = "1";
			}
			
			var listCnt = "5";
			var keyword = $('#snsKeyword').val();
			var collection ="tb_sns_info";
			var searchKeyword =  $('#selectKeyword option:selected').val();
			var startPage = String((parseInt(currPage)-1)*parseInt(listCnt));
			
			if(!$.isNullString(keyword)){  
				if(searchKeyword == "0"){
					//searchKeyword = "sns_content:공사 OR sns_content:도로  OR sns_content:사고 OR sns_content:국도 AND sns_content:" + keyword + '';
					searchKeyword = "sns_content:개통 OR sns_content:공사  AND sns_content:" + keyword + '';
				}else if(searchKeyword == "1"){
					searchKeyword = "sns_content:공사 AND sns_content:" + keyword + '';
				}else if(searchKeyword == "2"){
					searchKeyword = "sns_content:도로 AND sns_content:" + keyword + '';
				}
			}else {
				if(searchKeyword == "0"){
					//searchKeyword = "sns_content:공사 OR sns_content:도로  OR sns_content:사고 OR sns_content:국도";
					searchKeyword = "sns_content:개통 OR sns_content:공사"
				}else if(searchKeyword == "1"){
					searchKeyword = "sns_content:공사";
				}else if(searchKeyword == "2"){
					searchKeyword = "sns_content:도로";
				}
			}
			
			var data = new Object();
	
				data.searchKeyword = searchKeyword;  
				data.order="sns_regist_dt";  
				
			_commonSearch.getSearchList(startPage, listCnt, data, collection, function(response){
			    var resultData = response.result;
			    var html="";   
				
				if(addClickFlag == false){
					$('.goveListBox').empty();   
				}
				
				 for(var i in resultData){
					 
				    var number = Math.random() 
				    number.toString(36);
				    var timeInMs = number.toString(36).substr(2, 9); 
					 
					html += '<li>';  
					html += '	<div class="socialInfoBox">';
					html += '		<div class="inline thumBox">';
					html += '			<div class="thumb">';
					html += '				<img src="' + resultData[i].sns_profile_img+ '" alt="thumbnail" style="width:100%; height:100%;">';
					html += '			</div>';
					html += '		</div>';
					html += '		<div class="inline goverInfoBox">';
					html += '			<div class="goverInfo">';
					html += '				<div>';
					html += '					<p class="goverCom">' + resultData[i].sns_name + '<span>@ ' + resultData[i].sns_account + '</span></p>';
					//html += '					<p class="goverTag"><span>태그</span>' + resultData[i].sns_name +'</p>';
					html += '				</div>';
					html += '				<div>';
					html += '					<p class="goverDate">' + resultData[i].sns_regist_dt.substr(0, 16) + '</p>';
					html += '					<a href = "https://twitter.com/' + resultData[i].sns_account +'" target="_blank"><p class="goverWork">' + resultData[i].sns_content;
					
						if(!$.isNullString(resultData[i].sns_url)){
							html += '    	' + resultData[i].sns_url
						}
					
					html += 					'</p></a>';
					html += '				</div>';
					html += '			</div>';
					html += '		</div>';
					
					html += '<div class="goverInfoBox mo">';
					html += '	<div class="goverInfo">';
					html += '		<div>';
					html += '			<p class="goverDate">' + resultData[i].sns_regist_dt.substr(0, 16) + '</p>';
					html += '			<p class="goverWork">' + resultData[i].sns_content;
					
						if(!$.isNullString(resultData[i].sns_url)){
							html += '    	' + resultData[i].sns_url
						}
					
					html += 			'</p>';
					html += '		</div>';
					html += '	</div>';
					html += '</div>';
					
					html += '		<div class="socialIconBox">';
					html += '			<img src="/assets/images/thumb/twitter.png" alt="twitter">';
					html += '		</div>';
					
					if(!$.isNullString(resultData[i].geo_wkt)){
						html += '		<div class="inline locationBox">';  
						html += '			<div class="locTbl">'; 
						html += '				<div class="locCell">';
						html += '					<p>위치 보기</p>';
						html += '					<div onclick="Sns.mapView(this); return false;">';
						html += '						<img src="/assets/images/icon/top_arrow.png" alt="opImage" class="mt20" >';
						html += '						<input type="hidden" name="snsNo" value="' + resultData[i].sns_no + '">';
					    html += '						<input type="hidden" name="indx" value="' + timeInMs + '">';
					    html += '						<input type="hidden" name="geo_wkt" value="' + resultData[i].geo_wkt+ '">';
						html += '					</div>'; 
						html += '				</div>';
						html += '			</div>';
						html += '		</div>';
						
						html += '	</div>';
						html += '	<div class="locMapBox">';
						html += '		<div id="snsMapDiv'+timeInMs+'"style="position: absolute; height: 270px; width: 100%;"></div>'; 		

						//html += '		<div class="locMap"><img src="/assets/images/map/twitter_mark.png" alt="marker"></div>';
						html += '	</div>';
					}
					
					html += '</li>';
				}
				
			  	if(response.totalCnt > listCnt){
					$('.moreBox').css('display', '');
				}else{
					$('.moreBox').css('display', 'none');
				}
				
				if(addClickFlag){
					$('.goveListBox').append(html); 
				}else{
					$('.goveListBox').html(html);   
				}
				
			});
			
		},
	
		moreSnsList:function(){
			addClickFlag = true
			currPage++;
			Sns.getSnsList(currPage+"");
		},
		
		onChangeSnsList:function(){
			addClickFlag = false;
			Sns.getSnsList("");
		},
		
		mapView: function(elem){
			// 위치보기
			if($(elem).hasClass("active")){ 
				$(elem).removeClass("active"); 
				$(elem).parents(".socialInfoBox").next(".locMapBox").slideUp("fast");  
				$(elem).prev("p").text("위치 보기"); 
				return false;  
			} 
	
			$(".locationBox img").removeClass("active"); 
			$(".locMapBox").slideUp("fast");
			$(".locationBox p").text("위치 보기");
			$(elem).prev("p").text("위치 닫기");
			$(elem).parents(".socialInfoBox").next(".locMapBox").slideDown("fast");
			$(elem).addClass("active");
			
			var snsNo = $(elem).find('input[name="snsNo"]').val();
			var idx = $(elem).find('input[name="indx"]').val();
			Sns.getSnsLoc(elem,snsNo,idx);  
		}, 
		
		
		getSnsLoc:function(elem,snsNo,i){
			
			_snsMap.map.setTarget(('snsMapDiv'+i));
			
				var geo_wkt = $(elem).find('input[name="geo_wkt"]').val();
				//$('#snsMap').empty();		 
				var wktFormat= new ol.format.WKT();		
					var feature = wktFormat.readFeature(geo_wkt);
					var extent = feature.getGeometry().getExtent();  
					var obj = new Object();
						obj.type="tt";
						
					_snsMap.map.getView().fit(extent); 
	        		if(_snsMap.map.getView().getZoom()>=10){ 
	        			_snsMap.map.getView().setZoom(10); 
	        		}  
					_snsMap.mapLayerMng.addTempLayer("git",[feature],obj); 
					_snsMap.map.updateSize();
		},  
}
