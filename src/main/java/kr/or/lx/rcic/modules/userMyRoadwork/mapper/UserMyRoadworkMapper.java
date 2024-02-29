package kr.or.lx.rcic.modules.userMyRoadwork.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import kr.or.lx.rcic.frmwrk.util.SimpleData;
import kr.or.lx.rcic.modules.userMyRoadwork.entity.UserMyRoadwork;

/**
 * UserMyRoadwork Mapper
 */
public interface UserMyRoadworkMapper {

    UserMyRoadwork getUserMyRoadwork(Map<String, Object> params);

    int selectUserMyRoadworkCnt(Map<String, Object> params);

    List<Map<String, Object>> selectUserMyRoadworkList(Map<String, Object> params);

    int insertUserMyRoadwork(SimpleData simpleData);

    int updateUserMyRoadwork(SimpleData simpleData);

    int updateUserMyRoadworkDynamic(UserMyRoadwork userMyRoadwork);

    int deleteUserMyRoadwork(SimpleData simpleData);

	List<Map<String, Object>> selectFavorList(HashMap<String, Object> param);

}
