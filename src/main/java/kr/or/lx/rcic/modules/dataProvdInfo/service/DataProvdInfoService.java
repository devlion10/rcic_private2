package kr.or.lx.rcic.modules.dataProvdInfo.service;

import kr.or.lx.rcic.frmwrk.util.SimpleData;
import kr.or.lx.rcic.modules.dataProvdInfo.entity.DataProvdInfo;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 *  다운로드할 수 있는 데이터목록을 관리한다.  */
public interface DataProvdInfoService {

    DataProvdInfo getDataProvdInfo(Map<String, Object> params) throws Exception;

    Map<String, Object> getDataProvdInfoList(HttpServletRequest request) throws Exception;

    int saveDataProvdInfo(DataProvdInfo dataProvdInfo) throws Exception;

    int insertDataProvdInfo(DataProvdInfo dataProvdInfo) throws Exception;

    int updateDataProvdInfo(DataProvdInfo dataProvdInfo) throws Exception;

    int updateDataProvdInfoDynamic(DataProvdInfo dataProvdInfo) throws Exception;

    int deleteDataProvdInfo(DataProvdInfo dataProvdInfo) throws Exception;

	int insertDownloadHistory(SimpleData dataProvdInfo);

	int deleteDuplicatedData();

}
