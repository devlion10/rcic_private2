package kr.or.lx.rcic.modules.snsInfo.service.impl;

import kr.co.timosoft.util.PaginationUtil;
import kr.or.lx.rcic.egovframework.cmmn.util.EgovMessageSource;
import kr.or.lx.rcic.frmwrk.util.CmmnUtil;
import kr.or.lx.rcic.modules.snsInfo.entity.SnsInfo;
import kr.or.lx.rcic.modules.snsInfo.mapper.SnsInfoMapper;
import kr.or.lx.rcic.modules.snsInfo.service.SnsInfoService;
import lombok.extern.slf4j.Slf4j;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *  SNS(트위터)에서 수집된 정보를 관리한다.  */
@Service
@Slf4j
public class SnsInfoServiceImpl implements SnsInfoService {

    @Autowired
    private SnsInfoMapper snsInfoMapper;

    @Resource(name = "egovMessageSource")
    EgovMessageSource egovMessageSource;

    /**
     * 단건 조회
     */
    @Override
    public SnsInfo getSnsInfo(Map<String, Object> params) throws Exception {
        return snsInfoMapper.getSnsInfo(params);
    }

    /**
     * 목록 조회
     */
    @Override
    public Map<String, Object> getSnsInfoList(HttpServletRequest request) throws Exception {

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

        int cnt = snsInfoMapper.selectSnsInfoCnt(param);
        int maxPageCnt = PaginationUtil.maxPageCnt(cnt, listCnt);
        List<Map<String, Object>> list = snsInfoMapper.selectSnsInfoList(param);

        resultMap.put("maxPageCnt", maxPageCnt);
        resultMap.put("list", list);

        return resultMap;
    }

    /**
     * 저장
     */
    @Override
    @Transactional
    public int saveSnsInfo(SnsInfo snsInfo) throws Exception {

        // 저장 권한 검사 등..

        if (snsInfo.hasPk()) {
            // 수정
            return updateSnsInfo(snsInfo);
        } else {
            // 신규 등록
            return insertSnsInfo(snsInfo);
        }
    }

    /**
     * 등록
     */
    @Override
    @Transactional
    public int insertSnsInfo(SnsInfo snsInfo) throws Exception {
        return snsInfoMapper.insertSnsInfo(snsInfo);
    }

    /**
     * 수정
     */
    @Override
    @Transactional
    public int updateSnsInfo(SnsInfo snsInfo) throws Exception {
        return snsInfoMapper.updateSnsInfo(snsInfo);
    }

    /**
     * 동적 수정
     */
    @Override
    @Transactional
    public int updateSnsInfoDynamic(SnsInfo snsInfo) throws Exception {
        return snsInfoMapper.updateSnsInfoDynamic(snsInfo);
    }

    /**
     * 삭제
     */
    @Override
    @Transactional
    public int deleteSnsInfo(SnsInfo snsInfo) throws Exception {
        return snsInfoMapper.deleteSnsInfo(snsInfo);
    }

}
