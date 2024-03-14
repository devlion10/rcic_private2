package kr.or.lx.rcic.modules.initiationReport.controller;

import kr.or.lx.rcic.frmwrk.util.CmmnUtil;
import kr.or.lx.rcic.frmwrk.util.SimpleData;
import kr.or.lx.rcic.frmwrk.web.BaseController;
import kr.or.lx.rcic.modules.initiationReport.entity.InitiationReportDTO;
import kr.or.lx.rcic.modules.initiationReport.service.InitiationReportService;
import lombok.extern.slf4j.Slf4j;

import net.sf.json.JSONArray;
import org.apache.commons.io.IOUtils;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import javax.json.JsonArray;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.BadRequestException;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.*;

/**
 *  착수신고서를 통해 등록된 도로변경정보 정보를 관리한다.  */
@Controller
@Slf4j
@RequestMapping(value="/rcic")
public class InitiationReportController  extends BaseController {

    @Autowired
    private InitiationReportService initiationReportService;

    @Autowired
    ResourceLoader resourceLoader;
    @Value("#{contextProperties}")
    Properties prop = new Properties();

    private UserDetailsService userService;

    private Logger logger = LoggerFactory.getLogger(getClass());

    @RequestMapping(value="/initiationReport/getCstrnType")
    @ResponseBody
    public List<InitiationReportDTO> getCstrnType(HttpServletRequest request, InitiationReportDTO dto) throws Exception {
        logger.debug("getCstrnType__");

        // 공사종류 selectBox List
        String cdid = "01";

        return initiationReportService.getComCodeList(cdid);
    }

    @RequestMapping(value="/initiationReport/getAnalysisBidntceno")
    @ResponseBody
    public Map<String, Object> getAnalysisBidntceno(HttpServletRequest request, InitiationReportDTO dto) throws Exception {
        logger.debug("getAnalysisBidntceno__");
        SimpleData simpleData = getSimpleData(request);
//        log.info("simpleData = " + simpleData);
        dto.setBidntceno(simpleData.get("bidntceno").toString());

        dto = initiationReportService.getAnalysisBidntceno(dto);

        // 공사시행위치(시/도) SelectBox List
        List<InitiationReportDTO> sidoList = initiationReportService.getSidoList();

        // 공사시행위치(시/군/구) SelectBox List
        List<InitiationReportDTO> sggList = initiationReportService.getSggList(dto);

        // 공사시행위치(읍/면/동) SelectBox List
        List<InitiationReportDTO> emdList = initiationReportService.getEmdList(dto);

        Map<String, Object> map = new HashMap<>();
        map.put("dto", dto);
        map.put("sidoList", sidoList);
        map.put("sggList", sggList);
        map.put("emdList", emdList);

        return map;
    }

    @RequestMapping(value="/initiationReport/getInitiationReportList")
    @ResponseBody
    public Map<String, Object> getInitiationReportList(HttpServletRequest request) throws Exception {
        logger.debug("getInitiationReportList__");

        return initiationReportService.getInitiationReportList(request);
    }

    @RequestMapping(value="/initiationReport/movePageInitiationReportRegist")
    public ModelAndView movePageInitiationReportRegist(ModelAndView mv) throws Exception {
        logger.debug("movePageInitiationReportRegist__");
        // 국토관리사무소 selectBox List
        String cdid = "00";
        List<InitiationReportDTO> ntnltyLandMngOfcList = initiationReportService.getComCodeList(cdid);

        // 공사종류 selectBox List
        cdid = "01";
        List<InitiationReportDTO> cstrnTypeList = initiationReportService.getComCodeList(cdid);

        // 도로종류 selectBox List
        cdid = "02";
        List<InitiationReportDTO> roadTypeList = initiationReportService.getComCodeList(cdid);

        // 공사시행위치(시/도) SelectBox List
        List<InitiationReportDTO> sidoList = initiationReportService.getSidoList();

        mv.addObject("ntnltyLandMngOfcList", ntnltyLandMngOfcList);
        mv.addObject("cstrnTypeList", cstrnTypeList);
        mv.addObject("roadTypeList", roadTypeList);
        mv.addObject("sidoList", sidoList);
        mv.setViewName("mainPage/initiationReportRegist");
        return mv;
    }

