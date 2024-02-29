package kr.or.lx.rcic.modules.code.controller;

import kr.or.lx.rcic.frmwrk.util.CmmnUtil;
import kr.or.lx.rcic.frmwrk.util.WebUtil;
import kr.or.lx.rcic.modules.code.service.CodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

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
public class LegacyCodeController {

	@Autowired
    CodeService service;
	CmmnUtil commonUtil = new CmmnUtil();
	 
	
	/**********************************************
	 *  1. 개요 : 수집/키워드
	 *	2. 처리내용 :
	 * 	@Method selectCodeMasterList
	 *  @param model
	 *  @param req
	 *  @param res
	 *  @return
	 * @throws Exception 
	 **********************************************/
	@SuppressWarnings("unused")
	@RequestMapping(value = "/code/selectCodeMasterList")
	public HashMap<String, Object> selectCodeMasterList(HttpServletRequest req, HttpServletResponse res) throws Exception{
		
		return service.selectCodeMasterList(req);
	}
	
	/**********************************************
	 *  1. 개요 : 공통코드 마스터
	 *	2. 처리내용 :
	 * 	@Method selectCodeList
	 *  @param model
	 *  @param req
	 *  @param res
	 *  @return
	 * @throws Exception 
	 **********************************************/
	@SuppressWarnings("unused")
	@RequestMapping(value = "/code/selectCodeList")
	public HashMap<String, Object> selectCodeList(HttpServletRequest req, HttpServletResponse res) throws Exception{
		
		return service.selectCodeList(req);
	}
	/**********************************************
	 *  1. 개요 : 상세공통코드
	 *	2. 처리내용 :
	 * 	@Method selectCodeMasterListDetail
	 *  @param model
	 *  @param req
	 *  @param res
	 *  @return
	 * @throws Exception 
	 **********************************************/
	@SuppressWarnings("unused")
	@RequestMapping(value = "/code/selectCodeMasterListDetail")
	public HashMap<String, Object> selectCodeMasterListDetail(HttpServletRequest req, HttpServletResponse res) throws Exception{
		
		return service.selectCodeMasterListDetail(req);
	}
	/**********************************************
	 *  1. 개요 : 상세공통코드 저장
	 *	2. 처리내용 :
	 * 	@Method selectCodeMasterListDetail
	 *  @param model
	 *  @param req
	 *  @param res
	 *  @return
	 * @throws Exception 
	 **********************************************/
	@SuppressWarnings("unused")
	@RequestMapping(value = "/code/insertCode")
	public HashMap<String, Object> insertCode(HttpServletRequest req, HttpServletResponse res) throws Exception{
		
		return service.insertCode(req);
	}
	
	@RequestMapping(value = "/code/updateCode")
	@ResponseBody
	public Map<String, Object> updateCode(HttpServletRequest req, HttpServletResponse res) throws Exception {
		
		return service.updateCode(req);
	}
	
	@RequestMapping(value = "/code/deleteCode")
	@ResponseBody
	public Map<String, Object> deleteCode(HttpServletRequest req, HttpServletResponse res) throws Exception {
		
		return service.deleteCode(req);
	}
	
	//down
	@SuppressWarnings("unused")
	@RequestMapping(value = "/code/down_insertCode")
	public HashMap<String, Object> down_insertCode(HttpServletRequest req, HttpServletResponse res) throws Exception{
		
		return service.down_insertCode(req);
	}
	
	@RequestMapping(value = "/code/down_updateCode")
	@ResponseBody
	public Map<String, Object> down_updateCode(HttpServletRequest req, HttpServletResponse res) throws Exception {
		
		return service.down_updateCode(req);
	}
	
	@RequestMapping(value = "/code/down_deleteCode")
	@ResponseBody
	public Map<String, Object> down_deleteCode(HttpServletRequest req, HttpServletResponse res) throws Exception {
		
		return service.down_deleteCode(req);
	}
	
	//common
	@SuppressWarnings("unused")
	@RequestMapping(value = "/code/common_insertCode")
	public HashMap<String, Object> common_insertCode(HttpServletRequest req, HttpServletResponse res) throws Exception{
		
		return service.common_insertCode(req);
	}
	
	@RequestMapping(value = "/code/common_updateCode")
	@ResponseBody
	public Map<String, Object> common_updateCode(HttpServletRequest req, HttpServletResponse res) throws Exception {
		
		return service.common_updateCode(req);
	}
	
	@RequestMapping(value = "/code/common_deleteCode")
	@ResponseBody
	public Map<String, Object> common_deleteCode(HttpServletRequest req, HttpServletResponse res) throws Exception {
		
		return service.common_deleteCode(req);
	}

	@SuppressWarnings("unused")
	@RequestMapping(value = "/code/selectDetailCode")
	public HashMap<String, Object> selectDetailCode(HttpServletRequest req, HttpServletResponse res) throws Exception{
		Map param = WebUtil.getCommonAjaxParam(99, true);
		return service.selectDetailCode(param);
	}
}
