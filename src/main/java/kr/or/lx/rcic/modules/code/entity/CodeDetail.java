package kr.or.lx.rcic.modules.code.entity;

import lombok.Data;
import org.codehaus.jackson.annotate.JsonIgnore;

import java.math.BigInteger;

/**
 *  공통코드상세정보를 관리한다.  */

@Data
public class CodeDetail {

    /**
     * 그룹코드
     */
    private String groupCode;
    private String groupNm;
    /**
     * 코드
     */
    private String code;
    /**
     * 코드명
     */
    private String codeNm;
    /**
     * 코드순서
     */
    private BigInteger codeOrdr;
    /**
     * 코드설명
     */
    private String codeDc;
    /**
     * 사용여부
     */
    private String useYn;
    /**
     * 비고
     */
    private String rm;
    /**
     * 등록자아이디
     */
    private String registId;
    /**
     * 등록일시
     */
    private String registDt;
    /**
     * 참조정보1
     */
    private String attr1;
    /**
     * 바이트 참조정보1
     */
    private byte[] byteAttr1;
    private String base64Attr1;
    private String base64Attr2;

    public boolean hasPk() {
        return groupCode != null && code != null && groupCode != null && code != null;
    }

    @JsonIgnore
    private boolean sequencial = false;

}