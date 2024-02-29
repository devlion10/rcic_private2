package kr.or.lx.rcic.modules.serviceinfo.service;

import kr.or.lx.rcic.modules.serviceinfo.entity.ServiceInfo;

import java.util.List;
import java.util.Map;

/**
 *  수집연계대상의 서비스정보를 관리한다.  */
public interface ServiceInfoService {

    ServiceInfo getServiceInfo(Map<String, Object> params) throws Exception;

    Map<String, Object> getServiceInfoList(Map<String, Object> param) throws Exception;

    List<String> getInsttList() throws Exception;
}
