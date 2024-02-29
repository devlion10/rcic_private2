package kr.or.lx.rcic.modules.g2b.entity;

import lombok.Data;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigInteger;
import java.util.List;

/**
 *  수집 정보를 관리한다.  */

@Data
public class G2b {

    /**
     * 수집로그번호
     */
    private String logSeq;
    /**
     * 서비스번호
     */
    private String serviceNo;
    /**
     * 시작일시
     */
    private String startDt;
    /**
     * 종료일시
     */
    private String endDt;
    /**
     * 수집키워드
     */
    private String keyword;
    /**
     * 수집데이터건수
     */
    private String getDataCnt;
    /**
     * 변환데이터건수
     */
    private String converterDataCnt;
    /**
     * 기준일시
     */
    private String stdrDt;
    /**
     * 검색시작일시
     */
    private String searchStartDt;
    /**
     * 검색종료일시
     */
    private String searchEndDt;
    /**
     * 분석건수
     */
    private String anaysisCnt;
   

}