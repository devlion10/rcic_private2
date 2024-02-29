package kr.or.lx.rcic.modules.admin.controller;

import kr.or.lx.rcic.frmwrk.web.BaseController;
import kr.or.lx.rcic.modules.board.entity.BbsAtchFile;
import kr.or.lx.rcic.modules.board.entity.Faq;
import kr.or.lx.rcic.modules.board.entity.Notice;
import kr.or.lx.rcic.modules.board.entity.QaBbs;
import kr.or.lx.rcic.modules.board.service.BbsAtchFileService;
import kr.or.lx.rcic.modules.board.service.FaqService;
import kr.or.lx.rcic.modules.board.service.NoticeService;
import kr.or.lx.rcic.modules.board.service.QaBbsService;
import kr.or.lx.rcic.modules.code.service.CodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * 어드민 게시판 컨트롤러
 */
@Controller
@RequestMapping("/admin/board")
public class AdminBoardController extends BaseController {

    @Autowired
    CodeService codeService;

    @Autowired
    FaqService faqService;

    @Autowired
    NoticeService noticeService;

    @Autowired
    QaBbsService qnaService;

    @Autowired
    BbsAtchFileService attachFileService;

    // region notice

    @RequestMapping("/notice/list")
    public String noticeList(@RequestParam Map<String, Object> params, ModelMap modelMap) throws Exception {
        return "admin/board/notice-list";
    }

    @RequestMapping("/notice/view")
    public String noticeView(ModelMap modelMap) throws Exception {
        return "admin/board/notice-view";
    }

    @RequestMapping("/notice/form")
    public String noticeForm(@RequestParam Map<String, Object> params, ModelMap modelMap) throws Exception {
        return "admin/board/notice-form";
    }

    /**
     * 등록
     */
    @RequestMapping("/notice/saveNotice")
    @ResponseBody
    public int saveNotice(@ModelAttribute Notice notice) throws Exception {
        return noticeService.saveNotice(notice);
    }

    /**
     * 삭제
     */
    @PostMapping("/notice/deleteNotice")
    @ResponseBody
    public int deleteNotice(@RequestBody Notice notice) throws Exception {
        return noticeService.deleteNotice(notice);
    }



    // endregion


    // region faq
    @RequestMapping("/faq/list")
    public String faqList(@RequestParam Map<String, Object> params, ModelMap modelMap)  throws Exception {
        modelMap.addAttribute("faqTypes", getCodeDetailList("FAQ_TY"));
        return "admin/board/faq-list";
    }

    @RequestMapping("/faq/view")
    public String faqView(@RequestParam Map<String, Object> params, ModelMap modelMap) throws Exception {
        Faq faq = faqService.getFaq(params);
        modelMap.addAttribute("faq", faq);
        return "admin/board/faq-view";
    }

    @RequestMapping("/faq/form")
    public String faqForm(@RequestParam Map<String, Object> params, ModelMap modelMap) throws Exception {

        Faq faq = faqService.getFaq(params);
        modelMap.addAttribute("faq", faq);
        modelMap.addAttribute("faqTypes", getCodeDetailList("FAQ_TY"));
        return "admin/board/faq-form";
    }

    /**
     * 등록
     */
    @RequestMapping("/faq/saveFaq")
    @ResponseBody
    public int saveFaq(@ModelAttribute Faq faq) throws Exception {
        return faqService.saveFaq(faq);
    }

    /**
     * 삭제
     */
    @PostMapping("/faq/deleteFaq")
    @ResponseBody
    public int deleteFaq(@RequestBody Faq faq) throws Exception {
        return faqService.deleteFaq(faq);
    }

    // endregion

    // region qna
    @RequestMapping("/qna/list")
    public String qnaList(@RequestParam Map<String, Object> params, ModelMap modelMap) throws Exception {
        modelMap.addAttribute("questionTypes", getCodeDetailList("QESTN_TY"));
        return "admin/board/qna-list";
    }

    @RequestMapping("/qna/view")
    public String qnaView(@RequestParam Map<String, Object> params, ModelMap modelMap) throws Exception {
        QaBbs qaBbs = qnaService.getQaBbs(params);
        modelMap.addAttribute("qna", qaBbs);
        modelMap.addAttribute("questionTypes", getCodeDetailList("QESTN_TY"));
        return "admin/board/qna-view";
    }

    @RequestMapping("/qna/form")
    public String qnaForm(@RequestParam Map<String, Object> params, ModelMap modelMap) throws Exception {
        QaBbs qaBbs = qnaService.getQaBbs(params);
        modelMap.addAttribute("qna", qaBbs);
        modelMap.addAttribute("questionTypes", getCodeDetailList("QESTN_TY"));
        return "admin/board/qna-form";
    }


    /**
     * 답변 저장
     */
    @RequestMapping("/qna/answer")
    @ResponseBody
    public int answerQna(@ModelAttribute QaBbs qaBbs) throws Exception {
        return qnaService.answerQaBbs(qaBbs);
    }

    // endregion


    // region etc

    /**
     * 삭제
     */
    @PostMapping("/attach/deleteAttachFile")
    @ResponseBody
    public Map deleteBbsFile(@RequestBody BbsAtchFile atchFile) throws Exception {
        int r = attachFileService.deleteBbsAtchFile(atchFile);
        Map result = new HashMap();
        result.put("result", "success");
        result.put("cnt", r);
        return result;
    }


    private Object getCodeDetailList(String groupCode) throws Exception {
        Map codeParam = new HashMap();
        codeParam.put("groupCode", groupCode);
        HashMap<String, Object> faqTy = codeService.selectDetailCode(codeParam);
        return faqTy.get("list");
    }
    // endregion
}
