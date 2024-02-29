
package kr.or.lx.rcic.frmwrk.util;

import lombok.extern.slf4j.Slf4j;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.rmi.dgc.VMID;
import java.util.*;
import java.util.Map.Entry;
 


/**
 * @Class Name : CmmnUtil.java
 * @Description : 공용으로 쓰는 유틸
 * @Modification   Information
 * @
 * @  수정일        수정자              수정내용
 * @ ---------    ---------   -------------------------------
 * @ 2018.03.08    김한욱	    	 최초생성
 * 
 * @author  unimind 김한욱 
 * @since   2018.03.08
 * @version   1.0
 * @see
 * 
 *    Copyright (C) by unimind All right reserved.
 */
@Slf4j
public class CmmnUtil {
    
	private final static String USER_AGENT = "Mozilla/5.0";
	
	public static String toTEXT(String str) {
		if(str == null)
		return null;

		String returnStr = str;
		returnStr = returnStr.replaceAll("#40;", "(");
		returnStr = returnStr.replaceAll("#41", ")");
		returnStr = returnStr.replaceAll("& ", "");
		returnStr = returnStr.replaceAll(";", "");
		return returnStr;

		}

    /**
    * <PRE> 아 완전 짜증나는구만 이거
    * DESC : _ 포함된 변수를 카멜형식으로 변환한다.
    * EX : LAND_INFO -> landInfo
    * </PRE>
    *   */
    public static String toCamelCase(String str) throws Exception {

        String result = "";
        String[] arr = checkNull(str,"").toLowerCase().split("_");
        for ( int i = 0 ; i < arr.length; i ++) {
            if( i == 0 ) {
                result += arr[i];
            } else {
                result += arr[i].substring(0,1).toUpperCase()+arr[i].substring(1,arr[i].length());
            }
        }
        return result;
    }
    public static void setLog(String str){
		log.error(str);
    }
    
    /** 
	 * <PRE>
	 * DESC : 사용자가 입력한 문자열에서 <, >, &, "," 등의 특수 문자를 replaceAll 등의 문자 변환 메소드를 사용하여 &lt;, &gt;, &amp;,&quot;, NULL로 치환합니다.
			   아래의 예제와 같이 외부 입력 문자열에서 replceAll() 메소드를 사용하여 < 와 > 같이 
			  HTML에서 스크립트 생성에 사용되는 모든 문자열을 &lt; &gt; &amp; &quot; 같은 형태 로 변경함으로써 악의적인 스크립트 수행의 위험성을 줄임. 
	 * </PRE>
	 *   */
	public static String converterReplace(String str) throws Exception {
		
		String result = "";
		
		if ( str != null ) { 
			result = str.replaceAll("<", "&lt;" );
			result = str.replaceAll(">", "&gt;" );
			result = str.replaceAll("&", "&amp;" );
			result = str.replaceAll("\"","&quot;" ) ; 
		} 
		 
		return result;
	}

  


    /**
    * response 오류 메세지 세팅
    * */
    @SuppressWarnings({ "unchecked", "rawtypes" })
    public static void setResponseErrorData(HttpServletResponse response,Object errMsg) throws Exception{
        HashMap responseMap = new HashMap();
        responseMap.put("status", "failure");
        responseMap.put("result", errMsg);
        //response.setContentType("APPLICATION/json");
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String json = new ObjectMapper().writeValueAsString(responseMap);
        response.getWriter().print(json);
    }
    /** json파싱을 위한 xss역변환 */
    public static String deXss(String str) {
    	String value ="";
    	if(str!=null){
    		value = str.replaceAll("&#39;",  "\"").replaceAll("&quot;", "\"");	
    	}
        return value;
    }



    /**
    * http://levin01.tistory.com/372
    * 유일 아이디 생성
    * */
    public static String getVMID(){
        VMID getUID = new VMID();
        String getStrUID = String.valueOf(getUID).toUpperCase();
        return getStrUID.replaceAll("-","").replaceAll(":", "");
    }
 

    /**
    * [Json String] 객체를 [MAP] 객체로 변환한다.
    * */
    @SuppressWarnings("rawtypes")
    public static HashMap convertJsonToObject(String json) throws Exception {
       ObjectMapper objectMapper = new ObjectMapper();
       TypeReference<HashMap<String, Object>> typeReference = new TypeReference<HashMap<String, Object>>() { };
       HashMap object = objectMapper.readValue(json, typeReference);
       return object;
   }



    /**
    * NULL 체크하여 NULL일 경우 iValue 값으로 리턴
    */
    public static String checkNull(Object str, String sValue) {
    	Object strs = str;
    	String value = sValue;
        if ( strs == null || strs.equals("") ) {
        	strs = value;
        }
        return String.valueOf(strs);
    }


