package kr.or.lx.rcic.frmwrk.web;

import kr.or.lx.rcic.egovframework.cmmn.util.StringUtils;
import kr.or.lx.rcic.frmwrk.util.SimpleData;
import kr.or.lx.rcic.frmwrk.util.SimpleDataUtility;
import kr.or.lx.rcic.frmwrk.util.SimpleMultiData;
import org.springframework.stereotype.Controller;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Controller
public class BaseController {

	/*@Resource(name = "errorLogService")
    private ErrorLogService errorLogService;*/

	/**
     * @description   심플 데이터 객체를 화면으로부터 가져온다.
     */
	
	protected HashMap<String, Object> getSimpleDataJson( HttpServletRequest request )  {
    	
        return SimpleDataUtility.getDataJson(request);
    }

    protected SimpleData getSimpleData( HttpServletRequest request )  {
    	
    	SimpleData data = SimpleDataUtility.getData(request);
    	
		if( request.getAttribute("apiKey") != null ) {
			data.setString("apiKey", request.getAttribute("apiKey").toString());
		}
		//sort field 역카멜타입으로 변경getRevCarmelType
		if( data.get("sortdatafield") != null ) {
			data.setString("sortdatafield", StringUtils.getRevCarmelType(data.get("sortdatafield").toString()));
		}
        return data;
    }

    /**
     * @description   심플 멀티 데이터 객체를 화면으로부터 가져온다.
     */
    protected SimpleMultiData getSimpleMultiData( HttpServletRequest request )  {
        return SimpleDataUtility.getMultiData(request);
    }

    /**
     * @description   심플 decode 데이터 객체를 화면으로부터 가져온다.
     */
    protected SimpleData getSimpleDecodeData( HttpServletRequest request )  {
    	return (SimpleData)request.getAttribute("decodeData");
    }

    /**
     * @description   심플멀티 decode 데이터 객체를 화면으로부터 가져온다.
     */
    protected SimpleMultiData getSimpleMultiDecodeData( HttpServletRequest request )  {
    	return (SimpleMultiData)request.getAttribute("decodeMulitData");
    }

    /**
     * @see
     * @logicalName   str 심플 데이터
     * @description   str를 을 해당 조건에 맞게 잘라서 simpleData 형태로 만들어 준다. ( 구분자1로 먼저 자르고 구분자2 를 기준으로 key value 형태로 만들어 준다. )
     * @param         문자열 str
     * @param         구분자1
     * @param         구분자2
     * @return        SimpleData
     */
    protected SimpleData getStringToSimpleData( String paramVal , String del1 , String del2 )  {
    	SimpleData result = new SimpleData();

		if (paramVal == null || paramVal.equals("")) {
			return result;
		}

		StringTokenizer tokenizer = new StringTokenizer(paramVal, del1);
		do {
			if (!tokenizer.hasMoreTokens())
				break;
			String str = tokenizer.nextToken();

			int keyIndex = str.indexOf(del2);
			if (keyIndex != -1) {
				String key = str.substring(0, keyIndex);
				if (key != null) {
					key = key.trim();
					if (!result.containsKey(key)) {
						String strVal = str.substring(keyIndex + 1, str.length());
						result.put(key, strVal);
					}
				}
			}
		} while(true);

		return result;
    }


    /**
     * @see
     * @logicalName   str 심플 멀티 데이터
     * @description   str를 을 해당 조건에 맞게 잘라서 SimpleMultiData 형태로 만들어 준다. ( 구분자1로 먼저 자르고 구분자2 를 기준으로 key value 형태로 만들어 준다. )
     * @param         문자열 str
     * @param         구분자1
     * @param         구분자2
     * @return        SimpleData
     */
    protected SimpleMultiData getStringToSimpleMultiData( HttpServletRequest request,  String paramVal , String del1 , String del2 )  {

		Map m = null;
		List list = new ArrayList(); // 가공하지 않은 맵
		Map mkey = null;

		Set keylist = new HashSet();
		StringTokenizer tokenizer = new StringTokenizer(paramVal, del1);
		do {
			if (!tokenizer.hasMoreTokens())
				break;
			String str = tokenizer.nextToken();

			int keyIndex = str.indexOf(del2);
			if (keyIndex != -1) {
				String key = str.substring(0, keyIndex);
				if (key != null) {
					key = key.trim();
					String strVal = str.substring(keyIndex + 1, str.length());

					m = new HashMap();
		            m.put(key, strVal);
		            list.add(m);

		            mkey = new HashMap();
		            keylist.add(key); // key 의 list (중복이 없는 list set)

				}
			}
		} while(true);

		// for 문을 몇번 돌아야 할지를 판별한다..
		// 파라미터 중복되는게 젤많은거 기준으로 돌림..
		String value = "";
		Iterator iter = keylist.iterator();
		int keyCount = 0;
		int keyCountDummy = 0;
		Map oneMap = null;

		while(iter.hasNext()) {
			value = (String)iter.next();
			keyCount = org.apache.commons.lang.StringUtils.countMatches(paramVal , value );
			if( keyCount >= keyCountDummy) {
				keyCountDummy = keyCount;
			}
		}

		SimpleMultiData mdata = new SimpleMultiData();
		SimpleData sdata = null;
		for(int i = 0 ; i < keyCountDummy ; i++) {
			sdata = makeSimpleData( keylist , list , paramVal);
			mdata.addSimpleData(sdata);
		}

		return mdata;
    }


	public SimpleData makeSimpleData(Set keylist ,List list ,String paramVal) {
		String value = "";

		Iterator iter = keylist.iterator();
		int keyCount = 0;
		Map oneMap = null;

		SimpleData sdata = new SimpleData();

		while(iter.hasNext()) {
			value = (String)iter.next();

			keyCount = org.apache.commons.lang.StringUtils.countMatches(paramVal , value );

			for(int k = 0 ; k < list.size() ; k++) {
				oneMap = (Map)list.get(k);
				if(oneMap.get(value) != null ) {
					sdata.setString(value , oneMap.get(value).toString());
					list.remove(k); // 꺼낸 원본은 지워준다 (다시 돌지 않도록)
					break;
				}
			}
		}
		return sdata;
	}
	
}
