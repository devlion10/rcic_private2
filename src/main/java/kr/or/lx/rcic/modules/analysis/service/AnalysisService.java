package kr.or.lx.rcic.modules.analysis.service;

import kr.or.lx.rcic.modules.api.exception.CalsInsertSqlExecption;

import java.util.List;
import java.util.Map;

public interface AnalysisService {

    Map<String, Object> getAnalysisDetail(String resultno) throws Exception;

	Map<String, Object> getAnalysisDetailRoad(String resultno) throws Exception;

	Map<String, Object> getAnalysisDetailPoi(String resultno) throws Exception;

	Map<String, Object> getAnalysisDetailCbnd(String resultno) throws Exception;

	Map<String, Object> getAnalysisDetailDevelop(String resultno) throws Exception;

	List<Map<String, Object>> selectRoadLayerList(String resultno) throws Exception;

	List<Map<String, Object>> selectRoadInfoList(String resultno) throws Exception;

	Map<String, Object> getRoadLayerImg(String layNm) throws Exception;

	String checkLayerInfo(String roadNo, String sect, String layNm) throws Exception;

	List<Map<String, Object>> selectRoadLayerDataList(Map<String, Object> dataMap) throws Exception;

	int getlocChangeCnt(String resultno) throws Exception;

	List<Map<String, Object>> selectRoadInfoHistList(String resultno) throws Exception;

	int insertCalsDataToRcic(Map<String, Object> dataMap) throws Exception;

}
