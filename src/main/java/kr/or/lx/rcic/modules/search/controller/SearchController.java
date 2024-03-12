package kr.or.lx.rcic.modules.search.controller;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.or.lx.rcic.modules.legaldong.service.LegaldongService;
import kr.or.lx.rcic.modules.search.service.SearchService;
import org.apache.solr.client.solrj.response.FacetField;
import org.apache.solr.client.solrj.response.Group;
import org.apache.solr.client.solrj.response.GroupCommand;
import org.apache.solr.client.solrj.response.GroupResponse;
import org.apache.solr.client.solrj.response.PivotField;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocumentList;
import org.apache.solr.common.util.NamedList;
import org.codehaus.jackson.map.ObjectMapper;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.data.solr.core.query.SimpleField;
import org.springframework.data.solr.core.query.result.FacetPivotFieldEntry;
import org.springframework.data.solr.core.query.result.SimpleFacetPivotEntry;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import kr.co.timosoft.rcic.search.TimoSolrService;
import kr.or.lx.rcic.frmwrk.util.CmmnUtil;
import kr.or.lx.rcic.frmwrk.util.SimpleData;
import kr.or.lx.rcic.frmwrk.web.BaseController;
import kr.or.lx.rcic.modules.search.dto.SolrAnalysisInfo;
import kr.or.lx.rcic.modules.search.dto.SolrAnalysisRoadInfo;
import kr.or.lx.rcic.modules.search.dto.SolrCbndInfo;
import kr.or.lx.rcic.modules.search.dto.SolrEmdInfo;
import kr.or.lx.rcic.modules.search.dto.SolrG2bResultInfo;
import kr.or.lx.rcic.modules.search.dto.SolrLiInfo;
import kr.or.lx.rcic.modules.search.dto.SolrSggInfo;
import kr.or.lx.rcic.modules.search.dto.SolrSidoInfo;
import kr.or.lx.rcic.modules.search.dto.SolrSnsInfo;
import kr.or.lx.rcic.modules.search.dto.SolrSnsLocInfo;
import lombok.extern.slf4j.Slf4j;


@Controller
@Slf4j
public class SearchController extends BaseController{

	@Autowired
	ResourceLoader resourceLoader;
	@Value("#{contextProperties}")
	Properties prop = new Properties();
	@Autowired
	SearchService searchService;
	private Logger logger = LoggerFactory.getLogger(getClass());

	/**********************************************
	 *  1. 개요 : 비관리청 검색
	 *	2. 처리내용 :
	 *  3. 설명 : 검색
	 * 	@Method searchBmng
	 *  @param res
	 *  @return List<SolrDocument>
	 **********************************************/
	@SuppressWarnings("unused")
	@RequestMapping(value = "/searchBmngGeoFromOcpyLoc")
	@ResponseBody
	public HashMap<String, Object> searchBmngGeoFromOcpyLoc(@RequestBody String data, HttpServletRequest request, HttpServletResponse res) throws Exception {
		logger.debug("searchBmngGeoFromOcpyLoc__");
		logger.debug(data);
		JSONParser parser = new JSONParser();
		JSONObject jsonobj = null;
		try {
			jsonobj = (JSONObject) parser.parse(data);
			logger.debug("searchBmng__parameters");
			logger.debug(String.valueOf(jsonobj));
		} catch (ParseException e) {
			e.printStackTrace();
		}

		Map<String, Object> paramMap=new HashMap<>();
		paramMap = new ObjectMapper().readValue(jsonobj.toString(), Map.class);

		List<Map<String, Object>> emdList = searchService.getEmdCdList(paramMap);//읍면동 코드 조회
		String emdCd=(String)emdList.get(0).get("emdCd");//읍면동 코드
		paramMap.put("emdCd",emdCd);

		String liNm=paramMap.get("liNm").toString();
		String mjPnu=paramMap.get("mjPnu").toString();//산 지번 코드 합친 일부  pnu
		String pnu;//최종 pnu
		List<Map<String, Object>> liCdList=new ArrayList<>();
		if(paramMap.get("liNm").equals("")){//리가 없을 시
			pnu=emdCd+"00"+ mjPnu;
		}else{//리 존재하는 pnu
			liCdList = searchService.getLiCdList(paramMap);//ㄹㅣ 코드 조회
			String liCd=(String)liCdList.get(0).get("liCd");//읍면동과 리가 합쳐진 코드
			pnu=liCd+mjPnu;
		}
		logger.debug("pnu___________result");
		logger.debug(pnu);

		///////////////공간정보 겟////////////////////////////공간정보 겟/////////////
		paramMap.put("pnu",pnu);
		List<Map<String, Object>> cnbdList = searchService.getCnbdList(paramMap);//ㄹㅣ 코드 조회


		if(!jsonobj.get("liNm").equals("")){//리코드 존재하면
			logger.debug("liNm paramter exists");
		}else{
			logger.debug("liNm paramter is not exists");
		}
		HashMap<String, Object> resultMap = new HashMap<String, Object>();

		resultMap.put("emdList",emdList);
		resultMap.put("liCdList",liCdList);
		resultMap.put("cnbdList",cnbdList);
		///////////////공간정보 겟/////////////

		///////////상세정보 겟


		

	


		return resultMap;
	}

