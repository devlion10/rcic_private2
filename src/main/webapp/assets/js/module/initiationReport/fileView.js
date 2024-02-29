
//
var File={

   airImgWinRef:null,
   filePreView:function(_this){


      var userId='dlsgy10';
      var fileCreateDate='20240214';
      var imgFileNm='캡처.PNG';
      var imgFileNmArr=imgFileNm.split('.');
      var fileNm=imgFileNmArr[0];
      var fileType=imgFileNmArr[1];
      airImgWinRef=window.open('/preViewFile'+'/'+fileNm+'/'+fileType+'/'+userId+'/'+fileCreateDate,"_blank",'width=#, height=#');



   }





}