package kr.or.lx.rcic.frmwrk.userUtil;

import lombok.Data;

@Data
public class UserIdPwInput {
	private String userId ;
	private String password ;
	
	public UserIdPwInput() {
	}
	public UserIdPwInput(String userId, String password) {
		this.userId = userId;
		this.password = password;
	} 
}
