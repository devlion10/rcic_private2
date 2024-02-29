package kr.or.lx.rcic.modules.board.entity;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FileAttachableBoard {

    List<MultipartFile> getAttachFileList();

    Long getPrimaryKey();

    // 공통코드 테이블의 코드그룹 REFRN_BBSCTT_TY: 1 공지사항 / 2 FAQ
    BoardReferenceType getBoardRefType();

    int getFileCnt();
}
