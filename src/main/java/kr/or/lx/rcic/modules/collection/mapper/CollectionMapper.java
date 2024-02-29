package kr.or.lx.rcic.modules.collection.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
public interface CollectionMapper {

	int getKeywordCntListCnt(Map<String, Object> param);

	List<Map<String, Object>> getKeywordCntList(Map<String, Object> param);

	List<Map<String, Object>> getCollectAtm(Map<String, Object> commonAjaxParam); 

	
}
