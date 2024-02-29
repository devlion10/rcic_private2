package kr.or.lx.rcic.modules.dataapi.service.impl;

import kr.co.timosoft.util.PaginationUtil;
import kr.or.lx.rcic.egovframework.cmmn.util.EgovMessageSource;
import kr.or.lx.rcic.frmwrk.util.CmmnUtil;
import kr.or.lx.rcic.modules.dataapi.entity.ApiUser;
import kr.or.lx.rcic.modules.dataapi.mapper.ApiUserMapper;
import kr.or.lx.rcic.modules.dataapi.service.ApiUserService;
import lombok.extern.slf4j.Slf4j;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.xml.bind.DatatypeConverter;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *  API로 데이터를 제공받는 사용자정보를 관리한다.  */
@Service
@Slf4j
public class ApiUserServiceImpl implements ApiUserService {

    @Autowired
    private ApiUserMapper apiUserMapper;

    @Resource(name = "egovMessageSource")
    EgovMessageSource egovMessageSource;

    /**
     * 단건 조회
     */
    @Override
    public ApiUser getApiUser(Map<String, Object> params) throws Exception {
        return apiUserMapper.getApiUser(params);
    }

    /**
     * 목록 조회
     */
    @Override
    public Map<String, Object> getApiUserList(Map<String, Object> param) throws Exception {
    	// 조회
        int cnt = apiUserMapper.selectApiUserCnt(param);
        List<Map<String, Object>> list = apiUserMapper.selectApiUserList(param);

        // 결과
        HashMap<String, Object> resultMap = new HashMap<>();
        int listCnt = param.get("listCnt") == null ? 5 : Integer.parseInt(String.valueOf(param.get("listCnt")));
        int maxPageCnt = PaginationUtil.maxPageCnt(cnt, listCnt);
        resultMap.put("maxPageCnt", maxPageCnt);
        resultMap.put("list", list);
        resultMap.put("totalCnt", cnt);

        return resultMap;
    }

    /**
     * 저장
     */
    @Override
    @Transactional
    public int saveApiUser(ApiUser apiUser) throws Exception {

        // 저장 권한 검사 등..

        if (apiUser.hasPk()) {
            // 수정
            return updateApiUser(apiUser);
        } else {
            // 신규 등록
           // return insertApiUser(apiUser);
        
        }
        
        return updateApiUser(apiUser);
    }

    /**
     * 등록
     */
    @Override
    @Transactional
    public HashMap<String, Object> insertApiUser(HttpServletRequest request) throws Exception {
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
        
        // 인증키 생성 _ 등록날짜 + 밀리세컨드
    	SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH-mm-ss.SSS"); //SSS가 밀리세컨드 표시
        Calendar calendar = Calendar.getInstance();
        System.out.println(dateFormat.format(calendar.getTime()));
    	
        byte[] apiKey = dateFormat.format(calendar.getTime()).getBytes("UTF-8");
        String encod = DatatypeConverter.printBase64Binary(apiKey);
       
        param.put("apiCrtfcKey", encod);
        resultMap.put("apiCrtfcKey", encod);
		int cnt = apiUserMapper.insertApiUser(param);
		
		return  resultMap;
    }

    /**
     * 수정
     */
    @Override
    @Transactional
    public int updateApiUser(ApiUser apiUser) throws Exception {
        return apiUserMapper.updateApiUser(apiUser);
    }

    /**
     * 동적 수정
     */
    @Override
    @Transactional
    public int updateApiUserDynamic(ApiUser apiUser) throws Exception {
        return apiUserMapper.updateApiUserDynamic(apiUser);
    }

    /**
     * 삭제
     */
    @Override
    @Transactional
    public int deleteApiUser(ApiUser apiUser) throws Exception {
        return apiUserMapper.deleteApiUser(apiUser);
    }

}
