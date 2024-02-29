package kr.or.lx.rcic.modules.search.dto;

import lombok.Data;
import org.apache.solr.client.solrj.beans.Field;

/**
 *  연속지적정보
 */

@Data
public class SolrCbndInfo {

    /**
     * 시퀀스
     */
    @Field
    private String seq;
    /**
     * pnu
     */
    @Field
    private String pnu;
    /**
     * 주소
     */
    @Field
    private String addr;
    /**
     * 지번
     */
    @Field
    private String jibun;
    /**
     * 보조 지번
     */
    @Field
    private String sub_jibun;
    /**
     * 기준일자
     */
    @Field
    private String stdr_dt;
    /**
     * 시도코드
     */
    @Field
    private String sido_cd;
    @Field
    private String sido_nm;
    /**
     * 시군구코드
     */
    @Field
    private String sgg_cd;
    @Field
    private String sgg_nm;
    /**
     * 읍면동코드
     */
    @Field
    private String emd_cd;
    @Field
    private String emd_nm;
    /**
     * 리코드
     */
    @Field
    private String li_cd;
    @Field
    private String li_nm;
    /**
     * 리코드
     */
    @Field
    private String ri_cd;
    @Field
    private String ri_nm;
    /**
     * 지오메트리
     */
    @Field
    private String geom;

    /**
     * 풀주소
     */
    @Field
    private String fulladdr;
}