package kr.or.lx.rcic.modules.admin.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.or.lx.rcic.modules.mlearning.service.MachineLearningService;
import lombok.extern.slf4j.Slf4j;

/**
 * 어드민 머신러닝 컨트롤러
 */
@Controller
@RequestMapping("/admin/mach-learn")
@Slf4j
public class AdminMachineLearningController {

    @Autowired
    MachineLearningService service;
    
    @Value("#{contextProperties}")
	Properties prop = new Properties();
    

    // 공고수집모델
    @GetMapping("/light")
    public String lightModelPage(HttpServletRequest request, @RequestParam Map<String, String> params) {
        return "admin/machlearn/light";
    }

    // 최대반경결정모델
    @GetMapping("/linear")
    public String linearModelPage(HttpServletRequest request, @RequestParam Map<String, String> params) {
        return "admin/machlearn/linear";
    }


    // 공고수집모델 - 모델학습 목록
    @GetMapping("/light/log")
    @ResponseBody
    public Map lightLog(@RequestParam Map param) throws Exception {
        return service.getLightLogList(param);
    }

    // 공고수집모델 - 모델분석결과 추가수집할공고 목록
    @GetMapping("/light/result/omission")
    @ResponseBody
    public Map lightResult1(@RequestParam Map param) throws Exception {
        return service.getLightResultOmissionList(param);
    }

    // 공고수집모델 - 모델분석결과 잘못수집된공고 목록
    @GetMapping("/light/result/wrong")
    @ResponseBody
    public Map lightResult2(@RequestParam Map param) throws Exception {
        return service.getLightResultWrongList(param);
    }

    // 공고수집모델 실행
    @PostMapping("/light/runModelPy")
    @ResponseBody
    public Map runPy(@RequestParam Map param) throws Exception {
     
    	try {
    		System.setProperty("python.cachedir.skip", "true");
    		String url = prop.getProperty("ml_server")+"/light/runModelPy";
    		kr.co.timosoft.util.CmmnUtil.sendGet(url);
		} catch (Exception e) {
            log.error("파이썬 호출 오류");
            log.error(e.getMessage(), e);
			e.printStackTrace();
		}

        Map result = new HashMap();
        result.put("result", "success");
        return result;
    }

    // 최대반경결정 모델 - 모델학습 목록
   @GetMapping("/linear/log")
    @ResponseBody
    public Map linearLog(@RequestParam Map param) throws Exception {
        return service.getLinearLogList(param);
    }

    // 최대반경결정 모델 - 모델분석결과 위치포착 목록
    @GetMapping("/linear/result/caught")
    @ResponseBody
    public Map linearResult1(@RequestParam Map param) throws Exception {
        return service.getLinearResultCaughtList(param);
    }

    // 최대반경결정 모델 - 모델분석결과 위치미포착 목록
    @GetMapping("/linear/result/missed")
    @ResponseBody
    public Map linearResult2(@RequestParam Map param) throws Exception {
        return service.getLinearResultMissedList(param);
    }

    // 공고수집모델 실행
    @PostMapping("/linear/runModelPy")
    @ResponseBody
    public Map linearRunPy(@RequestParam Map param) throws Exception {
        try {
            String url = prop.getProperty("ml_server")+"/linear/runModelPy";
    		kr.co.timosoft.util.CmmnUtil.sendGet(url);
        } catch (Exception e) {
            log.error("파이썬 호출 오류");
            log.error(e.getMessage(), e);
            e.printStackTrace();
        }

        Map result = new HashMap();
        result.put("result", "success");
        return result;
    }

}
