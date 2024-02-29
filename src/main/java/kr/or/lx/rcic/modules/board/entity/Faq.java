package kr.or.lx.rcic.modules.board.entity;

import lombok.Data;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 *  FAQ 게시판의 내용을 관리한다.  */

@Data
public class Faq  implements FileAttachableBoard {

    /**
     *  FAQ번호      */
    private Long id;
    /**
     *  FAQ제목      */
    private String faqSj;
    /**
     *  FAQ내용      */
    private String faqCn;
    /**
     *  FAQ유형      */
    private String faqTy;
    private String faqTyNm;
    /**
     *  사용여부      */
    private String useYn;
    /**
     *  등록일시      */
    private String registDt;
    /**
     *  수정일시      */
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
        return BoardReferenceType.FAQ;
    }

    @Override
    public int getFileCnt() {
        return CollectionUtils.isEmpty(fileList) ? 0 : fileList.size();
    }
}