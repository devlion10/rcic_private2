//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package kr.or.lx.rcic.modules.contract.controller;

import java.util.Map;
import java.util.Properties;
import javax.servlet.http.HttpServletRequest;
import kr.or.lx.rcic.frmwrk.web.BaseController;
import kr.or.lx.rcic.modules.contract.service.ContractService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping({"/admin/system"})
public class ContractController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(ContractController.class);
    @Autowired
    private ContractService contractService;
    @Value("#{contextProperties}")
    Properties prop = new Properties();

    public ContractController() {
    }

    @RequestMapping({"/contract/list"})
    public String cbnd(HttpServletRequest request, @RequestParam Map<String, String> params) {
        return "admin/system/contract/contract-list";
    }

    @RequestMapping({"/contract/getContractList"})
    @ResponseBody
    public Map<String, Object> getContractList(HttpServletRequest request) throws Exception {
        return this.contractService.getContractList(request);
    }

    @RequestMapping({"/contract/getContractCnt/{start}/{end}"})
    @ResponseBody
    public Map<String, Object> getContractCnt(@PathVariable("start") String start, @PathVariable("end") String end, HttpServletRequest request) throws Exception {
        System.out.println("start: " + start + " end: " + end);
        return this.contractService.getContractCnt(start, end);
    }
}
