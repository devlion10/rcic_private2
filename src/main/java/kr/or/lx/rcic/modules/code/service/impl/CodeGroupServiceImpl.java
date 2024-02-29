package kr.or.lx.rcic.modules.code.service.impl;

import kr.co.timosoft.util.PaginationUtil;
import kr.or.lx.rcic.egovframework.cmmn.util.EgovMessageSource;
import kr.or.lx.rcic.modules.code.entity.CodeGroup;
import kr.or.lx.rcic.modules.code.mapper.CodeDetailMapper;
import kr.or.lx.rcic.modules.code.mapper.CodeGroupMapper;
import kr.or.lx.rcic.modules.code.service.CodeGroupService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *  공통코드그룹정보를 관리한다.  */
@Service
@Slf4j
public class CodeGroupServiceImpl implements CodeGroupService {

    @Autowired
    private CodeGroupMapper codeGroupMapper;

    @Autowired
    private CodeDetailMapper codeDetailMapper;

    @Resource(name = "egovMessageSource")
    EgovMessageSource egovMessageSource;

    /**
     * 단건 조회
     */
    @Override
    public CodeGroup getCodeGroup(Map params) throws Exception {
        log.debug("params: {}", params.toString()); // log 사용
        return codeGroupMapper.getCodeGroup(params);
    }

    /**
     * 목록 조회
     */
    @Override
    public Map<String, Object> getCodeGroupList(Map param) throws Exception {

        int cnt = codeGroupMapper.selectCodeGroupCnt(param);
        List<Map<String, Object>> list = codeGroupMapper.selectCodeGroupList(param);

        HashMap<String, Object> resultMap = new HashMap<>();
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
    public int saveCodeGroup(CodeGroup codeGroup) throws Exception {

        // 저장 권한 검사 등..
        Map params = new HashMap();
        params.put("groupCode", codeGroup.getGroupCode());
        int exist = codeGroupMapper.selectCodeGroupCnt(params);
        if (exist > 0) { // 등록일 있으면 수정..
            // 수정
            return updateCodeGroup(codeGroup);
        } else {
            // 신규 등록
            return insertCodeGroup(codeGroup);
        }
    }

    /**
     * 등록
     */
    @Override
    @Transactional
    public int insertCodeGroup(CodeGroup codeGroup) throws Exception {
        return codeGroupMapper.insertCodeGroup(codeGroup);
    }

    /**
     * 수정
     */
    @Override
    @Transactional
    public int updateCodeGroup(CodeGroup codeGroup) throws Exception {
        return codeGroupMapper.updateCodeGroup(codeGroup);
    }

    /**
     * 삭제
     */
    @Override
    @Transactional
    public int deleteCodeGroup(CodeGroup codeGroup) throws Exception {
        return codeGroupMapper.deleteCodeGroup(codeGroup);
    }

    @Override
    @Transactional
    public int deleteCodeGroupList(List<String> codeList) throws Exception {
        for (String groupCode : codeList) {
            codeDetailMapper.deleteCodeDetailByGroup(groupCode);
        }
        return codeGroupMapper.deleteCodeGroupList(codeList);
    }

}
