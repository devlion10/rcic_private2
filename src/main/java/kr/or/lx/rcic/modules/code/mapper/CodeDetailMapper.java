package kr.or.lx.rcic.modules.code.mapper;

import kr.or.lx.rcic.modules.code.entity.CodeDetail;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * SysCmmCodeDtl Mapper
 */
public interface CodeDetailMapper {

    CodeDetail getCodeDetail(Map<String, Object> params);

    int nextCode(@Param("groupCode") String groupCode);

    int selectCodeDetailCnt(Map<String, Object> params);

    List<Map<String, Object>> selectCodeDetailList(Map<String, Object> params);

    int insertCodeDetail(CodeDetail codeDetail);

    int updateCodeDetail(CodeDetail codeDetail);

    int deleteCodeDetail(CodeDetail codeDetail);

    int deleteCodeDetailByGroup(@Param("groupCode") String groupCode);

    int deleteCodeDetailList(@Param("groupCode") String groupCode, @Param("codeList") List<String> codeList);

}
