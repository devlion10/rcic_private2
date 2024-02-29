/**
 * form serialize -> Object
 * @returns {{}}
 */
$.fn.serializeObject = function() {
    var result = {}
    var extend = function(i, element) {
        var node = result[element.name]
        if ("undefined" !== typeof node && node !== null) {
            if ($.isArray(node)) {
                node.push(element.value)
            } else {
                result[element.name] = [node, element.value]
            }
        } else {
            result[element.name] = element.value
        }
    }

    $.each(this.serializeArray(), extend)
    return result
}

$.isEmpty = function (me) {
    if (me == null) return true;

    if (me instanceof Array) {
        return me.length === 0;
    } else if (typeof me === 'string') {
        var val = $.trim(me);
        return val.length === 0;
    } else {
        throw Error('unknown type');
    }
};

$.isNotEmpty = function (val) {
    return !$.isEmpty(val);
};
$.fn.txt = function (val) {
    if (val == null) val = '';
    return $(this).text(val);
};



/**
 * 목록 결과가 없을 때 사용
 * retrieve 전 목록 초기화
 * @param colCnt
 */
$.fn.noDataList = function (colCnt, message) {

    if (!message) message = '조회된 데이터가 없습니다.';

    var $td = $('<td/>').attr('colspan', colCnt).text(message);
    var $tr = $('<tr/>').append($td);
    $(this).html($tr);
};

/**
 * 관리자 공통 페이징
 * @param currPage
 * @param maxPage
 * @param onclickFn
 */
$.fn.pagination = function (currPage, maxPage, onclickFn) {
    if (!maxPage) maxPage = 1;
    $(this).twbsPagination('destroy');
    $(this).twbsPagination({
        totalPages: parseInt(maxPage),
        visiblePages: 10,
        startPage: currPage,
        first: '«',
        last:'»',
        next: '&rsaquo;',
        prev: '&lsaquo;',
        initiateStartPageClick: false,
        hideOnlyOnePage: false,
        onPageClick: function (event,page) {
            onclickFn(page);
        }
    });
};

/**
 * 명칭사전 관리 페이징 - Solr가 뻗으므로 맨앞 맨뒤를 막는다.
 * @param currPage
 * @param maxPage
 * @param onclickFn
 */
$.fn.dicPagination = function (currPage, maxPage, onclickFn) {
    $(this).twbsPagination('destroy');
    $(this).twbsPagination({
        totalPages: (parseInt(maxPage)==0)?1:parseInt(maxPage),
        visiblePages: 10,
        startPage: currPage,
        first: null,
        last: null,
        next: '&rsaquo;',
        prev: '&lsaquo;',
        initiateStartPageClick: false,
        hideOnlyOnePage: false,
        onPageClick: function (event,page) {
            onclickFn(page);
        }
    });
};


/**
 * 목록 화면에서 토탈카운트 영역을 세팅한다.
 * @param res
 * @param curr
 */
$.fn.setTotalCount = function (res, curr) {
    var total = res.totalCnt;
    var max = res.maxPageCnt;

    if (total == null) total = 0;
    if (max == null) max = 0;
    if (curr == null) curr = 0;

    var html = '전체 <span>' + total + '건</span>[<span>' + curr + '/' + max + '</span>페이지]';
    $(this).html(html);
};


function defaultErrorFn(e) {
    console.error(e);
    alert('오류가 발생했습니다. 시스템 담당자에게 문의하세요.');
}

/**
 * Object를 Solr 쿼리로 변환
 * @param q { }
 * @param operator AND 혹은 or
 */
function toSolrQuery(data, operator) {
    var query = '';
    var logicalOpr = ' ' + operator + ' ';
    for (var key in data) {
        if (!data[key]) continue;
        if (query !== '') {
            query += logicalOpr;
        }
        query += key + ':(' + data[key] + ')';
    }
    return query === '' ? '*:*' : query;
}

/**
 * 날짜포맷 알아서 ㄴ
 * @param str
 * @returns {string}
 */
function formatDate(str) {
    if (str == null || $.trim(str) == '') {
        return '';
    }
    if (str.length == 8) {
        return str.substring(0, 4) + '-' + str.substring(4, 6) + '-' + str.substring(6);
    }
}

/**
 * 숫자 콤마
 * @param str
 * @returns {string}
 */
function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}


function exportTableToExcel(tableID, filename){
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

    // Specify file name
    filename = filename?filename+'.xls':'excel_data.xls';

    // Create download link element
    downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
    }
}