package kr.or.lx.rcic.modules.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import kr.co.timosoft.rcic.search.TimoSolrService;
import kr.or.lx.rcic.frmwrk.util.CmmnUtil;
import kr.or.lx.rcic.frmwrk.util.DateUtil;
import kr.or.lx.rcic.frmwrk.web.BaseController;
import kr.or.lx.rcic.modules.analysis.service.AnalysisService;
import kr.or.lx.rcic.modules.analysisInfo.service.AnalysisInfoService;
import kr.or.lx.rcic.modules.api.entity.AnalysisInfoResonse;
import kr.or.lx.rcic.modules.api.entity.CodeResponse;
import kr.or.lx.rcic.modules.api.exception.*;
import kr.or.lx.rcic.modules.code.service.CodeDetailService;
import kr.or.lx.rcic.modules.dataapi.entity.ApiUseDtl;
import kr.or.lx.rcic.modules.dataapi.entity.ApiUser;
import kr.or.lx.rcic.modules.dataapi.service.ApiUseDtlService;
import kr.or.lx.rcic.modules.dataapi.service.ApiUserService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.hsqldb.StatementQuery;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.InvocationTargetException;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

/*
api_provd_no
1: 고속도로 공사현황
2: 국도 공사현황
3: 지방도/기타 공사현황
4: 공사종류 및 시설종류 코드목록
 */
@RestController
@RequestMapping("/api")
@Slf4j
public class ExternalApiController extends BaseController {
    private Logger logger = LoggerFactory.getLogger(getClass());
    @Value("#{contextProperties}")
    Properties prop = new Properties();

    @Autowired
    CodeDetailService codeService;

    @Autowired
    ApiUserService apiUserService;

    @Autowired
    ApiUseDtlService apiLogService;

    @Autowired
    AnalysisInfoService analysisInfoService;
    @Autowired
    private AnalysisService analysisService;


    private final TimoSolrService solrService2;
    private final List<String> requiredParams;
    private final List<String> optionalParams;
    private final List<String> allowCodeGbParams;

    ExternalApiController() {
        this.solrService2 = new TimoSolrService(prop.getProperty("solrUrl"));
        this.requiredParams = Arrays.asList("apiKey", "startYmd", "endYmd", "curPage");
        this.optionalParams = Arrays.asList("sidoCd", "sigunguCd", "workType", "facilType");
        this.allowCodeGbParams = Arrays.asList("all", "work", "facil");
    }

//    private AnalysisInfoResonse getData(String roadClass, Map<String, String> param) throws Exception {
//
//        // 필수 파라미터 없으면 오류 반환
//        for (String key : requiredParams) {
//            if (StringUtils.isEmpty(param.get(key))) {
//                throw new RequiredParamException();
//            }
//        }
//
//        String startYmd = param.get("startYmd");
//        String endYmd = param.get("endYmd");
//
//        if (!DateUtil.isCorrect(startYmd) || !DateUtil.isCorrect(endYmd)) {
//            throw new BadDateFormatException();
//        }
//
//        String curPage = param.get("curPage");
//        String rows =  StringUtils.isNotEmpty(param.get("cntPerPage")) ? param.get("cntPerPage") : "10";
//        String start = String.valueOf(Integer.parseInt(rows) * Integer.parseInt(curPage) + 1);
//
//        String keyword = "";
//        keyword += "const_road_clss:(" + roadClass + ")";
//        if (StringUtils.isNotEmpty(param.get("sidoCd"))) {
//            keyword += String.format(" AND sido_cd:(%s)", param.get("sidoCd"));
//        }
//        if (StringUtils.isNotEmpty(param.get("sigunguCd"))) {
//            keyword += String.format(" AND sgg_cd:(%s)", param.get("sigunguCd"));
//        }
//        if (StringUtils.isNotEmpty(startYmd) && StringUtils.isNotEmpty(endYmd)) {
//            keyword += String.format(" AND bidntcedt:[%s TO %s]", ymdToDateString(startYmd), ymdToDateString(endYmd));
//        }
//
//        String fq = "";
//        //시설
//        if(StringUtils.isNotEmpty(param.get("facilType"))) {
//            fq += "&fq={!join from=resultno fromIndex=tb_analysis_fac_info to=resultno}fac_ty_cd:"+param.get("facilType");
//        }
//        //공사종류
//        if(StringUtils.isNotEmpty(param.get("workType"))) {
//            fq += "&fq={!join from=resultno fromIndex=tb_analysis_road_info to=resultno}road_ty_cd:"+param.get("workType");
//        }
//
//        TimoSolrService solrService = new TimoSolrService(prop.getProperty("solrUrl"));
//        String collection = "tb_analysis_info";
//        String order = "score desc";
//
//        QueryResponse queryResponse;
//        if(!fq.equals("")) {
//            queryResponse = solrService.getSolrJoinlass(solrService.getSolrUrl()+"/"+collection, keyword, start, rows, order, fq);
//        }else {
//            queryResponse = solrService.getSolrDataClass(solrService.getSolrUrl()+"/"+collection, keyword, start, rows, order);
//        }
//        AnalysisInfoResonse res = AnalysisInfoResonse.from(queryResponse, curPage, rows);
//        res.setErrCd("000"); // success
//
//        return res;
//    }

