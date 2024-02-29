package kr.or.lx.rcic.modules.code.service;

import kr.or.lx.rcic.modules.code.entity.CodeDetail;

import java.util.List;
import java.util.Map;

/**
 *  공통코드상세정보를 관리한다.  */
public interface CodeDetailService {

    CodeDetail getCodeDetail(Map<String, Object> params) throws Exception;

    Map<String, Object> getCodeDetailList(Map param) throws Exception;

    int saveCodeDetail(CodeDetail codeDetail) throws Exception;

    int insertCodeDetail(CodeDetail codeDetail) throws Exception;

    int updateCodeDetail(CodeDetail codeDetail) throws Exception;

    int deleteCodeDetail(CodeDetail codeDetail) throws Exception;

    int deleteCodeDetailList(String groupCode, List<String> codeList) throws Exception;

    int deleteCodeDetailMapList(List<Map<String, String>> codeMapList) throws Exception;


}
