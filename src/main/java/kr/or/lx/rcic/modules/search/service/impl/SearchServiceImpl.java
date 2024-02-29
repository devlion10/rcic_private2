package kr.or.lx.rcic.modules.search.service.impl;

import kr.co.timosoft.util.PaginationUtil;
import kr.or.lx.rcic.egovframework.cmmn.util.EgovMessageSource;
import kr.or.lx.rcic.frmwrk.util.CmmnUtil;
import kr.or.lx.rcic.modules.analysisInfo.mapper.AnalysisInfoMapper;
import kr.or.lx.rcic.modules.analysisLocHist.mapper.AnalysisLocHistMapper;
import kr.or.lx.rcic.modules.analysisLocHist.service.AnalysisLocHistService;
import kr.or.lx.rcic.modules.search.mapper.SearchMapper;
import kr.or.lx.rcic.modules.search.service.SearchService;
import lombok.extern.slf4j.Slf4j;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

@Service
@Slf4j
public class SearchServiceImpl  implements SearchService {




        @Autowired
        private SearchMapper searchMapper;

        @Resource(name = "egovMessageSource")
        EgovMessageSource egovMessageSource;

        @Value("#{contextProperties}")
        Properties prop = new Properties();

    /**
     * 목록 조회
     */
    @Override
    public List<Map<String, Object>> getBmngSchList(Map<String, Object> params) throws Exception {
;
        List<Map<String, Object>> list = searchMapper.getBmngSchList(params);


        return list;
    }

    /**
     * 목록 총갯수
     */
    @Override
    public List<Map<String, Object>> getBmngSchListCnt(Map<String, Object> params) throws Exception {
        ;
        List<Map<String, Object>> list = searchMapper.getBmngSchListCnt(params);


        return list;
    }

    /**
     * 음면동 코드 조회
     */
    @Override
    public List<Map<String, Object>> getEmdCdList(Map<String, Object> params) throws Exception {
        ;
        List<Map<String, Object>> list = searchMapper.getEmdCdList(params);


        return list;
    }


    /**
     * ㄹㅣ 코드 조회
     */
    @Override
    public List<Map<String, Object>> getLiCdList(Map<String, Object> params) throws Exception {
        ;
        List<Map<String, Object>> list = searchMapper.getLiCdList(params);


        return list;
    }

    /**
     * 지적정보 pnu 포함조회
     */
    @Override
    public List<Map<String, Object>> getCnbdList(Map<String, Object> params) throws Exception {
        ;
        List<Map<String, Object>> list = searchMapper.getCnbdList(params);


        return list;
    }


    /**
     * 도로명 주소 새주소 건물 레이어를 이요하여 지오메트리 획득
     */
    @Override
    public List<Map<String, Object>> getGeomFromRn(Map<String, Object> params) throws Exception {
        ;
        List<Map<String, Object>> list = searchMapper.getGeomFromRn(params);


        return list;
    }






}
