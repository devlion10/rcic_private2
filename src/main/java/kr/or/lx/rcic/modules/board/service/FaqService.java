package kr.or.lx.rcic.modules.board.service;

import kr.or.lx.rcic.modules.board.entity.Faq;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 *  FAQ 게시판의 내용을 관리한다.  */
public interface FaqService {

    Faq getFaq(Map<String, Object> params) throws Exception;

    Map<String, Object> getFaqList(HttpServletRequest request) throws Exception;

    int saveFaq(Faq faq) throws Exception;

    int insertFaq(Faq faq) throws Exception;

    int updateFaq(Faq faq) throws Exception;

    int deleteFaq(Faq faq) throws Exception;

    Map<String, Object> getFaqTypeCount(HttpServletRequest request) throws Exception;

}
