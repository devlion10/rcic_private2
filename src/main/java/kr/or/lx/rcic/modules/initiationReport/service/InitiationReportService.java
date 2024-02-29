package kr.or.lx.rcic.modules.initiationReport.service;

import kr.or.lx.rcic.modules.board.entity.BbsAtchFile;
import kr.or.lx.rcic.modules.initiationReport.entity.InitiationReportDTO;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

/**
 *  착수신고서를 통해 등록된 도로변경정보 정보를 관리한다.  */
public interface InitiationReportService {

    InitiationReportDTO getAnalysisBidntceno(InitiationReportDTO dto) throws Exception;
    List<InitiationReportDTO> getComCodeList(String cdid) throws Exception;
    void insertInitiationReportRegist(InitiationReportDTO dto) throws Exception;
    HashMap<String, Object> getInitiationReportList(HttpServletRequest request) throws Exception;
    //List<InitiationReport> getInitiationReportList(InitiationReport initiationReport) throws Exception;
    InitiationReportDTO getInitiationReportDetail(InitiationReportDTO dto) throws Exception;
    int updateInitiationReportApproval(InitiationReportDTO dto) throws Exception;
    List<InitiationReportDTO> getInitiationReportSubListDetail(InitiationReportDTO dto) throws Exception;
    void updateInitiationReportUpdate(InitiationReportDTO dto) throws Exception;
    List<InitiationReportDTO> getSidoList() throws Exception;
    List<InitiationReportDTO> getSggList(InitiationReportDTO dto) throws Exception;
    List<InitiationReportDTO> getEmdList(InitiationReportDTO dto) throws Exception;
    void itiationReportAppr(InitiationReportDTO dto) throws Exception;
    void itiationReportDel(ArrayList<String> jsonData) throws Exception;
    InitiationReportDTO getAtchFile(Map<String, Object> params) throws Exception;
    InitiationReportDTO getAtchMasterFile(Map<String, Object> params) throws Exception;
}
