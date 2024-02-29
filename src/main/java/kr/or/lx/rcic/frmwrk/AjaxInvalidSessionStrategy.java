package kr.or.lx.rcic.frmwrk;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.security.web.session.InvalidSessionStrategy;
import org.springframework.security.web.util.matcher.ELRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.util.StringUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AjaxInvalidSessionStrategy implements InvalidSessionStrategy  {
	private Logger logger = LoggerFactory.getLogger(getClass());
	private RequestMatcher requestMatcher = new ELRequestMatcher("hasHeader('X-Requested-With','XMLHttpRequest')");

	@Override
	public void onInvalidSessionDetected(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {

		boolean ajaxRedirect = requestMatcher.matches(request);
		if (ajaxRedirect) {
			logger.debug("Session expired due to ajax request, starting a new session and redirect to requested status '{}'", 901);
			response.setContentType(MediaType.APPLICATION_JSON_VALUE);
			response.sendError(901, "SESSION_TIMED_OUT");

		} else {
			String requestURI = getRequestUrl(request);
			logger.debug("Session expired due to non-ajax request, starting a new session and redirect to requested url '{}'", requestURI);
			request.getSession(true);
			response.sendRedirect(requestURI);
		}  
	}

	private String getRequestUrl(HttpServletRequest request) {
		StringBuffer requestURL = request.getRequestURL();
		String queryString = request.getQueryString();
		if (StringUtils.hasText(queryString)   ) {
			requestURL.append("?").append(queryString);
		}

		return requestURL.toString();
	}
}
