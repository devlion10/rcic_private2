package kr.or.lx.rcic.modules.admin.controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
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
import javax.ws.rs.BadRequestException;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartRequest;

import kr.co.timosoft.util.DateUtil;
import kr.or.lx.rcic.modules.dataCntc.service.DataCntcService;
import kr.or.lx.rcic.modules.legaldong.service.LegaldongService;
import kr.or.lx.rcic.modules.shpimport.entity.DicUpload;
import kr.or.lx.rcic.modules.shpimport.service.ShpImportService;

/**
 * 어드민 명칭사전 컨트롤러
 */
@Controller
@RequestMapping("/admin/dic")
public class AdminDicController {
	
	@Value("#{contextProperties}")
	Properties prop = new Properties();

    @Autowired
    ShpImportService importService;

    @Autowired
    LegaldongService legaldongService;
    
    @Autowired
    DataCntcService dataCntcService;
    
    
//    //private SqlSession sqlsession;
//    public void setSqlSessionFactory(SqlSessionFactory sqlSessionFactory) {
//     this.sqlSessionFactory = sqlSessionFactory;
//    }

    // 연속지적정보
    @RequestMapping("/cbnd")
    public String cbnd(HttpServletRequest request, @RequestParam Map<String, String> params) {
        return "admin/dic/cbnd";
    }
    
    // 연속지적도 API연계 테스트
    @ResponseBody
    @RequestMapping(value = "/cbndAPI")
    public String cbndAPI(HttpServletRequest req, HttpServletResponse res) throws Exception {
    	String solrServerUrl = prop.getProperty("solrUrl") + "/tb_cbnd_info";
    	String days =  DateUtil.getCurrentDateTimeBeforeOneDayHHMI();	
    	// vworld 연속지적도 API연계
    	dataCntcService.cbndAPIDo();
    	// Solr-data import
    	dataCntcService.dataImportDo(solrServerUrl, days, days, "240");
    	return "true";
    }

    // 지구단위계획
    @RequestMapping("/develop")
    public String develop(HttpServletRequest request, @RequestParam Map<String, String> params) {
        return "admin/dic/develop";
    }

    @RequestMapping("/develop/import")
    @ResponseBody
    public Map<String, Object> develop(MultipartRequest request, HttpServletRequest rq, @ModelAttribute DicUpload dicUpload) throws Exception {


        List<MultipartFile> mf = dicUpload.getShpFiles();

        if (mf == null) {
            throw new BadRequestException("첨부파일이 없습니다.");
        }

//        if (!"shp".equalsIgnoreCase(FilenameUtils.getExtension(mf.getOriginalFilename()))) {
//            throw new BadRequestException("shp 파일만 업로드 가능합니다.");
//        }

        DicUpload rs = importService.insertShpData(dicUpload);
        
    	//System.out.println(dicUpload.getDicTblNm() + " 테이블 ");

        // 행정구역 emd 데이터는 db 적재 후 vacuum 실행 (update문으로 발생한 dead tuble 삭제)
//        if(dicUpload.getDicTblNm() == "tb_legaldong_emd") {
//        	int vacuumResult = importService.vacuuming(dicUpload.getDicTblNm());
//        	System.out.println(dicUpload.getDicTblNm() + " 테이블 vaccum 실행 : "+vacuumResult);
//        }
        

        Map result = new HashMap();
        result.put("result", "success");
        result.put("dicNm", rs.getDicNm());
        result.put("cnt", rs.getCrtCnt());
        return result;
    }

    // 도시계획정보
    @RequestMapping("/road-plan")
    public String roadPlan(HttpServletRequest request, @RequestParam Map<String, String> params) {
        return "admin/dic/roadPlan";
    }

    // 지명정보
    @RequestMapping("/poi-point")
    public String poiPoint(HttpServletRequest request, @RequestParam Map<String, String> params) {
        return "admin/dic/poiPoint";
    }

    // 표준노드링크정보
    @RequestMapping("/node-link")
    public String nodeLink(HttpServletRequest request, @RequestParam Map<String, String> params) {
        return "admin/dic/nodeLink";
    }

    // 새주소정보
    @RequestMapping("/road-name")
    public String roadName(HttpServletRequest request, @RequestParam Map<String, String> params) {
        return "admin/dic/roadName";
    }
    
    // 새주소정보 - 테스트
    @RequestMapping("/road-name2")
    public String roadName2(HttpServletRequest request, @RequestParam Map<String, String> params) {
        return "admin/dic/roadName2";
    }
    
    // api
    @GetMapping("/legaldong/li")
    @ResponseBody
    public Map legaldongLi(@RequestParam Map param) throws Exception {
    	return legaldongService.getLiList(param);
    }
    
