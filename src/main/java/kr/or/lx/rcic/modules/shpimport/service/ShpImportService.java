package kr.or.lx.rcic.modules.shpimport.service;

import kr.or.lx.rcic.modules.shpimport.entity.DicUpload;

public interface ShpImportService {

    DicUpload insertShpData(DicUpload dicUpload) throws Exception;

    String getLastDicUploadHist(String tableName) throws Exception;

	DicUpload insertCbndData(DicUpload dicUpload) throws Exception;

//	int vacuuming(String tableName);

}
