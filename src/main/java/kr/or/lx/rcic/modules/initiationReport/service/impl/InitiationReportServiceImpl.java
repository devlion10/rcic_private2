package kr.or.lx.rcic.modules.initiationReport.service.impl;

import kr.co.timosoft.util.PaginationUtil;
import kr.or.lx.rcic.frmwrk.util.SimpleData;
import kr.or.lx.rcic.frmwrk.util.WebUtil;
import kr.or.lx.rcic.modules.board.entity.BbsAtchFile;
import kr.or.lx.rcic.modules.initiationReport.entity.InitiationReportDTO;
import kr.or.lx.rcic.modules.initiationReport.mapper.InitiationReportMapper;
import kr.or.lx.rcic.modules.initiationReport.service.InitiationReportService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;
import java.io.File;

import javax.servlet.http.HttpServletRequest;

/**
 * 착수신고서를 통해 등록된 도로변경정보 정보를 관리한다.
 */
@Service
@Slf4j
public class InitiationReportServiceImpl implements InitiationReportService {

    @Autowired
    private InitiationReportMapper mapper;

    @Value("#{contextProperties}")
    Properties prop = new Properties();

    private Logger logger = LoggerFactory.getLogger(getClass());

    @Override
    public InitiationReportDTO getAnalysisBidntceno(InitiationReportDTO dto) throws Exception {
        if ( mapper.getAnalysisBidntceno(dto) != null ){
            return mapper.getAnalysisBidntceno(dto);
        } else {
            dto.setBidntceno("");
        }
        return dto;
    }

    @Override
    public HashMap<String, Object> getInitiationReportList(HttpServletRequest request) throws Exception {
        Map<String, Object> param = WebUtil.getCommonAjaxParamIfPresent();

        // 날짜 표현식 수정( . 제거)
        param.put("cstrnStDt", param.get("cstrnStDt").toString().replaceAll("\\.", ""));
        param.put("cstrnEndDt", param.get("cstrnEndDt").toString().replaceAll("\\.", ""));

        List<Map<String, Object>> list = mapper.getInitiationReportList(param);

        int cnt = mapper.getInitiationReportListCnt(param);
        HashMap<String, Object> resultMap = new HashMap<>();
        int listCnt = param.get("listCnt") == null ? 5 : Integer.parseInt(String.valueOf(param.get("listCnt")));
        int maxPageCnt = PaginationUtil.maxPageCnt(cnt, listCnt);

        resultMap.put("maxPageCnt", maxPageCnt);
        resultMap.put("list", list);
        resultMap.put("totalCnt", cnt);

        return resultMap;
    }

    @Override
    public List<InitiationReportDTO> getComCodeList(String cdid) throws Exception {
        return mapper.getComCodeList(cdid);
    }

    @Override
    public List<InitiationReportDTO> getSidoList() throws Exception {
        return mapper.getSidoList();
    }

    @Override
    public List<InitiationReportDTO> getSggList(InitiationReportDTO dto) throws Exception {
        return mapper.getSggList(dto);
    }

    @Override
    public List<InitiationReportDTO> getEmdList(InitiationReportDTO dto) throws Exception {
        return mapper.getEmdList(dto);
    }