    // 행정경계 API연계
    @ResponseBody
    @RequestMapping(value = "/legaldongAPI")
    public String legaldongAPI(HttpServletRequest req, HttpServletResponse res) throws Exception {
    	
    	// vworld 연속지적도 API연계
    	dataCntcService.legaldongAPIDo();
    	
    	String solrServerUrl_sido = prop.getProperty("solrUrl") + "/legaldong_sido";
    	String solrServerUrl_sgg = prop.getProperty("solrUrl") + "/legaldong_sgg";
    	String solrServerUrl_emd = prop.getProperty("solrUrl") + "/legaldong_emd";
    	String solrServerUrl_li = prop.getProperty("solrUrl") + "/legaldong_li";
    	String days =  DateUtil.getCurrentDateTimeBeforeOneDayHHMI();
    	
    	// Solr-data import
    	dataCntcService.dataImportDo(solrServerUrl_sido, days, days, "");
    	dataCntcService.dataImportDo(solrServerUrl_sgg, days, days, "");
    	dataCntcService.dataImportDo(solrServerUrl_emd, days, days, "");
    	dataCntcService.dataImportDo(solrServerUrl_li, days, days, "");
    	
    	return "true";
    }

    // 행정구역 시도정보
    @RequestMapping("/legaldong")
    public String legaldong(HttpServletRequest request, @RequestParam Map<String, String> params) {
        return "admin/dic/legaldong";
    }

    // 고속도로기점표지정보
    @RequestMapping("/cdpnt-sgnal")
    public String cdpntSgnal(HttpServletRequest request, @RequestParam Map<String, String> params) {
        return "admin/dic/cdpntSgnal";
    }

    // 도로중심선
    @RequestMapping("/center-line")
    public String centerLine(HttpServletRequest request, @RequestParam Map<String, String> params) {
        return "admin/dic/centerLine";
    }

    // 유고정보
    @RequestMapping("/accident")
    public String accident(HttpServletRequest request, @RequestParam Map<String, String> params) {
        return "admin/dic/accident";
    }
    
    /**
    * 도로대장 49종 연계
    * @param resultno
    * @return
    * @throws Exception
    */
    @GetMapping("/reqLayerInfo/{resultno}")
    @ResponseBody
    public void reqLayerInfo(@PathVariable("resultno") String resultno, HttpServletRequest request) throws Exception {
        List<Map<String, Object>> roadInfoList = null;
        List<Map<String, Object>> roadLayerList = null;
    	
    	try {
    		if(resultno!=null) {
	    		// 도로 정보(도로노선번호:4자리, 도로구간번호:2자리)
	    		roadInfoList = dataCntcService.selectRoadInfoList(resultno);
	    		// 도로대장 레이어 정보(레이어 ID, 레이어물리명)
	    		roadLayerList = dataCntcService.selectRoadLayerList(resultno);
	    		
	    		if(roadInfoList.size() > 0 && roadLayerList.size() > 0) {
	    			for (Map<String, Object> roadInfo : roadInfoList) {
	    				for (Map<String, Object> roadLayer : roadLayerList) {
	    					String roadNo = roadInfo.get("roadNo").toString();
	    					String layId = roadLayer.get("layId").toString();
	    					String sect = roadInfo.get("sect").toString();
	    					String layNm = roadLayer.get("layNm").toString();
            				String layColor = roadLayer.get("layColor").toString();
            				String layImg = "data:image/jpeg;base64," + roadLayer.get("layImg").toString();
	    					dataCntcService.setLayerInfo(roadNo, layId, sect, layNm, layColor, layImg);
	    				}
	    			}
	    		}
    		}
    	} catch (Exception e) {
    		e.printStackTrace();
    	}

    }
    
