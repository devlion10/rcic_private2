package kr.or.lx.rcic.modules.fac.service;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

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
public interface FacService {

	HashMap<String, Object> selectFacListCnt(HttpServletRequest req) throws Exception;
	HashMap<String, Object> selectFacList(HttpServletRequest req) throws Exception;
	HashMap<String, Object> selectFacListMap(HttpServletRequest req) throws Exception;
	HashMap<String, Object> selectFacListMap2(HttpServletRequest req) throws Exception;
	HashMap<String, Object> selectFacListMap3(HttpServletRequest req) throws Exception;
	HashMap<String, Object> selectFacListMap4(HttpServletRequest req) throws Exception;
	HashMap<String, Object> selectFacListMap5(HttpServletRequest req) throws Exception;
	
	HashMap<String, Object> selectFacNormalRoadMap(HttpServletRequest req) throws Exception;
	HashMap<String, Object> selectFacRoadOpen(HttpServletRequest req) throws Exception;
	HashMap<String, Object> selectChart99(HttpServletRequest req) throws Exception;
	
	
	
}