    /**
    * GET 메소드 HTTP 메소드 통신
    * */
    public static String sendGet(String targerUrl) throws Exception {
    	

    	URL url = new URL(targerUrl);
    	HttpURLConnection con = (HttpURLConnection) 
    			
		url.openConnection(); con.setRequestMethod("GET"); // optional default is GET 
		con.setRequestProperty("User-Agent", USER_AGENT); // add request header 
		int responseCode = con.getResponseCode(); 
		BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream())); 
		String inputLine; 
		StringBuffer response = new StringBuffer(); 
		while ((inputLine = in.readLine()) != null) { 
			response.append(inputLine); 
			} 
		in.close(); // print result 
		
		return response.toString();

   }

    /**
    * POST 메소드 HTTP 메소드 통신
    * */
    public static String sendPost(String targerUrl, String sendParam, String cs ) throws Exception {
    	String targerUrls = targerUrl;
    	String sendParams = sendParam;
    	String csType = cs;
        if( checkNull(csType,"").equals("") ) {
        	csType = "UTF-8";
        }

        StringBuffer sb = new StringBuffer();
        URL    url     = null;
        HttpURLConnection huc= null;
        String szReadLine = null;
        BufferedReader in = null;

        url = new URL(targerUrls);
        huc = (HttpURLConnection)url.openConnection();

        huc.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
        huc.setRequestMethod("POST");
        huc.setDoOutput(true);
        huc.setDoInput(true);
        huc.setUseCaches(false);
        huc.setDefaultUseCaches(false);

        OutputStream os = huc.getOutputStream();
        os.write(sendParams.getBytes(csType));
        os.flush();

        try {
        	in = new BufferedReader(new InputStreamReader(huc.getInputStream() , csType));
            if(in != null){
                while((szReadLine = in.readLine()) != null){
                    sb.append( szReadLine );
                }
            }
		}finally{
			if (in != null) {
				try {
					in.close();
				} catch (Exception e) {
					CmmnUtil.setLog(e.getMessage());
				}
			}
			if (os != null) {
				try {
					os.close();
				} catch (Exception e) {
					CmmnUtil.setLog(e.getMessage());
				}
			}
		}
        
        in.close();

        return sb.toString();
    }
    
    
public static HashMap<String, Object> sendPostMap(String targerUrl, String sendParam, String cs ) throws Exception {
    	
    	String targerUrls = targerUrl;
    	String sendParams = sendParam;
    	String csType = cs;
    	
        if( checkNull(csType,"").equals("") ) {
        	csType = "UTF-8";
        }

        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        
        StringBuffer sb = new StringBuffer();
        URL    url     = null;
        HttpURLConnection huc= null;
        String szReadLine = null;
        BufferedReader in = null;

        url = new URL(targerUrls);
        huc = (HttpURLConnection)url.openConnection();

        //huc.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
        huc.setRequestProperty("Content-Type", "application/json");
        huc.setRequestMethod("POST");
        huc.setDoOutput(true);
        huc.setDoInput(true);
        huc.setUseCaches(false);
        huc.setDefaultUseCaches(false);
        
        OutputStream os = huc.getOutputStream();
        os.write(sendParams.getBytes(csType));
        os.flush();

        try {
        	
        	resultMap.put("code", huc.getResponseCode());
            resultMap.put("msg", huc.getResponseMessage());
        	
        	in = new BufferedReader(new InputStreamReader(huc.getInputStream() , csType));
            if(in != null){
                while((szReadLine = in.readLine()) != null){
                    sb.append( szReadLine );
                }
            }
            resultMap.put("data", sb.toString());
            
		}catch (Exception e) {
			resultMap.put("msg", e.getMessage());
			resultMap.put("code", huc.getResponseCode());
		}
        finally{
			if (in != null) {
				try {
					in.close();
				} catch (Exception e) {
					CmmnUtil.setLog(e.getMessage());
				}
			}
			if (os != null) {
				try {
					os.close();
				} catch (Exception e) {
					CmmnUtil.setLog(e.getMessage());
				}
			}
		}
        
        in.close();
        return resultMap;
    }

    /**
    * List<HashMap> 안의 항목 중 원하는 항목을 선택, 추출한다.
    * @author  김한욱  
    */
    @SuppressWarnings({ "rawtypes", "unchecked" })
    public static List<HashMap> valueSelectList(List<HashMap> resultList, String[] props) {

        HashMap<String, Object> tempMap = new HashMap<String, Object>();
        List<HashMap> newList = new ArrayList<HashMap>();
        if(resultList!=null){
	        for (int i = 0; i < resultList.size(); i++) {
	            HashMap<String, Object> newMap = new HashMap<String, Object>();
	            tempMap = resultList.get(i);
	            Iterator iterator = tempMap.entrySet().iterator();
	            while (iterator.hasNext()) {
	                Entry entry = (Entry)iterator.next();
	                if(props!=null){
		                for (int j = 0; j < props.length; j++) {
		                    if (props[j].equals(entry.getKey())) {
		                        newMap.put(entry.getKey().toString(), checkNull(entry.getValue(),""));
		                    }
		                }
	                }
	            }
	            newList.add(newMap);
	        }
        }
        return newList;
    }
    /** 요청파라미터를 맵객체로 변환한다. */
    @SuppressWarnings("unchecked")
    public static HashMap<String,Object> paramToMap(HttpServletRequest request , HashMap<String,Object> param) throws Exception{
    	HashMap<String,Object> parameterMap = new HashMap();
    	Enumeration enums = request.getParameterNames();
    	
    	while(enums.hasMoreElements()){
    		String paramName = (String)enums.nextElement();
    		String[] parameters = request.getParameterValues(paramName);

    	// Parameter가 배열일 경우
	    	if(parameters.length > 1){
	    		parameterMap.put(paramName, parameters);
	    		// Parameter가 배열이 아닌 경우
	    	}else{
	    		parameterMap.put(paramName, parameters[0]);
	    	}
    	}

    	return parameterMap;
    } 
}
