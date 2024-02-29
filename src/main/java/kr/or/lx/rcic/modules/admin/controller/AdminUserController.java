package kr.or.lx.rcic.modules.admin.controller;

import kr.or.lx.rcic.egovframework.cmmn.util.AES256;
import kr.or.lx.rcic.frmwrk.util.CmmnUtil;
import kr.or.lx.rcic.frmwrk.util.SimpleData;
import kr.or.lx.rcic.frmwrk.web.BaseController;
import kr.or.lx.rcic.modules.code.service.CodeService;
import kr.or.lx.rcic.modules.menu.entity.Menu;
import kr.or.lx.rcic.modules.menu.service.MenuService;
import kr.or.lx.rcic.modules.user.entity.AuthDtl;
import kr.or.lx.rcic.modules.user.entity.AuthInfo;
import kr.or.lx.rcic.modules.user.service.AuthDtlService;
import kr.or.lx.rcic.modules.user.service.AuthInfoService;
import kr.or.lx.rcic.modules.user.service.UserService;
import lombok.extern.slf4j.Slf4j;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.mail.Message;
import javax.mail.Message.RecipientType;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.stream.Collectors;

import static java.time.temporal.TemporalAdjusters.firstDayOfYear;
import static java.time.temporal.TemporalAdjusters.lastDayOfYear;

/**
 * 어드민 사용자관리 컨트롤러
 */
@Slf4j
@Controller
@RequestMapping("/admin/user")
public class AdminUserController extends BaseController {
	@Autowired
    private JavaMailSenderImpl mailSender;
    
    @Value("#{contextProperties}")
	Properties prop = new Properties();

    @Autowired
    private UserService userService;

    @Autowired
    private AuthInfoService authInfoService;

    @Autowired
    private AuthDtlService authDtlService;

    @Autowired
    private MenuService menuService;

    @Autowired
    CodeService codeService;

    // ---------------------------------------------------------------------- user

    /**
     * 사용자 목록 페이지
     */
    @RequestMapping("/users/list")
    public String userListPage(HttpServletRequest request, Model model) throws Exception {
        Map<String, Object> codeParam = new HashMap<>();

        // 기관구분 코드
        codeParam.put("groupCode", "INSTT_SE");
        Map<String, Object> insttSe = codeService.selectDetailCode(codeParam);

        // 상태 코드
        codeParam.put("groupCode", "STTUS");
        Map<String, Object> sttus = codeService.selectDetailCode(codeParam);

        // 권한 목록
        Map<String, Object> authInfo = authInfoService.getAuthInfoListAll();

        LocalDate today = LocalDate.now();
        DateTimeFormatter dft = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        // 가입일자 검색 시작날짜
        String startDate = today.with(firstDayOfYear()).format(dft);

        // 가입일자 검색 종료날짜
        String endDate = today.with(lastDayOfYear()).format(dft);

        model.addAttribute("insttSeList", insttSe.get("list"));
        model.addAttribute("sttusList", sttus.get("list"));
        model.addAttribute("authInfoList", authInfo.get("list"));
        model.addAttribute("startDate", startDate);
        model.addAttribute("endDate", endDate);

        return "admin/user/users";
    }

    /**
     * 사용자 목록 데이터
     */
    @RequestMapping("/users/getUserList")
    @ResponseBody
    public Map<String, Object> getUserList(HttpServletRequest request) throws Exception {
        return userService.getUserList(request);
    }

