package kr.or.lx.rcic.modules.api.entity;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class AnalysisInfoResonse extends ApiResponseBase{

    //List<SolrAnalysisInfo> items;
    List<Map> items;

//    public static AnalysisInfoResonse from(QueryResponse queryResponse, String curPage, String cntPerPage) throws Exception {
//        AnalysisInfoResonse res = new AnalysisInfoResonse();
//        res.setTotCnt(queryResponse.getResults().getNumFound());
//        res.setCurPage(Long.valueOf(curPage));
//        res.setCntPerPage(Long.valueOf(cntPerPage));
//        res.setItems(queryResponse.getBeans(SolrAnalysisInfo.class));
//        return res;
//    }

    public static AnalysisInfoResonse from(Map<String, Object> param, Map<String, Object> result) throws Exception {
        AnalysisInfoResonse res = new AnalysisInfoResonse();
        res.setTotCnt(Long.valueOf((int)result.get("totalCnt")));
        res.setCurPage(Long.valueOf((int)param.get("currPage")));
        res.setCntPerPage(Long.valueOf((int)param.get("listCnt")));
        res.setItems((List<Map>) result.get("list"));

        List<Map<String, Object>> list = (List<Map<String, Object>>) result.get("list");
        for (Map<String, Object> row : list) {
            row.put("road_ty_nms", row.get("road_ty_nm"));
            row.put("fac_ty_nms", row.get("fac_ty_nm"));
            row.put("road_no", row.get("national_highway_no"));

            row.remove("road_ty_nm");
            row.remove("fac_ty_nm");
            row.remove("national_highway_no");
        }

        return res;
    }


}
