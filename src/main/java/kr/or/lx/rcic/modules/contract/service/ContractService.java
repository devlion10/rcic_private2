//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package kr.or.lx.rcic.modules.contract.service;

import java.util.Map;
import javax.servlet.http.HttpServletRequest;

public interface ContractService {
    Map<String, Object> getContractList(HttpServletRequest var1) throws Exception;

    Map<String, Object> getContractCnt(String var1, String var2) throws Exception;
}
