package kr.or.lx.rcic.modules.board.controller;

import kr.or.lx.rcic.frmwrk.util.WebUtil;
import kr.or.lx.rcic.frmwrk.web.BaseController;
import kr.or.lx.rcic.modules.board.entity.QaBbs;
import kr.or.lx.rcic.modules.board.service.QaBbsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * 1:1질문 관리  
 */
@Controller
@Slf4j
@RequestMapping("/rcic")
public class QaBbsController extends BaseController{

    @Autowired
    private QaBbsService qaBbsService;


    /**
     * 단건 조회
     */
    @RequestMapping("/qaBbs")
    @ResponseBody
    public QaBbs getQaBbs(@RequestParam Map params) throws Exception {
        return qaBbsService.getQaBbs(params);
    }

    /**
     * 목록 조회
     */
    @RequestMapping("/qaBbs/getQaBbsList")
    @ResponseBody
    public Map<String, Object> getQaBbsList(HttpServletRequest request) throws Exception {
        return qaBbsService.getQaBbsList(WebUtil.getCommonAjaxParam());
    }

    /**
     * 등록
     */
    @PostMapping("/qaBbs/insertQaBbs")
    @ResponseBody
    public int insertQaBbs(HttpServletRequest request) throws Exception {
        return qaBbsService.insertQaBbs(getSimpleData(request)); 
    }
   


    /**
     * 삭제
     */
    @PostMapping("/qaBbs/deleteQaBbs")
    @ResponseBody
    public int deleteQaBbs(HttpServletRequest request) throws Exception {
        return qaBbsService.deleteQaBbs(getSimpleData(request));
    }

}
