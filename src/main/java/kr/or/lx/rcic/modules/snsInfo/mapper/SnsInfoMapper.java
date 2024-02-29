package kr.or.lx.rcic.modules.snsInfo.mapper;

import java.util.List;
import java.util.Map;

import kr.or.lx.rcic.modules.snsInfo.entity.SnsInfo;

/**
 * SnsInfo Mapper
 */
public interface SnsInfoMapper {

    SnsInfo getSnsInfo(Map<String, Object> params);

    int selectSnsInfoCnt(Map<String, Object> params);

    List<Map<String, Object>> selectSnsInfoList(Map<String, Object> params);

    int insertSnsInfo(SnsInfo snsInfo);

    int updateSnsInfo(SnsInfo snsInfo);

    int updateSnsInfoDynamic(SnsInfo snsInfo);

    int deleteSnsInfo(SnsInfo snsInfo);

}
