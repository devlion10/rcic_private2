package kr.or.lx.rcic.modules.main.service;

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
public interface MainService {

	/** 전역변수에 인증키 리스트 담기 */
	HashMap getServerInfo(HttpServletRequest req) throws Exception;
	
	@SuppressWarnings("rawtypes")
	public HashMap<String, Object> selectSidoList(HttpServletRequest request) throws Exception ;
	
	@SuppressWarnings("rawtypes")
	public HashMap<String, Object> selectSggList(HttpServletRequest request) throws Exception ;
	
	@SuppressWarnings("rawtypes")
	public HashMap<String, Object> selectEmdList(HttpServletRequest request) throws Exception ;

	@SuppressWarnings("rawtypes")
	public HashMap<String, Object> getAtchHelpFileInfo(String fileId) throws Exception ;

	
}