    @Override
    @Transactional
    public void insertInitiationReportRegist(InitiationReportDTO dto) throws Exception {
        // 전체 공사기간 "-" 제거
        String cstrnStDt = dto.getCstrnStDt().replaceAll("-", "");
        String cstrnEnDt = dto.getCstrnEndDt().replaceAll("-", "");
        dto.setCstrnStDt(cstrnStDt);
        dto.setCstrnEndDt(cstrnEnDt);

        String num1 = "";
        String num2 = "";
        String num3 = "";
        String brno = "";
        // 주민번호 앞/뒷자리 합치기
        if (dto.getBrno().length() > 10){
            num1 = dto.getBrno().substring(0, 6);
            num2 = dto.getBrno().substring(6);
            brno = num1 + '-' + num2;
            dto.setBrno(brno);
        } else {
            num1 = dto.getBrno().substring(0,3);
            num2 = dto.getBrno().substring(3,5);
            num3 = dto.getBrno().substring(5);
            brno = num1 + '-' + num2 + '-' + num3;
            dto.setBrno(brno);
        }

        String userId = dto.getRegId();
        LocalDate fileCreateDate = LocalDate.now();

        String rootFilePath_window = prop.getProperty("rootFilePath_window");
        String rootFilePath_linux = prop.getProperty("rootFilePath_linux");
        String osName = System.getProperty("os.name");
        String filePath;
        if (osName.contains("Windows") || osName.contains("windows") || osName.contains("Mac")){
            log.info("OS Name: {}", osName);
            // 파일경로
//            filePath = "file:" + rootFilePath_window + "/" + userId + "/" + fileCreateDate + "/";
            filePath = rootFilePath_window + "/" + userId + "/" + fileCreateDate + "/";
        } else {
            log.info("OS Name: {}", osName);
//            filePath = "file:" + rootFilePath_linux + "/" + userId + "/" + fileCreateDate + "/";
            filePath = rootFilePath_linux + "/" + userId + "/" + fileCreateDate + "/";
        }

        File Folder = new File(filePath);
        if (!Folder.exists()) {
            try{
                Folder.mkdirs(); //폴더 생성합니다.
                System.out.println("폴더가 생성되었습니다.");
            }
            catch(Exception e){
                e.getStackTrace();
            }
        }

        // 파일명 생성
        UUID uuid = UUID.randomUUID();
        // 파일명원본
        String originalFilename = dto.getCstrnLocMapFile().getOriginalFilename();
        String fileFullName[] = originalFilename.split("\\.");
        String ext = fileFullName[1];
        // 파일명
        String filename = uuid.toString()+"."+ext;
        // 파일크기
        Long fileSize = dto.getCstrnLocMapFile().getSize();
        // 파일타입
        String fileType = dto.getCstrnLocMapFile().getContentType();
        // 저장파일명
        String savedFileName = filename;
        // 파일경로+파일명 생성
        File newFile = new File(filePath + savedFileName);
        // 파일저장
        dto.getCstrnLocMapFile().transferTo(newFile);

        dto.setCstrnLocMapFileOriginNm(originalFilename);
        dto.setCstrnLocMapFileNm(filename);
        dto.setCstrnLocMapFileSize(fileSize);
        dto.setCstrnLocMapFilePath(filePath);
        dto.setCstrnLocMapFileType(fileType);

        String subCstrnCnt = Integer.toString(dto.getSubFormList().size());
        logger.debug("subCstrnCnt = ", subCstrnCnt);
        dto.setSubCstrnCnt(subCstrnCnt);
        // 착수신고서 등록
        mapper.insertInitiationReportRegist(dto);

        // 세부공사 건수가 1건 이상일 경우
        if (dto.getSubFormList().size() > 1) {
            for (int i = 0; i < dto.getSubFormList().size(); i++) {
                if (dto.getSubFormList().get(i).getSubCstrnStDt() != null) {
                    // 세부공사formList 에서 입력값 추출
                    String initRptSubSeq = dto.getSubFormList().get(i).getInitRptSubSeq();
                    String subCstrnNm = dto.getSubFormList().get(i).getSubCstrnNm();
                    String subCstrnStDt = dto.getSubFormList().get(i).getSubCstrnStDt().replaceAll("-", "");
                    String subCstrnEndDt = dto.getSubFormList().get(i).getSubCstrnEndDt().replaceAll("-", "");
                    String subCstrnStLocAddr = dto.getSubFormList().get(i).getSubCstrnStLocAddr();
                    String subCstrnStCoodLongitude = dto.getSubFormList().get(i).getSubCstrnStCoodLongitude();
                    String subCstrnStCoodLatitude = dto.getSubFormList().get(i).getSubCstrnStCoodLatitude();
                    String subCstrnStDir = dto.getSubFormList().get(i).getSubCstrnStDir();
                    String subCstrnEndLocAddr = dto.getSubFormList().get(i).getSubCstrnEndLocAddr();
                    String subCstrnEndCoodLongitude = dto.getSubFormList().get(i).getSubCstrnEndCoodLongitude();
                    String subCstrnEndCoodLatitude = dto.getSubFormList().get(i).getSubCstrnEndCoodLatitude();
                    String subCstrnEndDir = dto.getSubFormList().get(i).getSubCstrnEndDir();

                    UUID subCstrnLocMapFileUuid = UUID.randomUUID();
                    String subCstrnLocMapFileOriName = dto.getSubFormList().get(i).getSubCstrnLocMapFile().getOriginalFilename();
                    String subCstrnLocMapFileFullName[] = subCstrnLocMapFileOriName.split("\\.");
                    String subCstrnLocMapFileExt = subCstrnLocMapFileFullName[1];
                    String subCstrnLocMapFileName = subCstrnLocMapFileUuid.toString()+"."+subCstrnLocMapFileExt;
                    Long subCstrnLocMapFileSize = dto.getSubFormList().get(i).getSubCstrnLocMapFile().getSize();
                    String subCstrnLocMapFileType = dto.getSubFormList().get(i).getSubCstrnLocMapFile().getContentType();
                    String subCstrnLocMapFileSavedFileName = subCstrnLocMapFileName;
                    File subCstrnLocMapFileNewFile = new File(filePath + subCstrnLocMapFileSavedFileName);

                    dto.getSubFormList().get(i).getSubCstrnLocMapFile().transferTo(subCstrnLocMapFileNewFile);
                    dto.setSubCstrnLocMapFileOriginNm(subCstrnLocMapFileOriName);
                    dto.setSubCstrnLocMapFileNm(subCstrnLocMapFileName);
                    dto.setSubCstrnLocMapFileSize(subCstrnLocMapFileSize);
                    dto.setSubCstrnLocMapFilePath(filePath);
                    dto.setSubCstrnLocMapFileType(subCstrnLocMapFileType);

                    UUID subCstrnStLocMapFileUuid = UUID.randomUUID();
                    String subCstrnStLocMapFileOriName = dto.getSubFormList().get(i).getSubCstrnStLocMapFile().getOriginalFilename();
                    String subCstrnStLocMapFileFullName[] = subCstrnStLocMapFileOriName.split("\\.");
                    String subCstrnStLocMapFileExt = subCstrnStLocMapFileFullName[1];
                    String subCstrnStLocMapFileName = subCstrnStLocMapFileUuid.toString()+"."+subCstrnStLocMapFileExt;
                    Long subCstrnStLocMapFileSize = dto.getSubFormList().get(i).getSubCstrnStLocMapFile().getSize();
                    String subCstrnStLocMapFileType = dto.getSubFormList().get(i).getSubCstrnStLocMapFile().getContentType();
                    String subCstrnStLocMapFileSavedFileName = subCstrnStLocMapFileName;
                    File subCstrnStLocMapFileNewFile = new File(filePath + subCstrnStLocMapFileSavedFileName);

                    dto.getSubFormList().get(i).getSubCstrnStLocMapFile().transferTo(subCstrnStLocMapFileNewFile);
                    dto.setSubCstrnStLocMapFileOriginNm(subCstrnStLocMapFileOriName);
                    dto.setSubCstrnStLocMapFileNm(subCstrnStLocMapFileName);
                    dto.setSubCstrnStLocMapFileSize(subCstrnStLocMapFileSize);
                    dto.setSubCstrnStLocMapFilePath(filePath);
                    dto.setSubCstrnStLocMapFileType(subCstrnStLocMapFileType);

                    UUID subCstrnEndLocMapFileUuid = UUID.randomUUID();
                    String subCstrnEndLocMapFileOriName = dto.getSubFormList().get(i).getSubCstrnEndLocMapFile().getOriginalFilename();
                    String subCstrnEndLocMapFileFullName[] = subCstrnEndLocMapFileOriName.split("\\.");
                    String subCstrnEndLocMapFileExt = subCstrnEndLocMapFileFullName[1];
                    String subCstrnEndLocMapFileName = subCstrnEndLocMapFileUuid.toString()+"."+subCstrnEndLocMapFileExt;
                    Long subCstrnEndLocMapFileSize = dto.getSubFormList().get(i).getSubCstrnEndLocMapFile().getSize();
                    String subCstrnEndLocMapFileType = dto.getSubFormList().get(i).getSubCstrnEndLocMapFile().getContentType();
                    String subCstrnEndLocMapFileSavedFileName = subCstrnEndLocMapFileName;
                    File subCstrnEndLocMapFileNewFile = new File(filePath + subCstrnEndLocMapFileSavedFileName);

                    dto.getSubFormList().get(i).getSubCstrnEndLocMapFile().transferTo(subCstrnEndLocMapFileNewFile);
                    dto.setSubCstrnEndLocMapFileOriginNm(subCstrnEndLocMapFileOriName);
                    dto.setSubCstrnEndLocMapFileNm(subCstrnEndLocMapFileName);
                    dto.setSubCstrnEndLocMapFileSize(subCstrnEndLocMapFileSize);
                    dto.setSubCstrnEndLocMapFilePath(filePath);
                    dto.setSubCstrnEndLocMapFileType(subCstrnEndLocMapFileType);

                    UUID subCstrnRepsLocMapFileUuid = UUID.randomUUID();
                    String subCstrnRepsLocMapFileOriName = dto.getSubFormList().get(i).getSubCstrnRepsLocMapFile().getOriginalFilename();
                    String subCstrnRepsLocMapFileFullName[] = subCstrnRepsLocMapFileOriName.split("\\.");
                    String subCstrnRepsLocMapFileExt = subCstrnRepsLocMapFileFullName[1];
                    String subCstrnRepsLocMapFileName = subCstrnRepsLocMapFileUuid.toString()+"."+subCstrnRepsLocMapFileExt;
                    Long subCstrnRepsLocMapFileSize = dto.getSubFormList().get(i).getSubCstrnRepsLocMapFile().getSize();
                    String subCstrnRepsLocMapFileType = dto.getSubFormList().get(i).getSubCstrnRepsLocMapFile().getContentType();
                    String subCstrnRepsLocMapFileSavedFileName = subCstrnRepsLocMapFileName;
                    File subCstrnRepsLocMapFileNewFile = new File(filePath + subCstrnRepsLocMapFileSavedFileName);

                    dto.getSubFormList().get(i).getSubCstrnRepsLocMapFile().transferTo(subCstrnRepsLocMapFileNewFile);
                    dto.setSubCstrnRepsLocMapFileOriginNm(subCstrnRepsLocMapFileOriName);
                    dto.setSubCstrnRepsLocMapFileNm(subCstrnRepsLocMapFileName);
                    dto.setSubCstrnRepsLocMapFileSize(subCstrnRepsLocMapFileSize);
                    dto.setSubCstrnRepsLocMapFilePath(filePath);
                    dto.setSubCstrnRepsLocMapFileType(subCstrnRepsLocMapFileType);

                    // dto에 세부공사formList 입력값 삽입
                    dto.setInitRptSubSeq(initRptSubSeq);
                    dto.setSubCstrnNm(subCstrnNm);
                    dto.setSubCstrnStDt(subCstrnStDt);
                    dto.setSubCstrnEndDt(subCstrnEndDt);
                    dto.setSubCstrnStLocAddr(subCstrnStLocAddr);
                    dto.setSubCstrnStCoodLongitude(subCstrnStCoodLongitude);
                    dto.setSubCstrnStCoodLatitude(subCstrnStCoodLatitude);
                    dto.setSubCstrnStDir(subCstrnStDir);
                    dto.setSubCstrnEndLocAddr(subCstrnEndLocAddr);
                    dto.setSubCstrnEndCoodLongitude(subCstrnEndCoodLongitude);
                    dto.setSubCstrnEndCoodLatitude(subCstrnEndCoodLatitude);
                    dto.setSubCstrnEndDir(subCstrnEndDir);

                    // 세부공사정보 등록(다건)
                    mapper.insertInitiationReportSubRegist(dto);
                }
            }
        } else {
            // 세부공사formList 에서 입력값 추출
            String initRptSubSeq = dto.getSubFormList().get(0).getInitRptSubSeq();
            String subCstrnNm = dto.getSubFormList().get(0).getSubCstrnNm();
            String subCstrnStDt = dto.getSubFormList().get(0).getSubCstrnStDt().replaceAll("-", "");
            String subCstrnEndDt = dto.getSubFormList().get(0).getSubCstrnEndDt().replaceAll("-", "");
            String subCstrnStLocAddr = dto.getSubFormList().get(0).getSubCstrnStLocAddr();
            String subCstrnStCoodLongitude = dto.getSubFormList().get(0).getSubCstrnStCoodLongitude();
            String subCstrnStCoodLatitude = dto.getSubFormList().get(0).getSubCstrnStCoodLatitude();
            String subCstrnStDir = dto.getSubFormList().get(0).getSubCstrnStDir();
            String subCstrnEndLocAddr = dto.getSubFormList().get(0).getSubCstrnEndLocAddr();
            String subCstrnEndCoodLongitude = dto.getSubFormList().get(0).getSubCstrnEndCoodLongitude();
            String subCstrnEndCoodLatitude = dto.getSubFormList().get(0).getSubCstrnEndCoodLatitude();
            String subCstrnEndDir = dto.getSubFormList().get(0).getSubCstrnEndDir();

            UUID subCstrnLocMapFileUuid = UUID.randomUUID();
            String subCstrnLocMapFileOriName = dto.getSubFormList().get(0).getSubCstrnLocMapFile().getOriginalFilename();
            String subCstrnLocMapFileFullName[] = subCstrnLocMapFileOriName.split("\\.");
            String subCstrnLocMapFileExt = subCstrnLocMapFileFullName[1];
            String subCstrnLocMapFileName = subCstrnLocMapFileUuid.toString()+"."+subCstrnLocMapFileExt;
            Long subCstrnLocMapFileSize = dto.getSubFormList().get(0).getSubCstrnLocMapFile().getSize();
            String subCstrnLocMapFileType = dto.getSubFormList().get(0).getSubCstrnLocMapFile().getContentType();
            String subCstrnLocMapFileSavedFileName = subCstrnLocMapFileName;
            File subCstrnLocMapFileNewFile = new File(filePath + subCstrnLocMapFileSavedFileName);

            dto.getSubFormList().get(0).getSubCstrnLocMapFile().transferTo(subCstrnLocMapFileNewFile);
            dto.setSubCstrnLocMapFileOriginNm(subCstrnLocMapFileOriName);
            dto.setSubCstrnLocMapFileNm(subCstrnLocMapFileName);
            dto.setSubCstrnLocMapFileSize(subCstrnLocMapFileSize);
            dto.setSubCstrnLocMapFilePath(filePath);
            dto.setSubCstrnLocMapFileType(subCstrnLocMapFileType);

            UUID subCstrnStLocMapFileUuid = UUID.randomUUID();
            String subCstrnStLocMapFileOriName = dto.getSubFormList().get(0).getSubCstrnStLocMapFile().getOriginalFilename();
            String subCstrnStLocMapFileFullName[] = subCstrnStLocMapFileOriName.split("\\.");
            String subCstrnStLocMapFileExt = subCstrnStLocMapFileFullName[1];
            String subCstrnStLocMapFileName = subCstrnStLocMapFileUuid.toString()+"."+subCstrnStLocMapFileExt;
            Long subCstrnStLocMapFileSize = dto.getSubFormList().get(0).getSubCstrnStLocMapFile().getSize();
            String subCstrnStLocMapFileType = dto.getSubFormList().get(0).getSubCstrnStLocMapFile().getContentType();
            String subCstrnStLocMapFileSavedFileName = subCstrnStLocMapFileName;
            File subCstrnStLocMapFileNewFile = new File(filePath + subCstrnStLocMapFileSavedFileName);

            dto.getSubFormList().get(0).getSubCstrnStLocMapFile().transferTo(subCstrnStLocMapFileNewFile);
            dto.setSubCstrnStLocMapFileOriginNm(subCstrnStLocMapFileOriName);
            dto.setSubCstrnStLocMapFileNm(subCstrnStLocMapFileName);
            dto.setSubCstrnStLocMapFileSize(subCstrnStLocMapFileSize);
            dto.setSubCstrnStLocMapFilePath(filePath);
            dto.setSubCstrnStLocMapFileType(subCstrnStLocMapFileType);

            UUID subCstrnEndLocMapFileUuid = UUID.randomUUID();
            String subCstrnEndLocMapFileOriName = dto.getSubFormList().get(0).getSubCstrnEndLocMapFile().getOriginalFilename();
            String subCstrnEndLocMapFileFullName[] = subCstrnEndLocMapFileOriName.split("\\.");
            String subCstrnEndLocMapFileExt = subCstrnEndLocMapFileFullName[1];
            String subCstrnEndLocMapFileName = subCstrnEndLocMapFileUuid.toString()+"."+subCstrnEndLocMapFileExt;
            Long subCstrnEndLocMapFileSize = dto.getSubFormList().get(0).getSubCstrnEndLocMapFile().getSize();
            String subCstrnEndLocMapFileType = dto.getSubFormList().get(0).getSubCstrnEndLocMapFile().getContentType();
            String subCstrnEndLocMapFileSavedFileName = subCstrnEndLocMapFileName;
            File subCstrnEndLocMapFileNewFile = new File(filePath + subCstrnEndLocMapFileSavedFileName);

            dto.getSubFormList().get(0).getSubCstrnEndLocMapFile().transferTo(subCstrnEndLocMapFileNewFile);
            dto.setSubCstrnEndLocMapFileOriginNm(subCstrnEndLocMapFileOriName);
            dto.setSubCstrnEndLocMapFileNm(subCstrnEndLocMapFileName);
            dto.setSubCstrnEndLocMapFileSize(subCstrnEndLocMapFileSize);
            dto.setSubCstrnEndLocMapFilePath(filePath);
            dto.setSubCstrnEndLocMapFileType(subCstrnEndLocMapFileType);

            UUID subCstrnRepsLocMapFileUuid = UUID.randomUUID();
            String subCstrnRepsLocMapFileOriName = dto.getSubFormList().get(0).getSubCstrnRepsLocMapFile().getOriginalFilename();
            String subCstrnRepsLocMapFileFullName[] = subCstrnRepsLocMapFileOriName.split("\\.");
            String subCstrnRepsLocMapFileExt = subCstrnRepsLocMapFileFullName[1];
            String subCstrnRepsLocMapFileName = subCstrnRepsLocMapFileUuid.toString()+"."+subCstrnRepsLocMapFileExt;
            Long subCstrnRepsLocMapFileSize = dto.getSubFormList().get(0).getSubCstrnRepsLocMapFile().getSize();
            String subCstrnRepsLocMapFileType = dto.getSubFormList().get(0).getSubCstrnRepsLocMapFile().getContentType();
            String subCstrnRepsLocMapFileSavedFileName = subCstrnRepsLocMapFileName;
            File subCstrnRepsLocMapFileNewFile = new File(filePath + subCstrnRepsLocMapFileSavedFileName);

            dto.getSubFormList().get(0).getSubCstrnRepsLocMapFile().transferTo(subCstrnRepsLocMapFileNewFile);
            dto.setSubCstrnRepsLocMapFileOriginNm(subCstrnRepsLocMapFileOriName);
            dto.setSubCstrnRepsLocMapFileNm(subCstrnRepsLocMapFileName);
            dto.setSubCstrnRepsLocMapFileSize(subCstrnRepsLocMapFileSize);
            dto.setSubCstrnRepsLocMapFilePath(filePath);
            dto.setSubCstrnRepsLocMapFileType(subCstrnRepsLocMapFileType);

            // dto에 세부공사formList 입력값 삽입
            dto.setInitRptSubSeq(initRptSubSeq);
            dto.setSubCstrnNm(subCstrnNm);
            dto.setSubCstrnStDt(subCstrnStDt);
            dto.setSubCstrnEndDt(subCstrnEndDt);
            dto.setSubCstrnStLocAddr(subCstrnStLocAddr);
            dto.setSubCstrnStCoodLongitude(subCstrnStCoodLongitude);
            dto.setSubCstrnStCoodLatitude(subCstrnStCoodLatitude);
            dto.setSubCstrnStDir(subCstrnStDir);
            dto.setSubCstrnEndLocAddr(subCstrnEndLocAddr);
            dto.setSubCstrnEndCoodLongitude(subCstrnEndCoodLongitude);
            dto.setSubCstrnEndCoodLatitude(subCstrnEndCoodLatitude);
            dto.setSubCstrnEndDir(subCstrnEndDir);
            // 세부공사정보 등록(단건)
            mapper.insertInitiationReportSubRegist(dto);
        }
    }

