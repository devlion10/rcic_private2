package kr.or.lx.rcic.modules.search.service;


import kr.or.lx.rcic.modules.analysisLocHist.entity.AnalysisLocHist;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 *  지도 좌측 메뉴 비관리청 검색을 관리한다.  */
public interface SearchService{

    List<Map<String, Object>> getBmngSchList(Map<String, Object> params) throws Exception;
    List<Map<String, Object>> getBmngSchListCnt(Map<String, Object> params) throws Exception;

    List<Map<String, Object>> getEmdCdList(Map<String, Object> params) throws Exception;


    List<Map<String, Object>> getLiCdList(Map<String, Object> params) throws Exception;


    List<Map<String, Object>> getCnbdList(Map<String, Object> params) throws Exception;

    List<Map<String, Object>> getGeomFromRn(Map<String, Object> params) throws Exception;





}