	/**********************************************
	 *  1. 개요 : 비관리청 검색 
	 *	2. 처리내용 :도로명 주소 새주소 건물 레이어를 이요하여 지오메트리 획득
	 *  3. 설명 : 검색
	 * 	@Method searchBmng
	 *  @param res
	 *  @return List<SolrDocument>
	 **********************************************/
	@SuppressWarnings("unused")
	@RequestMapping(value = "/searchBmngGeoFromOcpyLocRn")
	@ResponseBody
	public HashMap<String, Object> searchBmngGeoFromOcpyLocRn(@RequestBody String data, HttpServletRequest request, HttpServletResponse res) throws Exception {
		logger.debug("searchBmngGeoFromOcpyLoc__");
		logger.debug(data);
		JSONParser parser = new JSONParser();
		JSONObject jsonobj = null;
		try {
			jsonobj = (JSONObject) parser.parse(data);
			logger.debug("searchBmng__parameters");
			logger.debug(String.valueOf(jsonobj));
		} catch (ParseException e) {
			e.printStackTrace();
		}

		Map<String, Object> paramMap=new HashMap<>();
		paramMap = new ObjectMapper().readValue(jsonobj.toString(), Map.class);

		List<Map<String, Object>> rnAddrList = searchService.getGeomFromRn(paramMap);//읍면동 코드 조회

		HashMap<String, Object> resultMap = new HashMap<String, Object>();

		resultMap.put("rnAddrGeomList",rnAddrList);
		return resultMap;
	}

	/**********************************************
	 *  1. 개요 : 비관리청 검색
	 *	2. 처리내용 :POI 주소 POI 레이어를 이요하여 지오메트리 획득
	 *  3. 설명 : 검색
	 * 	@Method searchBmng
	 *  @param res
	 *  @return List<SolrDocument>
	 **********************************************/
	@SuppressWarnings("unused")
	@RequestMapping(value = "/searchBmngGeoFromPoi")
	@ResponseBody
	public HashMap<String, Object> searchBmngGeoFromPoi(@RequestBody String data, HttpServletRequest request, HttpServletResponse res)
			throws Exception {
		logger.debug("searchBmngGeoFromPoi");

		HashMap<String, Object> resultMap = new HashMap<String, Object>();

		//resultMap.put("poiGeomList",poiGeomList);
		return resultMap;

	}






	/**********************************************
	 *  1. 개요 : 비관리청 검색
	 *	2. 처리내용 :
	 *  3. 설명 : 검색
	 * 	@Method searchBmng
	 *  @param res
	 *  @return List<SolrDocument>
	 **********************************************/
	@SuppressWarnings("unused")
	@RequestMapping(value = "/searchBmng")
	@ResponseBody
	public HashMap<String, Object> searchBmng(@RequestBody String data, HttpServletRequest request, HttpServletResponse res) throws Exception {
		logger.debug("searchBmng__");
		logger.debug(data);
		JSONParser parser = new JSONParser();
		JSONObject jsonobj = null;
		try {
			jsonobj = (JSONObject) parser.parse(data);
			logger.debug("searchBmng__parameters");
			logger.debug(String.valueOf(jsonobj));
		} catch (ParseException e) {
			e.printStackTrace();
		}

		Map<String, Object> paramMap=new HashMap<>();
		paramMap = new ObjectMapper().readValue(jsonobj.toString(), Map.class);

		List<Map<String, Object>> listCnt = searchService.getBmngSchListCnt(paramMap);
		List<Map<String, Object>> list = searchService.getBmngSchList(paramMap);





		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("listCnt",listCnt);
		resultMap.put("list",list);

		JSONArray resultList = null;

		return resultMap;


	}
	
