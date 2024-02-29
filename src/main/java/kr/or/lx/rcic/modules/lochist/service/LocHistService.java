package kr.or.lx.rcic.modules.lochist.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

public interface LocHistService {

	Map<String, Object> getLocHistList(HttpServletRequest request) throws Exception;
}