    @Override
    public InitiationReportDTO getInitiationReportDetail(InitiationReportDTO dto) throws Exception {
        dto = mapper.getInitiationReportDetail(dto);
        if (dto.getCstrnLocMapFilePath() != null){
            String filePath[] = dto.getCstrnLocMapFilePath().split("/");
            int userIdLenth = filePath.length-2;
            int dateLength = filePath.length-1;

            String filePathPartUserId = filePath[userIdLenth];
            String filePathPartDate = filePath[dateLength];
            String fileFullName[] = dto.getCstrnLocMapFileOriginNm().split("\\.");
            String fileType = fileFullName[1];
            dto.setCstrnLocMapFilePathPartDate(filePathPartDate);
            dto.setCstrnLocMapFilePathPartUserId(filePathPartUserId);
            dto.setCstrnLocMapFileNm(dto.getCstrnLocMapFileNm()+"."+fileType);
        }
        return dto;
    }

    @Override
    public List<InitiationReportDTO> getInitiationReportSubListDetail(InitiationReportDTO dto) throws Exception {
        List<InitiationReportDTO> initRptSubInfoList = mapper.getInitiationReportSubListDetail(dto);

        if (dto.getSubCstrnLocMapFilePath() != null){
            String fileFullName[] = dto.getSubCstrnLocMapFileOriginNm().split("\\.");
            String fileType = fileFullName[1];
            dto.setSubCstrnLocMapFileNm(dto.getSubCstrnLocMapFileNm()+"."+fileType);
        }
        if (dto.getSubCstrnStLocMapFilePath() != null){
            String fileFullName[] = dto.getSubCstrnStLocMapFileOriginNm().split("\\.");
            String fileType = fileFullName[1];
            dto.setSubCstrnLocMapFileNm(dto.getSubCstrnStLocMapFileNm()+"."+fileType);
        }
        if (dto.getSubCstrnEndLocMapFilePath() != null){
            String fileFullName[] = dto.getSubCstrnEndLocMapFileOriginNm().split("\\.");
            String fileType = fileFullName[1];
            dto.setSubCstrnLocMapFileNm(dto.getSubCstrnEndLocMapFileNm()+"."+fileType);
        }
        if (dto.getSubCstrnRepsLocMapFilePath() != null){
            String fileFullName[] = dto.getSubCstrnRepsLocMapFileOriginNm().split("\\.");
            String fileType = fileFullName[1];
            dto.setSubCstrnLocMapFileNm(dto.getSubCstrnRepsLocMapFileNm()+"."+fileType);
        }

        return initRptSubInfoList;
    }