	/**********************************************
	 *  1. 개요 : 검색
	 *	2. 처리내용 :
	 *  3. 설명 : 검색
	 * 	@Method search
	 *  @param res
	 *  @return List<SolrDocument>
	 **********************************************/
	@SuppressWarnings("unused")
	@RequestMapping(value = "/search")
	@ResponseBody
	public HashMap<String, Object> search(HttpServletRequest request, HttpServletResponse res) throws Exception{
		
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
	    TimoSolrService solrService = new TimoSolrService(prop.getProperty("solrUrl"));
		SimpleData paramMap = getSimpleData(request);
		JSONArray resultList = null;
		
		String collection = (String) paramMap.get("collection");
		String rows = (String) paramMap.get("rows");
		String start = (String) paramMap.get("start");
		String keyword = (String) paramMap.get("keyword");
		String order = (String) paramMap.get("order");
		String defalutOrder = "score desc";


//		System.out.println("collection = "+collection);
//		System.out.println("rows = "+rows);
//		System.out.println("start = "+start);
//		System.out.println("keyword = "+keyword);
//		System.out.println("order = "+order);


		String joinCollection = "";
		String joinKey = "";
		String joinValue = "";
		String roadTypeCd ="";
		String facTypeCd ="";
		String constRoadClss ="";
		String fq ="";
		String prdtReliCd = "";
		
		System.out.println("collection : " + collection);
		
		if(collection.equals("tb_analysis_info")) {
			
			if(null != paramMap.get("prdtReliChk")) {
				prdtReliCd = (String) paramMap.get("prdtReliCd");
				if(null == paramMap.get("prdtReliCd") || "".equals(paramMap.get("prdtReliCd"))) {
					if(!"1".equals(paramMap.get("authNo"))){
						keyword += " AND loc_prdt_reli_cd:[2 TO 3]";
					}
				}else {
					keyword += " AND loc_prdt_reli_cd:("+prdtReliCd+")";
				}
			}
			/*if(null != paramMap.get("prdtReliCd")) {
				prdtReliCd = (String) paramMap.get("prdtReliCd");
				if(null == paramMap.get("prdtReliCd") || "".equals(paramMap.get("prdtReliCd"))) {
					if(!"1".equals(paramMap.get("authNo"))){
						keyword += " AND loc_prdt_reli_cd:[2 TO 3]";
					}
				}else {
					keyword += " AND loc_prdt_reli_cd:("+prdtReliCd+")";
				}
			}*/
			
			
			//도로선택
			if(null != paramMap.get("constRoadClss") && !"".equals(paramMap.get("constRoadClss"))) {
				constRoadClss =(String) paramMap.get("constRoadClss");
				keyword += " AND const_road_clss:("+constRoadClss+")";
			}
			//시설
			if(null != paramMap.get("facTypeCd") && !"".equals(paramMap.get("facTypeCd"))) {
				facTypeCd =(String) paramMap.get("facTypeCd");
				fq += "&fq={!join from=resultno fromIndex=tb_analysis_fac_info to=resultno}fac_ty_cd:("+facTypeCd+")";
			}
			//공사종류
			if(null != paramMap.get("roadTypeCd") && !"".equals(paramMap.get("roadTypeCd"))) {
				roadTypeCd =(String) paramMap.get("roadTypeCd");
				fq += "&fq={!join from=resultno fromIndex=tb_analysis_road_info to=resultno}road_ty_cd:("+roadTypeCd+")";
			}
		}else if(collection.equals("tb_analysis_road_info")) {
			
			//공사종류
			if(null != paramMap.get("roadTypeCd") && !"".equals(paramMap.get("roadTypeCd"))) {
				roadTypeCd =(String) paramMap.get("roadTypeCd");
				keyword += " AND road_ty_cd:("+roadTypeCd+")";
			}
			//시설
			if(null != paramMap.get("facTypeCd") && !"".equals(paramMap.get("facTypeCd"))) {
				facTypeCd =(String) paramMap.get("facTypeCd");
				fq += "&fq={!join from=resultno fromIndex=tb_analysis_fac_info to=resultno}fac_ty_cd:("+facTypeCd+")";
			}
			//국도종류
			if(null != paramMap.get("constRoadClss") && !"".equals(paramMap.get("constRoadClss"))) {
				constRoadClss =(String) paramMap.get("constRoadClss");
				fq += "&fq={!join from=resultno fromIndex=tb_analysis_info to=resultno}const_road_clss:"+(String)paramMap.get("constRoadClss");
			}
			
		}else if(collection.equals("tb_analysis_fac_info")) {
			
			//시설
			if(null != paramMap.get("facTypeCd") && !"".equals(paramMap.get("facTypeCd"))) {
				facTypeCd =(String) paramMap.get("facTypeCd");
				keyword += " AND fac_ty_cd:("+facTypeCd+")";
			}
			
			//공사종류
			if(null != paramMap.get("roadTypeCd") && !"".equals(paramMap.get("roadTypeCd"))) {
				roadTypeCd =(String) paramMap.get("roadTypeCd");
				fq += "&fq={!join from=resultno fromIndex=tb_analysis_road_info to=resultno}road_ty_cd:("+roadTypeCd+")";
			}
			
			//국도종류
			if(null != paramMap.get("constRoadClss") && !"".equals(paramMap.get("constRoadClss"))) {
				constRoadClss =(String) paramMap.get("constRoadClss");
				fq += "&fq={!join from=resultno fromIndex=tb_analysis_info to=resultno}const_road_clss:"+(String)paramMap.get("constRoadClss");
			}
		}else if(collection.equals("tb_analysis_loc_hist")) {
			String startDate = (String) paramMap.get("startDate");
			String endDate = (String) paramMap.get("endDate");
			fq += "&fq={!join from=seq fromIndex=tb_analysis_info to=seq}*:*";
		}else if(collection.equals("tb_cbnd_info")) {
			order = "sido_nm asc, sgg_nm asc, emd_nm asc, li_nm asc, addr asc, pnu asc";
			// order = "sido_cd asc, addr asc, pnu asc";
		}else if(collection.equals("tl_develop_info")) {
			order = "sido_nm asc, sgg_nm asc, emd_nm asc, li_nm asc, name asc";
			// order = "sido_cd asc, sgg_nm asc, emd_nm asc, name asc";
		}else if(collection.equals("tl_poi_point")) {
			order = "sido_nm asc, sgg_nm asc, emd_nm asc, korean_nm asc";
			// order = "sido_cd asc, sgg_nm asc, emd_nm asc, korean_nm asc";
		}else if(collection.equals("tl_road_name")) {
			order = "sido_nm asc, sgg_nm asc, emd_nm asc, rn asc";
			// order = "sido_cd asc, sgg_nm asc, emd_nm asc, rn asc, rds_man_no asc";
		}
		
		
		if(order!=null) {
		
			if(order.equals("sns_regist_dt")) {
				order = "sns_regist_dt_str desc";
			}else {
				if(null != paramMap.get("searchTextYN") && !"".equals(paramMap.get("searchTextYN"))) {
					order =  order+", "+defalutOrder;
				}else {
					order = defalutOrder+", "+order;
					if(collection.equals("tb_cbnd_info")) {
						order = "sido_nm asc, sgg_nm asc, emd_nm asc, li_nm asc, addr asc, pnu asc";
						// order = "sido_cd asc, addr asc, pnu asc";
					}
					if(collection.equals("tl_develop_info")) {
						order = "sido_nm asc, sgg_nm asc, emd_nm asc, li_nm asc, name asc";
						// order = "sido_cd asc, sgg_nm asc, emd_nm asc, name asc";
					}
					if(collection.equals("tl_poi_point")) {
						order = "sido_nm asc, sgg_nm asc, emd_nm asc, korean_nm asc";
						// order = "sido_cd asc, sgg_nm asc, emd_nm asc, korean_nm asc";
					}
					if(collection.equals("tl_road_name")) {
						order = "sido_nm asc, sgg_nm asc, emd_nm asc, rn asc";
						// order = "sido_cd asc, sgg_nm asc, emd_nm asc, rn asc, rds_man_no asc";
					}
					
				}
			}
			
		}else {
			order = defalutOrder;
			
		}
		keyword = CmmnUtil.toTEXT(keyword);

		int listCnt = Integer.parseInt(rows);
		
		QueryResponse response =  null;
		if(!fq.equals("")) {
			response = solrService.getSolrJoinlass(solrService.getSolrUrl()+"/"+collection, keyword, start, rows, order, fq);
		}else {
			response = solrService.getSolrDataClass(solrService.getSolrUrl()+"/"+collection, keyword, start, rows, order);			
		}
		SolrDocumentList docList = response.getResults();
		int maxPageCnt = (int) Math.ceil((double)docList.getNumFound()/listCnt);
		
		if(collection.equals("tb_analysis_info")) {
			List<SolrAnalysisInfo> parseDataList = response.getBeans(SolrAnalysisInfo.class);
			resultMap.put("result",parseDataList);
		}else if(collection.equals("g2b_result_info")) {
			List<SolrG2bResultInfo> parseDataList = response.getBeans(SolrG2bResultInfo.class);
			resultMap.put("result",parseDataList);
		}else if(collection.equals("tb_sns_info")) {
			List<SolrSnsInfo> parseDataList = response.getBeans(SolrSnsInfo.class);
			resultMap.put("result",parseDataList);
		}else if(collection.equals("tb_sns_loc_info")) {
			List<SolrSnsLocInfo> parseDataList = response.getBeans(SolrSnsLocInfo.class);
			resultMap.put("result",parseDataList);
		}else if(collection.equals("tb_analysis_road_info")) {
			List<SolrAnalysisRoadInfo> parseDataList = response.getBeans(SolrAnalysisRoadInfo.class);
			resultMap.put("result",parseDataList);
		}else if(collection.equals("tb_cbnd_info")) {
			List<SolrCbndInfo> parseDataList = response.getBeans(SolrCbndInfo.class);
			resultMap.put("result",parseDataList);
		}else if(collection.equals("legaldong_sido")){
			List<SolrSidoInfo> parseDataList = response.getBeans(SolrSidoInfo.class);
			resultMap.put("result",parseDataList);
		}else if(collection.equals("legaldong_sgg")){
			List<SolrSggInfo> parseDataList = response.getBeans(SolrSggInfo.class);
			resultMap.put("result",parseDataList);
		} else if (collection.equals("legaldong_emd")) {
			List<SolrEmdInfo> parseDataList = response.getBeans(SolrEmdInfo.class);
			resultMap.put("result", parseDataList);
		} else if (collection.equals("legaldong_li")) {
			List<SolrLiInfo> parseDataList = response.getBeans(SolrLiInfo.class);
			System.out.println("test:" + parseDataList.toString());
			resultMap.put("result", parseDataList);
		}  else {
			// FIXME 테스트용 / 도메인 모델 없을 때 map으로 임시 리턴
			List<Map<String,Object>> parseDataList = response.getResults().stream().map(doc -> {
				Map<String, Object> docMap = new LinkedHashMap<>();
				Iterator itr = doc.getFieldNames().iterator();
				while (itr.hasNext()) {
					String key = itr.next().toString();
					docMap.put(key, doc.get(key));
				}
				return docMap;
			}).collect(Collectors.toList());
			resultMap.put("result", parseDataList);
		}
		
		resultMap.put("totalCnt"	, docList.getNumFound());  // 결과 전체 건수
		resultMap.put("maxPageCnt"	, maxPageCnt);  			// max page
		resultMap.put("start"		, docList.getStart());     // 조회 시작번호
		
		return resultMap;
	}
	
