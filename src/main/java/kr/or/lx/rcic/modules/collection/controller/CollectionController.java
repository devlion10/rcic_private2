package kr.or.lx.rcic.modules.collection.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.or.lx.rcic.egovframework.cmmn.util.EgovMessageSource;
import kr.or.lx.rcic.frmwrk.util.CmmnUtil;
import kr.or.lx.rcic.frmwrk.util.WebUtil;
import kr.or.lx.rcic.frmwrk.web.BaseController;
import kr.or.lx.rcic.modules.collection.service.CollectionService; 

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

@Controller
@RequestMapping(value="/rcic")
public class CollectionController extends BaseController{

	@Autowired
	CollectionService service;
	CmmnUtil commonUtil = new CmmnUtil();
	
	@Resource(name="egovMessageSource")
    EgovMessageSource egovMessageSource;
	
	/**
     * 목록 조회
     */
    @RequestMapping("/collection/getKeywordCntList")
    @ResponseBody
    public Map<String, Object> getKeywordCntList(HttpServletRequest request) throws Exception {
        return service.getKeywordCntList(WebUtil.getCommonAjaxParam());
    }
    
    @RequestMapping("/collection/getCollectAtm")
    @ResponseBody
    public List<Map<String, Object>> getCollectAtm(HttpServletRequest request) throws Exception {
        return service.getCollectAtm(WebUtil.getCommonAjaxParam());
    }
	
}
