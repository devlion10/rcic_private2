package kr.or.lx.rcic.modules.admin.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.or.lx.rcic.frmwrk.web.BaseController;
import kr.or.lx.rcic.modules.lochist.service.LocHistService;
import lombok.extern.slf4j.Slf4j;

/**
 * 어드민 위치보정관리 컨트롤러
 */
@Slf4j
@Controller
@RequestMapping("/admin/lochist")
public class AdminLocHistController extends BaseController {


    
    @Autowired
    private LocHistService LocHistService;


    /**
     * 사용자 목록 데이터
     */
    @RequestMapping("/lochist")
    public String getLocHist(HttpServletRequest request) throws Exception {
       
       
        return "admin/lochist/lochist";
    }
    
    @RequestMapping("/getLocHistList")
    @ResponseBody
    public Map<String, Object> getLocHistList(HttpServletRequest request) throws Exception {
       
        return LocHistService.getLocHistList(request); 
    }


}