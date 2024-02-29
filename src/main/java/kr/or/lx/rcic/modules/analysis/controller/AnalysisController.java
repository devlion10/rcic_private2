package kr.or.lx.rcic.modules.analysis.controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.or.lx.rcic.frmwrk.util.CmmnUtil;
import kr.or.lx.rcic.modules.analysis.service.AnalysisService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/rcic/analysis")
public class AnalysisController {

	private Logger logger = LoggerFactory.getLogger(getClass());

    @Value("#{contextProperties}")
    private Properties prop = new Properties();

    @Autowired
    private AnalysisService analysisService;


    /**
     *
     * @param resultno
     * @return
     * @throws Exception
     */
    @ResponseBody
    @RequestMapping(value = "/getAnalysisDetail/{resultno}")
    public Map<String, Object> selectAnalysisInfoDetail(@PathVariable("resultno") String resultno) throws Exception {
        Map<String, Object> analysisInfoDetail = null;
        try {
        	if(resultno!=null) {
        		analysisInfoDetail = analysisService.getAnalysisDetail(resultno);
        	}
		} catch (Exception e) {
			CmmnUtil.setLog(e.getMessage());
		}
        return analysisInfoDetail;
    }
    
    @ResponseBody
    @RequestMapping(value = "/getAnalysisDetailCbnd/{resultno}")
    public Map<String, Object> selectAnalysisDetailCbnd(@PathVariable("resultno") String resultno) throws Exception {
    	Map<String, Object> analysisDetailCbnd = null;
    	try {
    		if(resultno!=null) {
    			analysisDetailCbnd = analysisService.getAnalysisDetailCbnd(resultno);	
    		}
    	} catch (Exception e) {
    		CmmnUtil.setLog(e.getMessage());
    	}
    	return analysisDetailCbnd;
    }
    
    @ResponseBody
    @RequestMapping(value = "/getAnalysisDetailDevelop/{resultno}")
    public Map<String, Object> selectAnalysisDetailDevelop(@PathVariable("resultno") String resultno) throws Exception {
    	Map<String, Object> analysisDetailDevelop = null;
    	try {
    		if(resultno!=null) {
    			analysisDetailDevelop = analysisService.getAnalysisDetailDevelop(resultno);	
    		}
    	} catch (Exception e) {
    		CmmnUtil.setLog(e.getMessage());
    	}
    	return analysisDetailDevelop;
    }
    
    @ResponseBody
    @RequestMapping(value = "/getAnalysisDetailPoi/{resultno}")
    public Map<String, Object> selectAnalysisDetailPoi(@PathVariable("resultno") String resultno) throws Exception {
    	Map<String, Object> analysisDetailPoi = null;
    	try {
    		if(resultno!=null) {
    			analysisDetailPoi = analysisService.getAnalysisDetailPoi(resultno);	
    		}
    	} catch (Exception e) {
    		CmmnUtil.setLog(e.getMessage());
    	}
    	return analysisDetailPoi;
    }
    
    @ResponseBody
    @RequestMapping(value = "/getAnalysisDetailRoad/{resultno}")
    public Map<String, Object> selectAnalysisDetailRoad(@PathVariable("resultno") String resultno) throws Exception {
    	Map<String, Object> analysisDetailRoad = null;
    	try {
    		if(resultno!=null) {
    			analysisDetailRoad = analysisService.getAnalysisDetailRoad(resultno);	
    		}
    	} catch (Exception e) {
    		CmmnUtil.setLog(e.getMessage());
    	}
    	return analysisDetailRoad;
    }
    
    
    /**
    * 도로대장 49종 요청 결과 조회
    * @param resultno
    * @return
    * @throws Exception
    */
    @ResponseBody
    @RequestMapping(value = "/getLayerInfo/{resultno}")
    public Map<String, Object> getLayerInfo(@PathVariable("resultno") String resultno, HttpServletRequest request) throws Exception {
    	Map<String, Object> resultMap = new HashMap<String, Object>();
   	 	List<List<Map<String, Object>>> layerDataList = new ArrayList<List<Map<String, Object>>>();
        List<Map<String, Object>> roadInfoList = null;
        List<Map<String, Object>> roadLayerList = null;
        int chgCnt = 0;
        //String flag = "N";
    	
    	try {
    		if(resultno!=null) {
    			// 위치변경이력조회
    			chgCnt = analysisService.getlocChangeCnt(resultno);
    			
    			// 위치가 변경된 공고건은 tb_analysis_loc_hist에서 현재 위치 조회 
    			if(chgCnt > 0) {
    				// 도로 정보(도로노선번호:4자리, 도로구간번호:2자리)
    				roadInfoList = analysisService.selectRoadInfoHistList(resultno);
    			}else {
    				// 도로 정보(도로노선번호:4자리, 도로구간번호:2자리)
    				roadInfoList = analysisService.selectRoadInfoList(resultno);
    			}
    			
	    		// 도로대장 레이어 정보(레이어 ID, 레이어물리명)
	    		roadLayerList = analysisService.selectRoadLayerList(resultno);
	    		
	    		if(roadInfoList.size() > 0 && roadLayerList.size() > 0) {
	    			for (Map<String, Object> roadInfo : roadInfoList) {
	    				for (Map<String, Object> roadLayer : roadLayerList) {
	    					List<Map<String, Object>> dataList = new ArrayList<Map<String, Object>>();
	    					String roadNo = roadInfo.get("roadNo").toString();
	    					String sect = roadInfo.get("sect").toString();
	    					String layNm = roadLayer.get("layNm").toString();
							/*
							 * flag = analysisService.checkLayerInfo(roadNo, sect, layNm); if(flag == "N") {
							 * resultMap.put("result", "N"); return resultMap; }
							 */
	    					// 요청 정보
	    		 	       	Map<String, Object> dataMap = new HashMap<>();
	    		 	   		dataMap.put("roadNo", roadNo);
	    		 	   		dataMap.put("sect", sect);
	    		 	   		dataMap.put("layNm", layNm);
	    		 	   		dataList = analysisService.selectRoadLayerDataList(dataMap);
	    		 	   		layerDataList.add(dataList);
	    				}
	    			}
	    		}
	    		
	    		//resultMap.put("result", "Y");
	    		resultMap.put("layerInfo", roadLayerList);
	    		resultMap.put("layerDataList", layerDataList);
    		}
    		
    		
    	} catch (Exception e) {
    		e.printStackTrace();
    	}

    	return resultMap;
    }
    
   


}
