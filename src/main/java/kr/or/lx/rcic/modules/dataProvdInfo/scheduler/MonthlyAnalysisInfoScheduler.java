package kr.or.lx.rcic.modules.dataProvdInfo.scheduler;

import java.io.File;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.co.timosoft.util.DateUtil;
import kr.or.lx.rcic.modules.analysisInfo.service.AnalysisInfoFileService;
import kr.or.lx.rcic.modules.dataCntc.service.DataCntcService;
import kr.or.lx.rcic.modules.dataProvdInfo.entity.DataProvdInfo;
import kr.or.lx.rcic.modules.dataProvdInfo.service.DataProvdInfoService;

@Component
public class MonthlyAnalysisInfoScheduler {

    @Value("#{contextProperties}")
    Properties prop = new Properties();

    @Resource(name = "analysisInfoCsvService")
    AnalysisInfoFileService analysisInfoFileService;

    @Autowired
    DataProvdInfoService dataProvdInfoService;
    
    @Autowired
    DataCntcService dataCntcService;

    
    @Scheduled(cron = "0 0 1 10 * *") // 매달 10일 1시
    public void monthlyExpway() throws Exception {
        createMonthlyAnalysisInfo("B500004", "1", "expway_list.csv", "고속도로");
    }

    @Scheduled(cron = "0 10 1 10 * *")
    public void monthlyHighway() throws Exception {
        createMonthlyAnalysisInfo("161", "2", "highway_list.csv", "국도");
    }

    @Scheduled(cron = "0 20 1 10 * *")
    public void monthlyLocalroad() throws Exception {
        createMonthlyAnalysisInfo("99", "3", "localroad_list.csv", "지방도/기타");
    }

    @Scheduled(cron = "0 30 1 10 * *")
    public void monthlyClearDuplicatedData() throws Exception {
        dataProvdInfoService.deleteDuplicatedData();
    }
    
    // 새주소 도로명 연계(일 배치_매일 8시) - 변동분은 매일 07시 기준으로 갱신되기 때문
    @Scheduled(cron = "0 0 8 * * *")
    public void dailyDataCntcRoadName() throws Exception {
    	//String solrServerUrl = prop.getProperty("solrUrl") + "/tl_road_name";
    	//String solrAdminUrl = prop.getProperty("solrUrl") + "/admin";
    	//String days =  DateUtil.getCurrentDateTimeBeforeOneDayHHMI();	
    	//dataCntcService.roadNameDataCntcChangeDo();
    	// Solr-data import
    	//dataCntcService.dataImportDo(solrServerUrl, days, days, "");
		// Solr-Core Reload
    	//dataCntcService.coreReloadDo(solrAdminUrl, "tl_road_name");
    }
    
    // 연속지적도 연계(월 배치_매달 1일  1시) - 대략 12시간 소요, 3900만건의 전체분 
    @Scheduled(cron = "0 0 1 1 * *")
    public void monthlyCbndAPI() throws Exception {
    	//String solrServerUrl = prop.getProperty("solrUrl") + "/tb_cbnd_info";
    	//String days =  DateUtil.getCurrentDateTimeBeforeOneDayHHMI();	
    	// vworld 연속지적도 API연계
    	//dataCntcService.cbndAPIDo();
    	// Solr-data import
    	//dataCntcService.dataImportDo(solrServerUrl, days, days, "240");
    }
    
