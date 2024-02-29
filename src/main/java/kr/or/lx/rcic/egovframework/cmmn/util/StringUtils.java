package kr.or.lx.rcic.egovframework.cmmn.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.regex.Pattern;

public class StringUtils
{

	/**
	 * null 이면 "" 반환
	 * null 이 아니면 toString();
	*/
    public static String nullToStr(Object obj)
    {
    	if(obj == null) {
    		return "";
    	} else {
    		return obj.toString().trim();
    	}
    }


	/**
	 * null 혹은 공백인지를 판별한다.
	*/
    public static boolean isEmpty(String str)
    {
        return str == null || str.length() == 0;
    }
    

    /**
     * 문자열의 NULL CHECK.
     * @param str 검사할 문자열
     * @return 문자열이 NULL 이거나 공백인 경우 true 를 리턴.
     */
    public static boolean isEmpty2(String str) {
        boolean result = true;
        if(str != null && !"".equals(str) && !"NULL".equalsIgnoreCase(str))
            result = false;
        return result;
    }


	/**
	 * 문자열이 null 또는 길이가 0인 경우 다른 문자로 반환한다
	*/
	public static String nullValue(String str, String nullStr)
	{
	    if(str == null || str.trim().length() == 0)
	    {
	        return nullStr;
	    }
	    else
	    {
	        return str;
	    }
	}

	/**
	 * 소문자인지 판별한다
	*/
    public static boolean isLower(char val){
    	if( val>96 && val<123 ) {
    		return true;
    	}
		return false;
    }

	/**
	 * 대문자인지 판별한다
	*/
    public static boolean isUpper(char val){
    	if( val>94 && val<92 ) {
    		return true;
    	}
		return false;
    }

	/**
	 * 숫자인지 판별한다.
	*/
    public static boolean isNumber(char val){
    	if( val>47 && val<58 ) {
    		return true;
    	}
		return false;
    }

	/**
	 * 특정길이 초과시 fix 한다.
	*/
    public static String fixLength(String content, int length, String suffix)
    {
        if(content == null)
            return "";
        if(content.getBytes().length > length)
        {
            int slen = 0;
            int blen = 0;
            for(int realLength = length - suffix.getBytes().length; blen < realLength;)
            {
                blen++;
                slen++;
                if(content.charAt(slen) > '\377')
                    blen++;
            }

            return content.substring(0, slen) + suffix;
        } else
        {
            return content;
        }
    }

	/**
	 * 특정 문자열의 nLen 초과시 ... 을 붙여서 반환한다.
	*/
	public static String showStringByLength(String szInput, int nLen)
	{
		String szLeft = trimString(szInput);
		for(int i = 1; i <= szInput.length(); i++)
		{
			szLeft = szInput.substring(0, i);
			if (lengthOfString(szLeft) > nLen)
			{
				szLeft = szInput.substring(0, i-1);
				szLeft = szLeft + "...";
				break;
			}
		}
		return szLeft;
	}

	/**
	 * 널이면 공백리턴 널이 아니면 좌우 trim 한 값 리턴
	*/
	public static String trimString(String str)
	{
		String strTmp;
		if (str==null || str.equals(""))
			strTmp = "";
		else
			strTmp = str.trim();

		return strTmp;
	}


	/**
	*
	* 문자열의 길이를 구한다. 영문일때는 1을 한글일때는 2를 길이에 추가한후
	* 문자열 길이를 return 한다.
	* @param		szAllText
	* @return		int
	*/
	public static int lengthOfString(String szAllText) {
		char szEach;
		int nLen = 0;
		szAllText = trimString(szAllText);
		for(int i = 0; i < szAllText.length(); i++) {
			szEach = szAllText.charAt(i);
			if (0 <= szEach && szEach <= 255)
				nLen += 1;
			else
				nLen += 2;
		}
		return nLen;
	}



