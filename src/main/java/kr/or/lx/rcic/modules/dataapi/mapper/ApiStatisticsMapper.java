package kr.or.lx.rcic.modules.dataapi.mapper;

import java.util.List;
import java.util.Map;

/**
 * ApiBlockInfo Mapper
 */
public interface ApiStatisticsMapper {

    List<Map<String, Object>> getApiUseStatistics(Map params);
    List<Map<String, Object>> getDataUseStatistics(Map params);

}
