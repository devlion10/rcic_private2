package kr.or.lx.rcic.modules.dashboard.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.util.EgovMap;

public interface DashboardService {
	public List<EgovMap> getGPSData(HashMap<String, Object> params);
	public List<EgovMap> getMediaType(HashMap<String, Object> params);
	
	public EgovMap selectTrafficInfo(Map<String, Object> params);
	
	/**
	 * API 사용현황 조회
	 * @param param
	 * @return
	 * @throws Exception
	 */
	int getApiUseStatusCount(Map<String, Object> param) throws Exception;
    
	/**
	 * API 사용현황 목록 조회
	 * @param param
	 * @return
	 * @throws Exception
	 */
	List<Map<String, Object>> getApiUseStatsList(Map<String, Object> param) throws Exception;
}
