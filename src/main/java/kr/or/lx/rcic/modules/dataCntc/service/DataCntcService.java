package kr.or.lx.rcic.modules.dataCntc.service;

import java.awt.AWTException;
import java.io.IOException;
import java.net.MalformedURLException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.solr.client.solrj.SolrServerException;
import org.opengis.referencing.FactoryException;

public interface DataCntcService {
	/**
	 * 변동분 자료 다운로드 (기초번호)
	 */
	Map<String, Object> roadNameDataCntc() throws Exception;
	
	/**
	 * 변동분 자료 적재
	 */
	String insertRoadNameChange(Map<String, Object> fileMap) throws Exception;
	
	/**
	 * 전체분 자료 적재(기초번호_txt)
	 */
	void insertRoadNameAll(Map<String, Object> fileMap) throws Exception;

	/**
	 * 기존 새주소 도로명 테이블 전체 데이터 삭제
	 */
	int deleteRoadName() throws Exception;

	/**
	 * 전체분 자료를 tl_road_name으로 마이그레이션  
	 */
	int insertRoadName() throws Exception;
	
	/**
	 * Solr Data Import 실행
	 */
	public String dataImportDo(String solrServerUrl, String sdate, String edate, String minute) throws SolrServerException, AWTException, IOException, InterruptedException;

	/**
	 * 변동분의 날짜 및 변경 사유 별 리스트를 가져온다
	 */
	List<Map<String, Object>> selectRoadNameChangeList(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 새주소 도로명 변동분 변동일시 별 카운트
	 */
    int selectRoadNameChangeCnt(String chg_dt) throws Exception;
    
    /**
	 * 전체분 등록일자별 카운트
	 */
    int selectRoadNameAllChangeCnt(String chg_dt) throws Exception;

	/**
	 * 변동분 생성분 반영(변경 사유:C)
	 */
	int insertRoadNameAllChange(Map<String, Object> paraMap) throws Exception;
	
	/**
	 * 변동분 변경분 반영(변경 사유:U)
	 */
	int updateRoadNameAllChange(Map<String, Object> paraMap) throws Exception;

	/**
	 * 변동분 생성분 반영(변경 사유:D)
	 */
	int deleteRoadNameAllChange(Map<String, Object> paraMap) throws Exception;
	
	/**
	 * Solr Core Reload 실행
	 */
	void coreReloadDo(String solrAdminUrl, String target) throws Exception;
	
	/**
	 * 변동사유(생성,변동,폐지)에 따른 처리 (기초번호_txt)
	 */
	void roadNameChangeDo(Map<String, Object> paraMap) throws Exception;

	/**
	 * 변동분 요청 및 자료 다운로드(shp)
	 */
	Map<String, Object> roadNameDataCntcShp() throws Exception;

	/**
	 * shpae파일 DB적재
	 */
	Map<String, Object> insertRoadNameShpData(ArrayList<Map<String, Object>> paraList) throws Exception;

	/**
	 * 전체분 자료 적재(도로명이 부여된 도로 도형_shp)
	 */
	void insertRoadNameShpAll(Map<String, Object> fileMap) throws Exception;
	
	/**
	 * 변동사유(생성,변동,폐지)에 따른 처리 (도로명이 부여된 도로 도형_shp)
	 */
	void roadNameDataCntcShpDo(Map<String, Object> paraMap) throws Exception;

	/**
	 * 전체분 자료 전체 삭제(기초번호_txt)
	 */
	void deleteRoadNameAll() throws Exception;

	/**
	 * 전체분 자료 전체 삭제(도로명이 부여된 도로 도형_shp)
	 */
	void deleteRoadNameShpAll() throws Exception;

	/**
	 * 전체분 전체 자료 최초 1회 데이터 일괄 적재(기초번호_txt,도로명이 부여된 도로 도형_shp)
	 */
	void insertRoadNameAllDo(Map<String, Object> fileMap) throws Exception;

	/**
	 * 전체분 데이터을 기존 새주소도로명으로 최초 1회 마이그레이션 처리(기초번호_txt + 도로명이 부여된 도로 도형_shp)
	 */
	void roadNameDataCntcAllMigDo() throws Exception;

	/**
	 * 변동분 자료 다운로드 후 변동분 데이터 적재 & 일 변동 자료의 변동사유(생성,변동,폐지)에 따른 처리
	 */
	void roadNameDataCntcChangeDo() throws Exception;

	/**
	 * 연속지적도 데이터 적재
	 */
	void insertCbndData(ArrayList<Map<String, Object>> paraList) throws Exception;
	
	/**
	 * 전체 읍면동 코드 리스트 조회
	 */
	List<Map<String, Object>> getRoadNameEmdCdList() throws Exception;

	/**
	 * 연속지적도 전체 데이터 제거
	 */
	void deleteCbndInfo() throws Exception;

	/**
	 * 연속지적도 API 연계
	 */
	void cbndAPIDo() throws Exception;

	
	// ------------- 행정경계 api
	/**
	 * 행정경계 API 연계
	 */
	void legaldongAPIDo() throws Exception;
	
	/**
	 * 시도 테이블 데이터 제거
	 */
	void deleteSidoInfo() throws Exception;
	
	/**
	 * 행정경계 시도 데이터 적재
	 */
	void insertSidoData(ArrayList<Map<String, Object>> paraList);
	
		// -- 시군구 
	/**
	 * 시군구 테이블 데이터 제거
	 */
	void deleteSggInfo() throws Exception;
	
	/**
	 * 행정경계 시군구 데이터 적재
	 */
	void insertSggData(ArrayList<Map<String, Object>> paraList);
		
		// -- 읍면동
	
	/**
	 * 시도 테이블 데이터 제거
	 */
	void deleteEmdInfo() throws Exception;
	
	/**
	 * 행정경계 시도 데이터 적재
	 */
	void insertEmdData(ArrayList<Map<String, Object>> paraList);
	
		// -- 리
	
	/**
	 * 시도 테이블 데이터 제거
	 */
	void deleteLiInfo() throws Exception;
	
	/**
	 * 행정경계 시도 데이터 적재
	 */
	void insertLiData(ArrayList<Map<String, Object>> paraList);

	// 도로 정보(도로노선번호:4자리, 도로구간번호:2자리)
	List<Map<String, Object>> selectRoadInfoList(String resultno) throws Exception;

	// 도로대장 레이어 정보(레이어 ID, 레이어물리명)
	List<Map<String, Object>> selectRoadLayerList(String resultno) throws Exception;

	void setLayerInfo(String roadNo, String layId, String sect, String layNm, String layColor, String layImg) throws Exception;

	String checkLayerInfo(String roadNo, String sect, String layNm) throws Exception;

	List<Map<String, Object>> selectRoadLayerDataList(Map<String, Object> dataMap) throws Exception;

	void deleteRoadLayerDataFlag() throws Exception;
	

	
	
    
}