	@SuppressWarnings("unused")
	@RequestMapping(value = "/count")
	@ResponseBody
	public HashMap<String, Object> eachCount(HttpServletRequest request, HttpServletResponse res) throws Exception{

		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		HashMap<String, Object> returnListMap = new HashMap<String, Object>();
		
		String solrUrl ="";
		if(prop.getProperty("solrUrl")!=null) {
	    TimoSolrService solrService = new TimoSolrService(prop.getProperty("solrUrl"));
		SimpleData paramMap = getSimpleData(request);
		JSONArray resultList = null;
		
		String collection = (String) paramMap.get("collection");
		String keyword = (String) paramMap.get("keyword");
		
		String dayType = "";//(String) paramMap.get("dayType");
		if(paramMap.containsKey("dayType") == true) {
			dayType = (String) paramMap.get("dayType");
		}
		
		String facet ="";
		if(paramMap.containsKey("facet") == true) {
			facet = (String) paramMap.get("facet");
		}
		int limit =-1;
		if(paramMap.containsKey("limit") == true) {
			limit =  Integer.parseInt((String)paramMap.get("limit"));
		}
		
		
		String joinCollection = "";
		String joinKey = "";
		String joinValue = "";
		String roadTypeCd ="";
		String facTypeCd ="";
		String constRoadClss ="";
		String fq ="";
		String prdtReliCd = "";
		
		if(collection.equals("tb_analysis_info")) {
			
			if(null != paramMap.get("prdtReliChk")) {
				prdtReliCd = (String) paramMap.get("prdtReliCd");
				if(null == paramMap.get("prdtReliCd") || "".equals(paramMap.get("prdtReliCd"))) {
					if(!"1".equals(paramMap.get("authNo"))){
						keyword += " AND loc_prdt_reli_cd:[2 TO 3]";
					}
				}else {
					keyword += " AND loc_prdt_reli_cd:("+prdtReliCd+")";
				}
			}
			
			//도로선택
			if(null != paramMap.get("constRoadClss") && !"".equals(paramMap.get("constRoadClss"))) {
				constRoadClss =(String) paramMap.get("constRoadClss");
				keyword += " AND const_road_clss:("+constRoadClss+")";
			}
			//시설
			if(null != paramMap.get("facTypeCd") && !"".equals(paramMap.get("facTypeCd"))) {
				facTypeCd =(String) paramMap.get("facTypeCd");
				fq += "&fq={!join from=resultno fromIndex=tb_analysis_fac_info to=resultno}fac_ty_cd:"+facTypeCd;
			}
			//공사종류
			if(null != paramMap.get("roadTypeCd") && !"".equals(paramMap.get("roadTypeCd"))) {
				roadTypeCd =(String) paramMap.get("roadTypeCd");
				fq += "&fq={!join from=resultno fromIndex=tb_analysis_road_info to=resultno}road_ty_cd:"+roadTypeCd;
			}
		}else if(collection.equals("tb_analysis_road_info")) {
			
			//공사종류
			if(null != paramMap.get("roadTypeCd") && !"".equals(paramMap.get("roadTypeCd"))) {
				roadTypeCd =(String) paramMap.get("roadTypeCd");
				keyword += " AND road_ty_cd:("+roadTypeCd+")";
			}
			//시설
			if(null != paramMap.get("facTypeCd") && !"".equals(paramMap.get("facTypeCd"))) {
				facTypeCd =(String) paramMap.get("facTypeCd");
				fq += "&fq={!join from=resultno fromIndex=tb_analysis_fac_info to=resultno}fac_ty_cd:"+facTypeCd;
			}
			//국도종류
			if(null != paramMap.get("constRoadClss") && !"".equals(paramMap.get("constRoadClss"))) {
				constRoadClss =(String) paramMap.get("constRoadClss");
				fq += "&fq={!join from=resultno fromIndex=tb_analysis_info to=resultno}const_road_clss:"+(String)paramMap.get("constRoadClss");
			}
			
		}else if(collection.equals("tb_analysis_fac_info")) {
			
			//시설
			if(null != paramMap.get("facTypeCd") && !"".equals(paramMap.get("facTypeCd"))) {
				facTypeCd =(String) paramMap.get("facTypeCd");
				keyword += " AND fac_ty_cd:("+facTypeCd+")";
			}
			
			//공사종류
			if(null != paramMap.get("roadTypeCd") && !"".equals(paramMap.get("roadTypeCd"))) {
				roadTypeCd =(String) paramMap.get("roadTypeCd");
				fq += "&fq={!join from=resultno fromIndex=tb_analysis_road_info to=resultno}road_ty_cd:"+roadTypeCd;
			}
			
			//국도종류
			if(null != paramMap.get("constRoadClss") && !"".equals(paramMap.get("constRoadClss"))) {
				constRoadClss =(String) paramMap.get("constRoadClss");
				fq += "&fq={!join from=resultno fromIndex=tb_analysis_info to=resultno}const_road_clss:"+(String)paramMap.get("constRoadClss");
			}
		}
		
		String pivot = "";
		QueryResponse response = solrService.getSolrDataClass(solrService.getSolrUrl()+"/"+collection, keyword, dayType, pivot, limit,fq);
		
		GroupResponse ss = response.getGroupResponse();
		
		List<HashMap<String, Object>> grouplist = new ArrayList<HashMap<String, Object>>();
		SolrDocumentList docList = null;
		List<GroupCommand> groupList = ss.getValues();
		Iterator<GroupCommand> gIt = groupList.iterator();
		int  total=0;
		while (gIt.hasNext()) {
			GroupCommand gc = gIt.next();
			  total = gc.getMatches();
			  returnListMap.put("totalcnt", total);
			  
			for (Group group : gc.getValues()) {
				HashMap<String, Object> map = new HashMap<String, Object>();
				map.put("count", group.getResult().getNumFound());
				map.put("stdrDt", group.getGroupValue());
				grouplist.add(map);
			}
			returnListMap.put("list",grouplist);
			}
		}
		return returnListMap;
		
	}
	
	
	@RequestMapping(value = "/pcount")
	@ResponseBody
	public Map<String, List<FacetPivotFieldEntry>> pcount(HttpServletRequest request, HttpServletResponse res) throws Exception{

		
		HashMap<String, List<FacetPivotFieldEntry>> facetResult = new LinkedHashMap<>();
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
	    TimoSolrService solrService = new TimoSolrService(prop.getProperty("solrUrl"));
		SimpleData paramMap = getSimpleData(request);
		JSONArray resultList = null;
		
		String collection = (String) paramMap.get("collection");
		String keyword = (String) paramMap.get("keyword");
		
		String dayType = "";//(String) paramMap.get("dayType");
		if(paramMap.containsKey("dayType") == true) {
			dayType = (String) paramMap.get("dayType");
		}
		String pivot = "";
		if(paramMap.containsKey("pivot") == true) {
			pivot = (String) paramMap.get("pivot");
		}
		int limit =-1;
		if(paramMap.containsKey("limit") == true) {
			limit =  Integer.parseInt((String)paramMap.get("limit"));
		}
		
		String joinCollection = "";
		String joinKey = "";
		String joinValue = "";
		String roadTypeCd ="";
		String facTypeCd ="";
		String constRoadClss ="";
		String fq ="";
		String prdtReliCd = "";
		
		
		if(collection.equals("tb_analysis_info")) {
			if(null != paramMap.get("prdtReliChk")) {
				prdtReliCd = (String) paramMap.get("prdtReliCd");
				if(null == paramMap.get("prdtReliCd") || "".equals(paramMap.get("prdtReliCd"))) {
					if(!"1".equals(paramMap.get("authNo"))){
						keyword += " AND loc_prdt_reli_cd:[2 TO 3]";
					}
				}else {
					keyword += " AND loc_prdt_reli_cd:("+prdtReliCd+")";
				}
			}
			//도로선택
			if(null != paramMap.get("constRoadClss") && !"".equals(paramMap.get("constRoadClss"))) {
				constRoadClss =(String) paramMap.get("constRoadClss");
				keyword += " AND const_road_clss:("+constRoadClss+")";
			}
			//시설
			if(null != paramMap.get("facTypeCd") && !"".equals(paramMap.get("facTypeCd"))) {
				facTypeCd =(String) paramMap.get("facTypeCd");
				fq += "&fq={!join from=resultno fromIndex=tb_analysis_fac_info to=resultno}fac_ty_cd:("+facTypeCd+")";
			}
			//공사종류
			if(null != paramMap.get("roadTypeCd") && !"".equals(paramMap.get("roadTypeCd"))) {
				roadTypeCd =(String) paramMap.get("roadTypeCd");
				fq += "&fq={!join from=resultno fromIndex=tb_analysis_road_info to=resultno}road_ty_cd:("+roadTypeCd+")";
			}
		}else if(collection.equals("tb_analysis_road_info")) {
			
			//공사종류
			if(null != paramMap.get("roadTypeCd") && !"".equals(paramMap.get("roadTypeCd"))) {
				roadTypeCd =(String) paramMap.get("roadTypeCd");
				keyword += " AND road_ty_cd:("+roadTypeCd+")";
			}
			//시설
			if(null != paramMap.get("facTypeCd") && !"".equals(paramMap.get("facTypeCd"))) {
				facTypeCd =(String) paramMap.get("facTypeCd");
				fq += "&fq={!join from=resultno fromIndex=tb_analysis_fac_info to=resultno}fac_ty_cd:("+facTypeCd+")";
			}
			//국도종류
			if(null != paramMap.get("constRoadClss") && !"".equals(paramMap.get("constRoadClss"))) {
      				constRoadClss =(String) paramMap.get("constRoadClss");
				fq += "&fq={!join from=resultno fromIndex=tb_analysis_info to=resultno}const_road_clss:"+(String)paramMap.get("constRoadClss");
			}
			
		}else if(collection.equals("tb_analysis_fac_info")) {
			
			//시설
			if(null != paramMap.get("facTypeCd") && !"".equals(paramMap.get("facTypeCd"))) {
				facTypeCd =(String) paramMap.get("facTypeCd");
				keyword += " AND fac_ty_cd:("+facTypeCd+")";
			}
			//공사종류
			if(null != paramMap.get("roadTypeCd") && !"".equals(paramMap.get("roadTypeCd"))) {
				roadTypeCd =(String) paramMap.get("roadTypeCd");
				fq += "&fq={!join from=resultno fromIndex=tb_analysis_road_info to=resultno}road_ty_cd:("+roadTypeCd+")";
			}
			//국도종류
			if(null != paramMap.get("constRoadClss") && !"".equals(paramMap.get("constRoadClss"))) {
				constRoadClss =(String) paramMap.get("constRoadClss");
				fq += "&fq={!join from=resultno fromIndex=tb_analysis_info to=resultno}const_road_clss:"+(String)paramMap.get("constRoadClss");
				
			}
		}
		
		QueryResponse response = solrService.getSolrDataClass(solrService.getSolrUrl()+"/"+collection, keyword, dayType, pivot,limit,fq);		
		HashMap<String, Object> returnListMap = new HashMap<String, Object>();
		ArrayList<FacetPivotFieldEntry> pivotFieldEntries = new ArrayList<>();
		NamedList<List<PivotField>> facetPivot = response.getFacetPivot();
		List<FacetField> list = response.getFacetDates();
		 
		if (facetPivot != null && facetPivot.size() > 0) {
	        for (int i = 0; i < facetPivot.size(); i++) {
	          String name = facetPivot.getName(i);
	          List<PivotField> pivotResult = facetPivot.get(name);
	          facetResult.put("result", convertPivotResult(pivotResult));
	        }
	      }
		resultMap.put("result",facetResult);		
		return facetResult;
	}
	
