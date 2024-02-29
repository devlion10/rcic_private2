package kr.or.lx.rcic.modules.dataapi.service.impl;


import kr.or.lx.rcic.modules.dataapi.mapper.ApiStatisticsMapper;
import kr.or.lx.rcic.modules.dataapi.service.ApiStatisticsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class ApiApiStatisticsServiceImpl implements ApiStatisticsService {

    @Autowired
    private ApiStatisticsMapper mapper;


    @Override
    public List<Map<String, Object>> getApiUseStatistics(Map param) throws Exception {
        return mapper.getApiUseStatistics(param);
    }

    @Override
    public List<Map<String, Object>> getDataUseStatistics(Map param) throws Exception {
        return mapper.getDataUseStatistics(param);
    }
}
