package kr.or.lx.rcic.frmwrk.user.service.impl;

import kr.or.lx.rcic.frmwrk.user.User;
import kr.or.lx.rcic.frmwrk.user.UserInfo;
import kr.or.lx.rcic.frmwrk.user.service.UserSerivce;
import kr.or.lx.rcic.frmwrk.util.CmmnUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class UserDatailServiceImpl implements UserDetailsService {

	@Autowired
	private UserSerivce userService;

	@Override
	public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {

		UserInfo uInfo = null;
		try {
			uInfo = userService.selectUserInfo(userId);
		} catch (Exception e) {
			CmmnUtil.setLog("아이디 없음.");		
		}

		if (uInfo == null) {
			throw new UsernameNotFoundException("아이디와 비밀번호를 확인해주세요");
		}

		List<GrantedAuthority> roles = new ArrayList<GrantedAuthority>();
		String authName = uInfo.getAuthNm();

		if (StringUtils.isNotEmpty(authName)) {
			roles.add(new SimpleGrantedAuthority(authName));
			if (authName.contains("관리자")) {
				roles.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
			} else {
				roles.add(new SimpleGrantedAuthority("ROLE_USER" ));
			}
		} else {
			log.warn("권한이 부여되지 않은 사용자가 로그인을 시도했습니다. userId: {}", userId);
		}

		if(roles.size() >0) {
			try {
				userService.updateUserLastLogin(uInfo);
			} catch (Exception e) {
				CmmnUtil.setLog(e.getMessage());
			}
			User user = new User( uInfo.getUserId(), uInfo.getUserPw(), roles, uInfo.getSttus(), uInfo.getEmailConfmAt());
			user.setUserNo(uInfo.getUserNo());
			user.setExtInfo(uInfo.getExtInfo());
			user.setAuthInfo(uInfo.getAuthInfo());
			return user;
		}
		return null;
	}

}
