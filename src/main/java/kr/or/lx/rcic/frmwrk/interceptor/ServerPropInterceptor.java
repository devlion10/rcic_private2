package kr.or.lx.rcic.frmwrk.interceptor;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 서버 프로퍼티 인터셉터
 * @author 펜타 김한욱
 * @since 2020.07.17
 * @version 1.0
 * @see
 *  
 * <pre>
 * << 개정이력(Modification Information) >>
 * 
 *   수정일     수정자          수정내용
 *  ----------  --------    ---------------------------
 *  2020.07.17	김한욱         최초 생성 
 *  </pre>
 */

public class ServerPropInterceptor extends HandlerInterceptorAdapter {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		return true;
	}
}