    /**
     * 사용자 권한 수정
     */    
    @RequestMapping("/users/updateUserAuth")
    @ResponseBody
    public int patchUser(HttpServletRequest request) throws Exception {
        String updtId = SecurityContextHolder.getContext().getAuthentication().getName();
        
        SimpleData data = getSimpleData(request);
        data.put("updtId", updtId);       
        
        
        AdminUserController patchUserMail = new AdminUserController();   

        if(data.containsKey("userEmail")) {        	
        	// 단일케이스
        	String emailOne = data.getString("userEmail");
        	String nameOne = data.getString("userName");
        	patchUserMail(emailOne, nameOne);
        	
        }else if(data.containsKey("userEmailList")) {        	
        	// 배열케이스             
            String mailLists = data.getString("userEmailList");        
            // mailLists 시작과 끝에 있는 대괄호 substring으로 떼어주기
            int beginIndex = 1;
            int endIndex = mailLists.length()-1;
            String mlResult = mailLists.substring(beginIndex, endIndex);
            System.out.println("mlResult : " + mlResult);        
            // 대괄호 뗀 mlResult에 담긴 이메일들 "," 기준으로 나눠주기
            String[] mailList = mlResult.split(",");
            
            // 이름가져오기
            String nameLists = data.getString("userNameList");
            int beginIndexName = 1;
            int endIndexName = nameLists.length()-1;
            String nlResult = nameLists.substring(beginIndexName, endIndexName);
            String[] nameList = nlResult.split(",");
            
        	if(mailList.length > 0) {
        		for(int i = 0; i < mailList.length; i ++) {
        			String mlOne = mailList[i];
        			String nlOne = nameList[i];
        			patchUserMail(mlOne, nlOne);
        		}
        	}else if (mailList.length == 0) {
        		patchUserMail(mailList[0], nameList[0]);
        	}        	
        }
        
        System.out.println(data);
        
        return userService.updateUserAuth(data);
        
    }
    
    public void patchUserMail(@RequestParam("id") String e_mail, @RequestParam("name") String name) throws Exception {
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
    			+ 				"<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"700\" style=\"width: 700px; height: 900px; text-align: center; position: fixed; background-color:#fbfbfb; border: 1px; border-style: solid; border-color: #d2d2d2; display: block;\">"
    			+ 					"<tr>"
    			+ 						"<td style=\"width: 700px; height: 281px;\"><img src=" + rcicUrl + "/assets/images/main/img_top.gif alt=\"DAMDA\" width=\"698\" height=\"281\"></td>"
    			//+ 						"<td><img src=" + rcicUrl + "/assets/images/main/img_top.gif\" alt=\"DAMDA\" width=\"698\" height=\"281\"></td>"
    			+ 					"</tr>"
    			+ 					"<tr>"
    			+ 						"<td style=\"text-align:center; font-size: 36px; letter-spacing: -3px; font-family: 'Noto Sans KR', sans-serif; color: #222; font-weight: 700; height: 100px; line-height:100px;\">도로변경정보 수집시스템 권한 설정 완료</td>"
    			+ 					"</tr>"
    			+ 					"<tr>"
    			+ 						"<td style=\"font-size: 14px; font-weight: 400; color: #222; width: 165px; text-align: center; padding-top: 35px;\">"
    			+ 							"환영합니다. <span style=\"color: #4385f5; font-weight: 700;\">" + name + "</span> 님,<br>"
    			+ 							"회원님의 <span style=\"color: #4385f5; font-weight: 700;\">" + e_mail + "</span> 로 RCIC 페이지를 이용하실 수 있습니다.<br><br><br>"
    			+							"관리자의 승인으로 권한이 설정되었습니다.<br>"
    			+ 							"RCIC를 이용해 주셔서 감사합니다.<br><br><br>"
    			+							" \"RCIC 홈페이지\" 버튼을 클릭하시면, RCIC 메인화면으로 연결됩니다."
    			+ 						"</td>"
    			+ 					"</tr>"
    			+ 					"<tr>"
    			+ 						"<td style=\"padding-top: 71px;text-align:center;\">"
    			+ 							"<a href="+ rcicUrl +"/rcic/public_main target=\"_blank\" style=\"padding-top: 17px; padding-bottom: 17px; padding-left: 75px; padding-right: 75px; font-size: 16px; cursor: pointer; border-radius: 100px;  border: none; background-color: #4385f5; color: #fff; text-decoration: none;\">RCIC 홈페이지</a>"
    			+ 						"</td>"
    			+ 					"</tr>"
    			+ 					"<tr>"
    			+ 						"<td style=\"background-color: #595959; border: 1px; width: 100%; padding-top: 30px; padding-bottom: 30px; padding-left: 20px; padding-right: 20px; color: #cecece; font-size: 12px; box-sizing: border-box; text-align: center; position: relative; top: 97px;\">본 메일은 발신전용이며, 관련문의는 고객센터를 이용해 주세요.<br>COPYRIGHT(C) LX, ALL RIGHTS RESERVED.</td>"
    			+  					"</tr>"
    			+ 				"</table>"
    			+ 			"</td>"
    			+  		"</tr>"
    			+ "</table>";    
        
        try {
			mail.setSubject("[RCIC] 권한이 설정되었습니다.", "utf-8");
//			mail.setSubject("[RCIC] 회원가입 승인이 완료되었습니다.", "utf-8");
			mail.setText(mailContent, "utf-8", "html"); 
			mail.addRecipient(RecipientType.TO, new InternetAddress(e_mail));
			mail.setFrom(prop.getProperty("sendMailAddr"));
			mailSender.send(mail);
		} catch (MessagingException e) {
			CmmnUtil.setLog(e.getMessage());
		}
    }
    

    
    // ---------------------------------------------------------------------- auth