	private static List<FacetPivotFieldEntry> convertPivotResult(List<PivotField> pivotResult) {
		  if (CollectionUtils.isEmpty(pivotResult)) {
		    return Collections.emptyList();
		  }
		  ArrayList<FacetPivotFieldEntry> pivotFieldEntries = new ArrayList<>();
		  for (PivotField pivotField : pivotResult) {
		    SimpleFacetPivotEntry pivotFieldEntry = new SimpleFacetPivotEntry(new SimpleField(pivotField.getField()),
		        String.valueOf(pivotField.getValue()), pivotField.getCount());
		    List<PivotField> pivot = pivotField.getPivot();
		    if (pivot != null) {
		      pivotFieldEntry.setPivot(convertPivotResult(pivot));
		    }
		    pivotFieldEntries.add(pivotFieldEntry);
		  }
		  return pivotFieldEntries;
	}
	
	
	/**********************************************
	 *  1. 개요 : 검색
	 *	2. 처리내용 :
	 *  3. 설명 : 검색
	 * 	@Method search
	 *  @param res
	 *  @return List<SolrDocument>
	 **********************************************/
	@SuppressWarnings("unused")
	@RequestMapping(value = "/legalZoneSearch")
	@ResponseBody
	public JSONArray legalZoneSearch(HttpServletRequest request, HttpServletResponse res) throws Exception{

		log.debug("search.....");
		SimpleData paramMap = getSimpleData(request);
		
		JSONArray resultList = null;
		try {
			String solrUrl = prop.getProperty("solrUrl");
			TimoSolrService searchService = new TimoSolrService(solrUrl, paramMap);
			resultList = searchService.searchQuery();
		} catch (Exception e) {
			CmmnUtil.setLog(e.getMessage());
		}
		return resultList;
	}
	
	
	
