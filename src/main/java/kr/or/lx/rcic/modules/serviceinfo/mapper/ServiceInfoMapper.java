package kr.or.lx.rcic.modules.serviceinfo.mapper;

import kr.or.lx.rcic.modules.serviceinfo.entity.ServiceInfo;

import java.util.List;
import java.util.Map;

/**
 * ServiceInfo Mapper
 */
public interface ServiceInfoMapper {

    ServiceInfo getServiceInfo(Map<String, Object> params);

    int selectServiceInfoCnt(Map<String, Object> params);

    List<Map<String, Object>> selectServiceInfoList(Map<String, Object> params);

    List<String> getInsttList();
}
