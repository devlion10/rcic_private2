package kr.or.lx.rcic.frmwrk.util;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
 
/**
 * 권한이 없는 요청시 발생
 */
public class AccessDeniedHandlerImpl implements AccessDeniedHandler {
    private Boolean redirect =true;
    public Boolean getRedirect() {
        return redirect;
    }
    public void setRedirect(Boolean redirect) {
        this.redirect = redirect;
    }
 
    private String errorPage;
    public void setErrorPage(String errorPage) {
        this.errorPage = errorPage;
    }
    public String getErrorPage() {
        return errorPage;
    }
 
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException)throws IOException, ServletException {
        // 에러 페이지에 대한 확장자를 현재 호출한 확장자와 마추어준다.
        String goErrorPage = "/error/access-denied";
        if( redirect ){
            response.sendRedirect(goErrorPage);
        }else{
            RequestDispatcher dispatcher = request.getRequestDispatcher(goErrorPage);
            dispatcher.forward(request, response);
        }
    }
 
}
