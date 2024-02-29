package kr.or.lx.rcic.modules.dashboard.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Properties;

import javax.activation.MimetypesFileTypeMap;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.IOUtils;
import org.apache.htrace.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.UrlResource;
import org.springframework.core.io.support.ResourceRegion;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpRange;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import egovframework.rte.psl.dataaccess.util.EgovMap;
import kr.or.lx.rcic.egovframework.cmmn.util.EgovMessageSource;
import kr.or.lx.rcic.frmwrk.util.CmmnUtil;
import kr.or.lx.rcic.frmwrk.util.SimpleData;
import kr.or.lx.rcic.frmwrk.util.SimpleDataUtility;
import kr.or.lx.rcic.frmwrk.web.BaseController;
import kr.or.lx.rcic.modules.dashboard.service.DashboardService;
import lombok.extern.slf4j.Slf4j;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Slf4j
@Controller
@RequestMapping("/rcic")
public class DashboardController extends BaseController {

	@Value("#{contextProperties}")
	Properties prop = new Properties();
	
	@Resource(name="egovMessageSource")
    EgovMessageSource egovMessageSource;

	@Autowired
	DashboardService dashboardService;
	
	/**
	 * 대시보드
	 * @param model
	 * @param param
	 * @param req
	 * @param res
	 * @param mv
	 * @return
	 */
	@RequestMapping(value = "/dashboard")
	public ModelAndView dashboardPage(ModelMap model, @RequestParam Map<String, Object> param, HttpServletRequest req, HttpServletResponse res, ModelAndView mv){

		String clientIp = req.getHeader("X-FORWARDED-FOR");
        if (clientIp == null)
        	clientIp = req.getRemoteAddr();
	    HttpSession session = req.getSession(true);
	    session.setAttribute("clientIp", clientIp);
	        
//		String menuId = req.getParameter("menuId")==null?"main":(String)req.getParameter("menuId");
//		mv.addObject("menuId",menuId);
	    mv.addObject("mapUrl", prop.getProperty("GeoserverIP"));
		model.addAttribute("param", param);
		model.addAttribute("clientIp", clientIp);
		mv.addAllObjects(model);
		mv.setViewName("dashboard/dashboard");
		return mv;
	}
	
	/**
	 * api 사용현황(호출현황)
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/dashboard/getApiUseStats")
    public Map<String, Object> getApiUseStats(HttpServletRequest request, HttpServletResponse res) throws Exception {
		SimpleData paramMap = getSimpleData(request);
    	String startDt = (String) paramMap.get("startDt");
		String endDt = (String) paramMap.get("endDt");
		
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("startDt", startDt);
		param.put("endDt", endDt);
		
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("count", dashboardService.getApiUseStatusCount(param));
        return resultMap;
    }
	
	/**
	 * 주요변경정보(호출)
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/dashboard/getCallStats")
	public List<Map<String, Object>> getApiCallStats(@RequestParam Map<String, Object> param) throws Exception {
	    List<Map<String, Object>> list = dashboardService.getApiUseStatsList(param);
	    return list;
	}
	 
	/**
	 * 날씨 정보 가져오기(openWeather API)
	 * @param request
	 * @param res
	 * @return
	 * @throws Exception
	 */
    @ResponseBody
    @RequestMapping(value = "/dashboard/getWheatherInfo")
    public Map<String, Object> getWheatherInfo(HttpServletRequest request, HttpServletResponse res) throws Exception{
    	
    	SimpleData paramMap = getSimpleData(request);
    	String lat = (String) paramMap.get("lat");
		String lon = (String) paramMap.get("lon");
    	
    	LinkedHashMap<String, Object> param = new LinkedHashMap<String, Object>();
    	param.put("appid", prop.getProperty("weatherKey"));
    	param.put("units", "metric");
    	param.put("lat", lat);
    	param.put("lon", lon);
		
		String url = "https://api.openweathermap.org/data/2.5/weather";
		String result = apiHttpConnection(url, param);
		
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("result", JSONObject.fromObject(result.toString()));
		
        return resultMap;
    }
    
