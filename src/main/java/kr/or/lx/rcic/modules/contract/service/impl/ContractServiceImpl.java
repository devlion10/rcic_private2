//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package kr.or.lx.rcic.modules.contract.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import kr.co.timosoft.util.PaginationUtil;
import kr.or.lx.rcic.frmwrk.util.WebUtil;
import kr.or.lx.rcic.modules.contract.mapper.ContractMapper;
import kr.or.lx.rcic.modules.contract.service.ContractService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContractServiceImpl implements ContractService {
    private static final Logger log = LoggerFactory.getLogger(ContractServiceImpl.class);
    @Autowired
    private ContractMapper contractMapper;

    public ContractServiceImpl() {
    }

    public HashMap<String, Object> getContractList(HttpServletRequest request) throws Exception {
        Map<String, Object> param = WebUtil.getCommonAjaxParamIfPresent();
        int cnt = this.contractMapper.selectContractCnt(param);
        List<Map<String, Object>> list = this.contractMapper.selectContractList(param);
        System.out.print(param);
        HashMap<String, Object> resultMap = new HashMap();
        int listCnt = param.get("listCnt") == null ? 10 : Integer.parseInt(String.valueOf(param.get("listCnt")));
        int currPage = param.get("currPage") == null ? 1 : Integer.parseInt(String.valueOf(param.get("currPage")));
        param.put("listCnt", listCnt);
        param.put("currPage", currPage);
        int maxPageCnt = PaginationUtil.maxPageCnt(cnt, listCnt);
        System.out.println("list: " + list);
        resultMap.put("maxPageCnt", maxPageCnt);
        resultMap.put("list", list);
        resultMap.put("totalCnt", cnt);
        return resultMap;
    }

    public Map<String, Object> getContractCnt(String start, String end) throws Exception {
        HashMap<String, Object> resultMap = new HashMap();
        Map<String, Object> param = new HashMap();
        param.put("start", start);
        param.put("end", end);
        int cnt = this.contractMapper.selectContractCnt(param);
        resultMap.put("cnt", cnt);
        return resultMap;
    }
}
