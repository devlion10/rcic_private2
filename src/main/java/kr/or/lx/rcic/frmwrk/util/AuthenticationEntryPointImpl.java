package kr.or.lx.rcic.frmwrk.util;


import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
  
public class AuthenticationEntryPointImpl implements AuthenticationEntryPoint {
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
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)throws IOException, ServletException {
    	String goErrorPage = "/error/access-denied";
        if( redirect ){
            response.sendRedirect(goErrorPage);
        }else{
            RequestDispatcher dispatcher = request.getRequestDispatcher(goErrorPage);
            dispatcher.forward(request, response);
        }
    }
}

