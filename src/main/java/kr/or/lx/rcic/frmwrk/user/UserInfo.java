package kr.or.lx.rcic.frmwrk.user;

import lombok.Data;

import java.util.Map;

@Data
public class UserInfo {
 
	private String userNo;
	private String userId;
	private String userPw;
	private String userNm;
	private String lstLoginDt;
	private String sttus;
	private Long   authNo;
	private String authNm;
	private Object extInfo = null;
	private String emailConfmAt;
	private Map<String, String> authInfo = null;
}
