package kr.or.lx.rcic.modules.search.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.apache.solr.client.solrj.beans.Field;

@Data
public class SolrAnalysisLocHist {


	@Field
	private int numFound;
    /**
     * 시퀀스
     */
	@Field
    private String seq;
	
	/**
     * 시퀀스
     */
	@Field
    private String loc_ty;
	
    /**
     * 일련번호
     */
	@Field
    private String ser_no;
    /**
     * 변경일시
     */
	@Field
    private String chg_dt;
    /**
     * 변경방법
     */
	@Field
    private String chg_resn_cd;
    /**
     * 변경방법설명
     */
	@Field
    private String chg_resn_dc;
    /**
     * 위치공간정보
     */
	@Field
    private String geom;
	
	@Field
    private String geo_geom;
    /**
     * 위치예측신뢰도코드
     */
	@Field
    private String loc_prdt_reli_cd;
    /**
     * 등록일시
     */
	@Field
    private String regist_dt;
    /**
     * 등록아이디
     */
	@Field
    private String regist_id;
}
