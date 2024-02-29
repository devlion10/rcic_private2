package kr.or.lx.rcic.modules.shpimport.mapper;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.or.lx.rcic.modules.shpimport.entity.DicUpload;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface ShpImportMapper {

    int insertDevelopInfo(List<Map<String, Object>> list) throws Exception;
    int insertRoadPlanInfo(List<Map<String, Object>> list) throws Exception;
    int insertMoctLinkLine(List<Map<String, Object>> list) throws Exception;
    int insertCdpntSgnalInfo(List<Map<String, Object>> list) throws Exception;
    int insertCenterLine(List<Map<String, Object>> list) throws Exception;
    
    /*행정구역*/
    int insertLegaldongSido(List<Map<String, Object>> dataList) throws Exception;
    int insertLegaldongSgg(List<Map<String, Object>> dataList) throws Exception;
    int insertLegaldongEmd(List<Map<String, Object>> dataList) throws Exception;
    int insertLegaldongLi(List<Map<String, Object>> dataList) throws Exception;
    void insertLegaldongEmdUdtSidoNm() throws Exception;
    void insertLegaldongEmdUdtSggNm() throws Exception;

    int truncateDevelopInfo() throws Exception;
    int truncateRoadPlanInfo() throws Exception;
    int truncateMoctLinkLine() throws Exception;
    int truncateCdpntSgnalInfo() throws Exception;
    int truncateCenterLine() throws Exception;
    
    /*행정구역 비우기*/
    int truncateLegaldongSido() throws Exception;
    int truncateLegaldongSgg() throws Exception;
    int truncateLegaldongEmd() throws Exception;
    int truncateLegaldongLi() throws Exception;
    
    /* table vacuuming 실행 */
//    int vacuuming(String tableName);

    int insertDicUploadHist(DicUpload hist) throws Exception;
    String getLastDicUploadHist(@Param("dicTblNm") String dicTblNm) throws Exception;
    
    /*연속지적도*/
	int insertCbndAll(List<Map<String, Object>> dataList) throws Exception;
	void updateCbndLegaldongCd(List<Map<String, Object>> dataList) throws Exception;
	int insertCbndChange(List<Map<String, Object>> dataList) throws Exception;
	
	/*연속지적도 비우기*/
	void truncateCbndAll() throws Exception;
	void truncateCbndChange() throws Exception;


}
