package kr.or.lx.rcic.modules.admin.controller;

import kr.or.lx.rcic.modules.code.entity.CodeDetail;
import kr.or.lx.rcic.modules.code.entity.CodeGroup;
import kr.or.lx.rcic.modules.code.service.CodeDetailService;
import kr.or.lx.rcic.modules.code.service.CodeGroupService;
import kr.or.lx.rcic.modules.code.service.CodeService;
import kr.or.lx.rcic.modules.serviceinfo.service.ServiceInfoService;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.BadRequestException;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Properties;

/**
 * 어드민 참조정보관리 컨트롤러
 */
@Controller
@RequestMapping("/admin/cmm")
public class AdminCmmController {

    @Autowired
    ServiceInfoService serviceInfoService;

    @Autowired
    CodeService codeService;

    @Autowired
    private CodeGroupService codeGroupService;

    @Autowired
    private CodeDetailService codeDetailService;

    @Value("#{contextProperties}")
    Properties prop = new Properties();


    // 수집분석 키워드
    @RequestMapping("/keyword")
    public String keyword(@RequestParam Map<String, String> params) {
        return "admin/cmm/keyword";
    }

    // 공통 코드
    @RequestMapping("/code")
    public String code(@RequestParam Map<String, String> params) {
        return "admin/cmm/code";
    }

    // 연계목록
    @RequestMapping("/interface")
    public String interfaceList(@RequestParam Map<String, String> params, ModelMap modelMap) throws Exception {
        modelMap.addAttribute("insttList", serviceInfoService.getInsttList()); // 기관목록
        return "admin/cmm/interface";
    }

    @GetMapping("/keyword/test/{start}/{end}/{word}")
    @ResponseBody
    public String testKeywordColl(@PathVariable("start") String start, @PathVariable("end") String end, @PathVariable("word") String word) throws IOException {
        String server = prop.getProperty("collectServerUrl");

        String uri = String.format("%s/g2bTest/%s/%s/%s", server, start, end, word);
        System.out.println("uri:"+uri);
        HttpGet httpGet = new HttpGet(uri);
        httpGet.addHeader("Content-type", "application/json");

        CloseableHttpClient client = HttpClients.createDefault();
        CloseableHttpResponse response = client.execute(httpGet);
        String json = EntityUtils.toString(response.getEntity(), "UTF-8");

        return json;
    }

    /**
     * 연계목록 조회
     */
    @RequestMapping("/getServiceInfoList")
    @ResponseBody
    public Map<String, Object> getServiceInfoList(@RequestParam Map<String, Object> params) throws Exception {
        return serviceInfoService.getServiceInfoList(params);
    }

    /**
     * 단건 조회
     */
    @RequestMapping("/code/getCodeGroup")
    @ResponseBody
    public CodeGroup getCodeGroup(HttpServletRequest request, @RequestParam Map params) throws Exception {
        CodeGroup codeGroup = codeGroupService.getCodeGroup(params);
        return codeGroup;
    }

    /**
     * 목록 조회
     */
    @RequestMapping("/code/getCodeGroupList")
    @ResponseBody
    public Map<String, Object> getCodeGroupList(@RequestParam Map param) throws Exception {
        return codeGroupService.getCodeGroupList(param);
    }

    /**
     * 등록
     */
    @PostMapping("/code/saveCodeGroup")
    @ResponseBody
    public int insertCodeGroup(HttpServletRequest request, @RequestBody CodeGroup codeGroup) throws Exception {
        return codeGroupService.saveCodeGroup(codeGroup);
    }

    /**
     * 수정
     */
//    @PostMapping("/code/updateCodeGroup")
//    @ResponseBody
//    public int updateCodeGroup(HttpServletRequest request, @RequestBody CodeGroup codeGroup) throws Exception {
//        return codeGroupService.saveCodeGroup(codeGroup);
//    }

    /**
     * 삭제
     */
    @PostMapping("/code/deleteCodeGroupList")
    @ResponseBody
    public int deleteCodeGroup(@RequestBody Map<String, Object> param) throws Exception {
        List<String> codeGroupList = (List<String>) param.get("codeGroupList");
        if (CollectionUtils.isEmpty(codeGroupList)) {
            throw new BadRequestException("codeGroupList is empty.");
        }
        return codeGroupService.deleteCodeGroupList(codeGroupList);
    }

    /**
     * 단건 조회
     */
    @RequestMapping("/code/getCodeDetail")
    @ResponseBody
    public CodeDetail getCodeDetail(HttpServletRequest request, @RequestParam Map params) throws Exception {
        return codeDetailService.getCodeDetail(params);
    }

    /**
     * 목록 조회
     */
    @RequestMapping("/code/getCodeDetailList")
    @ResponseBody
    public Map<String, Object> getCodeDetailList(@RequestParam Map params) throws Exception {
        if (StringUtils.isNotEmpty((String) params.get("codeGroupList"))) {
            String[] groups = ((String) params.get("codeGroupList")).split(",");
            params.put("codeGroupList", Arrays.asList(groups));
        }

        return codeDetailService.getCodeDetailList(params);
    }

    /**
     * 등록
     */
    @PostMapping("/code/saveCodeDetail")
    @ResponseBody
    public int insertCodeDetail(HttpServletRequest request, @RequestBody CodeDetail codeDetail) throws Exception {
        return codeDetailService.saveCodeDetail(codeDetail);
    }

    /**
     * 수정
     */
    @PostMapping("/code/updateCodeDetail")
    @ResponseBody
    public int updateCodeDetail(HttpServletRequest request, @RequestBody CodeDetail codeDetail) throws Exception {
        return codeDetailService.saveCodeDetail(codeDetail);
    }

    /**
     * 삭제
     */
    @PostMapping("/code/deleteCodeDetailList")
    @ResponseBody
    public int deleteCodeDetail(@RequestBody Map<String, Object> param) throws Exception {
        String codeGroup = (String) param.get("codeGroup");
        List<String> codeList = (List<String>) param.get("codeList");
        if (CollectionUtils.isEmpty(codeList)) {
            throw new BadRequestException("codeList is empty.");
        }
        return codeDetailService.deleteCodeDetailList(codeGroup, codeList);
    }

    /**
     * 삭제
     */
    @PostMapping("/code/deleteCodeDetailMapList")
    @ResponseBody
    public int deleteCodeDetailMapList(@RequestBody Map<String, Object> param) throws Exception {
        List<Map<String, String>> codeList = (List<Map<String, String>>) param.get("codeMapList");
        return codeDetailService.deleteCodeDetailMapList(codeList);
    }


}
