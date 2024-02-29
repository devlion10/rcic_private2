package kr.or.lx.rcic.modules.fac.controller;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.lx.rcic.frmwrk.util.CmmnUtil;
import kr.or.lx.rcic.modules.fac.service.FacService; 

/**
 * @Class Name : MainController.java
 * @Description : 공통 코드 및 공용 API용 컨트롤러
 * @Modification   Information
 * @
 * @  수정일        수정자              수정내용
 * @ ---------    ---------   -------------------------------
 * @ 2018.11.11    김한욱	    	 최초생성
 * 
 *    Copyright (C) by geo All right reserved.
 */

@RestController
@RequestMapping(value="/rcic")
public class FacController {

	@Autowired
	FacService service;
	CmmnUtil commonUtil = new CmmnUtil();
	
	 
	/**********************************************
	 *  1. 개요 : 진행공사수 조회
	 *	2. 처리내용 :
	 *  3. 설명 : 진행공사수 조회
	 * 	@Method crfcMainPage
	 *  @param model
	 *  @param req
	 *  @param res
	 *  @return
	 * @throws Exception 
	 **********************************************/
	@SuppressWarnings("unused")
	@RequestMapping(value = "/fac/selectFacListCnt")
	public HashMap<String, Object> selectFacListCnt(HttpServletRequest req, HttpServletResponse res) throws Exception{
		
		return service.selectFacListCnt(req);
	}	
	
	@SuppressWarnings("unused")
	@RequestMapping(value = "/fac/selectFacList")
	public HashMap<String, Object> selectFacList(HttpServletRequest req, HttpServletResponse res) throws Exception{
		
		return service.selectFacList(req);
	}	
	
	
	@SuppressWarnings("unused")
	@RequestMapping(value = "/fac/selectFacListMap")
	public HashMap<String, Object> selectFacListMap(HttpServletRequest req, HttpServletResponse res) throws Exception{
		
		return service.selectFacListMap(req);
	}
	
	@SuppressWarnings("unused")
	@RequestMapping(value = "/fac/selectFacListMap2")
	public HashMap<String, Object> selectFacListMap2(HttpServletRequest req, HttpServletResponse res) throws Exception{
		
		return service.selectFacListMap2(req);
	}
	
	@SuppressWarnings("unused")
	@RequestMapping(value = "/fac/selectFacListMap3")
	public HashMap<String, Object> selectFacListMap3(HttpServletRequest req, HttpServletResponse res) throws Exception{
		
		return service.selectFacListMap3(req);
	}
	
	
	@SuppressWarnings("unused")
	@RequestMapping(value = "/fac/selectFacListMap4")
	public HashMap<String, Object> selectFacListMap4(HttpServletRequest req, HttpServletResponse res) throws Exception{
		
		return service.selectFacListMap4(req);
	}
	
	@SuppressWarnings("unused")
	@RequestMapping(value = "/fac/selectFacListMap5")
	public HashMap<String, Object> selectFacListMap5(HttpServletRequest req, HttpServletResponse res) throws Exception{
		
		return service.selectFacListMap5(req);
	}
	
	@SuppressWarnings("unused")
	@RequestMapping(value = "/fac/selectFacNormalRoadMap")
	public HashMap<String, Object> selectFacNormalRoadMap(HttpServletRequest req, HttpServletResponse res) throws Exception{
		
		return service.selectFacNormalRoadMap(req);
	}	
	
	@SuppressWarnings("unused")
	@RequestMapping(value = "/fac/selectFacRoadOpen")
	public HashMap<String, Object> selectFacRoadOpen(HttpServletRequest req, HttpServletResponse res) throws Exception{
		
		return service.selectFacRoadOpen(req);
	}	
	
	@SuppressWarnings("unused")
	@RequestMapping(value = "/fac/selectChart99")
	public HashMap<String, Object> selectChart99(HttpServletRequest req, HttpServletResponse res) throws Exception{
		
		return service.selectChart99(req);
	}	
	
}
