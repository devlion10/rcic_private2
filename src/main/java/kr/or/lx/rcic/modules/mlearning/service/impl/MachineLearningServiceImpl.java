package kr.or.lx.rcic.modules.mlearning.service.impl;

import kr.co.timosoft.util.PaginationUtil;
import kr.or.lx.rcic.modules.mlearning.mapper.MachineLearningMapper;
import kr.or.lx.rcic.modules.mlearning.service.MachineLearningService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class MachineLearningServiceImpl implements MachineLearningService {

    @Autowired
    private MachineLearningMapper mapper;

    @Override
    public Map<String, Object> getLightLogList(Map param) throws Exception {

        int cnt = mapper.getLightLogListCnt(param);
        List<Map<String, Object>> list =  mapper.getLightLogList(param);

        Map<String, Object> resultMap = new LinkedHashMap<>();
        int listCnt = param.get("listCnt") == null ? 5 : Integer.parseInt(String.valueOf(param.get("listCnt")));
        int maxPageCnt = PaginationUtil.maxPageCnt(cnt, listCnt);
        resultMap.put("maxPageCnt", maxPageCnt);
        resultMap.put("list", list);
        resultMap.put("totalCnt", cnt);
        return resultMap;
    }

    @Override
    public Map<String, Object> getLightResultOmissionList(Map param) throws Exception {
        int cnt = mapper.getLightResultOmissionListCnt(param);
        List<Map<String, Object>> list =  mapper.getLightResultOmissionList(param);

        Map<String, Object> resultMap = new LinkedHashMap<>();
        int listCnt = param.get("listCnt") == null ? 5 : Integer.parseInt(String.valueOf(param.get("listCnt")));
        int maxPageCnt = PaginationUtil.maxPageCnt(cnt, listCnt);
        resultMap.put("maxPageCnt", maxPageCnt);
        resultMap.put("list", list);
        resultMap.put("totalCnt", cnt);
        return resultMap;
    }

    @Override
    public Map<String, Object> getLightResultWrongList(Map param) throws Exception {
        int cnt = mapper.getLightResultWrongListCnt(param);
        List<Map<String, Object>> list =  mapper.getLightResultWrongList(param);

        Map<String, Object> resultMap = new LinkedHashMap<>();
        int listCnt = param.get("listCnt") == null ? 5 : Integer.parseInt(String.valueOf(param.get("listCnt")));
        int maxPageCnt = PaginationUtil.maxPageCnt(cnt, listCnt);
        resultMap.put("maxPageCnt", maxPageCnt);
        resultMap.put("list", list);
        resultMap.put("totalCnt", cnt);
        return resultMap;
    }

    /**
     * 최대반경결정모델
     * @param param
     * @return
     * @throws Exception
     */
    @Override
    public Map<String, Object> getLinearLogList(Map param) throws Exception {
        int cnt = mapper.getLinearLogListCnt(param);
        List<Map<String, Object>> list =  mapper.getLinearLogList(param);

        Map<String, Object> resultMap = new LinkedHashMap<>();
        int listCnt = param.get("listCnt") == null ? 5 : Integer.parseInt(String.valueOf(param.get("listCnt")));
        int maxPageCnt = PaginationUtil.maxPageCnt(cnt, listCnt);
        resultMap.put("maxPageCnt", maxPageCnt);
        resultMap.put("list", list);
        resultMap.put("totalCnt", cnt);
        return resultMap;
    }


    /**
     * 포착 공고
     * @param param
     * @return
     * @throws Exception
     */
    @Override
    public Map<String, Object> getLinearResultCaughtList(Map param) throws Exception {
        int cnt = mapper.getLinearResultCaughtListCnt(param);
        List<Map<String, Object>> list =  mapper.getLinearResultCaughtList(param);

        Map<String, Object> resultMap = new LinkedHashMap<>();
        int listCnt = param.get("listCnt") == null ? 5 : Integer.parseInt(String.valueOf(param.get("listCnt")));
        int maxPageCnt = PaginationUtil.maxPageCnt(cnt, listCnt);
        resultMap.put("maxPageCnt", maxPageCnt);
        resultMap.put("list", list);
        resultMap.put("totalCnt", cnt);
        return resultMap;
    }


    /**
     * 미포착 공고
     * @param param
     * @return
     * @throws Exception
     */
    @Override
    public Map<String, Object> getLinearResultMissedList(Map param) throws Exception {
        int cnt = mapper.getLinearResultMissedListCnt(param);
        List<Map<String, Object>> list =  mapper.getLinearResultMissedList(param);

        Map<String, Object> resultMap = new LinkedHashMap<>();
        int listCnt = param.get("listCnt") == null ? 5 : Integer.parseInt(String.valueOf(param.get("listCnt")));
        int maxPageCnt = PaginationUtil.maxPageCnt(cnt, listCnt);
        resultMap.put("maxPageCnt", maxPageCnt);
        resultMap.put("list", list);
        resultMap.put("totalCnt", cnt);
        return resultMap;
    }
}
