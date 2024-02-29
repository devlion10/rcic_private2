package kr.or.lx.rcic.modules.code.service.impl;

import kr.co.timosoft.util.PaginationUtil;
import kr.or.lx.rcic.egovframework.cmmn.util.EgovMessageSource;
import kr.or.lx.rcic.frmwrk.util.CmmnUtil;
import kr.or.lx.rcic.modules.code.mapper.CodeMapper;
import kr.or.lx.rcic.modules.code.service.CodeService;
import net.sf.json.JSONArray;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * @Class Name : FacServiceImpl.java
 * @Description : 시설물 * 공사종류 조회 서비스 구현
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
public class CodeServiceImpl implements CodeService {

	@Autowired
	private CodeMapper mapper;
	private static final String resource = "/resources/context.properties";
	@Resource(name="egovMessageSource")
    EgovMessageSource egovMessageSource;

	@Resource(name="sqlSession")
	SqlSession sqlSession;
	
	@Override
	public HashMap<String, Object> selectCodeMasterList(HttpServletRequest request) throws Exception {

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

		int listCnt = param.get("listCnt")==null ? 10 : Integer.parseInt(String.valueOf(param.get("listCnt")));
		int currPage = param.get("currPage")==null ? 1 : Integer.parseInt(String.valueOf(param.get("currPage")));
		 
		param.put("listCnt", listCnt);
		param.put("currPage", currPage);
		
		int cnt =  mapper.selectCodeMasterListCnt(param);
		int maxPageCnt = PaginationUtil.maxPageCnt(cnt, listCnt);
		List<HashMap<String, Object>> list = mapper.selectCodeMasterList(param);
		
		resultMap.put("maxPageCnt",maxPageCnt);
		resultMap.put("list", list);

		return resultMap;
	}
	
	@Override
	public HashMap<String, Object> selectCodeList(HttpServletRequest request) throws Exception {

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

		int listCnt = param.get("listCnt")==null ? 10 : Integer.parseInt(String.valueOf(param.get("listCnt")));
		int currPage = param.get("currPage")==null ? 1 : Integer.parseInt(String.valueOf(param.get("currPage")));
		 
		param.put("listCnt", listCnt);
		param.put("currPage", currPage);
		
		int cnt =  mapper.selectCodeListCnt(param);
		int maxPageCnt = PaginationUtil.maxPageCnt(cnt, listCnt);
		List<HashMap<String, Object>> list = mapper.selectCodeList(param);
		
		resultMap.put("maxPageCnt",maxPageCnt);
		resultMap.put("list", list);

		return resultMap;
	}