    /**
     * cctv api
     * @param request
     * @param res
     * @return
     * @throws Exception
     */
    @ResponseBody
    @RequestMapping(value = "/dashboard/getCctvApi")
    public Map<String, Object> getCctvApi(HttpServletRequest request, HttpServletResponse res) throws Exception{
    	
    	LinkedHashMap<String, Object> paramMap = new LinkedHashMap<String, Object>();
    	paramMap.put("apiKey", prop.getProperty("cctvKey"));
    	paramMap.put("type", "its");
    	paramMap.put("cctvType", "1");
    	paramMap.put("minX", 124.5);
    	paramMap.put("minY", 33.0);
    	paramMap.put("maxX", 132.0);
    	paramMap.put("maxY", 38.9);
    	paramMap.put("getType", "json");
		
		String url = "https://openapi.its.go.kr:9443/cctvInfo";
		String result = apiHttpConnection(url, paramMap);
		
		JSONObject resultObj = new JSONObject();
		if(result != null && !result.equals("")) {
			JSONObject responseObj = JSONObject.fromObject(result).getJSONObject("response");
			if(!responseObj.isNullObject()) {
				JSONArray dataArr = responseObj.getJSONArray("data");
				
				HashSet<String> routeSet = new HashSet<String>();
				JSONArray listArr = new JSONArray();
				JSONObject newObj = new JSONObject();
				
				for(int i = 0; i < dataArr.size(); i++) {
					JSONObject dataObj = dataArr.getJSONObject(i);
					String cctvName = dataObj.getString("cctvname");
					if(cctvName.indexOf("[") > -1) {
						String cctvUrl = dataObj.getString("cctvurl");
						String route = cctvName.substring(cctvName.indexOf("[")+1, cctvName.indexOf("]"));
						String routeNo = route.replace(" ", "").replace("국도", "").replace("호선", "");
						String newCctvName = cctvName.substring(cctvName.lastIndexOf("]")+1, cctvName.length()).trim();
						
						newObj.put("cctvname", cctvName);
						newObj.put("cctvurl", cctvUrl);
						newObj.put("route", route);
						newObj.put("routeNo", routeNo);
						newObj.put("cctvNm", newCctvName);
						
						listArr.add(newObj);
						routeSet.add(routeNo);
					}
				}
				List<String> routeList = new ArrayList<String>(routeSet); 
				Collections.sort(routeList);
				
				resultObj.put("success", true);
				resultObj.put("routeList", routeList);
				resultObj.put("list", listArr);
				resultObj.put("totalCnt", responseObj.getInt("datacount"));
			} else {
				resultObj.put("success", false);
			}
		} else {
			resultObj.put("success", false);
		}
		
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		//resultMap.put("result", JSONObject.fromObject(result.toString()).getJSONObject("response"));
		resultMap.put("result", resultObj );
		
        return resultMap;
    }
    
    /**
     * httpUrlConnection
     * @param sUrl
     * @param paramMap
     * @param uniqueKey
     * @return
     */
    private String apiHttpConnection(String sUrl, Map<String, Object> paramMap) {
		HttpURLConnection conn = null;
		BufferedReader rd = null;
		StringBuilder sb = new StringBuilder();
		try {
			StringBuilder paramBuilder = new StringBuilder();
			for (Map.Entry<String, Object> entry : paramMap.entrySet()) {
				paramBuilder.append(paramBuilder.length() > 0 ? "&" : "").append(entry.getKey()).append("=").append(URLEncoder.encode(String.valueOf(entry.getValue()), "UTF-8"));
			}

			URL url = new URL(new StringBuffer().append(sUrl).append("?").append(paramBuilder).toString());
			conn = (HttpURLConnection) url.openConnection();
			conn.setUseCaches(false);
			conn.setRequestMethod("GET");
			conn.setDoOutput(true);
			
			int responseCode = conn.getResponseCode();
			if (responseCode >= 200 && responseCode <= 300) {
				rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			} else {
				rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
			}
			String line;
			while ((line = rd.readLine()) != null) {
				sb.append(line);
			}
			rd.close();
			conn.disconnect();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (rd != null) {
				try {
					rd.close();
				} catch (Exception e) {
					CmmnUtil.setLog(e.getMessage());
				}
			}
		}
		return sb.toString();
	}
	
