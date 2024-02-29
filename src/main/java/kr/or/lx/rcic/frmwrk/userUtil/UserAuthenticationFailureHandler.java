package kr.or.lx.rcic.frmwrk.userUtil;

import com.fasterxml.jackson.databind.ObjectMapper;
import kr.or.lx.rcic.frmwrk.user.RcicAutehnticationMessageException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class UserAuthenticationFailureHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {

        Map<String, String> result = new HashMap<>();
        String message = "아이디와 비밀번호를 확인하세요.";
        if (exception instanceof RcicAutehnticationMessageException) {
            message = exception.getMessage();
        }
        result.put("message", message);

        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(result);

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write(json);
        response.getWriter().flush();
    }
}
