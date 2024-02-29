package kr.or.lx.rcic.modules.search.mapper;

import java.util.List;
import java.util.Map;

public interface SearchMapper {



    List<Map<String, Object>> getBmngSchList(Map<String, Object> params);

    List<Map<String, Object>> getBmngSchListCnt(Map<String, Object> params);

    List<Map<String, Object>> getEmdCdList(Map<String, Object> params);

    List<Map<String, Object>> getLiCdList(Map<String, Object> params);

    List<Map<String, Object>> getCnbdList(Map<String, Object> params);

    List<Map<String, Object>> getGeomFromRn(Map<String, Object> params);




}
