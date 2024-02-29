package kr.or.lx.rcic.modules.collection.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.timosoft.util.PaginationUtil;
import kr.or.lx.rcic.egovframework.cmmn.util.EgovMessageSource;
import kr.or.lx.rcic.modules.collection.mapper.CollectionMapper;
import kr.or.lx.rcic.modules.collection.service.CollectionService;


/**
 * @Class Name : FacServiceImpl.java
 * @Description : 시설물 * 공사종류 조회 서비스 구현
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
 
@Service
public class CollectionServiceImpl implements CollectionService {

	@Autowired
	private CollectionMapper mapper;
	@Resource(name="egovMessageSource")
    EgovMessageSource egovMessageSource;

	@Override
	public Map<String, Object> getKeywordCntList(Map<String, Object> param) {
		int cnt = mapper.getKeywordCntListCnt(param);
        List<Map<String, Object>> list = mapper.getKeywordCntList(param);

        HashMap<String, Object> resultMap = new HashMap<>();
        int listCnt = param.get("listCnt") == null ? 5 : Integer.parseInt(String.valueOf(param.get("listCnt")));
        int maxPageCnt = PaginationUtil.maxPageCnt(cnt, listCnt);
        resultMap.put("maxPageCnt", maxPageCnt);
        resultMap.put("list", list);
        resultMap.put("totalCnt", cnt);

        return resultMap;
	}

	@Override
	public List<Map<String, Object>> getCollectAtm(Map<String, Object> commonAjaxParam) {
		return mapper.getCollectAtm(commonAjaxParam);
	}
	
	
}