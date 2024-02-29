package kr.or.lx.rcic.modules.user.service.impl;

import kr.co.timosoft.util.PaginationUtil;
import kr.or.lx.rcic.egovframework.cmmn.util.EgovMessageSource;
import kr.or.lx.rcic.frmwrk.util.CmmnUtil;
import kr.or.lx.rcic.frmwrk.util.SimpleData;
import kr.or.lx.rcic.modules.user.entity.User;
import kr.or.lx.rcic.modules.user.mapper.UserMapper;
import kr.or.lx.rcic.modules.user.service.UserService;
import lombok.extern.slf4j.Slf4j;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *  회원 정보 관리
 */
@Service
@Slf4j
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Resource(name = "egovMessageSource")
    EgovMessageSource egovMessageSource;

    @Autowired
	ShaPasswordEncoder passwordEncoder;
    
    
    /**
     * 단건 조회
     */
    @Override
    public User getUser(Map<String, Object> params) throws Exception {
        return userMapper.getUser(params);
    }

    /**
     * 목록 조회
     */
    @Override
    public Map<String, Object> getUserList(HttpServletRequest request) throws Exception {

        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        HashMap<String, Object> retMap = new HashMap<String, Object>();
        resultMap.put("message", "success");
        String strParamList = CmmnUtil.deXss(CmmnUtil.checkNull(request.getParameter("paramList"), ""));
        if (strParamList.equals("")) {
            retMap.put("message", "failure");
            retMap.put("result", egovMessageSource.getMessage("_REQUIRED_MSG_REPEAT"));
            return retMap;
        }

        JSONArray paramList = JSONArray.fromObject(strParamList);
        HashMap<String, Object> param = new HashMap<String, Object>();
        param = CmmnUtil.convertJsonToObject(CmmnUtil.checkNull(paramList.getJSONObject(0), ""));

        int listCnt = param.get("listCnt") == null ? 10 : Integer.parseInt(String.valueOf(param.get("listCnt")));
        int currPage = param.get("currPage") == null ? 1 : Integer.parseInt(String.valueOf(param.get("currPage")));

        param.put("listCnt", listCnt);
        param.put("currPage", currPage);

        int cnt = userMapper.selectUserCnt(param);
        int maxPageCnt = PaginationUtil.maxPageCnt(cnt, listCnt);
        List<Map<String, Object>> list = userMapper.selectUserList(param);

        resultMap.put("totalCnt", cnt);
        resultMap.put("maxPageCnt", maxPageCnt);
        resultMap.put("list", list);

        return resultMap;
    }


    /**
     * 등록
     */
    @Override
    @Transactional
    public HashMap<String, Object> insertUser(HttpServletRequest request) throws Exception {
    	HashMap<String, Object> resultMap = new HashMap<String, Object>();
        HashMap<String, Object> retMap = new HashMap<String, Object>();
        resultMap.put("message", "success");
        String strParamList = CmmnUtil.deXss(CmmnUtil.checkNull(request.getParameter("paramList"), ""));
        if (strParamList.equals("")) {
            retMap.put("message", "failure");
            retMap.put("result", egovMessageSource.getMessage("_REQUIRED_MSG_REPEAT"));
            return retMap;
        }

        JSONArray paramList = JSONArray.fromObject(strParamList);
        HashMap<String, Object> param = new HashMap<String, Object>();
        param = CmmnUtil.convertJsonToObject(CmmnUtil.checkNull(paramList.getJSONObject(0), ""));
		
		String beforePwd = (String) param.get("pwd");
		String newPw = passwordEncoder.encodePassword(beforePwd, null);
		
		param.replace("pwd", newPw);
		
		int cnt = userMapper.insertUser(param);
		String email = (String)param.get("userId"); 
		String name = (String)param.get("userNm");
		//sendAuthMail(email, name, request); 
		
		return  resultMap;
    }

    /**
     * 수정
     */

	@Override
	public int updateUser(SimpleData data) throws Exception {
		
		String beforePwd = (String) data.get("userPw");
		String newPw = passwordEncoder.encodePassword(beforePwd, null);
		data.replace("userPw", newPw);
		
		return  userMapper.updateUser(data);
	}

    /**
     * 사용자 권한 수정
     */
	@Override
    public int updateUserAuth(SimpleData data) throws Exception {
	    return userMapper.updateUserAuth(data);
    }


    /**
     * 아이디 찾기
     */
	@Override
	public Map<String, Object> searchId(SimpleData data) throws Exception {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		HashMap<String, Object> result = userMapper.searchId(data); 
		resultMap.put("result", result);
		return  resultMap;
	}

	/**
     * 비밀번호 수정
     */
	@Override
	public int updatePwd(SimpleData data) throws Exception {
		
		String beforePwd = (String) data.get("newPwd");
		String newPw = passwordEncoder.encodePassword(beforePwd, null);
		data.replace("newPwd", newPw);
		
		return userMapper.updatePwd(data);
	}

	/**
     * 회원탈퇴
     */
	@Override
	public int updatetUserSttusWithd(SimpleData data) throws Exception {
		return userMapper.updatetUserSttusWithd(data);
	}

	/**
     * 아이디 중복확인
     */
	@Override
	public int getIdCheck(SimpleData data) throws Exception {
		return userMapper.getIdCheck(data); 
	}
	 
	@Override
	public int changeUserPwd(SimpleData data) throws Exception {
		
        String userInfoPwd = (String) data.get("userInfoPwd");   // 회원정보 비밀번호
        String currPwd = (String) data.get("currPwd"); // 입력한 현재비밀번호
        String currPwdEncd = passwordEncoder.encodePassword(currPwd, null);	
        
        if(!currPwdEncd.equals(userInfoPwd)) {
        	return 0;
        }else {
    	    String beforePwd = (String) data.get("newPwd");
	   		String newPw = passwordEncoder.encodePassword(beforePwd, null);
	   		data.replace("newPwd", newPw);
	   		return userMapper.updatePwd(data);
        }
	}

	/**
     * 메일인증확인
     */
	@Override
	public int updateEmailConfim(String userId) {
		return userMapper.updateEmailConfim(userId);
	}

}