    /**
     * 권한 목록 페이지
     */
    @RequestMapping("/authInfo/list")
    public String authInfoListPage(Model model) {

        List<Menu> menuList = menuService.getAdminMenuList();

        List<Menu> topMenuList = menuList.stream()
                                         .filter(m -> m.getUpMenuNo() == null)
                                         .sorted(Comparator.comparing(Menu::getMenuCd))
                                         .collect(Collectors.toList());
        topMenuList.stream().forEach(t -> {
            List<Menu> child = menuList.stream()
                    .filter(m -> m.getUpMenuNo() != null && m.getUpMenuNo().equals(t.getId()))
                    .sorted(Comparator.comparing(Menu::getMenuCd))
                    .collect(Collectors.toList());
            t.setChildMenuList(child);
        });

        model.addAttribute("menuList", topMenuList);

        return "admin/user/authInfo";
    }

    /**
     * 권한 목록 데이터
     */
    @RequestMapping("/authInfo/getAuthInfoList")
    @ResponseBody
    public Map<String, Object> getAuthInfoList(HttpServletRequest request) throws Exception {
        return authInfoService.getAuthInfoList(request);
    }

    /**
     * 등록
     */
    @PostMapping(value = "/authInfo/insertAuthInfo", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Map<String, Object> insertAuthInfo(@RequestBody AuthInfo authInfo) throws Exception {
        String currentUserId = SecurityContextHolder.getContext().getAuthentication().getName();

        authInfo.setRegistId(currentUserId);
        authInfo.setUpdtId(currentUserId);

        int result = authInfoService.saveAuthInfo(authInfo);

        Map<String, Object> resultMap = new HashMap<>();
        if (result == -1) {
            resultMap.put("RESULT_CODE", "EXIST");
        } else {
            resultMap.put("RESULT_CODE", "SUCCESS");
        }

        return resultMap;
    }

    /**
     * 수정
     */
    @PostMapping(value = "/authInfo/patchAuthInfo", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Map<String, Object> patchAuthInfo(@RequestBody AuthInfo authInfo) throws Exception {
        String currentUserId = SecurityContextHolder.getContext().getAuthentication().getName();

        authInfo.setUpdtId(currentUserId);

        int result = authInfoService.updateAuthInfoDynamic(authInfo);

        Map<String, Object> resultMap = new HashMap<>();
        if (result == -1) {
            resultMap.put("RESULT_CODE", "EXIST");
        } else {
            resultMap.put("RESULT_CODE", "SUCCESS");
        }

        return resultMap;
    }

    /**
     * 삭제
     */
    @PostMapping(value = "/authInfo/deleteAuthInfo", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Map<String, Object> deleteAuthInfo(@RequestBody AuthInfo authInfo) throws Exception {
        int result = authInfoService.deleteAuthInfo(authInfo);

        Map<String, Object> resultMap = new HashMap<>();
        if (result > 0) {
            resultMap.put("RESULT_CODE", "SUCCESS");
        }

        return resultMap;
    }

    /**
     * 권한 상세 조회
     */
    @GetMapping(value = "/authInfo/getAuthDtl", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public AuthDtl getAuthDtl(@RequestParam Map<String, Object> params) throws Exception {
        return authDtlService.getAuthDtl(params);
    }

    /**
     * 권한 저장
     */
    @PostMapping(value = "/authInfo/saveAuthDtl", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public int saveAuthDtl(@RequestBody AuthDtl authDtl) throws Exception {
        return authDtlService.saveAuthDtl(authDtl);
    }

}
