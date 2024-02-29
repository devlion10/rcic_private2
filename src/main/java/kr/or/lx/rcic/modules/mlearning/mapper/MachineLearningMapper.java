package kr.or.lx.rcic.modules.mlearning.mapper;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface MachineLearningMapper {

    List<Map<String, Object>> getLightLogList(Map param) throws Exception;
    List<Map<String, Object>> getLightResultOmissionList(Map param) throws Exception;
    List<Map<String, Object>> getLightResultWrongList(Map param) throws Exception;
    int getLightLogListCnt(Map param) throws Exception;
    int getLightResultOmissionListCnt(Map param) throws Exception;
    int getLightResultWrongListCnt(Map param) throws Exception;

    List<Map<String, Object>> getLinearLogList(Map param) throws Exception;
    List<Map<String, Object>> getLinearResultCaughtList(Map param) throws Exception;
    List<Map<String, Object>> getLinearResultMissedList(Map param) throws Exception;
    int getLinearLogListCnt(Map param) throws Exception;
    int getLinearResultCaughtListCnt(Map param) throws Exception;
    int getLinearResultMissedListCnt(Map param) throws Exception;


}
