package kr.or.lx.rcic.modules.board.entity;

import lombok.Data;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class QaBbs  implements FileAttachableBoard {

    /**
     * 글번호
     */
    private Long id;
    /**
     * 문의타입
     */
    private String qestnTy;
    private String qestnTyNm;
    /**
     * 문의제목
     */
    private String qestnSj;
    /**
     * 문의내용
     */
    private String qestnCn;
    /**
     * 문의날짜
     */
    private String qestnDt;
    /**
     * 답변내용
     */
    private String answrCn;
    /**
     * 답변날짜
     */
    private String answrDt;
    /**
     * ??
     */
    private String delAt;
    /**
     * 사용자번호
     */
    private String userSeq;
    private String userNm;
    /**
     * 등록날짜
     */
    private String registDt;
    /**
     * 수정날짜
     */
    private String updtDt;

    public boolean hasPk() {
        return id != null;
    }



    /**
     * 파일정보 (조회할 때)
     */
    private List<BbsAtchFile> fileList;

    /**
     * 파일 (첨부할 때)
     */
    private List<MultipartFile> attachFileList;


    @Override
    public Long getPrimaryKey() {
        return id;
    }

    @Override
    public BoardReferenceType getBoardRefType() {
        return BoardReferenceType.QNA;
    }

    @Override
    public int getFileCnt() {
        return CollectionUtils.isEmpty(fileList) ? 0 : fileList.size();
    }
}