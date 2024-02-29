package kr.or.lx.rcic.modules.code.mapper;

import kr.or.lx.rcic.modules.code.entity.CodeGroup;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * SysCmmCode Mapper
 */
public interface CodeGroupMapper {

    CodeGroup getCodeGroup(Map<String, Object> params);

    int selectCodeGroupCnt(Map<String, Object> params);

    List<Map<String, Object>> selectCodeGroupList(Map<String, Object> params);

    int insertCodeGroup(CodeGroup codeGroup);

    int updateCodeGroup(CodeGroup codeGroup);

    int deleteCodeGroup(CodeGroup codeGroup);

    int deleteCodeGroupList(@Param("codeGroupList")List<String> codeGroupList);

}
