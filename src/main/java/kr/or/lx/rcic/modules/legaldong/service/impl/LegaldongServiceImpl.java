package kr.or.lx.rcic.modules.legaldong.service.impl;

import kr.co.timosoft.util.PaginationUtil;
import kr.or.lx.rcic.modules.legaldong.mapper.LegaldongMapper;
import kr.or.lx.rcic.modules.legaldong.service.LegaldongService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class LegaldongServiceImpl implements LegaldongService {


    @Autowired
    LegaldongMapper legaldongMapper;

    @Override
    public Map<String, Object> getLiList(Map param) throws Exception {

        int cnt = legaldongMapper.getLiListCnt(param);
        List<Map<String, Object>> list = legaldongMapper.getLiList(param);

        // 결과
        Map<String, Object> resultMap = new HashMap<>();
        int listCnt = param.get("listCnt") == null ? 10 : Integer.parseInt(String.valueOf(param.get("listCnt")));
        int maxPageCnt = PaginationUtil.maxPageCnt(cnt, listCnt);

        resultMap.put("maxPageCnt", maxPageCnt);
        resultMap.put("list", list);
        resultMap.put("totalCnt", cnt);

        return resultMap;
    }
}
