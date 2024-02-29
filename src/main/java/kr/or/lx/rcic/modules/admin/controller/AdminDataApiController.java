package kr.or.lx.rcic.modules.admin.controller;

import kr.or.lx.rcic.frmwrk.util.DateUtil;
import kr.or.lx.rcic.frmwrk.util.SimpleData;
import kr.or.lx.rcic.frmwrk.web.BaseController;
import kr.or.lx.rcic.modules.dataProvdInfo.scheduler.MonthlyAnalysisInfoScheduler;
import kr.or.lx.rcic.modules.dataapi.entity.ApiBlockInfo;
import kr.or.lx.rcic.modules.dataapi.entity.ApiUser;
import kr.or.lx.rcic.modules.dataapi.service.ApiBlockInfoService;
import kr.or.lx.rcic.modules.dataapi.service.ApiProvdInfoService;
import kr.or.lx.rcic.modules.dataapi.service.ApiStatisticsService;
import kr.or.lx.rcic.modules.dataapi.service.ApiUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * 어드민 데이터제공 컨트롤러
 */
@Slf4j
@Controller
@RequestMapping("/admin/data-api")
public class AdminDataApiController extends BaseController {

    @Autowired
    private ApiUserService apiUserService;

    @Autowired
    private ApiBlockInfoService apiBlockInfoService;

    @Autowired
    private ApiStatisticsService apiStatisticsService;

    @Autowired
    private ApiProvdInfoService apiProvdInfoService;

    @Autowired
    private MonthlyAnalysisInfoScheduler monthlyAnalysisInfoScheduler;


    // 신청 현황
    @RequestMapping("/reg")
    public String reg(HttpServletRequest request, @RequestParam Map<String, String> params) {
        return "admin/dataapi/reg";
    }

    // 사용 현황
    @RequestMapping("/use-status")
    public String useStatus(HttpServletRequest request, @RequestParam Map<String, String> params) {
        return "admin/dataapi/useStatus";
    }

    // 차단 관리
    @RequestMapping("/blocked")
    public String blockedStatus(HttpServletRequest request, @RequestParam Map<String, String> params) {
        return "admin/dataapi/blocked";
    }

    // 데이터 제공 현황
    @RequestMapping("/data-status")
    public String dataStatus(HttpServletRequest request, @RequestParam Map<String, String> params) {
        return "admin/dataapi/dataStatus";
    }


    // region API사용자 정보
    /**
     * 단건 조회
     */
    @RequestMapping("/getApiUser")
    @ResponseBody
    public ApiUser getApiUser(HttpServletRequest request, @RequestParam Map params) throws Exception {
        SimpleData simpleData = getSimpleData(request);
        return apiUserService.getApiUser(simpleData);
    }

    /**
     * 목록 조회
     */
    @RequestMapping("/getApiUserList")
    @ResponseBody
    public Map<String, Object> getApiUserList(@RequestParam Map<String, Object> param) throws Exception {
        return apiUserService.getApiUserList(param);
    }

    /**
     * 등록
     */
    @PostMapping("/insertApiUser")
    @ResponseBody
    public int insertApiUser(HttpServletRequest request, @RequestBody ApiUser apiUser) throws Exception {
        return apiUserService.saveApiUser(apiUser);
    }

    /**
     * 수정
     */
    @PostMapping("/updateApiUser")
    @ResponseBody
    public int updateApiUser(HttpServletRequest request, @RequestBody ApiUser apiUser) throws Exception {
        return apiUserService.saveApiUser(apiUser);
    }

    /**
     * 동적 수정
     */
    @PostMapping("/patchApiUser")
    @ResponseBody
    public int patchApiUser(HttpServletRequest request, @RequestBody ApiUser apiUser) throws Exception {
        return apiUserService.saveApiUser(apiUser);
    }

    /**
     * 삭제
     */
    @PostMapping("/deleteApiUser")
    @ResponseBody
    public int deleteApiUser(HttpServletRequest request, @RequestBody ApiUser apiUser) throws Exception {
        return apiUserService.deleteApiUser(apiUser);
    }
    // endregion



    // region 차단정보
    /**
     * 목록 조회
     */
    @RequestMapping("/block/getApiBlockInfoList")
    @ResponseBody
    public Map<String, Object> getApiBlockInfoList(@RequestParam Map<String, Object> param) throws Exception {
        return apiBlockInfoService.getApiBlockInfoList(param);
    }

    /**
     * 등록
     */
    @PostMapping("/block/insertApiBlockInfo")
    @ResponseBody
    public int insertApiBlockInfo(HttpServletRequest request, @RequestBody ApiBlockInfo apiBlockInfo) throws Exception {
        return apiBlockInfoService.saveApiBlockInfo(apiBlockInfo);
    }

    /**
     * 수정
     */
    @PostMapping("/block/updateApiBlockInfo")
    @ResponseBody
    public int updateApiBlockInfo(HttpServletRequest request, @RequestBody ApiBlockInfo apiBlockInfo) throws Exception {
        if ("2".equals(apiBlockInfo.getBlockSe())) {
            String today = DateUtil.getThisDay("yyyymmdd");
            apiBlockInfo.setRelisDe(today);
        }

        return apiBlockInfoService.updateApiBlockInfoDynamic(apiBlockInfo);
    }
    // endregion




    /**
     * API 사용 통계 조회
     */
    @RequestMapping("/statistics")
    @ResponseBody
    public List<Map<String, Object>> getApiUseStats(@RequestParam Map<String, Object> param) throws Exception {
        List<Map<String, Object>> list = apiStatisticsService.getApiUseStatistics(param);
        return list;
    }

    /**
     * 데이터 사용 통계 조회
     */
    @RequestMapping("/data-statistics")
    @ResponseBody
    public List<Map<String, Object>> getDataUseStats(@RequestParam Map<String, Object> param) throws Exception {
        List<Map<String, Object>> list = apiStatisticsService.getDataUseStatistics(param);
        return list;
    }


    /**
     * 월간 데이터파일 생성
     * 주의: 서버에 파일 생긴다.
     */
    @GetMapping("/create/monthly-analysis-info")
    @ResponseBody
    public String generateExcelFile(@RequestParam Map<String, String> param) throws Exception {
        monthlyAnalysisInfoScheduler.createMonthlyAnalysisInfo(param.get("roadClass"), param.get("dataKind"), param.get("fileNameSuffix"), param.get("title"), param.get("stdrDe"));
        return "";
    }





}
