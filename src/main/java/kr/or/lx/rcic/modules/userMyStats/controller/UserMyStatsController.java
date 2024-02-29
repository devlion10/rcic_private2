package kr.or.lx.rcic.modules.userMyStats.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kr.or.lx.rcic.frmwrk.util.SimpleData;
import kr.or.lx.rcic.frmwrk.web.BaseController;
import kr.or.lx.rcic.modules.userMyStats.entity.UserMyStats;
import kr.or.lx.rcic.modules.userMyStats.service.UserMyStatsService;
import lombok.extern.slf4j.Slf4j;

/**
 *  업무사용자의 나의 통계목록 관리한다.  */
@Controller
@Slf4j
@RequestMapping("/rcic")
public class UserMyStatsController extends BaseController {

    @Autowired
    private UserMyStatsService userMyStatsService;

    // api

    /**
     * 단건 조회
     */
    @RequestMapping("/userMyStats/getUserMyStats")
    @ResponseBody
    public UserMyStats getUserMyStats(HttpServletRequest request, @RequestParam Map params) throws Exception {
        SimpleData simpleData = getSimpleData(request);
        return userMyStatsService.getUserMyStats(simpleData);
    }

    /**
     * 목록 조회
     */
    @RequestMapping("/userMyStats/getUserMyStatsList")
    @ResponseBody
    public Map<String, Object> getUserMyStatsList(HttpServletRequest request) throws Exception {
        return userMyStatsService.getUserMyStatsList(request);
    }

    /**
     * 등록
     */
    @PostMapping("/userMyStats/insertUserMyStats")
    @ResponseBody
    public int insertUserMyStats(HttpServletRequest request) throws Exception {
        return userMyStatsService.insertUserMyStats(getSimpleData(request));
    }

    /**
     * 수정
     */
    @PostMapping("/userMyStats/updateUserMyStats")
    @ResponseBody
    public int updateUserMyStats(HttpServletRequest request, @RequestBody UserMyStats userMyStats) throws Exception {
        return userMyStatsService.updateUserMyStats(userMyStats);
    }


    /**
     * 삭제
     */
    @PostMapping("/userMyStats/deleteUserMyStats")
    @ResponseBody
    public int deleteUserMyStats(HttpServletRequest request) throws Exception {
        return userMyStatsService.deleteUserMyStats(getSimpleData(request));
    }
	
}