    // 행정경계 연계(매달 1일 4시) ( cron = "0 0 8 1 * ?" -> 월 배치_매달 1일 8시 )
    @Scheduled(cron = "0 0 4 1 * *")
    public void monthlyLegaldongAPI() throws Exception {
    	//String solrServerUrl_sido = prop.getProperty("solrUrl") + "/legaldong_sido";
    	//String solrServerUrl_sgg = prop.getProperty("solrUrl") + "/legaldong_sgg";
    	//String solrServerUrl_emd = prop.getProperty("solrUrl") + "/legaldong_emd";
    	//String solrServerUrl_li = prop.getProperty("solrUrl") + "/legaldong_li";
    	//String days = DateUtil.getCurrentDateTimeBeforeOneDayHHMI();
    	// vworld 연속지적도
    	//API연계 
    	//dataCntcService.legaldongAPIDo();
    	// Solr-data import
    	//dataCntcService.dataImportDo(solrServerUrl_sido, days, days, "");
    	//dataCntcService.dataImportDo(solrServerUrl_sgg, days, days, "");
    	//dataCntcService.dataImportDo(solrServerUrl_emd, days, days, "");
    	//dataCntcService.dataImportDo(solrServerUrl_li, days, days, "");
    }
    
    
    @Scheduled(cron = "*/5 * * * * *")
    public void SchedulerTestDo() {
    	//System.out.println("dely 5000");
    }
    
    @RequestMapping("/make1")
    public void make1(HttpServletRequest req, HttpServletResponse res) throws Exception {
    	String yyyymm = req.getParameter("yyyymm");
    	make("B500004", "1", "expway_list.csv", "고속도로", yyyymm);
    }
    @RequestMapping("/make2")
    public void make2(HttpServletRequest req, HttpServletResponse res) throws Exception {
    	String yyyymm = req.getParameter("yyyymm");
    	make("161", "2", "highway_list.csv", "국도", yyyymm);
    }
    @RequestMapping("/make3")
    public void make3(HttpServletRequest req, HttpServletResponse res) throws Exception {
    	String yyyymm = req.getParameter("yyyymm");
    	make("99", "3", "localroad_list.csv", "지방도/기타", yyyymm);
    }



    public void createMonthlyAnalysisInfo(String roadClass, String dataKind, String fileNameSuffix, String title, String yyyyMM) throws Exception {
        YearMonth nowYearMonth = YearMonth.parse(yyyyMM, DateTimeFormatter.ofPattern("yyyyMM"));

        String filePath = prop.getProperty("uploadBaseDir") + "/analysisinfo/" + yyyyMM;
        String fileName = String.format("%s_%s", yyyyMM, fileNameSuffix);

        Map<String, Object> param = new HashMap<>();
        param.put("roadClass", roadClass);
        param.put("startDt", yyyyMM + "01");
        param.put("endDt", nowYearMonth.atEndOfMonth().format(DateTimeFormatter.ofPattern("yyyyMMdd")));
        File file = analysisInfoFileService.generateExcel(param, filePath, fileName);

        if (file.exists()) {
            DataProvdInfo data = new DataProvdInfo();
            data.setDataKnd(dataKind);
            data.setDataNm(String.format("%s %s 공사현황", nowYearMonth.format(DateTimeFormatter.ofPattern("yyyy년 MM월")), title));
            data.setDataDc(String.format("해당 월에 수집된 전국 %s 공사 목록 데이터입니다.", title));
            data.setStdrDe(yyyyMM);
            data.setFilePath(filePath);
            data.setFileName(fileName);
            data.setFileSize(file.length());
            data.setFileTy("5"); // txt
            data.setSpceCntm("EPSG 4326");
            dataProvdInfoService.insertDataProvdInfo(data);
        }
    }

    // 월간 파일 만들기
    public void createMonthlyAnalysisInfo(String roadClass, String dataKind, String fileNameSuffix, String title) throws Exception {
        // 지난달
        YearMonth nowYearMonth = YearMonth.now().minus(1, ChronoUnit.MONTHS);
        createMonthlyAnalysisInfo(roadClass, dataKind, fileNameSuffix, title, nowYearMonth.format(DateTimeFormatter.ofPattern("yyyyMM")));
    }
    
 // 월간 파일 만들기
    public void make(String roadClass, String dataKind, String fileNameSuffix, String title, String yyyymm) throws Exception {
        // 지난달
        createMonthlyAnalysisInfo(roadClass, dataKind, fileNameSuffix, title, yyyymm);

    }


}