	/**********************************************
	 *  1. 개요 : 주제도 시도 검색
	 *	2. 처리내용 :
	 *  3. 설명 : 주제도 검색
	 * 	@Method themeMap
	 *  @param res
	 *  @return List<SolrDocument>
	 **********************************************/
	@SuppressWarnings({ "unused", "unchecked" })
	@RequestMapping(value = "/themeMapSido")
	@ResponseBody
	public HashMap<String, Object> themeMapSido(HttpServletRequest request, HttpServletResponse res) throws Exception{

			SimpleData paramMap = getSimpleData(request);
   		   String solrUrl = prop.getProperty("solrUrl");
		   TimoSolrService searchService = new TimoSolrService(solrUrl, paramMap);
		   return  searchService.themeMapSido(paramMap);
	}
	
	/**********************************************
	 *  1. 개요 : 주제도 시군구 검색
	 *	2. 처리내용 :
	 *  3. 설명 : 주제도 검색
	 * 	@Method themeMap
	 *  @param res
	 *  @return List<SolrDocument>
	 **********************************************/
	@SuppressWarnings({ "unused", "unchecked" })
	@RequestMapping(value = "/themeMapSgg")
	@ResponseBody
	public HashMap<String, Object> themeMapSgg(HttpServletRequest request, HttpServletResponse res) throws Exception{

			SimpleData paramMap = getSimpleData(request);
   		   String solrUrl = prop.getProperty("solrUrl");
		   TimoSolrService searchService = new TimoSolrService(solrUrl, paramMap);
		   return  searchService.themeMapSgg(paramMap);
	}

}