	@Override
	public HashMap<String, Object> selectCodeMasterListDetail(HttpServletRequest req) throws Exception {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		HashMap<String, Object> retMap = new HashMap<String, Object>();
		resultMap.put("message", "success");
		String strParamList = CmmnUtil.deXss(CmmnUtil.checkNull(req.getParameter("paramList"), ""));
		if ( strParamList.equals("") ) {
			retMap.put("message", "failure");
			retMap.put("result", egovMessageSource.getMessage("_REQUIRED_MSG_REPEAT"));
			return retMap;
		}

		JSONArray paramList = JSONArray.fromObject(strParamList);
		HashMap<String, Object> param = new HashMap<String, Object>();
		param = CmmnUtil.convertJsonToObject(CmmnUtil.checkNull(paramList.getJSONObject(0),""));

		int listCnt = param.get("listCnt")==null ? 10 : Integer.parseInt(String.valueOf(param.get("listCnt")));
		int currPage = param.get("currPage")==null ? 1 : Integer.parseInt(String.valueOf(param.get("currPage")));
		 
		param.put("listCnt", listCnt);
		param.put("currPage", currPage);
		
		int cnt =  mapper.selectCodeListCnt(param);
		int maxPageCnt = PaginationUtil.maxPageCnt(cnt, listCnt);
		List<HashMap<String, Object>> list = mapper.selectCodeList(param);
		
		resultMap.put("maxPageCnt",maxPageCnt);
		resultMap.put("list", list);

		return resultMap;
	}
	@Override
	public HashMap<String, Object> insertCode(HttpServletRequest req) throws Exception {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		HashMap<String, Object> retMap = new HashMap<String, Object>();
		resultMap.put("message", "success");
		String strParamList = CmmnUtil.deXss(CmmnUtil.checkNull(req.getParameter("paramList"), ""));
		if ( strParamList.equals("") ) {
			retMap.put("message", "failure");
			retMap.put("result", egovMessageSource.getMessage("_REQUIRED_MSG_REPEAT"));
			return retMap;
		}

		JSONArray paramList = JSONArray.fromObject(strParamList);
		HashMap<String, Object> param = new HashMap<String, Object>();
		param = CmmnUtil.convertJsonToObject(CmmnUtil.checkNull(paramList.getJSONObject(0),""));
		 
		int cnt =  mapper.insertCode(param);

		return resultMap;
	}
	@Override
	public HashMap<String, Object> updateCode(HttpServletRequest req) throws Exception {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		HashMap<String, Object> retMap = new HashMap<String, Object>();
		resultMap.put("message", "success");
		String strParamList = CmmnUtil.deXss(CmmnUtil.checkNull(req.getParameter("paramList"), ""));
		if ( strParamList.equals("") ) {
			retMap.put("message", "failure");
			retMap.put("result", egovMessageSource.getMessage("_REQUIRED_MSG_REPEAT"));
			return retMap;
		}

		JSONArray paramList = JSONArray.fromObject(strParamList);
		HashMap<String, Object> param = new HashMap<String, Object>();
		param = CmmnUtil.convertJsonToObject(CmmnUtil.checkNull(paramList.getJSONObject(0),""));
		 
		int cnt =  mapper.updateCode(param);

		return resultMap;
	}
	@Override
	public HashMap<String, Object> deleteCode(HttpServletRequest req) throws Exception {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		HashMap<String, Object> retMap = new HashMap<String, Object>();
		resultMap.put("message", "success");
		String strParamList = CmmnUtil.deXss(CmmnUtil.checkNull(req.getParameter("paramList"), ""));
		if ( strParamList.equals("") ) {
			retMap.put("message", "failure");
			retMap.put("result", egovMessageSource.getMessage("_REQUIRED_MSG_REPEAT"));
			return retMap;
		}

		JSONArray paramList = JSONArray.fromObject(strParamList);
		HashMap<String, Object> param = new HashMap<String, Object>();
		param = CmmnUtil.convertJsonToObject(CmmnUtil.checkNull(paramList.getJSONObject(0),""));
		 
		int cnt =  mapper.deleteCode(param);

		return resultMap;
	}
	
	
	@Override
	public HashMap<String, Object> down_insertCode(HttpServletRequest req) throws Exception {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		HashMap<String, Object> retMap = new HashMap<String, Object>();
		resultMap.put("message", "success");
		String strParamList = CmmnUtil.deXss(CmmnUtil.checkNull(req.getParameter("paramList"), ""));
		if ( strParamList.equals("") ) {
			retMap.put("message", "failure");
			retMap.put("result", egovMessageSource.getMessage("_REQUIRED_MSG_REPEAT"));
			return retMap;
		}

		JSONArray paramList = JSONArray.fromObject(strParamList);
		HashMap<String, Object> param = new HashMap<String, Object>();
		param = CmmnUtil.convertJsonToObject(CmmnUtil.checkNull(paramList.getJSONObject(0),""));
		 
		int cnt =  mapper.down_insertCode(param);

		return resultMap;
	}
	@Override
	public HashMap<String, Object> down_updateCode(HttpServletRequest req) throws Exception {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		HashMap<String, Object> retMap = new HashMap<String, Object>();
		resultMap.put("message", "success");
		String strParamList = CmmnUtil.deXss(CmmnUtil.checkNull(req.getParameter("paramList"), ""));
		if ( strParamList.equals("") ) {
			retMap.put("message", "failure");
			retMap.put("result", egovMessageSource.getMessage("_REQUIRED_MSG_REPEAT"));
			return retMap;
		}

		JSONArray paramList = JSONArray.fromObject(strParamList);
		HashMap<String, Object> param = new HashMap<String, Object>();
		param = CmmnUtil.convertJsonToObject(CmmnUtil.checkNull(paramList.getJSONObject(0),""));
		 
		int cnt =  mapper.down_updateCode(param);

		return resultMap;
	}
	@Override
	public HashMap<String, Object> down_deleteCode(HttpServletRequest req) throws Exception {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		HashMap<String, Object> retMap = new HashMap<String, Object>();
		resultMap.put("message", "success");
		String strParamList = CmmnUtil.deXss(CmmnUtil.checkNull(req.getParameter("paramList"), ""));
		if ( strParamList.equals("") ) {
			retMap.put("message", "failure");
			retMap.put("result", egovMessageSource.getMessage("_REQUIRED_MSG_REPEAT"));
			return retMap;
		}

		JSONArray paramList = JSONArray.fromObject(strParamList);
		HashMap<String, Object> param = new HashMap<String, Object>();
		param = CmmnUtil.convertJsonToObject(CmmnUtil.checkNull(paramList.getJSONObject(0),""));
		 
		int cnt =  mapper.down_deleteCode(param);

		return resultMap;
	}
	
	
	