    @Override
    public int updateInitiationReportApproval(InitiationReportDTO dto) throws Exception {
        int result = mapper.updateInitiationReportApproval(dto);
        return result;
    }

    @Override
    @Transactional
    public void updateInitiationReportUpdate(InitiationReportDTO dto) throws Exception {
        String subCstrnCnt = Integer.toString(dto.getSubFormList().size());
        logger.debug("subCstrnCnt = ", subCstrnCnt);
        dto.setSubCstrnCnt(subCstrnCnt);

        // 전체 공사기간 "-" 제거
        String cstrnStDt = dto.getCstrnStDt().replaceAll("-", "");
        String cstrnEnDt = dto.getCstrnEndDt().replaceAll("-", "");
        dto.setCstrnStDt(cstrnStDt);
        dto.setCstrnEndDt(cstrnEnDt);

        List<Map<String, Object>> beforeFileMap = mapper.getCstrnLocMapDelFileInfo(dto);
        String filePath = beforeFileMap.get(0).get("cstrnLocMapFilePath").toString();

        File Folder = new File(filePath);
        if (!Folder.exists()) {
            try{
                Folder.mkdirs(); //폴더 생성합니다.
                System.out.println("폴더가 생성되었습니다.");
            }
            catch(Exception e){
                e.getStackTrace();
            }
        }

        // 전체공사위치도 파일 수정 했을 경우(file이 null이 아닐 경우)
        if ( dto.getCstrnLocMapFile() != null ){
            // 수정전 파일명 저장(전체공사위치도)
            String delFilename = beforeFileMap.get(0).get("cstrnLocMapFileNm").toString();

            // 파일명 생성
            UUID uuid = UUID.randomUUID();
            // 파일명원본
            String originalFilename = dto.getCstrnLocMapFile().getOriginalFilename();
            String fileFullName[] = originalFilename.split("\\.");
            String ext = fileFullName[1];
            // 파일명
            String filename = uuid.toString()+"."+ext;
            // 파일크기
            Long fileSize = dto.getCstrnLocMapFile().getSize();
            // 파일타입
            String fileType = dto.getCstrnLocMapFile().getContentType();
            // 저장파일명
            String savedFileName = filename;
            // 파일경로+파일명 생성
            File newFile = new File(filePath + savedFileName);
            // 파일저장
            dto.getCstrnLocMapFile().transferTo(newFile);

            dto.setCstrnLocMapFileOriginNm(originalFilename);
            dto.setCstrnLocMapFileNm(filename);
            dto.setCstrnLocMapFileSize(fileSize);
            dto.setCstrnLocMapFilePath(filePath);
            dto.setCstrnLocMapFileType(fileType);

            // 수정전 파일 삭제
            File delFile = new File(filePath + delFilename);
            delFile.delete();

        }

        // 착수신고서 수정
        mapper.updateInitiationReportUpdate(dto);

        // 세부공사 건수가 1건 이상일 경우
        if (dto.getSubFormList().size() > 1) {
            for (int i = 0; i < dto.getSubFormList().size(); i++) {
                if (dto.getSubFormList().get(i).getSubCstrnStDt() != null) {

                    // 세부공사formList 에서 입력값 추출
                    String initRptSubSeq = dto.getSubFormList().get(i).getInitRptSubSeq();
                    String subCstrnNm = dto.getSubFormList().get(i).getSubCstrnNm();
                    String subCstrnStDt = dto.getSubFormList().get(i).getSubCstrnStDt().replaceAll("-", "");
                    String subCstrnEndDt = dto.getSubFormList().get(i).getSubCstrnEndDt().replaceAll("-", "");
                    String subCstrnStLocAddr = dto.getSubFormList().get(i).getSubCstrnStLocAddr();
                    String subCstrnStCoodLongitude = dto.getSubFormList().get(i).getSubCstrnStCoodLongitude();
                    String subCstrnStCoodLatitude = dto.getSubFormList().get(i).getSubCstrnStCoodLatitude();
                    String subCstrnStDir = dto.getSubFormList().get(i).getSubCstrnStDir();
                    String subCstrnEndLocAddr = dto.getSubFormList().get(i).getSubCstrnEndLocAddr();
                    String subCstrnEndCoodLongitude = dto.getSubFormList().get(i).getSubCstrnEndCoodLongitude();
                    String subCstrnEndCoodLatitude = dto.getSubFormList().get(i).getSubCstrnEndCoodLatitude();
                    String subCstrnEndDir = dto.getSubFormList().get(i).getSubCstrnEndDir();

                    // dto에 세부공사formList 입력값 삽입
                    dto.setInitRptSubSeq(initRptSubSeq);
                    dto.setSubCstrnNm(subCstrnNm);
                    dto.setSubCstrnStDt(subCstrnStDt);
                    dto.setSubCstrnEndDt(subCstrnEndDt);
                    dto.setSubCstrnStLocAddr(subCstrnStLocAddr);
                    dto.setSubCstrnStCoodLongitude(subCstrnStCoodLongitude);
                    dto.setSubCstrnStCoodLatitude(subCstrnStCoodLatitude);
                    dto.setSubCstrnStDir(subCstrnStDir);
                    dto.setSubCstrnEndLocAddr(subCstrnEndLocAddr);
                    dto.setSubCstrnEndCoodLongitude(subCstrnEndCoodLongitude);
                    dto.setSubCstrnEndCoodLatitude(subCstrnEndCoodLatitude);
                    dto.setSubCstrnEndDir(subCstrnEndDir);

                    if (dto.getSubFormList().get(i).getSubCstrnLocMapFile() != null) {
                        // 수정전 파일명 저장(세부공사위치도)
                        String delFilename = mapper.getSubCstrnLocMapDelFilename(dto);

                        UUID subCstrnLocMapFileUuid = UUID.randomUUID();
                        String subCstrnLocMapFileOriName = dto.getSubFormList().get(i).getSubCstrnLocMapFile().getOriginalFilename();
                        String subCstrnLocMapFileFullName[] = subCstrnLocMapFileOriName.split("\\.");
                        String subCstrnLocMapFileExt = subCstrnLocMapFileFullName[1];
                        String subCstrnLocMapFileName = subCstrnLocMapFileUuid.toString() + "." + subCstrnLocMapFileExt;
                        Long subCstrnLocMapFileSize = dto.getSubFormList().get(i).getSubCstrnLocMapFile().getSize();
                        String subCstrnLocMapFileType = dto.getSubFormList().get(i).getSubCstrnLocMapFile().getContentType();
                        String subCstrnLocMapFileSavedFileName = subCstrnLocMapFileName;
                        File subCstrnLocMapFileNewFile = new File(filePath + subCstrnLocMapFileSavedFileName);
                        // 파일저장
                        dto.getSubFormList().get(i).getSubCstrnLocMapFile().transferTo(subCstrnLocMapFileNewFile);

                        dto.setSubCstrnLocMapFileOriginNm(subCstrnLocMapFileOriName);
                        dto.setSubCstrnLocMapFileNm(subCstrnLocMapFileName);
                        dto.setSubCstrnLocMapFileSize(subCstrnLocMapFileSize);
                        dto.setSubCstrnLocMapFilePath(filePath);
                        dto.setSubCstrnLocMapFileType(subCstrnLocMapFileType);

                        // 수정전 파일 삭제
                        File delFile = new File(filePath + delFilename);
                        delFile.delete();
                    } // if문

                    if (dto.getSubFormList().get(i).getSubCstrnStLocMapFile() != null) {
                        // 수정전 파일명 저장(세부공사시점)
                        String delFilename = mapper.getSubCstrnStLocMapDelFilename(dto);

                        UUID subCstrnStLocMapFileUuid = UUID.randomUUID();
                        String subCstrnStLocMapFileOriName = dto.getSubFormList().get(i).getSubCstrnStLocMapFile().getOriginalFilename();
                        String subCstrnStLocMapFileFullName[] = subCstrnStLocMapFileOriName.split("\\.");
                        String subCstrnStLocMapFileExt = subCstrnStLocMapFileFullName[1];
                        String subCstrnStLocMapFileName = subCstrnStLocMapFileUuid.toString() + "." + subCstrnStLocMapFileExt;
                        Long subCstrnStLocMapFileSize = dto.getSubFormList().get(i).getSubCstrnStLocMapFile().getSize();
                        String subCstrnStLocMapFileType = dto.getSubFormList().get(i).getSubCstrnStLocMapFile().getContentType();
                        String subCstrnStLocMapFileSavedFileName = subCstrnStLocMapFileName;
                        File subCstrnStLocMapFileNewFile = new File(filePath + subCstrnStLocMapFileSavedFileName);
                        // 파일저장
                        dto.getSubFormList().get(i).getSubCstrnStLocMapFile().transferTo(subCstrnStLocMapFileNewFile);

                        dto.setSubCstrnStLocMapFileOriginNm(subCstrnStLocMapFileOriName);
                        dto.setSubCstrnStLocMapFileNm(subCstrnStLocMapFileName);
                        dto.setSubCstrnStLocMapFileSize(subCstrnStLocMapFileSize);
                        dto.setSubCstrnStLocMapFilePath(filePath);
                        dto.setSubCstrnStLocMapFileType(subCstrnStLocMapFileType);

                        // 수정전 파일 삭제
                        File delFile = new File(filePath + delFilename);
                        delFile.delete();
                    } // if문

                    if (dto.getSubFormList().get(i).getSubCstrnEndLocMapFile() != null) {
                        // 수정전 파일명 저장(세부공사종점)
                        String delFilename = mapper.getSubCstrnEndLocMapDelFilename(dto);

                        UUID subCstrnEndLocMapFileUuid = UUID.randomUUID();
                        String subCstrnEndLocMapFileOriName = dto.getSubFormList().get(i).getSubCstrnEndLocMapFile().getOriginalFilename();
                        String subCstrnEndLocMapFileFullName[] = subCstrnEndLocMapFileOriName.split("\\.");
                        String subCstrnEndLocMapFileExt = subCstrnEndLocMapFileFullName[1];
                        String subCstrnEndLocMapFileName = subCstrnEndLocMapFileUuid.toString() + "." + subCstrnEndLocMapFileExt;
                        Long subCstrnEndLocMapFileSize = dto.getSubFormList().get(i).getSubCstrnEndLocMapFile().getSize();
                        String subCstrnEndLocMapFileType = dto.getSubFormList().get(i).getSubCstrnEndLocMapFile().getContentType();
                        String subCstrnEndLocMapFileSavedFileName = subCstrnEndLocMapFileName;
                        File subCstrnEndLocMapFileNewFile = new File(filePath + subCstrnEndLocMapFileSavedFileName);
                        // 파일저장
                        dto.getSubFormList().get(i).getSubCstrnEndLocMapFile().transferTo(subCstrnEndLocMapFileNewFile);

                        dto.setSubCstrnEndLocMapFileOriginNm(subCstrnEndLocMapFileOriName);
                        dto.setSubCstrnEndLocMapFileNm(subCstrnEndLocMapFileName);
                        dto.setSubCstrnEndLocMapFileSize(subCstrnEndLocMapFileSize);
                        dto.setSubCstrnEndLocMapFilePath(filePath);
                        dto.setSubCstrnEndLocMapFileType(subCstrnEndLocMapFileType);

                        // 수정전 파일 삭제
                        File delFile = new File(filePath + delFilename);
                        delFile.delete();
                    } // if문

                    if (dto.getSubFormList().get(i).getSubCstrnRepsLocMapFile() != null) {
                        // 수정전 파일명 저장(세부공사대표지점)
                        String delFilename = mapper.getSubCstrnRepsLocMapDelFilename(dto);

                        UUID subCstrnRepsLocMapFileUuid = UUID.randomUUID();
                        String subCstrnRepsLocMapFileOriName = dto.getSubFormList().get(i).getSubCstrnRepsLocMapFile().getOriginalFilename();
                        String subCstrnRepsLocMapFileFullName[] = subCstrnRepsLocMapFileOriName.split("\\.");
                        String subCstrnRepsLocMapFileExt = subCstrnRepsLocMapFileFullName[1];
                        String subCstrnRepsLocMapFileName = subCstrnRepsLocMapFileUuid.toString() + "." + subCstrnRepsLocMapFileExt;
                        Long subCstrnRepsLocMapFileSize = dto.getSubFormList().get(i).getSubCstrnRepsLocMapFile().getSize();
                        String subCstrnRepsLocMapFileType = dto.getSubFormList().get(i).getSubCstrnRepsLocMapFile().getContentType();
                        String subCstrnRepsLocMapFileSavedFileName = subCstrnRepsLocMapFileName;
                        File subCstrnRepsLocMapFileNewFile = new File(filePath + subCstrnRepsLocMapFileSavedFileName);
                        // 파일저장
                        dto.getSubFormList().get(i).getSubCstrnRepsLocMapFile().transferTo(subCstrnRepsLocMapFileNewFile);

                        dto.setSubCstrnRepsLocMapFileOriginNm(subCstrnRepsLocMapFileOriName);
                        dto.setSubCstrnRepsLocMapFileNm(subCstrnRepsLocMapFileName);
                        dto.setSubCstrnRepsLocMapFileSize(subCstrnRepsLocMapFileSize);
                        dto.setSubCstrnRepsLocMapFilePath(filePath);
                        dto.setSubCstrnRepsLocMapFileType(subCstrnRepsLocMapFileType);

                        // 수정전 파일 삭제
                        File delFile = new File(filePath + delFilename);
                        delFile.delete();
                    } // if문

                    // 세부공사정보 등록(다건)
                    mapper.updateInitiationReportSubUpdate(dto);
                }// if문
            } // for문
        } else {

            // 세부공사formList 에서 입력값 추출
            String initRptSubSeq = dto.getSubFormList().get(0).getInitRptSubSeq();
            String subCstrnNm = dto.getSubFormList().get(0).getSubCstrnNm();
            String subCstrnStDt = dto.getSubFormList().get(0).getSubCstrnStDt().replaceAll("-", "");
            String subCstrnEndDt = dto.getSubFormList().get(0).getSubCstrnEndDt().replaceAll("-", "");
            String subCstrnStLocAddr = dto.getSubFormList().get(0).getSubCstrnStLocAddr();
            String subCstrnStCoodLongitude = dto.getSubFormList().get(0).getSubCstrnStCoodLongitude();
            String subCstrnStCoodLatitude = dto.getSubFormList().get(0).getSubCstrnStCoodLatitude();
            String subCstrnStDir = dto.getSubFormList().get(0).getSubCstrnStDir();
            String subCstrnEndLocAddr = dto.getSubFormList().get(0).getSubCstrnEndLocAddr();
            String subCstrnEndCoodLongitude = dto.getSubFormList().get(0).getSubCstrnEndCoodLongitude();
            String subCstrnEndCoodLatitude = dto.getSubFormList().get(0).getSubCstrnEndCoodLatitude();
            String subCstrnEndDir = dto.getSubFormList().get(0).getSubCstrnEndDir();

            // dto에 세부공사formList 입력값 삽입
            dto.setInitRptSubSeq(initRptSubSeq);
            dto.setSubCstrnNm(subCstrnNm);
            dto.setSubCstrnStDt(subCstrnStDt);
            dto.setSubCstrnEndDt(subCstrnEndDt);
            dto.setSubCstrnStLocAddr(subCstrnStLocAddr);
            dto.setSubCstrnStCoodLongitude(subCstrnStCoodLongitude);
            dto.setSubCstrnStCoodLatitude(subCstrnStCoodLatitude);
            dto.setSubCstrnStDir(subCstrnStDir);
            dto.setSubCstrnEndLocAddr(subCstrnEndLocAddr);
            dto.setSubCstrnEndCoodLongitude(subCstrnEndCoodLongitude);
            dto.setSubCstrnEndCoodLatitude(subCstrnEndCoodLatitude);
            dto.setSubCstrnEndDir(subCstrnEndDir);

            if (dto.getSubFormList().get(0).getSubCstrnLocMapFile() != null) {
                // 수정전 파일명 저장(세부공사위치도)
                String delFilename = mapper.getSubCstrnLocMapDelFilename(dto);

                UUID subCstrnLocMapFileUuid = UUID.randomUUID();
                String subCstrnLocMapFileOriName = dto.getSubFormList().get(0).getSubCstrnLocMapFile().getOriginalFilename();
                String subCstrnLocMapFileFullName[] = subCstrnLocMapFileOriName.split("\\.");
                String subCstrnLocMapFileExt = subCstrnLocMapFileFullName[1];
                String subCstrnLocMapFileName = subCstrnLocMapFileUuid.toString() + "." + subCstrnLocMapFileExt;
                Long subCstrnLocMapFileSize = dto.getSubFormList().get(0).getSubCstrnLocMapFile().getSize();
                String subCstrnLocMapFileType = dto.getSubFormList().get(0).getSubCstrnLocMapFile().getContentType();
                String subCstrnLocMapFileSavedFileName = subCstrnLocMapFileName;
                File subCstrnLocMapFileNewFile = new File(filePath + subCstrnLocMapFileSavedFileName);
                // 파일생성(수정)
                dto.getSubFormList().get(0).getSubCstrnLocMapFile().transferTo(subCstrnLocMapFileNewFile);

                dto.setSubCstrnLocMapFileOriginNm(subCstrnLocMapFileOriName);
                dto.setSubCstrnLocMapFileNm(subCstrnLocMapFileName);
                dto.setSubCstrnLocMapFileSize(subCstrnLocMapFileSize);
                dto.setSubCstrnLocMapFilePath(filePath);
                dto.setSubCstrnLocMapFileType(subCstrnLocMapFileType);

                // 수정전 파일 삭제
                File delFile = new File(filePath + delFilename);
                delFile.delete();
            } // if문

            if (dto.getSubFormList().get(0).getSubCstrnStLocMapFile() != null) {
                // 수정전 파일명 저장(세부공사시점)
                String delFilename = mapper.getSubCstrnStLocMapDelFilename(dto);
                
                UUID subCstrnStLocMapFileUuid = UUID.randomUUID();
                String subCstrnStLocMapFileOriName = dto.getSubFormList().get(0).getSubCstrnStLocMapFile().getOriginalFilename();
                String subCstrnStLocMapFileFullName[] = subCstrnStLocMapFileOriName.split("\\.");
                String subCstrnStLocMapFileExt = subCstrnStLocMapFileFullName[1];
                String subCstrnStLocMapFileName = subCstrnStLocMapFileUuid.toString() + "." + subCstrnStLocMapFileExt;
                Long subCstrnStLocMapFileSize = dto.getSubFormList().get(0).getSubCstrnStLocMapFile().getSize();
                String subCstrnStLocMapFileType = dto.getSubFormList().get(0).getSubCstrnStLocMapFile().getContentType();
                String subCstrnStLocMapFileSavedFileName = subCstrnStLocMapFileName;
                File subCstrnStLocMapFileNewFile = new File(filePath + subCstrnStLocMapFileSavedFileName);
                // 파일생성(수정)
                dto.getSubFormList().get(0).getSubCstrnStLocMapFile().transferTo(subCstrnStLocMapFileNewFile);
                
                dto.setSubCstrnStLocMapFileOriginNm(subCstrnStLocMapFileOriName);
                dto.setSubCstrnStLocMapFileNm(subCstrnStLocMapFileName);
                dto.setSubCstrnStLocMapFileSize(subCstrnStLocMapFileSize);
                dto.setSubCstrnStLocMapFilePath(filePath);
                dto.setSubCstrnStLocMapFileType(subCstrnStLocMapFileType);

                // 수정전 파일 삭제
                File delFile = new File(filePath + delFilename);
                delFile.delete();
            } // if문

            if (dto.getSubFormList().get(0).getSubCstrnEndLocMapFile() != null) {
                // 수정전 파일명 저장(세부공사종점)
                String delFilename = mapper.getSubCstrnEndLocMapDelFilename(dto);

                UUID subCstrnEndLocMapFileUuid = UUID.randomUUID();
                String subCstrnEndLocMapFileOriName = dto.getSubFormList().get(0).getSubCstrnEndLocMapFile().getOriginalFilename();
                String subCstrnEndLocMapFileFullName[] = subCstrnEndLocMapFileOriName.split("\\.");
                String subCstrnEndLocMapFileExt = subCstrnEndLocMapFileFullName[1];
                String subCstrnEndLocMapFileName = subCstrnEndLocMapFileUuid.toString() + "." + subCstrnEndLocMapFileExt;
                Long subCstrnEndLocMapFileSize = dto.getSubFormList().get(0).getSubCstrnEndLocMapFile().getSize();
                String subCstrnEndLocMapFileType = dto.getSubFormList().get(0).getSubCstrnEndLocMapFile().getContentType();
                String subCstrnEndLocMapFileSavedFileName = subCstrnEndLocMapFileName;
                File subCstrnEndLocMapFileNewFile = new File(filePath + subCstrnEndLocMapFileSavedFileName);
                // 파일생성(수정)
                dto.getSubFormList().get(0).getSubCstrnEndLocMapFile().transferTo(subCstrnEndLocMapFileNewFile);

                dto.setSubCstrnEndLocMapFileOriginNm(subCstrnEndLocMapFileOriName);
                dto.setSubCstrnEndLocMapFileNm(subCstrnEndLocMapFileName);
                dto.setSubCstrnEndLocMapFileSize(subCstrnEndLocMapFileSize);
                dto.setSubCstrnEndLocMapFilePath(filePath);
                dto.setSubCstrnEndLocMapFileType(subCstrnEndLocMapFileType);

                // 수정전 파일 삭제
                File delFile = new File(filePath + delFilename);
                delFile.delete();
            } // if문

            if (dto.getSubFormList().get(0).getSubCstrnRepsLocMapFile() != null) {
                // 수정전 파일명 저장(세부공사대표지점)
                String delFilename = mapper.getSubCstrnRepsLocMapDelFilename(dto);

                UUID subCstrnRepsLocMapFileUuid = UUID.randomUUID();
                String subCstrnRepsLocMapFileOriName = dto.getSubFormList().get(0).getSubCstrnRepsLocMapFile().getOriginalFilename();
                String subCstrnRepsLocMapFileFullName[] = subCstrnRepsLocMapFileOriName.split("\\.");
                String subCstrnRepsLocMapFileExt = subCstrnRepsLocMapFileFullName[1];
                String subCstrnRepsLocMapFileName = subCstrnRepsLocMapFileUuid.toString() + "." + subCstrnRepsLocMapFileExt;
                Long subCstrnRepsLocMapFileSize = dto.getSubFormList().get(0).getSubCstrnRepsLocMapFile().getSize();
                String subCstrnRepsLocMapFileType = dto.getSubFormList().get(0).getSubCstrnRepsLocMapFile().getContentType();
                String subCstrnRepsLocMapFileSavedFileName = subCstrnRepsLocMapFileName;
                File subCstrnRepsLocMapFileNewFile = new File(filePath + subCstrnRepsLocMapFileSavedFileName);
                // 파일생성(수정)
                dto.getSubFormList().get(0).getSubCstrnRepsLocMapFile().transferTo(subCstrnRepsLocMapFileNewFile);

                dto.setSubCstrnRepsLocMapFileOriginNm(subCstrnRepsLocMapFileOriName);
                dto.setSubCstrnRepsLocMapFileNm(subCstrnRepsLocMapFileName);
                dto.setSubCstrnRepsLocMapFileSize(subCstrnRepsLocMapFileSize);
                dto.setSubCstrnRepsLocMapFilePath(filePath);
                dto.setSubCstrnRepsLocMapFileType(subCstrnRepsLocMapFileType);

                // 수정전 파일 삭제
                File delFile = new File(filePath + delFilename);
                delFile.delete();
            } // if문

            // 세부공사정보 등록(단건)
            mapper.updateInitiationReportSubUpdate(dto);
        }
    }
    @Override
    @Transactional
    public void itiationReportAppr(InitiationReportDTO dto) throws Exception {
    	mapper.initiationReportApprUpdate(dto);
    }

