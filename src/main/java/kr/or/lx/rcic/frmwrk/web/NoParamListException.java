package kr.or.lx.rcic.frmwrk.web;

import javax.ws.rs.BadRequestException;

public class NoParamListException extends BadRequestException {

    public NoParamListException() {
        super();
    }
}
