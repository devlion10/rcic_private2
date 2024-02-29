package kr.or.lx.rcic.modules.g2b.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import kr.or.lx.rcic.frmwrk.util.SimpleData;
import kr.or.lx.rcic.modules.board.entity.Notice;

/**
 *  수집 정보를 관리한다.  */
public interface G2bService {

    Map<String, Object> getG2bList(HttpServletRequest request) throws Exception;

	Map<String, Object> getAnalCnt(String start, String end) throws Exception;

}
