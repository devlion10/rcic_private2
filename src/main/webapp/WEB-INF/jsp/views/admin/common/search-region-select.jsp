<div class="form-group ${param.styleClass}">
    <label for="selectRegion" class="mr10">선택</label>
    <select class="form-control mr10" name="sido_cd" id="selectRegion">
        <option value="">시/도 선택</option>
    </select>
    <select class="form-control mr10" name="sgg_cd" id="selectRegion2">
        <option value="">시/군/구 선택</option>
    </select>
    <select class="form-control mr10" name="emd_cd" id="selectRegion3">
        <option value="">읍/면/동 선택</option>
    </select>
    <select class="form-control mr10" name="ri_cd" id="selectRegion4" style="visibility:hidden;">
        <option value="">리 선택</option>
    </select>
</div>

<script type="text/javascript">
    $(function () {
        setSidoSelect();
        $('select[name="sido_cd"]').on('change', function () {
            if ($(this).val()) {
                setSggSelect();
            } else {
                initSggSelect();
                initEmdSelect();
                initRiSelect();
            }
        });
        $('select[name="sgg_cd"]').on('change', function () {
            if ($(this).val()) {
                setEmdSelect();
            } else {
                initEmdSelect();
                initRiSelect();
            }
        });
        
        $('select[name="emd_cd"]').on('change', function () {
            if ($(this).val()) {
                setRiSelect();
            } else {
                initRiSelect();
            }
        });
    });

    function setSidoSelect() {
        var data = {
            searchKeyword: '*:*',
            order: 'sido_cd asc'
        };
        _commonSearch.getSearchList("0", "17", data, 'legaldong_sido', function(response){
            var html = "";
            var list = response.result;
            
            let mapObj = new Map();
            
            for(var i in list){
            	mapObj.set(list[i].sido_nm, list[i].sido_cd);
            }
            
            let keyAscArray = [...mapObj];
            
            keyAscArray.sort();
            
            let keyAscMap = new Map(keyAscArray);
            
            for(let [key, val] of keyAscMap.entries()) {
            	html += '<option value = "' + val + '">' + key + '</option>';
            }
            
            /* for(var i in list){
                html += '<option value = "' + list[i].sido_cd + '">' + list[i].sido_nm + '</option>';
            } */
            
            $('select[name="sido_cd"]').append(html);
        },false);
    }

    function setSggSelect() {
        var sido =  $('select[name="sido_cd"] option:selected').val();
        var collection ="legaldong_sgg";
        var data = {
            searchKeyword: 'sido_cd:(' + sido + ')',
            order: 'sgg_cd asc'
        };

        initSggSelect();
        initEmdSelect();

        _commonSearch.getSearchList("0", "100", data, collection, function(response){
            var html = "";
            var list = response.result;
            
			let mapObj = new Map();
            
            for(var i in list){
            	mapObj.set(list[i].sgg_nm, list[i].sgg_cd);
            }
            
            let keyAscArray = [...mapObj];
            
            keyAscArray.sort();
            
            let keyAscMap = new Map(keyAscArray);
            
            for(let [key, val] of keyAscMap.entries()) {
            	html += '<option value = "' + val + '">' + key + '</option>';
            }
            
            /* for(var i in list){
                html += '<option value = "' + list[i].sgg_cd + '">' + list[i].sgg_nm + '</option>';
            } */
            $('select[name="sgg_cd"]').append(html);
        },false);
    }

    function initSggSelect() {
        $('select[name="sgg_cd"]').html('<option value="" selected="selected">시/군/구</option>');
    }

    function initEmdSelect() {
        $('select[name="emd_cd"]').html('<option value="" selected="selected">읍/면/동</option>');
    }
    
    function initRiSelect() {
        $('select[name="ri_cd"]').html('<option value="" selected="selected">리</option>');
    }

    function setEmdSelect() {
        var sido =  $('select[name="sido_cd"] option:selected').val();
        var sgg =  $('select[name="sgg_cd"] option:selected').val();
        var collection ="legaldong_emd";
        var searchKeyword = 'sido_cd:(' + sido + ') AND sgg_cd:(' + sgg + ')';

        var data = new Object();
        data.searchKeyword = searchKeyword;
        data.order="emd_cd asc";

        initEmdSelect();
        initRiSelect();
        _commonSearch.getSearchList("0", "100", data, collection, function(response){
            var html = "";
            var list = response.result;

			let mapObj = new Map();
            
            for(var i in list){
            	mapObj.set(list[i].emd_nm, list[i].emd_cd);
            }
            
            let keyAscArray = [...mapObj];
            
            keyAscArray.sort();
            
            let keyAscMap = new Map(keyAscArray);
            
            for(let [key, val] of keyAscMap.entries()) {
            	html += '<option value = "' + val + '">' + key + '</option>';
            }
            
            /* for(var i in list){
                html += '<option value = "' + list[i].emd_cd + '">' + list[i].emd_nm + '</option>';
            } */

            $('select[name="emd_cd"]').append(html);
        });
    }
    
    function setRiSelect() {
    	var sido =  $('select[name="sido_cd"] option:selected').val();
        var sgg =  $('select[name="sgg_cd"] option:selected').val();
        var emd =  $('select[name="emd_cd"] option:selected').val();
        var collection ="legaldong_li";
        var searchKeyword = 'sido_cd:(' + sido + ') AND sgg_cd:(' + sgg + ') AND emd_cd:(' + emd + ')';

        var data = new Object();
        data.searchKeyword = searchKeyword;
        data.order="li_cd asc";

        initRiSelect();
        _commonSearch.getSearchList("0", "100", data, collection, function(response){
            var html = "";
            var list = response.result;
            
			let mapObj = new Map();
            
            for(var i in list){
            	mapObj.set(list[i].li_nm, list[i].li_cd);
            }
            
            let keyAscArray = [...mapObj];
            
            keyAscArray.sort();
            
            let keyAscMap = new Map(keyAscArray);
            
            for(let [key, val] of keyAscMap.entries()) {
            	html += '<option value = "' + val + '">' + key + '</option>';
            }
            
            /* for(var i in list){
                html += '<option value = "' + list[i].li_cd + '">' + list[i].li_nm + '</option>';
            } */
            $('select[name="ri_cd"]').append(html);
        },false);
    }

</script>