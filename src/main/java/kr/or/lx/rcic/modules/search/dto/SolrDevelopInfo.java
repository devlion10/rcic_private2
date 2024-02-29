package kr.or.lx.rcic.modules.search.dto;

import lombok.Data;
import org.apache.solr.client.solrj.beans.Field;

@Data
public class SolrDevelopInfo {

    /**
     * 시퀀스
     */
    @Field
    private String id;
    /**
     * 시도명
     */
    @Field
    private String sido_nm;
    /**
     * 시군구명
     */
    @Field
    private String sgg_nm;
    /**
     * 읍면동명
     */
    @Field
    private String emd_nm;
    /**
     * 리명
     */
    @Field
    private String li_nm;
    /**
     * 번지
     */
    @Field
    private String bunji;
    /**
     * 관련명
     */
    @Field
    private String ref_nm;
    /**
     * 주소
     */
    @Field
    private String addr;
    /**
     * pnu
     */
    @Field
    private String pnu;
    /**
     * 명칭
     */
    @Field
    private String name;
    /**
     * 지역
     */
    @Field
    private String area;
    /**
     * 지오메트리
     */
    @Field
    private Object geom;
    /**
     * 구명
     */
    @Field
    private String gu_nm;
    /**
     * object_id
     */
    @Field
    private String object_id;
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
     * 리코드
     */
    @Field
    private String li_cd;
}
