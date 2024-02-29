package kr.or.lx.rcic.modules.api.exception;

public class NotAllowedApiKeyException extends Exception {

    public NotAllowedApiKeyException() {

    }

    public NotAllowedApiKeyException(String message) {
        super(message);
    }
}
