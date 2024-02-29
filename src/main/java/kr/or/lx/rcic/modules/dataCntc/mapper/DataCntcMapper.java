package kr.or.lx.rcic.modules.dataCntc.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper
public interface DataCntcMapper {
		  
		Map<String, String> roadNameDataCntc(Map<String, String> params);
		
		int deleteRoadName();

		int insertRoadNameChange(Map<String, Object> paraMap);

		int insertRoadNameAll(Map<String, Object> paraMap);

	    int selectRoadNameChangeCnt(String chg_dt);
	    
	    int selectRoadNameAllChangeCnt(String chg_dt);

		int insertRoadName();

	   	List<Map<String, Object>> selectRoadNameChangeList(Map<String, Object> paramMap);

		int insertRoadNameAllChange(Map<String, Object> paraMap);

		int updateRoadNameAllChange(Map<String, Object> paraMap); 

		int deleteRoadNameAllChange(Map<String, Object> paraMap);

		void insertRoadNameChangeShpData(List<Map<String, Object>> arrayList);

		int selectRoadNameChangeShpDataCnt(String string);

		void insertRoadNameChangeShpDeleteData(Map<String, Object> paraMap);
		
		int selectRoadNameChangeShpDeleteDataCnt(Map<String, Object> paraMap);

		void insertRoadNameAllShpData(List<Map<String, Object>> arrayList);

		void deleteRoadNameAll();

		void deleteRoadNameShpAll();

		void insertRoadNameShpAll(Map<String, Object> fileMap);

		int selectRoadNameAllChangeShpCnt(String opert_de);

		void insertRoadNameAllShpChange(Map<String, Object> paraMap);

		List<Map<String, Object>> selectRoadNameChangeShpList(Map<String, Object> paraMap);

		void deleteRoadNameAllShpChange(Map<String, Object> map);

		List<Map<String, Object>> selectRoadNameChangeShpCList(Map<String, Object> paraMap);

		void updateRoadNameAllShpChange(Map<String, Object> paraMap);

		void insertCbndData(ArrayList<Map<String, Object>> paraList);

		List<Map<String, Object>> getRoadNameEmdCdList();

		void deleteCbndInfo();

		// 행정구역API
		void insertSidoData(ArrayList<Map<String, Object>> paraList);
		void deleteSidoInfo();
		
		void insertSggData(ArrayList<Map<String, Object>> paraList);
		void deleteSggInfo();

		void insertEmdData(ArrayList<Map<String, Object>> paraList);
		void deleteEmdInfo();

		void insertLiData(ArrayList<Map<String, Object>> paraList);
		void deleteLiInfo();

		List<Map<String, Object>> selectRoadInfoList(String resultno);

		List<Map<String, Object>> selectRoadLayerList(String resultno);

		void insertRoadLayerData(List<Map<String, Object>> arrayList);

		void insertRoadLayerDataFlag();

		int selectRoadLayerDataCnt(Map<String, Object> dataCntMap);

		void insertRoadLayerDataFlag(Map<String, Object> dataMap);

		void updateRoadLayerDataFlag(Map<String, Object> dataMap);

		void deleteRoadLayerDataFlag();

		List<Map<String, Object>> selectRoadLayerData(Map<String, Object> dataMap);

		Map<String, Object> selectRoadLayerDataFlag(Map<String, Object> dataMap);

		List<Map<String, Object>> selectRoadLayerDataList(Map<String, Object> dataMap);

		int selectRoadLayerDataFlagCnt(Map<String, Object> dataMap);


}
