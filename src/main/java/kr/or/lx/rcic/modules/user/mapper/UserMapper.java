package kr.or.lx.rcic.modules.user.mapper;

import kr.or.lx.rcic.frmwrk.user.UserInfo;
import kr.or.lx.rcic.frmwrk.util.SimpleData;
import kr.or.lx.rcic.modules.user.entity.User;
import org.apache.ibatis.annotations.Param;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * User Mapper
 */
public interface UserMapper {

    User getUser(Map<String, Object> params);

    int selectUserCnt(Map<String, Object> params);

    List<Map<String, Object>> selectUserList(Map<String, Object> params);

    int insertUser(HashMap<String, Object> param);
    
    int updateUser(SimpleData data);

    int updateUserAuth(SimpleData data);
    
	HashMap<String, Object> searchId(SimpleData data);

	int updatePwd(SimpleData data);

	int updatetUserSttusWithd(HashMap<String, Object> param);

	UserInfo getUserInfo(String userId);

	Object getUserInfoMap(String userId);

	List<Map<String, String>> getUserAuthInfo(String userId);

	int getIdCheck(SimpleData data);

	int changeUserPwd(SimpleData data);

	int updateUserLastLogin(@Param("userId") String userId);

	int updateEmailConfim(String userId);
}