	/**
     * DB로부터 GPS 데이터를 받아온다.
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/dashboard/getGPSData")
    @ResponseBody
    public Map<String, Object> getGPSData(HttpServletRequest request, HttpServletResponse response) throws Exception {
    	LinkedHashMap<String, Object> resultMap = new LinkedHashMap<>();
    	HashMap<String, Object> params = SimpleDataUtility.getDataJson(request);
    	    	
    	List<EgovMap> result = dashboardService.getGPSData(params); 
    	
    	resultMap.put("result", result);
    	
    	return resultMap;
    }
    
    /**
     * WFS 호출
     * @param request
     * @param xmlParameter
     * @param methodType
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/dashboard/getWFS", produces="application/json;charset=UTF-8")
    @ResponseBody
    public String WFSService(HttpServletRequest request, @RequestBody String xmlParameter) throws Exception {
    	//String geoURL = "http://geonworks.iptime.org:20004/geoserver/RCIC/wfs";
    	String geoURL = prop.getProperty("GeoserverIP") + "/RCIC/wfs";
		RestTemplate restTemplate = new RestTemplate();
				
		String param = JSONObject.fromObject(xmlParameter).getString("params");
		
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.valueOf("application/xml"));
		
		URL url = new URL(geoURL);
		HttpEntity<String> req = new HttpEntity<>(param, headers);
		ResponseEntity<String> resp = restTemplate.postForEntity(url.toURI().toString(), req, String.class);;
		//System.out.println(resp.getBody());
		
		return resp.getBody().toString();
    }
    
    @RequestMapping(value = "/dashboard/getImgDownload")
	public void dashboardImageDownload(@RequestParam(name = "seq", required = true) Long seq, HttpServletRequest request, HttpServletResponse response) throws Exception {
    	Map<String, Object> param = new HashMap<String, Object>();
        param.put("seq", seq);
        EgovMap attFile = dashboardService.selectTrafficInfo(param);
        
        if (attFile == null) {
            log.warn("존재하지 않는 파일 정보를 요청하였음. 파일ID: {}", seq);
            //throw new BadRequestException("존재하지 않는 파일ID:" + seq);
        } else {
        	String filePath = attFile.get("realFilePath").toString();
        	if (!filePath.endsWith("/")) filePath += "/";
        	String fullFilePath = filePath + attFile.get("realFileName").toString();
        	
        	File localFile = new File(fullFilePath);
        	if (localFile.exists() == false) {
        		throw new RuntimeException("서버에 파일이 존재하지 않습니다.");
        	}
        	
        	String downloadFileName = attFile.get("realFileName").toString();
        	String encodedFileName = new String(downloadFileName.getBytes("UTF-8"), "ISO-8859-1");
        	
        	response.setHeader("Content-Disposition", "attachment; filename=\"" + encodedFileName + "\";");
        	response.setHeader("Content-Transfer-Encoding", "binary");
        	
        	OutputStream out = response.getOutputStream();
        	InputStream fis = null;
        	try {
        		fis = new FileInputStream(localFile);
        		FileCopyUtils.copy(fis, out);
        	} catch (Exception e) {
        		CmmnUtil.setLog(e.getMessage());
        	} finally {
        		IOUtils.closeQuietly(fis);
        	}
        	out.flush();
        }
        
	}
    
    @RequestMapping(value = "/dashboard/getMediaType")
    @ResponseBody
    public Map<String, Object> getMediaType(HttpServletRequest request, HttpServletResponse response) throws Exception {
    	LinkedHashMap<String, Object> resultMap = new LinkedHashMap<>();
    	HashMap<String, Object> params = SimpleDataUtility.getDataJson(request);
    	    	
    	List<EgovMap> result = dashboardService.getMediaType(params); 
    	
    	resultMap.put("result", result);
    	
    	return resultMap;
    }
    
    @RequestMapping(value = "/dashboard/getVideoDownload")
    @ResponseBody
    public ModelAndView dashboardVideoDownload(@RequestHeader HttpHeaders headers, @RequestParam(name = "seq", required = true) Long seq,
    		HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
    	/*
    	 * 안된다면 아래의 부분은 .properties에 추가
    	 * spring.jackson.serialization.fail-on-empty-beans=false 
    	*/
    	ModelAndView mv = new ModelAndView();
    	Map<String, Object> param = new HashMap<String, Object>();
        param.put("seq", seq);
        EgovMap attFile = dashboardService.selectTrafficInfo(param);
        
        if (attFile == null) {
            log.warn("존재하지 않는 파일 정보를 요청하였음. 파일ID: {}", seq);
            //throw new BadRequestException("존재하지 않는 파일ID:" + seq);
            
            throw new RuntimeException("서버에 파일이 존재하지 않습니다.");
        } else {
        	String filePath = attFile.get("realFilePath").toString();
        	if (!filePath.endsWith("/")) filePath += "/";
        	String fullFilePath = filePath + attFile.get("realFileName").toString();
        	
        	File localFile = new File(fullFilePath);
        	if (localFile.exists() == false) {
        		throw new RuntimeException("서버에 파일이 존재하지 않습니다.");
        	}
        	
        	model.addAttribute("movieFile", fullFilePath);
        	mv.setViewName("streamView");
        	
            return mv;
        }
    }    
}
