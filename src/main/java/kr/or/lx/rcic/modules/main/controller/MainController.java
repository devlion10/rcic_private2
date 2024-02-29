package kr.or.lx.rcic.modules.main.controller;

import kr.or.lx.rcic.frmwrk.user.RcicAutehnticationMessageException;
import kr.or.lx.rcic.frmwrk.user.User;
import kr.or.lx.rcic.frmwrk.util.CmmnUtil;
import kr.or.lx.rcic.modules.initiationReport.entity.InitiationReportDTO;
import kr.or.lx.rcic.modules.main.service.MainService;
import kr.or.lx.rcic.modules.userMyStats.mapper.UserMyStatsMapper;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.ModelMap;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.ws.rs.BadRequestException;
import java.io.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

/**
 * @Class Name : MainController.java
 * @Description : 공통 코드 및 공용 API용 컨트롤러
 * @Modification   Information
 * @
 * @  수정일        수정자              수정내용
 * @ ---------    ---------   -------------------------------
 * @ 2018.11.11    김한욱	    	 최초생성
 *
 *    Copyright (C) by geo All right reserved.
 */

@RequestMapping(value="/rcic")
@Slf4j
@RestController
public class MainController {

	@Autowired
	MainService service;

	@Autowired
    private UserMyStatsMapper userMyStatsMapper;

	private String mapUrl;

	@Value("#{contextProperties}")
	Properties prop = new Properties();

	private Logger logger = LoggerFactory.getLogger(getClass());

	CmmnUtil commonUtil = new CmmnUtil();

	@RequestMapping(value = "/getServerInfo")
	public HashMap getServerInfo(ModelMap model, HttpServletRequest req, HttpServletResponse res, ModelAndView mv, Authentication auth) throws Exception{
		return service.getServerInfo(req);
	}


	/**********************************************
	 *  1. 개요 :  메인
	 *	2. 처리내용 :
	 * 	@Method publicMainPage
	 *  @param model
	 *  @param param
	 *  @param req
	 *  @param res
	 *  @return
	 **********************************************/
	@RequestMapping(value = "/public_main")
	public ModelAndView publicMainPage(ModelMap model, @RequestParam Map<String, Object> param, HttpServletRequest req, HttpServletResponse res, ModelAndView mv, Authentication auth){
		//2023.08.28
		if(auth != null){
			User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal(); //로그인 사용자 정보 조회
			HashMap userDetail = (HashMap)user.getExtInfo();
			Map<String, String> userMenuAuth = user.getAuthInfo();

			mv.addObject("menuAuth",userMenuAuth);
		}

		String clientIp = req.getHeader("X-FORWARDED-FOR");
	        if (clientIp == null)
	        	clientIp = req.getRemoteAddr();
	    HttpSession session =req.getSession(true);
	    session.setAttribute("clientIp", clientIp);

		String menuId = req.getParameter("menuId")==null?"main":(String)req.getParameter("menuId");
		mv.addObject("menuId",menuId);
		model.addAttribute("param", param);
		model.addAttribute("clientIp", clientIp);
		mv.addAllObjects(model);
		mv.setViewName("public/public_main");
		return mv;

	}


	@SuppressWarnings("rawtypes")
	public ModelAndView MainPage(HttpServletRequest request, HttpServletResponse response) throws Exception{

		String redirectUrl ="mainPage";
		String errorPage = "redirect/redirect";
		String redirectServerUrl = request.getServerName()+":"+request.getServerPort();

		ModelAndView mv = new ModelAndView();
		HttpSession session = request.getSession();

		mv.addObject("redirectServerUrl", redirectServerUrl);

		try {

		    String deviceType =request.getParameter("deviceType")==null ?"" :CmmnUtil.converterReplace((String)request.getParameter("deviceType"));
		    String browserVersion =request.getParameter("browserVersion")==null ?"" :CmmnUtil.converterReplace((String)request.getParameter("browserVersion"));
		    String forwardUrl =request.getParameter("forwardUrl")==null ?redirectUrl :CmmnUtil.converterReplace((String)request.getParameter("forwardUrl"));

		    if(browserVersion==null || deviceType==null){
			   redirectUrl=errorPage;
		    }

		    session.setAttribute("device",deviceType);
		    session.setAttribute("browserVersion",browserVersion);
		    mv.addObject("device", deviceType);
		    mv.addObject("browserVersion", browserVersion);
		    mv.addObject("forwardUrl", forwardUrl);

		} catch (Exception e) {
			throw new Exception(e);
		}
		mv.setViewName(redirectUrl);
		return mv;
	}


