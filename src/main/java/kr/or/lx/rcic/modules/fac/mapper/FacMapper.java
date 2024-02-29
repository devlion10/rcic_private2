package kr.or.lx.rcic.modules.fac.mapper;

import java.util.HashMap;
import java.util.List;

/**
 * @Class Name : CmmnMapper.java
 * @Description : 공통 코드 및 공용 API용 매퍼
 * @Modification   Information
 * @
 * @  수정일        수정자              수정내용
 * @ ---------    ---------   -------------------------------
 * @ 2018.03.08    김한욱	    	 최초생성
 * 
 * @author  오픈메이트 김한욱 
 * @since   2018.03.08
 * @version   1.0
 * @see
 * 
 *    Copyright (C) by openmate All right reserved.
 */
public interface FacMapper { 

	
	
	/** selectFacListCnt 조회 */
	@SuppressWarnings("rawtypes")
	public int selectFacCnt(HashMap map) throws Exception ;
	
	/** selectFacList 조회 */
	@SuppressWarnings("rawtypes")
	public List<HashMap<String, Object>> selectFacList(HashMap map) throws Exception ;
	
	@SuppressWarnings("rawtypes")
	public List<HashMap<String, Object>> selectFacByResultNo(HashMap map) throws Exception ;
	
	@SuppressWarnings("rawtypes")
	public List<HashMap<String, Object>> selectRoadByResultNo(HashMap map) throws Exception ;
	
	@SuppressWarnings("rawtypes")
	public HashMap<String, Object> searchGeomByKey(HashMap map) throws Exception ;
	
	/** selectFacListCnt 조회 */
	@SuppressWarnings("rawtypes")
	public List<HashMap<String, Object>> selectFacListCnt(HashMap map) throws Exception ;
	
	/** selectFacListMap 조회 */
	@SuppressWarnings("rawtypes")
	public List<HashMap> selectFacListMap(HashMap map) throws Exception ;
	
	/** selectFacListMap 조회 */
	@SuppressWarnings("rawtypes")
	public List<HashMap> selectFacListMap2(HashMap map) throws Exception ;
	
	/** selectFacListMap 조회 */
	@SuppressWarnings("rawtypes")
	public List<HashMap> selectFacListMap3(HashMap map) throws Exception ;
	
	
	/** selectFacListMap 조회 */
	@SuppressWarnings("rawtypes")
	public List<HashMap> selectFacListMap4(HashMap map) throws Exception ;
	
	/** selectFacListMap 조회 */
	@SuppressWarnings("rawtypes")
	public List<HashMap> selectFacListMap5(HashMap map) throws Exception ;
	
	/** selectFacNormalRoadMap 조회 */
	@SuppressWarnings("rawtypes")
	public HashMap<String, Object> selectFacNormalRoadMap(HashMap map) throws Exception ;
	
	/** selectFacRoadOpen 조회 */
	@SuppressWarnings("rawtypes")
	public HashMap<String, Object> selectFacRoadOpen(HashMap map) throws Exception ;
	
	/** selectChart99 조회 */
	@SuppressWarnings("rawtypes")
	public List<HashMap> selectChart99(HashMap map) throws Exception ;
	public List<HashMap> selectChart99Detail(HashMap map) throws Exception ;
	
	
}
