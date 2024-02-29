package kr.or.lx.rcic.modules.common.controller;

import java.io.IOException;
import java.util.HashMap;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocumentList;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.lx.rcic.egovframework.cmmn.util.EgovMessageSource;
import kr.or.lx.rcic.frmwrk.util.CmmnUtil;
import net.sf.json.JSONArray; 

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
public class CommonController {

	CmmnUtil commonUtil = new CmmnUtil();
 
	@Value("${solrUrl}")
	private static String solrUrl;
	
	@Resource(name="egovMessageSource")
    EgovMessageSource egovMessageSource;
	
	public SolrDocumentList getSolrData(String collection, String keyword, int rows) throws SolrServerException, IOException {
		
		String targerUrl="";
    
		String urlString = solrUrl+"/solr/"+collection+"/"; 
		SolrClient solr = new HttpSolrClient.Builder(urlString).build();
		
		
		SolrQuery query = new SolrQuery();
		query.setQuery( keyword );
		query.setStart(0);    
		query.setRows(rows);
	    QueryResponse response = solr.query(query);
	    SolrDocumentList docList = response.getResults();
	    solr.close();
	    
	    return docList;
	}

	@RequestMapping(value = "/cmmn/selectSidoList")
	public HashMap selectSidoList(HttpServletRequest request) throws Exception {
		
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		HashMap param = selectQuery(request);
		SolrDocumentList sidoList = getSolrData("legaldong_sido",(String)param.get("keyword"),	Integer.parseInt(String.valueOf(param.get("rows"))));
		resultMap.put("list", sidoList);
	    return resultMap;
	}
	
	@RequestMapping(value = "/cmmn/selectSggList")
	public HashMap selectSggList(HttpServletRequest request) throws Exception {
		
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		HashMap param = selectQuery(request);
		SolrDocumentList sggList = getSolrData("legaldong_sgg",(String)param.get("keyword"),	Integer.parseInt(String.valueOf(param.get("rows"))));
		resultMap.put("list", sggList);
	    return resultMap;
	}
	
	@RequestMapping(value = "/cmmn/selectEmdList")
	public HashMap selectEmdList(HttpServletRequest request) throws Exception {
		
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		HashMap param = selectQuery(request);
		SolrDocumentList emdList = getSolrData("legaldong_emd",(String)param.get("keyword"),	Integer.parseInt(String.valueOf(param.get("rows"))));
		resultMap.put("list", emdList);
	    return resultMap;
	}
	
	public static HashMap selectQuery(HttpServletRequest request) throws Exception {
		
		HashMap<String, Object> retMap = new HashMap<String, Object>();
		String strParamList = CmmnUtil.deXss(CmmnUtil.checkNull(request.getParameter("paramList"), ""));
		
		if ( strParamList.equals("") ) {
			retMap.put("message", "failure");
			retMap.put("result", "No");
			return retMap;
		}
		JSONArray paramList = JSONArray.fromObject(strParamList);
		HashMap<String, Object> param = new HashMap<String, Object>();
		param = CmmnUtil.convertJsonToObject(CmmnUtil.checkNull(paramList.getJSONObject(0),""));
		 
	    return param;
	}
	
	
}
