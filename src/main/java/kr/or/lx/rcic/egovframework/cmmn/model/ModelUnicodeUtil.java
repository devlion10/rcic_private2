package kr.or.lx.rcic.egovframework.cmmn.model;

import java.util.ArrayList;

public class ModelUnicodeUtil
{

    public ModelUnicodeUtil()
    {
    }

    public static int countUnicode(String str)
    {
        char charArray[] = str.toCharArray();
        int unicodeNumber = 0;
        for(int inx = 0; inx < charArray.length; inx++)
            if(isUnicode(charArray[inx]))
                unicodeNumber++;

        return unicodeNumber;
    }

    public static boolean isUnicode(char ch)
    {
        return ch >= '\uAC00' && ch <= '\uD7A3';
    }

    @SuppressWarnings("unchecked")
	public static int[] getUnicodeLineArray(String str, int cutLength)
    {
        char charArray[] = str.toCharArray();
        int valueLength = str.getBytes().length;
        ArrayList resultList = new ArrayList();
        int index = 0;
        int loopIndex = 1;
        if(valueLength > cutLength)
        {
            for(int inx = 0; inx < charArray.length; inx++)
            {
                if(isUnicode(charArray[inx]))
                    index += 2;
                else
                    index++;
                if(index >= cutLength)
                {
                    if(index > cutLength)
                    {
                        resultList.add(new Integer(loopIndex));
                        inx--;
                    }
                    index = 0;
                    loopIndex++;
                }
            }

        }
        int resultIntValue[] = new int[resultList.size()];
        for(int jnx = 0; jnx < resultList.size(); jnx++)
            resultIntValue[jnx] = ((Integer)resultList.get(jnx)).intValue();

        return resultIntValue;
    }
}