package kr.or.lx.rcic.modules.board.entity;

import lombok.Data;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigInteger;
import java.util.List;

/**
 *  공지사항 정보를 관리한다.  */

@Data
public class Notice implements FileAttachableBoard {

    /**
     * 게시판번호
     */
    private Long noticeNo;
    /**
     * 공지유형
     */
    private String noticeTy;
    private String noticeTyNm;
    /**
     * 공지대상
     */
    private String noticeTrget;
    /**
     * 제목
     */
    private String sj;
    /**
     * 내용
     */
    private String cn;
    /**
     * 첨부파일명
     */
    private String atchmnflNm;
    /**
     * 첨부파일명
     */
    private String atchFileNm;
    /**
     * 첨부파일
     */
    private String atchmnfl;
    /**
     * 첨부파일
     */
    private String atchFile;
    /**
     * 조회수
     */
    private BigInteger rdcnt;
    /**
     * 게시시작일자
     */
    private String noticeBgnde;
    /**
     * 게시종료일자
     */
    private String noticeEndde;
    /**
     * 등록자아이디
     */
    private String registId;
    /**
     * 등록일시
     */
    private String registDt;
    /**
     * 수정자아이디
     */
    private String updtId;
    /**
     * 수정일시
     */
    private String updtDt;
    /**
     * 다음글 번호
     */
    private int nextNo;
    /**
     * 다음글 제목
     */
    private String nextSj;
    /**
     * 이전글 번호
     */
    private int preNo;
    /**
     * 이전글 제목 
     */
    private String preSj;

    /**
     * 파일정보 (조회할 때)
     */
    private List<BbsAtchFile> fileList;

    /**
     * 파일 (첨부할 때)
     */
    private List<MultipartFile> attachFileList;

    
    public boolean hasPk() {
        return noticeNo != null;
    }

    @Override
    public Long getPrimaryKey() {
        return noticeNo;
    }

    @Override
    public BoardReferenceType getBoardRefType() {
        return BoardReferenceType.NOTICE;
    }

    @Override
    public int getFileCnt() {
        return CollectionUtils.isEmpty(fileList) ? 0 : fileList.size();
    }
}