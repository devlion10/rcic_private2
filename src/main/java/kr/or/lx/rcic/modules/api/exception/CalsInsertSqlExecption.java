package kr.or.lx.rcic.modules.api.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CalsInsertSqlExecption extends Exception{


    private Logger logger = LoggerFactory.getLogger(getClass());


    CalsInsertSqlExecption(){
        showlog();
    }


    CalsInsertSqlExecption(String msg){// 문자열을 매개변수로 받는 생성자

         	super(msg);// 조상인 Exception 클래스의 생성자를 호출한다.
            logger.debug("test__CalsInsertSqlExecption");
    }

    public void showlog(){
        logger.debug("test");
    }

}
