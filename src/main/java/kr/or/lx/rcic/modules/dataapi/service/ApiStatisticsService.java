package kr.or.lx.rcic.modules.dataapi.service;

import java.util.List;
import java.util.Map;

public interface ApiStatisticsService {

    List<Map<String, Object>> getApiUseStatistics(Map param) throws Exception;

    List<Map<String, Object>> getDataUseStatistics(Map param) throws Exception;
    
}
