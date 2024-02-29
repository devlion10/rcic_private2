package kr.or.lx.rcic.frmwrk.user.service.impl;

import kr.or.lx.rcic.frmwrk.user.RcicAutehnticationMessageException;
import kr.or.lx.rcic.frmwrk.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Collection;


public class UserAuthenticationProvider implements AuthenticationProvider{
	@Autowired
	ShaPasswordEncoder passwordEncoder;	
	
	private UserDetailsService userService;
	
	public UserDetailsService getUserService() {
		return userService;
	}

	public void setUserService(UserDetailsService userService) {
		this.userService = userService;
		
	}

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {

		String username = authentication.getName();
		String password = (String) authentication.getCredentials();
		User user;
		Collection<? extends GrantedAuthority> authorities;
		try {
			user = (User) userService.loadUserByUsername(username);
			String hashedPassword = passwordEncoder.encodePassword(password, null);

			// 아이디, 비밀번호가 틀린경우
			if (!hashedPassword.equals(user.getPassword())) {
				throw new RcicAutehnticationMessageException("아이디와 비밀번호를 확인해주세요.");
			}

			// 메일 인증을 안했을 경우
			if (!"Y".equals(user.getEmailConfmAt())) {
				throw new RcicAutehnticationMessageException("이메일 인증이 완료 되지 않았습니다.\n가입하신 이메일 주소의 받은메일함(스팸메일함)을\n확인해주시기 바랍니다.");
			}

			// 관리자 승인이 안된 경우
			if ("1".equals(user.getSttus())) {
				throw new RcicAutehnticationMessageException("관리자의 승인이 필요합니다.");
			}

			authorities = user.getAuthorities();

		} catch (UsernameNotFoundException e) {
			throw new UsernameNotFoundException(e.getMessage());
		} catch (BadCredentialsException e) {
			throw new BadCredentialsException(e.getMessage());
		} catch (DisabledException e) {
			throw new DisabledException(e.getMessage());
		} catch (RcicAutehnticationMessageException re) {
			throw re;
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}

		return new UsernamePasswordAuthenticationToken(user, password, authorities);

	}

	@Override
	public boolean supports(Class<?> authentication) {
		return true;
	}

}