    /**
     * 건설칼스 데이터 수신 api
     * @param data
     * @return
     * @throws Exception
     */
    @ResponseBody
    @PostMapping("/calsdata")
    public HashMap<String, Object> insertCalsdata(@RequestBody String data, HttpServletRequest request, HttpServletResponse res) throws Exception {
        logger.debug("__getCalsData__");
        logger.debug(data);
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        JSONParser parser = new JSONParser();
        JSONObject jsonobj = null;

        try {
            jsonobj = (JSONObject) parser.parse(data);
            logger.debug("getCalsData__parameters");
            logger.debug(String.valueOf(jsonobj));
        } catch (ParseException e) {
            resultMap.put("code","400");// json 데이터 파싱 처리 오류
            resultMap.put("msg","json 데이터 파싱 처리 오류.");

            e.printStackTrace();
            return resultMap;
        }
        Map<String, Object> paramMap=new HashMap<>();
        ArrayList arrayList = new ArrayList<>();
        try {

            paramMap = new org.codehaus.jackson.map.ObjectMapper().readValue(jsonobj.toString(), Map.class);

            arrayList=(ArrayList)paramMap.get("dataList");
            logger.debug(String.valueOf(arrayList.size()));
        } catch (NullPointerException e) {
            resultMap.put("code","401");// json 데이터 파싱 처리 오류
            resultMap.put("msg","리스트의 키 값이 잘못 되었습니다.");

            e.printStackTrace();
            return resultMap;
        }




        Map<String, Object> paramMap_real=new HashMap<>();
        int insertRes=0;
        int insertSuccessResCnt=0;
        int insertFailResCnt=0;
        int listSize=arrayList.size();
        ArrayList insertSFarrayList = new ArrayList<>();//INSERT 문 성공 여부담는 LIST
        try {
            for(int i=0;i<listSize;i++){
                paramMap_real= (HashMap) arrayList.get(i);

                try {

                    insertRes = analysisService.insertCalsDataToRcic(paramMap_real);
                    logger.debug("insert성공파라미터출력__");
                    logger.debug(paramMap_real.toString());
                    insertSFarrayList.add(i,i+"row:성공-->"+paramMap_real.toString());
                    insertSuccessResCnt++;
                }catch (RuntimeException e){
                    logger.debug("insert실패파라미터출력__");
                    logger.debug(paramMap_real.toString());
                    insertSFarrayList.add(i,i+"row:실패-->"+paramMap_real.toString());
                    insertFailResCnt++;

                }



            }

            if(insertSuccessResCnt == listSize){//전체데이터 인서트 성공시
                //resultMap.put("row",listSize);
                resultMap.put("code","200");//성공
                resultMap.put("msg","전체 데이터 insert 성공");//성공
                resultMap.put("insertDataList",insertSFarrayList);
                resultMap.put("row_sucess_cnt",insertSuccessResCnt);
                resultMap.put("rows_cnt",listSize);
                logger.debug("데이터로그");
                logger.debug(resultMap.toString());
                return resultMap;
            }else{//일부 실패 또는 모두 실패시
                resultMap.put("code","201");//성공
                resultMap.put("msg","일부 데이터 insert 성공");//일부 성공
                resultMap.put("insertDataList",insertSFarrayList);
                resultMap.put("row_sucess_cnt",insertSuccessResCnt);
                resultMap.put("row_fail_cnt",insertFailResCnt);
                resultMap.put("rows_cnt",listSize);
                logger.debug("데이터로그");
                logger.debug(resultMap.toString());
                return resultMap;
            }
        }catch (Exception e) {
            resultMap.put("code","500");// 서버내부쿼리오류
            resultMap.put("msg","서버 쿼리수행전 오류");
            e.printStackTrace();
            return resultMap;
        }


        //return resultMap;

    }

