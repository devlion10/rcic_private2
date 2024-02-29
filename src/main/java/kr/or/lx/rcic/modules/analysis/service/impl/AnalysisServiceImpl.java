
package kr.or.lx.rcic.modules.analysis.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import kr.or.lx.rcic.modules.api.exception.CalsInsertSqlExecption;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vividsolutions.jts.geom.Coordinate;
import com.vividsolutions.jts.geom.MultiPolygon;
import com.vividsolutions.jts.geom.Polygon;

import egovframework.rte.psl.dataaccess.util.EgovMap;
import kr.co.timosoft.rcic.search.TimoSolrService;
import kr.or.lx.rcic.modules.analysis.service.AnalysisService;
import kr.or.lx.rcic.modules.analysisInfo.entity.AnalysisInfo;
import kr.or.lx.rcic.modules.analysisInfo.mapper.AnalysisInfoMapper;
import kr.or.lx.rcic.modules.analysisLocHist.mapper.AnalysisLocHistMapper;
import kr.or.lx.rcic.modules.code.entity.CodeDetail;
import kr.or.lx.rcic.modules.code.mapper.CodeMapper;
import kr.or.lx.rcic.modules.search.dto.SolrAnalysisFacInfo;
import kr.or.lx.rcic.modules.search.dto.SolrAnalysisInfo;
import kr.or.lx.rcic.modules.search.dto.SolrAnalysisLocInfo;
import kr.or.lx.rcic.modules.search.dto.SolrAnalysisRoadInfo;
import kr.or.lx.rcic.modules.search.dto.SolrAnalysisScoreInfo;
import kr.or.lx.rcic.modules.search.dto.SolrCbndInfo;
import kr.or.lx.rcic.modules.search.dto.SolrRoadNameInfo;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class AnalysisServiceImpl implements AnalysisService {

    @Value("#{contextProperties}")
    Properties prop = new Properties();
    
    @Autowired
    private AnalysisLocHistMapper analysisLocHistMapper;
    
    @Autowired
    private AnalysisInfoMapper analysisInfoMapper;
    
    @Autowired
    private CodeMapper codeMapper;
    

    @Override
    public Map<String, Object> getAnalysisDetail(String resultno) throws Exception {
        Map<String, Object> result = new LinkedHashMap<>();
        
        String solrUrl = prop.getProperty("solrUrl");
        
        if(solrUrl!=null) {
        	
        	 TimoSolrService solrService = new TimoSolrService(prop.getProperty("solrUrl"));

             if (resultno == null || "".equals(resultno)) {
                 throw new RuntimeException("[resultno] is required.");
             }

             String urlString = solrUrl + "/tb_analysis_info";
             String resultnoQuery = String.format("resultno:(%s)", resultno);

             QueryResponse res = solrService.getSolrDataResponse(urlString, resultnoQuery);
             List<SolrAnalysisInfo> docList = res.getBeans(SolrAnalysisInfo.class);
             
             SolrAnalysisInfo analysisInfo = new SolrAnalysisInfo();
             List<SolrAnalysisRoadInfo> roadListTemp =  new ArrayList<SolrAnalysisRoadInfo>();
             List<SolrAnalysisRoadInfo> roadList =  new ArrayList<SolrAnalysisRoadInfo>();
             
             List<SolrAnalysisFacInfo> facListTemp =  new ArrayList<SolrAnalysisFacInfo>();
             List<SolrAnalysisFacInfo> facList =  new ArrayList<SolrAnalysisFacInfo>();
             List<SolrAnalysisScoreInfo> scoreList =  new ArrayList<SolrAnalysisScoreInfo>();
             List<SolrAnalysisLocInfo> locList = new ArrayList<SolrAnalysisLocInfo>();
             List<Map<String, Object>> locHistList = new ArrayList<Map<String,Object>>();
             AnalysisInfo analysisInfoDB = new AnalysisInfo();
             String locchange_yn = analysisLocHistMapper.getChnage_yn(resultno);
             //공사 종류
             HashMap pmap = new HashMap();
             pmap.put("groupCode", "CD0004");
             //시설물 종류
             HashMap fmap = new HashMap();
             fmap.put("groupCode", "CD0002");
             
    		 List<Map<String, Object> > constructionList =  codeMapper.selectDetailCode(pmap);
    		 List<Map<String, Object> > facCodeList =  codeMapper.selectDetailCode(fmap);

             if (docList.size() >= 1) {
                 // 분석정보 상세
                 analysisInfo = docList.get(0);
                 String seq = analysisInfo.getSeq();

                 // 공사정보
                 String roadUrl = solrUrl + "/tb_analysis_road_info";
                 QueryResponse roadDocResponse = solrService.getSolrDataResponse(roadUrl, resultnoQuery);
                 roadListTemp = roadDocResponse.getBeans(SolrAnalysisRoadInfo.class);
                 
                 Iterator<SolrAnalysisRoadInfo> roadIt= roadListTemp.iterator();
                 while (roadIt.hasNext()) {
					SolrAnalysisRoadInfo solrAnalysisRoadInfo = (SolrAnalysisRoadInfo) roadIt.next();
					
					Iterator<Map<String, Object> > codeIt= constructionList.iterator();
					while (codeIt.hasNext()) {
						Map<String, Object>  codeMap = codeIt.next();
						if(codeMap.get("code").equals(solrAnalysisRoadInfo.getRoad_ty_cd())) {
							solrAnalysisRoadInfo.setBase64_attr2(codeMap.get("base64Attr2").toString());
							break;
						}
					}
					roadList.add(solrAnalysisRoadInfo);
				}
                 

                 if (docList.size() >= 1) {
                     // 분석정보 상세
                     analysisInfo = docList.get(0);

                     // 시설물정보
                     String facUrl = solrUrl + "/tb_analysis_fac_info";
                     QueryResponse facDocResponse = solrService.getSolrDataResponse(facUrl, resultnoQuery);
                     facListTemp = facDocResponse.getBeans(SolrAnalysisFacInfo.class);

                     Iterator<SolrAnalysisFacInfo> facIt= facListTemp.iterator();
                     while (facIt.hasNext()) {
    					SolrAnalysisFacInfo solrAnalysisFacInfo = (SolrAnalysisFacInfo) facIt.next();
    					
    					Iterator<Map<String, Object> > codeIt= facCodeList.iterator();
    					while (codeIt.hasNext()) {
    						Map<String, Object>  codeMap = codeIt.next();
    						if(codeMap.get("code").equals(solrAnalysisFacInfo.getFac_ty_cd())) {
    							solrAnalysisFacInfo.setBase64_attr2(codeMap.get("base64Attr2").toString());
    							break;
    						}
    					}
    					facList.add(solrAnalysisFacInfo);
    				}
                 }
               
                 
                 String seqQuery = String.format("seq:(%s)", seq);
                 seqQuery += " AND loc_ty:(01)"; 
                 // 위치 및 개소 정보
                 String scoreUrl = solrUrl + "/tb_analysis_score";
                 QueryResponse scoreDocResponse = solrService.getSolrDataResponse(scoreUrl, resultnoQuery);
                 scoreList = scoreDocResponse.getBeans(SolrAnalysisScoreInfo.class);
                 //새주소도로명의 경우 위단계에서 포인트 가져옴?
                 // 위치 정보
                 String locUrl = solrUrl + "/tb_analysis_loc_info";
                 QueryResponse locDocResponse = solrService.getSolrDataResponse(locUrl, seqQuery);
                 locList = locDocResponse.getBeans(SolrAnalysisLocInfo.class);
                 
                 //위치정보 보정 
                 HashMap<String, Object> param = new HashMap<String, Object>();
                 param.put("seq", seq);
                 param.put("locTy", "01");
                 locHistList =  analysisLocHistMapper.selectAnalysisLocHistNew(param);
                 
                 // 도로대장 관리 시스템 갱신일자 
                 HashMap<String, Object> param1 = new HashMap<String, Object>();
                 param1.put("seq", seq);
                 param1.put("resultno", resultno);
                 analysisInfoDB =  analysisInfoMapper.getAnalysisInfo(param1);
             }
             
             result.put("analysisInfo", analysisInfo);
             result.put("roadList", roadList);
             result.put("facList", facList);
             result.put("scoreList", scoreList);
             result.put("locList", locList);
             result.put("locHistList", locHistList);
             result.put("analysisInfoData", analysisInfoDB);
             result.put("change_yn",locchange_yn);
        	
        }
        return result;
    }
    
    
    
    @Override
    public Map<String, Object> getAnalysisDetailCbnd(String seq) throws Exception {

    	Map<String, Object> result = new LinkedHashMap<>();
        
        String solrUrl = prop.getProperty("solrUrl");
        
        if(solrUrl!=null) {
        	
        	 TimoSolrService solrService = new TimoSolrService(prop.getProperty("solrUrl"));

             if (seq == null || "".equals(seq)) {
                 throw new RuntimeException("[resultno] is required.");
             }

             String urlString = solrUrl + "/tb_cbnd_info";
             String resultnoQuery = String.format("seq:(%s)", seq);

             QueryResponse res = solrService.getSolrDataResponse(urlString, resultnoQuery);
             List<SolrCbndInfo> docList = res.getBeans(SolrCbndInfo.class);
             
             SolrCbndInfo solrcbndinfo = new SolrCbndInfo();

             if (docList.size() >= 1) {
                 // 분석정보 상세
            	 solrcbndinfo = docList.get(0);
             }
             
             result.put("solrcbndinfo", solrcbndinfo);
        	
        }
        return result;
    }
    
    
    
    
    @Override
    public Map<String, Object> getAnalysisDetailDevelop(String resultno) throws Exception {

		Map<String, Object> result = new LinkedHashMap<>();
		HashMap<String, Object> param = new HashMap<String, Object>();
		List<Map<String, Object>> roadData = new ArrayList<Map<String,Object>>();
		
		param.put("resultno", resultno);
		
		roadData =  analysisInfoMapper.getAnalysisDetailDevelop(param);
		result.put("rtnData", roadData);

		return result;
    }
	
    
	@Override
	public Map<String, Object> getAnalysisDetailPoi(String resultno) throws Exception {

		Map<String, Object> result = new LinkedHashMap<>();
		HashMap<String, Object> param = new HashMap<String, Object>();
		List<Map<String, Object>> roadData = new ArrayList<Map<String,Object>>();
		
		param.put("resultno", resultno);
		
		roadData =  analysisInfoMapper.getAnalysisDetailPoi(param);
		result.put("rtnData", roadData);

		return result;
	}



	@Override
	public Map<String, Object> getAnalysisDetailRoad(String resultno) throws Exception {

		Map<String, Object> result = new LinkedHashMap<>();
        
        String solrUrl = prop.getProperty("solrUrl");
        
        if(solrUrl!=null) {
        	
        	 TimoSolrService solrService = new TimoSolrService(prop.getProperty("solrUrl"));

             if (resultno == null || "".equals(resultno)) {
                 throw new RuntimeException("[resultno] is required.");
             }

             String urlString = solrUrl + "/tl_road_name";
             String resultnoQuery = String.format("seq:(%s)", resultno);

             System.out.println("urlString:"+urlString);
             System.out.println("resultnoQuery:"+resultnoQuery);
             QueryResponse res = solrService.getSolrDataResponse(urlString, resultnoQuery);
             System.out.println("res:"+res.toString());
             List<SolrRoadNameInfo> docList = res.getBeans(SolrRoadNameInfo.class);
             
             SolrRoadNameInfo solrRoadNameInfo = new SolrRoadNameInfo();

             if (docList.size() >= 1) {
            	 solrRoadNameInfo = docList.get(0);
             }
             
             result.put("solrRoadNameInfo", solrRoadNameInfo);
        	
        }
        return result;
	}



	@Override
	public List<Map<String, Object>> selectRoadLayerList(String resultno) throws Exception {
		return analysisInfoMapper.selectRoadLayerList(resultno);
	}



	@Override
	public List<Map<String, Object>> selectRoadInfoList(String resultno) throws Exception {
		return analysisInfoMapper.selectRoadInfoList(resultno);
	}



	@Override
	public Map<String, Object> getRoadLayerImg(String layNm) throws Exception {
		return analysisInfoMapper.getRoadLayerImg(layNm);
	}



	// krris 도로대장 데이터 API 요청 결과
	@Override
	@Transactional
	public String checkLayerInfo(String roadNo, String sect, String layNm) throws Exception {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		String resultYn = "N";
		
		// 요청 정보
    	Map<String, Object> dataMap = new HashMap<>();
		dataMap.put("roadNo", roadNo);
		dataMap.put("sect", sect);
		dataMap.put("layNm", layNm);
		
		// 요청 클라이언트 요청 정보 조회
		resultMap = analysisInfoMapper.selectRoadLayerDataFlag(dataMap);
		resultYn = resultMap == null? "N":resultMap.get("resultYn").toString();
		return resultYn;
	}


	@Override
	public List<Map<String, Object>> selectRoadLayerDataList(Map<String, Object> dataMap) throws Exception {
		return analysisInfoMapper.selectRoadLayerDataList(dataMap);
	}


	@Override
	public int getlocChangeCnt(String resultno) throws Exception {
		return analysisInfoMapper.getlocChangeCnt(resultno);
		
	}


	@Override
	public List<Map<String, Object>> selectRoadInfoHistList(String resultno) throws Exception {
		return analysisInfoMapper.selectRoadInfoHistList(resultno);
	}

    @Override
    public int insertCalsDataToRcic(Map<String, Object> dataMap) throws Exception {
        return analysisInfoMapper.insertCalsDataToRcic(dataMap);
    }


}
