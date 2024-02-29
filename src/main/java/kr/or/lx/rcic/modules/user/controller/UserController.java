package kr.or.lx.rcic.modules.user.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.mail.Message.RecipientType;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.or.lx.rcic.egovframework.cmmn.util.AES256;
import kr.or.lx.rcic.frmwrk.user.UserInfo;
import kr.or.lx.rcic.frmwrk.util.BeanUtils;
import kr.or.lx.rcic.frmwrk.util.CmmnUtil;
import kr.or.lx.rcic.frmwrk.web.BaseController;
import kr.or.lx.rcic.modules.user.entity.User;
import kr.or.lx.rcic.modules.user.service.UserService;
import lombok.extern.slf4j.Slf4j;

/**
 *  회원 정보 관리
 */
@Controller
@Slf4j
@RequestMapping("/rcic")
public class UserController  extends BaseController{

    @Autowired
    private UserService userService;
    
    private kr.or.lx.rcic.frmwrk.user.service.UserSerivce userService2;
    
    
    @Autowired
    private JavaMailSenderImpl mailSender;
    
    @Value("#{contextProperties}")
	Properties prop = new Properties();


    /**
     * 단건 조회
     */
    @RequestMapping("/user")
    @ResponseBody
    public User getUser(@RequestParam Map params) throws Exception {
        return userService.getUser(params);
    }

    /**
     * 목록 조회
     */
    @RequestMapping("/user-list")
    @ResponseBody
    public Map<String, Object> getUserList(HttpServletRequest request) throws Exception {
        return userService.getUserList(request);
    }

    /**
     * 등록
     */
    @PostMapping("/user/insertUser")
    @ResponseBody
    public HashMap<String, Object> insertUser(HttpServletRequest request) throws Exception {
        return userService.insertUser(request);
    }
    
    
    
    @GetMapping("/user/sendAuthMail")
    public void sendAuthMail(@RequestParam("id") String e_mail, @RequestParam("name") String name, HttpServletResponse response) throws Exception {
    	MimeMessage mail = mailSender.createMimeMessage();
    	String rcicUrl = prop.getProperty("rcicUrl");
    	
    	// 20220420 byjang : 로컬에서 메일 테스트시 개발서버주소로 전환
    	// 완료 후 삭제 필요
    	if(rcicUrl.indexOf("localhost:8080") == 0) {
    		rcicUrl = "http://geonworks.iptime.org:20015";
    	} else {
    	}
    	
    		
    	String encryptEmail = AES256.getInstance().encrypt(e_mail);
//    	String mailContent = "<h3>안녕하세요. " + name + "님</h3>" + "<p>인증하기 버튼을 누르시면 인증이 완료됩니다."
//                + "<a href='" + rcicUrl +"/rcic/user/updateEmailConfim?userId=" 
//                + encryptEmail + "' target='_blenk'>인증하기</a>";
    	String mailContent = "";
    	mailContent = "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" id=\"bodyTable\">"
    			+ 		"<tr>"
    			+ 			"<td>"
    			+ 				"<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width: 700px; height: 900px; text-align: center; position: fixed; background-color:#fbfbfb; border: 1px; border-style: solid; border-color: #d2d2d2; display: block;\">"
    			+ 					"<tr>"
    			+ 						"<td style=\"width:700px; height: 281px;\"><img src=" + rcicUrl + "/assets/images/main/img_top.gif alt=\"DAMDA\" width=\"698\" height=\"281\"></td>"
    			//+ 						"<td><img src=" + rcicUrl + "/assets/images/main/img_top.gif\" alt=\"DAMDA\" width=\"698\" height=\"281\"></td>"
    			+ 					"</tr>"
    			+ 					"<tr>"
    			+ 						"<td style=\"text-align:center; font-size: 36px; letter-spacing: -3px; font-family: 'Noto Sans KR', sans-serif; color: #222; font-weight: 700; height: 100px; line-height:100px; \">도로변경정보 수집시스템 이메일 인증</td>"
    			+ 					"</tr>"
    			+ 					"<tr>"
    			+ 						"<td style=\"font-size: 14px; font-weight: 400; color: #222; width: 165px; text-align: center; padding-top: 35px;\">"
    			+ 							"안녕하세요. <span style=\"color: #4385f5; font-weight: 700;\">" + name + "</span> 님,<br>"
    			+ 							"회원님께서는 <span style=\"color: #4385f5; font-weight: 700;\">" + e_mail + "</span> 을 RCIC ID로 등록하셨습니다.<br><br><br>"
    			+ 							" \"이메일 인증\" 버튼을 클릭하시면, RCIC 인증이 완료되며,<br>"
    			+ 							"회원가입은 관리자 승인 후 정식 가입이 완료됩니다.<br><br><br>"
    			+ 							" RCIC를 이용해 주셔서 감사합니다."
    			+ 						"</td>"
    			+ 					"</tr>"
    			+ 					"<tr>"
    			+ 						"<td style=\"padding-top: 71px;text-align:center;\">"
    			+ 							"<a href="+ rcicUrl +"/rcic/user/updateEmailConfim?userId=" +encryptEmail + " target=\"_blank\" style=\"padding-top: 17px; padding-bottom: 17px; padding-left: 75px; padding-right: 75px; font-size: 16px; cursor: pointer; border-radius: 100px;  border: none; background-color: #4385f5; color: #fff; text-decoration: none;\">이메일 인증</a>"
    			+ 						"</td>"
    			+ 					"</tr>"
    			+ 					"<tr>"
    			+ 						"<td style=\"background-color: #595959; border: 1px; width: 100%; padding-top: 30px; padding-bottom: 30px; padding-left: 20px; padding-right: 20px; color: #cecece; font-size: 12px; box-sizing: border-box; text-align: center; position: relative; top: 97px;\">본 메일은 발신전용이며, 관련문의는 고객센터를 이용해 주세요.<br>COPYRIGHT(C) LX, ALL RIGHTS RESERVED.</td>"
    			+  					"</tr>"
    			+ 				"</table>"
    			+ 			"</td>"
    			+  		"</tr>"
    			+ "</table>";
    	
    	System.out.println(mailContent);
    			
    	try {
			mail.setSubject("[RCIC] 회원가입 인증메일입니다", "utf-8");
			mail.setText(mailContent, "utf-8", "html"); 
			mail.addRecipient(RecipientType.TO, new InternetAddress(e_mail));
			mail.setFrom(prop.getProperty("sendMailAddr"));
			mailSender.send(mail);
		} catch (MessagingException e) {
			CmmnUtil.setLog(e.getMessage());
		}
    	
    }
    
    
    
