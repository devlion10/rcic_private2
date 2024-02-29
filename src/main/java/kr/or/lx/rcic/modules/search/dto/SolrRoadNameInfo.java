package kr.or.lx.rcic.modules.search.dto;

import lombok.Data;
import org.apache.solr.client.solrj.beans.Field;

/**
 *  연속지적정보
 */

@Data
public class SolrRoadNameInfo {

    @Field
    private String seq;
    @Field
    private String rn;
    @Field
    private String geom;
    @Field
    private String id;
    @Field
    private String pnu;
    @Field
    private String rds_man_no;
    @Field
    private String sgg_cd;
    @Field
    private String sido_nm;
    @Field
    private String sido_cd;
    @Field
    private String sgg_nm;
    @Field
    private String emd_cd;
    @Field
    private String emd_nm;
    @Field
    private String regist_dt;
    @Field
    private String rbp_cn;
    @Field
    private String rep_cn;
    @Field
    private String alwnc_resn;
}