	@RequestMapping(value = "/main/selectSidoList")
	public HashMap<String, Object> selectSidoList(HttpServletRequest req, HttpServletResponse res, ModelAndView mv)  throws Exception {

		return service.selectSidoList(req);
	}


	@RequestMapping(value = "/main/selectSggList")
	public HashMap<String, Object> selectSggList(HttpServletRequest req, HttpServletResponse res, ModelAndView mv)  throws Exception {

		return service.selectSggList(req);
	}
	@RequestMapping(value = "/main/selectEmdList")
	public HashMap<String, Object> selectEmdList(HttpServletRequest req, HttpServletResponse res, ModelAndView mv)  throws Exception {

		return service.selectEmdList(req);
	}


	@SuppressWarnings("unused")
	@RequestMapping(value = "/movePage")
	public ModelAndView movePage(ModelAndView mv,
		   @RequestParam(name = "menuId", required = false) String menuId,
		   @RequestParam(name = "gbn", required = false) String gbn,
			@RequestParam(name = "authNo", required = false) String authNo,
			@RequestParam(name = "type", required = false) String type,
			@RequestParam(name = "noticeNo", required = false) String noticeNo, Authentication auth) throws IOException{

		String mapUrl = prop.getProperty("GeoserverUrl");
		mv.addObject("gbn",gbn);
		mv.addObject("mapUrl",prop.getProperty("GeoserverUrl"));
		mv.addObject("type",type);
		mv.addObject("noticeNo",noticeNo);
		mv.addObject("menuId",menuId);
		mv.addObject("kakaoMapApiKey",prop.getProperty("kakaoMapApiKey"));
		if("".equals(menuId)) {
			mv.setViewName("public/public_main");
		}else {

			if(auth == null) {
				if("mypage".equals(menuId)) {
					mv.addObject("movePageYn", "N");
		            mv.setViewName("public/public_main");

				}else {
					mv.setViewName("mainPage/"+menuId);
				}

//				if("mypage".equals(menuId) || "corporation".equals(menuId) || "collection".equals(menuId)) {
//					mv.addObject("movePageYn", "N");
//		            mv.setViewName("public/public_main");
//
//				}else {
//					mv.setViewName("mainPage/"+menuId);
//				}
			}else {

				User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal(); //로그인 사용자 정보 조회
				HashMap userDetail = (HashMap)user.getExtInfo();
				Map<String, String> userMenuAuth = user.getAuthInfo();

				mv.addObject("menuAuth",userMenuAuth);
				//{M_100=Y, M_300=Y, M_200=Y, M_500=Y, M_400=Y, M_700=Y, M_600=Y}
				String isAccess="Y";
				switch (menuId) {
					case "about":
						isAccess="Y";
					break;
					case "corporation":
						isAccess=userMenuAuth.get("M_100");
						break;
					case "collection":
						isAccess=userMenuAuth.get("M_200");
						break;
					case "dataApi":
						isAccess=userMenuAuth.get("M_300");
						break;
					case "board":
						isAccess=userMenuAuth.get("M_400");
						break;
					case "sns":
						isAccess=userMenuAuth.get("M_500");
						break;
					case "map":
						isAccess=userMenuAuth.get("M_600");
					case "mmap":
						isAccess=userMenuAuth.get("M_600");
						break;
					case "mypage":
						isAccess=userMenuAuth.get("M_700");
						break;
					case "initiationReport":
						isAccess=userMenuAuth.get("M_800");
						break;
					default:
						isAccess ="N";
						break;
				}
				if("mypage".equals(menuId)) {
	            	HashMap<String, Object> param = new HashMap<String, Object>();
		            param.put("userSeq", user.getUserNo());
		            List<Map<String, Object>> list = userMyStatsMapper.selectUserMyStatsList(param);
		        	mv.addObject("list",list);
	            }

				mv.setViewName("mainPage/"+menuId);
				if(isAccess.equals("Y")) {
					mv.setViewName("mainPage/"+menuId);
				}else {
				   mv.addObject("msg", "접근권한이 없습니다.");
				   mv.setViewName("public/public_main");
				}
			}

			if("map".equals(menuId)) {
				mv.setViewName("map/"+menuId);
			}

			if("mmap".equals(menuId)) {
				mv.setViewName("mobile/"+menuId);
			}
		}

		return mv;
	}

