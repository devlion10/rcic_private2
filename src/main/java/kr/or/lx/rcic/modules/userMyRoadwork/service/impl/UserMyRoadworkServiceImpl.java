package kr.or.lx.rcic.modules.userMyRoadwork.service.impl;

import kr.co.timosoft.util.PaginationUtil;
import kr.or.lx.rcic.egovframework.cmmn.util.EgovMessageSource;
import kr.or.lx.rcic.frmwrk.user.User;
import kr.or.lx.rcic.frmwrk.util.CmmnUtil;
import kr.or.lx.rcic.frmwrk.util.SimpleData;
import kr.or.lx.rcic.modules.userMyRoadwork.entity.UserMyRoadwork;
import kr.or.lx.rcic.modules.userMyRoadwork.mapper.UserMyRoadworkMapper;
import kr.or.lx.rcic.modules.userMyRoadwork.service.UserMyRoadworkService;
import lombok.extern.slf4j.Slf4j;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *  업무사용자의 도로공사 관심목록을 관리한다.  */
@Service
@Slf4j
public class UserMyRoadworkServiceImpl implements UserMyRoadworkService {

    @Autowired
    private UserMyRoadworkMapper userMyRoadworkMapper;

    @Resource(name = "egovMessageSource")
    EgovMessageSource egovMessageSource;

    /**
     * 단건 조회
     */
    @Override
    public UserMyRoadwork getUserMyRoadwork(Map<String, Object> params) throws Exception {
        return userMyRoadworkMapper.getUserMyRoadwork(params);
    }

    /**
     * 목록 조회
     */
    @Override
    public Map<String, Object> getUserMyRoadworkList(HttpServletRequest request) throws Exception {

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

        int cnt = userMyRoadworkMapper.selectUserMyRoadworkCnt(param);
        int maxPageCnt = PaginationUtil.maxPageCnt(cnt, listCnt);
        List<Map<String, Object>> list = userMyRoadworkMapper.selectUserMyRoadworkList(param);

        resultMap.put("maxPageCnt", maxPageCnt);
        resultMap.put("totalCnt", cnt);
        resultMap.put("list", list);

        return resultMap;
    }


    /**
     * 등록
     */
    @Override
    @Transactional
    public int insertUserMyRoadwork(SimpleData simpleData) throws Exception {
    	User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal(); //로그인 사용자 정보 조회
    	simpleData.put("registId", user.getUserid());
    	simpleData.put("updtId", user.getUserid());
    	simpleData.put("userSeq", user.getUserNo());
        return userMyRoadworkMapper.insertUserMyRoadwork(simpleData);
    }

    /**
     * 수정
     */
    @Override
    @Transactional
    public int updateUserMyRoadwork(SimpleData simpleData) throws Exception {
        return userMyRoadworkMapper.updateUserMyRoadwork(simpleData);
    }

    /**
     * 동적 수정
     */
    @Override
    @Transactional
    public int updateUserMyRoadworkDynamic(UserMyRoadwork userMyRoadwork) throws Exception {
        return userMyRoadworkMapper.updateUserMyRoadworkDynamic(userMyRoadwork);
    }

    /**
     * 삭제
     */
	@Override
	public int deleteUserMyRoadwork(SimpleData simpleData) throws Exception {
		User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal(); //로그인 사용자 정보 조회
    	simpleData.put("userSeq", user.getUserNo());
		return userMyRoadworkMapper.deleteUserMyRoadwork(simpleData);
	}

	@Override
	public Map<String, Object> getFavorList(HttpServletRequest request) throws Exception {
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
        
        String[] seqArr = String.valueOf(param.get("seqArr")).split(",");
        
        param.put("seqList",seqArr);

        int listCnt = param.get("listCnt") == null ? 10 : Integer.parseInt(String.valueOf(param.get("listCnt")));
        int currPage = param.get("currPage") == null ? 1 : Integer.parseInt(String.valueOf(param.get("currPage")));

        param.put("listCnt", listCnt);
        param.put("currPage", currPage);

        List<Map<String, Object>> list = userMyRoadworkMapper.selectFavorList(param);

        resultMap.put("list", list);

        return resultMap;
	}
	




}
