package kr.or.lx.rcic.modules.chart.service;

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
public interface ChartService {

	HashMap<String, Object> selectChart1(HttpServletRequest req) throws Exception;
	HashMap<String, Object> selectChart2(HttpServletRequest req) throws Exception;
	HashMap<String, Object> selectChart2_1(HttpServletRequest req) throws Exception;
	HashMap<String, Object> selectChart3(HttpServletRequest req) throws Exception;
	HashMap<String, Object> selectChart3_1(HttpServletRequest req) throws Exception;
	
}