    /**
     * 도로대장 49종 요청 결과 조회
     * @param resultno
     * @return
     * @throws Exception
     */
     @GetMapping("/getLayerInfo/{resultno}")
     @ResponseBody
     public Map<String, Object> getLayerInfo(@PathVariable("resultno") String resultno, HttpServletRequest request) throws Exception {
    	 Map<String, Object> resultMap = new HashMap<String, Object>();
    	 List<List<Map<String, Object>>> layerDataList = new ArrayList<List<Map<String, Object>>>();
         List<Map<String, Object>> roadInfoList = null;
         List<Map<String, Object>> roadLayerList = null;
         String flag = "N";
     	
     	try {
     		if(resultno!=null) {
 	    		// 도로 정보(도로노선번호:4자리, 도로구간번호:2자리)
 	    		roadInfoList = dataCntcService.selectRoadInfoList(resultno);
 	    		// 도로대장 레이어 정보(레이어 ID, 레이어물리명)
 	    		roadLayerList = dataCntcService.selectRoadLayerList(resultno);
 	    		if(roadInfoList.size() > 0 && roadLayerList.size() > 0) {
 	    			for (Map<String, Object> roadInfo : roadInfoList) {
 	    				for (Map<String, Object> roadLayer : roadLayerList) {
 	    					List<Map<String, Object>> dataList = new ArrayList<Map<String, Object>>();
 	    					String roadNo = roadInfo.get("roadNo").toString();
 	    					String sect = roadInfo.get("sect").toString();
 	    					String layNm = roadLayer.get("layNm").toString();
 	    					flag = dataCntcService.checkLayerInfo(roadNo, sect, layNm);
 	    					if(flag == "N") {
 	    						resultMap.put("result", "N");
 	    						return resultMap;
 	    					}
 	    					// 요청 정보
 	    		 	       	Map<String, Object> dataMap = new HashMap<>();
 	    		 	   		dataMap.put("roadNo", roadNo);
 	    		 	   		dataMap.put("sect", sect);
 	    		 	   		dataMap.put("layNm", layNm);
 	    		 	   		dataList = dataCntcService.selectRoadLayerDataList(dataMap);
 	    		 	   		layerDataList.add(dataList);
 	    				}
 	    			}
 	    		}
 	    		resultMap.put("result", "Y");
 	    		resultMap.put("layerInfo", roadLayerList);
 	    		resultMap.put("layerDataList", layerDataList);
     		}
     	} catch (Exception e) {
     		e.printStackTrace();
     	}

     	return resultMap;
     }
    
    
    // 전체분 전체 자료 최초 1회 데이터 일괄 적재(기초번호_txt + 도로명이 부여된 도로 도형_shp)
    @GetMapping("/road-name/DataCntcAll")
    @ResponseBody
    public void roadNameDataCntcAll(HttpServletRequest request, @RequestParam Map param) throws Exception {
    	Map<String, Object> fileMap = new HashMap<>();
    	fileMap.put("filePath", prop.getProperty("dataCntAllPath"));
    	dataCntcService.insertRoadNameAllDo(fileMap);
    }
    
    // 전체분 데이터을 기존 새주소도로명 테이브에 최초 1회 마이그레이션 처리(기초번호_txt + 도로명이 부여된 도로 도형_shp)
    @GetMapping("/road-name/DataCntcAllMig")
    @ResponseBody
    public void roadNameDataCntcAllMig(HttpServletRequest request, @RequestParam Map param) throws Exception {
    	String solrServerUrl = prop.getProperty("solrUrl") + "/tl_road_name";
    	String solrAdminUrl = prop.getProperty("solrUrl") + "/admin";
    	String days =  DateUtil.getCurrentDateTimeBeforeOneDayHHMI();	
    	dataCntcService.roadNameDataCntcAllMigDo();
    	// Solr-data import
    	dataCntcService.dataImportDo(solrServerUrl, days, days, "");
		// Solr-Core Reload
    	//dataCntcService.coreReloadDo(solrAdminUrl, "tl_road_name");
    }
    
    // 변동분 자료 다운로드 후 변동분 데이터 적재 & 일 변동 자료의 변동사유(생성,변동,폐지)에 따른 처리
    @GetMapping("/road-name/DataCntcChange")
    @ResponseBody
    public void roadNameDataCntcChange(HttpServletRequest request, @RequestParam Map param) throws Exception {
    	String solrServerUrl = prop.getProperty("solrUrl") + "/tl_road_name";
    	String solrAdminUrl = prop.getProperty("solrUrl") + "/admin";
    	String days =  DateUtil.getCurrentDateTimeBeforeOneDayHHMI();	
    	dataCntcService.roadNameDataCntcChangeDo();
    	// Solr-data import
    	dataCntcService.dataImportDo(solrServerUrl, days, days, "");
		// Solr-Core Reload
    	//dataCntcService.coreReloadDo(solrAdminUrl, "tl_road_name");
    }
    
    // 변동분 자료 다운로드 후 변동분 데이터 적재 & 일 변동 자료의 변동사유(생성,변동,폐지)에 따른 처리 - 테스트
    @GetMapping("/road-name/DataCntcChange2")
    @ResponseBody
    public void roadNameDataCntcChange2(HttpServletRequest request, @RequestParam Map param) throws Exception {
    	String solrServerUrl = prop.getProperty("solrUrl") + "/tl_road_name";
    	String solrAdminUrl = prop.getProperty("solrUrl") + "/admin";
    	String days =  DateUtil.getCurrentDateTimeBeforeOneDayHHMI();	
    	dataCntcService.roadNameDataCntcChangeDo();
    	// Solr-data import
    	dataCntcService.dataImportDo(solrServerUrl, days, days, "");
		// Solr-Core Reload
    	//dataCntcService.coreReloadDo(solrAdminUrl, "tl_road_name");
    }
   
}
