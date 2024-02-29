package kr.or.lx.rcic.modules.search.dto;

import lombok.Data;
import org.apache.solr.client.solrj.beans.Field;

@Data
public class SolrAnalysisFacInfo {

    /**
     * 시도코드
     */
    @Field
    private String sido_cd;
    /**
     * 시군구코드
     */
    @Field
    private String sgg_cd;
    /**
     * 읍면동코드
     */
    @Field
    private String emd_cd;
    /**
     * 공사종류
     */
    @Field
    private String fac_ty_cd;
    /**
     */
    @Field
    private String fac_ty_nm;
    /**
     * 분석일자
     */
    @Field
    private String stdr_dt;
    /**
     * 수집번호
     */
    @Field
    private String resultno;

    /**
     * 시퀀스
     */
    @Field
    private String seq;
    
    @Field
    private String bidntcedt;
    
    @Field
    private String base64_attr2;

	
}
