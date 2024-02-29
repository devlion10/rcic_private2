package kr.or.lx.rcic.modules.chart.mapper;

import java.util.HashMap;
import java.util.List;

/**
 * @Class Name : CmmnMapper.java
 * @Description : 공통 코드 및 공용 API용 매퍼
 * @Modification   Information
 * @
 * @  수정일        수정자              수정내용
 * @ ---------    ---------   -------------------------------
 * @ 2018.03.08    김한욱	    	 최초생성
 * 
 * @author  오픈메이트 김한욱 
 * @since   2018.03.08
 * @version   1.0
 * @see
 * 
 *    Copyright (C) by openmate All right reserved.
 */
public interface ChartMapper { 

	/** selectChart1 조회 */
	@SuppressWarnings("rawtypes")
	public List<HashMap<String, Object>> selectChart1(HashMap map) throws Exception ;
	
	/** selectChart2 조회 */
	@SuppressWarnings("rawtypes")
	public List<HashMap<String, Object>> selectChart2(HashMap map) throws Exception ;
	/** selectChart2_1 조회 */
	@SuppressWarnings("rawtypes")
	public List<HashMap<String, Object>> selectChart2_1(HashMap map) throws Exception ;
	/** selectChart3 조회 */
	@SuppressWarnings("rawtypes")
	public List<HashMap<String, Object>> selectChart3(HashMap map) throws Exception ;
	/** selectChart3_1 조회 */
	@SuppressWarnings("rawtypes")
	public List<HashMap<String, Object>> selectChart3_1(HashMap map) throws Exception ;
	 
	
}
