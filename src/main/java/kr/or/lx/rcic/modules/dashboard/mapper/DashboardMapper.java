package kr.or.lx.rcic.modules.dashboard.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.util.EgovMap;

public interface DashboardMapper {
	List<EgovMap> selectGPSInfo(HashMap<String, Object> params);
	
	EgovMap selectTrafficInfo(Map<String, Object> params);
	
    int getApiUseStatusCount(Map<String, Object> params);
    
    List<Map<String, Object>> getApiUseStatsList(Map<String, Object> params);

	List<EgovMap> selectMediaInfo(HashMap<String, Object> params);
}
