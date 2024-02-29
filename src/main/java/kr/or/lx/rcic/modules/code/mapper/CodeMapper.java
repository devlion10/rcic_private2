package kr.or.lx.rcic.modules.code.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.util.EgovMap;

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
public interface CodeMapper { 
	
	@SuppressWarnings("rawtypes")
	public List<HashMap<String, Object>> selectCodeMasterList(HashMap map) throws Exception;
	@SuppressWarnings("rawtypes")
	public int selectCodeMasterListCnt(HashMap map) throws Exception;
	
	@SuppressWarnings("rawtypes")
	public List<HashMap<String, Object>> selectCodeList(HashMap map) throws Exception;
	@SuppressWarnings("rawtypes")
	public int selectCodeListCnt(HashMap map) throws Exception;
	
	@SuppressWarnings("rawtypes")
	public int insertCode(HashMap map) throws Exception;
	@SuppressWarnings("rawtypes")
	public int updateCode(HashMap map) throws Exception;
	@SuppressWarnings("rawtypes")
	public int deleteCode(HashMap map) throws Exception;
	
	@SuppressWarnings("rawtypes")
	public int down_insertCode(HashMap map) throws Exception;
	@SuppressWarnings("rawtypes")
	public int down_updateCode(HashMap map) throws Exception;
	@SuppressWarnings("rawtypes")
	public int down_deleteCode(HashMap map) throws Exception;

	
	@SuppressWarnings("rawtypes")
	public int common_insertCode(HashMap map) throws Exception;
	@SuppressWarnings("rawtypes")
	public int common_updateCode(HashMap map) throws Exception;
	@SuppressWarnings("rawtypes")
	public int common_deleteCode(HashMap map) throws Exception;
	@SuppressWarnings("rawtypes")
	public List<Map<String, Object>> selectDetailCode(Map map) throws Exception;
	 
}
