package kr.or.lx.rcic.modules.search.dto;

import lombok.Data;
import org.apache.solr.client.solrj.beans.Field;

/**
 *  연속지적정보
 */

@Data
public class SolrSggInfo {

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
     * 시군구
     */
    @Field
    private String sgg_nm;
    
    /**
     * 지오메트리
     */
    @Field
    private String geom;

}