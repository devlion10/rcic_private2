package kr.or.lx.rcic.modules.code.service;

import kr.or.lx.rcic.modules.code.entity.CodeGroup;

import java.util.List;
import java.util.Map;

/**
 *  공통코드그룹정보를 관리한다.  */
public interface CodeGroupService {

    CodeGroup getCodeGroup(Map params) throws Exception;

    Map<String, Object> getCodeGroupList(Map param) throws Exception;

    int saveCodeGroup(CodeGroup codeGroup) throws Exception;

    int insertCodeGroup(CodeGroup codeGroup) throws Exception;

    int updateCodeGroup(CodeGroup codeGroup) throws Exception;

    int deleteCodeGroup(CodeGroup codeGroup) throws Exception;

    int deleteCodeGroupList(List<String> codeList) throws Exception;

}