    @RequestMapping(value="/initiationReport/initiationReportRegist")
    @ResponseBody
    public Map<String, Object> initiationReportRegist(InitiationReportDTO dto, MultipartHttpServletRequest request) throws Exception {
        logger.debug("initiationReportRegist__");
        logger.debug("dto: {}", dto);

        // 전체공사위치도
        List<MultipartFile> cstrnLocMapFileList = request.getFiles("cstrnLocMapFile");
        if(cstrnLocMapFileList != null && !cstrnLocMapFileList.isEmpty()) {
            MultipartFile cstrnLocMapFile = cstrnLocMapFileList.get(0);
            logger.debug("cstrnLocMapFile: {}", cstrnLocMapFile);
            logger.debug("cstrnLocMapFile Original Filename: {}", cstrnLocMapFile.getOriginalFilename());
            dto.setCstrnLocMapFile(cstrnLocMapFile);
        }

        for(int i = 0; ; i++) {
            // 세부공사위치도
            List<MultipartFile> subCstrnLocMapFileList = request.getFiles("subCstrnLocMapFile" + i);
            if(subCstrnLocMapFileList != null && !subCstrnLocMapFileList.isEmpty()) {
                MultipartFile subCstrnLocMapFile = subCstrnLocMapFileList.get(0);
                logger.debug("subCstrnLocMapFile" + i + ": {}", subCstrnLocMapFile);
                dto.getSubFormList().get(i).setSubCstrnLocMapFile(subCstrnLocMapFile);
            } else {
                break;
            }

            // 세부공사시점
            List<MultipartFile> subCstrnStLocMapFileList = request.getFiles("subCstrnStLocMapFile" + i);
            if(subCstrnStLocMapFileList != null && !subCstrnStLocMapFileList.isEmpty()) {
                MultipartFile subCstrnStLocMapFile = subCstrnStLocMapFileList.get(0);
                logger.debug("subCstrnStLocMapFile" + i + ": {}", subCstrnStLocMapFile);
                dto.getSubFormList().get(i).setSubCstrnStLocMapFile(subCstrnStLocMapFile);
            } else {
                break;
            }

            // 세부공사종점
            List<MultipartFile> subCstrnEndLocMapFileList = request.getFiles("subCstrnEndLocMapFile" + i);
            if(subCstrnEndLocMapFileList != null && !subCstrnEndLocMapFileList.isEmpty()) {
                MultipartFile subCstrnEndLocMapFile = subCstrnEndLocMapFileList.get(0);
                logger.debug("subCstrnEndLocMapFile" + i + ": {}", subCstrnEndLocMapFile);
                dto.getSubFormList().get(i).setSubCstrnEndLocMapFile(subCstrnEndLocMapFile);
            } else {
                break;
            }

            // 세부공사대표지점
            List<MultipartFile> subCstrnRepsLocMapFileList = request.getFiles("subCstrnRepsLocMapFile" + i);
            if(subCstrnRepsLocMapFileList != null && !subCstrnRepsLocMapFileList.isEmpty()) {
                MultipartFile subCstrnRepsLocMapFile = subCstrnRepsLocMapFileList.get(0);
                logger.debug("subCstrnRepsLocMapFile" + i + ": {}", subCstrnRepsLocMapFile);
                dto.getSubFormList().get(i).setSubCstrnRepsLocMapFile(subCstrnRepsLocMapFile);
            } else {
                break;
            }
        }

        // User ID 삽입
        String currentUserId = SecurityContextHolder.getContext().getAuthentication().getName();
        dto.setRegId(currentUserId);

        // 착수신고서 등록
        initiationReportService.insertInitiationReportRegist(dto);

        Map<String, Object> map = new HashMap<>();
        Long seq = initiationReportService.getInitiationReportSeq();
        dto.setSeq(seq);
        dto = initiationReportService.getInitiationReportDetail(dto);
        List<InitiationReportDTO> initRptSubInfoList = initiationReportService.getInitiationReportSubListDetail(dto);
        map.put("initRptInfo", dto);
        map.put("initRptSubInfoList", initRptSubInfoList);
        return map;
    }

