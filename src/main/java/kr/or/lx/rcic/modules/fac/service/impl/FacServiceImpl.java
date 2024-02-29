package kr.or.lx.rcic.modules.fac.service.impl;

import kr.co.timosoft.util.PaginationUtil;
import kr.or.lx.rcic.egovframework.cmmn.util.EgovMessageSource;
import kr.or.lx.rcic.frmwrk.util.CmmnUtil;
import kr.or.lx.rcic.modules.fac.mapper.FacMapper;
import kr.or.lx.rcic.modules.fac.service.FacService;
import net.sf.json.JSONArray;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;


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
public class FacServiceImpl implements FacService {

	@Autowired
	private FacMapper mapper;
	private static final String resource = "/resources/context.properties";
	@Resource(name="egovMessageSource")
    EgovMessageSource egovMessageSource;

	@Resource(name="sqlSession")
	SqlSession sqlSession;
	
	
	
	@SuppressWarnings("unchecked")
	@Override
	public HashMap<String, Object> selectFacList(HttpServletRequest request) throws Exception {
		
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
		param.put("geom", "");
		
		
		int totalCnt = mapper.selectFacCnt(param);
		List<HashMap<String, Object>> list = mapper.selectFacList(param);
		int pageCnt = PaginationUtil.maxPageCnt(totalCnt, listCnt);
		
		List<HashMap<String, Object>> nlist = new ArrayList<HashMap<String, Object>>();
		Iterator<HashMap<String, Object>> it = list.iterator();
		
		while (it.hasNext()) {
			HashMap<String, Object> map = (HashMap<String, Object>) it.next();
			String geom = (String)map.get("geom");
			
			if( map.get("new_geom")!=null) {
				param.replace("geom", map.get("new_geom"));
				HashMap<String, Object> innserMap2 = mapper.searchGeomByKey(param);
				map.replace("geom", (String)innserMap2.get("geom"));
			}else
			
			if( geom!=null && geom.startsWith("0")) {
				param.replace("geom", geom);
				HashMap<String, Object> innserMap = mapper.searchGeomByKey(param);
				map.replace("geom", (String)innserMap.get("geom"));
				
				
			}
			/*공사종류*/
			List<HashMap<String, Object>> flist =  mapper.selectFacByResultNo(param);
			/*도로요소*/
			List<HashMap<String, Object>> rlist =  mapper.selectRoadByResultNo(param);
			map.put("facType", flist);
			map.put("roadType", rlist);
			nlist.add(map);
		}
		
		resultMap.put("totalCnt", totalCnt);
		resultMap.put("pageCnt", pageCnt);  
		resultMap.put("list", nlist);

		return resultMap;
	}
	
 
	@Override
	public HashMap<String, Object> selectFacListCnt(HttpServletRequest request) throws Exception {
		
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

		List<HashMap<String, Object>> list = mapper.selectFacListCnt(param);
		
		resultMap.put("list", list);
		resultMap.put("size", list.size());

		return resultMap;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public HashMap<String, Object> selectFacListMap(HttpServletRequest request) throws Exception {
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

		List<HashMap> list = mapper.selectFacListMap(param);
		Iterator it = list.iterator();
		
		/*
		List<HashMap> nlist = new ArrayList<HashMap>();
		HashMap nMap = new HashMap();
		while (it.hasNext()) {
			HashMap map = (HashMap) it.next();
			String sidoCd = (String)map.get("sido_cd");
			String geom = CmmnUtil.returnXyPosition("SIDO_CD", sidoCd, "rcic:TL_LEGALZONE_SIDO",(String)param.get("mapServer"));
			System.out.println(geom);
			map.put("geom",geom);
			nMap.putAll(map);
			nlist.add(nMap);
		}
		System.out.println(nlist);
		*/
		resultMap.put("list", list);
		resultMap.put("size", list.size());
		
		return resultMap;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public HashMap<String, Object> selectFacListMap2(HttpServletRequest request) throws Exception {
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

		List<HashMap> list = mapper.selectFacListMap2(param);
		Iterator it = list.iterator();
		
		/*
		List<HashMap> nlist = new ArrayList<HashMap>();
		HashMap nMap = new HashMap();
		while (it.hasNext()) {
			HashMap map = (HashMap) it.next();
			String sidoCd = (String)map.get("sido_cd");
			String geom = CmmnUtil.returnXyPosition("SIDO_CD", sidoCd, "rcic:TL_LEGALZONE_SIDO",(String)param.get("mapServer"));
			System.out.println(geom);
			map.put("geom",geom);
			nMap.putAll(map);
			nlist.add(nMap);
		}
		System.out.println(nlist);
		*/
		resultMap.put("list", list);
		resultMap.put("size", list.size());
		
		return resultMap;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public HashMap<String, Object> selectFacListMap3(HttpServletRequest request) throws Exception {
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

		List<HashMap> list = mapper.selectFacListMap3(param);
		Iterator it = list.iterator();
		
		/*
		List<HashMap> nlist = new ArrayList<HashMap>();
		HashMap nMap = new HashMap();
		while (it.hasNext()) {
			HashMap map = (HashMap) it.next();
			String sidoCd = (String)map.get("sido_cd");
			String geom = CmmnUtil.returnXyPosition("SIDO_CD", sidoCd, "rcic:TL_LEGALZONE_SIDO",(String)param.get("mapServer"));
			System.out.println(geom);
			map.put("geom",geom);
			nMap.putAll(map);
			nlist.add(nMap);
		}
		System.out.println(nlist);
		*/
		resultMap.put("list", list);
		resultMap.put("size", list.size());
		
		return resultMap;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public HashMap<String, Object> selectFacListMap4(HttpServletRequest request) throws Exception {
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

		List<HashMap> list = mapper.selectFacListMap4(param);
		Iterator it = list.iterator();
		
		/*
		List<HashMap> nlist = new ArrayList<HashMap>();
		HashMap nMap = new HashMap();
		while (it.hasNext()) {
			HashMap map = (HashMap) it.next();
			String sidoCd = (String)map.get("sido_cd");
			String geom = CmmnUtil.returnXyPosition("SIDO_CD", sidoCd, "rcic:TL_LEGALZONE_SIDO",(String)param.get("mapServer"));
			System.out.println(geom);
			map.put("geom",geom);
			nMap.putAll(map);
			nlist.add(nMap);
		}
		System.out.println(nlist);
		*/
		resultMap.put("list", list);
		resultMap.put("size", list.size());
		
		return resultMap;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public HashMap<String, Object> selectFacListMap5(HttpServletRequest request) throws Exception {
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

		List<HashMap> list = mapper.selectFacListMap5(param);
		Iterator it = list.iterator();
		
		/*
		List<HashMap> nlist = new ArrayList<HashMap>();
		HashMap nMap = new HashMap();
		while (it.hasNext()) {
			HashMap map = (HashMap) it.next();
			String sidoCd = (String)map.get("sido_cd");
			String geom = CmmnUtil.returnXyPosition("SIDO_CD", sidoCd, "rcic:TL_LEGALZONE_SIDO",(String)param.get("mapServer"));
			System.out.println(geom);
			map.put("geom",geom);
			nMap.putAll(map);
			nlist.add(nMap);
		}
		System.out.println(nlist);
		*/
		resultMap.put("list", list);
		resultMap.put("size", list.size());
		
		return resultMap;
	}
	

	@Override
	public HashMap<String, Object> selectFacNormalRoadMap(HttpServletRequest request) throws Exception {
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
		resultMap = mapper.selectFacNormalRoadMap(param);
		return resultMap;
	}

	@Override
	public HashMap<String, Object> selectFacRoadOpen(HttpServletRequest request) throws Exception {
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
		
		resultMap = mapper.selectFacRoadOpen(param);

		return resultMap;
	}


	@Override
	public HashMap<String, Object> selectChart99(HttpServletRequest req) throws Exception {
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
		
		 List<HashMap> list =  mapper.selectChart99(param);
		 List<HashMap> detailList =  mapper.selectChart99Detail(param);
		 
		 resultMap.put("list",list);
		 resultMap.put("detailList",detailList);
		 

		return resultMap;
	}
	
}