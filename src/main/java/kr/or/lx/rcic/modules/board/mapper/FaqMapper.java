package kr.or.lx.rcic.modules.board.mapper;

import kr.or.lx.rcic.modules.board.entity.Faq;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Faq Mapper
 */
public interface FaqMapper {

    Faq getFaq(Map<String, Object> params);

    int getFaqListCnt(Map<String, Object> params);

    List<Map<String, Object>> getFaqList(Map<String, Object> params);

    int insertFaq(Faq faq);

    int updateFaq(Faq faq);

    int deleteFaq(Faq faq);

    int changeUseYnFaq(Faq faq);

    List<Map<String, Object>> getFaqTypeCount(HashMap<String, Object> param);
}