    @RequestMapping(value="/initiationReport/movePageInitiationReportDetail")
    public String movePageInitiationReportDetail(Model model, String seq, InitiationReportDTO dto) throws Exception {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String[] authArr = null;
        if(authentication.getAuthorities().toString().contains(",")) {
            authArr = authentication.getAuthorities().toString().split(",");
        }
        boolean apprFlag = false;
        boolean regFlag = false;
        String auth = "";

        logger.debug("movePageInitiationReportDetail__");
        dto.setSeq(Long.parseLong(seq));

//        HashMap<String, Object> resultMap = initiationReportService.getInitiationReportDetail(dto);
        dto = initiationReportService.getInitiationReportDetail(dto);
        List<InitiationReportDTO> initRptSubInfoList = initiationReportService.getInitiationReportSubListDetail(dto);

        if(authArr !=null) {
            if(authArr[1].replace("]", "").trim().equals("ROLE_ADMIN")) {
                auth = "admin";
            }
        }

        if(dto.getInitiationRptApprFlag() == null || dto.getInitiationRptApprFlag().equals("0")) {
            apprFlag = true;
        }
        if(dto.getRegId().equals(authentication.getName())) {
            regFlag = true;
        }

        model.addAttribute("regFlag",regFlag);
        model.addAttribute("auth", auth);
        model.addAttribute("apprFlag", apprFlag);
        model.addAttribute("dto", dto);
        model.addAttribute("initRptSubInfoList", initRptSubInfoList);

        return "mainPage/initiationReportDetail";
    }

    @RequestMapping(value="/initiationReport/initiationReportAppr")
    @ResponseBody
    public InitiationReportDTO initiationReportAppr(@RequestBody InitiationReportDTO dto) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        dto.setInitiationRptApprFlag("1");
        dto.setApproverId(authentication.getName());

        dto = initiationReportService.initiationReportAppr(dto);
        log.info("dto = " + dto);
        return dto;
    }