    private void checkApiKey(String apiKey) throws Exception {
        Map param = new HashMap();
        param.put("apiCrtfcKey", apiKey);
        ApiUser apiUser = apiUserService.getApiUser(param);
        if (apiUser == null) {
            throw new NotAllowedApiKeyException();
        }

        if ("Y".equals(apiUser.getBlockAt())) {
            throw new NotAllowedApiKeyException("차단된 Key입니다.");
        }
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        request.setAttribute("apiUser", apiUser);
    }

    private Map<String, Object> convertApiParam(Map<String, String> param) throws Exception{

        // 필수 파라미터 없으면 오류 반환
        for (String key : requiredParams) {
            if (StringUtils.isEmpty(param.get(key))) {
                throw new RequiredParamException();
            }
        }

        String startYmd = param.get("startYmd");
        String endYmd = param.get("endYmd");
        if (!DateUtil.isCorrect(startYmd) || !DateUtil.isCorrect(endYmd)) {
            throw new BadDateFormatException();
        }

        Map<String, Object> p = new HashMap<>();

        p.put("currPage", Integer.parseInt(param.get("curPage")));

        if (param.get("cntPerPage") == null) {
            p.put("listCnt", 10);
        } else {
            p.put("listCnt", Integer.parseInt(param.get("cntPerPage")));
        }

        p.put("startDt", param.get("startYmd"));
        p.put("endDt", param.get("endYmd"));
        p.put("apiKey", param.get("apiKey"));

        p.put("sidoCd", param.get("sidoCd"));
        p.put("sggCd", param.get("sigunguCd"));

        if (StringUtils.isNotEmpty(param.get("workType"))) {
            String[] workTypes = param.get("workType").split(",");
            if (workTypes.length > 0) {
                p.put("roadTyList", Arrays.asList(workTypes));
            }
        }
        if (StringUtils.isNotEmpty(param.get("facilType"))) {
            String[] facTypes = param.get("facilType").split(",");
            if (facTypes.length > 0) {
                p.put("facTyList", Arrays.asList(facTypes));
            }
        }
        return p;
    }

