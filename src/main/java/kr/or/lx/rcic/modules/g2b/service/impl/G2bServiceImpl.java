package kr.or.lx.rcic.modules.g2b.service.impl;

import kr.co.timosoft.util.PaginationUtil;
import kr.or.lx.rcic.frmwrk.util.SimpleData;
import kr.or.lx.rcic.frmwrk.util.WebUtil;
import kr.or.lx.rcic.modules.board.entity.BbsAtchFile;
import kr.or.lx.rcic.modules.board.entity.Notice;
import kr.or.lx.rcic.modules.board.mapper.NoticeMapper;
import kr.or.lx.rcic.modules.board.service.BbsAtchFileService;
import kr.or.lx.rcic.modules.board.service.NoticeService;
import kr.or.lx.rcic.modules.g2b.mapper.G2bMapper;
import kr.or.lx.rcic.modules.g2b.service.G2bService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 수집 정보를 관리한다.
 */
@Service
@Slf4j
public class G2bServiceImpl implements G2bService {

    @Autowired
    private G2bMapper g2bMapper;


    /**
     * 목록 조회
     */
    @Override
    public HashMap<String, Object> getG2bList(HttpServletRequest request) throws Exception {

        // 조회
        Map<String, Object> param = WebUtil.getCommonAjaxParamIfPresent();
        int cnt = g2bMapper.selectG2bCnt(param);
        List<Map<String, Object>> list = g2bMapper.selectG2bList(param);

        // 결과
        HashMap<String, Object> resultMap = new HashMap<>();
        int listCnt = param.get("listCnt") == null ? 5 : Integer.parseInt(String.valueOf(param.get("listCnt")));
        int maxPageCnt = PaginationUtil.maxPageCnt(cnt, listCnt);

        System.out.println("list: " + list);
        
        resultMap.put("maxPageCnt", maxPageCnt);
        resultMap.put("list", list);
        resultMap.put("totalCnt", cnt);

        return resultMap;
    }


	@Override
	public Map<String, Object> getAnalCnt(String start, String end) throws Exception {
        HashMap<String, Object> resultMap = new HashMap<>();
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("start", start);
        param.put("end", end);
		int cnt = g2bMapper.selectAnalCnt(param);
		resultMap.put("cnt", cnt);
		return resultMap;
	}


}
