package kr.or.lx.rcic.modules.serviceinfo.service.impl;

import kr.co.timosoft.util.PaginationUtil;
import kr.or.lx.rcic.egovframework.cmmn.util.EgovMessageSource;
import kr.or.lx.rcic.modules.serviceinfo.entity.ServiceInfo;
import kr.or.lx.rcic.modules.serviceinfo.mapper.ServiceInfoMapper;
import kr.or.lx.rcic.modules.serviceinfo.service.ServiceInfoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *  수집연계대상의 서비스정보를 관리한다.  */
@Service
@Slf4j
public class ServiceInfoServiceImpl implements ServiceInfoService {

    @Autowired
    private ServiceInfoMapper serviceInfoMapper;

    @Resource(name = "egovMessageSource")
    EgovMessageSource egovMessageSource;

    /**
     * 단건 조회
     */
    @Override
    public ServiceInfo getServiceInfo(Map<String, Object> params) throws Exception {
        return serviceInfoMapper.getServiceInfo(params);
    }

    /**
     * 목록 조회
     */
    @Override
    public Map<String, Object> getServiceInfoList(Map<String, Object> param) throws Exception {

        HashMap<String, Object> resultMap = new HashMap<>();

        int cnt = serviceInfoMapper.selectServiceInfoCnt(param);
        List<Map<String, Object>> list = serviceInfoMapper.selectServiceInfoList(param);

        int listCnt = Integer.parseInt(String.valueOf(param.get("listCnt")));
        int maxPageCnt = PaginationUtil.maxPageCnt(cnt, listCnt);
        resultMap.put("maxPageCnt", maxPageCnt);
        resultMap.put("list", list);
        resultMap.put("totalCnt", cnt);

        return resultMap;
    }

    @Override
    public List<String> getInsttList() throws Exception {
        return serviceInfoMapper.getInsttList();
    }

}