	@RequestMapping("/onlineHelpFileDown")
	public void getOnlineHelpFileDown(HttpServletResponse response, Authentication auth) throws Exception {
		logger.debug("getOnlineHelpFileDown__");
		String fileId = "";

		String rootFilePath_window = prop.getProperty("onlineHelpFilePath_window");
		String rootFilePath_linux = prop.getProperty("onlineHelpFilePath_linux");
		String osName = System.getProperty("os.name");

		if(auth != null) {
			User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (osName.contains("Windows") || osName.contains("windows") || osName.contains("Mac")) {
                log.info("OS Name: {}", osName);
                if (user.getRole().equals("ROLE_ADMIN")) {
                    fileId = "1";
                } else {
                    fileId = "2";
                }
            } else {
                log.info("OS Name: {}", osName);
                if (user.getRole().equals("ROLE_ADMIN")) {
                    fileId = "3";
                } else {
                    fileId = "4";
                }
            }
        } else {
			if (osName.contains("Windows") || osName.contains("windows") || osName.contains("Mac")) {
				log.info("OS Name: {}", osName);
				fileId = "2";
			} else {
				log.info("OS Name: {}", osName);
				fileId = "4";
			}
		}

		Map<String, Object> fileInfo = service.getAtchHelpFileInfo(fileId);

		if (fileInfo == null) {
			log.warn("존재하지 않는 파일 정보를 요청하였음. 파일ID: {}", fileId);
			throw new BadRequestException("존재하지 않는 파일ID:" + fileId);
		}

		String fileLc = fileInfo.get("atchfilelc").toString();
		String fileNm = fileInfo.get("atchfilenm").toString();
		String fileOriFileNm = fileInfo.get("originalfilenm").toString();

		String filePath = fileLc; // 첨부파일위치
		String fullFilePath = filePath + fileNm;// 첨부파일명

		File localFile = new File(fullFilePath);
		if (localFile.exists() == false) {
			CmmnUtil.setLog("서버에 파일이 존재하지 않음");
			throw new RuntimeException("서버에 파일이 존재하지 않습니다.");
		}

		// 실제 다운로드 될 파일명 셋팅
		String downloadFileName = fileOriFileNm; // 원본파일명
		String encodedFileName = new String(downloadFileName.getBytes("UTF-8"), "ISO-8859-1");

		response.setHeader("Content-Disposition", "attachment; filename=\"" + encodedFileName + "\";");
		response.setHeader("Content-Transfer-Encoding", "binary");

		OutputStream out = response.getOutputStream();
		InputStream fis = null;
		try {
			fis = new FileInputStream(localFile);
			FileCopyUtils.copy(fis, out);
		} catch (Exception e) {
			CmmnUtil.setLog(e.getMessage());
		} finally {
			IOUtils.closeQuietly(fis);
		}

		out.flush();
	}

}