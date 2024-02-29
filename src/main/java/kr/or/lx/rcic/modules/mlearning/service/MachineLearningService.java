package kr.or.lx.rcic.modules.mlearning.service;

import java.util.Map;

public interface MachineLearningService {

    Map<String, Object> getLightLogList(Map param) throws Exception;
    Map<String, Object> getLightResultOmissionList(Map param) throws Exception;
    Map<String, Object> getLightResultWrongList(Map param) throws Exception;

    Map<String, Object> getLinearLogList(Map param) throws Exception;
    Map<String, Object> getLinearResultCaughtList(Map param) throws Exception;
    Map<String, Object> getLinearResultMissedList(Map param) throws Exception;

}
