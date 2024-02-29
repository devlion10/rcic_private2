package kr.or.lx.rcic.modules.search.dto;

import lombok.Data;
import org.apache.solr.client.solrj.beans.Field;

@Data
public class SolrAnalysisLocInfo {


    /**
     * 시퀀스
     */
    @Field
    private String seq;
    /**
     * ???? (01 : ????(Point), 02 : ????Geometry, 03 : ??? Polyline)
     */
    @Field
    private String loc_ty;
    /**
     * 위치공간정보
     */
    @Field
    private String geom;
    /**
     * 위치공간정보 (WKT 포맷)
     */
    @Field
    private String geom_wkt;
    /**
     * 등록일시
     */
    @Field
    private String regist_dt;
    /**
     * 수정일시
     */
    @Field
    private String updt_dt;
    /**
     */
    @Field
    private String loc_no;
    /**
     */
    @Field
    private Double longitude;
    /**
     */
    @Field
    private Double latitude;

}