//    @RequestMapping(value="/initiationReport/initiationReportApproval")
//    @ResponseBody
//    public int initiationReportApproval(HttpServletRequest request, InitiationReportDTO dto) throws Exception {
//        logger.debug("initiationReportApproval__");
//        SimpleData simpleData = getSimpleData(request);
//        dto.setSeq(Long.parseLong(simpleData.get("seq").toString()));
//
//        // User ID 삽입
//        String currentUserId = SecurityContextHolder.getContext().getAuthentication().getName();
//        dto.setRegId(currentUserId);
//
//        int result = initiationReportService.updateInitiationReportApproval(dto);
//
//        return result;
//    }

    @RequestMapping(value="/initiationReport/movePageInitiationReportUpdate")
    public String movePageInitiationReportUpdate(Model model, String seq, InitiationReportDTO dto) throws Exception {
        logger.debug("movePageInitiationReportUpdate__");
        dto.setSeq(Long.parseLong(seq));

        dto = initiationReportService.getInitiationReportDetail(dto);
        dto.setBrno(dto.getBrno().replaceAll("-", ""));
        List<InitiationReportDTO> initRptSubInfoList = initiationReportService.getInitiationReportSubListDetail(dto);

        // 국토관리사무소 selectBox List
        String cdid = "00";
        List<InitiationReportDTO> ntnltyLandMngOfcList = initiationReportService.getComCodeList(cdid);

        // 공사종류 selectBox List
        cdid = "01";
        List<InitiationReportDTO> cstrnTypeList = initiationReportService.getComCodeList(cdid);

        // 도로종류 selectBox List
        cdid = "02";
        List<InitiationReportDTO> roadTypeList = initiationReportService.getComCodeList(cdid);

        // 공사시행위치(시/도) SelectBox List
        List<InitiationReportDTO> sidoList = initiationReportService.getSidoList();

        // 공사시행위치(시/군/구) SelectBox List
        List<InitiationReportDTO> sggList = initiationReportService.getSggList(dto);

        // 공사시행위치(읍/면/동) SelectBox List
        List<InitiationReportDTO> emdList = initiationReportService.getEmdList(dto);

        model.addAttribute("ntnltyLandMngOfcList", ntnltyLandMngOfcList);
        model.addAttribute("cstrnTypeList", cstrnTypeList);
        model.addAttribute("roadTypeList", roadTypeList);
        model.addAttribute("sidoList", sidoList);
        model.addAttribute("sggList", sggList);
        model.addAttribute("emdList", emdList);
        model.addAttribute("dto", dto);
        model.addAttribute("initRptSubInfoList", initRptSubInfoList);

        return "mainPage/initiationReportRegist";
    }

    @RequestMapping(value="/initiationReport/initiationReportUpdate")
    @ResponseBody
    public Map<String, Object> initiationReportUpdate(InitiationReportDTO dto, MultipartHttpServletRequest request) throws Exception {
        logger.debug("initiationReportUpdate__");
        logger.debug("dto: {}", dto);

        // 전체공사위치도
        List<MultipartFile> cstrnLocMapFileList = request.getFiles("cstrnLocMapFile");
        if(cstrnLocMapFileList != null && !cstrnLocMapFileList.isEmpty()) {
            MultipartFile cstrnLocMapFile = cstrnLocMapFileList.get(0);
            logger.debug("cstrnLocMapFile: {}", cstrnLocMapFile);
            logger.debug("cstrnLocMapFile Original Filename: {}", cstrnLocMapFile.getOriginalFilename());
            dto.setCstrnLocMapFile(cstrnLocMapFile);
        }

        for(int i = 0; ; i++) {
            // 세부공사위치도
            List<MultipartFile> subCstrnLocMapFileList = request.getFiles("subCstrnLocMapFile" + i);
            if(subCstrnLocMapFileList != null && !subCstrnLocMapFileList.isEmpty()) {
                MultipartFile subCstrnLocMapFile = subCstrnLocMapFileList.get(0);
                logger.debug("subCstrnLocMapFile" + i + ": {}", subCstrnLocMapFile);
                dto.getSubFormList().get(i).setSubCstrnLocMapFile(subCstrnLocMapFile);
            } else {
                break;
            }

            // 세부공사시점
            List<MultipartFile> subCstrnStLocMapFileList = request.getFiles("subCstrnStLocMapFile" + i);
            if(subCstrnStLocMapFileList != null && !subCstrnStLocMapFileList.isEmpty()) {
                MultipartFile subCstrnStLocMapFile = subCstrnStLocMapFileList.get(0);
                logger.debug("subCstrnStLocMapFile" + i + ": {}", subCstrnStLocMapFile);
                dto.getSubFormList().get(i).setSubCstrnStLocMapFile(subCstrnStLocMapFile);
            } else {
                break;
            }

            // 세부공사종점
            List<MultipartFile> subCstrnEndLocMapFileList = request.getFiles("subCstrnEndLocMapFile" + i);
            if(subCstrnEndLocMapFileList != null && !subCstrnEndLocMapFileList.isEmpty()) {
                MultipartFile subCstrnEndLocMapFile = subCstrnEndLocMapFileList.get(0);
                logger.debug("subCstrnEndLocMapFile" + i + ": {}", subCstrnEndLocMapFile);
                dto.getSubFormList().get(i).setSubCstrnEndLocMapFile(subCstrnEndLocMapFile);
            } else {
                break;
            }

            // 세부공사대표지점
            List<MultipartFile> subCstrnRepsLocMapFileList = request.getFiles("subCstrnRepsLocMapFile" + i);
            if(subCstrnRepsLocMapFileList != null && !subCstrnRepsLocMapFileList.isEmpty()) {
                MultipartFile subCstrnRepsLocMapFile = subCstrnRepsLocMapFileList.get(0);
                logger.debug("subCstrnRepsLocMapFile" + i + ": {}", subCstrnRepsLocMapFile);
                dto.getSubFormList().get(i).setSubCstrnRepsLocMapFile(subCstrnRepsLocMapFile);
            } else {
                break;
            }
        }

        // User ID 삽입
        String currentUserId = SecurityContextHolder.getContext().getAuthentication().getName();
        dto.setRegId(currentUserId);

        // 착수신고서 수정
        initiationReportService.updateInitiationReportUpdate(dto);

        Map<String, Object> map = new HashMap<>();
        dto = initiationReportService.getInitiationReportDetail(dto);
        dto.getBrno().replaceAll("-", "");
        List<InitiationReportDTO> initRptSubInfoList = initiationReportService.getInitiationReportSubListDetail(dto);
        map.put("initRptInfo", dto);
        map.put("initRptSubInfoList", initRptSubInfoList);

        return map;
    }


    @RequestMapping("/initiationReport/initiationReportFileDown/{initRptSeq}/{initRptSubSeq}/{type}")
    public void getBbsAtchFile(@PathVariable("initRptSeq") Long initRptSeq, @PathVariable("initRptSubSeq") Long initRptSubSeq, @PathVariable("type") String type, HttpServletResponse response) throws Exception {
        logger.debug("getBbsAtchFile__");
        Map<String, Object> param = new HashMap<>();

        param.put("initRptSeq", initRptSeq);
        param.put("initRptSubSeq", initRptSubSeq);

        InitiationReportDTO fileInfo = null;
        if(type.equals("master")) {
        	fileInfo = initiationReportService.getAtchMasterFile(param);
        }else {
            fileInfo = initiationReportService.getAtchFile(param);
        }

        if (fileInfo == null) {
            log.warn("존재하지 않는 파일 정보를 요청하였음. 파일ID: {}", initRptSeq);
            throw new BadRequestException("존재하지 않는 파일ID:" + initRptSeq);
        }

        String fileLc = "";
        String fileNm = "";
        String fileOriFileNm ="";
        String fileType ="";

        if(fileInfo.getCstrnLocMapFilePath() != null) {
        	fileLc = fileInfo.getCstrnLocMapFilePath();
        	fileNm = fileInfo.getCstrnLocMapFileNm();
        	fileOriFileNm = fileInfo.getCstrnLocMapFileOriginNm();
        	fileType = fileInfo.getCstrnLocMapFileType();
        }
        if(fileInfo.getSubCstrnLocMapFilePath() != null && type.equals("subCstrnLocMap")) {
        	fileLc = fileInfo.getSubCstrnLocMapFilePath();
        	fileNm = fileInfo.getSubCstrnLocMapFileNm();
            fileOriFileNm = fileInfo.getSubCstrnLocMapFileOriginNm();
            fileType = fileInfo.getSubCstrnLocMapFileType();
        }
        if(fileInfo.getSubCstrnStLocMapFilePath() != null && type.equals("subCstrnStLocMap")) {
        	fileLc = fileInfo.getSubCstrnStLocMapFilePath();
        	fileNm = fileInfo.getSubCstrnStLocMapFileNm();
        	fileOriFileNm = fileInfo.getSubCstrnStLocMapFileOriginNm();
        	fileType = fileInfo.getSubCstrnStLocMapFileType();
        }
        if(fileInfo.getSubCstrnEndLocMapFilePath() != null && type.equals("subCstrnEndLocMap")) {
        	fileLc = fileInfo.getSubCstrnEndLocMapFilePath();
        	fileNm = fileInfo.getSubCstrnEndLocMapFileNm();
        	fileOriFileNm = fileInfo.getSubCstrnEndLocMapFileOriginNm();
        	fileType = fileInfo.getSubCstrnEndLocMapFileType();
        }
        if(fileInfo.getSubCstrnRepsLocMapFilePath() != null && type.equals("subCstrnRepsLocMap")) {
        	fileLc = fileInfo.getSubCstrnRepsLocMapFilePath();
        	fileNm = fileInfo.getSubCstrnRepsLocMapFileNm();
        	fileOriFileNm = fileInfo.getSubCstrnRepsLocMapFileOriginNm();
        	fileType = fileInfo.getSubCstrnRepsLocMapFileType();
        }


        // 세부공사위치도 subCstrnLocMapFilePath
        // 세부공사시점 subCstrnStLocMapFilePath
        // 세부공사종점 subCstrnEndLocMapFilePath
        // 세부공사대표지점 subCstrnRepsLocMapFilePath
        String[] type2;
        String filePath = fileLc; // 첨부파일위치
        String fullFilePath="";
        if(fileType.contains("/")) {
        	type2 = fileType.split("/");
        	fullFilePath = filePath + fileNm;// 첨부파일명
        }else {
       	 	fullFilePath = filePath + fileNm;// 첨부파일명
        }
        File localFile = new File(fullFilePath);
        if (localFile.exists() == false) {
            CmmnUtil.setLog("서버에 파일이 존재하지 않음");
            throw new RuntimeException("서버에 파일이 존재하지 않습니다.");
        }

        // 실제 다운로드 될 파일명 셋팅
        String downloadFileName = fileOriFileNm; // 원본파일명
        String encodedFileName = new String(downloadFileName.getBytes("UTF-8"), "ISO-8859-1");

        response.setHeader("Content-Disposition", "attachment; filename=\"" + encodedFileName + "\";");
        response.setHeader("Content-Transfer-Encoding", "binary");

        OutputStream out = response.getOutputStream();
        InputStream fis = null;
        try {
            fis = new FileInputStream(localFile);
            FileCopyUtils.copy(fis, out);
        } catch (Exception e) {
        	CmmnUtil.setLog(e.getMessage());
        } finally {
            IOUtils.closeQuietly(fis);
        }

        out.flush();
    }

    @GetMapping("/preViewFile/{fileNm}/{fileType}/{userId}/{fileCreateDate}")
    //@ResponseBody
    public ResponseEntity<? extends Object> getAirialImgFile(
            //@RequestBody String data
            @PathVariable String fileNm , @PathVariable String fileType, @PathVariable String userId, @PathVariable String fileCreateDate,HttpServletResponse response) throws IOException, Exception {


        //String window_airialFilePath=prop.getProperty();
        //String linux_airialFilePath=prop.getProperty();
        try {
            String rootFilePath_window=prop.getProperty("rootFilePath_window");
            String rootFilePath_linux=prop.getProperty("rootFilePath_linux");
            String fileFullNm=fileNm+"."+fileType;
            String mediaType;
            if(fileType.equals("jpg")||fileType.equals("JPG")||fileType.equals("jpeg")||fileType.equals("JPEG")){
                mediaType="image/jpeg" ;
            }else if(fileType.equals("pdf")||fileType.equals("PDF")){
                mediaType="application/pdf" ;
            }else if(fileType.equals("png")||fileType.equals("PNG")){
                mediaType="image/png" ;
            }else{
                mediaType="application/pdf";
            }

            String osName = System.getProperty("os.name");
            String filePath;
            if(osName.contains("Windows") || osName.contains("windows") || osName.contains("Mac")){
                log.info("OS Name: {}", osName);
                filePath="file:"+rootFilePath_window+"/"+userId+"/"+fileCreateDate+"/";
            }else {
                log.info("OS Name: {}", osName);
                //filePath="file:"+linux_airialFilePath+"/"+guNm+"/";
                filePath="file:"+rootFilePath_linux+"/"+userId+"/"+fileCreateDate+"/";
            }

            Resource resource = resourceLoader.getResource(filePath + fileFullNm);
            File file=resource.getFile();

            return ResponseEntity.ok()
                    //.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileNm + "\"")
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileFullNm + "\"")
                    .header(HttpHeaders.CONTENT_LENGTH, String.valueOf(file.length()))
                    //.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_OCTET_STREAM.toString())
                    //.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_PDF.toString())
                    .header(HttpHeaders.CONTENT_TYPE, mediaType)
                    .body(resource);
        } catch (FileNotFoundException e) {
            log.error("FILE NotFound Error: ", e);
            return ResponseEntity.badRequest().body(null);
        } catch (IOException e) {
            log.error("FILE Server Error: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        //return resultMap;
    }

    @RequestMapping(value="/initiationReport/initiationReportDel")
    @ResponseBody
    public void itiationReportDel(@RequestBody ArrayList<String> jsonData) throws Exception {
        logger.debug("itiationReportDel__");
        log.info(jsonData.toString());
        initiationReportService.itiationReportDel(jsonData);
    }

}