    // 고속도로
    @RequestMapping("/getExpresswayWorkList")
    public ResponseEntity<AnalysisInfoResonse> getExpresswayWorkList(HttpServletRequest request, @RequestParam Map<String, String> param) throws Exception {
        long apiProvdNo = 1;
        request.setAttribute("apiProvdNo", apiProvdNo);
        checkApiKey(param.get("apiKey"));

        Map<String, Object> p = convertApiParam(param);
        p.put("roadClass", "B500004");
        Map<String, Object> result = analysisInfoService.getAnalysisInfoFileDataList(p);
        AnalysisInfoResonse res = AnalysisInfoResonse.from(p, result);

        loggingApiUseDetail(res);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // 국도
    @RequestMapping("/getHighwayWorkList")
    public ResponseEntity<AnalysisInfoResonse> getHighwayWorkList(HttpServletRequest request, @RequestParam Map<String, String> param) throws Exception {
        long apiProvdNo = 2;
        request.setAttribute("apiProvdNo", apiProvdNo);
        checkApiKey(param.get("apiKey"));

        Map<String, Object> p = convertApiParam(param);
        p.put("roadClass", "161");
        Map<String, Object> result = analysisInfoService.getAnalysisInfoFileDataList(p);
        AnalysisInfoResonse res = AnalysisInfoResonse.from(p, result);

        loggingApiUseDetail(res);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // 지방도 기타
    @RequestMapping("/getLocalroadWorkList")
    public ResponseEntity<AnalysisInfoResonse> getLocalroadWorkList(HttpServletRequest request, @RequestParam Map<String, String> param) throws Exception {
        long apiProvdNo = 3;
        request.setAttribute("apiProvdNo", apiProvdNo);
        checkApiKey(param.get("apiKey"));

        Map<String, Object> p = convertApiParam(param);
        p.put("roadClass", "99");
        Map<String, Object> result = analysisInfoService.getAnalysisInfoFileDataList(p);
        AnalysisInfoResonse res = AnalysisInfoResonse.from(p, result);

        loggingApiUseDetail(res);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    private void loggingApiUseDetail(AnalysisInfoResonse res) {

        try {
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
            ApiUser apiUser = (ApiUser) request.getAttribute("apiUser");
            Long apiProvdNo = (Long) request.getAttribute("apiProvdNo");

            LocalDateTime now = LocalDateTime.now();
            ObjectMapper mapper = new ObjectMapper();
            String reqParam = mapper.writeValueAsString(request.getParameterMap());

            ApiUseDtl dtl = new ApiUseDtl();
            dtl.setApiUserNo(apiUser.getUserSeq());
            dtl.setApiProvdNo(apiProvdNo);
            dtl.setUseDe(now.format(DateTimeFormatter.ofPattern("yyyyMMdd")));
            dtl.setUseHms(now.format(DateTimeFormatter.ofPattern("HHmmssSSS")));
            dtl.setResultCd(res.getErrCd());
            dtl.setRequstParam(reqParam);
            dtl.setProvdCo(res.getItems().size());

            apiLogService.insertApiUseDtl(dtl);
        } catch (Exception e) {
        	CmmnUtil.setLog(e.getMessage());
        }

    }


    // 공사종류 및 시설종류 코드
    @RequestMapping("/getWorkFacilCodeList")
    public ResponseEntity<CodeResponse> getWorkFacilCodeList(@RequestParam Map<String, String> param) throws Exception {
        String apiProvdNo = "4";
        checkApiKey(param.get("apiKey"));

        if (StringUtils.isEmpty(param.get("apiKey")) || StringUtils.isEmpty(param.get("codeGb"))) {
            throw new RequiredParamException();
        }
        String apiKey = param.get("apiKey");
        String codeGb = param.get("codeGb");

        if (!allowCodeGbParams.contains(codeGb)) {
            throw new ApiMessageException(String.format("{%s}은 허용되지 않는 codeGb 값입니다.", codeGb));
        }

        Map query = new HashMap();
        query.put("listCnt", "9999");
        query.put("skipPaging", "true");
        List<String> codeGroupList = new ArrayList<>();
        if ("all".equals(codeGb)) {
            codeGroupList.add("CD0004");
            codeGroupList.add("CD0002");
        } else if ("work".equals(codeGb)) {
            codeGroupList.add("CD0004");
        } else if ("facil".equals(codeGb)) {
            codeGroupList.add("CD0002");
        }
        query.put("codeGroupList", codeGroupList);
        Map<String, Object> rs = codeService.getCodeDetailList(query);

        CodeResponse res = new CodeResponse();
        List<CodeResponse.Item> items = new LinkedList<>();

        int totalCnt = (int) rs.get("totalCnt");
        List<Map<String, Object>> list = (List<Map<String, Object>>) rs.get("list");
        for (Map<String, Object> detail : list) {

            String typeNm = (String) detail.get("groupNm");

            CodeResponse.Item item = new CodeResponse.Item();
            item.setCode((String) detail.get("code"));
            item.setCodeNm((String) detail.get("codeNm"));
            item.setCodeType(typeNm);
            items.add(item);
        }   

        res.setTotCnt(totalCnt);
        res.setItems(items);
        res.setErrCd("000");

        return new ResponseEntity<>(res, HttpStatus.OK);
    }


    protected String ymdToDateString(String ymd) {
        return ymd.substring(0, 4) + "-" + ymd.substring(4, 6) + "-" + ymd.substring(6);
    }


    // region handle exception
    @ExceptionHandler(value = RequiredParamException.class)
    public ResponseEntity<Map> handleRequiredParamException(RequiredParamException e) {
        Map map = new HashMap();
        map.put("errCd", "002");
        map.put("errMsg", "필수입력값이 입력되지 않았습니다.");
        return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = BadDateFormatException.class)
    public ResponseEntity<Map> handleBadDateFormatException(BadDateFormatException e) {
        Map map = new HashMap();
        map.put("errCd", "003");
        map.put("errMsg", "입력된 날짜가 유효하지 않습니다.");
        return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = NotAllowedApiKeyException.class)
    public ResponseEntity<Map> handleNotAllowedApiKeyException(NotAllowedApiKeyException e) {

        String message = e.getMessage();
        if (message == null) {
            message = "승인되지 않은 Key입니다.";
        }

        Map map = new HashMap();
        map.put("errCd", "001");
        map.put("errMsg", message);
        return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = ApiTrafficException.class)
    public ResponseEntity<Map> handleApiTrafficException(ApiTrafficException e) {
        Map map = new HashMap();
        map.put("errCd", "004");
        map.put("errMsg", "일일 최대 요청 트래픽을 초과하였습니다.");
        return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = ApiMessageException.class)
    public ResponseEntity<Map> handleApiMessageException(ApiMessageException e) {
        Map map = new HashMap();
        map.put("errCd", "999");
        map.put("errMsg", e.getMessage());
        return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<Map> handleOtherException(Exception e) {
        Map map = new HashMap();
        map.put("errCd", "999");
        map.put("errMsg", "시스템 오류");
        return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    // endregion

    
    
    // 고속도로(다중위치 공고문)
    @RequestMapping("/getMultiExpresswayWorkList")
    public ResponseEntity<AnalysisInfoResonse> getMultiExpresswayWorkList(HttpServletRequest request, @RequestParam Map<String, String> param) throws Exception {
        long apiProvdNo = 5;
        request.setAttribute("apiProvdNo", apiProvdNo);
        checkApiKey(param.get("apiKey"));

        Map<String, Object> p = convertApiParam(param);
        p.put("roadClass", "B500004");
        Map<String, Object> result = analysisInfoService.getAnalysisInfoFileDataListMulti(p);
        AnalysisInfoResonse res = AnalysisInfoResonse.from(p, result);

        loggingApiUseDetail(res);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
    // 국도(다중위치 공고문)
    @RequestMapping("/getMultiHighwayWorkList")
    public ResponseEntity<AnalysisInfoResonse> getMulitHighwayWorkList(HttpServletRequest request, @RequestParam Map<String, String> param) throws Exception {
    	long apiProvdNo = 6;
        request.setAttribute("apiProvdNo", apiProvdNo);
        checkApiKey(param.get("apiKey"));

        Map<String, Object> p = convertApiParam(param);
        p.put("roadClass", "161");
        Map<String, Object> result = analysisInfoService.getAnalysisInfoFileDataListMulti(p);
        AnalysisInfoResonse res = AnalysisInfoResonse.from(p, result);

        loggingApiUseDetail(res);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
    // 지방도 기타(다중위치 공고문)
    @RequestMapping("/getMultiLocalroadWorkList")
    public ResponseEntity<AnalysisInfoResonse> getMultiLocalroadWorkList(HttpServletRequest request, @RequestParam Map<String, String> param) throws Exception {
        long apiProvdNo = 7;
        request.setAttribute("apiProvdNo", apiProvdNo);
        checkApiKey(param.get("apiKey"));

        Map<String, Object> p = convertApiParam(param);
        p.put("roadClass", "99");
        Map<String, Object> result = analysisInfoService.getAnalysisInfoFileDataListMulti(p);
        AnalysisInfoResonse res = AnalysisInfoResonse.from(p, result);

        loggingApiUseDetail(res);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
    
    
    
}
