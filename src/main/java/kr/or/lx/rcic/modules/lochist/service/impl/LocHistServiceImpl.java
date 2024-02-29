package kr.or.lx.rcic.modules.lochist.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.timosoft.util.PaginationUtil;
import kr.or.lx.rcic.egovframework.cmmn.util.EgovMessageSource;
import kr.or.lx.rcic.frmwrk.util.CmmnUtil;
import kr.or.lx.rcic.modules.lochist.mapper.LocHistMapper;
import kr.or.lx.rcic.modules.lochist.service.LocHistService;
import kr.or.lx.rcic.modules.user.mapper.UserMapper;
import net.sf.json.JSONArray;
@Service
public class LocHistServiceImpl implements LocHistService {
	 @Autowired
	 private LocHistMapper locHistMapper;
	
     @Resource(name = "egovMessageSource")
     EgovMessageSource egovMessageSource;
    
	 @Override
	    public Map<String, Object> getLocHistList(HttpServletRequest request) throws Exception {
		 

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

	        int listCnt = param.get("listCnt") == null ? 10 : Integer.parseInt(String.valueOf(param.get("listCnt")));
	        int currPage = param.get("currPage") == null ? 1 : Integer.parseInt(String.valueOf(param.get("currPage")));
	        
	        param.put("listCnt", listCnt);
	        param.put("currPage", currPage);

	        int cnt = locHistMapper.selectLocHistCnt(param);
	        int maxPageCnt = PaginationUtil.maxPageCnt(cnt, listCnt);
	        List<Map<String, Object>> list = locHistMapper.selectLocHistList(param);
	        System.out.println("param:" +param.toString());
			System.out.println("list:" +list.toString());
			System.out.println("listcnt:" +list.size());
	        
	        
	        
	        resultMap.put("totalCnt", cnt);
	        resultMap.put("maxPageCnt", maxPageCnt);
	        resultMap.put("list", list);

	        return resultMap;
	    }
	
}
