package kr.or.lx.rcic.modules.dataapi.service;

import kr.or.lx.rcic.modules.dataapi.entity.ApiUser;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 *  API로 데이터를 제공받는 사용자정보를 관리한다.  */
public interface ApiUserService {

    ApiUser getApiUser(Map<String, Object> params) throws Exception;

    Map<String, Object> getApiUserList(Map<String, Object> param) throws Exception;

    int saveApiUser(ApiUser apiUser) throws Exception;

    HashMap<String, Object> insertApiUser(HttpServletRequest request) throws Exception;
    int updateApiUser(ApiUser apiUser) throws Exception;

    int updateApiUserDynamic(ApiUser apiUser) throws Exception;

    int deleteApiUser(ApiUser apiUser) throws Exception;


}
