 package kr.or.lx.rcic.egovframework.cmmn;

import egovframework.rte.fdl.cmmn.exception.handler.ExceptionHandler;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class EgovComExcepHndlr implements ExceptionHandler {

	/**
	* @param ex
	* @param packageName
	* @see 개발프레임웍크 실행환경 개발팀
	*/
	@Override
	public void occur(Exception ex, String packageName) {
		log.debug(" EgovServiceExceptionHandler run...............");
	}
}
