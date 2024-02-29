package kr.or.lx.rcic.modules.chart.service.impl;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.lx.rcic.egovframework.cmmn.util.EgovMessageSource;
import kr.or.lx.rcic.frmwrk.util.CmmnUtil;
import kr.or.lx.rcic.modules.chart.mapper.ChartMapper;
import kr.or.lx.rcic.modules.chart.service.ChartService;
import net.sf.json.JSONArray;


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
public class ChartServiceImpl implements ChartService {

	@Autowired
	private ChartMapper mapper;
	private static final String resource = "/resources/context.properties";
	@Resource(name="egovMessageSource")
    EgovMessageSource egovMessageSource;

	@Resource(name="sqlSession")
	SqlSession sqlSession;
	
	
	@Override
	public HashMap<String, Object> selectChart1(HttpServletRequest request) throws Exception {
		
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

		int listCnt = param.get("listCnt")==null ? 5 : Integer.parseInt(String.valueOf(param.get("listCnt")));
		int currPage = param.get("currPage")==null ? 1 : Integer.parseInt(String.valueOf(param.get("currPage")));
		 
		param.put("listCnt", listCnt);
		param.put("currPage", currPage);
		
		List<HashMap<String, Object>> list = mapper.selectChart1(param);
		
		resultMap.put("list", list);

		return resultMap;
	}


	@Override
	public HashMap<String, Object> selectChart2(HttpServletRequest request) throws Exception {

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

		int listCnt = param.get("listCnt")==null ? 5 : Integer.parseInt(String.valueOf(param.get("listCnt")));
		int currPage = param.get("currPage")==null ? 1 : Integer.parseInt(String.valueOf(param.get("currPage")));
		 
		param.put("listCnt", listCnt);
		param.put("currPage", currPage);
		
		List<HashMap<String, Object>> list = mapper.selectChart2(param);
		
		resultMap.put("list", list);

		return resultMap;
	}

	@Override
	public HashMap<String, Object> selectChart2_1(HttpServletRequest request) throws Exception {

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
		List<HashMap<String, Object>> list = mapper.selectChart2_1(param);
		resultMap.put("list", list);
		return resultMap;
	}
	

	@Override
	public HashMap<String, Object> selectChart3(HttpServletRequest request) throws Exception {

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

		int listCnt = param.get("listCnt")==null ? 5 : Integer.parseInt(String.valueOf(param.get("listCnt")));
		int currPage = param.get("currPage")==null ? 1 : Integer.parseInt(String.valueOf(param.get("currPage")));
		 
		param.put("listCnt", listCnt);
		param.put("currPage", currPage);
		
		List<HashMap<String, Object>> list = mapper.selectChart3(param);
		
		resultMap.put("list", list);

		return resultMap;
	}
	
	@Override
	public HashMap<String, Object> selectChart3_1(HttpServletRequest request) throws Exception {

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

		
		List<HashMap<String, Object>> list = mapper.selectChart3_1(param);
		
		resultMap.put("list", list);

		return resultMap;
	}
	
}