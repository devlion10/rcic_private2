package kr.or.lx.rcic.modules.code.service;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * @Class Name : CmmnService.java
 * @Description : 공통 코드 및 공용 API용 서비스
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
public interface CodeService {

	HashMap<String, Object> selectCodeMasterList(HttpServletRequest req) throws Exception;
	
	HashMap<String, Object> selectCodeList(HttpServletRequest req) throws Exception;
	
	HashMap<String, Object> selectCodeMasterListDetail(HttpServletRequest req) throws Exception;
	
	HashMap<String, Object> insertCode(HttpServletRequest req) throws Exception;
	
	HashMap<String, Object> updateCode(HttpServletRequest req) throws Exception;
	
	HashMap<String, Object> deleteCode(HttpServletRequest req) throws Exception;
	
	HashMap<String, Object> down_insertCode(HttpServletRequest req) throws Exception;
	
	HashMap<String, Object> down_updateCode(HttpServletRequest req) throws Exception;
	
	HashMap<String, Object> down_deleteCode(HttpServletRequest req) throws Exception;
	
	HashMap<String, Object> common_insertCode(HttpServletRequest req) throws Exception;
	
	HashMap<String, Object> common_updateCode(HttpServletRequest req) throws Exception;
	
	HashMap<String, Object> common_deleteCode(HttpServletRequest req) throws Exception;

	HashMap<String, Object> selectDetailCode(Map<String, Object> param) throws Exception;
	
}