//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package kr.or.lx.rcic.modules.contract.mapper;

import java.util.List;
import java.util.Map;

public interface ContractMapper {
    List<Map<String, Object>> selectContractList(Map<String, Object> var1);

    int selectContractCnt(Map<String, Object> var1);
}
