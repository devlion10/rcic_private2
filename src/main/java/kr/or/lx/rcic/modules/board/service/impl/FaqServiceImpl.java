package kr.or.lx.rcic.modules.board.service.impl;

import kr.co.timosoft.util.PaginationUtil;
import kr.or.lx.rcic.egovframework.cmmn.util.EgovMessageSource;
import kr.or.lx.rcic.frmwrk.util.CmmnUtil;
import kr.or.lx.rcic.frmwrk.util.WebUtil;
import kr.or.lx.rcic.modules.board.entity.BbsAtchFile;
import kr.or.lx.rcic.modules.board.entity.BoardReferenceType;
import kr.or.lx.rcic.modules.board.entity.Faq;
import kr.or.lx.rcic.modules.board.mapper.FaqMapper;
import kr.or.lx.rcic.modules.board.service.BbsAtchFileService;
import kr.or.lx.rcic.modules.board.service.FaqService;
import lombok.extern.slf4j.Slf4j;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 *  FAQ 게시판의 내용을 관리한다.  */
@Service
@Slf4j
public class FaqServiceImpl implements FaqService {

    @Autowired
    private FaqMapper faqMapper;

    @Resource(name = "egovMessageSource")
    EgovMessageSource egovMessageSource;

    @Autowired
    private BbsAtchFileService attachFileService;

    /**
     * 단건 조회
     */
    @Override
    public Faq getFaq(Map<String, Object> params) throws Exception {
        Faq faq = faqMapper.getFaq(params);
        if (faq != null) {
            List<BbsAtchFile> files = attachFileService.getBbsAtchFileList(faq.getBoardRefType(), faq.getId());
            faq.setFileList(files);
        }
        return faq;
    }

    /**
     * 목록 조회
     */
    @Override
    public Map<String, Object> getFaqList(HttpServletRequest request) throws Exception {

        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        Map<String, Object> param = WebUtil.getCommonAjaxParam();
        int cnt = faqMapper.getFaqListCnt(param);
              
        List<BbsAtchFile> files = null;
        List<Map<String, Object>> returnfiles = new ArrayList<Map<String, Object>>();
        List<Map<String, Object>>  list = faqMapper.getFaqList(param);  //목록
        Iterator<Map<String, Object>> it = list.iterator();
        while (it.hasNext()) {
			Map<String, Object> map = it.next();
			 param.put("id", map.get("id"));
        	 Faq faq = faqMapper.getFaq(param);
        	 files = attachFileService.getBbsAtchFileList(faq.getBoardRefType(), faq.getId()); //개별파일 
        	 map.put("file_list", files);
        	 returnfiles.add(map);
		}
        
        int listCnt = Integer.parseInt(String.valueOf(param.get("listCnt")));
        int maxPageCnt = PaginationUtil.maxPageCnt(cnt, listCnt);
        
        resultMap.put("list", returnfiles);
        resultMap.put("totalCnt", cnt);
        resultMap.put("maxPageCnt", maxPageCnt);

        return resultMap;
    }

    /**
     * 저장
     */
    @Override
    @Transactional
    public int saveFaq(Faq faq) throws Exception {

        // 저장 권한 검사 등..

        if (faq.hasPk()) {
            // 수정
            return updateFaq(faq);
        } else {
            // 신규 등록
            return insertFaq(faq);
        }
    }

    /**
     * 등록
     */
    @Override
    @Transactional
    public int insertFaq(Faq faq) throws Exception {
        int rs = faqMapper.insertFaq(faq);
        attachFileService.saveAttachFileList(faq);
        return rs;
    }

    /**
     * 수정
     */
    @Override
    @Transactional
    public int updateFaq(Faq faq) throws Exception {
        int rs = faqMapper.updateFaq(faq);
        attachFileService.saveAttachFileList(faq);
        return rs;
    }

    /**
     * 삭제
     */
    @Override
    @Transactional
    public int deleteFaq(Faq faq) throws Exception {
        return faqMapper.deleteFaq(faq);
    }

	@Override
	  public Map<String, Object> getFaqTypeCount(HttpServletRequest request) throws Exception {
		 HashMap<String, Object> resultMap = new HashMap<String, Object>();
	        HashMap<String, Object> retMap = new HashMap<String, Object>();
	        resultMap.put("message", "success");
	        String strParamList = CmmnUtil.deXss(CmmnUtil.checkNull(request.getParameter("paramList"), ""));
	        if (strParamList.equals("")) {
	            retMap.put("message", "failure");
	            retMap.put("result", egovMessageSource.getMessage("_REQUIRED_MSG_REPEAT"));
	            return retMap;
	        }

	        JSONArray paramList = JSONArray.fromObject(strParamList);
	        HashMap<String, Object> param = new HashMap<String, Object>();
	        param = CmmnUtil.convertJsonToObject(CmmnUtil.checkNull(paramList.getJSONObject(0), ""));

	        List<Map<String, Object>> list = faqMapper.getFaqTypeCount(param);
	        resultMap.put("list", list);

	        return resultMap;
	}

}
