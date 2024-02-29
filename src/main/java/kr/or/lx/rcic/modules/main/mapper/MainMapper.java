package kr.or.lx.rcic.modules.main.mapper;

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
 * @ 2018.04.25    선우현	    	loginCheck 추가 
 * 
 * @author  오픈메이트 김한욱 
 * @since   2018.03.08
 * @version   1.0
 * @see
 * 
 *    Copyright (C) by openmate All right reserved.
 */
public interface MainMapper { 

	/** getServerInfo 조회 */
	@SuppressWarnings("rawtypes")
	public HashMap getServerInfo(HashMap map) throws Exception ;

	public List<HashMap<String,Object>>selectSidoList();
	public List<HashMap<String,Object>>selectSggList(HashMap<String, Object> map);
	public List<HashMap<String,Object>>selectEmdList(HashMap<String, Object> map);
	
	int selectAnalysisListCnt(HashMap<String, Object> map);
	public List<HashMap<String,Object>>selectAnalysisList(HashMap<String, Object> map);
	
	int selectCollectionListCnt(HashMap<String, Object> map);
	public List<HashMap<String,Object>>selectCollectionList(HashMap<String, Object> map);
	
	int updatePosition(HashMap<String, Object> map);

	public List<HashMap<String, Object>> getConstCnt(HashMap<String, Object> param);

	public int getConstExpectCnt(HashMap<String, Object> param);

	public HashMap<String, Object> getAtchHelpFileInfo(String fileId);

	
	
}
