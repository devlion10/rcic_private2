package kr.or.lx.rcic.modules.initiationReport.mapper;

import kr.or.lx.rcic.modules.initiationReport.entity.InitiationReportDTO;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * InitiationReport Mapper
 */
public interface InitiationReportMapper {

    InitiationReportDTO getAnalysisBidntceno(InitiationReportDTO dto);
    //List<InitiationReport> getInitiationReportList(InitiationReportDTO dto);
    //int getInitiationReportListCnt(Map<String, Object> params);
    int getInitiationReportListCnt(Map<String, Object> param);
    List<InitiationReportDTO> getComCodeList(String cdid);

    List<InitiationReportDTO> getSidoList();

    List<InitiationReportDTO> getSggList(InitiationReportDTO dto);

    List<InitiationReportDTO> getEmdList(InitiationReportDTO dto);

    void insertInitiationReportRegist(InitiationReportDTO dto);

    void insertInitiationReportSubRegist(InitiationReportDTO dto);

    //    void updateMngInitiationReportRegist(InitiationReport initiationReport);
	List<Map<String, Object>> getInitiationReportList(Map<String, Object> param);
    InitiationReportDTO getInitiationReportDetail(InitiationReportDTO dto);

    int updateInitiationReportApproval(InitiationReportDTO dto);

    int getInitiationReportSubListCnt(InitiationReportDTO dto);

    List<InitiationReportDTO> getInitiationReportSubListDetail(InitiationReportDTO dto);

    void updateInitiationReportUpdate(InitiationReportDTO dto);
    List<Map<String, Object>> getCstrnLocMapDelFileInfo(InitiationReportDTO dto);
    String getSubCstrnLocMapDelFilename(InitiationReportDTO dto);
    String getSubCstrnStLocMapDelFilename(InitiationReportDTO dto);
    String getSubCstrnEndLocMapDelFilename(InitiationReportDTO dto);
    String getSubCstrnRepsLocMapDelFilename(InitiationReportDTO dto);

    void updateInitiationReportSubUpdate(InitiationReportDTO dto);
	void initiationReportApprUpdate(InitiationReportDTO dto);
	void itiationReportDel(String seq);
    void itiationReportSubDel(String seq);
	InitiationReportDTO getAtchFile(Map<String, Object> params);
	InitiationReportDTO getAtchMasterFile(Map<String, Object> params);

}
