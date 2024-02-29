package kr.or.lx.rcic.modules.search.dto;

import lombok.Data;
import org.apache.solr.client.solrj.beans.Field;

/**
 *  연속지적정보
 */

@Data
public class SolrEmdInfo {

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
     * 읍면동
     */
    @Field
    private String emd_nm;

    /**
     * 지오메트리
     */
    @Field
    private String geom;

}