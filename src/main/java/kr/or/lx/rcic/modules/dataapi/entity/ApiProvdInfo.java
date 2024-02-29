package kr.or.lx.rcic.modules.dataapi.entity;

import lombok.Data;

/**
 *  API로 제공되는 정보를 관리한다.  */

@Data
public class ApiProvdInfo {

    /**
     * API제공번호
     */
    private Long id;
    /**
     * API정보명
     */
    private String apiInfoNm;
    
    /**
     * API설명
     */
    private String apiDc;
    /**
     * API제공URL
     */
    private String apiProvd_Url;
    /**
     * 일일최대요청건수
     */
    private String dmaxReqCnt;
    /**
     * 사용여부
     */
    private String useYn;
    
    /**
     * 등록일자
     */
    private String registDt;
    
    /**
     * 사용여부
     */
    private String updtDt;
    

    public boolean hasPk() {
        return id != null;
    }

}