package kr.or.lx.rcic.modules.intro.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class IntroController {

	@RequestMapping(value = "/intro")
	public ModelAndView introPage(ModelMap model, @RequestParam Map<String, Object> param, HttpServletRequest req, HttpServletResponse res, ModelAndView mv){

		String clientIp = req.getHeader("X-FORWARDED-FOR");
        if (clientIp == null)
        	clientIp = req.getRemoteAddr();
	    HttpSession session = req.getSession(true);
	    session.setAttribute("clientIp", clientIp);
	        
		model.addAttribute("param", param);
		model.addAttribute("clientIp", clientIp);
		mv.addAllObjects(model);
		mv.setViewName("intro/intro");
		return mv;
	}
}
