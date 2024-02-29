package kr.or.lx.rcic.modules.userMyRoadwork.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.or.lx.rcic.frmwrk.util.SimpleData;
import kr.or.lx.rcic.frmwrk.web.BaseController;
import kr.or.lx.rcic.modules.userMyRoadwork.entity.UserMyRoadwork;
import kr.or.lx.rcic.modules.userMyRoadwork.service.UserMyRoadworkService;
import lombok.extern.slf4j.Slf4j;

/**
 *  업무사용자의 도로공사 관심목록을 관리한다.  */
@Controller
@Slf4j
@RequestMapping("/rcic")
public class UserMyRoadworkController extends BaseController {

    @Autowired
    private UserMyRoadworkService userMyRoadworkService;

    // api

    /**
     * 단건 조회
     */
    @RequestMapping("/userMyRoadwork/getUserMyRoadwork")
    @ResponseBody
    public UserMyRoadwork getUserMyRoadwork(HttpServletRequest request, @RequestParam Map params) throws Exception {
        SimpleData simpleData = getSimpleData(request);
        return userMyRoadworkService.getUserMyRoadwork(simpleData);
    }

    /**
     * 목록 조회
     */
    @RequestMapping("/userMyRoadwork/getUserMyRoadworkList")
    @ResponseBody
    public Map<String, Object> getUserMyRoadworkList(HttpServletRequest request) throws Exception {
        return userMyRoadworkService.getUserMyRoadworkList(request);
    }
    
    /**
     * 목록 조회
     */
    @RequestMapping("/userMyRoadwork/getFavorList")
    @ResponseBody
    public Map<String, Object> getFavorList(HttpServletRequest request) throws Exception {
        return userMyRoadworkService.getFavorList(request);
    }

    /**
     * 등록
     */
    @PostMapping("/userMyRoadwork/insertUserMyRoadwork")
    @ResponseBody
    public int insertUserMyRoadwork(HttpServletRequest request) throws Exception {
    	return userMyRoadworkService.insertUserMyRoadwork(getSimpleData(request));
    }

    /**
     * 수정
     */
    @PostMapping("/userMyRoadwork/updateUserMyRoadwork")
    @ResponseBody
    public int updateUserMyRoadwork(HttpServletRequest request, @RequestBody UserMyRoadwork userMyRoadwork) throws Exception {
        return userMyRoadworkService.updateUserMyRoadwork(getSimpleData(request));
    }

    /**
     * 삭제
     */
    @PostMapping("/userMyRoadwork/deleteUserMyRoadwork")
    @ResponseBody
    public int deleteUserMyRoadwork(HttpServletRequest request) throws Exception {
        return userMyRoadworkService.deleteUserMyRoadwork(getSimpleData(request));
    }

}
