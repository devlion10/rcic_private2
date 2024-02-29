package kr.or.lx.rcic.modules.lochist.entity;
import lombok.Data;

@Data
public class LocHistInfo {
	private String seq;
	
	private String loc_ty;
	
	private int ser_no;
	
	private String chg_dt;
	
	private String chg_resn_cd;
	
	private String chg_resn_dc;
	
	private String geom;
	
	private String loc_prdt_reli_cd;
	
	private String regist_dt;
	
	private String regist_id;
	
	private String ref_dic_name_og;
	
	private String ref_dic_name;
	
	private String changereason;
	
	private String serword_og;
	
	private String serword;
}
