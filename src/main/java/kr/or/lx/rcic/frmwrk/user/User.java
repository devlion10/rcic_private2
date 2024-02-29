package kr.or.lx.rcic.frmwrk.user;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Map;

@Data
public class User implements UserDetails{
 
	private static final long serialVersionUID = -3641926958153468496L;


	private String userNo;
	private String userid;
	private String password;
	private String role;
	private String sttus;
	private String emailConfmAt;

	private List<GrantedAuthority> authorities;
	private boolean accountNonExpired = true;
	private boolean accountNonLocked = true;
	private boolean credentialsNonExpired = true;
	private boolean enabled = true;

	private boolean isInitPasswd = false;
	private Object extInfo = null;
	private Map<String, String> authInfo = null;
	
	public User(String userId , String pw, List<GrantedAuthority> gList, String sttus, String emailConfmAt ) {
        this.userid = userId;
		this.password = pw;
		this.authorities = gList;
		this.sttus = sttus;
		this.emailConfmAt = emailConfmAt;
	}
	
	public Map<String, String> getAuthInfo() {
		return authInfo;
	}

	public void setAuthInfo(Map<String, String> authInfo) {
		this.authInfo = authInfo;
	}
	
	public Object getExtInfo() {
		return extInfo;
	}

	public void setExtInfo(Object extInfo) {
		this.extInfo = extInfo;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return  this.authorities;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return userid;
	}

	@Override
	public boolean isAccountNonExpired() {
		return this.accountNonExpired;
	}

	@Override
	public boolean isAccountNonLocked() {
		return this.accountNonLocked;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return this.credentialsNonExpired;
	}

	@Override
	public boolean isEnabled() {
		return this.enabled;
	}

	public void setUsername(String userid) {
		this.userid = userid;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setAuthorities(List<GrantedAuthority> authorities) {
		this.authorities = authorities;
	}

	public void setAccountNonExpired(boolean accountNonExpired) {
		this.accountNonExpired = accountNonExpired;
	}

	public void setAccountNonLocked(boolean accountNonLocked) {
		this.accountNonLocked = accountNonLocked;
	}

	public void setCredentialsNonExpired(boolean credentialsNonExpired) {
		this.credentialsNonExpired = credentialsNonExpired;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

	public boolean isIsInitPasswd() {
		return isInitPasswd;
	}

	public void setInitPasswd(boolean isInitPasswd) {
		this.isInitPasswd = isInitPasswd;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	
	public String getSttus() {
		return sttus;
	}
	public void setSttus(String sttus) {
		this.sttus = sttus;
	}
	
	public String getEmailConfmAt() {
		return emailConfmAt;
	}
	public void setEmailConfmAt(String emailConfmAt) {
		this.emailConfmAt = emailConfmAt;
	}
	
}