	@Override
	public HashMap<String, Object> common_insertCode(HttpServletRequest req) throws Exception {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		HashMap<String, Object> retMap = new HashMap<String, Object>();
		resultMap.put("message", "success");
		String strParamList = CmmnUtil.deXss(CmmnUtil.checkNull(req.getParameter("paramList"), ""));
		if ( strParamList.equals("") ) {
			retMap.put("message", "failure");
			retMap.put("result", egovMessageSource.getMessage("_REQUIRED_MSG_REPEAT"));
			return retMap;
		}

		JSONArray paramList = JSONArray.fromObject(strParamList);
		HashMap<String, Object> param = new HashMap<String, Object>();
		param = CmmnUtil.convertJsonToObject(CmmnUtil.checkNull(paramList.getJSONObject(0),""));
		 
		int cnt =  mapper.common_insertCode(param);

		return resultMap;
	}
	@Override
	public HashMap<String, Object> common_updateCode(HttpServletRequest req) throws Exception {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		HashMap<String, Object> retMap = new HashMap<String, Object>();
		resultMap.put("message", "success");
		String strParamList = CmmnUtil.deXss(CmmnUtil.checkNull(req.getParameter("paramList"), ""));
		if ( strParamList.equals("") ) {
			retMap.put("message", "failure");
			retMap.put("result", egovMessageSource.getMessage("_REQUIRED_MSG_REPEAT"));
			return retMap;
		}

		JSONArray paramList = JSONArray.fromObject(strParamList);
		HashMap<String, Object> param = new HashMap<String, Object>();
		param = CmmnUtil.convertJsonToObject(CmmnUtil.checkNull(paramList.getJSONObject(0),""));
		 
		int cnt =  mapper.common_updateCode(param);

		return resultMap;
	}
	@Override
	public HashMap<String, Object> common_deleteCode(HttpServletRequest req) throws Exception {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		HashMap<String, Object> retMap = new HashMap<String, Object>();
		resultMap.put("message", "success");
		String strParamList = CmmnUtil.deXss(CmmnUtil.checkNull(req.getParameter("paramList"), ""));
		if ( strParamList.equals("") ) {
			retMap.put("message", "failure");
			retMap.put("result", egovMessageSource.getMessage("_REQUIRED_MSG_REPEAT"));
			return retMap;
		}

		JSONArray paramList = JSONArray.fromObject(strParamList);
		HashMap<String, Object> param = new HashMap<String, Object>();
		param = CmmnUtil.convertJsonToObject(CmmnUtil.checkNull(paramList.getJSONObject(0),""));
		 
		int cnt =  mapper.common_deleteCode(param);

		return resultMap;
	}

	@Override
	public HashMap<String, Object> selectDetailCode(Map<String, Object> param) throws Exception {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> list = mapper.selectDetailCode(param);
		resultMap.put("list", list);
		return resultMap;
	}
	
}