	/**
	 * HTML TAG Filter 에서 수정한 '<','>','&','"',''' 에 대하여 원래 html 로 보여준다
	 */
	public static String showHtmlTag(String pInstr) {
		if (pInstr == null || pInstr.equals("")) {
			return "";
		} else {
			String result = pInstr;
			result = replace(result, "&lt;", "<");
			result = replace(result, "&gt;", ">");
			result = replace(result, "&amp;", "&");
			result = replace(result, "&quot;", "\"");
			result = replace(result, "&apos;", "'");
			//result = replace(result, "#", "&#35;");
			//result = replace(result, "'", "&#39;");
			return result;
		}
	}
	/**
	 * showHtmlTag 의 반대
	 */
	public static String delTag(String pInstr) {
		if (pInstr == null || pInstr.equals("")) {
			return "";
		} else {
			String result = pInstr;
			result = replace(result, "<", "&lt;");
			result = replace(result, ">", "&gt;");
			result = replace(result, "&", "&amp;");
			result = replace(result, "\"", "&quot;");
			result = replace(result, "'", "&apos;");
			//result = replace(result, "#", "&#35;");
			//result = replace(result, "'", "&#39;");
			return result;
		}
	}


	/**
	 *
	 * @param str
	 * @param pattern
	 * @param replace
	 * @return String
	 */
	public static String replace(String str, String pattern, String replace) {
		int s = 0;
		int e = 0;
		if (str == null || str.equals(""))
			return "";
		StringBuffer result = new StringBuffer();
		while ((e = str.indexOf(pattern, s)) >= 0) {
			result.append(str.substring(s, e));
			result.append(replace);
			s = e + pattern.length();
		}
		result.append(str.substring(s));
		return result.toString();
	}

    public static String byteToHex(byte[] bytes){
        StringBuilder sb = new StringBuilder();
        for(byte b :bytes){
            String testStr = String.format("%02x",b&0xff);
            sb.append(testStr);
        }
        return sb.toString();
    }


    // 숫자인지
	public static boolean isNumeric(String str){
		return Pattern.matches("[0-9]+", str);
	}

	// 알파벳인지
	public static boolean isAlpha(String str){
		return Pattern.matches("[a-zA-Z]+",str);
	}

	// 숫자와 알파벳 조합인지
	public static boolean isAlphaNumeric(String str){
		return Pattern.matches("[a-zA-Z0-9]+",str);
	}

	// 한글인지
	public static boolean isKorean(String str){
		return Pattern.matches("[가-ㅤㅎㅣㅎ]+",str);
	}

	/** 0으로 시작
	* 지역번호 : 1,2 자리
	* 구분자 : 없거나 '-',')'
	* 국번 : 3,4 자리
	* 구분자 : 없거나 '-'
	* 전화번호 : 4자리
	* */
	public static boolean isPhoneNo(String str){
		return Pattern.matches("0[0-9]{1,2}[-)]?[0-9]{3,4}[-]?[0-9]{4}",str);
	}


	// 카멜타입으로 반환해줌
	public static String getCarmelType(String str){
		String strRet = "";
		boolean isDeli = false;
		for(int i =0; i<str.length(); i++){
			if(str.charAt(i) == '_'){
				isDeli = true;
				continue;
			}
			if(isDeli){
				strRet += String.valueOf(str.charAt(i)).toUpperCase();
				isDeli = false;
			}else {
				strRet += String.valueOf(str.charAt(i)).toLowerCase();
			}
		}
		return strRet;
	}
	
	// 역카멜타입으로 반환해줌
	public static String getRevCarmelType(String str){
		StringBuffer buffer = new StringBuffer();
		
		for (String token : str.split("(?=\\p{Upper})")){
			buffer.append(token.toUpperCase()).append('_');
		}
		
		buffer.deleteCharAt(buffer.length() - 1);
		return buffer.toString();
	}

    public static String fnCalDateString(String sDFormat, String DateCd, int num){

		Calendar calendar2 = Calendar.getInstance();
		if(DateCd.equals("D")){
			calendar2.add(Calendar.DATE, num);	
		}else if(DateCd.equals("M")){
			calendar2.add(Calendar.MINUTE, num);
		}
		
        java.util.Date date2 = calendar2.getTime();
        String procDate2 = (new SimpleDateFormat(sDFormat).format(date2));
        return procDate2;
    }
}
