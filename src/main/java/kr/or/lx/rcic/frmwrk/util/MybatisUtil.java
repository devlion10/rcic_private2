package kr.or.lx.rcic.frmwrk.util;

import lombok.extern.slf4j.Slf4j;


/**
 * @Class Name : MybatisUtil.java
 * @Description : 마이바티스 다이나믹 쿼리용 메소드
 * @Modification   Information
 * @
 * @  수정일        수정자              수정내용
 * @ ---------    ---------   -------------------------------
 * @ 2019.09.30    김한욱	    	 최초생성
 * 
 * @author  펜타시스템 김한욱 
 * @since   2019.09.30
 * @version   1.0
 * @see
 * 
 *    Copyright (C) by penta All right reserved.
 */
@Slf4j
public class MybatisUtil {



    /** NULL, 공백 */
    public static boolean checkNull(String str) {
        if ( str == null || str.equals("") ) {
            return false;
        }
        return true;
    }

    /** NULL, 공백 */
    public static boolean checkNull2(String str) {
        if ( str == null || str.equals("") || str.equals(" ") ) {
            return false;
        }
        return true;
    }


    /** NULL, 공백, 하이픈 체크 */
    public static boolean checkNullContainHyphen(String str) {
        if ( str == null || str.equals("") || str.equals("-") ) {
            return false;
        }
        return true;
    }

    /**
     * 숫자 여부 체크
     * @param number
     * @return
     */
    public static boolean isNumber(String number){
        boolean flag = true;
        if ( number == null  ||    "".equals( number )  )
            return false;
        int size = number.length();
        int st_no= 0;
        if ( number.charAt(0)  ==  45 )//음수인지 아닌지 판별 . 음수면 시작위치를 1부터
            st_no = 1;

        for ( int i = st_no ; i < size ; ++i ){
            if ( !( 48   <=  ((int)number.charAt(i))   && 57>= ( (int)number.charAt(i) )  )  ){
                flag = false;
                break;
            }
        }
        return flag;
    }

}
