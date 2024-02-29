package kr.or.lx.rcic.modules.board.entity;

import lombok.Data;

/**
 *  게시판의 첨부파일정보를 관리한다.
 */

@Data
public class BbsAtchFile {

    /**
     * 첨부파일번호
     */
    private Long id;
    /**
     * 참조게시글유형
     */
    private String refrnBbscttTy;
    /**
     * 참조게시글번호
     */
    private Long refrnBbscttNo;
    /**
     * 첨부파일위치
     */
    private String atchFileLc;
    /**
     * 첨부파일명
     */
    private String atchFileNm;
    /**
     * 원본파일명
     */
    private String orginlFileNm;
    /**
     * 첨부화일사이즈
     */
    private Long atchFileSize;
    /**
     * 등록일시
     */
    private String registDt;
    /**
     * 수정일시
     */
    private String updtDt;

    public boolean hasPk() {
        return id != null;
    }

}