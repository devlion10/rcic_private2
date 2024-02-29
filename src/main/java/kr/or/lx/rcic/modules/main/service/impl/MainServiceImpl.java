package kr.or.lx.rcic.modules.main.service.impl;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.lx.rcic.egovframework.cmmn.util.EgovMessageSource;
import kr.or.lx.rcic.frmwrk.util.CmmnUtil;
import kr.or.lx.rcic.modules.main.mapper.MainMapper;
import kr.or.lx.rcic.modules.main.service.MainService;
import net.sf.json.JSONArray;


/**
 * @Class Name : CmmnServiceImpl.java
 * @Description : 공통 코드 및 공용 API용 서비스 구현
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
 
@Service
public class MainServiceImpl implements MainService {

	@Autowired
	private MainMapper mapper;
	private static final String resource = "/resources/context.properties";
	@Resource(name="egovMessageSource")
    EgovMessageSource egovMessageSource;

	@Resource(name="sqlSession")
	SqlSession sqlSession;
 
	@Override
	public HashMap getServerInfo(HttpServletRequest request) throws Exception {
		
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		HashMap<String, Object> retMap = new HashMap<String, Object>();
		resultMap.put("message", "success");
		String strParamList = CmmnUtil.deXss(CmmnUtil.checkNull(request.getParameter("paramList"), ""));
		if ( strParamList.equals("") ) {
			retMap.put("message", "failure");
			retMap.put("result", egovMessageSource.getMessage("_REQUIRED_MSG_REPEAT"));
			return retMap;
		}

		JSONArray paramList = JSONArray.fromObject(strParamList);
		HashMap<String, Object> param = new HashMap<String, Object>();
		param = CmmnUtil.convertJsonToObject(CmmnUtil.checkNull(paramList.getJSONObject(0),""));
		
		resultMap = mapper.getServerInfo(param);

		return resultMap;
	}
	
	@Override
	public HashMap<String, Object> selectSidoList(HttpServletRequest request) throws Exception {
		
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("message", "success");

		try {
			List<HashMap<String,Object>> list =  (List<HashMap<String,Object>>)mapper.selectSidoList();
			resultMap.put("list", list);
		} catch (Exception e) {
			resultMap.put("message", "error");
			resultMap.put("messageMsg", e);
		}
		
		resultMap.put("message", "success");
		return resultMap;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public HashMap<String, Object> selectSggList(HttpServletRequest request) throws Exception {
		
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		HashMap<String, Object> retMap = new HashMap<String, Object>();
		resultMap.put("message", "success");
		String strParamList = CmmnUtil.deXss(CmmnUtil.checkNull(request.getParameter("paramList"), ""));
		if ( strParamList.equals("") ) {
			retMap.put("message", "failure");
			retMap.put("result", egovMessageSource.getMessage("_REQUIRED_MSG_REPEAT"));
			return retMap;
		}
		JSONArray paramList = JSONArray.fromObject(strParamList);
		HashMap<String, Object> param = new HashMap<String, Object>();
		param = CmmnUtil.convertJsonToObject(CmmnUtil.checkNull(paramList.getJSONObject(0),""));

		try {
			List<HashMap<String,Object>> list =  (List<HashMap<String,Object>>)mapper.selectSggList(param);
			resultMap.put("list", list);
		} catch (Exception e) {
			resultMap.put("message", "error");
			resultMap.put("messageMsg", e);
		}
		resultMap.put("message", "success");
		return resultMap;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public HashMap<String, Object> selectEmdList(HttpServletRequest request) throws Exception {
		
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		HashMap<String, Object> retMap = new HashMap<String, Object>();
		resultMap.put("message", "success");
		String strParamList = CmmnUtil.deXss(CmmnUtil.checkNull(request.getParameter("paramList"), ""));
		if ( strParamList.equals("") ) {
			retMap.put("message", "failure");
			retMap.put("result", egovMessageSource.getMessage("_REQUIRED_MSG_REPEAT"));
			return retMap;
		}
		JSONArray paramList = JSONArray.fromObject(strParamList);
		HashMap<String, Object> param = new HashMap<String, Object>();
		param = CmmnUtil.convertJsonToObject(CmmnUtil.checkNull(paramList.getJSONObject(0),""));

		try {
			List<HashMap<String,Object>> list =  (List<HashMap<String,Object>>)mapper.selectEmdList(param);
			resultMap.put("list", list);
		} catch (Exception e) {
			resultMap.put("message", "error");
			resultMap.put("messageMsg", e);
		}
		resultMap.put("message", "success");
		return resultMap;
	}

	@SuppressWarnings("unchecked")
	@Override
	public HashMap<String, Object> getAtchHelpFileInfo(String fileId) throws Exception {
		HashMap<String, Object> map = new HashMap<>();
		map = mapper.getAtchHelpFileInfo(fileId);
	return map;
	}
	

}