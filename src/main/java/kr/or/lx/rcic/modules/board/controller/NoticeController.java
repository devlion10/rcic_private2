package kr.or.lx.rcic.modules.board.controller;

import kr.or.lx.rcic.frmwrk.web.BaseController;
import kr.or.lx.rcic.modules.board.entity.Notice;
import kr.or.lx.rcic.modules.board.service.NoticeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 *  공지사항 정보를 관리한다.  */
@Controller
@Slf4j
@RequestMapping("/rcic")
public class NoticeController extends BaseController{

    @Autowired
    private NoticeService noticeService;

    /**
     * 단건 조회
     */
    @RequestMapping("/notice/getNoticeDetail")
    @ResponseBody
    public  Notice getNoticeDetail(HttpServletRequest request) throws Exception {
        return noticeService.getNoticeDetail(getSimpleData(request));
    }

    /**
     * 목록 조회
     */
    @RequestMapping("/notice/getNoticeList")
    @ResponseBody
    public Map<String, Object> getNoticeList(HttpServletRequest request) throws Exception {
        return noticeService.getNoticeList(request);
    }

}
