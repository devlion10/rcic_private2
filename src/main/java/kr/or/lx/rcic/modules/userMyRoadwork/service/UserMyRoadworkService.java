package kr.or.lx.rcic.modules.userMyRoadwork.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import kr.or.lx.rcic.frmwrk.util.SimpleData;
import kr.or.lx.rcic.modules.userMyRoadwork.entity.UserMyRoadwork;

/**
 *  업무사용자의 도로공사 관심목록을 관리한다.  */
public interface UserMyRoadworkService {

    UserMyRoadwork getUserMyRoadwork(Map<String, Object> params) throws Exception;

    Map<String, Object> getUserMyRoadworkList(HttpServletRequest request) throws Exception;

    int insertUserMyRoadwork(SimpleData simpleData) throws Exception;

    int updateUserMyRoadwork(SimpleData simpleData) throws Exception;

    int updateUserMyRoadworkDynamic(UserMyRoadwork userMyRoadwork) throws Exception;

    int deleteUserMyRoadwork(SimpleData simpleData) throws Exception;

	Map<String, Object> getFavorList(HttpServletRequest request) throws Exception;


}