    @Transactional
    public void itiationReportDel(ArrayList<String> arrayList) throws Exception {
        InitiationReportDTO dto = new InitiationReportDTO();
    	for(String seq :arrayList) {
            dto.setSeq(Long.parseLong(seq));
            // 데이터 삭제 전 file 정보 불러오기
            InitiationReportDTO initRptInfo = mapper.getInitiationReportDetail(dto);
            List<InitiationReportDTO> initRptSubList = mapper.getInitiationReportSubListDetail(dto);
            String filePath = initRptInfo.getCstrnLocMapFilePath();
            String cstrnLocMapFileNm = initRptInfo.getCstrnLocMapFileNm();
            File cstrnLocMapFile = new File(filePath + cstrnLocMapFileNm);

            mapper.itiationReportDel(seq);
            mapper.itiationReportSubDel(seq);

            cstrnLocMapFile.delete();

            for (int i = 0; i < initRptSubList.size(); i++) {
                String subCstrnLocMapFileNm = initRptSubList.get(i).getSubCstrnLocMapFileNm();
                File subCstrnLocMapFile = new File(filePath + subCstrnLocMapFileNm);
                String subCstrnStLocMapFileNm = initRptSubList.get(i).getSubCstrnStLocMapFileNm();
                File subCstrnStLocMapFile = new File(filePath + subCstrnStLocMapFileNm);
                String subCstrnEndLocMapFileNm = initRptSubList.get(i).getSubCstrnEndLocMapFileNm();
                File subCstrnEndLocMapFile = new File(filePath + subCstrnEndLocMapFileNm);
                String subCstrnRepsLocMapFileNm = initRptSubList.get(i).getSubCstrnRepsLocMapFileNm();
                File subCstrnRepsLocMapFile = new File(filePath + subCstrnRepsLocMapFileNm);
                subCstrnLocMapFile.delete();
                subCstrnStLocMapFile.delete();
                subCstrnEndLocMapFile.delete();
                subCstrnRepsLocMapFile.delete();
            }
        }
    }
    
    @Override
    public InitiationReportDTO getAtchFile(Map<String, Object> params) throws Exception {
        return mapper.getAtchFile(params);
    }
    
    @Override
    public InitiationReportDTO getAtchMasterFile(Map<String, Object> params) throws Exception {
        return mapper.getAtchMasterFile(params);
    }

}
