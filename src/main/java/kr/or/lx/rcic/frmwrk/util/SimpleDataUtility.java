package kr.or.lx.rcic.frmwrk.util;

import lombok.extern.slf4j.Slf4j;
import net.sf.json.JSONArray;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;


@Slf4j
public class SimpleDataUtility {

    private SimpleDataUtility() {
    }

    @SuppressWarnings("unchecked")
   	public static HashMap<String, Object> getDataJson(HttpServletRequest request) {
       	
   		String strParamList = CmmnUtil.deXss(CmmnUtil.checkNull(request.getParameter("paramList"), ""));
   		JSONArray paramList = JSONArray.fromObject(strParamList);
   		HashMap<String, Object> resultMap = new HashMap<String, Object>();
   		
   		try {
   			resultMap = CmmnUtil.convertJsonToObject(CmmnUtil.checkNull(paramList.getJSONObject(0),""));
   		} catch (Exception e) { 
   			CmmnUtil.setLog(e.getMessage());
   		}
           return resultMap;
       }
    
    @SuppressWarnings("unchecked")
	public static SimpleData getData(HttpServletRequest req) {
    	
    	SimpleData data = new SimpleData();
    	String strParamList = CmmnUtil.deXss(CmmnUtil.checkNull(req.getParameter("paramList"), ""));
		JSONArray paramList = JSONArray.fromObject(strParamList);
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		
		try {
			resultMap = CmmnUtil.convertJsonToObject(CmmnUtil.checkNull(paramList.getJSONObject(0),""));
			
			int curr_page = resultMap.get("curr_page")==null ?1: Integer.parseInt(String.valueOf(resultMap.get("curr_page")));
			int list_cnt = resultMap.get("list_cnt")==null ?10: Integer.parseInt(String.valueOf(resultMap.get("list_cnt")));
			
			resultMap.put("curr_page", curr_page);
			resultMap.put("list_cnt", list_cnt);
			
		} catch (Exception e) { 
			
			CmmnUtil.setLog(e.getMessage());
		}
			data.putAll(resultMap);
			
        return data;
    }

    @SuppressWarnings({ "unchecked", "rawtypes" })
	public static SimpleMultiData getMultiData(HttpServletRequest req)
    {
    	SimpleMultiData multiData = new SimpleMultiData("requestbox");
        String key;
        ArrayList list;
        for(Enumeration e = req.getParameterNames(); e.hasMoreElements(); multiData.put(key, list))
        {
            key = (String)e.nextElement();
            String values[] = req.getParameterValues(key);

            list = new ArrayList();
            for(int i = 0; i < values.length; i++) {
                list.add(values[i]);
            }
        }

        return multiData;
    }

    // 2012 - 3 - 22 추가함 ( 심플데이터 를 VO 형태로 치환해주는 메소드 )
    public static Object SimpleDataToValueObject(SimpleData data, Class src) throws Exception {

    	Object returnValue = src.newInstance();
	    Class superClass = src;
	    Field[] field  = superClass.getDeclaredFields();

	    for(int i = 0; i < field.length ; i++) {
	    	if (data.containsKey( field[i].getName() )) {
	    		String methodName = "set" + field[i].getName().substring(0, 1).toUpperCase() + field[i].getName().substring(1);
	    		Method method = superClass.getMethod(methodName, field[i].getType() );

                Object argument[] = {
                		getObjectValueByType(field[i].getType(), data.getString(field[i].getName())  )
                };

                method.invoke( returnValue , argument );
	    	}
	    }

	    return returnValue;
	}


    private static Object getObjectValueByType(Class type, String value) {

        Object returnValue = null;
        if(Byte.TYPE == type || Byte.class == type) {
            returnValue = new Byte(Byte.parseByte(value));
        } else if(Integer.TYPE == type || Integer.class == type) {
        	if(value.equals(""))  value = "0";
            returnValue = new Integer(Integer.parseInt(value.replaceAll(",", "")));
        } else if(Long.TYPE == type || Long.class == type) {
        	if(value.equals(""))  value = "0";
            returnValue = new Long(Long.parseLong(value.replaceAll(",", "")));
        } else if(Double.TYPE == type || Double.class == type) {
        	if(value.equals(""))  value = "0";
            returnValue = new Double(Double.parseDouble(value.replaceAll(",", "")));
        } else if(Float.TYPE == type || Float.class == type) {
        	if(value.equals(""))  value = "0";
            returnValue = new Float(Float.parseFloat(value.replaceAll(",", "")));
        } else if(Character.TYPE == type || Character.class == type) {
            char charArr[] = value.toCharArray();
            returnValue = new Character(charArr[0]);
        } else if(Boolean.TYPE == type || Boolean.class == type) {
            returnValue = new Boolean(value);
        } else {
        	if(String.class == type) {
        		returnValue = value;
        	}
        }
        return returnValue;

    }
}