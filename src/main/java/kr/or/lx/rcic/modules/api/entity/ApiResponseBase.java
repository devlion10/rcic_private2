package kr.or.lx.rcic.modules.api.entity;

import lombok.Data;

@Data
public class ApiResponseBase {

    private long totCnt;
    private long curPage;
    private long cntPerPage;
    private String errCd = "";
    private String errMsg = "";
}
