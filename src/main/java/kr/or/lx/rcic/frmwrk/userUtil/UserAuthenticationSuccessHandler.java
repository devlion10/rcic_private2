package kr.or.lx.rcic.frmwrk.userUtil;

import kr.or.lx.rcic.frmwrk.user.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.WebAttributes;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Collection;

@Slf4j
public class UserAuthenticationSuccessHandler implements AuthenticationSuccessHandler{ 

	private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

	private String defaultTargetUrl;
	
	private String examResultNo;

	private String targetUrlName;
	
	private RequestCache requestCache = new HttpSessionRequestCache();

	private String loginpage ;

	static final String REQUEST_PARAM_NAME = "saved_username";
	static final String COOKIE_NAME = "saved_username";
	static final int DEFAULT_MAX_AGE = 60 * 60 * 24 * 7;

	private int maxAge = DEFAULT_MAX_AGE;
	public String getLoginpage() {
		return loginpage;
	}

	public void setLoginpage(String loginpage) {
		this.loginpage = loginpage;
	}

	@Override
	public void onAuthenticationSuccess(HttpServletRequest req, HttpServletResponse res, Authentication auth)
			throws IOException, ServletException {
		handle(req, res, auth);
		clearAuthenticationAttributes(req);

	}

	protected void handle(HttpServletRequest req, HttpServletResponse res, Authentication auth) throws IOException {

		User uu = (User)auth.getPrincipal();
		Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();
		for (GrantedAuthority a : authorities) {
			uu.setRole(a.getAuthority());
		}
		
		 String clientIp = req.getHeader("X-FORWARDED-FOR");
	        if (clientIp == null)
	        	clientIp = req.getRemoteAddr();

	        String remember = req.getParameter(REQUEST_PARAM_NAME);
		if (remember != null) {
			String username = (uu).getUsername();
			Cookie cookie = new Cookie(COOKIE_NAME, username);
			
			if(maxAge > 3600) {
				maxAge = 3600;
			}
			cookie.setMaxAge(maxAge);
			cookie.setPath("/");
			cookie.setSecure(true);
			cookie.setHttpOnly(true); //HttpOnly flag
			res.addCookie(cookie);

		} else {
			Cookie cookie = new Cookie(COOKIE_NAME, "");
			cookie.setSecure(true);
			cookie.setHttpOnly(true); //HttpOnly flag
			cookie.setMaxAge(0);
			res.addCookie(cookie);
		}

		String targetUrl = null; 
		SavedRequest savedRequest = requestCache.getRequest(req, res);
		String savedRequestUrl = (savedRequest == null) ? null : savedRequest.getRedirectUrl();
		
		String refererUrl = "";
		refererUrl = req.getHeader("REFERER");
		
		if(this.loginpage != null && refererUrl != null){
			if(  refererUrl.indexOf(this.loginpage) > -1){
				refererUrl = defaultTargetUrl;
			}
		} 
		//targetUrl = (savedRequestUrl == null) ? ((refererUrl == null) ? defaultTargetUrl : refererUrl) : savedRequestUrl;
		if (res.isCommitted()) {
				log.info("Response has already been committed. Unable to redirect to  " + targetUrl.replaceAll("[\r\n]","") + " (" + targetUrl.replaceAll("[\r\n]","") + ")");
			return;
		}
		redirectStrategy.sendRedirect(req, res, refererUrl);
	}

	protected String determineTargetUrl(Authentication auth) {
		return defaultTargetUrl;
	}

	protected void clearAuthenticationAttributes(HttpServletRequest request) {
		HttpSession session = request.getSession(false);
		if (session == null) {
			return;
		}
		session.removeAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
	}

	public void setRedirectStrategy(RedirectStrategy redirectStrategy) {
		this.redirectStrategy = redirectStrategy;
	}

	protected RedirectStrategy getRedirectStrategy() {
		return redirectStrategy;
	}

	public String getExamResultNo() {
		return examResultNo;
	}

	public void setExamResultNo(String examResultNo) {
		this.examResultNo = examResultNo;
	}

	public String getDefaultTargetUrl() {
		return defaultTargetUrl;
	}

	public void setDefaultTargetUrl(String defaultTargetUrl) {
		this.defaultTargetUrl = defaultTargetUrl;
	}

	public String getTargetUrlName() {
		return targetUrlName;
	}

	public void setTargetUrlName(String targetUrlName) {
		this.targetUrlName = targetUrlName;
	} 
}

