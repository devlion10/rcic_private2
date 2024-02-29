package kr.or.lx.rcic.frmwrk.user.service;

import kr.or.lx.rcic.frmwrk.user.UserInfo;


public interface UserSerivce {
	
	public void updateUserLastLogin(UserInfo userInfo);
	UserInfo selectUserInfo(String userId);
	
}
