package kr.or.lx.rcic.modules.board.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import kr.or.lx.rcic.frmwrk.util.SimpleData;
import kr.or.lx.rcic.modules.board.entity.Notice;

/**
 *  공지사항 정보를 관리한다.  */
public interface NoticeService {

	Notice getNoticeDetail(SimpleData data) throws Exception;

    Map<String, Object> getNoticeList(HttpServletRequest request) throws Exception;

    int saveNotice(Notice notice) throws Exception;

    int insertNotice(Notice notice) throws Exception;

    int updateNotice(Notice notice) throws Exception;

    int deleteNotice(Notice notice) throws Exception;

}