    /**
     * 회원정보 수정
     */
    @PostMapping("/user/updateUser")
    @ResponseBody
    public int updateUser(HttpServletRequest request) throws Exception {
    	
    	userService.updateUser(getSimpleData(request));
    	
    	Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    	List<GrantedAuthority> updatedAuthorities = new ArrayList<>(auth.getAuthorities());
    	Authentication newAuth = new UsernamePasswordAuthenticationToken(auth.getPrincipal(), auth.getCredentials(), updatedAuthorities);
    	SecurityContextHolder.getContext().setAuthentication(newAuth);
    	
    	kr.or.lx.rcic.frmwrk.user.User user = (kr.or.lx.rcic.frmwrk.user.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    	UserInfo uInfo = null;
    	
    	kr.or.lx.rcic.frmwrk.user.service.UserSerivce userService2 = (kr.or.lx.rcic.frmwrk.user.service.UserSerivce)BeanUtils.getBean("userService");
    		uInfo = userService2.selectUserInfo(user.getUserid().toString());
    		
		user.setUserNo(uInfo.getUserNo());
		user.setExtInfo(uInfo.getExtInfo());
		user.setAuthInfo(uInfo.getAuthInfo());
    	
        return 1; 
    }

    
    /**
     * 중복확인
     */
	@RequestMapping(value = "/user/getIdCheck")
	@ResponseBody
	public int getIdCheck(HttpServletRequest request) throws Exception{
		return userService.getIdCheck(getSimpleData(request));
	}
    
    /**
     * 아이디찾기
     */
	@RequestMapping(value = "/user/searchId")
	@ResponseBody
	public Map<String, Object> searchId(HttpServletRequest request) throws Exception{
		return userService.searchId(getSimpleData(request));
	}

	/**
     * 비밀번호 수정
     */
	@RequestMapping(value = "/user/updatePwd")
	@ResponseBody
	public int updatePwd(HttpServletRequest request) throws Exception{
		return userService.updatePwd(getSimpleData(request));
	}
	
	
	/**
     * 회원탈퇴
     */
	@RequestMapping(value = "/user/updatetUserSttusWithd")
	@ResponseBody
	public int updatetUserSttusWithd(HttpServletRequest request) throws Exception{
		return userService.updatetUserSttusWithd(getSimpleData(request));
	}
	
	
	@RequestMapping(value = "/user/updateEmailConfim", method = RequestMethod.GET)
	public String updateEmailConfim(String userId, Model model, HttpServletResponse response) throws Exception { // 이메일인증
		String decryptUserId = AES256.getInstance().decrypt(userId);
		
		int successCnt = userService.updateEmailConfim(decryptUserId);
		
		if(successCnt > 0) {
			model.addAttribute("emailConfirm", "Y");
		}else {
			model.addAttribute("emailConfirm", "N");
		}
		
		return "public/public_main";
	}
	
	/**
     * 마이페이지 - 비밀번호 수정
     */
	@RequestMapping(value = "/user/changeUserPwd")
	@ResponseBody
	public int changeUserPwd(HttpServletRequest request) throws Exception{
		return userService.changeUserPwd(getSimpleData(request));
	}
	
	
}
