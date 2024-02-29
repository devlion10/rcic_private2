package kr.or.lx.rcic.modules.search.dto;

import lombok.Data;
import org.apache.solr.client.solrj.beans.Field;

@Data
public class SolrAnalysisScoreInfo {


    /**
     * 시퀀스
     */
    @Field
    private String score_no;
   
    @Field
    private String resultno;
   
    @Field
    private Double score;
   
   
    @Field
    private String collection;


    @Field
    private String bidntcenm;


    @Field
    private String dminsttcd;
    /**
     */
    @Field
    private String dminsttnm;
    /**
     */
    @Field
    private String analysisword;
    /**
     */
    @Field
    private String searchword;
    
    @Field
    private String stdrdt;
    
    @Field
    private String geom_type;
    
    @Field
    private String geom;
    
    @Field
    private String geo_geom;
}
