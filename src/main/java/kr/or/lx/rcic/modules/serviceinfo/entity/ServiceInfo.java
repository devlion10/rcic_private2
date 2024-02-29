package kr.or.lx.rcic.modules.serviceinfo.entity;


import lombok.Data;

/**
 *  수집연계대상의 서비스정보를 관리한다.
 */
@Data
public class ServiceInfo {

    /**
     * 서비스번호
     */
    private Long serviceNo;
    /**
     * 서비스명
     */
    private String serviceNm;
    /**
     * 서비스URL
     */
    private String serviceUrl;
    /**
     * 사용여부
     */
    private String useYn;
    /**
     * 마지막 실행시간
     */
    private String lastRunDate;
    /**
     * 세부 서비스 명
     */
    private String detailServiceNm;
    /**
     * 세부 서비스 타입
     */
    private String detailServiceTy;
    /**
     * 자동 실행 여부
     */
    private String autoYn;
    /**
     * 컨슈머 키
     */
    private String consumerKey;
    /**
     * 컨슈머 시크릿 키
     */
    private String consumerSecret;
    /**
     * 접근 토큰
     */
    private String acessToken;
    /**
     * 비밀 접근 토큰키
     */
    private String acessTokenSecret;

    public boolean hasPk() {
        return serviceNo != null && serviceNo != null;
    }

}