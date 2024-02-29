package kr.or.lx.rcic.frmwrk.user;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtil {

    public static String getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName();
        return userId;
    }

    public static String getCurrentUserNo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return user.getUserNo();
    }


}
