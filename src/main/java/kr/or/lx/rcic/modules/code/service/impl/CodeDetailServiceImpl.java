package kr.or.lx.rcic.modules.code.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.timosoft.util.PaginationUtil;
import kr.or.lx.rcic.egovframework.cmmn.util.EgovMessageSource;
import kr.or.lx.rcic.modules.code.entity.CodeDetail;
import kr.or.lx.rcic.modules.code.mapper.CodeDetailMapper;
import kr.or.lx.rcic.modules.code.service.CodeDetailService;
import lombok.extern.slf4j.Slf4j;

/**
 *  공통코드상세정보를 관리한다.  */
@Service
@Slf4j
public class CodeDetailServiceImpl implements CodeDetailService {

    @Autowired
    private CodeDetailMapper codeDetailMapper;

    @Resource(name = "egovMessageSource")
    EgovMessageSource egovMessageSource;

    /**
     * 단건 조회
     */
    @Override
    public CodeDetail getCodeDetail(Map<String, Object> params) throws Exception {
        log.debug("params: {}", params.toString()); // log 사용
        return codeDetailMapper.getCodeDetail(params);
    }

    /**
     * 목록 조회
     */
    @Override
    public Map<String, Object> getCodeDetailList(Map param) throws Exception {

        int cnt = codeDetailMapper.selectCodeDetailCnt(param);
        List<Map<String, Object>> list = codeDetailMapper.selectCodeDetailList(param);

        Map<String, Object> resultMap = new HashMap<>();
        int listCnt = Integer.parseInt(String.valueOf(param.get("listCnt")));
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
    public int saveCodeDetail(CodeDetail codeDetail) throws Exception {

        if (StringUtils.isEmpty(codeDetail.getCode()) && codeDetail.isSequencial()) {
            int codeSeq = codeDetailMapper.nextCode(codeDetail.getGroupCode());
            codeDetail.setCode(String.valueOf(codeSeq));
        }

        Map params = new HashMap();
        params.put("groupCode", codeDetail.getGroupCode());
        params.put("code", codeDetail.getCode());

        int exist = codeDetailMapper.selectCodeDetailCnt(params);
        if (exist > 0) {
            // 수정
            return updateCodeDetail(codeDetail);
        } else {
            // 신규 등록
            return insertCodeDetail(codeDetail);
        }
    }

    /**
     * 등록
     */
    @Override
    @Transactional
    public int insertCodeDetail(CodeDetail codeDetail) throws Exception {
        return codeDetailMapper.insertCodeDetail(codeDetail);
    }

    /**
     * 수정
     */
    @Override
    @Transactional
    public int updateCodeDetail(CodeDetail codeDetail) throws Exception {
        return codeDetailMapper.updateCodeDetail(codeDetail);
    }

    /**
     * 삭제
     */
    @Override
    @Transactional
    public int deleteCodeDetail(CodeDetail codeDetail) throws Exception {
        return codeDetailMapper.deleteCodeDetail(codeDetail);
    }


    @Override
    @Transactional
    public int deleteCodeDetailList(String groupCode, List<String> codeList) throws Exception {
        return codeDetailMapper.deleteCodeDetailList(groupCode, codeList);
    }

    @Override
    public int deleteCodeDetailMapList(List<Map<String, String>> codeMapList) throws Exception {
        int r = 0;
        for (Map<String, String> info : codeMapList) {
            CodeDetail detail = new CodeDetail();
            detail.setGroupCode(info.get("groupCode"));
            detail.setCode(info.get("code"));
            r += codeDetailMapper.deleteCodeDetail(detail);
        }
        return r;
    }

}
