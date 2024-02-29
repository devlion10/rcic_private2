package kr.or.lx.rcic.frmwrk.user;

import org.springframework.security.core.AuthenticationException;

public class RcicAutehnticationMessageException extends AuthenticationException {

    public RcicAutehnticationMessageException(String message) {
        super(message);
    }
}
