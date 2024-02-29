// 스크롤 이벤트
$(window).scroll(function() {
    var win = $(this).scrollTop();

    // 헤더 고정 클래스
    if(win > 0) { $(".headerWrap").addClass("fixed"); }
    else { $(".headerWrap").removeClass("fixed"); }
});


//콤마찍기
function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

//콤마풀기
function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}