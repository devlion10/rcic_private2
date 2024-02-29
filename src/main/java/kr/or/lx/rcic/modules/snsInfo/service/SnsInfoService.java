package kr.or.lx.rcic.modules.snsInfo.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import kr.or.lx.rcic.modules.snsInfo.entity.SnsInfo;

/**
 *  SNS(트위터)에서 수집된 정보를 관리한다.  */
public interface SnsInfoService {

    SnsInfo getSnsInfo(Map<String, Object> params) throws Exception;

    Map<String, Object> getSnsInfoList(HttpServletRequest request) throws Exception;

    int saveSnsInfo(SnsInfo snsInfo) throws Exception;

    int insertSnsInfo(SnsInfo snsInfo) throws Exception;

    int updateSnsInfo(SnsInfo snsInfo) throws Exception;

    int updateSnsInfoDynamic(SnsInfo snsInfo) throws Exception;

    int deleteSnsInfo(SnsInfo snsInfo) throws Exception;

}
