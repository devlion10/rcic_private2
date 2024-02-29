package kr.or.lx.rcic.modules.admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

/**
 * 어드민 공통 컨트롤러
 */
@Controller
@RequestMapping("/admin")
public class AdminSigninController {

    @RequestMapping("/login")
    public String signinPage(HttpServletRequest request) {
        return "admin/signin/signin";
    }

    @RequestMapping({"", "/"})
    public String entry(HttpServletRequest request) {
        return "redirect:/admin/main";
    }

    @RequestMapping("/main")
    public String adminMain(HttpServletRequest request) {
        return "redirect:/admin/board/faq/list";
    }


}
