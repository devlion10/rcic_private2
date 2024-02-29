package kr.or.lx.rcic.modules.board.controller;

import kr.or.lx.rcic.frmwrk.util.SimpleData;
import kr.or.lx.rcic.frmwrk.web.BaseController;
import kr.or.lx.rcic.modules.board.entity.Faq;
import kr.or.lx.rcic.modules.board.service.FaqService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 *  FAQ 게시판의 내용을 관리한다.  */
@Controller
@Slf4j
@RequestMapping("/rcic")
public class FaqController extends BaseController {

    @Autowired
    private FaqService faqService;

    // api

    /**
     * 단건 조회
     */
    @RequestMapping("/faq")
    @ResponseBody
    public Faq getFaq(HttpServletRequest request, @RequestParam Map params) throws Exception {
        SimpleData simpleData = getSimpleData(request);
        return faqService.getFaq(simpleData);
    }

    /**
     * 목록 조회
     */
    @RequestMapping("/faq/getFaqList")
    @ResponseBody
    public Map<String, Object> getFaqList(HttpServletRequest request) throws Exception {
        return faqService.getFaqList(request);
    }

    /**
     * 등록
     */
    @PostMapping("/post-faq")
    @ResponseBody
    public int insertFaq(@RequestBody Faq faq) throws Exception {
        return faqService.saveFaq(faq);
    }

    /**
     * 수정
     */
    @PostMapping("/put-faq")
    @ResponseBody
    public int updateFaq(@RequestBody Faq faq) throws Exception {
        return faqService.saveFaq(faq);
    }

    /**
     * 동적 수정
     */
    @PostMapping("/patch-faq")
    @ResponseBody
    public int patchFaq(@RequestBody Faq faq) throws Exception {
        return faqService.saveFaq(faq);
    }

    /**
     * 삭제
     */
    @PostMapping("/remove-faq")
    @ResponseBody
    public int deleteFaq(@RequestBody Faq faq) throws Exception {
        return faqService.deleteFaq(faq);
    }
    
    
    /**
     * faq 타입별 건수
     */
    @RequestMapping("/faq/getFaqTypeCount")
    @ResponseBody
    public Map<String, Object> getFaqTypeCount(HttpServletRequest request) throws Exception {
        return faqService.getFaqTypeCount(request);
    }
}
