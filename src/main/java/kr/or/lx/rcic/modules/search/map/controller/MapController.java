package kr.or.lx.rcic.modules.search.map.controller;

import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.timosoft.rcic.search.TimoSolrService;
import kr.or.lx.rcic.frmwrk.util.CmmnUtil;
import kr.or.lx.rcic.frmwrk.util.SimpleData;
import kr.or.lx.rcic.frmwrk.web.BaseController;
import lombok.extern.slf4j.Slf4j;


@Controller
@Slf4j
public class MapController extends BaseController{
	
	
	@Value("#{contextProperties}")
	Properties prop = new Properties();
	
	/**********************************************
	 *  1. 개요 : 검색
	 *	2. 처리내용 :
	 *  3. 설명 : 검색
	 * 	@Method search
	 *  @param req
	 *  @param res
	 *  @return List<SolrDocument>
	 **********************************************/
	@SuppressWarnings("unused")
	@RequestMapping(value = "/searchMap")
	@ResponseBody
	public JSONArray search(HttpServletRequest request, HttpServletResponse res) throws Exception{

		SimpleData paramMap = getSimpleData(request);
		JSONArray resultList = null;
		try {
			String solrUrl = prop.getProperty("solrUrl").toString();
			if(solrUrl!=null) {
			TimoSolrService searchService = new TimoSolrService(solrUrl);
			resultList = searchService.getSearchMapData(paramMap);
			}
			
		} catch (Exception e) {
			CmmnUtil.setLog(e.getMessage());
		}
		return resultList;
	}
	
	@SuppressWarnings("unused")
	@RequestMapping(value = "/clusterMap")
	@ResponseBody
	public JSONArray cluster(HttpServletRequest request, HttpServletResponse res) throws Exception{

		SimpleData paramMap = getSimpleData(request);
		
		JSONArray resultList = null;
		try {
			String solrUrl = prop.getProperty("solrUrl").toString();
			if(solrUrl!=null) {
				TimoSolrService searchService = new TimoSolrService(solrUrl);
				resultList = searchService.getSolrClusterData(paramMap);
			}
		} catch (Exception e) {
			CmmnUtil.setLog(e.getMessage());
		}
		return resultList;
	}
	
	@SuppressWarnings("unused")
	@RequestMapping(value = "/accInfoMap")
	@ResponseBody
	public JSONArray accInfoMap(HttpServletRequest request, HttpServletResponse res) throws Exception{

		SimpleData paramMap = getSimpleData(request);
		JSONArray resultList = null;
		try {
			String solrUrl = prop.getProperty("solrUrl").toString();
			if(solrUrl!=null) {
				TimoSolrService searchService = new TimoSolrService(solrUrl);
				resultList = searchService.getAccInfo(paramMap);	
			}
			
		} catch (Exception e) {
			CmmnUtil.setLog(e.getMessage());
		}
		return resultList;
	}
	
}
