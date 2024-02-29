package kr.or.lx.rcic.modules.g2b.controller;

import kr.or.lx.rcic.frmwrk.web.BaseController;
import kr.or.lx.rcic.modules.board.entity.Notice;
import kr.or.lx.rcic.modules.board.service.NoticeService;
import kr.or.lx.rcic.modules.g2b.service.G2bService;
import lombok.extern.slf4j.Slf4j;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

import java.io.IOException;
import java.util.Map;
import java.util.Properties;

/**
 *  수집 정보를 관리한다.  */
@Controller
@Slf4j
@RequestMapping("/admin/system")
public class G2bController extends BaseController{

    @Autowired
    private G2bService g2bService;
    
    @Value("#{contextProperties}")
    Properties prop = new Properties();

    /**
     * 수집/분석 현황 페이지 이동
     */
    @RequestMapping("/g2b/list")
    public String cbnd(HttpServletRequest request, @RequestParam Map<String, String> params) {
        return "admin/system/g2b/g2b-list";
    }

    /**
     * 수집/분석 현황 리스트 조회
     */
    @RequestMapping("/g2b/getG2bList")
    @ResponseBody
    public Map<String, Object> getG2bList(HttpServletRequest request) throws Exception {
        return g2bService.getG2bList(request);
    }
    
    /**
     * 분석 데이터 건수 조회
     */
    @RequestMapping("/g2b/getAnalCnt/{start}/{end}")
    @ResponseBody
    public Map<String, Object> getAnalCnt(@PathVariable("start") String start, @PathVariable("end") String end, HttpServletRequest request) throws Exception {
        System.out.println("start: " + start + " end: " + end);
    	return g2bService.getAnalCnt(start, end);
    }
    
    /**
     * 공고 데이터 조회
     */
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
     * 공고 데이터 강제 수집
     */
    @GetMapping("/keyword/g2bRun/{start}/{end}")
    @ResponseBody
    public String g2bRun(@PathVariable("start") String start, @PathVariable("end") String end) throws IOException {
        String server = prop.getProperty("collectServerUrl");
        start = start.replace("0000", "");
        end = end.replace("2359", "");

        String uri = String.format("%s/g2b/%s/%s", server, start, end);
        System.out.println("uri:"+uri);
        HttpGet httpGet = new HttpGet(uri);
        httpGet.addHeader("Content-type", "application/json");

        CloseableHttpClient client = HttpClients.createDefault();
        CloseableHttpResponse response = client.execute(httpGet);
        String json = EntityUtils.toString(response.getEntity(), "UTF-8");

        return json;
    }
    
    /**
     *  수집 데이터 강제 분석
     */
    @GetMapping("/keyword/analysisRun/{start}/{end}")
    @ResponseBody
    public String analysisRun(@PathVariable("start") String start, @PathVariable("end") String end) throws IOException {
        String server = prop.getProperty("analysisServerUrl");
        start = start.replace("0000", "");
        end = end.replace("2359", "");

        String uri = String.format("%s/run/%s/%s", server, start, end);
        System.out.println("uri:"+uri);
        HttpGet httpGet = new HttpGet(uri);
        httpGet.addHeader("Content-type", "application/json");

        CloseableHttpClient client = HttpClients.createDefault();
        CloseableHttpResponse response = client.execute(httpGet);
        String json = EntityUtils.toString(response.getEntity(), "UTF-8");

        return json;
    }

}
