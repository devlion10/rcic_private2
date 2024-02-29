package kr.or.lx.rcic.modules.accdntInfoApi.controller;

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
import kr.or.lx.rcic.modules.accdntInfoApi.entity.AccdntInfoApi;
import kr.or.lx.rcic.modules.accdntInfoApi.service.AccdntInfoApiService;
import lombok.extern.slf4j.Slf4j;

/**
 *  */
@Controller
@Slf4j
@RequestMapping("/rcic")
public class AccdntInfoApiController extends BaseController {

    @Autowired
    private AccdntInfoApiService accdntInfoApiService;

    // api

    /**
     * 단건 조회
     */
    @RequestMapping("/accdntInfoApi/getAccdntInfoApi")
    @ResponseBody
    public AccdntInfoApi getAccdntInfoApi(HttpServletRequest request, @RequestParam Map params) throws Exception {
        SimpleData simpleData = getSimpleData(request);
        return accdntInfoApiService.getAccdntInfoApi(simpleData);
    }

    /**
     * 목록 조회
     */
    @RequestMapping("/accdntInfoApi/getAccdntInfoApiList")
    @ResponseBody
    public Map<String, Object> getAccdntInfoApiList(HttpServletRequest request) throws Exception {
        return accdntInfoApiService.getAccdntInfoApiList(request);
    }

    /**
     * 등록
     */
    @PostMapping("/accdntInfoApi/insertAccdntInfoApi")
    @ResponseBody
    public int insertAccdntInfoApi(HttpServletRequest request, @RequestBody AccdntInfoApi accdntInfoApi) throws Exception {
        return accdntInfoApiService.saveAccdntInfoApi(accdntInfoApi);
    }

    /**
     * 수정
     */
    @PostMapping("/accdntInfoApi/updateAccdntInfoApi")
    @ResponseBody
    public int updateAccdntInfoApi(HttpServletRequest request, @RequestBody AccdntInfoApi accdntInfoApi) throws Exception {
        return accdntInfoApiService.saveAccdntInfoApi(accdntInfoApi);
    }

    /**
     * 동적 수정
     */
    @PostMapping("/accdntInfoApi/patchAccdntInfoApi")
    @ResponseBody
    public int patchAccdntInfoApi(HttpServletRequest request, @RequestBody AccdntInfoApi accdntInfoApi) throws Exception {
        return accdntInfoApiService.saveAccdntInfoApi(accdntInfoApi);
    }

    /**
     * 삭제
     */
    @PostMapping("/accdntInfoApi/deleteAccdntInfoApi")
    @ResponseBody
    public int deleteAccdntInfoApi(HttpServletRequest request, @RequestBody AccdntInfoApi accdntInfoApi) throws Exception {
        return accdntInfoApiService.deleteAccdntInfoApi(accdntInfoApi);
    }

}
