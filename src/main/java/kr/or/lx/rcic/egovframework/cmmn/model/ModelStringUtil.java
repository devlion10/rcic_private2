package kr.or.lx.rcic.egovframework.cmmn.model;


public class ModelStringUtil
{

    public ModelStringUtil()
    {
    }

    public static String makeRepeatString(String str, int repeateCount)
    {
        StringBuffer resultStr = new StringBuffer();
        for(int inx = 0; inx < repeateCount; inx++)
            resultStr.append(str);

        return resultStr.toString();
    }

    public static String replace(String strTarget, String strSearch, String strReplace)
    {
        String result = null;
        String strCheck = new String(strTarget);
        StringBuffer strBuf = new StringBuffer();
        int end;
        for(; strCheck.length() != 0; strCheck = strCheck.substring(end))
        {
            int begin = strCheck.indexOf(strSearch);
            if(begin == -1)
            {
                strBuf.append(strCheck);
                break;
            }
            end = begin + strSearch.length();
            strBuf.append(strCheck.substring(0, begin));
            strBuf.append(strReplace);
        }

        result = strBuf.toString();
        return result;
    }
}