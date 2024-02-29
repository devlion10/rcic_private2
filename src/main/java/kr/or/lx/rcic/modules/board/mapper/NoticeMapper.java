package kr.or.lx.rcic.modules.board.mapper;

import java.util.List;
import java.util.Map;

import kr.or.lx.rcic.frmwrk.util.SimpleData;
import kr.or.lx.rcic.modules.board.entity.Notice;

/**
 * Notice Mapper
 */
public interface NoticeMapper {

	Notice getNoticeDetail(SimpleData params);

    int selectNoticeCnt(Map<String, Object> params);

    List<Map<String, Object>> selectNoticeList(Map<String, Object> params);

    int insertNotice(Notice notice);

    int updateNotice(Notice notice);

    int deleteNotice(Notice notice);

	void updateReadCnt(SimpleData data);

}
