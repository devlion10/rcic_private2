package kr.or.lx.rcic.frmwrk.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class BaseControllerAdvice {

    /**
     * commonAjax를 통해 호출했을 때 paramList가 없으면 NoParamListException를 발생시킨다.
     * @param e
     * @return
     */
    @ExceptionHandler(value = NoParamListException.class)
    public ResponseEntity<Map<String, Object>> handleNoParamListException(NoParamListException e) {
        Map<String, Object> retMap = new HashMap<String, Object>();
        retMap.put("message", "failure");
        retMap.put("result", "NO PARAM");
//		retMap.put("result", egovMessageSource.getMessage("_REQUIRED_MSG_REPEAT")); // FIXME
        return new ResponseEntity<>(retMap, HttpStatus.BAD_REQUEST);
    }
}
