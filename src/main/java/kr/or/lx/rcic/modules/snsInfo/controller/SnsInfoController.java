package kr.or.lx.rcic.modules.snsInfo.controller;

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
import kr.or.lx.rcic.modules.snsInfo.entity.SnsInfo;
import kr.or.lx.rcic.modules.snsInfo.service.SnsInfoService;
import lombok.extern.slf4j.Slf4j;

/**
 *  SNS(트위터)에서 수집된 정보를 관리한다.  */
@Controller
@Slf4j
@RequestMapping("/rcic")
public class SnsInfoController extends BaseController {

    @Autowired
    private SnsInfoService snsInfoService;

    // api

    /**
     * 단건 조회
     */
    @RequestMapping("/snsInfo/getSnsInfo")
    @ResponseBody
    public SnsInfo getSnsInfo(HttpServletRequest request, @RequestParam Map params) throws Exception {
        SimpleData simpleData = getSimpleData(request);
        return snsInfoService.getSnsInfo(simpleData);
    }

    /**
     * 목록 조회
     */
    @RequestMapping("/snsInfo/getSnsInfoList")
    @ResponseBody
    public Map<String, Object> getSnsInfoList(HttpServletRequest request) throws Exception {
        return snsInfoService.getSnsInfoList(request);
    }

    /**
     * 등록
     */
    @PostMapping("/snsInfo/insertSnsInfo")
    @ResponseBody
    public int insertSnsInfo(HttpServletRequest request, @RequestBody SnsInfo snsInfo) throws Exception {
        return snsInfoService.saveSnsInfo(snsInfo);
    }

    /**
     * 수정
     */
    @PostMapping("/snsInfo/updateSnsInfo")
    @ResponseBody
    public int updateSnsInfo(HttpServletRequest request, @RequestBody SnsInfo snsInfo) throws Exception {
        return snsInfoService.saveSnsInfo(snsInfo);
    }

    /**
     * 동적 수정
     */
    @PostMapping("/snsInfo/patchSnsInfo")
    @ResponseBody
    public int patchSnsInfo(HttpServletRequest request, @RequestBody SnsInfo snsInfo) throws Exception {
        return snsInfoService.saveSnsInfo(snsInfo);
    }

    /**
     * 삭제
     */
    @PostMapping("/snsInfo/deleteSnsInfo")
    @ResponseBody
    public int deleteSnsInfo(HttpServletRequest request, @RequestBody SnsInfo snsInfo) throws Exception {
        return snsInfoService.deleteSnsInfo(snsInfo);
    }

}
