package kr.or.lx.rcic.frmwrk.user.service.impl;

import kr.or.lx.rcic.frmwrk.user.UserInfo;
import kr.or.lx.rcic.frmwrk.user.service.UserSerivce;
import kr.or.lx.rcic.modules.user.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service("userSvc")
public class UserServiceImpl implements UserSerivce {

	@Autowired
	private UserMapper userMapper;


	@Override
	@Transactional
	public void updateUserLastLogin(UserInfo uInfo) {
		userMapper.updateUserLastLogin(uInfo.getUserId());
	}

	@Override
	public UserInfo selectUserInfo(String userId) {
		UserInfo info = userMapper.getUserInfo(userId);
		if(info!=null) {
			info.setExtInfo(userMapper.getUserInfoMap(userId));
			List<Map<String, String>> authInfoList = userMapper.getUserAuthInfo(userId);
			Map<String, String> authInfo = new HashMap<>();
			for (Map<String, String> auth : authInfoList) {
				authInfo.put(auth.get("menuCd"), auth.get("authDtlSe"));
			}
			info.setAuthInfo(authInfo);
		}

		return info;
	}

}
