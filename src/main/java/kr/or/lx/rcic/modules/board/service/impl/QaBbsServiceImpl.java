package kr.or.lx.rcic.modules.board.service.impl;

import kr.co.timosoft.util.PaginationUtil;
import kr.or.lx.rcic.frmwrk.util.SimpleData;
import kr.or.lx.rcic.modules.board.entity.BbsAtchFile;
import kr.or.lx.rcic.modules.board.entity.Faq;
import kr.or.lx.rcic.modules.board.entity.QaBbs;
import kr.or.lx.rcic.modules.board.mapper.QaBbsMapper;
import kr.or.lx.rcic.modules.board.service.BbsAtchFileService;
import kr.or.lx.rcic.modules.board.service.QaBbsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 *  */
@Service
@Slf4j
public class QaBbsServiceImpl implements QaBbsService {

    @Autowired
    private QaBbsMapper qaBbsMapper;

    @Autowired
    private BbsAtchFileService attachFileService;

    /**
     * 단건 조회
     */
    @Override
    public QaBbs getQaBbs(Map<String, Object> params) throws Exception {
        QaBbs qaBbs = qaBbsMapper.getQaBbs(params);
        if (qaBbs != null) {
            List<BbsAtchFile> files = attachFileService.getBbsAtchFileList(qaBbs.getBoardRefType(), qaBbs.getId());
            qaBbs.setFileList(files);
        }
        return qaBbs;
    }

    /**
     * 목록 조회
     */
    @Override
    public Map<String, Object> getQaBbsList(Map<String, Object> param) throws Exception {

        int cnt = qaBbsMapper.selectQaBbsCnt(param);

        HashMap<String, Object> resultMap = new HashMap<>();
        List<BbsAtchFile> files = null;
        List<Map<String, Object>> returnfiles = new ArrayList<Map<String, Object>>();
        List<Map<String, Object>> list = qaBbsMapper.selectQaBbsList(param);
        Iterator<Map<String, Object>> it = list.iterator();
        while (it.hasNext()) {
			Map<String, Object> map = it.next();
			 param.put("id", map.get("id"));
        	 QaBbs qaBbs = qaBbsMapper.getQaBbs(param);
        	 files = attachFileService.getBbsAtchFileList(qaBbs.getBoardRefType(), qaBbs.getId()); //개별파일 
        	 map.put("file_list", files);
        	 returnfiles.add(map);
		}
        int listCnt = param.get("listCnt") == null ? 5 : Integer.parseInt(String.valueOf(param.get("listCnt")));
        int maxPageCnt = PaginationUtil.maxPageCnt(cnt, listCnt);
      
        resultMap.put("maxPageCnt", maxPageCnt);
        resultMap.put("list", returnfiles);
        resultMap.put("totalCnt", cnt);

        return resultMap;
    }

    /**
     * 등록
     */
    public int insertQaBbs(SimpleData data) throws Exception {
    	 return qaBbsMapper.insertQaBbs(data);
    }
   

    /**
     * 수정
     */
    @Override
    @Transactional
    public int updateQaBbs(QaBbs qaBbs) throws Exception {
        return qaBbsMapper.updateQaBbs(qaBbs);
    }

    /**
     * 답변등록
     */
    @Override
    @Transactional
    public int answerQaBbs(QaBbs qaBbs) throws Exception {
        int rs = qaBbsMapper.answerQaBbs(qaBbs);
        attachFileService.saveAttachFileList(qaBbs);
        return rs;
    }



    /**
     * 삭제
     */
    @Override
    @Transactional
    public int deleteQaBbs(SimpleData data) throws Exception {
        return qaBbsMapper.deleteQaBbs(data);
    }

}
