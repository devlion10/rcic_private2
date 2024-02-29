package kr.or.lx.rcic.modules.search.dto;

import lombok.Data;
import org.apache.solr.client.solrj.beans.Field;

/**
 *  연속지적정보
 */

@Data
public class SolrSidoInfo {

    /**
     * 시도코드
     */
    @Field
    private String sido_cd;
    
    /**
     * 시도
     */
    @Field
    private String sido_nm;
    
    /**
     * center
     */
    @Field
    private String center;
    

    /**
     * 지오메트리
     */
    @Field
    private String geom;
    
    @Field
    private String geo_json;

}