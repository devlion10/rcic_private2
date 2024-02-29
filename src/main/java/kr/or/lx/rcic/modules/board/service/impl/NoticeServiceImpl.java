package kr.or.lx.rcic.modules.board.service.impl;

import kr.co.timosoft.util.PaginationUtil;
import kr.or.lx.rcic.frmwrk.util.SimpleData;
import kr.or.lx.rcic.frmwrk.util.WebUtil;
import kr.or.lx.rcic.modules.board.entity.BbsAtchFile;
import kr.or.lx.rcic.modules.board.entity.Notice;
import kr.or.lx.rcic.modules.board.mapper.NoticeMapper;
import kr.or.lx.rcic.modules.board.service.BbsAtchFileService;
import kr.or.lx.rcic.modules.board.service.NoticeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 공지사항 정보를 관리한다.
 */
@Service
@Slf4j
public class NoticeServiceImpl implements NoticeService {

    @Autowired
    private NoticeMapper noticeMapper;

    @Autowired
    private BbsAtchFileService attachFileService;

    /**
     * 단건 조회
     */
    @Override
    public Notice getNoticeDetail(SimpleData data) throws Exception {
        noticeMapper.updateReadCnt(data);
        Notice notice = noticeMapper.getNoticeDetail(data);
        if (notice != null) {
            List<BbsAtchFile> files = attachFileService.getBbsAtchFileList(notice.getBoardRefType(), notice.getNoticeNo());
            notice.setFileList(files);
        }
        return notice;
    }

    /**
     * 목록 조회
     */
    @Override
    public HashMap<String, Object> getNoticeList(HttpServletRequest request) throws Exception {

        // 조회
        Map<String, Object> param = WebUtil.getCommonAjaxParamIfPresent();
        int cnt = noticeMapper.selectNoticeCnt(param);
        List<Map<String, Object>> list = noticeMapper.selectNoticeList(param);

        // 결과
        HashMap<String, Object> resultMap = new HashMap<>();
        int listCnt = param.get("listCnt") == null ? 5 : Integer.parseInt(String.valueOf(param.get("listCnt")));
        int maxPageCnt = PaginationUtil.maxPageCnt(cnt, listCnt);

        resultMap.put("maxPageCnt", maxPageCnt);
        resultMap.put("list", list);
        resultMap.put("totalCnt", cnt);

        return resultMap;
    }

    /**
     * 저장
     */
    @Override
    @Transactional
    public int saveNotice(Notice notice) throws Exception {

        // 저장 권한 검사 등..

        if (notice.hasPk()) {
            // 수정
            return updateNotice(notice);
        } else {
            // 신규 등록
            return insertNotice(notice);
        }
    }

    /**
     * 등록
     */
    @Override
    @Transactional
    public int insertNotice(Notice notice) throws Exception {
        int rs = noticeMapper.insertNotice(notice);
        attachFileService.saveAttachFileList(notice);
        return rs;
    }

    /**
     * 수정
     */
    @Override
    @Transactional
    public int updateNotice(Notice notice) throws Exception {
        int rs = noticeMapper.updateNotice(notice);
        attachFileService.saveAttachFileList(notice);
        return rs;
    }

    /**
     * 삭제
     */
    @Override
    @Transactional
    public int deleteNotice(Notice notice) throws Exception {
        return noticeMapper.deleteNotice(notice);
    }

}
