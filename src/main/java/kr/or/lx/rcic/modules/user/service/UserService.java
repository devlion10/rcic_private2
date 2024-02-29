package kr.or.lx.rcic.modules.user.service;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import kr.or.lx.rcic.frmwrk.util.SimpleData;
import kr.or.lx.rcic.modules.user.entity.User;

/**
 *  회원 정보 관리
 */
public interface UserService {

    User getUser(Map<String, Object> params) throws Exception;

    Map<String, Object> getUserList(HttpServletRequest request) throws Exception;

    HashMap<String, Object> insertUser(HttpServletRequest request) throws Exception;

    Map<String, Object> searchId(SimpleData simpleData) throws Exception;

	int updatetUserSttusWithd(SimpleData simpleData) throws Exception;

	int getIdCheck(SimpleData data) throws Exception;

	int updatePwd(SimpleData data) throws Exception;

	int changeUserPwd(SimpleData data) throws Exception;

	int updateUser(SimpleData data) throws Exception;
	
	int updateEmailConfim(String user_email);

	int updateUserAuth(SimpleData data) throws Exception;

}
